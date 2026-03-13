(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:calc(100vh - 200px); display:flex; align-items:center; justify-content:center; background:#000; overflow:hidden; position:relative;`;

    let currentPairIndex = 0;
    let showOpposite = false;
    const sessionFolder = "Adjectives2"; 

    const adjectives = [
        { a: "Thick", o: "Thin" }, { a: "Sharp", o: "Blunt" }, { a: "Bright", o: "Dim" },
        { a: "Loud", o: "Quiet" }, { a: "Brave", o: "Afraid" }, { a: "Clever", o: "Stupid" },
        { a: "Kind", o: "Cruel" }, { a: "Polite", o: "Impolite" }, { a: "Famous", o: "Unknown" },
        { a: "Busy", o: "Free" }, { a: "Public", o: "Private" }, { a: "Modern", o: "Ancient" },
        { a: "Natural", o: "Artificial" }, { a: "Sweet", o: "Sour" }, { a: "True", o: "False" },
        { a: "Normal", o: "Strange" }, { a: "Tight", o: "Loose" }, { a: "Rough", o: "Smooth" },
        { a: "Deep", o: "Shallow" }, { a: "Alive", o: "Dead" }, { a: "Same", o: "Different" },
        { a: "Useful", o: "Useless" }, { a: "Careful", o: "Careless" }, { a: "Visible", o: "Invisible" },
        { a: "Together", o: "Alone" }
    ];

    function playSound(wordNum) {
        const audioPath = `data/vocab/${sessionFolder}/${wordNum}.mp3`;
        const audio = new Audio(audioPath);
        audio.play().catch(e => console.log("Audio not found:", audioPath));
    }

    function render() {
        const pair = adjectives[currentPairIndex];
        container.innerHTML = `
            <div style="width:100%; display:flex; flex-direction:column; align-items:center; gap:50px;">
                <div style="font-size:1.5rem; color:#444;">Pair ${currentPairIndex + 1} / 25</div>
                
                <div style="display:flex; justify-content:center; align-items:center; width:100%; gap:100px;">
                    <div style="font-size:10rem; font-weight:900; color:#fff; text-transform:uppercase;">
                        ${pair.a}
                    </div>

                    <div style="font-size:5rem; color:#e74c3c; font-style:italic; opacity:${showOpposite ? 1 : 0}; transition:0.3s;">X</div>

                    <div style="font-size:10rem; font-weight:900; color:#f1c40f; text-transform:uppercase; opacity:${showOpposite ? 1 : 0}; transition:0.5s;">
                        ${pair.o}
                    </div>
                </div>

                <div style="color:#444; font-size:1rem;">Press SPACE to reveal opposite / ARROW to move</div>
            </div>
        `;

        const soundNum = showOpposite ? (currentPairIndex * 2) + 2 : (currentPairIndex * 2) + 1;
        playSound(soundNum);
    }

    document.onkeydown = (e) => {
        if (e.keyCode === 32) { // SPACE
            if (!showOpposite) {
                showOpposite = true;
                render();
            }
        } else if (e.keyCode === 39) { // Next
            if (currentPairIndex < adjectives.length - 1) {
                currentPairIndex++;
                showOpposite = false;
                render();
            }
        } else if (e.keyCode === 37) { // Previous
            if (currentPairIndex > 0) {
                currentPairIndex--;
                showOpposite = false;
                render();
            }
        }
    };

    render();
})();
