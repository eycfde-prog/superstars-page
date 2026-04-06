(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- قاعدة بيانات الأسئلة الأصلية ---
    const rawQuestions = [
        "Can you swim?", "Could you walk when you were one year old?", "Can birds fly?",
        "Could you speak English five years ago?", "Can cats climb trees?", "Could you open the window for me, please?",
        "Can you play the piano?", "Could dinosaurs fly?", "Can an elephant jump?",
        "Could you drive a car when you were ten?", "Can you see the stars tonight?", "Could you help me with my bag?",
        "Can snakes run?", "Could you read when you were four?", "Can you speak three languages?",
        "Could your grandfather use a smartphone?", "Can we go to the park today?", "Could you sleep well last night?",
        "Can robots feel emotions?", "Could you whistle when you were a child?", "Can you cook a delicious meal?",
        "Could you find your keys this morning?", "Can fish breathe outside water?", "Could you run faster than your friend?",
        "Can you lend me your pen?", "Could you see the moon yesterday?", "Can tigers swim?",
        "Could you finish the work on time?", "Can we live without water?", "Could you understand me?"
    ];

    // --- نظام اللخبطة من WOLF (ربط النص بالصوت) ---
    let shuffledData = rawQuestions.map((q, i) => ({
        text: q,
        audioId: i + 1
    }));

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    shuffle(shuffledData);
    // ---------------------------------------------

    let currentIdx = 0;
    let countdownInterval = null;
    const folderNumber = 6;

    container.innerHTML = '';
    container.style.cssText = `height:100%; width:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; background:#050505; color:#fff; font-family: 'Segoe UI', sans-serif; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            .sq-header { position:absolute; top:40px; width:90%; display:flex; justify-content:space-between; z-index:10; }
            .sq-title { font-size:1.2vw; color:#2ecc71; font-weight:900; letter-spacing:5px; text-transform:uppercase; }
            
            .sq-question { 
                font-size:7vw; 
                text-align:center; 
                max-width:85%; 
                line-height:1.1; 
                font-weight:900; 
                color:#ffffff; 
                display:none;
                animation: vetoPop 0.3s ease-out;
            }

            .test-timer-wrapper {
                margin-top: 50px;
                position: relative;
                display: none;
                justify-content: center;
                align-items: center;
            }

            .test-timer { 
                font-size:5rem; 
                color:#2ecc71; 
                font-weight:900; 
                width:150px; height:150px; 
                border: 8px solid #111; 
                border-top-color: #2ecc71;
                border-radius:50%; 
                display:flex; 
                align-items:center; 
                justify-content:center; 
                box-shadow: 0 0 30px rgba(46, 204, 113, 0.2);
                animation: timerRotate 1s linear infinite;
            }

            .timer-num { position: absolute; font-size: 4rem; font-weight: 900; color: #fff; }

            .go-overlay { 
                position:absolute; inset:0; 
                background: radial-gradient(circle, #0a1f16 0%, #050505 100%); 
                display:flex; flex-direction:column; justify-content:center; align-items:center; z-index:100; 
                transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .go-btn { 
                background:#2ecc71; color:#000; border:none; padding:30px 100px; 
                font-size:3.5vw; cursor:pointer; border-radius:100px; font-weight:900; 
                box-shadow: 0 20px 40px rgba(46,204,113,0.3); transition:0.3s;
                letter-spacing: 5px;
            }
            .go-btn:hover { transform: scale(1.1); filter: brightness(1.1); }

            @keyframes timerRotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            @keyframes vetoPop { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        </style>
        
        <div class="go-overlay" id="goOverlay">
            <p style="color:#2ecc71; font-weight:900; letter-spacing:10px; margin-bottom:10px;">FINAL LEVEL TEST</p>
            <h1 style="margin-bottom:50px; font-size:5vw; color:#fff; text-align:center; line-height:1;">CAN / COULD<br><span style="color:#fff; opacity:0.5">SPEED CHALLENGE</span></h1>
            <button class="go-btn" id="startTestBtn">START</button>
            <p style="color:#1b5e20; margin-top:20px; font-weight:bold; letter-spacing:3px;">SHUFFLE SYSTEM ENABLED</p>
        </div>

        <div class="sq-header">
            <div class="sq-title">Squeezer Final Test</div>
            <div class="sq-title" id="sqProgress">Question 1 / 30</div>
        </div>

        <div id="sqQuestionDisplay" class="sq-question"></div>

        <div class="test-timer-wrapper" id="timerWrapper">
            <div class="test-timer"></div>
            <div class="timer-num" id="sqTimerDisplay">2</div>
        </div>

        <audio id="sqAudioPlayer"></audio>
    `;

    const display = document.getElementById('sqQuestionDisplay');
    const timerDisplay = document.getElementById('sqTimerDisplay');
    const timerWrapper = document.getElementById('timerWrapper');
    const audioPlayer = document.getElementById('sqAudioPlayer');
    const goOverlay = document.getElementById('goOverlay');
    const startBtn = document.getElementById('startTestBtn');
    const progressText = document.getElementById('sqProgress');

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
        if (currentIdx < shuffledData.length - 1) {
            currentIdx++;
            updateSlide(currentIdx);
        } else {
            clearInterval(countdownInterval);
            display.innerHTML = "<span style='color:#2ecc71; font-size:6vw;'>CHALLENGE COMPLETE!</span>";
            timerWrapper.style.display = "none";
            if (window.triggerVetoDone) window.triggerVetoDone();
        }
    }

    function updateSlide(index) {
        const item = shuffledData[index];
        progressText.innerText = `Question ${index + 1} / ${shuffledData.length}`;
        
        display.style.display = 'none';
        void display.offsetWidth; // Reflow
        display.style.display = 'block';
        
        display.innerText = item.text;

        // استدعاء الصوت بناءً على المعرف الأصلي المخزن
        const audioPath = `data/Squeezer/${folderNumber}/${item.audioId}.wav`;
        audioPlayer.src = audioPath;
        audioPlayer.play().catch(e => {});
        
        startTimer();
    }

    startBtn.onclick = () => {
        goOverlay.style.opacity = '0';
        setTimeout(() => {
            goOverlay.style.display = 'none';
            display.style.display = 'block';
            timerWrapper.style.display = 'flex';
            updateSlide(0);
        }, 500);
    };

})();
