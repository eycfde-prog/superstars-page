(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // كلمات يوم الملاهي المثير
    const words = [
        "excited", "entrance", "list", "rollercoaster", "scared", 
        "safe", "seatbelts", "slowly", "scream", "speed", 
        "thirsty", "lemonade", "popcorn", "clown", "balloons", 
        "animals", "sword", "dark", "strange", "shoulder", 
        "curtain", "spooky", "gift shop", "sparkly", "poster", "asleep"
    ];

    let remainingWords = [...words];
    let currentTargetId = null;

    const storyTitle = "A Wild Day at the Theme Park";
    
    let storyContent = `
        It was a hot Saturday, and the Smith family was <span class="word-gap" data-word="excited">?</span>. 
        They were standing at the <span class="word-gap" data-word="entrance">?</span> of "Wonder World," the biggest theme park in the city. 
        The children, Leo and Mia, had a <span class="word-gap" data-word="list">?</span> of all the rides they wanted to try.
        <br><br>
        First, they ran to the giant <span class="word-gap" data-word="rollercoaster">?</span>. Leo looked up at the high tracks and felt a bit <span class="word-gap" data-word="scared">?</span>. 
        "Don't worry," his dad said, "it’s very <span class="word-gap" data-word="safe">?</span>." They buckled their <span class="word-gap" data-word="seatbelts">?</span> and the ride started. 
        It moved <span class="word-gap" data-word="slowly">?</span> at first, but then it dropped down with a loud <span class="word-gap" data-word="scream">?</span> from everyone. 
        Mia loved the <span class="word-gap" data-word="speed">?</span>, but Leo kept his eyes closed the whole time.
        <br><br>
        After the ride, they were very <span class="word-gap" data-word="thirsty">?</span>. They bought some cold <span class="word-gap" data-word="lemonade">?</span> and a large bag of salty <span class="word-gap" data-word="popcorn">?</span>. 
        While they were eating, they saw a funny <span class="word-gap" data-word="clown">?</span> walking on long wooden legs. 
        He was making <span class="word-gap" data-word="balloons">?</span> in the shape of different <span class="word-gap" data-word="animals">?</span>. He gave Mia a red dog and Leo a blue <span class="word-gap" data-word="sword">?</span>.
        <br><br>
        In the afternoon, they went to the "Haunted House." It was very <span class="word-gap" data-word="dark">?</span> inside, and they heard <span class="word-gap" data-word="strange">?</span> noises. 
        Something soft touched Leo’s <span class="word-gap" data-word="shoulder">?</span>, and he jumped into his father’s arms. 
        It was just a <span class="word-gap" data-word="curtain">?</span>, but it was very <span class="word-gap" data-word="spooky">?</span>.
        <br><br>
        Before leaving, they went to the <span class="word-gap" data-word="gift shop">?</span>. Mia chose a <span class="word-gap" data-word="sparkly">?</span> hat, and Leo bought a small <span class="word-gap" data-word="poster">?</span> of the park. 
        They were very tired but also very happy. On the way home in the car, both children fell <span class="word-gap" data-word="asleep">?</span> immediately.
    `;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:block; background:#0f172a; color:#f8fafc; overflow-y:auto; padding:0; font-family: 'Righteous', cursive; scroll-behavior: smooth;`;

    container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Righteous&family=Jost:wght@400;700&display=swap');
            
            #stage-content::-webkit-scrollbar { width: 10px; }
            #stage-content::-webkit-scrollbar-track { background: #1e293b; }
            #stage-content::-webkit-scrollbar-thumb { background: #f43f5e; border-radius: 10px; box-shadow: 0 0 10px #f43f5e; }

            .story-wrapper {
                max-width: 94%;
                margin: 40px auto;
                background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
                padding: 60px 45px;
                border-radius: 35px;
                box-shadow: 0 0 50px rgba(244, 63, 94, 0.2);
                border: 3px solid #334155;
                position: relative;
            }

            .story-title {
                color: #fbbf24;
                text-align: center;
                font-size: 4.5rem;
                font-weight: 900;
                margin-bottom: 50px;
                font-family: 'Righteous', cursive;
                text-shadow: 4px 4px 0px #be123c;
                letter-spacing: 2px;
            }

            .story-body {
                line-height: 2.1;
                font-size: 2.8rem;
                color: #e2e8f0;
                text-align: left;
                font-family: 'Jost', sans-serif;
            }

            .word-gap {
                display: inline-block;
                min-width: 140px;
                border: 3px solid #f43f5e;
                background: rgba(244, 63, 94, 0.1);
                text-align: center;
                color: #f43f5e;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                border-radius: 15px;
                padding: 0 15px;
                margin: 0 5px;
            }

            .word-gap:hover {
                background: #f43f5e;
                color: white;
                box-shadow: 0 0 20px #f43f5e;
                transform: scale(1.1);
            }

            .word-gap.filled {
                border-color: #10b981;
                color: #10b981;
                background: rgba(16, 185, 129, 0.1);
                font-weight: bold;
                animation: loopTheLoop 0.6s ease-out;
            }

            @keyframes loopTheLoop {
                0% { transform: translateY(0) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(180deg); }
                100% { transform: translateY(0) rotate(360deg); }
            }

            #word-overlay {
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(15, 23, 42, 0.98);
                display: none;
                flex-wrap: wrap;
                justify-content: center;
                align-content: center;
                gap: 20px;
                padding: 50px;
                z-index: 99999;
                backdrop-filter: blur(15px);
            }

            .choice-btn {
                background: #f43f5e;
                color: white;
                padding: 20px 45px;
                font-size: 2.5rem;
                font-weight: 800;
                border-radius: 20px;
                cursor: pointer;
                border: none;
                font-family: 'Righteous', sans-serif;
                box-shadow: 0 8px 0 #9f1239;
                transition: 0.1s;
            }

            .choice-btn:active {
                transform: translateY(6px);
                box-shadow: 0 2px 0 #9f1239;
            }

            .choice-btn.wrong {
                animation: spookyShake 0.4s;
                background: #475569 !important;
                box-shadow: 0 8px 0 #1e293b;
            }

            @keyframes spookyShake {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(0.8) opacity(0.5); }
            }

            .one-shot-badge {
                position: absolute;
                top: -30px;
                left: 50%;
                transform: translateX(-50%);
                background: #fbbf24;
                color: #0f172a;
                padding: 10px 60px;
                border-radius: 15px;
                font-weight: 900;
                font-size: 1.8rem;
                font-family: 'Righteous', sans-serif;
                box-shadow: 0 8px 0 #b45309;
            }
        </style>

        <div id="word-overlay"></div>

        <div class="story-wrapper">
            <div class="one-shot-badge">WONDER WORLD</div>
            <h1 class="story-title">${storyTitle}</h1>
            <div class="story-body">
                ${storyContent}
            </div>
        </div>
        <div style="height: 100px;"></div>
    `;

    const overlay = document.getElementById('word-overlay');

    const openOverlay = (target) => {
        currentTargetId = target;
        overlay.innerHTML = '';
        const shuffled = [...remainingWords].sort(() => Math.random() - 0.5);
        shuffled.forEach(word => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.innerText = word;
            btn.onclick = () => checkWord(word, btn);
            overlay.appendChild(btn);
        });
        overlay.style.display = 'flex';
    };

    const checkWord = (selectedWord, btnElement) => {
        const correctWord = currentTargetId.getAttribute('data-word');
        if (selectedWord.toLowerCase() === correctWord.toLowerCase()) {
            currentTargetId.innerText = correctWord;
            currentTargetId.classList.add('filled');
            overlay.style.display = 'none';
            remainingWords = remainingWords.filter(w => w !== selectedWord);
        } else {
            btnElement.classList.add('wrong');
            setTimeout(() => btnElement.classList.remove('wrong'), 400);
        }
    };

    document.querySelectorAll('.word-gap').forEach(gap => {
        gap.onclick = () => openOverlay(gap);
    });

    document.onkeydown = (e) => {
        if (e.keyCode === 32) if (window.triggerVetoDone) window.triggerVetoDone();
    };
})();
