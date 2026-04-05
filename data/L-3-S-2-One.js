(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // كلمات رحلة الزمن الملعونة
    const words = [
        "clumsy", "research", "centuries", "prototype", "construction", 
        "fascinated", "bathrobe", "suspicion", "spy", "genius", 
        "ridiculous", "chase", "vibrate", "holograms", "toasters", 
        "assistance", "brochure", "inevitable", "malfunctioning", "desperate", 
        "vortex", "pet", "conclusion"
    ];

    let remainingWords = [...words];
    let currentTargetId = null;

    const storyTitle = "The Time Traveler’s Broken Remote";
    
    let storyContent = `
        Professor Barnaby was a brilliant scientist, but he was also incredibly <span class="word-gap" data-word="clumsy">?</span>. 
        After years of intense <span class="word-gap" data-word="research">?</span>, he finally invented a device that could transport a human through time. 
        It looked exactly like a television remote, but instead of changing channels, it changed <span class="word-gap" data-word="centuries">?</span>.
        <br><br>
        One evening, while trying to change the volume on his actual TV, he accidentally pressed the "Ancient Egypt" button on his <span class="word-gap" data-word="prototype">?</span>. 
        In a flash of blue light, the Professor vanished. He found himself standing in the middle of a <span class="word-gap" data-word="construction">?</span> site—he was at the base of the Great Pyramid.
        <br><br>
        The Professor was <span class="word-gap" data-word="fascinated">?</span> by the workers, but he had a major problem. He was wearing a neon pink <span class="word-gap" data-word="bathrobe">?</span> and holding a half-eaten sandwich. 
        The Egyptian guards looked at him with great <span class="word-gap" data-word="suspicion">?</span>. They thought he was a <span class="word-gap" data-word="spy">?</span> from a rival kingdom.
        <br><br>
        "Wait!" the Professor shouted, waving his remote. "I am a <span class="word-gap" data-word="genius">?</span> from the future!" 
        The guards didn't understand English, but they did understand that the Professor looked <span class="word-gap" data-word="ridiculous">?</span>. They began to <span class="word-gap" data-word="chase">?</span> him around the Sphinx.
        <br><br>
        As he ran, Barnaby desperately pressed buttons on his remote. Suddenly, the ground began to <span class="word-gap" data-word="vibrate">?</span>. 
        Instead of going home, he was transported to the year 3000. The air was filled with <span class="word-gap" data-word="holograms">?</span>, and robots were walking dogs that looked like <span class="word-gap" data-word="toasters">?</span>.
        <br><br>
        He tried to ask a robot for <span class="word-gap" data-word="assistance">?</span>, but the robot just handed him a digital <span class="word-gap" data-word="brochure">?</span> about "Oxygen Subscriptions." 
        The Professor felt a sense of <span class="word-gap" data-word="inevitable">?</span> doom. He realized his remote was <span class="word-gap" data-word="malfunctioning">?</span> because he had spilled coffee on it earlier that morning.
        <br><br>
        In a final, <span class="word-gap" data-word="desperate">?</span> attempt, he whacked the remote against his knee. The device sparked, and he was sucked into a <span class="word-gap" data-word="vortex">?</span>. 
        He landed with a loud thud back in his living room, right on top of his <span class="word-gap" data-word="pet">?</span> cat.
        <br><br>
        The Professor looked at the remote and then at his cat. He decided that the past was too dusty and the future was too expensive. 
        The <span class="word-gap" data-word="conclusion">?</span> he reached was simple: the present moment is the only place where you can find a decent cup of coffee.
    `;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:block; background:#020617; color:#cbd5e1; overflow-y:auto; padding:0; font-family: 'Space Grotesk', sans-serif; scroll-behavior: smooth;`;

    container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=Orbitron:wght@600;900&display=swap');
            
            #stage-content::-webkit-scrollbar { width: 8px; }
            #stage-content::-webkit-scrollbar-track { background: #020617; }
            #stage-content::-webkit-scrollbar-thumb { background: #22d3ee; border-radius: 10px; box-shadow: 0 0 10px #22d3ee; }

            .story-wrapper {
                max-width: 90%;
                margin: 40px auto;
                background: rgba(15, 23, 42, 0.8);
                padding: 60px 40px;
                border-radius: 25px;
                box-shadow: 0 0 40px rgba(34, 211, 238, 0.2);
                border: 2px solid #1e293b;
                backdrop-filter: blur(10px);
                position: relative;
            }

            .story-title {
                color: #22d3ee;
                text-align: center;
                font-size: 4.2rem;
                font-weight: 900;
                margin-bottom: 50px;
                font-family: 'Orbitron', sans-serif;
                text-transform: uppercase;
                letter-spacing: 4px;
                filter: drop-shadow(0 0 10px rgba(34, 211, 238, 0.5));
            }

            .story-body {
                line-height: 2;
                font-size: 2.7rem;
                color: #e2e8f0;
                text-align: left;
                font-family: 'Space Grotesk', sans-serif;
            }

            .word-gap {
                display: inline-block;
                min-width: 140px;
                border: 2px solid #22d3ee;
                background: rgba(34, 211, 238, 0.1);
                text-align: center;
                color: #22d3ee;
                cursor: pointer;
                transition: all 0.3s;
                border-radius: 12px;
                padding: 2px 15px;
                margin: 0 5px;
                box-shadow: inset 0 0 10px rgba(34, 211, 238, 0.1);
            }

            .word-gap:hover {
                background: #22d3ee;
                color: #020617;
                box-shadow: 0 0 20px #22d3ee;
            }

            .word-gap.filled {
                border: none;
                color: #f472b6;
                font-weight: bold;
                background: transparent;
                animation: glitch 0.4s ease-out;
            }

            @keyframes glitch {
                0% { transform: skew(10deg); opacity: 0.5; }
                50% { transform: skew(-10deg); color: #fff; }
                100% { transform: skew(0deg); opacity: 1; }
            }

            #word-overlay {
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(2, 6, 23, 0.95);
                display: none;
                flex-wrap: wrap;
                justify-content: center;
                align-content: center;
                gap: 20px;
                padding: 40px;
                z-index: 1000;
            }

            .choice-btn {
                background: transparent;
                color: #22d3ee;
                padding: 20px 40px;
                font-size: 2.4rem;
                font-weight: bold;
                border-radius: 12px;
                cursor: pointer;
                border: 2px solid #22d3ee;
                font-family: 'Orbitron', sans-serif;
                transition: 0.3s;
            }

            .choice-btn:hover {
                background: #22d3ee;
                color: #020617;
                box-shadow: 0 0 30px #22d3ee;
            }

            .choice-btn.wrong {
                animation: vibrate 0.3s;
                border-color: #f43f5e;
                color: #f43f5e;
            }

            @keyframes vibrate {
                0% { transform: translate(0); }
                20% { transform: translate(-5px, 5px); }
                40% { transform: translate(-5px, -5px); }
                60% { transform: translate(5px, 5px); }
                80% { transform: translate(5px, -5px); }
                100% { transform: translate(0); }
            }

            .one-shot-badge {
                position: absolute;
                top: -25px;
                left: 50%;
                transform: translateX(-50%);
                background: #22d3ee;
                color: #020617;
                padding: 8px 40px;
                border-radius: 10px;
                font-weight: 900;
                font-size: 1.8rem;
                font-family: 'Orbitron', sans-serif;
            }
        </style>

        <div id="word-overlay"></div>

        <div class="story-wrapper">
            <div class="one-shot-badge">SYSTEM: ACTIVE</div>
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
            setTimeout(() => btnElement.classList.remove('wrong'), 300);
        }
    };

    document.querySelectorAll('.word-gap').forEach(gap => {
        gap.onclick = () => openOverlay(gap);
    });

    document.onkeydown = (e) => {
        if (e.keyCode === 32) if (window.triggerVetoDone) window.triggerVetoDone();
    };
})();
