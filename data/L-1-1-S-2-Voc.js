(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // 1. الإعدادات
    const sessionFolder = "v1"; 
    const words = ["Eat", "Drink", "Sleep", "Go", "Come", "Run", "Walk", "Play", "Read", "Write"];
    
    let currentIndex = 0;
    let audioList = {}; // تخزين الملفات هنا للسرعة

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:flex; align-items:center; justify-content:center; background:#050505; overflow:hidden; position:relative; font-family: 'Segoe UI', sans-serif;`;

    // 2. وظيفة تشغيل الصوت مع معالجة الخطأ
    function playSound(index) {
        const audioPath = `data/vocab/${sessionFolder}/${index + 1}.wav`;
        
        // لو الصوت مش متحمل قبل كده، حمله
        if (!audioList[index]) {
            audioList[index] = new Audio(audioPath);
        }

        const currentAudio = audioList[index];
        currentAudio.currentTime = 0; // يبدأ من الأول كل مرة

        currentAudio.play().catch(e => {
            console.error("Veto Audio Error: Check if file exists at " + audioPath);
            // إظهار تنبيه بصري بسيط للمستر لو الصوت معلق
            const notify = document.getElementById('sound-notify');
            if(notify) {
                notify.innerText = "🔇 Audio Blocked - Click Screen";
                notify.style.opacity = "1";
            }
        });
    }

    function renderWord() {
        let fontSize = words[currentIndex].length > 10 ? '12vw' : '16vw';

        container.innerHTML = `
            <div style="position:absolute; top:0; left:0; height:8px; background:#c5a059; width:${((currentIndex + 1) / words.length) * 100}%; transition:0.4s; box-shadow: 0 0 20px #c5a059;"></div>
            
            <div id="sound-notify" style="position:absolute; top:20px; right:20px; color:#e74c3c; font-size:1vw; opacity:0; transition:0.5s; font-weight:bold;"></div>

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
                    from { opacity: 0; transform: translateY(30px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
            </style>
        `;

        playSound(currentIndex);
        
        // تفعيل الصوت عند الضغط بالماوس (يحل مشكلة الـ Interaction Needed)
        document.getElementById('vocabWord').onclick = () => {
            const notify = document.getElementById('sound-notify');
            if(notify) notify.style.opacity = "0"; // شيل التنبيه لو المستر ضغط
            playSound(currentIndex);
        };
    }

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
        else if (e.keyCode === 40) { 
            playSound(currentIndex);
        }
    };

    renderWord();
})();
