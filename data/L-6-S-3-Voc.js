(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; display:flex; align-items:center; justify-content:center; background:#020205; overflow:hidden; position:relative; font-family: 'Inter', sans-serif;`;

    let currentIndex = 0;
    const sessionFolder = "Places"; 
    const words = [
        "School", "University", "Hospital", "Pharmacy", "Supermarket", "Restaurant", "Cafe", "Bank", "Hotel", "Airport",
        "Station", "Library", "Museum", "Cinema", "Park", "Zoo", "Gym", "Stadium", "Mosque", "Church",
        "Bakery", "Pharmacy", "Bookstore", "Butcher shop", "Mall", "Market", "Office", "Factory", "Farm", "Police station",
        "Fire station", "Post office", "Gas station", "Bridge", "Street", "Square", "Playground", "Beach", "Sea", "River",
        "Lake", "Mountain", "Forest", "Desert", "Island", "Village", "City", "Country", "World", "Home"
    ];

    function playSound(index) {
        const audioPath = `data/vocab/${sessionFolder}/${index + 1}.mp3`;
        const audio = new Audio(audioPath);
        audio.play().catch(e => console.log("Map marker sound missing:", audioPath));
    }

    function renderWord() {
        const progress = ((currentIndex + 1) / words.length) * 100;
        
        container.innerHTML = `
            <style>
                @keyframes mapZoom {
                    0% { transform: scale(0.8); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                .destination-card { 
                    animation: mapZoom 0.3s ease-out; 
                    text-align: center; 
                    z-index: 2;
                }
                .top-progress { 
                    position: absolute; top: 0; left: 0; height: 3px; background: #3498db; 
                    width: ${progress}%; transition: width 0.4s cubic-bezier(0.1, 0.7, 0.1, 1); 
                    box-shadow: 0 0 10px #3498db;
                }
                .map-grid {
                    position: absolute; width: 200%; height: 200%;
                    background-image: linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px);
                    background-size: 50px 50px;
                    transform: rotate(15deg);
                    opacity: 0.3; z-index: 1;
                }
            </style>
            
            <div class="map-grid"></div>
            <div class="top-progress"></div>
            
            <div class="destination-card">
                <div style="font-size:1.1rem; color:#444; margin-bottom:20px; letter-spacing:8px; font-weight:800;">
                    DESTINATION ${currentIndex + 1} / 50
                </div>
                
                <div id="vocabWord" style="font-size:10rem; font-weight:900; color:#fff; text-transform:uppercase; letter-spacing:5px; text-shadow: 0 0 40px rgba(52, 152, 219, 0.5);">
                    ${words[currentIndex]}
                </div>
                
                <div style="margin-top:60px; color:#3498db; font-size:1.6rem; letter-spacing:10px; font-weight:800; text-transform:uppercase;">
                    Global Exploration
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
                container.innerHTML = `
                    <div style="text-align:center; animation: mapZoom 0.5s ease;">
                        <h1 style="color:#3498db; font-size:5rem; font-weight:900; letter-spacing:5px;">JOURNEY COMPLETED</h1>
                        <p style="color:#fff; font-size:1.5rem; letter-spacing:4px;">YOU ARE BACK AT HOME NOW.</p>
                    </div>`;
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
