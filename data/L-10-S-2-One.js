(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // --- إعدادات القصة ---
    const storyTitle = "The Girl Who Wanted to Touch the Clouds";
    
    const storyContent = `
        Climbing Mount Misty was the ultimate <span class="target-word">challenge</span> for anyone in the village of Stonebridge. 
        Many had tried, but few reached the <span class="target-word">summit</span> because the path was steep and full of loose <span class="target-word">gravel</span>. 
        Sara, a young girl with a lot of <span class="target-word">determination</span>, decided that today was the day she would finally see the world from the top.
        <br><br>
        She started her <span class="target-word">climb</span> early in the morning, carrying a heavy <span class="target-word">backpack</span> filled with water, bread, and a <span class="target-word">compass</span>. 
        The first part of the journey was easy, through a forest of tall <span class="target-word">pines</span>. 
        However, as she went higher, the air became <span class="target-word">chilled</span>, and a thick <span class="target-word">mist</span> began to cover the trail. 
        Sara felt her muscles <span class="target-word">aching</span>, but she refused to stop.
        <br><br>
        Suddenly, she reached a narrow <span class="target-word">ledge</span>. Below her was a deep <span class="target-word">canyon</span>, and the wind was blowing with great <span class="target-word">force</span>. 
        Sara took a deep breath to <span class="target-word">steady</span> her nerves. 
        She remembered her grandfather’s <span class="target-word">advice</span>: "Don't look down; look at where you want to step." 
        She moved <span class="target-word">cautiously</span>, holding onto the cold rocks until she was safe.
        <br><br>
        Near the top, she encountered a small <span class="target-word">stream</span> blocking her way. 
        The water was <span class="target-word">crystal</span> clear and freezing cold. 
        She had to jump across a series of <span class="target-word">slippery</span> stones. 
        She slipped once, getting her <span class="target-word">boots</span> wet, but she kept her <span class="target-word">balance</span> and reached the other side.
        <br><br>
        Finally, the mist cleared, and there it was—the top! The view was <span class="target-word">spectacular</span>. 
        She could see the entire valley, the tiny houses, and the winding river. 
        She felt a great sense of <span class="target-word">achievement</span>. 
        She realized that the hardest paths often lead to the most <span class="target-word">rewarding</span> views. 
        She sat on a rock, ate her bread, and felt like she was truly touching the clouds.
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
                color: #3498db; /* لون سماوي يعبر عن السحاب والقمة */
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
