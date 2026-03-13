(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:calc(100vh - 200px); display:flex; align-items:center; justify-content:center; background:#000; overflow:hidden; position:relative;`;

    let currentPairIndex = 0;
    let showOpposite = false;
    const sessionFolder = "Adjectives1"; 

    const adjectives = [
        { a: "Big", o: "Small" }, { a: "Tall", o: "Short" }, { a: "Fast", o: "Slow" },
        { a: "Hot", o: "Cold" }, { a: "Happy", o: "Sad" }, { a: "Good", o: "Bad" },
        { a: "Expensive", o: "Cheap" }, { a: "New", o: "Old" }, { a: "Rich", o: "Poor" },
        { a: "Strong", o: "Weak" }, { a: "Clean", o: "Dirty" }, { a: "Heavy", o: "Light" },
        { a: "Hard", o: "Soft" }, { a: "Long", o: "Short" }, { a: "Wide", o: "Narrow" },
        { g: "Full", o: "Empty" }, { a: "Safe", o: "Dangerous" }, { a: "Easy", o: "Difficult" },
        { a: "Useful", o: "Useless" }, { a: "Brave", o: "Coward" }, { a: "Healthy", o: "Sick" },
        { a: "Early", o: "Late" }, { a: "Beautiful", o: "Ugly" }, { a: "Right", o: "Wrong" },
        { a: "Young", o: "Old" }
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

                    <div style="font-size:10rem; font-weight:900; color:#f1c40f; text-transform:uppercase; opacity:${showOpposite ? 1 : 0}; transition:0.5s; transform: scale(${showOpposite ? 1 : 0.8});">
                        ${pair.o}
                    </div>
                </div>

                <div style="color:#444; font-size:1rem;">Press SPACE to reveal opposite / ARROW to move</div>
            </div>
        `;

        // تشغيل الصوت: الكلمة الأولى رقم فردي، الثانية رقم زوجي
        const soundNum = showOpposite ? (currentPairIndex * 2) + 2 : (currentPairIndex * 2) + 1;
        playSound(soundNum);
    }

    document.onkeydown = (e) => {
        if (e.keyCode === 32) { // SPACE to show opposite
            if (!showOpposite) {
                showOpposite = true;
                render();
            }
        } else if (e.keyCode === 39) { // Next Pair
            if (currentPairIndex < adjectives.length - 1) {
                currentPairIndex++;
                showOpposite = false;
                render();
            }
        } else if (e.keyCode === 37) { // Previous Pair
            if (currentPairIndex > 0) {
                currentPairIndex--;
                showOpposite = false;
                render();
            }
        }
    };

    render();
})();
