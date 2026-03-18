/**
 * VETO PROGRAM - Vocabulary Module (GitHub Direct Link Version)
 * File: L-1-1-S-2-Voc.js
 */

(function() {
    // الرابط الأساسي للملفات الخام على GitHub
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
                    cursor: pointer;
                }
                #audio-unlocker {
                    position: absolute; inset: 0; z-index: 9999;
                    background: rgba(0,0,0,0.9); display: flex;
                    justify-content: center; align-items: center;
                }
                .unlock-btn {
                    padding: 25px 50px; border: 3px solid #c5a059;
                    color: #c5a059; font-size: 2.2rem; border-radius: 15px;
                    background: none; cursor: pointer; font-weight: bold;
                }
            </style>
            <div class="vocabulary-viewer">
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
        const audio = new Audio(words[currentIndex].audio);
        // نضبط النوع لضمان أن المتصفح يفهم أنه ملف wav
        audio.type = 'audio/wav'; 
        audio.play().catch(err => {
            console.error("Veto Audio Error:", err);
            alert("تاكد من اتصال الانترنت أو مسار الملف");
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
