#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const START_SEASON_END = Number(process.env.START_SEASON_END || 1970);
const END_SEASON_END = Number(process.env.END_SEASON_END || 2026);
const REQUEST_DELAY_MS = Number(process.env.REQUEST_DELAY_MS || 900);
const OUTPUT_FILE = path.resolve(process.env.OUTPUT_FILE || path.resolve(__dirname, "../data/full-rosters.js"));
const INPUT_CSV = process.env.INPUT_CSV ? path.resolve(process.env.INPUT_CSV) : "";
const SEASON_STATS_URL =
  process.env.SEASON_STATS_URL ||
  "https://raw.githubusercontent.com/fatihilhan42/NBA-Players-data-1950-to-2021/main/seasons_stats.csv";
const SEASON_STATS_FILE = process.env.SEASON_STATS_FILE ? path.resolve(process.env.SEASON_STATS_FILE) : "";

const TEAM_BY_ABBR = {
  ATL: ["Atlanta Hawks", "老鹰"],
  BAL: ["Baltimore Bullets", "奇才"],
  BOS: ["Boston Celtics", "凯尔特人"],
  BRK: ["Brooklyn Nets", "篮网"],
  BUF: ["Buffalo Braves", "快船"],
  CAP: ["Capital Bullets", "奇才"],
  NJN: ["New Jersey Nets", "篮网"],
  CHA: ["Charlotte Bobcats", "山猫"],
  CHO: ["Charlotte Hornets", "黄蜂"],
  CHH: ["Charlotte Hornets", "黄蜂"],
  CHI: ["Chicago Bulls", "公牛"],
  CLE: ["Cleveland Cavaliers", "骑士"],
  DAL: ["Dallas Mavericks", "独行侠"],
  DEN: ["Denver Nuggets", "掘金"],
  DET: ["Detroit Pistons", "活塞"],
  GSW: ["Golden State Warriors", "勇士"],
  HOU: ["Houston Rockets", "火箭"],
  IND: ["Indiana Pacers", "步行者"],
  LAC: ["Los Angeles Clippers", "快船"],
  SDC: ["San Diego Clippers", "快船"],
  LAL: ["Los Angeles Lakers", "湖人"],
  MEM: ["Memphis Grizzlies", "灰熊"],
  VAN: ["Vancouver Grizzlies", "灰熊"],
  MIA: ["Miami Heat", "热火"],
  MIL: ["Milwaukee Bucks", "雄鹿"],
  MIN: ["Minnesota Timberwolves", "森林狼"],
  NOP: ["New Orleans Pelicans", "鹈鹕"],
  NOH: ["New Orleans Hornets", "鹈鹕"],
  NOK: ["New Orleans/Oklahoma City Hornets", "鹈鹕"],
  NYK: ["New York Knicks", "尼克斯"],
  OKC: ["Oklahoma City Thunder", "雷霆"],
  SEA: ["Seattle SuperSonics", "雷霆"],
  ORL: ["Orlando Magic", "魔术"],
  PHI: ["Philadelphia 76ers", "76人"],
  PHO: ["Phoenix Suns", "太阳"],
  POR: ["Portland Trail Blazers", "开拓者"],
  SAC: ["Sacramento Kings", "国王"],
  KCK: ["Kansas City Kings", "国王"],
  KCO: ["Kansas City-Omaha Kings", "国王"],
  CIN: ["Cincinnati Royals", "国王"],
  NOJ: ["New Orleans Jazz", "爵士"],
  SAS: ["San Antonio Spurs", "马刺"],
  TOR: ["Toronto Raptors", "猛龙"],
  UTA: ["Utah Jazz", "爵士"],
  WAS: ["Washington Wizards", "奇才"],
  WSB: ["Washington Bullets", "奇才"]
};

