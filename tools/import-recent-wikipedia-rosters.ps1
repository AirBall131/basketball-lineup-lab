param(
  [int]$StartSeasonEnd = 2022,
  [int]$EndSeasonEnd = 2026,
  [string]$InputFile = "data/recent-rosters.js",
  [string]$OutputFile = "data/recent-rosters.js"
)

$ErrorActionPreference = "Stop"
if ($StartSeasonEnd -gt $EndSeasonEnd) {
  throw "StartSeasonEnd must be less than or equal to EndSeasonEnd."
}

$teams = @(
  @{ Name = "Atlanta Hawks"; Page = "Atlanta_Hawks" },
  @{ Name = "Boston Celtics"; Page = "Boston_Celtics" },
  @{ Name = "Brooklyn Nets"; Page = "Brooklyn_Nets" },
  @{ Name = "Charlotte Hornets"; Page = "Charlotte_Hornets" },
  @{ Name = "Chicago Bulls"; Page = "Chicago_Bulls" },
  @{ Name = "Cleveland Cavaliers"; Page = "Cleveland_Cavaliers" },
  @{ Name = "Dallas Mavericks"; Page = "Dallas_Mavericks" },
  @{ Name = "Denver Nuggets"; Page = "Denver_Nuggets" },
  @{ Name = "Detroit Pistons"; Page = "Detroit_Pistons" },
  @{ Name = "Golden State Warriors"; Page = "Golden_State_Warriors" },
  @{ Name = "Houston Rockets"; Page = "Houston_Rockets" },
  @{ Name = "Indiana Pacers"; Page = "Indiana_Pacers" },
  @{ Name = "Los Angeles Clippers"; Page = "Los_Angeles_Clippers" },
  @{ Name = "Los Angeles Lakers"; Page = "Los_Angeles_Lakers" },
  @{ Name = "Memphis Grizzlies"; Page = "Memphis_Grizzlies" },
  @{ Name = "Miami Heat"; Page = "Miami_Heat" },
  @{ Name = "Milwaukee Bucks"; Page = "Milwaukee_Bucks" },
  @{ Name = "Minnesota Timberwolves"; Page = "Minnesota_Timberwolves" },
  @{ Name = "New Orleans Pelicans"; Page = "New_Orleans_Pelicans" },
  @{ Name = "New York Knicks"; Page = "New_York_Knicks" },
  @{ Name = "Oklahoma City Thunder"; Page = "Oklahoma_City_Thunder" },
  @{ Name = "Orlando Magic"; Page = "Orlando_Magic" },
  @{ Name = "Philadelphia 76ers"; Page = "Philadelphia_76ers" },
  @{ Name = "Phoenix Suns"; Page = "Phoenix_Suns" },
  @{ Name = "Portland Trail Blazers"; Page = "Portland_Trail_Blazers" },
  @{ Name = "Sacramento Kings"; Page = "Sacramento_Kings" },
  @{ Name = "San Antonio Spurs"; Page = "San_Antonio_Spurs" },
  @{ Name = "Toronto Raptors"; Page = "Toronto_Raptors" },
  @{ Name = "Utah Jazz"; Page = "Utah_Jazz" },
  @{ Name = "Washington Wizards"; Page = "Washington_Wizards" }
)

function ConvertTo-Decade([int]$seasonEnd) {
  if ($seasonEnd -ge 2020) { return "2020s" }
  if ($seasonEnd -ge 2010) { return "2010s" }
  if ($seasonEnd -ge 2000) { return "2000s" }
  if ($seasonEnd -ge 1990) { return "1990s" }
  if ($seasonEnd -ge 1980) { return "1980s" }
  return "1970s"
}

function ConvertTo-SeasonSlug([int]$seasonEnd) {
  $start = $seasonEnd - 1
  $suffix = ($seasonEnd % 100).ToString("00")
  return "$start%E2%80%93$suffix"
}

