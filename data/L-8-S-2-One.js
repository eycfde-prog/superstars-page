(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

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

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; display:block; background:#0a0a0a; color:#f0f0f0; overflow-y:auto; padding:60px 50px; font-family: 'Inter', 'Georgia', serif; scroll-behavior: smooth;`;

    container.innerHTML = `
        <style>
            @keyframes bubbleFloat {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
            }
            .story-wrapper {
                max-width: 900px;
                margin: 0 auto;
                background: rgba(255, 255, 255, 0.02);
                padding: 60px;
                border-radius: 40px;
                border: 1px solid rgba(243, 156, 18, 0.2);
                box-shadow: 0 40px 80px rgba(0,0,0,0.8);
            }
            .target-word {
                color: #f1c40f; 
                font-weight: 800;
                background: rgba(236, 64, 122, 0.15);
                padding: 2px 8px;
                border-radius: 8px;
                display: inline-block;
                animation: bubbleFloat 3s infinite ease-in-out;
                transition: 0.3s;
                cursor: help;
            }
            .target-word:hover {
                background: #f1c40f;
                color: #000;
                transform: scale(1.1);
            }
            .story-content {
                line-height: 2.1;
                font-size: 1.9rem;
                text-align: justify;
                letter-spacing: 0.5px;
            }
            .story-header {
                text-align: center;
                margin-bottom: 50px;
                border-bottom: 3px double rgba(243, 156, 18, 0.3);
                padding-bottom: 30px;
            }
            .story-header h1 {
                font-size: 3.5rem;
                margin: 0;
                color: #f39c12;
                text-transform: uppercase;
                letter-spacing: 2px;
                font-weight: 900;
            }
            .subtitle {
                color: #ec407a;
                font-weight: bold;
                letter-spacing: 5px;
                font-size: 1.1rem;
                display: block;
                margin-bottom: 10px;
            }
            #stage-content::-webkit-scrollbar { width: 10px; }
            #stage-content::-webkit-scrollbar-track { background: #0a0a0a; }
            #stage-content::-webkit-scrollbar-thumb { background: #f39c12; border-radius: 10px; }
        </style>
        
        <div class="story-wrapper">
            <div class="story-header">
                <span class="subtitle">LEVEL 8 • READING SHOT</span>
                <h1>${storyTitle}</h1>
            </div>
            <div class="story-content">
                ${storyContent}
            </div>
        </div>
    `;

})();
