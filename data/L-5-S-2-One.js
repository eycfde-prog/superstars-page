(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // --- إعدادات القصة ---
    const storyTitle = "A Wild Day at the Theme Park";
    
    const storyContent = `
        It was a hot Saturday, and the Smith family was <span class="target-word">excited</span>. 
        They were standing at the <span class="target-word">entrance</span> of "Wonder World," the biggest theme park in the city. 
        The children, Leo and Mia, had a <span class="target-word">list</span> of all the rides they wanted to try.
        <br><br>
        First, they ran to the giant <span class="target-word">rollercoaster</span>. Leo looked up at the high tracks and felt a bit <span class="target-word">scared</span>. 
        "Don't worry," his dad said, "it’s very <span class="target-word">safe</span>." They buckled their <span class="target-word">seatbelts</span> and the ride started. 
        It moved <span class="target-word">slowly</span> at first, but then it dropped down with a loud <span class="target-word">scream</span> from everyone. 
        Mia loved the <span class="target-word">speed</span>, but Leo kept his eyes closed the whole time.
        <br><br>
        After the ride, they were very <span class="target-word">thirsty</span>. They bought some cold <span class="target-word">lemonade</span> and a large bag of salty <span class="target-word">popcorn</span>. 
        While they were eating, they saw a funny <span class="target-word">clown</span> walking on long wooden legs. 
        He was making <span class="target-word">balloons</span> in the shape of different <span class="target-word">animals</span>. He gave Mia a red dog and Leo a blue <span class="target-word">sword</span>.
        <br><br>
        In the afternoon, they went to the "Haunted House." It was very <span class="target-word">dark</span> inside, and they heard <span class="target-word">strange</span> noises. 
        Something soft touched Leo’s <span class="target-word">shoulder</span>, and he jumped into his father’s arms. 
        It was just a <span class="target-word">curtain</span>, but it was very <span class="target-word">spooky</span>.
        <br><br>
        Before leaving, they went to the <span class="target-word">gift shop</span>. Mia chose a <span class="target-word">sparkly</span> hat, and Leo bought a small <span class="target-word">poster</span> of the park. 
        They were very tired but also very happy. On the way home in the car, both children fell <span class="target-word">asleep</span> immediately, dreaming about the flying tea cups and the giant wheel.
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
