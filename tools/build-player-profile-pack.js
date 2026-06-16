#!/usr/bin/env node

/**
 * Builds a curated profile pack for players who deserve a more personal note
 * than the stat-template fallback: current stars, classic stars, and high-impact
 * historical versions. It expands player-name seeds into the project key format:
 *   "Player Name|Current Franchise Name|Decade"
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUTPUT = path.join(ROOT, "data/player-profiles.js");

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

function profile(note, tags) {
  return {
    note,
    tags: ["明星版本", ...tags].slice(0, 5)
  };
}

const PROFILE_SEEDS = {
  "Nikola Jokic": profile(
    "进攻像一套移动操作系统，低位、手递手、短传和高位策应都能把防守拆开；只要他在中轴，普通跑位也会变成高质量机会。",
    ["高位策应", "低位终结", "进攻中轴", "篮板"]
  ),
  "Giannis Antetokounmpo": profile(
    "攻防转换和篮下冲击是压迫感核心，防守端还能覆盖协防和护框；空间要求不低，但一旦拉开，他会把禁区变成连续惩罚区。",
    ["转换冲击", "护框协防", "篮下压制", "持球突破"]
  ),
  "Luka Doncic": profile(
    "节奏、视野和错位惩罚极强，能用挡拆把弱侧防守逐步逼到崩溃；防守需要队友兜底，但半场进攻上限非常高。",
    ["挡拆大师", "节奏控制", "错位惩罚", "持球核心"]
  ),
  "Shai Gilgeous-Alexander": profile(
    "第一步、急停和造犯规结合得很细，能在不依赖大量三分的情况下稳定打穿中路；防守端臂展和判断也能制造额外回合。",
    ["中距离", "突破造杀伤", "外线防守", "高效得分"]
  ),
  "Jayson Tatum": profile(
    "大体型侧翼的投射、持球和换防价值兼具，能在强队体系里吃下大量高难度回合；手感波动时，无球和防守仍能托底。",
    ["大体型侧翼", "单打投射", "换防", "无球价值"]
  ),
  "Jaylen Brown": profile(
    "冲击力和强投能力让他能迅速抬高火力，防守端适合承担锋线硬对位；处理夹击还会起伏，但作为第二核心很有杀伤。",
    ["锋线冲击", "强投", "对位防守", "转换"]
  ),
  "Joel Embiid": profile(
    "低位体型、中距离手感和罚球压迫组成半场硬解，护框也能改变禁区尺度；健康和节奏适配是变量，上限仍是MVP级。",
    ["低位强攻", "中距离", "护框", "罚球压迫"]
  ),
  "Anthony Davis": profile(
    "防守覆盖面是最大卖点，能护框、延误、换防和收篮板；进攻端不必长期持球，也能靠顺下、错位和二次进攻高效输出。",
    ["防守核心", "护框换防", "顺下终结", "篮板"]
  ),
  "Jimmy Butler": profile(
    "季后赛强度下尤其可靠，靠对抗、造犯规、背身和关键回合阅读把比赛拖进自己的节奏；常规空间一般，但硬解含金量很高。",
    ["季后赛硬解", "造犯规", "锋线组织", "关键球"]
  ),
  "Damian Lillard": profile(
    "超远射程迫使防守从中线前就开始选择，挡拆后能投、能传、能造犯规；防守端需要保护，但进攻牵引力非常稀缺。",
    ["超远射程", "挡拆持球", "关键球", "进攻牵引"]
  ),
  "Kyrie Irving": profile(
    "控运和终结手感历史级，单点破局能力极强；他更适合在强核心旁边接管困难回合，让阵容多一层不可预测的进攻入口。",
    ["控运", "高难度终结", "单打", "关键球"]
  ),
  "James Harden": profile(
    "持球挡拆、后撤步和传弱侧的能力能长期支撑高产进攻；需要球权和空间配置，但一旦体系围绕他运转，火力极稳定。",
    ["持球大核", "后撤步", "挡拆传球", "造犯规"]
  ),
  "Russell Westbrook": profile(
    "爆发力、篮板推进和持续冲筐能把比赛速度拉满，适合需要能量和压迫的阵容；投射限制明显，但转换价值很高。",
    ["转换推进", "篮板后卫", "冲筐", "高能量"]
  ),
  "Chris Paul": profile(
    "挡拆阅读和节奏控制是教科书级别，中距离能惩罚沉退，传球能把队友放到最舒服的位置；体型吃亏但判断极稳。",
    ["控场", "挡拆阅读", "中距离", "组织"]
  ),
  "Kawhi Leonard": profile(
    "强壮侧翼身材配合中距离硬解和顶级对位防守，季后赛价值非常清晰；健康是唯一大变量，满状态时攻防都很难替代。",
    ["攻防一体", "中距离硬解", "领防", "季后赛"]
  ),
  "Paul George": profile(
    "高大侧翼的投射、持球和防守弹性都在线，既能当第二持球点，也能无球拉开；不必独占球权就能提升阵容质感。",
    ["侧翼投射", "换防", "第二持球点", "无球"]
  ),
  "Devin Booker": profile(
    "中距离、挡拆出球和无球投射兼具，能从纯得分手升级为半场组织点；防守不是强项，但进攻适配度很高。",
    ["中距离", "得分后卫", "挡拆出球", "无球投射"]
  ),
  "Donovan Mitchell": profile(
    "爆发第一步和强投能力给半场进攻兜底，季后赛能承担大量高压出手；身高限制防守弹性，但进攻爆点足够尖锐。",
    ["持球爆点", "强投", "突破", "季后赛火力"]
  ),
  "Jalen Brunson": profile(
    "脚步、节奏和身体对抗让他能在小体型里打出低位后卫的稳定性；挡拆和关键回合处理成熟，是半场硬解型控卫。",
    ["节奏大师", "低位后卫", "挡拆", "关键球"]
  ),
  "Tyrese Maxey": profile(
    "速度和外线手感结合得很干净，能把转换和半场挡拆都打快；组织还在成长，但作为第二攻击点的爆发力很亮。",
    ["速度", "外线投射", "转换", "第二攻击点"]
  ),
  "Trae Young": profile(
    "超远三分和抛投让挡拆防守两头为难，传球想象力能不断找到底角和顺下；防守短板明显，但进攻发动价值很高。",
    ["超远三分", "挡拆组织", "抛投", "进攻发动机"]
  ),
  "Ja Morant": profile(
    "禁区爆发力和空中调整极具冲击，能用突破迫使防线连续收缩；外线稳定性是变量，但持球杀伤能瞬间改变比赛节奏。",
    ["冲筐", "转换", "突破分球", "爆发力"]
  ),
  "Zion Williamson": profile(
    "体型、力量和第一步的组合非常少见，左路突破能稳定制造禁区崩塌；健康和空间配置决定上限，但篮下效率惊人。",
    ["篮下压制", "力量突破", "转换", "终结"]
  ),
  "Victor Wembanyama": profile(
    "夸张臂展让护框范围几乎改变投篮选择，进攻端还能持球、外弹和二次终结；成熟度仍在累积，但天赋上限独一档。",
    ["护框怪物", "外弹", "错位", "天赋上限"]
  ),
  "Anthony Edwards": profile(
    "强壮后卫体型配合爆发第一步和干拔，能在高强度对抗里制造硬解；防守投入上来时，攻防压迫感会同时提升。",
    ["强攻", "干拔", "外线防守", "爆发力"]
  ),
  "Karl-Anthony Towns": profile(
    "大个投射是核心差异点，能把五号位防守拉到三分线外；护框不是传统中锋水准，但进攻空间价值非常高。",
    ["空间内线", "三分", "低位", "篮板"]
  ),
  "Rudy Gobert": profile(
    "护框、篮板和掩护质量是体系级资产，能让外线防守更敢压迫；进攻自主性有限，但防守下限提升非常明显。",
    ["护框", "篮板", "掩护", "防守体系"]
  ),
  "Jamal Murray": profile(
    "挡拆投射和季后赛强投能力很硬，能在约基奇身边扮演最危险的外线惩罚点；健康稳定时是冠军级二当家。",
    ["挡拆投射", "季后赛", "强投", "二当家"]
  ),
  "Chet Holmgren": profile(
    "护框时机、外弹投射和直线处理球让他很适合现代五号位；对抗还会成长，但空间与防守覆盖已经能改变阵容形态。",
    ["护框", "外弹", "空间内线", "协防"]
  ),
  "Jalen Williams": profile(
    "大尺寸持球侧翼，突破、短传和对位防守都很成熟；不抢戏却能补齐许多高阶回合，是强队特别好用的连接点。",
    ["侧翼持球", "连接点", "防守", "效率"]
  ),
  "Bam Adebayo": profile(
    "换防、延误和短顺下处理球都很可靠，是现代防守体系的中轴；进攻不以三分拉开，但中距离和策应能接上回合。",
    ["换防中锋", "短顺下", "防守中轴", "中距离"]
  ),
  "De'Aaron Fox": profile(
    "速度和左手终结让他能持续攻击防线脚步，关键时刻中距离也很敢出手；外线牵制一般，但突破压力非常真实。",
    ["速度", "突破", "关键球", "转换"]
  ),
  "Domantas Sabonis": profile(
    "高位手递手、篮板和低位支点价值突出，能把射手和切入点串成连续进攻；护框有限，但进攻组织很有体系感。",
    ["高位策应", "手递手", "篮板", "低位支点"]
  ),
  "Alperen Sengun": profile(
    "低位脚步和传球灵感很突出，能像内线组织者一样带动弱侧；防守覆盖仍需阵容保护，但进攻创造力很稀有。",
    ["低位脚步", "内线策应", "传球", "篮下手感"]
  ),
  "Evan Mobley": profile(
    "协防、换防和护框覆盖很高级，进攻端靠顺下、二次进攻和短传补价值；若投射稳定，上限会进一步打开。",
    ["协防", "护框", "换防", "顺下"]
  ),
  "Darius Garland": profile(
    "控运、急停三分和挡拆传球让他能细腻地梳理半场；防守体型吃亏，但作为进攻组织点很有层次。",
    ["挡拆控卫", "急停三分", "传球", "节奏"]
  ),
  "Cade Cunningham": profile(
    "大体型控锋能用节奏和视野组织半场，身材也让他能看见更高的传球线路；效率仍会波动，但核心框架清楚。",
    ["大控锋", "组织", "节奏", "错位"]
  ),
  "Scottie Barnes": profile(
    "体型、传球和防守弹性是底色，能在多个位置切换职责；投射稳定性决定进攻上限，但全能感已经很突出。",
    ["全能锋线", "传球", "换防", "篮板"]
  ),
  "LaMelo Ball": profile(
    "传球视野和超前出球很有创造力，能用长传和提前量把比赛打成开放空间；健康和出手选择决定稳定性。",
    ["创造力", "长传", "持球投射", "节奏"]
  ),
  "Karl Malone": profile(
    "挡拆顺下、肘区中投和身体对抗长期稳定，能把常规赛产量拉到极高；季后赛硬解有争议，但前场下限非常厚。",
    ["挡拆终结", "中距离", "身体对抗", "耐久"]
  ),
  "David Robinson": profile(
    "运动能力、护框和面筐冲击在中锋里极少见，能同时撑起防守和转换；低位硬凿不是最稳，但攻防覆盖面巨大。",
    ["护框", "运动能力", "面筐", "防守核心"]
  ),
  "John Stockton": profile(
    "挡拆传球和抢断判断极其稳定，几乎不会浪费球权；个人攻坚不夸张，但能把半场进攻长期维持在高效率区间。",
    ["挡拆组织", "抢断", "控场", "低失误"]
  ),
  "Reggie Miller": profile(
    "无球跑动和接球投射会持续拉扯防线，关键时刻胆量极足；持球戏份不重，却能靠空间引力改变整套进攻。",
    ["无球投射", "空间牵引", "关键球", "跑动"]
  ),
  "Paul Pierce": profile(
    "节奏型单打、造犯规和中远距离投射让他很适合解决停滞回合；运动能力不炸裂，但脚步和对抗非常老练。",
    ["单打", "造犯规", "中距离", "关键球"]
  ),
  "Shawn Marion": profile(
    "无球空切、快攻、篮板和多位置防守都很强，几乎不需要战术照顾；投篮姿势特别，但空间和转换价值很真实。",
    ["无球", "转换", "篮板", "多位置防守"]
  ),
  "Patrick Ewing": profile(
    "低位跳投、护框和高强度对抗构成传统中锋核心，能长期支撑硬派半场球；面对极致空间阵容时机动性是考验。",
    ["低位", "护框", "中投", "对抗"]
  ),
  "Gary Payton": profile(
    "外线领防压迫感历史顶级，背身和组织也能给进攻足够支撑；不是纯射手，但能把对手后场消耗到变形。",
    ["领防", "背身后卫", "组织", "强硬"]
  ),
  "Julius Erving": profile(
    "翼侧起飞、转换终结和篮下创造力极具时代冲击，能把比赛变成开放空间；外线投射有限，但攻筐威胁很大。",
    ["转换", "空中终结", "侧翼核心", "冲筐"]
  ),
  "Sidney Moncrief": profile(
    "后卫线防守压迫和持球突破兼具，能在两端持续消耗对手核心；投射不是现代级别，但攻防平衡极佳。",
    ["后场领防", "突破", "攻防平衡", "强硬"]
  ),
  "Alex English": profile(
    "无声但高效的得分机器，中距离、快下和柔和手感让他长期稳定产分；防守不是卖点，但进攻产量非常扎实。",
    ["中距离", "高效得分", "快下", "稳定产量"]
  ),
  "Robert Parish": profile(
    "身高、耐久和中距离手感让他成为冠军阵容里的可靠中轴；不需要大量球权，却能用篮板和护框维持内线秩序。",
    ["耐久", "护框", "中距离", "篮板"]
  ),
  "Maurice Cheeks": profile(
    "控场稳、传球简洁、防守判断好，是冠军级后场的秩序维护者；个人爆点不大，但能让强阵容更少犯错。",
    ["控场", "后场防守", "低失误", "传球"]
  ),
  "Marc Gasol": profile(
    "高位策应、站位护框和防守指挥是核心价值，能把半场节奏降到自己熟悉的频率；进攻不爆炸但极会连接。",
    ["高位策应", "防守指挥", "护框", "中轴"]
  ),
  "Walt Frazier": profile(
    "大后卫体型、抢断判断和半场控场都很高级，进攻端能稳住节奏也能惩罚错位；是攻防都讲秩序的核心控卫。",
    ["控场", "抢断", "大后卫", "关键球"]
  ),
  "Charles Barkley": profile(
    "低重心爆发、篮板推进和内线效率非常夸张，能用四号位身材打出主攻锋线的压迫；防守端需要体系补位。",
    ["篮板推进", "低位强攻", "转换", "高效得分"]
  ),
  "Jason Kidd": profile(
    "推进、传球提前量和团队防守都很强，能把阵容速度和球权分配梳理清楚；早期投射一般，后期空间适配更好。",
    ["快攻组织", "传球", "篮板后卫", "防守"]
  ),
  "Allen Iverson": profile(
    "小体型里极致的持球爆破和高难度出手，能独自扛起大量回合；效率会被出手环境影响，但攻坚胆量极少见。",
    ["持球爆破", "高难度得分", "造杀伤", "核心火力"]
  ),
  "Chauncey Billups": profile(
    "节奏、强壮对抗和关键球投射让他很适合掌控慢节奏强队；数据不总是爆炸，但每个高压回合都很有分量。",
    ["控场", "关键球", "强壮后卫", "三分"]
  ),
  "Ben Wallace": profile(
    "篮板、护框、协防和换防弹性都是顶级防守资产，进攻端戏份很轻；放在强防守体系里能直接抬高下限。",
    ["护框", "篮板", "协防", "防守核心"]
  ),
  "Clyde Drexler": profile(
    "大后卫推进、滑翔式终结和侧翼组织都很强，能在转换里迅速打穿防线；外线不是唯一武器，全面性才是重点。",
    ["转换", "侧翼组织", "冲筐", "篮板"]
  ),
  "Rick Barry": profile(
    "投射、传球和得分判断很超前，既能自己处理高难度回合，也能靠视野带动队友；防守普通，但进攻脑子很清楚。",
    ["投射", "传球", "得分判断", "前锋核心"]
  ),
  "Manu Ginobili": profile(
    "左手突破、蛇形传球和无球切入让他总能制造意外收益；出场时间未必最大，但关键阶段的创造力很稀缺。",
    ["第六人核心", "突破传球", "无球切入", "关键球"]
  ),
  "Chris Mullin": profile(
    "左手侧翼投射和中距离手感极稳，处理球也足够聪明；运动能力不是卖点，但半场进攻里很少做错选择。",
    ["投射", "中距离", "侧翼处理球", "效率"]
  ),
  "Joe Dumars": profile(
    "强壮后卫防守和稳定跳投兼具，能在强硬系列赛里承担对位任务；不是夸张持球大核，却极适合冠军后场。",
    ["后场防守", "中距离", "三分", "冠军拼图"]
  ),
  "Tony Parker": profile(
    "速度、抛投和禁区终结让他能持续撕开防守第一线，挡拆后决策简洁；外线牵制一般，但突破效率很高。",
    ["速度", "抛投", "挡拆", "禁区终结"]
  ),
  "Yao Ming": profile(
    "低位手感、罚球和身高优势让半场进攻有稳定落点，护框存在感也很强；健康和换防范围限制了更高上限。",
    ["低位", "罚球", "护框", "中锋支点"]
  ),
  "Pau Gasol": profile(
    "低位脚步、高位传球和柔和中投让他很适合双塔或三角体系；对抗不是最硬，但球商和技术能稳定放大队友。",
    ["低位脚步", "高位策应", "中投", "团队篮球"]
  ),
  "Tracy McGrady": profile(
    "高大持球锋卫的干拔、突破和传球天赋都很华丽，巅峰时能从任何位置发起进攻；健康是遗憾，但上限极高。",
    ["干拔", "持球锋卫", "突破", "传球"]
  ),
  "Peja Stojakovic": profile(
    "大体型射手的无球跑动和接球三分能极大拉开空间，弱侧惩罚非常狠；防守普通，但进攻适配度很高。",
    ["无球三分", "空间", "接球投射", "弱侧惩罚"]
  ),
  "Chris Webber": profile(
    "高位策应、低位脚步和篮板推进让他像前场发动机，能把内线从终结点变成组织点；关键球稳定性是变量。",
    ["前场策应", "低位", "篮板推进", "传球"]
  ),
  "Dwight Howard": profile(
    "巅峰护框、篮板和顺下终结都是体系级武器，能把禁区防守抬到争冠水准；低位技巧有限，但身体压制巨大。",
    ["护框", "篮板", "顺下", "禁区压制"]
  ),
  "Vince Carter": profile(
    "弹跳终结、三分和持球得分组合让他既能打高光也能拉空间；防守专注度会波动，但进攻天赋非常完整。",
    ["扣篮终结", "三分", "持球得分", "侧翼火力"]
  ),
  "Amar'e Stoudemire": profile(
    "挡拆顺下爆发力和中距离手感让他在空间体系里极具杀伤，能把内线防守逼到不断退缩；护框不是主卖点。",
    ["挡拆终结", "爆发力", "中距离", "空间内线"]
  ),
  "Draymond Green": profile(
    "防守指挥、换防和短顺下传球让他成为小球体系的战术枢纽；个人得分有限，但能把强射手阵容完全串起来。",
    ["防守指挥", "换防", "短顺下", "小球中轴"]
  ),
  "Klay Thompson": profile(
    "顶级接球投射和无球跑动几乎不占球权，防守端还能对位强侧后卫；持球创造有限，但适配性极高。",
    ["接球投射", "无球跑动", "外线防守", "空间"]
  ),
  "Steve Nash": profile(
    "挡拆阅读、传球角度和投射效率历史级，能把空间体系运转到极致；防守需要保护，但进攻组织影响巨大。",
    ["挡拆大师", "投射", "传球", "进攻发动机"]
  ),
  "Nikola Vucevic": profile(
    "外弹投射、低位手感和防守篮板让他能在半场进攻里提供稳定支点；护框覆盖一般，但空间型中锋价值清楚。",
    ["空间中锋", "低位", "篮板", "外弹"]
  )
};

const PROFILE_ALIASES = {
  "Luka Dončić": "Luka Doncic",
  "Nikola Jokić": "Nikola Jokic",
  "Nikola Vučević": "Nikola Vucevic"
};

function cleanPlayerName(name) {
  return String(name || "").replace(/\*/g, "").replace(/\s+/g, " ").trim();
}

