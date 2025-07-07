const form = document.getElementById("form");
const cardContainer = document.getElementById("cardContainer");
const cardInner = document.getElementById("cardInner");
const frontImg = document.getElementById("cardFrontImg");
const backImg = document.getElementById("cardBackImg");
const resultName = document.getElementById("resultName");
const description = document.getElementById("description");
const detailButton = document.getElementById("detailButton");

// キャラ情報（仮の説明）
const characters = {
  const characters = {
  aries: {
    male: { name: "炎舞武者（えんぶのもののふ）", img: "img/aries_m.jpg" },
    female: { name: "炎の童子（ほのおのどうじ）", img: "img/aries_f.jpg" }
  },
  taurus: {
    male: { name: "花鎧（はなよろい）", img: "img/taurus_m.jpg" },
    female: { name: "花神（かしん）", img: "img/taurus_f.jpg" }
  },
  gemini: {
    male: { name: "翔猿童子（しょうえんどうじ）", img: "img/gemini_m.jpg" },
    female: { name: "風狐（ふうこ）", img: "img/gemini_f.jpg" }
  },
  cancer: {
    male: { name: "潮守男（しおもりお）", img: "img/cancer_m.jpg" },
    female: { name: "潮巫女（しおのみこ）", img: "img/cancer_f.jpg" }
  },
  leo: {
    male: { name: "金耀童子（きんようどうじ）", img: "img/leo_m.jpg" },
    female: { name: "煌獅童子（こうしどうじ）", img: "img/leo_f.jpg" }
  },
  virgo: {
    male: { name: "香紳士（こうしんし）", img: "img/virgo_m.jpg" },
    female: { name: "香花天女（こうかてんにょ）", img: "img/virgo_f.jpg" }
  },
  libra: {
    male: { name: "雅風士（がふうし）", img: "img/libra_m.jpg" },
    female: { name: "雅蝶（みやびちょう）", img: "img/libra_f.jpg" }
  },
  scorpio: {
    male: { name: "黒蛇守（くろじゃしゅ）", img: "img/scorpio_m.jpg" },
    female: { name: "影蛇姫（えいじゃひめ）", img: "img/scorpio_f.jpg" }
  },
  sagittarius: {
    male: { name: "飛鹿童子（ひろくどうじ）", img: "img/sagittarius_m.jpg" },
    female: { name: "翔鹿（しょうか）", img: "img/sagittarius_f.jpg" }
  },
  capricorn: {
    male: { name: "岩誠者（がんせいしゃ）", img: "img/capricorn_m.jpg" },
    female: { name: "岩座童子（いわくらどうじ）", img: "img/capricorn_f.jpg" }
  },
  aquarius: {
    male: { name: "天風童子（てんぷうどうじ）", img: "img/aquarius_m.jpg" },
    female: { name: "天狐童女（てんこどうじょ）", img: "img/aquarius_f.jpg" }
  },
  pisces: {
    male: { name: "夢舟守（ゆめふねのもり）", img: "img/pisces_m.jpg" },
    female: { name: "夢海姫（ゆめうみひめ）", img: "img/pisces_f.jpg" }
  }
};


form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const birth = document.getElementById("birth").value;
  const time = document.getElementById("time").value;
  const place = document.getElementById("place").value;
  const gender = document.getElementById("gender").value;

  const res = await fetch("https://astro-api-yp6x.onrender.com/get_zodiac", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, birth, time, place, gender })
  });

  const data = await res.json();
  const venusSign = data["金星"].toLowerCase(); // 小文字で統一
  const chara = characters[venusSign]?.[gender];

  if (!chara) {
    alert("キャラクターが見つかりませんでした。");
    return;
  }

  // カード画像・名前をセット
  frontImg.src = chara.front;
  backImg.src = chara.back;
  resultName.textContent = `${chara.name}（${venusSign}）`;

  // 演出表示
  cardContainer.classList.remove("hidden");
  cardInner.style.transform = "rotateY(0deg)";
  void cardInner.offsetWidth;
  cardInner.classList.remove("spinIn");
  void cardInner.offsetWidth;
  cardInner.classList.add("spinIn");

  // 詳細非表示 → ボタン表示
  description.classList.add("hidden");
  detailButton.classList.remove("hidden");
});

// 「詳細を見る」クリックでコメント表示
detailButton.addEventListener("click", function () {
  const text = resultName.textContent;
  const sign = text.match(/（(.+?)）/)[1].toLowerCase();
  const gender = document.getElementById("gender").value;
  const chara = characters[sign][gender];
  description.textContent = chara.desc;
  description.classList.remove("hidden");
  detailButton.classList.add("hidden");
});
