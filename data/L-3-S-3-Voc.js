(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:calc(100vh - 200px); display:flex; align-items:center; justify-content:center; background:#000; overflow:hidden; position:relative;`;

    let currentIndex = 0;
    const sessionFolder = "Home"; 
    const words = [
        "House", "Apartment", "Door", "Window", "Wall", "Floor", "Roof", "Stairs", "Garden", "Garage",
        "Living room", "Bedroom", "Bathroom", "Kitchen", "Dining room", "Balcony", "Hallway", "Sofa", "Armchair", "Table",
        "Chair", "Bed", "Wardrobe", "Desk", "Shelf", "Mirror", "Curtain", "Carpet", "Lamp", "Clock",
        "Television", "Fridge", "Oven", "Microwave", "Washing machine", "Sink", "Toilet", "Shower", "Bathtub", "Towel",
        "Pillow", "Blanket", "Key", "Phone", "Computer", "Fan", "Air conditioner", "Broom", "Trash can", "Iron"
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
                <div id="vocabWord" style="font-size:10rem; font-weight:900; color:#fff; text-transform:uppercase; letter-spacing:8px; text-shadow: 0 0 15px rgba(231, 76, 60, 0.3);">
                    ${words[currentIndex]}
                </div>
                <div style="margin-top:50px; color:#3498db; font-size:1.5rem; letter-spacing:3px; font-weight:bold;">HOUSE & FURNITURE</div>
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
