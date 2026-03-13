(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // --- إعدادات القصة ---
    const storyTitle = "The Professor’s Time Travel Trouble";
    
    const storyContent = `
        Professor Barnaby was a brilliant scientist, but he was also incredibly <span class="target-word">clumsy</span>. 
        After years of intense <span class="target-word">research</span>, he finally invented a device that could transport a human through <span class="target-word">centuries</span>. 
        It looked exactly like a television remote, but instead of changing channels, it was a <span class="target-word">prototype</span> for time travel.
        <br><br>
        One evening, while trying to change the volume on his actual TV, he accidentally pressed the "Ancient Egypt" button. 
        In a flash of blue light, the Professor vanished. He found himself standing in the middle of a <span class="target-word">construction</span> site—he was at the base of the Great Pyramid.
        <br><br>
        The Professor was <span class="target-word">fascinated</span> by the workers, but he had a major problem. 
        He was wearing a neon pink <span class="target-word">bathrobe</span> and holding a half-eaten sandwich. 
        The Egyptian guards looked at him with great <span class="target-word">suspicion</span>. They thought he was a <span class="target-word">spy</span> from a rival kingdom.
        <br><br>
        "Wait!" the Professor shouted, waving his remote. "I am a <span class="target-word">genius</span> from the future!" 
        The guards didn't understand English, but they did understand that the Professor looked <span class="target-word">ridiculous</span>. 
        They began to <span class="target-word">chase</span> him around the Sphinx.
        <br><br>
        As he ran, Barnaby desperately pressed buttons on his remote. Suddenly, the ground began to <span class="target-word">vibrate</span>. 
        Instead of going home, he was transported to the year 3000. The air was filled with <span class="target-word">holograms</span>, and robots were walking dogs that looked like <span class="target-word">toasters</span>.
        <br><br>
        He tried to ask a robot for <span class="target-word">assistance</span>, but the robot just handed him a digital <span class="target-word">brochure</span> about "Oxygen Subscriptions." 
        The Professor felt a sense of <span class="target-word">inevitable</span> doom. He realized his remote was <span class="target-word">malfunctioning</span> because he had spilled coffee on it earlier that morning.
        <br><br>
        In a final, <span class="target-word">desperate</span> attempt, he whacked the remote against his knee. The device sparked, and he was sucked into a <span class="target-word">vortex</span>. 
        He landed with a loud thud back in his living room, right on top of his <span class="target-word">pet</span> cat.
        <br><br>
        The Professor looked at the remote and then at his cat. He decided that the past was too dusty and the future was too expensive. 
        The <span class="target-word">conclusion</span> he reached was simple: the present moment is the only place where you can find a decent cup of coffee without being chased by guards or robots.
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
