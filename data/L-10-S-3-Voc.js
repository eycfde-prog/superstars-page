(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:calc(100vh - 200px); display:flex; align-items:center; justify-content:center; background:#000; overflow:hidden; position:relative;`;

    let currentIndex = 0;
    const sessionFolder = "Idioms"; 
    const words = [
        "Break a leg", "Piece of cake", "Under the weather", "Once in a blue moon", "Call it a day", "Keep in touch", "Look after", "Give up", "Carry on", "Find out",
        "Get along", "Run out of", "Take care of", "Turn up", "Turn down", "Look forward to", "Put off", "Take off", "Set up", "Make up",
        "Break up", "Catch up", "Hold on", "Calm down", "Check in", "Check out", "Come across", "Cut down on", "Fall apart", "Get over",
        "Give in", "Grow up", "Hang out", "Let down", "Look for", "Pass out", "Pick up", "Point out", "Put up with", "Show off",
        "Stand out", "Work out", "Cheer up", "Calm down", "Go on", "Better late than never", "No pain no gain", "Break the ice", "So far so good", "Easy come easy go"
    ];

    function playSound(index) {
        const audioPath = `data/vocab/${sessionFolder}/${index + 1}.mp3`;
        const audio = new Audio(audioPath);
        audio.play().catch(e => console.log("Audio file not found:", audioPath));
    }

    function renderWord() {
        container.innerHTML = `
            <div style="text-align:center;">
                <div style="font-size:15px; color:#444; margin-bottom:20px;">Word ${currentIndex + 1} / 50</div>
                <div id="vocabWord" style="font-size:7rem; font-weight:900; color:#fff; text-transform:uppercase; letter-spacing:3px; text-shadow: 0 0 25px rgba(241, 196, 15, 0.5);">
                    ${words[currentIndex]}
                </div>
                <div style="margin-top:50px; color:#f1c40f; font-size:1.8rem; letter-spacing:5px; font-weight:bold;">IDIOMS & PHRASAL VERBS</div>
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
