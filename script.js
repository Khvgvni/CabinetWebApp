function openModal(id) {
  document.getElementById(id).style.display = "flex";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

const BOT_TOKEN = "8325375947:AAHaYMwHdR3FyvPGP1QhHFsim6ptcNCfAXc";
const CHAT_ID = "-1003014842866";

// === Забронировать стол ===
document.getElementById('bookTableForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;

  const message = `🍽️ Бронирование стола:\nФИО: ${name}\nТелефон: ${phone}`;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text: message })
  });

  alert("✅ Ваша заявка принята! В ближайшее время администратор свяжется с Вами! Хорошего дня! ☀️");
  closeModal('bookTableModal');
});

// === Такси ===
document.getElementById('taxiForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('taxiName').value;
  const phone = document.getElementById('taxiPhone').value;
  const address = document.getElementById('taxiAddress').value;

  const message = `🚕 Заявка на такси:\nФИО: ${name}\nТелефон: ${phone}\nАдрес: ${address}`;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text: message })
  });

  alert("✅ Ваша заявка на такси принята! В ближайшее время администратор свяжется с вами 🚕");
  closeModal('taxiModal');
});

// === Хочу в команду ===
document.getElementById('joinTeamForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('teamName').value;
  const phone = document.getElementById('teamPhone').value;
  const role = document.getElementById('teamRole').value;

  const message = `👥 Заявка в команду:\nФИО: ${name}\nТелефон: ${phone}\nДолжность: ${role}`;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text: message })
  });

  alert("✅ В течение недели администратор свяжется с Вами! Хорошего дня! ☀️");
  closeModal('joinTeamModal');
});
