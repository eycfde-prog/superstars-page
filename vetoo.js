let flashShown = false;
let fullData = null;
let userProfile = null;

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwQtf3uJOKb6d69WMSpqh4Zqwf4wZO9nfwDimNkcWCGS9Q5kmT4jCI8dJ1hKSt7hHK49w/exec";
const syllabus = {
    1: { 1: ["H W", "Lis 1 test", "Gr 1 test"], 2: ["H W", "Gr 2 test", "Lis 2 test", "Vocab 1 study"], 3: ["H W", "Gr 3 test", "Lis 3 test", "Vocab 2 study"], 4: ["H W", "Gr 4 test", "Lis 4 test", "Reading 1 Rec"] },
    2: { 1: ["H W"], 2: ["Lis 5 test", "Gr 5 test", "Reading 2 Rec", "One Shot 1 study"], 3: ["H W", "Lis 6 test", "Reading 3 Rec", "Vocab 3 study"], 4: ["H W", "Lis 7 test", "Reading 4 Rec", "Vocab 4 study", "One Shot 2 study", "Lis 8 test", "Reading 5 Rec", "Gr 6 test", "Tongue Twister 1 Rec"] },
    3: { 1: ["H W"], 2: ["H W", "Lis 9 test", "Reading 6 Rec", "Tongue Twister 2 Rec", "One Shot 3 study"], 3: ["H W", "Lis 10 test", "Reading 7 Rec", "Tongue Twister 3 Rec", "Vocab 5 study"], 4: ["H W", "Lis 11 test", "Reading 8 Rec", "Tongue Twister 4 Rec", "Vocab 6 study", "One Shot 4 study", "H W", "Lis 12 test", "Reading 9 Rec", "Tongue Twister 5 Rec", "Gr 8 test", "Squeezer 1 study"] },
    4: { 1: ["H W"], 2: ["H W", "Lis 13 test", "Gr 9 test", "Reading 10 Rec", "Tongue Twister 6 Rec", "Squeezer 2 study", "One Shot 5 study"], 3: ["H W", "Lis 14 test", "Reading 11 Rec", "Tongue Twister 7 Rec", "Vocab 7 study"], 4: ["H W", "Lis 15 test", "Reading 12 Rec", "Tongue Twister 8 Rec", "Vocab 8 study", "One Shot 6 study", "H W", "Lis 16 test", "Reading 13 Rec", "Tongue Twister 9 Rec", "Gr 10 test", "DMT 1 study"] },
    5: { 1: ["H W"], 2: ["H W", "Lis 17 test", "Gr 11 test", "Reading 14 Rec", "Tongue Twister 10 Rec", "DMT 2 study", "One Shot 7 study"], 3: ["H W", "Lis 18 test", "Reading 15 Rec", "Tongue Twister 11 Rec", "Vocab 9 study"], 4: ["H W", "Lis 19 test", "Reading 16 Rec", "Tongue Twister 12 Rec", "Vocab 10 study", "One Shot 8 study", "H W", "Lis 20 test", "Reading 17 Rec", "Tongue Twister 13 Rec", "Gr 12 test", "job interview role play"] },
    6: { 1: ["H W"], 2: ["H W", "Lis 21 test", "Gr 13 test", "Reading 18 Rec", "Tongue Twister 14 Rec", "DMT 3 study", "One Shot 9 study"], 3: ["H W", "Lis 22 test", "Reading 19 Rec", "Tongue Twister 15 Rec", "Vocab 11 study"], 4: ["H W", "Lis 23 test", "Reading 20 Rec", "Tongue Twister 16 Rec", "Vocab 12 study", "One Shot 10 study", "H W", "Lis 24 test", "Reading 21 Rec", "Tongue Twister 17 Rec", "Gr 14 test", "Wish 1 study"] },
    7: { 1: ["H W"], 2: ["H W", "Lis 25 test", "Gr 15 test", "Reading 22 Rec", "Tongue Twister 18 Rec", "Squeezer 3 study", "One Shot 11 study"], 3: ["H W", "Lis 26 test", "Reading 23 Rec", "Tongue Twister 19 Rec", "Vocab 13 study"], 4: ["H W", "Lis 27 test", "Reading 24 Rec", "Tongue Twister 20 Rec", "Vocab 14 study", "One Shot 12 study", "H W", "Lis 28 test", "Reading 25 Rec", "Tongue Twister 21 Rec", "Gr 16 test", "Wish 2 study"] },
    8: { 1: ["H W"], 2: ["H W", "Lis 29 test", "Gr 17 test", "Reading 26 Rec", "Tongue Twister 22 Rec", "Squeezer 4 study", "One Shot 13 study"], 3: ["H W", "Lis 30 test", "Reading 27 Rec", "Tongue Twister 23 Rec", "Vocab 15 study"], 4: ["H W", "Lis 31 test", "Reading 28 Rec", "Tongue Twister 24 Rec", "Vocab 16 study", "One Shot 14 study", "H W", "Lis 32 test", "Reading 29 Rec", "Tongue Twister 25 Rec", "Gr 18 test", "Project 1 study"] },
    9: { 1: ["H W"], 2: ["H W", "Lis 33 test", "Gr 19 test", "Reading 30 Rec", "Tongue Twister 26 Rec", "Squeezer 5 study", "One Shot 15 study"], 3: ["H W", "Lis 34 test", "Reading 31 Rec", "Tongue Twister 27 Rec", "Vocab 17 study"], 4: ["H W", "Lis 35 test", "Reading 32 Rec", "Tongue Twister 28 Rec", "Vocab 18 study", "One Shot 16 study", "H W", "Lis 36 test", "Reading 33 Rec", "Tongue Twister 29 Rec", "Gr 20 test", "DMT 4 study"] },
    10: { 1: ["H W"], 2: ["H W", "Lis 37 test", "Reading 34 Rec", "Tongue Twister 30 Rec", "Wish 3 study"], 3: ["H W", "Lis 38 test", "Reading 35 Rec", "Tongue Twister 31 Rec", "Vocab 19 study"], 4: ["H W", "Lis 39 test", "Reading 36 Rec", "Tongue Twister 32 Rec", "Vocab 20 study", "One Shot 18 study", "H W", "Lis 40 test", "Reading 37 Rec", "Tongue Twister 33 Rec", "Project 2 study"] },
    11: { 1: ["H W"], 2: ["gp study", "H W", "Lis 41 test", "Reading 38 Rec", "Tongue Twister 34 Rec", "Wish 3 study"], 3: ["H W", "Lis 42 test", "Reading 39 Rec", "Tongue Twister 35 Rec", "dmt 5 study"], 4: ["H W", "Lis 43 test", "Reading 40 Rec", "Tongue Twister 36 Rec", "Squeezer 6 study", "One Shot 20 study", "gp study", "H W"] },
    12: { 1: ["H W", "gp study"], 2: ["H W"], 3: ["H W", "gp study", "gp sending"], 4: ["H W", "gp sending", "gp study"] }
};

