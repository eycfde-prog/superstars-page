(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration (WOLF Automated Update) ---
    const ttNumber = 30; 
    const ttSentence = "If a dog chews shoes, whose shoes does he choose?";
    
    // WOLF Fix: سحب الصورة رقم 30 من مسار GitHub المعتمد
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
            radial-gradient(at 10% 10%, rgba(255, 255, 0, 0.15) 0px, transparent 50%),
            radial-gradient(at 90% 90%, rgba(0, 255, 255, 0.1) 0px, transparent 50%);
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

    // WOLF Logic: تلوين أصوات الـ CH والـ SH لهذه الجملة المحيرة
    const highlightedSentence = ttSentence.replace(/ch|sh/gi, (matched) => {
        if (matched.toLowerCase() === 'ch') {
            return `<span class="ch-sound">${matched}</span>`;
        }
        return `<span class="sh-sound">${matched}</span>`;
    });

    container.innerHTML = `
        <style>
            .tt-wrapper { 
                width:95%; 
                max-width:1100px; 
                display: flex;
                flex-direction: column;
                align-items: center;
                animation: dogBounce 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55); 
            }
            
            .tt-badge { 
                background: linear-gradient(45deg, #ffff00, #00ffff);
                color:#000;
                display:inline-block; 
                padding:12px 50px;
                font-weight:900;
                border-radius:40px; 
                margin-bottom:30px;
                font-size:1.1rem; 
                letter-spacing:5px;
                text-transform:uppercase; 
                box-shadow: 0 10px 30px rgba(0, 255, 255, 0.3);
                border: 2px solid #000;
            }

            .tt-main-card {
                display: flex;
                flex-direction: row;
                align-items: center;
                background: rgba(255, 255, 255, 0.02);
                backdrop-filter: blur(35px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 50px;
                padding: 60px;
                width: 100%;
                box-shadow: 0 50px 100px rgba(0,0,0,0.8);
                gap: 50px;
                position: relative;
                overflow: hidden;
            }

            .tt-text-section { 
                flex: 1;
                text-align: left;
            }

            .tt-quote { 
                font-size: 3.8rem; 
                line-height: 1.1; 
                font-weight: 900; 
                color:#fff; 
                margin:0 0 25px 0;
            }
            
            /* ألوان الأصوات المستهدفة للجملة 30 */
            .ch-sound { color: #ffff00; text-shadow: 0 0 25px rgba(255, 255, 0, 0.9); }
            .sh-sound { color: #00ffff; text-shadow: 0 0 25px rgba(0, 255, 255, 0.9); }

            .tt-instruction { 
                color:#00ffff; 
                font-size:1.4rem; 
                font-weight:800; 
                text-transform: uppercase;
                background: rgba(0, 255, 255, 0.1);
                padding: 15px 40px;
                border-radius: 15px;
                display: inline-block;
                border: 1px dashed #00ffff;
            }

            .tt-image-container { 
                width: 380px;
                height: 380px; 
                border-radius: 40px; 
                border: 3px solid #ffff00;
                overflow: hidden;
                box-shadow: 0 30px 60px rgba(0,0,0,0.7);
            }

            @keyframes dogBounce {
                from { opacity:0; transform: scale(0.5) rotate(-10deg); }
                to { opacity:1; transform: scale(1) rotate(0deg); }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">Tongue Twister #${ttNumber}</div>
            
            <div class="tt-main-card">
                <div class="tt-text-section">
                    <p class="tt-quote">${highlightedSentence}</p>
                    <p class="tt-instruction">
                        🐕 WATCH THE SHOES! (3x) 🐕
                    </p>
                </div>

                <div class="tt-image-container">
                    <img src="${imageUrl}" onerror="this.src='https://via.placeholder.com/400/160033/ffffff?text=DOG+AND+SHOES'" style="width:100%; height:100%; object-fit:cover;">
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
