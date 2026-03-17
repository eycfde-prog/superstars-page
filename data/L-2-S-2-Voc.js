(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:flex; align-items:center; justify-content:center; background:#050505; overflow:hidden; position:relative; font-family: 'Segoe UI', sans-serif;`;

    let currentPairIndex = 0;
    let showOpposite = false;
    const sessionFolder = "Adjectives1"; 

    const adjectives = [
        { a: "Big", o: "Small" }, { a: "Tall", o: "Short" }, { a: "Fast", o: "Slow" },
        { a: "Hot", o: "Cold" }, { a: "Happy", o: "Sad" }, { a: "Good", o: "Bad" },
        { a: "Expensive", o: "Cheap" }, { a: "New", o: "Old" }, { a: "Rich", o: "Poor" },
        { a: "Strong", o: "Weak" }, { a: "Clean", o: "Dirty" }, { a: "Heavy", o: "Light" },
        { a: "Hard", o: "Soft" }, { a: "Long", o: "Short" }, { a: "Wide", o: "Narrow" },
        { a: "Full", o: "Empty" }, { a: "Safe", o: "Dangerous" }, { a: "Easy", o: "Difficult" },
        { a: "Useful", o: "Useless" }, { a: "Brave", o: "Coward" }, { a: "Healthy", o: "Sick" },
        { a: "Early", o: "Late" }, { a: "Beautiful", o: "Ugly" }, { a: "Right", o: "Wrong" },
        { a: "Young", o: "Old" }
    ];

    function playSound(wordNum) {
        const audioPath = `data/vocab/${sessionFolder}/${wordNum}.mp3`;
        const audio = new Audio(audioPath);
        audio.play().catch(e => console.log("Audio file missing"));
    }

    function render() {
        const pair = adjectives[currentPairIndex];
        const progress = ((currentPairIndex + 1) / adjectives.length) * 100;

        container.innerHTML = `
            <style>
                .voc-wrapper { width:100%; display:flex; flex-direction:column; align-items:center; gap:80px; }
                .voc-progress-container { position:absolute; top:0; left:0; width:100%; height:6px; background:#111; }
                .voc-progress-bar { width:${progress}%; height:100%; background:#c5a059; transition:0.3s; box-shadow:0 0 15px #c5a059; }
                
                .voc-pair-info { font-size:1.2vw; color:#444; font-weight:bold; letter-spacing:5px; text-transform:uppercase; }
                
                .voc-main-area { display:flex; justify-content:center; align-items:center; width:100%; gap:5vw; }
                
                .word-box { font-size:9vw; font-weight:900; text-transform:uppercase; transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
                .word-primary { color:#fff; text-shadow: 0 10px 30px rgba(0,0,0,0.5); }
                .word-opposite { color:#c5a059; text-shadow: 0 0 40px rgba(197, 160, 89, 0.3); }
                
                .versus-sign { 
                    font-size:5vw; color:#ef4444; font-style:italic; font-weight:900;
                    opacity:${showOpposite ? 1 : 0}; 
                    transform: scale(${showOpposite ? 1 : 0.5}) rotate(${showOpposite ? -10 : 0}deg); 
                    transition:0.4s;
                    text-shadow: 0 0 20px #ef4444;
                }

                .hint { position:absolute; bottom:40px; color:#222; font-size:0.9vw; letter-spacing:2px; text-transform:uppercase; }
            </style>

            <div class="voc-progress-container"><div class="voc-progress-bar"></div></div>
            
            <div class="voc-wrapper">
                <div class="voc-pair-info">Adjective Pair ${currentPairIndex + 1} / ${adjectives.length}</div>
                
                <div class="voc-main-area">
                    <div class="word-box word-primary">${pair.a || pair.g}</div>

                    <div class="versus-sign">VS</div>

                    <div class="word-box word-opposite" style="opacity:${showOpposite ? 1 : 0}; transform: translateX(${showOpposite ? 0 : 50}px);">
                        ${pair.o}
                    </div>
                </div>

                <div class="hint">Space: Reveal Opposite | Arrows: Navigate</div>
            </div>
        `;

        // تشغيل الصوت تلقائياً عند الرندر
        const soundNum = showOpposite ? (currentPairIndex * 2) + 2 : (currentPairIndex * 2) + 1;
        playSound(soundNum);
    }

    document.onkeydown = (e) => {
        if (e.keyCode === 32) { // SPACE
            if (!showOpposite) {
                showOpposite = true;
                render();
            }
        } else if (e.keyCode === 39) { // NEXT
            if (currentPairIndex < adjectives.length - 1) {
                currentPairIndex++;
                showOpposite = false;
                render();
            } else {
                if(window.triggerVetoDone) window.triggerVetoDone();
            }
        } else if (e.keyCode === 37) { // PREV
            if (currentPairIndex > 0) {
                currentPairIndex--;
                showOpposite = false;
                render();
            }
        }
    };

    render();
})();
