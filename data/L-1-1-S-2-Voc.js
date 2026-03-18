(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // 1. إعدادات المسارات
    // حولنا الرابط لـ raw عشان يسحب الملف المباشر
    const repoBase = "https://raw.githubusercontent.com/eycfde-prog/EYCVetoProgram/fc5b2faf47f09bdbf28a38f502d20b1bc99a63e6";
    const sessionFolder = "v1"; 
    const words = ["Eat", "Drink", "Sleep", "Go", "Come", "Run", "Walk", "Play", "Read", "Write"];
    
    let currentIndex = 0;
    let currentAudio = null;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:flex; align-items:center; justify-content:center; background:#050505; overflow:hidden; position:relative; font-family: 'Segoe UI', sans-serif; cursor: pointer;`;

    // 2. دالة تشغيل الصوت
    function playSound(index) {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        const audioPath = `${repoBase}/data/vocab/${sessionFolder}/${index + 1}.wav`;
        
        currentAudio = new Audio(audioPath);
        currentAudio.play().catch(e => {
            console.log("Interaction required: Click the screen once to enable audio.");
        });
    }

    // 3. دالة الرسم
    function renderWord() {
        let fontSize = words[currentIndex].length > 10 ? '12vw' : '16vw';

        container.innerHTML = `
            <div style="position:absolute; top:0; left:0; height:8px; background:#c5a059; width:${((currentIndex + 1) / words.length) * 100}%; transition:0.4s; box-shadow: 0 0 20px #c5a059;"></div>
            
            <div style="text-align:center; width:95%;">
                <div style="font-size:2.5vw; color:#222; margin-bottom:1vh; font-weight:900; letter-spacing:8px;">
                    ${(currentIndex + 1).toString().padStart(2, '0')} / ${words.length.toString().padStart(2, '0')}
                </div>
                
                <div id="vocabWord" style="font-size:${fontSize}; font-weight:900; color:#fff; text-transform:uppercase; letter-spacing:5px; text-shadow: 0 10px 50px rgba(0,0,0,0.8); animation: vetoEntrance 0.3s ease-out;">
                    ${words[currentIndex]}
                </div>

                <div style="margin-top:6vh; color:#c5a059; font-size:1.2vw; letter-spacing:6px; font-weight:bold; opacity:0.6;">
                    CLICK SCREEN ONCE TO START AUDIO
                </div>
            </div>

            <style>
                @keyframes vetoEntrance {
                    from { opacity: 0; transform: translateY(30px) scale(0.9); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
            </style>
        `;

        playSound(currentIndex);
    }

    // 4. نظام التحكم (كيبورد + ماوس)
    document.onkeydown = (e) => {
        if ([32, 39, 13].includes(e.keyCode)) { 
            if (currentIndex < words.length - 1) { currentIndex++; renderWord(); }
            else { if (window.triggerVetoDone) window.triggerVetoDone(); }
        } 
        else if (e.keyCode === 37 && currentIndex > 0) { currentIndex--; renderWord(); }
        else if (e.keyCode === 40) { playSound(currentIndex); }
    };

    // مهم جداً: أول ضغطة للمستر على الشاشة بتفعل الصوت في المتصفح
    container.onclick = () => {
        playSound(currentIndex);
    };

    renderWord();
})();
