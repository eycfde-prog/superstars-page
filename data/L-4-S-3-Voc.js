(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; display:flex; align-items:center; justify-content:center; background:#050505; overflow:hidden; position:relative; font-family:'Segoe UI', Tahoma, sans-serif;`;

    let currentIndex = 0;
    const sessionFolder = "Vegetables"; 
    const words = [
        "Tomato", "Potato", "Onion", "Garlic", "Cucumber", "Carrot", "Corn", "Eggplant", "Pepper", "Broccoli",
        "Cauliflower", "Cabbage", "Lettuce", "Spinach", "Zucchini", "Mushroom", "Pea", "Bean", "Lentil", "Chickpea",
        "Radish", "Turnip", "Beetroot", "Sweet potato", "Pumpkin", "Celery", "Parsley", "Mint", "Ginger", "Chili",
        "Okra", "Artichoke", "Asparagus", "Leek", "Green bean", "Spring onion", "Kale", "Arugula", "Basil", "Coriander",
        "Turmeric", "Clove", "Cinnamon", "Olive", "Pickle", "Soy", "Radicchio", "Brussels sprout", "Fennel", "Yam"
    ];

    function playSound(index) {
        const audioPath = `data/vocab/${sessionFolder}/${index + 1}.mp3`;
        const audio = new Audio(audioPath);
        audio.play().catch(e => console.warn("Audio file check failed for:", audioPath));
    }

    function renderWord() {
        const progress = ((currentIndex + 1) / words.length) * 100;
        
        container.innerHTML = `
            <style>
                @keyframes gardenReveal {
                    0% { opacity: 0; filter: blur(20px); transform: translateY(20px); }
                    100% { opacity: 1; filter: blur(0); transform: translateY(0); }
                }
                .vocab-container { text-align:center; animation: gardenReveal 0.4s ease-out; }
                .progress-bar-top { position:absolute; top:0; left:0; height:6px; background:#f39c12; width:${progress}%; transition:0.4s cubic-bezier(0.1, 0.7, 0.1, 1); box-shadow: 0 0 15px rgba(243, 156, 18, 0.5); }
                .word-number { font-size:1rem; color:#444; letter-spacing:4px; font-weight:bold; margin-bottom:15px; }
                .main-word { 
                    font-size:11vw; font-weight:900; color:#fff; text-transform:uppercase; 
                    letter-spacing:10px; text-shadow: 0 10px 40px rgba(243, 156, 18, 0.3);
                    line-height:0.9;
                }
                .category-tag { margin-top:50px; color:#f39c12; font-size:1.6rem; letter-spacing:8px; font-weight:800; text-transform:uppercase; opacity:0.8; }
                .keyboard-hint { position:absolute; bottom:30px; color:#1a1a1a; font-size:0.7rem; font-weight:bold; letter-spacing:2px; }
            </style>

            <div class="progress-bar-top"></div>
            
            <div class="vocab-container">
                <div class="word-number">ELEMENT ${currentIndex + 1} / ${words.length}</div>
                <div id="targetWord" class="main-word">${words[currentIndex]}</div>
                <div class="category-tag">Vegetables & Herbs</div>
            </div>

            <div class="keyboard-hint">NAVIGATION: ARROWS / SPACE</div>
        `;
        playSound(currentIndex);
    }

    document.onkeydown = (e) => {
        if (e.keyCode === 39 || e.keyCode === 32 || e.keyCode === 13) { // Right / Space / Enter
            if (currentIndex < words.length - 1) {
                currentIndex++;
                renderWord();
            } else {
                const wordBox = document.getElementById('targetWord');
                if(wordBox) {
                    wordBox.innerText = "GARDEN CLEAR!";
                    wordBox.style.color = "#27ae60";
                    wordBox.style.fontSize = "8vw";
                }
                if(window.triggerVetoDone) window.triggerVetoDone();
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
