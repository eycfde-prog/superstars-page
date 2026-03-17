(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- إعدادات القصة ---
    const storyTitle = "The Jungle World Cup Final";
    
    const storyContent = `
        The atmosphere in the Great Valley Stadium was <span class="target-word">electric</span>. 
        It was the day of the annual Animal World Cup, and the <span class="target-word">defending</span> champions, the Lions, were facing the <span class="target-word">underdogs</span>, the Gazelles. 
        The <span class="target-word">spectators</span> were roaring, chirping, and howling in <span class="target-word">anticipation</span>. 
        This wasn't just a game; it was a matter of <span class="target-word">prestige</span> and survival.
        <br><br>
        The Lions had a <span class="target-word">reputation</span> for being <span class="target-word">aggressive</span> on the field. 
        Their captain, Leo, was a powerful striker with a <span class="target-word">formidable</span> shot. 
        On the other hand, the Gazelles relied on their <span class="target-word">agility</span> and <span class="target-word">coordinated</span> passing. 
        The <span class="target-word">referee</span>, a very serious Owl, blew the whistle to signal the <span class="target-word">kick-off</span>.
        <br><br>
        In the first half, the Lions dominated the <span class="target-word">possession</span>. 
        They played a <span class="target-word">physical</span> game, trying to <span class="target-word">intimidate</span> their smaller opponents. 
        However, the Gazelles’ goalkeeper, a nimble Monkey, made several <span class="target-word">miraculous</span> saves, jumping from post to post with incredible <span class="target-word">flexibility</span>. 
        The score remained <span class="target-word">goalless</span> until the half-time break.
        <br><br>
        In the second half, the <span class="target-word">strategy</span> changed. 
        The Gazelles began to use their <span class="target-word">superior</span> speed to create <span class="target-word">counter-attacks</span>. 
        Suddenly, in the final minute, the Gazelles’ midfielder, a young Cheetah, dribbled past three defenders. 
        With a <span class="target-word">precise</span> strike, he sent the ball into the top corner of the net. The stadium erupted in <span class="target-word">chaos</span>.
        <br><br>
        The Lions tried to <span class="target-word">retaliate</span>, but it was too late. The Gazelles had pulled off a <span class="target-word">historic</span> upset. 
        The lesson of the day was clear: brute strength is often <span class="target-word">outmatched</span> by clever teamwork and lightning speed. 
        The Gazelles lifted the trophy, proving that even the smallest team can become legends.
    `;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:block; background:#050505; color:#eee; overflow-y:auto; padding:5vh 10vw; font-family: 'Segoe UI', sans-serif; scrollbar-width: thin; scrollbar-color: #c5a059 #111;`;

    container.innerHTML = `
        <style>
            .target-word {
                color: #c5a059; 
                font-weight: 900;
                background: rgba(197, 160, 89, 0.1);
                padding: 2px 8px;
                border-radius: 4px;
                border-bottom: 2px solid #c5a059;
                transition: 0.3s;
                cursor: help;
            }
            .target-word:hover {
                background: #c5a059;
                color: #000;
                box-shadow: 0 0 20px rgba(197,160,89,0.6);
            }
            .story-container {
                max-width: 1100px;
                margin: 0 auto;
                line-height: 1.8;
                font-size: 2.2vw;
                background: rgba(255,255,255,0.02);
                padding: 60px;
                border-radius: 40px;
                border: 1px solid #222;
                box-shadow: 0 40px 80px rgba(0,0,0,0.6);
                animation: vetoSlideUp 0.8s ease-out;
            }
            .title-section {
                text-align: center;
                margin-bottom: 50px;
                border-bottom: 1px solid #333;
                padding-bottom: 30px;
            }
            .label {
                color: #c5a059;
                font-size: 1.2vw;
                font-weight: 900;
                letter-spacing: 8px;
                display: block;
                margin-bottom: 10px;
            }
            .main-title {
                font-size: 4vw;
                color: #fff;
                text-transform: uppercase;
                margin: 0;
                font-weight: 900;
                text-shadow: 0 0 30px rgba(255,255,255,0.1);
            }
            @keyframes vetoSlideUp {
                from { opacity: 0; transform: translateY(50px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .finish-btn {
                margin-top: 50px;
                padding: 20px 60px;
                background: #c5a059;
                color: #000;
                border: none;
                border-radius: 100px;
                font-size: 1.8vw;
                font-weight: 900;
                cursor: pointer;
                transition: 0.3s;
            }
            .finish-btn:hover { transform: scale(1.1); box-shadow: 0 0 30px #c5a059; }
        </style>

        <div class="story-container">
            <div class="title-section">
                <span class="label">ONE SHOT SESSION</span>
                <h1 class="main-title">${storyTitle}</h1>
            </div>
            
            <div id="textBody">
                ${storyContent}
            </div>

            <div style="text-align:center;">
                <button class="finish-btn" onclick="window.triggerVetoDone()">MATCH FINISHED</button>
            </div>
        </div>

        <div style="height: 10vh;"></div> `;

    // دعم مفاتيح التمرير (Space/Arrows)
    document.onkeydown = (e) => {
        if (e.keyCode === 32 || e.keyCode === 40) { 
            container.scrollBy({ top: 200, behavior: 'smooth' });
        } else if (e.keyCode === 38) { 
            container.scrollBy({ top: -200, behavior: 'smooth' });
        }
    };
})();
