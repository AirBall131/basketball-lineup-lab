const POSITIONS = ["PG", "SG", "SF", "PF", "C"];
const DECADES = ["1970s", "1980s", "1990s", "2000s", "2010s", "2020s"];
const MIN_CANDIDATES_FOR_ROLL = 8;
const MAX_CANDIDATES_PER_CONTEXT = 25;
const TEAM_CN_BY_NAME = {
  "Atlanta Hawks": "老鹰",
  "Boston Celtics": "凯尔特人",
  "Brooklyn Nets": "篮网",
  "New Jersey Nets": "篮网",
  "Charlotte Hornets": "黄蜂",
  "Charlotte Bobcats": "山猫",
  "Chicago Bulls": "公牛",
  "Cleveland Cavaliers": "骑士",
  "Dallas Mavericks": "独行侠",
  "Denver Nuggets": "掘金",
  "Detroit Pistons": "活塞",
  "Golden State Warriors": "勇士",
  "Houston Rockets": "火箭",
  "Indiana Pacers": "步行者",
  "Los Angeles Clippers": "快船",
  "San Diego Clippers": "快船",
  "Los Angeles Lakers": "湖人",
  "Memphis Grizzlies": "灰熊",
  "Vancouver Grizzlies": "灰熊",
  "Miami Heat": "热火",
  "Milwaukee Bucks": "雄鹿",
  "Minnesota Timberwolves": "森林狼",
  "New Orleans Pelicans": "鹈鹕",
  "New Orleans Hornets": "鹈鹕",
  "New York Knicks": "尼克斯",
  "Oklahoma City Thunder": "雷霆",
  "Seattle SuperSonics": "雷霆",
  "Orlando Magic": "魔术",
  "Philadelphia 76ers": "76人",
  "Phoenix Suns": "太阳",
  "Portland Trail Blazers": "开拓者",
  "Sacramento Kings": "国王",
  "Kansas City Kings": "国王",
  "San Antonio Spurs": "马刺",
  "Toronto Raptors": "猛龙",
  "Utah Jazz": "爵士",
  "Washington Wizards": "奇才",
  "Washington Bullets": "奇才",
  "Baltimore Bullets": "奇才",
  "Capital Bullets": "奇才"
};

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

const CURRENT_TEAM_FIRST_DECADE = {
  "Atlanta Hawks": "1970s",
  "Boston Celtics": "1970s",
  "Brooklyn Nets": "1970s",
  "Charlotte Hornets": "1980s",
  "Chicago Bulls": "1970s",
  "Cleveland Cavaliers": "1970s",
  "Dallas Mavericks": "1980s",
  "Denver Nuggets": "1970s",
  "Detroit Pistons": "1970s",
  "Golden State Warriors": "1970s",
  "Houston Rockets": "1970s",
  "Indiana Pacers": "1970s",
  "Los Angeles Clippers": "1970s",
  "Los Angeles Lakers": "1970s",
  "Memphis Grizzlies": "1990s",
  "Miami Heat": "1980s",
  "Milwaukee Bucks": "1970s",
  "Minnesota Timberwolves": "1990s",
  "New Orleans Pelicans": "2000s",
  "New York Knicks": "1970s",
  "Oklahoma City Thunder": "1970s",
  "Orlando Magic": "1990s",
  "Philadelphia 76ers": "1970s",
  "Phoenix Suns": "1970s",
  "Portland Trail Blazers": "1970s",
  "Sacramento Kings": "1970s",
  "San Antonio Spurs": "1970s",
  "Toronto Raptors": "1990s",
  "Utah Jazz": "1970s",
  "Washington Wizards": "1970s"
};

const PLAYER_CN_BY_NAME = {
  "Derrick Rose": "德里克罗斯",
  "Delon Wright": "德朗赖特",
  "Furkan Korkmaz": "科尔克马兹",
  "Shake Milton": "谢克米尔顿",
  "Mike Scott": "迈克斯科特",
  "Josh Richardson": "约什理查德森",
  "Raul Neto": "劳尔内托",
  "Tony Bradley": "托尼布拉德利",
  "Kyle O'Quinn": "奥奎因",
  "Trey Burke": "特雷伯克",
  "James Ennis III": "恩尼斯",
  "George Hill": "乔治希尔",
  "Rayjon Tucker": "塔克",
  "Paul Reed": "保罗里德",
  "A.C. Green": "艾西格林",
  "Deron Williams": "德隆威廉姆斯",
  "Spencer Dinwiddie": "丁威迪",
  "Rondae Hollis-Jefferson": "霍利斯杰弗森",
  "Kris Humphries": "亨弗里斯",
  "Jordan Farmar": "法玛尔",
  "Anthony Morrow": "莫罗",
  "Courtney Lee": "考特尼李",
  "Sasha Vujacic": "武贾西奇",
  "DeAndre Jordan": "小乔丹",
  "Tristan Thompson": "特里斯坦汤普森",
  "Kevin Love": "乐福",
  "Anderson Varejao": "瓦莱乔",
  "J.R. Smith": "史密斯",
  "Anthony Parker": "安东尼帕克",
  "Mo Williams": "莫威廉姆斯",
  "Amir Johnson": "阿米尔约翰逊",
  "Patrick Patterson": "帕特森",
  "Jose Calderon": "卡尔德隆",
  "Larry Nance Jr.": "小南斯",
  "Cedi Osman": "奥斯曼",
  "Andre Drummond": "德拉蒙德",
  "John Henson": "亨森",
  "Taurean Prince": "普林斯",
  "Dante Exum": "艾克萨姆",
  "Quinn Cook": "库克",
  "Matthew Dellavedova": "德拉维多瓦",
  "Yogi Ferrell": "费雷尔",
  "Thon Maker": "梅克",
  "Lou Williams": "路威",
  "Damion Lee": "达米恩李",
  "Marquese Chriss": "克里斯",
  "Juan Toscano-Anderson": "托斯卡诺安德森",
  "Eric Paschall": "帕斯卡尔",
  "Alec Burks": "伯克斯",
  "Willie Cauley-Stein": "考利斯坦",
  "Mychal Mulder": "穆尔德",
  "Kelly Oubre Jr.": "乌布雷",
  "Glenn Robinson III": "格伦罗宾逊",
  "Kent Bazemore": "贝兹莫尔",
  "Omari Spellman": "斯佩尔曼",
  "Gary Payton II": "小佩顿",
  "Brad Wanamaker": "沃纳梅克",
  "Nico Mannion": "曼尼恩",
  "Jeremy Pargo": "帕戈",
  "Chasson Randle": "兰德尔",
  "Ky Bowman": "鲍曼",
  "James Wiseman": "怀斯曼",
  "Alen Smailagić": "斯马伊拉吉奇",
  "Patrick Ewing": "尤因",
  "Allan Houston": "休斯顿",
  "Latrell Sprewell": "斯普雷威尔",
  "Marcus Camby": "坎比",
  "Larry Johnson": "拉里约翰逊",
  "Kurt Thomas": "科特托马斯",
  "Stephon Marbury": "马布里",
  "Jamal Crawford": "克劳福德",
  "LeBron James": "詹姆斯",
  "Stephen Curry": "库里",
  "Kevin Durant": "杜兰特",
  "Michael Jordan": "乔丹",
  "Shaquille O'Neal": "奥尼尔",
  "Kobe Bryant": "科比",
  "Tim Duncan": "邓肯",
  "Magic Johnson": "魔术师",
  "Larry Bird": "伯德",
  "Kareem Abdul-Jabbar": "贾巴尔",
  "Hakeem Olajuwon": "奥拉朱旺",
  "Nikola Jokic": "约基奇",
  "Giannis Antetokounmpo": "字母哥",
  "Luka Doncic": "东契奇",
  "Shai Gilgeous-Alexander": "亚历山大",
  "Jayson Tatum": "塔图姆",
  "Jaylen Brown": "杰伦布朗",
  "Joel Embiid": "恩比德",
  "Anthony Davis": "戴维斯",
  "Jimmy Butler": "巴特勒",
  "Damian Lillard": "利拉德",
  "Kyrie Irving": "欧文",
  "James Harden": "哈登",
  "Russell Westbrook": "威少",
  "Chris Paul": "保罗",
  "Kawhi Leonard": "莱昂纳德",
  "Paul George": "乔治",
  "Devin Booker": "布克",
  "Donovan Mitchell": "米切尔",
  "Jalen Brunson": "布伦森",
  "Tyrese Maxey": "马克西",
  "Trae Young": "特雷杨",
  "Ja Morant": "莫兰特",
  "Zion Williamson": "锡安",
  "Victor Wembanyama": "文班亚马",
  "Anthony Edwards": "爱德华兹",
  "Karl-Anthony Towns": "唐斯",
  "Rudy Gobert": "戈贝尔",
  "Jamal Murray": "穆雷",
  "Chet Holmgren": "霍姆格伦",
  "Jalen Williams": "杰伦威廉姆斯",
  "Bam Adebayo": "阿德巴约",
  "Tyler Herro": "希罗",
  "Dwyane Wade": "韦德",
  "Chris Bosh": "波什",
  "Draymond Green": "格林",
  "Klay Thompson": "克莱",
  "Andre Iguodala": "伊戈达拉",
  "Pau Gasol": "加索尔",
  "Dirk Nowitzki": "诺维茨基",
  "Steve Nash": "纳什",
  "Kevin Garnett": "加内特",
  "Allen Iverson": "艾弗森",
  "Vince Carter": "卡特",
  "Tracy McGrady": "麦迪",
  "Carmelo Anthony": "安东尼",
  "Dwight Howard": "霍华德",
  "Derrick White": "怀特",
  "Jrue Holiday": "霍勒迪",
  "Kristaps Porzingis": "波尔津吉斯",
  "Al Horford": "霍福德",
  "Austin Reaves": "里夫斯",
  "Alex Caruso": "卡鲁索",
  "D'Angelo Russell": "拉塞尔",
  "Rui Hachimura": "八村塁",
  "Kentavious Caldwell-Pope": "波普",
  "Isaiah Hartenstein": "哈尔滕施泰因",
  "Luguentz Dort": "多尔特",
  "Isaiah Joe": "以赛亚乔",
  "Josh Giddey": "吉迪",
  "Lu Dort": "多尔特",
  "Duncan Robinson": "邓肯罗宾逊",
  "Kyle Lowry": "洛瑞",
  "Goran Dragic": "德拉季奇",
  "Malik Monk": "蒙克",
  "Mikal Bridges": "布里奇斯",
  "Cam Johnson": "卡梅伦约翰逊",
  "OG Anunoby": "阿奴诺比",
  "Pascal Siakam": "西亚卡姆",
  "Fred VanVleet": "范弗利特",
  "Scottie Barnes": "巴恩斯",
  "LaMelo Ball": "拉梅洛鲍尔",
  "De'Aaron Fox": "福克斯",
  "Domantas Sabonis": "萨博尼斯",
  "Alperen Sengun": "申京",
  "Jalen Green": "杰伦格林",
  "Evan Mobley": "莫布里",
  "Darius Garland": "加兰",
  "Jarrett Allen": "贾勒特阿伦",
  "Cade Cunningham": "坎宁安"
};

const PLAYER_POOL = [
  {
    name: "Magic Johnson",
    team: "Los Angeles Lakers",
    teamCn: "湖人",
    decade: "1980s",
    version: "1986-87 湖人魔术师",
    positions: ["PG", "SF"],
    tags: ["历史级组织", "转换核心", "大体型控卫"],
    note: "进攻发动机和错位惩罚能力历史顶级，外线强投不是常规武器，但能把队友效率整体抬高。",
    ratings: { overall: 98, scoring: 88, creation: 99, shooting: 76, spacing: 73, defense: 78, rim: 55, rebounding: 82, offball: 84, health: 93, stamina: 96, clutch: 96, ball: 96, portability: 90 }
  },
  {
    name: "Kareem Abdul-Jabbar",
    team: "Los Angeles Lakers",
    teamCn: "湖人",
    decade: "1980s",
    version: "1980-85 湖人贾巴尔",
    positions: ["C"],
    tags: ["低位核心", "护框", "半场硬解"],
    note: "虽然不是雄鹿早期运动能力巅峰，但天勾稳定性、护框和季后赛价值仍是冠军中轴级别。",
    ratings: { overall: 96, scoring: 94, creation: 72, shooting: 65, spacing: 55, defense: 88, rim: 92, rebounding: 84, offball: 74, health: 88, stamina: 86, clutch: 93, ball: 72, portability: 84 }
  },
  {
    name: "Larry Bird",
    team: "Boston Celtics",
    teamCn: "凯尔特人",
    decade: "1980s",
    version: "1984-86 凯尔特人伯德",
    positions: ["SF", "PF"],
    tags: ["投射", "高位策应", "关键球"],
    note: "投射、传球、篮板和半场攻坚兼具，防守靠预判和站位，能让任何阵容更顺。",
    ratings: { overall: 98, scoring: 95, creation: 92, shooting: 96, spacing: 96, defense: 82, rim: 52, rebounding: 88, offball: 95, health: 88, stamina: 92, clutch: 98, ball: 85, portability: 97 }
  },
  {
    name: "Kevin McHale",
    team: "Boston Celtics",
    teamCn: "凯尔特人",
    decade: "1980s",
    version: "1986-87 凯尔特人麦克海尔",
    positions: ["PF", "C"],
    tags: ["低位脚步", "协防", "高效终结"],
    note: "低位单打和护框协防非常强，空间较传统，但不用大量球权也能高效输出。",
    ratings: { overall: 92, scoring: 91, creation: 62, shooting: 58, spacing: 48, defense: 88, rim: 84, rebounding: 82, offball: 80, health: 80, stamina: 82, clutch: 86, ball: 68, portability: 82 }
  },
  {
    name: "Isiah Thomas",
    team: "Detroit Pistons",
    teamCn: "活塞",
    decade: "1980s",
    version: "1988-89 活塞托马斯",
    positions: ["PG"],
    tags: ["突破", "组织", "强硬关键球"],
    note: "第一步、控运和关键球能力突出，能带动强硬半场体系，投射空间价值低于现代顶级后卫。",
    ratings: { overall: 93, scoring: 89, creation: 93, shooting: 76, spacing: 72, defense: 82, rim: 35, rebounding: 52, offball: 72, health: 88, stamina: 92, clutch: 95, ball: 91, portability: 82 }
  },
  {
    name: "Michael Jordan",
    team: "Chicago Bulls",
    teamCn: "公牛",
    decade: "1990s",
    version: "1990-93 公牛乔丹",
    positions: ["SG", "SF"],
    tags: ["历史级攻坚", "外线防守", "关键球"],
    note: "持球爆破、中距离、无球切入和防守压迫同时在线，是任何阵容的第一核心答案。",
    ratings: { overall: 100, scoring: 100, creation: 91, shooting: 84, spacing: 82, defense: 96, rim: 55, rebounding: 78, offball: 94, health: 95, stamina: 99, clutch: 100, ball: 92, portability: 96 }
  },
  {
    name: "Scottie Pippen",
    team: "Chicago Bulls",
    teamCn: "公牛",
    decade: "1990s",
    version: "1993-96 公牛皮蓬",
    positions: ["SF", "PG", "PF"],
    tags: ["领防", "组织前锋", "转换"],
    note: "顶级侧翼防守和副控，能补足核心身边的推进、协防和对位弹性。",
    ratings: { overall: 94, scoring: 82, creation: 88, shooting: 76, spacing: 73, defense: 98, rim: 68, rebounding: 82, offball: 86, health: 88, stamina: 94, clutch: 84, ball: 82, portability: 93 }
  },
  {
    name: "Hakeem Olajuwon",
    team: "Houston Rockets",
    teamCn: "火箭",
    decade: "1990s",
    version: "1993-95 火箭奥拉朱旺",
    positions: ["C"],
    tags: ["低位梦幻脚步", "护框", "换防弹性"],
    note: "攻防一体中锋巅峰，低位硬解和防守覆盖面积都是历史级，季后赛上限极高。",
    ratings: { overall: 99, scoring: 96, creation: 75, shooting: 67, spacing: 58, defense: 99, rim: 99, rebounding: 91, offball: 80, health: 91, stamina: 94, clutch: 96, ball: 78, portability: 91 }
  },
  {
    name: "Shaquille O'Neal",
    team: "Orlando Magic",
    teamCn: "魔术",
    decade: "1990s",
    version: "1994-95 魔术奥尼尔",
    positions: ["C"],
    tags: ["篮下统治", "终结", "篮板"],
    note: "运动能力和冲击力惊人，但还不是湖人三连冠时期的技术成熟与统治稳定性。",
    ratings: { overall: 96, scoring: 96, creation: 66, shooting: 35, spacing: 25, defense: 88, rim: 91, rebounding: 92, offball: 78, health: 90, stamina: 88, clutch: 84, ball: 76, portability: 78 }
  },
  {
    name: "David Robinson",
    team: "San Antonio Spurs",
    teamCn: "马刺",
    decade: "1990s",
    version: "1994-96 马刺罗宾逊",
    positions: ["C"],
    tags: ["护框", "机动内线", "常规赛巨星"],
    note: "常规赛影响力巨大，机动、防守和面框进攻突出，季后赛强攻稳定性略低于最顶级中锋。",
    ratings: { overall: 97, scoring: 92, creation: 70, shooting: 62, spacing: 52, defense: 98, rim: 98, rebounding: 91, offball: 82, health: 90, stamina: 94, clutch: 85, ball: 74, portability: 88 }
  },
  {
    name: "Karl Malone",
    team: "Utah Jazz",
    teamCn: "爵士",
    decade: "1990s",
    version: "1996-98 爵士马龙",
    positions: ["PF"],
    tags: ["挡拆终结", "中距离", "耐久"],
    note: "常规赛稳定性和身体对抗极强，挡拆、中距离和篮板构成高下限体系。",
    ratings: { overall: 96, scoring: 94, creation: 74, shooting: 78, spacing: 72, defense: 86, rim: 70, rebounding: 88, offball: 88, health: 98, stamina: 97, clutch: 84, ball: 78, portability: 89 }
  },
  {
    name: "John Stockton",
    team: "Utah Jazz",
    teamCn: "爵士",
    decade: "1990s",
    version: "1994-97 爵士斯托克顿",
    positions: ["PG"],
    tags: ["组织", "投射", "抢断"],
    note: "控场、传球和定点投射稳定，球权占用低，能显著降低阵容失误率。",
    ratings: { overall: 94, scoring: 80, creation: 96, shooting: 88, spacing: 88, defense: 87, rim: 25, rebounding: 48, offball: 89, health: 97, stamina: 94, clutch: 88, ball: 78, portability: 95 }
  },
  {
    name: "Tim Duncan",
    team: "San Antonio Spurs",
    teamCn: "马刺",
    decade: "2000s",
    version: "2002-03 马刺邓肯",
    positions: ["PF", "C"],
    tags: ["防守轴心", "低位", "稳定核心"],
    note: "攻防稳定性极高，低位、策应、护框和篮板都是争冠队底盘。",
    ratings: { overall: 99, scoring: 94, creation: 78, shooting: 68, spacing: 58, defense: 99, rim: 97, rebounding: 94, offball: 86, health: 93, stamina: 95, clutch: 94, ball: 80, portability: 94 }
  },
  {
    name: "Kobe Bryant",
    team: "Los Angeles Lakers",
    teamCn: "湖人",
    decade: "2000s",
    version: "2005-10 湖人科比",
    positions: ["SG", "SF"],
    tags: ["高难度攻坚", "关键球", "外线防守"],
    note: "顶级半场硬解和中距离强投，球权需求高，但能处理季后赛最难回合。",
    ratings: { overall: 98, scoring: 98, creation: 88, shooting: 86, spacing: 84, defense: 90, rim: 50, rebounding: 70, offball: 86, health: 88, stamina: 97, clutch: 98, ball: 90, portability: 90 }
  },
  {
    name: "Shaquille O'Neal",
    team: "Los Angeles Lakers",
    teamCn: "湖人",
    decade: "2000s",
    version: "2000-02 湖人奥尼尔",
    positions: ["C"],
    tags: ["篮下统治", "总决赛杀器", "护框"],
    note: "历史最强篮下压力之一，能摧毁对方内线配置，罚球和空间是阵容搭配成本。",
    ratings: { overall: 99, scoring: 99, creation: 70, shooting: 32, spacing: 20, defense: 90, rim: 93, rebounding: 94, offball: 76, health: 84, stamina: 86, clutch: 90, ball: 86, portability: 77 }
  },
  {
    name: "Kevin Garnett",
    team: "Minnesota Timberwolves",
    teamCn: "森林狼",
    decade: "2000s",
    version: "2003-04 森林狼加内特",
    positions: ["PF", "C"],
    tags: ["全能防守", "高位策应", "篮板"],
    note: "机动性、防守覆盖、高位传球和中距离极强，是现代化内线适配模板。",
    ratings: { overall: 98, scoring: 90, creation: 84, shooting: 78, spacing: 72, defense: 99, rim: 92, rebounding: 96, offball: 90, health: 90, stamina: 97, clutch: 88, ball: 80, portability: 97 }
  },
  {
    name: "Dirk Nowitzki",
    team: "Dallas Mavericks",
    teamCn: "独行侠",
    decade: "2000s",
    version: "2005-07 独行侠诺维茨基",
    positions: ["PF", "C"],
    tags: ["空间内线", "中距离", "错位"],
    note: "四号位历史级投射和错位惩罚，显著拉开半场空间，防守需要强护框搭档兜底。",
    ratings: { overall: 96, scoring: 96, creation: 78, shooting: 95, spacing: 96, defense: 72, rim: 55, rebounding: 84, offball: 91, health: 92, stamina: 92, clutch: 92, ball: 78, portability: 94 }
  },
  {
    name: "Steve Nash",
    team: "Phoenix Suns",
    teamCn: "太阳",
    decade: "2000s",
    version: "2005-07 太阳纳什",
    positions: ["PG"],
    tags: ["挡拆大师", "投射", "进攻引擎"],
    note: "半场组织、转换推进和投射威胁顶级，防守端需要侧翼和内线保护。",
    ratings: { overall: 96, scoring: 86, creation: 99, shooting: 96, spacing: 96, defense: 58, rim: 20, rebounding: 45, offball: 92, health: 86, stamina: 92, clutch: 90, ball: 88, portability: 93 }
  },
  {
    name: "Dwyane Wade",
    team: "Miami Heat",
    teamCn: "热火",
    decade: "2000s",
    version: "2005-09 热火韦德",
    positions: ["SG", "PG"],
    tags: ["突破", "护框后卫", "季后赛爆发"],
    note: "巅峰冲筐、造杀伤和后卫协防盖帽罕见，外线投射不是强项但压迫力极高。",
    ratings: { overall: 97, scoring: 96, creation: 90, shooting: 74, spacing: 70, defense: 91, rim: 58, rebounding: 66, offball: 82, health: 82, stamina: 94, clutch: 96, ball: 91, portability: 88 }
  },
  {
    name: "LeBron James",
    team: "Cleveland Cavaliers",
    teamCn: "骑士",
    decade: "2000s",
    version: "2008-09 骑士詹姆斯",
    positions: ["SF", "PF", "PG"],
    tags: ["持球大核", "突破", "协防"],
    note: "运动能力和常规赛压迫力接近顶峰，投射和背身成熟度不如热火后期，但单核带队价值极高。",
    ratings: { overall: 98, scoring: 97, creation: 94, shooting: 78, spacing: 76, defense: 92, rim: 70, rebounding: 84, offball: 80, health: 94, stamina: 98, clutch: 91, ball: 96, portability: 90 }
  },
  {
    name: "LeBron James",
    team: "Miami Heat",
    teamCn: "热火",
    decade: "2010s",
    version: "2012-13 热火詹姆斯",
    positions: ["SF", "PF", "PG"],
    tags: ["攻防一体", "组织前锋", "转换"],
    note: "身体、技术、投射选择和防守专注度高度统一，是现代篮球最完整的锋线版本之一。",
    ratings: { overall: 100, scoring: 97, creation: 96, shooting: 84, spacing: 82, defense: 96, rim: 76, rebounding: 86, offball: 88, health: 94, stamina: 97, clutch: 96, ball: 94, portability: 98 }
  },
  {
    name: "Chris Bosh",
    team: "Miami Heat",
    teamCn: "热火",
    decade: "2010s",
    version: "2011-14 热火波什",
    positions: ["PF", "C"],
    tags: ["空间内线", "换防", "外拆"],
    note: "牺牲球权后提升空间和防守机动性，篮板不如传统大个，但非常适合明星阵容。",
    ratings: { overall: 88, scoring: 82, creation: 62, shooting: 85, spacing: 88, defense: 84, rim: 72, rebounding: 74, offball: 90, health: 86, stamina: 86, clutch: 82, ball: 50, portability: 92 }
  },
  {
    name: "Stephen Curry",
    team: "Golden State Warriors",
    teamCn: "勇士",
    decade: "2010s",
    version: "2015-16 勇士库里",
    positions: ["PG", "SG"],
    tags: ["历史级投射", "无球牵制", "进攻引擎"],
    note: "持球三分和无球跑动同时改变防守形态，防守并非短板但需要团队保护篮下。",
    ratings: { overall: 99, scoring: 98, creation: 95, shooting: 100, spacing: 100, defense: 75, rim: 25, rebounding: 58, offball: 99, health: 87, stamina: 94, clutch: 93, ball: 90, portability: 100 }
  },
  {
    name: "Kevin Durant",
    team: "Golden State Warriors",
    teamCn: "勇士",
    decade: "2010s",
    version: "2016-19 勇士杜兰特",
    positions: ["SF", "PF"],
    tags: ["无解投射", "弱侧护框", "季后赛硬解"],
    note: "在超级空间里成为高效终结点和攻坚点，防守端也能提供长度与护框。",
    ratings: { overall: 98, scoring: 99, creation: 86, shooting: 96, spacing: 96, defense: 87, rim: 75, rebounding: 78, offball: 94, health: 86, stamina: 91, clutch: 96, ball: 84, portability: 98 }
  },
  {
    name: "Draymond Green",
    team: "Golden State Warriors",
    teamCn: "勇士",
    decade: "2010s",
    version: "2015-17 勇士格林",
    positions: ["PF", "C"],
    tags: ["防守指挥", "短顺下组织", "换防"],
    note: "进攻依赖队友牵制，但防守沟通、换防和二次组织能把强阵容串起来。",
    ratings: { overall: 90, scoring: 68, creation: 84, shooting: 72, spacing: 70, defense: 98, rim: 84, rebounding: 86, offball: 78, health: 88, stamina: 91, clutch: 82, ball: 58, portability: 91 }
  },
  {
    name: "Kawhi Leonard",
    team: "San Antonio Spurs",
    teamCn: "马刺",
    decade: "2010s",
    version: "2016-17 马刺莱昂纳德",
    positions: ["SF", "PF"],
    tags: ["侧翼攻防", "中距离", "领防"],
    note: "攻坚已成型，防守仍有顶级威慑，节奏稳定但持球组织不是主控级。",
    ratings: { overall: 96, scoring: 94, creation: 80, shooting: 88, spacing: 87, defense: 97, rim: 62, rebounding: 78, offball: 91, health: 80, stamina: 88, clutch: 94, ball: 78, portability: 96 }
  },
  {
    name: "James Harden",
    team: "Houston Rockets",
    teamCn: "火箭",
    decade: "2010s",
    version: "2017-19 火箭哈登",
    positions: ["SG", "PG"],
    tags: ["持球大核", "三分造犯规", "组织"],
    note: "常规赛进攻产量和效率极高，持球权需求巨大，需要无球射手和防守资源围绕。",
    ratings: { overall: 97, scoring: 98, creation: 96, shooting: 91, spacing: 92, defense: 68, rim: 35, rebounding: 70, offball: 62, health: 91, stamina: 95, clutch: 86, ball: 98, portability: 82 }
  },
  {
    name: "Russell Westbrook",
    team: "Oklahoma City Thunder",
    teamCn: "雷霆",
    decade: "2010s",
    version: "2016-17 雷霆威少",
    positions: ["PG"],
    tags: ["冲筐", "转换", "篮板后卫"],
    note: "爆发力和常规赛产量惊人，投射和无球适配是明星阵容里最需要处理的问题。",
    ratings: { overall: 95, scoring: 92, creation: 94, shooting: 70, spacing: 66, defense: 70, rim: 42, rebounding: 86, offball: 55, health: 93, stamina: 98, clutch: 86, ball: 97, portability: 74 }
  },
  {
    name: "Kevin Garnett",
    team: "Boston Celtics",
    teamCn: "凯尔特人",
    decade: "2010s",
    version: "2010-12 凯尔特人加内特",
    positions: ["PF", "C"],
    tags: ["防守指挥", "中距离", "老将影响力"],
    note: "不再是森林狼巅峰持球量，但防守位置感、协防和中距离仍是争冠级拼图。",
    ratings: { overall: 88, scoring: 78, creation: 62, shooting: 78, spacing: 73, defense: 94, rim: 86, rebounding: 82, offball: 86, health: 78, stamina: 78, clutch: 86, ball: 55, portability: 89 }
  },
  {
    name: "Giannis Antetokounmpo",
    team: "Milwaukee Bucks",
    teamCn: "雄鹿",
    decade: "2020s",
    version: "2021-24字母哥",
    positions: ["PF", "C", "SF"],
    tags: ["篮下冲击", "协防", "转换"],
    note: "冲筐、协防、转换推进和篮板压迫都在巅峰区间，是能用身体把比赛节奏改写的现代内线怪物。",
    ratings: { overall: 98, scoring: 97, creation: 85, shooting: 66, spacing: 58, defense: 97, rim: 95, rebounding: 94, offball: 86, health: 89, stamina: 96, clutch: 91, ball: 86, portability: 90 }
  },
  {
    name: "Nikola Jokic",
    team: "Denver Nuggets",
    teamCn: "掘金",
    decade: "2020s",
    version: "2022-25约基奇",
    positions: ["C"],
    tags: ["中锋组织", "高效得分", "篮板"],
    note: "低位手感、高位策应、篮板和投篮判断融成一个进攻系统，是历史上最难断电的中锋版本之一。",
    ratings: { overall: 99, scoring: 97, creation: 99, shooting: 91, spacing: 89, defense: 77, rim: 68, rebounding: 95, offball: 91, health: 94, stamina: 93, clutch: 97, ball: 89, portability: 97 }
  },
  {
    name: "Luka Doncic",
    team: "Dallas Mavericks",
    teamCn: "独行侠",
    decade: "2020s",
    version: "2023-24东契奇",
    positions: ["PG", "SG", "SF"],
    tags: ["持球大核", "半场攻坚", "传球"],
    note: "半场解题和持球投传顶级，防守与无球活跃度决定他和其他大核的适配难度。",
    ratings: { overall: 97, scoring: 97, creation: 98, shooting: 89, spacing: 88, defense: 66, rim: 35, rebounding: 82, offball: 58, health: 83, stamina: 91, clutch: 95, ball: 98, portability: 82 }
  },
  {
    name: "Jayson Tatum",
    team: "Boston Celtics",
    teamCn: "凯尔特人",
    decade: "2020s",
    version: "2022-24塔图姆",
    positions: ["SF", "PF"],
    tags: ["双向侧翼", "三分", "篮板"],
    note: "得分、篮板、防守换防和无球投射都在线，硬解稳定性略低于历史级第一核心。",
    ratings: { overall: 94, scoring: 92, creation: 84, shooting: 88, spacing: 89, defense: 88, rim: 62, rebounding: 84, offball: 90, health: 92, stamina: 94, clutch: 86, ball: 82, portability: 94 }
  },
  {
    name: "Joel Embiid",
    team: "Philadelphia 76ers",
    teamCn: "76人",
    decade: "2020s",
    version: "2022-24恩比德",
    positions: ["C"],
    tags: ["低位面框", "护框", "造犯规"],
    note: "常规赛统治力极强，面框和护框兼具，健康与季后赛体能是最终上限变量。",
    ratings: { overall: 97, scoring: 98, creation: 76, shooting: 82, spacing: 78, defense: 93, rim: 95, rebounding: 90, offball: 82, health: 70, stamina: 84, clutch: 86, ball: 84, portability: 88 }
  },
  {
    name: "Shai Gilgeous-Alexander",
    team: "Oklahoma City Thunder",
    teamCn: "雷霆",
    decade: "2020s",
    version: "2024-25亚历山大",
    positions: ["PG", "SG"],
    tags: ["突破中距离", "控失误", "外线防守"],
    note: "突破节奏、中距离停顿、罚球线压力和外线防守同时成熟，是干净高效又能打硬仗的冠军后场核心。",
    ratings: { overall: 97, scoring: 98, creation: 92, shooting: 85, spacing: 84, defense: 88, rim: 46, rebounding: 64, offball: 80, health: 92, stamina: 94, clutch: 94, ball: 91, portability: 92 }
  },
  {
    name: "Anthony Davis",
    team: "Los Angeles Lakers",
    teamCn: "湖人",
    decade: "2020s",
    version: "2020戴维斯",
    positions: ["PF", "C"],
    tags: ["护框", "换防", "终结"],
    note: "园区版本投射和防守都处在高点，能打四也能关门打五，健康波动需要考虑。",
    ratings: { overall: 96, scoring: 92, creation: 70, shooting: 82, spacing: 80, defense: 98, rim: 98, rebounding: 90, offball: 90, health: 78, stamina: 86, clutch: 90, ball: 70, portability: 95 }
  },
  {
    name: "LeBron James",
    team: "Los Angeles Lakers",
    teamCn: "湖人",
    decade: "2020s",
    version: "2020詹姆斯",
    positions: ["PG", "SF", "PF"],
    tags: ["组织前锋", "季后赛掌控", "体型优势"],
    note: "运动能力较热火期下降，但组织、节奏控制和季后赛阅读达到大师级。",
    ratings: { overall: 96, scoring: 92, creation: 97, shooting: 82, spacing: 80, defense: 86, rim: 68, rebounding: 84, offball: 82, health: 84, stamina: 88, clutch: 96, ball: 92, portability: 92 }
  },
  {
    name: "Jimmy Butler",
    team: "Miami Heat",
    teamCn: "热火",
    decade: "2020s",
    version: "2020-23 热火巴特勒",
    positions: ["SF", "SG", "PF"],
    tags: ["强硬攻坚", "造犯规", "外线防守"],
    note: "常规赛会留力，但季后赛对抗、罚球线压力和防守判断能显著提高球队韧性。",
    ratings: { overall: 93, scoring: 90, creation: 86, shooting: 75, spacing: 72, defense: 91, rim: 54, rebounding: 72, offball: 84, health: 82, stamina: 87, clutch: 94, ball: 82, portability: 89 }
  },
  {
    name: "Damian Lillard",
    team: "Portland Trail Blazers",
    teamCn: "开拓者",
    decade: "2020s",
    version: "2020-21 开拓者利拉德",
    positions: ["PG"],
    tags: ["超远三分", "持球挡拆", "关键球"],
    note: "持球投射和关键球距离极具杀伤，防守端需要强侧翼和内线覆盖。",
    ratings: { overall: 94, scoring: 96, creation: 91, shooting: 97, spacing: 98, defense: 58, rim: 20, rebounding: 48, offball: 86, health: 84, stamina: 91, clutch: 97, ball: 90, portability: 91 }
  }
];

