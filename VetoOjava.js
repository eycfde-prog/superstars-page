/**
 * VETO ONLINE - LOGIC
 * Master Controller for EYC VETO Academy
 */

const levelsContainer = document.getElementById('levelsContainer');
const loginModal = document.getElementById('loginModal');
const contentDisplay = document.getElementById('contentDisplay');
const sessionFrame = document.getElementById('sessionFrame');

let isLoggedIn = false;

document.addEventListener('DOMContentLoaded', () => {
    // التحقق من وجود البيانات المستوردة من ملف OnlineLevels.js
    if (typeof sessionData !== 'undefined') {
        renderLevels();
    } else {
        console.error("Critical Error: sessionData not found. Ensure OnlineLevels.js is loaded first.");
        levelsContainer.innerHTML = "<p style='color:red;'>Error: Could not load curriculum data.</p>";
    }
    setupEventListeners();
});

function renderLevels() {
    levelsContainer.innerHTML = '';
    for (let l = 1; l <= 12; l++) {
        const levelDiv = document.createElement('div');
        levelDiv.className = 'level-card';
        levelDiv.innerHTML = `<h3>Level ${l}</h3>`;
        
        const sessionList = document.createElement('ul');
        sessionList.className = 'session-list';
        
        for (let s = 1; s <= 4; s++) {
            const sessionKey = `${l}-${s}`;
            if (sessionData[sessionKey]) {
                const li = document.createElement('li');
                li.innerHTML = `<span>Session ${s}</span> <b>▶</b>`;
                li.onclick = (e) => {
                    e.stopPropagation();
                    handleSessionOpen(l, s);
                };
                sessionList.appendChild(li);
            }
        }
        levelDiv.appendChild(sessionList);
        levelsContainer.appendChild(levelDiv);
    }
}

function handleSessionOpen(lvl, sess) {
    if (!isLoggedIn) {
        showModal();
        return;
    }

    const tasks = sessionData[`${lvl}-${sess}`];
    const overlay = document.createElement('div');
    overlay.id = "taskPickerOverlay";
    
    let taskButtonsHtml = tasks.map(task => {
        const fileName = generateFileName(lvl, sess, task);
        return `<button class="task-btn" onclick="launchActivity('${fileName}')">${task}</button>`;
    }).join('');

    overlay.innerHTML = `
        <div class="task-picker-content">
            <h3>Level ${lvl} Session ${sess}</h3>
            <div class="task-grid">${taskButtonsHtml}</div>
            <button class="primary-btn" style="width:100%" onclick="closeTaskPicker()">Back</button>
        </div>`;
    document.body.appendChild(overlay);
}

function generateFileName(lvl, sess, taskName) {
    const clean = taskName.trim().toLowerCase();
    let prefix = clean.substring(0, 3);
    prefix = prefix.charAt(0).toUpperCase() + prefix.slice(1);
    const isTest = clean.includes('test');
    return `L-${lvl}-S-${sess}-${isTest ? prefix + 't' : prefix}.js`;
}

function launchActivity(fileName) {
    closeTaskPicker();
    contentDisplay.classList.remove('hidden');
    // المسار الخاص بمجلد البيانات
    const fullPath = `data/VetoOnline/${fileName}`;
    sessionFrame.src = `activity_viewer.html?file=${fullPath}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeTaskPicker() {
    const p = document.getElementById('taskPickerOverlay');
    if(p) p.remove();
}

function setupEventListeners() {
    document.getElementById('loginBtn').onclick = () => {
        isLoggedIn = true;
        hideModal();
        document.getElementById('studentName').innerText = "Verified Student";
        document.getElementById('navLoginBtn').style.display = 'none';
    };
    document.getElementById('closeModal').onclick = hideModal;
    document.getElementById('closeFrame').onclick = () => {
        contentDisplay.classList.add('hidden');
        sessionFrame.src = "";
    };
}

function showModal() { loginModal.classList.remove('hidden'); }
function hideModal() { loginModal.classList.add('hidden'); }
