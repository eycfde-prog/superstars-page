(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // قائمة الكلمات المستهدفة للنشاط التاني
    const words = [
        "armor", "terrified", "blanket", "monster", "spoon", 
        "tremble", "donkey", "fingers", "scream", "bray", 
        "rotten", "breath", "panicked", "stuck", "wrestle", 
        "beast", "shield", "jewelry", "embarrassed", "imagination", 
        "cheese", "medal", "pajamas"
    ];

    let remainingWords = [...words];
    let currentTargetId = null;

    const storyTitle = "The Knight Who Was Scared of Shadows";
    
    // محتوى القصة مع الفراغات التفاعلية
    let storyContent = `
        In a kingdom far, far away, there lived Sir Pumpernickel. He was a knight with the shiniest <span class="word-gap" data-word="armor">?</span> and the longest sword. 
        However, Sir Pumpernickel had a tiny secret: he was <span class="word-gap" data-word="terrified">?</span> of the dark. 
        While other knights fought dragons, he spent his evenings hiding under his <span class="word-gap" data-word="blanket">?</span> with a small candle.
        <br><br>
        One afternoon, the King summoned him. "Sir Pumpernickel," the King said, "a giant <span class="word-gap" data-word="monster">?</span> has stolen my favorite golden <span class="word-gap" data-word="spoon">?</span>. 
        You must go to the Cave of Echoes and get it back!" Sir Pumpernickel’s knees started to <span class="word-gap" data-word="tremble">?</span>. 
        He couldn't refuse the King, so he mounted his horse, who was actually a very slow <span class="word-gap" data-word="donkey">?</span> named Barnaby.
        <br><br>
        As they entered the forest, the trees looked like long, skinny <span class="word-gap" data-word="fingers">?</span>. 
        Every time a leaf fell, Sir Pumpernickel would <span class="word-gap" data-word="scream">?</span> like a little bird. 
        "Don't worry," Barnaby the donkey seemed to say with a loud <span class="word-gap" data-word="bray">?</span>. 
        They finally reached the cave. It was pitch black inside and smelled like <span class="word-gap" data-word="rotten">?</span> cheese.
        <br><br>
        Sir Pumpernickel took a deep <span class="word-gap" data-word="breath">?</span> and stepped inside. Suddenly, he saw two glowing red eyes! 
        He was so <span class="word-gap" data-word="panicked">?</span> that he tried to run away, but his heavy boots got <span class="word-gap" data-word="stuck">?</span> in the mud. 
        He began to <span class="word-gap" data-word="wrestle">?</span> with his own shadow, thinking it was a ghost. 
        "Leave me alone, you dark <span class="word-gap" data-word="beast">?</span>!" he yelled, while accidentally hitting himself with his own <span class="word-gap" data-word="shield">?</span>.
        <br><br>
        The glowing eyes came closer. It wasn't a monster at all! It was a tiny hamster holding a flashlight. 
        The hamster was sitting on a pile of stolen things, including the King's golden spoon. 
        "I just wanted some <span class="word-gap" data-word="jewelry">?</span> for my house," the hamster squeaked.
        <br><br>
        Sir Pumpernickel felt very <span class="word-gap" data-word="embarrassed">?</span>. He realized that his <span class="word-gap" data-word="imagination">?</span> was much scarier than reality. 
        He took the spoon, gave the hamster a piece of <span class="word-gap" data-word="cheese">?</span> as a bribe, and returned to the castle.
        <br><br>
        The King was so happy that he gave the knight a <span class="word-gap" data-word="medal">?</span>. 
        Sir Pumpernickel learned that being brave doesn't mean you aren't scared; it means you go into the cave anyway—even if you're wearing your <span class="word-gap" data-word="pajamas">?</span> under your armor.
    `;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:block; background:#1a0a2e; color:#e0d0ff; overflow-y:auto; padding:0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; scroll-behavior: smooth;`;

    container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Quicksand:wght@500;700&display=swap');
            
            #stage-content::-webkit-scrollbar { width: 12px; }
            #stage-content::-webkit-scrollbar-track { background: #0f051a; }
            #stage-content::-webkit-scrollbar-thumb { background: #ffd700; border-radius: 10px; border: 3px solid #0f051a; }

            .story-wrapper {
                max-width: 92%;
                margin: 50px auto;
                background: linear-gradient(145deg, #2a1b3d, #1a0a2e);
                padding: 70px 50px;
                border-radius: 40px;
                box-shadow: 0 40px 100px rgba(0,0,0,0.9);
                border: 4px solid #ffd700;
                position: relative;
            }

            .story-title {
                color: #ffd700;
                text-align: center;
                font-size: 4.5rem;
                font-weight: 900;
                margin-bottom: 70px;
                text-shadow: 4px 4px 15px rgba(255, 215, 0, 0.4);
                font-family: 'Cinzel', serif;
                text-transform: uppercase;
            }

            .story-body {
                line-height: 2.2;
                font-size: 2.8rem;
                color: #f3efff;
                text-align: left;
                font-family: 'Quicksand', sans-serif;
            }

            .word-gap {
                display: inline-block;
                min-width: 160px;
                border-bottom: 6px dotted #ffd700;
                text-align: center;
                color: #ffd700;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                background: rgba(255, 215, 0, 0.05);
                border-radius: 15px;
                padding: 0 20px;
                margin: 0 8px;
            }

            .word-gap:hover {
                background: rgba(255, 215, 0, 0.2);
                transform: scale(1.1) rotate(-1deg);
            }

            .word-gap.filled {
                border-bottom: none;
                color: #00ffcc;
                font-weight: 800;
                background: transparent;
                animation: crownPop 0.6s ease-out;
            }

            @keyframes crownPop {
                0% { transform: scale(0.5); opacity: 0; }
                50% { transform: scale(1.2); }
                100% { transform: scale(1); opacity: 1; }
            }

            /* Flash Screen - Overlay */
            #word-overlay {
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(15, 5, 26, 0.98);
                display: none;
                flex-wrap: wrap;
                justify-content: center;
                align-content: center;
                gap: 25px;
                padding: 50px;
                z-index: 99999;
                backdrop-filter: blur(15px);
            }

            .choice-btn {
                background: #ffd700;
                color: #1a0a2e;
                padding: 25px 45px;
                font-size: 2.8rem;
                font-weight: 800;
                border-radius: 20px;
                cursor: pointer;
                transition: 0.3s;
                border: 4px solid transparent;
                font-family: 'Cinzel', serif;
                box-shadow: 0 8px 0 #b8860b;
            }

            .choice-btn:hover {
                transform: translateY(-5px);
                background: #fff;
                box-shadow: 0 12px 25px rgba(255, 215, 0, 0.5);
            }

            .choice-btn:active {
                transform: translateY(2px);
                box-shadow: 0 4px 0 #b8860b;
            }

            .choice-btn.wrong {
                animation: magicFail 0.5s;
                background: #ff4d4d !important;
                color: white;
                box-shadow: 0 8px 0 #990000;
            }

            @keyframes magicFail {
                0%, 100% { transform: translateX(0); }
                20%, 60% { transform: translateX(-15px); }
                40%, 80% { transform: translateX(15px); }
            }

            .one-shot-badge {
                position: absolute;
                top: -40px;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(to right, #ffd700, #ffec8b);
                color: #1a0a2e;
                padding: 15px 60px;
                border-radius: 20px;
                font-weight: 900;
                font-size: 2.2rem;
                letter-spacing: 8px;
                border: 4px solid #fff;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            }

            @media (max-width: 1024px) {
                .story-title { font-size: 3rem; }
                .story-body { font-size: 2rem; }
                .choice-btn { font-size: 1.8rem; }
            }
        </style>

        <div id="word-overlay"></div>

        <div class="story-wrapper">
            <div class="one-shot-badge">ONE SHOT</div>
            <h1 class="story-title">${storyTitle}</h1>
            <div class="story-body">
                ${storyContent}
            </div>
        </div>
        <div style="height: 120px;"></div>
    `;

    const overlay = document.getElementById('word-overlay');

    const openOverlay = (target) => {
        currentTargetId = target;
        overlay.innerHTML = '';
        
        // خلط الكلمات المتبقية
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
            setTimeout(() => btnElement.classList.remove('wrong'), 500);
        }
    };

    document.querySelectorAll('.word-gap').forEach(gap => {
        gap.onclick = () => openOverlay(gap);
    });

    document.onkeydown = (e) => {
        if (e.keyCode === 32) {
            if (window.triggerVetoDone) window.triggerVetoDone();
        }
    };
})();