PLAYER_POOL.push(
  {
    name: "James Worthy",
    team: "Los Angeles Lakers",
    teamCn: "湖人",
    decade: "1980s",
    version: "1987-88 湖人沃西",
    positions: ["SF", "PF"],
    tags: ["转换终结", "低位错位", "季后赛"],
    note: "Showtime 湖人的锋线终结点，转换、低位错位和总决赛舞台都很可靠。",
    ratings: { overall: 91, scoring: 88, creation: 70, shooting: 70, spacing: 68, defense: 82, rim: 58, rebounding: 72, offball: 88, health: 88, stamina: 89, clutch: 91, ball: 68, portability: 88 }
  },
  {
    name: "Michael Cooper",
    team: "Los Angeles Lakers",
    teamCn: "湖人",
    decade: "1980s",
    version: "1986-87 湖人库珀",
    positions: ["SG", "SF"],
    tags: ["外线领防", "定点投射", "冠军拼图"],
    note: "顶级外线防守者，能承担最难后场对位，并提供不抢球权的空间价值。",
    ratings: { overall: 84, scoring: 70, creation: 62, shooting: 80, spacing: 80, defense: 94, rim: 42, rebounding: 55, offball: 86, health: 86, stamina: 88, clutch: 78, ball: 45, portability: 90 }
  },
  {
    name: "Robert Parish",
    team: "Boston Celtics",
    teamCn: "凯尔特人",
    decade: "1980s",
    version: "1981-86 凯尔特人帕里什",
    positions: ["C"],
    tags: ["护框", "篮板", "中距离"],
    note: "稳定耐久的冠军中锋，防守站位、篮板和中距离都能补齐传统内线职责。",
    ratings: { overall: 89, scoring: 82, creation: 52, shooting: 68, spacing: 58, defense: 87, rim: 86, rebounding: 88, offball: 80, health: 94, stamina: 88, clutch: 82, ball: 50, portability: 82 }
  },
  {
    name: "Dennis Johnson",
    team: "Boston Celtics",
    teamCn: "凯尔特人",
    decade: "1980s",
    version: "1984-86 凯尔特人丹尼斯约翰逊",
    positions: ["PG", "SG"],
    tags: ["防守后卫", "组织", "关键球"],
    note: "强硬后场防守和稳健控场兼具，适合在明星锋线身边承担低失误组织。",
    ratings: { overall: 86, scoring: 76, creation: 82, shooting: 72, spacing: 70, defense: 91, rim: 38, rebounding: 58, offball: 78, health: 88, stamina: 90, clutch: 86, ball: 70, portability: 85 }
  },
  {
    name: "Joe Dumars",
    team: "Detroit Pistons",
    teamCn: "活塞",
    decade: "1980s",
    version: "1988-89 活塞杜马斯",
    positions: ["SG", "PG"],
    tags: ["外线防守", "中距离", "副控"],
    note: "冠军后场的攻防平衡点，能领防也能在关键回合提供稳定中距离。",
    ratings: { overall: 88, scoring: 83, creation: 76, shooting: 80, spacing: 78, defense: 92, rim: 34, rebounding: 50, offball: 82, health: 90, stamina: 90, clutch: 88, ball: 68, portability: 88 }
  },
  {
    name: "Bill Laimbeer",
    team: "Detroit Pistons",
    teamCn: "活塞",
    decade: "1980s",
    version: "1988-90 活塞兰比尔",
    positions: ["C"],
    tags: ["篮板", "空间中锋", "强硬"],
    note: "强硬防守和篮板是底色，同时具备那个年代少见的外线牵制。",
    ratings: { overall: 84, scoring: 76, creation: 48, shooting: 76, spacing: 74, defense: 84, rim: 78, rebounding: 90, offball: 76, health: 90, stamina: 86, clutch: 78, ball: 42, portability: 78 }
  },
  {
    name: "Dennis Rodman",
    team: "Detroit Pistons",
    teamCn: "活塞",
    decade: "1980s",
    version: "1989-90 活塞罗德曼",
    positions: ["SF", "PF"],
    tags: ["篮板", "换防", "防守能量"],
    note: "年轻罗德曼机动性和防守覆盖惊人，进攻空间有限但能改变防守强度。",
    ratings: { overall: 86, scoring: 62, creation: 42, shooting: 48, spacing: 42, defense: 96, rim: 76, rebounding: 94, offball: 76, health: 90, stamina: 95, clutch: 76, ball: 28, portability: 78 }
  },
  {
    name: "Dennis Rodman",
    team: "Chicago Bulls",
    teamCn: "公牛",
    decade: "1990s",
    version: "1995-98 公牛罗德曼",
    positions: ["PF", "C"],
    tags: ["历史级篮板", "防守", "低球权"],
    note: "篮板和防守价值巨大，进攻端几乎不占球权，但空间成本明显。",
    ratings: { overall: 88, scoring: 55, creation: 48, shooting: 42, spacing: 35, defense: 96, rim: 80, rebounding: 100, offball: 80, health: 86, stamina: 94, clutch: 80, ball: 20, portability: 80 }
  },
  {
    name: "Toni Kukoc",
    team: "Chicago Bulls",
    teamCn: "公牛",
    decade: "1990s",
    version: "1995-98 公牛库科奇",
    positions: ["SF", "PF"],
    tags: ["组织前锋", "投射", "替补火力"],
    note: "高大前锋里的传投连接点，能缓解巨星身边的空间和二次处理压力。",
    ratings: { overall: 84, scoring: 78, creation: 80, shooting: 84, spacing: 84, defense: 68, rim: 42, rebounding: 66, offball: 84, health: 84, stamina: 78, clutch: 82, ball: 62, portability: 88 }
  },
  {
    name: "Clyde Drexler",
    team: "Houston Rockets",
    teamCn: "火箭",
    decade: "1990s",
    version: "1995 火箭德雷克斯勒",
    positions: ["SG", "SF"],
    tags: ["转换", "副攻", "篮板后卫"],
    note: "不再是开拓者绝对巅峰，但冲击、篮板和副攻仍是冠军级侧翼火力。",
    ratings: { overall: 89, scoring: 86, creation: 78, shooting: 74, spacing: 72, defense: 82, rim: 54, rebounding: 78, offball: 82, health: 84, stamina: 86, clutch: 86, ball: 72, portability: 84 }
  },
  {
    name: "Robert Horry",
    team: "Houston Rockets",
    teamCn: "火箭",
    decade: "1990s",
    version: "1994-95 火箭霍里",
    positions: ["SF", "PF"],
    tags: ["空间前锋", "协防", "关键球"],
    note: "低球权空间前锋，能防多个位置，也能在关键回合惩罚放空。",
    ratings: { overall: 81, scoring: 70, creation: 54, shooting: 82, spacing: 84, defense: 82, rim: 68, rebounding: 68, offball: 86, health: 86, stamina: 82, clutch: 88, ball: 36, portability: 90 }
  },
  {
    name: "Penny Hardaway",
    team: "Orlando Magic",
    teamCn: "魔术",
    decade: "1990s",
    version: "1994-96 魔术便士",
    positions: ["PG", "SG"],
    tags: ["大体型控卫", "突破", "组织"],
    note: "身高、控运和创造力兼具，能和内线巨星形成巨大错位压力。",
    ratings: { overall: 93, scoring: 88, creation: 91, shooting: 78, spacing: 76, defense: 82, rim: 46, rebounding: 66, offball: 80, health: 76, stamina: 88, clutch: 86, ball: 86, portability: 86 }
  },
  {
    name: "Nick Anderson",
    team: "Orlando Magic",
    teamCn: "魔术",
    decade: "1990s",
    version: "1994-96 魔术安德森",
    positions: ["SG", "SF"],
    tags: ["侧翼投射", "防守", "无球"],
    note: "能在奥尼尔和便士身边拉开空间，侧翼防守和无球终结都够用。",
    ratings: { overall: 82, scoring: 78, creation: 58, shooting: 82, spacing: 84, defense: 78, rim: 38, rebounding: 62, offball: 84, health: 86, stamina: 84, clutch: 72, ball: 44, portability: 84 }
  },
  {
    name: "Sean Elliott",
    team: "San Antonio Spurs",
    teamCn: "马刺",
    decade: "1990s",
    version: "1994-96 马刺埃利奥特",
    positions: ["SF"],
    tags: ["侧翼得分", "投射", "防守体型"],
    note: "罗宾逊身边的重要侧翼火力，能投能切，具备不错的对位体型。",
    ratings: { overall: 84, scoring: 80, creation: 62, shooting: 82, spacing: 82, defense: 76, rim: 44, rebounding: 62, offball: 82, health: 78, stamina: 82, clutch: 78, ball: 52, portability: 82 }
  },
  {
    name: "Avery Johnson",
    team: "San Antonio Spurs",
    teamCn: "马刺",
    decade: "1990s",
    version: "1994-96 马刺埃弗里约翰逊",
    positions: ["PG"],
    tags: ["控场", "突破", "低失误"],
    note: "传统控卫，投射不足但能把球稳妥送到内线核心手里。",
    ratings: { overall: 78, scoring: 68, creation: 80, shooting: 62, spacing: 58, defense: 74, rim: 22, rebounding: 38, offball: 68, health: 88, stamina: 84, clutch: 76, ball: 68, portability: 72 }
  },
  {
    name: "Jeff Hornacek",
    team: "Utah Jazz",
    teamCn: "爵士",
    decade: "1990s",
    version: "1995-98 爵士霍纳塞克",
    positions: ["SG", "PG"],
    tags: ["投射", "副控", "无球"],
    note: "高效投射和二次处理是斯托克顿-马龙体系的关键润滑剂。",
    ratings: { overall: 84, scoring: 78, creation: 74, shooting: 90, spacing: 91, defense: 72, rim: 24, rebounding: 48, offball: 90, health: 88, stamina: 84, clutch: 82, ball: 58, portability: 90 }
  },
  {
    name: "Bryon Russell",
    team: "Utah Jazz",
    teamCn: "爵士",
    decade: "1990s",
    version: "1996-98 爵士拉塞尔",
    positions: ["SF", "SG"],
    tags: ["侧翼防守", "定点投射", "低球权"],
    note: "标准侧翼拼图，能领到困难对位并保持一定底角威胁。",
    ratings: { overall: 78, scoring: 68, creation: 46, shooting: 78, spacing: 80, defense: 82, rim: 42, rebounding: 58, offball: 82, health: 88, stamina: 84, clutch: 72, ball: 34, portability: 84 }
  },
  {
    name: "Manu Ginobili",
    team: "San Antonio Spurs",
    teamCn: "马刺",
    decade: "2000s",
    version: "2005-08 马刺吉诺比利",
    positions: ["SG", "PG"],
    tags: ["第六人核心", "突破传球", "关键球"],
    note: "替补身份下的明星影响力，突破、传球、造犯规和关键球都能改变比赛。",
    ratings: { overall: 91, scoring: 86, creation: 88, shooting: 84, spacing: 84, defense: 82, rim: 42, rebounding: 58, offball: 88, health: 80, stamina: 86, clutch: 92, ball: 78, portability: 92 }
  },
  {
    name: "Tony Parker",
    team: "San Antonio Spurs",
    teamCn: "马刺",
    decade: "2000s",
    version: "2005-09 马刺帕克",
    positions: ["PG"],
    tags: ["突破", "挡拆", "禁区终结"],
    note: "速度和禁区终结是核心武器，投射不算顶尖但能持续撕开防线。",
    ratings: { overall: 89, scoring: 86, creation: 86, shooting: 74, spacing: 72, defense: 68, rim: 24, rebounding: 42, offball: 76, health: 86, stamina: 90, clutch: 86, ball: 82, portability: 80 }
  },
  {
    name: "Pau Gasol",
    team: "Los Angeles Lakers",
    teamCn: "湖人",
    decade: "2000s",
    version: "2008-10 湖人加索尔",
    positions: ["PF", "C"],
    tags: ["高位策应", "低位", "篮板"],
    note: "湖人后两冠的内线技术核心，策应、低位和篮板让三角进攻更完整。",
    ratings: { overall: 91, scoring: 86, creation: 78, shooting: 76, spacing: 70, defense: 82, rim: 78, rebounding: 88, offball: 88, health: 88, stamina: 86, clutch: 86, ball: 68, portability: 90 }
  },
  {
    name: "Lamar Odom",
    team: "Los Angeles Lakers",
    teamCn: "湖人",
    decade: "2000s",
    version: "2008-10 湖人奥多姆",
    positions: ["PF", "SF"],
    tags: ["组织前锋", "篮板", "转换"],
    note: "高大持球连接点，能抢板推进，也能在明星身边担任多功能前锋。",
    ratings: { overall: 85, scoring: 76, creation: 78, shooting: 70, spacing: 68, defense: 78, rim: 64, rebounding: 82, offball: 78, health: 82, stamina: 84, clutch: 78, ball: 60, portability: 84 }
  },
  {
    name: "Amar'e Stoudemire",
    team: "Phoenix Suns",
    teamCn: "太阳",
    decade: "2000s",
    version: "2004-07 太阳斯塔德迈尔",
    positions: ["PF", "C"],
    tags: ["挡拆终结", "爆发力", "面框"],
    note: "纳什挡拆体系里的顶级顺下终结者，进攻爆发力极强，防守需要体系保护。",
    ratings: { overall: 90, scoring: 91, creation: 62, shooting: 72, spacing: 66, defense: 66, rim: 72, rebounding: 80, offball: 90, health: 76, stamina: 86, clutch: 82, ball: 62, portability: 78 }
  },
  {
    name: "Shawn Marion",
    team: "Phoenix Suns",
    teamCn: "太阳",
    decade: "2000s",
    version: "2004-07 太阳马里昂",
    positions: ["SF", "PF"],
    tags: ["无球", "篮板侧翼", "换防"],
    note: "低球权高产出的锋线，篮板、空切、转换和多位置防守非常适合快节奏阵容。",
    ratings: { overall: 89, scoring: 82, creation: 58, shooting: 76, spacing: 76, defense: 88, rim: 70, rebounding: 88, offball: 92, health: 90, stamina: 92, clutch: 80, ball: 42, portability: 92 }
  },
  {
    name: "Jason Terry",
    team: "Dallas Mavericks",
    teamCn: "独行侠",
    decade: "2000s",
    version: "2005-09 独行侠特里",
    positions: ["SG", "PG"],
    tags: ["投射", "第六人得分", "关键球"],
    note: "持球投和无球接应都能提供火力，是诺维茨基身边的重要外线副攻。",
    ratings: { overall: 84, scoring: 82, creation: 72, shooting: 88, spacing: 89, defense: 62, rim: 24, rebounding: 40, offball: 86, health: 88, stamina: 86, clutch: 86, ball: 64, portability: 84 }
  },
  {
    name: "Sam Cassell",
    team: "Minnesota Timberwolves",
    teamCn: "森林狼",
    decade: "2000s",
    version: "2003-04 森林狼卡塞尔",
    positions: ["PG"],
    tags: ["中距离", "组织", "关键球"],
    note: "老练控卫，能在加内特身边组织、单打中距离和处理关键回合。",
    ratings: { overall: 86, scoring: 82, creation: 86, shooting: 82, spacing: 82, defense: 62, rim: 20, rebounding: 42, offball: 78, health: 78, stamina: 82, clutch: 88, ball: 78, portability: 82 }
  },
  {
    name: "Latrell Sprewell",
    team: "Minnesota Timberwolves",
    teamCn: "森林狼",
    decade: "2000s",
    version: "2003-04 森林狼斯普雷威尔",
    positions: ["SG", "SF"],
    tags: ["侧翼得分", "防守", "转换"],
    note: "运动型侧翼副攻，能补充外线防守和转换冲击。",
    ratings: { overall: 82, scoring: 78, creation: 66, shooting: 74, spacing: 72, defense: 80, rim: 44, rebounding: 56, offball: 78, health: 82, stamina: 84, clutch: 78, ball: 58, portability: 78 }
  },
  {
    name: "Ray Allen",
    team: "Miami Heat",
    teamCn: "热火",
    decade: "2010s",
    version: "2012-14 热火雷阿伦",
    positions: ["SG"],
    tags: ["历史级投射", "无球", "关键球"],
    note: "不再是雄鹿或超音速时期的持球核心，但无球投射和关键球价值非常高。",
    ratings: { overall: 84, scoring: 78, creation: 52, shooting: 96, spacing: 97, defense: 68, rim: 24, rebounding: 42, offball: 96, health: 86, stamina: 82, clutch: 92, ball: 34, portability: 94 }
  },
  {
    name: "Dwyane Wade",
    team: "Miami Heat",
    teamCn: "热火",
    decade: "2010s",
    version: "2010-13 热火韦德",
    positions: ["SG", "PG"],
    tags: ["突破", "副攻", "协防后卫"],
    note: "比2000年代巅峰略有下滑，但突破、造杀伤和防守判断仍是争冠核心级别。",
    ratings: { overall: 94, scoring: 91, creation: 86, shooting: 72, spacing: 68, defense: 88, rim: 54, rebounding: 62, offball: 82, health: 78, stamina: 88, clutch: 92, ball: 86, portability: 84 }
  },
  {
    name: "Klay Thompson",
    team: "Golden State Warriors",
    teamCn: "勇士",
    decade: "2010s",
    version: "2015-19 勇士克莱",
    positions: ["SG", "SF"],
    tags: ["顶级无球投射", "外线防守", "低球权"],
    note: "历史级接球投和稳定外线领防，几乎不占球权，是超级阵容里的完美拼图。",
    ratings: { overall: 91, scoring: 88, creation: 58, shooting: 98, spacing: 98, defense: 88, rim: 34, rebounding: 48, offball: 98, health: 84, stamina: 90, clutch: 88, ball: 42, portability: 98 }
  },
  {
    name: "Andre Iguodala",
    team: "Golden State Warriors",
    teamCn: "勇士",
    decade: "2010s",
    version: "2014-17 勇士伊戈达拉",
    positions: ["SF", "SG"],
    tags: ["侧翼防守", "二次组织", "转换"],
    note: "低球权高智商侧翼，能防核心持球人，也能在短回合中做正确传导。",
    ratings: { overall: 86, scoring: 72, creation: 78, shooting: 78, spacing: 76, defense: 93, rim: 58, rebounding: 62, offball: 84, health: 84, stamina: 84, clutch: 86, ball: 48, portability: 92 }
  },
  {
    name: "Chris Paul",
    team: "Houston Rockets",
    teamCn: "火箭",
    decade: "2010s",
    version: "2017-18 火箭保罗",
    positions: ["PG"],
    tags: ["控场", "中距离", "防守后卫"],
    note: "火箭版本仍是顶级控场大师，能分担哈登持球并提升关键时刻稳定性。",
    ratings: { overall: 92, scoring: 86, creation: 94, shooting: 88, spacing: 88, defense: 86, rim: 22, rebounding: 48, offball: 86, health: 74, stamina: 84, clutch: 92, ball: 84, portability: 92 }
  },
  {
    name: "Clint Capela",
    team: "Houston Rockets",
    teamCn: "火箭",
    decade: "2010s",
    version: "2017-19 火箭卡佩拉",
    positions: ["C"],
    tags: ["吃饼", "护框", "篮板"],
    note: "顶级顺下终结和篮板护框拼图，进攻依赖持球核心创造机会。",
    ratings: { overall: 84, scoring: 76, creation: 36, shooting: 28, spacing: 22, defense: 84, rim: 88, rebounding: 88, offball: 84, health: 84, stamina: 84, clutch: 74, ball: 20, portability: 72 }
  },
  {
    name: "Tony Parker",
    team: "San Antonio Spurs",
    teamCn: "马刺",
    decade: "2010s",
    version: "2012-14 马刺帕克",
    positions: ["PG"],
    tags: ["挡拆", "突破", "控场"],
    note: "速度有所下降但节奏和挡拆判断更成熟，是马刺体系的重要发起点。",
    ratings: { overall: 87, scoring: 82, creation: 88, shooting: 76, spacing: 74, defense: 66, rim: 22, rebounding: 36, offball: 76, health: 80, stamina: 84, clutch: 86, ball: 78, portability: 80 }
  },
  {
    name: "Tim Duncan",
    team: "San Antonio Spurs",
    teamCn: "马刺",
    decade: "2010s",
    version: "2012-14 马刺邓肯",
    positions: ["C", "PF"],
    tags: ["护框", "低位", "防守轴心"],
    note: "老年版邓肯运动能力下降，但护框、站位和季后赛稳定性仍然精英。",
    ratings: { overall: 88, scoring: 78, creation: 62, shooting: 66, spacing: 58, defense: 94, rim: 92, rebounding: 88, offball: 82, health: 82, stamina: 78, clutch: 88, ball: 54, portability: 88 }
  },
  {
    name: "Paul Pierce",
    team: "Boston Celtics",
    teamCn: "凯尔特人",
    decade: "2010s",
    version: "2010-12 凯尔特人皮尔斯",
    positions: ["SF"],
    tags: ["半场单打", "投射", "关键球"],
    note: "虽已过巅峰，但强壮侧翼单打、三分和关键球仍能撑起半场回合。",
    ratings: { overall: 86, scoring: 82, creation: 76, shooting: 84, spacing: 84, defense: 76, rim: 38, rebounding: 58, offball: 82, health: 78, stamina: 78, clutch: 88, ball: 70, portability: 82 }
  },
  {
    name: "Rajon Rondo",
    team: "Boston Celtics",
    teamCn: "凯尔特人",
    decade: "2010s",
    version: "2010-12 凯尔特人隆多",
    positions: ["PG"],
    tags: ["组织", "防守后卫", "篮板"],
    note: "组织和防守很强，投射空间成本明显，需要周围有足够终结和投射。",
    ratings: { overall: 86, scoring: 72, creation: 92, shooting: 58, spacing: 52, defense: 86, rim: 28, rebounding: 70, offball: 60, health: 80, stamina: 88, clutch: 82, ball: 82, portability: 72 }
  },
  {
    name: "Kevin Durant",
    team: "Oklahoma City Thunder",
    teamCn: "雷霆",
    decade: "2010s",
    version: "2013-14 雷霆杜兰特",
    positions: ["SF", "PF"],
    tags: ["得分王", "投射", "攻坚"],
    note: "雷霆时期的MVP得分核心，持球投和无球终结兼具，但体系空间不如勇士版本。",
    ratings: { overall: 98, scoring: 99, creation: 86, shooting: 94, spacing: 94, defense: 82, rim: 62, rebounding: 76, offball: 92, health: 86, stamina: 94, clutch: 94, ball: 86, portability: 94 }
  },
  {
    name: "Serge Ibaka",
    team: "Oklahoma City Thunder",
    teamCn: "雷霆",
    decade: "2010s",
    version: "2011-14 雷霆伊巴卡",
    positions: ["PF", "C"],
    tags: ["护框", "中距离", "机动内线"],
    note: "护框和机动性非常强，中距离能提供基础空间，是双少身边的重要内线。",
    ratings: { overall: 86, scoring: 74, creation: 38, shooting: 74, spacing: 70, defense: 91, rim: 94, rebounding: 78, offball: 82, health: 84, stamina: 86, clutch: 76, ball: 24, portability: 82 }
  },
  {
    name: "Khris Middleton",
    team: "Milwaukee Bucks",
    teamCn: "雄鹿",
    decade: "2020s",
    version: "2020-21 雄鹿米德尔顿",
    positions: ["SF", "SG"],
    tags: ["中距离", "三分", "副攻"],
    note: "字母哥身边的半场副攻和投射点，能处理关键时刻的中距离回合。",
    ratings: { overall: 88, scoring: 84, creation: 78, shooting: 88, spacing: 89, defense: 78, rim: 34, rebounding: 62, offball: 88, health: 82, stamina: 84, clutch: 88, ball: 68, portability: 88 }
  },
  {
    name: "Jrue Holiday",
    team: "Milwaukee Bucks",
    teamCn: "雄鹿",
    decade: "2020s",
    version: "2020-23 雄鹿霍勒迪",
    positions: ["PG", "SG"],
    tags: ["外线防守", "副控", "错位强吃"],
    note: "后场防守顶级，能组织也能强吃小后卫，投射稳定性略有波动。",
    ratings: { overall: 88, scoring: 78, creation: 84, shooting: 78, spacing: 78, defense: 94, rim: 34, rebounding: 56, offball: 80, health: 84, stamina: 86, clutch: 80, ball: 74, portability: 88 }
  },
  {
    name: "Jamal Murray",
    team: "Denver Nuggets",
    teamCn: "掘金",
    decade: "2020s",
    version: "2020-23 掘金穆雷",
    positions: ["PG", "SG"],
    tags: ["挡拆得分", "三分", "季后赛爆发"],
    note: "和约基奇挡拆默契极高，季后赛强投和关键球能拉高进攻上限。",
    ratings: { overall: 88, scoring: 86, creation: 82, shooting: 88, spacing: 89, defense: 66, rim: 24, rebounding: 46, offball: 84, health: 76, stamina: 84, clutch: 91, ball: 76, portability: 86 }
  },
  {
    name: "Aaron Gordon",
    team: "Denver Nuggets",
    teamCn: "掘金",
    decade: "2020s",
    version: "2022-23 掘金戈登",
    positions: ["PF", "SF"],
    tags: ["扣篮终结", "锋线防守", "低球权"],
    note: "顶级无球终结和锋线对位资源，投射一般但非常适合约基奇体系。",
    ratings: { overall: 84, scoring: 76, creation: 54, shooting: 70, spacing: 68, defense: 86, rim: 72, rebounding: 76, offball: 90, health: 86, stamina: 86, clutch: 78, ball: 38, portability: 86 }
  },
  {
    name: "Kyrie Irving",
    team: "Dallas Mavericks",
    teamCn: "独行侠",
    decade: "2020s",
    version: "2023-24 独行侠欧文",
    positions: ["SG", "PG"],
    tags: ["单打", "投射", "关键球"],
    note: "顶级二当家攻坚手，持球和无球投射都能适配东契奇，但防守体型有限。",
    ratings: { overall: 91, scoring: 91, creation: 86, shooting: 93, spacing: 94, defense: 62, rim: 22, rebounding: 42, offball: 88, health: 78, stamina: 84, clutch: 94, ball: 84, portability: 88 }
  },
  {
    name: "Jalen Brunson",
    team: "Dallas Mavericks",
    teamCn: "独行侠",
    decade: "2020s",
    version: "2021-22 独行侠布伦森",
    positions: ["PG", "SG"],
    tags: ["持球得分", "低失误", "中距离"],
    note: "达拉斯后期已经展现强持球得分和稳定控场，但还不是尼克斯时期的大核版本。",
    ratings: { overall: 84, scoring: 82, creation: 80, shooting: 82, spacing: 82, defense: 62, rim: 20, rebounding: 42, offball: 78, health: 86, stamina: 84, clutch: 84, ball: 76, portability: 80 }
  },
  {
    name: "Jaylen Brown",
    team: "Boston Celtics",
    teamCn: "凯尔特人",
    decade: "2020s",
    version: "2022-24 凯尔特人杰伦布朗",
    positions: ["SG", "SF"],
    tags: ["侧翼得分", "防守体型", "转换"],
    note: "强壮侧翼得分手，转换和单点爆破很强，持球决策稳定性决定上限。",
    ratings: { overall: 90, scoring: 88, creation: 74, shooting: 84, spacing: 84, defense: 86, rim: 48, rebounding: 66, offball: 84, health: 88, stamina: 90, clutch: 84, ball: 74, portability: 86 }
  },
  {
    name: "Marcus Smart",
    team: "Boston Celtics",
    teamCn: "凯尔特人",
    decade: "2020s",
    version: "2021-22 凯尔特人斯马特",
    positions: ["PG", "SG"],
    tags: ["防守后卫", "组织", "强硬"],
    note: "后场防守和沟通价值很高，能承担控卫职责，投射选择会影响空间。",
    ratings: { overall: 84, scoring: 70, creation: 80, shooting: 74, spacing: 72, defense: 92, rim: 34, rebounding: 54, offball: 76, health: 82, stamina: 86, clutch: 78, ball: 66, portability: 82 }
  },
  {
    name: "Bam Adebayo",
    team: "Miami Heat",
    teamCn: "热火",
    decade: "2020s",
    version: "2020-23 热火阿德巴约",
    positions: ["C", "PF"],
    tags: ["换防中锋", "手递手", "护框"],
    note: "换防弹性和短策应是热火体系核心，进攻空间和强攻稳定性略受限制。",
    ratings: { overall: 89, scoring: 80, creation: 76, shooting: 66, spacing: 58, defense: 93, rim: 88, rebounding: 84, offball: 82, health: 84, stamina: 88, clutch: 80, ball: 62, portability: 86 }
  },
  {
    name: "Tyler Herro",
    team: "Miami Heat",
    teamCn: "热火",
    decade: "2020s",
    version: "2021-23 热火希罗",
    positions: ["SG", "PG"],
    tags: ["投射", "副攻", "第六人"],
    note: "外线持球投和无球投射能补进攻，防守端需要强队友遮掩。",
    ratings: { overall: 82, scoring: 82, creation: 74, shooting: 88, spacing: 89, defense: 58, rim: 20, rebounding: 48, offball: 86, health: 78, stamina: 82, clutch: 80, ball: 66, portability: 80 }
  },
  {
    name: "Tyrese Maxey",
    team: "Philadelphia 76ers",
    teamCn: "76人",
    decade: "2020s",
    version: "2022-24 76人马克西",
    positions: ["PG", "SG"],
    tags: ["速度", "三分", "副攻"],
    note: "速度和投射能拉开恩比德身边的进攻空间，组织还在成长。",
    ratings: { overall: 87, scoring: 86, creation: 80, shooting: 89, spacing: 90, defense: 64, rim: 22, rebounding: 42, offball: 84, health: 88, stamina: 88, clutch: 84, ball: 76, portability: 86 }
  },
  {
    name: "James Harden",
    team: "Philadelphia 76ers",
    teamCn: "76人",
    decade: "2020s",
    version: "2021-23 76人哈登",
    positions: ["PG", "SG"],
    tags: ["组织", "挡拆", "后撤步三分"],
    note: "不再是火箭极致大核版本，但传球和挡拆阅读依旧能解放恩比德。",
    ratings: { overall: 89, scoring: 84, creation: 93, shooting: 86, spacing: 86, defense: 62, rim: 24, rebounding: 60, offball: 66, health: 76, stamina: 82, clutch: 82, ball: 88, portability: 80 }
  },
  {
    name: "Jalen Williams",
    team: "Oklahoma City Thunder",
    teamCn: "雷霆",
    decade: "2020s",
    version: "2023-24 雷霆杰伦威廉姆斯",
    positions: ["SF", "SG", "PF"],
    tags: ["侧翼副攻", "防守", "效率"],
    note: "高效率侧翼副攻，能防多个位置，也能在亚历山大身边处理二次进攻。",
    ratings: { overall: 86, scoring: 84, creation: 80, shooting: 84, spacing: 84, defense: 82, rim: 44, rebounding: 58, offball: 84, health: 88, stamina: 86, clutch: 80, ball: 70, portability: 88 }
  },
  {
    name: "Chet Holmgren",
    team: "Oklahoma City Thunder",
    teamCn: "雷霆",
    decade: "2020s",
    version: "2023-24 雷霆霍姆格伦",
    positions: ["C", "PF"],
    tags: ["护框", "空间内线", "机动"],
    note: "新秀版本已经具备护框和空间价值，力量和季后赛经验仍是变量。",
    ratings: { overall: 85, scoring: 78, creation: 58, shooting: 84, spacing: 84, defense: 88, rim: 92, rebounding: 76, offball: 86, health: 78, stamina: 82, clutch: 78, ball: 48, portability: 88 }
  },
  {
    name: "CJ McCollum",
    team: "Portland Trail Blazers",
    teamCn: "开拓者",
    decade: "2020s",
    version: "2020-21 开拓者麦科勒姆",
    positions: ["SG", "PG"],
    tags: ["持球投", "副攻", "中距离"],
    note: "利拉德身边的稳定后场副攻，投射和单打很强，防守体型是成本。",
    ratings: { overall: 86, scoring: 86, creation: 78, shooting: 90, spacing: 91, defense: 58, rim: 20, rebounding: 42, offball: 86, health: 78, stamina: 84, clutch: 84, ball: 74, portability: 84 }
  },
  {
    name: "Jusuf Nurkic",
    team: "Portland Trail Blazers",
    teamCn: "开拓者",
    decade: "2020s",
    version: "2020-21 开拓者努尔基奇",
    positions: ["C"],
    tags: ["掩护", "篮板", "策应"],
    note: "能提供体型、掩护和篮板，健康和防挡拆覆盖范围限制上限。",
    ratings: { overall: 80, scoring: 74, creation: 66, shooting: 58, spacing: 50, defense: 76, rim: 78, rebounding: 84, offball: 76, health: 66, stamina: 76, clutch: 72, ball: 48, portability: 72 }
  }
);

