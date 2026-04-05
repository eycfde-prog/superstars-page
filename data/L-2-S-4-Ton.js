(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration (WOLF Automated Update) ---
    // تم تحديث الرقم والسلسلة بناءً على طلب مستر عز
    const ttNumber = 1; 
    const ttSentence = "Special selection.";
    
    // WOLF Fix: إنشاء الرابط المباشر (Raw) للصورة تلقائياً بناءً على ttNumber
    const imageUrl = `https://github.com/eycfde-prog/EYCVetoProgram/blob/4ae3a8b660f84bebaa8a391420b314c8e1ca93eb/data/tt/1.png`;
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

    // WOLF Logic: تمييز الأصوات (s, sh) داخل الجملة الجديدة
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
                animation: glassIn 1s ease-out; 
            }
            
            .tt-badge { 
                background: linear-gradient(45deg, #ff00cc, #3333ff);
                color:#fff;
                display:inline-block; 
                padding:8px 30px;
                font-weight:800;
                border-radius:50px; 
                margin-bottom:30px;
                font-size:1.1rem; 
                letter-spacing:2px;
                text-transform:uppercase; 
                box-shadow: 0 5px 15px rgba(255, 0, 204, 0.3);
            }

            .tt-main-card {
                display: flex;
                flex-direction: row;
                align-items: center;
                background: rgba(255, 255, 255, 0.03);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 30px;
                padding: 40px;
                width: 100%;
                box-shadow: 0 20px 50px rgba(0,0,0,0.3);
                gap: 40px;
                position: relative;
                overflow: hidden;
            }

            .tt-text-section { 
                flex: 1;
                text-align: left;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }

            .tt-quote { 
                font-size: 3rem; 
                line-height: 1.3; 
                font-weight: 900; 
                color:#fff; 
                margin:0 0 20px 0;
                text-shadow: 0 2px 10px rgba(0,0,0,0.2);
            }
            
            .sh-sound { color: #00fff2; text-shadow: 0 0 10px rgba(0, 255, 242, 0.5); }
            .s-sound { color: #ff00cc; text-shadow: 0 0 10px rgba(255, 0, 204, 0.5); }

            .tt-instruction { 
                color:#888; 
                font-size:1rem; 
                letter-spacing:1px; 
                font-weight:600; 
                margin: 0;
            }

            .tt-image-container { 
                width: 300px;
                height: 300px; 
                border-radius: 20px; 
                border: 2px solid rgba(255,255,255,0.1);
                overflow: hidden;
                position: relative;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                flex-shrink: 0;
            }

            @media (max-width: 900px) {
                .tt-main-card { padding: 30px; gap: 30px; }
                .tt-quote { font-size: 2.2rem; }
                .tt-image-container { width: 220px; height: 220px; }
            }

            @media (max-width: 600px) {
                .tt-main-card { 
                    flex-direction: column-reverse; 
                    text-align: center;
                    padding: 25px;
                    gap: 20px;
                }
                .tt-text-section { text-align: center; }
                .tt-quote { font-size: 1.8rem; }
                .tt-image-container { width: 180px; height: 180px; }
            }

            @keyframes glassIn {
                from { opacity:0; transform: translateY(20px) scale(0.95); filter: blur(10px); }
                to { opacity:1; transform: translateY(0) scale(1); filter: blur(0); }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">Tongue Twister #${ttNumber}</div>
            
            <div class="tt-main-card">
                <div class="tt-text-section">
                    <p class="tt-quote">${highlightedSentence}</p>
                    <p class="tt-instruction">
                        ⚡ Repeat 3 times as fast as you can ⚡
                    </p>
                </div>

                <div class="tt-image-container">
                    <img src="${imageUrl}" onerror="this.src='https://via.placeholder.com/400/160033/ffffff?text=VETO+TWISTER'" style="width:100%; height:100%; object-fit:cover;">
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
