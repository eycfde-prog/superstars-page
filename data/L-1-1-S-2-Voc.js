/**
 * VETO PROGRAM - Vocabulary Slide Engine
 * Activity: L-1-1-S-2-Voc
 * Developer: Veto Architect
 */

(function() {
    const words = ["eat", "drink", "fly"];
    let currentIndex = 0;
    const stage = document.getElementById('stage-content');

    // 1. إنشاء واجهة العرض (The Slide Screen)
    stage.innerHTML = `
        <div id="slide-container" style="
            height: 100%; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            background: #000;
            color: #fff;
            overflow: hidden;
            text-transform: uppercase;
        ">
            <h1 id="word-display" style="
                font-size: 25vw; 
                font-weight: 900; 
                letter-spacing: -5px;
                text-shadow: 0 0 50px rgba(197, 160, 89, 0.4);
                transition: all 0.5s ease;
                color: #c5a059;
            "></h1>
        </div>
    `;

    const display = document.getElementById('word-display');

    // 2. وظيفة التحديث (Update Function)
    window.renderWord = function() {
        display.style.opacity = "0";
        display.style.transform = "scale(0.8)";
        
        setTimeout(() => {
            display.innerText = words[currentIndex];
            display.style.opacity = "1";
            display.style.transform = "scale(1)";
        }, 200);
    };

    // 3. ربط الدوال مع نظام التنقل في vetoof.html
    window.nextSlide = function() {
        if (currentIndex < words.length - 1) {
            currentIndex++;
            renderWord();
        } else {
            // تأثير بصري عند الوصول للنهاية
            display.style.color = "#ff4757"; 
            setTimeout(() => display.style.color = "#c5a059", 500);
        }
    };

    window.prevSlide = function() {
        if (currentIndex > 0) {
            currentIndex--;
            renderWord();
        }
    };

    // التشغيل الأول
    renderWord();
})();