const ROLE_TEMPLATES = {
  leadGuard: {
    positions: ["PG"],
    tags: ["控场", "持球", "组织"],
    ratings: { overall: 82, scoring: 78, creation: 84, shooting: 78, spacing: 78, defense: 72, rim: 22, rebounding: 42, offball: 74, health: 84, stamina: 84, clutch: 80, ball: 76, portability: 78 }
  },
  comboGuard: {
    positions: ["SG", "PG"],
    tags: ["副攻", "投射", "持球"],
    ratings: { overall: 80, scoring: 80, creation: 74, shooting: 82, spacing: 83, defense: 70, rim: 24, rebounding: 44, offball: 82, health: 84, stamina: 84, clutch: 78, ball: 66, portability: 82 }
  },
  shooter: {
    positions: ["SG", "SF"],
    tags: ["定点投射", "无球", "空间"],
    ratings: { overall: 78, scoring: 74, creation: 48, shooting: 88, spacing: 90, defense: 66, rim: 24, rebounding: 42, offball: 90, health: 84, stamina: 82, clutch: 78, ball: 30, portability: 88 }
  },
  wing: {
    positions: ["SF", "SG"],
    tags: ["侧翼", "无球", "防守体型"],
    ratings: { overall: 79, scoring: 74, creation: 56, shooting: 78, spacing: 78, defense: 78, rim: 42, rebounding: 58, offball: 82, health: 84, stamina: 84, clutch: 76, ball: 44, portability: 82 }
  },
  defender: {
    positions: ["SG", "SF"],
    tags: ["领防", "低球权", "强硬"],
    ratings: { overall: 80, scoring: 66, creation: 48, shooting: 72, spacing: 72, defense: 90, rim: 42, rebounding: 58, offball: 78, health: 84, stamina: 86, clutch: 74, ball: 34, portability: 84 }
  },
  forward: {
    positions: ["PF", "SF"],
    tags: ["锋线", "篮板", "终结"],
    ratings: { overall: 80, scoring: 76, creation: 56, shooting: 72, spacing: 70, defense: 78, rim: 66, rebounding: 76, offball: 80, health: 84, stamina: 84, clutch: 76, ball: 46, portability: 80 }
  },
  stretchForward: {
    positions: ["PF", "SF"],
    tags: ["空间前锋", "无球", "投射"],
    ratings: { overall: 80, scoring: 76, creation: 54, shooting: 84, spacing: 86, defense: 74, rim: 58, rebounding: 68, offball: 86, health: 84, stamina: 82, clutch: 78, ball: 40, portability: 86 }
  },
  big: {
    positions: ["C", "PF"],
    tags: ["篮板", "护框", "掩护"],
    ratings: { overall: 80, scoring: 72, creation: 42, shooting: 58, spacing: 50, defense: 82, rim: 84, rebounding: 84, offball: 78, health: 82, stamina: 82, clutch: 74, ball: 28, portability: 74 }
  },
  star: {
    positions: ["SF", "SG"],
    tags: ["明星版本", "攻坚", "高使用率"],
    ratings: { overall: 88, scoring: 88, creation: 82, shooting: 84, spacing: 84, defense: 78, rim: 46, rebounding: 64, offball: 82, health: 80, stamina: 86, clutch: 86, ball: 80, portability: 84 }
  }
};

function addCandidateSet(team, teamCn, decade, candidates) {
  candidates.forEach((candidate) => {
    if (candidate.cn) PLAYER_CN_BY_NAME[candidate.name] = candidate.cn;
    if (PLAYER_POOL.some((player) => player.name === candidate.name && player.team === team && player.decade === decade)) {
      return;
    }

    const template = ROLE_TEMPLATES[candidate.role] || ROLE_TEMPLATES.wing;
    const positions = candidate.positions || template.positions;
    const tags = candidate.tags || template.tags;
    const ratings = { ...template.ratings, ...(candidate.ratings || {}) };
    const label = candidate.version || `${decade}${candidate.cn || getPlayerCnName(candidate.name)}`;
    PLAYER_POOL.push({
      name: candidate.name,
      team,
      teamCn: getKnownTeamCn(team, teamCn),
      decade,
      version: label,
      positions,
      tags,
      note:
        candidate.note ||
        `${candidate.cn || candidate.name} 的价值主要来自${tags.slice(0, 2).join("和")}，适合在明确职责里补足阵容的形状。`,
      sortBoost: candidate.sortBoost || 0,
      ratings
    });
  });
}

addCandidateSet("Los Angeles Lakers", "湖人", "1980s", [
  { name: "Byron Scott", cn: "斯科特", role: "shooter" },
  { name: "A.C. Green", cn: "艾西格林", role: "forward" },
  { name: "Jamaal Wilkes", cn: "威尔克斯", role: "wing", ratings: { overall: 84, scoring: 82 } },
  { name: "Bob McAdoo", cn: "麦卡杜", role: "big", ratings: { overall: 83, scoring: 82, shooting: 74, spacing: 70 } },
  { name: "Mychal Thompson", cn: "汤普森", role: "big" },
  { name: "Kurt Rambis", cn: "兰比斯", role: "forward", ratings: { scoring: 60, defense: 82, rebounding: 82 } },
  { name: "Norm Nixon", cn: "尼克松", role: "leadGuard", ratings: { overall: 84, creation: 86 } }
]);

addCandidateSet("Boston Celtics", "凯尔特人", "1980s", [
  { name: "Danny Ainge", cn: "安吉", role: "comboGuard" },
  { name: "Cedric Maxwell", cn: "马克斯维尔", role: "forward", ratings: { overall: 83, scoring: 80 } },
  { name: "Bill Walton", cn: "沃顿", role: "big", ratings: { overall: 84, creation: 74, defense: 86, rim: 86, health: 65 } },
  { name: "Scott Wedman", cn: "韦德曼", role: "shooter" },
  { name: "Gerald Henderson", cn: "亨德森", role: "comboGuard" },
  { name: "Rick Robey", cn: "罗比", role: "big" }
]);

