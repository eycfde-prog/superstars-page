(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // قائمة الكلمات المطلوبة (يتم استخراجها وتوزيعها عشوائياً)
    let wordsPool = [
        "forgetful", "competition", "supply", "tail", "journey", 
        "grumpy", "carrot", "intuition", "beehive", "clumsy", 
        "mysterious", "riddle", "address", "frustrated", "silly", 
        "pedestal", "challenge", "silent", "paws", "ridiculous", 
        "absurd", "moral"
    ];

    const storyTitle = "The Squirrel Who Forgot Everything";
    
    // تحويل الكلمات في المقال إلى مربعات فارغة قابلة للضغط
    let storyContent = `
        Once upon a time, in a forest where the trees were so tall they tickled the clouds, lived a squirrel named Sammy. 
        Sammy was not an ordinary squirrel; he was the most <span class="word-slot" data-word="forgetful">?</span> creature in nature. 
        While other squirrels were busy organizing their nuts by size and color, Sammy often found himself staring at a rock, wondering if he had already eaten breakfast. 
        <br><br>
        One chilly autumn morning, the Great Owl announced the annual <span class="word-slot" data-word="competition">?</span> for the Winter Feast. 
        The goal was simple: find the "Golden Acorn" hidden deep within the Whispering Woods. The winner would get a lifetime <span class="word-slot" data-word="supply">?</span> of peanut butter. 
        Sammy’s stomach growled at the thought. "I must win!" he declared, right before tripping over his own <span class="word-slot" data-word="tail">?</span>.
        <br><br>
        Sammy started his <span class="word-slot" data-word="journey">?</span> with a small backpack and a very confused map he had drawn himself. 
        As he walked, he met a <span class="word-slot" data-word="grumpy">?</span> rabbit named Roger. "You’re going the wrong way, Sammy," Roger sighed, munching on a <span class="word-slot" data-word="carrot">?</span>. 
        Sammy looked at his map, which was actually just a collection of coffee stains. "I am following my <span class="word-slot" data-word="intuition">?</span>!" Sammy claimed heroically, while accidentally walking into a <span class="word-slot" data-word="beehive">?</span>.
        <br><br>
        After escaping the bees with a very <span class="word-slot" data-word="clumsy">?</span> dance, Sammy reached a fork in the road. 
        He had to choose between the Path of Darkness or the Path of Shiny Things. Naturally, Sammy chose the shiny one. 
        It led him to a <span class="word-slot" data-word="mysterious">?</span> pond where a frog was wearing sunglasses. "To pass," the frog croaked, "you must solve my <span class="word-slot" data-word="riddle">?</span>." 
        Sammy panicked. He couldn't even remember his own <span class="word-slot" data-word="address">?</span>.
        <br><br>
        The frog asked, "What has keys but can't open locks?" Sammy thought hard. "A very <span class="word-slot" data-word="frustrated">?</span> locksmith?" he guessed. 
        The frog laughed so hard he fell into the water. "It’s a piano, you <span class="word-slot" data-word="silly">?</span> squirrel! But I like your spirit. Pass through."
        <br><br>
        Finally, Sammy saw it—the Golden Acorn! It was sitting on a <span class="word-slot" data-word="pedestal">?</span> made of old soda cans. 
        But there was a <span class="word-slot" data-word="challenge">?</span>. A giant cat was sleeping right next to it. Sammy knew he had to be <span class="word-slot" data-word="silent">?</span>. 
        He crawled on his belly, holding his breath. Just as his <span class="word-slot" data-word="paws">?</span> touched the gold, he felt a sneeze coming on. "A-choo!"
        <br><br>
        The cat woke up, looked at Sammy, and realized the squirrel was wearing a <span class="word-slot" data-word="ridiculous">?</span> hat made of leaves. 
        The cat started laughing uncontrollably. "You look so <span class="word-slot" data-word="absurd">?</span> that I can't even be mad," the cat giggled. He let Sammy take the acorn.
        <br><br>
        Sammy returned to the village a hero. The <span class="word-slot" data-word="moral">?</span> of the story? You don't need a perfect memory if you have a good sense of humor and a bit of luck.
    `;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:block; background:#0a0a0a; color:#ccc; overflow-y:auto; padding:60px 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; scroll-behavior: smooth;`;

    container.innerHTML = `
        <style>
            #stage-content::-webkit-scrollbar { width: 6px; }
            #stage-content::-webkit-scrollbar-thumb { background: #ffcc00; border-radius: 10px; }

            .story-wrapper {
                max-width: 800px;
                margin: 0 auto;
                background: #151515;
                padding: 40px;
                border-radius: 30px;
                box-shadow: 0 30px 60px rgba(0,0,0,0.7);
                border: 1px solid #333;
                position: relative;
            }

            .story-title {
                color: #ffcc00;
                text-align: center;
                font-size: 2.5rem;
                font-weight: 800;
                margin-bottom: 40px;
                text-shadow: 0 4px 10px rgba(255,204,0,0.3);
            }

            .story-body {
                line-height: 2;
                font-size: 1.3rem;
                color: #eee;
                text-align: left;
            }

            .word-slot {
                display: inline-block;
                min-width: 60px;
                height: 30px;
                background: #333;
                border-bottom: 3px solid #ffcc00;
                border-radius: 8px;
                margin: 0 5px;
                cursor: pointer;
                text-align: center;
                line-height: 30px;
                color: transparent;
                transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                vertical-align: middle;
                font-weight: bold;
            }

            .word-slot.filled {
                color: #ffcc00;
                background: rgba(255, 204, 0, 0.1);
                min-width: auto;
                padding: 0 10px;
            }

            .flash-screen {
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.95);
                z-index: 1000;
                display: none;
                flex-wrap: wrap;
                justify-content: center;
                align-content: center;
                padding: 50px;
                gap: 15px;
                backdrop-filter: blur(10px);
            }

            .flash-screen.active { display: flex; animation: fadeIn 0.4s ease; }

            .choice-word {
                padding: 12px 25px;
                background: #222;
                color: #fff;
                border: 2px solid #ffcc00;
                border-radius: 15px;
                font-size: 1.2rem;
                cursor: pointer;
                transition: 0.2s;
            }

            .choice-word:hover {
                background: #ffcc00;
                color: #000;
                transform: scale(1.1);
            }

            .one-shot-badge {
                position: absolute;
                top: -15px;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(45deg, #ffcc00, #ff9900);
                color: #000;
                padding: 5px 25px;
                border-radius: 20px;
                font-weight: 900;
                font-size: 0.9rem;
                box-shadow: 0 5px 15px rgba(255,204,0,0.4);
            }

            @keyframes fadeIn { from { opacity: 0; transform: scale(1.1); } to { opacity: 1; transform: scale(1); } }

            @media (max-width: 600px) {
                .story-wrapper { padding: 20px; margin: 10px; }
                .story-title { font-size: 1.5rem; }
                .story-body { font-size: 1rem; }
                .choice-word { font-size: 0.9rem; padding: 8px 15px; }
            }
        </style>

        <div class="story-wrapper">
            <div class="one-shot-badge">⚡ ONE SHOT ⚡</div>
            <h1 class="story-title">${storyTitle}</h1>
            <div class="story-body">${storyContent}</div>
        </div>

        <div id="flash-screen" class="flash-screen"></div>
        <div style="height: 100px;"></div>
    `;

    const flashScreen = document.getElementById('flash-screen');
    let currentSlot = null;

    // وظيفة لفتح الفلاش سكرين
    const openFlashScreen = (slot) => {
        currentSlot = slot;
        flashScreen.innerHTML = '';
        
        // خلط الكلمات المتبقية عشوائياً
        const shuffledWords = [...wordsPool].sort(() => Math.random() - 0.5);
        
        shuffledWords.forEach(word => {
            const btn = document.createElement('div');
            btn.className = 'choice-word';
            btn.innerText = word;
            btn.onclick = () => selectWord(word);
            flashScreen.appendChild(btn);
        });
        
        flashScreen.classList.add('active');
    };

    // وظيفة اختيار الكلمة
    const selectWord = (selectedWord) => {
        const correctWord = currentSlot.getAttribute('data-word');
        
        if (selectedWord === correctWord) {
            currentSlot.innerText = selectedWord;
            currentSlot.classList.add('filled');
            // إزالة الكلمة من المصفوفة عشان متظهرش تاني
            wordsPool = wordsPool.filter(w => w !== selectedWord);
            flashScreen.classList.remove('active');
        } else {
            // حركة اهتزاز بسيطة لو الإجابة غلط
            currentSlot.style.borderColor = '#ff4444';
            setTimeout(() => { currentSlot.style.borderColor = '#ffcc00'; }, 500);
            flashScreen.classList.remove('active');
        }
    };

    // إضافة مستمع للأحداث لكل الفراغات
    document.querySelectorAll('.word-slot').forEach(slot => {
        slot.onclick = () => openFlashScreen(slot);
    });

    // إغلاق الفلاش سكرين عند الضغط على الخلفية (اختياري)
    flashScreen.onclick = (e) => {
        if(e.target === flashScreen) flashScreen.classList.remove('active');
    };

    document.onkeydown = (e) => {
        if (e.keyCode === 32) { // Space
            if (window.triggerVetoDone) window.triggerVetoDone();
        }
    };
})();
