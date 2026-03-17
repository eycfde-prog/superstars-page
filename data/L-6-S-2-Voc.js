(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; display:flex; align-items:center; justify-content:center; background:#050505; overflow:hidden; position:relative; font-family: 'Inter', sans-serif;`;

    let currentIndex = 0;
    const sessionFolder = "Professions"; 
    const words = [
        "Teacher", "Student", "Doctor", "Nurse", "Dentist", "Engineer", "Architect", "Pilot", "Flight attendant", "Lawyer",
        "Judge", "Police officer", "Firefighter", "Soldier", "Sailor", "Chef", "Waiter", "Baker", "Butcher", "Farmer",
        "Fisherman", "Driver", "Mechanic", "Carpenter", "Plumber", "Electrician", "Painter", "Tailor", "Barber", "Hairdresser",
        "Artist", "Photographer", "Actor", "Singer", "Dancer", "Writer", "Journalist", "Scientist", "Astronaut", "Athlete",
        "Banker", "Accountant", "Secretary", "Receptionist", "Shop assistant", "Manager", "Programmer", "Designer", "Guide", "Retired"
    ];

    function playSound(index) {
        const audioPath = `data/vocab/${sessionFolder}/${index + 1}.mp3`;
        const audio = new Audio(audioPath);
        audio.play().catch(e => console.log("Audio hunting failed:", audioPath));
    }

    function renderWord() {
        const progress = ((currentIndex + 1) / words.length) * 100;
        
        container.innerHTML = `
            <style>
                @keyframes professionSlide {
                    0% { transform: translateY(30px); opacity: 0; filter: blur(10px); }
                    100% { transform: translateY(0); opacity: 1; filter: blur(0); }
                }
                .career-card { 
                    animation: professionSlide 0.4s cubic-bezier(0.16, 1, 0.3, 1); 
                    text-align: center; 
                }
                .progress-bar { 
                    position: absolute; bottom: 0; left: 0; height: 4px; background: #9b59b6; 
                    width: ${progress}%; transition: width 0.3s ease; box-shadow: 0 0 15px #9b59b6;
                }
            </style>
            
            <div class="progress-bar"></div>
            
            <div class="career-card">
                <div style="font-size:1.2rem; color:#444; margin-bottom:25px; letter-spacing:5px; font-weight:700;">
                    PROFESSION ${currentIndex + 1} OF ${words.length}
                </div>
                
                <div id="vocabWord" style="font-size:11rem; font-weight:900; color:#fff; text-transform:uppercase; letter-spacing:4px; text-shadow: 0 0 35px rgba(155, 89, 182, 0.4);">
                    ${words[currentIndex]}
                </div>
                
                <div style="margin-top:60px; color:#9b59b6; font-size:1.8rem; letter-spacing:8px; font-weight:800; text-transform:uppercase;">
                    Future Career Path
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
                    <div style="text-align:center;">
                        <h1 style="color:#9b59b6; font-size:6rem; font-weight:900; letter-spacing:2px;">MISSION COMPLETE</h1>
                        <p style="color:#fff; font-size:1.5rem; letter-spacing:4px;">WHAT IS YOUR FUTURE JOB?</p>
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
