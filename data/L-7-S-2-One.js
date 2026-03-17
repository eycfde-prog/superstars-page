(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

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

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; display:block; background:#0a0a0c; color:#e2e8f0; overflow-y:auto; padding:60px 40px; font-family: 'Georgia', serif; scroll-behavior: smooth;`;

    container.innerHTML = `
        <style>
            @keyframes starGlow {
                0% { text-shadow: 0 0 5px #f1c40f88; }
                50% { text-shadow: 0 0 15px #f1c40f; }
                100% { text-shadow: 0 0 5px #f1c40f88; }
            }
            .story-wrapper {
                max-width: 900px;
                margin: 0 auto;
                background: rgba(255, 255, 255, 0.03);
                padding: 50px;
                border-radius: 30px;
                border: 1px solid #1e293b;
                box-shadow: 0 20px 50px rgba(0,0,0,0.5);
            }
            .target-word {
                color: #f1c40f; 
                font-weight: bold;
                border-bottom: 2px dashed #f1c40f55;
                cursor: help;
                transition: 0.3s;
                animation: starGlow 3s infinite;
            }
            .target-word:hover {
                background: #f1c40f;
                color: #000;
                border-radius: 4px;
            }
            .story-text {
                line-height: 2;
                font-size: 1.9rem;
                text-align: justify;
            }
            .story-header {
                text-align: center;
                margin-bottom: 50px;
            }
            .story-header span {
                color: #e74c3c;
                font-family: 'Arial';
                font-weight: 900;
                letter-spacing: 5px;
                font-size: 1.2rem;
                display: block;
                margin-bottom: 10px;
            }
            .story-header h1 {
                font-size: 3.5rem;
                margin: 0;
                color: #fff;
                text-shadow: 0 4px 10px rgba(0,0,0,0.3);
            }
            #stage-content::-webkit-scrollbar { width: 10px; }
            #stage-content::-webkit-scrollbar-track { background: #0a0a0c; }
            #stage-content::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        </style>
        
        <div class="story-wrapper">
            <div class="story-header">
                <span>ONE SHOT READING</span>
                <h1>${storyTitle}</h1>
            </div>
            <div class="story-text">
                ${storyContent}
            </div>
        </div>
    `;

})();
