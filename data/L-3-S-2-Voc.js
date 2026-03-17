(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:flex; align-items:center; justify-content:center; background:#050505; overflow:hidden; position:relative; font-family:'Segoe UI', sans-serif;`;

    let currentIndex = 0;
    const sessionFolder = "Family"; 
    const words = [
        "Father", "Mother", "Parents", "Son", "Daughter", "Brother", "Sister", "Siblings", "Grandfather", "Grandmother",
        "Grandparents", "Grandson", "Granddaughter", "Uncle", "Aunt", "Cousin", "Nephew", "Niece", "Husband", "Wife",
        "Baby", "Child", "Children", "Teenager", "Adult", "Man", "Woman", "Relative", "Family tree", "Ancestors",
        "Stepfather", "Stepmother", "Stepbrother", "Stepsister", "Half-brother", "Half-sister", "Father-in-law", "Mother-in-law", "Son-in-law", "Daughter-in-law",
        "Twin", "Only child", "Groom", "Bride", "Neighbors", "Friend", "Best friend", "Fiancé", "Fiancée", "Single"
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
                .vocab-card { text-align:center; animation: vetoZoomIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
                .word-display { 
                    font-size: 11vw; font-weight: 900; color: #fff; 
                    text-transform: uppercase; letter-spacing: 15px; 
                    text-shadow: 0 0 40px rgba(255,255,255,0.1);
                    margin: 0; line-height: 1;
                }
                .category-tag { 
                    margin-top: 40px; color: #e74c3c; font-size: 1.2vw; 
                    letter-spacing: 10px; font-weight: 900; opacity: 0.6;
                    text-transform: uppercase;
                }
                .progress-container {
                    position: absolute; bottom: 0; left: 0; width: 100%; height: 6px; background: #111;
                }
                .progress-bar {
                    height: 100%; background: #e74c3c; width: ${progress}%; transition: 0.3s;
                    box-shadow: 0 0 15px #e74c3c;
                }
                .counter-box {
                    position: absolute; top: 40px; right: 60px; font-family: monospace;
                    font-size: 1.5rem; color: #333; font-weight: bold;
                }
                @keyframes vetoZoomIn {
                    from { opacity: 0; transform: scale(0.8); }
                    to { opacity: 1; transform: scale(1); }
                }
            </style>

            <div class="counter-box">0${currentIndex + 1} / ${words.length}</div>

            <div class="vocab-card">
                <div class="category-tag">Family & Relatives</div>
                <h1 class="word-display">${words[currentIndex]}</h1>
            </div>

            <div class="progress-container">
                <div class="progress-bar"></div>
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
