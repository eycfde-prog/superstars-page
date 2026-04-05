(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // كلمات مغامرة البيتزا الفضائية
    const words = [
        "astronaut", "spaceship", "window", "stars", "explore", 
        "rocks", "hungry", "pizza", "oven", "gravity", 
        "floated", "catch", "fast", "helmet", "careful", 
        "buttons", "net", "dust", "superhero", "alien", 
        "eyes", "slice", "sound", "middle", "universe", "friend"
    ];

    let remainingWords = [...words];
    let currentTargetId = null;

    const storyTitle = "The Astronaut and the Space Pizza";
    
    let storyContent = `
        Leo was an <span class="word-gap" data-word="astronaut">?</span> who lived in a big silver <span class="word-gap" data-word="spaceship">?</span>. 
        He loved looking out of the <span class="word-gap" data-word="window">?</span> at the bright <span class="word-gap" data-word="stars">?</span> and the blue Earth. 
        His job was to <span class="word-gap" data-word="explore">?</span> new places and collect moon <span class="word-gap" data-word="rocks">?</span>.
        <br><br>
        One Friday, Leo was very <span class="word-gap" data-word="hungry">?</span>. He wanted to eat his favorite food: a cheese <span class="word-gap" data-word="pizza">?</span>. 
        He went to the space kitchen and put the pizza in the <span class="word-gap" data-word="oven">?</span>. But in space, there is no <span class="word-gap" data-word="gravity">?</span>. 
        Everything floats! Suddenly, the oven door opened, and the pizza <span class="word-gap" data-word="floated">?</span> out.
        <br><br>
        "Come back here!" Leo shouted. He tried to <span class="word-gap" data-word="catch">?</span> it, but the pizza was too <span class="word-gap" data-word="fast">?</span>. 
        It moved past his <span class="word-gap" data-word="helmet">?</span> and flew toward the control panel. 
        Leo had to be <span class="word-gap" data-word="careful">?</span> because he didn't want to break the <span class="word-gap" data-word="buttons">?</span>.
        <br><br>
        He grabbed a large <span class="word-gap" data-word="net">?</span> used for catching space <span class="word-gap" data-word="dust">?</span>. He jumped through the air like a <span class="word-gap" data-word="superhero">?</span>. 
        Finally, he caught the pizza! But then, a small green <span class="word-gap" data-word="alien">?</span> appeared on the screen of his computer. 
        The alien looked at the pizza with big <span class="word-gap" data-word="eyes">?</span>.
        <br><br>
        "Are you hungry too?" Leo asked. He shared a <span class="word-gap" data-word="slice">?</span> with his new friend. 
        The alien made a happy <span class="word-gap" data-word="sound">?</span>. Leo realized that even in the <span class="word-gap" data-word="middle">?</span> of the dark <span class="word-gap" data-word="universe">?</span>, 
        sharing a meal is the best way to make a new <span class="word-gap" data-word="friend">?</span>. 
        He finished his dinner and went to sleep, dreaming of more space adventures.
    `;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:block; background:#020617; color:#f8fafc; overflow-y:auto; padding:0; font-family: 'Exo 2', sans-serif; scroll-behavior: smooth;`;

    container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;900&family=Orbitron:wght@400;900&display=swap');
            
            #stage-content::-webkit-scrollbar { width: 10px; }
            #stage-content::-webkit-scrollbar-track { background: #020617; }
            #stage-content::-webkit-scrollbar-thumb { background: #38bdf8; border-radius: 10px; }

            .story-wrapper {
                max-width: 94%;
                margin: 40px auto;
                background: rgba(15, 23, 42, 0.8);
                padding: 60px 50px;
                border-radius: 40px;
                box-shadow: 0 0 40px rgba(56, 189, 248, 0.2);
                border: 2px solid #1e293b;
                position: relative;
                backdrop-filter: blur(10px);
            }

            .story-title {
                color: #fcd34d;
                text-align: center;
                font-size: 4.5rem;
                font-weight: 900;
                margin-bottom: 50px;
                font-family: 'Orbitron', sans-serif;
                text-shadow: 0 0 20px rgba(252, 211, 77, 0.5);
                letter-spacing: 2px;
            }

            .story-body {
                line-height: 2.2;
                font-size: 2.8rem;
                color: #e2e8f0;
                text-align: left;
                font-family: 'Exo 2', sans-serif;
            }

            .word-gap {
                display: inline-block;
                min-width: 140px;
                border: 2px solid #38bdf8;
                background: rgba(56, 189, 248, 0.1);
                text-align: center;
                color: #38bdf8;
                cursor: pointer;
                transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                border-radius: 15px;
                padding: 0 15px;
                margin: 0 5px;
            }

            .word-gap:hover {
                background: #38bdf8;
                color: #020617;
                box-shadow: 0 0 15px #38bdf8;
                transform: translateY(-5px);
            }

            .word-gap.filled {
                border-color: #fcd34d;
                color: #fcd34d;
                background: transparent;
                font-weight: 900;
                animation: zeroGravity 0.6s ease-out;
            }

            @keyframes zeroGravity {
                0% { transform: translateY(0); }
                50% { transform: translateY(-30px) rotate(10deg); }
                100% { transform: translateY(0); }
            }

            #word-overlay {
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(2, 6, 23, 0.98);
                display: none;
                flex-wrap: wrap;
                justify-content: center;
                align-content: center;
                gap: 15px;
                padding: 40px;
                z-index: 10000;
            }

            .choice-btn {
                background: #0f172a;
                color: #38bdf8;
                padding: 18px 35px;
                font-size: 2.4rem;
                font-weight: 800;
                border-radius: 20px;
                cursor: pointer;
                border: 3px solid #38bdf8;
                font-family: 'Orbitron', sans-serif;
                transition: 0.2s;
            }

            .choice-btn:hover {
                background: #38bdf8;
                color: #020617;
                box-shadow: 0 0 25px #38bdf8;
            }

            .choice-btn.wrong {
                animation: glitch 0.3s infinite;
                background: #7f1d1d !important;
                border-color: #ef4444;
                color: white;
            }

            @keyframes glitch {
                0% { transform: translate(2px, 0); }
                50% { transform: translate(-2px, 0); }
                100% { transform: translate(0, 0); }
            }

            .one-shot-badge {
                position: absolute;
                top: -25px;
                left: 50%;
                transform: translateX(-50%);
                background: #38bdf8;
                color: #020617;
                padding: 10px 60px;
                border-radius: 10px;
                font-weight: 900;
                font-size: 1.6rem;
                font-family: 'Orbitron', sans-serif;
                box-shadow: 0 5px 15px rgba(56, 189, 248, 0.4);
            }
        </style>

        <div id="word-overlay"></div>

        <div class="story-wrapper">
            <div class="one-shot-badge">MISSION: SPACE PIZZA</div>
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
