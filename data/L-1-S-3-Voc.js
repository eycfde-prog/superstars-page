(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:calc(100vh - 200px); display:flex; align-items:center; justify-content:center; background:#000; overflow:hidden; position:relative;`;

    let currentIndex = 0;
    const sessionFolder = "Verbs2"; // اسم المجلد الجديد داخل vocab
    const words = [
        "Hear", "Touch", "Smell", "Taste", "Feel", "Remember", "Forget", "Believe", "Hope", "Want",
        "Need", "Love", "Like", "Hate", "Wait", "Meet", "Ask", "Answer", "Tell", "Say",
        "Call", "Send", "Receive", "Bring", "Carry", "Hold", "Catch", "Throw", "Win", "Lose",
        "Start", "Finish", "Try", "Change", "Fix", "Break", "Build", "Spend", "Save", "Borrow",
        "Lend", "Pay", "Cost", "Choose", "Decide", "Explain", "Travel", "Fly", "Stay", "Leave"
    ];

    function playSound(index) {
        const audioPath = `data/vocab/${sessionFolder}/${index + 1}.mp3`;
        const audio = new Audio(audioPath);
        audio.play().catch(e => console.log("Audio not found:", audioPath));
    }

    function renderWord() {
        container.innerHTML = `
            <div style="text-align:center;">
                <div style="font-size:15px; color:#444; margin-bottom:20px;">Word ${currentIndex + 1} / 50</div>
                <div id="vocabWord" style="font-size:12rem; font-weight:900; color:#fff; text-transform:uppercase; letter-spacing:5px;">
                    ${words[currentIndex]}
                </div>
                <div style="margin-top:50px; color:#e74c3c; font-size:1.2rem; opacity:0.5;">Verbs Group 2</div>
            </div>
        `;
        playSound(currentIndex);
    }

    document.onkeydown = (e) => {
        if (e.keyCode === 39 || e.keyCode === 32) { // Right or Space
            if (currentIndex < words.length - 1) {
                currentIndex++;
                renderWord();
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
