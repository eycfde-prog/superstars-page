(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

const words =  [
        "Tomato", "Potato", "Onion", "Garlic", "Cucumber", "Carrot", "Corn", "Eggplant", "Pepper", "Broccoli",
        "Cauliflower", "Cabbage", "Lettuce", "Spinach", "Zucchini", "Mushroom", "Pea", "Bean", "Lentil", "Chickpea",
        "Radish", "Turnip", "Beetroot", "Sweet potato", "Pumpkin", "Celery", "Parsley", "Green Mint", "Ginger", "Chili",
        "Okra", "Artichoke", "Jute Mallow", "Taro", "Fava beans", "Spring onion", "Black-eyed Peas", "Pumpkin", "Basil", "Pepper",
        "Clover", "Clove", "Cinnamon", "Olive", "Pickle", "Soy", "Rice", "Dill", "Vinegar", "Yam"
    ];
    
    let currentIndex = 0;
    let currentAudio = null;
    let isInitialized = false;

    container.innerHTML = ''; 
    container.style.cssText = `
        height:100%; width:100%; display:flex; align-items:center; justify-content:center; 
        background:#050505; position:relative; overflow:hidden;
        font-family: 'Inter', 'Segoe UI', sans-serif;
    `;

    function showStartScreen() {
        container.innerHTML = `
            <div id="startVeto" style="cursor:pointer; text-align:center;">
                <div style="font-size:12vw; filter: drop-shadow(0 0 30px #c5a059);">🎓</div>
                <div style="font-size:2.5vw; color:#fff; letter-spacing:8px; margin-top:30px; font-weight:900; text-transform:uppercase;">
                    Click to Launch Session
                </div>
            </div>
        `;
        document.getElementById('startVeto').onclick = () => {
            isInitialized = true;
            renderWord();
        };
    }

    function playSound(index) {
        if (!isInitialized) return;
        
        const wordEl = document.getElementById('vocabWord');
        if (wordEl) {
            wordEl.style.color = '#c5a059'; 
            setTimeout(() => { if(wordEl) wordEl.style.color = '#ffffff'; }, 500);
        }

        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        const audioPath = `data/vocab/v8/${index + 1}.wav`;
        currentAudio = new Audio(audioPath);
        currentAudio.play().catch(e => console.error("Audio Error:", e.message));
    }

function renderWord() {
        const word = words[currentIndex];
        let fontSize;
        
        // منطق Veto الذكي لضبط الخط حسب طول الكلمة
        if (word.length <= 4) {
            fontSize = '22vw'; // كلمات قصيرة جداً (Eat, Go)
        } else if (word.length <= 7) {
            fontSize = '18vw'; // كلمات متوسطة (Smell, Start)
        } else if (word.length <= 9) {
            fontSize = '14vw'; // كلمات طويلة (Believe)
        } else {
            fontSize = '11vw'; // كلمات طويلة جداً (Remember)
        }
        
        container.innerHTML = `
            <div style="position:absolute; top:0; left:0; height:12px; background:linear-gradient(90deg, #c5a059, #ffd700); width:${((currentIndex + 1) / words.length) * 100}%; transition:0.6s ease-out;"></div>
            
            <div style="text-align:center; width:95%; max-width: 95vw;">
                <div style="font-size:3vw; color:rgba(255,255,255,0.15); margin-bottom:1vh; font-weight:900;">
                    ${(currentIndex + 1).toString().padStart(2, '0')} <span style="color:#c5a059;">/</span> ${words.length}
                </div>
                
                <div id="vocabWord" style="
                    font-size:${fontSize}; 
                    font-weight:900; 
                    color:#ffffff; 
                    text-transform:uppercase; 
                    letter-spacing:-2px; 
                    cursor:pointer; 
                    animation: vetoSharpIn 0.3s ease-out;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: clip;
                    display: inline-block;
                    width: 100%;
                ">
                    ${word}
                </div>
                
                <div style="margin-top:10vh; color:#c5a059; font-size:1.8vw; letter-spacing:12px; font-weight:900; opacity:0.4;">VETO</div>
            </div>

            <style>
                @keyframes vetoSharpIn { 
                    from { opacity: 0; transform: translateY(30px); } 
                    to { opacity: 1; transform: translateY(0); } 
                }
            </style>
        `;
        
        playSound(currentIndex);
        document.getElementById('vocabWord').onclick = () => playSound(currentIndex);
    }

    window.nextSlide = function() {
        if (currentIndex < words.length - 1) {
            currentIndex++;
            renderWord();
        } else if (typeof closeStage === 'function') {
            closeStage();
        }
    };

    window.prevSlide = function() {
        if (currentIndex > 0) {
            currentIndex--;
            renderWord();
        }
    };

    // نظام التحكم المطور لمنع القفز المزدوج
    document.onkeydown = (e) => {
        // منع انتشار الحدث للصفحة الأم (Prevent Bubbling)
        e.stopPropagation();

        const key = e.keyCode;

        if (key === 13 || key === 39) { // Enter or Right
            window.nextSlide();
        } 
        else if (key === 37 || key === 8) { // Left or Backspace
            window.prevSlide();
        } 
        else if (key === 32 || key === 40) { // Space or Down
            e.preventDefault();
            playSound(currentIndex);
        }
    };

    showStartScreen();
})();
