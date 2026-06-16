#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");

const stub = new Proxy(
  {
    addEventListener() {},
    removeEventListener() {},
    appendChild() {},
    setAttribute() {},
    removeAttribute() {},
    querySelector() {
      return stub;
    },
    querySelectorAll() {
      return [];
    },
    classList: {
      add() {},
      remove() {},
      toggle() {},
      contains() {
        return false;
      }
    },
    style: {},
    dataset: {}
  },
  {
    get(target, prop) {
      return prop in target ? target[prop] : "";
    },
    set(target, prop, value) {
      target[prop] = value;
      return true;
    }
  }
);

const context = {
  window: {
    location: { hash: "" }
  },
  console,
  document: {
    querySelector() {
      return stub;
    },
    querySelectorAll() {
      return [];
    },
    createElement() {
      return stub;
    },
    body: stub
  },
  localStorage: {
    getItem() {
      return null;
    },
    setItem() {}
  },
  setTimeout,
  clearTimeout
};

vm.createContext(context);

["data/full-rosters.js", "data/recent-rosters.js", "data/player-profiles.js", "app.js"].forEach((file) => {
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), "utf8"), context, { filename: file });
});

const report = vm.runInContext(
  `
(() => {
  const duplicates = [];
  for (const team of Object.keys(CURRENT_TEAM_FIRST_DECADE)) {
    for (const decade of DECADES) {
      const seen = new Map();
      for (const player of getAvailableCandidates(team, decade)) {
        const key = getPlayerIdentityName(player.name);
        if (seen.has(key)) {
          duplicates.push({ team, decade, name: player.name, prev: seen.get(key).name });
        } else {
          seen.set(key, player);
        }
      }
    }
  }

  return {
    duplicateCandidateNames: duplicates,
    stale2020sVersions: PLAYER_POOL.flatMap((player) => {
        const match = String(player.version || "").match(new RegExp("^(\\\\d{4})-(\\\\d{2})"));
        const seasons = player.seasons || [];
        if (!match || !seasons.includes(2026)) return [];
        const versionEnd = Number(match[2]);
        const actualEnd = Math.max(...seasons) % 100;
        if (versionEnd >= actualEnd) return [];
        return [{
          team: getCurrentTeamName(player.team),
          name: player.name,
          version: player.version,
          seasons
        }];
      })
      .sort((a, b) => (a.team + "|" + a.name).localeCompare(b.team + "|" + b.name)),
    recentRosterCount: window.RECENT_ROSTER_PLAYERS.length,
    recentTeamCounts: Object.fromEntries(
      Object.entries(window.RECENT_ROSTER_PLAYERS.reduce((acc, player) => {
        acc[player.team] = (acc[player.team] || 0) + 1;
        return acc;
      }, {})).sort()
    ),
    denverJokic: getAvailableCandidates("Denver Nuggets", "2020s")
      .filter((player) => /Joki/i.test(player.name))
      .map((player) => ({
        name: player.name,
        version: player.version,
        seasons: player.seasons,
        games: player.stats && player.stats.games,
        points: player.stats && player.stats.points
      })),
    spursWembanyama: getAvailableCandidates("San Antonio Spurs", "2020s")
      .filter((player) => player.name === "Victor Wembanyama")
      .map((player) => ({
        name: player.name,
        version: player.version,
        seasons: player.seasons,
        games: player.stats && player.stats.games,
        points: player.stats && player.stats.points
      }))
  };
})()
`,
  context
);

console.log(JSON.stringify(report, null, 2));

if (report.duplicateCandidateNames.length || report.stale2020sVersions.length) {
  process.exitCode = 1;
}