function getPlayerIdentityName(name) {
  return cleanPlayerName(name)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/Đ/g, "D")
    .replace(/đ/g, "d")
    .replace(/Ł/g, "L")
    .replace(/ł/g, "l")
    .replace(/Ø/g, "O")
    .replace(/ø/g, "o")
    .replace(/Þ/g, "Th")
    .replace(/þ/g, "th")
    .replace(/Æ/g, "AE")
    .replace(/æ/g, "ae")
    .replace(/Œ/g, "OE")
    .replace(/œ/g, "oe");
}

function getCurrentTeamName(team) {
  return CURRENT_TEAM_BY_NAME[team] || team;
}

function getPlayerKey(player) {
  return `${getPlayerIdentityName(player.name)}|${getCurrentTeamName(player.team)}|${player.decade}`;
}

function readBrowserArray(filePath, globalName) {
  if (!fs.existsSync(filePath)) return [];
  const src = fs.readFileSync(filePath, "utf8");
  const jsonStart = src.indexOf("[");
  const jsonEnd = src.lastIndexOf("]") + 1;
  if (jsonStart === -1 || jsonEnd === 0) {
    if (globalName) console.warn(`No array found for ${globalName}`);
    return [];
  }
  return JSON.parse(src.slice(jsonStart, jsonEnd));
}

