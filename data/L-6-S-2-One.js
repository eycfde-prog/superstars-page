(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // --- إعدادات القصة ---
    const storyTitle = "The Camping Trip and the Hungry Guest";
    
    const storyContent = `
        Last summer, the Miller family decided to go <span class="target-word">camping</span> in the Great Pine Forest. 
        They packed their <span class="target-word">tent</span>, some sleeping bags, and a large <span class="target-word">cooler</span> full of food. 
        When they arrived, the air was <span class="target-word">fresh</span> and the birds were singing.
        <br><br>
        "Let's build a <span class="target-word">fire</span> first!" said Ben. His sister, Lily, helped him gather dry <span class="target-word">branches</span> from the ground. 
        Their father started the flames, and soon they were <span class="target-word">roasting</span> marshmallows. 
        It was very <span class="target-word">peaceful</span> until the sun went down.
        <br><br>
        When it became <span class="target-word">dark</span>, they heard a strange <span class="target-word">rustling</span> noise coming from behind the bushes. 
        "Is it a wolf?" Lily asked, feeling <span class="target-word">nervous</span>. Their father grabbed a large <span class="target-word">stick</span> and turned on the bright <span class="target-word">lantern</span>. 
        They looked around, but they didn't see anything.
        <br><br>
        Suddenly, they realized the cooler was <span class="target-word">empty</span>! All their delicious <span class="target-word">sandwiches</span> and fruit were gone. 
        "Look at those <span class="target-word">footprints</span>," Ben whispered. The tracks led toward a tall <span class="target-word">pine</span> tree. 
        They followed the path and saw a fat raccoon sitting on a branch. He was holding a <span class="target-word">wrapped</span> chocolate bar and looked very <span class="target-word">satisfied</span>.
        <br><br>
        The family couldn't be <span class="target-word">angry</span> because the raccoon looked so funny with chocolate on its face. 
        They shared some <span class="target-word">crackers</span> instead and spent the night telling <span class="target-word">ghost</span> stories under the stars. 
        They learned a valuable <span class="target-word">lesson</span>: always lock your food in the car when you go to the <span class="target-word">wilderness</span>!
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
