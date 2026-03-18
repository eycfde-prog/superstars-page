(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    const words = [
        "Eat", "Drink", "Sleep", "Go", "Come", "Run", "Walk", "Play", "Read", "Write",
        "Speak", "Listen", "Look", "See", "Watch", "Open", "Close", "Sit", "Stand", "Jump",
        "Swim", "Drive", "Ride", "Give", "Take", "Buy", "Sell", "Help", "Work", "Study",
        "Learn", "Teach", "Cook", "Clean", "Wash", "Cut", "Draw", "Paint", "Sing", "Dance",
        "Smile", "Laugh", "Cry", "Think", "Know", "Make", "Use", "Push", "Pull", "Stop"
    ];
    
    let currentIndex = 0;
    let currentAudio = null;
    let isInitialized = false;

    // إعداد الحاوية الرئيسية بستايل الـ Veto العريض
    container.innerHTML = ''; 
    container.style.cssText = `
        height:100%; width:100%; display:flex; align-items:center; justify-content:center; 
        background:#050505; position:relative; overflow:hidden;
        font-family: 'Inter', 'Segoe UI', sans-serif;
    `;

    // 1. شاشة البداية (Veto Splash)
    function showStartScreen() {
        container.innerHTML = `
            <div id="startVeto" style="cursor:pointer; text-align:center; transition: 0.3s;">
                <div style="font-size:12vw; filter: drop-shadow(0 0 30px #c5a059);">🎓</div>
                <div style="font-size:2.5vw; color:#fff; letter-spacing:8px; margin-top:30px; font-weight:900; text-transform:uppercase;">
                    Click to Launch Session
                </div>
                <div style="color:#c5a059; margin-top:15px; font-size:1.2vw; opacity:0.6;">VETO PROGRAM v2.0</div>
            </div>
        `;
        document.getElementById('startVeto').onclick = () => {
            isInitialized = true;
            renderWord();
        };
    }

    // 2. نظام تشغيل الصوت مع التغذية البصرية
    function playSound(index) {
        if (!isInitialized) return;
        
        const wordEl = document.getElementById('vocabWord');
        if (wordEl) {
            wordEl.style.color = '#c5a059'; // تغيير اللون عند النطق
            wordEl.style.textShadow = '0 0 50px rgba(197, 160, 89, 0.5)';
            setTimeout(() => {
                wordEl.style.color = '#ffffff';
                wordEl.style.textShadow = '0 15px 60px #000';
            }, 600);
        }

        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        const audioPath = `data/vocab/v1/${index + 1}.wav`;
        currentAudio = new Audio(audioPath);
        currentAudio.play().catch(e => console.error("Audio Error:", e.message));
    }

    // 3. عرض الكلمة (The 4-Meter Rule Layout)
    function renderWord() {
        let fontSize = words[currentIndex].length > 8 ? '15vw' : '20vw';
        
        container.innerHTML = `
            <div style="position:absolute; top:0; left:0; height:12px; background:linear-gradient(90deg, #c5a059, #ffd700); width:${((currentIndex + 1) / words.length) * 100}%; transition:0.8s cubic-bezier(0.22, 1, 0.36, 1);"></div>
            
            <div style="text-align:center; width:90%;">
                <div style="font-size:3vw; color:rgba(255,255,255,0.15); margin-bottom:1vh; font-weight:900; font-variant-numeric: tabular-nums;">
                    ${(currentIndex + 1).toString().padStart(2, '0')} <span style="color:#c5a059;">/</span> ${words.length}
                </div>
                
                <div id="vocabWord" style="font-size:${fontSize}; font-weight:900; color:#ffffff; text-transform:uppercase; letter-spacing:-2px; cursor:pointer; transition: 0.3s ease; animation: vetoSlideIn 0.5s ease-out;">
                    ${words[currentIndex]}
                </div>
                
                <div style="margin-top:10vh; color:#c5a059; font-size:1.8vw; letter-spacing:12px; font-weight:900; opacity:0.4;">VETO</div>
            </div>

            <style>
                @keyframes vetoSlideIn { 
                    from { opacity: 0; transform: translateY(50px) scale(0.95); filter: blur(10px); } 
                    to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); } 
                }
                body { background: #050505; margin: 0; overflow: hidden; }
            </style>
        `;
        
        playSound(currentIndex);
        document.getElementById('vocabWord').onclick = () => playSound(currentIndex);
    }

    // 4. نظام التحكم الذكي (The Command Bridge)
    window.nextSlide = function() {
        if (currentIndex < words.length - 1) {
            currentIndex++;
            renderWord();
        } else {
            console.log("End of Veto Session");
            if (typeof closeStage === 'function') closeStage();
        }
    };

    window.prevSlide = function() {
        if (currentIndex > 0) {
            currentIndex--;
            renderWord();
        }
    };

    // تعيين الأزرار: Enter و Right للكلمة التالية | Space و Down للصوت فقط
    document.onkeydown = (e) => {
        if (e.keyCode === 13 || e.keyCode === 39) { // Enter or Right Arrow
            window.nextSlide();
        } else if (e.keyCode === 37) { // Left Arrow
            window.prevSlide();
        } else if (e.keyCode === 32 || e.keyCode === 40) { // Space or Down Arrow
            e.preventDefault(); // منع نزول الصفحة بالمسطرة
            playSound(currentIndex);
        }
    };

    showStartScreen();
})();
