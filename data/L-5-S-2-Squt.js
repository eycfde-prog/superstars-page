(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

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
    const folderNumber = 2; 

    container.innerHTML = '';
    container.style.cssText = `height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; background:#050505; color:#fff; font-family: 'Inter', sans-serif; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            .sq-counter { position:absolute; top:40px; left:60px; font-size:1.2rem; color:#444; font-weight:900; letter-spacing:3px; }
            .sq-indicator { position:absolute; top:40px; right:60px; font-size:1.1rem; border: 2px solid #e74c3c; padding:8px 25px; border-radius:30px; font-weight:bold; color: #e74c3c; }
            
            .sq-question { 
                font-size:5rem; text-align:center; max-width:85%; line-height:1.1; font-weight:900; 
                display:none; transition: 0.2s; text-transform: uppercase;
            }

            .test-timer-wrap {
                position: relative; width: 140px; height: 140px; margin-top: 50px; display: none;
                justify-content: center; align-items: center;
            }

            #sqTimerDisplay { font-size: 5rem; font-weight: 900; color: #f1c40f; z-index: 5; }

            .go-overlay { position:absolute; inset:0; background:rgba(0,0,0,0.98); display:flex; flex-direction:column; justify-content:center; align-items:center; z-index:100; }
            .go-btn { 
                background:#e74c3c; color:white; border:none; padding:40px 120px; font-size:5rem; 
                cursor:pointer; border-radius:25px; font-weight:900; box-shadow: 0 15px 0 #962d22; 
                transition:0.1s; letter-spacing: -2px;
            }
            .go-btn:active { transform:translateY(8px); box-shadow: 0 7px 0 #962d22; }
            .highlight { color: #f1c40f; }
            
            @keyframes shake {
                0% { transform: translate(1px, 1px) rotate(0deg); }
                20% { transform: translate(-3px, 0px) rotate(-1deg); }
                40% { transform: translate(3px, 2px) rotate(1deg); }
                100% { transform: translate(1px, -1px) rotate(0deg); }
            }
            .urgent { color: #e74c3c !important; animation: shake 0.2s infinite; }
        </style>
        
        <div class="go-overlay" id="goOverlay">
            <h1 style="margin-bottom:50px; font-size:4rem; font-weight:900; letter-spacing:-2px;">SPEED TEST: <span class="highlight">DO / DOES</span></h1>
            <button class="go-btn" id="startTestBtn">GO!</button>
        </div>

        <div class="sq-counter">SQUEEZER LEVEL 5 [ULTRA]</div>
        <div class="sq-indicator">TIME LIMIT: <span class="highlight">2 SEC</span></div>
        
        <div id="sqQuestionDisplay" class="sq-question"></div>
        
        <div class="test-timer-wrap" id="timerWrap">
            <div id="sqTimerDisplay">2</div>
        </div>

        <audio id="sqAudioPlayer"></audio>
    `;

    const display = document.getElementById('sqQuestionDisplay');
    const timerDisplay = document.getElementById('sqTimerDisplay');
    const timerWrap = document.getElementById('timerWrap');
    const audioPlayer = document.getElementById('sqAudioPlayer');
    const goOverlay = document.getElementById('goOverlay');
    const startBtn = document.getElementById('startTestBtn');

    function startTimer() {
        let timeLeft = 2;
        timerDisplay.innerText = timeLeft;
        timerDisplay.classList.remove('urgent');
        
        if (countdownInterval) clearInterval(countdownInterval);
        
        countdownInterval = setInterval(() => {
            timeLeft--;
            if (timeLeft >= 0) {
                timerDisplay.innerText = timeLeft;
                if (timeLeft === 0) timerDisplay.classList.add('urgent');
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
            display.style.color = "#2ecc71";
            timerWrap.style.display = "none";
        }
    }

    function updateSlide(index) {
        display.style.opacity = '0';
        setTimeout(() => {
            display.innerText = questions[index];
            display.style.opacity = '1';
            
            const audioPath = `data/Squeezer/${folderNumber}/${index + 1}.wav`;
            audioPlayer.src = audioPath;
            audioPlayer.play().catch(() => {});
            
            startTimer();
        }, 50);
    }

    startBtn.onclick = () => {
        goOverlay.style.opacity = '0';
        setTimeout(() => {
            goOverlay.style.display = 'none';
            display.style.display = 'block';
            timerWrap.style.display = 'flex';
            updateSlide(0);
        }, 300);
    };

})();
