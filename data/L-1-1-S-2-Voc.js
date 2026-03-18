(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // إعدادات المسارات - تأكد من مطابقة حالة الأحرف والامتداد .wav
    const repoBase = "https://raw.githubusercontent.com/eycfde-prog/EYCVetoProgram/fc5b2faf47f09bdbf28a38f502d20b1bc99a63e6";
    const sessionFolder = "v1"; 
    const words = ["Eat", "Drink", "Sleep", "Go", "Come", "Run", "Walk", "Play", "Read", "Write"];
    
    let currentIndex = 0;
    let audioContextUnlocked = false;

    // تنسيق الحاوية الرئيسي (Veto Black Style)
    container.innerHTML = ''; 
    container.style.cssText = `
        height:100%; width:100%; display:flex; align-items:center; justify-content:center; 
        background:#000; overflow:hidden; position:relative; font-family: 'Segoe UI', sans-serif;
    `;

    // وظيفة تشغيل الصوت مع معالجة الأخطاء
    function playVetoSound(index) {
        const audioPath = `${repoBase}/data/vocab/${sessionFolder}/${index + 1}.wav`;
        const audio = new Audio(audioPath);
        
        audio.play().catch(error => {
            console.warn("Autoplay blocked: Click screen once to enable audio.");
            // وميض أحمر بسيط في حالة فشل الصوت للتنبيه
            document.getElementById('vocabWord').style.color = '#ff4757';
            setTimeout(() => { document.getElementById('vocabWord').style.color = '#fff'; }, 300);
        });
    }

    function renderWord() {
        // حساب حجم الخط ديناميكياً ليناسب الشاشة الكبيرة
        let fontSize = words[currentIndex].length > 8 ? '14vw' : '18vw';

        container.innerHTML = `
            <div style="position:absolute; top:0; left:0; height:12px; background:#c5a059; width:${((currentIndex + 1) / words.length) * 100}%; transition:0.5s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 0 25px #c5a059;"></div>
            
            <div style="text-align:center; width:95%; user-select:none;">
                <div style="font-size:3.5rem; color:rgba(197, 160, 89, 0.5); margin-bottom:1vh; font-weight:900; letter-spacing:15px;">
                    ${(currentIndex + 1).toString().padStart(2, '0')} / ${words.length.toString().padStart(2, '0')}
                </div>
                
                <div id="vocabWord" style="font-size:${fontSize}; font-weight:900; color:#fff; text-transform:uppercase; letter-spacing:8px; text-shadow: 0 20px 80px rgba(0,0,0,0.8); transition: 0.3s; cursor:pointer;">
                    ${words[currentIndex]}
                </div>

                <div style="margin-top:10vh; color:#c5a059; font-size:1.8rem; letter-spacing:12px; font-weight:bold; opacity:0.3;">
                    VETO SYSTEM v1.0
                </div>
            </div>

            <style>
                #vocabWord { animation: vetoZoomIn 0.5s ease-out; }
                @keyframes vetoZoomIn {
                    from { opacity: 0; transform: scale(0.5); filter: blur(20px); }
                    to { opacity: 1; transform: scale(1); filter: blur(0); }
                }
                #vocabWord:active { transform: scale(0.95); color: #c5a059; }
            </style>
        `;

        // محاولة تشغيل الصوت
        playVetoSound(currentIndex);
    }

    // التحكم عبر الكيبورد (السبورة الذكية)
    document.onkeydown = (e) => {
        if ([32, 39, 13].includes(e.keyCode)) { // Enter, Space, Right
            if (currentIndex < words.length - 1) { 
                currentIndex++; 
                renderWord(); 
            }
        } 
        else if (e.keyCode === 37 && currentIndex > 0) { // Left
            currentIndex--; 
            renderWord(); 
        }
        else if (e.keyCode === 38 || e.keyCode === 40) { // Up/Down لتكرار الصوت
            playVetoSound(currentIndex);
        }
    };

    // تفعيل الصوت عند أول ضغطة على الشاشة (حل مشكلة المتصفح)
    container.onclick = () => {
        if(!audioContextUnlocked) audioContextUnlocked = true;
        playVetoSound(currentIndex);
    };

    renderWord();
})();
