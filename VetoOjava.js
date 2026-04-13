/**
 * Veto Online - logic
 * Handles Level population, Task extraction, and Smart File Naming.
 */

// UI Elements
const levelsContainer = document.getElementById('levelsContainer');
const loginModal = document.getElementById('loginModal');
const contentDisplay = document.getElementById('contentDisplay');
const sessionFrame = document.getElementById('sessionFrame');

// App State
let isLoggedIn = false;

document.addEventListener('DOMContentLoaded', () => {
    // Note: sessionData comes from OnlineLevels.js
    renderLevels();
    setupEventListeners();
});

/**
 * Creates the UI for 12 Levels and their Sessions
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
                li.innerHTML = `<strong>Session ${s}</strong>`;
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
 * Triggered when a Session is clicked. Shows the tasks for that session.
 */
function handleSessionOpen(lvl, sess) {
    if (!isLoggedIn) {
        showModal();
        return;
    }

    const tasks = sessionData[`${lvl}-${sess}`];
    // Create a simple overlay to show tasks before launching Iframe
    let taskHtml = `<div class="task-selector-overlay">
                        <h3>Session ${lvl}-${sess} Tasks</h3>
                        <div class="task-buttons">`;
    
    tasks.forEach(task => {
        const fileName = generateFileName(lvl, sess, task);
        taskHtml += `<button onclick="launchActivity('${fileName}')">${task}</button>`;
    });
    
    taskHtml += `</div><button class="close-btn" onclick="this.parentElement.remove()">Back</button></div>`;
    
    const div = document.createElement('div');
    div.id = "taskPicker";
    div.innerHTML = taskHtml;
    document.body.appendChild(div);
}

/**
 * SMART NAMING LOGIC
 * Example: "Grammar Study" Level 1, Session 1 -> L-1-S-1-Gra.js
 * Example: "Vocab Test" Level 1, Session 3 -> L-1-S-3-Voct.js
 */
function generateFileName(lvl, sess, taskName) {
    const cleanName = taskName.toLowerCase();
    let prefix = cleanName.substring(0, 3);
    
    // Capitalize first letter of prefix
    prefix = prefix.charAt(0).toUpperCase() + prefix.slice(1);
    
    // Check for "test"
    const isTest = cleanName.includes('test');
    const suffix = isTest ? prefix + 't' : prefix;
    
    return `L-${lvl}-S-${sess}-${suffix}.js`;
}

/**
 * Loads the JS file into the viewer
 */
function launchActivity(fileName) {
    const taskPicker = document.getElementById('taskPicker');
    if(taskPicker) taskPicker.remove();

    contentDisplay.classList.remove('hidden');
    // We navigate the frame to a viewer page that executes the JS
    // Or you can directly point to the path if it's an HTML wrap
    const path = `data/VetoOnline/${fileName}`;
    console.log("Loading path: " + path);
    
    sessionFrame.src = `activity_viewer.html?file=${path}`;
    
    // Scroll to top for mobile users
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Modal Controls
function showModal() { loginModal.classList.remove('hidden'); }
function hideModal() { loginModal.classList.add('hidden'); }

document.getElementById('loginBtn').onclick = () => {
    isLoggedIn = true;
    hideModal();
    // In a real app, you'd trigger a UI refresh here
    alert("System Synchronized!");
};

document.getElementById('closeFrame').onclick = () => {
    contentDisplay.classList.add('hidden');
    sessionFrame.src = "";
};
