
(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration (WOLF Automated Update) ---
    const ttNumber = 36; 
    const ttSentence = "I wish to wish the wish you wish to wish, but if you wish the wish the witch wishes, I won’t wish the wish you wish to wish.";
    
    // WOLF Fix: سحب الصورة رقم 36 من مسار GitHub المعتمد
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
            radial-gradient(at 10% 10%, rgba(0, 255, 255, 0.1) 0px, transparent 50%),
            radial-gradient(at 90% 90%, rgba(0, 255, 0, 0.1) 0px, transparent 50%);
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

    // WOLF Logic: تلوين صوت الـ W وكلمة Witch للتمييز بين الأمنية والسحر
    const highlightedSentence = ttSentence.replace(/wish|witch|w/gi, (matched) => {
        const lower = matched.toLowerCase();
        if (lower === 'witch') {
            return `<span class="witch-sound">${matched}</span>`;
        } else if (lower === 'wish') {
            return `<span class="wish-sound">${matched}</span>`;
        }
        return `<span class="w-letter">${matched}</span>`;
    });

    container.innerHTML = `
        <style>
            .tt-wrapper { 
                width:95%; 
                max-width:1150px; 
                display: flex;
                flex-direction: column;
                align-items: center;
                animation: wishSpiral 1s cubic-bezier(0.4, 0, 0.2, 1); 
            }
            
            .tt-badge { 
                background: linear-gradient(45deg, #00ffff, #00ff00);
                color:#000;
                display:inline-block; 
                padding:12px 50px;
                font-weight:900;
                border-radius:20px; 
                margin-bottom:30px;
                font-size:1.1rem; 
                letter-spacing:6px;
                text-transform:uppercase; 
                box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
            }

            .tt-main-card {
                display: flex;
                flex-direction: row;
                align-items: center;
                background: rgba(255, 255, 255, 0.02);
                backdrop-filter: blur(40px);
                border: 1px solid rgba(0, 255, 255, 0.1);
                border-radius: 40px;
                padding: 50px;
                width: 100%;
                box-shadow: 0 50px 100px rgba(0,0,0,0.8);
                gap: 40px;
                position: relative;
                border-top: 4px solid #00ffff;
            }

            .tt-text-section { 
                flex: 1.2;
                text-align: left;
            }

            .tt-quote { 
                font-size: 2.6rem; 
                line-height: 1.3; 
                font-weight: 900; 
                color:#fff; 
                margin:0 0 25px 0;
            }
            
            /* ألوان الأصوات المستهدفة للجملة 36 */
            .wish-sound { color: #00ffff; text-shadow: 0 0 15px rgba(0, 255, 255, 0.8); }
            .witch-sound { color: #00ff00; text-shadow: 0 0 25px rgba(0, 255, 0, 0.9); font-style: italic; }
            .w-letter { color: #00ffff; }

            .tt-instruction { 
                color:#00ffff; 
                font-size:1.3rem; 
                font-weight:800; 
                text-transform: uppercase;
                background: rgba(0, 255, 255, 0.05);
                padding: 12px 35px;
                border-radius: 100px;
                display: inline-block;
                border: 1px solid #00ffff;
            }

            .tt-image-container { 
                flex: 0.8;
                width: 320px;
                height: 320px; 
                border-radius: 50%; 
                border: 3px solid #00ff00;
                overflow: hidden;
                box-shadow: 0 0 50px rgba(0, 255, 0, 0.2);
            }

            @keyframes wishSpiral {
                from { opacity:0; transform: rotate(-5deg) scale(0.9); filter: blur(10px); }
                to { opacity:1; transform: rotate(0deg) scale(1); filter: blur(0); }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">Tongue Twister #${ttNumber}</div>
            
            <div class="tt-main-card">
                <div class="tt-text-section">
                    <p class="tt-quote">${highlightedSentence}</p>
                    <p class="tt-instruction">
                        ✨ DON'T MIX THE WITCH! (3x) ✨
                    </p>
                </div>

                <div class="tt-image-container">
                    <img src="${imageUrl}" onerror="this.src='https://via.placeholder.com/400/160033/ffffff?text=WISH+OR+WITCH'" style="width:100%; height:100%; object-fit:cover;">
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