function readCandidateSetVersions() {
  const src = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
  const versions = [];
  const setRegex = /addCandidateSet\("([^"]+)",\s*"[^"]*",\s*"([^"]+)",\s*\[([\s\S]*?)\]\s*\);/g;
  let setMatch;

  while ((setMatch = setRegex.exec(src)) !== null) {
    const team = setMatch[1];
    const decade = setMatch[2];
    const body = setMatch[3];
    extractObjectLiterals(body).forEach((objectSource) => {
      const nameMatch = objectSource.match(/name:\s*"([^"]+)"/);
      if (!nameMatch) return;
      versions.push({
        name: nameMatch[1],
        team,
        decade,
        hasExplicitNote: /(?:^|[\s,{])note\s*:/.test(objectSource),
        source: "app candidate set"
      });
    });
  }

  return versions;
}

function extractObjectLiterals(src) {
  const objects = [];
  let depth = 0;
  let start = -1;

  for (let i = 0; i < src.length; i++) {
    const char = src[i];
    if (char === "{") {
      if (depth === 0) start = i;
      depth++;
    } else if (char === "}") {
      depth--;
      if (depth === 0 && start !== -1) {
        objects.push(src.slice(start, i + 1));
        start = -1;
      }
    }
  }

  return objects;
}

function buildProfiles() {
  const fullRoster = readBrowserArray(path.join(ROOT, "data/full-rosters.js"), "FULL_ROSTER_PLAYERS");
  const recentRoster = readBrowserArray(path.join(ROOT, "data/recent-rosters.js"), "RECENT_ROSTER_PLAYERS");
  const candidateSets = readCandidateSetVersions();
  const entries = [...fullRoster, ...recentRoster, ...candidateSets];
  const profiles = {};

  entries.forEach((entry) => {
    const seed =
      PROFILE_SEEDS[entry.name] ||
      PROFILE_SEEDS[getPlayerIdentityName(entry.name)] ||
      PROFILE_SEEDS[PROFILE_ALIASES[entry.name]];
    if (!seed) return;

    const key = getPlayerKey(entry);
    const existing = profiles[key];
    if (existing && existing.force) return;

    profiles[key] = {
      note: seed.note,
      tags: seed.tags
    };

    if (entry.source === "app candidate set" && !entry.hasExplicitNote) {
      profiles[key].force = true;
    }
  });

  return Object.fromEntries(
    Object.entries(profiles).sort(([a], [b]) => a.localeCompare(b))
  );
}

function main() {
  const profiles = buildProfiles();
  const output =
    "// Generated by tools/build-player-profile-pack.js\n" +
    "// Curated profile pack for current stars and classic high-impact players.\n" +
    `// Profiles: ${Object.keys(profiles).length}\n` +
    `// Generated at: ${new Date().toISOString()}\n` +
    `window.PLAYER_PROFILES = ${JSON.stringify(profiles, null, 2)};\n`;

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, output, "utf8");
  console.log(`Wrote ${Object.keys(profiles).length} profiles to ${OUTPUT}`);
}

main();
