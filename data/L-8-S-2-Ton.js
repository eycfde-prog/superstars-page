(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration (WOLF Automated Update) ---
    const ttNumber = 23; 
    const ttSentence = "Which wristwatches are Swiss wristwatches?";
    
    // WOLF Fix: سحب الصورة رقم 23 من مسار GitHub المعتمد
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
            radial-gradient(at 10% 10%, rgba(212, 175, 55, 0.15) 0px, transparent 50%),
            radial-gradient(at 90% 90%, rgba(192, 192, 192, 0.1) 0px, transparent 50%);
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

    // WOLF Logic: تلوين أصوات الـ W والـ S لهذه الجملة السويسرية الدقيقة
    const highlightedSentence = ttSentence.replace(/w|s/gi, (matched) => {
        if (matched.toLowerCase() === 'w') {
            return `<span class="w-sound">${matched}</span>`;
        }
        return `<span class="s-sound">${matched}</span>`;
    });

    container.innerHTML = `
        <style>
            .tt-wrapper { 
                width:95%; 
                max-width:1100px; 
                display: flex;
                flex-direction: column;
                align-items: center;
                animation: watchRotate 1s cubic-bezier(0.34, 1.56, 0.64, 1); 
            }
            
            .tt-badge { 
                background: linear-gradient(45deg, #d4af37, #c0c0c0);
                color:#000;
                display:inline-block; 
                padding:10px 45px;
                font-weight:900;
                border-radius:5px; 
                margin-bottom:30px;
                font-size:1.1rem; 
                letter-spacing:6px;
                text-transform:uppercase; 
                box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
                border: 1px solid #000;
            }

            .tt-main-card {
                display: flex;
                flex-direction: row;
                align-items: center;
                background: rgba(255, 255, 255, 0.02);
                backdrop-filter: blur(40px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 20px;
                padding: 60px;
                width: 100%;
                box-shadow: 0 60px 120px rgba(0,0,0,0.8);
                gap: 50px;
                position: relative;
            }

            .tt-text-section { 
                flex: 1;
                text-align: left;
            }

            .tt-quote { 
                font-size: 3.6rem; 
                line-height: 1.1; 
                font-weight: 900; 
                color:#fff; 
                margin:0 0 25px 0;
            }
            
            /* ألوان الأصوات المستهدفة للجملة 23 */
            .w-sound { color: #d4af37; text-shadow: 0 0 25px rgba(212, 175, 55, 0.8); }
            .s-sound { color: #c0c0c0; text-shadow: 0 0 25px rgba(192, 192, 192, 0.8); }

            .tt-instruction { 
                color:#d4af37; 
                font-size:1.4rem; 
                font-weight:800; 
                text-transform: uppercase;
                background: rgba(255, 255, 255, 0.05);
                padding: 12px 35px;
                border-radius: 0;
                display: inline-block;
                border: 2px solid #d4af37;
                letter-spacing: 2px;
            }

            .tt-image-container { 
                width: 380px;
                height: 380px; 
                border-radius: 20px; 
                border: 1px solid rgba(212, 175, 55, 0.4);
                overflow: hidden;
                box-shadow: 0 30px 60px rgba(0,0,0,0.9);
                transform: rotate(2deg);
            }

            @keyframes watchRotate {
                from { opacity:0; transform: scale(0.8) rotate(-15deg); }
                to { opacity:1; transform: scale(1) rotate(2deg); }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">Tongue Twister #${ttNumber}</div>
            
            <div class="tt-main-card">
                <div class="tt-text-section">
                    <p class="tt-quote">${highlightedSentence}</p>
                    <p class="tt-instruction">
                        ⌚ PRECISION CHALLENGE! (3x) ⌚
                    </p>
                </div>

                <div class="tt-image-container">
                    <img src="${imageUrl}" onerror="this.src='https://via.placeholder.com/400/160033/ffffff?text=SWISS+WATCHES'" style="width:100%; height:100%; object-fit:cover;">
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
