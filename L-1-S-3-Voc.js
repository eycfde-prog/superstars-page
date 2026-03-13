(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // إعداد الحاوية: خلفية سوداء بالكامل لتبريز الكلمة
    container.innerHTML = ''; 
    container.style.cssText = `height:calc(100vh - 200px); display:flex; align-items:center; justify-content:center; background:#000; overflow:hidden; position:relative; font-family:'Poppins', sans-serif;`;

    let currentIndex = 0;
    const sessionFolder = "Verbs1"; // اسم المجلد الفرعي داخل vocab
    
    // قائمة الـ 50 فعلاً الأكثر استخداماً للمستوى الأول
    const words = [
        "Eat", "Drink", "Sleep", "Go", "Come", "Run", "Walk", "Play", "Read", "Write",
        "Speak", "Listen", "Look", "See", "Watch", "Open", "Close", "Sit", "Stand", "Jump",
        "Swim", "Drive", "Ride", "Give", "Take", "Buy", "Sell", "Help", "Work", "Study",
        "Learn", "Teach", "Cook", "Clean", "Wash", "Cut", "Draw", "Paint", "Sing", "Dance",
        "Smile", "Laugh", "Cry", "Think", "Know", "Make", "Use", "Push", "Pull", "Stop"
    ];

    function playSound(index) {
        // المسار: data/vocab/Verbs1/1.mp3 ... 50.mp3
        const audioPath = `data/vocab/${sessionFolder}/${index + 1}.mp3`;
        const audio = new Audio(audioPath);
        audio.play().catch(e => console.warn("Audio file check: " + audioPath));
    }

    function renderWord() {
        container.innerHTML = `
            <div style="text-align:center; width: 100%;">
                <div style="font-size:1.5rem; color:#333; margin-bottom:30px; letter-spacing:2px;">
                    PROGRESS: ${currentIndex + 1} / 50
                </div>
                <div id="vocabWord" style="font-size:15vw; font-weight:900; color:#fff; text-transform:uppercase; transition: all 0.3s ease;">
                    ${words[currentIndex]}
                </div>
                <div style="margin-top:60px; color:#e74c3c; font-size:1rem; letter-spacing:3px; opacity:0.6; animation: pulse 2s infinite;">
                    USE ARROWS OR SPACE TO NAVIGATE
                </div>
            </div>
            <style>
                @keyframes pulse {
                    0% { opacity: 0.2; }
                    50% { opacity: 0.7; }
                    100% { opacity: 0.2; }
                }
            </style>
        `;
        playSound(currentIndex);
    }

    // نظام التحكم باللوحة
    document.onkeydown = (e) => {
        if (e.keyCode === 39 || e.keyCode === 32) { // سهم يمين أو مسافة (التالي)
            if (currentIndex < words.length - 1) {
                currentIndex++;
                renderWord();
            }
        } else if (e.keyCode === 37) { // سهم يسار (السابق)
            if (currentIndex > 0) {
                currentIndex--;
                renderWord();
            }
        }
    };

    // التشغيل المبدئي
    renderWord();
})();
