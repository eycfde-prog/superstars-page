(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // كلمات مصنع الشوكولاتة العجيب
    const words = [
        "ticket", "factory", "delicious", "iron", "overwhelming", 
        "spinning", "grind", "curious", "lever", "sleeve", 
        "conveyor", "speed", "missiles", "bucket", "caramel", 
        "chaos", "button", "emergency", "chuckle", "sample", 
        "popping", "tongue", "highlight", "science", "accident", "discovery"
    ];

    let remainingWords = [...words];
    let currentTargetId = null;

    const storyTitle = "The Secret Recipe of the Magic Factory";
    
    let storyContent = `
        Timmy was the luckiest boy in school because he won a golden <span class="word-gap" data-word="ticket">?</span> to visit the world-famous "Choco-Blast" <span class="word-gap" data-word="factory">?</span>. 
        He had always dreamed of seeing how a simple cocoa bean becomes a <span class="word-gap" data-word="delicious">?</span> candy bar. 
        When he arrived at the massive <span class="word-gap" data-word="iron">?</span> gates, the smell of melted chocolate was <span class="word-gap" data-word="overwhelming">?</span> and wonderful.
        <br><br>
        The manager, Mr. Fizzle, led the group inside. The first room was filled with giant <span class="word-gap" data-word="spinning">?</span> machines that looked like silver whales. 
        "These machines <span class="word-gap" data-word="grind">?</span> the beans into a smooth liquid," Mr. Fizzle explained. 
        Timmy was <span class="word-gap" data-word="curious">?</span> about a small red <span class="word-gap" data-word="lever">?</span> on the wall. "Don't touch that!" Mr. Fizzle warned, but he was too late.
        <br><br>
        Timmy’s <span class="word-gap" data-word="sleeve">?</span> caught the lever, and suddenly, the <span class="word-gap" data-word="conveyor">?</span> belt started moving at double <span class="word-gap" data-word="speed">?</span>. 
        Hundreds of chocolate bunnies were flying through the air like <span class="word-gap" data-word="missiles">?</span>. 
        One worker tried to catch them with a <span class="word-gap" data-word="bucket">?</span>, but he slipped on a puddle of <span class="word-gap" data-word="caramel">?</span> and landed on his back. 
        It was total <span class="word-gap" data-word="chaos">?</span>, but it looked like a very tasty war.
        <br><br>
        Mr. Fizzle quickly pressed a <span class="word-gap" data-word="button">?</span> to stop the <span class="word-gap" data-word="emergency">?</span>. He wasn't mad; instead, he started to <span class="word-gap" data-word="chuckle">?</span>. 
        "Well," he said, "I think we just invented 'Flying Rabbits' candy!" He gave Timmy a special <span class="word-gap" data-word="sample">?</span> of the new creation. 
        It was filled with <span class="word-gap" data-word="popping">?</span> candy that felt like tiny fireworks on his <span class="word-gap" data-word="tongue">?</span>.
        <br><br>
        The <span class="word-gap" data-word="highlight">?</span> of the tour was the "Flavor Room," where they used <span class="word-gap" data-word="science">?</span> to create smells like "summer rain." 
        Timmy left the factory with a giant box of sweets and a huge smile. He learned that sometimes, a small <span class="word-gap" data-word="accident">?</span> can lead to a very sweet <span class="word-gap" data-word="discovery">?</span>.
    `;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:block; background:#2d1a12; color:#fff4e6; overflow-y:auto; padding:0; font-family: 'Fredoka', sans-serif; scroll-behavior: smooth;`;

    container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;700&family=Chewy&display=swap');
            
            #stage-content::-webkit-scrollbar { width: 10px; }
            #stage-content::-webkit-scrollbar-track { background: #2d1a12; }
            #stage-content::-webkit-scrollbar-thumb { background: #d4af37; border-radius: 10px; }

            .story-wrapper {
                max-width: 94%;
                margin: 40px auto;
                background: linear-gradient(145deg, #3d251e, #2d1a12);
                padding: 60px 45px;
                border-radius: 40px;
                box-shadow: 0 25px 50px rgba(0,0,0,0.6);
                border: 6px solid #d4af37;
                position: relative;
            }

            .story-title {
                color: #ff9d00;
                text-align: center;
                font-size: 4.8rem;
                font-weight: 900;
                margin-bottom: 50px;
                font-family: 'Chewy', cursive;
                text-shadow: 4px 4px 0px #704214;
                letter-spacing: 2px;
            }

            .story-body {
                line-height: 2.1;
                font-size: 2.9rem;
                color: #fff4e6;
                text-align: left;
                font-family: 'Fredoka', sans-serif;
            }

            .word-gap {
                display: inline-block;
                min-width: 140px;
                border: 3px solid #ff9d00;
                background: rgba(255, 157, 0, 0.1);
                text-align: center;
                color: #ff9d00;
                cursor: pointer;
                transition: all 0.3s;
                border-radius: 20px;
                padding: 0 15px;
                margin: 0 5px;
            }

            .word-gap:hover {
                background: #ff9d00;
                color: #2d1a12;
                transform: rotate(-2deg) scale(1.1);
                box-shadow: 0 0 20px #ff9d00;
            }

            .word-gap.filled {
                border: none;
                color: #ffcc00;
                font-weight: bold;
                background: transparent;
                animation: poppingAnim 0.5s ease-out;
            }

            @keyframes poppingAnim {
                0% { transform: scale(1); }
                30% { transform: scale(1.4) rotate(10deg); color: #ff00ff; }
                100% { transform: scale(1) rotate(0); }
            }

            #word-overlay {
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(45, 26, 18, 0.98);
                display: none;
                flex-wrap: wrap;
                justify-content: center;
                align-content: center;
                gap: 15px;
                padding: 40px;
                z-index: 99999;
            }

            .choice-btn {
                background: #d4af37;
                color: #2d1a12;
                padding: 18px 35px;
                font-size: 2.2rem;
                font-weight: 800;
                border-radius: 50px;
                cursor: pointer;
                border: 4px solid #fff4e6;
                font-family: 'Fredoka', sans-serif;
                transition: 0.2s;
            }

            .choice-btn:hover {
                background: #ff9d00;
                color: white;
                transform: scale(1.1);
            }

            .choice-btn.wrong {
                animation: stickySplat 0.4s;
                background: #704214 !important;
                color: #ff9d00;
            }

            @keyframes stickySplat {
                0% { transform: scaleY(1); }
                50% { transform: scaleY(0.6) scaleX(1.3); }
                100% { transform: scaleY(1); }
            }

            .one-shot-badge {
                position: absolute;
                top: -30px;
                left: 50%;
                transform: translateX(-50%);
                background: #ff9d00;
                color: #2d1a12;
                padding: 10px 60px;
                border-radius: 15px;
                font-weight: 900;
                font-size: 1.8rem;
                font-family: 'Chewy', cursive;
                box-shadow: 0 8px 0 #704214;
            }
        </style>

        <div id="word-overlay"></div>

        <div class="story-wrapper">
            <div class="one-shot-badge">GOLDEN TICKET ACTIVE</div>
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
