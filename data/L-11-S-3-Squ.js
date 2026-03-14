(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // --- قاعدة بيانات الأسئلة (Can - Could) ---
    const questions = [
        "Can you swim?", "Could you walk when you were one year old?", "Can birds fly?",
        "Could you speak English five years ago?", "Can cats climb trees?", "Could you open the window for me, please?",
        "Can you play the piano?", "Could dinosaurs fly?", "Can an elephant jump?",
        "Could you drive a car when you were ten?", "Can you see the stars tonight?", "Could you help me with my bag?",
        "Can snakes run?", "Could you read when you were four?", "Can you speak three languages?",
        "Could your grandfather use a smartphone?", "Can we go to the park today?", "Could you sleep well last night?",
        "Can robots feel emotions?", "Could you whistle when you were a child?", "Can you cook a delicious meal?",
        "Could you find your keys this morning?", "Can fish breathe outside water?", "Could you run faster than your friend?",
        "Can you lend me your pen?", "Could you see the moon yesterday?", "Can tigers swim?",
        "Could you finish the work on time?", "Can we live without water?", "Could you understand me?"
    ];

    let currentIdx = 0;
    const folderNumber = 6;

    container.innerHTML = '';
    container.style.cssText = `height:calc(100vh - 200px); display:flex; flex-direction:column; justify-content:center; align-items:center; background:#002b1b; color:#fff; font-family: 'Trebuchet MS', sans-serif; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            .sq-counter { position:absolute; top:30px; left:50px; font-size:1.5rem; color:#2ecc71; font-weight:bold; text-shadow: 0 0 10px rgba(46, 204, 113, 0.5); }
            .sq-question { font-size:5.2rem; text-align:center; max-width:85%; line-height:1.2; font-weight:900; color:#ffffff; text-shadow: 4px 4px 0px #27ae60; transition: all 0.3s ease; }
            .sq-controls { position:absolute; bottom:50px; display:flex; gap:25px; }
            .sq-btn { background:#2ecc71; color:#002b1b; border:none; padding:15px 45px; font-size:1.3rem; cursor:pointer; border-radius:30px; font-weight:bold; box-shadow: 0 6px 0 #27ae60; }
            .sq-btn:active { transform: translateY(3px); box-shadow: 0 3px 0 #27ae60; }
            .sq-indicator { position:absolute; top:30px; right:50px; font-size:1.3rem; border: 2px solid #2ecc71; padding:8px 20px; border-radius:50px; color:#2ecc71; }
        </style>
        
        <div class="sq-counter">Squeezer #6 - FINAL</div>
        <div class="sq-indicator">Skill: <span style="font-weight:bold">Can / Could</span></div>
        <div id="sqQuestionDisplay" class="sq-question">${questions[currentIdx]}</div>
        
        <div class="sq-controls">
            <button class="sq-btn" id="sqPrev">PREVIOUS</button>
            <button class="sq-btn" id="sqNext">NEXT QUESTION</button>
        </div>
        <audio id="sqAudioPlayer"></audio>
    `;

    const display = document.getElementById('sqQuestionDisplay');
    const audioPlayer = document.getElementById('sqAudioPlayer');
    const btnNext = document.getElementById('sqNext');
    const btnPrev = document.getElementById('sqPrev');

    function updateSlide(index) {
        display.style.opacity = '0';
        display.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            display.innerText = questions[index];
            display.style.opacity = '1';
            display.style.transform = 'translateX(0)';
        }, 150);

        const audioPath = `data/Squeezer/${folderNumber}/${index + 1}.mp3`;
        audioPlayer.src = audioPath;
        audioPlayer.play().catch(e => {});
    }

    btnNext.onclick = () => {
        if (currentIdx < questions.length - 1) {
            currentIdx++;
            updateSlide(currentIdx);
        } else {
            display.innerHTML = "<span style='color:#2ecc71'>SQUEEZER MASTERED!</span>";
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
