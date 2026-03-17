(function() {
    // 1. استهداف الحاوية الصحيحة
    const container = document.getElementById('stage-content');
    if (!container) return;

    // إعدادات المسرح Full Screen
    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:flex; align-items:center; justify-content:center; background:#050505; overflow:hidden; position:relative; font-family:'Segoe UI', sans-serif;`;

    let currentIndex = 0;
    const sessionFolder = "Verbs2"; 
    const words = [
        "Hear", "Touch", "Smell", "Taste", "Feel", "Remember", "Forget", "Believe", "Hope", "Want",
        "Need", "Love", "Like", "Hate", "Wait", "Meet", "Ask", "Answer", "Tell", "Say",
        "Call", "Send", "Receive", "Bring", "Carry", "Hold", "Catch", "Throw", "Win", "Lose",
        "Start", "Finish", "Try", "Change", "Fix", "Break", "Build", "Spend", "Save", "Borrow",
        "Lend", "Pay", "Cost", "Choose", "Decide", "Explain", "Travel", "Fly", "Stay", "Leave"
    ];

    function playSound(index) {
        const audioPath = `data/vocab/${sessionFolder}/${index + 1}.mp3`;
        const audio = new Audio(audioPath);
        audio.play().catch(e => console.log("Audio waiting for interaction..."));
    }

    function renderWord() {
        // حساب حجم الخط بناءً على طول الكلمة لضمان عدم خروجها عن الإطار
        let fontSize = words[currentIndex].length > 10 ? '10vw' : '15vw';

        container.innerHTML = `
            <div style="position:absolute; top:0; left:0; height:6px; background:#c5a059; width:${((currentIndex + 1) / words.length) * 100}%; transition:0.4s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 0 15px #c5a059;"></div>
            
            <div style="text-align:center; width:90%; animation: vetoFadeIn 0.3s ease-out;">
                <div style="font-size:2vw; color:#333; margin-bottom:20px; font-weight:bold; letter-spacing:10px;">
                    WORD ${currentIndex + 1} / ${words.length}
                </div>
                
                <div id="vocabWord" style="font-size:${fontSize}; font-weight:900; color:#fff; text-transform:uppercase; letter-spacing:8px; text-shadow: 0 10px 30px rgba(0,0,0,0.8);">
                    ${words[currentIndex]}
                </div>
                
                <div style="margin-top:60px; color:#c5a059; font-size:1.8vw; letter-spacing:5px; font-weight:bold; opacity:0.8;">
                    VERBS GROUP 2
                </div>
            </div>

            <style>
                @keyframes vetoFadeIn {
                    from { opacity: 0; transform: translateY(20px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
            </style>
        `;
        playSound(currentIndex);
    }

    // التحكم الاحترافي بالكيبورد (دعم Enter و Space و Arrows)
    document.onkeydown = (e) => {
        if ([32, 39, 13].includes(e.keyCode)) { // Right, Space, Enter
            if (currentIndex < words.length - 1) {
                currentIndex++;
                renderWord();
            } else {
                // تفعيل نهاية النشاط عند مستر عز
                if (window.triggerVetoDone) window.triggerVetoDone();
            }
        } else if (e.keyCode === 37) { // Left
            if (currentIndex > 0) {
                currentIndex--;
                renderWord();
            }
        }
    };

    renderWord();
})();
