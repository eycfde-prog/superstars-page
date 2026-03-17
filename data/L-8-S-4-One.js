(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    const storyTitle = "The Mystery of the Iron Chamber";
    
    const storyContent = `
        Arthur was an <span class="target-word">ambitious</span> archaeologist who spent his entire life studying ancient <span class="target-word">manuscripts</span>. 
        He was obsessed with the <span class="target-word">legend</span> of the "Iron Chamber," a hidden vault said to contain the lost <span class="target-word">treasures</span> of a forgotten king. 
        After years of <span class="target-word">frustrating</span> dead ends, he finally discovered a dusty <span class="target-word">parchment</span> hidden behind a brick wall in a London basement.
        <br><br>
        The map led him to a remote <span class="target-word">valley</span> where the ground was covered in thick, <span class="target-word">thorny</span> bushes. 
        Following the <span class="target-word">coordinates</span> on the map, Arthur began to <span class="target-word">excavate</span> near an old, dried-up well. 
        After hours of intense <span class="target-word">labor</span>, his shovel hit something solid. It wasn't a rock; it was a heavy, <span class="target-word">rusted</span> metal hatch.
        <br><br>
        With a loud <span class="target-word">creak</span>, the hatch opened, revealing a dark <span class="target-word">tunnel</span> that smelled of damp earth and ancient dust. 
        Arthur descended into the darkness, his flashlight cutting through the gloom. 
        As he reached the bottom, he found himself in a <span class="target-word">magnificent</span> room filled with golden statues and sparkling <span class="target-word">jewels</span>.
        <br><br>
        However, in the center of the room sat a <span class="target-word">mysterious</span> stone box with a riddle carved into its lid. 
        Arthur realized the treasure wasn't just gold; it was a collection of <span class="target-word">original</span> records that could change history.
        <br><br>
        Suddenly, the walls began to <span class="target-word">shudder</span>. Arthur grabbed a small <span class="target-word">artifact</span> and climbed out just before the tunnel <span class="target-word">collapsed</span>. 
        He stood in the sunlight, exhausted but <span class="target-word">victorious</span>. 
        He knew that the gold stayed underground, but the knowledge he saved was the greatest <span class="target-word">fortune</span> of all.
    `;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; display:block; background:#0d0d0d; color:#e0e0e0; overflow-y:auto; padding:60px 40px; font-family: 'Inter', 'Georgia', serif; scroll-behavior: smooth;`;

    container.innerHTML = `
        <style>
            @keyframes treasureGlow {
                0% { box-shadow: 0 0 5px rgba(241, 196, 15, 0.2); }
                50% { box-shadow: 0 0 15px rgba(241, 196, 15, 0.5); }
                100% { box-shadow: 0 0 5px rgba(241, 196, 15, 0.2); }
            }
            .story-wrapper {
                max-width: 950px;
                margin: 0 auto;
                background: linear-gradient(145deg, #151515, #0a0a0a);
                padding: 50px;
                border-radius: 25px;
                border: 1px solid #2a2a2a;
                box-shadow: 0 30px 60px rgba(0,0,0,0.5);
            }
            .target-word {
                color: #f1c40f; 
                font-weight: 800;
                background: rgba(241, 196, 15, 0.08);
                padding: 0px 8px;
                border-radius: 5px;
                border-bottom: 2px solid #f1c40f;
                transition: 0.3s;
                cursor: pointer;
                display: inline-block;
            }
            .target-word:hover {
                background: #f1c40f;
                color: #000;
                transform: translateY(-2px);
                animation: treasureGlow 1s infinite;
            }
            .story-header {
                text-align: center;
                margin-bottom: 50px;
                border-bottom: 1px solid #333;
                padding-bottom: 30px;
            }
            .story-header h1 {
                font-size: 3.8rem;
                margin: 0;
                color: #e67e22;
                text-transform: uppercase;
                letter-spacing: 3px;
                font-weight: 900;
                text-shadow: 2px 2px 10px rgba(0,0,0,0.5);
            }
            .meta-tag {
                color: #888;
                font-size: 1rem;
                letter-spacing: 5px;
                display: block;
                margin-bottom: 10px;
            }
            .story-text {
                line-height: 2.2;
                font-size: 1.85rem;
                text-align: justify;
                color: #d1d1d1;
            }
            #stage-content::-webkit-scrollbar { width: 8px; }
            #stage-content::-webkit-scrollbar-track { background: #0d0d0d; }
            #stage-content::-webkit-scrollbar-thumb { background: #e67e22; border-radius: 10px; }
        </style>
        
        <div class="story-wrapper">
            <div class="story-header">
                <span class="meta-tag">LEVEL 8 • ADVENTURE ONE SHOT</span>
                <h1>${storyTitle}</h1>
            </div>
            <div class="story-text">
                ${storyContent}
            </div>
        </div>
    `;

})();
