(function() {
    const container = document.getElementById('activityFinalContent');
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
                color: #e74c3c; /* لون أحمر رياضي حماسي */
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
