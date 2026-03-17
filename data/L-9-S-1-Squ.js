(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    const questions = [
        "Will you travel abroad next year?", "Would you like a cup of coffee?", "Will it rain tomorrow?",
        "Would you live on the moon if you could?", "Will robots replace teachers in the future?", "Would you help a stranger in need?",
        "Will you be famous one day?", "Would you buy a Ferrari if you were rich?", "Will your friends come to the party?",
        "Would you eat insects for a million dollars?", "Will you finish your homework tonight?", "Would you prefer to be invisible?",
        "Will the sun rise at 6 AM tomorrow?", "Would you like to meet a famous person?", "Will people live on Mars in 2050?",
        "Would you go to the party if I invited you?", "Will you study English next weekend?", "Would you stay up late for a movie?",
        "Will the prices go down next month?", "Would you travel back in time if possible?", "Will you open the door for me, please?",
        "Would you rather have tea than juice?", "Will your father be at work tomorrow?", "Would you change your name if you could?",
        "Will you be 30 years old next year?", "Would you like to be a millionaire?", "Will the movie start on time?",
        "Would you mind helping me with this?", "Will we use flying cars soon?", "Would you forgive a friend who lied?"
    ];

    let currentIdx = 0;
    const folderNumber = 4; 

    container.innerHTML = '';
    container.style.cssText = `height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; background:#010409; color:#00f2ff; font-family: 'Courier New', monospace; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            @keyframes neonPulse {
                0% { text-shadow: 0 0 10px #00f2ff, 0 0 20px #00f2ff; }
                50% { text-shadow: 0 0 20px #00f2ff, 0 0 40px #00f2ff, 0 0 60px #ff00ea; }
                100% { text-shadow: 0 0 10px #00f2ff, 0 0 20px #00f2ff; }
            }
            .sq-counter { position:absolute; top:40px; left:50px; font-size:1.2rem; color:#ff00ea; font-weight:bold; letter-spacing:3px; }
            .sq-indicator { position:absolute; top:40px; right:50px; font-size:1.1rem; color:#00f2ff; border: 1px solid #00f2ff; padding:8px 20px; text-transform:uppercase; background:rgba(0,242,255,0.05); }
            .sq-question { font-size:5.2rem; text-align:center; max-width:80%; line-height:1.2; font-weight:900; animation: neonPulse 3s infinite; transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
            .sq-controls { position:absolute; bottom:60px; display:flex; gap:40px; }
            .sq-btn { 
                background:transparent; color:#00f2ff; border:1px solid #00f2ff; 
                padding:12px 40px; font-size:1rem; cursor:pointer; 
                text-transform:uppercase; letter-spacing:2px; transition:0.3s;
            }
            .sq-btn:hover { background:#00f2ff; color:#000; box-shadow: 0 0 30px #00f2ff; }
            .sq-btn:active { transform: scale(0.95); }
            .progress-line { position:absolute; bottom:0; left:0; height:3px; background:#ff00ea; transition:0.4s; width:0%; box-shadow: 0 0 15px #ff00ea; }
        </style>
        
        <div class="sq-counter">SYSTEM: SQUEEZER_04</div>
        <div class="sq-indicator">CORE: WILL vs WOULD</div>
        <div id="sqDisplay" class="sq-question"></div>
        <div id="progress" class="progress-line"></div>
        
        <div class="sq-controls">
            <button class="sq-btn" id="sqPrev">Back</button>
            <button class="sq-btn" id="sqNext">Next_Data</button>
        </div>
        <audio id="sqAudio"></audio>
    `;

    const display = document.getElementById('sqDisplay');
    const audioPlayer = document.getElementById('sqAudio');
    const btnNext = document.getElementById('sqNext');
    const btnPrev = document.getElementById('sqPrev');
    const progress = document.getElementById('progress');

    function updateSlide(index) {
        display.style.opacity = '0';
        display.style.transform = 'scale(0.9) blur(10px)';
        
        setTimeout(() => {
            display.innerText = questions[index];
            display.style.opacity = '1';
            display.style.transform = 'scale(1) blur(0)';
            progress.style.width = `${((index + 1) / questions.length) * 100}%`;
            
            const audioPath = `data/Squeezer/${folderNumber}/${index + 1}.mp3`;
            audioPlayer.src = audioPath;
            audioPlayer.play().catch(() => {});
        }, 300);
    }

    btnNext.onclick = () => {
        if (currentIdx < questions.length - 1) {
            currentIdx++;
            updateSlide(currentIdx);
        } else {
            display.style.color = "#ff00ea";
            display.innerText = "DATA_COMPLETE: LEVEL_09_READY";
        }
    };

    btnPrev.onclick = () => {
        if (currentIdx > 0) {
            currentIdx--;
            updateSlide(currentIdx);
        }
    };

    document.onkeydown = (e) => {
        if (e.key === "ArrowRight" || e.key === " ") btnNext.click();
        if (e.key === "ArrowLeft") btnPrev.click();
    };

    updateSlide(0);

})();
