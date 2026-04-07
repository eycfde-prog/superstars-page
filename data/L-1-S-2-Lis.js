/**
 * VETO PROGRAM - Listening Activity Module (Audio Enhanced)
 * Designed by: Veto Architect
 * Feature: Auto-path Audio Integration
 */

(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Data & Configuration ---
    const conversations = [
        `[Ahmed - Friendly]: I am very happy today. <break time="1.0s" /> Veto is a great place for us. <break time="1.5s" /> [Amy - Enthusiastic]: You are right. <break time="1.0s" /> Look! Julia is there. <break time="1.5s" /> [Ahmed - Curious]: Is she a teacher? <break time="1.5s" /> [Amy - Normal]: No, she is a student like us.`,
        `[Chris - Slightly rushed]: Julia, where is my English book? <break time="1.0s" /> I need it now. <break time="1.5s" /> [Julia - Calm]: It is on the table. <break time="1.0s" /> Is this your blue pen? <break time="1.5s" /> [Chris - Relieved]: Yes, it is mine. <break time="1.5s" /> We are ready for the Veto lesson.`,
        `[Amy - Friendly]: Ahmed, I have an orange in my bag. <break time="1.5s" /> [Ahmed - Simple]: I have two apples and a banana. <break time="1.5s" /> [Amy - Questioning]: Are they for lunch? <break time="1.5s" /> [Ahmed - Cheerful]: Yes, they are. <break time="1.0s" /> We can eat them at school.`,
        `[Julia - Pointing]: Chris, look at him. <break time="1.0s" /> That is our teacher. <break time="1.5s" /> [Chris - Appreciative]: He is very kind. <break time="1.0s" /> He helps us every day. <break time="1.5s" /> [Julia - Positive]: I like his way of teaching. <break time="1.5s" /> [Chris - Proud]: Veto has the best teachers.`
    ];

    let currentIdx = 0;
    const audioObj = new Audio();
    // المسار الأساسي بناءً على هيكل الـ GitHub الخاص بك (المستوى 1، المحاضرة 1)
    const audioBaseUrl = "https://raw.githubusercontent.com/eycfde-prog/EYCVetoProgram/main/data/Listening/1/1/";

    // --- UI Construction ---
    container.innerHTML = `
        <style>
            .listening-engine {
                height: 100%; width: 100%; 
                background: radial-gradient(circle at center, #1a1a1a 0%, #050505 100%);
                display: flex; flex-direction: column; align-items: center; justify-content: center;
                color: #fff; font-family: 'Segoe UI', sans-serif; position: relative; overflow: hidden;
            }
            .convo-header {
                position: absolute; top: 40px; font-size: 1.5rem;
                color: #c5a059; letter-spacing: 5px; text-transform: uppercase;
                border-bottom: 2px solid #c5a059; padding-bottom: 5px;
            }
            .audio-btn {
                position: absolute; top: 40px; right: 40px;
                width: 70px; height: 70px; border-radius: 50%;
                background: #c5a059; border: none; cursor: pointer;
                display: flex; align-items: center; justify-content: center;
                font-size: 2rem; box-shadow: 0 0 20px rgba(197, 160, 89, 0.4);
                transition: 0.3s; z-index: 9000;
            }
            .audio-btn:hover { transform: scale(1.1); background: #e2be7a; }
            .audio-btn.playing { animation: pulse 1.5s infinite; background: #ff4757; }
            @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(255, 71, 87, 0.7); } 70% { box-shadow: 0 0 0 20px rgba(255, 71, 87, 0); } 100% { box-shadow: 0 0 0 0 rgba(255, 71, 87, 0); } }

            .dialogue-box {
                width: 85%; max-width: 1200px; padding: 40px;
                background: rgba(255,255,255,0.03); border-radius: 20px;
                border-left: 8px solid #c5a059; transition: all 0.5s ease;
            }
            .line-item { margin-bottom: 30px; animation: slideIn 0.5s forwards; opacity: 0; }
            @keyframes slideIn { from { opacity:0; transform: translateX(20px); } to { opacity:1; transform: translateX(0); } }
            
            .speaker-name { 
                display: inline-block; font-weight: 900; font-size: 2.2vw; 
                color: #c5a059; margin-bottom: 10px; text-transform: uppercase;
            }
            .speaker-text { 
                display: block; font-size: 3.8vw; line-height: 1.3; font-weight: 500;
                color: #e0e0e0; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            }
            .controls-hint {
                position: absolute; bottom: 30px; color: rgba(197, 160, 89, 0.4);
                font-size: 1.2rem;
            }
        </style>
        <div class="listening-engine" id="engine-main">
            <div class="convo-header" id="convo-num">Conversation 1 / 4</div>
            <button class="audio-btn" id="play-btn" onclick="playCurrentAudio()">▶️</button>
            <div class="dialogue-box" id="dialogue-display"></div>
            <div class="controls-hint">ENTER: Next | SPACE: Play Audio</div>
        </div>
    `;

    const display = document.getElementById('dialogue-display');
    const header = document.getElementById('convo-num');
    const playBtn = document.getElementById('play-btn');

    // --- Audio Logic ---
    function playCurrentAudio() {
        const audioPath = `${audioBaseUrl}${currentIdx + 1}.mp3`;
        if (audioObj.src !== audioPath) {
            audioObj.src = audioPath;
        }
        
        if (audioObj.paused) {
            audioObj.play().catch(e => console.log("Audio play blocked or missing file"));
            playBtn.innerText = "⏸️";
            playBtn.classList.add('playing');
        } else {
            audioObj.pause();
            playBtn.innerText = "▶️";
            playBtn.classList.remove('playing');
        }
    }

    audioObj.onended = () => {
        playBtn.innerText = "▶️";
        playBtn.classList.remove('playing');
    };

    // --- Rendering Logic ---
    function parseAndRender(idx) {
        audioObj.pause(); // Stop previous audio
        playBtn.innerText = "▶️";
        playBtn.classList.remove('playing');

        const rawText = conversations[idx];
        header.innerText = `Conversation ${idx + 1} / ${conversations.length}`;
        display.innerHTML = '';

        const cleaned = rawText.replace(/<break[^>]*>/g, '');
        const parts = cleaned.split(/(?=\[.*?\])/);

        parts.forEach((part, i) => {
            const match = part.match(/\[(.*?)\s-\s(.*?)\]:\s(.*)/);
            if (match) {
                const [_, name, mood, text] = match;
                const div = document.createElement('div');
                div.className = 'line-item';
                div.style.animationDelay = `${i * 0.3}s`;
                div.innerHTML = `
                    <span class="speaker-name">${name} <small style="font-size:1rem; color:#888; font-weight:normal;">(${mood})</small></span>
                    <span class="speaker-text">${text.trim()}</span>
                `;
                display.appendChild(div);
            }
        });
    }

    // --- Navigation ---
    window.nextSlide = function() {
        if (currentIdx < conversations.length - 1) {
            currentIdx++;
            parseAndRender(currentIdx);
        }
    };

    window.prevSlide = function() {
        if (currentIdx > 0) {
            currentIdx--;
            parseAndRender(currentIdx);
        }
    };

    // Keyboard Integration
    document.onkeydown = (e) => {
        if (e.key === "Enter" || e.key === "ArrowRight") nextSlide();
        if (e.key === "ArrowLeft") prevSlide();
        if (e.key === " ") { 
            e.preventDefault(); 
            playCurrentAudio(); 
        }
    };

    // Initialize
    parseAndRender(currentIdx);
})();
