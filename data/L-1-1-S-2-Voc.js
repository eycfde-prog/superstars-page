/**
 * VETO PROGRAM - Vocabulary Module (Anti-Block Version)
 * File: L-1-1-S-2-Voc.js
 */

(function() {
    const words = [
        { text: "eat", audioPath: "data/vocab/1.wav" },
        { text: "drink", audioPath: "data/vocab/2.wav" },
        { text: "fly", audioPath: "data/vocab/3.wav" }
    ];

    let currentIndex = 0;
    const stage = document.getElementById('stage-content');
    
    // حل مشكلة الحظر: Pre-load sounds into an object
    const sounds = {};
    words.forEach((w, index) => {
        sounds[index] = new Audio(w.audioPath);
    });

    const initUI = () => {
        stage.innerHTML = `
            <style>
                .vocabulary-viewer {
                    height: 100%; display: flex; justify-content: center;
                    align-items: center; background: #000; color: #c5a059;
                    font-family: 'Segoe UI', sans-serif; overflow: hidden;
                }
                .word-display {
                    font-size: 25vw; font-weight: 900; text-transform: uppercase;
                    text-shadow: 0 0 40px rgba(197, 160, 89, 0.3);
                    cursor: pointer; /* عشان الطالب يعرف إنها تفاعلية */
                }
            </style>
            <div class="vocabulary-viewer" onclick="playSound()">
                <div id="word-target" class="word-display"></div>
            </div>
        `;
        renderWord();
    };

    const renderWord = () => {
        const wordObj = words[currentIndex];
        const target = document.getElementById('word-target');
        
        target.innerText = wordObj.text;
        
        // تشغيل الصوت (هيعمل لو المتصفح سمح، لو مسمحش هينتظر أول ضغطة)
        playSound();
    };

    // وظيفة تشغيل الصوت الذكية
    window.playSound = function() {
        const audio = sounds[currentIndex];
        if (audio) {
            audio.currentTime = 0; // البدء من البداية
            audio.play().catch(e => {
                console.log("Waiting for user interaction to play audio...");
            });
        }
    };

    window.nextSlide = function() {
        if (currentIndex < words.length - 1) {
            currentIndex++;
            renderWord();
        }
    };

    window.prevSlide = function() {
        if (currentIndex > 0) {
            currentIndex--;
            renderWord();
        }
    };

    initUI();
})();
