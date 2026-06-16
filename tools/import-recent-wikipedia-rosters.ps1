param(
  [int]$StartSeasonEnd = 2022,
  [int]$EndSeasonEnd = 2026,
  [string]$InputFile = "data/recent-rosters.js",
  [string]$OutputFile = "data/recent-rosters.js",
  [switch]$Reset
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
  return ((Convert-HtmlText $value) -replace "\*", "" -replace "[†‡≠]+", "" -replace "\s+", " ").Trim()
}

function ConvertTo-Positions([string]$value) {
  $text = Convert-HtmlText $value
  $positions = @()
  if ($text -match "PG") { $positions += "PG" }
  if ($text -match "SG") { $positions += "SG" }
  if ($text -match "SF") { $positions += "SF" }
  if ($text -match "PF") { $positions += "PF" }
  if ($text -match "\bC\b|Center") { $positions += "C" }
  if (-not $positions.Count -and $text -match "\bG\b|Guard") { $positions += @("PG", "SG") }
  if (-not $positions.Count -and $text -match "\bF\b|Forward") { $positions += @("SF", "PF") }
  if (-not $positions.Count) { $positions += "SF" }
  return @($positions | Select-Object -Unique)
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
  $anchors = @('id="Player_statistics"', 'id="Regular_season_2"', 'id="Regular_season"')
  $seen = @{}
  $rows = @()
  foreach ($anchor in $anchors) {
    $idx = $html.IndexOf($anchor)
    if ($idx -lt 0) { continue }
    $tableStart = $html.IndexOf("<table", $idx)
    if ($tableStart -lt 0 -or $seen.ContainsKey($tableStart)) { continue }
    $tableEnd = $html.IndexOf("</table>", $tableStart)
    if ($tableEnd -lt 0) { continue }
    $seen[$tableStart] = $true
    $table = $html.Substring($tableStart, $tableEnd - $tableStart)
    $rows += [regex]::Matches($table, "<tr[\s\S]*?</tr>") | ForEach-Object { $_.Value }
  }
  return $rows
}

function Parse-PlayerRows([string]$html) {
  $rows = Get-RegularSeasonRows $html
  $players = @()
  foreach ($row in $rows) {
    $cells = [regex]::Matches($row, "<t[dh][^>]*>[\s\S]*?</t[dh]>") | ForEach-Object { $_.Value }
    if ($cells.Count -lt 9) { continue }
    $name = Convert-PlayerName $cells[0]
    if (-not $name -or $name -eq "Player") { continue }
    $cellTexts = @($cells | ForEach-Object { Convert-HtmlText $_ })
    $hasPositionColumn = $cellTexts.Count -gt 1 -and $cellTexts[1] -match "^(PG|SG|SF|PF|C|G|F|G/F|F/C|Guard|Forward|Center)$"

    $positions = @("SF")
    $games = 0
    $starts = 0
    $minutes = 0
    $points = 0
    $rebounds = 0
    $assists = 0
    $steals = 0
    $blocks = 0

    if ($hasPositionColumn) {
      $positions = ConvertTo-Positions $cells[1]
      $games = Convert-Number $cells[2]
      $starts = Convert-Number $cells[3]
      if ($cells.Count -ge 13) {
        $minutes = [math]::Round($games * (Convert-Number $cells[4]))
        $rebounds = [math]::Round($games * (Convert-Number $cells[8]))
        $assists = [math]::Round($games * (Convert-Number $cells[9]))
        $steals = [math]::Round($games * (Convert-Number $cells[10]))
        $blocks = [math]::Round($games * (Convert-Number $cells[11]))
        $points = [math]::Round($games * (Convert-Number $cells[12]))
      } else {
        $minutes = [math]::Round((Convert-Number $cells[4]))
        $rebounds = [math]::Round((Convert-Number $cells[5]))
        $assists = [math]::Round((Convert-Number $cells[6]))
        $steals = [math]::Round((Convert-Number $cells[7]))
        $blocks = [math]::Round((Convert-Number $cells[8]))
        $points = [math]::Round((Convert-Number $cells[9]))
      }
    } elseif ($cells.Count -ge 12) {
      $games = Convert-Number $cells[1]
      $starts = Convert-Number $cells[2]
      $minutes = [math]::Round($games * (Convert-Number $cells[3]))
      $rebounds = [math]::Round($games * (Convert-Number $cells[7]))
      $assists = [math]::Round($games * (Convert-Number $cells[8]))
      $steals = [math]::Round($games * (Convert-Number $cells[9]))
      $blocks = [math]::Round($games * (Convert-Number $cells[10]))
      $points = [math]::Round($games * (Convert-Number $cells[11]))
    } else {
      $games = Convert-Number $cells[1]
      $starts = Convert-Number $cells[2]
      $minutes = [math]::Round((Convert-Number $cells[3]))
      $rebounds = [math]::Round((Convert-Number $cells[4]))
      $assists = [math]::Round((Convert-Number $cells[5]))
      $steals = [math]::Round((Convert-Number $cells[6]))
      $blocks = [math]::Round((Convert-Number $cells[7]))
      $points = [math]::Round((Convert-Number $cells[8]))
    }

    if ($games -le 0) { continue }

    $players += [pscustomobject]@{
      Name = $name
      Positions = $positions
      Games = $games
      Starts = $starts
      Minutes = $minutes
      Points = $points
      Rebounds = $rebounds
      Assists = $assists
      Steals = $steals
      Blocks = $blocks
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

$records = @()
if (-not $Reset) {
  $raw = Get-Content -LiteralPath $InputFile -Raw -Encoding UTF8
  $match = [regex]::Match($raw, "window\.(?:FULL_ROSTER_PLAYERS|RECENT_ROSTER_PLAYERS)\s*=\s*(\[[\s\S]*\]);?")
  $json = $match.Groups[1].Value
  $records = @($json | ConvertFrom-Json)
  $records = @($records | ForEach-Object {
    if ($_.PSObject.Properties["value"] -and $_.PSObject.Properties["Count"]) {
      $_.value
    } else {
      $_
    }
  })
}
$byKey = @{}
foreach ($record in $records) {
  if (-not $record.name -or -not $record.team -or -not $record.decade) { continue }
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
        $minutes = [math]::Round($player.Minutes)
        $points = [math]::Round($player.Points)
        $rebounds = [math]::Round($player.Rebounds)
        $assists = [math]::Round($player.Assists)
        $steals = [math]::Round($player.Steals)
        $blocks = [math]::Round($player.Blocks)
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
            positions = @($player.Positions)
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

$output = @($byKey.Values.GetEnumerator() | Sort-Object team, decade, name)
$payload = "// Generated by tools/import-recent-wikipedia-rosters.ps1`n// Source: Wikipedia season pages through $EndSeasonEnd.`nwindow.RECENT_ROSTER_PLAYERS = " + ($output | ConvertTo-Json -Depth 20) + ";`n"
Set-Content -LiteralPath $OutputFile -Value $payload -Encoding UTF8
Write-Host "Wrote $($output.Count) records to $OutputFile; added $addedRows rows, updated $updatedRows rows."
