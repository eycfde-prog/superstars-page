(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // 1. الإعدادات الأساسية (تقدر تغير الكلمات والفولدر هنا)
    const sessionFolder = "v1"; 
    const words = ["Eat", "Drink", "Sleep", "Go", "Come", "Run", "Walk", "Play", "Read", "Write"];
    
    let currentIndex = 0;
    let currentAudio = null;

    // تهيئة المسرح
    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:flex; align-items:center; justify-content:center; background:#050505; overflow:hidden; position:relative; font-family: 'Segoe UI', sans-serif;`;

    function playSound(index) {
        // إيقاف أي صوت شغال حالياً قبل البدء في الجديد
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        // المسار: data/vocab/v1/1.wav
        const audioPath = `data/vocab/${sessionFolder}/${index + 1}.wav`;
        currentAudio = new Audio(audioPath);
        
        currentAudio.play().catch(e => {
            console.warn("Audio Context: Interaction needed or File not found at " + audioPath);
        });
    }

    function renderWord() {
        // حجم خط ضخم للكلمات القصيرة وذكي للكلمات الطويلة
        let fontSize = words[currentIndex].length > 10 ? '12vw' : '16vw';

        container.innerHTML = `
            <div style="position:absolute; top:0; left:0; height:8px; background:#c5a059; width:${((currentIndex + 1) / words.length) * 100}%; transition:0.4s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 0 20px #c5a059;"></div>
            
            <div style="text-align:center; width:95%;">
                <div style="font-size:2.5vw; color:#222; margin-bottom:1vh; font-weight:900; letter-spacing:8px;">
                    ${(currentIndex + 1).toString().padStart(2, '0')} / ${words.length.toString().padStart(2, '0')}
                </div>
                
                <div id="vocabWord" style="font-size:${fontSize}; font-weight:900; color:#fff; text-transform:uppercase; letter-spacing:5px; cursor:pointer; text-shadow: 0 10px 50px rgba(0,0,0,0.8); animation: vetoEntrance 0.3s ease-out;">
                    ${words[currentIndex]}
                </div>

                <div style="margin-top:6vh; display:flex; align-items:center; justify-content:center; gap:20px;">
                    <div style="height:2px; width:50px; background:#c5a059; opacity:0.3;"></div>
                    <div style="color:#c5a059; font-size:1.2vw; letter-spacing:6px; font-weight:bold; opacity:0.6;">VETO VOCAB</div>
                    <div style="height:2px; width:50px; background:#c5a059; opacity:0.3;"></div>
                </div>
            </div>

            <style>
                @keyframes vetoEntrance {
                    from { opacity: 0; transform: translateY(30px) scale(0.95); filter: blur(10px); }
                    to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
                }
                #vocabWord:active { transform: scale(0.98); opacity: 0.8; transition: 0.1s; }
            </style>
        `;

        // تشغيل الصوت فور عرض الكلمة
        playSound(currentIndex);

        // لو المستر ضغط على الكلمة يعيد الصوت
        document.getElementById('vocabWord').onclick = () => playSound(currentIndex);
    }

    // نظام التحكم بالكيبورد
    document.onkeydown = (e) => {
        if ([32, 39, 13].includes(e.keyCode)) { // Space, Right, Enter (Next)
            if (currentIndex < words.length - 1) {
                currentIndex++;
                renderWord();
            } else {
                if (window.triggerVetoDone) window.triggerVetoDone();
            }
        } 
        else if (e.keyCode === 37 && currentIndex > 0) { // Left (Back)
            currentIndex--;
            renderWord();
        }
        else if (e.keyCode === 40) { // Down Arrow (Repeat Sound)
            playSound(currentIndex);
        }
    };

    renderWord();
})();
