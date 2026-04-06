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
    // WOLF FIX: تم إزالة padding-top واستخدام justify-content: center للتوسيط الرأسي المثالي
    container.style.cssText = `height:100%; width:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#050505; color:#fff; font-family: 'Segoe UI', sans-serif; position:relative; overflow:hidden; transition: background 1s ease;`;

    container.innerHTML = `
        <style>
            .wish-wrapper {
                width: 95%; max-width: 1000px; 
                display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 10;
                padding: 20px;
            }

            .wish-box {
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(15px);
                width: 100%; padding: 40px; border-radius: 40px; 
                border: 2px solid var(--accent-color);
                box-shadow: 0 0 80px rgba(0,0,0,0.8), inset 0 0 20px rgba(255,255,255,0.05);
                text-align: center; position: relative;
                transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }

            .wish-banner { 
                background: var(--accent-color); color: #000; 
                padding: 8px 35px; font-size: 1.4rem; font-weight: 900; 
                text-transform: uppercase; position: absolute; top: -25px; 
                left: 50%; transform: translateX(-50%); border-radius: 50px; 
                box-shadow: 0 10px 25px rgba(0,0,0,0.5); letter-spacing: 2px;
                white-space: nowrap;
            }

            .wish-icon { font-size: 3.5rem; margin-bottom: 10px; filter: drop-shadow(0 0 10px var(--accent-color)); }

            .wish-text { 
                font-size: 1.8rem; line-height: 1.3; color: #fff; 
                margin: 10px 0 25px 0; font-weight: 800;
                text-shadow: 0 4px 10px rgba(0,0,0,0.5);
            }
            
            .wish-grid { 
                display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 12px; width: 100%; text-align: left;
            }
            
            .wish-item { 
                background: rgba(255,255,255,0.03); padding: 15px 20px; border-radius: 15px;
                font-size: 1.2rem; color: #eee; display: flex; align-items: center;
                border-left: 4px solid var(--accent-color); transition: 0.3s;
            }

            .wish-item:hover { background: rgba(255,255,255,0.08); transform: translateX(10px); }

            .nav-ui { margin-top: 25px; display: flex; gap: 20px; z-index: 100; }
            .v-btn {
                background: transparent; color: var(--accent-color); border: 2px solid var(--accent-color);
                padding: 10px 30px; border-radius: 12px; cursor: pointer;
                font-weight: 900; font-size: 1rem; text-transform: uppercase; transition: 0.3s;
            }
            .v-btn:hover:not(:disabled) { background: var(--accent-color); color: #000; }
            .v-btn:disabled { opacity: 0.2; cursor: not-allowed; }

            /* WOLF: Responsive Fix for Small Heights */
            @media (max-height: 700px) {
                .wish-box { padding: 25px; }
                .wish-text { font-size: 1.4rem; margin-bottom: 15px; }
                .wish-item { font-size: 1rem; padding: 10px 15px; }
                .wish-icon { font-size: 2.5rem; }
                .wish-banner { font-size: 1.1rem; top: -20px; }
            }
        </style>

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
    const btnN = document.getElementById('nBtn');
    const btnP = document.getElementById('pBtn');

    function updateWish(idx) {
        const d = wishes[idx];
        box.style.opacity = '0';
        box.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            title.innerText = d.title;
            icon.innerText = d.icon;
            scenario.innerText = d.scenario;
            
            container.style.background = d.theme;
            box.style.setProperty('--accent-color', d.accent);
            
            grid.innerHTML = d.points.map(p => `<div class="wish-item">${p}</div>`).join('');

            box.style.opacity = '1';
            box.style.transform = 'translateY(0)';
            
            btnP.disabled = idx === 0;
            btnN.disabled = idx === wishes.length - 1;
        }, 400);
    }

    window.nextSlide = () => { if (currentWish < wishes.length - 1) { currentWish++; updateWish(currentWish); } };
    window.prevSlide = () => { if (currentWish > 0) { currentWish--; updateWish(currentWish); } };

    btnN.onclick = window.nextSlide;
    btnP.onclick = window.prevSlide;

    updateWish(0);

    document.onkeydown = (e) => {
        if (e.keyCode === 32) {
            if (window.triggerVetoDone) window.triggerVetoDone();
        }
    };
})();