function Convert-HtmlText([string]$value) {
  $text = [regex]::Replace($value, "<sup[\s\S]*?</sup>", "")
  $text = [regex]::Replace($text, "<[^>]+>", "")
  $text = [System.Net.WebUtility]::HtmlDecode($text)
  return ($text -replace "\s+", " ").Trim()
}

function Convert-PlayerName([string]$value) {
  return ((Convert-HtmlText $value) -replace "\*", "" -replace "\s+", " ").Trim()
}

function Convert-Number([string]$value) {
  $text = (Convert-HtmlText $value) -replace "%", ""
  $number = 0.0
  if ([double]::TryParse($text, [Globalization.NumberStyles]::Float, [Globalization.CultureInfo]::InvariantCulture, [ref]$number)) {
    return $number
  }
  return 0
}

function Get-RegularSeasonRows([string]$html) {
  $idx = $html.IndexOf('id="Regular_season_2"')
  if ($idx -lt 0) { $idx = $html.IndexOf('id="Regular_season"') }
  if ($idx -lt 0) {
    $statsIdx = $html.IndexOf('id="Player_statistics"')
    if ($statsIdx -ge 0) {
      $regularAfterStats = $html.IndexOf('Regular season', $statsIdx)
      if ($regularAfterStats -ge 0) { $idx = $regularAfterStats }
    }
  }
  if ($idx -lt 0) { return @() }
  $tableStart = $html.IndexOf("<table", $idx)
  if ($tableStart -lt 0) { return @() }
  $tableEnd = $html.IndexOf("</table>", $tableStart)
  if ($tableEnd -lt 0) { return @() }
  $table = $html.Substring($tableStart, $tableEnd - $tableStart)
  return [regex]::Matches($table, "<tr[\s\S]*?</tr>") | ForEach-Object { $_.Value }
}

function Parse-PlayerRows([string]$html) {
  $rows = Get-RegularSeasonRows $html
  $players = @()
  foreach ($row in $rows) {
    $cells = [regex]::Matches($row, "<t[dh][^>]*>[\s\S]*?</t[dh]>") | ForEach-Object { $_.Value }
    if ($cells.Count -lt 12) { continue }
    $name = Convert-PlayerName $cells[0]
    if (-not $name -or $name -eq "Player") { continue }
    $players += [pscustomobject]@{
      Name = $name
      Games = Convert-Number $cells[1]
      Starts = Convert-Number $cells[2]
      Mpg = Convert-Number $cells[3]
      Rpg = Convert-Number $cells[7]
      Apg = Convert-Number $cells[8]
      Spg = Convert-Number $cells[9]
      Bpg = Convert-Number $cells[10]
      Ppg = Convert-Number $cells[11]
    }
  }
  return $players
}

function Get-Key($record) {
  return "$($record.team)|$($record.decade)|$($record.name)"
}

function Get-NumberProperty($object, [string]$name) {
  if ($null -eq $object) { return 0 }
  $property = $object.PSObject.Properties[$name]
  if ($null -eq $property -or $null -eq $property.Value) { return 0 }
  return [double]$property.Value
}

$raw = Get-Content -LiteralPath $InputFile -Raw -Encoding UTF8
$match = [regex]::Match($raw, "window\.(?:FULL_ROSTER_PLAYERS|RECENT_ROSTER_PLAYERS)\s*=\s*(\[[\s\S]*\]);?")
$json = $match.Groups[1].Value
$records = @($json | ConvertFrom-Json)
$byKey = @{}
foreach ($record in $records) {
  $byKey[(Get-Key $record)] = $record
}

$addedRows = 0
$updatedRows = 0

