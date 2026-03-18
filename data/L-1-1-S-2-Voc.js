(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // إعدادات المسارات - تأكد من مطابقة حالة الأحرف في GitHub
    const repoBase = "https://raw.githubusercontent.com/eycfde-prog/EYCVetoProgram/fc5b2faf47f09bdbf28a38f502d20b1bc99a63e6";
    const sessionFolder = "v1"; 
    const words = ["Eat", "Drink", "Sleep", "Go", "Come", "Run", "Walk", "Play", "Read", "Write"];
    
    let currentIndex = 0;
    let audioContextUnlocked = false;

    // تنسيق الحاوية الرئيسي (Dark Mode Optimized)
    container.innerHTML = ''; 
    container.style.cssText = `
        height:100%; width:100%; display:flex; align-items:center; 
        justify-content:center; background:#000; overflow:hidden; 
        position:relative; font-family: 'Segoe UI', sans-serif; cursor:pointer;
    `;

    // وظيفة تشغيل الصوت الذكية
    function playVetoAudio(index) {
        const audioPath = `${repoBase}/data/vocab/${sessionFolder}/${index + 1}.wav`;
        const audio = new Audio(audioPath);
        
        audio.play().catch(error => {
            console.error("Audio Playback Failed:", error);
            // إشعار بصري للمدرس في حالة الحظر
            document.getElementById('vocabWord').style.color = '#ff4757';
        });
    }

    window.renderWord = function() {
        const currentWord = words[currentIndex];
        // حجم خط عملاق يتناسب مع طول الكلمة (Rule of 4 Meters)
        let fontSize = currentWord.length > 8 ? '12vw' : '18vw';

        container.innerHTML = `
            <div style="position:absolute; top:0; left:0; height:8px; background:#c5a059; width:${((currentIndex + 1) / words.length) * 100}%; transition:0.5s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 0 20px #c5a059;"></div>
            
            <div style="text-align:center; width:90%; z-index:10;">
                <div style="font-size:2.5rem; color:rgba(255,255,255,0.2); margin-bottom:2vh; font-weight:900; letter-spacing:15px;">
                    ${(currentIndex + 1).toString().padStart(2, '0')} / ${words.length.toString().padStart(2, '0')}
                </div>
                
                <div id="vocabWord" style="font-size:${fontSize}; font-weight:900; color:#fff; text-transform:uppercase; letter-spacing:-2px; line-height:1; transition: 0.2s;">
                    ${currentWord}
                </div>

                <div style="margin-top:10vh; color:#c5a059; font-size:1.2rem; letter-spacing:12px; font-weight:bold; opacity:0.3;">
                    VETO SYSTEM • LEVEL 1
                </div>
            </div>

            <style>
                #vocabWord { animation: vetoSlideIn 0.5s ease-out; }
                @keyframes vetoSlideIn {
                    0% { opacity: 0; transform: translateY(30px) scale(0.9); filter: blur(10px); }
                    100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
                }
                #vocabWord:active { transform: scale(0.95); color: #c5a059; }
            </style>
        `;

        // تشغيل الصوت فور الرندرة
        playVetoAudio(currentIndex);
    };

    // التحكم عبر الكيبورد (Enter, Space, Arrows)
    window.nextSlide = function() {
        if (currentIndex < words.length - 1) {
            currentIndex++;
            renderWord();
        } else if (window.triggerVetoDone) {
            window.triggerVetoDone();
        }
    };

    window.prevSlide = function() {
        if (currentIndex > 0) {
            currentIndex--;
            renderWord();
        }
    };

    // تفعيل الصوت مع أول ضغطة على الحاوية
    container.onclick = () => {
        if (!audioContextUnlocked) audioContextUnlocked = true;
        playVetoAudio(currentIndex);
    };

    // البدء
    renderWord();
})();
