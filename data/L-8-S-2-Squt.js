(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    const questions = [
        "Did you sleep well last night?", "Was it sunny yesterday?", "Were you at the cinema on Friday?",
        "Did you have breakfast this morning?", "Was the exam difficult?", "Were your friends with you at the park?",
        "Did you do your homework yesterday?", "Was Albert Einstein a famous scientist?", "Were the shops open yesterday?",
        "Did it rain two days ago?", "Was your first teacher a woman?", "Did you watch a movie last night?",
        "Were you born in Cairo?", "Did your father drive you to school?", "Was the coffee hot?",
        "Did you see your best friend today?", "Were the dinosaurs very big?", "Did you go to the beach last summer?",
        "Was the car expensive?", "Were you happy when you won?", "Did you buy new shoes recently?",
        "Was the street crowded this morning?", "Did you use your phone an hour ago?", "Were the keys on the table?",
        "Was your father angry with you?", "Did you eat pizza for lunch?", "Were we late for the lesson?",
        "Did you finish the task on time?", "Was Titanic a real ship?", "Did you like the story?"
    ];

    let currentIdx = 0;
    let countdownInterval = null;
    const folderNumber = 3; 

    container.innerHTML = '';
    container.style.cssText = `height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; background:#020a10; color:#eee; font-family:'Inter', sans-serif; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            @keyframes pulseTimer {
                0% { transform: scale(1); border-color: #f1c40f; color: #f1c40f; }
                50% { transform: scale(1.1); border-color: #e74c3c; color: #e74c3c; }
                100% { transform: scale(1); border-color: #f1c40f; color: #f1c40f; }
            }
            .sq-counter { position:absolute; top:30px; left:50px; font-size:1.2rem; color:#f1c40f; font-weight:900; letter-spacing:3px; text-transform:uppercase; opacity:0.6; }
            .sq-indicator { position:absolute; top:30px; right:50px; font-size:1.1rem; background:rgba(241,196,15,0.1); padding:10px 20px; border-radius:12px; border: 1px solid rgba(241,196,15,0.3); color:#f1c40f; }
            .sq-question { font-size:5.5rem; text-align:center; max-width:85%; line-height:1.1; font-weight:900; display:none; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
            .test-timer { font-size:4.5rem; color:#f1c40f; font-weight:900; margin-top:50px; width:130px; height:130px; border: 8px solid #f1c40f; border-radius:50%; display:none; align-items:center; justify-content:center; background: rgba(0,0,0,0.3); }
            .timer-active { animation: pulseTimer 1s infinite; }
            .go-overlay { position:absolute; inset:0; background:#020a10; display:flex; flex-direction:column; justify-content:center; align-items:center; z-index:100; }
            .go-btn { background:#f1c40f; color:#000; border:none; padding:35px 110px; font-size:4rem; cursor:pointer; border-radius:20px; font-weight:900; transition:0.3s; box-shadow: 0 0 50px rgba(241, 196, 15, 0.2); }
            .go-btn:hover { background:#fff; transform: scale(1.05); }
            .past-tag { color: #f1c40f; }
            .progress-bar { position:absolute; bottom:0; left:0; height:8px; background:#f1c40f; transition:0.3s linear; width:0%; }
        </style>
        
        <div class="go-overlay" id="goOverlay">
            <h1 style="margin-bottom:10px; font-size:1.5rem; letter-spacing:10px; color:#f1c40f;">SQUEEZER #3</h1>
            <h2 style="margin-bottom:40px; font-size:3.5rem; font-weight:900; color:#fff;">PAST TENSE <span class="past-tag">SPEED TEST</span></h2>
            <button class="go-btn" id="startBtn">READY?</button>
        </div>

        <div class="sq-counter">Test Mode: 2s Interval</div>
        <div class="sq-indicator">Active: <span class="past-tag">Was / Were / Did</span></div>
        <div id="sqDisplay" class="sq-question"></div>
        <div id="sqTimer" class="test-timer">2</div>
        <div id="progressBar" class="progress-bar"></div>
        <audio id="sqAudio"></audio>
    `;

    const display = document.getElementById('sqDisplay');
    const timerDisplay = document.getElementById('sqTimer');
    const audioPlayer = document.getElementById('sqAudio');
    const goOverlay = document.getElementById('goOverlay');
    const startBtn = document.getElementById('startBtn');
    const progressBar = document.getElementById('progressBar');

    function startTimer() {
        let timeLeft = 2;
        timerDisplay.innerText = timeLeft;
        timerDisplay.classList.remove('timer-active');
        
        if (countdownInterval) clearInterval(countdownInterval);
        
        countdownInterval = setInterval(() => {
            timeLeft--;
            if (timeLeft === 1) timerDisplay.classList.add('timer-active');
            
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
            display.innerHTML = "<span style='color:#f1c40f'>MISSION ACCOMPLISHED!</span>";
            timerDisplay.style.display = "none";
            progressBar.style.width = "100%";
        }
    }

    function updateSlide(index) {
        display.style.opacity = '0';
        display.style.transform = 'translateY(30px) scale(0.9)';
        
        setTimeout(() => {
            display.innerText = questions[index];
            display.style.opacity = '1';
            display.style.transform = 'translateY(0) scale(1)';
            progressBar.style.width = `${(index / questions.length) * 100}%`;
            
            const audioPath = `data/Squeezer/${folderNumber}/${index + 1}.mp3`;
            audioPlayer.src = audioPath;
            audioPlayer.play().catch(() => {});
            
            startTimer();
        }, 250);
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
