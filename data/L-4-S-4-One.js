(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // كلمات قصة ماكس ولونا
    const words = [
        "dog", "garden", "believe", "jump", "counter", 
        "dishes", "purr", "engine", "squirrel", "quickly", 
        "paws", "back", "silly", "surprise", "milk", 
        "bone", "bowl", "floor", "hungry", "stubborn", 
        "stranger", "sofa", "protected", "brave", "fun"
    ];

    let remainingWords = [...words];
    let currentTargetId = null;

    const storyTitle = "The Dog Who Thought He Was a Cat";
    
    let storyContent = `
        Max was a big, friendly <span class="word-gap" data-word="dog">?</span> with a very waggy tail. He lived in a house with a small <span class="word-gap" data-word="garden">?</span> and a clever cat named Luna. 
        Because Max spent all his time with Luna, he started to <span class="word-gap" data-word="believe">?</span> he was a cat too.
        <br><br>
        Every morning, Max tried to <span class="word-gap" data-word="jump">?</span> on the kitchen <span class="word-gap" data-word="counter">?</span>. But Max was too heavy! 
        He would crash into the <span class="word-gap" data-word="dishes">?</span> with a loud noise. "Woof!" he said, but then he tried to <span class="word-gap" data-word="purr">?</span> like Luna. 
        It sounded like a broken <span class="word-gap" data-word="engine">?</span>.
        <br><br>
        One sunny afternoon, Max saw a <span class="word-gap" data-word="squirrel">?</span> in the tree. Luna climbed the tree <span class="word-gap" data-word="quickly">?</span> to catch it. Max tried to do the same. 
        He put his big <span class="word-gap" data-word="paws">?</span> on the tree, but he just slid down and landed on his <span class="word-gap" data-word="back">?</span>. 
        He looked very <span class="word-gap" data-word="silly">?</span>, and the squirrel just looked at him with <span class="word-gap" data-word="surprise">?</span>.
        <br><br>
        Later, the owner brought a bowl of <span class="word-gap" data-word="milk">?</span> for Luna and a <span class="word-gap" data-word="bone">?</span> for Max. Max ignored his bone. 
        He tried to drink the milk from the tiny <span class="word-gap" data-word="bowl">?</span>, but his big nose pushed the milk all over the <span class="word-gap" data-word="floor">?</span>. 
        He was very <span class="word-gap" data-word="hungry">?</span>, but he was also very <span class="word-gap" data-word="stubborn">?</span>.
        <br><br>
        Suddenly, a <span class="word-gap" data-word="stranger">?</span> walked past the gate. Luna ran away and hid under the <span class="word-gap" data-word="sofa">?</span>. 
        But Max didn't hide. He stood up, barked loudly, and <span class="word-gap" data-word="protected">?</span> the house. The stranger was scared and ran away.
        <br><br>
        His owner hugged him and said, "You are a <span class="word-gap" data-word="brave">?</span> dog, Max!" Max felt very happy. 
        He finally understood that he was not a cat, and that being a dog was actually a lot of <span class="word-gap" data-word="fun">?</span>. 
        He went back to the garden and finally chewed his bone.
    `;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:block; background:#e8f5e9; color:#2e7d32; overflow-y:auto; padding:0; font-family: 'Fredoka', sans-serif; scroll-behavior: smooth;`;

    container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;700&family=Bubblegum+Sans&display=swap');
            
            #stage-content::-webkit-scrollbar { width: 10px; }
            #stage-content::-webkit-scrollbar-track { background: #c8e6c9; }
            #stage-content::-webkit-scrollbar-thumb { background: #4caf50; border-radius: 10px; }

            .story-wrapper {
                max-width: 94%;
                margin: 40px auto;
                background: #ffffff;
                padding: 60px 50px;
                border-radius: 40px;
                box-shadow: 0 20px 0 #a5d6a7;
                border: 4px solid #4caf50;
                position: relative;
            }

            .story-title {
                color: #2e7d32;
                text-align: center;
                font-size: 4.5rem;
                font-weight: 900;
                margin-bottom: 50px;
                font-family: 'Bubblegum Sans', cursive;
                text-shadow: 3px 3px 0 #c8e6c9;
            }

            .story-body {
                line-height: 2;
                font-size: 2.8rem;
                color: #388e3c;
                text-align: left;
                font-family: 'Fredoka', sans-serif;
            }

            .word-gap {
                display: inline-block;
                min-width: 140px;
                background: #f1f8e9;
                border: 3px solid #81c784;
                text-align: center;
                color: #a5d6a7;
                cursor: pointer;
                transition: 0.3s;
                border-radius: 15px;
                padding: 0 15px;
                margin: 0 5px;
            }

            .word-gap:hover {
                border-color: #4caf50;
                background: #dcedc8;
                transform: scale(1.05);
            }

            .word-gap.filled {
                border: none;
                color: #ff9800;
                font-weight: bold;
                background: transparent;
                animation: wagTail 0.5s ease-out;
            }

            @keyframes wagTail {
                0% { transform: rotate(0); }
                25% { transform: rotate(10deg) scale(1.2); }
                75% { transform: rotate(-10deg); }
                100% { transform: rotate(0); }
            }

            #word-overlay {
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(46, 125, 50, 0.95);
                display: none;
                flex-wrap: wrap;
                justify-content: center;
                align-content: center;
                gap: 20px;
                padding: 50px;
                z-index: 10000;
                backdrop-filter: blur(8px);
            }

            .choice-btn {
                background: #fff;
                color: #2e7d32;
                padding: 20px 40px;
                font-size: 2.5rem;
                font-weight: 700;
                border-radius: 30px;
                cursor: pointer;
                border: 6px solid #81c784;
                font-family: 'Fredoka', sans-serif;
                transition: 0.2s;
            }

            .choice-btn:hover {
                background: #ffeb3b;
                border-color: #fbc02d;
                transform: translateY(-5px);
            }

            .choice-btn.wrong {
                animation: sadShake 0.4s;
                background: #ffcdd2 !important;
                border-color: #e57373;
                color: #c62828;
            }

            @keyframes sadShake {
                0%, 100% { transform: translateX(0); }
                25% { transform: rotate(-5deg); }
                75% { transform: rotate(5deg); }
            }

            .one-shot-badge {
                position: absolute;
                top: -35px;
                left: 50%;
                transform: translateX(-50%);
                background: #4caf50;
                color: white;
                padding: 10px 60px;
                border-radius: 50px;
                font-weight: 900;
                font-size: 1.8rem;
                font-family: 'Bubblegum Sans', cursive;
                box-shadow: 0 8px 0 #2e7d32;
            }
        </style>

        <div id="word-overlay"></div>

        <div class="story-wrapper">
            <div class="one-shot-badge">PAW-SOME GAME</div>
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
