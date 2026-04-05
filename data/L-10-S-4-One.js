(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // كلمات مباراة كأس عالم الغابة
    const words = [
        "electric", "defending", "underdogs", "spectators", "anticipation", 
        "prestige", "reputation", "aggressive", "formidable", "agility", 
        "coordinated", "referee", "kick-off", "possession", "physical", 
        "intimidate", "miraculous", "flexibility", "goalless", "strategy", 
        "superior", "counter-attacks", "precise", "chaos", "retaliate", 
        "historic", "outmatched", "trophy"
    ];

    let remainingWords = [...words];
    let currentTargetId = null;

    const storyTitle = "The Jungle World Cup Final";
    
    let storyContent = `
        The atmosphere in the Great Valley Stadium was <span class="word-gap" data-word="electric">?</span>. 
        It was the day of the annual Animal World Cup, and the <span class="word-gap" data-word="defending">?</span> champions, the Lions, 
        were facing the <span class="word-gap" data-word="underdogs">?</span>, the Gazelles. 
        The <span class="word-gap" data-word="spectators">?</span> were roaring in <span class="word-gap" data-word="anticipation">?</span>. 
        This wasn't just a game; it was a matter of <span class="word-gap" data-word="prestige">?</span>.
        <br><br>
        The Lions had a <span class="word-gap" data-word="reputation">?</span> for being <span class="word-gap" data-word="aggressive">?</span> on the field. 
        Their captain, Leo, had a <span class="word-gap" data-word="formidable">?</span> shot. On the other hand, the Gazelles relied on their 
        <span class="word-gap" data-word="agility">?</span> and <span class="word-gap" data-word="coordinated">?</span> passing. 
        The <span class="word-gap" data-word="referee">?</span> blew the whistle to signal the <span class="word-gap" data-word="kick-off">?</span>.
        <br><br>
        In the first half, the Lions dominated the <span class="word-gap" data-word="possession">?</span>. 
        They played a <span class="word-gap" data-word="physical">?</span> game, trying to <span class="word-gap" data-word="intimidate">?</span> their opponents. 
        However, the Gazelles’ goalkeeper made several <span class="word-gap" data-word="miraculous">?</span> saves with incredible <span class="word-gap" data-word="flexibility">?</span>. 
        The score remained <span class="word-gap" data-word="goalless">?</span> until the break.
        <br><br>
        In the second half, the <span class="word-gap" data-word="strategy">?</span> changed. 
        The Gazelles used their <span class="word-gap" data-word="superior">?</span> speed to create <span class="word-gap" data-word="counter-attacks">?</span>. 
        With a <span class="word-gap" data-word="precise">?</span> strike, they scored! The stadium erupted in <span class="word-gap" data-word="chaos">?</span>.
        <br><br>
        The Lions tried to <span class="word-gap" data-word="retaliate">?</span>, but the Gazelles pulled off a <span class="word-gap" data-word="historic">?</span> upset. 
        Brute strength was <span class="word-gap" data-word="outmatched">?</span> by teamwork. The Gazelles lifted the <span class="word-gap" data-word="trophy">?</span> as legends.
    `;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:block; background:#064e3b; color:#f8fafc; overflow-y:auto; padding:0; font-family: 'Bebas Neue', sans-serif; scroll-behavior: smooth;`;

    container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto+Condensed:wght@400;700&display=swap');
            
            #stage-content::-webkit-scrollbar { width: 10px; }
            #stage-content::-webkit-scrollbar-track { background: #064e3b; }
            #stage-content::-webkit-scrollbar-thumb { background: #4ade80; border-radius: 10px; }

            .story-wrapper {
                max-width: 92%;
                margin: 40px auto;
                background: linear-gradient(to bottom, #065f46, #064e3b);
                padding: 60px 45px;
                border-radius: 15px;
                box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                border: 3px solid #059669;
                position: relative;
                background-image: radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px);
                background-size: 30px 30px;
            }

            .story-title {
                color: #fde047;
                text-align: center;
                font-size: 5rem;
                margin-bottom: 40px;
                font-family: 'Bebas Neue', cursive;
                text-shadow: 3px 3px 0px #14532d;
                letter-spacing: 3px;
            }

            .story-body {
                line-height: 1.9;
                font-size: 2.8rem;
                color: #ecfdf5;
                text-align: left;
                font-family: 'Roboto Condensed', sans-serif;
            }

            .word-gap {
                display: inline-block;
                min-width: 140px;
                border: 2px solid #fde047;
                background: rgba(252, 224, 71, 0.1);
                text-align: center;
                color: #fde047;
                cursor: pointer;
                transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                border-radius: 4px;
                padding: 0 10px;
            }

            .word-gap:hover {
                background: #fde047;
                color: #064e3b;
                transform: scale(1.05) rotate(-1deg);
            }

            .word-gap.filled {
                border: none;
                color: #fff;
                font-weight: bold;
                background: #16a34a;
                box-shadow: 0 0 15px #4ade80;
                animation: goalCelebrate 0.6s ease-out;
            }

            @keyframes goalCelebrate {
                0% { transform: scale(0.5); }
                50% { transform: scale(1.4) rotate(10deg); }
                100% { transform: scale(1); }
            }

            #word-overlay {
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(6, 78, 59, 0.98);
                display: none;
                flex-wrap: wrap;
                justify-content: center;
                align-content: center;
                gap: 12px;
                padding: 40px;
                z-index: 10000;
            }

            .choice-btn {
                background: #064e3b;
                color: #fde047;
                padding: 15px 30px;
                font-size: 2.2rem;
                font-weight: 700;
                border-radius: 8px;
                cursor: pointer;
                border: 2px solid #fde047;
                font-family: 'Bebas Neue', cursive;
                transition: 0.2s;
            }

            .choice-btn:hover {
                background: #fde047;
                color: #064e3b;
                transform: translateY(-5px);
            }

            .choice-btn.wrong {
                animation: whistleRef 0.4s;
                background: #991b1b !important;
                border-color: #ef4444;
                color: white;
            }

            @keyframes whistleRef {
                0%, 100% { transform: translateX(0); }
                20%, 60% { transform: translateX(-10px); }
                40%, 80% { transform: translateX(10px); }
            }

            .one-shot-badge {
                position: absolute;
                top: -20px;
                left: 50%;
                transform: translateX(-50%);
                background: #fde047;
                color: #064e3b;
                padding: 5px 40px;
                font-weight: 900;
                font-size: 1.5rem;
                border-radius: 50px;
                box-shadow: 0 5px 0 #14532d;
            }
        </style>

        <div id="word-overlay"></div>

        <div class="story-wrapper">
            <div class="one-shot-badge">LIVE: FINAL MATCH</div>
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
