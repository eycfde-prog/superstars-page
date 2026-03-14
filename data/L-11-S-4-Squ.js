(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // --- قاعدة بيانات الأسئلة (Can - Could) ---
    const questions = [
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

    let currentIdx = 0;
    let countdownInterval = null;
    const folderNumber = 6;

    // --- التنسيق البصري ---
    container.innerHTML = '';
    container.style.cssText = `height:calc(100vh - 200px); display:flex; flex-direction:column; justify-content:center; align-items:center; background:#002b1b; color:#fff; font-family: 'Trebuchet MS', sans-serif; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            .sq-counter { position:absolute; top:30px; left:50px; font-size:1.5rem; color:#2ecc71; font-weight:bold; text-shadow: 0 0 10px rgba(46, 204, 113, 0.5); }
            .sq-indicator { position:absolute; top:30px; right:50px; font-size:1.3rem; border: 2px solid #2ecc71; padding:8px 20px; border-radius:50px; color:#2ecc71; }
            .sq-question { font-size:5.2rem; text-align:center; max-width:85%; line-height:1.2; font-weight:900; color:#ffffff; text-shadow: 4px 4px 0px #27ae60; display:none; }
            .test-timer { font-size:4.5rem; color:#2ecc71; font-weight:bold; margin-top:40px; width:120px; height:120px; border: 6px solid #2ecc71; border-radius:50%; display:none; align-items:center; justify-content:center; box-shadow: 0 0 15px rgba(46, 204, 113, 0.4); }
            .go-overlay { position:absolute; inset:0; background:rgba(0, 43, 27, 0.98); display:flex; flex-direction:column; justify-content:center; align-items:center; z-index:100; }
            .go-btn { background:#2ecc71; color:#002b1b; border:none; padding:30px 90px; font-size:3.5rem; cursor:pointer; border-radius:50px; font-weight:900; box-shadow: 0 10px 0 #27ae60; transition:0.1s; }
            .go-btn:active { transform:translateY(5px); box-shadow: 0 5px 0 #27ae60; }
        </style>
        
        <div class="go-overlay" id="goOverlay">
            <h1 style="margin-bottom:30px; font-size:3.5rem; color:#fff; text-align:center;">CAN / COULD<br><span style="color:#2ecc71">ABILITY TEST</span></h1>
            <button class="go-btn" id="startTestBtn">START</button>
        </div>

        <div class="sq-counter">Squeezer #6 [FINAL TEST]</div>
        <div class="sq-indicator">Skill: <span style="font-weight:bold">Can / Could</span></div>
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
            display.innerHTML = "<span style='color:#2ecc71'>ALL SQUEEZERS DONE!</span>";
            timerDisplay.style.display = "none";
        }
    }

    function updateSlide(index) {
        display.style.opacity = '0';
        display.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            display.innerText = questions[index];
            display.style.opacity = '1';
            display.style.transform = 'translateX(0)';
            
            // تشغيل الصوت
            const audioPath = `data/Squeezer/${folderNumber}/${index + 1}.mp3`;
            audioPlayer.src = audioPath;
            audioPlayer.play().catch(e => {});
            
            startTimer();
        }, 150);
    }

    startBtn.onclick = () => {
        goOverlay.style.display = 'none';
        display.style.display = 'block';
        timerDisplay.style.display = 'flex';
        updateSlide(0);
    };

})();
