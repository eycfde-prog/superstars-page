(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration ---
    const ttNumber = 1; 
    const ttSentence = "She sells sea shells by the sea shore, the shells she sells are shells I'm sure.";
    // ---------------------

    container.innerHTML = ''; 
    // تحسين الحاوية الأساسية لتجنب التمرير
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

    // معالجة النص لتمييز حروف S و SH بصرياً
    const highlightedSentence = ttSentence
        .replace(/sh/gi, '<span class="sh-sound">sh</span>')
        .replace(/s/gi, '<span class="s-sound">s</span>');

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
                padding:5px 20px; font-weight:900; border-radius:4px; 
                margin-bottom:15px; font-size:1rem; 
                letter-spacing:2px; text-transform:uppercase; 
            }

            .tt-image-container { 
                width: 180px; height: 180px; /* حجم ثابت ومناسب للمساحة */
                margin: 0 auto 20px; border-radius:20px; 
                border:3px solid #222; overflow:hidden; position:relative;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                transform: rotate(-2deg);
            }

            .tt-text-card { 
                background: #111; 
                padding: 30px 40px; 
                border-radius:20px; 
                border: 1px solid #222; 
                position:relative; 
                box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
                width: 100%;
            }

            .tt-quote { 
                font-size: 2.5rem; /* تم تصغير الخط ليناسب الفريم */
                line-height: 1.3; 
                font-weight: 900; 
                color:#fff; 
                margin:0; 
                text-align:center;
            }
            
            .sh-sound { color: #e74c3c; text-decoration: underline; }
            .s-sound { color: #c5a059; }

            .tt-instruction { 
                margin-top:20px; 
                color:#666; 
                font-size:0.9rem; 
                letter-spacing:2px; 
                font-weight:bold; 
                text-align:center;
            }
            
            /* تحسينات للشاشات الصغيرة أو الفريمات الضيقة */
            @media (max-height: 600px) {
                .tt-quote { font-size: 1.8rem; }
                .tt-image-container { width: 120px; height: 120px; margin-bottom: 10px; }
                .tt-text-card { padding: 20px; }
            }

            @keyframes bounceIn {
                from { opacity:0; transform: scale(0.9) translateY(20px); }
                to { opacity:1; transform: scale(1) translateY(0); }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">Challenger #${ttNumber}</div>
            
            <div class="tt-image-container">
                <img src="data/t-t/${ttNumber}.png" onerror="this.src='https://via.placeholder.com/400?text=Twister'" style="width:100%; height:100%; object-fit:cover;">
            </div>

            <div class="tt-text-card">
                <p class="tt-quote">${highlightedSentence}</p>
            </div>

            <div class="tt-instruction">
                ⚡ REPEAT 3 TIMES AS FAST AS YOU CAN ⚡
            </div>
        </div>
    `;

    // إضافة تفاعل عند الضغط
    document.onkeydown = (e) => {
        if (e.keyCode === 32) { // Space
            if(window.triggerVetoDone) window.triggerVetoDone();
        }
    };
})();
