(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Story Settings ---
    const storyTitle = "The Dog Who Thought He Was a Cat";
    
    const storyContent = `
        Max was a big, friendly <span class="target-word">dog</span> with a very waggy tail. He lived in a house with a small <span class="target-word">garden</span> and a clever cat named Luna. 
        Because Max spent all his time with Luna, he started to <span class="target-word">believe</span> he was a cat too.
        <br><br>
        Every morning, Max tried to <span class="target-word">jump</span> on the kitchen <span class="target-word">counter</span>. But Max was too heavy! 
        He would crash into the <span class="target-word">dishes</span> with a loud noise. "Woof!" he said, but then he tried to <span class="target-word">purr</span> like Luna. 
        It sounded like a broken <span class="target-word">engine</span>.
        <br><br>
        One sunny afternoon, Max saw a <span class="target-word">squirrel</span> in the tree. Luna climbed the tree <span class="target-word">quickly</span> to catch it. Max tried to do the same. 
        He put his big <span class="target-word">paws</span> on the tree, but he just slid down and landed on his <span class="target-word">back</span>. 
        He looked very <span class="target-word">silly</span>, and the squirrel just looked at him with <span class="target-word">surprise</span>.
        <br><br>
        Later, the owner brought a bowl of <span class="target-word">milk</span> for Luna and a <span class="target-word">bone</span> for Max. 
        Max ignored his bone. He tried to drink the milk from the tiny <span class="target-word">bowl</span>, but his big nose pushed the milk all over the <span class="target-word">floor</span>. 
        He was very <span class="target-word">hungry</span>, but he was also very <span class="target-word">stubborn</span>.
        <br><br>
        Suddenly, a <span class="target-word">stranger</span> walked past the gate. Luna ran away and hid under the <span class="target-word">sofa</span>. 
        But Max didn't hide. He stood up, barked loudly, and <span class="target-word">protected</span> the house. The stranger was scared and ran away.
        <br><br>
        His owner hugged him and said, "You are a <span class="target-word">brave</span> dog, Max!" 
        Max felt very happy. He finally understood that he was not a cat, and that being a dog was actually a lot of <span class="target-word">fun</span>. 
        He went back to the garden and finally chewed his bone.
    `;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; display:block; background:#0d0d0d; color:#e0e0e0; overflow-y:auto; padding:60px 20px; font-family: 'Crimson Text', serif;`;

    container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;700&display=swap');
            
            #stage-content::-webkit-scrollbar { width: 8px; }
            #stage-content::-webkit-scrollbar-thumb { background: #444; border-radius: 4px; }

            .story-box {
                max-width: 900px;
                margin: 0 auto;
                background: #151515;
                padding: 50px;
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.5);
                border: 1px solid #222;
            }

            .title-tag {
                color: #e74c3c;
                text-align: center;
                font-size: 1rem;
                font-weight: bold;
                letter-spacing: 5px;
                text-transform: uppercase;
                margin-bottom: 10px;
            }

            .main-title {
                color: #fff;
                text-align: center;
                font-size: 3.5rem;
                margin-top: 0;
                margin-bottom: 40px;
                font-family: 'Crimson Text', serif;
                font-style: italic;
                border-bottom: 1px solid #333;
                padding-bottom: 20px;
            }

            #textBody {
                line-height: 1.8;
                font-size: 2rem;
                color: #ccc;
                text-align: justify;
            }

            .target-word {
                color: #f1c40f; 
                font-weight: 700;
                cursor: pointer;
                border-bottom: 1px dashed #f1c40f;
                padding: 0 3px;
                transition: 0.2s;
            }

            .target-word:hover {
                background: #f1c40f;
                color: #000;
                border-radius: 4px;
            }

            .moral {
                margin-top: 50px;
                padding-top: 30px;
                border-top: 1px solid #333;
                text-align: center;
                color: #666;
                font-style: italic;
                font-size: 1.5rem;
            }
        </style>
        
        <div class="story-box">
            <div class="title-tag">One Shot Reading</div>
            <h1 class="main-title">${storyTitle}</h1>
            <div id="textBody">
                ${storyContent}
            </div>
            <div class="moral">
                "Be yourself; everyone else is already taken."
            </div>
        </div>
        <div style="height:50px;"></div>
    `;

    // Interaction for finishing
    document.onkeydown = (e) => {
        if (e.keyCode === 32) { // Space
             if(window.triggerVetoDone) window.triggerVetoDone();
        }
    };
})();
