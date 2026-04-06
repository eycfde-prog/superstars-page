(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    const wishes = [
        {
            id: 1,
            title: "Your Wish Has Been Granted",
            icon: "🌌",
            scenario: "You spend 24 hours alone in the world! No people, no animals, but everything else is exactly the same.",
            theme: "radial-gradient(circle at center, #450a0a 0%, #050505 100%)",
            accent: "#c5a059",
            points: [
                "🏛️ What is the first place you visit now that it's empty?",
                "🏎️ Which luxury car are you going to 'borrow' for the day?",
                "💎 The most expensive thing you'll take from a store for free?",
                "🤫 How does the silence feel? (Peaceful or Scary?)",
                "⏳ The last thing you'll do before people return tomorrow?"
            ]
        },
        {
            id: 2,
            title: "The Ultimate Superpower",
            icon: "⚡",
            scenario: "You can choose ONE superpower to keep forever, but you must use it to help your city.",
            theme: "radial-gradient(circle at center, #1e3a8a 0%, #020617 100%)",
            accent: "#60a5fa",
            points: [
                "🦸 What is the power (Flying, Teleporting, or Strength)?",
                "🎭 What will be your secret superhero name?",
                "🧤 Describe your super-suit in detail!",
                "🏙️ Who is the first person or place you will save?",
                "⚖️ What is the hardest thing about being a hero?"
            ]
        },
        {
            id: 3,
            title: "The Infinite Wallet",
            icon: "💰",
            scenario: "You found a wallet that gives you any amount of money you ask for, but you can only buy things for others!",
            theme: "radial-gradient(circle at center, #14532d 0%, #050505 100%)",
            accent: "#4ade80",
            points: [
                "🎁 What is the first gift you will buy and for whom?",
                "🏡 Would you buy a house for a stranger? Why?",
                "🧸 What would you buy to make children happy?",
                "🍕 How would you feed all the hungry people?",
                "❤️ How does it feel to be rich but unable to buy for yourself?"
            ]
        }
    ];

    let currentWish = 0;

    container.innerHTML = '';
    container.style.cssText = `height:100%; width:100%; display:flex; flex-direction:column; align-items:center; background:#050505; color:#fff; font-family: 'Segoe UI', sans-serif; position:relative; overflow:hidden; transition: background 1s ease; padding-top: 60px;`;

    container.innerHTML = `
        <style>
            .wish-wrapper {
                width: 90%; max-width: 1050px; height: 85%;
                display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 10;
            }

            .wish-box {
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(15px);
                width: 100%; padding: 50px; border-radius: 40px; 
                border: 2px solid var(--accent-color);
                box-shadow: 0 0 80px rgba(0,0,0,0.8), inset 0 0 20px rgba(255,255,255,0.05);
                text-align: center; position: relative;
                transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }

            .wish-banner { 
                background: var(--accent-color); color: #000; 
                padding: 10px 45px; font-size: 1.6rem; font-weight: 900; 
                text-transform: uppercase; position: absolute; top: -28px; 
                left: 50%; transform: translateX(-50%); border-radius: 50px; 
                box-shadow: 0 10px 25px rgba(0,0,0,0.5); letter-spacing: 2px;
            }

            .wish-icon { font-size: 4.5rem; margin-bottom: 15px; filter: drop-shadow(0 0 10px var(--accent-color)); }

            .wish-text { 
                font-size: 2.3rem; line-height: 1.4; color: #fff; 
                margin: 15px 0 35px 0; font-weight: 800;
                text-shadow: 0 4px 10px rgba(0,0,0,0.5);
            }
            
            .wish-grid { 
                display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 15px; width: 100%; text-align: left;
            }
            
            .wish-item { 
                background: rgba(255,255,255,0.03); padding: 18px 25px; border-radius: 20px;
                font-size: 1.4rem; color: #eee; display: flex; align-items: center;
                border-left: 4px solid var(--accent-color); transition: 0.3s;
            }

            .wish-item:hover { background: rgba(255,255,255,0.08); transform: translateX(10px); }

            .magic-smoke { 
                position: absolute; bottom: -10%; width: 100%; height: 40%;
                background: radial-gradient(ellipse at center, var(--accent-color-alpha) 0%, transparent 70%); 
                filter: blur(60px); z-index: 1; pointer-events: none;
            }

            .nav-ui { margin-top: 35px; display: flex; gap: 20px; z-index: 100; }
            .v-btn {
                background: transparent; color: var(--accent-color); border: 2px solid var(--accent-color);
                padding: 12px 35px; border-radius: 12px; cursor: pointer;
                font-weight: 900; font-size: 1.1rem; text-transform: uppercase; transition: 0.3s;
            }
            .v-btn:hover:not(:disabled) { background: var(--accent-color); color: #000; }
            .v-btn:disabled { opacity: 0.2; cursor: not-allowed; }
        </style>

        <div class="magic-smoke" id="smoke"></div>
        
        <div class="wish-wrapper">
            <div class="wish-box" id="wishBox">
                <div class="wish-banner" id="wishTitle"></div>
                <div class="wish-icon" id="wishIcon"></div>
                <p class="wish-text" id="wishScenario"></p>
                <div class="wish-grid" id="wishGrid"></div>
            </div>

            <div class="nav-ui">
                <button class="v-btn" id="pBtn">Previous</button>
                <button class="v-btn" id="nBtn">Next Wish</button>
            </div>
        </div>
    `;

    const box = document.getElementById('wishBox');
    const title = document.getElementById('wishTitle');
    const icon = document.getElementById('wishIcon');
    const scenario = document.getElementById('wishScenario');
    const grid = document.getElementById('wishGrid');
    const smoke = document.getElementById('smoke');
    const btnN = document.getElementById('nBtn');
    const btnP = document.getElementById('pBtn');

    function updateWish(idx) {
        const d = wishes[idx];
        box.style.opacity = '0';
        box.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            title.innerText = d.title;
            icon.innerText = d.icon;
            scenario.innerText = d.scenario;
            
            // Set CSS Variables for Theme
            container.style.background = d.theme;
            box.style.setProperty('--accent-color', d.accent);
            box.style.setProperty('--accent-color-alpha', d.accent + '33');
            
            grid.innerHTML = d.points.map(p => `<div class="wish-item">${p}</div>`).join('');

            box.style.opacity = '1';
            box.style.transform = 'scale(1)';
            
            btnP.disabled = idx === 0;
            btnN.disabled = idx === wishes.length - 1;
        }, 400);
    }

    // Global navigation for VETO Frame hotspots
    window.nextSlide = () => { if (currentWish < wishes.length - 1) { currentWish++; updateWish(currentWish); } };
    window.prevSlide = () => { if (currentWish > 0) { currentWish--; updateWish(currentWish); } };

    btnN.onclick = window.nextSlide;
    btnP.onclick = window.prevSlide;

    updateWish(0);

    // Support for Spacebar to finish activity
    document.onkeydown = (e) => {
        if (e.keyCode === 32) {
            if (window.triggerVetoDone) window.triggerVetoDone();
        }
    };
})();
