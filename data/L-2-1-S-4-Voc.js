(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    const rawWords = [
        "Hear", "Touch", "Smell", "Taste", "Feel", "Remember", "Forget", "Believe", "Hope", "Want",
        "Need", "Love", "Like", "Hate", "Wait", "Meet", "Ask", "Answer", "Tell", "Say",
        "Call", "Send", "Receive", "Bring", "Carry", "Hold", "Catch", "Throw", "Win", "Lose",
        "Start", "Finish", "Try", "Change", "Fix", "Break", "Build", "Spend", "Save", "Borrow",
        "Lend", "Pay", "Cost", "Choose", "Decide", "Explain", "Travel", "Fly", "Stay", "Leave"
    ];

    // --- نظام اللخبطة العشوائية ---
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
            <div id="startExam" style="cursor:pointer; text-align:center; animation: fadeIn 0.8s ease;">
                <div style="font-size:3vw; color:#c5a059; letter-spacing:10px; font-weight:900; margin-bottom:10px;">VOCABULARY V2</div>
                <div style="font-size:6vw; color:#fff; font-weight:900; text-transform:uppercase; line-height:1;">SPEED CHALLENGE</div>
                <div style="margin-top:40px; background:#c5a059; color:#000; padding:20px 60px; font-size:2vw; font-weight:900; border-radius:50px; display:inline-block; transition: 0.3s;">START NOW</div>
                <div style="margin-top:20px; color:rgba(255,255,255,0.3); font-size:1.2vw; letter-spacing:3px;">AUTO-PILOT: 3.0s / WORD</div>
            </div>
            <style>
                @keyframes fadeIn { from { opacity:0; transform:scale(0.9); } to { opacity:1; transform:scale(1); } }
                #startExam:hover { filter: brightness(1.2); }
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
        
        // تحجيم الخط الذكي من WOLF
        if (word.length <= 4) { fontSize = '22vw'; } 
        else if (word.length <= 7) { fontSize = '18vw'; } 
        else if (word.length <= 9) { fontSize = '14vw'; } 
        else { fontSize = '11vw'; }
        
        container.innerHTML = `
            <div style="position:absolute; bottom:0; left:0; height:8px; background:#c5a059; width:${((currentIndex + 1) / shuffledWords.length) * 100}%; transition:1s linear;"></div>
            
            <div id="timerBar" style="position:absolute; top:0; left:0; height:12px; background:#fff; width:100%;"></div>

            <div style="text-align:center; width:95%;">
                <div style="font-size:2.5vw; color:rgba(255,255,255,0.2); margin-bottom:2vh; font-weight:900; letter-spacing:5px;">
                    ${(currentIndex + 1).toString().padStart(2, '0')} / ${shuffledWords.length}
                </div>
                
                <div id="vocabWord" style="
                    font-size:${fontSize}; 
                    font-weight:900; 
                    color:#ffffff; 
                    text-transform:uppercase; 
                    letter-spacing:-2px; 
                    animation: vetoSharpIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    white-space: nowrap;
                ">
                    ${word}
                </div>
            </div>

            <style>
                @keyframes vetoSharpIn { 0% { opacity:0; transform: translateY(40px); } 100% { opacity:1; transform: translateY(0); } }
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
            <div style="text-align:center; animation: fadeIn 1s ease;">
                <div style="font-size:10vw; text-shadow: 0 0 50px #c5a059;">🔥</div>
                <div style="font-size:5vw; color:#c5a059; font-weight:900; letter-spacing:5px;">LEVEL 2 CLEARED</div>
                <div style="font-size:2vw; color:#fff; opacity:0.6; margin-top:10px; font-weight:bold;">Excellent Speed Performance</div>
            </div>
        `;
        if (typeof window.triggerVetoDone === 'function') window.triggerVetoDone();
    }

    showStartScreen();
})();
