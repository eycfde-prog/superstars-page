(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Story Settings ---
    const storyTitle = "The Chef and the Big Mistake";
    
    const storyContent = `
        Mario was a very <span class="target-word">famous</span> chef in a small town. Everyone loved his <span class="target-word">pasta</span> and his delicious cakes. 
        Mario was very <span class="target-word">proud</span> of his work. Every morning, he went to the <span class="target-word">market</span> to buy fresh <span class="target-word">vegetables</span> and sweet fruit.
        <br><br>
        One Monday, Mario woke up with a very big <span class="target-word">cold</span>. His nose was blocked, and he couldn't <span class="target-word">smell</span> anything. 
        "Oh no!" he said. "Today is the day of the Mayor's <span class="target-word">dinner</span>." 
        Mario was <span class="target-word">nervous</span>, but he had to go to the kitchen.
        <br><br>
        He started to cook his special <span class="target-word">soup</span>. Because he couldn't smell, he was very <span class="target-word">confused</span>. 
        He saw a bowl of white <span class="target-word">powder</span>. He thought it was <span class="target-word">salt</span>, so he put five spoons of it into the pot. 
        But it wasn't salt; it was <span class="target-word">sugar</span>!
        <br><br>
        Then, he wanted to add some <span class="target-word">pepper</span> for a bit of spice. Instead, he grabbed a jar of <span class="target-word">chocolate</span> chips by mistake. 
        "This looks a bit <span class="target-word">strange</span>," Mario whispered, but he was too <span class="target-word">busy</span> to stop. He even added some <span class="target-word">lemons</span> to a dish that needed onions.
        <br><br>
        When the Mayor arrived, he sat at the <span class="target-word">table</span> and took a big spoon of the soup. Mario watched him from behind the <span class="target-word">curtain</span>. 
        The Mayor’s face turned <span class="target-word">purple</span>. He didn't scream; instead, he started to laugh.
        <br><br>
        "Mario!" the Mayor called. "This is the most <span class="target-word">creative</span> meal I have ever eaten! It is like a dessert and a dinner at the same time." 
        Mario felt very <span class="target-word">lucky</span>. He learned that even when you make a <span class="target-word">mistake</span>, sometimes the result can be wonderful.
    `;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; display:block; background:#0a0a0a; color:#f0f0f0; overflow-y:auto; padding:60px; font-family: 'Crimson Text', serif;`;

    container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,700;1,400&display=swap');
            
            #stage-content::-webkit-scrollbar { width: 8px; }
            #stage-content::-webkit-scrollbar-thumb { background: #e74c3c; border-radius: 10px; }

            .story-card {
                max-width: 900px;
                margin: 0 auto;
                line-height: 1.8;
                font-size: 1.9rem;
                background: #151515;
                padding: 60px;
                border-radius: 4px;
                border: 1px solid #222;
                box-shadow: 0 30px 60px rgba(0,0,0,0.6);
                position: relative;
            }

            .story-card::before {
                content: '';
                position: absolute;
                top: 10px; left: 10px; right: 10px; bottom: 10px;
                border: 1px solid #333;
                pointer-events: none;
            }

            .title-section {
                text-align: center;
                margin-bottom: 50px;
            }

            .title-label {
                color: #e74c3c;
                font-size: 1rem;
                letter-spacing: 4px;
                text-transform: uppercase;
                font-weight: bold;
            }

            .title-text {
                font-size: 3.5rem;
                margin: 10px 0;
                color: #fff;
                font-family: 'Crimson Text', serif;
                font-style: italic;
            }

            .target-word {
                color: #f1c40f; 
                font-weight: 700;
                background: rgba(241, 196, 15, 0.05);
                border-bottom: 1px dashed #f1c40f;
                padding: 0 4px;
                transition: all 0.3s;
                cursor: help;
            }

            .target-word:hover {
                background: #f1c40f;
                color: #000;
                border-bottom: 1px solid #f1c40f;
            }

            #textBody {
                color: #ddd;
                text-align: justify;
            }

            .moral-box {
                margin-top: 60px;
                border-top: 1px solid #333;
                padding-top: 30px;
                text-align: center;
                font-style: italic;
                color: #777;
            }
        </style>

        <div class="story-card">
            <div class="title-section">
                <div class="title-label">One Shot Reading // L4-S2</div>
                <h1 class="title-text">${storyTitle}</h1>
            </div>
            
            <div id="textBody">
                ${storyContent}
            </div>

            <div class="moral-box">
                "Sometimes, mistakes are just surprises waiting to happen."
            </div>
        </div>
        <div style="height:100px;"></div>
    `;

    // Trigger done on Space
    document.onkeydown = (e) => {
        if (e.keyCode === 32) { 
             if(window.triggerVetoDone) window.triggerVetoDone();
        }
    };
})();
