(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // --- إعدادات القصة ---
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
