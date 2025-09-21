const TOKEN = "8325375947:AAHaYMwHdR3FyvPGP1QhHFsim6ptcNCfAXc";
const CHAT_ID = "-1003014842866";

function openForm(type) {
  let formHtml = "";
  if (type === "table") {
    formHtml = `
      <h3>🍽 Забронировать стол</h3>
      <input id="name" placeholder="Ваше ФИО">
      <input id="phone" placeholder="Ваш телефон">
      <button class="submit-btn" onclick="sendData('table')">Отправить</button>
      <button class="close-btn" onclick="closeModal()">Закрыть</button>`;
  } else if (type === "team") {
    formHtml = `
      <h3>👥 Хочу в команду</h3>
      <input id="name" placeholder="Ваше ФИО">
      <input id="phone" placeholder="Ваш телефон">
      <input id="role" placeholder="Желаемая должность">
      <button class="submit-btn" onclick="sendData('team')">Отправить</button>
      <button class="close-btn" onclick="closeModal()">Закрыть</button>`;
  }
  document.getElementById("modal-content").innerHTML = formHtml;
  document.getElementById("modal").style.display = "block";
}

function showInvite() {
  document.getElementById("modal-content").innerHTML = `
    <h3>🎟 Ваш пригласительный</h3>
    <img src="https://raw.githubusercontent.com/Khvgvni/Cabinet/e2e130e2873786b32f8784ff7e039253e8a4fea3/Invitation-new.png">
    <button class="close-btn" onclick="closeModal()">Закрыть</button>`;
  document.getElementById("modal").style.display = "block";
}

function showTaxi() {
  const url = `https://3.redirect.appmetrica.yandex.com/route?end-lat=52.035807&end-lon=113.504328`;
  document.getElementById("modal-content").innerHTML = `
    <h3>🚕 Такси</h3>
    <img src="https://raw.githubusercontent.com/Khvgvni/Cabinet/68248242d6ba3a80bc1d2c5d86f4c003e4b18cfb/Road%20map.jpg">
    <a href="${url}" target="_blank"><button class="submit-btn">Вызвать такси</button></a>
    <button class="close-btn" onclick="closeModal()">Закрыть</button>`;
  document.getElementById("modal").style.display = "block";
}

function showMenu() {
  const images = [1,2,3,4,5,6,7].map(i => 
    `<img src="https://raw.githubusercontent.com/Khvgvni/Cabinet/4ac9ec06c1b492fc5c648cf1b56dc22531dd3d8d/menu${i}.png" style="margin:10px 0">`
  ).join("");
  document.getElementById("modal-content").innerHTML = `
    <h3>📖 Меню</h3>
    ${images}
    <button class="close-btn" onclick="closeModal()">Закрыть</button>`;
  document.getElementById("modal").style.display = "block";
}

async function sendData(type) {
  const name = document.getElementById('name')?.value || "";
  const phone = document.getElementById('phone')?.value || "";
  const role = document.getElementById('role')?.value || "";

  let text = "";
  if (type === "table") {
    text = `🍽 Новая бронь:\n👤 ${name}\n📞 ${phone}`;
  } else if (type === "team") {
    text = `👥 Новая заявка в команду:\n👤 ${name}\n📞 ${phone}\n💼 ${role}`;
  }

  const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text })
  });

  document.getElementById("modal-content").innerHTML = `
    <h3>✅ Заявка отправлена!</h3>
    <p>Администратор свяжется с вами в течение недели. Хорошего дня!</p>
    <button class="close-btn" onclick="closeModal()">Закрыть</button>`;
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}
