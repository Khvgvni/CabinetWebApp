body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  background: url("https://raw.githubusercontent.com/Khvgvni/CabinetWebApp/main/Background.png") no-repeat center center fixed;
  background-size: cover;
  color: #fff;
  text-align: center;
  padding-bottom: 88px; /* место под нижнее меню */
}

/* ---------- Прелоадер ---------- */
#preloader {
  position: fixed;
  inset: 0;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: opacity 1s ease;
}
#preloader .loader img {
  width: 150px;
  animation: pulse 2s infinite;
}
#preloader.hide { opacity: 0; pointer-events: none; }

@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.85; }
  100% { transform: scale(1); opacity: 1; }
}

/* ---------- Лого ---------- */
.logo-container { 
  margin: 48px 0 28px 0;
}
.logo { 
  width: 300px;
  max-width: 90vw;
}

/* ---------- Главные кнопки ---------- */
.main-buttons {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin: 0 24px 24px;
}
.glass-button,
.bottom-nav button {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.55);
  border-radius: 20px;
  color: #ffd700;
  font-weight: 800;
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: transform .2s ease, box-shadow .2s ease;
  box-shadow: 0 0 0 rgba(255, 215, 0, 0);
}
.glass-button {
  width: min(92vw, 520px);
  margin: 0 auto;
  padding: 16px 22px;
  font-size: 22px;
}
.glass-button:hover { transform: scale(1.03); box-shadow: 0 0 14px rgba(255,215,0,.55); }
.glass-button:active { transform: scale(.97); box-shadow: 0 0 8px rgba(255,215,0,.4); }

/* ---------- Нижнее меню ---------- */
.bottom-nav {
  position: fixed;
  left: 0; right: 0; bottom: 0;
  height: 88px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px calc(12px + env(safe-area-inset-bottom, 0px));
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(10px);
}
.bottom-nav button {
  flex: 1;
  min-width: 0;
  padding: 12px 0;
  font-size: 18px;
  border-radius: 16px;
}
.bottom-nav button:hover { transform: translateY(-1px); box-shadow: 0 0 12px rgba(255,215,0,.45); }
.bottom-nav button:active { transform: translateY(0); box-shadow: 0 0 6px rgba(255,215,0,.35); }

/* ---------- Модалки ---------- */
.modal {
  opacity: 0;
  visibility: hidden;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9998;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}
.modal.show {
  opacity: 1;
  visibility: visible;
}
.modal-content {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.5);
  border-radius: 20px;
  width: min(92vw, 520px);
  color: #fff;
  backdrop-filter: blur(15px);

  display: flex;
  flex-direction: column;
  max-height: 82vh;

  transform: translateY(40px);
  opacity: 0;
  transition: transform 0.35s ease, opacity 0.35s ease;
}
.modal.show .modal-content {
  transform: translateY(0);
  opacity: 1;
}
.modal-content h2 {
  color: #ffd700;
  margin: 18px 0 10px;
  font-size: 24px;
}
.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 0 20px 15px;
}
.modal-footer {
  padding: 15px;
  border-top: 1px solid rgba(255,215,0,0.3);
  background: rgba(0,0,0,0.3);
}
.modal-footer .glass-button { width: 100%; }

/* ---------- Поля форм ---------- */
input[type="text"], input[type="tel"], input[type="email"] {
  width: 100%;
  padding: 14px 16px;
  margin: 10px 0;
  border-radius: 12px;
  border: 1px solid rgba(255, 215, 0, 0.4);
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 16px;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
}
input[type="text"]:focus, 
input[type="tel"]:focus, 
input[type="email"]:focus {
  outline: none;
  border-color: #ffd700;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
}

/* ---------- Скролл ---------- */
.modal-body::-webkit-scrollbar { width: 6px; }
.modal-body::-webkit-scrollbar-thumb {
  background: rgba(255, 215, 0, 0.6);
  border-radius: 6px;
}
.menu-img {
  width: 100%;
  margin: 10px 0;
  border-radius: 10px;
}
