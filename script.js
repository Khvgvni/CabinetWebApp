// ========== Конфиг ==========
const API_BASE = "https://api.cabinetbot.cabinet75.ru"; // твой сервер
function adminToken() {
  return sessionStorage.getItem("adm_token") || "";
}

// ========== Управление модалками ==========
function openModal(id) {
  document.querySelectorAll(".modal").forEach(m => {
    m.style.display = "none";
    m.setAttribute("aria-hidden", "true");
  });
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");
  document.documentElement.style.overflow = "hidden";

  if (id === "cardModal") renderCard();
  if (id === "profileModal") loadProfile(); // Загружаем профиль при открытии
  if (id === "posterModal") loadPosters();  // 🔥 Загружаем афишу при открытии
  if (id === "cardModal") loadCards();  

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
  const anyOpen = Array.from(document.querySelectorAll(".modal"))
    .some(m => m.style.display === "flex");
  if (!anyOpen) document.documentElement.style.overflow = "";
}

// ========== Динамическое меню ==========
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
    img.loading = "lazy";
    container.appendChild(img);
  });
}

// ========== Пригласительный ==========
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

// ========== Отправка форм ==========
async function sendMessage(message) {
  try {
    const resp = await fetch(`${API_BASE}/api/cabinet/send`, {
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

// ========== Клубная карта ==========
async function renderCard() {
  const cardImg = document.getElementById("userCardImg");
  if (!cardImg) return;

  try {
    // получаем ID пользователя из Telegram WebApp
    const userId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;
    if (!userId) return;

    // запрос профиля
    const resp = await fetch(`${API_BASE}/api/user/status?id=${userId}`);
    const data = await resp.json();

    if (!data.ok || !data.user) {
      cardImg.src = "https://raw.githubusercontent.com/Khvgvni/CabinetWebApp/main/card.png"; // дефолтная карта
      return;
    }

    const status = (data.user.status || "Default").toLowerCase();
    let cardSrc = "https://raw.githubusercontent.com/Khvgvni/CabinetWebApp/main/card.png";

    if (status === "black") cardSrc = "https://raw.githubusercontent.com/Khvgvni/CabinetWebApp/main/card_black.png";
    if (status === "silver") cardSrc = "https://raw.githubusercontent.com/Khvgvni/CabinetWebApp/main/card_silver.png";
    if (status === "gold") cardSrc = "https://raw.githubusercontent.com/Khvgvni/CabinetWebApp/main/card_gold.png";

    cardImg.src = cardSrc;
  } catch (e) {
    console.error("Ошибка при загрузке клубной карты:", e);
    cardImg.src = "https://raw.githubusercontent.com/Khvgvni/CabinetWebApp/main/card.png"; // fallback
  }
}

// ========== Профиль ==========
async function loadProfile() {
  try {
    const tg = window.Telegram.WebApp;
    const userId = tg.initDataUnsafe?.user?.id;
    if (!userId) throw new Error("Не найден telegram_id");

    const res = await fetch(`${API_BASE}/api/user/status?id=${userId}`);
    const data = await res.json();

    if (data.ok && data.user) {
      const { name, phone, status } = data.user;

      document.getElementById("profileName").innerText = name || "-";
      document.getElementById("profilePhone").innerText = phone || "-";
      document.getElementById("profileStatus").innerText = status || "Default";

      // сохраняем статус в localStorage (для карт)
      localStorage.setItem("userCard", (status || "default").toLowerCase());
      renderCard();

    } else {
      document.getElementById("profileName").textContent = "—";
      document.getElementById("profilePhone").textContent = "—";
      document.getElementById("profileStatus").textContent = "Не зарегистрирован";
    }
  } catch (e) {
    console.error("Ошибка загрузки профиля:", e);
    document.getElementById("profileName").textContent = "—";
    document.getElementById("profilePhone").textContent = "—";
    document.getElementById("profileStatus").textContent = "Ошибка загрузки";
  }
}

// ========== Init ==========
window.addEventListener("DOMContentLoaded", () => {
  renderMenu();

  // Бронь стола
  const bookForm = document.getElementById("bookTableForm");
  if (bookForm) bookForm.addEventListener("submit", async e => {
    e.preventDefault();
    const name = document.getElementById("name")?.value || "";
    const phone = document.getElementById("phone")?.value || "";
    await sendMessage(`Бронь стола:\nФИО: ${name}\nТелефон: ${phone}`);
    alert("✅ Ваша заявка принята!");
    closeModal("bookTableModal");
  });

  // Такси
  const taxiForm = document.getElementById("taxiForm");
  if (taxiForm) taxiForm.addEventListener("submit", async e => {
    e.preventDefault();
    const name = document.getElementById("taxiName")?.value || "";
    const phone = document.getElementById("taxiPhone")?.value || "";
    const address = document.getElementById("taxiAddress")?.value || "";
    await sendMessage(`Такси:\nФИО: ${name}\nТелефон: ${phone}\nАдрес: ${address}`);
    alert("✅ Заявка на такси принята!");
    closeModal("taxiModal");
  });

  // Команда
  const teamForm = document.getElementById("joinTeamForm");
  if (teamForm) teamForm.addEventListener("submit", async e => {
    e.preventDefault();
    const name = document.getElementById("teamName")?.value || "";
    const phone = document.getElementById("teamPhone")?.value || "";
    const role = document.getElementById("teamRole")?.value || "";
    await sendMessage(`Заявка в команду:\nФИО: ${name}\nТелефон: ${phone}\nДолжность: ${role}`);
    alert("✅ Администратор свяжется с вами в течение недели!");
    closeModal("joinTeamModal");
  });

  // Инициализация Telegram Web App
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.ready();
    tg.expand();
  }
});

// ========== Прелоадер ==========
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

// ========== Админка ==========
function openTab(id) {
  document.querySelectorAll(".tab-content").forEach(el => el.style.display = "none");
  document.querySelectorAll(".tab-btn").forEach(el => el.classList.remove("active"));
  document.getElementById(id).style.display = "block";
  const activeBtn = document.querySelector(`.tab-btn[onclick="openTab('${id}')"]`);
  if (activeBtn) activeBtn.classList.add("active");
  
  if (id === "bannersTab") loadBanners();
  if (id === "usersTab") loadUsers();
}

// --- Логин админа ---
async function adminLogin() {
  const password = document.getElementById("adminPassword").value.trim();
  if (!password) return alert("Введите пароль");
  
  try {
    const resp = await fetch(`${API_BASE}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });
    const data = await resp.json();
    if (!data.ok) return alert(data.error || "Ошибка входа");
    
    sessionStorage.setItem("adm_token", data.token);
    document.getElementById("adminLogin").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    openTab('bannersTab');
  } catch (error) {
    alert("Ошибка сети: " + error.message);
  }
}

// --- Афиши ---
async function uploadBanner() {
  const fileInput = document.getElementById("bannerFile");
  const f = fileInput.files[0];
  if (!f) return alert("Выберите файл");
  
  const fd = new FormData();
  fd.append("image", f);
  
  try {
    const resp = await fetch(`${API_BASE}/api/admin/banners`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${adminToken()}` },
      body: fd
    });
    const data = await resp.json();
    if (!data.ok) return alert(data.error || "Ошибка загрузки");
    
    alert("Афиша загружена!");
    fileInput.value = ""; // Очищаем input
    loadBanners();
  } catch (error) {
    alert("Ошибка сети: " + error.message);
  }
}

async function loadBanners() {
  try {
    const resp = await fetch(`${API_BASE}/api/banners`);
    const data = await resp.json();
    const list = document.getElementById("bannersList");
    list.innerHTML = "";
    
    if (data.ok && data.items && data.items.length) {
      data.items.forEach(b => {
        const img = document.createElement("img");
        img.src = `${API_BASE}${b.image_url}`;
        img.className = "menu-img";
        img.loading = "lazy";
        list.appendChild(img);
      });
    } else {
      list.innerHTML = "<p>Нет афиш</p>";
    }
  } catch (error) {
    console.error("Ошибка загрузки афиш:", error);
    document.getElementById("bannersList").innerHTML = "<p>Ошибка загрузки</p>";
  }
}

// --- Пользователи ---
async function setUserStatus() {
  const name = document.getElementById("userName").value.trim();
  const phone = document.getElementById("userPhone").value.trim();
  const status = document.getElementById("userStatus").value;
  const telegram_id = prompt("Введите Telegram ID пользователя:");
  
  if (!telegram_id) return alert("Telegram ID обязателен");
  
  try {
    const resp = await fetch(`${API_BASE}/api/admin/user/status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${adminToken()}`
      },
      body: JSON.stringify({ name, phone, status, telegram_id })
    });
    const data = await resp.json();
    if (!data.ok) return alert(data.error || "Ошибка сохранения");
    
    alert("Статус сохранён!");
    document.getElementById("userName").value = "";
    document.getElementById("userPhone").value = "";
    loadUsers();
  } catch (error) {
    alert("Ошибка сети: " + error.message);
  }
}

