/**
 * VETO ONLINE — Student Portal JavaScript
 * EYC Academy | Mr. Ezz
 * Handles: Auth, Profile, Levels/Sessions, Activity iFrame, Services
 */

// ─── CONFIG ─────────────────────────────────────────────────
const CONFIG = {
  GAS_URL: "https://script.google.com/macros/s/AKfycbz2RO713Lq-vq-eMBRCV7cIzHR9GGWyKD6idr4nGK2BC33GYie57ljJM6o_h-LpgA2aBQ/exec",
  DATA_PATH: "data/VetoOnline/",
  ACTIROBO_PATH: "data/Actirobo/",
  LOGO: "logo.png",
  ACADEMY: "EYC Academy",
  PROGRAM: "Veto Online",
  TEACHER: "Mr. Ezz",
  GAME_URL: "game-portal/index.html",
  CLASS_DAY: "Saturday",
  CLASS_TIME: "10:00 AM – 12:00 PM",
  STORAGE_KEY: "vetoOnlineUser"
};

// ─── STATE ──────────────────────────────────────────────────
let currentUser = null;
let pendingAction = null;

// ─── DOM REFS ────────────────────────────────────────────────
const loginOverlay  = document.getElementById("loginOverlay");
const loginMsg      = document.getElementById("loginMsg");
const loginTabLogin = document.getElementById("tabLogin");
const formLogin     = document.getElementById("formLogin");
const toast         = document.getElementById("toast");

// ─── INIT ────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  loadLogo();
  tryAutoLogin();
  buildLevels();
  bindNav();
});

function loadLogo() {
  document.querySelectorAll(".logo-img").forEach(img => {
    img.src = CONFIG.LOGO;
    img.onerror = () => { img.style.display = "none"; };
  });
}

// ─── AUTO-LOGIN from localStorage ────────────────────────────
function tryAutoLogin() {
  const stored = localStorage.getItem(CONFIG.STORAGE_KEY);
  if (stored) {
    try {
      currentUser = JSON.parse(stored);
      renderProfile(currentUser);
      hideLogin();
    } catch(e) {
      localStorage.removeItem(CONFIG.STORAGE_KEY);
    }
  }
}

// ─── LOGIN / AUTH ────────────────────────────────────────────
function showLogin(reason) {
  pendingAction = reason || null;
  loginOverlay.classList.remove("hidden");
}
function hideLogin() {
  loginOverlay.classList.add("hidden");
}

// Login submit
document.getElementById("btnLogin").addEventListener("click", async () => {
  const email    = document.getElementById("loginEmail").value.trim().toLowerCase();
  const passcode = document.getElementById("loginCode").value.trim();
  if (!email || !passcode) return showMsg("Please fill in all fields.", "error");

  showMsg("Authenticating...", "");
  try {
    const res = await fetch(`${CONFIG.GAS_URL}?action=login&email=${encodeURIComponent(email)}&code=${encodeURIComponent(passcode)}`);
    const data = await res.json();
    if (data.status === "success") {
      currentUser = data.profile;
      localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(currentUser));
      renderProfile(currentUser);
      hideLogin();
      showToast("Welcome back, " + currentUser.name + "! 🎯");
      if (pendingAction) executePendingAction();
    } else {
      showMsg(data.message || "Authentication failed.", "error");
    }
  } catch(e) {
    showMsg("Connection error. Check network.", "error");
  }
});

// Forgot passcode
document.getElementById("forgotLink").addEventListener("click", () => {
  showMsg("Contact Mr. Ezz or your academy admin to reset your passcode.", "success");
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  currentUser = null;
  localStorage.removeItem(CONFIG.STORAGE_KEY);
  clearProfile();
  showView("levels");
  showToast("Logged out successfully.");
});

// Close login by backdrop click
loginOverlay.addEventListener("click", (e) => {
  if (e.target === loginOverlay) hideLogin();
});

function showMsg(msg, type) {
  loginMsg.textContent = msg;
  loginMsg.className = "login-msg " + (type === "error" ? "error" : type === "success" ? "success" : "");
  loginMsg.style.display = msg ? "block" : "none";
}
function clearMsg() { loginMsg.style.display = "none"; loginMsg.textContent = ""; }

