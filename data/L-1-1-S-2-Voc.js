/**
 * VETO PROGRAM - Vocabulary Module
 * File: L-1-1-S-2-Voc.js
 * Purpose: Display words (eat, drink, fly) with high visibility and audio.
 */

(function() {
    const words = [
        { text: "eat", audio: "data/vocab/1.wav" },
        { text: "drink", audio: "data/vocab/2.wav" },
        { text: "fly", audio: "data/vocab/3.wav" }
    ];

    let currentIndex = 0;
    const stage = document.getElementById('stage-content');

    // 1. Create UI Structure with High Contrast Styles
    const initUI = () => {
        stage.innerHTML = `
            <style>
                .vocabulary-viewer {
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: #000;
                    color: #c5a059; /* Veto Gold */
                    font-family: 'Segoe UI', sans-serif;
                    overflow: hidden;
                    text-transform: uppercase;
                }
                .word-display {
                    font-size: 22vw; 
                    font-weight: 900;
                    letter-spacing: 10px;
                    text-shadow: 0 0 50px rgba(197, 160, 89, 0.4);
                    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .slide-counter {
                    position: absolute;
                    bottom: 30px;
                    right: 30px;
                    color: rgba(197, 160, 89, 0.5);
                    font-size: 1.5rem;
                }
            </style>
            <div class="vocabulary-viewer">
                <div id="word-target" class="word-display"></div>
                <div class="slide-counter"><span id="current-num">1</span> / ${words.length}</div>
            </div>
        `;
        renderWord();
    };

    // 2. Rendering & Audio Logic
    const renderWord = () => {
        const wordObj = words[currentIndex];
        const target = document.getElementById('word-target');
        const numDisplay = document.getElementById('current-num');

        // Animation effect
        target.style.opacity = '0';
        target.style.transform = 'scale(0.8)';

        setTimeout(() => {
            target.innerText = wordObj.text;
            numDisplay.innerText = currentIndex + 1;
            target.style.opacity = '1';
            target.style.transform = 'scale(1)';
            
            // Play Audio
            const audio = new Audio(wordObj.audio);
            audio.play().catch(e => console.log("Audio play blocked by browser"));
        }, 200);
    };

    // 3. Navigation Controls (Compatible with Main App)
    window.nextSlide = function() {
        if (currentIndex < words.length - 1) {
            currentIndex++;
            renderWord();
        } else {
            // Shake effect if at the end
            document.getElementById('word-target').style.color = '#ff4757';
            setTimeout(() => { document.getElementById('word-target').style.color = '#c5a059'; }, 300);
        }
    };

    window.prevSlide = function() {
        if (currentIndex > 0) {
            currentIndex--;
            renderWord();
        }
    };

    // Start the module
    initUI();

})();
