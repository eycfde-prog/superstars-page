(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    const storyTitle = "Lost in the Green Maze";
    
    const storyContent = `
        Last month, Maya and her brother Sam went on an <span class="target-word">adventure</span> to the Amazon Rainforest. 
        They were accompanied by a <span class="target-word">guide</span> named Marco, who knew every tree and animal. 
        The forest was very <span class="target-word">humid</span>, and the air felt thick and warm. 
        Giant <span class="target-word">ferns</span> covered the ground, and the trees were so thick they blocked the <span class="target-word">sunlight</span>.
        <br><br>
        As they walked, they heard a loud <span class="target-word">screech</span>. Looking up, they saw a <span class="target-word">bright</span> parrot with red and yellow feathers. 
        "This place is <span class="target-word">magical</span>!" Maya whispered. Suddenly, the sky turned <span class="target-word">grey</span>, and a heavy <span class="target-word">rain</span> began to fall. 
        In the rainforest, it doesn't just rain; it pours like a <span class="target-word">waterfall</span>.
        <br><br>
        They looked for a place to stay dry and found a small <span class="target-word">cave</span> behind some large rocks. 
        Inside, they found some <span class="target-word">ancient</span> drawings on the walls. 
        Sam took out his <span class="target-word">camera</span> to take a photo, but the <span class="target-word">flash</span> scared a colony of bats. 
        They flew over their heads, making a <span class="target-word">whistling</span> sound.
        <br><br>
        "Look at the ground!" Marco warned. A long, shiny <span class="target-word">snake</span> was crawling slowly near their <span class="target-word">boots</span>. 
        It wasn't dangerous, but it was very <span class="target-word">impressive</span>. Marco told them to stay <span class="target-word">still</span> until the snake moved away. 
        Maya felt her heart <span class="target-word">pounding</span> with excitement and a little bit of fear.
        <br><br>
        When the rain stopped, they followed a narrow <span class="target-word">path</span> back to their camp. 
        They had to cross a wooden <span class="target-word">bridge</span> over a muddy river. Below them, they saw a small <span class="target-word">crocodile</span> resting in the sun. 
        It was a <span class="target-word">tiring</span> day, but Maya and Sam felt like real <span class="target-word">explorers</span>. 
        They learned that the forest is full of <span class="target-word">secrets</span> if you know where to look.
    `;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; display:block; background:#0a0f0b; color:#d1d5db; overflow-y:auto; padding:60px 40px; font-family: 'Georgia', serif; scroll-behavior: smooth;`;

    container.innerHTML = `
        <style>
            @keyframes leafSway {
                0%, 100% { transform: rotate(0deg); }
                50% { transform: rotate(1deg); }
            }
            .adventure-wrapper {
                max-width: 950px;
                margin: 0 auto;
                background: rgba(46, 204, 113, 0.05);
                padding: 50px;
                border-radius: 40px;
                border: 1px solid rgba(46, 204, 113, 0.2);
                box-shadow: 0 30px 60px rgba(0,0,0,0.6);
                animation: leafSway 6s infinite ease-in-out;
            }
            .target-word {
                color: #f1c40f; 
                font-weight: bold;
                text-decoration: none;
                border-bottom: 2px solid rgba(241, 196, 15, 0.3);
                padding: 2px 4px;
                border-radius: 4px;
                transition: 0.3s;
            }
            .target-word:hover {
                background: #f1c40f;
                color: #052e16;
                box-shadow: 0 0 15px #f1c40f;
            }
            .story-text {
                line-height: 1.9;
                font-size: 2rem;
                text-align: justify;
                color: #e2e8f0;
            }
            .header-box {
                text-align: center;
                margin-bottom: 60px;
                border-bottom: 2px solid rgba(46, 204, 113, 0.1);
                padding-bottom: 30px;
            }
            .header-box span {
                color: #2ecc71;
                font-family: 'Inter', sans-serif;
                font-weight: 800;
                letter-spacing: 10px;
                text-transform: uppercase;
                font-size: 1.1rem;
                display: block;
                margin-bottom: 15px;
            }
            .header-box h1 {
                font-size: 4rem;
                margin: 0;
                color: #fff;
                font-family: 'Inter', sans-serif;
                font-weight: 900;
            }
            #stage-content::-webkit-scrollbar { width: 8px; }
            #stage-content::-webkit-scrollbar-track { background: #0a0f0b; }
            #stage-content::-webkit-scrollbar-thumb { background: #14532d; border-radius: 10px; }
        </style>
        
        <div class="adventure-wrapper">
            <div class="header-box">
                <span>Mission: Reading</span>
                <h1>${storyTitle}</h1>
            </div>
            <div class="story-text">
                ${storyContent}
            </div>
        </div>
    `;

})();
