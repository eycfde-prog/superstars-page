(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    const wishData = {
        title: "Your Wish Has Been Granted",
        scenario: "You spend 24 hours alone in the world! No people, no animals, but everything else is exactly the same.",
        points: [
            "What is the very first place you are going to visit now that it's empty?",
            "Which luxury car or vehicle are you going to 'borrow' for the day?",
            "What is the most expensive thing you are going to take from a store for free?",
            "How does the world feel without any noise or voices? (Peaceful or Scary?)",
            "What is the last thing you will do before people return the next day?"
        ]
    };

    container.innerHTML = '';
    container.style.cssText = `height:100%; width:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#050505; color:#fff; font-family: 'Segoe UI', serif; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            @keyframes vetoSmoke {
                0% { transform: scale(1) translate(0, 0); opacity: 0.3; }
                50% { transform: scale(1.1) translate(10px, -20px); opacity: 0.5; }
                100% { transform: scale(1) translate(0, 0); opacity: 0.3; }
            }
            
            .genie-img { 
                width: 15vw; 
                margin-bottom: -3vh; 
                filter: drop-shadow(0 0 20px #ef4444); 
                z-index: 10; 
                animation: vetoFloat 3s ease-in-out infinite;
            }

            @keyframes vetoFloat {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-15px); }
            }

            .wish-box {
                background: linear-gradient(145deg, #450a0a 0%, #000 100%);
                width: 85%; 
                max-width: 1000px;
                padding: 60px; 
                border-radius: 40px; 
                border: 3px solid #c5a059;
                box-shadow: 0 0 100px rgba(239, 68, 68, 0.2), inset 0 0 30px rgba(197, 160, 89, 0.1);
                text-align: center; 
                position: relative; 
                z-index: 5;
                animation: vetoPopIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }

            .wish-banner { 
                background: #c5a059; 
                color: #000; 
                padding: 10px 50px; 
                font-size: 1.8vw; 
                font-weight: 900; 
                text-transform: uppercase;
                position: absolute; 
                top: -25px; 
                left: 50%; 
                transform: translateX(-50%);
                border-radius: 50px; 
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                white-space: nowrap;
                letter-spacing: 2px;
            }

            .wish-text { 
                font-size: 2.2vw; 
                line-height: 1.4; 
                color: #fff; 
                margin: 20px 0 40px 0; 
                font-weight: 900;
                text-shadow: 0 5px 15px rgba(0,0,0,0.5);
            }
            
            .wish-list { 
                text-align: left; 
                margin: 0 auto; 
                width: fit-content; 
                list-style: none;
                padding: 0;
            }
            
            .wish-list li { 
                font-size: 1.5vw; 
                margin-bottom: 20px; 
                color: #fca5a5; 
                display: flex;
                align-items: center;
                gap: 15px;
                font-weight: 500;
            }

            .wish-list li::before {
                content: '✦';
                color: #c5a059;
                font-size: 1.8vw;
            }

            .magic-smoke-bg { 
                position: absolute; 
                bottom: -10vh; 
                width: 150%; 
                height: 40vh; 
                background: radial-gradient(ellipse at center, rgba(239, 68, 68, 0.15) 0%, transparent 70%); 
                filter: blur(50px);
                animation: vetoSmoke 8s infinite linear;
            }

            @keyframes vetoPopIn {
                from { opacity: 0; transform: scale(0.9) translateY(30px); }
                to { opacity: 1; transform: scale(1) translateY(0); }
            }
        </style>

        <img src="https://i.ibb.co/L9m8fCc/genie-bot.png" class="genie-img">

        <div class="wish-box">
            <div class="wish-banner">${wishData.title}</div>
            <p class="wish-text">${wishData.scenario}</p>
            <ul class="wish-list">
                ${wishData.points.map(p => `<li>${p}</li>`).join('')}
            </ul>
        </div>

        <div class="magic-smoke-bg"></div>
    `;

    // تفعيل مفتاح المسافة لإنهاء النشاط
    document.onkeydown = (e) => {
        if (e.keyCode === 32) {
            if (window.triggerVetoDone) window.triggerVetoDone();
        }
    };
})();
