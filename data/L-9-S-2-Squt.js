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

    container.innerHTML = '';
    container.style.cssText = `height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; background:#010409; color:#00f2ff; font-family: 'Courier New', monospace; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            @keyframes pulseBorder {
                0% { box-shadow: 0 0 10px #ff00ea; border-color: #ff00ea; }
                50% { box-shadow: 0 0 30px #ff00ea; border-color: #fff; }
                100% { box-shadow: 0 0 10px #ff00ea; border-color: #ff00ea; }
            }
            .sq-counter { position:absolute; top:40px; left:50px; font-size:1.2rem; color:#ff00ea; font-weight:bold; letter-spacing:3px; }
            .sq-indicator { position:absolute; top:40px; right:50px; font-size:1.1rem; color:#00f2ff; border: 1px solid #00f2ff; padding:8px 20px; }
            .sq-question { font-size:5rem; text-align:center; max-width:85%; line-height:1.2; font-weight:900; display:none; transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
            .test-timer { 
                font-size:4.5rem; color:#ff00ea; font-weight:900; margin-top:40px; 
                width:120px; height:120px; border: 4px solid #ff00ea; border-radius:15px; 
                display:none; align-items:center; justify-content:center; 
                animation: pulseBorder 1s infinite;
            }
            .go-overlay { position:absolute; inset:0; background:#010409; display:flex; flex-direction:column; justify-content:center; align-items:center; z-index:100; }
            .go-btn { 
                background:transparent; color:#ff00ea; border:3px solid #ff00ea; padding:30px 100px; 
                font-size:3.5rem; cursor:pointer; font-weight:900; letter-spacing:10px;
                transition:0.3s; box-shadow: 0 0 20px rgba(255, 0, 234, 0.3);
            }
            .go-btn:hover { background:#ff00ea; color:#000; box-shadow: 0 0 50px #ff00ea; }
            .status-text { color:#444; margin-top:20px; letter-spacing:5px; font-size:0.9rem; }
        </style>
        
        <div class="go-overlay" id="goOverlay">
            <h1 style="margin-bottom:10px; font-size:1.5rem; letter-spacing:10px; color:#00f2ff;">PROTOCOL: SQUEEZER_04</h1>
            <button class="go-btn" id="startBtn">RUN TEST</button>
            <div class="status-text">WARNING: 2.0s AUTO-LIMIT ENABLED</div>
        </div>

        <div class="sq-counter">SYSTEM: AUTO-SQUEEZER</div>
        <div class="sq-indicator">MODE: WILL / WOULD</div>
        <div id="sqDisplay" class="sq-question"></div>
        <div id="sqTimer" class="test-timer">2</div>
        <audio id="sqAudio"></audio>
    `;

    const display = document.getElementById('sqDisplay');
    const timerDisplay = document.getElementById('sqTimer');
    const audioPlayer = document.getElementById('sqAudio');
    const goOverlay = document.getElementById('goOverlay');
    const startBtn = document.getElementById('startBtn');

    function startTimer() {
        let timeLeft = 2;
        timerDisplay.innerText = timeLeft;
        timerDisplay.style.color = "#ff00ea";
        
        if (countdownInterval) clearInterval(countdownInterval);
        
        countdownInterval = setInterval(() => {
            timeLeft--;
            if (timeLeft >= 0) {
                timerDisplay.innerText = timeLeft;
                if (timeLeft === 0) timerDisplay.style.color = "#fff";
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
            display.innerText = "FUTURE MASTERED!";
            display.style.color = "#ff00ea";
            timerDisplay.style.display = "none";
        }
    }

    function updateSlide(index) {
        display.style.filter = 'blur(15px)';
        display.style.opacity = '0';
        
        setTimeout(() => {
            display.innerText = questions[index];
            display.style.filter = 'blur(0)';
            display.style.opacity = '1';
            
            const audioPath = `data/Squeezer/${folderNumber}/${index + 1}.mp3`;
            audioPlayer.src = audioPath;
            audioPlayer.play().catch(() => {});
            
            startTimer();
        }, 200);
    }

    startBtn.onclick = () => {
        goOverlay.style.opacity = '0';
        setTimeout(() => {
            goOverlay.style.display = 'none';
            display.style.display = 'block';
            timerDisplay.style.display = 'flex';
            updateSlide(0);
        }, 500);
    };

})();
