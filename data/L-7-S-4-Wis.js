(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    const wishData = {
        title: "The 24-Hour Switch",
        scenario: "Poof! You wake up and find yourself the opposite gender! This magic will last for only 24 hours.",
        points: [
            "What was your reaction when you looked in the mirror?",
            "What is the first thing you would change about your look?",
            "What would be the hardest part of your day?",
            "How would your family and friends react to the 'new you'?",
            "What is the most important lesson you learned about the opposite gender?"
        ]
    };

    container.innerHTML = '';
    container.style.cssText = `height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#05010a; color:#fff; font-family: 'Inter', sans-serif; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(0.5deg); }
            }
            @keyframes magicGlow {
                0% { box-shadow: 0 0 40px rgba(155, 89, 182, 0.2); }
                50% { box-shadow: 0 0 80px rgba(155, 89, 182, 0.5); }
                100% { box-shadow: 0 0 40px rgba(155, 89, 182, 0.2); }
            }
            
            .genie-avatar { 
                width: 180px; 
                margin-bottom: -30px; 
                filter: drop-shadow(0 0 20px #9b59b6); 
                z-index: 10;
                animation: float 4s infinite ease-in-out;
            }
            
            .wish-card {
                background: linear-gradient(145deg, #2e1065 0%, #4c1d95 100%);
                width: 85%; max-width: 800px;
                padding: 60px 40px; border-radius: 50px; 
                border: 4px solid #f59e0b;
                text-align: center; position: relative; z-index: 5;
                animation: magicGlow 5s infinite;
                clip-path: polygon(5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%);
            }

            .badge { 
                background: #f59e0b; color: #000; padding: 8px 30px; 
                font-size: 1.4rem; font-weight: 900;
                position: absolute; top: 0; left: 50%; transform: translateX(-50%);
                border-bottom-left-radius: 20px; border-bottom-right-radius: 20px;
                text-transform: uppercase;
            }

            .scenario-text { 
                font-size: 1.8rem; line-height: 1.4; color: #fef3c7; 
                margin: 20px 0 40px 0; font-style: italic; font-weight: 600;
            }
            
            .points-grid { 
                text-align: left; margin-top: 30px; 
                display: grid; gap: 15px;
            }
            
            .point-item { 
                background: rgba(255,255,255,0.05);
                padding: 15px 25px; border-radius: 15px;
                font-size: 1.3rem; color: #e9d5ff;
                display: flex; align-items: center;
                border-left: 5px solid #f59e0b;
                transition: 0.3s;
            }
            .point-item:hover { background: rgba(255,255,255,0.1); transform: scale(1.02); }

            .magic-dust { 
                position: absolute; width: 100%; height: 100%;
                background-image: radial-gradient(#9b59b6 1px, transparent 1px);
                background-size: 50px 50px; opacity: 0.1; top: 0;
            }
        </style>

        <div class="magic-dust"></div>
        <img src="https://i.ibb.co/L9m8fCc/genie-bot.png" class="genie-avatar">

        <div class="wish-card">
            <div class="badge">${wishData.title}</div>
            <p class="scenario-text">"${wishData.scenario}"</p>
            
            <div class="points-grid">
                ${wishData.points.map(p => `<div class="point-item">✨ ${p}</div>`).join('')}
            </div>
        </div>
    `;

})();
