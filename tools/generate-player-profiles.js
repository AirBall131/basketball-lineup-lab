#!/usr/bin/env node

/**
 * Generate personalized player profiles using Claude API.
 *
 * Reads full-rosters.js, filters core players not already curated,
 * batches them through the Claude API, and writes:
 *   data/player-profiles.js
 *
 * Usage:
 *   node tools/generate-player-profiles.js
 *
 * Env vars:
 *   ANTHROPIC_API_KEY  – required
 *   BATCH_SIZE          – players per API call (default 8)
 *   DRY_RUN             – set to "1" to print target list only
 */

const fs = require("fs");
const path = require("path");

const BATCH_SIZE = Number(process.env.BATCH_SIZE || 15);
const DRY_RUN = process.env.DRY_RUN === "1";
const MAX_PLAYERS = Number(process.env.MAX_PLAYERS || 0); // 0 = no limit
const OUTPUT = path.resolve(__dirname, "../data/player-profiles.js");

// ---------------------------------------------------------------------------
// 1. Parse full-rosters.js (browser-format) into a plain JS array
// ---------------------------------------------------------------------------
function loadFullRosterPlayers() {
  const src = fs.readFileSync(
    path.resolve(__dirname, "../data/full-rosters.js"),
    "utf8"
  );
  const jsonStart = src.indexOf("[");
  const jsonEnd = src.lastIndexOf("]") + 1;
  if (jsonStart === -1 || jsonEnd === 0) {
    throw new Error("Could not locate JSON array in full-rosters.js");
  }
  return JSON.parse(src.slice(jsonStart, jsonEnd));
}

// ---------------------------------------------------------------------------
// 2. Extract already-curated player keys from app.js
// ---------------------------------------------------------------------------
function loadCuratedKeys() {
  const src = fs.readFileSync(
    path.resolve(__dirname, "../app.js"),
    "utf8"
  );

  const keys = new Set();

  // (a) Hand-written PLAYER_POOL entries: these have no "source" field.
  // Extract each object in PLAYER_POOL, check for presence of "source"
  const poolStart = src.indexOf("const PLAYER_POOL = [");
  const poolEnd = findMatchingBracket(src, poolStart + "const PLAYER_POOL = ".length);
  const poolSection = src.slice(poolStart, poolEnd);
  // Parse player objects — each starts with { and has name/team/decade
  const playerRegex = /\{\s*name:\s*"([^"]+)",\s*team:\s*"([^"]+)",[\s\S]*?decade:\s*"([^"]+)"/g;
  let match;
  while ((match = playerRegex.exec(poolSection)) !== null) {
    const name = match[1];
    const team = match[2];
    const decade = match[3];
    const currentTeam = getCurrentTeamName(team);
    keys.add(`${name}|${currentTeam}|${decade}`);
  }

  // (b) addCandidateSet entries
  const setRegex = /addCandidateSet\("([^"]+)",\s*"[^"]*",\s*"([^"]+)",\s*\[([\s\S]*?)\]\s*\)/g;
  let setMatch;
  while ((setMatch = setRegex.exec(src)) !== null) {
    const team = setMatch[1];
    const decade = setMatch[2];
    const body = setMatch[3];
    const currentTeam = getCurrentTeamName(team);
    const nameRegex = /name:\s*"([^"]+)"/g;
    let nameMatch;
    while ((nameMatch = nameRegex.exec(body)) !== null) {
      keys.add(`${nameMatch[1]}|${currentTeam}|${decade}`);
    }
  }

  return keys;
}

// Simple bracket matcher for finding the end of PLAYER_POOL array
function findMatchingBracket(src, startIdx) {
  let depth = 0;
  for (let i = startIdx; i < src.length; i++) {
    if (src[i] === "[") depth++;
    else if (src[i] === "]") {
      depth--;
      if (depth === 0) return i + 1;
    }
  }
  return src.length;
}

