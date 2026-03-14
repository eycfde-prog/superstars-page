(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // --- قاعدة بيانات الأسئلة (Was - Were - Did) ---
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
    const folderNumber = 3; // المجلد الخاص بالماضي

    // --- التنسيق البصري ---
    container.innerHTML = '';
    container.style.cssText = `height:calc(100vh - 200px); display:flex; flex-direction:column; justify-content:center; align-items:center; background:#041421; color:#eee; font-family: 'Segoe UI', sans-serif; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            .sq-counter { position:absolute; top:30px; left:50px; font-size:1.5rem; color:#f1c40f; font-weight:bold; letter-spacing:1px; }
            .sq-indicator { position:absolute; top:30px; right:50px; font-size:1.3rem; background:rgba(241,196,15,0.15); padding:10px 25px; border-radius:15px; border-left: 5px solid #f1c40f; }
            .sq-question { font-size:5.2rem; text-align:center; max-width:85%; line-height:1.15; font-weight:900; text-shadow: 0 10px 20px rgba(0,0,0,0.6); display:none; transition: all 0.3s ease; }
            .test-timer { font-size:4rem; color:#f1c40f; font-weight:bold; margin-top:30px; width:110px; height:110px; border: 5px solid #f1c40f; border-radius:50%; display:none; align-items:center; justify-content:center; box-shadow: 0 0 20px rgba(241,196,15,0.3); }
            .go-overlay { position:absolute; inset:0; background:rgba(4, 20, 33, 0.98); display:flex; flex-direction:column; justify-content:center; align-items:center; z-index:100; }
            .go-btn { background:#f1c40f; color:#041421; border:none; padding:30px 90px; font-size:3.5rem; cursor:pointer; border-radius:50px; font-weight:900; box-shadow: 0 10px 20px rgba(241,196,15,0.4); transition:0.2s; }
            .go-btn:active { transform:translateY(5px); box-shadow: 0 5px 10px rgba(241,196,15,0.4); }
            .past-tag { color: #f1c40f; font-weight: bold; }
        </style>
        
        <div class="go-overlay" id="goOverlay">
            <h1 style="margin-bottom:30px; font-size:3rem; color:#fff;">PAST TENSE <span class="past-tag">SPEED TEST</span></h1>
            <button class="go-btn" id="startTestBtn">GO!</button>
        </div>

        <div class="sq-counter">Squeezer #3 [TEST MODE]</div>
        <div class="sq-indicator">History: <span class="past-tag">Was - Were - Did</span></div>
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
            display.innerHTML = "<span style='color:#f1c40f'>TEST COMPLETE!</span>";
            timerDisplay.style.display = "none";
        }
    }

    function updateSlide(index) {
        display.style.opacity = '0';
        display.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            display.innerText = questions[index];
            display.style.opacity = '1';
            display.style.transform = 'translateY(0)';
            
            // تشغيل الصوت من مجلد رقم 3
            const audioPath = `data/Squeezer/${folderNumber}/${index + 1}.mp3`;
            audioPlayer.src = audioPath;
            audioPlayer.play().catch(e => {});
            
            // بدء تايمر الـ 2 ثانية
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
