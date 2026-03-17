(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    const storyTitle = "The Knight Who Was Scared of Shadows";
    
    const storyContent = `
        In a kingdom far, far away, there lived Sir Pumpernickel. He was a knight with the shiniest <span class="target-word">armor</span> and the longest sword. 
        However, Sir Pumpernickel had a tiny secret: he was <span class="target-word">terrified</span> of the dark. 
        While other knights fought dragons, he spent his evenings hiding under his <span class="target-word">blanket</span> with a small candle.
        <br><br>
        One afternoon, the King summoned him. "Sir Pumpernickel," the King said, "a giant <span class="target-word">monster</span> has stolen my favorite golden <span class="target-word">spoon</span>. 
        You must go to the Cave of Echoes and get it back!" Sir Pumpernickel’s knees started to <span class="target-word">tremble</span>. 
        He couldn't refuse the King, so he mounted his horse, who was actually a very slow <span class="target-word">donkey</span> named Barnaby.
        <br><br>
        As they entered the forest, the trees looked like long, skinny <span class="target-word">fingers</span>. 
        Every time a leaf fell, Sir Pumpernickel would <span class="target-word">scream</span> like a little bird. 
        "Don't worry," Barnaby the donkey seemed to say with a loud <span class="target-word">bray</span>. They finally reached the cave. 
        It was pitch black inside and smelled like <span class="target-word">rotten</span> cheese.
        <br><br>
        Sir Pumpernickel took a deep <span class="target-word">breath</span> and stepped inside. Suddenly, he saw two glowing red eyes! 
        He was so <span class="target-word">panicked</span> that he tried to run away, but his heavy boots got <span class="target-word">stuck</span> in the mud. 
        He began to <span class="target-word">wrestle</span> with his own shadow, thinking it was a ghost. "Leave me alone, you dark <span class="target-word">beast</span>!" he yelled, while accidentally hitting himself with his own <span class="target-word">shield</span>.
        <br><br>
        The glowing eyes came closer. It wasn't a monster at all! It was a tiny hamster holding a flashlight. 
        The hamster was sitting on a pile of stolen things, including the King's golden spoon. "I just wanted some <span class="target-word">jewelry</span> for my house," the hamster squeaked.
        <br><br>
        Sir Pumpernickel felt very <span class="target-word">embarrassed</span>. He realized that his <span class="target-word">imagination</span> was much scarier than reality. 
        He took the spoon, gave the hamster a piece of <span class="target-word">cheese</span> as a bribe, and returned to the castle.
        <br><br>
        The King was so happy that he gave the knight a <span class="target-word">medal</span>. 
        Sir Pumpernickel learned that being brave doesn't mean you aren't scared; it means you go into the cave anyway—even if you're wearing your <span class="target-word">pajamas</span> under your armor.
    `;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:block; background:#080808; color:#ddd; overflow-y:auto; padding:80px 0; font-family: 'Georgia', serif; scroll-behavior: smooth;`;

    container.innerHTML = `
        <style>
            #stage-content::-webkit-scrollbar { width: 10px; }
            #stage-content::-webkit-scrollbar-track { background: #050505; }
            #stage-content::-webkit-scrollbar-thumb { background: #e74c3c; border-radius: 5px; }

            .story-frame {
                max-width: 950px;
                margin: 0 auto;
                background: #111;
                padding: 60px 80px;
                border-radius: 5px;
                border: 1px solid #222;
                box-shadow: 0 0 100px rgba(0,0,0,0.8);
                position: relative;
            }

            .story-frame::before {
                content: '';
                position: absolute;
                top: 10px; left: 10px; right: 10px; bottom: 10px;
                border: 1px solid #222;
                pointer-events: none;
            }

            .main-title {
                color: #e74c3c;
                text-align: center;
                font-size: 3vw;
                font-weight: 900;
                margin-bottom: 10px;
                text-transform: uppercase;
                font-family: 'Times New Roman', serif;
            }

            .one-shot-label {
                text-align: center;
                color: #555;
                font-size: 1rem;
                letter-spacing: 8px;
                margin-bottom: 40px;
                display: block;
            }

            .text-content {
                line-height: 2;
                font-size: 1.8vw;
                color: #ccc;
                text-align: left;
            }

            .target-word {
                color: #f1c40f; 
                font-weight: bold;
                border-bottom: 2px solid #e74c3c;
                padding: 0 4px;
                transition: 0.3s;
                cursor: help;
                background: rgba(231, 76, 60, 0.05);
            }

            .target-word:hover {
                background: #f1c40f;
                color: #000;
                border-color: #000;
                box-shadow: 0 0 20px rgba(241, 196, 15, 0.4);
            }

            .moral-box {
                margin-top: 50px;
                padding: 30px;
                background: rgba(231, 76, 60, 0.1);
                border-left: 5px solid #e74c3c;
                font-style: italic;
                font-size: 1.5vw;
                color: #eee;
            }
        </style>

        <div class="story-frame">
            <span class="one-shot-label">VETO READING • ONE SHOT</span>
            <h1 class="main-title">${storyTitle}</h1>
            <div class="text-content">
                ${storyContent}
            </div>
            <div class="moral-box">
                "Bravery is not the absence of fear, but the triumph over it."
            </div>
        </div>

        <div style="height: 100px;"></div>
    `;

    // نظام التنقل بالمسافة
    document.onkeydown = (e) => {
        if (e.keyCode === 32) { // Space to complete
            if (window.triggerVetoDone) window.triggerVetoDone();
        }
    };
})();