addCandidateSet("Detroit Pistons", "活塞", "1980s", [
  { name: "Vinnie Johnson", cn: "维尼约翰逊", role: "comboGuard", ratings: { scoring: 82, clutch: 84 } },
  { name: "Mark Aguirre", cn: "阿奎尔", role: "star", positions: ["SF", "PF"], ratings: { overall: 86, scoring: 86 } },
  { name: "Rick Mahorn", cn: "马洪", role: "big", ratings: { defense: 86, rebounding: 84 } },
  { name: "John Salley", cn: "萨利", role: "big", ratings: { rim: 88, defense: 84 } },
  { name: "James Edwards", cn: "爱德华兹", role: "big", ratings: { scoring: 76 } },
  { name: "Adrian Dantley", cn: "丹特利", role: "star", positions: ["SF"], ratings: { scoring: 90, defense: 62 } }
]);

addCandidateSet("Chicago Bulls", "公牛", "1990s", [
  { name: "Horace Grant", cn: "格兰特", role: "forward", ratings: { overall: 84, defense: 86, rebounding: 84 } },
  { name: "B.J. Armstrong", cn: "阿姆斯特朗", role: "comboGuard" },
  { name: "Ron Harper", cn: "哈珀", role: "defender", positions: ["PG", "SG"], ratings: { creation: 68 } },
  { name: "Luc Longley", cn: "朗利", role: "big" },
  { name: "Steve Kerr", cn: "科尔", role: "shooter", ratings: { shooting: 94, spacing: 95 } },
  { name: "Bill Cartwright", cn: "卡特赖特", role: "big" },
  { name: "John Paxson", cn: "帕克森", role: "shooter" }
]);

addCandidateSet("Houston Rockets", "火箭", "1990s", [
  { name: "Kenny Smith", cn: "肯尼史密斯", role: "leadGuard" },
  { name: "Vernon Maxwell", cn: "麦克斯维尔", role: "comboGuard", ratings: { defense: 78 } },
  { name: "Sam Cassell", cn: "卡塞尔", role: "leadGuard", ratings: { clutch: 86 } },
  { name: "Otis Thorpe", cn: "索普", role: "forward", ratings: { rebounding: 84, defense: 82 } },
  { name: "Mario Elie", cn: "埃利", role: "defender" },
  { name: "Charles Barkley", cn: "巴克利", role: "star", positions: ["PF"], ratings: { overall: 88, scoring: 86, rebounding: 90, defense: 70 } },
  { name: "Matt Bullard", cn: "布拉德", role: "stretchForward" }
]);

addCandidateSet("Orlando Magic", "魔术", "1990s", [
  { name: "Dennis Scott", cn: "斯科特", role: "shooter", ratings: { shooting: 91, spacing: 92 } },
  { name: "Horace Grant", cn: "格兰特", role: "forward", ratings: { defense: 84, rebounding: 82 } },
  { name: "Brian Shaw", cn: "肖", role: "leadGuard" },
  { name: "Scott Skiles", cn: "斯凯尔斯", role: "leadGuard", ratings: { creation: 88 } },
  { name: "Darrell Armstrong", cn: "阿姆斯特朗", role: "leadGuard", ratings: { defense: 80, stamina: 88 } },
  { name: "Bo Outlaw", cn: "奥特洛", role: "forward", ratings: { defense: 84, rim: 74 } },
  { name: "Nick Anderson", cn: "安德森", role: "wing" }
]);

addCandidateSet("San Antonio Spurs", "马刺", "1990s", [
  { name: "Vinny Del Negro", cn: "德尔内格罗", role: "comboGuard" },
  { name: "Terry Cummings", cn: "卡明斯", role: "forward", ratings: { scoring: 80 } },
  { name: "Chuck Person", cn: "珀森", role: "shooter" },
  { name: "Dennis Rodman", cn: "罗德曼", role: "forward", ratings: { overall: 86, defense: 94, rebounding: 98, scoring: 58, spacing: 38 } },
  { name: "Jaren Jackson", cn: "杰克逊", role: "shooter" },
  { name: "Will Perdue", cn: "珀杜", role: "big" }
]);

addCandidateSet("Utah Jazz", "爵士", "1990s", [
  { name: "Antoine Carr", cn: "卡尔", role: "forward" },
  { name: "Greg Ostertag", cn: "奥斯特塔格", role: "big", ratings: { rim: 86, scoring: 62 } },
  { name: "Shandon Anderson", cn: "安德森", role: "wing" },
  { name: "Howard Eisley", cn: "埃斯利", role: "leadGuard" },
  { name: "Adam Keefe", cn: "基夫", role: "forward" },
  { name: "Chris Morris", cn: "莫里斯", role: "wing" }
]);

addCandidateSet("Los Angeles Lakers", "湖人", "2000s", [
  { name: "Derek Fisher", cn: "费舍尔", role: "leadGuard", ratings: { clutch: 86 } },
  { name: "Rick Fox", cn: "福克斯", role: "wing" },
  { name: "Robert Horry", cn: "霍里", role: "stretchForward", ratings: { clutch: 90 } },
  { name: "Andrew Bynum", cn: "拜纳姆", role: "big", ratings: { overall: 84, rim: 86, rebounding: 86 } },
  { name: "Ron Artest", cn: "阿泰斯特", role: "defender", positions: ["SF"], ratings: { overall: 84, defense: 92 } },
  { name: "Glen Rice", cn: "莱斯", role: "shooter", ratings: { scoring: 80 } },
  { name: "Trevor Ariza", cn: "阿里扎", role: "defender" }
]);

addCandidateSet("San Antonio Spurs", "马刺", "2000s", [
  { name: "Bruce Bowen", cn: "鲍文", role: "defender", ratings: { defense: 94, shooting: 78, spacing: 80 } },
  { name: "Robert Horry", cn: "霍里", role: "stretchForward", ratings: { clutch: 88 } },
  { name: "Michael Finley", cn: "芬利", role: "wing" },
  { name: "Brent Barry", cn: "巴里", role: "shooter" },
  { name: "Fabricio Oberto", cn: "奥博托", role: "big" },
  { name: "Stephen Jackson", cn: "杰克逊", role: "wing", ratings: { scoring: 78, defense: 80 } }
]);

addCandidateSet("Dallas Mavericks", "独行侠", "2000s", [
  { name: "Josh Howard", cn: "霍华德", role: "wing", ratings: { overall: 84, scoring: 82 } },
  { name: "Michael Finley", cn: "芬利", role: "star", ratings: { overall: 86, scoring: 86 } },
  { name: "Steve Nash", cn: "纳什", role: "leadGuard", ratings: { overall: 88, creation: 92, shooting: 90 } },
  { name: "Jerry Stackhouse", cn: "斯塔克豪斯", role: "comboGuard", ratings: { scoring: 82 } },
  { name: "Erick Dampier", cn: "丹皮尔", role: "big" },
  { name: "Devin Harris", cn: "哈里斯", role: "leadGuard" },
  { name: "Shawn Marion", cn: "马里昂", role: "forward", ratings: { defense: 84, offball: 88 } }
]);

addCandidateSet("Phoenix Suns", "太阳", "2000s", [
  { name: "Joe Johnson", cn: "乔约翰逊", role: "comboGuard", ratings: { overall: 84, scoring: 82 } },
  { name: "Raja Bell", cn: "贝尔", role: "defender", ratings: { shooting: 82, spacing: 84 } },
  { name: "Boris Diaw", cn: "迪奥", role: "stretchForward", ratings: { creation: 78 } },
  { name: "Leandro Barbosa", cn: "巴博萨", role: "comboGuard", ratings: { scoring: 82, stamina: 88 } },
  { name: "Quentin Richardson", cn: "理查德森", role: "shooter" },
  { name: "Grant Hill", cn: "希尔", role: "wing", ratings: { overall: 82, creation: 72, health: 74 } },
  { name: "Jason Richardson", cn: "理查德森", role: "wing", ratings: { scoring: 82 } }
]);

addCandidateSet("Minnesota Timberwolves", "森林狼", "2000s", [
  { name: "Wally Szczerbiak", cn: "斯泽比亚克", role: "shooter", ratings: { scoring: 80 } },
  { name: "Troy Hudson", cn: "哈德森", role: "leadGuard" },
  { name: "Terrell Brandon", cn: "布兰登", role: "leadGuard", ratings: { overall: 84, creation: 88, health: 68 } },
  { name: "Rasho Nesterovic", cn: "内斯特洛维奇", role: "big" },
  { name: "Joe Smith", cn: "乔史密斯", role: "forward" },
  { name: "Trenton Hassell", cn: "哈塞尔", role: "defender" }
]);

addCandidateSet("Miami Heat", "热火", "2010s", [
  { name: "Mario Chalmers", cn: "查尔莫斯", role: "leadGuard" },
  { name: "Shane Battier", cn: "巴蒂尔", role: "defender", positions: ["SF", "PF"], ratings: { shooting: 82, spacing: 84 } },
  { name: "Mike Miller", cn: "米勒", role: "shooter", ratings: { shooting: 92, spacing: 93, health: 70 } },
  { name: "Udonis Haslem", cn: "哈斯勒姆", role: "big", ratings: { defense: 80, rebounding: 80 } },
  { name: "Norris Cole", cn: "科尔", role: "leadGuard" },
  { name: "Rashard Lewis", cn: "刘易斯", role: "stretchForward" },
  { name: "Chris Andersen", cn: "安德森", role: "big", ratings: { rim: 86 } }
]);

addCandidateSet("Golden State Warriors", "勇士", "2010s", [
  { name: "Shaun Livingston", cn: "利文斯顿", role: "leadGuard", ratings: { shooting: 72, spacing: 68, health: 78 } },
  { name: "Andrew Bogut", cn: "博古特", role: "big", ratings: { defense: 88, rim: 88, creation: 62 } },
  { name: "Harrison Barnes", cn: "巴恩斯", role: "wing" },
  { name: "David Lee", cn: "大卫李", role: "forward", ratings: { scoring: 82, rebounding: 86, defense: 64 } },
  { name: "Zaza Pachulia", cn: "帕楚里亚", role: "big" },
  { name: "Kevon Looney", cn: "卢尼", role: "big", ratings: { rebounding: 84, portability: 82 } },
  { name: "Leandro Barbosa", cn: "巴博萨", role: "comboGuard" },
  { name: "David West", cn: "韦斯特", role: "forward", ratings: { creation: 68, shooting: 76 } },
  { name: "JaVale McGee", cn: "麦基", role: "big", ratings: { rim: 88, stamina: 74 } }
]);

addCandidateSet("Houston Rockets", "火箭", "2010s", [
  { name: "Eric Gordon", cn: "戈登", role: "comboGuard", ratings: { shooting: 88, spacing: 90 } },
  { name: "Trevor Ariza", cn: "阿里扎", role: "defender", ratings: { shooting: 80, spacing: 82 } },
  { name: "P.J. Tucker", cn: "塔克", role: "defender", positions: ["PF", "SF"], ratings: { rebounding: 78, spacing: 80 } },
  { name: "Ryan Anderson", cn: "安德森", role: "stretchForward", ratings: { shooting: 90, defense: 58 } },
  { name: "Patrick Beverley", cn: "贝弗利", role: "defender", positions: ["PG", "SG"] },
  { name: "Luc Mbah a Moute", cn: "巴莫特", role: "defender" },
  { name: "Gerald Green", cn: "杰拉德格林", role: "shooter" }
]);

addCandidateSet("San Antonio Spurs", "马刺", "2010s", [
  { name: "Danny Green", cn: "丹尼格林", role: "defender", ratings: { shooting: 86, spacing: 88 } },
  { name: "Manu Ginobili", cn: "吉诺比利", role: "comboGuard", ratings: { overall: 84, creation: 82, clutch: 88 } },
  { name: "Boris Diaw", cn: "迪奥", role: "stretchForward", ratings: { creation: 80 } },
  { name: "Patty Mills", cn: "米尔斯", role: "comboGuard", ratings: { shooting: 86, spacing: 88 } },
  { name: "Tiago Splitter", cn: "斯普利特", role: "big" },
  { name: "LaMarcus Aldridge", cn: "阿尔德里奇", role: "star", positions: ["PF", "C"], ratings: { scoring: 86, shooting: 82, spacing: 78 } },
  { name: "David West", cn: "韦斯特", role: "forward" }
]);

addCandidateSet("Boston Celtics", "凯尔特人", "2010s", [
  { name: "Ray Allen", cn: "雷阿伦", role: "shooter", ratings: { shooting: 92, spacing: 94 } },
  { name: "Avery Bradley", cn: "布拉德利", role: "defender", positions: ["SG", "PG"], ratings: { shooting: 78 } },
  { name: "Jeff Green", cn: "杰夫格林", role: "wing" },
  { name: "Brandon Bass", cn: "巴斯", role: "forward" },
  { name: "Isaiah Thomas", cn: "小托马斯", role: "star", positions: ["PG"], ratings: { overall: 89, scoring: 90, creation: 86, defense: 52, health: 72 } },
  { name: "Al Horford", cn: "霍福德", role: "big", ratings: { overall: 86, creation: 76, shooting: 78, defense: 86 } },
  { name: "Jaylen Brown", cn: "杰伦布朗", role: "wing" },
  { name: "Jayson Tatum", cn: "塔图姆", role: "wing", ratings: { overall: 84, scoring: 82 } }
]);

addCandidateSet("Toronto Raptors", "猛龙", "2010s", [
  { name: "Kawhi Leonard", cn: "莱昂纳德", role: "star", positions: ["SF", "PF"], version: "2018-19莱昂纳德", tags: ["明星版本", "攻防一体", "季后赛攻坚"], sortBoost: 2000, note: "中距离强解、低失误持球和外线防守威慑同时在线，是单年冠军带队里最硬的侧翼版本之一。", ratings: { overall: 96, scoring: 95, creation: 86, shooting: 90, spacing: 89, defense: 94, rim: 64, rebounding: 82, offball: 88, health: 82, stamina: 90, clutch: 96, ball: 86, portability: 95 } },
  { name: "Kyle Lowry", cn: "洛瑞", role: "leadGuard", version: "2018-19洛瑞", ratings: { overall: 89, creation: 90, shooting: 86, spacing: 87, defense: 84, clutch: 88 } },
  { name: "Pascal Siakam", cn: "西亚卡姆", role: "forward", version: "2018-19西亚卡姆", ratings: { overall: 86, scoring: 84, defense: 84, rebounding: 80 } },
  { name: "Marc Gasol", cn: "马克加索尔", role: "big", version: "2018-19马克加索尔", ratings: { overall: 85, creation: 78, shooting: 78, spacing: 78, defense: 88, rim: 84 } },
  { name: "Serge Ibaka", cn: "伊巴卡", role: "big", version: "2018-19伊巴卡", ratings: { overall: 84, scoring: 80, shooting: 76, defense: 84, rim: 86 } },
  { name: "Fred VanVleet", cn: "范弗利特", role: "comboGuard", version: "2018-19范弗利特", ratings: { overall: 82, creation: 78, shooting: 84, spacing: 86, defense: 78 } },
  { name: "Danny Green", cn: "丹尼格林", role: "defender", version: "2018-19丹尼格林", ratings: { overall: 82, shooting: 88, spacing: 90, defense: 84 } },
  { name: "OG Anunoby", cn: "阿奴诺比", role: "defender", positions: ["SF", "PF"], version: "2017-19阿奴诺比", ratings: { overall: 80, defense: 84, shooting: 76 } }
]);

addCandidateSet("Oklahoma City Thunder", "雷霆", "2010s", [
  { name: "James Harden", cn: "哈登", role: "comboGuard", ratings: { overall: 86, scoring: 84, creation: 82 } },
  { name: "Reggie Jackson", cn: "雷吉杰克逊", role: "leadGuard" },
  { name: "Steven Adams", cn: "亚当斯", role: "big", ratings: { rebounding: 88, defense: 84 } },
  { name: "Andre Roberson", cn: "罗伯森", role: "defender", ratings: { shooting: 48, spacing: 42, defense: 94 } },
  { name: "Nick Collison", cn: "科里森", role: "forward" },
  { name: "Kendrick Perkins", cn: "帕金斯", role: "big", ratings: { scoring: 58, defense: 82 } },
  { name: "Victor Oladipo", cn: "奥拉迪波", role: "comboGuard", ratings: { overall: 83, defense: 80 } },
  { name: "Paul George", cn: "乔治", role: "star", positions: ["SF", "SG"], ratings: { overall: 92, scoring: 90, defense: 92 } }
]);

addCandidateSet("Milwaukee Bucks", "雄鹿", "2020s", [
  { name: "Brook Lopez", cn: "洛佩兹", role: "big", ratings: { shooting: 82, spacing: 82, defense: 88, rim: 90 } },
  { name: "Bobby Portis", cn: "波蒂斯", role: "stretchForward" },
  { name: "Donte DiVincenzo", cn: "迪文琴佐", role: "comboGuard", ratings: { defense: 78 } },
  { name: "Grayson Allen", cn: "阿伦", role: "shooter" },
  { name: "Pat Connaughton", cn: "康诺顿", role: "wing" },
  { name: "Damian Lillard", cn: "利拉德", role: "star", positions: ["PG"], ratings: { overall: 88, scoring: 90, shooting: 92, spacing: 94, defense: 56 } }
]);

addCandidateSet("Los Angeles Lakers", "湖人", "2020s", [
  { name: "Luka Doncic", cn: "东契奇", role: "star", positions: ["PG", "SG", "SF"], version: "2024-26东契奇", sortBoost: 900, note: "湖人版本仍是顶级持球大核，挡拆阅读、后撤步三分和禁区传球能直接重塑半场进攻。", ratings: { overall: 97, scoring: 97, creation: 98, shooting: 89, spacing: 89, defense: 66, rim: 36, rebounding: 84, offball: 60, health: 82, stamina: 91, clutch: 95, ball: 98, portability: 84 } },
  { name: "Russell Westbrook", cn: "威少", role: "leadGuard", ratings: { overall: 80, scoring: 76, creation: 82, shooting: 62, spacing: 56, rebounding: 74, ball: 82, portability: 62 } },
  { name: "Austin Reaves", cn: "里夫斯", role: "comboGuard", version: "2022-26里夫斯", sortBoost: 350, ratings: { overall: 84, scoring: 82, creation: 80, shooting: 86, spacing: 87, clutch: 84 } },
  { name: "Alex Caruso", cn: "卡鲁索", role: "defender", positions: ["PG", "SG"], ratings: { defense: 90, creation: 66, shooting: 76 } },
  { name: "Kyle Kuzma", cn: "库兹马", role: "forward", ratings: { scoring: 78, rebounding: 72 } },
  { name: "Kentavious Caldwell-Pope", cn: "波普", role: "defender", ratings: { shooting: 82, spacing: 84, defense: 84 } },
  { name: "Rajon Rondo", cn: "隆多", role: "leadGuard", ratings: { overall: 80, creation: 86, shooting: 72, spacing: 68, clutch: 86 } },
  { name: "Dwight Howard", cn: "霍华德", role: "big", ratings: { overall: 80, defense: 84, rim: 86, rebounding: 86, scoring: 66 } },
  { name: "Dennis Schroder", cn: "施罗德", role: "leadGuard", ratings: { scoring: 78, creation: 80 } },
  { name: "D'Angelo Russell", cn: "拉塞尔", role: "leadGuard", ratings: { scoring: 82, creation: 82, shooting: 86, spacing: 87, defense: 58 } },
  { name: "Rui Hachimura", cn: "八村塁", role: "forward", ratings: { scoring: 78, shooting: 78, spacing: 76 } },
  { name: "Jarred Vanderbilt", cn: "范德比尔特", role: "defender", positions: ["PF", "SF"], ratings: { defense: 86, rebounding: 82, shooting: 54, spacing: 48 } }
]);

addCandidateSet("Denver Nuggets", "掘金", "2020s", [
  { name: "Michael Porter Jr.", cn: "小波特", role: "shooter", positions: ["SF", "PF"], ratings: { overall: 85, scoring: 84, rebounding: 72 } },
  { name: "Kentavious Caldwell-Pope", cn: "波普", role: "defender", ratings: { shooting: 84, spacing: 86 } },
  { name: "Bruce Brown", cn: "布鲁斯布朗", role: "defender", positions: ["SG", "SF", "PG"] },
  { name: "Will Barton", cn: "巴顿", role: "wing" },
  { name: "Monte Morris", cn: "莫里斯", role: "leadGuard" },
  { name: "Gary Harris", cn: "哈里斯", role: "defender" },
  { name: "Paul Millsap", cn: "米尔萨普", role: "forward", ratings: { overall: 82, defense: 84 } }
]);

addCandidateSet("Dallas Mavericks", "独行侠", "2020s", [
  { name: "Anthony Davis", cn: "戴维斯", role: "star", positions: ["PF", "C"], version: "2024-26戴维斯", sortBoost: 650, note: "独行侠版本的核心价值仍在护框、换防和高效终结，健康时能把球队防守上限直接拉高。", ratings: { overall: 94, scoring: 90, creation: 70, shooting: 78, spacing: 76, defense: 97, rim: 98, rebounding: 91, offball: 90, health: 74, stamina: 84, clutch: 88, ball: 70, portability: 94 } },
  { name: "Kristaps Porzingis", cn: "波尔津吉斯", role: "big", ratings: { overall: 86, shooting: 84, spacing: 84, rim: 88, health: 72 } },
  { name: "Tim Hardaway Jr.", cn: "小哈达威", role: "shooter", ratings: { scoring: 80 } },
  { name: "Dorian Finney-Smith", cn: "芬尼史密斯", role: "defender", ratings: { shooting: 78, spacing: 80 } },
  { name: "P.J. Washington", cn: "华盛顿", role: "stretchForward", ratings: { defense: 80 } },
  { name: "Daniel Gafford", cn: "加福德", role: "big", ratings: { rim: 88, offball: 84 } },
  { name: "Dereck Lively II", cn: "莱夫利", role: "big", ratings: { rim: 86, rebounding: 82 } },
  { name: "Josh Green", cn: "格林", role: "wing" },
  { name: "Derrick Jones Jr.", cn: "琼斯", role: "defender", ratings: { rim: 68 } }
]);

addCandidateSet("Boston Celtics", "凯尔特人", "2020s", [
  { name: "Jrue Holiday", cn: "霍勒迪", role: "defender", positions: ["PG", "SG"], ratings: { overall: 88, creation: 82, shooting: 82 } },
  { name: "Derrick White", cn: "怀特", role: "comboGuard", ratings: { defense: 86, rim: 52 } },
  { name: "Kristaps Porzingis", cn: "波尔津吉斯", role: "big", ratings: { overall: 87, shooting: 86, spacing: 86, rim: 88 } },
  { name: "Al Horford", cn: "霍福德", role: "big", ratings: { shooting: 82, spacing: 82, defense: 86 } },
  { name: "Robert Williams III", cn: "罗威", role: "big", ratings: { rim: 92, defense: 90, health: 68 } },
  { name: "Malcolm Brogdon", cn: "布罗格登", role: "comboGuard", ratings: { creation: 80, shooting: 86 } },
  { name: "Grant Williams", cn: "格威", role: "stretchForward", ratings: { defense: 80 } },
  { name: "Payton Pritchard", cn: "普理查德", role: "comboGuard" }
]);

addCandidateSet("Philadelphia 76ers", "76人", "2020s", [
  { name: "Tobias Harris", cn: "哈里斯", role: "forward", ratings: { scoring: 80, shooting: 80, spacing: 80 } },
  { name: "Ben Simmons", cn: "西蒙斯", role: "leadGuard", positions: ["PG", "PF"], ratings: { overall: 86, creation: 86, shooting: 40, spacing: 35, defense: 90, rebounding: 82 } },
  { name: "Seth Curry", cn: "塞斯库里", role: "shooter", ratings: { shooting: 92, spacing: 94 } },
  { name: "Danny Green", cn: "丹尼格林", role: "defender", ratings: { shooting: 82, spacing: 84 } },
  { name: "Matisse Thybulle", cn: "赛布尔", role: "defender", ratings: { defense: 92, shooting: 58, spacing: 54 } },
  { name: "De'Anthony Melton", cn: "梅尔顿", role: "defender", positions: ["SG", "PG"], ratings: { shooting: 80 } }
]);

addCandidateSet("Oklahoma City Thunder", "雷霆", "2020s", [
  { name: "Josh Giddey", cn: "吉迪", role: "leadGuard", positions: ["PG", "SG"], ratings: { creation: 86, shooting: 66, spacing: 62, rebounding: 78 } },
  { name: "Lu Dort", cn: "多尔特", role: "defender", ratings: { defense: 90, shooting: 76 } },
  { name: "Cason Wallace", cn: "华莱士", role: "defender", positions: ["PG", "SG"] },
  { name: "Isaiah Joe", cn: "乔", role: "shooter", ratings: { shooting: 90, spacing: 92 } },
  { name: "Kenrich Williams", cn: "肯里奇威廉姆斯", role: "wing" },
  { name: "Aaron Wiggins", cn: "威金斯", role: "wing" }
]);

