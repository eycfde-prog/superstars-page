(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    const wishes = [
        {
            id: 1,
            title: "The 24-Hour Switch",
            icon: "✨",
            scenario: "Poof! You wake up and find yourself the opposite gender! This magic will last for only 24 hours.",
            theme: "linear-gradient(135deg, #2e1065, #4c1d95)",
            accent: "#f59e0b",
            points: [
                "🪞 Your reaction when you looked in the mirror?",
                "👗 The first thing you would change about your look?",
                "😫 The hardest part of your day as the new you?",
                "👨‍👩‍👧 How would your family and friends react?",
                "🧠 The most important lesson you learned?"
            ]
        },
        {
            id: 2,
            title: "The Animal Whisperer",
            icon: "🐾",
            scenario: "You gain the magical ability to speak to and understand all animals for one full day!",
            theme: "linear-gradient(135deg, #064e3b, #065f46)",
            accent: "#a7f3d0",
            points: [
                "🐶 Who is the first animal you would talk to?",
                "🏠 What secrets would your pet tell you?",
                "🦁 Which wild animal would you visit at the zoo?",
                "🍔 What would you ask them about their food?",
                "🕊️ How would you help them solve a problem?"
            ]
        },
        {
            id: 3,
            title: "The Invisible Day",
            icon: "👻",
            scenario: "You drink a magic potion that makes you completely invisible for 24 hours!",
            theme: "linear-gradient(135deg, #431407, #7c2d12)",
            accent: "#fb923c",
            points: [
                "🕵️ Where is the first place you would go?",
                "🤫 Whose conversation would you listen to?",
                "🤡 What funny prank would you play on a friend?",
                "🍩 Would you take things without being seen?",
                "🙏 Why would you be happy to be visible again?"
            ]
        }
    ];

    let currentWish = 0;

    container.innerHTML = '';
    container.style.cssText = `height:100%; display:flex; flex-direction:column; align-items:center; background:#05010a; color:#fff; font-family: 'Inter', sans-serif; position:relative; overflow:hidden; transition: background 0.8s ease; padding-top: 50px;`;

    container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;700&display=swap');
            
            .magic-dust { 
                position: absolute; width: 100%; height: 100%;
                background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
                background-size: 40px 40px; top: 0; z-index: 0;
            }

            .wish-wrapper {
                width: 90%;
                max-width: 950px;
                height: 85%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                z-index: 10;
            }

            .main-card {
                width: 100%;
                background: rgba(0, 0, 0, 0.4);
                backdrop-filter: blur(20px);
                border-radius: 40px;
                padding: 40px;
                border: 2px solid rgba(255, 255, 255, 0.1);
                box-shadow: 0 0 50px rgba(0,0,0,0.5);
                position: relative;
                transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .badge {
                background: var(--accent-color);
                color: #000;
                padding: 10px 30px;
                font-size: 1.4rem;
                font-weight: 900;
                border-radius: 15px;
                text-transform: uppercase;
                margin-bottom: 25px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            }

            .scenario-text {
                font-size: 2.2rem;
                line-height: 1.4;
                color: #fef3c7;
                margin-bottom: 35px;
                font-weight: 400;
                text-align: center;
                font-style: italic;
                max-width: 800px;
            }

            .points-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 15px;
                width: 100%;
            }

            .point-item {
                background: rgba(255, 255, 255, 0.05);
                padding: 18px 25px;
                border-radius: 20px;
                font-size: 1.45rem;
                border-left: 5px solid var(--accent-color);
                transition: 0.3s;
                color: #e9d5ff;
                text-align: left;
            }

            .point-item:hover {
                background: rgba(255, 255, 255, 0.1);
                transform: translateX(10px);
            }

            .nav-container {
                margin-top: 35px;
                display: flex;
                gap: 20px;
            }

            .nav-btn {
                background: rgba(255,255,255,0.1);
                border: 1px solid rgba(255,255,255,0.2);
                color: white;
                padding: 12px 35px;
                border-radius: 15px;
                cursor: pointer;
                font-size: 1.2rem;
                font-weight: 600;
                transition: 0.3s;
            }

            .nav-btn:hover:not(:disabled) {
                background: white;
                color: black;
            }

            .nav-btn:disabled { opacity: 0.1; cursor: not-allowed; }

            .magic-icon {
                font-size: 4rem;
                margin-bottom: 10px;
                filter: drop-shadow(0 0 15px var(--accent-color));
            }
        </style>

        <div class="magic-dust"></div>
        
        <div class="wish-wrapper">
            <div class="main-card" id="wishCard">
                <div class="magic-icon" id="wishIcon"></div>
                <div class="badge" id="wishTitle"></div>
                <p class="scenario-text" id="wishScenario"></p>
                <div class="points-grid" id="wishPoints"></div>
            </div>

            <div class="nav-container">
                <button class="nav-btn" id="prevBtn">Back</button>
                <button class="nav-btn" id="nextBtn">Next Magic</button>
            </div>
        </div>
    `;

    const card = document.getElementById('wishCard');
    const title = document.getElementById('wishTitle');
    const icon = document.getElementById('wishIcon');
    const scenario = document.getElementById('wishScenario');
    const pointsGrid = document.getElementById('wishPoints');
    const btnNext = document.getElementById('nextBtn');
    const btnPrev = document.getElementById('prevBtn');

    function updateDisplay(index) {
        const data = wishes[index];
        
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9) rotate(-1deg)';
        
        setTimeout(() => {
            title.innerText = data.title;
            icon.innerText = data.icon;
            scenario.innerText = `"${data.scenario}"`;
            
            container.style.background = data.theme;
            card.style.setProperty('--accent-color', data.accent);
            title.style.background = data.accent;
            
            pointsGrid.innerHTML = data.points.map(p => `
                <div class="point-item" style="border-left-color: ${data.accent}">
                    ✨ ${p}
                </div>
            `).join('');

            card.style.opacity = '1';
            card.style.transform = 'scale(1) rotate(0deg)';
            
            btnPrev.disabled = index === 0;
            btnNext.disabled = index === wishes.length - 1;
        }, 400);
    }

    // Connect to VETO Frame hotspots
    window.nextSlide = () => { if (currentWish < wishes.length - 1) { currentWish++; updateDisplay(currentWish); } };
    window.prevSlide = () => { if (currentWish > 0) { currentWish--; updateDisplay(currentWish); } };

    btnNext.onclick = window.nextSlide;
    btnPrev.onclick = window.prevSlide;

    updateDisplay(0);
})();
