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
  "牡羊座_女性": { name: "炎の童子", front: "img/aries_f.jpg", back: "img/back.jpg", desc: "情熱的で冒険好きなキャラです。" },
  "牡羊座_男性": { name: "炎舞武者", front: "img/aries_m.jpg", back: "img/back.jpg", desc: "火のような闘志で前進する戦士。" },
  "牡牛座_女性": { name: "花神", front: "img/taurus_f.jpg", back: "img/back.jpg", desc: "安定感と美しさを兼ね備えた存在。" },
  // ... 他の星座もここに追加
};

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const birth = document.getElementById("birth").value;
  const time = document.getElementById("time").value;
  const place = document.getElementById("place").value;
  const gender = document.getElementById("gender").value;

  // APIに送信
  const res = await fetch("https://astro-api-yp6x.onrender.com/get_zodiac", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, birth, time, place, gender })
  });

  const data = await res.json();
  const venusSign = data["金星"]; // 金星の星座
  const key = `${venusSign}_${gender}`;

  const chara = characters[key];
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
  void cardInner.offsetWidth; // アニメーションの再実行用ハック
  cardInner.classList.remove("spinIn");
  void cardInner.offsetWidth;
  cardInner.classList.add("spinIn");

  // 詳細非表示 → ボタン表示
  description.classList.add("hidden");
  detailButton.classList.remove("hidden");
});

// 「詳細を見る」クリックでコメント表示
detailButton.addEventListener("click", function () {
  const name = resultName.textContent.split("（")[0];
  const chara = Object.values(characters).find(c => c.name === name);
  description.textContent = chara.desc;
  description.classList.remove("hidden");
  detailButton.classList.add("hidden");
});