function getActType(name) {
    const n = name.toLowerCase();
    if (n.includes('test')) return 'type-test';
    if (n.includes('study')) return 'type-study';
    if (n.includes('hw') || n.includes('h w')) return 'type-hw';
    if (n.includes('rec')) return 'type-rec';
    if (n.includes('gp')) return 'type-gp';
    return 'type-special';
}

async function attemptLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const code = document.getElementById('loginCode').value.trim();
    if(!email || !code) return;
    
    const btn = document.getElementById('loginBtn');
    btn.innerText = "AUTHENTICATING...";
    btn.disabled = true;

    try {
        const res = await fetch(`${SCRIPT_URL}?email=${encodeURIComponent(email)}&code=${encodeURIComponent(code)}`);
        const data = await res.json();
        if(data.status === "success") {
            userProfile = data.profile;
            fullData = data; 
            localStorage.setItem('veto_email', email);
            localStorage.setItem('veto_code', code);
            document.getElementById('loginOverlay').style.display = 'none';
            
            checkMessages(data.profile.msg);
            if(!flashShown) showFlashScreen();
            initProfile();
        } else { 
            alert(data.message); 
            localStorage.clear();
        }
    } catch (e) { 
        alert("Connection Error. Please check your internet."); 
    }
    
    btn.innerText = "ACCESS DASHBOARD";
    btn.disabled = false;
}

function checkMessages(newMsg) {
    const oldMsgs = JSON.parse(localStorage.getItem('msgs') || "[]");
    const notiBtn = document.getElementById('notiBtn');
    const badge = document.getElementById('notiBadge');

    if (newMsg && !oldMsgs.includes(newMsg)) {
        notiBtn.classList.add('has-new');
        badge.style.display = 'block';
    } else {
        notiBtn.classList.remove('has-new');
        badge.style.display = 'none';
    }
}

function toggleMailbox() {
    const box = document.getElementById('mailbox');
    box.style.display = box.style.display === 'none' ? 'block' : 'none';
    
    if(userProfile && userProfile.msg) {
        document.getElementById('msgList').innerHTML = `<div class="msg-item">${userProfile.msg}</div>`;
        let read = JSON.parse(localStorage.getItem('msgs') || "[]");
        if(!read.includes(userProfile.msg)) read.push(userProfile.msg);
        localStorage.setItem('msgs', JSON.stringify(read));
        checkMessages(userProfile.msg); 
    }
}

