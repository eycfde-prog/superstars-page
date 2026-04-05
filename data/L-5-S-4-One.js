(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // كلمات لغز المتحف
    const words = [
        "security", "kind", "sleepy", "watch", "statues", 
        "chair", "noise", "flashlight", "dinosaur", "bone", 
        "missing", "thief", "floor", "dust", "mummy", 
        "crown", "window", "mask", "puppy", "happy", 
        "grass", "prize", "angry", "biscuit", "fence", "awake"
    ];

    let remainingWords = [...words];
    let currentTargetId = null;

    const storyTitle = "The Missing Dinosaur Bone";
    
    let storyContent = `
        Mr. Higgins was a <span class="word-gap" data-word="security">?</span> guard at the City Museum. He was a very <span class="word-gap" data-word="kind">?</span> man, but he was also very <span class="word-gap" data-word="sleepy">?</span>. 
        Every night, his job was to <span class="word-gap" data-word="watch">?</span> the expensive paintings and the old <span class="word-gap" data-word="statues">?</span>.
        <br><br>
        One Tuesday night, Mr. Higgins sat on his <span class="word-gap" data-word="chair">?</span> and closed his eyes for a minute. Suddenly, he heard a <span class="word-gap" data-word="noise">?</span>. 
        "Clatter! Clatter!" He woke up and grabbed his <span class="word-gap" data-word="flashlight">?</span>. He ran to the Big Room, where the giant <span class="word-gap" data-word="dinosaur">?</span> stood. 
        Mr. Higgins gasped. One long <span class="word-gap" data-word="bone">?</span> from the dinosaur's leg was <span class="word-gap" data-word="missing">?</span>!
        <br><br>
        "Oh no!" he shouted. "A <span class="word-gap" data-word="thief">?</span> was here!" He looked at the <span class="word-gap" data-word="floor">?</span> and saw some white <span class="word-gap" data-word="dust">?</span>. 
        He followed the dust past the Egyptian <span class="word-gap" data-word="mummy">?</span> and the gold <span class="word-gap" data-word="crown">?</span>. The dust led him to a small <span class="word-gap" data-word="window">?</span> in the back of the museum.
        <br><br>
        Mr. Higgins looked outside. He didn't see a man in a black <span class="word-gap" data-word="mask">?</span>. Instead, he saw a very small <span class="word-gap" data-word="puppy">?</span>. 
        The puppy was <span class="word-gap" data-word="happy">?</span> and was chewing on the giant bone in the <span class="word-gap" data-word="grass">?</span>. The puppy thought he had found the biggest <span class="word-gap" data-word="prize">?</span> in the world!
        <br><br>
        Mr. Higgins started to laugh. He wasn't <span class="word-gap" data-word="angry">?</span> anymore. He took the bone back and gave the puppy a small <span class="word-gap" data-word="biscuit">?</span> instead. 
        The next day, the museum put a <span class="word-gap" data-word="fence">?</span> around the dinosaur so no more "thieves" could enter. Mr. Higgins stayed <span class="word-gap" data-word="awake">?</span> for the rest of the week!
    `;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:block; background:#0f172a; color:#cbd5e1; overflow-y:auto; padding:0; font-family: 'Montserrat', sans-serif; scroll-behavior: smooth;`;

    container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Special+Elite&display=swap');
            
            #stage-content::-webkit-scrollbar { width: 10px; }
            #stage-content::-webkit-scrollbar-track { background: #020617; }
            #stage-content::-webkit-scrollbar-thumb { background: #fbbf24; border-radius: 10px; }

            .story-wrapper {
                max-width: 92%;
                margin: 40px auto;
                background: linear-gradient(135deg, #1e293b, #0f172a);
                padding: 60px 50px;
                border-radius: 30px;
                box-shadow: 0 0 60px rgba(0,0,0,0.5);
                border: 4px solid #334155;
                position: relative;
            }

            .story-title {
                color: #fbbf24;
                text-align: center;
                font-size: 4.2rem;
                font-weight: 900;
                margin-bottom: 50px;
                font-family: 'Special Elite', cursive;
                text-transform: uppercase;
                letter-spacing: 3px;
                text-shadow: 2px 2px 10px rgba(251, 191, 36, 0.3);
            }

            .story-body {
                line-height: 2.2;
                font-size: 2.7rem;
                color: #e2e8f0;
                text-align: left;
                font-family: 'Montserrat', sans-serif;
            }

            .word-gap {
                display: inline-block;
                min-width: 140px;
                border-bottom: 4px dashed #fbbf24;
                text-align: center;
                color: #fbbf24;
                cursor: pointer;
                transition: 0.3s;
                background: rgba(251, 191, 36, 0.05);
                padding: 0 10px;
                margin: 0 5px;
            }

            .word-gap:hover {
                background: rgba(251, 191, 36, 0.2);
                border-bottom-style: solid;
            }

            .word-gap.filled {
                border-bottom: none;
                color: #38bdf8;
                font-weight: bold;
                background: transparent;
                animation: scanLight 0.5s ease-out;
            }

            @keyframes scanLight {
                0% { transform: scale(0.8); filter: brightness(2); }
                100% { transform: scale(1); filter: brightness(1); }
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
                z-index: 9999;
            }

            .choice-btn {
                background: #334155;
                color: #fbbf24;
                padding: 18px 35px;
                font-size: 2.3rem;
                font-weight: 700;
                border-radius: 12px;
                cursor: pointer;
                border: 2px solid #fbbf24;
                font-family: 'Montserrat', sans-serif;
                transition: 0.2s;
            }

            .choice-btn:hover {
                background: #fbbf24;
                color: #0f172a;
                transform: translateY(-5px);
                box-shadow: 0 0 20px #fbbf24;
            }

            .choice-btn.wrong {
                animation: blinkRed 0.4s;
                background: #991b1b !important;
                border-color: #f87171;
                color: white;
            }

            @keyframes blinkRed {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.3; background: red; }
            }

            .one-shot-badge {
                position: absolute;
                top: -25px;
                left: 50%;
                transform: translateX(-50%);
                background: #fbbf24;
                color: #0f172a;
                padding: 8px 50px;
                border-radius: 8px;
                font-weight: 900;
                font-size: 1.6rem;
                font-family: 'Special Elite', cursive;
            }
        </style>

        <div id="word-overlay"></div>

        <div class="story-wrapper">
            <div class="one-shot-badge">CASE #101: THE MUSEUM</div>
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