const TEAM_ERAS = [
  ["ATL", "Atlanta Hawks", "老鹰", 1980, 2026],
  ["BOS", "Boston Celtics", "凯尔特人", 1980, 2026],
  ["NJN", "New Jersey Nets", "篮网", 1980, 2012],
  ["BRK", "Brooklyn Nets", "篮网", 2013, 2026],
  ["CHH", "Charlotte Hornets", "黄蜂", 1989, 2002],
  ["CHA", "Charlotte Bobcats", "山猫", 2005, 2014],
  ["CHO", "Charlotte Hornets", "黄蜂", 2015, 2026],
  ["CHI", "Chicago Bulls", "公牛", 1980, 2026],
  ["CLE", "Cleveland Cavaliers", "骑士", 1980, 2026],
  ["DAL", "Dallas Mavericks", "独行侠", 1981, 2026],
  ["DEN", "Denver Nuggets", "掘金", 1980, 2026],
  ["DET", "Detroit Pistons", "活塞", 1980, 2026],
  ["GSW", "Golden State Warriors", "勇士", 1980, 2026],
  ["HOU", "Houston Rockets", "火箭", 1980, 2026],
  ["IND", "Indiana Pacers", "步行者", 1980, 2026],
  ["SDC", "San Diego Clippers", "快船", 1980, 1984],
  ["LAC", "Los Angeles Clippers", "快船", 1985, 2026],
  ["LAL", "Los Angeles Lakers", "湖人", 1980, 2026],
  ["VAN", "Vancouver Grizzlies", "灰熊", 1996, 2001],
  ["MEM", "Memphis Grizzlies", "灰熊", 2002, 2026],
  ["MIA", "Miami Heat", "热火", 1989, 2026],
  ["MIL", "Milwaukee Bucks", "雄鹿", 1980, 2026],
  ["MIN", "Minnesota Timberwolves", "森林狼", 1990, 2026],
  ["NOH", "New Orleans Hornets", "鹈鹕", 2003, 2005],
  ["NOK", "New Orleans/Oklahoma City Hornets", "鹈鹕", 2006, 2007],
  ["NOH", "New Orleans Hornets", "鹈鹕", 2008, 2013],
  ["NOP", "New Orleans Pelicans", "鹈鹕", 2014, 2026],
  ["NYK", "New York Knicks", "尼克斯", 1980, 2026],
  ["SEA", "Seattle SuperSonics", "雷霆", 1980, 2008],
  ["OKC", "Oklahoma City Thunder", "雷霆", 2009, 2026],
  ["ORL", "Orlando Magic", "魔术", 1990, 2026],
  ["PHI", "Philadelphia 76ers", "76人", 1980, 2026],
  ["PHO", "Phoenix Suns", "太阳", 1980, 2026],
  ["POR", "Portland Trail Blazers", "开拓者", 1980, 2026],
  ["KCK", "Kansas City Kings", "国王", 1980, 1985],
  ["SAC", "Sacramento Kings", "国王", 1986, 2026],
  ["SAS", "San Antonio Spurs", "马刺", 1980, 2026],
  ["TOR", "Toronto Raptors", "猛龙", 1996, 2026],
  ["UTA", "Utah Jazz", "爵士", 1980, 2026],
  ["WSB", "Washington Bullets", "奇才", 1980, 1997],
  ["WAS", "Washington Wizards", "奇才", 1998, 2026]
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function decodeHtml(value) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&ntilde;/g, "ñ")
    .replace(/&eacute;/g, "é")
    .replace(/&Eacute;/g, "É")
    .replace(/&uuml;/g, "ü")
    .replace(/&ouml;/g, "ö")
    .replace(/&aacute;/g, "á")
    .replace(/&iacute;/g, "í")
    .replace(/&oacute;/g, "ó")
    .replace(/&ccedil;/g, "ç")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function decadeForSeasonEnd(year) {
  if (year >= 2020) return "2020s";
  if (year >= 2010) return "2010s";
  if (year >= 2000) return "2000s";
  if (year >= 1990) return "1990s";
  if (year >= 1980) return "1980s";
  return "1970s";
}

function normalizePosition(pos) {
  const cleaned = decodeHtml(pos).toUpperCase();
  if (!cleaned) return ["SF"];
  const parts = cleaned.split(/[-/]/).map((item) => item.trim()).filter(Boolean);
  const mapped = parts
    .map((item) => {
      if (item === "G") return ["PG", "SG"];
      if (item === "F") return ["SF", "PF"];
      if (item === "C") return ["C"];
      if (["PG", "SG", "SF", "PF"].includes(item)) return [item];
      return [];
    })
    .flat();
  return [...new Set(mapped.length ? mapped : ["SF"])];
}

function parseRoster(html) {
  const tableMatch = html.match(/<table[\s\S]*?id="roster"[\s\S]*?<\/table>/i);
  if (!tableMatch) return [];
  const rows = [...tableMatch[0].matchAll(/<tr[\s\S]*?<\/tr>/gi)].map((match) => match[0]);
  return rows
    .map((row) => {
      const playerMatch = row.match(/data-stat="player"[\s\S]*?>([\s\S]*?)<\/(?:td|th)>/i);
      const posMatch = row.match(/data-stat="pos"[\s\S]*?>([\s\S]*?)<\/(?:td|th)>/i);
      if (!playerMatch) return null;
      const name = decodeHtml(playerMatch[1]);
      if (!name || name === "Player") return null;
      return {
        name,
        positions: normalizePosition(posMatch ? posMatch[1] : "")
      };
    })
    .filter(Boolean);
}