function showFlashScreen() {
    const content = document.getElementById('flashContent');
    const p = userProfile;
    const lvls = fullData.levels;
    const sc = fullData.scard;

    content.innerHTML = `
        <div class="flash-section">
            <h4><i class="fas fa-user-shield"></i> BASIC INFO</h4>
            <div class="info-grid">
                <span><b>ID:</b> ${p.code}</span> <span><b>Group:</b> ${p.group}</span>
                <span><b>Tokens:</b> ${p.tokens}</span> <span><b>Stars:</b> ${p.stars} ⭐</span>
                <span><b>Global Rank:</b> #${p.gRank}</span> <span><b>Local Rank:</b> #${p.lRank}</span>
            </div>
        </div>
        <div class="flash-section">
            <h4><i class="fas fa-chart-line"></i> LEVELS PROGRESS</h4>
            <div class="mini-grid">${lvls.map((v, i) => `<div>L${i+1}: ${v}%</div>`).join('')}</div>
        </div>
        <div class="flash-section">
            <h4><i class="fas fa-tasks"></i> ACTIVITY CARD</h4>
            <div class="info-grid">
                <span>Attendance: ${sc[0]}</span> <span>Listening: ${sc[3]}</span>
                <span>Grammar: ${sc[4]}</span> <span>Projects: ${sc[10]}</span>
            </div>
        </div>
    `;
    document.getElementById('flashScreen').style.display = 'flex';
    flashShown = true;
}

function initProfile() {
    if(!userProfile) return;
    document.getElementById('headerAvatar').src = userProfile.avatar || "https://via.placeholder.com/100";
    document.getElementById('headerName').innerText = userProfile.name;
    document.getElementById('headerCode').innerText = userProfile.code || "--";
    document.getElementById('headerTokens').innerText = userProfile.tokens;
    document.getElementById('headerRank').innerText = `#${userProfile.rank || 0}`;
    buildLevelMenu();
}

function buildLevelMenu() {
    const menu = document.getElementById('levelMenu');
    menu.innerHTML = ""; 
    for(let i=1; i<=12; i++) {
        const card = document.createElement('div');
        card.className = 'level-card';
        card.onclick = () => showSessions(i);
        card.innerHTML = `
            <i class="fas fa-layer-group fa-2x" style="color:var(--accent); margin-bottom:10px;"></i>
            <div style="font-weight:bold; color:white;">LEVEL ${i}</div>
        `;
        menu.appendChild(card);
    }
}

function showSessions(lvl) {
    document.getElementById('navigationView').style.display = 'none';
    document.getElementById('sessionView').style.display = 'block';
    document.getElementById('path').innerText = `LEVEL ${lvl}`;
    
    const sessList = document.getElementById('sessionList');
    sessList.innerHTML = [1,2,3,4].map(s => 
        `<button class="sess-btn ${s===1?'active':''}" onclick="changeSession(this, ${lvl}, ${s})">Session ${s}</button>`
    ).join('');
    
    loadActivities(lvl, 1);
}

function changeSession(btn, lvl, sess) {
    document.querySelectorAll('.sess-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    loadActivities(lvl, sess);
}

function loadActivities(lvl, sess) {
    const grid = document.getElementById('activityGrid');
    const acts = syllabus[lvl][sess];
    grid.innerHTML = acts.map(a => `
        <div class="act-card ${getActType(a)}" onclick="launchActivity('${a}', ${lvl}, ${sess})">${a}</div>
    `).join('');
}

function showLevels() {
    document.getElementById('navigationView').style.display = 'block';
    document.getElementById('sessionView').style.display = 'none';
}

function launchActivity(name, lvl, sess) {
    const fileName = name.trim().replace(/\s+/g, '_');
    const iframe = document.getElementById('activityFrame');
    const targetUrl = `data/${fileName}.html?email=${encodeURIComponent(userProfile.email)}&lvl=${lvl}&sess=${sess}`;
    
    iframe.src = targetUrl;
    document.getElementById('activityOverlay').style.display = 'flex';
    document.body.classList.add('activity-open');
}

function closeActivity() {
    document.getElementById('activityOverlay').style.display = 'none';
    document.getElementById('activityFrame').src = "";
    document.body.classList.remove('activity-open');
}

function closeFlash() {
    document.getElementById('flashScreen').style.display = 'none';
}

function logout() {
    localStorage.clear();
    location.reload();
}

window.onload = () => {
    const savedEmail = localStorage.getItem('veto_email');
    const savedCode = localStorage.getItem('veto_code');
    if(savedEmail && savedCode) {
        document.getElementById('loginEmail').value = savedEmail;
        document.getElementById('loginCode').value = savedCode;
        attemptLogin();
    }
};
