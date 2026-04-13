/**
 * Veto Online - Core Logic
 * Handles Level population, Login Modals, and Student Data.
 */

// Mock Data for initial view
const MOCK_STUDENT = {
    name: "Ahmed Mohamed",
    onlineID: "VETO-ON-2024",
    offlineID: "VETO-OFF-505",
    tokens: 150,
    stars: 12,
    rank: 5,
    day: "Monday",
    time: "04:00 PM - 06:00 PM",
    image: "https://via.placeholder.com/100/2563eb/ffffff?text=Student"
};

// UI Elements
const loginModal = document.getElementById('loginModal');
const levelsContainer = document.getElementById('levelsContainer');

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', () => {
    renderLevels();
    setupEventListeners();
});

function setupEventListeners() {
    // Show login for specific actions
    document.getElementById('navLoginBtn').onclick = () => showModal();
    document.getElementById('createCvBtn').onclick = () => showModal();
    document.getElementById('closeModal').onclick = () => hideModal();

    // Mock Login Action
    document.getElementById('loginBtn').onclick = () => {
        applyStudentData(MOCK_STUDENT);
        hideModal();
        alert("Welcome back, " + MOCK_STUDENT.name);
    };
}

/**
 * Generates 12 Levels each with 4 Sessions
 */
function renderLevels() {
    levelsContainer.innerHTML = '';
    for (let i = 1; i <= 12; i++) {
        const levelCard = document.createElement('div');
        levelCard.className = 'level-card';
        levelCard.innerHTML = `
            <h4>Level ${i}</h4>
            <ul class="session-list">
                <li onclick="handleSessionClick(${i}, 1)">Session 1: Introduction</li>
                <li onclick="handleSessionClick(${i}, 2)">Session 2: Deep Dive</li>
                <li onclick="handleSessionClick(${i}, 3)">Session 3: Practical</li>
                <li onclick="handleSessionClick(${i}, 4)">Session 4: Project</li>
            </ul>
        `;
        levelsContainer.appendChild(levelCard);
    }
}

function handleSessionClick(lvl, sess) {
    // Check if logged in (simple check for this mock)
    const isGuest = document.getElementById('studentName').innerText === "Guest Student";
    if (isGuest) {
        showModal();
    } else {
        openSessionFrame(lvl, sess);
    }
}

function openSessionFrame(lvl, sess) {
    const frameContainer = document.getElementById('contentDisplay');
    const frame = document.getElementById('sessionFrame');
    
    // Example: Logic to fetch from your data folder
    // frame.src = `data/lvl${lvl}/session${sess}.html`;
    
    // For now, use a placeholder
    frame.src = "about:blank"; 
    frameContainer.classList.remove('hidden');
    alert(`Loading Level ${lvl} - Session ${sess}`);
}

function showModal() {
    loginModal.classList.remove('hidden');
}

function hideModal() {
    loginModal.classList.add('hidden');
}

/**
 * Updates UI with Student information
 * @param {Object} data 
 */
function applyStudentData(data) {
    document.getElementById('studentName').innerText = data.name;
    document.getElementById('onlineID').innerText = data.onlineID;
    document.getElementById('offlineID').innerText = data.offlineID;
    document.getElementById('tokenCount').innerText = data.tokens;
    document.getElementById('starCount').innerText = data.stars;
    document.getElementById('rankPos').innerText = `#${data.rank}`;
    document.getElementById('classDay').innerText = data.day;
    document.getElementById('classTime').innerText = data.time;
    document.getElementById('studentImg').src = data.image;
    document.getElementById('navLoginBtn').innerText = "Logged In";
}