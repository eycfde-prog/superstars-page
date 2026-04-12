(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    const rawWords = [
        "Teacher", "Student", "Doctor", "Nurse", "Dentist", "Engineer", "Architect", "Pilot", "Flight attendant", "Lawyer",
        "Judge", "Police officer", "Firefighter", "Soldier", "Sailor", "Chef", "Waiter", "Baker", "Butcher", "Farmer",
        "Fisherman", "Driver", "Mechanic", "Carpenter", "Plumber", "Electrician", "Painter", "Tailor", "Barber", "Hairdresser",
        "Artist", "Photographer", "Actor", "Singer", "Dancer", "Writer", "Journalist", "Scientist", "Astronaut", "Athlete",
        "Banker", "Accountant", "Secretary", "Receptionist", "Shop assistant", "Manager", "Programmer", "Designer", "Guide", "Retired"
    ];

    // --- نظام اللخبطة العشوائية من WOLF ---
    let shuffledWords = [...rawWords];
    for (let i = shuffledWords.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledWords[i], shuffledWords[j]] = [shuffledWords[j], shuffledWords[i]];
    }

    let currentIndex = 0;
    let examInterval = null;
    const timePerWord = 3;

    container.innerHTML = ''; 
    container.style.cssText = `
        height:100%; width:100%; display:flex; align-items:center; justify-content:center; 
        background:#050505; position:relative; overflow:hidden;
        font-family: 'Inter', 'Segoe UI', sans-serif;
    `;

    function showStartScreen() {
        container.innerHTML = `
            <div id="startExam" style="cursor:pointer; text-align:center; animation: fadeIn 0.8s ease;">
                <div style="font-size:3vw; color:#c5a059; letter-spacing:10px; font-weight:900; margin-bottom:10px;">JOBS V11</div>
                <div style="font-size:6vw; color:#fff; font-weight:900; text-transform:uppercase; line-height:1;">SPEED TEST</div>
                <div style="margin-top:40px; background:#c5a059; color:#000; padding:20px 60px; font-size:2vw; font-weight:900; border-radius:50px; display:inline-block; transition:0.3s;">START CAREER</div>
                <div style="margin-top:20px; color:rgba(255,255,255,0.3); font-size:1.2vw; letter-spacing:3px;">50 PROFESSIONS • 3s AUTO</div>
            </div>
            <style>
                @keyframes fadeIn { from { opacity:0; transform:scale(0.9); } to { opacity:1; transform:scale(1); } }
                #startExam:hover { filter: brightness(1.2); transform: scale(1.05); }
            </style>
        `;
        document.getElementById('startExam').onclick = () => {
            renderWord();
        };
    }

    function renderWord() {
        if (currentIndex >= shuffledWords.length) {
            completeExam();
            return;
        }

        const word = shuffledWords[currentIndex];
        let fontSize;
        
        // تحجيم الخط الذكي للوظائف (Jobs Optimized)
        if (word.length <= 7) { fontSize = '20vw'; } 
        else if (word.length <= 12) { fontSize = '14vw'; } 
        else if (word.length <= 16) { fontSize = '11vw'; } 
        else { fontSize = '8.5vw'; } // للمصطلحات المركبة مثل Flight attendant
        
        container.innerHTML = `
            <div style="position:absolute; bottom:0; left:0; height:8px; background:#c5a059; width:${((currentIndex + 1) / shuffledWords.length) * 100}%; transition:1s linear;"></div>
            
            <div id="timerBar" style="position:absolute; top:0; left:0; height:12px; background:#fff; width:100%;"></div>

            <div style="text-align:center; width:95%;">
                <div style="font-size:2.5vw; color:rgba(255,255,255,0.2); margin-bottom:2vh; font-weight:900; letter-spacing:5px;">
                    ${(currentIndex + 1).toString().padStart(2, '0')} / ${shuffledWords.length}
                </div>
                
                <div id="vocabWord" style="
                    font-size:${fontSize}; 
                    font-weight:900; 
                    color:#ffffff; 
                    text-transform:uppercase; 
                    letter-spacing:-1px; 
                    animation: jobSlide 0.3s ease-out;
                    white-space: nowrap;
                    display: inline-block;
                    width: 100%;
                ">
                    ${word}
                </div>
            </div>

            <style>
                @keyframes jobSlide { 0% { opacity:0; transform: translateY(30px); } 100% { opacity:1; transform: translateY(0); } }
                #timerBar { animation: shrinkBar ${timePerWord}s linear forwards; }
                @keyframes shrinkBar { from { width: 100%; } to { width: 0%; } }
            </style>
        `;

        if (examInterval) clearTimeout(examInterval);
        examInterval = setTimeout(() => {
            currentIndex++;
            renderWord();
        }, timePerWord * 1000);
    }

    function completeExam() {
        if (examInterval) clearTimeout(examInterval);
        container.innerHTML = `
            <div style="text-align:center; animation: fadeIn 1s ease;">
                <div style="font-size:10vw; filter: drop-shadow(0 0 30px #c5a059);">👨‍💼</div>
                <div style="font-size:5vw; color:#c5a059; font-weight:900; letter-spacing:5px;">PROFESSIONAL!</div>
                <div style="font-size:2vw; color:#fff; opacity:0.6; margin-top:10px;">Jobs Speed Test Completed</div>
            </div>
        `;
        if (typeof window.triggerVetoDone === 'function') window.triggerVetoDone();
    }

    showStartScreen();
})();
