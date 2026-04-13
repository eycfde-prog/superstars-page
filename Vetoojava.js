/**
 * VETO ONLINE — Student Portal JavaScript
 * EYC Academy | Mr. Ezz
 * Handles: Auth, Profile, Levels/Sessions, Activity iFrame, Services
 */

// ─── CONFIG ─────────────────────────────────────────────────
const CONFIG = {
  GAS_URL: "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID_HERE/exec",
  DATA_PATH: "data/VetoOnline/",
  LOGO: "Logo.png",
  ACADEMY: "EYC Academy",
  PROGRAM: "Veto Online",
  TEACHER: "Mr. Ezz",
  GAME_URL: "game-portal/index.html",     // adjust as needed
  CLASS_DAY: "Saturday",
  CLASS_TIME: "10:00 AM – 12:00 PM",
  STORAGE_KEY: "vetoOnlineUser"
};

// ─── STATE ──────────────────────────────────────────────────
let currentUser = null;
let pendingAction = null; // what triggered the login prompt

// ─── DOM REFS ────────────────────────────────────────────────
const loginOverlay  = document.getElementById("loginOverlay");
const loginMsg      = document.getElementById("loginMsg");
const loginTabLogin = document.getElementById("tabLogin");
const loginTabNew   = document.getElementById("tabNew");
const formLogin     = document.getElementById("formLogin");
const formNew       = document.getElementById("formNewStudent");
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

// Tab switching
loginTabLogin.addEventListener("click", () => {
  loginTabLogin.classList.add("active");
  loginTabNew.classList.remove("active");
  formLogin.classList.remove("hidden");
  formNew.classList.add("hidden");
  clearMsg();
});
loginTabNew.addEventListener("click", () => {
  loginTabNew.classList.add("active");
  loginTabLogin.classList.remove("active");
  formNew.classList.remove("hidden");
  formLogin.classList.add("hidden");
  clearMsg();
});

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

// New student signup
document.getElementById("btnSignup").addEventListener("click", async () => {
  const name   = document.getElementById("newName").value.trim();
  const email  = document.getElementById("newEmail").value.trim().toLowerCase();
  const avatar = document.getElementById("newAvatar").value.trim();
  if (!name || !email) return showMsg("Name and Email are required.", "error");

  showMsg("Creating your account...", "");
  try {
    const res = await fetch(CONFIG.GAS_URL, {
      method: "POST",
      body: JSON.stringify({ action: "signup", name, email, avatar, group: "Veto Online", age: "" })
    });
    const data = await res.json();
    if (data.status === "success") {
      showMsg(`Account created! Your code: ${data.code} — save it!`, "success");
    } else {
      showMsg(data.message || "Signup failed.", "error");
    }
  } catch(e) {
    showMsg("Connection error.", "error");
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

// ─── OPEN SESSION → SHOW ACTIVITIES ──────────────────────────
function openSession(lvl, sess, btn) {
  // Highlight active btn
  document.querySelectorAll(".session-btn.active").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");

  const key        = `${lvl}-${sess}`;
  const activities = (typeof sessionData !== "undefined" && sessionData[key]) || [];

  const frame = document.getElementById("activityFrame");
  const title = document.getElementById("frameTitle");
  const list  = document.getElementById("activityList");

  if (title) title.textContent = `LEVEL ${lvl}  ·  SESSION ${sess}`;

  list.innerHTML = "";

  if (activities.length === 0) {
    list.innerHTML = `<div style="color:var(--text-muted);padding:20px;text-align:center;font-size:.9rem;">No content found for this session.</div>`;
  } else {
    activities.forEach(name => {
      const isTest    = name.toLowerCase().includes("test");
      const isIntro   = name.toLowerCase().includes("intro");
      const isReview  = name.toLowerCase().includes("review");
      const isGradu   = name.toLowerCase().includes("graduation");
      const filename  = getActivityFilename(lvl, sess, name);

      const { icon, iconClass } = getActivityIcon(name);
      const badge = isTest ? "test" : isIntro ? "intro" : isReview ? "review" : "special";
      const badgeLabel = isTest ? "TEST" : isIntro ? "INTRO" : isReview ? "REVIEW" : "★";

      const item = document.createElement("div");
      item.className = `activity-item ${isTest ? "test-item" : ""}`;
      item.innerHTML = `
        <div class="activity-icon ${iconClass}">${icon}</div>
        <div class="activity-info">
          <div class="activity-name">${name}</div>
          <div class="activity-file">${filename}</div>
        </div>
        <span class="activity-badge ${badge}">${badgeLabel}</span>
      `;
      item.addEventListener("click", () => loadActivityFile(lvl, sess, filename, name));
      list.appendChild(item);
    });
  }

  frame.classList.add("visible");
  frame.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function getActivityIcon(name) {
  const n = name.toLowerCase();
  if (n.includes("grammar"))   return { icon: "📖", iconClass: "study" };
  if (n.includes("vocab"))     return { icon: "🔤", iconClass: "vocab" };
  if (n.includes("reading"))   return { icon: "📄", iconClass: "reading" };
  if (n.includes("listening")) return { icon: "🎧", iconClass: "listening" };
  if (n.includes("tongue"))    return { icon: "🗣️", iconClass: "vocab" };
  if (n.includes("one shot"))  return { icon: "⚡", iconClass: "test-icon" };
  if (n.includes("squeezer"))  return { icon: "💪", iconClass: "study" };
  if (n.includes("dmt"))       return { icon: "🎯", iconClass: "test-icon" };
  if (n.includes("wish"))      return { icon: "⭐", iconClass: "special" };
  if (n.includes("project"))   return { icon: "🏗️", iconClass: "special" };
  if (n.includes("graduation"))return { icon: "🎓", iconClass: "special" };
  if (n.includes("oral"))      return { icon: "🎤", iconClass: "test-icon" };
  return { icon: "📌", iconClass: "study" };
}

// ─── LOAD ACTIVITY FILE ──────────────────────────────────────
function loadActivityFile(lvl, sess, filename, actName) {
  const path = `${CONFIG.DATA_PATH}${filename}`;
  // Dynamic script injection — the JS file may define/render its own UI
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

// ─── CLOSE FRAME ────────────────────────────────────────────
function closeFrame() {
  const frame = document.getElementById("activityFrame");
  frame.classList.remove("visible");
  document.querySelectorAll(".session-btn.active").forEach(b => b.classList.remove("active"));
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
  // Placeholder — load CV builder module
  showToast("CV Builder coming soon! 🚀");
}

// ─── FILENAME GENERATOR (mirrors OnlineLevels.js) ────────────
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
