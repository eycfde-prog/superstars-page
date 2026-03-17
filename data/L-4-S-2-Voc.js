(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; display:flex; align-items:center; justify-content:center; background:#050505; overflow:hidden; position:relative; font-family:'Segoe UI', Roboto, sans-serif;`;

    let currentIndex = 0;
    const sessionFolder = "Fruits"; 
    const words = [
        "Apple", "Banana", "Orange", "Strawberry", "Grape", "Watermelon", "Pineapple", "Mango", "Pear", "Peach",
        "Cherry", "Blueberry", "Raspberry", "Lemon", "Lime", "Coconut", "Kiwi", "Papaya", "Pomegranate", "Apricot",
        "Plum", "Fig", "Date", "Melon", "Cantaloupe", "Avocado", "Guava", "Lychee", "Dragon fruit", "Passion fruit",
        "Blackberry", "Cranberry", "Grapefruit", "Mandarin", "Nectarine", "Persimmon", "Quince", "Starfruit", "Olive", "Peanut",
        "Almond", "Walnut", "Cashew", "Hazelnut", "Pistachio", "Chestnut", "Raisin", "Prune", "Mulberry", "Jackfruit"
    ];

    function playSound(index) {
        const audioPath = `data/vocab/${sessionFolder}/${index + 1}.mp3`;
        const audio = new Audio(audioPath);
        audio.play().catch(e => console.log("Audio file not found:", audioPath));
    }

    function renderWord() {
        const progress = ((currentIndex + 1) / words.length) * 100;
        
        container.innerHTML = `
            <style>
                @keyframes wordPop {
                    from { opacity: 0; transform: scale(0.8); filter: blur(10px); }
                    to { opacity: 1; transform: scale(1); filter: blur(0); }
                }
                .vocab-card { text-align:center; animation: wordPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
                .vocab-id { font-size:1.2rem; color:#333; font-weight:900; letter-spacing:5px; margin-bottom:10px; }
                .vocab-text { 
                    font-size:12vw; font-weight:900; color:#fff; text-transform:uppercase; 
                    letter-spacing:15px; text-shadow: 0 20px 50px rgba(46, 204, 113, 0.3);
                    line-height:1;
                }
                .vocab-category { margin-top:40px; color:#2ecc71; font-size:1.5rem; letter-spacing:10px; font-weight:bold; opacity:0.6; }
                .progress-top { position:absolute; top:0; left:0; height:4px; background:#2ecc71; width:${progress}%; transition:0.3s; box-shadow: 0 0 10px #2ecc71; }
            </style>

            <div class="progress-top"></div>
            
            <div class="vocab-card">
                <div class="vocab-id">WORD ${currentIndex + 1} OF ${words.length}</div>
                <div id="vocabWord" class="vocab-text">${words[currentIndex]}</div>
                <div class="vocab-category">FRUITS & NUTS</div>
            </div>

            <div style="position:absolute; bottom:40px; color:#222; font-size:0.8rem; letter-spacing:2px;">
                PRESS SPACE OR ARROWS TO NAVIGATE
            </div>
        `;
        playSound(currentIndex);
    }

    document.onkeydown = (e) => {
        if (e.keyCode === 39 || e.keyCode === 32 || e.keyCode === 13) { // Right, Space, Enter
            if (currentIndex < words.length - 1) {
                currentIndex++;
                renderWord();
            } else {
                // Finale
                const wordEl = document.getElementById('vocabWord');
                if(wordEl) {
                    wordEl.innerText = "WELL DONE!";
                    wordEl.style.color = "#2ecc71";
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
