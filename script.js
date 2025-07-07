const name = document.getElementById("name").value;
const birth = document.getElementById("birthDate").value;  // ✅ 修正済み
const time = document.getElementById("birthTime").value;   // ✅ 修正済み
const place = document.getElementById("birthPlace").value; // ✅ 修正済み
const gender = document.getElementById("gender").value;

const res = await fetch("https://astro-api-vp6x.onrender.com/get_zodiac", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, birth, time, place, gender })
});


const characters = {
  aries: {
    male: { name: "炎舞武者（えんぶのもののふ）", img: "img/aries_m.jpg" },
    female: { name: "炎の童子（ほのおのどうじ）", img: "img/aries_f.jpg" }
  },
  // ... 他のキャラ省略（そのままでOK）
  pisces: {
    male: { name: "夢舟守（ゆめふねのもり）", img: "img/pisces_m.jpg" },
    female: { name: "夢海姫（ゆめうみひめ）", img: "img/pisces_f.jpg" }
  }
};

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const birth = document.getElementById("birthDate").value;
  const time = document.getElementById("birthTime").value;
  const place = document.getElementById("birthPlace").value;
  const gender = document.getElementById("gender").value;

  const res = await fetch("https://astro-api-yp6x.onrender.com/get_zodiac", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, birth, time, place, gender })
  });

  const data = await res.json();
  const venusSign = data["金星"].toLowerCase();
  const chara = characters[venusSign]?.[gender];

  if (!chara) {
    alert("キャラクターが見つかりませんでした。");
    return;
  }

  frontImg.src = chara.img;
  backImg.src = chara.img; // ※裏面も同じにしておく（必要なら変更可）
  resultName.textContent = `${chara.name}（${venusSign}）`;

  cardContainer.classList.remove("hidden");
  cardInner.classList.remove("spinIn");
  void cardInner.offsetWidth;
  cardInner.classList.add("spinIn");

  description.classList.add("hidden");
  detailButton.classList.remove("hidden");
});

detailButton.addEventListener("click", function () {
  const text = resultName.textContent;
  const sign = text.match(/（(.+?)）/)[1].toLowerCase();
  const gender = document.getElementById("gender").value;
  const chara = characters[sign][gender];
  description.textContent = chara.name + " の詳細説明（仮）";
  description.classList.remove("hidden");
  detailButton.classList.add("hidden");
});
