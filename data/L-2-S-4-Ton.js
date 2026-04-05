(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration ---
    const ttNumber = 1; 
    const ttSentence = "She sells sea shells by the sea shore, the shells she sells are shells I'm sure.";
    // ---------------------

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#050505; color:#fff; overflow:hidden; font-family: 'Segoe UI', sans-serif;`;

    // معالجة النص لتمييز حروف S و SH بصرياً
    const highlightedSentence = ttSentence
        .replace(/sh/gi, '<span class="sh-sound">sh</span>')
        .replace(/s/gi, '<span class="s-sound">s</span>');

    container.innerHTML = `
 <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;900&display=swap');
            
            .tt-wrapper { 
                width:95%; 
                max-width:900px; 
                text-align:center; 
                animation: bounceIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                font-family: 'Outfit', sans-serif;
            }
            
            .tt-badge { 
                background: linear-gradient(135deg, #c5a059, #f9e3b4); 
                color:#000; 
                display:inline-block; 
                padding:6px 20px; 
                font-weight:900; 
                border-radius:50px; 
                margin-bottom:20px; 
                font-size: 14px;
                letter-spacing:2px; 
                text-transform:uppercase;
                box-shadow: 0 4px 15px rgba(197, 160, 89, 0.3);
            }

            .tt-image-container { 
                width:180px; height:180px; 
                margin: 0 auto 30px; 
                border-radius:40px; 
                border:3px solid #c5a059; 
                overflow:hidden; 
                position:relative;
                box-shadow: 0 15px 35px rgba(0,0,0,0.7);
                transform: rotate(-3deg);
                animation: float 3s ease-in-out infinite;
            }

            .tt-text-card { 
                background: rgba(255, 255, 255, 0.03); 
                backdrop-filter: blur(10px);
                padding:40px 20px; 
                border-radius:40px; 
                border: 1px solid rgba(255,255,255,0.1); 
                position:relative; 
                box-shadow: 0 20px 40px rgba(0,0,0,0.4);
            }

            .tt-quote { 
                font-size: clamp(1.8rem, 5vw, 3.5rem); 
                line-height:1.2; 
                font-weight:900; 
                color:#fff; 
                margin:0; 
                text-shadow: 0 5px 15px rgba(0,0,0,0.5);
            }
            
            /* تمييز الأصوات بلمسة Glassy */
            .sh-sound { color: #ff4d4d; text-shadow: 0 0 10px rgba(255, 77, 77, 0.5); text-decoration: underline wavy #ff4d4d; }
            .s-sound { color: #c5a059; text-shadow: 0 0 10px rgba(197, 160, 89, 0.5); }

            .tt-instruction { 
                margin-top:30px; 
                color:#666; 
                font-size: 12px; 
                letter-spacing:3px; 
                font-weight:bold;
                animation: blink 1.5s infinite;
            }
            
            @keyframes float {
                0%, 100% { transform: rotate(-3deg) translateY(0); }
                50% { transform: rotate(2deg) translateY(-10px); }
            }

            @keyframes blink {
                50% { opacity: 0.3; }
            }

            @keyframes bounceIn {
                from { opacity:0; transform: scale(0.8) translateY(30px); }
                to { opacity:1; transform: scale(1) translateY(0); }
            }

            /* Mobile Adjustments */
            @media (max-width: 600px) {
                .tt-image-container { width: 140px; height: 140px; margin-bottom: 20px; }
                .tt-text-card { padding: 30px 15px; border-radius: 30px; }
                .tt-badge { font-size: 10px; padding: 5px 15px; }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">🔥 Challenge #${ttNumber}</div>
            
            <div class="tt-image-container">
                <img src="data/t-t/${ttNumber}.png" onerror="this.src='https://via.placeholder.com/400?text=Twister'" style="width:100%; height:100%; object-fit:cover;">
            </div>

            <div class="tt-text-card">
                <p class="tt-quote">${highlightedSentence}</p>
            </div>

            <div class="tt-instruction">
                ⚡ REPEAT 3 TIMES AS FAST AS YOU CAN ⚡
            </div>
        </div>إضافة تفاعل عند الضغط
    document.onkeydown = (e) => {
        if (e.keyCode === 32) { // Space
            if(window.triggerVetoDone) window.triggerVetoDone();
        }
    };
})();
