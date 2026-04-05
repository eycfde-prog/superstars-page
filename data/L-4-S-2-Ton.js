(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration (WOLF Automated Update) ---
    const ttNumber = 7; 
    const ttSentence = "Thin sticks, thick bricks.";
    
    // WOLF Fix: سحب الصورة رقم 7 تلقائياً من المسار المحدد
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
            radial-gradient(at 10% 10%, rgba(122, 69, 212, 0.2) 0px, transparent 50%),
            radial-gradient(at 90% 90%, rgba(210, 69, 166, 0.15) 0px, transparent 50%);
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

    // WOLF Logic: تلوين الأصوات المستهدفة (TH و S/CK)
    const highlightedSentence = ttSentence.replace(/th|s|ck/gi, (matched) => {
        if (matched.toLowerCase() === 'th') {
            return `<span class="th-sound">${matched}</span>`;
        }
        return `<span class="s-ck-sound">${matched}</span>`;
    });

    container.innerHTML = `
        <style>
            .tt-wrapper { 
                width:95%; 
                max-width:1100px; 
                display: flex;
                flex-direction: column;
                align-items: center;
                animation: zoomIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
            }
            
            .tt-badge { 
                background: linear-gradient(45deg, #7a45d4, #00fff2);
                color:#fff;
                display:inline-block; 
                padding:8px 35px;
                font-weight:900;
                border-radius:50px; 
                margin-bottom:30px;
                font-size:1.1rem; 
                letter-spacing:3px;
                text-transform:uppercase; 
                box-shadow: 0 0 20px rgba(122, 69, 212, 0.5);
            }

            .tt-main-card {
                display: flex;
                flex-direction: row;
                align-items: center;
                background: rgba(255, 255, 255, 0.03);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 40px;
                padding: 60px;
                width: 100%;
                box-shadow: 0 40px 80px rgba(0,0,0,0.6);
                gap: 50px;
                border-right: 8px solid #00fff2;
            }

            .tt-text-section { 
                flex: 1;
                text-align: left;
            }

            .tt-quote { 
                font-size: 4.2rem; 
                line-height: 1.1; 
                font-weight: 900; 
                color:#fff; 
                margin:0 0 25px 0;
            }
            
            /* ألوان الأصوات المستهدفة للجملة 7 */
            .th-sound { color: #ffff00; text-shadow: 0 0 20px rgba(255, 255, 0, 0.8); }
            .s-ck-sound { color: #ff00cc; text-shadow: 0 0 20px rgba(255, 0, 204, 0.8); }

            .tt-instruction { 
                color:#fff; 
                font-size:1.2rem; 
                font-weight:700; 
                background: rgba(255, 0, 204, 0.15);
                padding: 12px 25px;
                border-radius: 12px;
                display: inline-block;
                border: 1px solid rgba(255, 0, 204, 0.3);
            }

            .tt-image-container { 
                width: 350px;
                height: 350px; 
                border-radius: 20px; 
                border: 3px solid rgba(255,255,255,0.05);
                overflow: hidden;
                box-shadow: 0 25px 50px rgba(0,0,0,0.7);
                transform: rotate(2deg);
            }

            @keyframes zoomIn {
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
                        🧱 Hard mode: 3 times fast! 🧱
                    </p>
                </div>

                <div class="tt-image-container">
                    <img src="${imageUrl}" onerror="this.src='https://via.placeholder.com/400/160033/ffffff?text=BRICKS'" style="width:100%; height:100%; object-fit:cover;">
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
