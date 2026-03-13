(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:calc(100vh - 200px); display:flex; align-items:center; justify-content:center; background:#000; overflow:hidden; position:relative;`;

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
        audio.play().catch(e => console.log("Audio file not found:", audioPath));
    }

    function renderWord() {
        container.innerHTML = `
            <div style="text-align:center;">
                <div style="font-size:15px; color:#444; margin-bottom:20px;">Word ${currentIndex + 1} / 50</div>
                <div id="vocabWord" style="font-size:10rem; font-weight:900; color:#fff; text-transform:uppercase; letter-spacing:8px; text-shadow: 0 0 25px rgba(231, 76, 60, 0.4);">
                    ${words[currentIndex]}
                </div>
                <div style="margin-top:50px; color:#e74c3c; font-size:1.8rem; letter-spacing:5px; font-weight:bold;">WILD & MARINE ANIMALS</div>
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
