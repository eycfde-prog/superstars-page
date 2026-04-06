(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    const questions = [
        "Will you travel abroad next year?", "Would you like a cup of coffee?", "Will it rain tomorrow?",
        "Would you live on the moon if you could?", "Will robots replace teachers in the future?", "Would you help a stranger in need?",
        "Will you be famous one day?", "Would you buy a Ferrari if you were rich?", "Will your friends come to the party?",
        "Would you eat insects for a million dollars?", "Will you finish your homework tonight?", "Would you prefer to be invisible?",
        "Will the sun rise at 6 AM tomorrow?", "Would you like to meet a famous person?", "Will people live on Mars in 2050?",
        "Would you go to the party if I invited you?", "Will you study English next weekend?", "Would you stay up late for a movie?",
        "Will the prices go down next month?", "Would you travel back in time if possible?", "Will you open the door for me, please?",
        "Would you rather have tea than juice?", "Will your father be at work tomorrow?", "Would you change your name if you could?",
        "Will you be 30 years old next year?", "Would you like to be a millionaire?", "Will the movie start on time?",
        "Would you mind helping me with this?", "Will we use flying cars soon?", "Would you forgive a friend who lied?"
    ];

    let currentIdx = 0;
    let countdownInterval = null;
    const folderNumber = 4;
    const timeLimit = 2; // ثانيتين لكل سؤال

    container.innerHTML = '';
    container.style.cssText = `height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; background:radial-gradient(circle, #0a192f 0%, #020c1b 100%); color:#e6f1ff; font-family: 'Segoe UI', sans-serif; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            
            .go-overlay { 
                position:absolute; inset:0; background:rgba(2, 12, 27, 0.95); 
                display:flex; flex-direction:column; justify-content:center; align-items:center; 
                z-index:100; backdrop-filter: blur(10px); transition: 0.8s ease;
            }
            .go-btn { 
                background:#64ffda; color:#0a192f; border:none; padding:25px 80px; 
                font-size:2.5rem; cursor:pointer; border-radius:4px; font-weight:800; 
                letter-spacing:5px; transition:0.3s; box-shadow: 0 10px 30px rgba(100, 255, 218, 0.2);
            }
            .go-btn:hover { background:#7fffdf; transform: scale(1.05); }

            .sq-header-exam { position:absolute; top:50px; width:90%; display:flex; justify-content:space-between; align-items:center; }
            .sq-badge { background:rgba(100, 255, 218, 0.1); color:#64ffda; padding:8px 20px; border-radius:4px; border:1px solid #64ffda; font-weight:bold; font-size:0.9rem; letter-spacing:2px; }

            .sq-question { 
                font-size:5.5rem; text-align:center; max-width:85%; line-height:1.2; 
                font-weight:800; display:none; color:#ccd6f6;
                animation: fadeIn 0.4s cubic-bezier(0.23, 1, 0.32, 1);
            }
            
            .sq-timer-circle { 
                width: 100px; height: 100px; border-radius: 50%; 
                border: 4px solid rgba(100, 255, 218, 0.1); 
                display: none; align-items: center; justify-content: center; 
                font-size: 3rem; font-weight: 800; color: #64ffda; margin-top: 50px;
                position: relative;
            }
            .sq-timer-circle::after {
                content: ''; position: absolute; inset: -4px; border-radius: 50%;
                border: 4px solid #64ffda; clip-path: polygon(50% 50%, -50% -50%, 150% -50%);
                animation: timerRotate 2s linear infinite;
            }
            @keyframes timerRotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        </style>
        
        <div class="go-overlay" id="goOverlay">
            <div style="color:#8892b0; letter-spacing:10px; margin-bottom:20px; font-size:1.2rem;">AUTO-PROTOCOL 04</div>
            <button class="go-btn" id="startBtn">START TEST</button>
            <div style="color:#64ffda; margin-top:25px; opacity:0.6;">SPEED LIMIT: 2.0s / Q</div>
        </div>

        <div class="sq-header-exam">
            <div class="sq-badge">EXAM MODE</div>
            <div id="sqProgress" style="color:#8892b0; font-size:1.2rem; font-weight:bold;">01 / ${questions.length}</div>
        </div>

        <div id="sqDisplay" class="sq-question"></div>
        <div id="sqTimer" class="sq-timer-circle">${timeLimit}</div>
        
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
        
        if (countdownInterval) clearInterval(countdownInterval);
        
        countdownInterval = setInterval(() => {
            timeLeft--;
            if (timeLeft >= 0) {
                timerBox.innerText = timeLeft;
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
            clearInterval(countdownInterval);
            display.innerHTML = "TEST COMPLETE<br><span style='font-size:2.5rem; color:#64ffda; opacity:0.7;'>CORE MASTERED</span>";
            timerBox.style.display = "none";
            if(window.triggerVetoDone) window.triggerVetoDone();
        }
    }

    function updateSlide(index) {
        progressText.innerText = `${(index + 1).toString().padStart(2, '0')} / ${questions.length}`;
        
        display.style.opacity = '0';
        
        setTimeout(() => {
            display.innerText = questions[index];
            display.style.opacity = '1';
            
            const audioPath = `data/Squeezer/${folderNumber}/${index + 1}.wav`;
            audio.src = audioPath;
            audio.play().catch(e => {});
            
            startTimer();
        }, 100);
    }

    startBtn.onclick = () => {
        goOverlay.style.opacity = '0';
        setTimeout(() => {
            goOverlay.style.display = 'none';
            display.style.display = 'block';
            timerBox.style.display = 'flex';
            updateSlide(0);
        }, 600);
    };

})();
