(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:calc(100vh - 200px); display:flex; align-items:center; justify-content:center; background:#000; overflow:hidden; position:relative;`;

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
        audio.play().catch(e => console.log("Audio file not found:", audioPath));
    }

    function renderWord() {
        container.innerHTML = `
            <div style="text-align:center;">
                <div style="font-size:15px; color:#444; margin-bottom:20px;">Word ${currentIndex + 1} / 50</div>
                <div id="vocabWord" style="font-size:10rem; font-weight:900; color:#fff; text-transform:uppercase; letter-spacing:6px; text-shadow: 0 0 20px rgba(241, 196, 15, 0.4);">
                    ${words[currentIndex]}
                </div>
                <div style="margin-top:50px; color:#f1c40f; font-size:1.8rem; letter-spacing:5px; font-weight:bold;">TRANSPORTATION & TRAVEL</div>
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
