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
        background: radial-gradient(circle at center, #1a1a2e 0%, #0a0a0a 100%); 
        color:#fff; 
        overflow:hidden; 
        font-family: 'Poppins', 'Segoe UI', sans-serif;
        padding: 20px;
    `;

    const highlightedSentence = ttSentence.replace(/sh|s/gi, (matched) => {
        if (matched.toLowerCase() === 'sh') {
            return `<span class="sh-sound">${matched}</span>`;
        }
        return `<span class="s-sound">${matched}</span>`;
    });

    container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&display=swap');

            .tt-wrapper { 
                width:95%; 
                max-width:800px; 
                display: flex;
                flex-direction: column;
                align-items: center;
                animation: slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1); 
            }
            
            .tt-badge { 
                background: linear-gradient(90deg, #ff0080, #7928ca);
                color:#fff; 
                display:inline-block; 
                padding:8px 30px; 
                font-weight:900; 
                border-radius:50px; 
                margin-bottom:30px; 
                font-size:0.9rem; 
                letter-spacing:2px; 
                text-transform:uppercase; 
                box-shadow: 0 10px 20px rgba(121, 40, 202, 0.3);
            }

            .tt-image-container { 
                width: 180px; height: 180px; 
                margin: 0 auto 30px; 
                border-radius:50%; 
                padding: 10px;
                background: rgba(255,255,255,0.05);
                border: 2px dashed rgba(255,255,255,0.2);
                position:relative;
                transition: transform 0.3s ease;
            }
            .tt-image-container:hover { transform: rotate(5deg) scale(1.05); }

            .tt-image-container img {
                width:100%; height:100%; object-fit:cover; border-radius:50%;
            }

            .tt-text-card { 
                background: rgba(255, 255, 255, 0.03); 
                backdrop-filter: blur(15px);
                padding: 50px 40px; 
                border-radius:30px; 
                border: 1px solid rgba(255, 255, 255, 0.1); 
                position:relative; 
                box-shadow: 0 25px 50px rgba(0,0,0,0.3);
                width: 100%;
                text-align: center;
            }

            .tt-quote { 
                font-size: 2.5rem; 
                line-height: 1.3; 
                font-weight: 700; 
                color:#ffffff; 
                margin:0; 
                text-shadow: 0 5px 15px rgba(0,0,0,0.5);
            }
            
            .sh-sound { color: #00f2fe; text-shadow: 0 0 10px rgba(0, 242, 254, 0.5); }
            .s-sound { color: #f9d423; text-shadow: 0 0 10px rgba(249, 212, 35, 0.5); }

            .tt-instruction { 
                margin-top:35px; 
                color: rgba(255,255,255,0.5); 
                font-size:0.85rem; 
                letter-spacing:4px; 
                font-weight:bold; 
                text-transform: uppercase;
                animation: pulse 2s infinite;
            }
            
            /* Mobile Optimization */
            @media (max-width: 600px) {
                .tt-quote { font-size: 1.8rem; }
                .tt-image-container { width: 130px; height: 130px; }
                .tt-text-card { padding: 30px 20px; }
                .tt-badge { font-size: 0.7rem; padding: 6px 20px; }
            }

            @keyframes slideUp {
                from { opacity:0; transform: translateY(40px); }
                to { opacity:1; transform: translateY(0); }
            }

            @keyframes pulse {
                0% { opacity: 0.4; }
                50% { opacity: 1; }
                100% { opacity: 0.4; }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">Level #${ttNumber} ✨</div>
            
            <div class="tt-image-container">
                <img src="data/t-t/${ttNumber}.png" onerror="this.src='https://via.placeholder.com/400?text=FUN+TIME'" alt="Twister Image">
            </div>

            <div class="tt-text-card">
                <p class="tt-quote">${highlightedSentence}</p>
            </div>

            <div class="tt-instruction">
                ⚡ Repeat 3 times • Speak Fast ⚡
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
