(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration (WOLF Automated Update) ---
    const ttNumber = 27; 
    const ttSentence = "You scream, I scream, we all scream for ice cream.";
    
    // WOLF Fix: سحب الصورة رقم 27 من مسار GitHub المعتمد
const imageUrl = `https://raw.githubusercontent.com/eycfde-prog/EYCVetoProgram/271fa92ff48f501cfa46f4ee87b9cae57aef453f/data/tt/${ttNumber}.png`;    // ----------------------------------------------

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
            radial-gradient(at 10% 10%, rgba(255, 105, 180, 0.2) 0px, transparent 50%),
            radial-gradient(at 90% 90%, rgba(0, 255, 242, 0.15) 0px, transparent 50%);
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

    // WOLF Logic: تلوين أصوات الـ S والـ CR للتمييز بين الصرخة والآيس كريم
    const highlightedSentence = ttSentence.replace(/s|cr/gi, (matched) => {
        if (matched.toLowerCase() === 's') {
            return `<span class="s-sound">${matched}</span>`;
        }
        return `<span class="cr-sound">${matched}</span>`;
    });

    container.innerHTML = `
        <style>
            .tt-wrapper { 
                width:95%; 
                max-width:1100px; 
                display: flex;
                flex-direction: column;
                align-items: center;
                animation: meltIn 1s cubic-bezier(0.19, 1, 0.22, 1); 
            }
            
            .tt-badge { 
                background: linear-gradient(45deg, #ff69b4, #00fff2);
                color:#000;
                display:inline-block; 
                padding:12px 50px;
                font-weight:900;
                border-radius:30px; 
                margin-bottom:30px;
                font-size:1.1rem; 
                letter-spacing:5px;
                text-transform:uppercase; 
                box-shadow: 0 0 25px rgba(255, 105, 180, 0.4);
            }

            .tt-main-card {
                display: flex;
                flex-direction: row;
                align-items: center;
                background: rgba(255, 255, 255, 0.03);
                backdrop-filter: blur(30px);
                border: 2px solid rgba(255, 255, 255, 0.1);
                border-radius: 50px;
                padding: 60px;
                width: 100%;
                box-shadow: 0 40px 100px rgba(0,0,0,0.8);
                gap: 50px;
                position: relative;
                overflow: hidden;
            }

            .tt-text-section { 
                flex: 1;
                text-align: left;
            }

            .tt-quote { 
                font-size: 3.5rem; 
                line-height: 1.2; 
                font-weight: 900; 
                color:#fff; 
                margin:0 0 25px 0;
            }
            
            /* ألوان الأصوات المستهدفة للجملة 27 */
            .s-sound { color: #ff69b4; text-shadow: 0 0 25px rgba(255, 105, 180, 0.9); }
            .cr-sound { color: #00fff2; text-shadow: 0 0 25px rgba(0, 255, 242, 0.9); }

            .tt-instruction { 
                color:#fff; 
                font-size:1.4rem; 
                font-weight:800; 
                text-transform: uppercase;
                background: rgba(255, 105, 180, 0.15);
                padding: 12px 35px;
                border-radius: 10px;
                display: inline-block;
                border-left: 6px solid #ff69b4;
            }

            .tt-image-container { 
                width: 380px;
                height: 380px; 
                border-radius: 40px; 
                border: 3px solid rgba(255, 255, 255, 0.2);
                overflow: hidden;
                box-shadow: 0 25px 50px rgba(0,0,0,0.7);
            }

            @keyframes meltIn {
                from { opacity:0; transform: translateY(-50px) scale(1.1); filter: blur(10px); }
                to { opacity:1; transform: translateY(0) scale(1); filter: blur(0); }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">Tongue Twister #${ttNumber}</div>
            
            <div class="tt-main-card">
                <div class="tt-text-section">
                    <p class="tt-quote">${highlightedSentence}</p>
                    <p class="tt-instruction">
                        🍦 I SCREAM vs ICE CREAM! (3x) 🍦
                    </p>
                </div>

                <div class="tt-image-container">
                    <img src="${imageUrl}" onerror="this.src='https://via.placeholder.com/400/160033/ffffff?text=ICE+CREAM'" style="width:100%; height:100%; object-fit:cover;">
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
