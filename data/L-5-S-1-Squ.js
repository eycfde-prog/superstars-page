(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // --- قاعدة بيانات الأسئلة (Do & Does) ---
    const questions = [
        "Do you speak English every day?",
        "Does your father work in an office?",
        "Do lions eat grass?",
        "Does it rain in the desert?",
        "Do we have a lesson tomorrow?",
        "Does your mother cook delicious food?",
        "Do cats like swimming?",
        "Does the sun rise in the morning?",
        "Do you live in a big house?",
        "Does a supermarket sell shoes?",
        "Do your friends play video games?",
        "Does fish breathe underwater?",
        "Do you want to be a doctor?",
        "Does your phone have a camera?",
        "Do birds fly in the sky?",
        "Does 2 + 2 equal 5?",
        "Do cows produce milk?",
        "Does a pilot fly a plane?",
        "Do you drink coffee in the morning?",
        "Does your best friend speak French?",
        "Do children like chocolate?",
        "Does the moon shine during the day?",
        "Do you understand the lesson?",
        "Does a spider have six legs?",
        "Do people wear coats in summer?",
        "Does a mechanic fix cars?",
        "Do you sleep early?",
        "Does water boil at 100°C?",
        "Do we need oxygen to breathe?",
        "Does a clock tell the time?"
    ];

    let currentIdx = 0;
    const totalQuestions = questions.length;
    const folderNumber = 2; // المجلد الخاص بـ Do & Does

    // --- التنسيق البصري ---
    container.innerHTML = '';
    container.style.cssText = `height:calc(100vh - 200px); display:flex; flex-direction:column; justify-content:center; align-items:center; background:#0a0a0a; color:#fff; font-family: 'Arial Black', sans-serif; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            .sq-counter { position:absolute; top:30px; left:50px; font-size:1.5rem; color:#e74c3c; font-weight:bold; text-transform:uppercase; letter-spacing:2px; }
            .sq-question { font-size:5.5rem; text-align:center; max-width:85%; line-height:1.1; font-weight:900; text-shadow: 4px 4px 15px rgba(0,0,0,0.8); transition: transform 0.3s ease, opacity 0.3s ease; }
            .sq-controls { position:absolute; bottom:50px; display:flex; gap:25px; }
            .sq-btn { background:#2980b9; color:white; border:none; padding:18px 45px; font-size:1.3rem; cursor:pointer; border-radius:12px; font-weight:bold; box-shadow: 0 5px 0 #1c5982; transition:0.1s; }
            .sq-btn:active { transform: translateY(4px); box-shadow: 0 1px 0 #1c5982; }
            .sq-indicator { position:absolute; top:30px; right:50px; font-size:1.3rem; border: 2px solid #2980b9; padding:8px 20px; border-radius:30px; font-weight:bold; }
            .highlight { color: #f1c40f; }
        </style>
        
        <div class="sq-counter">Squeezer #2</div>
        <div class="sq-indicator">Focus: <span class="highlight">Do / Does</span></div>
        <div id="sqQuestionDisplay" class="sq-question">${questions[currentIdx]}</div>
        
        <div class="sq-controls">
            <button class="sq-btn" id="sqPrev">PREV</button>
            <button class="sq-btn" id="sqNext">NEXT QUESTION</button>
        </div>
        <audio id="sqAudioPlayer"></audio>
    `;

    const display = document.getElementById('sqQuestionDisplay');
    const audioPlayer = document.getElementById('sqAudioPlayer');
    const btnNext = document.getElementById('sqNext');
    const btnPrev = document.getElementById('sqPrev');

    function updateSlide(index) {
        // تأثير انتقال بسيط
        display.style.opacity = '0';
        display.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            display.innerText = questions[index];
            display.style.opacity = '1';
            display.style.transform = 'scale(1)';
        }, 150);

        // تشغيل الصوت من المجلد رقم 2
        // المسار: data/Squeezer/2/1.mp3 ...
        const audioPath = `data/Squeezer/${folderNumber}/${index + 1}.mp3`;
        audioPlayer.src = audioPath;
        audioPlayer.play().catch(e => console.log("Audio waiting for user interaction."));
    }

    // التنقل للأمام
    btnNext.onclick = () => {
        if (currentIdx < totalQuestions - 1) {
            currentIdx++;
            updateSlide(currentIdx);
        } else {
            display.innerText = "CHALLENGE COMPLETE!";
            display.style.color = "#f1c40f";
        }
    };

    // التنقل للخلف
    btnPrev.onclick = () => {
        if (currentIdx > 0) {
            currentIdx--;
            updateSlide(currentIdx);
            display.style.color = "#fff";
        }
    };

    // التحكم بالأسهم للمسترك عز (سهولة وسرعة)
    document.onkeydown = (e) => {
        if (e.key === "ArrowRight" || e.key === " ") {
            e.preventDefault();
            btnNext.click();
        }
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            btnPrev.click();
        }
    };

    // تشغيل السؤال الأول عند تحميل الملف
    updateSlide(0);

})();
