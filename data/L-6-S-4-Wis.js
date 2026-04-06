(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    const wishes = [
        {
            id: 1,
            title: "The Dream Vacation",
            icon: "✈️",
            color: "#0ea5e9", // Blue
            scenario: "You have a vacation for one week with just one person you choose in any country you like.",
            points: [
                "The name of the person and the country.",
                "The places you are going to visit!",
                "The activities you are both going to do!",
                "The food you are going to eat in details!",
                "The things you are going to buy!"
            ]
        },
        {
            id: 2,
            title: "The Business Success",
            icon: "💼",
            color: "#10b981", // Green
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
            icon: "⏳",
            color: "#f59e0b", // Gold
            scenario: "You found a time machine that can take you to any year in the past or future.",
            points: [
                "What year are you going to visit and why?",
                "Who is the famous person you want to meet there?",
                "What important event are you going to witness?",
                "What clothes are you going to wear to fit in?",
                "What souvenir are you going to bring back?"
            ]
        }
    ];

    let currentWish = 0;

    container.innerHTML = '';
    container.style.cssText = `height:100%; width:100%; display:flex; align-items:center; justify-content:center; background:#020617; color:#fff; font-family: 'Poppins', sans-serif; overflow:hidden; position:relative;`;

    container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;600;900&family=Bangers&display=swap');

            /* خلفية متحركة تشبه الفضاء */
            .star-field {
                position: absolute; width: 100%; height: 100%;
                background: radial-gradient(circle at center, #1e293b 0%, #020617 100%);
                z-index: 1;
            }

            .wish-portal {
                width: 90%; max-width: 1000px; height: 600px;
                position: relative; z-index: 5;
                display: flex; flex-direction: column; align-items: center; justify-content: center;
                perspective: 1000px;
            }

            .main-display {
                width: 100%; height: 100%;
                background: rgba(15, 23, 42, 0.8);
                border-radius: 40px;
                border: 4px solid var(--theme-color);
                box-shadow: 0 0 50px var(--theme-color), inset 0 0 30px var(--theme-color);
                padding: 40px;
                display: flex; gap: 30px;
                transform-style: preserve-3d;
                transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                backdrop-filter: blur(15px);
            }

            .icon-section {
                flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
                border-right: 2px solid rgba(255,255,255,0.1);
            }

            .wish-icon {
                font-size: 10rem; margin-bottom: 20px;
                filter: drop-shadow(0 0 20px var(--theme-color));
                animation: floatIcon 3s infinite ease-in-out;
            }

            .wish-title-text {
                font-family: 'Bangers', cursive;
                font-size: 3.5rem; color: var(--theme-color);
                letter-spacing: 2px; text-align: center;
            }

            .content-section {
                flex: 1.5; display: flex; flex-direction: column; justify-content: center;
                padding-left: 20px;
            }

            .scenario-text {
                font-size: 2.2rem; font-weight: 300; line-height: 1.3;
                color: #f8fafc; margin-bottom: 30px;
                border-left: 5px solid var(--theme-color); padding-left: 20px;
            }

            .points-grid {
                display: grid; grid-template-columns: 1fr; gap: 12px;
            }

            .point-item {
                background: rgba(255,255,255,0.05);
                padding: 15px 20px; border-radius: 15px;
                font-size: 1.4rem; color: #cbd5e1;
                display: flex; align-items: center;
                transition: 0.3s;
                border: 1px solid transparent;
            }

            .point-item:hover {
                background: rgba(255,255,255,0.1);
                border-color: var(--theme-color);
                transform: translateX(10px);
            }

            .point-item::before {
                content: "⚡"; margin-right: 15px; color: var(--theme-color);
            }

            /* أزرار التحكم */
            .nav-controls {
                position: absolute; bottom: -80px; display: flex; gap: 40px;
            }

            .nav-circle-btn {
                width: 70px; height: 70px; border-radius: 50%;
                border: 3px solid var(--theme-color);
                background: #020617; color: var(--theme-color);
                font-size: 2rem; cursor: pointer;
                display: flex; align-items: center; justify-content: center;
                transition: 0.4s;
            }

            .nav-circle-btn:hover:not(:disabled) {
                background: var(--theme-color); color: #fff;
                box-shadow: 0 0 25px var(--theme-color);
            }

            .nav-circle-btn:disabled {
                opacity: 0.2; cursor: not-allowed;
            }

            @keyframes floatIcon {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(5deg); }
            }

            .portal-flash {
                position: absolute; width: 100%; height: 100%;
                background: white; border-radius: 40px;
                z-index: 10; opacity: 0; pointer-events: none;
            }
        </style>

        <div class="star-field"></div>
        
        <div class="wish-portal">
            <div class="portal-flash" id="flash"></div>
            <div class="main-display" id="displayBox" style="--theme-color: ${wishes[0].color}">
                <div class="icon-section">
                    <div class="wish-icon" id="wishIcon">${wishes[0].icon}</div>
                    <div class="wish-title-text" id="wishTitle">${wishes[0].title}</div>
                </div>
                <div class="content-section">
                    <div class="scenario-text" id="wishScenario">${wishes[0].scenario}</div>
                    <div class="points-grid" id="wishPoints">
                        ${wishes[0].points.map(p => `<div class="point-item">${p}</div>`).join('')}
                    </div>
                </div>
            </div>

            <div class="nav-controls">
                <button class="nav-circle-btn" id="prevBtn" style="--theme-color: ${wishes[0].color}">◀</button>
                <button class="nav-circle-btn" id="nextBtn" style="--theme-color: ${wishes[0].color}">▶</button>
            </div>
        </div>
    `;

    const displayBox = document.getElementById('displayBox');
    const wishIcon = document.getElementById('wishIcon');
    const wishTitle = document.getElementById('wishTitle');
    const wishScenario = document.getElementById('wishScenario');
    const wishPoints = document.getElementById('wishPoints');
    const flash = document.getElementById('flash');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    function changeWish(index) {
        // أنيميشن الفلاش والنقلة
        flash.style.transition = 'none';
        flash.style.opacity = '1';
        displayBox.style.transform = 'scale(0.8) rotateX(20deg)';
        
        setTimeout(() => {
            const data = wishes[index];
            
            // تحديث الألوان والثيم
            displayBox.style.setProperty('--theme-color', data.color);
            prevBtn.style.setProperty('--theme-color', data.color);
            nextBtn.style.setProperty('--theme-color', data.color);
            
            // تحديث المحتوى
            wishIcon.innerText = data.icon;
            wishTitle.innerText = data.title;
            wishScenario.innerText = data.scenario;
            wishPoints.innerHTML = data.points.map(p => `<div class="point-item">${p}</div>`).join('');
            
            // استعادة الشكل
            flash.style.transition = 'opacity 0.6s';
            flash.style.opacity = '0';
            displayBox.style.transform = 'scale(1) rotateX(0deg)';
            
            // حالة الأزرار
            prevBtn.disabled = index === 0;
            nextBtn.disabled = index === wishes.length - 1;
        }, 300);
    }

    nextBtn.onclick = () => { if (currentWish < wishes.length - 1) { currentWish++; changeWish(currentWish); } };
    prevBtn.onclick = () => { if (currentWish > 0) { currentWish--; changeWish(currentWish); } };

    // تهيئة البداية
    changeWish(0);
})();
