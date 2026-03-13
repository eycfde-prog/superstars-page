(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:calc(100vh - 200px); display:flex; align-items:center; justify-content:center; background:#000; overflow:hidden; position:relative;`;

    let currentIndex = 0;
    const sessionFolder = "Family"; 
    const words = [
        "Father", "Mother", "Parents", "Son", "Daughter", "Brother", "Sister", "Siblings", "Grandfather", "Grandmother",
        "Grandparents", "Grandson", "Granddaughter", "Uncle", "Aunt", "Cousin", "Nephew", "Niece", "Husband", "Wife",
        "Baby", "Child", "Children", "Teenager", "Adult", "Man", "Woman", "Relative", "Family tree", "Ancestors",
        "Stepfather", "Stepmother", "Stepbrother", "Stepsister", "Half-brother", "Half-sister", "Father-in-law", "Mother-in-law", "Son-in-law", "Daughter-in-law",
        "Twin", "Only child", "Groom", "Bride", "Neighbors", "Friend", "Best friend", "Fiancé", "Fiancée", "Single"
    ];

    function playSound(index) {
        const audioPath = `data/vocab/${sessionFolder}/${index + 1}.mp3`;
        const audio = new Audio(audioPath);
        audio.play().catch(e => console.log("Audio not found:", audioPath));
    }

    function renderWord() {
        container.innerHTML = `
            <div style="text-align:center;">
                <div style="font-size:15px; color:#444; margin-bottom:20px;">Word ${currentIndex + 1} / 50</div>
                <div id="vocabWord" style="font-size:10rem; font-weight:900; color:#fff; text-transform:uppercase; letter-spacing:8px; text-shadow: 0 0 20px rgba(255,255,255,0.2);">
                    ${words[currentIndex]}
                </div>
                <div style="margin-top:50px; color:#e74c3c; font-size:1.5rem; letter-spacing:2px; font-weight:bold;">FAMILY & RELATIVES</div>
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
