(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // كلمات قصة التنين سباركي
    const words = [
        "mountain", "scales", "tail", "flames", "different", 
        "mouth", "bubbles", "dragon", "sad", "lake", 
        "floating", "castle", "birthday", "party", "soap", 
        "fun", "message", "nervous", "square", "air", 
        "jump", "happy", "beautiful", "special", "hero", 
        "necklace", "kingdom", "peaceful"
    ];

    let remainingWords = [...words];
    let currentTargetId = null;

    const storyTitle = "The Dragon Who Could Not Breathe Fire";
    
    let storyContent = `
        Once upon a time, in a high <span class="word-gap" data-word="mountain">?</span>, lived a small dragon named Sparky. 
        Sparky had green <span class="word-gap" data-word="scales">?</span> and a very long <span class="word-gap" data-word="tail">?</span>. 
        All his friends could breathe big <span class="word-gap" data-word="flames">?</span> of fire, but Sparky was <span class="word-gap" data-word="different">?</span>. 
        When he opened his <span class="word-gap" data-word="mouth">?</span>, only small pink <span class="word-gap" data-word="bubbles">?</span> came out.
        <br><br>
        The other dragons laughed at him. "You are not a real <span class="word-gap" data-word="dragon">?</span>!" they said. 
        Sparky felt very <span class="word-gap" data-word="sad">?</span> and went to sit by a cold <span class="word-gap" data-word="lake">?</span>. 
        He tried and tried, but he only made more bubbles. The lake was full of <span class="word-gap" data-word="floating">?</span> pink circles.
        <br><br>
        One day, the King’s <span class="word-gap" data-word="castle">?</span> had a big problem. It was the Queen’s <span class="word-gap" data-word="birthday">?</span>, 
        and she wanted a giant <span class="word-gap" data-word="party">?</span>. But there was no <span class="word-gap" data-word="soap">?</span> to clean the dishes, 
        and the children wanted something <span class="word-gap" data-word="fun">?</span> to play with. The King sent a <span class="word-gap" data-word="message">?</span> to the mountains: "We need help!"
        <br><br>
        Sparky flew down to the castle. He was very <span class="word-gap" data-word="nervous">?</span>. He stood in the middle of the <span class="word-gap" data-word="square">?</span> and opened his mouth wide. 
        Thousands of pink bubbles filled the <span class="word-gap" data-word="air">?</span>. The children started to <span class="word-gap" data-word="jump">?</span> and catch them. They were so <span class="word-gap" data-word="happy">?</span>!
        <br><br>
        The Queen looked at the bubbles and <span class="word-gap" data-word="smiled">?</span>. "This is the most <span class="word-gap" data-word="beautiful">?</span> party ever!" she said. 
        Sparky was not sad anymore. He realized that he was <span class="word-gap" data-word="special">?</span>. 
        He didn't need fire to be a <span class="word-gap" data-word="hero">?</span>. The King gave him a golden <span class="word-gap" data-word="necklace">?</span>, 
        and Sparky became the official "Party Dragon" of the <span class="word-gap" data-word="kingdom">?</span>. 
        He lived a very <span class="word-gap" data-word="peaceful">?</span> life, making everyone laugh with his bubbles.
    `;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:block; background:#f3e8ff; color:#6b21a8; overflow-y:auto; padding:0; font-family: 'Bubblegum Sans', cursive; scroll-behavior: smooth;`;

    container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Fredoka:wght@400;700&display=swap');
            
            #stage-content::-webkit-scrollbar { width: 10px; }
            #stage-content::-webkit-scrollbar-track { background: #f3e8ff; }
            #stage-content::-webkit-scrollbar-thumb { background: #d8b4fe; border-radius: 10px; }

            .story-wrapper {
                max-width: 94%;
                margin: 40px auto;
                background: #ffffff;
                padding: 60px 45px;
                border-radius: 50px;
                box-shadow: 0 15px 0 #e9d5ff;
                border: 4px solid #c084fc;
                position: relative;
            }

            .story-title {
                color: #9333ea;
                text-align: center;
                font-size: 4.5rem;
                font-weight: 900;
                margin-bottom: 50px;
                font-family: 'Bubblegum Sans', cursive;
                text-shadow: 3px 3px 0px #f3e8ff;
                letter-spacing: 1px;
            }

            .story-body {
                line-height: 2.1;
                font-size: 2.8rem;
                color: #581c87;
                text-align: left;
                font-family: 'Fredoka', sans-serif;
            }

            .word-gap {
                display: inline-block;
                min-width: 140px;
                border: 3px solid #d8b4fe;
                background: #faf5ff;
                text-align: center;
                color: #d8b4fe;
                cursor: pointer;
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                border-radius: 25px;
                padding: 0 15px;
                margin: 0 5px;
            }

            .word-gap:hover {
                background: #f5f3ff;
                border-color: #a855f7;
                transform: scale(1.1) rotate(2deg);
            }

            .word-gap.filled {
                border: none;
                color: #ec4899;
                font-weight: bold;
                background: transparent;
                animation: bubblePop 0.6s ease-out;
            }

            @keyframes bubblePop {
                0% { transform: scale(0.5); opacity: 0; }
                50% { transform: scale(1.3); filter: brightness(1.2); }
                100% { transform: scale(1); opacity: 1; }
            }

            #word-overlay {
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(88, 28, 135, 0.95);
                display: none;
                flex-wrap: wrap;
                justify-content: center;
                align-content: center;
                gap: 15px;
                padding: 40px;
                z-index: 10000;
                backdrop-filter: blur(8px);
            }

            .choice-btn {
                background: #fff;
                color: #7e22ce;
                padding: 15px 30px;
                font-size: 2.3rem;
                font-weight: 700;
                border-radius: 30px;
                cursor: pointer;
                border: 5px solid #d8b4fe;
                font-family: 'Bubblegum Sans', cursive;
                transition: 0.2s;
                box-shadow: 0 6px 0 #d8b4fe;
            }

            .choice-btn:hover {
                background: #fdf2f8;
                border-color: #f472b6;
                color: #db2777;
                transform: translateY(-5px);
            }

            .choice-btn.wrong {
                animation: popMistake 0.4s;
                background: #fecaca !important;
                border-color: #ef4444;
            }

            @keyframes popMistake {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(0.8) rotate(-5deg); }
            }

            .one-shot-badge {
                position: absolute;
                top: -35px;
                left: 50%;
                transform: translateX(-50%);
                background: #a855f7;
                color: white;
                padding: 10px 60px;
                border-radius: 50px;
                font-weight: 900;
                font-size: 1.8rem;
                font-family: 'Bubblegum Sans', cursive;
                box-shadow: 0 8px 0 #6b21a8;
            }
        </style>

        <div id="word-overlay"></div>

        <div class="story-wrapper">
            <div class="one-shot-badge">PARTY DRAGON EDITION</div>
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
