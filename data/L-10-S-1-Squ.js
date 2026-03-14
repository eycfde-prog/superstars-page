
(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // --- قاعدة بيانات الأسئلة (Will - Would) ---
    const questions = [
        "Will you travel abroad next year?",
        "Would you like a cup of coffee?",
        "Will it rain tomorrow?",
        "Would you live on the moon if you could?",
        "Will robots replace teachers in the future?",
        "Would you help a stranger in need?",
        "Will you be famous one day?",
        "Would you buy a Ferrari if you were rich?",
        "Will your friends come to the party?",
        "Would you eat insects for a million dollars?",
        "Will you finish your homework tonight?",
        "Would you prefer to be invisible?",
        "Will the sun rise at 6 AM tomorrow?",
        "Would you like to meet a famous person?",
        "Will people live on Mars in 2050?",
        "Would you go to the party if I invited you?",
        "Will you study English next weekend?",
        "Would you stay up late for a movie?",
        "Will the prices go down next month?",
        "Would you travel back in time if possible?",
        "Will you open the door for me, please?",
        "Would you rather have tea than juice?",
        "Will your father be at work tomorrow?",
        "Would you change your name if you could?",
        "Will you be 30 years old next year?",
        "Would you like to be a millionaire?",
        "Will the movie start on time?",
        "Would you mind helping me with this?",
        "Will we use flying cars soon?",
        "Would you forgive a friend who lied?"
    ];

    let currentIdx = 0;
    const totalQuestions = questions.length;
    const folderNumber = 4; // المجلد الخاص بـ Will & Would

    // --- التنسيق البصري ---
    container.innerHTML = '';
    container.style.cssText = `height:calc(100vh - 200px); display:flex; flex-direction:column; justify-content:center; align-items:center; background:#020b1a; color:#00f2ff; font-family: 'Courier New', Courier, monospace; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            .sq-counter { position:absolute; top:30px; left:50px; font-size:1.5rem; color:#ff00ea; font-weight:bold; text-shadow: 0 0 10px #ff00ea; }
            .sq-question { font-size:5rem; text-align:center; max-width:85%; line-height:1.1; font-weight:bold; text-shadow: 0 0 20px rgba(0,242,255,0.5); transition: all 0.4s ease; }
            .sq-controls { position:absolute; bottom:50px; display:flex; gap:30px; }
            .sq-btn { background:transparent; color:#00f2ff; border:2px solid #00f2ff; padding:15px 50px; font-size:1.2rem; cursor:pointer; border-radius:5px; font-weight:bold; text-transform:uppercase; transition:0.3s; }
            .sq-btn:hover { background:rgba(0,242,255,0.1); box-shadow: 0 0 20px #00f2ff; }
            .sq-indicator { position:absolute; top:30px; right:50px; font-size:1.3rem; color:#ff00ea; border: 1px solid #ff00ea; padding:10px 25px; border-radius:4px; box-shadow: inset 0 0 10px #ff00ea; }
        </style>
        
        <div class="sq-counter">Squeezer #4</div>
        <div class="sq-indicator">Target: Will / Would</div>
        <div id="sqQuestionDisplay" class="sq-question">${questions[currentIdx]}</div>
        
        <div class="sq-controls">
            <button class="sq-btn" id="sqPrev">Go Back</button>
            <button class="sq-btn" id="sqNext">Next Step</button>
        </div>
        <audio id="sqAudioPlayer"></audio>
    `;

    const display = document.getElementById('sqQuestionDisplay');
    const audioPlayer = document.getElementById('sqAudioPlayer');
    const btnNext = document.getElementById('sqNext');
    const btnPrev = document.getElementById('sqPrev');

    function updateSlide(index) {
        display.style.filter = 'blur(10px)';
        display.style.opacity = '0';
        
        setTimeout(() => {
            display.innerText = questions[index];
            display.style.filter = 'blur(0)';
            display.style.opacity = '1';
        }, 200);

        const audioPath = `data/Squeezer/${folderNumber}/${index + 1}.mp3`;
        audioPlayer.src = audioPath;
        audioPlayer.play().catch(e => console.log("Waiting for user..."));
    }

    btnNext.onclick = () => {
        if (currentIdx < totalQuestions - 1) {
            currentIdx++;
            updateSlide(currentIdx);
        } else {
            display.style.color = "#ff00ea";
            display.innerText = "FUTURE UNLOCKED!";
        }
    };

    btnPrev.onclick = () => {
        if (currentIdx > 0) {
            currentIdx--;
            updateSlide(currentIdx);
            display.style.color = "#00f2ff";
        }
    };

    document.onkeydown = (e) => {
        if (e.key === "ArrowRight" || e.key === " ") btnNext.click();
        if (e.key === "ArrowLeft") btnPrev.click();
    };

    updateSlide(0);

})();
