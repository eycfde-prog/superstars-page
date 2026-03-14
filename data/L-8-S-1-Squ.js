(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // --- قاعدة بيانات الأسئلة (Was - Were - Did) ---
    const questions = [
        "Did you sleep well last night?",
        "Was it sunny yesterday?",
        "Were you at the cinema on Friday?",
        "Did you have breakfast this morning?",
        "Was the exam difficult?",
        "Were your friends with you at the park?",
        "Did you do your homework yesterday?",
        "Was Albert Einstein a famous scientist?",
        "Were the shops open yesterday?",
        "Did it rain two days ago?",
        "Was your first teacher a woman?",
        "Did you watch a movie last night?",
        "Were you born in Cairo?",
        "Did your father drive you to school?",
        "Was the coffee hot?",
        "Did you see your best friend today?",
        "Were the dinosaurs very big?",
        "Did you go to the beach last summer?",
        "Was the car expensive?",
        "Were you happy when you won?",
        "Did you buy new shoes recently?",
        "Was the street crowded this morning?",
        "Did you use your phone an hour ago?",
        "Were the keys on the table?",
        "Was your father angry with you?",
        "Did you eat pizza for lunch?",
        "Were we late for the lesson?",
        "Did you finish the task on time?",
        "Was Titanic a real ship?",
        "Did you like the story?"
    ];

    let currentIdx = 0;
    const totalQuestions = questions.length;
    const folderNumber = 3; // المجلد الخاص بالماضي

    // --- التنسيق البصري ---
    container.innerHTML = '';
    container.style.cssText = `height:calc(100vh - 200px); display:flex; flex-direction:column; justify-content:center; align-items:center; background:#041421; color:#eee; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            .sq-counter { position:absolute; top:30px; left:50px; font-size:1.5rem; color:#f1c40f; font-weight:bold; letter-spacing:1px; }
            .sq-question { font-size:5.2rem; text-align:center; max-width:85%; line-height:1.15; font-weight:900; text-shadow: 0 10px 20px rgba(0,0,0,0.6); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
            .sq-controls { position:absolute; bottom:50px; display:flex; gap:30px; }
            .sq-btn { background:#f1c40f; color:#041421; border:none; padding:15px 50px; font-size:1.2rem; cursor:pointer; border-radius:50px; font-weight:bold; transition:0.3s; box-shadow: 0 4px 15px rgba(241, 196, 15, 0.3); }
            .sq-btn:hover { background:#d4ac0d; transform:translateY(-2px); }
            .sq-btn:active { transform:translateY(1px); }
            .sq-indicator { position:absolute; top:30px; right:50px; font-size:1.3rem; background:rgba(241,196,15,0.15); padding:10px 25px; border-radius:15px; border-left: 5px solid #f1c40f; }
            .past-tag { color: #f1c40f; font-weight: bold; }
        </style>
        
        <div class="sq-counter">Squeezer #3</div>
        <div class="sq-indicator">History: <span class="past-tag">Was - Were - Did</span></div>
        <div id="sqQuestionDisplay" class="sq-question">${questions[currentIdx]}</div>
        
        <div class="sq-controls">
            <button class="sq-btn" id="sqPrev">Back</button>
            <button class="sq-btn" id="sqNext">Next Question</button>
        </div>
        <audio id="sqAudioPlayer"></audio>
    `;

    const display = document.getElementById('sqQuestionDisplay');
    const audioPlayer = document.getElementById('sqAudioPlayer');
    const btnNext = document.getElementById('sqNext');
    const btnPrev = document.getElementById('sqPrev');

    function updateSlide(index) {
        display.style.transform = 'translateY(20px)';
        display.style.opacity = '0';
        
        setTimeout(() => {
            display.innerText = questions[index];
            display.style.transform = 'translateY(0)';
            display.style.opacity = '1';
        }, 200);

        // المسار الصوتي لمجلد رقم 3
        const audioPath = `data/Squeezer/${folderNumber}/${index + 1}.mp3`;
        audioPlayer.src = audioPath;
        audioPlayer.play().catch(e => console.log("Audio waiting..."));
    }

    btnNext.onclick = () => {
        if (currentIdx < totalQuestions - 1) {
            currentIdx++;
            updateSlide(currentIdx);
        } else {
            display.innerHTML = "<span style='color:#f1c40f'>PAST MASTERED!</span>";
        }
    };

    btnPrev.onclick = () => {
        if (currentIdx > 0) {
            currentIdx--;
            updateSlide(currentIdx);
            display.style.color = "#eee";
        }
    };

    // التحكم بالأسهم لسهولة الإلقاء مستر عز
    document.onkeydown = (e) => {
        if (e.key === "ArrowRight") btnNext.click();
        if (e.key === "ArrowLeft") btnPrev.click();
        if (e.key === " ") btnNext.click();
    };

    updateSlide(0);

})();
