(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // قائمة كلمات الشيف بولت
    const words = [
        "vacuum", "stare", "celebration", "opportunity", "recipe", 
        "enthusiasm", "juggle", "texture", "scatter", "blizzard", 
        "alarm", "tan", "extinguisher", "volcano", "disaster", 
        "mustard", "dramatic", "speechless", "wreck", "spicy", 
        "failure", "lesson"
    ];

    let remainingWords = [...words];
    let currentTargetId = null;

    const storyTitle = "The Robot Who Wanted to Cook";
    
    let storyContent = `
        In the year 2099, in a city full of flying cars, lived a robot named Bolt. Bolt was a <span class="word-gap" data-word="vacuum">?</span> cleaner by profession, but in his heart, he wanted to be a chef. 
        Every day, while cleaning the floor, he would <span class="word-gap" data-word="stare">?</span> at the kitchen, watching the humans mix ingredients.
        <br><br>
        One day, his owners went out for a <span class="word-gap" data-word="celebration">?</span>, leaving the kitchen empty. Bolt decided this was his <span class="word-gap" data-word="opportunity">?</span>. 
        He put on a tiny white hat and zoomed toward the fridge. He didn't have a <span class="word-gap" data-word="recipe">?</span>, but he had a lot of <span class="word-gap" data-word="enthusiasm">?</span>.
        <br><br>
        First, he found a carton of eggs. Instead of cracking them, he tried to <span class="word-gap" data-word="juggle">?</span> them to see if they were fresh. 
        Two eggs landed on his head, making him look like he had yellow hair. "Interesting <span class="word-gap" data-word="texture">?</span>," Bolt beeped. 
        Next, he found a bag of flour. He turned on his motor by mistake and <span class="word-gap" data-word="scatter">?</span> white powder all over the walls. 
        The kitchen looked like a <span class="word-gap" data-word="blizzard">?</span> had hit it.
        <br><br>
        Suddenly, the smoke <span class="word-gap" data-word="alarm">?</span> went off because Bolt had put a piece of bread in the toaster for thirty minutes. 
        He thought the bread needed a "deep <span class="word-gap" data-word="tan">?</span>." Panicking, he grabbed a bottle of hot sauce, thinking it was fire <span class="word-gap" data-word="extinguisher">?</span> liquid. 
        He sprayed it everywhere. Now the kitchen was white, yellow, and smelled like a <span class="word-gap" data-word="volcano">?</span>.
        <br><br>
        Just then, the family’s cat, Whiskers, walked in. She looked at the <span class="word-gap" data-word="disaster">?</span> and then at Bolt. 
        Bolt offered her a taste of his "special soup," which was just milk mixed with <span class="word-gap" data-word="mustard">?</span> and a sock. 
        Whiskers took one sniff and performed a <span class="word-gap" data-word="dramatic">?</span> faint on the floor.
        <br><br>
        When the family returned, they were <span class="word-gap" data-word="speechless">?</span>. The kitchen was a <span class="word-gap" data-word="wreck">?</span>. 
        However, the young daughter took a spoon and tasted a bit of the "sauce" on the table. "Wait," she said, "this tastes like <span class="word-gap" data-word="spicy">?</span> popcorn!"
        <br><br>
        Bolt realized that even though he was a <span class="word-gap" data-word="failure">?</span> at traditional cooking, he had invented something new. 
        The <span class="word-gap" data-word="lesson">?</span> he learned was that being different is better than being perfect.
    `;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:block; background:#f8fafc; color:#1e293b; overflow-y:auto; padding:0; font-family: 'Outfit', sans-serif; scroll-behavior: smooth;`;

    container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;800&family=Bungee&display=swap');
            
            #stage-content::-webkit-scrollbar { width: 10px; }
            #stage-content::-webkit-scrollbar-track { background: #f1f5f9; }
            #stage-content::-webkit-scrollbar-thumb { background: #f97316; border-radius: 10px; }

            .story-wrapper {
                max-width: 94%;
                margin: 40px auto;
                background: #ffffff;
                padding: 60px 50px;
                border-radius: 40px;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
                border: 8px solid #f1f5f9;
                position: relative;
                overflow: hidden;
            }

            .story-title {
                color: #f97316;
                text-align: center;
                font-size: 4.5rem;
                font-weight: 900;
                margin-bottom: 50px;
                font-family: 'Bungee', cursive;
                letter-spacing: -1px;
                transform: rotate(-1deg);
            }

            .story-body {
                line-height: 1.9;
                font-size: 2.8rem;
                color: #334155;
                text-align: left;
                font-family: 'Outfit', sans-serif;
                font-weight: 500;
            }

            .word-gap {
                display: inline-block;
                min-width: 150px;
                background: #f1f5f9;
                border: 4px solid #e2e8f0;
                text-align: center;
                color: #94a3b8;
                cursor: pointer;
                transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                border-radius: 20px;
                padding: 2px 20px;
                margin: 0 5px;
            }

            .word-gap:hover {
                border-color: #f97316;
                background: #fff7ed;
                transform: translateY(-5px);
            }

            .word-gap.filled {
                border-color: #22c55e;
                color: #15803d;
                background: #f0fdf4;
                font-weight: 800;
                animation: cookSuccess 0.5s ease;
            }

            @keyframes cookSuccess {
                0% { transform: scale(0.8) rotate(-10deg); }
                50% { transform: scale(1.1) rotate(10deg); }
                100% { transform: scale(1) rotate(0); }
            }

            #word-overlay {
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(255, 255, 255, 0.98);
                display: none;
                flex-wrap: wrap;
                justify-content: center;
                align-content: center;
                gap: 20px;
                padding: 50px;
                z-index: 9999;
            }

            .choice-btn {
                background: #f97316;
                color: white;
                padding: 20px 45px;
                font-size: 2.5rem;
                font-weight: 800;
                border-radius: 25px;
                cursor: pointer;
                border: none;
                font-family: 'Outfit', sans-serif;
                box-shadow: 0 10px 0 #c2410c;
                transition: 0.1s;
            }

            .choice-btn:active {
                transform: translateY(8px);
                box-shadow: 0 2px 0 #c2410c;
            }

            .choice-btn.wrong {
                animation: burn 0.4s;
                background: #ef4444 !important;
                box-shadow: 0 10px 0 #991b1b;
            }

            @keyframes burn {
                0%, 100% { transform: translateY(0); }
                25% { transform: translateY(-10px) rotate(5deg); }
                75% { transform: translateY(-10px) rotate(-5deg); }
            }

            .one-shot-badge {
                position: absolute;
                top: 20px;
                right: -40px;
                background: #f97316;
                color: white;
                padding: 10px 100px;
                transform: rotate(45deg);
                font-weight: 800;
                font-size: 1.5rem;
                box-shadow: 0 5px 15px rgba(249, 115, 22, 0.3);
            }
        </style>

        <div id="word-overlay"></div>

        <div class="story-wrapper">
            <div class="one-shot-badge">CHEF BOLT</div>
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
