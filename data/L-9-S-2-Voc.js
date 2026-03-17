(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    let currentIndex = 0;
    const sessionFolder = "Food"; 
    const words = [
        "Breakfast", "Lunch", "Dinner", "Snack", "Bread", "Rice", "Pasta", "Pizza", "Burger", "Sandwich",
        "Soup", "Salad", "Cheese", "Egg", "Butter", "Yogurt", "Meat", "Chicken", "Fish", "Steak",
        "Sausage", "Seafood", "Salt", "Pepper", "Sugar", "Honey", "Oil", "Sauce", "Jam", "Cake",
        "Chocolate", "Ice cream", "Cookie", "Candy", "Water", "Milk", "Juice", "Tea", "Coffee", "Soda",
        "Lemonade", "Smoothie", "Flour", "Wheat", "Cereal", "Noodles", "Pie", "Vinegar", "Menu", "Bill"
    ];

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; display:flex; align-items:center; justify-content:center; background:#0a0a0a; overflow:hidden; position:relative; font-family: 'Inter', sans-serif;`;

    function playSound(index) {
        const audioPath = `data/vocab/${sessionFolder}/${index + 1}.mp3`;
        const audio = new Audio(audioPath);
        audio.play().catch(() => {});
    }

    function renderWord() {
        const progress = ((currentIndex + 1) / words.length) * 100;
        container.innerHTML = `
            <style>
                @keyframes wordPop {
                    0% { transform: scale(0.8); opacity: 0; filter: blur(10px); }
                    100% { transform: scale(1); opacity: 1; filter: blur(0); }
                }
                .vocab-card { text-align:center; z-index: 10; }
                .counter { font-size: 1.2rem; color: #555; margin-bottom: 20px; letter-spacing: 3px; font-weight: bold; }
                .word-display { 
                    font-size: 9rem; font-weight: 900; color: #fff; 
                    text-transform: uppercase; letter-spacing: 12px; 
                    text-shadow: 0 10px 30px rgba(231, 76, 60, 0.5);
                    animation: wordPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .category-tag { 
                    margin-top: 40px; color: #e74c3c; font-size: 1.5rem; 
                    letter-spacing: 8px; font-weight: bold; border-top: 1px solid #222; 
                    padding-top: 20px; display: inline-block;
                }
                .progress-container { 
                    position: absolute; bottom: 0; left: 0; width: 100%; height: 6px; background: #111; 
                }
                .progress-bar { 
                    height: 100%; background: #e74c3c; width: ${progress}%; 
                    transition: 0.3s; box-shadow: 0 0 15px #e74c3c;
                }
            </style>
            
            <div class="vocab-card">
                <div class="counter">ENTRY ${currentIndex + 1} // 50</div>
                <div class="word-display">${words[currentIndex]}</div>
                <div class="category-tag">CUISINE & DIET</div>
            </div>
            
            <div class="progress-container">
                <div class="progress-bar"></div>
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
