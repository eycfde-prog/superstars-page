
(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration (WOLF Automated Update) ---
    const ttNumber = 26; 
    const ttSentence = "A happy hippo hopped and hiccuped.";
    
    // WOLF Fix: سحب الصورة رقم 26 من مسار GitHub المعتمد
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
            radial-gradient(at 10% 10%, rgba(255, 136, 0, 0.15) 0px, transparent 50%),
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

    // WOLF Logic: تلوين أصوات الـ H والـ P لهذه الجملة "المقفزة"
    const highlightedSentence = ttSentence.replace(/h|p/gi, (matched) => {
        if (matched.toLowerCase() === 'h') {
            return `<span class="h-sound">${matched}</span>`;
        }
        return `<span class="p-sound">${matched}</span>`;
    });

    container.innerHTML = `
        <style>
            .tt-wrapper { 
                width:95%; 
                max-width:1100px; 
                display: flex;
                flex-direction: column;
                align-items: center;
                animation: hippoHop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
            }
            
            .tt-badge { 
                background: linear-gradient(45deg, #ff8800, #bf00ff);
                color:#fff;
                display:inline-block; 
                padding:10px 45px;
                font-weight:900;
                border-radius:20px; 
                margin-bottom:30px;
                font-size:1.1rem; 
                letter-spacing:5px;
                text-transform:uppercase; 
                box-shadow: 0 10px 20px rgba(255, 136, 0, 0.3);
            }

            .tt-main-card {
                display: flex;
                flex-direction: row;
                align-items: center;
                background: rgba(255, 255, 255, 0.03);
                backdrop-filter: blur(25px);
                border: 1px solid rgba(255, 136, 0, 0.2);
                border-radius: 50px;
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
                line-height: 1.1; 
                font-weight: 900; 
                color:#fff; 
                margin:0 0 25px 0;
            }
            
            /* ألوان الأصوات المستهدفة للجملة 26 */
            .h-sound { color: #ff8800; text-shadow: 0 0 25px rgba(255, 136, 0, 0.9); }
            .p-sound { color: #bf00ff; text-shadow: 0 0 25px rgba(191, 0, 255, 0.9); }

            .tt-instruction { 
                color:#ff8800; 
                font-size:1.4rem; 
                font-weight:800; 
                text-transform: uppercase;
                background: rgba(255, 136, 0, 0.1);
                padding: 12px 35px;
                border-radius: 15px;
                display: inline-block;
                border-bottom: 4px solid #ff8800;
                animation: hiccup 2s infinite;
            }

            @keyframes hiccup {
                0%, 100% { transform: translateY(0); }
                10%, 30% { transform: translateY(-5px); }
                20% { transform: translateY(0); }
            }

            .tt-image-container { 
                width: 380px;
                height: 380px; 
                border-radius: 40px; 
                border: 3px solid rgba(255, 136, 0, 0.3);
                overflow: hidden;
                box-shadow: 0 20px 50px rgba(0,0,0,0.7);
            }

            @keyframes hippoHop {
                from { opacity:0; transform: translateY(100px) scale(0.8); }
                to { opacity:1; transform: translateY(0) scale(1); }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">Tongue Twister #${ttNumber}</div>
            
            <div class="tt-main-card">
                <div class="tt-text-section">
                    <p class="tt-quote">${highlightedSentence}</p>
                    <p class="tt-instruction">
                        🦛 DON'T LOSE YOUR BREATH! (3x) 🦛
                    </p>
                </div>

                <div class="tt-image-container">
                    <img src="${imageUrl}" onerror="this.src='https://via.placeholder.com/400/160033/ffffff?text=HAPPY+HIPPO'" style="width:100%; height:100%; object-fit:cover;">
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
