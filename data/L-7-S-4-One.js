(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // --- إعدادات القصة ---
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
                color: #2ecc71; /* لون أخضر مناسب للغابة */
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
