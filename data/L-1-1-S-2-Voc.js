(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // 1. الإعدادات الأساسية (يمكنك إضافة الكلمات هنا)
    const words = ["Eat", "Drink", "Sleep", "Go", "Come", "Run", "Walk", "Play", "Read", "Write"];
    
    let currentIndex = 0;
    let currentAudio = null;

    // تهيئة المسرح (Blackboard Theme)
    container.innerHTML = ''; 
    container.style.cssText = `
        height:100%; 
        width:100%; 
        display:flex; 
        align-items:center; 
        justify-content:center; 
        background:#050505; 
        overflow:hidden; 
        position:relative; 
        font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    `;

    // دالة تشغيل الصوت بالمسار الجديد (Direct Path)
    function playSound(index) {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        // المسار المعدل حسب طلبك: data/vocab/1.wav, 2.wav ...
        const audioPath = `data/vocab/${index + 1}.wav`;
        currentAudio = new Audio(audioPath);
        
        currentAudio.play().catch(e => {
            console.warn("Audio Context: Interaction needed or File not found at " + audioPath);
        });
    }

    function renderWord() {
        // حساب حجم الخط بناءً على طول الكلمة (قاعدة الـ 4 أمتار)
        let fontSize = words[currentIndex].length > 8 ? '14vw' : '18vw';

        container.innerHTML = `
            <div style="position:absolute; top:0; left:0; height:10px; background:linear-gradient(90deg, #c5a059, #ffd700); width:${((currentIndex + 1) / words.length) * 100}%; transition:0.5s ease-out; box-shadow: 0 0 25px rgba(197, 160, 89, 0.6);"></div>
            
            <div style="text-align:center; width:100%;">
                <div style="font-size:2.8vw; color:rgba(255,255,255,0.2); margin-bottom:2vh; font-weight:900; letter-spacing:10px;">
                    ${(currentIndex + 1).toString().padStart(2, '0')} <span style="color:#c5a059;">/</span> ${words.length.toString().padStart(2, '0')}
                </div>
                
                <div id="vocabWord" style="font-size:${fontSize}; font-weight:950; color:#ffffff; text-transform:uppercase; letter-spacing:8px; cursor:pointer; text-shadow: 0 15px 60px rgba(0,0,0,1), 0 0 30px rgba(255,255,255,0.1); animation: vetoEntrance 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
                    ${words[currentIndex]}
                </div>

                <div style="margin-top:8vh; display:flex; align-items:center; justify-content:center; gap:30px; opacity:0.5;">
                    <div style="height:2px; width:80px; background:linear-gradient(to left, #c5a059, transparent);"></div>
                    <div style="color:#c5a059; font-size:1.5vw; letter-spacing:8px; font-weight:bold;">VETO PROGRAM</div>
                    <div style="height:2px; width:80px; background:linear-gradient(to right, #c5a059, transparent);"></div>
                </div>
            </div>

            <style>
                @keyframes vetoEntrance {
                    from { opacity: 0; transform: scale(0.8) translateY(50px); filter: blur(15px); }
                    to { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
                }
                #vocabWord:active { transform: scale(0.95); transition: 0.1s; color: #c5a059; }
            </style>
        `;

        // تشغيل الصوت فور العرض
        playSound(currentIndex);

        // إعادة الصوت عند الضغط على الكلمة
        document.getElementById('vocabWord').onclick = () => playSound(currentIndex);
    }

    // نظام التحكم (Keyboard Shortcuts)
    document.onkeydown = (e) => {
        if ([32, 39, 13].includes(e.keyCode)) { // Space, Right, Enter (Next)
            e.preventDefault();
            if (currentIndex < words.length - 1) {
                currentIndex++;
                renderWord();
            } else {
                if (window.parent && window.parent.triggerVetoDone) window.parent.triggerVetoDone();
                else if (window.triggerVetoDone) window.triggerVetoDone();
            }
        } 
        else if (e.keyCode === 37 && currentIndex > 0) { // Left (Back)
            currentIndex--;
            renderWord();
        }
        else if (e.keyCode === 40 || e.keyCode === 38) { // Down/Up (Repeat Sound)
            playSound(currentIndex);
        }
    };

    renderWord();
})();
