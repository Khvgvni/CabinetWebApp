// ---------- Управление модалками ----------
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");
  document.documentElement.style.overflow = "hidden"; // фикс скролла фона
  // спец-обработка для карты: всегда подгружаем картинку при открытии
  if (id === "cardModal") renderCard();
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
  document.documentElement.style.overflow = ""; // вернуть скролл
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
    const resp = await fetch("http://158.160.198.56:3000/api/cabinet/send", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "X-App-Secret": "superlong_random_secret_32chars" // тот же, что в .env
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
  if (taxiForm) bookForm?.addEventListener; // no-op safety
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
// fallback на случай, если событие load не сработало
setTimeout(() => {
  const preloader = document.getElementById("preloader");
  if (preloader && preloader.style.display !== "none") {
    preloader.classList.add("hide");
    preloader.setAttribute("aria-hidden", "true");
    setTimeout(() => preloader.remove(), 1000);
  }
}, 4000);

// ======= Админ-панель: базовый конфиг =======
const API_BASE = "http://158.160.198.56:3000"; // или твой домен https://mydomain.ru
function adminToken() { return sessionStorage.getItem("adm_token") || ""; }

// Вкладки
function openTab(id) {
  document.querySelectorAll(".tab-content").forEach(el => el.style.display = "none");
  document.querySelectorAll(".tab-btn").forEach(el => el.classList.remove("active"));
  document.getElementById(id).style.display = "block";
  document.querySelector(`.tab-btn[onclick="openTab('${id}')"]`).classList.add("active");
  if (id === "bannersTab") loadBanners();
  if (id === "postsTab") loadPosts();
  if (id === "usersTab") loadUsers();
}

// Логин админа
async function adminLogin() {
  const password = document.getElementById("adminPassword").value.trim();
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
  // по умолчанию откроем первую вкладку и подгрузим данные
  openTab('bannersTab');
}

// Афиши
async function uploadBanner() {
  const f = document.getElementById("bannerFile").files[0];
  if (!f) return alert("Выберите файл");
  const fd = new FormData(); fd.append("image", f);
  const resp = await fetch(`${API_BASE}/api/admin/banners`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${adminToken()}` },
    body: fd
  });
  const data = await resp.json();
  if (!data.ok) return alert(data.error || "Ошибка загрузки");
  alert("Афиша загружена!"); loadBanners();
}
async function loadBanners() {
  const resp = await fetch(`${API_BASE}/api/banners`);
  const data = await resp.json();
  const list = document.getElementById("bannersList");
  list.innerHTML = "";
  if (data.ok && data.items.length) {
    data.items.forEach(b => {
      const img = document.createElement("img");
      img.src = `${API_BASE}${b.image_url}`;
      list.appendChild(img);
    });
  } else list.innerHTML = "<p>Нет афиш</p>";
}

// Посты
async function createPost() {
  const title = document.getElementById("postTitle").value.trim();
  const body = document.getElementById("postBody").value.trim();
  const f = document.getElementById("postImage").files[0];
  if (!title) return alert("Введите заголовок");
  const fd = new FormData();
  fd.append("title", title); fd.append("body", body);
  if (f) fd.append("image", f);
  const resp = await fetch(`${API_BASE}/api/admin/posts`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${adminToken()}` },
    body: fd
  });
  const data = await resp.json();
  if (!data.ok) return alert(data.error || "Ошибка публикации");
  alert("Пост опубликован!"); loadPosts();
}
async function loadPosts() {
  const resp = await fetch(`${API_BASE}/api/posts`);
  const data = await resp.json();
  const list = document.getElementById("postsList");
  list.innerHTML = "";
  if (data.ok && data.items.length) {
    data.items.forEach(p => {
      const card = document.createElement("div");
      card.className = "post-card";
      card.innerHTML = `<h4>${p.title}</h4><p>${p.body || ""}</p>${p.image_url ? `<img src="${API_BASE}${p.image_url}" />` : ""}`;
      list.appendChild(card);
    });
  } else list.innerHTML = "<p>Нет постов</p>";
}

// Пользователи
async function setUserStatus() {
  const name = document.getElementById("userName").value.trim();
  const phone = document.getElementById("userPhone").value.trim();
  const status = document.getElementById("userStatus").value;
  if (!phone) return alert("Укажите телефон");
  const resp = await fetch(`${API_BASE}/api/admin/user/status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${adminToken()}`
    },
    body: JSON.stringify({ name, phone, status })
  });
  const data = await resp.json();
  if (!data.ok) return alert(data.error || "Ошибка сохранения");
  alert("Статус сохранён!"); loadUsers();
}
async function loadUsers() {
  const resp = await fetch(`${API_BASE}/api/users`, {
    headers: { "Authorization": `Bearer ${adminToken()}` }
  });
  const data = await resp.json();
  const list = document.getElementById("usersList");
  list.innerHTML = "";
  if (data.ok && data.items.length) {
    data.items.forEach(u => {
      const card = document.createElement("div");
      card.className = "user-card";
      card.innerHTML = `<strong>${u.name || "Без имени"}</strong><br>Тел: ${u.phone}<br>Статус: ${u.status}`;
      list.appendChild(card);
    });
  } else list.innerHTML = "<p>Нет пользователей</p>";
}
