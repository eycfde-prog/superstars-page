(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    let currentIndex = 0;
    const sessionFolder = "DailyRoutine"; 
    const words = [
        "Wake up", "Get up", "Wash my face", "Brush my teeth", "Take a shower", "Dry my hair", "Get dressed", "Brush my hair", "Make breakfast", "Eat breakfast",
        "Drink coffee", "Go to work", "Go to school", "Wait for the bus", "Drive to work", "Start work", "Check emails", "Answer calls", "Have a meeting", "Eat lunch",
        "Finish work", "Buy groceries", "Go home", "Arrive home", "Cook dinner", "Eat dinner", "Set the table", "Clear the table", "Do the dishes", "Watch TV",
        "Listen to music", "Read a book", "Play games", "Surf the internet", "Exercise", "Go for a walk", "Clean the house", "Do the laundry", "Iron the clothes", "Water the plants",
        "Take out the trash", "Feed the pet", "Study", "Do homework", "Put on pajamas", "Set the alarm", "Turn off the lights", "Go to bed", "Fall asleep", "Dream"
    ];

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:flex; align-items:center; justify-content:center; background:#050505; overflow:hidden; position:relative; font-family:'Segoe UI', sans-serif;`;

    function playSound(index) {
        const audioPath = `data/vocab/${sessionFolder}/${index + 1}.mp3`;
        const audio = new Audio(audioPath);
        audio.play().catch(e => console.log("Audio not found"));
    }

    function renderWord() {
        // حساب نسبة التقدم
        const progress = ((currentIndex + 1) / words.length) * 100;

        container.innerHTML = `
            <style>
                @keyframes vocabIn {
                    from { opacity: 0; transform: scale(1.2) translateY(20px); filter: blur(10px); }
                    to { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
                }
                .word-card { animation: vocabIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
                .progress-bar {
                    position: absolute; bottom: 0; left: 0; height: 10px;
                    background: #c5a059; width: ${progress}%; transition: 0.5s ease-out;
                    box-shadow: 0 0 20px #c5a059;
                }
            </style>

            <div class="word-card" style="text-align:center; width: 90%;">
                <div style="font-size:1.5vw; color:#555; margin-bottom:30px; font-weight:bold; letter-spacing:3px;">
                    VOCABULARY <span style="color:#c5a059">${currentIndex + 1}</span> / ${words.length}
                </div>
                
                <div id="vocabWord" style="font-size:9vw; font-weight:900; color:#fff; text-transform:uppercase; letter-spacing:5px; line-height:1; text-shadow: 0 10px 50px rgba(0,0,0,1);">
                    ${words[currentIndex]}
                </div>
                
                <div style="margin-top:60px; color:#c5a059; font-size:2vw; letter-spacing:8px; font-weight:bold; opacity: 0.7;">
                    MY DAILY ROUTINE
                </div>
            </div>

            <div class="progress-bar"></div>
        `;
        playSound(currentIndex);
    }

    document.onkeydown = (e) => {
        if (e.keyCode === 39 || e.keyCode === 32) { // Right or Space
            if (currentIndex < words.length - 1) {
                currentIndex++;
                renderWord();
            } else {
                // تفعيل انتهاء النشاط عند الوصول لآخر كلمة
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