addCandidateSet("Miami Heat", "热火", "2020s", [
  { name: "Duncan Robinson", cn: "邓肯罗宾逊", role: "shooter", ratings: { shooting: 92, spacing: 94, defense: 58 } },
  { name: "Gabe Vincent", cn: "文森特", role: "leadGuard" },
  { name: "Max Strus", cn: "斯特鲁斯", role: "shooter" },
  { name: "Kyle Lowry", cn: "洛瑞", role: "leadGuard", ratings: { overall: 82, creation: 84, defense: 78 } },
  { name: "Caleb Martin", cn: "马丁", role: "wing", ratings: { defense: 80 } },
  { name: "P.J. Tucker", cn: "塔克", role: "defender", positions: ["PF", "SF"] },
  { name: "Goran Dragic", cn: "德拉季奇", role: "leadGuard", ratings: { scoring: 82, creation: 84 } },
  { name: "Kendrick Nunn", cn: "纳恩", role: "comboGuard" }
]);

addCandidateSet("Portland Trail Blazers", "开拓者", "2020s", [
  { name: "Carmelo Anthony", cn: "安东尼", role: "star", positions: ["PF", "SF"], ratings: { overall: 82, scoring: 84, defense: 60 } },
  { name: "Norman Powell", cn: "鲍威尔", role: "comboGuard", ratings: { scoring: 80 } },
  { name: "Robert Covington", cn: "科温顿", role: "defender", positions: ["PF", "SF"], ratings: { shooting: 78, spacing: 80 } },
  { name: "Anfernee Simons", cn: "西蒙斯", role: "comboGuard", ratings: { scoring: 84, shooting: 90, spacing: 92 } },
  { name: "Gary Trent Jr.", cn: "小特伦特", role: "shooter", ratings: { defense: 76 } },
  { name: "Hassan Whiteside", cn: "怀特塞德", role: "big", ratings: { rim: 90, rebounding: 90, portability: 64 } },
  { name: "Jerami Grant", cn: "格兰特", role: "wing", ratings: { scoring: 82, defense: 82 } }
]);

addCandidateSet("Indiana Pacers", "步行者", "2020s", [
  { name: "Tyrese Haliburton", cn: "哈里伯顿", role: "star", positions: ["PG"], version: "2023-25哈里伯顿", tags: ["明星版本", "控场", "投传"], note: "超大范围传球、低失误控场和持球三分组成进攻发动机，是步行者提速体系的核心答案。", ratings: { overall: 94, scoring: 88, creation: 97, shooting: 90, spacing: 91, defense: 66, ball: 94, portability: 91 } },
  { name: "Pascal Siakam", cn: "西亚卡姆", role: "star", positions: ["PF", "SF"], version: "2024-25西亚卡姆", ratings: { overall: 90, scoring: 88, creation: 78, defense: 82, rebounding: 78 } },
  { name: "Myles Turner", cn: "特纳", role: "big", version: "2022-25特纳", ratings: { overall: 86, shooting: 82, spacing: 82, defense: 88, rim: 92 } },
  { name: "Andrew Nembhard", cn: "内姆哈德", role: "leadGuard", version: "2024-25内姆哈德", ratings: { overall: 82, creation: 82, defense: 78 } },
  { name: "Bennedict Mathurin", cn: "马瑟林", role: "comboGuard", version: "2023-25马瑟林", ratings: { scoring: 82 } },
  { name: "Aaron Nesmith", cn: "内史密斯", role: "defender", positions: ["SF", "SG"], version: "2023-25内史密斯", ratings: { shooting: 82, spacing: 84, defense: 84 } },
  { name: "T.J. McConnell", cn: "麦康奈尔", role: "leadGuard", version: "2023-25麦康奈尔", ratings: { creation: 84, defense: 78, stamina: 86 } },
  { name: "Obi Toppin", cn: "托平", role: "forward", version: "2023-25托平", ratings: { offball: 86, scoring: 78 } }
]);

addCandidateSet("Cleveland Cavaliers", "骑士", "2020s", [
  { name: "Donovan Mitchell", cn: "米切尔", role: "star", positions: ["SG", "PG"], version: "2022-25米切尔", sortBoost: 500, note: "爆发第一步、持球三分和季后赛强攻都很成熟，是骑士外线最可靠的硬解来源。", ratings: { overall: 94, scoring: 95, creation: 88, shooting: 88, spacing: 89, defense: 78, clutch: 92, ball: 90 } },
  { name: "Evan Mobley", cn: "莫布里", role: "big", positions: ["PF", "C"], version: "2023-25莫布里", ratings: { overall: 89, defense: 94, rim: 92, rebounding: 84, offball: 84 } },
  { name: "Darius Garland", cn: "加兰", role: "leadGuard", version: "2021-24加兰", ratings: { overall: 88, creation: 90, shooting: 88, spacing: 89 } },
  { name: "Jarrett Allen", cn: "阿伦", role: "big", version: "2021-25阿伦", ratings: { overall: 87, defense: 88, rim: 90, rebounding: 90, offball: 86 } },
  { name: "Max Strus", cn: "斯特鲁斯", role: "shooter", version: "2023-25斯特鲁斯", ratings: { shooting: 86, spacing: 88 } },
  { name: "Caris LeVert", cn: "勒韦尔", role: "comboGuard", version: "2022-25勒韦尔", ratings: { scoring: 80, creation: 78 } },
  { name: "Isaac Okoro", cn: "奥科罗", role: "defender", version: "2021-25奥科罗", ratings: { defense: 84 } },
  { name: "Dean Wade", cn: "迪恩韦德", role: "stretchForward", version: "2022-25迪恩韦德", ratings: { defense: 80, spacing: 82 } }
]);

addCandidateSet("Minnesota Timberwolves", "森林狼", "2020s", [
  { name: "Anthony Edwards", cn: "爱德华兹", role: "star", positions: ["SG", "SF"], version: "2023-25爱德华兹", note: "力量型突破、急停投和外线领防气质一起成型，是森林狼这个年代最有上限的持球核心。", ratings: { overall: 94, scoring: 94, creation: 86, shooting: 86, spacing: 86, defense: 86, clutch: 91, ball: 88 } },
  { name: "Rudy Gobert", cn: "戈贝尔", role: "big", version: "2023-25戈贝尔", ratings: { overall: 89, defense: 96, rim: 97, rebounding: 94, scoring: 72 } },
  { name: "Karl-Anthony Towns", cn: "唐斯", role: "stretchForward", positions: ["C", "PF"], version: "2021-24唐斯", ratings: { overall: 90, scoring: 90, shooting: 91, spacing: 92, rebounding: 86 } },
  { name: "Jaden McDaniels", cn: "麦克丹尼尔斯", role: "defender", positions: ["SF", "PF"], version: "2022-25麦克丹尼尔斯", ratings: { defense: 90, shooting: 78 } },
  { name: "Naz Reid", cn: "纳兹里德", role: "stretchForward", positions: ["C", "PF"], version: "2023-25纳兹里德", ratings: { scoring: 82, shooting: 84, spacing: 85 } },
  { name: "Mike Conley", cn: "康利", role: "leadGuard", version: "2023-25康利", ratings: { creation: 84, shooting: 84, defense: 78 } },
  { name: "Julius Randle", cn: "兰德尔", role: "star", positions: ["PF"], version: "2024-25兰德尔", ratings: { overall: 86, scoring: 86, creation: 76, rebounding: 82 } },
  { name: "Nickeil Alexander-Walker", cn: "亚历山大沃克", role: "defender", positions: ["SG", "SF"], version: "2023-25亚历山大沃克", ratings: { defense: 84, shooting: 80 } }
]);

addCandidateSet("New York Knicks", "尼克斯", "2020s", [
  { name: "Jalen Brunson", cn: "布伦森", role: "star", positions: ["PG"], version: "2022-25布伦森", note: "脚步、节奏、背身小打大和中距离选择高度成熟，是尼克斯近年半场攻坚的绝对核心。", ratings: { overall: 94, scoring: 94, creation: 91, shooting: 88, spacing: 88, clutch: 93, ball: 91 } },
  { name: "Karl-Anthony Towns", cn: "唐斯", role: "stretchForward", positions: ["C", "PF"], version: "2024-25唐斯", ratings: { overall: 90, scoring: 90, shooting: 91, spacing: 92, rebounding: 88 } },
  { name: "Donte DiVincenzo", cn: "迪文琴佐", role: "comboGuard", positions: ["SG", "PG"], version: "2023-24迪文琴佐", sortBoost: 350, note: "尼克斯版本是高产接球投、二次持球和积极防守的后场拼图，特别适合布伦森身边拉开空间。", ratings: { overall: 84, scoring: 82, creation: 76, shooting: 88, spacing: 90, defense: 82, rebounding: 64, offball: 88, clutch: 82, ball: 74, portability: 88 } },
  { name: "OG Anunoby", cn: "阿奴诺比", role: "defender", positions: ["SF", "PF"], version: "2023-25阿奴诺比", ratings: { overall: 87, defense: 92, shooting: 82, spacing: 84 } },
  { name: "Mikal Bridges", cn: "布里奇斯", role: "wing", version: "2024-25布里奇斯", ratings: { overall: 86, scoring: 82, defense: 84, shooting: 84 } },
  { name: "Josh Hart", cn: "哈特", role: "wing", positions: ["SG", "SF"], version: "2022-25哈特", ratings: { rebounding: 82, defense: 82, offball: 86 } },
  { name: "Julius Randle", cn: "兰德尔", role: "star", positions: ["PF"], version: "2020-24兰德尔", ratings: { overall: 89, scoring: 88, creation: 78, rebounding: 86 } },
  { name: "RJ Barrett", cn: "巴雷特", role: "wing", version: "2020-23巴雷特", ratings: { scoring: 80 } },
  { name: "Mitchell Robinson", cn: "米切尔罗宾逊", role: "big", version: "2020-24米切尔罗宾逊", ratings: { defense: 88, rim: 90, rebounding: 92 } }
]);

addCandidateSet("Phoenix Suns", "太阳", "2020s", [
  { name: "Devin Booker", cn: "布克", role: "star", positions: ["SG", "PG"], version: "2020-25布克", note: "中距离、持球投和副控阅读越来越完整，是能在无球和主攻之间切换的精英得分后卫。", ratings: { overall: 94, scoring: 95, creation: 88, shooting: 90, spacing: 90, clutch: 92 } },
  { name: "Kevin Durant", cn: "杜兰特", role: "star", positions: ["SF", "PF"], version: "2022-25杜兰特", ratings: { overall: 95, scoring: 96, shooting: 93, spacing: 93, defense: 82, rim: 70 } },
  { name: "Chris Paul", cn: "保罗", role: "leadGuard", version: "2020-22保罗", ratings: { overall: 90, creation: 94, shooting: 88, clutch: 91 } },
  { name: "Deandre Ayton", cn: "艾顿", role: "big", version: "2020-22艾顿", ratings: { overall: 85, rebounding: 88, defense: 82, offball: 84 } },
  { name: "Mikal Bridges", cn: "布里奇斯", role: "defender", version: "2020-23布里奇斯", ratings: { overall: 86, defense: 90, shooting: 84 } },
  { name: "Bradley Beal", cn: "比尔", role: "comboGuard", version: "2023-25比尔", ratings: { scoring: 84, creation: 78, shooting: 84 } },
  { name: "Cameron Johnson", cn: "卡梅伦约翰逊", role: "shooter", version: "2020-23卡梅伦约翰逊", ratings: { shooting: 88, spacing: 90 } },
  { name: "Jae Crowder", cn: "克劳德", role: "defender", positions: ["PF", "SF"], version: "2020-22克劳德", ratings: { defense: 82, spacing: 80 } }
]);

addCandidateSet("Atlanta Hawks", "老鹰", "2020s", [
  { name: "Trae Young", cn: "特雷杨", role: "star", positions: ["PG"], version: "2020-25特雷杨", note: "超远持球投、挡拆传球和抛投威胁连成一体，是能独自撑起空间和产量的小后卫核心。", ratings: { overall: 91, scoring: 92, creation: 95, shooting: 90, spacing: 92, defense: 50, ball: 94 } },
  { name: "Dejounte Murray", cn: "默里", role: "leadGuard", version: "2022-24默里", ratings: { overall: 86, creation: 84, defense: 82, rebounding: 76 } },
  { name: "Jalen Johnson", cn: "杰伦约翰逊", role: "forward", version: "2023-25杰伦约翰逊", ratings: { overall: 85, scoring: 82, creation: 72, rebounding: 84 } },
  { name: "John Collins", cn: "科林斯", role: "forward", version: "2020-23科林斯", ratings: { scoring: 82, rebounding: 82, offball: 86 } },
  { name: "Clint Capela", cn: "卡佩拉", role: "big", version: "2020-24卡佩拉", ratings: { defense: 86, rim: 88, rebounding: 92 } },
  { name: "Bogdan Bogdanovic", cn: "博格丹", role: "comboGuard", version: "2020-25博格丹", ratings: { scoring: 82, shooting: 86, spacing: 88 } },
  { name: "De'Andre Hunter", cn: "亨特", role: "wing", version: "2020-25亨特", ratings: { defense: 80, shooting: 80 } },
  { name: "Onyeka Okongwu", cn: "奥孔古", role: "big", version: "2022-25奥孔古", ratings: { defense: 84, rim: 86, offball: 82 } }
]);

addCandidateSet("Brooklyn Nets", "篮网", "2020s", [
  { name: "Kevin Durant", cn: "杜兰特", role: "star", positions: ["SF", "PF"], version: "2020-23杜兰特", sortBoost: 500, ratings: { overall: 96, scoring: 97, shooting: 94, spacing: 94, defense: 82, clutch: 94 } },
  { name: "James Harden", cn: "哈登", role: "star", positions: ["PG", "SG"], version: "2020-22哈登", ratings: { overall: 92, scoring: 90, creation: 96, shooting: 88, spacing: 89 } },
  { name: "Kyrie Irving", cn: "欧文", role: "star", positions: ["PG", "SG"], version: "2020-23欧文", ratings: { overall: 91, scoring: 94, creation: 88, shooting: 92, ball: 94 } },
  { name: "Mikal Bridges", cn: "布里奇斯", role: "wing", version: "2022-24布里奇斯", ratings: { overall: 86, scoring: 84, defense: 84, shooting: 84 } },
  { name: "Nic Claxton", cn: "克拉克斯顿", role: "big", version: "2021-25克拉克斯顿", ratings: { defense: 88, rim: 90, rebounding: 84 } },
  { name: "Cam Thomas", cn: "托马斯", role: "comboGuard", version: "2022-25托马斯", ratings: { scoring: 86 } },
  { name: "Joe Harris", cn: "乔哈里斯", role: "shooter", version: "2020-22乔哈里斯", ratings: { shooting: 91, spacing: 93 } },
  { name: "Bruce Brown", cn: "布鲁斯布朗", role: "defender", positions: ["SG", "SF"], version: "2020-22布鲁斯布朗", ratings: { defense: 82, offball: 84 } }
]);

addCandidateSet("Charlotte Hornets", "黄蜂", "2020s", [
  { name: "LaMelo Ball", cn: "拉梅洛鲍尔", role: "star", positions: ["PG"], version: "2021-25拉梅洛鲍尔", ratings: { overall: 88, scoring: 86, creation: 92, shooting: 86, spacing: 88, rebounding: 76 } },
  { name: "Brandon Miller", cn: "布兰登米勒", role: "wing", version: "2023-25布兰登米勒", ratings: { overall: 84, scoring: 84, shooting: 84, spacing: 85 } },
  { name: "Miles Bridges", cn: "布里奇斯", role: "forward", version: "2020-25布里奇斯", ratings: { scoring: 84, rebounding: 78 } },
  { name: "Terry Rozier", cn: "罗齐尔", role: "comboGuard", version: "2020-24罗齐尔", ratings: { scoring: 84, creation: 78, shooting: 84 } },
  { name: "P.J. Washington", cn: "华盛顿", role: "stretchForward", version: "2020-24华盛顿", ratings: { defense: 78, shooting: 82, spacing: 84 } },
  { name: "Gordon Hayward", cn: "海沃德", role: "wing", version: "2020-23海沃德", ratings: { overall: 82, creation: 76, shooting: 82 } },
  { name: "Mark Williams", cn: "马克威廉姆斯", role: "big", version: "2022-25马克威廉姆斯", ratings: { rim: 86, rebounding: 86 } },
  { name: "Cody Martin", cn: "科迪马丁", role: "defender", version: "2021-24科迪马丁", ratings: { defense: 82 } }
]);

addCandidateSet("Chicago Bulls", "公牛", "2020s", [
  { name: "DeMar DeRozan", cn: "德罗赞", role: "star", positions: ["SF", "SG"], version: "2021-24德罗赞", ratings: { overall: 90, scoring: 91, creation: 84, shooting: 78, clutch: 92 } },
  { name: "Zach LaVine", cn: "拉文", role: "star", positions: ["SG"], version: "2020-23拉文", ratings: { overall: 89, scoring: 91, shooting: 89, spacing: 90, creation: 80 } },
  { name: "Nikola Vucevic", cn: "武切维奇", role: "stretchForward", positions: ["C"], version: "2020-25武切维奇", ratings: { overall: 86, scoring: 84, shooting: 82, rebounding: 88 } },
  { name: "Lonzo Ball", cn: "朗佐鲍尔", role: "leadGuard", version: "2021-22朗佐鲍尔", ratings: { creation: 82, shooting: 84, defense: 86 } },
  { name: "Alex Caruso", cn: "卡鲁索", role: "defender", positions: ["PG", "SG"], version: "2021-24卡鲁索", ratings: { defense: 92, shooting: 78 } },
  { name: "Coby White", cn: "科比怀特", role: "comboGuard", version: "2023-25科比怀特", ratings: { scoring: 82, shooting: 84, creation: 78 } },
  { name: "Patrick Williams", cn: "帕特里克威廉姆斯", role: "wing", version: "2020-25帕特里克威廉姆斯", ratings: { defense: 78, shooting: 78 } },
  { name: "Ayo Dosunmu", cn: "多森姆", role: "comboGuard", version: "2022-25多森姆", ratings: { defense: 80, scoring: 76 } }
]);

addCandidateSet("Houston Rockets", "火箭", "2020s", [
  { name: "Kevin Durant", cn: "杜兰特", role: "star", positions: ["SF", "PF"], version: "2025-26杜兰特", sortBoost: 850, note: "火箭版本仍保留历史级中距离和无视防守高度的投篮价值，能给年轻阵容补上最稳定的半场强解。", ratings: { overall: 94, scoring: 95, creation: 82, shooting: 93, spacing: 93, defense: 80, rim: 66, rebounding: 76, offball: 90, health: 78, stamina: 86, clutch: 93, ball: 82, portability: 94 } },
  { name: "Alperen Sengun", cn: "申京", role: "star", positions: ["C"], version: "2023-25申京", ratings: { overall: 89, scoring: 88, creation: 84, rebounding: 86, defense: 76 } },
  { name: "Jalen Green", cn: "杰伦格林", role: "comboGuard", version: "2021-25杰伦格林", ratings: { overall: 85, scoring: 88, shooting: 82, creation: 76 } },
  { name: "Fred VanVleet", cn: "范弗利特", role: "leadGuard", version: "2023-25范弗利特", ratings: { overall: 85, creation: 86, shooting: 84, defense: 80 } },
  { name: "Amen Thompson", cn: "阿门汤普森", role: "defender", positions: ["PG", "SF"], version: "2024-25阿门汤普森", ratings: { overall: 84, defense: 88, rebounding: 84, creation: 76 } },
  { name: "Jabari Smith Jr.", cn: "贾巴里史密斯", role: "stretchForward", version: "2022-25贾巴里史密斯", ratings: { shooting: 82, defense: 82, rebounding: 80 } },
  { name: "Dillon Brooks", cn: "狄龙布鲁克斯", role: "defender", version: "2023-25狄龙布鲁克斯", ratings: { defense: 86, scoring: 76 } },
  { name: "Tari Eason", cn: "伊森", role: "defender", positions: ["SF", "PF"], version: "2022-25伊森", ratings: { defense: 86, rebounding: 80 } },
  { name: "Kevin Porter Jr.", cn: "小凯文波特", role: "comboGuard", version: "2021-23小凯文波特", ratings: { scoring: 80, creation: 80 } }
]);

addCandidateSet("Detroit Pistons", "活塞", "2020s", [
  { name: "Cade Cunningham", cn: "坎宁安", role: "star", positions: ["PG", "SG"], version: "2023-26坎宁安", sortBoost: 900, note: "大尺寸主控、挡拆阅读和中距离节奏已经成型，是活塞现阶段真正的进攻中枢。", ratings: { overall: 91, scoring: 90, creation: 92, shooting: 84, spacing: 84, defense: 76, rebounding: 76, offball: 76, health: 82, stamina: 90, clutch: 89, ball: 92, portability: 88 } },
  { name: "Ausar Thompson", cn: "奥萨尔汤普森", role: "defender", positions: ["SF", "SG", "PF"], version: "2023-26奥萨尔汤普森", sortBoost: 550, note: "运动能力、篮板冲抢和外线防守压迫非常突出，是活塞锋线防守和转换速度的关键。", ratings: { overall: 84, scoring: 74, creation: 68, shooting: 62, spacing: 58, defense: 91, rim: 70, rebounding: 84, offball: 82, health: 84, stamina: 88, clutch: 76, ball: 70, portability: 82 } },
  { name: "Jalen Duren", cn: "杜伦", role: "big", positions: ["C"], version: "2022-26杜伦", sortBoost: 500, ratings: { overall: 85, scoring: 78, creation: 48, shooting: 52, spacing: 44, defense: 82, rim: 88, rebounding: 92, offball: 84, health: 86, stamina: 86, clutch: 78, ball: 34, portability: 78 } },
  { name: "Jaden Ivey", cn: "艾维", role: "comboGuard", positions: ["SG", "PG"], version: "2022-26艾维", sortBoost: 420, ratings: { overall: 83, scoring: 84, creation: 80, shooting: 80, spacing: 80, defense: 70, rim: 32, rebounding: 58, offball: 76, health: 80, stamina: 86, clutch: 80, ball: 84, portability: 78 } },
  { name: "Tobias Harris", cn: "哈里斯", role: "forward", positions: ["PF", "SF"], version: "2024-26哈里斯", ratings: { overall: 82, scoring: 82, creation: 68, shooting: 82, spacing: 82, defense: 76, rebounding: 76, offball: 82, health: 84, stamina: 82, clutch: 78, ball: 58, portability: 82 } },
  { name: "Isaiah Stewart", cn: "斯图尔特", role: "big", positions: ["C", "PF"], version: "2020-26斯图尔特", ratings: { overall: 80, scoring: 74, creation: 44, shooting: 76, spacing: 76, defense: 84, rim: 82, rebounding: 84, offball: 78, health: 82, stamina: 84, clutch: 76, ball: 34, portability: 80 } },
  { name: "Ron Holland II", cn: "霍兰德", role: "wing", positions: ["SF", "SG"], version: "2024-26霍兰德", ratings: { overall: 78, scoring: 78, creation: 64, shooting: 70, spacing: 68, defense: 80, rim: 58, rebounding: 70, offball: 78, health: 84, stamina: 84, clutch: 74, ball: 62, portability: 78 } },
  { name: "Tim Hardaway Jr.", cn: "小哈达威", role: "shooter", positions: ["SG", "SF"], version: "2024-25小哈达威", ratings: { overall: 78, scoring: 80, creation: 62, shooting: 86, spacing: 88, defense: 66, rim: 24, rebounding: 44, offball: 84, health: 82, stamina: 80, clutch: 78, ball: 54, portability: 82 } },
  { name: "Malik Beasley", cn: "比斯利", role: "shooter", positions: ["SG"], version: "2024-25比斯利", ratings: { overall: 78, scoring: 80, creation: 54, shooting: 88, spacing: 90, defense: 64, rim: 22, rebounding: 42, offball: 88, health: 84, stamina: 82, clutch: 80, ball: 44, portability: 84 } },
  { name: "Simone Fontecchio", cn: "丰泰基奥", role: "shooter", positions: ["SF", "PF"], version: "2023-26丰泰基奥", ratings: { overall: 77, scoring: 76, creation: 50, shooting: 84, spacing: 86, defense: 72, rim: 36, rebounding: 58, offball: 84, health: 82, stamina: 80, clutch: 76, ball: 40, portability: 82 } }
]);

