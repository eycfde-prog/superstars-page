(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Questions Database ---
    const questions = [
        "Are you ready for the challenge?", "Is Cairo the capital of Egypt?", "Are your parents at home now?",
        "Is it cold today?", "Am I your teacher for today?", "Is English an easy language?",
        "Are lions dangerous animals?", "Is your best friend a tall person?", "Are we in the classroom now?",
        "Is pizza your favorite food?", "Are lemons sweet?", "Is the sun a star?",
        "Are cats better than dogs?", "Is your phone in your pocket?", "Am I late for the meeting?",
        "Are shoes made of leather?", "Is football popular in Egypt?", "Are you a student at this academy?",
        "Is the ocean blue?", "Are spiders insects?", "Is Bill Gates a rich man?",
        "Are your hands clean?", "Is red your favorite color?", "Am I a good singer?",
        "Are apples healthy for us?", "Is a Ferrari a slow car?", "Are the stars visible at night?",
        "Is it 10 o'clock now?", "Are children afraid of ghosts?", "Is this your first English course?"
    ];

    let currentIdx = 0;
    const folderNumber = 1; // am, is, are folder

    // --- UI Structure ---
    container.innerHTML = '';
    container.style.cssText = `height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; background:#050505; color:#fff; font-family:'Segoe UI', sans-serif; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            .sq-header { position:absolute; top:40px; width:90%; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #222; padding-bottom:15px; }
            .sq-title { font-size:1.2rem; color:#f1c40f; font-weight:900; letter-spacing:4px; text-transform:uppercase; }
            .sq-target { font-size:1rem; color:#555; font-weight:bold; }
            
            .sq-main-box { text-align:center; width:85%; }
            .sq-question { 
                font-size:6vw; font-weight:900; line-height:1.1; 
                transition: opacity 0.3s, transform 0.3s; 
                text-shadow: 0 10px 30px rgba(0,0,0,0.5);
                margin-bottom: 20px;
            }
            
            .sq-progress-container { position:absolute; bottom:0; left:0; width:100%; height:8px; background:#111; }
            .sq-progress-bar { height:100%; background:#e74c3c; width:0%; transition:0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); box-shadow: 0 0 15px #e74c3c; }
            
            .sq-nav-hint { position:absolute; bottom:40px; color:#333; font-size:0.9rem; letter-spacing:2px; }
        </style>
        
        <div class="sq-header">
            <div class="sq-title">Squeezer #01</div>
            <div class="sq-target">TARGET: <span style="color:#f1c40f">AM / IS / ARE</span></div>
        </div>

        <div class="sq-main-box">
            <div id="sqDisplay" class="sq-question">${questions[currentIdx]}</div>
        </div>
        
        <div class="sq-nav-hint">USE ARROWS OR SPACE TO NAVIGATE</div>

        <div class="sq-progress-container">
            <div id="sqBar" class="sq-progress-bar"></div>
        </div>
        <audio id="sqAudio"></audio>
    `;

    const display = document.getElementById('sqDisplay');
    const audio = document.getElementById('sqAudio');
    const bar = document.getElementById('sqBar');

    function updateQuestion(index) {
        // Animation Out
        display.style.opacity = '0';
        display.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            // Update Content
            display.innerText = questions[index];
            display.style.color = "#fff";
            
            // Progress Bar
            const prog = ((index + 1) / questions.length) * 100;
            bar.style.width = prog + "%";

            // Audio Logic
            const audioPath = `data/Squeezer/${folderNumber}/${index + 1}.wav`;
            audio.src = audioPath;
            audio.play().catch(e => console.warn("Audio interaction required"));

            // Animation In
            display.style.opacity = '1';
            display.style.transform = 'scale(1)';
        }, 250);
    }

    const nextBtn = () => {
        if (currentIdx < questions.length - 1) {
            currentIdx++;
            updateQuestion(currentIdx);
        } else {
            display.innerText = "EXCELLENT! SESSION COMPLETE";
            display.style.color = "#2ecc71";
            bar.style.backgroundColor = "#2ecc71";
            if(window.triggerVetoDone) window.triggerVetoDone();
        }
    };

    const prevBtn = () => {
        if (currentIdx > 0) {
            currentIdx--;
            updateQuestion(currentIdx);
        }
    };

    // Global Key Listener
    document.onkeydown = (e) => {
        if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") nextBtn();
        if (e.key === "ArrowLeft") prevBtn();
    };

    // Init first question
    updateQuestion(0);

})();
