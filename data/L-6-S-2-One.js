(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // كلمات رحلة التخييم والمفاجأة
    const words = [
        "camping", "tent", "cooler", "fresh", "fire", 
        "branches", "roasting", "peaceful", "dark", "rustling", 
        "nervous", "stick", "lantern", "empty", "sandwiches", 
        "footprints", "pine", "wrapped", "satisfied", "angry", 
        "crackers", "ghost", "lesson", "wilderness"
    ];

    let remainingWords = [...words];
    let currentTargetId = null;

    const storyTitle = "The Camping Trip and the Hungry Guest";
    
    let storyContent = `
        Last summer, the Miller family decided to go <span class="word-gap" data-word="camping">?</span> in the Great Pine Forest. 
        They packed their <span class="word-gap" data-word="tent">?</span>, some sleeping bags, and a large <span class="word-gap" data-word="cooler">?</span> full of food. 
        When they arrived, the air was <span class="word-gap" data-word="fresh">?</span> and the birds were singing.
        <br><br>
        "Let's build a <span class="word-gap" data-word="fire">?</span> first!" said Ben. His sister, Lily, helped him gather dry <span class="word-gap" data-word="branches">?</span> from the ground. 
        Their father started the flames, and soon they were <span class="word-gap" data-word="roasting">?</span> marshmallows. It was very <span class="word-gap" data-word="peaceful">?</span> until the sun went down.
        <br><br>
        When it became <span class="word-gap" data-word="dark">?</span>, they heard a strange <span class="word-gap" data-word="rustling">?</span> noise coming from behind the bushes. 
        "Is it a wolf?" Lily asked, feeling <span class="word-gap" data-word="nervous">?</span>. Their father grabbed a large <span class="word-gap" data-word="stick">?</span> and turned on the bright <span class="word-gap" data-word="lantern">?</span>. 
        They looked around, but they didn't see anything.
        <br><br>
        Suddenly, they realized the cooler was <span class="word-gap" data-word="empty">?</span>! All their delicious <span class="word-gap" data-word="sandwiches">?</span> and fruit were gone. 
        "Look at those <span class="word-gap" data-word="footprints">?</span>," Ben whispered. The tracks led toward a tall <span class="word-gap" data-word="pine">?</span> tree. 
        They followed the path and saw a fat raccoon sitting on a branch. He was holding a <span class="word-gap" data-word="wrapped">?</span> chocolate bar and looked very <span class="word-gap" data-word="satisfied">?</span>.
        <br><br>
        The family couldn't be <span class="word-gap" data-word="angry">?</span> because the raccoon looked so funny with chocolate on its face. 
        They shared some <span class="word-gap" data-word="crackers">?</span> instead and spent the night telling <span class="word-gap" data-word="ghost">?</span> stories under the stars. 
        They learned a valuable <span class="word-gap" data-word="lesson">?</span>: always lock your food in the car when you go to the <span class="word-gap" data-word="wilderness">?</span>!
    `;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:block; background:#064e3b; color:#ecfdf5; overflow-y:auto; padding:0; font-family: 'Patrick Hand', cursive; scroll-behavior: smooth;`;

    container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&family=Mountains+of+Christmas:wght@700&display=swap');
            
            #stage-content::-webkit-scrollbar { width: 10px; }
            #stage-content::-webkit-scrollbar-track { background: #064e3b; }
            #stage-content::-webkit-scrollbar-thumb { background: #f59e0b; border-radius: 10px; border: 2px solid #064e3b; }

            .story-wrapper {
                max-width: 94%;
                margin: 40px auto;
                background: rgba(2, 44, 34, 0.9);
                padding: 60px 45px;
                border-radius: 30px;
                box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                border: 4px solid #065f46;
                position: relative;
            }

            .story-title {
                color: #fbbf24;
                text-align: center;
                font-size: 4.5rem;
                font-weight: 900;
                margin-bottom: 50px;
                font-family: 'Mountains of Christmas', cursive;
                text-shadow: 3px 3px 0px #92400e;
            }

            .story-body {
                line-height: 2.1;
                font-size: 3rem;
                color: #ecfdf5;
                text-align: left;
                font-family: 'Patrick Hand', cursive;
            }

            .word-gap {
                display: inline-block;
                min-width: 150px;
                border-bottom: 4px solid #f59e0b;
                text-align: center;
                color: #f59e0b;
                cursor: pointer;
                transition: 0.3s;
                background: rgba(245, 158, 11, 0.05);
                border-radius: 10px 10px 0 0;
                padding: 0 10px;
                margin: 0 5px;
            }

            .word-gap:hover {
                background: rgba(245, 158, 11, 0.2);
                border-bottom-width: 6px;
            }

            .word-gap.filled {
                border-bottom: none;
                color: #fbbf24;
                font-weight: bold;
                background: transparent;
                animation: firePop 0.4s ease-out;
            }

            @keyframes firePop {
                0% { transform: scale(0.5); filter: hue-rotate(90deg); }
                100% { transform: scale(1); filter: hue-rotate(0deg); }
            }

            #word-overlay {
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(2, 44, 34, 0.98);
                display: none;
                flex-wrap: wrap;
                justify-content: center;
                align-content: center;
                gap: 15px;
                padding: 40px;
                z-index: 10000;
                backdrop-filter: blur(10px);
            }

            .choice-btn {
                background: #f59e0b;
                color: #451a03;
                padding: 18px 35px;
                font-size: 2.4rem;
                font-weight: 700;
                border-radius: 15px;
                cursor: pointer;
                border: 4px solid #78350f;
                font-family: 'Patrick Hand', cursive;
                transition: 0.2s;
            }

            .choice-btn:hover {
                background: #fbbf24;
                transform: rotate(2deg) scale(1.1);
            }

            .choice-btn.wrong {
                animation: rustle 0.4s;
                background: #1e293b !important;
                color: #f1f5f9;
                border-color: #0f172a;
            }

            @keyframes rustle {
                0%, 100% { transform: translateX(0); }
                20% { transform: translateX(-10px) rotate(-5deg); }
                40% { transform: translateX(10px) rotate(5deg); }
                60% { transform: translateX(-10px) rotate(-5deg); }
                80% { transform: translateX(10px) rotate(5deg); }
            }

            .one-shot-badge {
                position: absolute;
                top: -30px;
                left: 50%;
                transform: translateX(-50%);
                background: #f59e0b;
                color: #451a03;
                padding: 10px 60px;
                border-radius: 50px;
                font-weight: 900;
                font-size: 1.8rem;
                font-family: 'Mountains of Christmas', cursive;
                box-shadow: 0 10px 0 #78350f;
            }
        </style>

        <div id="word-overlay"></div>

        <div class="story-wrapper">
            <div class="one-shot-badge">CAMPFIRE STORIES</div>
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
