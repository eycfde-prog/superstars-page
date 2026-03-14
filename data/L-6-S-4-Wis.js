(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // --- قاعدة بيانات الـ 3 أمنيات ---
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

    // --- التنسيق البصري ---
    container.innerHTML = '';
    container.style.cssText = `height:calc(100vh - 100px); display:flex; flex-direction:column; align-items:center; justify-content:center; background:#000; color:#fff; font-family: 'Georgia', serif; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            .genie-bg { position:absolute; top:10px; width:180px; filter: drop-shadow(0 0 15px #38bdf8); z-index:1; }
            .wish-card {
                background: linear-gradient(145deg, #1e3a8a, #1e40af);
                width: 85%; max-width: 800px;
                padding: 40px; border-radius: 30px; border: 4px solid #f97316;
                box-shadow: 0 0 50px rgba(56, 189, 248, 0.3);
                text-align: center; position: relative; z-index: 2;
                transition: all 0.5s ease;
            }
            .wish-header { background: #f97316; color: white; padding: 10px 30px; border-radius: 10px; display: inline-block; margin-bottom: 25px; font-weight: bold; font-style: italic; }
            .wish-scenario { font-size: 1.8rem; line-height: 1.4; color: #fff; margin-bottom: 30px; font-style: italic; }
            .wish-list { text-align: left; background: rgba(255,255,255,0.1); padding: 25px; border-radius: 15px; border: 1px dashed #f97316; }
            .wish-list li { font-size: 1.3rem; margin-bottom: 12px; color: #cbd5e1; list-style-type: '✨ '; }
            
            .wish-nav { margin-top: 30px; display: flex; gap: 20px; z-index: 3; }
            .nav-btn { background: #f97316; color: white; border: none; padding: 12px 30px; border-radius: 50px; cursor: pointer; font-weight: bold; transition: 0.3s; }
            .nav-btn:hover { transform: scale(1.1); box-shadow: 0 0 15px #f97316; }
            .nav-btn:disabled { background: #4b5563; cursor: not-allowed; }
            
            .floating-smoke { position:absolute; bottom:0; width:100%; height:150px; background: linear-gradient(transparent, rgba(56, 189, 248, 0.2)); pointer-events:none; }
        </style>

        <img src="https://i.ibb.co/L9m8fCc/genie-bot.png" class="genie-bg" id="genieImg"> <div class="wish-card" id="wishCard">
            <div class="wish-header" id="wishTitle">${wishes[currentWish].title}</div>
            <div class="wish-scenario" id="wishScenario">${wishes[currentWish].scenario}</div>
            <ul class="wish-list" id="wishList">
                ${wishes[currentWish].points.map(p => `<li>${p}</li>`).join('')}
            </ul>
        </div>

        <div class="wish-nav">
            <button class="nav-btn" id="prevWish">Previous Wish</button>
            <button class="nav-btn" id="nextWish">Next Wish</button>
        </div>
        
        <div class="floating-smoke"></div>
    `;

    const card = document.getElementById('wishCard');
    const title = document.getElementById('wishTitle');
    const scenario = document.getElementById('wishScenario');
    const list = document.getElementById('wishList');
    const btnNext = document.getElementById('nextWish');
    const btnPrev = document.getElementById('prevWish');

    function updateWish(index) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) rotate(-1deg)';
        
        setTimeout(() => {
            title.innerText = wishes[index].title;
            scenario.innerText = wishes[index].scenario;
            list.innerHTML = wishes[index].points.map(p => `<li>${p}</li>`).join('');
            
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) rotate(0deg)';
            
            btnPrev.disabled = index === 0;
            btnNext.disabled = index === wishes.length - 1;
        }, 400);
    }

    btnNext.onclick = () => {
        if (currentWish < wishes.length - 1) {
            currentWish++;
            updateWish(currentWish);
        }
    };

    btnPrev.onclick = () => {
        if (currentWish > 0) {
            currentWish--;
            updateWish(currentWish);
        }
    };

    updateWish(0);

})();
