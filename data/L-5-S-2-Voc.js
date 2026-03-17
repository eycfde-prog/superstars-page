(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; display:flex; align-items:center; justify-content:center; background:#050505; overflow:hidden; position:relative; font-family: 'Inter', sans-serif;`;

    let currentIndex = 0;
    const sessionFolder = "Animals1"; 
    const words = [
        "Dog", "Cat", "Puppy", "Kitten", "Rabbit", "Hamster", "Parrot", "Goldfish", "Turtle", "Bird",
        "Horse", "Cow", "Sheep", "Goat", "Chicken", "Rooster", "Hen", "Duck", "Goose", "Turkey",
        "Donkey", "Camel", "Pig", "Ox", "Bull", "Calf", "Lamb", "Pony", "Mouse", "Rat",
        "Bee", "Butterfly", "Ant", "Fly", "Mosquito", "Spider", "Worm", "Snail", "Frog", "Snake",
        "Pigeon", "Eagle", "Owl", "Crow", "Peacock", "Swan", "Bat", "Squirrel", "Monkey", "Deer"
    ];

    function playSound(index) {
        const audioPath = `data/vocab/${sessionFolder}/${index + 1}.mp3`;
        const audio = new Audio(audioPath);
        audio.play().catch(e => console.log("Audio not ready:", audioPath));
    }

    function renderWord() {
        const progress = ((currentIndex + 1) / words.length) * 100;
        
        container.innerHTML = `
            <style>
                @keyframes wordPop {
                    0% { transform: scale(0.8); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                .vocab-card { animation: wordPop 0.2s ease-out; text-align: center; }
                .progress-bar { 
                    position: absolute; top: 0; left: 0; height: 5px; 
                    background: #3498db; transition: width 0.3s; width: ${progress}%; 
                    box-shadow: 0 0 10px #3498db;
                }
            </style>
            
            <div class="progress-bar"></div>
            
            <div class="vocab-card">
                <div style="font-size:1.2rem; color:#444; margin-bottom:30px; letter-spacing:3px; font-weight:900;">
                    STEP ${currentIndex + 1} / ${words.length}
                </div>
                
                <div id="vocabWord" style="font-size:11rem; font-weight:900; color:#fff; text-transform:uppercase; letter-spacing:10px; text-shadow: 0 10px 30px rgba(52, 152, 219, 0.3);">
                    ${words[currentIndex]}
                </div>
                
                <div style="margin-top:60px; color:#3498db; font-size:1.8rem; letter-spacing:8px; font-weight:800; text-transform:uppercase; opacity:0.8;">
                    Pets & Farm Animals
                </div>
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
                // Finish Logic
                container.innerHTML = `<h1 style="color:#2ecc71; font-size:5rem; font-weight:900; letter-spacing:5px;">ALL WORDS MASTERED!</h1>`;
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
