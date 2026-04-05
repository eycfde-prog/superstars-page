(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration (WOLF Automated Update) ---
    const ttNumber = 2; 
    const ttSentence = "Two toads totally tired.";
    
    // WOLF Fix: سحب الصورة رقم 2 تلقائياً من GitHub
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

    // WOLF Logic: تلوين الحروف المهمة (T و D) لهذه الجملة خصيصاً
    const highlightedSentence = ttSentence.replace(/t|d/gi, (matched) => {
        if (matched.toLowerCase() === 't') {
            return `<span class="t-sound">${matched}</span>`;
        }
        return `<span class="d-sound">${matched}</span>`;
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
                background: linear-gradient(45deg, #00fff2, #3333ff);
                color:#fff;
                display:inline-block; 
                padding:8px 30px;
                font-weight:800;
                border-radius:50px; 
                margin-bottom:30px;
                font-size:1.1rem; 
                letter-spacing:2px;
                text-transform:uppercase; 
                box-shadow: 0 5px 15px rgba(0, 255, 242, 0.3);
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
            }

            .tt-quote { 
                font-size: 3.5rem; 
                line-height: 1.2; 
                font-weight: 900; 
                color:#fff; 
                margin:0 0 20px 0;
            }
            
            /* ألوان الحروف المهمة */
            .t-sound { color: #ff00cc; text-shadow: 0 0 15px rgba(255, 0, 204, 0.6); }
            .d-sound { color: #00fff2; text-shadow: 0 0 15px rgba(0, 255, 242, 0.6); }

            .tt-instruction { 
                color:#aaa; 
                font-size:1.1rem; 
                font-weight:600; 
                border-left: 4px solid #ff00cc;
                padding-left: 15px;
            }

            .tt-image-container { 
                width: 320px;
                height: 320px; 
                border-radius: 25px; 
                border: 2px solid rgba(255,255,255,0.1);
                overflow: hidden;
                box-shadow: 0 15px 35px rgba(0,0,0,0.6);
            }

            @keyframes glassIn {
                from { opacity:0; transform: scale(0.9); }
                to { opacity:1; transform: scale(1); }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">Tongue Twister #${ttNumber}</div>
            
            <div class="tt-main-card">
                <div class="tt-text-section">
                    <p class="tt-quote">${highlightedSentence}</p>
                    <p class="tt-instruction">
                        ⚡ Say it fast 3 times! ⚡
                    </p>
                </div>

                <div class="tt-image-container">
                    <img src="${imageUrl}" onerror="this.src='https://via.placeholder.com/400/160033/ffffff?text=TOADS'" style="width:100%; height:100%; object-fit:cover;">
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
