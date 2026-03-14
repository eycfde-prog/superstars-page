
(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

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
    let testInterval = null;
    let countdownInterval = null;
    const folderNumber = 1;

    // --- التنسيق والبناء ---
    container.innerHTML = '';
    container.style.cssText = `height:calc(100vh - 200px); display:flex; flex-direction:column; justify-content:center; align-items:center; background:#050505; color:#fff; font-family: 'Arial', sans-serif; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            .sq-counter { position:absolute; top:30px; left:50px; font-size:1.5rem; color:#f1c40f; font-weight:bold; }
            .sq-indicator { position:absolute; top:30px; right:50px; font-size:1.2rem; background:rgba(255,255,255,0.1); padding:5px 15px; border-radius:20px; }
            .sq-question { font-size:5rem; text-align:center; max-width:90%; line-height:1.2; font-weight:800; display:none; transition: 0.3s; }
            .test-timer { font-size:4rem; color:#e74c3c; font-weight:bold; margin-top:30px; display:none; border: 4px solid #e74c3c; width:100px; height:100px; border-radius:50%; display:none; align-items:center; justify-content:center; }
            .go-overlay { position:absolute; inset:0; background:rgba(0,0,0,0.9); display:flex; flex-direction:column; justify-content:center; align-items:center; z-index:100; }
            .go-btn { background:#27ae60; color:white; border:none; padding:30px 80px; font-size:3rem; cursor:pointer; border-radius:20px; font-weight:900; box-shadow: 0 10px 0 #1e8449; transition:0.1s; }
            .go-btn:active { transform:translateY(5px); box-shadow: 0 5px 0 #1e8449; }
        </style>
        
        <div class="go-overlay" id="goOverlay">
            <h1 style="margin-bottom:30px; font-size:3rem; color:#f1c40f;">READY FOR THE TEST?</h1>
            <button class="go-btn" id="startTestBtn">GO!</button>
        </div>

        <div class="sq-counter">Squeezer #1 [TEST MODE]</div>
        <div class="sq-indicator">Target: am - is - are</div>
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
            display.innerText = "TEST COMPLETE!";
            display.style.color = "#2ecc71";
            timerDisplay.style.display = "none";
        }
    }

    function updateSlide(index) {
        // تحديث النص والصوت
        display.style.opacity = '0';
        setTimeout(() => {
            display.innerText = questions[index];
            display.style.opacity = '1';
            
            // تشغيل الصوت
            const audioPath = `data/Squeezer/${folderNumber}/${index + 1}.mp3`;
            audioPlayer.src = audioPath;
            audioPlayer.play().catch(e => {});
            
            // بدء تايمر السؤال الحالي
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
