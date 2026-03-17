(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; display:flex; align-items:center; justify-content:center; background:#050505; overflow:hidden; position:relative; font-family:'Inter', sans-serif;`;

    let currentIndex = 0;
    const sessionFolder = "Clothes"; 
    const words = [
        "Shirt", "T-shirt", "Pants", "Jeans", "Shorts", "Dress", "Skirt", "Blouse", "Suit", "Jacket",
        "Coat", "Sweater", "Hoodie", "Vest", "Pajamas", "Underwear", "Socks", "Shoes", "Sneakers", "Boots",
        "Sandals", "Slippers", "Heels", "Hat", "Cap", "Scarf", "Gloves", "Belt", "Tie", "Bow tie",
        "Glasses", "Sunglasses", "Watch", "Ring", "Necklace", "Bracelet", "Earrings", "Handbag", "Backpack", "Wallet",
        "Umbrella", "Button", "Zipper", "Pocket", "Uniform", "Raincoat", "Swimsuit", "Bathrobe", "Jewelry", "Suitcase"
    ];

    function playSound(index) {
        const audioPath = `data/vocab/${sessionFolder}/${index + 1}.mp3`;
        const audio = new Audio(audioPath);
        audio.play().catch(e => console.log("Audio file not found:", audioPath));
    }

    function renderWord() {
        container.innerHTML = `
            <style>
                @keyframes glowPulse {
                    0% { text-shadow: 0 0 10px rgba(46, 204, 113, 0.2); }
                    50% { text-shadow: 0 0 30px rgba(46, 204, 113, 0.6); }
                    100% { text-shadow: 0 0 10px rgba(46, 204, 113, 0.2); }
                }
                .vocab-container {
                    text-align: center;
                    position: relative;
                    z-index: 2;
                }
                .word-count {
                    font-size: 1.1rem;
                    color: #333;
                    letter-spacing: 5px;
                    margin-bottom: 20px;
                    font-weight: 700;
                }
                .main-word {
                    font-size: 10rem;
                    font-weight: 900;
                    color: #fff;
                    text-transform: uppercase;
                    letter-spacing: 10px;
                    margin: 0;
                    animation: glowPulse 2s infinite ease-in-out;
                }
                .label-tag {
                    margin-top: 40px;
                    padding: 8px 25px;
                    border: 2px solid #2ecc71;
                    color: #2ecc71;
                    font-size: 1.5rem;
                    font-weight: bold;
                    display: inline-block;
                    text-transform: uppercase;
                    letter-spacing: 4px;
                    border-radius: 4px;
                }
                .bg-accent {
                    position: absolute;
                    font-size: 25rem;
                    font-weight: 900;
                    color: rgba(255,255,255,0.02);
                    z-index: 1;
                    white-space: nowrap;
                    pointer-events: none;
                }
            </style>
            <div class="bg-accent">FASHION</div>
            <div class="vocab-container">
                <div class="word-count">STYLE ${currentIndex + 1} / ${words.length}</div>
                <h1 class="main-word">${words[currentIndex]}</h1>
                <div class="label-tag">Clothes & Accessories</div>
            </div>
        `;
        playSound(currentIndex);
    }

    document.onkeydown = (e) => {
        if (e.keyCode === 39 || e.keyCode === 32 || e.keyCode === 13) { 
            if (currentIndex < words.length - 1) {
                currentIndex++;
                renderWord();
            }
        } else if (e.keyCode === 37) { 
            if (currentIndex > 0) {
                currentIndex--;
                renderWord();
            }
        }
    };

    renderWord();
})();
