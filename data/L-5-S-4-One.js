(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Story Settings ---
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

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; display:block; background:#0d0d0f; color:#d1d1d1; overflow-y:auto; padding:60px 40px; font-family: 'Inter', sans-serif;`;

    container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;700&family=Inter:wght@400;800&display=swap');

            .mystery-wrapper {
                max-width: 900px;
                margin: 0 auto;
                background: #141418;
                padding: 50px 70px;
                border-radius: 20px;
                border: 1px solid #222;
                box-shadow: 0 30px 80px rgba(0,0,0,0.8);
            }

            .label {
                color: #e74c3c;
                text-align: center;
                font-size: 1rem;
                font-weight: 800;
                letter-spacing: 5px;
                text-transform: uppercase;
                margin-bottom: 10px;
                display: block;
            }

            .story-title {
                color: #ffffff;
                text-align: center;
                font-size: 3.5rem;
                font-family: 'Crimson Pro', serif;
                margin-bottom: 45px;
                font-weight: 700;
                letter-spacing: -1px;
            }

            #textBody {
                line-height: 1.8;
                font-size: 1.85rem;
                color: #b0b0b0;
                font-family: 'Crimson Pro', serif;
            }

            .target-word {
                color: #f1c40f; 
                font-weight: 700;
                padding: 0 4px;
                border-bottom: 1px solid rgba(241, 196, 15, 0.4);
                transition: all 0.3s ease;
            }

            .target-word:hover {
                background: #f1c40f;
                color: #000;
                border-radius: 4px;
            }

            #textBody p { margin-bottom: 25px; }
            
            /* Custom Scrollbar */
            #stage-content::-webkit-scrollbar { width: 8px; }
            #stage-content::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        </style>
        
        <div class="mystery-wrapper">
            <span class="label">One Shot Reader</span>
            <h1 class="story-title">${storyTitle}</h1>
            <div id="textBody">
                ${storyContent}
            </div>
        </div>
        <div style="height:80px;"></div>
    `;

})();
