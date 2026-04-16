(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // قائمة الكلمات المستهدفة - قصة الشيف
    const words = [
        "special", "market", "apron", "perfectly", "shelf", 
        "distracted", "smell", "table", "hungry", "smile", 
        "bite", "mint", "embarrassed", "laughing", "order", 
        "valuable", "taste", "trust", "holding", "spices"
    ];

    let remainingWords = [...words];
    let currentTargetId = null;

    const storyTitle = "The Chef’s Great Mistake";
    
    // بناء نص القصة مع الفراغات
    let storyContent = `
        Barnaby was not a natural cook, but he loved watching cooking shows. One Saturday, he decided to invite his friends for a <span class="word-gap" data-word="special">?</span> dinner. 
        He wanted to make a classic pasta dish with a rich tomato sauce. He went to the <span class="word-gap" data-word="market">?</span> and bought the freshest tomatoes, garlic, and onions.
        <br><br>
        When he got home, he put on his favorite <span class="word-gap" data-word="apron">?</span> and started chopping. Everything was going <span class="word-gap" data-word="perfectly">?</span> until he looked at the recipe. 
        It said he needed a "pinch of salt" and some "dried herbs." Barnaby found two small jars on the <span class="word-gap" data-word="shelf">?</span>. 
        One contained salt, and the other contained what he thought was dried parsley. 
        He was <span class="word-gap" data-word="distracted">?</span> by a funny cat video on his phone and accidentally poured half the jar into the pot.
        <br><br>
        When his friends arrived, the <span class="word-gap" data-word="smell">?</span> in the kitchen was wonderful. They sat at the <span class="word-gap" data-word="table">?</span>, feeling very <span class="word-gap" data-word="hungry">?</span>. 
        Barnaby served the pasta with a proud <span class="word-gap" data-word="smile">?</span>. His friend Sarah took the first big <span class="word-gap" data-word="bite">?</span>. 
        Suddenly, her face turned bright red, and she started coughing.
        <br><br>
        "Barnaby," she gasped, "why does this pasta taste like <span class="word-gap" data-word="mint">?</span> toothpaste?"
        Barnaby looked at the jar on the counter. It wasn’t parsley; it was dried peppermint leaves he used for tea! 
        He felt very <span class="word-gap" data-word="embarrassed">?</span>, but his friends started <span class="word-gap" data-word="laughing">?</span>. 
        They decided to <span class="word-gap" data-word="order">?</span> a large pizza instead. 
        Barnaby learned a <span class="word-gap" data-word="valuable">?</span> lesson that night: always <span class="word-gap" data-word="taste">?</span> your food before you serve it, and never <span class="word-gap" data-word="trust">?</span> a cat video when you are <span class="word-gap" data-word="holding">?</span> a jar of <span class="word-gap" data-word="spices">?</span>. 
        It was the most expensive tea-flavored pasta in history.
    `;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:block; background:#0f172a; color:#f8fafc; overflow-y:auto; padding:0; font-family: 'Segoe UI', sans-serif; scroll-behavior: smooth;`;

    container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@700;900&family=Outfit:wght@400;700&display=swap');
            
            #stage-content::-webkit-scrollbar { width: 10px; }
            #stage-content::-webkit-scrollbar-track { background: #0f172a; }
            #stage-content::-webkit-scrollbar-thumb { background: #38bdf8; border-radius: 5px; }

            .story-wrapper {
                max-width: 90%;
                margin: 60px auto;
                background: #1e293b;
                padding: 60px;
                border-radius: 30px;
                box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
                border: 2px solid #334155;
            }

            .story-title {
                color: #38bdf8;
                text-align: center;
                font-size: 4rem;
                font-weight: 900;
                margin-bottom: 50px;
                font-family: 'Unbounded', sans-serif;
                text-transform: uppercase;
                letter-spacing: -1px;
            }

            .story-body {
                line-height: 1.8;
                font-size: 2.6rem;
                color: #e2e8f0;
                font-family: 'Outfit', sans-serif;
            }

            .word-gap {
                display: inline-block;
                min-width: 140px;
                border-bottom: 4px solid #38bdf8;
                text-align: center;
                color: #38bdf8;
                cursor: pointer;
                transition: 0.2s;
                background: rgba(56, 189, 248, 0.1);
                border-radius: 8px;
                padding: 0 15px;
                margin: 0 5px;
            }

            .word-gap:hover { background: rgba(56, 189, 248, 0.2); }

            .word-gap.active-target {
                animation: pulseGlow 1.5s infinite;
                border-bottom-style: dashed;
            }

            @keyframes pulseGlow {
                0% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.4); }
                70% { box-shadow: 0 0 0 20px rgba(56, 189, 248, 0); }
                100% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0); }
            }

            .word-gap.filled {
                border-bottom: none;
                color: #fbbf24;
                font-weight: 700;
                background: transparent;
                animation: correctPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }

            @keyframes correctPop {
                0% { transform: scale(0.5); }
                100% { transform: scale(1); }
            }

            #word-overlay {
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(15, 23, 42, 0.95);
                display: none;
                flex-wrap: wrap;
                justify-content: center;
                align-content: center;
                gap: 20px;
                padding: 40px;
                z-index: 9999;
                backdrop-filter: blur(10px);
            }

            .choice-btn {
                background: #f8fafc;
                color: #0f172a;
                padding: 20px 40px;
                font-size: 2.4rem;
                font-weight: 700;
                border-radius: 15px;
                cursor: pointer;
                border: none;
                font-family: 'Outfit', sans-serif;
                transition: 0.2s;
            }

            .choice-btn:hover { transform: scale(1.05); background: #38bdf8; color: white; }

            .choice-btn.wrong { background: #ef4444 !important; color: white; animation: shake 0.4s; }

            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }

            .one-shot-label {
                display: inline-block;
                background: #38bdf8;
                color: #0f172a;
                padding: 5px 25px;
                border-radius: 50px;
                font-size: 1.2rem;
                font-weight: 900;
                margin-bottom: 20px;
            }
        </style>

        <div id="word-overlay"></div>

        <div class="story-wrapper">
            <center><div class="one-shot-label">VETO ONE-SHOT ACTIVITY</div></center>
            <h1 class="story-title">${storyTitle}</h1>
            <div class="story-body">
                ${storyContent}
            </div>
        </div>
        <div style="height: 100px;"></div>
    `;

    const overlay = document.getElementById('word-overlay');
    const allGaps = document.querySelectorAll('.word-gap');

    const updateActiveGap = () => {
        allGaps.forEach(g => g.classList.remove('active-target'));
        const nextGap = Array.from(allGaps).find(g => !g.classList.contains('filled'));
        if (nextGap) nextGap.classList.add('active-target');
    };

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
            updateActiveGap();
        } else {
            btnElement.classList.add('wrong');
            setTimeout(() => btnElement.classList.remove('wrong'), 400);
        }
    };

    allGaps.forEach(gap => {
        gap.onclick = () => openOverlay(gap);
    });

    // اختصارات الكيبورد (Enter لفتح الفراغ التالي)
    document.onkeydown = (e) => {
        if (e.key === "Enter") {
            const nextGap = Array.from(allGaps).find(g => !g.classList.contains('filled'));
            if (nextGap && overlay.style.display !== 'flex') {
                openOverlay(nextGap);
            }
        }
        if (e.key === "Escape") {
            overlay.style.display = 'none';
        }
    };

    updateActiveGap();
})();
