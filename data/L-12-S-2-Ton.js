(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration (WOLF Automated Update) ---
    const ttNumber = 39; 
    const ttSentence = "If two witches would watch two watches which witch would watch which watch?";
    
    // WOLF Fix: سحب الصورة رقم 39 من مسار GitHub المعتمد
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
            radial-gradient(at 10% 10%, rgba(0, 255, 255, 0.15) 0px, transparent 50%),
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

    // WOLF Logic: تلوين أصوات الـ W والـ CH لفك شفرة الساحرات والساعات
    const highlightedSentence = ttSentence.replace(/w|ch/gi, (matched) => {
        if (matched.toLowerCase() === 'w') {
            return `<span class="w-sound">${matched}</span>`;
        }
        return `<span class="ch-sound">${matched}</span>`;
    });

    container.innerHTML = `
        <style>
            .tt-wrapper { 
                width:95%; 
                max-width:1150px; 
                display: flex;
                flex-direction: column;
                align-items: center;
                animation: witchSpin 1s cubic-bezier(0.68, -0.55, 0.265, 1.55); 
            }
            
            .tt-badge { 
                background: linear-gradient(45deg, #00ffff, #bf00ff);
                color:#fff;
                display:inline-block; 
                padding:12px 50px;
                font-weight:900;
                border-radius:0px; 
                margin-bottom:30px;
                font-size:1.1rem; 
                letter-spacing:6px;
                text-transform:uppercase; 
                box-shadow: 0 0 30px rgba(191, 0, 255, 0.4);
                border: 2px solid #fff;
            }

            .tt-main-card {
                display: flex;
                flex-direction: row;
                align-items: center;
                background: rgba(255, 255, 255, 0.02);
                backdrop-filter: blur(40px);
                border: 1px solid rgba(0, 255, 255, 0.2);
                border-radius: 40px;
                padding: 60px;
                width: 100%;
                box-shadow: 0 40px 120px rgba(0,0,0,0.9);
                gap: 50px;
                position: relative;
            }

            .tt-text-section { 
                flex: 1.5;
                text-align: left;
            }

            .tt-quote { 
                font-size: 2.8rem; 
                line-height: 1.2; 
                font-weight: 900; 
                color:#fff; 
                margin:0 0 25px 0;
            }
            
            /* ألوان الأصوات المستهدفة للجملة 39 */
            .w-sound { color: #00ffff; text-shadow: 0 0 20px rgba(0, 255, 255, 0.9); }
            .ch-sound { color: #bf00ff; text-shadow: 0 0 20px rgba(191, 0, 255, 0.9); }

            .tt-instruction { 
                color:#fff; 
                font-size:1.4rem; 
                font-weight:800; 
                text-transform: uppercase;
                background: linear-gradient(90deg, #bf00ff, transparent);
                padding: 15px 40px;
                border-radius: 0 50px 50px 0;
                display: inline-block;
                border-left: 8px solid #00ffff;
            }

            .tt-image-container { 
                flex: 0.5;
                width: 280px;
                height: 280px; 
                border-radius: 50%; 
                border: 2px solid #bf00ff;
                overflow: hidden;
                box-shadow: 0 0 60px rgba(191, 0, 255, 0.3);
                animation: clockRotate 10s linear infinite;
            }

            @keyframes clockRotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }

            @keyframes witchSpin {
                from { opacity:0; transform: scale(0.1) rotate(-180deg); }
                to { opacity:1; transform: scale(1) rotate(0deg); }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">Tongue Twister #${ttNumber}</div>
            
            <div class="tt-main-card">
                <div class="tt-text-section">
                    <p class="tt-quote">${highlightedSentence}</p>
                    <p class="tt-instruction">
                        🧙‍♀️ WHICH WATCH?! (3x) 🧙‍♀️
                    </p>
                </div>

                <div class="tt-image-container">
                    <img src="${imageUrl}" onerror="this.src='https://via.placeholder.com/400/160033/ffffff?text=WITCHES+WATCHING'" style="width:100%; height:100%; object-fit:cover;">
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
