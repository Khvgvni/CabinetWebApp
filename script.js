function openModal(id) {
  document.getElementById(id).style.display = "block";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

function openInvite() {
  window.open("https://raw.githubusercontent.com/Khvgvni/Cabinet/e2e130e2873786b32f8784ff7e039253e8a4fea3/Invitation-new.png", "_blank");
}

function openMenu() {
  window.open("https://github.com/Khvgvni/Cabinet", "_blank");
}

// 📌 Настройки
const BOT_TOKEN = "8325375947:AAHaYMwHdR3FyvPGP1QhHFsim6ptcNCfAXc";
const CHAT_ID = "-1003014842866";

// 🍽 Бронирование стола
document.getElementById("bookTableForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;

  const message = `🍽 Новая бронь!\n\n👤 ${name}\n📞 ${phone}`;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message
    })
  });

  document.getElementById("bookTableForm").reset();
  alert("✅ Ваша заявка принята!\nВ ближайшее время администратор свяжется с Вами!\nХорошего дня! ☀️");
  closeModal("bookTableModal");
});

// 👥 Хочу в команду
document.getElementById("joinTeamForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("teamName").value;
  const phone = document.getElementById("teamPhone").value;
  const role = document.getElementById("teamRole").value;

  const message = `👥 Новая заявка в команду!\n\n👤 ${name}\n📞 ${phone}\n💼 Должность: ${role}`;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message
    })
  });

  document.getElementById("joinTeamForm").reset();
  alert("✅ Администратор свяжется с вами в течение недели!\nХорошего вам дня 🌸");
  closeModal("joinTeamModal");
});
