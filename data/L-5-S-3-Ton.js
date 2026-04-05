(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration (WOLF Automated Update) ---
    const ttNumber = 12; 
    const ttSentence = "Cooks cook cupcakes quickly.";
    
    // WOLF Fix: سحب الصورة رقم 12 من مسار GitHub المعتمد
    const imageUrl = `https://raw.githubusercontent.com/eycfde-prog/EYCVetoProgram/eed8fe3da193266cc21f1dc2f5264e4079306001/data/tt/${ttNumber}.png`;
    // ----------------------------------------------

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
            radial-gradient(at 10% 10%, rgba(0, 255, 242, 0.15) 0px, transparent 50%),
            radial-gradient(at 90% 90%, rgba(255, 0, 204, 0.1) 0px, transparent 50%);
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

    // WOLF Logic: تلوين الأصوات المستهدفة (C و K و Q) لأنها تعطي نفس الصوت الصعب
    const highlightedSentence = ttSentence.replace(/c|k|q/gi, (matched) => {
        return `<span class="k-sound">${matched}</span>`;
    });

    container.innerHTML = `
        <style>
            .tt-wrapper { 
                width:95%; 
                max-width:1100px; 
                display: flex;
                flex-direction: column;
                align-items: center;
                animation: cupcakeIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
            }
            
            .tt-badge { 
                background: linear-gradient(45deg, #00fff2, #ff00cc);
                color:#fff;
                display:inline-block; 
                padding:10px 45px;
                font-weight:900;
                border-radius:50px 0 50px 0; 
                margin-bottom:30px;
                font-size:1.1rem; 
                letter-spacing:3px;
                text-transform:uppercase; 
                box-shadow: 0 0 25px rgba(0, 255, 242, 0.5);
            }

            .tt-main-card {
                display: flex;
                flex-direction: row;
                align-items: center;
                background: rgba(255, 255, 255, 0.03);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 40px;
                padding: 60px;
                width: 100%;
                box-shadow: 0 40px 100px rgba(0,0,0,0.6);
                gap: 50px;
                border-bottom: 5px solid #ff00cc;
            }

            .tt-text-section { 
                flex: 1;
                text-align: left;
            }

            .tt-quote { 
                font-size: 4.8rem; 
                line-height: 1.1; 
                font-weight: 900; 
                color:#fff; 
                margin:0 0 25px 0;
                letter-spacing: -1px;
            }
            
            /* اللون الخاص بصوت الـ K */
            .k-sound { color: #00fff2; text-shadow: 0 0 25px rgba(0, 255, 242, 0.8); }

            .tt-instruction { 
                color:#ff00cc; 
                font-size:1.4rem; 
                font-weight:800; 
                text-transform: uppercase;
                background: rgba(255, 0, 204, 0.1);
                padding: 10px 25px;
                border-radius: 15px;
                display: inline-block;
                letter-spacing: 1px;
            }

            .tt-image-container { 
                width: 360px;
                height: 360px; 
                border-radius: 40px; 
                border: 3px solid rgba(255,255,255,0.05);
                overflow: hidden;
                box-shadow: 0 25px 50px rgba(0,0,0,0.7);
                transform: rotate(-3deg);
            }

            @keyframes cupcakeIn {
                from { opacity:0; transform: scale(0.8); }
                to { opacity:1; transform: scale(1); }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">Tongue Twister #${ttNumber}</div>
            
            <div class="tt-main-card">
                <div class="tt-text-section">
                    <p class="tt-quote">${highlightedSentence}</p>
                    <p class="tt-instruction">
                        🧁 Quick! Quick! Quick! (3x) 🧁
                    </p>
                </div>

                <div class="tt-image-container">
                    <img src="${imageUrl}" onerror="this.src='https://via.placeholder.com/400/160033/ffffff?text=CUPCAKES'" style="width:100%; height:100%; object-fit:cover;">
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
