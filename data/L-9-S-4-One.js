(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // --- إعدادات القصة ---
    const storyTitle = "The Professor and the Purple Soap";
    
    const storyContent = `
        Professor Pumpernickel was a very <span class="target-word">smart</span> man, but he was also very <span class="target-word">messy</span>. 
        He worked in a small <span class="target-word">laboratory</span> in his basement. 
        He wanted to invent a new kind of <span class="target-word">soap</span> that could clean a whole house in one <span class="target-word">minute</span>.
        <br><br>
        One Saturday, he started his big <span class="target-word">experiment</span>. He mixed some blue <span class="target-word">liquid</span> with a yellow <span class="target-word">powder</span>. 
        Then, he added a secret <span class="target-word">ingredient</span> from a small green bottle. 
        Suddenly, the <span class="target-word">mixture</span> started to <span class="target-word">bubble</span> and make a strange "pop" sound. 
        The color changed from green to a very bright purple.
        <br><br>
        "Perfect!" the Professor shouted. He poured the liquid into a <span class="target-word">bucket</span> of water. 
        But then, something <span class="target-word">scary</span> happened. The soap didn't just make bubbles; it started to <span class="target-word">grow</span>! 
        In seconds, the purple bubbles were everywhere. They covered the <span class="target-word">floor</span>, the <span class="target-word">walls</span>, and even the Professor's <span class="target-word">glasses</span>.
        <br><br>
        The bubbles were very <span class="target-word">sticky</span>. When the Professor tried to walk, his <span class="target-word">shoes</span> got stuck to the ground. 
        "Help!" he cried, but his voice sounded <span class="target-word">funny</span> because he had bubbles in his <span class="target-word">mouth</span>. 
        His pet <span class="target-word">cat</span>, Barnaby, saw the purple bubbles and thought they were <span class="target-word">toys</span>. 
        He jumped into the foam and turned into a purple <span class="target-word">ball</span> of fur.
        <br><br>
        The Professor had to use a big <span class="target-word">hose</span> to wash everything away with <span class="target-word">water</span>. 
        It took him five hours to clean the basement. He was very <span class="target-word">tired</span> and his skin was a little bit purple. 
        He learned a big <span class="target-word">lesson</span>: sometimes, it is better to clean the house with a simple <span class="target-word">broom</span> and some water.
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
                color: #8e44ad; /* لون بنفسجي صابوني */
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
