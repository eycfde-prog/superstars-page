(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // --- إعدادات القصة (تغير النص والكلمات في النسخ الـ 40) ---
    const storyTitle = "The Squirrel Who Forgot Everything";
    
    // ملاحظة: وضعت الكلمات داخل <span> بلون مختلف لسهولة التعرف عليها أثناء القراءة
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
    // -------------------------------------------------------

    container.innerHTML = ''; 
    container.style.cssText = `height:calc(100vh - 200px); display:block; background:#121212; color:#eee; overflow-y:auto; padding:50px; font-family: 'Georgia', serif;`;

    container.innerHTML = `
        <style>
            .target-word {
                color: #f1c40f; 
                font-weight: bold;
                text-decoration: underline;
                background: rgba(241, 196, 15, 0.1);
                padding: 0 5px;
                border-radius: 4px;
            }
            .story-container {
                max-width: 1000px;
                margin: 0 auto;
                line-height: 1.8;
                font-size: 1.8rem;
            }
            .title {
                color: #e74c3c;
                text-align: center;
                font-size: 3rem;
                margin-bottom: 40px;
                text-transform: uppercase;
                border-bottom: 2px solid #333;
                padding-bottom: 20px;
            }
        </style>
        <div class="story-container">
            <h1 class="title">ONE SHOT: ${storyTitle}</h1>
            <div id="textBody">
                ${storyContent}
            </div>
        </div>
    `;

})();
