(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:calc(100vh - 200px); display:flex; align-items:center; justify-content:center; background:#000; overflow:hidden; position:relative;`;

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
        audio.play().catch(e => console.log("Audio file not found:", audioPath));
    }

    function renderWord() {
        container.innerHTML = `
            <div style="text-align:center;">
                <div style="font-size:15px; color:#444; margin-bottom:20px;">Word ${currentIndex + 1} / 50</div>
                <div id="vocabWord" style="font-size:10rem; font-weight:900; color:#fff; text-transform:uppercase; letter-spacing:8px; text-shadow: 0 0 20px rgba(243, 156, 18, 0.4);">
                    ${words[currentIndex]}
                </div>
                <div style="margin-top:50px; color:#f39c12; font-size:1.8rem; letter-spacing:5px; font-weight:bold;">VEGETABLES & HERBS</div>
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
