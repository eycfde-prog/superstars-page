(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // --- إعدادات القصة ---
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
