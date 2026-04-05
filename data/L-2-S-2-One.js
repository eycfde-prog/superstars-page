(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // قائمة الكلمات المستهدفة
    const words = [
        "forgetful", "competition", "supply", "tail", "journey", 
        "grumpy", "carrot", "intuition", "beehive", "clumsy", 
        "mysterious", "riddle", "address", "frustrated", "silly", 
        "pedestal", "challenge", "silent", "paws", "ridiculous", 
        "absurd", "moral"
    ];

    let remainingWords = [...words];
    let currentTargetId = null;

    const storyTitle = "The Squirrel Who Forgot Everything";
    
    // تحويل الكلمات في النص إلى فراغات قابلة للضغط
    let storyContent = `
        Once upon a time, in a forest where the trees were so tall they tickled the clouds, lived a squirrel named Sammy. 
        Sammy was not an ordinary squirrel; he was the most <span class="word-gap" data-word="forgetful">?</span> creature in nature. 
        While other squirrels were busy organizing their nuts by size and color, Sammy often found himself staring at a rock, wondering if he had already eaten breakfast. 
        <br><br>
        One chilly autumn morning, the Great Owl announced the annual <span class="word-gap" data-word="competition">?</span> for the Winter Feast. 
        The goal was simple: find the "Golden Acorn" hidden deep within the Whispering Woods. The winner would get a lifetime <span class="word-gap" data-word="supply">?</span> of peanut butter. 
        Sammy’s stomach growled at the thought. "I must win!" he declared, right before tripping over his own <span class="word-gap" data-word="tail">?</span>.
        <br><br>
        Sammy started his <span class="word-gap" data-word="journey">?</span> with a small backpack and a very confused map he had drawn himself. 
        As he walked, he met a <span class="word-gap" data-word="grumpy">?</span> rabbit named Roger. "You’re going the wrong way, Sammy," Roger sighed, munching on a <span class="word-gap" data-word="carrot">?</span>. 
        Sammy looked at his map, which was actually just a collection of coffee stains. "I am following my <span class="word-gap" data-word="intuition">?</span>!" Sammy claimed heroically, while accidentally walking into a <span class="word-gap" data-word="beehive">?</span>.
        <br><br>
        After escaping the bees with a very <span class="word-gap" data-word="clumsy">?</span> dance, Sammy reached a fork in the road. 
        He had to choose between the Path of Darkness or the Path of Shiny Things. Naturally, Sammy chose the shiny one. 
        It led him to a <span class="word-gap" data-word="mysterious">?</span> pond where a frog was wearing sunglasses. "To pass," the frog croaked, "you must solve my <span class="word-gap" data-word="riddle">?</span>." 
        Sammy panicked. He couldn't even remember his own <span class="word-gap" data-word="address">?</span>.
        <br><br>
        The frog asked, "What has keys but can't open locks?" Sammy thought hard. "A very <span class="word-gap" data-word="frustrated">?</span> locksmith?" he guessed. 
        The frog laughed so hard he fell into the water. "It’s a piano, you <span class="word-gap" data-word="silly">?</span> squirrel! But I like your spirit. Pass through."
        <br><br>
        Finally, Sammy saw it—the Golden Acorn! It was sitting on a <span class="word-gap" data-word="pedestal">?</span> made of old soda cans. 
        But there was a <span class="word-gap" data-word="challenge">?</span>. A giant cat was sleeping right next to it. Sammy knew he had to be <span class="word-gap" data-word="silent">?</span>. 
        He crawled on his belly, holding his breath. Just as his <span class="word-gap" data-word="paws">?</span> touched the gold, he felt a sneeze coming on. "A-choo!"
        <br><br>
        The cat woke up, looked at Sammy, and realized the squirrel was wearing a <span class="word-gap" data-word="ridiculous">?</span> hat made of leaves. 
        The cat started laughing uncontrollably. "You look so <span class="word-gap" data-word="absurd">?</span> that I can't even be mad," the cat giggled. He let Sammy take the acorn.
        <br><br>
        Sammy returned to the village a hero. The <span class="word-gap" data-word="moral">?</span> of the story? You don't need a perfect memory if you have a good sense of humor and a bit of luck.
    `;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:block; background:#0f0c08; color:#f0e2d0; overflow-y:auto; padding:0; font-family: 'Poppins', sans-serif; scroll-behavior: smooth;`;

    container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&family=Bitter:wght@400;700&display=swap');
            
            #stage-content::-webkit-scrollbar { width: 10px; }
            #stage-content::-webkit-scrollbar-track { background: #1a1510; }
            #stage-content::-webkit-scrollbar-thumb { background: #d4a373; border-radius: 10px; }

            .story-wrapper {
                max-width: 95%;
                margin: 40px auto;
                background: rgba(26, 21, 16, 0.95);
                padding: 60px 40px;
                border-radius: 30px;
                box-shadow: 0 30px 60px rgba(0,0,0,0.8);
                border: 2px solid #d4a373;
                position: relative;
            }

            .story-title {
                color: #faedcd;
                text-align: center;
                font-size: 5rem;
                font-weight: 900;
                margin-bottom: 60px;
                text-shadow: 3px 3px 0px #d4a373;
                font-family: 'Poppins', sans-serif;
            }

            .story-body {
                line-height: 2;
                font-size: 3rem;
                color: #fefae0;
                text-align: left;
                font-family: 'Bitter', serif;
            }

            .word-gap {
                display: inline-block;
                min-width: 150px;
                border-bottom: 5px dashed #d4a373;
                text-align: center;
                color: #d4a373;
                cursor: pointer;
                transition: all 0.3s ease;
                background: rgba(212, 163, 115, 0.1);
                border-radius: 10px;
                padding: 0 15px;
                margin: 0 5px;
            }

            .word-gap:hover {
                background: rgba(212, 163, 115, 0.3);
                transform: scale(1.05);
            }

            .word-gap.filled {
                border-bottom: none;
                color: #ccd5ae;
                font-weight: bold;
                background: transparent;
                animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }

            @keyframes popIn {
                0% { transform: scale(0); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
            }

            /* Flash Screen Overlay */
            #word-overlay {
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.95);
                display: none;
                flex-wrap: wrap;
                justify-content: center;
                align-content: center;
                gap: 20px;
                padding: 40px;
                z-index: 10000;
                backdrop-filter: blur(10px);
            }

            .choice-btn {
                background: #d4a373;
                color: #1a1510;
                padding: 20px 40px;
                font-size: 2.5rem;
                font-weight: bold;
                border-radius: 15px;
                cursor: pointer;
                transition: 0.2s;
                border: none;
                font-family: 'Poppins', sans-serif;
            }

            .choice-btn:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 20px rgba(212, 163, 115, 0.4);
            }

            .choice-btn.wrong {
                animation: shake 0.4s;
                background: #e63946 !important;
                color: white;
            }

            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }

            .one-shot-badge {
                position: absolute;
                top: -30px;
                left: 50%;
                transform: translateX(-50%);
                background: #faedcd;
                color: #d4a373;
                padding: 10px 50px;
                border-radius: 50px;
                font-weight: 900;
                font-size: 2rem;
                letter-spacing: 5px;
                border: 3px solid #d4a373;
            }

            @media (max-width: 768px) {
                .story-title { font-size: 2.5rem; }
                .story-body { font-size: 1.8rem; }
                .choice-btn { font-size: 1.5rem; padding: 10px 20px; }
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
        <div style="height: 100px;"></div>
    `;

    const overlay = document.getElementById('word-overlay');

    // دالة فتح الفلاش سكرين
    const openOverlay = (target) => {
        currentTargetId = target;
        overlay.innerHTML = '';
        
        // ترتيب عشوائي للكلمات المتبقية
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

    // دالة التحقق من الكلمة
    const checkWord = (selectedWord, btnElement) => {
        const correctWord = currentTargetId.getAttribute('data-word');
        
        if (selectedWord === correctWord) {
            currentTargetId.innerText = correctWord;
            currentTargetId.classList.add('filled');
            overlay.style.display = 'none';
            remainingWords = remainingWords.filter(w => w !== correctWord);
        } else {
            btnElement.classList.add('wrong');
            setTimeout(() => btnElement.classList.remove('wrong'), 400);
        }
    };

    // إضافة مستمعي الأحداث للفراغات
    document.querySelectorAll('.word-gap').forEach(gap => {
        gap.onclick = () => openOverlay(gap);
    });

    // زر إنهاء النشاط بالمسافة
    document.onkeydown = (e) => {
        if (e.keyCode === 32) {
            if (window.triggerVetoDone) window.triggerVetoDone();
        }
    };
})();
