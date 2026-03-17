(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Story Settings ---
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

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; display:block; background:#08080a; color:#cfcfcf; overflow-y:auto; padding:60px; font-family: 'Segoe UI', Roboto, sans-serif; scroll-behavior: smooth;`;

    container.innerHTML = `
        <style>
            #stage-content::-webkit-scrollbar { width: 10px; }
            #stage-content::-webkit-scrollbar-track { background: #050505; }
            #stage-content::-webkit-scrollbar-thumb { background: #e74c3c; border-radius: 5px; }

            .story-wrapper {
                max-width: 950px;
                margin: 0 auto;
                line-height: 2;
                font-size: 1.8rem;
                background: #111115;
                padding: 50px;
                border-radius: 15px;
                border: 1px solid #222;
                box-shadow: 0 20px 50px rgba(0,0,0,0.5);
            }

            .title-box {
                text-align: center;
                margin-bottom: 50px;
                border-bottom: 2px solid #e74c3c;
                padding-bottom: 20px;
            }

            .title-tag { color: #e74c3c; font-size: 1rem; font-weight: 900; letter-spacing: 5px; }
            .title-main { color: #fff; font-size: 3.5rem; text-transform: uppercase; margin: 10px 0; }

            .target-word {
                color: #00ffcc; 
                font-weight: bold;
                padding: 2px 8px;
                background: rgba(0, 255, 204, 0.1);
                border-radius: 4px;
                border-bottom: 2px solid #00ffcc;
                transition: 0.3s ease;
                cursor: help;
            }

            .target-word:hover {
                background: #00ffcc;
                color: #000;
                box-shadow: 0 0 15px rgba(0, 255, 204, 0.6);
            }

            #textBody { text-align: justify; }
            
            .footer-note {
                margin-top: 50px;
                text-align: center;
                font-size: 1.1rem;
                color: #555;
                font-style: italic;
            }
        </style>

        <div class="story-wrapper">
            <div class="title-box">
                <div class="title-tag">VETO ONE-SHOT // L3-S4</div>
                <h1 class="title-main">${storyTitle}</h1>
            </div>
            
            <div id="textBody">
                ${storyContent}
            </div>

            <div class="footer-note">
                ⚡ Moral: Innovation often comes from unexpected mistakes.
            </div>
        </div>
        <div style="height:100px;"></div>
    `;

    // Keyboard support for scrolling or finishing
    document.onkeydown = (e) => {
        if (e.keyCode === 32) { // Space
             if(window.triggerVetoDone) window.triggerVetoDone();
        }
    };
})();
