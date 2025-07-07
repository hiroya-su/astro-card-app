document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const frontImg = document.getElementById("cardFrontImg");
  const backImg = document.getElementById("cardBackImg");
  const cardInner = document.querySelector(".card-inner");
  const card = document.querySelector(".card");
  const resultName = document.getElementById("resultName");
  const detailButton = document.getElementById("detailButton");
  const description = document.getElementById("description");

  // 音ファイルを読み込み
  const flipSound = new Audio("sound/flip.mp3");

  // 最初は裏面（rotateY(0deg) = 背面）から
  card.classList.remove("spinIn");

  // 音を有効化（ユーザークリックで1回だけ）
  let audioUnlocked = false;
  document.body.addEventListener("click", () => {
    if (!audioUnlocked) {
      flipSound.play().then(() => {
        flipSound.pause();
        flipSound.currentTime = 0;
        audioUnlocked = true;
      }).catch(() => {});
    }
  }, { once: true });

  const locationMap = {
    "埼玉県": { lat: 35.8574, lon: 139.6489 },
    "東京都": { lat: 35.6895, lon: 139.6917 },
    "大阪府": { lat: 34.6937, lon: 135.5023 }
  };

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

    const loc = locationMap[place] || { lat: 35.6895, lon: 139.6917 }; // デフォルトは東京

    try {
      const res = await fetch("https://astro-api-yp6x.onrender.com/get_zodiac", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, date: birth, time, lat: loc.lat, lon: loc.lon })
      });

      if (!res.ok) throw new Error("APIエラー");

      const data = await res.json();
      const venusSign = data["金星"]?.toLowerCase();

      if (!venusSign || !characters[venusSign] || !characters[venusSign][gender]) {
        alert("キャラクターが見つかりませんでした。");
        return;
      }

      const chara = characters[venusSign][gender];
      frontImg.src = chara.img;
      resultName.textContent = `${chara.name}（${venusSign}）`;

　　　document.getElementById("cardContainer").classList.remove("hidden");
      
      // 表示開始（裏からスタート → 表に回転）
      card.classList.remove("hidden");
      card.classList.remove("spinIn"); // 一度クラスを外す
      void card.offsetWidth; // 強制再描画
      card.classList.add("spinIn");

      // 音を再生
      flipSound.currentTime = 0;
      flipSound.play().catch(() => {});

      description.classList.add("hidden");
      detailButton.classList.remove("hidden");

    } catch (err) {
      console.error(err);
      alert("データの取得に失敗しました。");
    }
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
});
