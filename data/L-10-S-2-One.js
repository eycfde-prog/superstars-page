(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // كلمات رحلة تسلق الجبل
    const words = [
        "challenge", "summit", "gravel", "determination", "climb", 
        "backpack", "compass", "pines", "chilled", "mist", 
        "aching", "ledge", "canyon", "force", "steady", 
        "advice", "cautiously", "stream", "crystal", "slippery", 
        "boots", "balance", "spectacular", "achievement", "rewarding"
    ];

    let remainingWords = [...words];
    let currentTargetId = null;

    const storyTitle = "The Girl Who Wanted to Touch the Clouds";
    
    let storyContent = `
        Climbing Mount Misty was the ultimate <span class="word-gap" data-word="challenge">?</span> for anyone in the village. 
        Many had tried, but few reached the <span class="word-gap" data-word="summit">?</span> because the path was steep and full of loose <span class="word-gap" data-word="gravel">?</span>. 
        Sara, a young girl with a lot of <span class="word-gap" data-word="determination">?</span>, decided that today was the day.
        <br><br>
        She started her <span class="word-gap" data-word="climb">?</span> early, carrying a heavy <span class="word-gap" data-word="backpack">?</span> filled with water, bread, and a <span class="word-gap" data-word="compass">?</span>. 
        The first part was easy, through a forest of tall <span class="word-gap" data-word="pines">?</span>. 
        However, as she went higher, the air became <span class="word-gap" data-word="chilled">?</span>, and a thick <span class="word-gap" data-word="mist">?</span> covered the trail. 
        Sara felt her muscles <span class="word-gap" data-word="aching">?</span>, but she refused to stop.
        <br><br>
        Suddenly, she reached a narrow <span class="word-gap" data-word="ledge">?</span>. Below her was a deep <span class="word-gap" data-word="canyon">?</span>, 
        and the wind was blowing with great <span class="word-gap" data-word="force">?</span>. Sara took a deep breath to <span class="word-gap" data-word="steady">?</span> her nerves. 
        She remembered her grandfather’s <span class="word-gap" data-word="advice">?</span> and moved <span class="word-gap" data-word="cautiously">?</span> until she was safe.
        <br><br>
        Near the top, she encountered a small <span class="word-gap" data-word="stream">?</span>. The water was <span class="word-gap" data-word="crystal">?</span> clear and freezing. 
        She had to jump across <span class="word-gap" data-word="slippery">?</span> stones. She slipped once, getting her <span class="word-gap" data-word="boots">?</span> wet, 
        but she kept her <span class="word-gap" data-word="balance">?</span> and reached the other side.
        <br><br>
        Finally, the mist cleared! The view was <span class="word-gap" data-word="spectacular">?</span>. 
        She felt a great sense of <span class="word-gap" data-word="achievement">?</span>. She realized that the hardest paths lead to the most <span class="word-gap" data-word="rewarding">?</span> views.
    `;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:block; background:#1e293b; color:#f1f5f9; overflow-y:auto; padding:0; font-family: 'Montserrat', sans-serif; scroll-behavior: smooth;`;

    container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;900&family=Kalam:wght@400;700&display=swap');
            
            #stage-content::-webkit-scrollbar { width: 10px; }
            #stage-content::-webkit-scrollbar-track { background: #1e293b; }
            #stage-content::-webkit-scrollbar-thumb { background: #94a3b8; border-radius: 10px; }

            .story-wrapper {
                max-width: 92%;
                margin: 40px auto;
                background: linear-gradient(135deg, rgba(51, 65, 85, 0.9), rgba(30, 41, 59, 0.9));
                padding: 60px 45px;
                border-radius: 20px;
                box-shadow: 0 15px 35px rgba(0,0,0,0.4);
                border: 2px solid rgba(255,255,255,0.1);
                position: relative;
                backdrop-filter: blur(10px);
            }

            .story-title {
                color: #f8fafc;
                text-align: center;
                font-size: 3.8rem;
                font-weight: 900;
                margin-bottom: 50px;
                font-family: 'Montserrat', sans-serif;
                text-transform: uppercase;
                letter-spacing: 2px;
                text-shadow: 0 0 20px rgba(255,255,255,0.2);
            }

            .story-body {
                line-height: 2.3;
                font-size: 2.6rem;
                color: #cbd5e1;
                text-align: left;
                font-family: 'Kalam', cursive;
            }

            .word-gap {
                display: inline-block;
                min-width: 140px;
                border: 2px solid #38bdf8;
                background: rgba(56, 189, 248, 0.05);
                text-align: center;
                color: #38bdf8;
                cursor: pointer;
                transition: 0.3s;
                border-radius: 8px;
                padding: 0 10px;
            }

            .word-gap:hover {
                background: #38bdf8;
                color: #0f172a;
                transform: translateY(-3px);
            }

            .word-gap.filled {
                border: none;
                color: #fff;
                font-weight: bold;
                background: transparent;
                animation: cloudFloat 1s ease-in-out infinite alternate;
            }

            @keyframes cloudFloat {
                from { transform: translateY(0); text-shadow: 0 0 5px #fff; }
                to { transform: translateY(-5px); text-shadow: 0 0 15px #38bdf8; }
            }

            #word-overlay {
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(15, 23, 42, 0.98);
                display: none;
                flex-wrap: wrap;
                justify-content: center;
                align-content: center;
                gap: 12px;
                padding: 40px;
                z-index: 10000;
            }

            .choice-btn {
                background: transparent;
                color: #f1f5f9;
                padding: 12px 25px;
                font-size: 2rem;
                font-weight: 700;
                border-radius: 10px;
                cursor: pointer;
                border: 2px solid #475569;
                font-family: 'Montserrat', sans-serif;
                transition: 0.2s;
            }

            .choice-btn:hover {
                border-color: #38bdf8;
                background: rgba(56, 189, 248, 0.1);
                box-shadow: 0 0 20px rgba(56, 189, 248, 0.3);
            }

            .choice-btn.wrong {
                animation: landslide 0.4s;
                background: #450a0a !important;
                border-color: #ef4444;
            }

            @keyframes landslide {
                0% { transform: translateY(0); }
                25% { transform: translateY(5px) rotate(2deg); }
                75% { transform: translateY(10px) rotate(-2deg); }
                100% { transform: translateY(0); }
            }

            .one-shot-badge {
                position: absolute;
                top: 20px;
                left: 20px;
                color: rgba(255,255,255,0.3);
                font-size: 1rem;
                font-weight: 900;
                letter-spacing: 3px;
                font-family: 'Montserrat', sans-serif;
            }
        </style>

        <div id="word-overlay"></div>

        <div class="story-wrapper">
            <div class="one-shot-badge">ALTITUDE: 5,000M</div>
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
