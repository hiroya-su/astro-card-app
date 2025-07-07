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
  aries: {
    male: { name: "炎舞武者（えんぶのもののふ）", img: "img/aries_m.jpg", desc: "🔥熱血で行動的なキャラ！" },
    female: { name: "炎の童子（ほのおのどうじ）", img: "img/aries_f.jpg", desc: "🔥情熱に満ちた純粋な心の持ち主！" }
  },
  taurus: {
    male: { name: "花鎧（はなよろい）", img: "img/taurus_m.jpg", desc: "🌸心優しく安定志向の騎士。" },
    female: { name: "花神（かしん）", img: "img/taurus_f.jpg", desc: "🌸自然を愛し守る女神。" }
  },
  gemini: {
    male: { name: "翔猿童子（しょうえんどうじ）", img: "img/gemini_m.jpg", desc: "🌪トリッキーで好奇心旺盛。" },
    female: { name: "風狐（ふうこ）", img: "img/gemini_f.jpg", desc: "🌪軽やかで賢い風の妖狐。" }
  },
  cancer: {
    male: { name: "潮守男（しおもりお）", img: "img/cancer_m.jpg", desc: "🌊家族を守る誠実な戦士。" },
    female: { name: "潮巫女（しおのみこ）", img: "img/cancer_f.jpg", desc: "🌊心優しい海の巫女。" }
  },
  leo: {
    male: { name: "金耀童子（きんようどうじ）", img: "img/leo_m.jpg", desc: "🦁勇敢でカリスマ性抜群！" },
    female: { name: "煌獅童子（こうしどうじ）", img: "img/leo_f.jpg", desc: "🦁華やかで堂々とした姫。" }
  },
  virgo: {
    male: { name: "香紳士（こうしんし）", img: "img/virgo_m.jpg", desc: "🌿繊細で丁寧な癒し系紳士。" },
    female: { name: "香花天女（こうかてんにょ）", img: "img/virgo_f.jpg", desc: "🌿清楚で純粋な天女。" }
  },
  libra: {
    male: { name: "雅風士（がふうし）", img: "img/libra_m.jpg", desc: "🍃調和を愛する優美な騎士。" },
    female: { name: "雅蝶（みやびちょう）", img: "img/libra_f.jpg", desc: "🍃美しきバランサー。" }
  },
  scorpio: {
    male: { name: "黒蛇守（くろじゃしゅ）", img: "img/scorpio_m.jpg", desc: "🐍深い情を秘めた守護者。" },
    female: { name: "影蛇姫（えいじゃひめ）", img: "img/scorpio_f.jpg", desc: "🐍ミステリアスな魅力の姫。" }
  },
  sagittarius: {
    male: { name: "飛鹿童子（ひろくどうじ）", img: "img/sagittarius_m.jpg", desc: "🏹自由奔放な冒険者。" },
    female: { name: "翔鹿（しょうか）", img: "img/sagittarius_f.jpg", desc: "🏹大空を駆ける楽天的な少女。" }
  },
  capricorn: {
    male: { name: "岩誠者（がんせいしゃ）", img: "img/capricorn_m.jpg", desc: "⛰努力家で堅実な守護者。" },
    female: { name: "岩座童子（いわくらどうじ）", img: "img/capricorn_f.jpg", desc: "⛰意思の強い大地の少女。" }
  },
  aquarius: {
    male: { name: "天風童子（てんぷうどうじ）", img: "img/aquarius_m.jpg", desc: "🌪独創的で未来志向の風使い。" },
    female: { name: "天狐童女（てんこどうじょ）", img: "img/aquarius_f.jpg", desc: "🌪自由な風の化身。" }
  },
  pisces: {
    male: { name: "夢舟守（ゆめふねのもり）", img: "img/pisces_m.jpg", desc: "🌊幻想的で心優しい詩人。" },
    female: { name: "夢海姫（ゆめうみひめ）", img: "img/pisces_f.jpg", desc: "🌊夢と癒しの海姫。" }
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
  const venusSign = data["金星"].toLowerCase(); // 金星の星座
  const chara = characters[venusSign]?.[gender];

  if (!chara) {
    alert("キャラクターが見つかりませんでした。");
    return;
  }

  // カード画像・名前をセット
  frontImg.src = chara.img;
  backImg.src = "img/back.jpg";
  resultName.textContent = `${chara.name}（${venusSign}）`;

  // 演出表示
  cardContainer.classList.remove("hidden");
  cardInner.style.transform = "rotateY(0deg)";
  void cardInner.offsetWidth; // アニメーション再発火用ハック
  cardInner.classList.remove("spinIn");
  void cardInner.offsetWidth;
  cardInner.classList.add("spinIn");

  // 詳細ボタン表示、説明は非表示に戻す
  description.classList.add("hidden");
  detailButton.classList.remove("hidden");
});

detailButton.addEventListener("click", function () {
  const text = resultName.textContent;
  const sign = text.match(/（(.+?)）/)[1].toLowerCase();
  const gender = document.getElementById("gender").value;
  const chara = characters[sign][gender];

  description.textContent = chara.desc;
  description.classList.remove("hidden");
  detailButton.classList.add("hidden");
});
