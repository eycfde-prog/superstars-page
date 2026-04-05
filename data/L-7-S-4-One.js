(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // كلمات مغامرة الغابة المطيرة
    const words = [
        "adventure", "guide", "humid", "ferns", "sunlight", 
        "screech", "bright", "magical", "grey", "rain", 
        "waterfall", "cave", "ancient", "camera", "flash", 
        "whistling", "snake", "boots", "impressive", "still", 
        "pounding", "path", "bridge", "crocodile", "tiring", 
        "explorers", "secrets"
    ];

    let remainingWords = [...words];
    let currentTargetId = null;

    const storyTitle = "Lost in the Green Maze";
    
    let storyContent = `
        Last month, Maya and her brother Sam went on an <span class="word-gap" data-word="adventure">?</span> to the Amazon Rainforest. 
        They were accompanied by a <span class="word-gap" data-word="guide">?</span> named Marco, who knew every tree and animal. 
        The forest was very <span class="word-gap" data-word="humid">?</span>, and the air felt thick and warm. 
        Giant <span class="word-gap" data-word="ferns">?</span> covered the ground, and the trees were so thick they blocked the <span class="word-gap" data-word="sunlight">?</span>.
        <br><br>
        As they walked, they heard a loud <span class="word-gap" data-word="screech">?</span>. Looking up, they saw a <span class="word-gap" data-word="bright">?</span> parrot with red and yellow feathers. 
        "This place is <span class="word-gap" data-word="magical">?</span>!" Maya whispered. Suddenly, the sky turned <span class="word-gap" data-word="grey">?</span>, and a heavy <span class="word-gap" data-word="rain">?</span> began to fall. 
        In the rainforest, it doesn't just rain; it pours like a <span class="word-gap" data-word="waterfall">?</span>.
        <br><br>
        They looked for a place to stay dry and found a small <span class="word-gap" data-word="cave">?</span> behind some large rocks. 
        Inside, they found some <span class="word-gap" data-word="ancient">?</span> drawings on the walls. 
        Sam took out his <span class="word-gap" data-word="camera">?</span> to take a photo, but the <span class="word-gap" data-word="flash">?</span> scared a colony of bats. 
        They flew over their heads, making a <span class="word-gap" data-word="whistling">?</span> sound.
        <br><br>
        "Look at the ground!" Marco warned. A long, shiny <span class="word-gap" data-word="snake">?</span> was crawling slowly near their <span class="word-gap" data-word="boots">?</span>. 
        It wasn't dangerous, but it was very <span class="word-gap" data-word="impressive">?</span>. Marco told them to stay <span class="word-gap" data-word="still">?</span> until the snake moved away. 
        Maya felt her heart <span class="word-gap" data-word="pounding">?</span> with excitement and a little bit of fear.
        <br><br>
        When the rain stopped, they followed a narrow <span class="word-gap" data-word="path">?</span> back to their camp. They had to cross a wooden <span class="word-gap" data-word="bridge">?</span> over a muddy river. 
        Below them, they saw a small <span class="word-gap" data-word="crocodile">?</span> resting in the sun. It was a <span class="word-gap" data-word="tiring">?</span> day, but Maya and Sam felt like real <span class="word-gap" data-word="explorers">?</span>. 
        They learned that the forest is full of <span class="word-gap" data-word="secrets">?</span> if you know where to look.
    `;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:block; background:#064e3b; color:#ecfdf5; overflow-y:auto; padding:0; font-family: 'Jungle Fever', cursive; scroll-behavior: smooth;`;

    container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Luckiest+Guy&family=Patrick+Hand&display=swap');
            
            #stage-content::-webkit-scrollbar { width: 10px; }
            #stage-content::-webkit-scrollbar-track { background: #064e3b; }
            #stage-content::-webkit-scrollbar-thumb { background: #84cc16; border-radius: 10px; }

            .story-wrapper {
                max-width: 94%;
                margin: 40px auto;
                background: rgba(2, 44, 34, 0.95);
                padding: 60px 45px;
                border-radius: 25px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.4);
                border-left: 10px solid #84cc16;
                position: relative;
            }

            .story-title {
                color: #facc15;
                text-align: center;
                font-size: 4.8rem;
                font-weight: 900;
                margin-bottom: 50px;
                font-family: 'Luckiest Guy', cursive;
                text-shadow: 4px 4px 0px #3f6212;
                letter-spacing: 2px;
            }

            .story-body {
                line-height: 2.2;
                font-size: 2.8rem;
                color: #d1fae5;
                text-align: left;
                font-family: 'Patrick Hand', cursive;
            }

            .word-gap {
                display: inline-block;
                min-width: 140px;
                border-bottom: 4px dashed #84cc16;
                text-align: center;
                color: #84cc16;
                cursor: pointer;
                transition: 0.3s;
                padding: 0 10px;
                margin: 0 5px;
            }

            .word-gap:hover {
                color: #facc15;
                border-bottom-color: #facc15;
                transform: scale(1.1);
            }

            .word-gap.filled {
                border-bottom: none;
                color: #bef264;
                font-weight: bold;
                background: transparent;
                animation: vineGrow 0.5s ease-out;
            }

            @keyframes vineGrow {
                0% { transform: scale(0.5) translateY(20px); opacity: 0; }
                100% { transform: scale(1) translateY(0); opacity: 1; }
            }

            #word-overlay {
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(6, 78, 59, 0.98);
                display: none;
                flex-wrap: wrap;
                justify-content: center;
                align-content: center;
                gap: 15px;
                padding: 40px;
                z-index: 10000;
            }

            .choice-btn {
                background: #84cc16;
                color: #064e3b;
                padding: 15px 30px;
                font-size: 2.2rem;
                font-weight: 800;
                border-radius: 15px;
                cursor: pointer;
                border: 4px solid #365314;
                font-family: 'Luckiest Guy', cursive;
                transition: 0.2s;
            }

            .choice-btn:hover {
                background: #facc15;
                transform: rotate(3deg);
            }

            .choice-btn.wrong {
                animation: snakeShake 0.4s;
                background: #450a0a !important;
                color: #f87171;
            }

            @keyframes snakeShake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-15px) skewX(10deg); }
                75% { transform: translateX(15px) skewX(-10deg); }
            }

            .one-shot-badge {
                position: absolute;
                top: -30px;
                left: 50%;
                transform: translateX(-50%);
                background: #facc15;
                color: #064e3b;
                padding: 10px 60px;
                border-radius: 50px;
                font-weight: 900;
                font-size: 1.8rem;
                font-family: 'Luckiest Guy', cursive;
                box-shadow: 0 8px 0 #3f6212;
            }
        </style>

        <div id="word-overlay"></div>

        <div class="story-wrapper">
            <div class="one-shot-badge">JUNGLE EXPLORER</div>
            <h1 class="story-title">${storyTitle}</h1>
            <div class="story-body">
                ${storyContent}
            </div>
        </div>
        <div style="height: 100px;"></div>
    `;

    const overlay = document.getElementById('word-overlay');

    const openOverlay = (target) => {
        currentTargetId = target;
        overlay.innerHTML = '';
        const shuffled = [...remainingWords].sort(() => Math.random() - 0.5);
        shuffled.forEach(word => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.innerText = word;
            btn.onclick = () => checkWord(word, btn);
            overlay.appendChild(btn);
        });
        overlay.style.display = 'flex';
    };

    const checkWord = (selectedWord, btnElement) => {
        const correctWord = currentTargetId.getAttribute('data-word');
        if (selectedWord.toLowerCase() === correctWord.toLowerCase()) {
            currentTargetId.innerText = correctWord;
            currentTargetId.classList.add('filled');
            overlay.style.display = 'none';
            remainingWords = remainingWords.filter(w => w !== selectedWord);
        } else {
            btnElement.classList.add('wrong');
            setTimeout(() => btnElement.classList.remove('wrong'), 400);
        }
    };

    document.querySelectorAll('.word-gap').forEach(gap => {
        gap.onclick = () => openOverlay(gap);
    });

    document.onkeydown = (e) => {
        if (e.keyCode === 32) if (window.triggerVetoDone) window.triggerVetoDone();
    };
})();
