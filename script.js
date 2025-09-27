// ---------- Управление модалками ----------
function openModal(id) {
  const modal = document.getElementById(id);
  modal.style.display = "flex";
  modal.classList.remove("animate"); // сброс анимации
  void modal.offsetWidth; // хак: перезапуск анимации
  modal.classList.add("animate");
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
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
  container.innerHTML = "";
  menuImages.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.className = "menu-img";
    container.appendChild(img);
  });
}
document.addEventListener("DOMContentLoaded", renderMenu);

// ---------- Пригласительный ----------
function openInvitation() {
  const container = document.getElementById("invitationContainer");
  container.innerHTML = ""; // очищаем, чтобы каждый раз загружалось заново
  const img = document.createElement("img");
  img.src = "https://raw.githubusercontent.com/Khvgvni/CabinetWebApp/main/Invitation-new.png";
  img.className = "menu-img";
  container.appendChild(img);
  document.getElementById("invitationModal").style.display = "flex";
}

// ---------- Отправка форм ----------
async function sendMessage(message) {
  const BOT_TOKEN = "8259299108:AAEGFbhRHAd0Zjy4yX6z2MA27QnoZas0LvI";   // замени на свой
  const CHAT_ID = "-1003014842866";   // замени на свой

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: "HTML" })
  });
}

// 🍽️ Забронировать стол
document.getElementById("bookTableForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  await sendMessage(`Бронь стола:\nФИО: ${name}\nТелефон: ${phone}`);
  alert("✅ Ваша заявка принята! Администратор скоро свяжется с вами.");
  closeModal("bookTableModal");
});

// 🚕 Такси
document.getElementById("taxiForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("taxiName").value;
  const phone = document.getElementById("taxiPhone").value;
  const address = document.getElementById("taxiAddress").value;
  await sendMessage(`Такси:\nФИО: ${name}\nТелефон: ${phone}\nАдрес: ${address}`);
  alert("✅ Заявка на такси принята!");
  closeModal("taxiModal");
});

// 👥 Команда
document.getElementById("joinTeamForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("teamName").value;
  const phone = document.getElementById("teamPhone").value;
  const role = document.getElementById("teamRole").value;
  await sendMessage(`Заявка в команду:\nФИО: ${name}\nТелефон: ${phone}\nДолжность: ${role}`);
  alert("✅ Администратор свяжется с вами в течение недели!");
  closeModal("joinTeamModal");
});

// ---------- Клубная карта ----------
function renderCard() {
  const cardImg = document.getElementById("userCardImg");
  const userCard = localStorage.getItem("userCard") || "default";

  let cardSrc = "https://raw.githubusercontent.com/Khvgvni/CabinetWebApp/main/card.png";
  if (userCard === "black") cardSrc = "https://raw.githubusercontent.com/Khvgvni/CabinetWebApp/main/card_black.png";
  if (userCard === "silver") cardSrc = "https://raw.githubusercontent.com/Khvgvni/CabinetWebApp/main/card_silver.png";
  if (userCard === "gold") cardSrc = "https://raw.githubusercontent.com/Khvgvni/CabinetWebApp/main/card_gold.png";

  cardImg.src = cardSrc;
}
function setUserCard(type) {
  if (["black","silver","gold"].includes(type)) {
    localStorage.setItem("userCard", type);
  } else {
    localStorage.setItem("userCard", "default");
  }
  renderCard();
}
document.querySelector("[onclick=\"openModal('cardModal')\"]").addEventListener("click", renderCard);

// ---------- Прелоадер ----------
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.classList.add("hide");
    setTimeout(() => preloader.style.display = "none", 1000);
  }, 2000); // задержка 2 сек
});
// fallback: убираем через 4 сек даже если load не сработал
setTimeout(() => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.classList.add("hide");
    setTimeout(() => preloader.remove(), 1000);
  }
}, 4000);