// ─── PROFILE RENDER ──────────────────────────────────────────
function renderProfile(user) {
  if (!user) return;
  setEl("profileName",    user.name    || "—");
  setEl("profileProgram", CONFIG.PROGRAM);
  setEl("profileTokens",  user.tokens  ?? "0");
  setEl("profileStars",   user.stars   ?? "0");
  setEl("profileRank",    user.globalRank ?? "—");
  setEl("profileCodeOnline",  user.code    || "—");
  setEl("profileCodeOffline", user.offlineCode || "—");

  const avatar = document.getElementById("profileAvatar");
  if (avatar && user.avatar) {
    avatar.src = user.avatar;
    avatar.onerror = () => { avatar.src = "assets/default-avatar.png"; };
  }
}
function clearProfile() {
  ["profileName","profileProgram","profileTokens","profileStars","profileRank",
   "profileCodeOnline","profileCodeOffline"].forEach(id => setEl(id, "—"));
}
function setEl(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

// ─── VIEW SWITCHER ───────────────────────────────────────────
// Shows either the levels list OR the session content panel
function showView(view) {
  const levelsView  = document.getElementById("levelsView");
  const sessionView = document.getElementById("sessionView");
  if (view === "levels") {
    levelsView.style.display  = "flex";
    sessionView.style.display = "none";
    // clear active session button
    document.querySelectorAll(".session-btn.active").forEach(b => b.classList.remove("active"));
  } else {
    levelsView.style.display  = "none";
    sessionView.style.display = "block";
  }
}

// ─── BUILD LEVELS ────────────────────────────────────────────
const LEVEL_NAMES = [
  "", "Foundation","Elementary","Pre-Intermediate","Intermediate 1",
  "Intermediate 2","Upper-Intermediate 1","Upper-Intermediate 2",
  "Advanced 1","Advanced 2","Advanced 3","Expert 1","Expert 2 — Graduation"
];

function buildLevels() {
  const container = document.getElementById("levelsContainer");
  if (!container) return;

  for (let lvl = 1; lvl <= 12; lvl++) {
    const group = document.createElement("div");
    group.className = "level-group";
    group.id = `level-${lvl}`;

    const sessions = [1,2,3,4].map(s => `
      <div class="session-btn" id="sess-${lvl}-${s}" data-lvl="${lvl}" data-sess="${s}">
        <div class="session-num">${s}</div>
        <div class="session-label">Session</div>
      </div>
    `).join("");

    group.innerHTML = `
      <div class="level-header" onclick="toggleLevel(${lvl})">
        <div class="level-title">
          <div class="level-num">${lvl}</div>
          <div>
            <div class="level-name">Level ${lvl}</div>
            <div class="level-sub">${LEVEL_NAMES[lvl]}</div>
          </div>
        </div>
        <div class="level-chevron">▾</div>
      </div>
      <div class="sessions-grid">${sessions}</div>
    `;
    container.appendChild(group);
  }

  // Bind session clicks
  container.addEventListener("click", e => {
    const btn = e.target.closest(".session-btn");
    if (!btn) return;
    const lvl  = parseInt(btn.dataset.lvl);
    const sess = parseInt(btn.dataset.sess);
    handleSessionClick(lvl, sess, btn);
  });
}

function toggleLevel(lvl) {
  const group = document.getElementById(`level-${lvl}`);
  if (group) group.classList.toggle("open");
}

// ─── SESSION CLICK → REQUIRE AUTH ────────────────────────────
function handleSessionClick(lvl, sess, btn) {
  if (!currentUser) {
    pendingAction = { type: "session", lvl, sess };
    showLogin("session");
    return;
  }
  openSession(lvl, sess, btn);
}

function executePendingAction() {
  if (!pendingAction) return;
  if (pendingAction.type === "session") {
    const btn = document.getElementById(`sess-${pendingAction.lvl}-${pendingAction.sess}`);
    openSession(pendingAction.lvl, pendingAction.sess, btn);
  } else if (pendingAction.type === "cv") {
    openCVBuilder();
  }
  pendingAction = null;
}

// ─── OPEN SESSION → REPLACE LEVELS VIEW WITH SESSION CONTENT ──
function openSession(lvl, sess, btn) {
  // Highlight active btn
  document.querySelectorAll(".session-btn.active").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");

  const key        = `${lvl}-${sess}`;
  const activities = (typeof sessionData !== "undefined" && sessionData[key]) || [];

  // Update session view header
  const sessTitle = document.getElementById("sessionTitle");
  const sessSubtitle = document.getElementById("sessionSubtitle");
  if (sessTitle) sessTitle.textContent = `LEVEL ${lvl}  ·  SESSION ${sess}`;
  if (sessSubtitle) sessSubtitle.textContent = LEVEL_NAMES[lvl] || "";

  const list = document.getElementById("sessionActivityList");
  list.innerHTML = "";

  if (activities.length === 0) {
    list.innerHTML = `<div class="no-content">No content found for this session.</div>`;
  } else {
    activities.forEach(name => {
      const isTest    = name.toLowerCase().includes("test");
      const filename  = getActivityFilename(lvl, sess, name);
      const { icon, iconClass } = getActivityIcon(name);
      const badge = isTest ? "test" : name.toLowerCase().includes("intro") ? "intro" :
                    name.toLowerCase().includes("review") ? "review" : "special";
      const badgeLabel = isTest ? "TEST" : name.toLowerCase().includes("intro") ? "INTRO" :
                         name.toLowerCase().includes("review") ? "REVIEW" : "★";

      // Activity image from Actirobo folder — use first word of activity name
      const imgName = name.split(/[\s:]/)[0].replace(/[^a-zA-Z]/g, "");
      const imgPath = `${CONFIG.ACTIROBO_PATH}${imgName}.png`;

      const item = document.createElement("div");
      item.className = `activity-card ${isTest ? "test-card" : ""}`;
      item.innerHTML = `
        <div class="activity-card-img">
          <img src="${imgPath}" alt="${name}"
               onerror="this.parentElement.innerHTML='<div class=\\'act-icon-fallback ${iconClass}\\'>${icon}</div>'" />
        </div>
        <div class="activity-card-body">
          <div class="activity-card-name">${name}</div>
          <div class="activity-card-file">${filename}</div>
        </div>
        <span class="activity-badge ${badge}">${badgeLabel}</span>
      `;
      item.addEventListener("click", () => loadActivityFile(lvl, sess, filename, name));
      list.appendChild(item);
    });
  }

  // Switch view: hide levels, show session content
  showView("session");

  // Scroll main content to top
  const main = document.getElementById("mainContent");
  if (main) main.scrollTop = 0;
}

function getActivityIcon(name) {
  const n = name.toLowerCase();
  if (n.includes("grammar"))   return { icon: "📖", iconClass: "study" };
  if (n.includes("vocab"))     return { icon: "🔤", iconClass: "vocab" };
  if (n.includes("reading"))   return { icon: "📄", iconClass: "reading" };
  if (n.includes("listening")) return { icon: "🎧", iconClass: "listening" };
  if (n.includes("tongue"))    return { icon: "🗣️", iconClass: "tongue-twister" };
  if (n.includes("one shot"))  return { icon: "⚡", iconClass: "one-shot" };
  if (n.includes("squeezer"))  return { icon: "💪", iconClass: "squeezer" };
  if (n.includes("dmt"))       return { icon: "🎯", iconClass: "dmt" };
  if (n.includes("wish"))      return { icon: "⭐", iconClass: "wish" };
  if (n.includes("project"))   return { icon: "🏗️", iconClass: "project" };
  if (n.includes("graduation"))return { icon: "🎓", iconClass: "graduation" };
  if (n.includes("oral"))      return { icon: "🎤", iconClass: "Interview" };
  return { icon: "📌", iconClass: "study" };
}

// ─── LOAD ACTIVITY FILE ──────────────────────────────────────
function loadActivityFile(lvl, sess, filename, actName) {
  const path = `${CONFIG.DATA_PATH}${filename}`;
  const existing = document.getElementById("activityScript");
  if (existing) existing.remove();

  const script = document.createElement("script");
  script.id  = "activityScript";
  script.src = path;
  script.onerror = () => {
    showToast(`Activity file not found: ${filename}`, "error");
  };
  document.body.appendChild(script);
  showToast(`Loading: ${actName}...`);
}

// ─── SERVICES ────────────────────────────────────────────────
function bindNav() {
  document.getElementById("btnGamePortal")?.addEventListener("click", openGamePortal);
  document.getElementById("btnCV")?.addEventListener("click", () => {
    if (!currentUser) {
      pendingAction = { type: "cv" };
      showLogin("cv");
      return;
    }
    openCVBuilder();
  });
  document.getElementById("btnLoginTopbar")?.addEventListener("click", () => showLogin("nav"));
}

function openGamePortal() {
  window.open(CONFIG.GAME_URL, "_blank");
}

function openCVBuilder() {
  showToast("CV Builder coming soon! 🚀");
}

// ─── FILENAME GENERATOR ────────────────────────────────────
function getActivityFilename(level, session, activityName) {
  const isTest  = activityName.toLowerCase().includes("test");
  const firstWord = activityName.split(/[\s:]/)[0].replace(/[^a-zA-Z]/g, "");
  const prefix  = firstWord.substring(0, 3);
  const suffix  = isTest ? prefix + "t" : prefix;
  return `L-${level}-S-${session}-${suffix}.js`;
}

// ─── TOAST ──────────────────────────────────────────────────
function showToast(msg, type) {
  if (!toast) return;
  toast.textContent = msg;
  toast.className   = "show" + (type === "error" ? " error-toast" : "");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => { toast.className = ""; }, 3200);
}
