(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration (WOLF Automated Update) ---
    const ttNumber = 38; 
    const ttSentence = "Fuzzy Wuzzy was a bear, Fuzzy Wuzzy had no hair, Fuzzy Wuzzy wasn’t fuzzy, was he?!";
    
    // WOLF Fix: سحب الصورة رقم 38 من مسار GitHub المعتمد
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
            radial-gradient(at 10% 10%, rgba(255, 255, 0, 0.15) 0px, transparent 50%),
            radial-gradient(at 90% 90%, rgba(0, 191, 255, 0.1) 0px, transparent 50%);
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

    // WOLF Logic: تلوين أصوات الـ Z والـ W لهذه الجملة الدبية الشهيرة
    const highlightedSentence = ttSentence.replace(/z|w/gi, (matched) => {
        if (matched.toLowerCase() === 'z') {
            return `<span class="z-sound">${matched}</span>`;
        }
        return `<span class="w-sound">${matched}</span>`;
    });

    container.innerHTML = `
        <style>
            .tt-wrapper { 
                width:95%; 
                max-width:1150px; 
                display: flex;
                flex-direction: column;
                align-items: center;
                animation: fuzzyPop 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
            }
            
            .tt-badge { 
                background: linear-gradient(45deg, #ffff00, #00bfff);
                color:#000;
                display:inline-block; 
                padding:12px 50px;
                font-weight:900;
                border-radius:30px; 
                margin-bottom:30px;
                font-size:1.1rem; 
                letter-spacing:5px;
                text-transform:uppercase; 
                box-shadow: 0 10px 30px rgba(255, 255, 0, 0.3);
            }

            .tt-main-card {
                display: flex;
                flex-direction: row;
                align-items: center;
                background: rgba(255, 255, 255, 0.03);
                backdrop-filter: blur(35px);
                border: 1px solid rgba(255, 255, 0, 0.2);
                border-radius: 50px;
                padding: 60px;
                width: 100%;
                box-shadow: 0 50px 100px rgba(0,0,0,0.8);
                gap: 50px;
                position: relative;
            }

            .tt-text-section { 
                flex: 1.4;
                text-align: left;
            }

            .tt-quote { 
                font-size: 2.8rem; 
                line-height: 1.2; 
                font-weight: 900; 
                color:#fff; 
                margin:0 0 25px 0;
            }
            
            /* ألوان الأصوات المستهدفة للجملة 38 */
            .z-sound { color: #ffff00; text-shadow: 0 0 20px rgba(255, 255, 0, 0.9); }
            .w-sound { color: #00bfff; text-shadow: 0 0 20px rgba(0, 191, 255, 0.9); }

            .tt-instruction { 
                color:#ffff00; 
                font-size:1.4rem; 
                font-weight:800; 
                text-transform: uppercase;
                background: rgba(255, 255, 0, 0.1);
                padding: 15px 40px;
                border-radius: 50px;
                display: inline-block;
                border: 2px dashed #ffff00;
            }

            .tt-image-container { 
                flex: 0.6;
                width: 300px;
                height: 300px; 
                border-radius: 40px; 
                border: 3px solid #ffff00;
                overflow: hidden;
                box-shadow: 0 20px 50px rgba(0,0,0,0.7);
                animation: fuzzyShake 3s infinite ease-in-out;
            }

            @keyframes fuzzyShake {
                0%, 100% { transform: rotate(0deg) scale(1); }
                50% { transform: rotate(3deg) scale(1.05); }
            }

            @keyframes fuzzyPop {
                from { opacity:0; transform: scale(0.5) translateY(100px); }
                to { opacity:1; transform: scale(1) translateY(0); }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">Tongue Twister #${ttNumber}</div>
            
            <div class="tt-main-card">
                <div class="tt-text-section">
                    <p class="tt-quote">${highlightedSentence}</p>
                    <p class="tt-instruction">
                        🐻 WAS HE FUZZY?! (3x) 🐻
                    </p>
                </div>

                <div class="tt-image-container">
                    <img src="${imageUrl}" onerror="this.src='https://via.placeholder.com/400/160033/ffffff?text=FUZZY+BEAR'" style="width:100%; height:100%; object-fit:cover;">
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
