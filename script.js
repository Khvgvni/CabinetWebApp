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

  // спец-обработка
  if (id === "cardModal") renderCard();
  if (id === "profileModal") loadProfile(); // ✅ загрузка профиля

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
const API_BASE = "https://api.cabinetbot.cabinet75.ru";

async function loadProfile() {
  const phone = localStorage.getItem("userPhone"); // сохраняем телефон при первой регистрации
  if (!phone) {
    document.querySelector("#profileModal .modal-body").innerHTML = "<p>Нет данных. Зарегистрируйтесь через бота 📲</p>";
    return;
  }

  try {
    const resp = await fetch(`${API_BASE}/api/user/status?phone=${encodeURIComponent(phone)}`);
    const data = await resp.json();
    if (data.ok && data.user) {
      const u = data.user;
      document.querySelector("#profileModal .modal-body").innerHTML = `
        <p><b>ФИО:</b> ${u.name || "—"}</p>
        <p><b>Телефон:</b> ${u.phone || "—"}</p>
        <p><b>Email:</b> ${u.email || "—"}</p>
        <p><b>Статус:</b> ${u.status || "Default"}</p>
      `;
    } else {
      document.querySelector("#profileModal .modal-body").innerHTML = "<p>Данные не найдены.</p>";
    }
  } catch (e) {
    console.error("Profile error:", e);
    document.querySelector("#profileModal .modal-body").innerHTML = "<p>Ошибка загрузки профиля</p>";
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
    localStorage.setItem("userPhone", phone); // ✅ сохраняем телефон
    await sendMessage(`Бронь стола:\nФИО: ${name}\nТелефон: ${phone}`);
    alert("✅ Ваша заявка принята!");
    closeModal("bookTableModal");
  });

  const taxiForm = document.getElementById("taxiForm");
  if (taxiForm) taxiForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("taxiName")?.value || "";
    const phone = document.getElementById("taxiPhone")?.value || "";
    const address = document.getElementById("taxiAddress")?.value || "";
    localStorage.setItem("userPhone", phone);
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
    localStorage.setItem("userPhone", phone);
    await sendMessage(`Заявка в команду:\nФИО: ${name}\nТелефон: ${phone}\nДолжность: ${role}`);
    alert("✅ Администратор свяжется с вами!");
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
