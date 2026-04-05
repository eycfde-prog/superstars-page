(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration (WOLF Automated Update) ---
    const ttNumber = 4; 
    const ttSentence = "Selfish shellfish.";
    
    // WOLF Fix: سحب الصورة رقم 4 تلقائياً من المسار المحدد
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

    // WOLF Logic: تلوين الأصوات المستهدفة (S و SH) لهذه الجملة
    const highlightedSentence = ttSentence.replace(/sh|s/gi, (matched) => {
        if (matched.toLowerCase() === 'sh') {
            return `<span class="sh-sound">${matched}</span>`;
        }
        return `<span class="s-sound">${matched}</span>`;
    });

    container.innerHTML = `
        <style>
            .tt-wrapper { 
                width:95%; 
                max-width:1000px; 
                display: flex;
                flex-direction: column;
                align-items: center;
                animation: glassIn 1s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
            }
            
            .tt-badge { 
                background: linear-gradient(45deg, #00fff2, #ff00cc);
                color:#fff;
                display:inline-block; 
                padding:8px 30px;
                font-weight:900;
                border-radius:50px; 
                margin-bottom:30px;
                font-size:1.1rem; 
                letter-spacing:3px;
                text-transform:uppercase; 
                box-shadow: 0 0 20px rgba(0, 255, 242, 0.4);
            }

            .tt-main-card {
                display: flex;
                flex-direction: row;
                align-items: center;
                background: rgba(255, 255, 255, 0.05);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 40px;
                padding: 60px;
                width: 100%;
                box-shadow: 0 40px 80px rgba(0,0,0,0.5);
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
            }
            
            /* ألوان الأصوات المستهدفة للجملة 4 */
            .s-sound { color: #ff00cc; text-shadow: 0 0 25px rgba(255, 0, 204, 0.8); }
            .sh-sound { color: #00fff2; text-shadow: 0 0 25px rgba(0, 255, 242, 0.8); }

            .tt-instruction { 
                color:#fff; 
                font-size:1.3rem; 
                font-weight:800; 
                letter-spacing: 1px;
                background: linear-gradient(90deg, rgba(255,0,204,0.2), transparent);
                padding: 12px 25px;
                border-left: 5px solid #ff00cc;
                border-radius: 0 15px 15px 0;
            }

            .tt-image-container { 
                width: 380px;
                height: 380px; 
                border-radius: 35px; 
                border: 4px solid rgba(255,255,255,0.05);
                overflow: hidden;
                box-shadow: 0 25px 50px rgba(0,0,0,0.7);
            }

            @keyframes glassIn {
                from { opacity:0; transform: scale(0.8) rotate(-2deg); }
                to { opacity:1; transform: scale(1) rotate(0deg); }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">Tongue Twister #${ttNumber}</div>
            
            <div class="tt-main-card">
                <div class="tt-text-section">
                    <p class="tt-quote">${highlightedSentence}</p>
                    <p class="tt-instruction">
                        ⚠️ Watch the S and SH! (3x) ⚠️
                    </p>
                </div>

                <div class="tt-image-container">
                    <img src="${imageUrl}" onerror="this.src='https://via.placeholder.com/400/160033/ffffff?text=SHELLFISH'" style="width:100%; height:100%; object-fit:cover;">
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