addCandidateSet("Los Angeles Clippers", "快船", "2020s", [
  { name: "Kawhi Leonard", cn: "莱昂纳德", role: "star", positions: ["SF", "PF"], version: "2020-24莱昂纳德", ratings: { overall: 94, scoring: 93, shooting: 90, defense: 91, clutch: 92 } },
  { name: "Paul George", cn: "乔治", role: "star", positions: ["SF", "SG"], version: "2020-24乔治", ratings: { overall: 91, scoring: 90, shooting: 89, defense: 88 } },
  { name: "James Harden", cn: "哈登", role: "leadGuard", positions: ["PG", "SG"], version: "2023-25哈登", ratings: { overall: 88, creation: 91, shooting: 87, spacing: 88 } },
  { name: "Ivica Zubac", cn: "祖巴茨", role: "big", version: "2020-25祖巴茨", ratings: { overall: 84, defense: 84, rim: 86, rebounding: 86 } },
  { name: "Norman Powell", cn: "鲍威尔", role: "comboGuard", version: "2022-25鲍威尔", ratings: { scoring: 84, shooting: 88, spacing: 89 } },
  { name: "Reggie Jackson", cn: "雷吉杰克逊", role: "leadGuard", version: "2020-22雷吉杰克逊", ratings: { scoring: 82, creation: 80, clutch: 84 } },
  { name: "Nicolas Batum", cn: "巴图姆", role: "defender", positions: ["SF", "PF"], version: "2020-23巴图姆", ratings: { defense: 82, shooting: 82 } },
  { name: "Terance Mann", cn: "曼恩", role: "wing", version: "2020-25曼恩", ratings: { defense: 80, offball: 82 } }
]);

addCandidateSet("Memphis Grizzlies", "灰熊", "2020s", [
  { name: "Ja Morant", cn: "莫兰特", role: "star", positions: ["PG"], version: "2021-23莫兰特", note: "爆发力、篮下创造和空中终结极具破坏性，是能把半场回合强行提速的持球核心。", ratings: { overall: 92, scoring: 92, creation: 90, shooting: 76, defense: 66, rim: 52, clutch: 91, ball: 92 } },
  { name: "Jaren Jackson Jr.", cn: "小贾伦杰克逊", role: "big", positions: ["PF", "C"], version: "2022-25小贾伦杰克逊", ratings: { overall: 89, scoring: 84, shooting: 82, defense: 94, rim: 96 } },
  { name: "Desmond Bane", cn: "贝恩", role: "comboGuard", version: "2021-25贝恩", ratings: { overall: 88, scoring: 88, shooting: 91, spacing: 92, creation: 78 } },
  { name: "Dillon Brooks", cn: "狄龙布鲁克斯", role: "defender", version: "2020-23狄龙布鲁克斯", ratings: { defense: 86, scoring: 78 } },
  { name: "Marcus Smart", cn: "斯马特", role: "defender", positions: ["PG", "SG"], version: "2023-25斯马特", ratings: { defense: 90, creation: 78 } },
  { name: "Steven Adams", cn: "亚当斯", role: "big", version: "2021-23亚当斯", ratings: { rebounding: 92, defense: 84, offball: 84 } },
  { name: "Brandon Clarke", cn: "克拉克", role: "forward", version: "2020-23克拉克", ratings: { offball: 86, rim: 76, rebounding: 78 } },
  { name: "De'Anthony Melton", cn: "梅尔顿", role: "defender", positions: ["SG", "PG"], version: "2020-22梅尔顿", ratings: { defense: 84, shooting: 80 } }
]);

addCandidateSet("New Orleans Pelicans", "鹈鹕", "2020s", [
  { name: "Zion Williamson", cn: "锡安", role: "star", positions: ["PF"], version: "2020-25锡安", note: "力量、第一步和篮下手感都是非常规级别，健康时能把禁区防守直接压扁。", ratings: { overall: 91, scoring: 94, creation: 82, rim: 80, rebounding: 78, defense: 72 } },
  { name: "Brandon Ingram", cn: "英格拉姆", role: "star", positions: ["SF"], version: "2020-24英格拉姆", ratings: { overall: 89, scoring: 90, creation: 84, shooting: 84 } },
  { name: "CJ McCollum", cn: "麦科勒姆", role: "comboGuard", version: "2021-25麦科勒姆", ratings: { overall: 86, scoring: 86, shooting: 88, creation: 80 } },
  { name: "Herbert Jones", cn: "赫伯特琼斯", role: "defender", positions: ["SF", "SG"], version: "2021-25赫伯特琼斯", ratings: { defense: 92, shooting: 78 } },
  { name: "Jonas Valanciunas", cn: "瓦兰丘纳斯", role: "big", version: "2021-24瓦兰丘纳斯", ratings: { scoring: 80, rebounding: 90 } },
  { name: "Trey Murphy III", cn: "特雷墨菲", role: "shooter", positions: ["SF", "SG"], version: "2022-25特雷墨菲", ratings: { shooting: 89, spacing: 91, defense: 78 } },
  { name: "Jose Alvarado", cn: "阿尔瓦拉多", role: "defender", positions: ["PG"], version: "2021-25阿尔瓦拉多", ratings: { defense: 84 } },
  { name: "Lonzo Ball", cn: "朗佐鲍尔", role: "leadGuard", version: "2020-21朗佐鲍尔", ratings: { creation: 84, defense: 84, shooting: 80 } }
]);

addCandidateSet("Orlando Magic", "魔术", "2020s", [
  { name: "Desmond Bane", cn: "贝恩", role: "comboGuard", positions: ["SG", "SF"], version: "2025-26贝恩", sortBoost: 650, note: "魔术版本提供球队最稀缺的高质量外线投射和副攻处理，能显著改善班凯罗、瓦格纳身边的空间。", ratings: { overall: 88, scoring: 88, creation: 80, shooting: 92, spacing: 93, defense: 80, rebounding: 70, offball: 88, clutch: 86, ball: 78, portability: 90 } },
  { name: "Paolo Banchero", cn: "班凯罗", role: "star", positions: ["PF", "SF"], version: "2023-25班凯罗", note: "大体型持球、面框强攻和传球意愿一起成型，是魔术这轮重建的锋线主轴。", ratings: { overall: 90, scoring: 90, creation: 84, rebounding: 78, defense: 78 } },
  { name: "Franz Wagner", cn: "弗朗茨瓦格纳", role: "wing", version: "2022-25弗朗茨瓦格纳", ratings: { overall: 88, scoring: 86, creation: 80, defense: 82 } },
  { name: "Jalen Suggs", cn: "萨格斯", role: "defender", positions: ["PG", "SG"], version: "2023-25萨格斯", ratings: { overall: 84, defense: 90, shooting: 80 } },
  { name: "Wendell Carter Jr.", cn: "小温德尔卡特", role: "big", version: "2021-25小温德尔卡特", ratings: { defense: 82, rebounding: 84, shooting: 78 } },
  { name: "Cole Anthony", cn: "科尔安东尼", role: "leadGuard", version: "2020-24科尔安东尼", ratings: { scoring: 80, creation: 80 } },
  { name: "Markelle Fultz", cn: "富尔茨", role: "leadGuard", version: "2020-23富尔茨", ratings: { creation: 82, defense: 78 } },
  { name: "Jonathan Isaac", cn: "艾萨克", role: "defender", positions: ["PF", "SF"], version: "2023-25艾萨克", ratings: { defense: 92, rim: 84 } },
  { name: "Gary Harris", cn: "加里哈里斯", role: "defender", version: "2021-24加里哈里斯", ratings: { defense: 82, shooting: 80 } }
]);

addCandidateSet("Sacramento Kings", "国王", "2020s", [
  { name: "Zach LaVine", cn: "拉文", role: "star", positions: ["SG"], version: "2024-26拉文", sortBoost: 650, note: "国王版本提供高产持球得分和外线爆发，和萨博尼斯的手递手体系有天然投射适配。", ratings: { overall: 88, scoring: 91, creation: 80, shooting: 90, spacing: 91, defense: 62, offball: 84, clutch: 86, ball: 84, portability: 84 } },
  { name: "De'Aaron Fox", cn: "福克斯", role: "star", positions: ["PG"], version: "2022-25福克斯", ratings: { overall: 91, scoring: 92, creation: 87, shooting: 82, clutch: 93, ball: 90 } },
  { name: "Domantas Sabonis", cn: "萨博尼斯", role: "star", positions: ["C", "PF"], version: "2022-25萨博尼斯", ratings: { overall: 90, scoring: 84, creation: 86, rebounding: 95, offball: 88 } },
  { name: "Keegan Murray", cn: "基根穆雷", role: "wing", version: "2022-25基根穆雷", ratings: { overall: 84, shooting: 84, defense: 80 } },
  { name: "Malik Monk", cn: "蒙克", role: "comboGuard", version: "2022-25蒙克", ratings: { scoring: 84, creation: 80, shooting: 84 } },
  { name: "Harrison Barnes", cn: "巴恩斯", role: "wing", version: "2020-24巴恩斯", ratings: { scoring: 78, shooting: 82 } },
  { name: "Kevin Huerter", cn: "赫尔特", role: "shooter", version: "2022-24赫尔特", ratings: { shooting: 86, spacing: 88 } },
  { name: "Davion Mitchell", cn: "戴维恩米切尔", role: "defender", version: "2021-24戴维恩米切尔", ratings: { defense: 84 } },
  { name: "DeMar DeRozan", cn: "德罗赞", role: "star", positions: ["SF", "SG"], version: "2024-25德罗赞", ratings: { overall: 87, scoring: 88, creation: 82, clutch: 90 } }
]);

addCandidateSet("San Antonio Spurs", "马刺", "2020s", [
  { name: "Victor Wembanyama", cn: "文班亚马", role: "star", positions: ["C", "PF"], version: "2024-25文班亚马", note: "护框覆盖、面框持球和投射想象力同时拉满，是少数能从防守端和进攻端一起重塑球队的内线。", ratings: { overall: 93, scoring: 90, creation: 78, shooting: 82, defense: 96, rim: 99, rebounding: 90 } },
  { name: "De'Aaron Fox", cn: "福克斯", role: "star", positions: ["PG"], version: "2024-26福克斯", sortBoost: 800, note: "马刺版本给文班亚马身边补上顶级速度和挡拆施压，转换推进和突破分球能大幅提高进攻节奏。", ratings: { overall: 91, scoring: 91, creation: 88, shooting: 82, spacing: 82, defense: 76, rebounding: 70, clutch: 92, ball: 91, portability: 87 } },
  { name: "Dejounte Murray", cn: "默里", role: "leadGuard", version: "2020-22默里", ratings: { overall: 87, creation: 86, defense: 86, rebounding: 82 } },
  { name: "Keldon Johnson", cn: "凯尔登约翰逊", role: "wing", version: "2020-25凯尔登约翰逊", ratings: { scoring: 82, rebounding: 74 } },
  { name: "Devin Vassell", cn: "瓦塞尔", role: "wing", version: "2022-25瓦塞尔", ratings: { scoring: 84, shooting: 85, defense: 78 } },
  { name: "Jeremy Sochan", cn: "索汉", role: "defender", positions: ["PF", "SF"], version: "2022-25索汉", ratings: { defense: 84, rebounding: 78 } },
  { name: "Jakob Poeltl", cn: "珀尔特尔", role: "big", version: "2020-23珀尔特尔", ratings: { defense: 86, rim: 88, rebounding: 86 } },
  { name: "Chris Paul", cn: "保罗", role: "leadGuard", version: "2024-25保罗", ratings: { creation: 88, shooting: 82 } },
  { name: "Tre Jones", cn: "特雷琼斯", role: "leadGuard", version: "2022-25特雷琼斯", ratings: { creation: 82 } }
]);

addCandidateSet("Toronto Raptors", "猛龙", "2020s", [
  { name: "Brandon Ingram", cn: "英格拉姆", role: "star", positions: ["SF", "PF"], version: "2025-26英格拉姆", sortBoost: 700, note: "猛龙版本是大尺寸持球得分点，中距离、错位单打和二次组织能补上锋线阵地战火力。", ratings: { overall: 88, scoring: 89, creation: 84, shooting: 84, spacing: 84, defense: 74, rebounding: 72, offball: 80, clutch: 87, ball: 84, portability: 84 } },
  { name: "Pascal Siakam", cn: "西亚卡姆", role: "star", positions: ["PF", "SF"], version: "2020-24西亚卡姆", ratings: { overall: 90, scoring: 88, creation: 82, defense: 84, rebounding: 80 } },
  { name: "Scottie Barnes", cn: "斯科蒂巴恩斯", role: "star", positions: ["SF", "PF"], version: "2023-25斯科蒂巴恩斯", ratings: { overall: 88, scoring: 84, creation: 82, defense: 86, rebounding: 82 } },
  { name: "Fred VanVleet", cn: "范弗利特", role: "leadGuard", version: "2020-23范弗利特", ratings: { overall: 87, creation: 88, shooting: 86, defense: 82 } },
  { name: "OG Anunoby", cn: "阿奴诺比", role: "defender", positions: ["SF", "PF"], version: "2020-24阿奴诺比", ratings: { overall: 87, defense: 92, shooting: 82 } },
  { name: "RJ Barrett", cn: "巴雷特", role: "wing", version: "2023-25巴雷特", ratings: { scoring: 82, rebounding: 76 } },
  { name: "Immanuel Quickley", cn: "奎克利", role: "comboGuard", version: "2023-25奎克利", ratings: { scoring: 82, shooting: 84, creation: 80 } },
  { name: "Gary Trent Jr.", cn: "小特伦特", role: "shooter", version: "2020-24小特伦特", ratings: { shooting: 86, spacing: 88 } },
  { name: "Jakob Poeltl", cn: "珀尔特尔", role: "big", version: "2022-25珀尔特尔", ratings: { defense: 84, rebounding: 86 } }
]);

addCandidateSet("Utah Jazz", "爵士", "2020s", [
  { name: "Donovan Mitchell", cn: "米切尔", role: "star", positions: ["SG", "PG"], version: "2020-22米切尔", ratings: { overall: 91, scoring: 92, creation: 86, shooting: 87, clutch: 90 } },
  { name: "Rudy Gobert", cn: "戈贝尔", role: "big", version: "2020-22戈贝尔", ratings: { overall: 90, defense: 97, rim: 98, rebounding: 95 } },
  { name: "Lauri Markkanen", cn: "马尔卡宁", role: "stretchForward", positions: ["PF", "SF"], version: "2022-25马尔卡宁", ratings: { overall: 89, scoring: 89, shooting: 90, spacing: 91, rebounding: 84 } },
  { name: "Mike Conley", cn: "康利", role: "leadGuard", version: "2020-23康利", ratings: { creation: 84, shooting: 84, defense: 78 } },
  { name: "Jordan Clarkson", cn: "克拉克森", role: "comboGuard", version: "2020-24克拉克森", ratings: { scoring: 84 } },
  { name: "Bojan Bogdanovic", cn: "博扬", role: "shooter", positions: ["SF", "PF"], version: "2020-22博扬", ratings: { scoring: 82, shooting: 88, spacing: 90 } },
  { name: "Walker Kessler", cn: "凯斯勒", role: "big", version: "2022-25凯斯勒", ratings: { defense: 86, rim: 92, rebounding: 84 } },
  { name: "Collin Sexton", cn: "塞克斯顿", role: "comboGuard", version: "2022-25塞克斯顿", ratings: { scoring: 82, shooting: 82 } }
]);

addCandidateSet("Washington Wizards", "奇才", "2020s", [
  { name: "Bradley Beal", cn: "比尔", role: "star", positions: ["SG"], version: "2020-23比尔", ratings: { overall: 89, scoring: 92, creation: 84, shooting: 86 } },
  { name: "Kristaps Porzingis", cn: "波尔津吉斯", role: "big", version: "2022-23波尔津吉斯", ratings: { overall: 87, scoring: 86, shooting: 86, rim: 88 } },
  { name: "Kyle Kuzma", cn: "库兹马", role: "forward", version: "2021-25库兹马", ratings: { scoring: 84, rebounding: 78 } },
  { name: "Russell Westbrook", cn: "威少", role: "leadGuard", version: "2020-21威少", ratings: { overall: 86, scoring: 84, creation: 88, rebounding: 88, shooting: 66 } },
  { name: "Daniel Gafford", cn: "加福德", role: "big", version: "2021-24加福德", ratings: { rim: 88, rebounding: 82 } },
  { name: "Deni Avdija", cn: "阿夫迪亚", role: "wing", version: "2020-24阿夫迪亚", ratings: { defense: 80, rebounding: 78 } },
  { name: "Tyus Jones", cn: "泰厄斯琼斯", role: "leadGuard", version: "2023-24泰厄斯琼斯", ratings: { creation: 84, shooting: 82 } },
  { name: "Corey Kispert", cn: "基斯珀特", role: "shooter", version: "2021-25基斯珀特", ratings: { shooting: 86, spacing: 88 } }
]);

addCandidateSet("Golden State Warriors", "勇士", "2020s", [
  { name: "Stephen Curry", cn: "库里", role: "star", positions: ["PG"], version: "2020-22库里", sortBoost: 700, note: "持球三分、无球牵制和关键回合处理依然顶级，是小球时代最能改变防守站位的后卫。", ratings: { overall: 97, scoring: 97, creation: 94, shooting: 99, spacing: 99, clutch: 96, ball: 92 } },
  { name: "Jimmy Butler", cn: "巴特勒", role: "star", positions: ["SF", "SG", "PF"], version: "2024-26巴特勒", sortBoost: 650, note: "勇士版本带来强硬攻坚、造犯规和侧翼防守，能在库里身边承担季后赛第二强点职责。", ratings: { overall: 90, scoring: 88, creation: 84, shooting: 76, spacing: 74, defense: 90, rebounding: 74, offball: 84, health: 76, stamina: 84, clutch: 92, ball: 82, portability: 88 } },
  { name: "Draymond Green", cn: "格林", role: "defender", positions: ["PF", "C"], version: "2020-22格林", ratings: { overall: 88, creation: 84, defense: 95, rim: 84, portability: 94 } },
  { name: "Klay Thompson", cn: "克莱", role: "shooter", positions: ["SG", "SF"], version: "2021-23克莱", ratings: { overall: 85, shooting: 92, spacing: 94, defense: 78 } },
  { name: "Andrew Wiggins", cn: "维金斯", role: "wing", version: "2021-22维金斯", ratings: { overall: 86, scoring: 82, defense: 86, shooting: 82 } },
  { name: "Jordan Poole", cn: "普尔", role: "comboGuard", version: "2021-23普尔", ratings: { scoring: 84, creation: 80, shooting: 86 } },
  { name: "Kevon Looney", cn: "卢尼", role: "big", version: "2021-23卢尼", ratings: { rebounding: 88, defense: 82, offball: 84 } },
  { name: "Jonathan Kuminga", cn: "库明加", role: "forward", version: "2023-25库明加", ratings: { scoring: 82, rim: 76, defense: 78 } },
  { name: "Brandin Podziemski", cn: "波杰姆斯基", role: "comboGuard", version: "2023-25波杰姆斯基", ratings: { rebounding: 76, shooting: 80, creation: 76 } }
]);

function templateForPositions(positions) {
  if (positions.includes("C")) return ROLE_TEMPLATES.big;
  if (positions.includes("PF")) return ROLE_TEMPLATES.forward;
  if (positions.includes("PG")) return ROLE_TEMPLATES.leadGuard;
  if (positions.includes("SG")) return ROLE_TEMPLATES.comboGuard;
  return ROLE_TEMPLATES.wing;
}

function seasonSpanLabel(seasons) {
  if (!seasons || !seasons.length) return "";
  const sorted = [...new Set(seasons)].sort((a, b) => a - b);
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  return first === last ? `${first - 1}-${String(first).slice(-2)}` : `${first - 1}-${String(last).slice(-2)}`;
}

function cleanPlayerName(name) {
  return String(name || "").replace(/\*/g, "").replace(/\s+/g, " ").trim();
}

function getKnownTeamCn(team, fallback = "") {
  const currentTeam = getCurrentTeamName(team);
  return TEAM_CN_BY_NAME[currentTeam] || TEAM_CN_BY_NAME[team] || fallback || currentTeam;
}

function getCurrentTeamName(team) {
  return CURRENT_TEAM_BY_NAME[team] || team;
}

