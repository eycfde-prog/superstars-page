(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Story Settings ---
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

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; display:block; background:#0a0f0a; color:#dcdcdc; overflow-y:auto; padding:60px 40px; font-family: 'Crimson Pro', serif; scroll-behavior: smooth;`;

    container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;700&family=Montserrat:wght@800&display=swap');

            .story-wrapper {
                max-width: 950px;
                margin: 0 auto;
                background: rgba(20, 30, 20, 0.6);
                padding: 60px;
                border-radius: 30px;
                border: 1px solid #1a2a1a;
                box-shadow: 0 40px 100px rgba(0,0,0,0.9);
            }

            .category-tag {
                color: #2ecc71;
                text-align: center;
                font-family: 'Montserrat', sans-serif;
                font-size: 0.9rem;
                letter-spacing: 6px;
                text-transform: uppercase;
                margin-bottom: 15px;
                display: block;
            }

            .story-title {
                color: #ffffff;
                text-align: center;
                font-size: 3.8rem;
                font-family: 'Montserrat', sans-serif;
                margin-bottom: 50px;
                line-height: 1.1;
                text-shadow: 0 5px 15px rgba(0,0,0,0.5);
            }

            #textBody {
                line-height: 1.9;
                font-size: 1.9rem;
                color: #c8d6c8;
            }

            .target-word {
                color: #f39c12; 
                font-weight: 700;
                border-bottom: 2px dashed rgba(243, 156, 18, 0.3);
                transition: 0.3s;
                cursor: help;
            }

            .target-word:hover {
                color: #fff;
                background: #f39c12;
                border-radius: 5px;
                padding: 0 8px;
                text-decoration: none;
            }

            /* Hidden Scrollbar */
            #stage-content::-webkit-scrollbar { width: 10px; }
            #stage-content::-webkit-scrollbar-track { background: #0a0f0a; }
            #stage-content::-webkit-scrollbar-thumb { background: #1a2a1a; border-radius: 10px; }
        </style>
        
        <div class="story-wrapper">
            <span class="category-tag">Nature & Adventure</span>
            <h1 class="story-title">${storyTitle}</h1>
            <div id="textBody">
                ${storyContent}
            </div>
            <div style="height:50px;"></div>
        </div>
        <div style="height:100px;"></div>
    `;

})();
