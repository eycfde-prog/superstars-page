(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // --- قاعدة بيانات الأسئلة ---
    const questions = [
        "Are you ready for the challenge?",
        "Is Cairo the capital of Egypt?",
        "Are your parents at home now?",
        "Is it cold today?",
        "Am I your teacher for today?",
        "Is English an easy language?",
        "Are lions dangerous animals?",
        "Is your best friend a tall person?",
        "Are we in the classroom now?",
        "Is pizza your favorite food?",
        "Are lemons sweet?",
        "Is the sun a star?",
        "Are cats better than dogs?",
        "Is your phone in your pocket?",
        "Am I late for the meeting?",
        "Are shoes made of leather?",
        "Is football popular in Egypt?",
        "Are you a student at this academy?",
        "Is the ocean blue?",
        "Are spiders insects?",
        "Is Bill Gates a rich man?",
        "Are your hands clean?",
        "Is red your favorite color?",
        "Am I a good singer?",
        "Are apples healthy for us?",
        "Is a Ferrari a slow car?",
        "Are the stars visible at night?",
        "Is it 10 o'clock now?",
        "Are children afraid of ghosts?",
        "Is this your first English course?"
    ];

    let currentIdx = 0;
    const totalQuestions = questions.length;
    const folderNumber = 1; // مجلد رقم 1 الخاص بـ am, is, are

    // --- التنسيق البصري ---
    container.innerHTML = '';
    container.style.cssText = `height:calc(100vh - 200px); display:flex; flex-direction:column; justify-content:center; align-items:center; background:#0f0f0f; color:#fff; font-family: 'Arial', sans-serif; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            .sq-counter { position:absolute; top:30px; left:50px; font-size:1.5rem; color:#f1c40f; font-weight:bold; }
            .sq-question { font-size:5rem; text-align:center; max-width:90%; line-height:1.2; font-weight:800; text-shadow: 2px 2px 10px rgba(0,0,0,0.5); transition: all 0.3s ease; }
            .sq-controls { position:absolute; bottom:50px; display:flex; gap:20px; }
            .sq-btn { background:#e74c3c; color:white; border:none; padding:15px 40px; font-size:1.2rem; cursor:pointer; border-radius:10px; font-weight:bold; transition:0.2s; }
            .sq-btn:hover { background:#c0392b; transform:scale(1.05); }
            .sq-indicator { position:absolute; top:30px; right:50px; font-size:1.2rem; background:rgba(255,255,255,0.1); padding:5px 15px; border-radius:20px; }
        </style>
        
        <div class="sq-counter">Squeezer #1</div>
        <div class="sq-indicator">Target: <span style="color:#f1c40f">am - is - are</span></div>
        <div id="sqQuestionDisplay" class="sq-question">${questions[currentIdx]}</div>
        
        <div class="sq-controls">
            <button class="sq-btn" id="sqPrev">Previous</button>
            <button class="sq-btn" id="sqNext">Next Question</button>
        </div>
        <audio id="sqAudioPlayer"></audio>
    `;

    const display = document.getElementById('sqQuestionDisplay');
    const audioPlayer = document.getElementById('sqAudioPlayer');
    const btnNext = document.getElementById('sqNext');
    const btnPrev = document.getElementById('sqPrev');

    function updateSlide(index) {
        // تحديث النص
        display.style.opacity = '0';
        setTimeout(() => {
            display.innerText = questions[index];
            display.style.opacity = '1';
        }, 200);

        // تحديث وتشغيل الصوت
        // المسار: Squeezer/1/1.mp3 ... Squeezer/1/30.mp3
        const audioPath = `data/Squeezer/${folderNumber}/${index + 1}.mp3`;
        audioPlayer.src = audioPath;
        audioPlayer.play().catch(e => console.log("Audio play failed, waiting for interaction."));
    }

    // أزرار التحكم
    btnNext.onclick = () => {
        if (currentIdx < totalQuestions - 1) {
            currentIdx++;
            updateSlide(currentIdx);
        } else {
            display.innerText = "Done! Great Job!";
            display.style.color = "#2ecc71";
        }
    };

    btnPrev.onclick = () => {
        if (currentIdx > 0) {
            currentIdx--;
            updateSlide(currentIdx);
            display.style.color = "#fff";
        }
    };

    // التحكم بالأسهم في الكيبورد لتسهيل العمل عليك مستر عز
    document.onkeydown = (e) => {
        if (e.key === "ArrowRight") btnNext.click();
        if (e.key === "ArrowLeft") btnPrev.click();
    };

    // تشغيل أول صوت عند البداية
    updateSlide(0);

})();
