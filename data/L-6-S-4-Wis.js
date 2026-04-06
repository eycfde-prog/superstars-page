(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    const wishes = [
        {
            id: 1,
            title: "The Dream Vacation",
            icon: "✈️",
            scenario: "You have a vacation for one week with just one person you choose in any country you like.",
            theme: "linear-gradient(135deg, #075985, #0c4a6e)",
            accent: "#38bdf8",
            points: [
                "👤 The person and the country's name.",
                "📍 The amazing places you'll visit!",
                "🏄 The crazy activities you'll do together!",
                "🍕 The delicious food (in detail!)",
                "🛍️ The cool things you're going to buy!"
            ]
        },
        {
            id: 2,
            title: "The Business Success",
            icon: "💼",
            scenario: "You are granted a huge fund to start your dream business anywhere in the world.",
            theme: "linear-gradient(135deg, #064e3b, #065f46)",
            accent: "#4ade80",
            points: [
                "🏢 What is the business and its location?",
                "🤝 Who are the first people you will hire?",
                "🖥️ The first thing you'll buy for your office?",
                "🍾 How will you celebrate your first million?",
                "🌍 How will your business help humanity?"
            ]
        },
        {
            id: 3,
            title: "The Time Machine",
            icon: "⌛",
            scenario: "You found a time machine that can take you to any year in the past or future.",
            theme: "linear-gradient(135deg, #4c1d95, #2e1065)",
            accent: "#a78bfa",
            points: [
                "📅 Which year will you visit and why?",
                "👑 Who is the famous person you want to meet?",
                "🔥 The historical event you will witness?",
                "🧥 What clothes will you wear to fit in?",
                "🏺 The souvenir you'll bring back home!"
            ]
        }
    ];

    let currentWish = 0;

    container.innerHTML = '';
    container.style.cssText = `height:100%; display:flex; flex-direction:column; align-items:center; background:#020617; color:#fff; font-family: 'Inter', sans-serif; position:relative; overflow:hidden; transition: background 0.8s ease; padding-top: 60px;`; // Padding top added for Exit button safety

    container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;700&display=swap');
            
            .wish-wrapper {
                width: 90%;
                max-width: 1000px;
                height: 85%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                z-index: 10;
                margin-top: 20px;
            }

            .main-card {
                width: 100%;
                background: rgba(255, 255, 255, 0.03);
                backdrop-filter: blur(15px);
                border-radius: 40px;
                padding: 40px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                position: relative;
                transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .icon-circle {
                width: 85px; /* Reduced for full screen safety */
                height: 85px;
                background: rgba(255,255,255,0.1);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 3rem;
                margin-bottom: 15px;
                border: 2px solid transparent;
                transition: 0.5s;
            }

            .wish-title {
                font-family: 'Space Grotesk', sans-serif;
                font-size: 3.5rem;
                font-weight: 700;
                margin-bottom: 15px;
                letter-spacing: -1px;
                text-align: center;
            }

            .wish-scenario {
                font-size: 2rem;
                line-height: 1.3;
                color: #e2e8f0;
                margin-bottom: 30px;
                font-weight: 300;
                max-width: 850px;
                opacity: 0.9;
                text-align: center;
            }

            .points-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 15px;
                text-align: left;
                width: 100%;
            }

            .point-item {
                background: rgba(0, 0, 0, 0.2);
                padding: 15px 20px;
                border-radius: 15px;
                font-size: 1.4rem;
                border-left: 5px solid transparent;
                transition: 0.3s;
                color: #f1f5f9;
            }

            .point-item:hover {
                transform: translateX(8px);
                background: rgba(255, 255, 255, 0.05);
            }

            .nav-container {
                margin-top: 30px;
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
                text-transform: uppercase;
                z-index: 9000; /* Above nav hotspots */
            }

            .nav-btn:hover:not(:disabled) {
                background: white;
                color: black;
                transform: translateY(-3px);
            }

            .nav-btn:disabled {
                opacity: 0.1;
                cursor: not-allowed;
            }

            .floating-bg {
                position: absolute;
                width: 350px;
                height: 350px;
                border-radius: 50%;
                filter: blur(80px);
                z-index: 1;
                opacity: 0.3;
                transition: all 1s ease;
            }
        </style>

        <div class="floating-bg" id="bgBlob"></div>
        
        <div class="wish-wrapper">
            <div class="main-card" id="wishCard">
                <div class="icon-circle" id="wishIcon"></div>
                <h1 class="wish-title" id="wishTitle"></h1>
                <p class="wish-scenario" id="wishScenario"></p>
                <div class="points-grid" id="wishPoints"></div>
            </div>

            <div class="nav-container">
                <button class="nav-btn" id="prevBtn">Previous</button>
                <button class="nav-btn" id="nextBtn">Next Wish</button>
            </div>
        </div>
    `;

    const card = document.getElementById('wishCard');
    const title = document.getElementById('wishTitle');
    const icon = document.getElementById('wishIcon');
    const scenario = document.getElementById('wishScenario');
    const pointsGrid = document.getElementById('wishPoints');
    const blob = document.getElementById('bgBlob');
    const btnNext = document.getElementById('nextBtn');
    const btnPrev = document.getElementById('prevBtn');

    function updateDisplay(index) {
        const data = wishes[index];
        
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) scale(0.98)';
        
        setTimeout(() => {
            title.innerText = data.title;
            icon.innerText = data.icon;
            scenario.innerText = data.scenario;
            
            container.style.background = data.theme;
            icon.style.borderColor = data.accent;
            icon.style.boxShadow = `0 0 25px ${data.accent}44`;
            
            blob.style.background = data.accent;
            blob.style.top = '30%';
            blob.style.left = '50%';
            blob.style.transform = 'translate(-50%, -50%)';

            pointsGrid.innerHTML = data.points.map(p => `
                <div class="point-item" style="border-left-color: ${data.accent}">
                    ${p}
                </div>
            `).join('');

            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
            
            btnPrev.disabled = index === 0;
            btnNext.disabled = index === wishes.length - 1;
        }, 400);
    }

    // Connect global navigation functions for the hotspots
    window.nextSlide = () => { if (currentWish < wishes.length - 1) { currentWish++; updateDisplay(currentWish); } };
    window.prevSlide = () => { if (currentWish > 0) { currentWish--; updateDisplay(currentWish); } };

    btnNext.onclick = window.nextSlide;
    btnPrev.onclick = window.prevSlide;

    updateDisplay(0);
})();
