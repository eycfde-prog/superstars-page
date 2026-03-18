// VETO PROGRAM - Vocabulary Module
// Level: 1 | Session: 2 | Type: Vocab
// Designed by: Veto Architect

(function() {
    const words = [
        { text: 'eat', audio: '1.wav' },
        { text: 'drink', audio: '2.wav' },
        { text: 'fly', audio: '3.wav' }
    ];

    let currentIndex = 0;
    const audioPath = 'https://raw.githubusercontent.com/eycfde-prog/EYCVetoProgram/main/vocab/';
    const container = document.getElementById('stage-content');

    // تصفير الحاوية وبناء واجهة العرض
    function initVocab() {
        container.innerHTML = `
            <div id="vocab-display" style="
                height: 100%; 
                display: flex; 
                flex-direction: column; 
                justify-content: center; 
                align-items: center; 
                background: #000;
                cursor: pointer;
            ">
                <h1 id="word-text" style="
                    font-size: 25vw; 
                    color: #c5a059; 
                    text-transform: uppercase; 
                    font-weight: 900;
                    margin: 0;
                    text-shadow: 0 0 50px rgba(197, 160, 89, 0.3);
                "></h1>
                <div id="slide-indicator" style="
                    position: absolute; 
                    bottom: 20px; 
                    color: rgba(197, 160, 89, 0.5); 
                    font-size: 1.5rem;
                "></div>
            </div>
        `;
        renderWord();
    }

    function renderWord() {
        const wordObj = words[currentIndex];
        const textElement = document.getElementById('word-text');
        const indicator = document.getElementById('slide-indicator');

        // تحديث النص
        textElement.innerText = wordObj.text;
        indicator.innerText = `${currentIndex + 1} / ${words.length}`;

        // تشغيل الصوت
        const audio = new Audio(audioPath + wordObj.audio);
        audio.play().catch(e => console.log("Audio playback waiting for user interaction"));
        
        // تأثير دخول بسيط
        textElement.style.animation = 'none';
        textElement.offsetHeight; // Trigger reflow
        textElement.style.animation = 'zoomIn 0.4s ease-out';
    }

    // ربط الوظائف بالنافذة ليراها الكود الرئيسي في Veto Board
    window.nextSlide = function() {
        if (currentIndex < words.length - 1) {
            currentIndex++;
            renderWord();
        } else {
            // اختيارياً: العودة للبداية أو الخروج
            console.log("End of list");
        }
    };

    window.prevSlide = function() {
        if (currentIndex > 0) {
            currentIndex--;
            renderWord();
        }
    };

    // إضافة ستايل التحريك
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes zoomIn {
            from { transform: scale(0.5); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    initVocab();
})();
