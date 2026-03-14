(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // --- قاعدة بيانات الأسئلة (Do & Does) ---
    const questions = [
        "Do you speak English every day?", "Does your father work in an office?", "Do lions eat grass?",
        "Does it rain in the desert?", "Do we have a lesson tomorrow?", "Does your mother cook delicious food?",
        "Do cats like swimming?", "Does the sun rise in the morning?", "Do you live in a big house?",
        "Does a supermarket sell shoes?", "Do your friends play video games?", "Does fish breathe underwater?",
        "Do you want to be a doctor?", "Does your phone have a camera?", "Do birds fly in the sky?",
        "Does 2 + 2 equal 5?", "Do cows produce milk?", "Does a pilot fly a plane?",
        "Do you drink coffee in the morning?", "Does your best friend speak French?", "Do children like chocolate?",
        "Does the moon shine during the day?", "Do you understand the lesson?", "Does a spider have six legs?",
        "Do people wear coats in summer?", "Does a mechanic fix cars?", "Do you sleep early?",
        "Does water boil at 100°C?", "Do we need oxygen to breathe?", "Does a clock tell the time?"
    ];

    let currentIdx = 0;
    let countdownInterval = null;
    const folderNumber = 2; // المجلد الخاص بـ Do & Does

    // --- التنسيق البصري ---
    container.innerHTML = '';
    container.style.cssText = `height:calc(100vh - 200px); display:flex; flex-direction:column; justify-content:center; align-items:center; background:#0a0a0a; color:#fff; font-family: 'Arial Black', sans-serif; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            .sq-counter { position:absolute; top:30px; left:50px; font-size:1.5rem; color:#e74c3c; font-weight:bold; text-transform:uppercase; letter-spacing:2px; }
            .sq-indicator { position:absolute; top:30px; right:50px; font-size:1.3rem; border: 2px solid #2980b9; padding:8px 20px; border-radius:30px; font-weight:bold; }
            .sq-question { font-size:5.5rem; text-align:center; max-width:85%; line-height:1.1; font-weight:900; text-shadow: 4px 4px 15px rgba(0,0,0,0.8); display:none; }
            .test-timer { font-size:4.5rem; color:#f1c40f; font-weight:bold; margin-top:40px; width:120px; height:120px; border: 6px solid #f1c40f; border-radius:50%; display:none; align-items:center; justify-content:center; text-shadow: 0 0 10px rgba(241,196,15,0.5); }
            .go-overlay { position:absolute; inset:0; background:rgba(0,0,0,0.95); display:flex; flex-direction:column; justify-content:center; align-items:center; z-index:100; }
            .go-btn { background:#2980b9; color:white; border:none; padding:30px 100px; font-size:4rem; cursor:pointer; border-radius:20px; font-weight:900; box-shadow: 0 12px 0 #1c5982; transition:0.1s; }
            .go-btn:active { transform:translateY(6px); box-shadow: 0 6px 0 #1c5982; }
            .highlight { color: #f1c40f; }
        </style>
        
        <div class="go-overlay" id="goOverlay">
            <h1 style="margin-bottom:40px; font-size:3.5rem; color:#fff;">DO / DOES <span class="highlight">TEST</span></h1>
            <button class="go-btn" id="startTestBtn">GO!</button>
        </div>

        <div class="sq-counter">Squeezer #2 [TEST]</div>
        <div class="sq-indicator">Focus: <span class="highlight">Do / Does</span></div>
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
            display.innerText = "CHALLENGE COMPLETE!";
            display.style.color = "#f1c40f";
            timerDisplay.style.display = "none";
        }
    }

    function updateSlide(index) {
        display.style.opacity = '0';
        display.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            display.innerText = questions[index];
            display.style.opacity = '1';
            display.style.transform = 'scale(1)';
            
            // تشغيل الصوت
            const audioPath = `data/Squeezer/${folderNumber}/${index + 1}.mp3`;
            audioPlayer.src = audioPath;
            audioPlayer.play().catch(e => {});
            
            // بدء التايمر
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
