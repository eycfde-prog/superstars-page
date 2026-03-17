(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Story Data ---
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

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:block; background:#0a0a0c; color:#ddd; overflow-y:auto; padding:60px 0; font-family: 'Segoe UI', Tahoma, serif; scroll-behavior: smooth;`;

    container.innerHTML = `
        <style>
            #stage-content::-webkit-scrollbar { width: 8px; }
            #stage-content::-webkit-scrollbar-track { background: #050505; }
            #stage-content::-webkit-scrollbar-thumb { background: #3498db; border-radius: 10px; }

            .story-wrapper {
                max-width: 900px;
                margin: 0 auto;
                background: linear-gradient(180deg, #111 0%, #0a0a0a 100%);
                padding: 70px;
                border: 1px solid #222;
                border-radius: 20px;
                box-shadow: 0 40px 100px rgba(0,0,0,0.9);
                position: relative;
            }

            .header-info {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #333;
                padding-bottom: 20px;
                margin-bottom: 40px;
            }

            .label { color: #3498db; font-weight: 900; letter-spacing: 3px; font-size: 0.9rem; }
            .version { color: #444; font-size: 0.8rem; }

            .main-title {
                color: #fff;
                font-size: 3vw;
                font-weight: 900;
                margin-bottom: 40px;
                line-height: 1.2;
                text-align: left;
                background: linear-gradient(to right, #fff, #3498db);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            .text-body {
                line-height: 2;
                font-size: 1.6vw;
                color: #bbb;
                font-family: 'Georgia', serif;
            }

            .target-word {
                color: #f1c40f; 
                font-weight: bold;
                border-bottom: 1px dashed #f1c40f;
                transition: 0.3s ease;
                cursor: pointer;
                position: relative;
            }

            .target-word:hover {
                color: #fff;
                background: #f1c40f;
                padding: 0 5px;
                border-radius: 4px;
                box-shadow: 0 0 15px rgba(241, 196, 15, 0.5);
            }

            .end-note {
                margin-top: 60px;
                padding: 30px;
                background: #111;
                border-radius: 10px;
                border: 1px solid #222;
                font-size: 1.1vw;
                color: #555;
                text-align: center;
            }
        </style>

        <div class="story-wrapper">
            <div class="header-info">
                <span class="label">VETO ONE-SHOT: LVL 3</span>
                <span class="version">STORY_ID: B-772</span>
            </div>

            <h1 class="main-title">${storyTitle}</h1>
            
            <div class="text-body">
                ${storyContent}
            </div>

            <div class="end-note">
                ⚡ Vocabulary Training: Leveling up to intermediate concepts.
            </div>
        </div>
        <div style="height:100px;"></div>
    `;

    document.onkeydown = (e) => {
        if (e.keyCode === 32) { // Space
            if (window.triggerVetoDone) window.triggerVetoDone();
        }
    };
})();
