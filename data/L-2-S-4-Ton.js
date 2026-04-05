(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration ---
    const ttNumber = 1; 
    const ttSentence = "She sells sea shells by the sea shore, the shells she sells are shells I'm sure.";
    // ---------------------

    container.innerHTML = ''; 
    container.style.cssText = `
        height:100%; 
        width:100%; 
        display:flex; 
        flex-direction:column; 
        align-items:center; 
        justify-content:center; 
        background:#050505; 
        color:#fff; 
        overflow:hidden; 
        font-family: 'Segoe UI', sans-serif;
        padding: 20px;
    `;

    /**
     * WOLF Fix: معالجة النصوص باستخدام Regex موحد 
     * لضمان عدم تداخل وسوم الـ HTML أثناء الاستبدال
     */
    const highlightedSentence = ttSentence.replace(/sh|s/gi, (matched) => {
        if (matched.toLowerCase() === 'sh') {
            return `<span class="sh-sound">${matched}</span>`;
        }
        return `<span class="s-sound">${matched}</span>`;
    });

    container.innerHTML = `
        <style>
            .tt-wrapper { 
                width:95%; 
                max-width:900px; 
                display: flex;
                flex-direction: column;
                align-items: center;
                animation: bounceIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
            }
            
            .tt-badge { 
                background:#c5a059; color:#000; display:inline-block; 
                padding:5px 25px; font-weight:900; border-radius:4px; 
                margin-bottom:20px; font-size:1rem; 
                letter-spacing:3px; text-transform:uppercase; 
            }

            .tt-image-container { 
                width: 200px; height: 200px; 
                margin: 0 auto 25px; border-radius:25px; 
                border:3px solid #222; overflow:hidden; position:relative;
                box-shadow: 0 15px 35px rgba(0,0,0,0.6);
                transform: rotate(-2deg);
            }

            .tt-text-card { 
                background: #111; 
                padding: 40px; 
                border-radius:25px; 
                border: 1px solid #222; 
                position:relative; 
                box-shadow: inset 0 0 30px rgba(0,0,0,0.5);
                width: 100%;
                text-align: center;
            }

            .tt-quote { 
                font-size: 2.8rem; 
                line-height: 1.4; 
                font-weight: 900; 
                color:#fff; 
                margin:0; 
            }
            
            /* ألوان التمييز */
            .sh-sound { color: #e74c3c; text-decoration: underline; text-underline-offset: 5px; }
            .s-sound { color: #c5a059; }

            .tt-instruction { 
                margin-top:25px; 
                color:#555; 
                font-size:1rem; 
                letter-spacing:3px; 
                font-weight:bold; 
                text-transform: uppercase;
            }
            
            /* تصغير الأحجام في حالة الشاشات الصغيرة لتناسب الفريم */
            @media (max-height: 750px) {
                .tt-quote { font-size: 2.2rem; }
                .tt-image-container { width: 150px; height: 150px; }
                .tt-text-card { padding: 25px; }
            }

            @keyframes bounceIn {
                from { opacity:0; transform: scale(0.9) translateY(30px); }
                to { opacity:1; transform: scale(1) translateY(0); }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">Tongue Twister #${ttNumber}</div>
            
            <div class="tt-image-container">
                <img src="data/t-t/${ttNumber}.png" onerror="this.src='https://via.placeholder.com/400?text=VETO+TWISTER'" style="width:100%; height:100%; object-fit:cover;">
            </div>

            <div class="tt-text-card">
                <p class="tt-quote">${highlightedSentence}</p>
            </div>

            <div class="tt-instruction">
                ⚡ Repeat 3 times as fast as you can ⚡
            </div>
        </div>
    `;

    // نظام التحكم (Space Bar)
    document.onkeydown = (e) => {
        if (e.code === "Space") { 
            e.preventDefault();
            if(window.triggerVetoDone) window.triggerVetoDone();
        }
    };
})();
