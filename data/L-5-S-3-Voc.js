(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; display:flex; align-items:center; justify-content:center; background:#020202; overflow:hidden; position:relative; font-family: 'Inter', sans-serif;`;

    let currentIndex = 0;
    const sessionFolder = "Animals2"; 
    const words = [
        "Lion", "Tiger", "Elephant", "Giraffe", "Zebra", "Monkey", "Gorilla", "Bear", "Panda", "Kangaroo",
        "Hippo", "Rhino", "Wolf", "Fox", "Crocodile", "Alligator", "Lizard", "Snake", "Camel", "Cheetah",
        "Whale", "Dolphin", "Shark", "Octopus", "Penguin", "Seal", "Sea turtle", "Crab", "Lobster", "Shrimp",
        "Starfish", "Jellyfish", "Seahorse", "Squid", "Stingray", "Ostrich", "Eagle", "Falcon", "Vulture", "Flamingo",
        "Scorpion", "Spider", "Grasshopper", "Cockroach", "Ladybug", "Bee", "Mosquito", "Dragon", "Dinosaur", "Monster"
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
                @keyframes predatorPunch {
                    0% { transform: scale(1.5) blur(10px); opacity: 0; }
                    100% { transform: scale(1) blur(0); opacity: 1; }
                }
                .word-active { 
                    animation: predatorPunch 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
                    text-align: center; 
                }
                .progress-track { 
                    position: absolute; top: 0; left: 0; width: 100%; height: 6px; background: #1a1a1a; 
                }
                .progress-fill { 
                    height: 100%; background: #e74c3c; width: ${progress}%; 
                    transition: width 0.4s ease; box-shadow: 0 0 15px #e74c3c;
                }
            </style>
            
            <div class="progress-track"><div class="progress-fill"></div></div>
            
            <div class="word-active">
                <div style="font-size:1.1rem; color:#444; margin-bottom:20px; letter-spacing:4px; font-weight:800; text-transform:uppercase;">
                    Wild Discovery ${currentIndex + 1} / ${words.length}
                </div>
                
                <div id="vocabWord" style="font-size:10.5rem; font-weight:900; color:#fff; text-transform:uppercase; letter-spacing:6px; text-shadow: 0 0 40px rgba(231, 76, 60, 0.5);">
                    ${words[currentIndex]}
                </div>
                
                <div style="margin-top:60px; color:#e74c3c; font-size:1.8rem; letter-spacing:10px; font-weight:900; text-transform:uppercase;">
                    Wild & Marine Animals
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
                        <h1 style="color:#e74c3c; font-size:6rem; font-weight:900; letter-spacing:2px; text-transform:uppercase;">Apex Predator!</h1>
                        <p style="color:#fff; font-size:1.5rem; letter-spacing:5px;">ALL ANIMALS DISCOVERED</p>
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
