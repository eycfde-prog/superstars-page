(function() {
    const container = document.getElementById('stage-content');
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

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:block; background:#050505; color:#eee; overflow-y:auto; padding:5vh 10vw; font-family: 'Segoe UI', sans-serif; scrollbar-width: thin; scrollbar-color: #c5a059 #111;`;

    container.innerHTML = `
        <style>
            .target-word {
                color: #c5a059; 
                font-weight: 900;
                text-decoration: none;
                background: rgba(197, 160, 89, 0.1);
                padding: 2px 8px;
                border-radius: 6px;
                border-bottom: 2px solid #c5a059;
                transition: 0.3s;
            }
            .target-word:hover {
                background: #c5a059;
                color: #000;
                box-shadow: 0 0 15px #c5a059;
            }
            .story-container {
                max-width: 1200px;
                margin: 0 auto;
                line-height: 1.7;
                font-size: 2.2vw;
                background: rgba(255,255,255,0.02);
                padding: 60px;
                border-radius: 30px;
                border: 1px solid #222;
                box-shadow: 0 30px 60px rgba(0,0,0,0.5);
                animation: vetoFadeUp 0.8s ease-out;
            }
            .title-area {
                text-align: center;
                margin-bottom: 60px;
            }
            .one-shot-label {
                color: #c5a059;
                font-weight: 900;
                letter-spacing: 10px;
                font-size: 1.2vw;
                display: block;
                margin-bottom: 10px;
            }
            .title {
                color: #fff;
                font-size: 4vw;
                margin: 0;
                text-transform: uppercase;
                font-weight: 900;
                line-height: 1.1;
            }
            .footer-note {
                margin-top: 60px;
                text-align: center;
                opacity: 0.3;
                font-size: 1vw;
                border-top: 1px solid #333;
                padding-top: 20px;
            }
            @keyframes vetoFadeUp {
                from { opacity: 0; transform: translateY(40px); }
                to { opacity: 1; transform: translateY(0); }
            }
        </style>

        <div class="story-container">
            <div class="title-area">
                <span class="one-shot-label">ONE SHOT SESSION</span>
                <h1 class="title">${storyTitle}</h1>
            </div>
            <div id="textBody">
                ${storyContent}
            </div>
            
            <div style="text-align:center; margin-top:50px;">
                <button onclick="window.triggerVetoDone()" style="padding:15px 40px; background:#c5a059; border:none; border-radius:50px; font-weight:bold; font-size:1.5vw; cursor:pointer;">DONE READING</button>
            </div>

            <div class="footer-note">
                © VETO PROGRAM - ADVANCED READING COMPREHENSION
            </div>
        </div>
    `;

    // دعم مفتاح المسافة للتمرير بسلاسة
    document.onkeydown = (e) => {
        if (e.keyCode === 32 || e.keyCode === 40) { // Space or Down
            container.scrollBy({ top: 150, behavior: 'smooth' });
        } else if (e.keyCode === 38) { // Up
            container.scrollBy({ top: -150, behavior: 'smooth' });
        }
    };
})();
