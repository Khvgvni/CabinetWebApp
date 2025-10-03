// ---------- Управление модалками ----------
function openModal(id) {
  // Закрываем все открытые модалки перед открытием новой
  document.querySelectorAll(".modal").forEach(m => {
    m.style.display = "none";
    m.setAttribute("aria-hidden", "true");
  });

  const modal = document.getElementById(id);
  if (!modal) return;

  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");
  document.documentElement.style.overflow = "hidden"; // фикс скролла фона

  // спец-обработка для карты
  if (id === "cardModal") renderCard();

  // спец-обработка для профиля
  if (id === "profileModal") loadProfile();

  // перезапуск анимации
  modal.classList.remove("animate");
  void modal.offsetWidth;
  modal.classList.add("animate");
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  }

  // Если все модалки закрыты — вернуть скролл
  const anyOpen = Array.from(document.querySelectorAll(".modal"))
    .some(m => m.style.display === "flex");
  if (!anyOpen) {
    document.documentElement.style.overflow = "";
  }
}

// ---------- Динамическая генерация меню ----------
const menuImages = [
  "https://raw.githubusercontent.com/Khvgvni/CabinetWebApp/main/menu1.png",
  "https://raw.githubusercontent.com/Khvgvni/CabinetWebApp/main/menu2.png",
  "https://raw.githubusercontent.com/Khvgvni/CabinetWebApp/main/menu3.png",
  "https://raw.githubusercontent.com/Khvgvni/CabinetWebApp/main/menu4.png",
  "https://raw.githubusercontent.com/Khvgvni/CabinetWebApp/main/menu5.png",
  "https://raw.githubusercontent.com/Khvgvni/CabinetWebApp/main/menu6.png",
  "https://raw.githubusercontent.com/Khvgvni/CabinetWebApp/main/menu7.png",
  "https://raw.githubusercontent.com/Khvgvni/CabinetWebApp/main/menu8.png"
];

function renderMenu() {
  const container = document.getElementById("menuContainer");
  if (!container) return;
  container.innerHTML = "";
  menuImages.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.className = "menu-img";
    img.loading = "lazy";
    container.appendChild(img);
  });
}

// ---------- Пригласительный ----------
function openInvitation() {
  const container = document.getElementById("invitationContainer");
  if (container) {
    container.innerHTML = "";
    const img = document.createElement("img");
    img.src = "https://raw.githubusercontent.com/Khvgvni/CabinetWebApp/main/Invitation-new.png";
    img.className = "menu-img";
    img.loading = "lazy";
    container.appendChild(img);
  }
  openModal("invitationModal");
}

// ---------- Отправка форм ----------
async function sendMessage(message) {
  try {
    const resp = await fetch("https://api.cabinetbot.cabinet75.ru/api/cabinet/send", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "X-App-Secret": "superlong_random_secret_32chars"
      },
      body: JSON.stringify({ text: message })
    });
    if (!resp.ok) console.warn("Proxy status:", resp.status);
  } catch (err) {
    console.warn("Proxy error:", err);
  }
}

// ---------- Клубная карта ----------
function renderCard() {
  const cardImg = document.getElementById("userCardImg");
  if (!cardImg) return;

  const userCard = localStorage.getItem("userCard") || "default";
  let cardSrc = "https://raw.githubusercontent.com/Khvgvni/CabinetWebApp/main/card.png";
  if (userCard === "black")  cardSrc = "https://raw.githubusercontent.com/Khvgvni/CabinetWebApp/main/card_black.png";
  if (userCard === "silver") cardSrc = "https://raw.githubusercontent.com/Khvgvni/CabinetWebApp/main/card_silver.png";
  if (userCard === "gold")   cardSrc = "https://raw.githubusercontent.com/Khvgvni/CabinetWebApp/main/card_gold.png";
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

// ---------- Профиль ----------
async function loadProfile() {
  const tg = window.Telegram?.WebApp;
  const userId = tg?.initDataUnsafe?.user?.id;

  if (!userId) {
    document.querySelector("#profileModal .modal-body").innerHTML = `<p>Не удалось определить пользователя через Telegram</p>`;
    return;
  }

  try {
    const resp = await fetch(`${API_BASE}/api/user/status?id=${userId}`);
    const data = await resp.json();

    if (data.ok && data.user) {
      document.querySelector("#profileModal .modal-body").innerHTML = `
        <p><b>ФИО:</b> ${data.user.name || "—"}</p>
        <p><b>Телефон:</b> ${data.user.phone || "—"}</p>
        <p><b>Статус:</b> ${data.user.status || "Default"}</p>
      `;
    } else {
      document.querySelector("#profileModal .modal-body").innerHTML = `<p>Нет данных, зарегистрируйтесь в боте.</p>`;
    }
  } catch (e) {
    console.error("Ошибка загрузки профиля:", e);
    document.querySelector("#profileModal .modal-body").innerHTML = `<p>Ошибка загрузки профиля</p>`;
  }
}

// ---------- Инициализация ----------
window.addEventListener("DOMContentLoaded", () => {
  renderMenu();

  const bookForm = document.getElementById("bookTableForm");
  if (bookForm) bookForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name")?.value || "";
    const phone = document.getElementById("phone")?.value || "";
    await sendMessage(`Бронь стола:\nФИО: ${name}\nТелефон: ${phone}`);
    alert("✅ Ваша заявка принята! Администратор скоро свяжется с вами.");
    closeModal("bookTableModal");
  });

  const taxiForm = document.getElementById("taxiForm");
  if (taxiForm) taxiForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("taxiName")?.value || "";
    const phone = document.getElementById("taxiPhone")?.value || "";
    const address = document.getElementById("taxiAddress")?.value || "";
    await sendMessage(`Такси:\nФИО: ${name}\nТелефон: ${phone}\nАдрес: ${address}`);
    alert("✅ Заявка на такси принята!");
    closeModal("taxiModal");
  });

  const teamForm = document.getElementById("joinTeamForm");
  if (teamForm) teamForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("teamName")?.value || "";
    const phone = document.getElementById("teamPhone")?.value || "";
    const role = document.getElementById("teamRole")?.value || "";
    await sendMessage(`Заявка в команду:\nФИО: ${name}\nТелефон: ${phone}\nДолжность: ${role}`);
    alert("✅ Администратор свяжется с вами в течение недели!");
    closeModal("joinTeamModal");
  });
});

// ---------- Прелоадер ----------
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;
  setTimeout(() => {
    preloader.classList.add("hide");
    preloader.setAttribute("aria-hidden", "true");
    setTimeout(() => (preloader.style.display = "none"), 1000);
  }, 1500);
});
setTimeout(() => {
  const preloader = document.getElementById("preloader");
  if (preloader && preloader.style.display !== "none") {
    preloader.classList.add("hide");
    preloader.setAttribute("aria-hidden", "true");
    setTimeout(() => preloader.remove(), 1000);
  }
}, 4000);

// ---------- Привязка загрузки профиля ----------
document.querySelector(".nav-btn[onclick=\"openModal('profileModal')\"]")
  ?.addEventListener("click", () => {
    loadProfile();
    openModal('profileModal');
  });

// ======= Админ-панель: базовый конфиг =======
const API_BASE = "https://api.cabinetbot.cabinet75.ru";
function adminToken() { return sessionStorage.getItem("adm_token") || ""; }
