/**
 * VETO PROGRAM - Vocabulary Module (Final Audio Fix)
 * File: L-1-1-S-2-Voc.js
 */

(function() {
    // استخدام الرابط المباشر الصحيح
    const baseURL = "https://raw.githubusercontent.com/eycfde-prog/EYCVetoProgram/main/data/vocab/";

    const words = [
        { text: "eat", audio: baseURL + "1.wav" },
        { text: "drink", audio: baseURL + "2.wav" },
        { text: "fly", audio: baseURL + "3.wav" }
    ];

    let currentIndex = 0;
    const stage = document.getElementById('stage-content');

    const initUI = () => {
        stage.innerHTML = `
            <style>
                .vocabulary-viewer {
                    height: 100%; display: flex; justify-content: center;
                    align-items: center; background: #000; color: #c5a059;
                    font-family: 'Segoe UI', sans-serif; position: relative;
                }
                .word-display {
                    font-size: 25vw; font-weight: 900; text-transform: uppercase;
                    text-shadow: 0 0 40px rgba(197, 160, 89, 0.4);
                }
                #audio-unlocker {
                    position: absolute; inset: 0; z-index: 9999;
                    background: rgba(0,0,0,0.95); display: flex;
                    justify-content: center; align-items: center;
                }
                .unlock-btn {
                    padding: 25px 60px; border: 4px solid #c5a059;
                    color: #c5a059; font-size: 2.5rem; border-radius: 15px;
                    background: none; cursor: pointer; font-weight: bold;
                    transition: 0.3s;
                }
                .unlock-btn:hover { background: #c5a059; color: #000; }
            </style>
            
            <div class="vocabulary-viewer">
                <audio id="veto-audio-player" preload="auto"></audio>

                <div id="audio-unlocker" onclick="unlockAudio()">
                    <button class="unlock-btn">READY TO START</button>
                </div>
                
                <div id="word-target" class="word-display"></div>
            </div>
        `;
    };

    window.unlockAudio = function() {
        document.getElementById('audio-unlocker').style.display = 'none';
        renderWord();
    };

    window.playCurrentAudio = function() {
        const player = document.getElementById('veto-audio-player');
        // تغيير المصدر
        player.src = words[currentIndex].audio;
        player.load(); // إجبار المتصفح على تحميل الملف الجديد
        
        player.play().catch(err => {
            console.error("Veto Audio Error:", err);
            // محاولة أخيرة لو الـ wav معصلج: تنبيه المدرس
            if(err.name === "NotSupportedError") {
                console.warn("المتصفح مش قادر يشغل صيغة الـ wav دي. جرب تحولها لـ mp3 أو اتأكد من الرابط.");
            }
        });
    };

    const renderWord = () => {
        document.getElementById('word-target').innerText = words[currentIndex].text;
        playCurrentAudio();
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
