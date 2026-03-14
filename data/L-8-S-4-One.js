(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // --- إعدادات القصة ---
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
                color: #e67e22; /* لون برونزي يناسب أجواء الآثار والحفر */
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
