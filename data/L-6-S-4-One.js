(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Story Settings ---
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

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; display:block; background:#1a0f08; color:#f3e5ab; overflow-y:auto; padding:60px 40px; font-family: 'Georgia', serif; scroll-behavior: smooth;`;

    container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');

            .story-card {
                max-width: 900px;
                margin: 0 auto;
                background: rgba(44, 30, 20, 0.8);
                padding: 50px;
                border: 4px solid #d4af37;
                border-radius: 15px;
                box-shadow: 0 0 50px rgba(0,0,0,0.8);
                position: relative;
            }

            .story-card::before {
                content: "GOLDEN TICKET";
                position: absolute;
                top: -20px; left: 50%;
                transform: translateX(-50%);
                background: #d4af37;
                color: #2c1e14;
                padding: 5px 20px;
                font-weight: bold;
                font-family: sans-serif;
                border-radius: 5px;
                letter-spacing: 3px;
            }

            .story-title {
                color: #d4af37;
                text-align: center;
                font-size: 3.5rem;
                font-family: 'Playfair Display', serif;
                margin-bottom: 40px;
                text-transform: uppercase;
                line-height: 1.2;
            }

            #textBody {
                line-height: 2;
                font-size: 1.85rem;
                color: #f3e5ab;
                text-align: justify;
            }

            .target-word {
                color: #fff; 
                font-weight: bold;
                background: linear-gradient(transparent 70%, #d4af37 30%);
                padding: 0 4px;
                transition: 0.3s;
                cursor: pointer;
            }

            .target-word:hover {
                background: #d4af37;
                color: #1a0f08;
                border-radius: 4px;
            }

            /* Custom Scrollbar for the chocolate factory */
            #stage-content::-webkit-scrollbar { width: 12px; }
            #stage-content::-webkit-scrollbar-track { background: #1a0f08; }
            #stage-content::-webkit-scrollbar-thumb { background: #d4af37; border-radius: 10px; border: 3px solid #1a0f08; }
        </style>
        
        <div class="story-card">
            <h1 class="story-title">${storyTitle}</h1>
            <div id="textBody">
                ${storyContent}
            </div>
        </div>
        <div style="height:100px;"></div>
    `;

})();
