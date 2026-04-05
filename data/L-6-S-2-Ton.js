(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration (WOLF Automated Update) ---
    const ttNumber = 15; 
    const ttSentence = "Fuzzy wasps and busy bees.";
    
    // WOLF Fix: سحب الصورة رقم 15 من مسار GitHub المعتمد
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
            radial-gradient(at 10% 10%, rgba(255, 255, 0, 0.1) 0px, transparent 50%),
            radial-gradient(at 90% 90%, rgba(255, 165, 0, 0.1) 0px, transparent 50%);
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

    // WOLF Logic: تلوين أصوات الـ Z والـ S (أصوات الطنين)
    const highlightedSentence = ttSentence.replace(/z|s/gi, (matched) => {
        return `<span class="buzz-sound">${matched}</span>`;
    });

    container.innerHTML = `
        <style>
            .tt-wrapper { 
                width:95%; 
                max-width:1100px; 
                display: flex;
                flex-direction: column;
                align-items: center;
                animation: beeFly 0.8s ease-out; 
            }
            
            .tt-badge { 
                background: linear-gradient(45deg, #ffd700, #ff8800);
                color:#000;
                display:inline-block; 
                padding:10px 45px;
                font-weight:900;
                border-radius:15px; 
                margin-bottom:30px;
                font-size:1.1rem; 
                letter-spacing:4px;
                text-transform:uppercase; 
                box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
                border: 2px solid #000;
            }

            .tt-main-card {
                display: flex;
                flex-direction: row;
                align-items: center;
                background: rgba(255, 255, 255, 0.03);
                backdrop-filter: blur(25px);
                border: 1px solid rgba(255, 215, 0, 0.2);
                border-radius: 40px;
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
                font-size: 4.5rem; 
                line-height: 1.1; 
                font-weight: 900; 
                color:#fff; 
                margin:0 0 25px 0;
            }
            
            /* اللون المتوهج لأصوات الطنين */
            .buzz-sound { color: #ffff00; text-shadow: 0 0 25px rgba(255, 255, 0, 0.9); }

            .tt-instruction { 
                color:#fff; 
                font-size:1.3rem; 
                font-weight:800; 
                background: linear-gradient(90deg, #ffd700, transparent);
                color: #000;
                padding: 12px 30px;
                border-radius: 5px;
                display: inline-block;
                transform: skewX(-15deg);
            }

            .tt-image-container { 
                width: 380px;
                height: 380px; 
                border-radius: 40px; 
                border: 3px solid #ffd700;
                overflow: hidden;
                box-shadow: 0 20px 50px rgba(255, 215, 0, 0.2);
            }

            @keyframes beeFly {
                from { opacity:0; transform: scale(0.5) rotate(10deg); }
                to { opacity:1; transform: scale(1) rotate(0deg); }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">Tongue Twister #${ttNumber}</div>
            
            <div class="tt-main-card">
                <div class="tt-text-section">
                    <p class="tt-quote">${highlightedSentence}</p>
                    <p class="tt-instruction">
                        🐝 BUZZ IT FAST! (3x) 🐝
                    </p>
                </div>

                <div class="tt-image-container">
                    <img src="${imageUrl}" onerror="this.src='https://via.placeholder.com/400/160033/ffffff?text=BUSY+BEES'" style="width:100%; height:100%; object-fit:cover;">
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
