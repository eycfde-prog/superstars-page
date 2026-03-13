(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // إعدادات الحاوية لتكون الشاشة سوداء بالكامل والكلمة في المنتصف
    container.innerHTML = ''; 
    container.style.cssText = `height:calc(100vh - 200px); display:flex; align-items:center; justify-content:center; background:#000; overflow:hidden; position:relative;`;

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
        audio.play().catch(e => console.log("Audio file not found or blocked:", audioPath));
    }

    function renderWord() {
        container.innerHTML = `
            <div style="text-align:center;">
                <div style="font-size:15px; color:#444; margin-bottom:20px;">Word ${currentIndex + 1} / 50</div>
                <div id="vocabWord" style="font-size:12rem; font-weight:900; color:#fff; text-transform:uppercase; letter-spacing:5px; transition: 0.5s;">
                    ${words[currentIndex]}
                </div>
                <div style="margin-top:50px; color:#e74c3c; font-size:1.2rem; opacity:0.5;">Press Space or Arrow to Move</div>
            </div>
        `;
        playSound(currentIndex);
    }

    // التحكم بلوحة المفاتيح
    document.onkeydown = (e) => {
        if (e.keyCode === 39 || e.keyCode === 32) { // سهم يمين أو مسافة
            if (currentIndex < words.length - 1) {
                currentIndex++;
                renderWord();
            }
        } else if (e.keyCode === 37) { // سهم يسار
            if (currentIndex > 0) {
                currentIndex--;
                renderWord();
            }
        }
    };

    renderWord();
})();
