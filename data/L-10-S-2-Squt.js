(function() {
    const container = document.getElementById('stage-content');
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

    container.innerHTML = '';
    container.style.cssText = `height:100%; width:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; background:#050505; color:#fff; font-family:'Segoe UI', sans-serif; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            .sq-counter { position:absolute; top:40px; left:60px; font-size:1.5vw; color:#c5a059; font-weight:900; letter-spacing:3px; }
            .sq-indicator { position:absolute; top:40px; right:60px; font-size:1.2vw; border:2px solid #c5a059; padding:8px 20px; border-radius:50px; color:#c5a059; font-weight:bold; }
            
            .sq-question { 
                font-size:5vw; text-align:center; max-width:85%; line-height:1.2; font-weight:900; 
                color:#ffffff; text-shadow: 0 10px 30px rgba(0,0,0,1); display:none; 
                animation: vetoPop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                text-transform: uppercase;
            }

            .test-timer-container {
                position: relative; width: 150px; height: 150px; display: none; margin-top: 5vh;
            }
            .timer-svg { transform: rotate(-90deg); width: 150px; height: 150px; }
            .timer-bg { fill: none; stroke: #222; stroke-width: 8; }
            .timer-bar { fill: none; stroke: #c5a059; stroke-width: 8; stroke-dasharray: 440; stroke-dashoffset: 0; transition: stroke-dashoffset 1s linear; }
            .timer-text { 
                position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
                font-size: 4vw; font-weight: 900; color: #c5a059;
            }

            .go-overlay { position:absolute; inset:0; background:#050505; display:flex; flex-direction:column; justify-content:center; align-items:center; z-index:100; }
            .go-btn { 
                background:#c5a059; color:#000; border:none; padding:30px 100px; font-size:4vw; 
                cursor:pointer; border-radius:100px; font-weight:900; 
                box-shadow: 0 15px 40px rgba(197,160,89,0.3); transition:0.2s; 
            }
            .go-btn:hover { transform: scale(1.05); filter: brightness(1.1); }

            .highlight { color: #c5a059; border-bottom: 4px solid #c5a059; }
            
            @keyframes vetoPop { from { opacity:0; transform:scale(0.8); } to { opacity:1; transform:scale(1); } }
        </style>
        
        <div class="go-overlay" id="goOverlay">
            <h1 style="margin-bottom:40px; font-size:3vw; color:#fff; text-align:center; letter-spacing:5px;">
                HAVE / HAS<br><span style="color:#c5a059; font-size:5vw;">POSSESSION TEST</span>
            </h1>
            <button class="go-btn" id="startTestBtn">START TEST</button>
        </div>

        <div class="sq-counter">SQUEEZER TEST #${folderNumber}</div>
        <div class="sq-indicator">MODE: <span style="color:#fff">AUTO-SPEED</span></div>
        <div id="sqQuestionDisplay" class="sq-question"></div>
        
        <div class="test-timer-container" id="timerContainer">
            <svg class="timer-svg">
                <circle class="timer-bg" cx="75" cy="75" r="70"></circle>
                <circle id="timerBar" class="timer-bar" cx="75" cy="75" r="70"></circle>
            </svg>
            <div class="timer-text" id="sqTimerDisplay">2</div>
        </div>

        <audio id="sqAudioPlayer"></audio>
    `;

    const display = document.getElementById('sqQuestionDisplay');
    const timerDisplay = document.getElementById('sqTimerDisplay');
    const timerBar = document.getElementById('timerBar');
    const audioPlayer = document.getElementById('sqAudioPlayer');
    const goOverlay = document.getElementById('goOverlay');
    const startBtn = document.getElementById('startTestBtn');
    const timerContainer = document.getElementById('timerContainer');

    function startTimer() {
        let timeLeft = 2;
        timerDisplay.innerText = timeLeft;
        timerBar.style.strokeDashoffset = 0;
        
        if (countdownInterval) clearInterval(countdownInterval);
        
        countdownInterval = setInterval(() => {
            timeLeft--;
            // تحريك حلقة الوقت
            const offset = 440 - (timeLeft * 220); 
            timerBar.style.strokeDashoffset = offset;

            if (timeLeft >= 0) {
                timerDisplay.innerText = timeLeft;
            } else {
                clearInterval(countdownInterval);
                nextQuestion();
            }
        }, 1000);
    }

    function formatQuestion(text) {
        const words = text.split(' ');
        if (words.length > 0) words[0] = `<span class="highlight">${words[0]}</span>`;
        return words.join(' ');
    }

    function nextQuestion() {
        if (currentIdx < questions.length - 1) {
            currentIdx++;
            updateSlide(currentIdx);
        } else {
            clearInterval(countdownInterval);
            display.innerHTML = "MISSION COMPLETE!";
            display.style.color = "#c5a059";
            timerContainer.style.display = "none";
            if (window.triggerVetoDone) window.triggerVetoDone();
        }
    }

    function updateSlide(index) {
        display.innerHTML = formatQuestion(questions[index]);
        
        // تشغيل الصوت
        const audioPath = `data/Squeezer/${folderNumber}/${index + 1}.wav`;
        audioPlayer.src = audioPath;
        audioPlayer.play().catch(e => {});
        
        startTimer();
    }

    startBtn.onclick = () => {
        goOverlay.style.display = 'none';
        display.style.display = 'block';
        timerContainer.style.display = 'block';
        updateSlide(0);
    };

})();
