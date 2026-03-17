(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    const storyTitle = "The Professor and the Purple Soap";
    
    const storyContent = `
        Professor Pumpernickel was a very <span class="target-word">smart</span> man, but he was also very <span class="target-word">messy</span>. 
        He worked in a small <span class="target-word">laboratory</span> in his basement. 
        He wanted to invent a new kind of <span class="target-word">soap</span> that could clean a whole house in one <span class="target-word">minute</span>.
        <br><br>
        One Saturday, he started his big <span class="target-word">experiment</span>. He mixed some blue <span class="target-word">liquid</span> with a yellow <span class="target-word">powder</span>. 
        Then, he added a secret <span class="target-word">ingredient</span> from a small green bottle. 
        Suddenly, the <span class="target-word">mixture</span> started to <span class="target-word">bubble</span> and make a strange "pop" sound. 
        The color changed from green to a very bright purple.
        <br><br>
        "Perfect!" the Professor shouted. He poured the liquid into a <span class="target-word">bucket</span> of water. 
        But then, something <span class="target-word">scary</span> happened. The soap didn't just make bubbles; it started to <span class="target-word">grow</span>! 
        In seconds, the purple bubbles were everywhere. They covered the <span class="target-word">floor</span>, the <span class="target-word">walls</span>, and even the Professor's <span class="target-word">glasses</span>.
        <br><br>
        The bubbles were very <span class="target-word">sticky</span>. When the Professor tried to walk, his <span class="target-word">shoes</span> got stuck to the ground. 
        "Help!" he cried, but his voice sounded <span class="target-word">funny</span> because he had bubbles in his <span class="target-word">mouth</span>. 
        His pet <span class="target-word">cat</span>, Barnaby, saw the purple bubbles and thought they were <span class="target-word">toys</span>. 
        He jumped into the foam and turned into a purple <span class="target-word">ball</span> of fur.
        <br><br>
        The Professor had to use a big <span class="target-word">hose</span> to wash everything away with <span class="target-word">water</span>. 
        It took him five hours to clean the basement. He was very <span class="target-word">tired</span> and his skin was a little bit purple. 
        He learned a big <span class="target-word">lesson</span>: sometimes, it is better to clean the house with a simple <span class="target-word">broom</span> and some water.
    `;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; display:block; background:#0f0c29; color:#eee; overflow-y:auto; padding:60px 20px; font-family: 'Georgia', serif; position:relative;`;

    container.innerHTML = `
        <style>
            @keyframes float {
                0% { transform: translateY(0) translateX(0); opacity: 0.8; }
                50% { transform: translateY(-100px) translateX(20px); opacity: 0.4; }
                100% { transform: translateY(-200px) translateX(-20px); opacity: 0; }
            }
            .bubble {
                position: absolute; background: rgba(142, 68, 173, 0.3);
                border-radius: 50%; pointer-events: none; animation: float 4s infinite linear;
            }
            .target-word {
                color: #e0b0ff; font-weight: bold;
                border-bottom: 2px dashed #8e44ad;
                background: rgba(142, 68, 173, 0.1);
                padding: 0 4px; border-radius: 4px;
                transition: 0.3s; cursor: pointer;
            }
            .target-word:hover { background: #8e44ad; color: #fff; }
            .story-card {
                max-width: 900px; margin: 0 auto; background: rgba(255, 255, 255, 0.03);
                padding: 50px; border-radius: 30px; border: 1px solid rgba(142, 68, 173, 0.2);
                position: relative; z-index: 2; backdrop-filter: blur(5px);
            }
            .title-header h1 {
                font-size: 3.2rem; color: #8e44ad; text-align: center;
                text-transform: uppercase; margin-bottom: 40px; font-weight: 900;
                text-shadow: 0 0 20px rgba(142, 68, 173, 0.5);
            }
            .story-body { line-height: 2; font-size: 1.85rem; text-align: left; }
        </style>
        
        <div id="bubbles-container"></div>
        <div class="story-card">
            <div class="title-header">
                <h1>ONE SHOT: ${storyTitle}</h1>
            </div>
            <div class="story-body">
                ${storyContent}
            </div>
        </div>
    `;

    // توليد فقاعات عشوائية
    const bubbleBox = document.getElementById('bubbles-container');
    for (let i = 0; i < 15; i++) {
        const b = document.createElement('div');
        b.className = 'bubble';
        const size = Math.random() * 60 + 20 + 'px';
        b.style.width = size; b.style.height = size;
        b.style.left = Math.random() * 100 + '%';
        b.style.bottom = '-50px';
        b.style.animationDelay = Math.random() * 4 + 's';
        bubbleBox.appendChild(b);
    }
})();
