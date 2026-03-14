(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    const questions = [
        "Have you got a car?", "Has your father got a laptop?", "Have we finished the lesson yet?",
        "Has it rained today?", "Have your friends arrived yet?", "Has a spider got eight legs?",
        "Have you ever eaten sushi?", "Has your mother cooked lunch?", "Have you seen my keys?",
        "Has the movie started?", "Have they lived here for a long time?", "Has your best friend got a sister?",
        "Have you bought a new phone?", "Has a bird got wings?", "Have you ever been to Paris?",
        "Has the teacher checked your homework?", "Have we got enough water?", "Has the cat caught the mouse?",
        "Have you lost your wallet?", "Has your brother got a job?", "Have you understood the rule?",
        "Has a week got seven days?", "Have you washed your hands?", "Has the price of gold increased?",
        "Have you ever seen a ghost?", "Has your phone got a full battery?", "Have we met before?",
        "Has the rain stopped?", "Have you done your best today?", "Has the winter arrived?"
    ];

    let currentIdx = 0;
    let countdownInterval = null;
    const folderNumber = 5;

    // --- التنسيق البصري ---
    container.innerHTML = '';
    container.style.cssText = `height:calc(100vh - 200px); display:flex; flex-direction:column; justify-content:center; align-items:center; background:#1a0f00; color:#fff; font-family: 'Verdana', sans-serif; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            .sq-counter { position:absolute; top:30px; left:50px; font-size:1.5rem; color:#ffa502; font-weight:bold; }
            .sq-indicator { position:absolute; top:30px; right:50px; font-size:1.3rem; border-bottom:3px solid #ffa502; padding:5px 10px; }
            .sq-question { font-size:5.5rem; text-align:center; max-width:85%; line-height:1.2; font-weight:bold; color:#ffffff; text-shadow: 3px 3px 0px #ffa502; display:none; }
            .test-timer { font-size:4.5rem; color:#ffa502; font-weight:bold; margin-top:40px; width:120px; height:120px; border: 6px solid #ffa502; border-radius:50%; display:none; align-items:center; justify-content:center; text-shadow: 0 0 10px rgba(255,165,2,0.5); }
            .go-overlay { position:absolute; inset:0; background:rgba(26, 15, 0, 0.98); display:flex; flex-direction:column; justify-content:center; align-items:center; z-index:100; }
            .go-btn { background:#ffa502; color:#1a0f00; border:none; padding:30px 100px; font-size:4rem; cursor:pointer; border-radius:15px; font-weight:900; box-shadow: 0 10px 0 #cc8400; transition:0.1s; }
            .go-btn:active { transform:translateY(5px); box-shadow: 0 5px 0 #cc8400; }
        </style>
        
        <div class="go-overlay" id="goOverlay">
            <h1 style="margin-bottom:40px; font-size:3.5rem; color:#fff; text-align:center;">HAVE / HAS<br><span style="color:#ffa502">POSSESSION TEST</span></h1>
            <button class="go-btn" id="startTestBtn">GO!</button>
        </div>

        <div class="sq-counter">Squeezer #5 [TEST]</div>
        <div class="sq-indicator">Target: <span style="color:#ffa502">Have / Has</span></div>
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
            display.innerText = "EXCELLENT JOB!";
            display.style.color = "#ffa502";
            timerDisplay.style.display = "none";
        }
    }

    function updateSlide(index) {
        display.style.transform = 'scale(0.8)';
        display.style.opacity = '0';
        
        setTimeout(() => {
            display.innerText = questions[index];
            display.style.transform = 'scale(1)';
            display.style.opacity = '1';
            
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