foreach ($seasonEnd in $StartSeasonEnd..$EndSeasonEnd) {
  $seasonSlug = ConvertTo-SeasonSlug $seasonEnd
  foreach ($team in $teams) {
    $url = "https://en.wikipedia.org/wiki/$seasonSlug`_$($team.Page)_season"
    try {
      $html = (Invoke-WebRequest -Uri $url -UseBasicParsing -Headers @{ "User-Agent" = "Mozilla/5.0" }).Content
      $players = Parse-PlayerRows $html
      if (-not $players.Count) {
        Write-Warning "$seasonEnd $($team.Name): no rows"
        continue
      }
      foreach ($player in $players) {
        $decade = ConvertTo-Decade $seasonEnd
        $key = "$($team.Name)|$decade|$($player.Name)"
        $minutes = [math]::Round($player.Games * $player.Mpg)
        $points = [math]::Round($player.Games * $player.Ppg)
        $rebounds = [math]::Round($player.Games * $player.Rpg)
        $assists = [math]::Round($player.Games * $player.Apg)
        $steals = [math]::Round($player.Games * $player.Spg)
        $blocks = [math]::Round($player.Games * $player.Bpg)
        if ($byKey.ContainsKey($key)) {
          $record = $byKey[$key]
          if (@($record.seasons) -contains $seasonEnd) {
            continue
          }
          $record.seasons = @($record.seasons + $seasonEnd | Sort-Object -Unique)
          if (-not $record.stats) { $record | Add-Member -NotePropertyName stats -NotePropertyValue ([pscustomobject]@{}) }
          $record.stats.games = [math]::Round((Get-NumberProperty $record.stats "games") + $player.Games)
          $record.stats.starts = [math]::Round((Get-NumberProperty $record.stats "starts") + $player.Starts)
          $record.stats.minutes = [math]::Round((Get-NumberProperty $record.stats "minutes") + $minutes)
          $record.stats.points = [math]::Round((Get-NumberProperty $record.stats "points") + $points)
          $record.stats.rebounds = [math]::Round((Get-NumberProperty $record.stats "rebounds") + $rebounds)
          $record.stats.assists = [math]::Round((Get-NumberProperty $record.stats "assists") + $assists)
          $record.stats.steals = [math]::Round((Get-NumberProperty $record.stats "steals") + $steals)
          $record.stats.blocks = [math]::Round((Get-NumberProperty $record.stats "blocks") + $blocks)
          $record.source = "seasons_stats.csv + Wikipedia season pages"
          $updatedRows += 1
        } else {
          $byKey[$key] = [pscustomobject]@{
            name = $player.Name
            team = $team.Name
            teamCn = $team.Name
            decade = $decade
            positions = @("SF")
            seasons = @($seasonEnd)
            stats = [pscustomobject]@{
              games = [math]::Round($player.Games)
              starts = [math]::Round($player.Starts)
              minutes = $minutes
              points = $points
              rebounds = $rebounds
              assists = $assists
              steals = $steals
              blocks = $blocks
              winShares = 0
              vorp = 0
              bpm = 0
            }
            impactScore = [math]::Round(($minutes / 120) + ($points / 180) + ($rebounds / 150) + ($assists / 140) + (($steals + $blocks) / 45) + 8, 1)
            impactTier = "depth"
            source = "Wikipedia season pages"
          }
          $addedRows += 1
        }
      }
      Write-Host "$seasonEnd $($team.Name): $($players.Count)"
      Start-Sleep -Milliseconds 200
    } catch {
      Write-Warning "$seasonEnd $($team.Name): $($_.Exception.Message)"
    }
  }
}

$output = @($byKey.Values | Sort-Object team, decade, name)
$payload = "// Generated by tools/import-recent-wikipedia-rosters.ps1`n// Source: Wikipedia season pages through $EndSeasonEnd.`nwindow.RECENT_ROSTER_PLAYERS = " + ($output | ConvertTo-Json -Depth 20) + ";`n"
Set-Content -LiteralPath $OutputFile -Value $payload -Encoding UTF8
Write-Host "Wrote $($output.Count) records to $OutputFile; added $addedRows rows, updated $updatedRows rows."
