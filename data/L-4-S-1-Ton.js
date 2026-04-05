(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration (WOLF Automated Update) ---
    const ttNumber = 6; 
    const ttSentence = "Red lorry, Yellow lorry";
    
    // WOLF Fix: سحب الصورة رقم 6 تلقائياً من المسار المحدد
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

    // WOLF Logic: تلوين الحروف المهمة (R و L) لتناسب المعنى بصرياً
    const highlightedSentence = ttSentence.replace(/r|l/gi, (matched) => {
        if (matched.toLowerCase() === 'r') {
            return `<span class="r-sound">${matched}</span>`;
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
                animation: slideIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55); 
            }
            
            .tt-badge { 
                background: linear-gradient(45deg, #ff0000, #ffff00);
                color:#000;
                display:inline-block; 
                padding:8px 35px;
                font-weight:900;
                border-radius:50px; 
                margin-bottom:30px;
                font-size:1.1rem; 
                letter-spacing:2px;
                text-transform:uppercase; 
                box-shadow: 0 0 25px rgba(255, 0, 0, 0.5);
            }

            .tt-main-card {
                display: flex;
                flex-direction: row;
                align-items: center;
                background: rgba(255, 255, 255, 0.04);
                backdrop-filter: blur(25px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 40px;
                padding: 60px;
                width: 100%;
                box-shadow: 0 50px 100px rgba(0,0,0,0.6);
                gap: 50px;
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
                letter-spacing: -2px;
            }
            
            /* ألوان الأصوات المستهدفة للجملة 6 */
            .r-sound { color: #ff3333; text-shadow: 0 0 20px rgba(255, 51, 51, 0.8); }
            .l-sound { color: #ffff00; text-shadow: 0 0 20px rgba(255, 255, 0, 0.8); }

            .tt-instruction { 
                color:#fff; 
                font-size:1.2rem; 
                font-weight:700; 
                background: rgba(255, 255, 255, 0.1);
                padding: 15px 30px;
                border-radius: 20px;
                display: inline-block;
                border: 1px dashed #ffff00;
            }

            .tt-image-container { 
                width: 400px;
                height: 300px; 
                border-radius: 30px; 
                border: 4px solid rgba(255,255,255,0.05);
                overflow: hidden;
                box-shadow: 0 30px 60px rgba(0,0,0,0.8);
            }

            @keyframes slideIn {
                from { opacity:0; transform: translateY(100px); }
                to { opacity:1; transform: translateY(0); }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">Tongue Twister #${ttNumber}</div>
            
            <div class="tt-main-card">
                <div class="tt-text-section">
                    <p class="tt-quote">${highlightedSentence}</p>
                    <p class="tt-instruction">
                        🚛 R or L? Don't mix them! (3x) 🚛
                    </p>
                </div>

                <div class="tt-image-container">
                    <img src="${imageUrl}" onerror="this.src='https://via.placeholder.com/400/160033/ffffff?text=LORRIES'" style="width:100%; height:100%; object-fit:cover;">
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