const PLAYER_NAME_TOKEN_CN = {
  "a": "艾",
  "b": "比",
  "c": "西",
  "d": "迪",
  "e": "伊",
  "f": "艾弗",
  "g": "吉",
  "h": "艾奇",
  "i": "艾",
  "j": "杰",
  "k": "凯",
  "l": "艾尔",
  "m": "艾姆",
  "n": "恩",
  "o": "奥",
  "p": "皮",
  "q": "奎",
  "r": "阿尔",
  "s": "艾斯",
  "t": "提",
  "u": "尤",
  "v": "维",
  "w": "达布",
  "x": "艾克斯",
  "y": "怀",
  "z": "齐",
  "jr": "小",
  "sr": "老",
  "ii": "二世",
  "iii": "三世",
  "iv": "四世",
  "steve": "史蒂夫",
  "doug": "道格",
  "julius": "朱利叶斯",
  "george": "乔治",
  "billy": "比利",
  "fred": "弗雷德",
  "archie": "阿奇",
  "leroy": "勒罗伊",
  "hal": "哈尔",
  "darryl": "达里尔",
  "henry": "亨利",
  "world": "沃尔德",
  "jim": "吉姆",
  "bobby": "博比",
  "harvey": "哈维",
  "maurice": "莫里斯",
  "joe": "乔",
  "bill": "比尔",
  "clyde": "克莱德",
  "luke": "卢克",
  "dennis": "丹尼斯",
  "larry": "拉里",
  "moses": "摩西",
  "andrew": "安德鲁",
  "clint": "克林特",
  "mike": "迈克",
  "lionel": "莱昂内尔",
  "tim": "蒂姆",
  "cliff": "克利夫",
  "john": "约翰",
  "johnny": "约翰尼",
  "danny": "丹尼",
  "david": "大卫",
  "dave": "戴夫",
  "mark": "马克",
  "marc": "马克",
  "michael": "迈克尔",
  "chris": "克里斯",
  "christian": "克里斯蒂安",
  "keith": "基思",
  "scott": "斯科特",
  "eric": "埃里克",
  "sam": "萨姆",
  "tony": "托尼",
  "ricky": "里基",
  "alex": "亚历克斯",
  "don": "唐",
  "dan": "丹",
  "brad": "布拉德",
  "bob": "鲍勃",
  "ron": "罗恩",
  "willie": "威利",
  "vern": "弗恩",
  "clark": "克拉克",
  "reggie": "雷吉",
  "jerry": "杰里",
  "dudley": "达德利",
  "butch": "布奇",
  "rik": "里克",
  "dale": "戴尔",
  "detlef": "德特勒夫",
  "derrick": "德里克",
  "antonio": "安东尼奥",
  "travis": "特拉维斯",
  "jalen": "杰伦",
  "kenny": "肯尼",
  "jermaine": "杰梅因",
  "jeff": "杰夫",
  "troy": "特洛伊",
  "al": "阿尔",
  "anthony": "安东尼",
  "peja": "佩贾",
  "jarrett": "贾勒特",
  "roy": "罗伊",
  "darren": "达伦",
  "lance": "兰斯",
  "ian": "伊恩",
  "cory": "科里",
  "josh": "约什",
  "monta": "蒙塔",
  "solomon": "所罗门",
  "rodney": "罗德尼",
  "justin": "贾斯廷",
  "jeremy": "杰里米",
  "aaron": "阿隆",
  "goga": "戈加",
  "edmond": "埃德蒙",
  "oshae": "奥谢",
  "naz": "纳兹",
  "rolando": "罗兰多",
  "derek": "德里克",
  "james": "詹姆斯",
  "jay": "杰伊",
  "kurt": "科特",
  "pat": "帕特",
  "elton": "埃尔顿",
  "spencer": "斯宾塞",
  "richaun": "里乔恩",
  "evan": "埃文",
  "lavoy": "拉沃伊",
  "isaiah": "以赛亚",
  "todd": "托德",
  "matt": "马特",
  "dikembe": "迪肯贝",
  "thaddeus": "赛迪斯",
  "tyrone": "泰伦",
  "toni": "托尼",
  "taj": "泰吉",
  "kyle": "凯尔",
  "nerlens": "诺伦斯",
  "jodie": "朱迪",
  "hollis": "霍利斯",
  "dorell": "多雷尔",
  "daniel": "丹尼尔",
  "wayne": "韦恩",
  "norm": "诺姆",
  "paul": "保罗",
  "rich": "里奇",
  "gus": "格斯",
  "wes": "韦斯",
  "sidney": "西德尼",
  "kermit": "克米特",
  "phil": "菲尔",
  "randy": "兰迪",
  "calvin": "卡尔文",
  "otis": "奥蒂斯",
  "walter": "沃尔特",
  "rick": "里克",
  "dick": "迪克",
  "earl": "厄尔",
  "norman": "诺曼",
  "gail": "盖尔",
  "lou": "卢",
  "louis": "路易斯",
  "rudy": "鲁迪",
  "kelly": "凯利",
  "ken": "肯",
  "gene": "吉恩",
  "erick": "埃里克",
  "mix": "米克斯",
  "collins": "科林斯",
  "erving": "欧文",
  "mcginnis": "麦金尼斯",
  "cunningham": "坎宁安",
  "carter": "卡特",
  "ellis": "埃利斯",
  "greer": "格里尔",
  "jones": "琼斯",
  "dawkins": "道金斯",
  "bibby": "毕比",
  "washington": "华盛顿",
  "catchings": "卡钦斯",
  "cheeks": "奇克斯",
  "bryant": "布莱恩特",
  "imhoff": "伊姆霍夫",
  "bridges": "布里奇斯",
  "lee": "李",
  "jackson": "杰克逊",
  "awtrey": "奥特里",
  "malone": "马龙",
  "toney": "托尼",
  "richardson": "理查德森",
  "gminski": "格明斯基",
  "hollins": "霍林斯",
  "johnson": "约翰逊",
  "mccormick": "麦考密克",
  "robinson": "罗宾逊",
  "hawkins": "霍金斯",
  "threatt": "斯雷特",
  "hinson": "辛森",
  "anderson": "安德森",
  "iavaroni": "亚瓦罗尼",
  "cureton": "库雷顿",
  "edwards": "爱德华兹",
  "williams": "威廉姆斯",
  "weatherspoon": "威瑟斯庞",
  "barros": "巴罗斯",
  "hornacek": "霍纳塞克",
  "gilliam": "吉列姆",
  "ratliff": "拉特利夫",
  "coleman": "科尔曼",
  "snow": "斯诺",
  "bradley": "布拉德利",
  "bol": "波尔",
  "geiger": "盖格",
  "davis": "戴维斯",
  "mckie": "麦基",
  "thomas": "托马斯",
  "alston": "阿尔斯通",
  "hughes": "休斯",
  "dalembert": "戴勒姆波特",
  "miller": "米勒",
  "korver": "科沃尔",
  "lynch": "林奇",
  "mutombo": "穆托姆博",
  "hill": "希尔",
  "salmons": "萨尔蒙斯",
  "webber": "韦伯",
  "van": "范",
  "kukoc": "库科奇",
  "maccolluch": "麦卡洛克",
  "macculloch": "麦卡洛克",
  "harpring": "哈普林",
  "ollie": "奥利",
  "hunter": "亨特",
  "evans": "埃文斯",
  "knight": "奈特",
  "bantom": "班托姆",
  "sobers": "索伯斯",
  "roundfield": "朗德菲尔德",
  "english": "英格利什",
  "buse": "布斯",
  "robisch": "罗比施",
  "elmore": "埃尔莫尔",
  "hillman": "希尔曼",
  "tatum": "塔图姆",
  "flynn": "弗林",
  "williamson": "威廉姆森",
  "calhoun": "卡尔霍恩",
  "green": "格林",
  "carrington": "卡林顿",
  "behagen": "贝哈根",
  "lewis": "刘易斯",
  "smith": "史密斯",
  "bennett": "本内特",
  "fleming": "弗莱明",
  "stipanovich": "斯蒂帕诺维奇",
  "kellogg": "凯洛格",
  "tisdale": "蒂斯代尔",
  "sichting": "西克廷",
  "orr": "奥尔",
  "long": "朗",
  "smits": "施密茨",
  "schrempf": "施拉姆夫",
  "mckey": "麦基",
  "mullin": "穆林",
  "best": "贝斯特",
  "lasalle": "拉萨尔",
  "thompson": "汤普森",
  "workman": "沃克曼",
  "mitchell": "米切尔",
  "richardson": "理查德森",
  "hoiberg": "霍伊博格",
  "ferrell": "费雷尔",
  "pierce": "皮尔斯",
  "mccloud": "麦克劳德",
  "perkins": "帕金斯",
  "dreiling": "德雷林",
  "oneal": "奥尼尔",
  "foster": "福斯特",
  "granger": "格兰杰",
  "tinsley": "廷斯利",
  "metta": "梅塔",
  "croshere": "克罗希尔",
  "murphy": "墨菲",
  "harrington": "哈灵顿",
  "dunleavy": "邓利维",
  "pollard": "波拉德",
  "ford": "福特",
  "stojakovic": "斯托贾科维奇",
  "jasikevicius": "雅西科维休斯",
  "diener": "迪纳",
  "hibbert": "希伯特",
  "collison": "科里森",
  "stephenson": "史蒂芬森",
  "mahinmi": "马辛米",
  "miles": "迈尔斯",
  "teague": "蒂格",
  "watson": "沃特森",
  "hansbrough": "汉斯布鲁",
  "joseph": "约瑟夫",
  "mcroberts": "麦克罗伯茨",
  "ellis": "埃利斯",
  "stuckey": "斯塔基",
  "holiday": "霍勒迪",
  "mcdermott": "麦克德莫特",
  "warren": "沃伦",
  "lamb": "兰姆",
  "bitadze": "比塔泽",
  "sumner": "萨姆纳",
  "brissett": "布里塞特",
  "sampson": "桑普森",
  "lecque": "勒奎",
  "leaf": "利夫",
  "blackman": "布莱克曼",
  "harper": "哈珀",
  "donaldson": "唐纳德森",
  "vincent": "文森特",
  "nimphius": "尼姆菲厄斯",
  "spanarkel": "斯潘纳克尔",
  "tarpley": "塔普利",
  "garnett": "加内特",
  "cummings": "卡明斯",
  "gibson": "吉布森",
  "noel": "诺埃尔",
  "bullock": "布洛克",
  "wood": "伍德"
};

function getFallbackPlayerCnName(name) {
  return cleanPlayerName(name);
}

function getFallbackNamePartCn(part) {
  const token = part.replace(/[^A-Za-z]/g, "").toLowerCase();
  if (!token) return "";
  if (PLAYER_NAME_TOKEN_CN[token]) return PLAYER_NAME_TOKEN_CN[token];
  if (/^[ivx]+$/.test(token)) return token.split("").map((letter) => PLAYER_NAME_TOKEN_CN[letter] || "").join("");
  return token.split("").map((letter) => PLAYER_NAME_TOKEN_CN[letter] || "").join("");
}

function getPlayerCnName(name) {
  const cleanName = cleanPlayerName(name);
  return PLAYER_CN_BY_NAME[cleanName] || getFallbackPlayerCnName(cleanName);
}

