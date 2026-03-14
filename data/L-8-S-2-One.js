(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // --- إعدادات القصة ---
    const storyTitle = "The Dragon Who Could Not Breathe Fire";
    
    const storyContent = `
        Once upon a time, in a high <span class="target-word">mountain</span>, lived a small dragon named Sparky. 
        Sparky had green <span class="target-word">scales</span> and a very long <span class="target-word">tail</span>. 
        All his friends could breathe big <span class="target-word">flames</span> of fire, but Sparky was <span class="target-word">different</span>. 
        When he opened his <span class="target-word">mouth</span>, only small pink <span class="target-word">bubbles</span> came out.
        <br><br>
        The other dragons laughed at him. "You are not a real <span class="target-word">dragon</span>!" they said. 
        Sparky felt very <span class="target-word">sad</span> and went to sit by a cold <span class="target-word">lake</span>. 
        He tried and tried, but he only made more bubbles. The lake was full of <span class="target-word">floating</span> pink circles.
        <br><br>
        One day, the King’s <span class="target-word">castle</span> had a big problem. It was the Queen’s <span class="target-word">birthday</span>, and she wanted a giant <span class="target-word">party</span>. 
        But there was no <span class="target-word">soap</span> to clean the dishes, and the children wanted something <span class="target-word">fun</span> to play with. 
        The King sent a <span class="target-word">message</span> to the mountains: "We need help!"
        <br><br>
        Sparky flew down to the castle. He was very <span class="target-word">nervous</span>. 
        He stood in the middle of the <span class="target-word">square</span> and opened his mouth wide. 
        Thousands of pink bubbles filled the <span class="target-word">air</span>. The children started to <span class="target-word">jump</span> and catch them. 
        They were so <span class="target-word">happy</span>!
        <br><br>
        The Queen looked at the bubbles and <span class="target-word">smiled</span>. "This is the most <span class="target-word">beautiful</span> party ever!" she said. 
        Sparky was not sad anymore. He realized that he was <span class="target-word">special</span>. 
        He didn't need fire to be a <span class="target-word">hero</span>. The King gave him a golden <span class="target-word">necklace</span>, and Sparky became the official "Party Dragon" of the <span class="target-word">kingdom</span>. 
        He lived a very <span class="target-word">peaceful</span> life, making everyone laugh with his bubbles.
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
                color: #f39c12; /* لون برتقالي ناري مناسب للتنانين */
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
