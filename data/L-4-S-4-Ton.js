(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration (WOLF Automated Update) ---
    const ttNumber = 9; 
    const ttSentence = "A snake sneaks to seek a snack.";
    
    // WOLF Fix: سحب الصورة رقم 9 تلقائياً من المسار المحدد
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
            radial-gradient(at 10% 10%, rgba(0, 255, 127, 0.1) 0px, transparent 50%),
            radial-gradient(at 90% 90%, rgba(255, 255, 0, 0.1) 0px, transparent 50%);
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

    // WOLF Logic: تلوين الأصوات المستهدفة (S و K) لهذه الجملة
    const highlightedSentence = ttSentence.replace(/s|k/gi, (matched) => {
        if (matched.toLowerCase() === 's') {
            return `<span class="s-sound">${matched}</span>`;
        }
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
                animation: snakeIn 1s cubic-bezier(0.19, 1, 0.22, 1); 
            }
            
            .tt-badge { 
                background: linear-gradient(45deg, #00ff7f, #ffff00);
                color:#000;
                display:inline-block; 
                padding:8px 40px;
                font-weight:900;
                border-radius:0 20px 0 20px; 
                margin-bottom:30px;
                font-size:1.1rem; 
                letter-spacing:3px;
                text-transform:uppercase; 
                box-shadow: 0 10px 20px rgba(0, 255, 127, 0.3);
            }

            .tt-main-card {
                display: flex;
                flex-direction: row;
                align-items: center;
                background: rgba(255, 255, 255, 0.03);
                backdrop-filter: blur(25px);
                border-left: 10px solid #00ff7f;
                border-radius: 40px;
                padding: 60px;
                width: 100%;
                box-shadow: 0 40px 100px rgba(0,0,0,0.6);
                gap: 50px;
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
            
            /* ألوان الأصوات المستهدفة للجملة 9 */
            .s-sound { color: #00ff7f; text-shadow: 0 0 25px rgba(0, 255, 127, 0.8); }
            .k-sound { color: #ffff00; text-shadow: 0 0 25px rgba(255, 255, 0, 0.8); }

            .tt-instruction { 
                color:#ccc; 
                font-size:1.3rem; 
                font-weight:600; 
                font-style: italic;
                letter-spacing: 1px;
            }

            .tt-image-container { 
                width: 360px;
                height: 360px; 
                border-radius: 50% 50% 0 50%; 
                border: 3px solid #00ff7f;
                overflow: hidden;
                box-shadow: 0 20px 50px rgba(0, 255, 127, 0.2);
            }

            @keyframes snakeIn {
                from { opacity:0; transform: translateX(100px) skewX(-10deg); }
                to { opacity:1; transform: translateX(0) skewX(0); }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">Tongue Twister #${ttNumber}</div>
            
            <div class="tt-main-card">
                <div class="tt-text-section">
                    <p class="tt-quote">${highlightedSentence}</p>
                    <p class="tt-instruction">
                        🐍 Don't let your tongue slip! (3x) 🐍
                    </p>
                </div>

                <div class="tt-image-container">
                    <img src="${imageUrl}" onerror="this.src='https://via.placeholder.com/400/160033/ffffff?text=SNAKE+SNACK'" style="width:100%; height:100%; object-fit:cover;">
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
