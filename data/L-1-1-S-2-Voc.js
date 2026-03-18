/**
 * VETO PROGRAM - Vocabulary Module (Pro Audio Unlocker)
 * File: L-1-1-S-2-Voc.js
 */

(function() {
    const words = [
        { text: "eat", audio: "data/vocab/1.wav" },
        { text: "drink", audio: "data/vocab/2.wav" },
        { text: "fly", audio: "data/vocab/3.wav" }
    ];

    let currentIndex = 0;
    let audioUnlocked = false; 
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
                    text-shadow: 0 0 40px rgba(197, 160, 89, 0.3);
                }
                /* طبقة فك الحظر */
                #audio-unlocker {
                    position: absolute; inset: 0; z-index: 9999;
                    background: rgba(0,0,0,0.8); display: flex;
                    justify-content: center; align-items: center;
                    cursor: pointer;
                }
                .unlock-btn {
                    padding: 20px 40px; border: 2px solid #c5a059;
                    color: #c5a059; font-size: 2rem; border-radius: 50px;
                    background: none; transition: 0.3s;
                }
                .unlock-btn:hover { background: #c5a059; color: #000; }
            </style>
            
            <div class="vocabulary-viewer">
                <div id="audio-unlocker" onclick="unlockAudio()">
                    <button class="unlock-btn">CLICK TO START SESSION ✨</button>
                </div>
                
                <div id="word-target" class="word-display" onclick="playCurrentAudio()"></div>
            </div>
        `;
    };

    // وظيفة فك الحظر وتشغيل أول كلمة
    window.unlockAudio = function() {
        audioUnlocked = true;
        document.getElementById('audio-unlocker').style.display = 'none';
        renderWord(); // ابدأ العرض
    };

    window.playCurrentAudio = function() {
        const audio = new Audio(words[currentIndex].audio);
        audio.play().catch(err => console.log("Still blocked:", err));
    };

    const renderWord = () => {
        const target = document.getElementById('word-target');
        target.innerText = words[currentIndex].text;
        
        // لو فكينا الحظر، شغل الصوت فوراً
        if(audioUnlocked) {
            playCurrentAudio();
        }
    };

    // اختصارات الكيبورد (التنفيذ)
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
