(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:calc(100vh - 200px); display:flex; align-items:center; justify-content:center; background:#000; overflow:hidden; position:relative;`;

    let currentIndex = 0;
    const sessionFolder = "DailyRoutine"; 
    const words = [
        "Wake up", "Get up", "Wash my face", "Brush my teeth", "Take a shower", "Dry my hair", "Get dressed", "Brush my hair", "Make breakfast", "Eat breakfast",
        "Drink coffee", "Go to work", "Go to school", "Wait for the bus", "Drive to work", "Start work", "Check emails", "Answer calls", "Have a meeting", "Eat lunch",
        "Finish work", "Buy groceries", "Go home", "Arrive home", "Cook dinner", "Eat dinner", "Set the table", "Clear the table", "Do the dishes", "Watch TV",
        "Listen to music", "Read a book", "Play games", "Surf the internet", "Exercise", "Go for a walk", "Clean the house", "Do the laundry", "Iron the clothes", "Water the plants",
        "Take out the trash", "Feed the pet", "Study", "Do homework", "Put on pajamas", "Set the alarm", "Turn off the lights", "Go to bed", "Fall asleep", "Dream"
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
                <div id="vocabWord" style="font-size:8rem; font-weight:900; color:#fff; text-transform:uppercase; letter-spacing:4px; text-shadow: 0 0 20px rgba(155, 89, 182, 0.4);">
                    ${words[currentIndex]}
                </div>
                <div style="margin-top:50px; color:#9b59b6; font-size:1.8rem; letter-spacing:5px; font-weight:bold;">MY DAILY ROUTINE</div>
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
