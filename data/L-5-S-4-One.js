(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // --- إعدادات القصة ---
    const storyTitle = "The Missing Dinosaur Bone";
    
    const storyContent = `
        Mr. Higgins was a <span class="target-word">security</span> guard at the City Museum. He was a very <span class="target-word">kind</span> man, but he was also very <span class="target-word">sleepy</span>. 
        Every night, his job was to <span class="target-word">watch</span> the expensive paintings and the old <span class="target-word">statues</span>.
        <br><br>
        One Tuesday night, Mr. Higgins sat on his <span class="target-word">chair</span> and closed his eyes for a minute. 
        Suddenly, he heard a <span class="target-word">noise</span>. "Clatter! Clatter!" He woke up and grabbed his <span class="target-word">flashlight</span>. 
        He ran to the Big Room, where the giant <span class="target-word">dinosaur</span> stood. Mr. Higgins gasped. 
        One long <span class="target-word">bone</span> from the dinosaur's leg was <span class="target-word">missing</span>!
        <br><br>
        "Oh no!" he shouted. "A <span class="target-word">thief</span> was here!" He looked at the <span class="target-word">floor</span> and saw some white <span class="target-word">dust</span>. 
        He followed the dust past the Egyptian <span class="target-word">mummy</span> and the gold <span class="target-word">crown</span>. 
        The dust led him to a small <span class="target-word">window</span> in the back of the museum.
        <br><br>
        Mr. Higgins looked outside. He didn't see a man in a black <span class="target-word">mask</span>. 
        Instead, he saw a very small <span class="target-word">puppy</span>. The puppy was <span class="target-word">happy</span> and was chewing on the giant bone in the <span class="target-word">grass</span>. 
        The puppy thought he had found the biggest <span class="target-word">prize</span> in the world!
        <br><br>
        Mr. Higgins started to laugh. He wasn't <span class="target-word">angry</span> anymore. 
        He took the bone back and gave the puppy a small <span class="target-word">biscuit</span> instead. 
        The next day, the museum put a <span class="target-word">fence</span> around the dinosaur so no more "thieves" could enter. 
        Mr. Higgins stayed <span class="target-word">awake</span> for the rest of the week!
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
