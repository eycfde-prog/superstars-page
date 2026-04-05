(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration (WOLF Automated Update) ---
    const ttNumber = 25; 
    const ttSentence = "Green glass globes glow greenly.";
    
    // WOLF Fix: سحب الصورة رقم 25 من مسار GitHub المعتمد
 const cacheBuster = new Date().getTime();
    const imageUrl = `https://raw.githubusercontent.com/eycfde-prog/EYCVetoProgram/main/data/tt/${ttNumber}.png?v=${cacheBuster}`; 
    container.innerHTML = ''; 
    container.style.cssText = `
        height:100%; 
        width:100%; 
        display:flex; 
        flex-direction:column; 
        align-items:center; 
        justify-content:center; 
        background-color: #0c001c;
        background-image: 
            radial-gradient(at 10% 10%, rgba(0, 255, 127, 0.2) 0px, transparent 50%),
            radial-gradient(at 90% 90%, rgba(255, 255, 255, 0.05) 0px, transparent 50%);
        color:#fff; 
        overflow:hidden; 
        font-family: 'Poppins', 'Segoe UI', sans-serif;
        padding: 20px;
    `;

    if (!document.getElementById('glassy-fonts')) {
        const link = document.createElement('link');
        link.id = 'glassy-fonts';
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800;900&display=swap';
        document.head.appendChild(link);
    }

    // WOLF Logic: تلوين أصوات الـ G والـ L لهذه الجملة "المضيئة"
    const highlightedSentence = ttSentence.replace(/g|l/gi, (matched) => {
        if (matched.toLowerCase() === 'g') {
            return `<span class="g-sound">${matched}</span>`;
        }
        return `<span class="l-sound">${matched}</span>`;
    });

    container.innerHTML = `
        <style>
            .tt-wrapper { 
                width:95%; 
                max-width:1100px; 
                display: flex;
                flex-direction: column;
                align-items: center;
                animation: glowIn 1.2s ease-out; 
            }
            
            .tt-badge { 
                background: linear-gradient(45deg, #00ff7f, #ffffff);
                color:#000;
                display:inline-block; 
                padding:12px 50px;
                font-weight:900;
                border-radius:0; 
                margin-bottom:30px;
                font-size:1.1rem; 
                letter-spacing:6px;
                text-transform:uppercase; 
                box-shadow: 0 0 30px rgba(0, 255, 127, 0.5);
                border: 1px solid #00ff7f;
            }

            .tt-main-card {
                display: flex;
                flex-direction: row;
                align-items: center;
                background: rgba(0, 255, 127, 0.02);
                backdrop-filter: blur(40px);
                border: 1px solid rgba(0, 255, 127, 0.2);
                border-radius: 40px;
                padding: 60px;
                width: 100%;
                box-shadow: 0 40px 120px rgba(0,0,0,0.9);
                gap: 50px;
                position: relative;
            }

            .tt-text-section { 
                flex: 1;
                text-align: left;
            }

            .tt-quote { 
                font-size: 4rem; 
                line-height: 1.1; 
                font-weight: 900; 
                color:#fff; 
                margin:0 0 25px 0;
            }
            
            /* ألوان الأصوات المستهدفة للجملة 25 */
            .g-sound { color: #00ff7f; text-shadow: 0 0 30px rgba(0, 255, 127, 0.9); }
            .l-sound { color: #ffffff; text-shadow: 0 0 20px rgba(255, 255, 255, 0.6); }

            .tt-instruction { 
                color:#00ff7f; 
                font-size:1.4rem; 
                font-weight:800; 
                text-transform: uppercase;
                background: rgba(0, 0, 0, 0.3);
                padding: 12px 35px;
                border-radius: 4px;
                display: inline-block;
                border-bottom: 4px solid #00ff7f;
                letter-spacing: 2px;
            }

            .tt-image-container { 
                width: 380px;
                height: 380px; 
                border-radius: 50%; 
                border: 2px solid #00ff7f;
                overflow: hidden;
                box-shadow: inset 0 0 50px rgba(0, 255, 127, 0.3), 0 0 40px rgba(0, 255, 127, 0.2);
                animation: pulseGlow 3s infinite ease-in-out;
            }

            @keyframes pulseGlow {
                0%, 100% { opacity: 0.8; filter: brightness(1); }
                50% { opacity: 1; filter: brightness(1.3); }
            }

            @keyframes glowIn {
                from { opacity:0; filter: blur(20px); transform: scale(1.1); }
                to { opacity:1; filter: blur(0); transform: scale(1); }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">Tongue Twister #${ttNumber}</div>
            
            <div class="tt-main-card">
                <div class="tt-text-section">
                    <p class="tt-quote">${highlightedSentence}</p>
                    <p class="tt-instruction">
                        🧪 THE GLOW CHALLENGE! (3x) 🧪
                    </p>
                </div>

                <div class="tt-image-container">
                    <img src="${imageUrl}" onerror="this.src='https://via.placeholder.com/400/160033/ffffff?text=GREEN+GLOBES'" style="width:100%; height:100%; object-fit:cover;">
                </div>
            </div>
        </div>
    `;

    document.onkeydown = (e) => {
        if (e.code === "Space") { 
            e.preventDefault();
            if(window.triggerVetoDone) window.triggerVetoDone();
        }
    };
})();
