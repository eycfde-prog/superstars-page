(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    let currentIndex = 0;
    const sessionFolder = "Weather"; 
    const words = [
        "Sun", "Moon", "Star", "Sky", "Cloud", "Rain", "Snow", "Wind", "Storm", "Thunder",
        "Lightning", "Fog", "Rainbow", "Ice", "Heat", "Cold", "Summer", "Winter", "Spring", "Autumn",
        "Mountain", "Hill", "Valley", "Forest", "Jungle", "Desert", "Island", "Beach", "Ocean", "Sea",
        "River", "Lake", "Waterfall", "Cave", "Volcano", "Earthquake", "Earth", "Planet", "Space", "Tree",
        "Flower", "Leaf", "Grass", "Plant", "Rock", "Stone", "Sand", "Dust", "Air", "Nature"
    ];

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; display:flex; align-items:center; justify-content:center; background: radial-gradient(circle at center, #051937, #000000); overflow:hidden; position:relative; font-family: 'Inter', sans-serif;`;

    function playSound(index) {
        const audioPath = `data/vocab/${sessionFolder}/${index + 1}.mp3`;
        const audio = new Audio(audioPath);
        audio.play().catch(() => {});
    }

    function renderWord() {
        const progress = ((currentIndex + 1) / words.length) * 100;
        container.innerHTML = `
            <style>
                @keyframes weatherFade {
                    0% { opacity: 0; transform: translateY(20px) scale(0.9); filter: blur(10px); }
                    100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
                }
                .vocab-card { text-align:center; z-index: 10; }
                .meta-info { font-size: 1.1rem; color: #556; margin-bottom: 25px; letter-spacing: 5px; font-weight: bold; }
                .word-main { 
                    font-size: 10rem; font-weight: 900; color: #fff; 
                    text-transform: uppercase; letter-spacing: 10px; 
                    text-shadow: 0 0 30px rgba(52, 152, 219, 0.6);
                    animation: weatherFade 0.5s ease-out;
                }
                .sub-tag { 
                    margin-top: 50px; color: #3498db; font-size: 1.6rem; 
                    letter-spacing: 10px; font-weight: bold;
                    opacity: 0.8;
                }
                .progress-bar-bg { 
                    position: absolute; bottom: 0; left: 0; width: 100%; height: 4px; background: rgba(255,255,255,0.05); 
                }
                .progress-bar-fill { 
                    height: 100%; background: linear-gradient(90deg, #3498db, #9b59b6); width: ${progress}%; 
                    transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 0 20px #3498db;
                }
            </style>
            
            <div class="vocab-card">
                <div class="meta-info">ATMOSPHERE ENTRY: ${currentIndex + 1} / 50</div>
                <div class="word-main">${words[currentIndex]}</div>
                <div class="sub-tag">WEATHER & ECOSYSTEM</div>
            </div>
            
            <div class="progress-bar-bg">
                <div class="progress-bar-fill"></div>
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
