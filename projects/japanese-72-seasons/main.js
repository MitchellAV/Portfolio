function isLeapYear(year) {
  if (year % 4 == 0) {
    if (year % 100) {
      if (year % 400) {
        leapYear = true;
      } else {
        leapYear = false;
      }
    } else {
      leapYear = true;
    }
  } else {
    leapYear = false;
  }
}

function logic72(sum) {
  if (sum >= 365) {
    season = 71;
  } else if (sum >= 355) {
    season = Math.floor((sum - 5) / 5);
  } else if (sum >= 296) {
    season = Math.floor((sum - 6) / 5);
  } else if (sum >= 277) {
    season = Math.floor((sum - 7) / 5);
  } else if (sum >= 236) {
    season = Math.floor((sum - 6) / 5);
  } else if (sum >= 200) {
    season = Math.floor((sum - 5) / 5);
  } else if (sum >= 174) {
    season = Math.floor((sum - 4) / 5);
  } else if (sum >= 153) {
    season = Math.floor((sum - 3) / 5);
  } else if (sum >= 137) {
    season = Math.floor((sum - 2) / 5);
  } else if (sum >= 111) {
    season = Math.floor((sum - 1) / 5);
  } else if (sum >= 75) {
    season = Math.floor((sum) / 5);
  } else if (sum >= 29) {
    season = Math.floor((sum + 1) / 5);
  } else {
    season = Math.floor(sum / 5);
  }
}

