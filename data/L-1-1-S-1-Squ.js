(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    const questions = [
        "Have you got a car?", "Has your father got a laptop?", "Have we finished the lesson yet?",
        "Has it rained today?", "Have your friends arrived yet?", "Has a spider got eight legs?",
        "Have you ever eaten sushi?", "Has your mother cooked lunch?", "Have you seen my keys?",
        "Has the movie started?", "Have they lived here for a long time?", "Has your best friend got a sister?",
        "Have you bought a new phone?", "Has a bird got wings?", "Have you ever been to Paris?",
        "Has the teacher checked your homework?", "Have we got enough water?", "Has the cat caught the mouse?",
        "Have you lost your wallet?", "Has your brother got a job?", "Have you understood the rule?",
        "Has a week got seven days?", "Have you washed your hands?", "Has the price of gold increased?",
        "Have you ever seen a ghost?", "Has your phone got a full battery?", "Have we met before?",
        "Has the rain stopped?", "Have you done your best today?", "Has the winter arrived?"
    ];

    let currentIdx = 0;
    const folderNumber = 5;

    container.innerHTML = '';
    container.style.cssText = `height:100%; width:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; background:#050505; color:#fff; font-family:'Segoe UI', sans-serif; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            .sq-counter { position:absolute; top:40px; left:60px; font-size:2vw; color:#c5a059; font-weight:900; letter-spacing:3px; }
            .sq-indicator { position:absolute; top:40px; right:60px; font-size:1.5vw; border: 2px solid #c5a059; padding:10px 25px; border-radius:50px; color:#c5a059; font-weight:bold; }
            
            .sq-question { 
                font-size:6vw; 
                text-align:center; 
                max-width:85%; 
                line-height:1.1; 
                font-weight:900; 
                color:#ffffff; 
                text-shadow: 0 10px 30px rgba(0,0,0,1); 
                transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                text-transform: uppercase;
            }
            
            .sq-controls { position:absolute; bottom:60px; display:flex; gap:30px; }
            .sq-btn { 
                background:#111; 
                color:#c5a059; 
                border:2px solid #c5a059; 
                padding:15px 50px; 
                font-size:1.5vw; 
                cursor:pointer; 
                border-radius:50px; 
                font-weight:bold; 
                transition: 0.3s;
            }
            .sq-btn:hover { background:#c5a059; color:#000; box-shadow: 0 0 30px rgba(197,160,89,0.4); }
            
            .highlight-word { color: #c5a059; text-decoration: underline; }
        </style>
        
        <div class="sq-counter">SQUEEZER #${folderNumber}</div>
        <div class="sq-indicator">FOCUS: <span style="color:#fff">HAVE / HAS</span></div>
        <div id="sqQuestionDisplay" class="sq-question"></div>
        
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

    function formatQuestion(text) {
        // تلوين أول كلمة (Have/Has) تلقائياً بالذهبي
        const words = text.split(' ');
        if (words.length > 0) {
            words[0] = `<span class="highlight-word">${words[0]}</span>`;
        }
        return words.join(' ');
    }

    function updateSlide(index) {
        display.style.opacity = '0';
        display.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            display.innerHTML = formatQuestion(questions[index]);
            display.style.opacity = '1';
            display.style.transform = 'scale(1)';
        }, 200);

        const audioPath = `data/Squeezer/${folderNumber}/${index + 1}.mp3`;
        audioPlayer.src = audioPath;
        audioPlayer.play().catch(e => console.log("Audio not ready"));
    }

    btnNext.onclick = () => {
        if (currentIdx < questions.length - 1) { 
            currentIdx++; 
            updateSlide(currentIdx); 
        } else {
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
        if (e.key === "ArrowRight" || e.key === " ") {
            e.preventDefault();
            btnNext.click();
        }
        if (e.key === "ArrowLeft") {
            btnPrev.click();
        }
    };

    // التشغيل الأول
    updateSlide(0);
})();