function getKnownPlayerCnName(name) {
  const cleanName = cleanPlayerName(name);
  return PLAYER_CN_BY_NAME[cleanName] || "";
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getDisplayVersion(player) {
  const teamCn = player.teamCn ? escapeRegExp(player.teamCn) : "";
  let version = String(player.version || "");
  if (teamCn) {
    version = version.replace(new RegExp(`^((?:\\d{4}s|\\d{4}(?:-\\d{2})?))\\s+${teamCn}`), "$1");
  }
  version = version.replace(/^((?:\d{4}s|\d{4}(?:-\d{2})?))\s+/, "$1");
  const knownCn = getKnownPlayerCnName(player.name);
  if (knownCn && /(?:球员|[A-Za-z]{3,})$/.test(version)) {
    version = version.replace(/(?:球员|[A-Za-z .'-]+)$/, knownCn);
  }
  if (!knownCn && /[A-Za-z]{2,}[A-Za-z .'-]*$/.test(version)) {
    version = version.replace(/[A-Za-z .'-]+$/, getPlayerCnName(player.name));
  }
  if (version.endsWith("球员")) {
    version = version.replace(/球员$/, getPlayerCnName(player.name));
  }
  return version;
}

function rolePhrase(template, stats = {}) {
  if ((stats.points || 0) >= 1800 || (stats.assists || 0) >= 650) return "主要进攻发起点";
  if ((stats.points || 0) >= 1100) return "稳定得分点";
  if ((stats.assists || 0) >= 400) return "主要组织点";
  if ((stats.rebounds || 0) >= 650 || (stats.blocks || 0) >= 120) return "内线支柱";
  if ((stats.minutes || 0) >= 1800) return "高时间轮换";
  if (template.tags.includes("定点投射")) return "空间型拼图";
  if (template.tags.includes("领防")) return "防守型拼图";
  return template.tags.slice(0, 2).join("、");
}

function profileHash(candidate, salt = 0) {
  const key = `${cleanPlayerName(candidate.name)}|${getCurrentTeamName(candidate.team)}|${candidate.decade}|${salt}`;
  return [...key].reduce((sum, char, index) => sum + char.charCodeAt(0) * (index + 17 + salt), 0);
}

function pickProfileLine(candidate, lines, salt = 0) {
  const hash = profileHash(candidate, salt);
  return lines[hash % lines.length];
}

function composeProfileLine(candidate, openers, details) {
  return `${pickProfileLine(candidate, openers)}${pickProfileLine(candidate, details, 97)}`;
}

function describeFullRosterCandidate(candidate, template) {
  if (candidate.note) return candidate.note;
  const stats = candidate.stats || {};
  const positions = candidate.positions && candidate.positions.length ? candidate.positions : [];
  const games = stats.games || 0;
  const ppg = games ? (stats.points || 0) / games : 0;
  const rpg = games ? (stats.rebounds || 0) / games : 0;
  const apg = games ? (stats.assists || 0) / games : 0;
  const stocks = games ? ((stats.steals || 0) + (stats.blocks || 0)) / games : 0;
  const mpg = games ? (stats.minutes || 0) / games : 0;
  const hasGuardSkill = positions.some((pos) => pos === "PG" || pos === "SG");
  const hasWingSize = positions.some((pos) => pos === "SF" || pos === "PF");
  const isBig = positions.includes("C") || positions.includes("PF");
  const tags = template.tags || [];

  if (candidate.impactTier === "core" && ppg >= 24 && apg >= 6) {
    return pickProfileLine(candidate, [
      "持球威胁、节奏变化和传球判断连在一起，是能把半场进攻持续捏在手里的核心版本。",
      "得分和组织不是分开的两件事，他的突破、急停和传球会同时改变弱侧站位。",
      "能从第一拍就决定回合走向，既能自己解决防守，也能把夹击变成队友的机会。"
    ]);
  }
  if (candidate.impactTier === "core" && ppg >= 24 && isBig) {
    return pickProfileLine(candidate, [
      "体型、终结手感和禁区威慑同时在线，进攻端能吃下强攻，防守端也能撑住阵型。",
      "低位触球和篮下终结足够稳定，能让球队在节奏慢下来时仍有明确落点。",
      "禁区存在感很强，既能惩罚小阵容，也能用篮板和护框把回合收住。"
    ]);
  }
  if (candidate.impactTier === "core" && ppg >= 22) {
    return pickProfileLine(candidate, [
      "得分爆发力和强投胆量都很突出，适合在阵地战停滞时接管最难处理的回合。",
      "主要价值在高难度出手和连续得分能力，能把普通回合硬拧成有效进攻。",
      "手感起来时会迅速抬高球队上限，防守必须提前把第二层协防准备好。"
    ]);
  }
  if (candidate.impactTier === "core" && apg >= 7) {
    return pickProfileLine(candidate, [
      "视野、控场和传球提前量是底色，能把队友的跑动整理成舒服的出手机会。",
      "节奏控制比单回合爆发更重要，他能让进攻少掉许多勉强处理。",
      "挡拆阅读和转移球质量突出，适合给终结点和射手持续喂出干净机会。"
    ]);
  }
  if (candidate.impactTier === "core") {
    if (apg >= 5) {
      return composeProfileLine(candidate, [
        "能承担发起和梳理，",
        "控球、推进和二次传导都有分量，",
        "不是纯终结型核心，",
        "他的触球价值不只在最后一下，"
      ], [
        "进攻不只靠个人得分，也能把队友带进节奏。",
        "能让阵容从单点强攻转向连续处理。",
        "回合中途重新分配球权，是这版最有用的部分。",
        "适合放在需要多一层阅读的阵容里。"
      ]);
    }
    if (isBig && (rpg >= 8 || stocks >= 1.4)) {
      return composeProfileLine(candidate, [
        "篮板、对抗和防守站位能稳住底盘，",
        "内线职责吃得很重，",
        "他让球队的回合质量更扎实，",
        "禁区覆盖和二次进攻都能给阵容兜底，"
      ], [
        "进攻端也有足够存在感迫使对手收缩。",
        "既要保护禁区，也能用终结质量给外线创造空间。",
        "少丢篮板、少漏禁区，也多一个稳定落点。",
        "适合给外线压迫型防守补上最后一道保险。"
      ]);
    }
    return composeProfileLine(candidate, [
      "特点集中而清晰，",
      "不需要面面俱到，",
      "这是更偏功能核心的版本，",
      "他的比赛价值很吃使用方式，",
      "放在合适的阵容语境里，"
    ], [
      "最适合围绕他的强项安排触球点、对位和终结区域。",
      "真正的价值在于某一两项能力足以改变对手布置。",
      "强项足够硬，阵容搭配对口时影响会被放大。",
      "能把某个具体环节从合格直接拉到优势。",
      "不必给太多额外戏份，也能让球队结构更顺。"
    ]);
  }
  if (apg >= 5 && hasGuardSkill) {
    return composeProfileLine(candidate, [
      "控运稳、分球快，",
      "适合做第二持球点，",
      "不是每回合都要掌球，",
      "他的价值在于让球顺利过桥，",
      "当阵容需要临时发起时，"
    ], [
      "能在主攻手身边接过一部分发起压力，让阵容少一点停顿。",
      "推进、吊传和弱侧转移能帮主攻手省下不少消耗。",
      "当第一选择被夹住时，他能把球安全送到下一站。",
      "可以把一些半乱的回合重新整理成正常进攻。",
      "不必承担第一核心戏份，也能让后场处理更平滑。"
    ]);
  }
  if (ppg >= 16 && hasGuardSkill) {
    return pickProfileLine(candidate, [
      "突破节奏和投篮手感足够带起一段火力，是替阵容续航或补副攻的后场选择。",
      "能靠个人进攻撑住轮换段，尤其适合在主力下场后保住半场产量。",
      "更像火力后卫，手里有球时威胁更明显，防守端需要阵容给他兜一些对位。"
    ]);
  }
  if (ppg >= 16 && hasWingSize) {
    return pickProfileLine(candidate, [
      "锋线体型、冲击和终结都有存在感，放进换防阵容里能提供更扎实的攻防连接。",
      "能在侧翼吃掉一定球权，靠身体和中距离把进攻从外线延伸到肘区。",
      "不是单一射手或防守人，他的体型和得分方式能让阵容多一种进攻入口。"
    ]);
  }
  if (isBig && (rpg >= 8 || stocks >= 1.8)) {
    return composeProfileLine(candidate, [
      "篮板嗅觉、护框站位和禁区对抗是主要卖点，",
      "主要工作在禁区两端，",
      "能把对手的突破导向更难的出手，",
      "这类内线最重要的是回合收尾，",
      "他的存在感更多来自站位和对抗，"
    ], [
      "能给外线防守留出犯错空间。",
      "卡位、协防和二次进攻比持球戏份更重要。",
      "也能用篮板保护住防守成果。",
      "可以让外线更敢压迫持球人。",
      "适合放在需要稳定禁区秩序的阵容里。"
    ]);
  }
  if (tags.includes("定点投射") || tags.includes("空间型拼图")) {
    return pickProfileLine(candidate, [
      "无球站位和接球投篮是立身之本，不抢戏，但能把持球核心身边的空间撑开。",
      "价值藏在弱侧站位里，防守不敢完全放掉他，核心突破路线就会更干净。",
      "更适合低触球高效率的角色，接球决策越简单，阵容收益越稳定。"
    ]);
  }
  if (tags.includes("领防") || tags.includes("防守型拼图")) {
    return pickProfileLine(candidate, [
      "价值不在漂亮数据，而在对位压迫、低球权执行和把脏活做干净的稳定感。",
      "能承担棘手对位，让更高产的队友少消耗在防守端。",
      "进攻端不抢戏，防守端愿意做第一道消耗，这是强阵容很需要的角色。"
    ]);
  }
  if (mpg >= 24 || (stats.minutes || 0) >= 1200) {
    return composeProfileLine(candidate, [
      "角色边界清楚，",
      "属于教练会放心使用的轮换牌，",
      "上场时间说明他能承受常规轮换强度，",
      "这版更像稳定零件，",
      "不需要围绕他改战术，",
      "强项不一定耀眼，"
    ], [
      "放在合适职责里能给轮换提供稳定质量。",
      "比赛内容朴素，但能把职责完成到位。",
      "适合补齐阵容里某个明确缺口。",
      "只要任务别过载，就能保持执行质量。",
      "更适合连接主力和替补段，而不是单独改变比赛。",
      "能在对位、篮板、投射或推进里补上一块短板。"
    ]);
  }
  return composeProfileLine(candidate, [
    "更像功能明确的阵容牌，",
    "戏份不需要太重，",
    "上限来自适配度而不是球权，",
    "这是偏任务型的选择，",
    "如果阵容刚好缺这一口，",
    "他不是万能补丁，"
  ], [
    "适合在体型、投射或防守任务正好对口时使用。",
    "关键是把他放到正确位置，别让短板暴露在主任务之外。",
    "阵容刚好需要这类技能时会更好用。",
    "价值主要取决于旁边核心能不能把他的强项用出来。",
    "能用明确职责换来更干净的轮换结构。",
    "但在正确职责里会比纸面评分更有用。"
  ]);
}

function ratingsFromStats(templateRatings, stats = {}, impactScore = 0) {
  const games = stats.games || 0;
  const minutes = stats.minutes || 0;
  const ppg = games ? (stats.points || 0) / games : 0;
  const rpg = games ? (stats.rebounds || 0) / games : 0;
  const apg = games ? (stats.assists || 0) / games : 0;
  const stocks = games ? ((stats.steals || 0) + (stats.blocks || 0)) / games : 0;
  const minutesBoost = Math.min(7, minutes / 2800);
  const impactBoost = Math.min(8, Math.max(0, impactScore / 75));
  return {
    ...templateRatings,
    overall: Math.round(clamp(templateRatings.overall + impactBoost + minutesBoost, 60, 92)),
    scoring: Math.round(clamp(templateRatings.scoring + Math.max(0, ppg - 8) * 0.9, 55, 94)),
    creation: Math.round(clamp(templateRatings.creation + Math.max(0, apg - 2) * 2.4, 35, 92)),
    rebounding: Math.round(clamp(templateRatings.rebounding + Math.max(0, rpg - 4) * 2.2, 35, 94)),
    defense: Math.round(clamp(templateRatings.defense + Math.max(0, stocks - 1.1) * 5, 45, 92)),
    rim: Math.round(clamp(templateRatings.rim + Math.max(0, (stats.blocks || 0) / Math.max(1, games) - 0.6) * 12, 20, 92)),
    stamina: Math.round(clamp(templateRatings.stamina + Math.min(7, minutes / 2500), 60, 94)),
    health: Math.round(clamp(templateRatings.health + Math.min(6, games / 120), 60, 94)),
    clutch: Math.round(clamp(templateRatings.clutch + Math.min(4, ppg / 8), 55, 90))
  };
}

function mergeNumericStats(base = {}, extra = {}) {
  const merged = { ...base };
  Object.entries(extra || {}).forEach(([key, value]) => {
    if (typeof value === "number") merged[key] = (merged[key] || 0) + value;
  });
  return merged;
}

function mergePositions(base = [], extra = []) {
  return [...new Set([...(base || []), ...(extra || [])])];
}

function mergeSeasons(base = [], extra = []) {
  return [...new Set([...(base || []), ...(extra || [])])].sort((a, b) => a - b);
}

function strongerImpactTier(base, extra) {
  const order = { depth: 0, rotation: 1, core: 2 };
  return (order[extra] || 0) > (order[base] || 0) ? extra : base;
}

function isCuratedPlayer(player) {
  return player.curated || !player.source;
}

function mergeFullRosterPlayers() {
  const externalPlayers =
    typeof window !== "undefined"
      ? [
          ...(Array.isArray(window.FULL_ROSTER_PLAYERS) ? window.FULL_ROSTER_PLAYERS : []),
          ...(Array.isArray(window.RECENT_ROSTER_PLAYERS) ? window.RECENT_ROSTER_PLAYERS : [])
        ]
      : [];
  const playersByKey = new Map(PLAYER_POOL.map((player) => [getPlayerKey(player), player]));
  externalPlayers.forEach((candidate) => {
    const candidateName = cleanPlayerName(candidate.name);
    const key = `${candidateName}|${getCurrentTeamName(candidate.team)}|${candidate.decade}`;
    if (!candidateName || !candidate.team || !candidate.decade) {
      return;
    }

    const positions = candidate.positions && candidate.positions.length ? candidate.positions : ["SF"];
    const template = templateForPositions(positions);
    const teamCn = getKnownTeamCn(candidate.team, candidate.teamCn);
    const existing = playersByKey.get(key);
    if (existing) {
      const wasCurated = isCuratedPlayer(existing);
      if (wasCurated) existing.curated = true;
      existing.positions = mergePositions(existing.positions, positions);
      existing.seasons = mergeSeasons(existing.seasons, candidate.seasons);
      existing.stats = mergeNumericStats(existing.stats, candidate.stats);
      existing.impactScore = Math.max(existing.impactScore || 0, candidate.impactScore || 0);
      existing.impactTier = strongerImpactTier(existing.impactTier, candidate.impactTier);
      existing.sortBoost = Math.max(existing.sortBoost || 0, candidate.sortBoost || 0);
      if (candidate.source) existing.source = existing.source || candidate.source;

      const mergedTemplate = templateForPositions(existing.positions);
      if (wasCurated) {
        return;
      } else {
        const mergedLabel = seasonSpanLabel(existing.seasons);
        existing.version = `${mergedLabel ? mergedLabel : ""}${getPlayerCnName(existing.name)}`;
        existing.ratings = ratingsFromStats(
          mergedTemplate.ratings,
          existing.stats,
          existing.impactScore || 0
        );
        existing.note = describeFullRosterCandidate(existing, mergedTemplate);
      }
      return;
    }

    const label = seasonSpanLabel(candidate.seasons);
    const ratings = ratingsFromStats(template.ratings, candidate.stats, candidate.impactScore || 0);
    const player = {
      name: candidateName,
      team: candidate.team,
      teamCn: getKnownTeamCn(candidate.team, teamCn),
      decade: candidate.decade,
      version: `${label ? label : ""}${getPlayerCnName(candidateName)}`,
      positions,
      tags: [candidate.impactTier === "core" ? "影响力前列" : "完整名单候选", ...template.tags.slice(0, 2)],
      note: describeFullRosterCandidate({ ...candidate, name: candidateName, teamCn }, template),
      impactScore: candidate.impactScore || 0,
      impactTier: candidate.impactTier,
      source: candidate.source,
      seasons: mergeSeasons([], candidate.seasons),
      stats: candidate.stats,
      ratings
    };
    PLAYER_POOL.push(player);
    playersByKey.set(key, player);
  });
}

mergeFullRosterPlayers();

let draftedPlayers = [];
let currentRoll = {
  team: null,
  decade: null
};

const draftBtn = document.querySelector("#draftBtn");
const sampleBtn = document.querySelector("#sampleBtn");
const evaluateBtn = document.querySelector("#evaluateBtn");
const draftCards = document.querySelector("#draftCards");
const draftState = document.querySelector("#draftState");
const teamRoll = document.querySelector("#teamRoll");
const decadeRoll = document.querySelector("#decadeRoll");
const playerRoll = document.querySelector("#playerRoll");
const rollTeamBtn = document.querySelector("#rollTeamBtn");
const rollDecadeBtn = document.querySelector("#rollDecadeBtn");
const playerChoice = document.querySelector("#playerChoice");
const addPlayerBtn = document.querySelector("#addPlayerBtn");
const draftMessage = document.querySelector("#draftMessage");
const resultPanel = document.querySelector("#resultPanel");
const cardTemplate = document.querySelector("#draftCardTemplate");
const slotTemplate = document.querySelector("#slotTemplate");

function average(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function weightedAverage(players, key) {
  return average(players.map((player) => player.ratings[key]));
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getPlayerKey(player) {
  return `${cleanPlayerName(player.name)}|${getCurrentTeamName(player.team)}|${player.decade}`;
}

function getPlayerByKey(key) {
  return PLAYER_POOL.find((player) => getPlayerKey(player) === key);
}

function getTeamLabel(team) {
  const currentTeam = getCurrentTeamName(team);
  const player = PLAYER_POOL.find((item) => getCurrentTeamName(item.team) === currentTeam);
  return getKnownTeamCn(currentTeam, player?.teamCn);
}

function getAvailableTeams() {
  return [...new Set(PLAYER_POOL.map((player) => getCurrentTeamName(player.team)))]
    .filter((team) => DECADES.some((decade) => teamExistedInDecade(team, decade) && getAvailableCandidates(team, decade).length > 0))
    .sort((a, b) => getTeamLabel(a).localeCompare(getTeamLabel(b), "zh-Hans-CN"));
}

function getAvailableDecades(team) {
  return DECADES.filter((decade) => teamExistedInDecade(team, decade) && getAvailableCandidates(team, decade).length > 0);
}

function getDecadeIndex(decade) {
  return DECADES.indexOf(decade);
}

function teamExistedInDecade(team, decade) {
  const currentTeam = getCurrentTeamName(team);
  const firstDecade = CURRENT_TEAM_FIRST_DECADE[currentTeam] || DECADES[0];
  return getDecadeIndex(decade) >= getDecadeIndex(firstDecade);
}

function getAvailableCandidates(team, decade) {
  const usedNames = new Set(draftedPlayers.map((player) => player.name));
  const currentTeam = getCurrentTeamName(team);
  return PLAYER_POOL.filter((player) =>
    getCurrentTeamName(player.team) === currentTeam &&
    player.decade === decade &&
    !usedNames.has(player.name)
  )
    .sort((a, b) => candidateSortScore(b) - candidateSortScore(a) || a.name.localeCompare(b.name))
    .slice(0, MAX_CANDIDATES_PER_CONTEXT);
}

function candidateSortScore(player) {
  const curatedScore = (player.ratings?.overall || 70) * 12;
  const impactScore = player.impactScore || 0;
  const manualBonus = isCuratedPlayer(player) ? 420 : 0;
  const tagBonus = player.tags?.some((tag) => ["历史级攻坚", "攻防一体", "明星版本", "影响力前列", "季后赛攻坚"].includes(tag)) ? 250 : 0;
  const statBonus = (player.stats?.winShares || 0) * 5 + (player.stats?.vorp || 0) * 16;
  return curatedScore + manualBonus + impactScore + tagBonus + statBonus + (player.sortBoost || 0);
}

function getCurrentCandidates() {
  if (!currentRoll.team || !currentRoll.decade) return [];
  return getAvailableCandidates(currentRoll.team, currentRoll.decade);
}

function resetDraft() {
  draftedPlayers = [];
  currentRoll = { team: null, decade: null };
  renderDraft();
  renderSlots();
  updateDraftMachine("第 1 轮：请先随机球队，再随机年代，最后选择球员。");
  resultPanel.className = "result-panel is-empty";
  resultPanel.innerHTML = `
    <div class="result-placeholder">
      <p class="eyebrow">Scouting Report</p>
      <h2>随机球队和年代后选择球员，抽满五人后再摆放位置并评价阵容。</h2>
    </div>
  `;
}

function rollTeam() {
  if (draftedPlayers.length >= 5) return;
  const teams = getAvailableTeams();
  if (!teams.length) {
    updateDraftMachine("当前没有可抽取的球队。");
    return;
  }
  currentRoll.team = randomItem(teams);
  currentRoll.decade = null;
  updateDraftMachine(`第 ${draftedPlayers.length + 1} 轮：抽到 ${getTeamLabel(currentRoll.team)}，请继续随机年代。`);
}

function rollDecade() {
  if (draftedPlayers.length >= 5) return;
  if (!currentRoll.team) {
    rollTeam();
  }
  const decades = currentRoll.team ? getAvailableDecades(currentRoll.team) : [];
  if (!decades.length) {
    currentRoll.decade = null;
    updateDraftMachine("这支球队当前没有可抽取年代，请重新随机球队。");
    return;
  }
  currentRoll.decade = randomItem(decades);
  updateDraftMachine(`第 ${draftedPlayers.length + 1} 轮：${getTeamLabel(currentRoll.team)} ${currentRoll.decade}，请选择球员。`);
}

function addSelectedPlayer() {
  if (!currentRoll.team || !currentRoll.decade || draftedPlayers.length >= 5) return;
  const player = getPlayerByKey(playerChoice.value);
  if (!player || !getCurrentCandidates().some((candidate) => getPlayerKey(candidate) === getPlayerKey(player))) {
    updateDraftMachine("请先从候选名单里选择一名球员。");
    return;
  }
  draftedPlayers = [...draftedPlayers, player];
  const nextMessage =
    draftedPlayers.length === 5
      ? "五名球员已经抽齐。现在把他们摆到 PG / SG / SF / PF / C，然后评价阵容。"
      : `加入 ${getDisplayVersion(player)}。第 ${draftedPlayers.length + 1} 轮：请随机下一名球员的球队和年代。`;
  currentRoll = { team: null, decade: null };
  renderDraft();
  renderSlots();
  updateDraftMachine(nextMessage, player);
  if (draftedPlayers.length === 5) {
    resultPanel.className = "result-panel is-empty";
    resultPanel.innerHTML = `
      <div class="result-placeholder">
        <p class="eyebrow">Scouting Report</p>
        <h2>五人已就位。完成位置选择后，这里会生成战绩预测。</h2>
      </div>
    `;
  }
}

function updateDraftMachine(message, lastPlayer = null) {
  teamRoll.textContent = currentRoll.team ? getTeamLabel(currentRoll.team) : "未选择";
  decadeRoll.textContent = currentRoll.decade || "未选择";
  renderPlayerChoices(lastPlayer);
  draftState.textContent = `${draftedPlayers.length} / 5`;
  draftMessage.textContent = message;

  const complete = draftedPlayers.length >= 5;
  rollTeamBtn.disabled = complete;
  rollDecadeBtn.disabled = complete || !currentRoll.team;
  addPlayerBtn.disabled = complete || !currentRoll.team || !currentRoll.decade || !playerChoice.value;
  evaluateBtn.disabled = draftedPlayers.length !== 5;
}

function renderPlayerChoices(lastPlayer = null) {
  const candidates = getCurrentCandidates();
  playerChoice.innerHTML = "";

  if (!candidates.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = currentRoll.team && currentRoll.decade ? "无可选球员" : "等待球队和年代";
    playerChoice.appendChild(option);
    playerChoice.disabled = true;
    playerRoll.textContent = lastPlayer ? lastPlayer.name : "未选择";
    return;
  }

  const empty = document.createElement("option");
  empty.value = "";
  empty.textContent = "选择球员";
  playerChoice.appendChild(empty);

  candidates.forEach((player) => {
    const option = document.createElement("option");
    option.value = getPlayerKey(player);
    option.textContent = `${player.name}  ${getDisplayVersion(player)}`;
    playerChoice.appendChild(option);
  });

  playerChoice.disabled = false;
  playerRoll.textContent = `${candidates.length} 人可选（前 ${MAX_CANDIDATES_PER_CONTEXT}）`;
}

function loadSample() {
  const names = [
    "Stephen Curry|Golden State Warriors|2010s",
    "Michael Jordan|Chicago Bulls|1990s",
    "Kevin Durant|Golden State Warriors|2010s",
    "LeBron James|Miami Heat|2010s",
    "Hakeem Olajuwon|Houston Rockets|1990s"
  ];
  draftedPlayers = names.map((key) => {
    const [name, team, decade] = key.split("|");
    return PLAYER_POOL.find((player) => player.name === name && player.team === team && player.decade === decade);
  });
  currentRoll = { team: null, decade: null };
  renderDraft();
  renderSlots({
    PG: getPlayerKey(draftedPlayers[0]),
    SG: getPlayerKey(draftedPlayers[1]),
    SF: getPlayerKey(draftedPlayers[2]),
    PF: getPlayerKey(draftedPlayers[3]),
    C: getPlayerKey(draftedPlayers[4])
  });
  updateDraftMachine("已载入示例阵容，可直接查看评价或重新开始。");
  evaluateLineup();
}

function renderDraft() {
  draftCards.innerHTML = "";
  if (!draftedPlayers.length) {
    draftCards.innerHTML = `
      <div class="result-placeholder">
        <p class="eyebrow">No Players Yet</p>
        <h2>还没有抽到球员。请按上方三步完成第 1 轮抽取。</h2>
      </div>
    `;
    return;
  }

  draftedPlayers.forEach((player) => {
    const card = cardTemplate.content.cloneNode(true);
    card.querySelector(".player-context").textContent = `${player.teamCn} ${player.decade}`;
    card.querySelector(".player-name").textContent = player.name;
    card.querySelector(".overall-badge").textContent = player.ratings.overall;
    card.querySelector(".version-label").textContent = getDisplayVersion(player);
    card.querySelector(".player-note").textContent = player.note;
    const ratingRow = card.querySelector(".rating-row");
    [
      ["攻", player.ratings.scoring],
      ["传", player.ratings.creation],
      ["投", player.ratings.spacing],
      ["防", player.ratings.defense]
    ].forEach(([label, value]) => {
      const item = document.createElement("div");
      item.className = "mini-rating";
      item.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
      ratingRow.appendChild(item);
    });
    draftCards.appendChild(card);
  });
}

function renderSlots(defaults = {}) {
  document.querySelectorAll(".slot").forEach((slot) => {
    const position = slot.dataset.position;
    slot.innerHTML = "";
    const slotNode = slotTemplate.content.cloneNode(true);
    const label = slotNode.querySelector(".slot-label");
    const select = slotNode.querySelector("select");
    label.textContent = position;
    select.dataset.position = position;

    const empty = document.createElement("option");
    empty.value = "";
    empty.textContent = "选择球员";
    select.appendChild(empty);

    draftedPlayers.forEach((player) => {
      const option = document.createElement("option");
      option.value = getPlayerKey(player);
      option.textContent = `${player.name} (${getKnownTeamCn(player.team, player.teamCn)} ${player.decade})`;
      select.appendChild(option);
    });

    if (defaults[position]) {
      select.value = defaults[position];
    }

    select.addEventListener("change", syncSlotChoices);
    slot.appendChild(slotNode);
  });
  syncSlotChoices();
}

function getAssignments() {
  const assignments = {};
  document.querySelectorAll(".slot select").forEach((select) => {
    if (select.value) {
      assignments[select.dataset.position] = draftedPlayers.find((player) => getPlayerKey(player) === select.value);
    }
  });
  return assignments;
}

function syncSlotChoices() {
  const assignments = getAssignments();
  const selectedPlayerKeys = new Set(Object.values(assignments).map((player) => getPlayerKey(player)));

  document.querySelectorAll(".slot select").forEach((select) => {
    [...select.options].forEach((option) => {
      option.disabled = option.value && option.value !== select.value && selectedPlayerKeys.has(option.value);
    });

    const player = assignments[select.dataset.position];
    const detail = select.closest(".slot").querySelector(".slot-player");
    if (!player) {
      detail.textContent = "未放置";
      return;
    }

    const fit = player.positions.includes(select.dataset.position) ? "适配位置" : "错位使用";
    detail.innerHTML = `<strong>${player.name}</strong>${getDisplayVersion(player)}<br>${fit} · ${player.tags.slice(0, 2).join(" / ")}`;
  });
}

function evaluateLineup() {
  if (draftedPlayers.length !== 5) {
    resultPanel.className = "result-panel";
    resultPanel.innerHTML = `
      <div class="result-placeholder">
        <p class="eyebrow">Lineup Incomplete</p>
        <h2>请先按三步流程抽满五名球员，再评价阵容。</h2>
      </div>
    `;
    return;
  }

  const assignments = getAssignments();
  const players = POSITIONS.map((position) => assignments[position]);
  if (players.some(Boolean) === false || players.some((player) => !player)) {
    resultPanel.className = "result-panel";
    resultPanel.innerHTML = `
      <div class="result-placeholder">
        <p class="eyebrow">Lineup Incomplete</p>
        <h2>五个位置都要放入球员，才能评价阵容。</h2>
      </div>
    `;
    return;
  }

  const evaluation = scoreLineup(assignments);
  renderEvaluation(evaluation);
}

function scoreLineup(assignments) {
  const players = POSITIONS.map((position) => assignments[position]);
  const positionPenalties = POSITIONS.map((position) => {
    const player = assignments[position];
    if (player.positions.includes(position)) return 0;
    if ((position === "SG" && player.positions.includes("PG")) || (position === "PF" && player.positions.includes("C"))) return 2;
    if ((position === "SF" && (player.positions.includes("SG") || player.positions.includes("PF"))) || (position === "C" && player.positions.includes("PF"))) return 4;
    return 7;
  });

  const talent = weightedAverage(players, "overall");
  const scoring = weightedAverage(players, "scoring");
  const creation = weightedAverage(players, "creation");
  const shooting = weightedAverage(players, "shooting");
  const spacing = weightedAverage(players, "spacing");
  const defense = weightedAverage(players, "defense");
  const rim = weightedAverage(players, "rim");
  const rebounding = weightedAverage(players, "rebounding");
  const offball = weightedAverage(players, "offball");
  const health = weightedAverage(players, "health");
  const stamina = weightedAverage(players, "stamina");
  const clutch = weightedAverage(players, "clutch");
  const portability = weightedAverage(players, "portability");
  const ballDemand = players.map((player) => player.ratings.ball);
  const highBallHandlers = players.filter((player) => player.ratings.ball >= 88).length;
  const nonShooters = players.filter((player) => player.ratings.spacing < 70).length;
  const eliteShooters = players.filter((player) => player.ratings.spacing >= 90).length;
  const eliteDefenders = players.filter((player) => player.ratings.defense >= 90).length;
  const topCreation = Math.max(...players.map((player) => player.ratings.creation));
  const topScoring = Math.max(...players.map((player) => player.ratings.scoring));
  const topRim = Math.max(...players.map((player) => player.ratings.rim));
  const primaryCreators = players.filter((player) => player.ratings.creation >= 94).length;
  const secondaryCreators = players.filter((player) => player.ratings.creation >= 88).length;
  const eliteOffballPlayers = players.filter((player) => player.ratings.offball >= 90).length;
  const positionPenalty = positionPenalties.reduce((sum, value) => sum + value, 0);

  let offense = scoring * 0.28 + creation * 0.26 + spacing * 0.22 + offball * 0.12 + clutch * 0.12;
  let defenseScore = defense * 0.42 + topRim * 0.24 + rim * 0.14 + rebounding * 0.12 + stamina * 0.08;
  let chemistry = portability * 0.34 + offball * 0.22 + spacing * 0.16 + creation * 0.12 + health * 0.1 + stamina * 0.06;
  let control = creation * 0.32 + rebounding * 0.22 + stamina * 0.18 + defense * 0.15 + health * 0.13;

  const totalBallDemand = ballDemand.reduce((sum, value) => sum + value, 0);
  const creatorRelief = Math.max(0, primaryCreators - 1) * 2.2 + Math.max(0, secondaryCreators - 2) * 0.9 + eliteOffballPlayers * 0.8 + eliteShooters * 0.5;
  const ballConflict = Math.max(0, Math.max(0, totalBallDemand - 420) / 12 + Math.max(0, highBallHandlers - 3) * 2.2 - creatorRelief);
  const ballConflictConcern = ballConflict > 5 || (highBallHandlers >= 4 && ballConflict > 2.5);
  const spacingPenalty = nonShooters * 2.4 - eliteShooters * 1.4;
  const noPrimaryCreatorPenalty = topCreation < 88 ? 5 : topCreation < 92 ? 2 : 0;
  const noRimPenalty = topRim < 84 ? 6 : topRim < 92 ? 2 : 0;
  const noStopperPenalty = eliteDefenders < 2 ? 3 : 0;

  offense += eliteShooters * 1.3 - Math.max(0, nonShooters - 1) * 2.7 - noPrimaryCreatorPenalty;
  defenseScore += eliteDefenders * 1.1 - noRimPenalty - noStopperPenalty;
  chemistry -= ballConflict + Math.max(0, nonShooters - 2) * 2.2 + positionPenalty * 0.7;
  control += (topCreation >= 95 ? 2.2 : topCreation >= 92 ? 1.1 : 0) + Math.max(0, primaryCreators - 1) * 0.8;
  control -= positionPenalty * 0.4 + (health < 84 ? 2.5 : 0);

  let total =
    talent * 0.25 +
    offense * 0.24 +
    defenseScore * 0.22 +
    chemistry * 0.16 +
    control * 0.13 -
    positionPenalty * 0.35;

  if (topScoring >= 98 && topCreation >= 95) total += 1.8;
  if (topRim >= 95 && eliteDefenders >= 2) total += 1.8;
  if (eliteShooters >= 2 && highBallHandlers <= 2) total += 1.4;
  if (health < 78) total -= 2.2;

  const totalScore = Math.round(clamp(total, 35, 100));
  const wins = clamp(Math.round((totalScore - 35) * 1.08 + 16 + matchupVariance(players)), 0, 82);
  const losses = 82 - wins;

  return {
    assignments,
    players,
    metrics: {
      总评: totalScore,
      进攻: Math.round(clamp(offense, 35, 100)),
      防守: Math.round(clamp(defenseScore, 35, 100)),
      空间: Math.round(clamp(spacing - Math.max(0, nonShooters - 1) * 3 + eliteShooters, 25, 100)),
      组织: Math.round(clamp(creation - noPrimaryCreatorPenalty + (topCreation >= 95 ? 2 : 0) + Math.max(0, primaryCreators - 1), 30, 100)),
      篮板: Math.round(clamp(rebounding, 30, 100)),
      化学反应: Math.round(clamp(chemistry, 25, 100)),
      健康体能: Math.round(clamp((health + stamina) / 2, 30, 100))
    },
    wins,
    losses,
    tier: getTier(wins, totalScore),
    flags: {
      highBallHandlers,
      nonShooters,
      eliteShooters,
      eliteDefenders,
      topRim,
      ballConflict,
      ballConflictConcern,
      positionPenalty,
      noPrimaryCreatorPenalty,
      noRimPenalty
    },
    strengths: buildStrengths(players, { eliteShooters, eliteDefenders, topRim, topScoring, topCreation, clutch, rebounding }),
    weaknesses: buildWeaknesses(players, { highBallHandlers, nonShooters, topRim, health, positionPenalty, ballConflict, ballConflictConcern, noPrimaryCreatorPenalty }),
    summary: buildSummary(players, assignments, wins, totalScore, { highBallHandlers, nonShooters, eliteShooters, eliteDefenders, topRim, ballConflict, ballConflictConcern, positionPenalty })
  };
}

function matchupVariance(players) {
  const clutch = weightedAverage(players, "clutch");
  const health = weightedAverage(players, "health");
  const spacing = weightedAverage(players, "spacing");
  return Math.round((clutch - 86) / 5 + (health - 86) / 7 + (spacing - 82) / 8);
}

function getTier(wins, score) {
  if (wins >= 70 || score >= 96) return "历史级超级队";
  if (wins >= 60) return "争冠大热";
  if (wins >= 52) return "强季后赛队";
  if (wins >= 43) return "季后赛级别";
  if (wins >= 33) return "附加赛边缘";
  if (wins >= 22) return "普通弱队";
  return "重建队";
}

function buildStrengths(players, context) {
  const strengths = [];
  const topScorer = [...players].sort((a, b) => b.ratings.scoring - a.ratings.scoring)[0];
  const topCreator = [...players].sort((a, b) => b.ratings.creation - a.ratings.creation)[0];
  const topDefender = [...players].sort((a, b) => b.ratings.defense - a.ratings.defense)[0];

  strengths.push(`${topScorer.name} 提供最高级别的半场得分保险，关键回合不容易完全断电。`);
  if (topCreator.ratings.creation >= 94) strengths.push(`${topCreator.name} 可以承担主控，阵容具备稳定的第一组织点。`);
  if (context.eliteShooters >= 2) strengths.push("至少两名顶级空间点会显著拉开突破和低位进攻路线。");
  if (context.eliteDefenders >= 2) strengths.push(`${topDefender.name} 领衔的防守资源足够搭出高强度体系。`);
  if (context.topRim >= 94) strengths.push("内线护框上限很高，常规赛防守下限稳。");
  if (context.rebounding >= 88) strengths.push("篮板和回合控制优秀，不容易被二次进攻拖垮。");

  return strengths.slice(0, 5);
}

function buildWeaknesses(players, context) {
  const weaknesses = [];
  if (context.ballConflictConcern) weaknesses.push("高球权球员偏多，需要明确第一、第二选择，否则会牺牲部分无球价值。");
  if (context.nonShooters >= 2) weaknesses.push("非空间点偏多，强队会在半场收缩，考验主攻手的强投和传导。");
  if (context.topRim < 84) weaknesses.push("缺少真正的护框中轴，防守名气未必能转化成禁区保护。");
  if (context.health < 82) weaknesses.push("健康和体能有隐患，82场常规赛预测需要打折。");
  if (context.positionPenalty >= 7) weaknesses.push("存在明显错位摆放，部分球员会被迫承担不适合的防守或组织任务。");
  if (context.noPrimaryCreatorPenalty) weaknesses.push("阵容没有绝对主控，关键时刻进攻发起可能偏零散。");

  if (!weaknesses.length) weaknesses.push("主要短板不明显，真正的风险更多来自角色分配和教练取舍。");
  return weaknesses.slice(0, 5);
}

function buildSummary(players, assignments, wins, score, context) {
  const lead = [...players].sort((a, b) => b.ratings.overall - a.ratings.overall)[0];
  const creator = [...players].sort((a, b) => b.ratings.creation - a.ratings.creation)[0];
  const anchor = [...players].sort((a, b) => b.ratings.rim + b.ratings.defense - (a.ratings.rim + a.ratings.defense))[0];
  const spacingText =
    context.eliteShooters >= 2
      ? "空间质量很好，强侧突破和弱侧投射能够互相放大。"
      : context.nonShooters >= 2
        ? "空间会是最需要设计的部分，半场进攻要靠掩护、转换和强点硬解打开。"
        : "空间不算极致，但足够支撑核心球员发起。";
  const ballText =
    context.ballConflictConcern
      ? "球权分配是最大管理问题，最好让一名主控完全掌舵，其他人更多参与终结和二次处理。"
      : `${creator.name} 可以作为主要发起点，其他人围绕他的优势切入、外拆或攻击错位。`;
  const defenseText =
    context.topRim >= 92
      ? `${anchor.name} 能作为防守轴心，外线可以更积极压迫。`
      : "防守端需要更多依靠换防、夹击和篮板保护，不能只靠个人名气。";

  return `这套阵容的基础天赋由 ${getDisplayVersion(lead)} 托底，综合评分 ${score}/100，常规赛预测为 ${wins} 胜。${spacingText}${ballText}${defenseText}`;
}

function renderEvaluation(evaluation) {
  resultPanel.className = "result-panel";
  const metricCards = Object.entries(evaluation.metrics)
    .map(([label, value]) => `<div class="metric"><span>${label}</span><strong>${value}</strong></div>`)
    .join("");
  const versions = POSITIONS.map((position) => {
    const player = evaluation.assignments[position];
    return `<li><strong>${position}</strong>：${getDisplayVersion(player)}。${player.note}</li>`;
  }).join("");

  resultPanel.innerHTML = `
    <div class="scoreboard">
      <div class="record-card">
        <p class="eyebrow">Projected Record</p>
        <div class="record">${evaluation.wins}-${evaluation.losses}</div>
        <p class="tier">${evaluation.tier}</p>
      </div>
      <div class="metric-grid">${metricCards}</div>
    </div>
    <div class="report-grid">
      <article class="report-block wide">
        <h3>总评</h3>
        <p>${evaluation.summary}</p>
        <div class="tags">
          ${evaluation.players.flatMap((player) => player.tags).slice(0, 10).map((tag) => `<span class="tag">${tag}</span>`).join("")}
        </div>
      </article>
      <article class="report-block">
        <h3>优势</h3>
        <ul>${evaluation.strengths.map((item) => `<li>${item}</li>`).join("")}</ul>
      </article>
      <article class="report-block">
        <h3>隐患</h3>
        <ul>${evaluation.weaknesses.map((item) => `<li>${item}</li>`).join("")}</ul>
      </article>
      <article class="report-block">
        <h3>版本锁定</h3>
        <ul>${versions}</ul>
      </article>
    </div>
  `;
}

draftBtn.addEventListener("click", resetDraft);
sampleBtn.addEventListener("click", loadSample);
rollTeamBtn.addEventListener("click", rollTeam);
rollDecadeBtn.addEventListener("click", rollDecade);
addPlayerBtn.addEventListener("click", addSelectedPlayer);
playerChoice.addEventListener("change", () => {
  addPlayerBtn.disabled = draftedPlayers.length >= 5 || !currentRoll.team || !currentRoll.decade || !playerChoice.value;
});
evaluateBtn.addEventListener("click", evaluateLineup);

if (window.location.hash === "#sample") {
  loadSample();
} else {
  resetDraft();
}
