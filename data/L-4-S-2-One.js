(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // كلمات مطبخ ماريو العجيب
    const words = [
        "famous", "pasta", "proud", "market", "vegetables", 
        "cold", "smell", "dinner", "nervous", "soup", 
        "confused", "powder", "salt", "sugar", "pepper", 
        "chocolate", "strange", "busy", "lemons", "table", 
        "curtain", "purple", "creative", "lucky", "mistake"
    ];

    let remainingWords = [...words];
    let currentTargetId = null;

    const storyTitle = "The Chef and the Big Mistake";
    
    let storyContent = `
        Mario was a very <span class="word-gap" data-word="famous">?</span> chef in a small town. Everyone loved his <span class="word-gap" data-word="pasta">?</span> and his delicious cakes. 
        Mario was very <span class="word-gap" data-word="proud">?</span> of his work. Every morning, he went to the <span class="word-gap" data-word="market">?</span> to buy fresh <span class="word-gap" data-word="vegetables">?</span> and sweet fruit.
        <br><br>
        One Monday, Mario woke up with a very big <span class="word-gap" data-word="cold">?</span>. His nose was blocked, and he couldn't <span class="word-gap" data-word="smell">?</span> anything. 
        "Oh no!" he said. "Today is the day of the Mayor's <span class="word-gap" data-word="dinner">?</span>." Mario was <span class="word-gap" data-word="nervous">?</span>, but he had to go to the kitchen.
        <br><br>
        He started to cook his special <span class="word-gap" data-word="soup">?</span>. Because he couldn't smell, he was very <span class="word-gap" data-word="confused">?</span>. 
        He saw a bowl of white <span class="word-gap" data-word="powder">?</span>. He thought it was <span class="word-gap" data-word="salt">?</span>, so he put five spoons of it into the pot. 
        But it wasn't salt; it was <span class="word-gap" data-word="sugar">?</span>!
        <br><br>
        Then, he wanted to add some <span class="word-gap" data-word="pepper">?</span> for a bit of spice. Instead, he grabbed a jar of <span class="word-gap" data-word="chocolate">?</span> chips by mistake. 
        "This looks a bit <span class="word-gap" data-word="strange">?</span>," Mario whispered, but he was too <span class="word-gap" data-word="busy">?</span> to stop. He even added some <span class="word-gap" data-word="lemons">?</span> to a dish that needed onions.
        <br><br>
        When the Mayor arrived, he sat at the <span class="word-gap" data-word="table">?</span> and took a big spoon of the soup. 
        Mario watched him from behind the <span class="word-gap" data-word="curtain">?</span>. The Mayor’s face turned <span class="word-gap" data-word="purple">?</span>. 
        He didn't scream; instead, he started to laugh.
        <br><br>
        "Mario!" the Mayor called. "This is the most <span class="word-gap" data-word="creative">?</span> meal I have ever eaten! It is like a dessert and a dinner at the same time." 
        Mario felt very <span class="word-gap" data-word="lucky">?</span>. He learned that even when you make a <span class="word-gap" data-word="mistake">?</span>, sometimes the result can be wonderful.
    `;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:block; background:#fffcf2; color:#252422; overflow-y:auto; padding:0; font-family: 'Lexend', sans-serif; scroll-behavior: smooth;`;

    container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@400;700&family=Playfair+Display:ital,wght@0,900;1,900&display=swap');
            
            #stage-content::-webkit-scrollbar { width: 10px; }
            #stage-content::-webkit-scrollbar-track { background: #fffcf2; }
            #stage-content::-webkit-scrollbar-thumb { background: #eb5e28; border-radius: 10px; }

            .story-wrapper {
                max-width: 94%;
                margin: 40px auto;
                background: #fff;
                padding: 60px 45px;
                border-radius: 20px;
                box-shadow: 0 15px 40px rgba(64, 61, 57, 0.1);
                border-left: 15px solid #eb5e28;
                border-right: 15px solid #eb5e28;
                position: relative;
            }

            .story-title {
                color: #eb5e28;
                text-align: center;
                font-size: 4.8rem;
                font-weight: 900;
                margin-bottom: 50px;
                font-family: 'Playfair Display', serif;
                font-style: italic;
            }

            .story-body {
                line-height: 2.1;
                font-size: 2.9rem;
                color: #403d39;
                text-align: left;
                font-family: 'Lexend', sans-serif;
            }

            .word-gap {
                display: inline-block;
                min-width: 140px;
                border-bottom: 6px solid #ccc5b9;
                text-align: center;
                color: #eb5e28;
                cursor: pointer;
                transition: 0.3s;
                background: rgba(235, 94, 40, 0.05);
                border-radius: 8px 8px 0 0;
                padding: 0 10px;
            }

            .word-gap:hover {
                background: rgba(235, 94, 40, 0.15);
                border-bottom-color: #eb5e28;
                transform: translateY(-3px);
            }

            .word-gap.filled {
                border-bottom: none;
                color: #40916c;
                font-weight: bold;
                background: transparent;
                animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }

            @keyframes popIn {
                0% { transform: scale(0.5); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
            }

            #word-overlay {
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(37, 36, 34, 0.98);
                display: none;
                flex-wrap: wrap;
                justify-content: center;
                align-content: center;
                gap: 15px;
                padding: 40px;
                z-index: 10000;
            }

            .choice-btn {
                background: #fffcf2;
                color: #252422;
                padding: 18px 35px;
                font-size: 2.2rem;
                font-weight: 700;
                border-radius: 50px;
                cursor: pointer;
                border: 4px solid #eb5e28;
                font-family: 'Lexend', sans-serif;
                transition: 0.2s;
            }

            .choice-btn:hover {
                background: #eb5e28;
                color: #fff;
                transform: scale(1.1);
            }

            .choice-btn.wrong {
                animation: shake 0.4s ease;
                background: #403d39 !important;
                color: #fff;
                border-color: #ccc5b9;
            }

            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-12px); }
                75% { transform: translateX(12px); }
            }

            .one-shot-badge {
                position: absolute;
                top: -30px;
                left: 50%;
                transform: translateX(-50%);
                background: #eb5e28;
                color: #fff;
                padding: 12px 50px;
                border-radius: 15px;
                font-weight: 900;
                font-size: 2rem;
                letter-spacing: 4px;
                box-shadow: 0 10px 20px rgba(235, 94, 40, 0.3);
            }
        </style>

        <div id="word-overlay"></div>

        <div class="story-wrapper">
            <div class="one-shot-badge">ONE SHOT: CHEF</div>
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
