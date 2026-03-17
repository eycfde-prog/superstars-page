(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // تثبيت الستايلات العامة للمسرح بمقاييس فيتو
    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:flex; align-items:center; justify-content:center; background:#050505; overflow:hidden; position:relative; font-family: 'Segoe UI', sans-serif;`;

    let currentIndex = 0;
    const sessionFolder = "Verbs1"; 
    const words = ["Eat", "Drink", "Sleep", "Go", "Come", "Run", "Walk", "Play", "Read", "Write"]; // عينة

    function playSound(index) {
        const audio = new Audio(`data/vocab/${sessionFolder}/${index + 1}.mp3`);
        audio.play().catch(e => console.log("Audio Focus Required"));
    }

    function renderWord() {
        // حساب حجم الخط ديناميكياً (كل ما الكلمة تطول الخط يصغر شوية عشان ميتكسرش)
        let fontSize = words[currentIndex].length > 10 ? '10vw' : '15vw';

        container.innerHTML = `
            <div style="position:absolute; top:0; left:0; height:5px; background:var(--primary-gold, #c5a059); width:${((currentIndex+1)/words.length)*100}%; transition:0.3s;"></div>
            
            <div style="text-align:center; width:90%;">
                <div style="font-size:2vw; color:#333; margin-bottom:10px; font-weight:bold; letter-spacing:5px;">
                    ${currentIndex + 1} / ${words.length}
                </div>
                
                <div id="vocabWord" style="font-size:${fontSize}; font-weight:900; color:#fff; text-transform:uppercase; letter-spacing:10px; text-shadow: 0 10px 30px rgba(0,0,0,0.5); animation: vetoZoomIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
                    ${words[currentIndex]}
                </div>

                <div style="margin-top:4vh; color:#c5a059; font-size:1.5vw; letter-spacing:4px; opacity:0.5; font-weight:bold;">
                    VETO VOCAB SYSTEM
                </div>
            </div>

            <style>
                @keyframes vetoZoomIn {
                    from { opacity: 0; transform: scale(0.8); }
                    to { opacity: 1; transform: scale(1); }
                }
            </style>
        `;
        playSound(currentIndex);
    }

    document.onkeydown = (e) => {
        if ([32, 39, 13].includes(e.keyCode)) { // Space, Right, Enter
            if (currentIndex < words.length - 1) {
                currentIndex++;
                renderWord();
            } else {
                if (window.triggerVetoDone) window.triggerVetoDone();
            }
        } else if (e.keyCode === 37 && currentIndex > 0) { // Left
            currentIndex--;
            renderWord();
        }
    };

    renderWord();
})();
