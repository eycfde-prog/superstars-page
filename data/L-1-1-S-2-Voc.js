(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    const words = ["Eat", "Drink", "Sleep", "Go", "Come", "Run", "Walk", "Play", "Read", "Write"];
    let currentIndex = 0;
    let currentAudio = null;
    let isInitialized = false; // لمنع التشغيل التلقائي قبل التفاعل

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:flex; align-items:center; justify-content:center; background:#050505; position:relative; font-family: 'Segoe UI', sans-serif;`;

    // 1. شاشة البدء لكسر حماية المتصفح (The Veto Splash)
    function showStartScreen() {
        container.innerHTML = `
            <div id="startVeto" style="cursor:pointer; text-align:center; animation: pulse 1.5s infinite;">
                <div style="font-size:10vw; color:#c5a059;">🎬</div>
                <div style="font-size:2vw; color:#fff; letter-spacing:5px; margin-top:20px; font-weight:bold;">CLICK TO START SESSION</div>
            </div>
            <style>
                @keyframes pulse { 0% { opacity: 0.6; transform: scale(1); } 50% { opacity: 1; transform: scale(1.05); } 100% { opacity: 0.6; transform: scale(1); } }
            </style>
        `;
        document.getElementById('startVeto').onclick = () => {
            isInitialized = true;
            renderWord();
        };
    }

    function playSound(index) {
        if (!isInitialized) return;
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        // استخدام المسار النسبي الصحيح
        const audioPath = `data/vocab/${index + 1}.wav`;
        currentAudio = new Audio(audioPath);
        
        currentAudio.play().catch(e => {
            console.error("Veto Audio Error:", e.message);
        });
    }

    function renderWord() {
        let fontSize = words[currentIndex].length > 8 ? '14vw' : '18vw';
        container.innerHTML = `
            <div style="position:absolute; top:0; left:0; height:10px; background:linear-gradient(90deg, #c5a059, #ffd700); width:${((currentIndex + 1) / words.length) * 100}%; transition:0.5s ease-out;"></div>
            <div style="text-align:center; width:100%;">
                <div style="font-size:2.8vw; color:rgba(255,255,255,0.2); margin-bottom:2vh; font-weight:900; letter-spacing:10px;">
                    ${(currentIndex + 1).toString().padStart(2, '0')} <span style="color:#c5a059;">/</span> ${words.length.toString().padStart(2, '0')}
                </div>
                <div id="vocabWord" style="font-size:${fontSize}; font-weight:950; color:#ffffff; text-transform:uppercase; letter-spacing:8px; cursor:pointer; text-shadow: 0 15px 60px #000; animation: vetoEntrance 0.4s ease-out;">
                    ${words[currentIndex]}
                </div>
                <div style="margin-top:8vh; color:#c5a059; font-size:1.5vw; letter-spacing:8px; font-weight:bold; opacity:0.5;">VETO PROGRAM</div>
            </div>
            <style>
                @keyframes vetoEntrance { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
            </style>
        `;
        playSound(currentIndex);
        document.getElementById('vocabWord').onclick = () => playSound(currentIndex);
    }

    // الربط مع الصفحة الأم (Compatibility Bridge)
    window.nextSlide = function() {
        if (currentIndex < words.length - 1) {
            currentIndex++;
            renderWord();
        } else {
            if (typeof closeStage === 'function') closeStage();
        }
    };

    window.prevSlide = function() {
        if (currentIndex > 0) {
            currentIndex--;
            renderWord();
        }
    };

    // التحكم بالكيبورد
    document.onkeydown = (e) => {
        if ([32, 39, 13].includes(e.keyCode)) window.nextSlide();
        else if (e.keyCode === 37) window.prevSlide();
        else if (e.keyCode === 40) playSound(currentIndex);
    };

    showStartScreen(); // نبدأ بشاشة التفاعل أولاً
})();
