(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration (WOLF Automated Update) ---
    const ttNumber = 21; 
    const ttSentence = "A noisy noise annoys an oyster.";
    
    // WOLF Fix: سحب الصورة رقم 21 من مسار GitHub المعتمد
 const cacheBuster = new Date().getTime();
    const imageUrl = `https://raw.githubusercontent.com/eycfde-prog/EYCVetoProgram/main/data/tt/${ttNumber}.png?v=${cacheBuster}`; 
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
            radial-gradient(at 10% 10%, rgba(0, 255, 242, 0.15) 0px, transparent 50%),
            radial-gradient(at 90% 90%, rgba(255, 136, 0, 0.1) 0px, transparent 50%);
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

    // WOLF Logic: تلوين أصوات الـ OY والـ N لهذه الجملة المزعجة
    const highlightedSentence = ttSentence.replace(/oy|n/gi, (matched) => {
        if (matched.toLowerCase() === 'oy') {
            return `<span class="oy-sound">${matched}</span>`;
        }
        return `<span class="n-sound">${matched}</span>`;
    });

    container.innerHTML = `
        <style>
            .tt-wrapper { 
                width:95%; 
                max-width:1100px; 
                display: flex;
                flex-direction: column;
                align-items: center;
                animation: oysterPop 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55); 
            }
            
            .tt-badge { 
                background: linear-gradient(45deg, #00fff2, #ff8800);
                color:#000;
                display:inline-block; 
                padding:10px 45px;
                font-weight:900;
                border-radius:10px 40px 10px 40px; 
                margin-bottom:30px;
                font-size:1.1rem; 
                letter-spacing:4px;
                text-transform:uppercase; 
                box-shadow: 0 0 20px rgba(0, 255, 242, 0.4);
            }

            .tt-main-card {
                display: flex;
                flex-direction: row;
                align-items: center;
                background: rgba(255, 255, 255, 0.02);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(0, 255, 242, 0.2);
                border-radius: 40px;
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
                font-size: 4.2rem; 
                line-height: 1.1; 
                font-weight: 900; 
                color:#fff; 
                margin:0 0 25px 0;
            }
            
            /* ألوان الأصوات المستهدفة للجملة 21 */
            .oy-sound { color: #00fff2; text-shadow: 0 0 25px rgba(0, 255, 242, 0.8); }
            .n-sound { color: #ff8800; text-shadow: 0 0 25px rgba(255, 136, 0, 0.8); }

            .tt-instruction { 
                color:#00fff2; 
                font-size:1.4rem; 
                font-weight:800; 
                text-transform: uppercase;
                background: rgba(0, 255, 242, 0.1);
                padding: 12px 35px;
                border-radius: 5px;
                display: inline-block;
                border: 1px solid #00fff2;
            }

            .tt-image-container { 
                width: 380px;
                height: 380px; 
                border-radius: 50% 50% 10% 10%; 
                border: 4px solid #00fff2;
                overflow: hidden;
                box-shadow: 0 0 40px rgba(0, 255, 242, 0.2);
            }

            @keyframes oysterPop {
                from { opacity:0; transform: scale(0); }
                to { opacity:1; transform: scale(1); }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">Tongue Twister #${ttNumber}</div>
            
            <div class="tt-main-card">
                <div class="tt-text-section">
                    <p class="tt-quote">${highlightedSentence}</p>
                    <p class="tt-instruction">
                        🦪 SHHH! NO NOISE! (3x) 🦪
                    </p>
                </div>

                <div class="tt-image-container">
                    <img src="${imageUrl}" onerror="this.src='https://via.placeholder.com/400/160033/ffffff?text=NOISY+OYSTER'" style="width:100%; height:100%; object-fit:cover;">
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
