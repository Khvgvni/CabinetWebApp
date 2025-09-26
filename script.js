// ---------- Управление модалками ----------
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;

  modal.classList.add("show");
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;

  modal.classList.remove("show");
}


// ---------- Динамическая генерация меню ----------
const menuImages = [
  "https://raw.githubusercontent.com/Khvgvni/CabinetWebApp/main/menu1.png",
  "https://raw.githubusercontent.com/Khvgvni/CabinetWebApp/main/menu2.png",
  "https://raw.githubusercontent.com/Khvgvni/CabinetWebApp/main/menu3.png",
  "https://raw.githubusercontent.com/Khvgvni/CabinetWebApp/main/menu4.png",
  "https://raw.githubusercontent.com/Khvgvni/CabinetWebApp/main/menu5.png",
  "https://raw.githubusercontent.com/Khvgvni/CabinetWebApp/main/menu6.png",
  "https://raw.githubusercontent.com/Khvgvni/CabinetWebApp/main/menu7.png"
];

function renderMenu() {
  const container = document.getElementById("menuContainer");
  if (!container) return;

  container.innerHTML = "";

  menuImages.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.className = "menu-img";
    container.appendChild(img);
  });

  // Кнопка "Назад"
  const backBtn = document.createElement("button");
  backBtn.className = "glass-button";
  backBtn.innerText = "⬅️ Назад";
  backBtn.onclick = () => closeModal("menuModal");
  container.appendChild(backBtn);
}

document.addEventListener("DOMContentLoaded", renderMenu);

// ---------- Отправка форм ----------
async function sendMessage(message) {
  const BOT_TOKEN = "8325375947:AAHaYMwHdR3FyvPGP1QhHFsim6ptcNCfAXc"; // замени при необходимости
  const CHAT_ID = "-1003014842866";

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
      parse_mode: "HTML"
    })
  });
}

// 🍽️ Забронировать стол
document.getElementById("bookTableForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;

  const msg = `🍽️ Бронь стола:\nФИО: ${name}\nТелефон: ${phone}`;
  await sendMessage(msg);

  alert("✅ Ваша заявка принята! В ближайшее время администратор свяжется с Вами! Хорошего дня! ☀️");
  closeModal("bookTableModal");
});

// 🚕 Такси
document.getElementById("taxiForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("taxiName").value;
  const phone = document.getElementById("taxiPhone").value;
  const address = document.getElementById("taxiAddress").value;

  const msg = `🚕 Заявка на такси:\nФИО: ${name}\nТелефон: ${phone}\nАдрес: ${address}`;
  await sendMessage(msg);

  alert("✅ Ваша заявка на такси принята! В ближайшее время администратор свяжется с Вами 🚕");
  closeModal("taxiModal");
});

// 👥 Хочу в команду
document.getElementById("joinTeamForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("teamName").value;
  const phone = document.getElementById("teamPhone").value;
  const role = document.getElementById("teamRole").value;

  const msg = `👥 Новая заявка в команду:\nФИО: ${name}\nТелефон: ${phone}\nЖелаемая должность: ${role}`;
  await sendMessage(msg);

  alert("✅ В течение недели администратор свяжется с вами! Хорошего дня! ☀️");
  closeModal("joinTeamModal");
});
