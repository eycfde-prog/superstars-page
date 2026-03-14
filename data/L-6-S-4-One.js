(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // --- إعدادات القصة ---
    const storyTitle = "The Secret Recipe of the Magic Factory";
    
    const storyContent = `
        Timmy was the luckiest boy in school because he won a golden <span class="target-word">ticket</span> to visit the world-famous "Choco-Blast" <span class="target-word">factory</span>. 
        He had always dreamed of seeing how a simple cocoa bean becomes a <span class="target-word">delicious</span> candy bar. 
        When he arrived at the massive <span class="target-word">iron</span> gates, the smell of melted chocolate was <span class="target-word">overwhelming</span> and wonderful.
        <br><br>
        The manager, Mr. Fizzle, led the group inside. The first room was filled with giant <span class="target-word">spinning</span> machines that looked like silver whales. 
        "These machines <span class="target-word">grind</span> the beans into a smooth liquid," Mr. Fizzle explained. 
        Timmy was <span class="target-word">curious</span> about a small red <span class="target-word">lever</span> on the wall. "Don't touch that!" Mr. Fizzle warned, but he was too late.
        <br><br>
        Timmy’s <span class="target-word">sleeve</span> caught the lever, and suddenly, the <span class="target-word">conveyor</span> belt started moving at double <span class="target-word">speed</span>. 
        Hundreds of chocolate bunnies were flying through the air like <span class="target-word">missiles</span>. 
        One worker tried to catch them with a <span class="target-word">bucket</span>, but he slipped on a puddle of <span class="target-word">caramel</span> and landed on his back. 
        It was total <span class="target-word">chaos</span>, but it looked like a very tasty war.
        <br><br>
        Mr. Fizzle quickly pressed a <span class="target-word">button</span> to stop the <span class="target-word">emergency</span>. He wasn't mad; instead, he started to <span class="target-word">chuckle</span>. 
        "Well," he said, "I think we just invented 'Flying Rabbits' candy!" 
        He gave Timmy a special <span class="target-word">sample</span> of the new creation. It was filled with <span class="target-word">popping</span> candy that felt like tiny fireworks on his <span class="target-word">tongue</span>.
        <br><br>
        The <span class="target-word">highlight</span> of the tour was the "Flavor Room," where they used <span class="target-word">science</span> to create smells like "summer rain" and "birthday cake." 
        Timmy left the factory with a giant box of sweets and a huge smile. 
        He learned that sometimes, a small <span class="target-word">accident</span> can lead to a very sweet <span class="target-word">discovery</span>.
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
