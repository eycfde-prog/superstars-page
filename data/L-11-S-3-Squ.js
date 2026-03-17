(function() {
    const container = document.getElementById('stage-content');
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
    container.style.cssText = `height:100%; width:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; background:#021a11; color:#fff; font-family: 'Segoe UI', sans-serif; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            .sq-header { position:absolute; top:40px; width:90%; display:flex; justify-content:space-between; align-items:center; z-index:10; }
            .sq-title { font-size:1.5vw; color:#2ecc71; font-weight:900; letter-spacing:5px; text-transform:uppercase; }
            .sq-indicator { border: 2px solid #2ecc71; padding:10px 30px; border-radius:100px; color:#fff; font-weight:bold; font-size:1.2vw; }
            
            .sq-question-container { text-align:center; width:85%; min-height:300px; display:flex; align-items:center; justify-content:center; }
            .sq-question { 
                font-size:7.5vw; 
                line-height:1.1; 
                font-weight:900; 
                color:#ffffff; 
                text-shadow: 0 10px 30px rgba(0,0,0,0.5);
                transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            
            .sq-controls { position:absolute; bottom:60px; display:flex; gap:30px; z-index:10; }
            .sq-btn { 
                background:#2ecc71; color:#000; border:none; padding:20px 60px; 
                font-size:1.5vw; cursor:pointer; border-radius:100px; font-weight:900; 
                transition:0.3s; text-transform:uppercase; box-shadow: 0 10px 20px rgba(46,204,113,0.2);
            }
            .sq-btn:hover { transform: translateY(-5px); filter: brightness(1.2); box-shadow: 0 15px 30px rgba(46,204,113,0.4); }
            .sq-btn:active { transform: translateY(0); }
            .sq-btn-prev { background:transparent; color:#2ecc71; border: 2px solid #2ecc71; }

            .progress-dots { position:absolute; bottom:20px; display:flex; gap:8px; }
            .dot { width:8px; height:8px; background:rgba(46,204,113,0.2); border-radius:50%; transition:0.3s; }
            .dot.active { background:#2ecc71; transform:scale(1.5); box-shadow: 0 0 10px #2ecc71; }
        </style>
        
        <div class="sq-header">
            <div class="sq-title">Squeezer #6 • Level 11</div>
            <div class="sq-indicator">Target: <span style="color:#2ecc71">Can & Could</span></div>
        </div>

        <div class="sq-question-container">
            <div id="sqQuestionDisplay" class="sq-question">${questions[currentIdx]}</div>
        </div>
        
        <div class="sq-controls">
            <button class="sq-btn sq-btn-prev" id="sqPrev">Back</button>
            <button class="sq-btn" id="sqNext">Next Question</button>
        </div>

        <div class="progress-dots" id="dotContainer"></div>
        <audio id="sqAudioPlayer"></audio>
    `;

    const display = document.getElementById('sqQuestionDisplay');
    const audioPlayer = document.getElementById('sqAudioPlayer');
    const btnNext = document.getElementById('sqNext');
    const btnPrev = document.getElementById('sqPrev');
    const dotContainer = document.getElementById('dotContainer');

    // إنشاء نقاط التقدم
    questions.forEach((_, i) => {
        const d = document.createElement('div');
        d.className = 'dot';
        dotContainer.appendChild(d);
    });

    function updateSlide(index) {
        // تحديث النقاط
        document.querySelectorAll('.dot').forEach((d, i) => {
            d.className = i === index ? 'dot active' : 'dot';
        });

        display.style.opacity = '0';
        display.style.transform = 'scale(0.8) translateY(20px)';
        
        setTimeout(() => {
            display.innerText = questions[index];
            display.style.opacity = '1';
            display.style.transform = 'scale(1) translateY(0)';
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
            display.innerHTML = "<span style='color:#2ecc71; font-size:6vw;'>SQUEEZER MASTERED!</span>";
            if (window.triggerVetoDone) window.triggerVetoDone();
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
