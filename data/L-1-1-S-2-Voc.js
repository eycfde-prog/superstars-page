(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // الرابط المباشر الصحيح للملفات الخام (Raw)
    const repoBase = "https://raw.githubusercontent.com/eycfde-prog/EYCVetoProgram/fc5b2faf47f09bdbf28a38f502d20b1bc99a63e6";
    const sessionFolder = "v1"; 
    const words = ["Eat", "Drink", "Sleep", "Go", "Come", "Run", "Walk", "Play", "Read", "Write"];
    
    let currentIndex = 0;
    let currentAudio = null;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:flex; align-items:center; justify-content:center; background:#050505; overflow:hidden; position:relative; font-family: 'Segoe UI', sans-serif; cursor:pointer;`;

    function playSound(index) {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        // بناء المسار المباشر للملف (data/vocab/v1/1.wav)
        const audioPath = `${repoBase}/data/vocab/${sessionFolder}/${index + 1}.wav`;
        
        console.log("Attempting to play:", audioPath);
        
        currentAudio = new Audio(audioPath);
        currentAudio.play().catch(error => {
            console.warn("Audio blocked. Please CLICK the word on screen.");
        });
    }

    function renderWord() {
        let fontSize = words[currentIndex].length > 10 ? '12vw' : '15vw';

        container.innerHTML = `
            <div style="position:absolute; top:0; left:0; height:10px; background:#c5a059; width:${((currentIndex + 1) / words.length) * 100}%; transition:0.3s; box-shadow: 0 0 20px #c5a059;"></div>
            
            <div style="text-align:center; width:95%; user-select:none;">
                <div style="font-size:3rem; color:#1a1a1a; margin-bottom:2vh; font-weight:900; letter-spacing:10px;">
                    ${(currentIndex + 1).toString().padStart(2, '0')} / ${words.length.toString().padStart(2, '0')}
                </div>
                
                <div id="vocabWord" style="font-size:${fontSize}; font-weight:900; color:#fff; text-transform:uppercase; letter-spacing:5px; text-shadow: 0 10px 60px rgba(0,0,0,0.9); animation: vetoEntrance 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); cursor:pointer;">
                    ${words[currentIndex]}
                </div>

                <div style="margin-top:8vh; color:#c5a059; font-size:1.5rem; letter-spacing:10px; font-weight:bold; opacity:0.4;">
                    VETO VOCAB SYSTEM
                </div>
            </div>

            <style>
                @keyframes vetoEntrance {
                    from { opacity: 0; transform: scale(0.8); filter: blur(10px); }
                    to { opacity: 1; transform: scale(1); filter: blur(0); }
                }
                #vocabWord:hover { color: #c5a059; transition: 0.2s; }
            </style>
        `;

        // تشغيل الصوت
        playSound(currentIndex);

        // ربط الضغط على الكلمة بتشغيل الصوت (لحل مشكلة المتصفح)
        document.getElementById('vocabWord').onclick = (e) => {
            e.stopPropagation();
            playSound(currentIndex);
        };
    }

    document.onkeydown = (e) => {
        if ([32, 39, 13].includes(e.keyCode)) { // Next
            if (currentIndex < words.length - 1) { 
                currentIndex++; 
                renderWord(); 
            } else { 
                if (window.triggerVetoDone) window.triggerVetoDone(); 
            }
        } 
        else if (e.keyCode === 37 && currentIndex > 0) { // Back
            currentIndex--; 
            renderWord(); 
        }
        else if (e.keyCode === 40 || e.keyCode === 38) { // Up/Down to replay
            playSound(currentIndex);
        }
    };

    // أي ضغطة في الحاوية تشغل الصوت (للتفعيل الأول)
    container.onclick = () => playSound(currentIndex);

    renderWord();
})();
