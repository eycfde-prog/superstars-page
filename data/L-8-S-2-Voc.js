(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; display:flex; align-items:center; justify-content:center; background:#050505; overflow:hidden; position:relative;`;

    let currentIndex = 0;
    const sessionFolder = "Transportation"; 
    const words = [
        "Car", "Bus", "Truck", "Taxi", "Bicycle", "Motorcycle", "Scooter", "Train", "Subway", "Metro",
        "Plane", "Helicopter", "Ship", "Boat", "Yacht", "Ferry", "Rocket", "Ambulance", "Fire truck", "Police car",
        "Van", "Tractor", "Bulldozer", "Crane", "Tank", "Balloon", "Parachute", "Submarine", "Skateboard", "Wheelchair",
        "Engine", "Wheel", "Tire", "Steering wheel", "Brake", "Door", "Window", "Seat", "Seatbelt", "Mirror",
        "Fuel", "Driver", "Pilot", "Captain", "Passenger", "Station", "Airport", "Port", "Road", "Bridge"
    ];

    function playSound(index) {
        const audioPath = `data/vocab/${sessionFolder}/${index + 1}.mp3`;
        const audio = new Audio(audioPath);
        audio.play().catch(e => console.log("Audio not ready"));
    }

    function renderWord() {
        container.innerHTML = `
            <style>
                @keyframes slideIn {
                    0% { transform: scale(0.5); opacity: 0; filter: blur(10px); }
                    100% { transform: scale(1); opacity: 1; filter: blur(0); }
                }
                @keyframes roadLines {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100%); }
                }
                .road-line {
                    position: absolute; width: 4px; height: 100px; 
                    background: rgba(241, 196, 15, 0.2); left: 50%; 
                    animation: roadLines 1.5s linear infinite;
                }
                .vocab-card {
                    text-align: center; z-index: 10;
                    animation: slideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .word-display {
                    font-size: 11rem; font-weight: 900; color: #fff; 
                    text-transform: uppercase; letter-spacing: -2px;
                    text-shadow: 0 10px 30px rgba(255,255,255,0.2);
                    margin: 0; line-height: 1;
                }
                .counter-badge {
                    background: #f1c40f; color: #000; padding: 5px 20px;
                    font-size: 1.2rem; font-weight: 900; border-radius: 50px;
                    margin-bottom: 30px; display: inline-block;
                }
                .category-label {
                    margin-top: 40px; color: #f1c40f; font-size: 1.5rem;
                    letter-spacing: 8px; font-weight: 300; text-transform: uppercase;
                }
            </style>

            <div class="road-line" style="left:20%"></div>
            <div class="road-line" style="left:80%; animation-delay:0.7s"></div>

            <div class="vocab-card">
                <div class="counter-badge">CARRIER ${currentIndex + 1} / 50</div>
                <h1 class="word-display" id="vocabWord">${words[currentIndex]}</h1>
                <div class="category-label">Transportation & Travel</div>
            </div>
        `;
        playSound(currentIndex);
    }

    document.onkeydown = (e) => {
        if (e.keyCode === 39 || e.keyCode === 32) { 
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
