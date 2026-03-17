(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Questions Database (Do & Does) ---
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
    const folderNumber = 2; 

    container.innerHTML = '';
    container.style.cssText = `height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; background:#050505; color:#fff; font-family: 'Inter', sans-serif; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            .sq-counter { position:absolute; top:40px; left:60px; font-size:1.2rem; color:#444; font-weight:900; text-transform:uppercase; letter-spacing:4px; }
            .sq-question { 
                font-size:5.5rem; 
                text-align:center; 
                max-width:85%; 
                line-height:1; 
                font-weight:900; 
                transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                filter: drop-shadow(0 10px 20px rgba(0,0,0,0.5));
                text-transform: uppercase;
            }
            .sq-controls { position:absolute; bottom:60px; display:flex; gap:20px; }
            .sq-btn { 
                background:#111; color:#fff; border:1px solid #333; padding:20px 50px; 
                font-size:1.1rem; cursor:pointer; border-radius:15px; font-weight:900; 
                transition: 0.2s; letter-spacing:2px;
            }
            .sq-btn:hover { background: #2980b9; border-color: #3498db; }
            .sq-btn:active { transform: scale(0.95); }
            
            .sq-indicator { 
                position:absolute; top:40px; right:60px; font-size:1.1rem; 
                background:#2980b9; padding:10px 25px; border-radius:50px; 
                font-weight:bold; box-shadow: 0 0 20px rgba(41, 128, 185, 0.3);
            }
            .highlight { color: #f1c40f; }
            .finished { color: #2ecc71 !important; text-shadow: 0 0 30px #27ae60; }
        </style>
        
        <div class="sq-counter">Squeezer Level 5</div>
        <div class="sq-indicator">CORE: <span class="highlight">Do / Does</span></div>
        <div id="sqQuestionDisplay" class="sq-question">${questions[currentIdx]}</div>
        
        <div class="sq-controls">
            <button class="sq-btn" id="sqPrev">BACK</button>
            <button class="sq-btn" id="sqNext" style="background:#2980b9; border:none;">NEXT</button>
        </div>
        <audio id="sqAudioPlayer"></audio>
    `;

    const display = document.getElementById('sqQuestionDisplay');
    const audioPlayer = document.getElementById('sqAudioPlayer');
    const btnNext = document.getElementById('sqNext');
    const btnPrev = document.getElementById('sqPrev');

    function updateSlide(index) {
        display.style.opacity = '0';
        display.style.transform = 'scale(0.8) translateY(20px)';
        
        setTimeout(() => {
            display.innerText = questions[index];
            display.style.opacity = '1';
            display.style.transform = 'scale(1) translateY(0)';
            
            // Audio Path logic
            const audioPath = `data/Squeezer/${folderNumber}/${index + 1}.mp3`;
            audioPlayer.src = audioPath;
            audioPlayer.play().catch(() => console.log("Waiting for interaction..."));
        }, 150);
    }

    btnNext.onclick = () => {
        if (currentIdx < questions.length - 1) {
            currentIdx++;
            updateSlide(currentIdx);
        } else {
            display.innerText = "CHALLENGE COMPLETED!";
            display.classList.add('finished');
        }
    };

    btnPrev.onclick = () => {
        if (currentIdx > 0) {
            currentIdx--;
            display.classList.remove('finished');
            updateSlide(currentIdx);
        }
    };

    // Keyboard controls for Mr. Ezz
    document.onkeydown = (e) => {
        if (e.key === "ArrowRight" || e.key === " ") {
            e.preventDefault();
            btnNext.click();
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            btnPrev.click();
        }
    };

    updateSlide(0);
})();