// Copy of getCurrentTeamName from app.js (same logic)
const CURRENT_TEAM_BY_NAME = {
  "New York Nets": "Brooklyn Nets",
  "New Jersey Nets": "Brooklyn Nets",
  "Charlotte Bobcats": "Charlotte Hornets",
  "San Diego Clippers": "Los Angeles Clippers",
  "Buffalo Braves": "Los Angeles Clippers",
  "Vancouver Grizzlies": "Memphis Grizzlies",
  "New Orleans Hornets": "New Orleans Pelicans",
  "New Orleans/Oklahoma City Hornets": "New Orleans Pelicans",
  "New Orleans Jazz": "Utah Jazz",
  "Seattle SuperSonics": "Oklahoma City Thunder",
  "Kansas City Kings": "Sacramento Kings",
  "Kansas City-Omaha Kings": "Sacramento Kings",
  "Cincinnati Royals": "Sacramento Kings",
  "Washington Bullets": "Washington Wizards",
  "Baltimore Bullets": "Washington Wizards",
  "Capital Bullets": "Washington Wizards"
};

function getCurrentTeamName(team) {
  return CURRENT_TEAM_BY_NAME[team] || team;
}

function getPlayerKey(player) {
  return `${player.name}|${getCurrentTeamName(player.team)}|${player.decade}`;
}

// ---------------------------------------------------------------------------
// 3. Build the target list
// ---------------------------------------------------------------------------
function buildTargetList() {
  const allPlayers = loadFullRosterPlayers();
  const curated = loadCuratedKeys();

  console.log(`Full roster entries: ${allPlayers.length}`);
  console.log(`Curated keys: ${curated.size}`);

  const targets = allPlayers.filter((p) => {
    if (p.impactTier !== "core") return false;
    if ((p.impactScore || 0) < 500) return false;
    if (curated.has(getPlayerKey(p))) return false;
    return true;
  });

  // Deduplicate by key (same player may appear multiple times)
  const seen = new Set();
  const unique = [];
  for (const p of targets) {
    const key = getPlayerKey(p);
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(p);
    }
  }

  // Sort by impactScore descending
  unique.sort((a, b) => (b.impactScore || 0) - (a.impactScore || 0));

  // Apply MAX_PLAYERS limit if set
  const limited = MAX_PLAYERS > 0 ? unique.slice(0, MAX_PLAYERS) : unique;

  console.log(`Target players (core + impact>=500 + not curated): ${unique.length}`);
  if (MAX_PLAYERS > 0) {
    console.log(`MAX_PLAYERS limit applied: processing only ${limited.length}`);
  }

  // Decade distribution
  const dist = {};
  limited.forEach((p) => {
    dist[p.decade] = (dist[p.decade] || 0) + 1;
  });
  console.log("Decade distribution:", JSON.stringify(dist));

  return limited;
}

// ---------------------------------------------------------------------------
// 4. Call Claude API to generate profiles
// ---------------------------------------------------------------------------
function buildPrompt(batch) {
  const playerList = batch
    .map((p, i) => {
      const s = p.stats || {};
      const g = s.games || 1;
      const ppg = (s.points / g).toFixed(1);
      const rpg = (s.rebounds / g).toFixed(1);
      const apg = (s.assists / g).toFixed(1);
      const spg = (s.steals / g).toFixed(1);
      const bpg = (s.blocks / g).toFixed(1);
      const positions = (p.positions || []).join("/");
      const seasons = (p.seasons || []).join(", ");
      return `${i + 1}. ${p.name} | ${p.teamCn || p.team} | ${p.decade} | ${positions}
   赛季: ${seasons}
   生涯场均: ${ppg}分 ${rpg}板 ${apg}助 ${spg}断 ${bpg}帽
   出场${g}场, WS ${s.winShares || 0}, VORP ${s.vorp || 0}, BPM ${s.bpm || 0}
   impactScore: ${p.impactScore || 0}`;
    })
    .join("\n\n");

  return `你是一位资深 NBA 球探和分析师。请为以下每位球员生成一段中文球探报告简介（note）、3-5个中文标签（tags）、以及14项评分（ratings）。

要求：
- note：50-80字，分析性、有见地，提及该球员在该年代/球队版本的独特价值和打法特点。风格参考：“持球爆破、中距离、无球切入和防守压迫同时在线，是任何阵容的第一核心答案。”
- tags：3-5个中文短语，描述该球员的核心标签
- ratings：14项数值评分（0-100），基于该球员的实际能力和该版本的真实水平，不要虚高：
  - overall: 综合评分
  - scoring: 得分能力
  - creation: 创造进攻能力（传球/组织/为队友创造机会）
  - shooting: 投射能力（中远距离投篮）
  - spacing: 拉开空间能力（无球威胁、防守方对其外线尊重程度）
  - defense: 防守综合能力
  - rim: 护框/篮下防守
  - rebounding: 篮板能力
  - offball: 无球价值（空切、接球投篮、无球跑动）
  - health: 健康/出勤（该版本耐久度）
  - stamina: 体能/续航
  - clutch: 关键球/大心脏
  - ball: 球权需求（越高越需要持球）
  - portability: 阵容适配性（放任何阵容都好用的程度）

输出格式：严格的 JSON，key 为 "球员英文名|球队英文名|年代"：
{
  "球员名|球队名|年代": {
    "note": "...",
    "tags": ["标签1", "标签2", "标签3"],
    "ratings": { "overall": 0, "scoring": 0, ... }
  },
  ...
}

以下是球员数据：

${playerList}`;
}

