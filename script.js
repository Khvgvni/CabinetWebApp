/* ====== Theme / Variables ====== */
:root{
  --bg: radial-gradient(1200px 800px at 20% 0%, #122d1f 0%, #0f1a1a 35%, #0a0a0a 100%);
  --glass-bg: rgba(255,255,255,0.06);
  --glass-border: rgba(255,255,255,0.16);
  --text: #ecf4ee;
  --muted: #b6c6bc;
  --accent: #4CAF50;
  --accent-2: #A5D6A7;
  --danger: #ff5c5c;
  --shadow: 0 10px 30px rgba(0,0,0,.35);
  --radius: 18px;
}

/* ====== Base ====== */
*{ box-sizing: border-box; }
html, body{ height: 100%; }
body{
  margin: 0;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Inter, sans-serif;
  color: var(--text);
  background: var(--bg);
  background-attachment: fixed;
}

img{ display:block; max-width:100%; }

/* ====== Preloader ====== */
#preloader{
  position: fixed; inset: 0; z-index: 1000;
  display:flex; align-items:center; justify-content:center;
  background: rgba(0,0,0,.6);
  backdrop-filter: blur(6px);
  transition: opacity .6s ease, visibility .6s ease;
}
#preloader.hide{ opacity:0; visibility:hidden; }
#preloader .loader{
  display:flex; flex-direction:column; gap:12px; align-items:center;
  padding: 20px 24px;
  border-radius: 20px;
  background: var(--glass-bg);
  border:1px solid var(--glass-border);
  box-shadow: var(--shadow);
}
#preloader img{ width: 88px; height:auto; }

/* ====== Logo ====== */
.logo-container{ display:flex; justify-content:center; padding: 28px 16px 8px; }
.logo{ width: 120px; opacity:.95; filter: drop-shadow(0 6px 28px rgba(0,0,0,.35)); }

/* ====== Main Buttons Grid ====== */
.main-buttons{
  display:grid;
  grid-template-columns: repeat(2, minmax(0,1fr));
  gap: 12px;
  padding: 8px 16px 96px; /* отступ под нижнюю навигацию */
}
@media (min-width: 768px){
  .main-buttons{ grid-template-columns: repeat(3, minmax(0,1fr)); max-width: 900px; margin: 0 auto; }
}

/* ====== Glass Button ====== */
.glass-button{
  display:inline-flex; align-items:center; justify-content:center;
  gap:10px; width:100%;
  appearance:none; border:none; outline:none; cursor:pointer;
  padding: 14px 16px; min-height: 48px; border-radius: var(--radius);
  background: linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06));
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  color: var(--text); font-weight: 700; font-size: 16px; letter-spacing: .2px;
  box-shadow: var(--shadow);
  transition: transform .12s ease, box-shadow .2s ease, background .2s ease;
}
.glass-button:hover{ transform: translateY(-1px); }
.glass-button:active{ transform: translateY(0); box-shadow: 0 4px 14px rgba(0,0,0,.25); }
.glass-button.primary{ background: linear-gradient(180deg, rgba(76,175,80,.25), rgba(76,175,80,.12)); border-color: rgba(165,214,167,.35); }
.glass-button.full{ width:100%; }

/* ====== Bottom Nav ====== */
.bottom-nav{
  position: fixed; left:0; right:0; bottom:0; z-index: 500;
  display:grid; grid-template-columns: repeat(4, 1fr);
  gap:8px; padding: 10px 12px calc(10px + env(safe-area-inset-bottom));
  background: linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,.35) 40%);
  backdrop-filter: blur(10px);
}
.nav-btn{
  appearance:none; border:none; outline:none; cursor:pointer;
  border-radius: 14px; padding: 12px 10px; min-height: 44px;
  color: var(--text);
  background: rgba(255,255,255,.06);
  border: 1px solid var(--glass-border);
  font-weight: 700;
}

/* ====== Modal ====== */
.modal{
  position: fixed; inset:0; display:none; align-items:center; justify-content:center;
  padding: 18px; z-index: 900;
  background: radial-gradient(900px 600px at 50% 100%, rgba(0,0,0,.55), rgba(0,0,0,.75));
  backdrop-filter: blur(4px);
}
.modal .modal-content{
  width: min(700px, 100%);
  max-height: min(88vh, 900px);
  display:flex; flex-direction:column;
  gap: 14px; padding: 18px;
  border-radius: 22px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow);
  animation: popup .22s ease;
}
.modal h2{ margin:0; font-size: 20px; font-weight: 800; letter-spacing:.3px; }
.modal .modal-body{
  overflow: auto; padding: 2px;
  border-radius: 14px;
}
.modal .modal-footer{
  display:flex; gap: 10px;
}
.modal .modal-footer.sticky{
  position: sticky; bottom: -18px; /* приклеиваем футер внизу контента */
  padding-top: 6px;
  background: linear-gradient(180deg, transparent, rgba(0,0,0,.15) 40%);
}

/* Анимация появления */
@keyframes popup{
  from{ transform: translateY(6px) scale(.98); opacity: 0; }
  to{ transform: translateY(0) scale(1); opacity: 1; }
}

/* ====== Forms ====== */
.form{ display:flex; flex-direction:column; gap:12px; }
input, select, textarea{
  width: 100%; padding: 14px 16px; min-height: 48px;
  border-radius: var(--radius);
  background: rgba(255,255,255,.06);
  backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
  border: 1px solid var(--glass-border);
  color: var(--text); font-size:16px;
}
input::placeholder, textarea::placeholder{ color: var(--muted); }
textarea{ resize: vertical; min-height: 112px; }

/* ====== Images / Menu ====== */
#menuContainer{ display:grid; gap:12px; }
.menu-img{
  width: 100%; border-radius: 16px; margin: 0;
  border: 1px solid rgba(255,255,255,.12);
  background: rgba(255,255,255,.04);
}

/* Responsive */
@media (min-width: 768px){
  .menu-img{ border-radius: 18px; }
}
