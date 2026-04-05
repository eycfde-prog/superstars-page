(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    const storyTitle = "The Squirrel Who Forgot Everything";
    
    const storyContent = `
        Once upon a time, in a forest where the trees were so tall they tickled the clouds, lived a squirrel named Sammy. 
        Sammy was not an ordinary squirrel; he was the most <span class="target-word">forgetful</span> creature in nature. 
        While other squirrels were busy organizing their nuts by size and color, Sammy often found himself staring at a rock, wondering if he had already eaten breakfast. 
        <br><br>
        One chilly autumn morning, the Great Owl announced the annual <span class="target-word">competition</span> for the Winter Feast. 
        The goal was simple: find the "Golden Acorn" hidden deep within the Whispering Woods. The winner would get a lifetime <span class="target-word">supply</span> of peanut butter. 
        Sammy’s stomach growled at the thought. "I must win!" he declared, right before tripping over his own <span class="target-word">tail</span>.
        <br><br>
        Sammy started his <span class="target-word">journey</span> with a small backpack and a very confused map he had drawn himself. 
        As he walked, he met a <span class="target-word">grumpy</span> rabbit named Roger. "You’re going the wrong way, Sammy," Roger sighed, munching on a <span class="target-word">carrot</span>. 
        Sammy looked at his map, which was actually just a collection of coffee stains. "I am following my <span class="target-word">intuition</span>!" Sammy claimed heroically, while accidentally walking into a <span class="target-word">beehive</span>.
        <br><br>
        After escaping the bees with a very <span class="target-word">clumsy</span> dance, Sammy reached a fork in the road. 
        He had to choose between the Path of Darkness or the Path of Shiny Things. Naturally, Sammy chose the shiny one. 
        It led him to a <span class="target-word">mysterious</span> pond where a frog was wearing sunglasses. "To pass," the frog croaked, "you must solve my <span class="target-word">riddle</span>." 
        Sammy panicked. He couldn't even remember his own <span class="target-word">address</span>.
        <br><br>
        The frog asked, "What has keys but can't open locks?" Sammy thought hard. "A very <span class="target-word">frustrated</span> locksmith?" he guessed. 
        The frog laughed so hard he fell into the water. "It’s a piano, you <span class="target-word">silly</span> squirrel! But I like your spirit. Pass through."
        <br><br>
        Finally, Sammy saw it—the Golden Acorn! It was sitting on a <span class="target-word">pedestal</span> made of old soda cans. 
        But there was a <span class="target-word">challenge</span>. A giant cat was sleeping right next to it. Sammy knew he had to be <span class="target-word">silent</span>. 
        He crawled on his belly, holding his breath. Just as his <span class="target-word">paws</span> touched the gold, he felt a sneeze coming on. "A-choo!"
        <br><br>
        The cat woke up, looked at Sammy, and realized the squirrel was wearing a <span class="target-word">ridiculous</span> hat made of leaves. 
        The cat started laughing uncontrollably. "You look so <span class="target-word">absurd</span> that I can't even be mad," the cat giggled. He let Sammy take the acorn.
        <br><br>
        Sammy returned to the village a hero. The <span class="target-word">moral</span> of the story? You don't need a perfect memory if you have a good sense of humor and a bit of luck.
    `;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:block; background:#0a0a0a; color:#ccc; overflow-y:auto; padding:60px 0; font-family: 'Georgia', serif; scroll-behavior: smooth;`;

    container.innerHTML = `
        <style>
            /* تخصيص شريط التمرير */
            #stage-content::-webkit-scrollbar { width: 8px; }
            #stage-content::-webkit-scrollbar-track { background: #050505; }
            #stage-content::-webkit-scrollbar-thumb { background: #c5a059; border-radius: 10px; }

            .story-wrapper {
                max-width: 900px;
                margin: 0 auto;
                background: #111;
                padding: 80px;
                border-radius: 20px;
                box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                border: 1px solid #222;
                position: relative;
            }

            .story-title {
                color: #c5a059;
                text-align: center;
                font-size: 3.5vw;
                font-weight: 900;
                margin-bottom: 50px;
                text-transform: uppercase;
                letter-spacing: 2px;
                font-family: 'Segoe UI', sans-serif;
            }

            .story-body {
                line-height: 1.8;
                font-size: 1.8vw;
                color: #ddd;
                text-align: justify;
            }

            .target-word {
                color: #c5a059; 
                font-weight: bold;
                background: rgba(197, 160, 89, 0.1);
                padding: 2px 8px;
                border-radius: 6px;
                border-bottom: 2px solid #c5a059;
                transition: 0.3s;
                cursor: help;
            }

            .target-word:hover {
                background: #c5a059;
                color: #000;
                box-shadow: 0 0 15px rgba(197, 160, 89, 0.5);
            }

            .one-shot-badge {
                position: absolute;
                top: -20px;
                left: 50%;
                transform: translateX(-50%);
                background: #c5a059;
                color: #000;
                padding: 5px 30px;
                border-radius: 50px;
                font-family: sans-serif;
                font-weight: 900;
                font-size: 1rem;
                letter-spacing: 3px;
            }
        </style>

        <div class="story-wrapper">
            <div class="one-shot-badge">ONE SHOT</div>
            <h1 class="story-title">${storyTitle}</h1>
            <div class="story-body">
                ${storyContent}
            </div>
        </div>

        <div style="height: 100px;"></div> `;

    // إضافة زر إنهاء النشاط
    document.onkeydown = (e) => {
        if (e.keyCode === 32) { // مفتاح المسافة
            if (window.triggerVetoDone) window.triggerVetoDone();
        }
    };
})();
