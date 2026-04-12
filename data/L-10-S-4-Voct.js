(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    const rawWords = [
        "Break a leg", "Piece of cake", "Under the weather", "Once in a blue moon", "Call it a day", 
        "Keep in touch", "Look after", "Give up", "Carry on", "Find out", "Get along", "Run out of", 
        "Take care of", "Turn up", "Turn down", "Look forward to", "Put off", "Take off", "Set up", 
        "Make up", "Break up", "Catch up", "Hold on", "Calm down", "Check in", "Check out", 
        "Come across", "Cut down on", "Fall apart", "Get over", "Give in", "Grow up", "Hang out", 
        "Let down", "Look for", "Pass out", "Pick up", "Point out", "Put up with", "Show off", 
        "Stand out", "Work out", "Cheer up", "Go on", "Better late than never", 
        "No pain no gain", "Break the ice", "So far so good", "Easy come easy go"
    ];

    // --- نظام اللخبطة العشوائية WOLF SHUFFLE ---
    let shuffledWords = [...rawWords];
    for (let i = shuffledWords.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledWords[i], shuffledWords[j]] = [shuffledWords[j], shuffledWords[i]];
    }

    let currentIndex = 0;
    let examInterval = null;
    const timePerWord = 3;

    container.innerHTML = ''; 
    container.style.cssText = `
        height:100%; width:100%; display:flex; align-items:center; justify-content:center; 
        background:#050505; position:relative; overflow:hidden;
        font-family: 'Inter', 'Segoe UI', sans-serif;
    `;

    function showStartScreen() {
        container.innerHTML = `
            <div id="startExam" style="cursor:pointer; text-align:center; animation: idiomFade 0.8s ease;">
                <div style="font-size:3vw; color:#c5a059; letter-spacing:10px; font-weight:900; margin-bottom:10px;">IDIOMS V20</div>
                <div style="font-size:6vw; color:#fff; font-weight:900; text-transform:uppercase; line-height:1;">ADVANCED TEST</div>
                <div style="margin-top:40px; background:#c5a059; color:#000; padding:20px 60px; font-size:2vw; font-weight:900; border-radius:50px; display:inline-block; transition:0.3s;">START CHALLENGE</div>
                <div style="margin-top:20px; color:rgba(255,255,255,0.3); font-size:1.2vw; letter-spacing:3px;">50 PHRASES • NO SOUND • 3s AUTO</div>
            </div>
            <style>
                @keyframes idiomFade { from { opacity:0; transform:scale(0.8); } to { opacity:1; transform:scale(1); } }
                #startExam:hover { filter: brightness(1.2); transform: translateY(-5px); }
            </style>
        `;
        document.getElementById('startExam').onclick = () => {
            renderWord();
        };
    }

    function renderWord() {
        if (currentIndex >= shuffledWords.length) {
            completeExam();
            return;
        }

        const word = shuffledWords[currentIndex];
        let fontSize;
        
        // منطق تحجيم الخط المطور للجمل الطويلة (Idioms Optimized)
        if (word.length <= 8) { fontSize = '18vw'; } 
        else if (word.length <= 15) { fontSize = '12vw'; } 
        else if (word.length <= 22) { fontSize = '8.5vw'; } 
        else { fontSize = '6.5vw'; } // للجمل الطويلة جداً مثل Once in a blue moon
        
        container.innerHTML = `
            <div id="timerBar" style="position:absolute; top:0; left:0; height:12px; background:#fff; width:100%;"></div>
            
            <div style="position:absolute; bottom:0; left:0; height:8px; background:#c5a059; width:${((currentIndex + 1) / shuffledWords.length) * 100}%; transition:1s linear;"></div>

            <div style="text-align:center; width:98%;">
                <div style="font-size:2.5vw; color:rgba(255,255,255,0.2); margin-bottom:2vh; font-weight:900; letter-spacing:5px;">
                    ${(currentIndex + 1).toString().padStart(2, '0')} / ${shuffledWords.length}
                </div>
                
                <div id="vocabWord" style="
                    font-size:${fontSize}; 
                    font-weight:900; 
                    color:#ffffff; 
                    text-transform:uppercase; 
                    letter-spacing:-1px; 
                    animation: idiomIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    white-space: nowrap;
                    display: inline-block;
                    width: 100%;
                ">
                    ${word}
                </div>
            </div>

            <style>
                @keyframes idiomIn { 0% { opacity:0; transform: scale(0.5); filter: blur(20px); } 100% { opacity:1; transform: scale(1); filter: blur(0); } }
                #timerBar { animation: shrinkBar ${timePerWord}s linear forwards; }
                @keyframes shrinkBar { from { width: 100%; } to { width: 0%; } }
            </style>
        `;

        if (examInterval) clearTimeout(examInterval);
        examInterval = setTimeout(() => {
            currentIndex++;
            renderWord();
        }, timePerWord * 1000);
    }

    function completeExam() {
        if (examInterval) clearTimeout(examInterval);
        container.innerHTML = `
            <div style="text-align:center; animation: idiomFade 1s ease;">
                <div style="font-size:10vw; filter: drop-shadow(0 0 30px #c5a059);">💎</div>
                <div style="font-size:5vw; color:#c5a059; font-weight:900; letter-spacing:5px;">LEGENDARY!</div>
                <div style="font-size:2vw; color:#fff; opacity:0.6; margin-top:10px;">V20 Idioms Speed Test Completed</div>
            </div>
        `;
        if (typeof window.triggerVetoDone === 'function') window.triggerVetoDone();
    }

    showStartScreen();
})();
