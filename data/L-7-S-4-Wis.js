(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // --- معطيات الأمنية الثانية (The Switch) ---
    const wishData = {
        title: "Your Wish Has Been Granted",
        scenario: "You wake up and find yourself the opposite gender! You will stay like this for only 24 hours.",
        points: [
            "How did you feel when you looked in the mirror?",
            "What is the first thing you are going to change about your look?",
            "What is the hardest thing you experienced during the day?",
            "How did your family or friends react to you?",
            "What is the most important thing you learned about the opposite gender?"
        ]
    };

    // --- التنسيق البصري ---
    container.innerHTML = '';
    container.style.cssText = `height:calc(100vh - 100px); display:flex; flex-direction:column; align-items:center; justify-content:center; background:#000; color:#fff; font-family: 'Georgia', serif; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            .genie-top { width: 200px; margin-bottom: -20px; filter: drop-shadow(0 0 15px #ff00ea); z-index: 10; }
            
            .wish-box {
                background: linear-gradient(180deg, #9b59b6 0%, #8e44ad 100%); /* لون أرجواني سحري */
                width: 90%; max-width: 850px;
                padding: 40px; border-radius: 40px; border: 6px solid #f39c12;
                box-shadow: 0 0 60px rgba(155, 89, 182, 0.4);
                text-align: center; position: relative; z-index: 5;
                clip-path: polygon(0% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%);
                min-height: 450px; display: flex; flex-direction: column; justify-content: center;
            }

            .wish-banner { 
                background: #e67e22; color: white; padding: 10px 40px; 
                font-size: 1.8rem; font-weight: bold; font-style: italic;
                position: absolute; top: 40px; left: 50%; transform: translateX(-50%);
                border-radius: 5px; box-shadow: 0 4px 0 #d35400; width: fit-content; white-space: nowrap;
            }

            .wish-text { font-size: 1.6rem; line-height: 1.5; color: #fff; margin: 80px 0 30px 0; font-style: italic; font-weight: bold; }
            
            .wish-list-container { text-align: left; margin: 0 auto; width: fit-content; }
            .wish-list-container li { font-size: 1.4rem; margin-bottom: 12px; color: #fff; list-style-type: '⚡ '; }

            .magic-smoke { position: absolute; bottom: -50px; width: 120%; height: 200px; background: radial-gradient(ellipse at center, rgba(155, 89, 182, 0.3) 0%, transparent 70%); filter: blur(30px); }
        </style>

        <img src="https://i.ibb.co/L9m8fCc/genie-bot.png" class="genie-top">

        <div class="wish-box">
            <div class="wish-banner">${wishData.title}</div>
            
            <p class="wish-text">${wishData.scenario}</p>
            
            <div class="wish-list-container">
                <ul style="list-style:none; padding:0;">
                    ${wishData.points.map(p => `<li>${p}</li>`).join('')}
                </ul>
            </div>
        </div>

        <div class="magic-smoke"></div>
    `;

})();
