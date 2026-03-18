/**
 * VETO PROGRAM - Vocabulary Module (Enhanced Audio)
 * Level: 1 | Session: 2 | Type: Vocab
 */

(function() {
    const words = [
        { text: 'eat', audio: '1.wav' },
        { text: 'drink', audio: '2.wav' },
        { text: 'fly', audio: '3.wav' }
    ];

    let currentIndex = 0;
    // المسار الخاص بالمستودع الرئيسي
    const audioBase = 'https://raw.githubusercontent.com/eycfde-prog/EYCVetoProgram/main/vocab/';
    const container = document.getElementById('stage-content');
    let currentAudio = new Audio();

    function initVocab() {
        container.innerHTML = `
            <div id="vocab-display" onclick="playCurrentAudio()" style="
                height: 100%; display: flex; flex-direction: column; 
                justify-content: center; align-items: center; 
                background: #000; cursor: pointer; position: relative;
            ">
                <h1 id="word-text" style="
                    font-size: 30vw; color: #c5a059; 
                    text-transform: uppercase; font-weight: 900;
                    margin: 0; text-shadow: 0 10px 30px rgba(0,0,0,0.5);
                "></h1>
                <div id="slide-indicator" style="
                    position: absolute; bottom: 30px; 
                    color: rgba(197, 160, 89, 0.4); font-size: 1.8rem;
                    font-family: sans-serif;
                "></div>
            </div>
        `;
        renderWord();
    }

    // وظيفة تشغيل الصوت مع معالجة الـ Promise
    window.playCurrentAudio = function() {
        const wordObj = words[currentIndex];
        currentAudio.src = audioBase + wordObj.audio;
        currentAudio.play().catch(err => {
            console.log("Waiting for user interaction to play audio...");
        });
    };

    function renderWord() {
        const textElement = document.getElementById('word-text');
        const indicator = document.getElementById('slide-indicator');
        
        textElement.innerText = words[currentIndex].text;
        indicator.innerText = `${currentIndex + 1} / ${words.length}`;

        // تشغيل الصوت فوراً عند الانتقال
        playCurrentAudio();

        // Animation Reset
        textElement.style.animation = 'none';
        textElement.offsetHeight; 
        textElement.style.animation = 'vSlideIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }

    // التحكم من خلال Veto Board الرئيسي
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

    // إضافة ستايل الحركات (CSS-in-JS)
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes vSlideIn {
            from { transform: translateY(50px); opacity: 0; scale: 0.8; }
            to { transform: translateY(0); opacity: 1; scale: 1; }
        }
    `;
    document.head.appendChild(style);

    initVocab();
})();
