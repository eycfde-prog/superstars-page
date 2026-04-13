/**
 * VETO ONLINE - Core Logic (Refined)
 * Handles: Session generation, Smart naming logic, and Mobile UX.
 */

// UI Elements
const levelsContainer = document.getElementById('levelsContainer');
const loginModal = document.getElementById('loginModal');
const contentDisplay = document.getElementById('contentDisplay');
const sessionFrame = document.getElementById('sessionFrame');

// App State
let isLoggedIn = false;

document.addEventListener('DOMContentLoaded', () => {
    // التأكد من أن sessionData محملة من الملف الخارجي
    if (typeof sessionData !== 'undefined') {
        renderLevels();
    } else {
        console.error("Error: sessionData not found. Check OnlineLevels.js path.");
    }
    setupEventListeners();
});

/**
 * بناء قائمة المستويات والمحاضرات
 */
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
                li.innerHTML = `<span>Session ${s}</span> <i class="icon-play">▶</i>`;
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

/**
 * معالجة فتح المحاضرة وعرض المهام
 */
function handleSessionOpen(lvl, sess) {
    if (!isLoggedIn) {
        showModal();
        return;
    }

    const tasks = sessionData[`${lvl}-${sess}`];
    
    // إنشاء واجهة اختيار المهام (Task Selector)
    const overlay = document.createElement('div');
    overlay.id = "taskPickerOverlay";
    overlay.className = "task-picker-full"; // سنضيف لها CSS لجعلها ملء الشاشة في الموبايل
    
    let taskButtonsHtml = tasks.map(task => {
        const fileName = generateFileName(lvl, sess, task);
        return `<button class="task-btn" onclick="launchActivity('${fileName}')">
                    ${task}
                </button>`;
    }).join('');

    overlay.innerHTML = `
        <div class="task-picker-content">
            <div class="picker-header">
                <h3>Level ${lvl} | Session ${sess}</h3>
                <p>Select your task to begin</p>
            </div>
            <div class="task-grid">${taskButtonsHtml}</div>
            <button class="close-picker-btn" onclick="closeTaskPicker()">Return to Dashboard</button>
        </div>
    `;
    
    document.body.appendChild(overlay);
    // منع السكرول في الخلفية عند فتح المهام
    document.body.style.overflow = 'hidden';
}

/**
 * منطق التسمية الذكي (Smart Naming Engine)
 */
function generateFileName(lvl, sess, taskName) {
    const cleanName = taskName.trim().toLowerCase();
    
    // استخراج أول 3 حروف من أول كلمة
    let prefix = cleanName.substring(0, 3);
    
    // جعل الحرف الأول كبير كما في مثالك Gra, Voc
    prefix = prefix.charAt(0).toUpperCase() + prefix.slice(1);
    
    // التحقق من وجود كلمة test في أي مكان في اسم المهمة
    const isTest = cleanName.includes('test');
    
    // بناء الاسم النهائي: L-1-S-1-Voct.js
    const activityCode = isTest ? `${prefix}t` : prefix;
    
    return `L-${lvl}-S-${sess}-${activityCode}.js`;
}

/**
 * تشغيل النشاط داخل الـ Iframe
 */
function launchActivity(fileName) {
    closeTaskPicker();
    
    contentDisplay.classList.remove('hidden');
    // المسار المطلوب في مجلد data
    const path = `data/VetoOnline/${fileName}`;
    
    // ملاحظة: activity_viewer.html هو الملف الوسيط الذي سيقوم بتشغيل الـ JS
    sessionFrame.src = `activity_viewer.html?file=${path}`;
    
    // سكرول للأعلى لضمان رؤية الطالب للمحتوى فوراً
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeTaskPicker() {
    const picker = document.getElementById('taskPickerOverlay');
    if (picker) picker.remove();
    document.body.style.overflow = 'auto';
}

// Modal & Events
function setupEventListeners() {
    document.getElementById('loginBtn').addEventListener('click', () => {
        // هنا يمكنك إضافة منطق التحقق من البيانات لاحقاً
        isLoggedIn = true;
        hideModal();
        updateUIForLoggedInUser();
    });

    document.getElementById('closeModal').onclick = hideModal;
}

function updateUIForLoggedInUser() {
    const loginBtn = document.getElementById('navLoginBtn');
    if(loginBtn) loginBtn.innerText = "Student Verified";
    // يمكن هنا استدعاء بيانات الطالب الوهمية لعرضها
}

function showModal() { loginModal.classList.remove('hidden'); }
function hideModal() { loginModal.classList.add('hidden'); }

document.getElementById('closeFrame').onclick = () => {
    contentDisplay.classList.add('hidden');
    sessionFrame.src = "";
};
