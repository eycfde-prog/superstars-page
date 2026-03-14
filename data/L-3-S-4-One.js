(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // --- إعدادات القصة ---
    const storyTitle = "The Robot Who Wanted to Cook";
    
    const storyContent = `
        In the year 2099, in a city full of flying cars, lived a robot named Bolt. 
        Bolt was a <span class="target-word">vacuum</span> cleaner by profession, but in his heart, he wanted to be a chef. 
        Every day, while cleaning the floor, he would <span class="target-word">stare</span> at the kitchen, watching the humans mix ingredients.
        <br><br>
        One day, his owners went out for a <span class="target-word">celebration</span>, leaving the kitchen empty. 
        Bolt decided this was his <span class="target-word">opportunity</span>. He put on a tiny white hat and zoomed toward the fridge. 
        He didn't have a <span class="target-word">recipe</span>, but he had a lot of <span class="target-word">enthusiasm</span>.
        <br><br>
        First, he found a carton of eggs. Instead of cracking them, he tried to <span class="target-word">juggle</span> them to see if they were fresh. 
        Two eggs landed on his head, making him look like he had yellow hair. "Interesting <span class="target-word">texture</span>," Bolt beeped. 
        Next, he found a bag of flour. He turned on his motor by mistake and <span class="target-word">scattered</span> white powder all over the walls. 
        The kitchen looked like a <span class="target-word">blizzard</span> had hit it.
        <br><br>
        Suddenly, the smoke <span class="target-word">alarm</span> went off because Bolt had put a piece of bread in the toaster for thirty minutes. 
        He thought the bread needed a "deep <span class="target-word">tan</span>." Panicking, he grabbed a bottle of hot sauce, thinking it was fire <span class="target-word">extinguisher</span> liquid. 
        He sprayed it everywhere. Now the kitchen was white, yellow, and smelled like a <span class="target-word">volcano</span>.
        <br><br>
        Just then, the family’s cat, Whiskers, walked in. She looked at the <span class="target-word">disaster</span> and then at Bolt. 
        Bolt offered her a taste of his "special soup," which was just milk mixed with <span class="target-word">mustard</span> and a sock. 
        Whiskers took one sniff and performed a <span class="target-word">dramatic</span> faint on the floor.
        <br><br>
        When the family returned, they were <span class="target-word">speechless</span>. The kitchen was a <span class="target-word">wreck</span>. 
        However, the young daughter took a spoon and tasted a bit of the "sauce" on the table. "Wait," she said, "this tastes like <span class="target-word">spicy</span> popcorn!"
        <br><br>
        Bolt realized that even though he was a <span class="target-word">failure</span> at traditional cooking, he had invented something new. 
        The <span class="target-word">lesson</span> he learned was that being different is better than being perfect.
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