async function loadUsers() {
  try {
    // ИСПРАВЛЕНО: правильный endpoint для получения пользователей
    const resp = await fetch(`${API_BASE}/api/admin/users`, {
      headers: { "Authorization": `Bearer ${adminToken()}` }
    });
    const data = await resp.json();
    const list = document.getElementById("usersList");
    list.innerHTML = "";
    
    if (data.ok && data.users && data.users.length) {
      data.users.forEach(u => {
        const card = document.createElement("div");
        card.className = "user-card";
        card.innerHTML = `
          <strong>${u.name || "Без имени"}</strong><br>
          Тел: ${u.phone || "—"}<br>
          ID: ${u.telegram_id}<br>
          Статус: ${u.status || "Default"}<br>
          <small>Зарегистрирован: ${new Date(u.created_at).toLocaleDateString()}</small>
        `;
        list.appendChild(card);
      });
    } else {
      list.innerHTML = "<p>Нет пользователей</p>";
    }
  } catch (error) {
    console.error("Ошибка загрузки пользователей:", error);
    document.getElementById("usersList").innerHTML = "<p>Ошибка загрузки</p>";
  }
}

// Загружаем афишу
async function loadPosters() {
  const container = document.getElementById("posterContainer");
  container.innerHTML = "Загрузка афиши...";

  try {
    const res = await fetch("https://api.cabinetbot.cabinet75.ru/api/banners");
    const data = await res.json();

    if (data.ok && data.items.length > 0) {
      container.innerHTML = "";
      data.items.forEach(banner => {
        const img = document.createElement("img");
        img.src = "https://api.cabinetbot.cabinet75.ru" + banner.image_url;
        img.style.width = "100%";
        img.style.borderRadius = "12px";
        img.style.marginBottom = "10px";
        container.appendChild(img);
      });
    } else {
      container.innerHTML = "<p>Афиша пока пуста 📌</p>";
    }
  } catch (e) {
    console.error("Ошибка загрузки афиши:", e);
    container.innerHTML = "<p>Ошибка загрузки афиши ❌</p>";
  }
}

// --- Рассылка ---
async function sendBroadcast() {
  const text = document.getElementById("broadcastText").value.trim();
  const status = document.getElementById("broadcastStatus").value;
  const phones = document.getElementById("broadcastPhones").value.trim();
  
  if (!text) return alert("Введите текст сообщения");
  
  try {
    const resp = await fetch(`${API_BASE}/api/admin/broadcast`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${adminToken()}`
      },
      body: JSON.stringify({ text, status: status || undefined, phones: phones || undefined })
    });
    const data = await resp.json();
    if (!data.ok) return alert(data.error || "Ошибка отправки");
    
    alert(`✅ Сообщение отправлено (${data.count || 0} получателей)`);
    document.getElementById("broadcastText").value = "";
    document.getElementById("broadcastStatus").value = "";
    document.getElementById("broadcastPhones").value = "";
  } catch (err) {
    alert("Ошибка сети при отправке рассылки: " + err.message);
  }
}

// Автоматическая проверка авторизации при открытии админки
document.getElementById('adminModal').addEventListener('click', function(e) {
  if (e.target === this) {
    const token = adminToken();
    if (token) {
      document.getElementById("adminLogin").style.display = "none";
      document.getElementById("adminPanel").style.display = "block";
    }
  }
});
