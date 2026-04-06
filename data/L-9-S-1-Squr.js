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
    // تغيير الخلفية للون كحلي ملكي عميق
    container.style.cssText = `height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; background:radial-gradient(circle, #0a192f 0%, #020c1b 100%); color:#e6f1ff; font-family: 'Segoe UI', Roboto, sans-serif; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            .sq-header-wrapper { position:absolute; top:50px; width:90%; display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid rgba(100, 255, 218, 0.1); padding-bottom: 15px; }
            .sq-session { font-size:1rem; color:#64ffda; font-weight:bold; letter-spacing:4px; text-transform:uppercase; }
            .sq-topic { font-size:1rem; color:#8892b0; font-weight:500; }
            
            .sq-question { 
                font-size:5.5rem; 
                text-align:center; 
                max-width:85%; 
                line-height:1.2; 
                font-weight:800; 
                color: #ccd6f6;
                transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
                filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));
            }

            .sq-controls { position:absolute; bottom:80px; display:flex; gap:30px; align-items:center; }
            .sq-btn { 
                background: rgba(100, 255, 218, 0.05); 
                color:#64ffda; 
                border:1px solid #64ffda; 
                padding:15px 45px; 
                font-size:1.1rem; 
                cursor:pointer; 
                border-radius: 4px;
                text-transform:uppercase; 
                letter-spacing:2px; 
                transition:0.3s all;
                backdrop-filter: blur(5px);
            }
            .sq-btn:hover { background:rgba(100, 255, 218, 0.15); box-shadow: 0 0 20px rgba(100, 255, 218, 0.2); transform: translateY(-3px); }
            .sq-btn:active { transform: translateY(0); }
            .sq-btn-next { background:#64ffda; color:#0a192f; font-weight:bold; }
            .sq-btn-next:hover { background:#7fffdf; color:#0a192f; }

            .sq-progress-container { position:absolute; bottom:30px; width:300px; height:4px; background:rgba(255,255,255,0.05); border-radius:10px; overflow:hidden; }
            .sq-progress-bar { height:100%; background:#64ffda; width:0%; transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 0 10px #64ffda; }
            
            .sq-index-numb { margin: 0 20px; color:#8892b0; font-family:serif; font-style:italic; font-size:1.5rem; }
        </style>
        
        <div class="sq-header-wrapper">
            <div class="sq-session">Squeezer Part 04</div>
            <div class="sq-topic">Grammar Focus: Will & Would</div>
        </div>

        <div id="sqDisplay" class="sq-question"></div>
        
        <div class="sq-controls">
            <button class="sq-btn" id="sqPrev">Previous</button>
            <span class="sq-index-numb" id="sqIdxLabel">01</span>
            <button class="sq-btn sq-btn-next" id="sqNext">Next Question</button>
        </div>

        <div class="sq-progress-container">
            <div id="progress" class="sq-progress-bar"></div>
        </div>
        <audio id="sqAudio"></audio>
    `;

    const display = document.getElementById('sqDisplay');
    const audioPlayer = document.getElementById('sqAudio');
    const btnNext = document.getElementById('sqNext');
    const btnPrev = document.getElementById('sqPrev');
    const progress = document.getElementById('progress');
    const idxLabel = document.getElementById('sqIdxLabel');

    function updateSlide(index) {
        // تأثير الخروج
        display.style.opacity = '0';
        display.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            display.innerText = questions[index];
            idxLabel.innerText = (index + 1).toString().padStart(2, '0');
            
            // تأثير الدخول
            display.style.opacity = '1';
            display.style.transform = 'translateY(0)';
            
            // تحديث شريط التقدم
            progress.style.width = `${((index + 1) / questions.length) * 100}%`;
            
            // تشغيل الصوت
            const audioPath = `data/Squeezer/${folderNumber}/${index + 1}.wav`;
            audioPlayer.src = audioPath;
            audioPlayer.play().catch(() => {});
        }, 300);
    }

    btnNext.onclick = () => {
        if (currentIdx < questions.length - 1) {
            currentIdx++;
            updateSlide(currentIdx);
        } else {
            display.style.color = "#64ffda";
            display.innerText = "EXCELLENT WORK!";
            btnNext.style.display = "none";
            if(window.triggerVetoDone) window.triggerVetoDone();
        }
    };

    btnPrev.onclick = () => {
        if (currentIdx > 0) {
            btnNext.style.display = "block";
            currentIdx--;
            updateSlide(currentIdx);
        }
    };

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

    updateSlide(0);

})();
