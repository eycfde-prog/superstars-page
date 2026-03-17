(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:flex; align-items:center; justify-content:center; background:#050505; overflow:hidden; position:relative; font-family:'Poppins', sans-serif;`;

    let currentIndex = 0;
    const sessionFolder = "Home"; 
    const words = [
        "House", "Apartment", "Door", "Window", "Wall", "Floor", "Roof", "Stairs", "Garden", "Garage",
        "Living room", "Bedroom", "Bathroom", "Kitchen", "Dining room", "Balcony", "Hallway", "Sofa", "Armchair", "Table",
        "Chair", "Bed", "Wardrobe", "Desk", "Shelf", "Mirror", "Curtain", "Carpet", "Lamp", "Clock",
        "Television", "Fridge", "Oven", "Microwave", "Washing machine", "Sink", "Toilet", "Shower", "Bathtub", "Towel",
        "Pillow", "Blanket", "Key", "Phone", "Computer", "Fan", "Air conditioner", "Broom", "Trash can", "Iron"
    ];

    let currentAudio = null;

    function playSound(index) {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        const audioPath = `data/vocab/${sessionFolder}/${index + 1}.mp3`;
        currentAudio = new Audio(audioPath);
        currentAudio.play().catch(e => console.log("Audio not found:", audioPath));
    }

    function renderWord() {
        const progress = ((currentIndex + 1) / words.length) * 100;

        container.innerHTML = `
            <style>
                .home-card { text-align:center; animation: vetoSlideIn 0.3s ease-out; }
                .word-text { 
                    font-size: 10vw; font-weight: 900; color: #fff; 
                    text-transform: uppercase; letter-spacing: 12px; 
                    text-shadow: 0 10px 30px rgba(52, 152, 219, 0.3);
                    margin: 0;
                }
                .tagline { 
                    margin-top: 30px; color: #3498db; font-size: 1.3vw; 
                    letter-spacing: 8px; font-weight: 800; text-transform: uppercase;
                }
                .info-panel {
                    position: absolute; top: 40px; left: 60px; color: #222; font-family: monospace; font-size: 1.2rem;
                }
                .progress-bg { position: absolute; bottom: 0; left: 0; width: 100%; height: 8px; background: #111; }
                .progress-fill { 
                    height: 100%; background: #3498db; width: ${progress}%; transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 0 20px rgba(52, 152, 219, 0.5);
                }
                @keyframes vetoSlideIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            </style>

            <div class="info-panel">HOME_EQUIPMENT // ${currentIndex + 1}</div>

            <div class="home-card">
                <div class="tagline">House & Furniture</div>
                <h1 class="word-text">${words[currentIndex]}</h1>
            </div>

            <div class="progress-bg">
                <div class="progress-fill"></div>
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
