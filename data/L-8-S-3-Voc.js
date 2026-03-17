(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; display:flex; align-items:center; justify-content:center; background:#0a0e14; overflow:hidden; position:relative;`;

    let currentIndex = 0;
    const sessionFolder = "School"; 
    const words = [
        "School", "Classroom", "Desk", "Chair", "Blackboard", "Whiteboard", "Chalk", "Marker", "Eraser", "Pen",
        "Pencil", "Sharpener", "Ruler", "Notebook", "Book", "Paper", "Backpack", "Pencil case", "Scissors", "Glue",
        "Tape", "Stapler", "Calculator", "Computer", "Laptop", "Tablet", "Homework", "Lesson", "Exam", "Grade",
        "Teacher", "Student", "Principal", "Library", "Laboratory", "Map", "Globe", "Dictionary", "Subject", "English",
        "Math", "Science", "History", "Geography", "Art", "Music", "Sport", "Break", "Schedule", "University"
    ];

    function playSound(index) {
        const audioPath = `data/vocab/${sessionFolder}/${index + 1}.mp3`;
        const audio = new Audio(audioPath);
        audio.play().catch(e => console.log("Audio Sync needed for:", sessionFolder));
    }

    function renderWord() {
        container.innerHTML = `
            <style>
                @keyframes wordEntry {
                    from { opacity: 0; transform: translateY(20px) scale(0.95); filter: blur(10px); }
                    to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
                }
                .academic-bg {
                    position: absolute; width: 100%; height: 100%;
                    background-image: radial-gradient(circle at 2px 2px, rgba(52, 152, 219, 0.05) 1px, transparent 0);
                    background-size: 40px 40px;
                }
                .vocab-wrapper {
                    text-align: center; z-index: 5;
                    animation: wordEntry 0.4s ease-out forwards;
                }
                .count-indicator {
                    color: #555; font-size: 1.2rem; font-weight: bold;
                    margin-bottom: 20px; text-transform: uppercase; letter-spacing: 2px;
                }
                .main-word {
                    font-size: 11rem; font-weight: 900; color: #fff;
                    text-transform: uppercase; letter-spacing: -2px;
                    text-shadow: 0 0 40px rgba(52, 152, 219, 0.4);
                    margin: 0;
                }
                .sub-label {
                    margin-top: 50px; color: #3498db; font-size: 1.6rem;
                    letter-spacing: 10px; font-weight: 800; text-transform: uppercase;
                }
                .progress-dot {
                    display: inline-block; width: 8px; height: 8px; 
                    background: #3498db; border-radius: 50%; margin: 0 5px;
                    box-shadow: 0 0 10px #3498db;
                }
            </style>

            <div class="academic-bg"></div>

            <div class="vocab-wrapper">
                <div class="count-indicator">Asset ${currentIndex + 1} / 50</div>
                <h1 class="main-word">${words[currentIndex]}</h1>
                <div class="sub-label">
                    <span class="progress-dot"></span>
                    School & Stationery
                    <span class="progress-dot"></span>
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
