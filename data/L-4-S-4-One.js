(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // --- إعدادات القصة ---
    const storyTitle = "The Dog Who Thought He Was a Cat";
    
    const storyContent = `
        Max was a big, friendly <span class="target-word">dog</span> with a very waggy tail. He lived in a house with a small <span class="target-word">garden</span> and a clever cat named Luna. 
        Because Max spent all his time with Luna, he started to <span class="target-word">believe</span> he was a cat too.
        <br><br>
        Every morning, Max tried to <span class="target-word">jump</span> on the kitchen <span class="target-word">counter</span>. But Max was too heavy! 
        He would crash into the <span class="target-word">dishes</span> with a loud noise. "Woof!" he said, but then he tried to <span class="target-word">purr</span> like Luna. 
        It sounded like a broken <span class="target-word">engine</span>.
        <br><br>
        One sunny afternoon, Max saw a <span class="target-word">squirrel</span> in the tree. Luna climbed the tree <span class="target-word">quickly</span> to catch it. Max tried to do the same. 
        He put his big <span class="target-word">paws</span> on the tree, but he just slid down and landed on his <span class="target-word">back</span>. 
        He looked very <span class="target-word">silly</span>, and the squirrel just looked at him with <span class="target-word">surprise</span>.
        <br><br>
        Later, the owner brought a bowl of <span class="target-word">milk</span> for Luna and a <span class="target-word">bone</span> for Max. 
        Max ignored his bone. He tried to drink the milk from the tiny <span class="target-word">bowl</span>, but his big nose pushed the milk all over the <span class="target-word">floor</span>. 
        He was very <span class="target-word">hungry</span>, but he was also very <span class="target-word">stubborn</span>.
        <br><br>
        Suddenly, a <span class="target-word">stranger</span> walked past the gate. Luna ran away and hid under the <span class="target-word">sofa</span>. 
        But Max didn't hide. He stood up, barked loudly, and <span class="target-word">protected</span> the house. The stranger was scared and ran away.
        <br><br>
        His owner hugged him and said, "You are a <span class="target-word">brave</span> dog, Max!" 
        Max felt very happy. He finally understood that he was not a cat, and that being a dog was actually a lot of <span class="target-word">fun</span>. 
        He went back to the garden and finally chewed his bone.
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
