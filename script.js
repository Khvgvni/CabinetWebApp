// 📌 Настройки
const BOT_TOKEN = "8325375947:AAHaYMwHdR3FyvPGP1QhHFsim6ptcNCfAXc";
const CHAT_ID = "-1003014842866";

function openModal(id) {
  document.getElementById(id).style.display = "flex";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

window.onload = () => {
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

    const message = `👥 Новая заявка в команду!\n\n👤 ${name}\n📞 ${phone}`;

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message
      })
    });

    document.getElementById("joinTeamForm").reset();
    alert("✅ В течение недели администратор свяжется с Вами!\nХорошего дня! ☀️");
    closeModal("joinTeamModal");
  });

  // 🔍 Увеличение картинок меню
  document.querySelectorAll('.menu-images img').forEach(img => {
    img.addEventListener('click', () => {
      document.getElementById('zoomedImage').src = img.src;
      openModal('imageModal');
    });
  });

  // Закрытие увеличенной картинки по клику
  document.getElementById('imageModal').addEventListener('click', () => {
    closeModal('imageModal');
  });
};
