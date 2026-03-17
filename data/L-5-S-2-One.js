(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Story Settings ---
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

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; display:block; background:#0a0a0c; color:#e0e0e0; overflow-y:auto; padding:60px 30px; font-family: 'Inter', sans-serif;`;

    container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Inter:wght@400;600&display=swap');

            .story-wrapper {
                max-width: 950px;
                margin: 0 auto;
                background: #121215;
                padding: 60px;
                border-radius: 30px;
                box-shadow: 0 40px 100px rgba(0,0,0,0.6);
                border: 1px solid #1f1f23;
            }

            .one-shot-label {
                color: #e74c3c;
                text-align: center;
                font-size: 1.1rem;
                font-weight: 800;
                letter-spacing: 6px;
                text-transform: uppercase;
                margin-bottom: 15px;
                display: block;
            }

            .story-title {
                color: #ffffff;
                text-align: center;
                font-size: 3.8rem;
                font-family: 'Playfair Display', serif;
                margin-bottom: 50px;
                font-style: italic;
                line-height: 1.2;
            }

            #textBody {
                line-height: 1.9;
                font-size: 1.9rem;
                color: #b0b0b5;
                text-align: justify;
                word-spacing: 2px;
            }

            .target-word {
                color: #f1c40f; 
                font-weight: 700;
                border-bottom: 2px solid rgba(241, 196, 15, 0.3);
                cursor: help;
                transition: all 0.3s ease;
                padding: 0 2px;
            }

            .target-word:hover {
                color: #ffffff;
                background: #f1c40f;
                border-bottom-color: transparent;
                border-radius: 6px;
                box-shadow: 0 0 15px rgba(241, 196, 15, 0.4);
            }

            /* Scrollbar Styling */
            #stage-content::-webkit-scrollbar { width: 10px; }
            #stage-content::-webkit-scrollbar-track { background: #0a0a0c; }
            #stage-content::-webkit-scrollbar-thumb { background: #333; border-radius: 5px; }
            #stage-content::-webkit-scrollbar-thumb:hover { background: #444; }
        </style>
        
        <div class="story-wrapper">
            <span class="one-shot-label">One Shot Session</span>
            <h1 class="story-title">${storyTitle}</h1>
            <div id="textBody">
                ${storyContent}
            </div>
        </div>
        <div style="height:100px;"></div>
    `;

    // Space to finish or next step
    document.onkeydown = (e) => {
        if (e.keyCode === 32) { 
             if(window.triggerVetoDone) window.triggerVetoDone();
        }
    };
})();