var d = new Date();
var day = d.getDate(); //1-31
var months = ["January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
var month = d.getMonth(); //0-11
var year = d.getFullYear(); //yyyy
var leapYear;
var leap;
var season = 0;
var sum = 0;
var totalDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var kanji24 = ['立春 Risshun (Beginning of spring)',
  '雨水 Usui (Rainwater)',
  '啓蟄 Keichitsu (Insects awaken)',
  '春分 Shunbun (Spring equinox)',
  '清明 Seimei (Pure and clear)',
  '穀雨 Kokuu (Grain rains)',
  '立夏 Rikka (Beginning of summer)',
  '小満 Shōman (Lesser ripening)',
  '芒種 Bōshu (Grain beards and seeds)',
  '夏至 Geshi (Summer solstice)',
  '小暑 Shōsho (Lesser heat)',
  '大暑 Taisho (Greater heat)',
  '立秋 Risshū (Beginning of autumn)',
  '処暑 Shosho (Manageable heat)',
  '白露 Hakuro (White dew)',
  '秋分 Shūbun (Autumn equinox)',
  '寒露 Kanro (Cold dew)',
  '霜降 Sōkō (Frost falls)',
  '立冬 Rittō (Beginning of winter)',
  '小雪 Shōsetsu (Lesser snow)',
  '大雪 Taisetsu (Greater snow)',
  '冬至 Tōji (Winter solstice)',
  '小寒 Shōkan (Lesser cold)',
  '大寒 Daikan (Greater cold)'
];

var kanji72 = ["東風解凍 Harukaze kōri o toku",
  "黄鶯睍睆 Kōō kenkan su",
  "魚上氷 Uo kōri o izuru",
  "土脉潤起 Tsuchi no shō uruoi okoru",
  "霞始靆 Kasumi hajimete tanabiku",
  "草木萌動 Sōmoku mebae izuru",
  "蟄虫啓戸 Sugomori mushito o hiraku",
  "桃始笑 Momo hajimete saku",
  "菜虫化蝶 Namushi chō to naru",
  "雀始巣 Suzume hajimete sukū",
  "櫻始開 Sakura hajimete saku",
  "雷乃発声 Kaminari sunawachi koe o hassu",
  "玄鳥至 Tsubame kitaru",
  "鴻雁北 Kōgan kaeru",
  "虹始見 Niji hajimete arawaru",
  "葭始生 Ashi hajimete shōzu",
  "霜止出苗 Shimo yamite nae izuru",
  "牡丹華 Botan hana saku",
  "蛙始鳴 Kawazu hajimete naku",
  "蚯蚓出 Mimizu izuru",
  "竹笋生 Takenoko shōzu",
  "蚕起食桑 Kaiko okite kuwa o hamu",
  "紅花栄 Benibana sakau",
  "麦秋至 Mugi no toki itaru",
  "蟷螂生 Kamakiri shōzu",
  "腐草為螢 Kusaretaru kusa hotaru to naru",
  "梅子黄 Ume no mi kibamu",
  "乃東枯 Natsukarekusa karuru",
  "菖蒲華 Ayame hana saku",
  "半夏生 Hange shōzu",
  "温風至 Atsukaze itaru",
  "蓮始開 Hasu hajimete hiraku",
  "鷹乃学習 Taka sunawachi waza o narau",
  "桐始結花 Kiri hajimete hana o musubu",
  "土潤溽暑 Tsuchi uruōte mushi atsushi",
  "大雨時行 Taiu tokidoki furu",
  "涼風至 Suzukaze itaru",
  "寒蝉鳴 Higurashi naku",
  "蒙霧升降 Fukaki kiri matō",
  "綿柎開 Wata no hana shibe hiraku",
  "天地始粛 Tenchi hajimete samushi",
  "禾乃登 Kokumono sunawachi minoru",
  "草露白 Kusa no tsuyu shiroshi",
  "鶺鴒鳴 Sekirei naku",
  "玄鳥去 Tsubame saru",
  "雷乃収声 Kaminari sunawachi koe o osamu",
  "蟄虫坏戸 Mushi kakurete to o fusagu",
  "水始涸 Mizu hajimete karuru",
  "鴻雁来 Kōgan kitaru",
  "菊花開 Kiku no hana hiraku",
  "蟋蟀在戸 Kirigirisu to ni ari",
  "霜始降 Shimo hajimete furu",
  "霎時施 Kosame tokidoki furu",
  "楓蔦黄 Momiji tsuta kibamu",
  "山茶始開 Tsubaki hajimete hiraku",
  "地始凍 Chi hajimete kōru",
  "金盞香 Kinsenka saku",
  "虹蔵不見 Niji kakurete miezu",
  "朔風払葉 Kitakaze konoha o harau",
  "橘始黄 Tachibana hajimete kibamu",
  "閉塞成冬 Sora samuku fuyu to naru",
  "熊蟄穴 Kuma ana ni komoru",
  "鱖魚群 Sake no uo muragaru",
  "乃東生 Natsukarekusa shōzu",
  "麋角解 Sawashika no tsuno otsuru",
  "雪下出麦 Yuki watarite mugi nobiru",
  "芹乃栄 Seri sunawachi sakau",
  "水泉動 Shimizu atataka o fukumu",
  "雉始雊 Kiji hajimete naku",
  "款冬華 Fuki no hana saku",
  "水沢腹堅 Kiwamizu kōri tsumeru",
  "鶏始乳 Niwatori hajimete toya ni tsuku"
];

var season72 = ['Spring Winds Thaw the Ice',
  'The Nightingale Sings',
  'Fish Rise From the Ice',
  "The Earth Becomes Damp",
  "Haze First Covers the Sky",
  "Plants Show their First Buds",
  "Hibernating Creatures Open their Doors",
  "The First Peach Blossoms",
  "Leaf Insects Turn into Butterflies",
  "The Sparrow Builds her Nest",
  "The First Cherry Blossoms",
  "Thunder Raises its Voice",
  "The Swallows Arrive",
  "Geese Fly North",
  "The First Rainbow Appears",
  "The First Reeds Grow",
  "The Frost Stops the Rice Grows",
  "The Tree Peony Flowers",
  "The First Frogs Call",
  "The Earth Worms Rise",
  "Bamboo Shoots Appear",
  "The Silk Worm Awakes and Eats the Mulberry",
  "The Safflower Blossoms",
  "The Time for Wheat",
  "The Praying Mantis Hatches",
  "Fireflies Rise from the Rotten Grass",
  "The Plums Turn Yellow",
  "The Common Self-Heal Dries",
  "The Iris Flower",
  "The Crow-dipper Sprouts",
  "Hot Winds Blow",
  "The First Lotus Blossoms",
  "The Young Hawk Learns to Fly",
  "The First Paulownia Fruit",
  "Damp Earth Humid Heat",
  "Heavy Rain Showers",
  "A Cool Wind Blows",
  "The Evening Cicada Sings",
  "Thick Fog Blankets the Sky",
  "The Cotton Lint Opens",
  "Earth and Sky Begin to Cool",
  "The Rice Ripens",
  "White Dew on the Grass",
  "The Wigtail Calls",
  "The Swallows Leave",
  "Thunder Lowers its Voice",
  "Hibernating Creatures Close their Doors",
  "The Paddy Water is First Drained",
  "The Geese Arrive",
  "The Chrysanthemum Flowers",
  "The Grasshopper Sings",
  "The First Frost Falls",
  "Light Rain Showers",
  "The Maple and the Ivy Turn Yellow",
  "The First Camellia Blossoms",
  "The Earth First Freezes",
  "The Daffodil Flowers",
  "The Rainbow Hides Unseen",
  "The North Wind Brushes the Leaves",
  "The Tachibana First Turns Yellow",
  "The Sky is Cold, Winter Comes",
  "The Bear Retreats to its Den",
  "The Salmon Gather to Spawn",
  "The Common Self-Heal Sprouts",
  "The Elk Sheds its Horns",
  "Beneath the Snow the Wheat Sprouts",
  "The Water Dropwort Flourishes",
  "The Springwater Holds Warmth",
  "The Pheasant First Calls",
  "The Giant Butterbur Flowers",
  "The Mountain Stream Freezes Over",
  "The Chicken Lays Her First Eggs"
];

var altSeason72 = [];

var date72 = ["February 4th - 8th",
  "February 9th - 13th",
  "February 14th - 18th",
  "February 19th - 23rd",
  "February 24th - 28th",
  "March 1st - 4th",
  "March 5th - 9th",
  "March 10th - 14th",
  "March 15th - 19th",
  "March 20th - 24th",
  "March 25th - 29th",
  "March 30th - April 3rd",
  "April 4th -  8th",
  "April 9th -  13th",
  "April 14th -  19th",
  "April 20th -  24th",
  "April 25th -  29th",
  "April 30th -  May 4th",
  "May 5th -  9th",
  "May 10th -  14th",
  "May 15th -  19th",
  "May 20th -  25th",
  "May 26th -  30th",
  "May 31st -  June 4th",
  "June 5th -  9th",
  "June 10th -  15th",
  "June 16th -  20th",
  "June 21st -  25th",
  "June 26th -  30th",
  "July 1st -  6th",
  "July 7th -  11th",
  "July 12th -  16th",
  "July 17th -  21st",
  "July 22nd -  27th",
  "July 28th -  August 3rd",
  "August 2nd -  6th",
  "August 7th -  11th",
  "August 12th -  16th",
  "August 17th -  22nd",
  "August 23rd -  27th",
  "August 28th -  September 1st",
  "September 2nd -  6th",
  "September 7th -  11th",
  "September 12th -  16th",
  "September 17th -  21st",
  "September 22nd -  27th",
  "September 28th -  October 2nd",
  "October 3rd -  7th",
  "October 8th -  12th",
  'October 13th -  17th',
  "October 18th -  22nd",
  "October 23rd -  27th",
  'October 28th -  November 1st',
  'November 2nd -  7th',
  'November 8th -  12th',
  'November 13th -  17th',
  'November 18th -  22nd',
  'November 23rd -  26th',
  'November 27th -  December 1st',
  'December 2nd -  6th',
  'December 7th -  11th',
  'December 12th -  16th',
  'December 17th -  21st',
  'December 22nd -  26th',
  'December 27th -  31st',
  'January 1st -  5th',
  'January 6th -  10th',
  'January 11th -  15th',
  'January 16th -  20th',
  'January 21st -  24th',
  'January 25th -  29th',
  'January 30th - February 3rd'
];

var season24 = ["First Spring",
  "Rain Water",
  "Awakening of Insects",
  "Spring Equinox",
  "Clear and Bright",
  "Grain Rain",
  "First Summer",
  "Grain Full",
  "Grain in Ear",
  "Summer Solstice",
  "Minor Heat",
  "Major Heat",
  "First Autumn",
  "Limit of Heat",
  "White Dew",
  "Autumn Equinox",
  "Cold Dew",
  "Frost Descent",
  "First Winter",
  "Minor Snow",
  "Major Snow",
  "Winter Solstice",
  "Minor Cold",
  "Major Cold"
];

var season4 = ["Spring", "Summer", "Autumn", "Winter"];
isLeapYear(year);

if (leapYear) {
  totalDays[1] = 29;
  leap = 1;
} else {
  totalDays[1] = 28;
  leap = 0;
}

for (var i = 0; i < totalDays.length; i++) {
  if (i < month) {
    sum += totalDays[i];
  } else if (i == month) {
    sum += day;
  }
}
sum -= 35;
//sum = 98;
logic72(sum);
var phase = Math.floor(season / 3);
var large = Math.floor(season / 18);

console.log(sum);
console.log(season);

function printInfo() {
  $("#today").html('Today is ' + months[month] + " " + day + ", " + year);
  $("#subSeason").html(season4[large] + ' - ' + 'Division ' + (1 + phase) + ' - ' + kanji24[phase]);
  // + ' - ' + season24[phase]
  $("#seasonName").html('Kō: ' + (season + 1) + ' - ' + kanji72[season] + ' - ' + season72[season]);
  $("#approxDate").html("approx. " + date72[season]);
}
printInfo();
var state = 0;
$("#button").click(function() {
  if (state == 0) {
    $("#button").text("Hide");
    $("#seasonDesc").html('<p>The traditional Japanese calendar marks the passing of the seasons and changes in the natural world through the names given to different times of year.There are 24 major divisions, or sekki, from Risshun(Beginning of spring) in early February until Daikan(Greater cold).Originally taken from Chinese sources, these are still well - known around East Asia.<br><br>The 24 divisions are each split again into three for a total of 72 kō that last around five days each. The names were also originally taken from China, but they did not always match up well with the local climate. In Japan, they were eventually rewritten in 1685 by the court astronomer Shibukawa Shunkai. In their present form, they offer a poetic journey through the Japanese year in which the land awakens and blooms with life and activity before returning to slumber.<br><br>The dates in the following table are approximate and may vary by one day depending on the year.</p><br/>');
    state = 1;
  } else {
    $("#button").text("Click here to learn more.");
    $("#seasonDesc").html("");
    state = 0;
  }


});