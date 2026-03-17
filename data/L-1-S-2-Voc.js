(function() {
    // 1. استهداف الحاوية الموحدة
    const container = document.getElementById('stage-content');
    if (!container) return;

    // إعدادات المسرح (Full Black)
    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:flex; align-items:center; justify-content:center; background:#000; overflow:hidden; position:relative; font-family: 'Segoe UI', sans-serif;`;

    let currentIndex = 0;
    const sessionFolder = "Verbs1"; // اسم المجلد داخل vocab
    const words = [
        "Eat", "Drink", "Sleep", "Go", "Come", "Run", "Walk", "Play", "Read", "Write",
        "Speak", "Listen", "Look", "See", "Watch", "Open", "Close", "Sit", "Stand", "Jump",
        "Swim", "Drive", "Ride", "Give", "Take", "Buy", "Sell", "Help", "Work", "Study",
        "Learn", "Teach", "Cook", "Clean", "Wash", "Cut", "Draw", "Paint", "Sing", "Dance",
        "Smile", "Laugh", "Cry", "Think", "Know", "Make", "Use", "Push", "Pull", "Stop"
    ];

    function playSound(index) {
        const audioPath = `data/vocab/${sessionFolder}/${index + 1}.mp3`;
        const audio = new Audio(audioPath);
        // محاولة تشغيل الصوت تلقائياً
        audio.play().catch(e => console.log("Audio waiting for user interaction..."));
    }

    function renderWord() {
        container.innerHTML = `
            <div style="text-align:center; animation: fadeIn 0.3s ease;">
                <div style="font-size:1.5rem; color:#444; margin-bottom:20px; font-weight:bold;">
                    WORD ${currentIndex + 1} / ${words.length}
                </div>
                <div id="vocabWord" style="font-size:10rem; font-weight:900; color:#fff; text-transform:uppercase; letter-spacing:8px; text-shadow: 0 0 20px rgba(255,255,255,0.2);">
                    ${words[currentIndex]}
                </div>
                <div style="margin-top:60px; color:#c5a059; font-size:1.5rem; letter-spacing:2px; opacity:0.8; font-weight:bold;">
                    PRESS SPACE OR ARROW TO MOVE
                </div>
            </div>
        `;
        playSound(currentIndex);
    }

    // التحكم بلوحة المفاتيح
    document.onkeydown = (e) => {
        if (e.keyCode === 39 || e.keyCode === 32 || e.keyCode === 13) { // سهم يمين، مسافة، إنتر
            if (currentIndex < words.length - 1) {
                currentIndex++;
                renderWord();
            } else {
                // 2. تفعيل شاشة النهاية وزر الاختبار عند الوصول لآخر كلمة
                if (window.triggerVetoDone) window.triggerVetoDone();
            }
        } else if (e.keyCode === 37) { // سهم يسار للرجوع
            if (currentIndex > 0) {
                currentIndex--;
                renderWord();
            }
        }
    };

    renderWord();
})();
