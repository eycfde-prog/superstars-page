(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // --- إعدادات القصة ---
    const storyTitle = "The Astronaut and the Space Pizza";
    
    const storyContent = `
        Leo was an <span class="target-word">astronaut</span> who lived in a big silver <span class="target-word">spaceship</span>. 
        He loved looking out of the <span class="target-word">window</span> at the bright <span class="target-word">stars</span> and the blue Earth. 
        His job was to <span class="target-word">explore</span> new places and collect moon <span class="target-word">rocks</span>.
        <br><br>
        One Friday, Leo was very <span class="target-word">hungry</span>. He wanted to eat his favorite food: a cheese <span class="target-word">pizza</span>. 
        He went to the space kitchen and put the pizza in the <span class="target-word">oven</span>. 
        But in space, there is no <span class="target-word">gravity</span>. Everything floats!
        <br><br>
        Suddenly, the oven door opened, and the pizza <span class="target-word">floated</span> out. "Come back here!" Leo shouted. 
        He tried to <span class="target-word">catch</span> it, but the pizza was too <span class="target-word">fast</span>. 
        It moved past his <span class="target-word">helmet</span> and flew toward the control panel. 
        Leo had to be <span class="target-word">careful</span> because he didn't want to break the <span class="target-word">buttons</span>.
        <br><br>
        He grabbed a large <span class="target-word">net</span> used for catching space <span class="target-word">dust</span>. 
        He jumped through the air like a <span class="target-word">superhero</span>. Finally, he caught the pizza! 
        But then, a small green <span class="target-word">alien</span> appeared on the screen of his computer. 
        The alien looked at the pizza with big <span class="target-word">eyes</span>.
        <br><br>
        "Are you hungry too?" Leo asked. He shared a <span class="target-word">slice</span> with his new friend. 
        The alien made a happy <span class="target-word">sound</span>. 
        Leo realized that even in the <span class="target-word">middle</span> of the dark <span class="target-word">universe</span>, sharing a meal is the best way to make a new <span class="target-word">friend</span>. 
        He finished his dinner and went to sleep, dreaming of more space adventures.
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
