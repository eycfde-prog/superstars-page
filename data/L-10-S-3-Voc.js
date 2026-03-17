(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    let currentIndex = 0;
    const sessionFolder = "Idioms"; 
    const words = [
        "Break a leg", "Piece of cake", "Under the weather", "Once in a blue moon", "Call it a day", "Keep in touch", "Look after", "Give up", "Carry on", "Find out",
        "Get along", "Run out of", "Take care of", "Turn up", "Turn down", "Look forward to", "Put off", "Take off", "Set up", "Make up",
        "Break up", "Catch up", "Hold on", "Calm down", "Check in", "Check out", "Come across", "Cut down on", "Fall apart", "Get over",
        "Give in", "Grow up", "Hang out", "Let down", "Look for", "Pass out", "Pick up", "Point out", "Put up with", "Show off",
        "Stand out", "Work out", "Cheer up", "Calm down", "Go on", "Better late than never", "No pain no gain", "Break the ice", "So far so good", "Easy come easy go"
    ];

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:flex; align-items:center; justify-content:center; background:#050505; overflow:hidden; position:relative; font-family:'Segoe UI', sans-serif;`;

    function playSound(index) {
        const audioPath = `data/vocab/${sessionFolder}/${index + 1}.mp3`;
        const audio = new Audio(audioPath);
        audio.play().catch(e => console.log("Audio file not found"));
    }

    function renderWord() {
        const progress = ((currentIndex + 1) / words.length) * 100;

        container.innerHTML = `
            <style>
                @keyframes idiomFlash {
                    0% { opacity: 0; transform: scale(0.95); filter: brightness(0.5); }
                    100% { opacity: 1; transform: scale(1); filter: brightness(1); }
                }
                .idiom-card { 
                    animation: idiomFlash 0.3s ease-out forwards;
                    text-align: center;
                    width: 90%;
                    position: relative;
                }
                .progress-bar-inner {
                    position: absolute; bottom: 0; left: 0; height: 8px;
                    background: linear-gradient(90deg, #c5a059, #f1c40f);
                    width: ${progress}%; transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1);
                    box-shadow: 0 0 15px rgba(197, 160, 89, 0.5);
                }
            </style>

            <div class="idiom-card">
                <div style="font-size:1.5vw; color:#444; margin-bottom:2vh; font-weight:bold; letter-spacing:5px;">
                    SESSION 10 • ITEM <span style="color:#c5a059">${currentIndex + 1}</span>
                </div>
                
                <div id="vocabWord" style="font-size:8vw; font-weight:900; color:#fff; text-transform:uppercase; letter-spacing:2px; line-height:1.1; text-shadow: 0 0 40px rgba(197, 160, 89, 0.2);">
                    ${words[currentIndex]}
                </div>
                
                <div style="margin-top:8vh; color:#c5a059; font-size:2vw; letter-spacing:10px; font-weight:900; opacity: 0.8;">
                    IDIOMS & PHRASAL VERBS
                </div>
            </div>

            <div style="position: absolute; bottom:0; left:0; width:100%; height:8px; background:#111;">
                <div class="progress-bar-inner"></div>
            </div>
        `;
        playSound(currentIndex);
    }

    document.onkeydown = (e) => {
        if (e.keyCode === 39 || e.keyCode === 32) { // Right or Space
            if (currentIndex < words.length - 1) {
                currentIndex++;
                renderWord();
            } else {
                if (window.triggerVetoDone) window.triggerVetoDone();
            }
        } else if (e.keyCode === 37) { // Left
            if (currentIndex > 0) {
                currentIndex--;
                renderWord();
            }
        }
    };

    renderWord();
})();