async function fetchRoster(teamCode, seasonEnd) {
  const url = `https://www.basketball-reference.com/teams/${teamCode}/${seasonEnd}.html`;
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9"
    }
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return parseRoster(await response.text());
}

function makeKey(team, decade, player) {
  return `${team}|${decade}|${cleanPlayerName(player)}`;
}

function cleanPlayerName(name) {
  return String(name || "")
    .replace(/\*/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseCsvLine(line) {
  const cells = [];
  let current = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];
    if (char === '"' && quoted && next === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      cells.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  cells.push(current);
  return cells.map((cell) => cell.trim());
}

function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter((line) => line.trim());
  const headers = parseCsvLine(lines.shift()).map((header) => header.trim());
  return lines.map((line) => {
    const cells = parseCsvLine(line);
    return Object.fromEntries(headers.map((header, index) => [header, cells[index] || ""]));
  });
}

function splitList(value) {
  return String(value || "")
    .split(/[|;/]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeCsvRows(rows) {
  return rows
    .map((row) => {
      const team = row.team || row.Team || row.teamName || row.TEAM;
      const teamCn = row.teamCn || row.team_cn || row.TeamCn || team;
      const name = row.name || row.player || row.Player || row.PLAYER;
      const decade = row.decade || row.Decade || row.DECADE;
      const seasonValues = splitList(row.seasons || row.Seasons || row.season || row.Season).map(Number).filter(Boolean);
      const positions = splitList(row.positions || row.position || row.Pos || row.POS).flatMap(normalizePosition);
      if (!team || !name || !decade) return null;
      return {
        name,
        team,
        teamCn,
        decade,
        positions: [...new Set(positions.length ? positions : ["SF"])],
        seasons: seasonValues,
        source: row.source || "CSV import"
      };
    })
    .filter(Boolean);
}

function writePlayers(players, meta = "") {
  const payload = `// Generated by tools/build-full-rosters.js\n${meta ? `// ${meta}\n` : ""}window.FULL_ROSTER_PLAYERS = ${JSON.stringify(players, null, 2)};\n`;
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, payload, "utf8");
  console.log(`Wrote ${players.length} player-team-decade records to ${OUTPUT_FILE}`);
}

function numberValue(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function emptyStats() {
  return {
    games: 0,
    starts: 0,
    minutes: 0,
    points: 0,
    rebounds: 0,
    assists: 0,
    steals: 0,
    blocks: 0,
    winShares: 0,
    vorp: 0,
    bpm: 0
  };
}

function addRowStats(target, row) {
  target.games += numberValue(row.G);
  target.starts += numberValue(row.GS);
  target.minutes += numberValue(row.MP);
  target.points += numberValue(row.PTS);
  target.rebounds += numberValue(row.TRB);
  target.assists += numberValue(row.AST);
  target.steals += numberValue(row.STL);
  target.blocks += numberValue(row.BLK);
  target.winShares += numberValue(row.WS);
  target.vorp += numberValue(row.VORP);
  target.bpm += numberValue(row.BPM) * Math.max(1, numberValue(row.MP));
}

function finalizeStats(stats) {
  const bpm = stats.minutes ? stats.bpm / stats.minutes : 0;
  return {
    games: Math.round(stats.games),
    starts: Math.round(stats.starts),
    minutes: Math.round(stats.minutes),
    points: Math.round(stats.points),
    rebounds: Math.round(stats.rebounds),
    assists: Math.round(stats.assists),
    steals: Math.round(stats.steals),
    blocks: Math.round(stats.blocks),
    winShares: Math.round(stats.winShares * 10) / 10,
    vorp: Math.round(stats.vorp * 10) / 10,
    bpm: Math.round(bpm * 10) / 10
  };
}

function impactScore(stats, seasons) {
  return (
    stats.winShares * 9 +
    stats.vorp * 18 +
    stats.minutes / 120 +
    stats.points / 180 +
    stats.rebounds / 150 +
    stats.assists / 140 +
    (stats.steals + stats.blocks) / 45 +
    Math.min(60, new Set(seasons).size * 8)
  );
}

function impactTier(score) {
  if (score >= 260) return "core";
  if (score >= 95) return "rotation";
  return "depth";
}

function normalizeSeasonStatsRows(rows) {
  const byPlayer = new Map();
  rows.forEach((row) => {
    const year = Number(row.Year || row.year);
    const abbr = row.Tm || row.tm || row.Team;
      const name = cleanPlayerName(row.Player || row.player);
    const pos = row.Pos || row.pos || "";
    if (!year || year < 1970 || !abbr || abbr === "TOT" || !name || !TEAM_BY_ABBR[abbr]) return;
    const [team, teamCn] = TEAM_BY_ABBR[abbr];
    const decade = decadeForSeasonEnd(year);
    if (!["1970s", "1980s", "1990s", "2000s", "2010s", "2020s"].includes(decade)) return;
    const key = makeKey(team, decade, name);
    const positions = normalizePosition(pos);
    const existing = byPlayer.get(key);
    if (existing) {
      existing.seasons.push(year);
      existing.positions = [...new Set([...existing.positions, ...positions])];
      addRowStats(existing.rawStats, row);
      return;
    }
    const rawStats = emptyStats();
    addRowStats(rawStats, row);
    byPlayer.set(key, {
      name,
      team,
      teamCn,
      decade,
      positions,
      seasons: [year],
      rawStats,
      source: "seasons_stats.csv player-season-team rows"
    });
  });
  return [...byPlayer.values()]
    .map((player) => {
      const stats = finalizeStats(player.rawStats);
      const score = Math.round(impactScore(stats, player.seasons) * 10) / 10;
      const { rawStats, ...rest } = player;
      return {
        ...rest,
        stats,
        impactScore: score,
        impactTier: impactTier(score)
      };
    })
    .sort((a, b) => `${a.team}|${a.decade}|${a.name}`.localeCompare(`${b.team}|${b.decade}|${b.name}`));
}

async function main() {
  if (INPUT_CSV) {
    const players = normalizeCsvRows(parseCsv(fs.readFileSync(INPUT_CSV, "utf8"))).sort((a, b) =>
      `${a.team}|${a.decade}|${a.name}`.localeCompare(`${b.team}|${b.decade}|${b.name}`)
    );
    writePlayers(players, `Source: ${INPUT_CSV}`);
    return;
  }

  if (process.env.USE_SEASON_STATS !== "0") {
    let csvText = "";
    let source = SEASON_STATS_URL;
    if (SEASON_STATS_FILE) {
      source = SEASON_STATS_FILE;
      console.log(`Reading season stats CSV: ${SEASON_STATS_FILE}`);
      csvText = fs.readFileSync(SEASON_STATS_FILE, "utf8");
    } else {
      console.log(`Downloading season stats CSV: ${SEASON_STATS_URL}`);
      const response = await fetch(SEASON_STATS_URL, { headers: { "User-Agent": "codex" } });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      csvText = await response.text();
    }
    const players = normalizeSeasonStatsRows(parseCsv(csvText));
    writePlayers(players, `Source: ${source}`);
    return;
  }

  const byPlayer = new Map();
  let requested = 0;
  let skipped = 0;

  for (const [code, team, teamCn, from, to] of TEAM_ERAS) {
    const start = Math.max(from, START_SEASON_END);
    const end = Math.min(to, END_SEASON_END);
    for (let seasonEnd = start; seasonEnd <= end; seasonEnd += 1) {
      requested += 1;
      try {
        const roster = await fetchRoster(code, seasonEnd);
        const decade = decadeForSeasonEnd(seasonEnd);
        roster.forEach((player) => {
          const key = makeKey(team, decade, player.name);
          const existing = byPlayer.get(key);
          if (existing) {
            existing.seasons.push(seasonEnd);
            existing.positions = [...new Set([...existing.positions, ...player.positions])];
            return;
          }
          byPlayer.set(key, {
            name: player.name,
            team,
            teamCn,
            decade,
            positions: player.positions,
            seasons: [seasonEnd],
            source: "Basketball Reference roster pages"
          });
        });
        console.log(`${code} ${seasonEnd}: ${roster.length}`);
      } catch (error) {
        skipped += 1;
        console.warn(`${code} ${seasonEnd}: ${error.message}`);
      }
      await sleep(REQUEST_DELAY_MS);
    }
  }

  const players = [...byPlayer.values()].sort((a, b) =>
    `${a.team}|${a.decade}|${a.name}`.localeCompare(`${b.team}|${b.decade}|${b.name}`)
  );
  writePlayers(players, "Source: Basketball Reference team roster pages.");
  console.log(`Requested ${requested} team seasons; skipped ${skipped}.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
