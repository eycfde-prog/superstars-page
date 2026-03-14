(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // --- قاعدة بيانات الأسئلة (Will - Would) ---
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
    const folderNumber = 4; // المجلد الخاص بـ Will & Would

    // --- التنسيق البصري ---
    container.innerHTML = '';
    container.style.cssText = `height:calc(100vh - 200px); display:flex; flex-direction:column; justify-content:center; align-items:center; background:#020b1a; color:#00f2ff; font-family: 'Courier New', Courier, monospace; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            .sq-counter { position:absolute; top:30px; left:50px; font-size:1.5rem; color:#ff00ea; font-weight:bold; text-shadow: 0 0 10px #ff00ea; }
            .sq-indicator { position:absolute; top:30px; right:50px; font-size:1.3rem; color:#ff00ea; border: 1px solid #ff00ea; padding:10px 25px; border-radius:4px; box-shadow: inset 0 0 10px #ff00ea; }
            .sq-question { font-size:5rem; text-align:center; max-width:85%; line-height:1.1; font-weight:bold; text-shadow: 0 0 20px rgba(0,242,255,0.5); display:none; }
            .test-timer { font-size:4rem; color:#ff00ea; font-weight:bold; margin-top:30px; width:100px; height:100px; border: 3px solid #ff00ea; border-radius:10px; display:none; align-items:center; justify-content:center; box-shadow: 0 0 15px #ff00ea; }
            .go-overlay { position:absolute; inset:0; background:rgba(2, 11, 26, 0.98); display:flex; flex-direction:column; justify-content:center; align-items:center; z-index:100; }
            .go-btn { background:transparent; color:#00f2ff; border:4px solid #00f2ff; padding:25px 80px; font-size:4rem; cursor:pointer; border-radius:10px; font-weight:900; box-shadow: 0 0 30px rgba(0,242,255,0.5); transition:0.2s; }
            .go-btn:hover { background:rgba(0,242,255,0.1); box-shadow: 0 0 50px #00f2ff; }
            .go-btn:active { transform:scale(0.95); }
        </style>
        
        <div class="go-overlay" id="goOverlay">
            <h1 style="margin-bottom:30px; font-size:3rem; letter-spacing:5px;">SYSTEM INITIALIZING...</h1>
            <button class="go-btn" id="startTestBtn">RUN TEST</button>
        </div>

        <div class="sq-counter">Squeezer #4 [AUTO-MODE]</div>
        <div class="sq-indicator">Target: Will / Would</div>
        <div id="sqQuestionDisplay" class="sq-question"></div>
        <div id="sqTimerDisplay" class="test-timer">2</div>
        <audio id="sqAudioPlayer"></audio>
    `;

    const display = document.getElementById('sqQuestionDisplay');
    const timerDisplay = document.getElementById('sqTimerDisplay');
    const audioPlayer = document.getElementById('sqAudioPlayer');
    const goOverlay = document.getElementById('goOverlay');
    const startBtn = document.getElementById('startTestBtn');

    function startTimer() {
        let timeLeft = 2;
        timerDisplay.innerText = timeLeft;
        
        if (countdownInterval) clearInterval(countdownInterval);
        
        countdownInterval = setInterval(() => {
            timeLeft--;
            if (timeLeft >= 0) {
                timerDisplay.innerText = timeLeft;
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
            
            // تشغيل صوت المجلد 4
            const audioPath = `data/Squeezer/${folderNumber}/${index + 1}.mp3`;
            audioPlayer.src = audioPath;
            audioPlayer.play().catch(e => {});
            
            startTimer();
        }, 200);
    }

    startBtn.onclick = () => {
        goOverlay.style.display = 'none';
        display.style.display = 'block';
        timerDisplay.style.display = 'flex';
        updateSlide(0);
    };

})();
