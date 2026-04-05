(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration (WOLF Automated Update) ---
    const ttNumber = 14; 
    const ttSentence = "The blue bluebird blinks.";
    
    // WOLF Fix: سحب الصورة رقم 14 من مسار GitHub المعتمد
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
            radial-gradient(at 10% 10%, rgba(0, 102, 255, 0.2) 0px, transparent 50%),
            radial-gradient(at 90% 90%, rgba(0, 255, 242, 0.1) 0px, transparent 50%);
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

    // WOLF Logic: تلوين أصوات الـ B والـ L لهذه الجملة الزرقاء
    const highlightedSentence = ttSentence.replace(/b|l/gi, (matched) => {
        if (matched.toLowerCase() === 'b') {
            return `<span class="b-sound">${matched}</span>`;
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
                animation: blinkIn 1s cubic-bezier(0.68, -0.55, 0.265, 1.55); 
            }
            
            .tt-badge { 
                background: linear-gradient(45deg, #0066ff, #00fff2);
                color:#fff;
                display:inline-block; 
                padding:10px 45px;
                font-weight:900;
                border-radius:50px; 
                margin-bottom:30px;
                font-size:1.1rem; 
                letter-spacing:3px;
                text-transform:uppercase; 
                box-shadow: 0 0 25px rgba(0, 102, 255, 0.6);
            }

            .tt-main-card {
                display: flex;
                flex-direction: row;
                align-items: center;
                background: rgba(255, 255, 255, 0.03);
                backdrop-filter: blur(25px);
                border: 2px solid rgba(0, 102, 255, 0.2);
                border-radius: 40px;
                padding: 60px;
                width: 100%;
                box-shadow: 0 40px 100px rgba(0,0,0,0.7);
                gap: 50px;
                position: relative;
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
            }
            
            /* ألوان الأصوات المستهدفة للجملة 14 */
            .b-sound { color: #0066ff; text-shadow: 0 0 25px rgba(0, 102, 255, 0.9); }
            .l-sound { color: #00fff2; text-shadow: 0 0 25px rgba(0, 255, 242, 0.9); }

            .tt-instruction { 
                color:#00fff2; 
                font-size:1.3rem; 
                font-weight:800; 
                text-transform: uppercase;
                background: rgba(0, 102, 255, 0.1);
                padding: 12px 30px;
                border-radius: 15px;
                display: inline-block;
                border-bottom: 3px solid #00fff2;
                animation: blinkEffect 2s infinite;
            }

            @keyframes blinkEffect {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }

            .tt-image-container { 
                width: 380px;
                height: 380px; 
                border-radius: 50%; 
                border: 4px solid #0066ff;
                overflow: hidden;
                box-shadow: 0 0 50px rgba(0, 102, 255, 0.3);
            }

            @keyframes blinkIn {
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
                        🐦 Don't Blink! (3x) 🐦
                    </p>
                </div>

                <div class="tt-image-container">
                    <img src="${imageUrl}" onerror="this.src='https://via.placeholder.com/400/160033/ffffff?text=BLUEBIRD'" style="width:100%; height:100%; object-fit:cover;">
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