async function generateBatch(batch, batchIndex, totalBatches) {
  // Dynamic import for ESM package in CJS context
  const { default: Anthropic } = await import("@anthropic-ai/sdk");

  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  console.log(
    `\nBatch ${batchIndex + 1}/${totalBatches} — ${batch.length} players`
  );

  const prompt = buildPrompt(batch);

  const msg = await anthropic.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  });

  const text = msg.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("");

  // Extract JSON from response (may be wrapped in ```json ```)
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    console.error("  Could not extract JSON from response");
    console.error("  Raw response (first 500 chars):", text.slice(0, 500));
    return {};
  }

  try {
    return JSON.parse(jsonMatch[0]);
  } catch (err) {
    console.error("  JSON parse error:", err.message);
    console.error("  JSON string (first 500 chars):", jsonMatch[0].slice(0, 500));
    return {};
  }
}

// ---------------------------------------------------------------------------
// 5. Main
// ---------------------------------------------------------------------------
async function main() {
  const targets = buildTargetList();

  if (DRY_RUN) {
    console.log("\nDry run — target players:");
    targets.forEach((p) => {
      const s = p.stats || {};
      console.log(
        `  ${p.name} | ${p.teamCn || p.team} | ${p.decade} | impact=${p.impactScore}`
      );
    });
    console.log(`\nTotal: ${targets.length} players`);
    return;
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error(
      "ANTHROPIC_API_KEY environment variable is required."
    );
    process.exit(1);
  }

  const totalBatches = Math.ceil(targets.length / BATCH_SIZE);
  console.log(
    `Generating profiles for ${targets.length} players in ${totalBatches} batches of ${BATCH_SIZE}...`
  );

  const allProfiles = {};

  for (let i = 0; i < targets.length; i += BATCH_SIZE) {
    const batch = targets.slice(i, i + BATCH_SIZE);
    const batchIndex = Math.floor(i / BATCH_SIZE);
    const profiles = await generateBatch(batch, batchIndex, totalBatches);
    Object.assign(allProfiles, profiles);

    // Progress
    const done = Math.min(i + BATCH_SIZE, targets.length);
    console.log(`  Progress: ${done}/${targets.length} players`);

    // Respect rate limits
    if (i + BATCH_SIZE < targets.length) {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  // Write output
  const output =
    `// Generated by tools/generate-player-profiles.js\n` +
    `// ${targets.length} player profiles generated via Claude API\n` +
    `// Generated at: ${new Date().toISOString()}\n` +
    `window.PLAYER_PROFILES = ${JSON.stringify(allProfiles, null, 2)};\n`;

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, output, "utf8");

  const profileCount = Object.keys(allProfiles).length;
  console.log(`\nDone! Wrote ${profileCount} profiles to ${OUTPUT}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
