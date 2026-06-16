# NBA 阵容评价器

一个本地静态网页原型。玩家每轮先随机球队，再随机年代，然后从该球队该年代的候选球员名单里自主选择一名球员。重复五轮后，把五名球员摆放到 PG / SG / SF / PF / C，并生成阵容评价和 82 场常规赛胜场预测。

当前原型内置一套精选候选库，同时已经导入完整名单扩展文件：`data/full-rosters.js`。

完整名单数据来自公开球员赛季 CSV，按 `Year / Player / Pos / Tm` 聚合成“球队 + 年代 + 球员”。当前生成结果约 `12035` 条球员-球队-年代记录，覆盖 `1970` 到 `2021` 的球员出场球队数据。

最近赛季数据单独放在 `data/recent-rosters.js`，来自 Wikipedia 球队赛季页的常规赛球员统计表，补充 `2021-22` 到 `2025-26` 的出场球员。页面会同时读取 `data/full-rosters.js` 和 `data/recent-rosters.js`。

候选名单不会直接展示完整池里的所有人。每个“球队 + 年代”会先按累计影响力排序，再只展示前 `25` 名候选。排序参考累计赛季、出场、分钟、得分、篮板、助攻、抢断、盖帽、Win Shares、VORP，以及精选库里的手工强度评分。这样保留完整数据底盘，但玩家看到的是该队该年代最有代表性的前 25 人。

精选库中的明星版本会优先于完整名单模板版本，例如公牛 1990s 乔丹、魔术 1990s 奥尼尔会使用手工评分和专门简介，不会被完整名单里的普通模板覆盖。

## 完整名单生成

生成脚本在 `tools/build-full-rosters.js`。

默认模式会下载公开球员赛季 CSV 并聚合成“球队 + 年代 + 球员”：

```powershell
node tools\build-full-rosters.js
```

如果要改用自己的 CSV，可以这样导入：

```powershell
$env:INPUT_CSV="C:\path\to\full-rosters.csv"
node tools\build-full-rosters.js
```

CSV 支持字段：

```txt
team,teamCn,decade,name,positions,seasons
```

示例：

```csv
team,teamCn,decade,name,positions,seasons
Los Angeles Lakers,湖人,2020s,Austin Reaves,SG|PG,2022|2023|2024
```

生成后会写入 `data/full-rosters.js`，网页会自动读取。

补充最近赛季 Wikipedia 数据：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File tools\import-recent-wikipedia-rosters.ps1 -StartSeasonEnd 2022 -EndSeasonEnd 2026
```

生成后会写入 `data/recent-rosters.js`。

## 使用

直接用浏览器打开 `index.html`。

- 点击“随机球队”，再点击“随机年代”。
- 从候选球员名单里选择一名球员，点击“加入所选球员”。
- 重复五轮，生成五人阵容池。
- 在球场五个位置里选择球员。
- 点击“评价阵容”查看预测战绩、评分、优势、隐患和版本说明。
- 点击右上角的刷新图标可以载入一套示例超级阵容。

## 发布到 GitHub Pages

这个项目是纯静态网页，不需要安装依赖或构建。把仓库发布到 GitHub Pages 后，其他人就可以直接用链接打开游玩。

1. 在 GitHub 新建一个仓库，例如 `nba-lineup-lab`。
2. 上传当前项目里的所有文件，包括 `index.html`、`app.js`、`styles.css`、`data/`、`tools/`、`README.md` 和 `.nojekyll`。
3. 进入仓库的 `Settings` -> `Pages`。
4. `Source` 选择 `Deploy from a branch`。
5. `Branch` 选择 `main`，目录选择 `/(root)`，然后保存。
6. 等待 GitHub Pages 部署完成后，会得到类似这样的地址：

```txt
https://你的用户名.github.io/nba-lineup-lab/
```

如果之后更新了球员数据或页面代码，只要把改动提交并推送到 `main` 分支，GitHub Pages 会自动重新发布。

## 评价逻辑

评分不是只看五名球员总能力，而是综合：

- 球员在指定球队、指定年代里的版本强度。
- 位置适配和错位惩罚。
- 进攻空间、组织、半场攻坚和关键球。
- 防守体系、护框、外线领防、篮板和回合控制。
- 球权冲突、无球价值、健康、体能和阵容化学反应。

球员数据和评分规则都在 `app.js`，后续可以继续扩容球员池或调评分权重。
