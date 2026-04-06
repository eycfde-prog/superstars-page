(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- قاعدة بيانات الأسئلة (Is - Are) ---
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
    let countdownInterval = null;
    const folderNumber = 1;
    const timeLimit = 2; // الوقت المتاح لكل سؤال بالثواني

    container.innerHTML = '';
    container.style.cssText = `height:100%; width:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; background:#020202; color:#fff; font-family:'Segoe UI', sans-serif; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
            @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            
            .sq-header { position:absolute; top:40px; width:90%; display:flex; justify-content:space-between; align-items:center; z-index:10; }
            .sq-mode-tag { background:#e74c3c; color:white; padding:5px 15px; border-radius:5px; font-weight:900; letter-spacing:2px; font-size:0.8rem; }
            
            .go-overlay { position:absolute; inset:0; background:#000; display:flex; flex-direction:column; justify-content:center; align-items:center; z-index:100; transition: 0.5s; }
            .go-btn { background:#27ae60; color:white; border:none; padding:35px 100px; font-size:4rem; cursor:pointer; border-radius:15px; font-weight:900; box-shadow: 0 10px 0 #1e8449; transition:0.2s; animation: pulse 1.5s infinite; }
            .go-btn:hover { background:#2ecc71; }
            .go-btn:active { transform:translateY(8px); box-shadow: 0 2px 0 #1e8449; }

            .sq-question { font-size:5vw; text-align:center; max-width:85%; line-height:1.1; font-weight:900; display:none; animation: slideUp 0.3s ease-out; transition: 0.2s; }
            
            .timer-ring { 
                width: 140px; height: 140px; border-radius: 50%; border: 8px solid #222; 
                display: none; align-items: center; justify-content: center; 
                font-size: 4rem; font-weight: 900; color: #e74c3c; margin-top: 40px;
                box-shadow: 0 0 30px rgba(231, 76, 60, 0.1);
            }
            .timer-pulse { animation: pulse 0.5s infinite !important; color: #ff0000 !important; border-color: #ff0000 !important; }
        </style>
        
        <div class="go-overlay" id="goOverlay">
            <div style="font-size:1.2rem; letter-spacing:8px; color:#555; margin-bottom:10px;">VETO SYSTEM READY</div>
            <h1 style="margin-bottom:40px; font-size:4.5rem; font-weight:900; color:#fff;">SPEED: ${timeLimit}s</h1>
            <button class="go-btn" id="startBtn">START</button>
        </div>

        <div class="sq-header">
            <div class="sq-mode-tag">EXAM MODE</div>
            <div id="sqProgress" style="color:#555; font-weight:bold; font-size:1.5vw;">0 / ${questions.length}</div>
        </div>

        <div id="sqDisplay" class="sq-question"></div>
        <div id="sqTimer" class="timer-ring">${timeLimit}</div>
        
        <audio id="sqAudio"></audio>
    `;

    const display = document.getElementById('sqDisplay');
    const timerBox = document.getElementById('sqTimer');
    const audio = document.getElementById('sqAudio');
    const goOverlay = document.getElementById('goOverlay');
    const startBtn = document.getElementById('startBtn');
    const progressText = document.getElementById('sqProgress');

    function startTimer() {
        let timeLeft = timeLimit;
        timerBox.innerText = timeLeft;
        timerBox.classList.remove('timer-pulse');
        
        if (countdownInterval) clearInterval(countdownInterval);
        
        countdownInterval = setInterval(() => {
            timeLeft--;
            if (timeLeft >= 0) {
                timerBox.innerText = timeLeft;
                if (timeLeft === 0) timerBox.classList.add('timer-pulse');
            } else {
                clearInterval(countdownInterval);
                nextQuestion();
            }
        }, 1000);
    }

    function nextQuestion() {
        if (currentIdx < questions.length - 1) {
            currentIdx++;
            updateSlide(currentIdx);
        } else {
            // نهاية الاختبار
            clearInterval(countdownInterval);
            display.innerHTML = "TEST COMPLETE!<br><span style='font-size:2.5rem; color:#555;'>PERFECT SPEED</span>";
            display.style.color = "#2ecc71";
            timerBox.style.display = "none";
            if(window.triggerVetoDone) window.triggerVetoDone();
        }
    }

    function updateSlide(index) {
        progressText.innerText = `${index + 1} / ${questions.length}`;
        
        // أنيميشن بسيط عند تغيير السؤال
        display.style.opacity = '0';
        
        setTimeout(() => {
            display.innerText = questions[index];
            display.style.opacity = '1';
            
            // تشغيل الصوت
            const audioPath = `data/Squeezer/${folderNumber}/${index + 1}.mp3`;
            audio.src = audioPath;
            audio.play().catch(e => console.log("Audio skipped"));
            
            startTimer();
        }, 150);
    }

    startBtn.onclick = () => {
        goOverlay.style.opacity = '0';
        setTimeout(() => {
            goOverlay.style.display = 'none';
            display.style.display = 'block';
            timerBox.style.display = 'flex';
            updateSlide(0);
        }, 500);
    };

})();
