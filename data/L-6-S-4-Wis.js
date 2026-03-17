(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    const wishes = [
        {
            id: 1,
            title: "The Dream Vacation",
            scenario: "You have a vacation for one week with just one person you choose in any country you like.",
            points: [
                "The name of the person and the name of the country.",
                "The places you are going to visit!",
                "The activities you are both going to do!",
                "The food you are going to eat in details!",
                "The things you are going to buy!"
            ]
        },
        {
            id: 2,
            title: "The Business Success",
            scenario: "You are granted a huge fund to start your dream business anywhere in the world.",
            points: [
                "What is the business and where is it located?",
                "Who are the first people you will hire?",
                "What is the first thing you will buy for your office?",
                "How will you celebrate your first million dollars?",
                "How will this business help people?"
            ]
        },
        {
            id: 3,
            title: "The Time Machine",
            scenario: "You found a time machine that can take you to any year in the past or future.",
            points: [
                "What year are you going to visit and why?",
                "Who is the famous person you want to meet there?",
                "What important event are you going to witness?",
                "What clothes are you going to wear to fit in?",
                "What souvenir are you going to bring back with you?"
            ]
        }
    ];

    let currentWish = 0;

    container.innerHTML = '';
    container.style.cssText = `height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#020617; color:#fff; font-family: 'Inter', serif; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            @keyframes smokeFloat {
                0% { transform: translateY(0) scale(1); opacity: 0.2; }
                50% { transform: translateY(-10px) scale(1.05); opacity: 0.4; }
                100% { transform: translateY(0) scale(1); opacity: 0.2; }
            }
            .genie-container { position:relative; z-index:5; margin-bottom: -40px; }
            .genie-img { width:180px; filter: drop-shadow(0 0 25px #38bdf8); }
            
            .wish-card {
                background: linear-gradient(135deg, #0f172a, #1e293b);
                width: 85%; max-width: 850px;
                padding: 50px; border-radius: 40px; border: 3px solid #f97316;
                box-shadow: 0 20px 80px rgba(0,0,0,0.6), 0 0 30px rgba(249, 115, 22, 0.2);
                text-align: center; position: relative; z-index: 2;
                transition: 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .wish-header { 
                background: #f97316; color: white; padding: 12px 40px; 
                border-radius: 15px; display: inline-block; margin-bottom: 30px; 
                font-weight: 900; text-transform: uppercase; letter-spacing: 3px;
                box-shadow: 0 10px 20px rgba(249, 115, 22, 0.3);
            }
            .wish-scenario { font-size: 2.2rem; line-height: 1.3; color: #f8fafc; margin-bottom: 40px; font-weight: 300; }
            .wish-list { 
                text-align: left; background: rgba(0,0,0,0.3); 
                padding: 35px; border-radius: 25px; border: 1px solid #334155; 
                list-style: none;
            }
            .wish-list li { 
                font-size: 1.5rem; margin-bottom: 15px; color: #cbd5e1; 
                display: flex; align-items: center;
            }
            .wish-list li::before { content: "✦"; color: #f97316; margin-right: 15px; font-size: 1.8rem; }
            
            .wish-nav { margin-top: 40px; display: flex; gap: 30px; z-index: 10; }
            .nav-btn { 
                background: #1e293b; color: #f97316; border: 2px solid #f97316; 
                padding: 15px 40px; border-radius: 50px; cursor: pointer; 
                font-weight: 800; transition: 0.3s; text-transform: uppercase;
            }
            .nav-btn:hover:not(:disabled) { background: #f97316; color: white; transform: scale(1.05); }
            .nav-btn:disabled { opacity: 0.2; cursor: not-allowed; border-color: #475569; color: #475569; }
            
            .smoke-effect { 
                position:absolute; bottom:0; width:100%; height:300px; 
                background: radial-gradient(circle at bottom, rgba(56, 189, 248, 0.15) 0%, transparent 70%); 
                animation: smokeFloat 4s infinite ease-in-out;
            }
        </style>

        <div class="genie-container">
            <img src="https://i.ibb.co/L9m8fCc/genie-bot.png" class="genie-img">
        </div>

        <div class="wish-card" id="wishCard">
            <div class="wish-header" id="wishTitle"></div>
            <div class="wish-scenario" id="wishScenario"></div>
            <ul class="wish-list" id="wishList"></ul>
        </div>

        <div class="wish-nav">
            <button class="nav-btn" id="prevWish">Back</button>
            <button class="nav-btn" id="nextWish">Next Wish</button>
        </div>
        
        <div class="smoke-effect"></div>
    `;

    const card = document.getElementById('wishCard');
    const title = document.getElementById('wishTitle');
    const scenario = document.getElementById('wishScenario');
    const list = document.getElementById('wishList');
    const btnNext = document.getElementById('nextWish');
    const btnPrev = document.getElementById('prevWish');

    function updateWish(index) {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9) translateY(30px)';
        
        setTimeout(() => {
            title.innerText = wishes[index].title;
            scenario.innerText = wishes[index].scenario;
            list.innerHTML = wishes[index].points.map(p => `<li>${p}</li>`).join('');
            
            card.style.opacity = '1';
            card.style.transform = 'scale(1) translateY(0)';
            
            btnPrev.disabled = index === 0;
            btnNext.disabled = index === wishes.length - 1;
        }, 400);
    }

    btnNext.onclick = () => { if (currentWish < wishes.length - 1) { currentWish++; updateWish(currentWish); } };
    btnPrev.onclick = () => { if (currentWish > 0) { currentWish--; updateWish(currentWish); } };

    updateWish(0);
})();
