(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // المسار المباشر (RAW) لضمان القراءة من GitHub
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

        // بناء المسار المباشر للملف
        const audioPath = `${repoBase}/data/vocab/${sessionFolder}/${index + 1}.wav`;
        
        currentAudio = new Audio(audioPath);
        
        // محاولة التشغيل
        const playPromise = currentAudio.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // لو المتصفح منع الصوت، هنستنى أول ضغطة كيبورد أو ماوس
                console.log("Waiting for user to click or press a key to enable sound...");
            });
        }
    }

    function renderWord() {
        let fontSize = words[currentIndex].length > 10 ? '12vw' : '15vw';

        container.innerHTML = `
            <div style="position:absolute; top:0; left:0; height:8px; background:#c5a059; width:${((currentIndex + 1) / words.length) * 100}%; transition:0.4s; box-shadow: 0 0 20px rgba(197,160,89,0.4);"></div>
            
            <div style="text-align:center; width:95%;">
                <div style="font-size:2vw; color:#1a1a1a; margin-bottom:1vh; font-weight:900; letter-spacing:10px;">
                    ${(currentIndex + 1).toString().padStart(2, '0')} / ${words.length.toString().padStart(2, '0')}
                </div>
                
                <div id="vocabWord" style="font-size:${fontSize}; font-weight:900; color:#fff; text-transform:uppercase; letter-spacing:5px; text-shadow: 0 10px 50px rgba(0,0,0,0.8); animation: vetoEntrance 0.3s ease-out;">
                    ${words[currentIndex]}
                </div>

                <div style="margin-top:6vh; display:flex; align-items:center; justify-content:center; gap:20px; opacity:0.5;">
                    <div style="height:1px; width:40px; background:#c5a059;"></div>
                    <div style="color:#c5a059; font-size:1.2vw; letter-spacing:8px; font-weight:bold;">VETO SYSTEM</div>
                    <div style="height:1px; width:40px; background:#c5a059;"></div>
                </div>
            </div>

            <style>
                @keyframes vetoEntrance {
                    from { opacity: 0; transform: scale(0.9); filter: blur(10px); }
                    to { opacity: 1; transform: scale(1); filter: blur(0); }
                }
            </style>
        `;

        playSound(currentIndex);
    }

    // أول ما المستر يدوس على أي زرار، السيستم هيفهم إن الصوت مسموح به
    document.onkeydown = (e) => {
        if ([32, 39, 13].includes(e.keyCode)) { 
            if (currentIndex < words.length - 1) { 
                currentIndex++; 
                renderWord(); 
            } else { 
                if (window.triggerVetoDone) window.triggerVetoDone(); 
            }
        } 
        else if (e.keyCode === 37 && currentIndex > 0) { 
            currentIndex--; 
            renderWord(); 
        }
        else if (e.keyCode === 40) { // سهم لتحت يعيد الصوت
            playSound(currentIndex);
        }
    };

    // لو المستر ضغط بالماوس في أي حتة يشغل الصوت
    container.onclick = () => {
        playSound(currentIndex);
    };

    renderWord();
})();
