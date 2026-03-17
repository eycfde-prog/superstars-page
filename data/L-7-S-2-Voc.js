(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; display:flex; align-items:center; justify-content:center; background:#020202; overflow:hidden; position:relative; font-family:'Inter', sans-serif;`;

    let currentIndex = 0;
    const sessionFolder = "BodyParts"; 
    const words = [
        "Head", "Hair", "Face", "Eye", "Eyebrow", "Eyelash", "Ear", "Nose", "Mouth", "Lip",
        "Tooth", "Tongue", "Cheek", "Chin", "Neck", "Shoulder", "Arm", "Elbow", "Wrist", "Hand",
        "Finger", "Thumb", "Fingernail", "Chest", "Stomach", "Back", "Waist", "Hip", "Leg", "Knee",
        "Ankle", "Foot", "Heel", "Toe", "Skin", "Bone", "Muscle", "Blood", "Heart", "Lungs",
        "Brain", "Throat", "Shoulder blade", "Spine", "Liver", "Kidney", "Rib", "Palm", "Joint", "Body"
    ];

    function playSound(index) {
        const audioPath = `data/vocab/${sessionFolder}/${index + 1}.mp3`;
        const audio = new Audio(audioPath);
        audio.play().catch(e => console.log("Audio not found:", audioPath));
    }

    function renderWord() {
        container.innerHTML = `
            <style>
                @keyframes pulseText {
                    0% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.05); opacity: 1; }
                    100% { transform: scale(1); opacity: 0.8; }
                }
                .vocab-card {
                    text-align: center;
                    animation: fadeIn 0.5s ease-out;
                }
                .counter {
                    font-size: 1.2rem;
                    color: #444;
                    letter-spacing: 3px;
                    margin-bottom: 20px;
                    font-weight: bold;
                }
                .word-display {
                    font-size: 9rem;
                    font-weight: 900;
                    color: #fff;
                    text-transform: uppercase;
                    letter-spacing: 8px;
                    text-shadow: 0 0 30px rgba(231, 76, 60, 0.3);
                    animation: pulseText 3s infinite ease-in-out;
                }
                .category-label {
                    margin-top: 60px;
                    background: #e74c3c;
                    color: #fff;
                    padding: 10px 30px;
                    font-size: 1.4rem;
                    letter-spacing: 5px;
                    font-weight: 800;
                    border-radius: 50px;
                    display: inline-block;
                }
                .scan-line {
                    position: absolute;
                    width: 100%;
                    height: 2px;
                    background: rgba(231, 76, 60, 0.1);
                    top: 0;
                    box-shadow: 0 0 15px #e74c3c;
                    animation: scan 4s linear infinite;
                }
                @keyframes scan {
                    0% { top: 0%; }
                    100% { top: 100%; }
                }
            </style>
            <div class="scan-line"></div>
            <div class="vocab-card">
                <div class="counter">WORD ${currentIndex + 1} OF ${words.length}</div>
                <div id="vocabWord" class="word-display">
                    ${words[currentIndex]}
                </div>
                <div class="category-label">ANATOMY & BIOLOGY</div>
            </div>
        `;
        playSound(currentIndex);
    }

    document.onkeydown = (e) => {
        if (e.keyCode === 39 || e.keyCode === 32 || e.keyCode === 13) { 
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
