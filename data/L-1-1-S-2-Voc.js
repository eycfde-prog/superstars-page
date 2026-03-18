/**
 * VETO PROGRAM - Vocabulary Module (Direct GitHub Raw)
 * File: L-1-1-S-2-Voc.js
 */

(function() {
    // الرابط الخام المباشر (Raw) لضمان التشغيل
    const rawBase = "https://raw.githubusercontent.com/eycfde-prog/EYCVetoProgram/main/data/vocab/";

    const words = [
        { text: "eat", audio: rawBase + "1.wav" },
        { text: "drink", audio: rawBase + "2.wav" },
        { text: "fly", audio: rawBase + "3.wav" },
        { text: "read", audio: rawBase + "4.wav" } // ضفت لك الرابعة كمان
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
                    text-shadow: 0 0 50px rgba(197, 160, 89, 0.5);
                    cursor: pointer; transition: 0.3s;
                }
                .word-display:active { transform: scale(0.9); opacity: 0.8; }
                
                #audio-unlocker {
                    position: absolute; inset: 0; z-index: 9999;
                    background: #000; display: flex;
                    justify-content: center; align-items: center;
                }
                .unlock-btn {
                    padding: 25px 60px; border: 4px solid #c5a059;
                    color: #c5a059; font-size: 2.5rem; border-radius: 15px;
                    background: none; cursor: pointer; font-weight: bold;
                }
            </style>
            
            <div class="vocabulary-viewer">
                <audio id="veto-player" crossorigin="anonymous"></audio>

                <div id="audio-unlocker" onclick="unlockAudio()">
                    <button class="unlock-btn">START LESSON</button>
                </div>
                
                <div id="word-target" class="word-display" onclick="playCurrentAudio()"></div>
            </div>
        `;
    };

    window.unlockAudio = function() {
        document.getElementById('audio-unlocker').style.display = 'none';
        renderWord();
    };

    window.playCurrentAudio = function() {
        const player = document.getElementById('veto-player');
        player.src = words[currentIndex].audio;
        player.load();
        
        player.play().catch(err => {
            console.error("Veto Audio Error:", err);
            // لو فشل، هنجرب نفتح الرابط في تاب جديد للتأكد
            console.log("Check this link manually:", words[currentIndex].audio);
        });
    };

    const renderWord = () => {
        document.getElementById('word-target').innerText = words[currentIndex].text;
        playCurrentAudio();
    };

    // التحكم بالـ Next و Prev من الـ Main App
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
