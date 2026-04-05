(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration ---
    const ttNumber = 1; 
    const ttSentence = "She sells sea shells by the sea shore, the shells she sells are shells I'm sure.";
    // ---------------------

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#050505; color:#fff; overflow:hidden; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;`;

    /**
     * WOLF Logic: تمييز الحروف باستخدام Regex دقيق
     * نستخدم (sh) أولاً لضمان عدم التقاط حرف (s) المنفرد منها
     */
    const highlightedSentence = ttSentence
        .replace(/sh/gi, '<span class="sh-sound">$&</span>')
        .replace(/(?<!<span class="sh-sound">)s(?!<\/span>)/gi, '<span class="s-sound">$&</span>');

    container.innerHTML = `
        <style>
            .tt-wrapper { 
                width:90%; 
                max-width:1100px; 
                text-align:center; 
                animation: bounceIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
            }
            
            .tt-badge { 
                background:#c5a059; 
                color:#000; 
                display:inline-block; 
                padding:8px 30px; 
                font-weight:900; 
                border-radius:4px; 
                margin-bottom:30px; 
                font-size:1.2rem; 
                letter-spacing:4px; 
                text-transform:uppercase;
                box-shadow: 0 4px 15px rgba(197, 160, 89, 0.3);
            }

            .tt-image-container { 
                width:250px; 
                height:250px; 
                margin: 0 auto 40px; 
                border-radius:30px; 
                border:4px solid #222; 
                overflow:hidden; 
                position:relative;
                box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                transform: rotate(-2deg);
                transition: transform 0.3s ease;
            }
            
            .tt-image-container:hover {
                transform: rotate(0deg) scale(1.05);
            }

            .tt-text-card { 
                background: #111; 
                padding:50px; 
                border-radius:30px; 
                border: 1px solid #222; 
                position:relative; 
                box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
            }

            .tt-quote { 
                font-size:3.5rem; 
                line-height:1.3; 
                font-weight:900; 
                color:#fff; 
                margin:0; 
            }
            
            /* تمييز الأصوات */
            .sh-sound { color: #e74c3c; text-decoration: underline; font-style: italic; } 
            .s-sound { color: #c5a059; font-weight: bold; }

            .tt-instruction { 
                margin-top:40px; 
                color:#666; 
                font-size:1.1rem; 
                letter-spacing:3px; 
                font-weight:bold;
                text-transform: uppercase;
            }
            
            @keyframes bounceIn {
                from { opacity:0; transform: scale(0.9) translateY(20px); }
                to { opacity:1; transform: scale(1) translateY(0); }
            }

            @media (max-width: 768px) {
                .tt-quote { font-size: 2rem; }
                .tt-image-container { width: 150px; height: 150px; }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">Challenger #${ttNumber}</div>
            
            <div class="tt-image-container">
                <img src="data/t-t/${ttNumber}.png" 
                     onerror="this.src='https://via.placeholder.com/400?text=Twister'" 
                     style="width:100%; height:100%; object-fit:cover;">
            </div>

            <div class="tt-text-card">
                <p class="tt-quote">${highlightedSentence}</p>
            </div>

            <div class="tt-instruction">
                ⚡ REPEAT 3 TIMES AS FAST AS YOU CAN ⚡
            </div>
        </div>
    `;

    // نظام التحكم - WOLF Event Handler
    document.onkeydown = (e) => {
        if (e.code === "Space" || e.keyCode === 32) {
            e.preventDefault();
            console.log("WOLF: Transitioning to next stage...");
            if(typeof window.triggerVetoDone === "function") {
                window.triggerVetoDone();
            }
        }
    };
})();
