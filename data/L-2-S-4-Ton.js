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
            .tt-wrapper { width:90%; max-width:1100px; text-align:center; animation: bounceIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
            
            .tt-badge { 
                background:#c5a059; color:#000; display:inline-block; padding:8px 30px; 
                font-weight:900; border-radius:4px; margin-bottom:30px; font-size:1.1vw; 
                letter-spacing:4px; text-transform:uppercase; 
            }

            .tt-image-container { 
                width:22vw; height:22vw; margin: 0 auto 40px; border-radius:30px; 
                border:4px solid #222; overflow:hidden; position:relative;
                box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                transform: rotate(-2deg);
            }

            .tt-text-card { 
                background: #111; padding:60px; border-radius:30px; 
                border: 1px solid #222; position:relative; box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
            }

            .tt-quote { font-size:4vw; line-height:1.2; font-weight:900; color:#fff; margin:0; }
            
            /* تمييز الأصوات */
            .sh-sound { color: #e74c3c; text-decoration: underline; } /* الأحمر لصوت SH */
            .s-sound { color: #c5a059; } /* الذهبي لصوت S */

            .tt-instruction { margin-top:40px; color:#444; font-size:1.2vw; letter-spacing:2px; font-weight:bold; }
            
            @keyframes bounceIn {
                from { opacity:0; transform: scale(0.9) translateY(20px); }
                to { opacity:1; transform: scale(1) translateY(0); }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">Tongue Twister Challenger #${ttNumber}</div>
            
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
