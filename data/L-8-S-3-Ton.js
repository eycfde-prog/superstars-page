(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration (WOLF Automated Update) ---
    const ttNumber = 24; 
    const ttSentence = "Double bubble gum, bubbles doubled.";
    
    // WOLF Fix: سحب الصورة رقم 24 من مسار GitHub المعتمد
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
            radial-gradient(at 90% 90%, rgba(191, 0, 255, 0.1) 0px, transparent 50%);
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

    // WOLF Logic: تلوين أصوات الـ B والـ D لهذه الجملة "المضاعفة"
    const highlightedSentence = ttSentence.replace(/b|d/gi, (matched) => {
        if (matched.toLowerCase() === 'b') {
            return `<span class="b-sound">${matched}</span>`;
        }
        return `<span class="d-sound">${matched}</span>`;
    });

    container.innerHTML = `
        <style>
            .tt-wrapper { 
                width:95%; 
                max-width:1100px; 
                display: flex;
                flex-direction: column;
                align-items: center;
                animation: bubblePop 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
            }
            
            .tt-badge { 
                background: linear-gradient(45deg, #ff69b4, #bf00ff);
                color:#fff;
                display:inline-block; 
                padding:10px 45px;
                font-weight:900;
                border-radius:30px; 
                margin-bottom:30px;
                font-size:1.1rem; 
                letter-spacing:4px;
                text-transform:uppercase; 
                box-shadow: 0 10px 20px rgba(255, 105, 180, 0.3);
            }

            .tt-main-card {
                display: flex;
                flex-direction: row;
                align-items: center;
                background: rgba(255, 255, 255, 0.03);
                backdrop-filter: blur(25px);
                border: 2px solid rgba(255, 105, 180, 0.2);
                border-radius: 60px;
                padding: 60px;
                width: 100%;
                box-shadow: 0 40px 100px rgba(0,0,0,0.8);
                gap: 50px;
                position: relative;
            }

            .tt-text-section { 
                flex: 1;
                text-align: left;
            }

            .tt-quote { 
                font-size: 4rem; 
                line-height: 1.2; 
                font-weight: 900; 
                color:#fff; 
                margin:0 0 25px 0;
            }
            
            /* ألوان الأصوات المستهدفة للجملة 24 */
            .b-sound { color: #ff69b4; text-shadow: 0 0 25px rgba(255, 105, 180, 0.9); }
            .d-sound { color: #bf00ff; text-shadow: 0 0 25px rgba(191, 0, 255, 0.9); }

            .tt-instruction { 
                color:#ff69b4; 
                font-size:1.4rem; 
                font-weight:800; 
                text-transform: uppercase;
                background: rgba(255, 105, 180, 0.1);
                padding: 12px 35px;
                border-radius: 50px;
                display: inline-block;
                border: 1px dashed #ff69b4;
            }

            .tt-image-container { 
                width: 380px;
                height: 380px; 
                border-radius: 50%; 
                border: 5px solid #ff69b4;
                overflow: hidden;
                box-shadow: 0 0 50px rgba(255, 105, 180, 0.4);
                animation: float 3s infinite ease-in-out;
            }

            @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-20px); }
            }

            @keyframes bubblePop {
                from { opacity:0; transform: scale(0.5); }
                to { opacity:1; transform: scale(1); }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">Tongue Twister #${ttNumber}</div>
            
            <div class="tt-main-card">
                <div class="tt-text-section">
                    <p class="tt-quote">${highlightedSentence}</p>
                    <p class="tt-instruction">
                        🫧 POP THE BUBBLE! (3x) 🫧
                    </p>
                </div>

                <div class="tt-image-container">
                    <img src="${imageUrl}" onerror="this.src='https://via.placeholder.com/400/160033/ffffff?text=BUBBLE+GUM'" style="width:100%; height:100%; object-fit:cover;">
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
