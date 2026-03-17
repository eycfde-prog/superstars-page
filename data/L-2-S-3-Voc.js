(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:flex; align-items:center; justify-content:center; background:#050505; overflow:hidden; position:relative; font-family: 'Segoe UI', sans-serif;`;

    let currentPairIndex = 0;
    let showOpposite = false;
    const sessionFolder = "Adjectives2"; 

    const adjectives = [
        { a: "Thick", o: "Thin" }, { a: "Sharp", o: "Blunt" }, { a: "Bright", o: "Dim" },
        { a: "Loud", o: "Quiet" }, { a: "Brave", o: "Afraid" }, { a: "Clever", o: "Stupid" },
        { a: "Kind", o: "Cruel" }, { a: "Polite", o: "Impolite" }, { a: "Famous", o: "Unknown" },
        { a: "Busy", o: "Free" }, { a: "Public", o: "Private" }, { a: "Modern", o: "Ancient" },
        { a: "Natural", o: "Artificial" }, { a: "Sweet", o: "Sour" }, { a: "True", o: "False" },
        { a: "Normal", o: "Strange" }, { a: "Tight", o: "Loose" }, { a: "Rough", o: "Smooth" },
        { a: "Deep", o: "Shallow" }, { a: "Alive", o: "Dead" }, { a: "Same", o: "Different" },
        { a: "Useful", o: "Useless" }, { a: "Careful", o: "Careless" }, { a: "Visible", o: "Invisible" },
        { a: "Together", o: "Alone" }
    ];

    function playSound(wordNum) {
        const audioPath = `data/vocab/${sessionFolder}/${wordNum}.mp3`;
        const audio = new Audio(audioPath);
        audio.play().catch(e => console.log("Audio not found"));
    }

    function render() {
        const pair = adjectives[currentPairIndex];
        const progress = ((currentPairIndex + 1) / adjectives.length) * 100;

        container.innerHTML = `
            <style>
                .voc-wrapper { width:100%; display:flex; flex-direction:column; align-items:center; gap:80px; animation: fadeIn 0.4s ease; }
                .voc-progress-container { position:absolute; top:0; left:0; width:100%; height:6px; background:#111; }
                .voc-progress-bar { width:${progress}%; height:100%; background:#c5a059; transition:0.3s; box-shadow:0 0 15px #c5a059; }
                
                .voc-counter { font-size:1.2vw; color:#444; font-weight:bold; letter-spacing:5px; text-transform:uppercase; }
                
                .voc-display { display:flex; justify-content:center; align-items:center; width:100%; gap:5vw; }
                
                .word { font-size:9vw; font-weight:900; text-transform:uppercase; transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
                .primary { color:#fff; }
                .opposite { color:#c5a059; text-shadow: 0 0 30px rgba(197, 160, 89, 0.3); }
                
                .vs-badge { 
                    font-size:5vw; color:#ef4444; font-style:italic; font-weight:900;
                    opacity:${showOpposite ? 1 : 0}; 
                    transform: scale(${showOpposite ? 1 : 0.5}) rotate(${showOpposite ? -15 : 0}deg); 
                    transition:0.4s;
                    text-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
                }

                .footer-nav { position:absolute; bottom:40px; color:#222; font-size:0.9vw; letter-spacing:2px; text-transform:uppercase; }
                @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
            </style>

            <div class="voc-progress-container"><div class="voc-progress-bar"></div></div>
            
            <div class="voc-wrapper">
                <div class="voc-counter">Adjective Set B • ${currentPairIndex + 1} / ${adjectives.length}</div>
                
                <div class="voc-display">
                    <div class="word primary" style="transform: translateX(${showOpposite ? -20 : 0}px)">${pair.a}</div>

                    <div class="vs-badge">VS</div>

                    <div class="word opposite" style="opacity:${showOpposite ? 1 : 0}; transform: translateX(${showOpposite ? 20 : 60}px);">
                        ${pair.o}
                    </div>
                </div>

                <div class="footer-nav">Space: Reveal | Arrows: Move | Veto Adjectives Part II</div>
            </div>
        `;

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
