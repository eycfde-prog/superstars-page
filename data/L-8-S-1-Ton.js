(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration (WOLF Automated Update) ---
    const ttNumber = 22; 
    const ttSentence = "Buy pie pans before you buy butter plates.";
    
    // WOLF Fix: سحب الصورة رقم 22 من مسار GitHub المعتمد
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
            radial-gradient(at 10% 10%, rgba(255, 0, 204, 0.1) 0px, transparent 50%),
            radial-gradient(at 90% 90%, rgba(0, 102, 255, 0.1) 0px, transparent 50%);
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

    // WOLF Logic: تلوين الأصوات الانفجارية (P و B) لهذه الجملة
    const highlightedSentence = ttSentence.replace(/p|b/gi, (matched) => {
        if (matched.toLowerCase() === 'p') {
            return `<span class="p-sound">${matched}</span>`;
        }
        return `<span class="b-sound">${matched}</span>`;
    });

    container.innerHTML = `
        <style>
            .tt-wrapper { 
                width:95%; 
                max-width:1100px; 
                display: flex;
                flex-direction: column;
                align-items: center;
                animation: panSlide 0.8s cubic-bezier(0.23, 1, 0.32, 1); 
            }
            
            .tt-badge { 
                background: linear-gradient(45deg, #ff00cc, #0066ff);
                color:#fff;
                display:inline-block; 
                padding:12px 50px;
                font-weight:900;
                border-radius:0 0 30px 30px; 
                margin-bottom:30px;
                font-size:1.1rem; 
                letter-spacing:5px;
                text-transform:uppercase; 
                box-shadow: 0 10px 20px rgba(0,0,0,0.3);
            }

            .tt-main-card {
                display: flex;
                flex-direction: row;
                align-items: center;
                background: rgba(255, 255, 255, 0.03);
                backdrop-filter: blur(30px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 50px;
                padding: 60px;
                width: 100%;
                box-shadow: 0 50px 100px rgba(0,0,0,0.7);
                gap: 50px;
                position: relative;
                border-left: 10px solid #ff00cc;
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
            
            /* ألوان الأصوات المستهدفة للجملة 22 */
            .p-sound { color: #ff00cc; text-shadow: 0 0 25px rgba(255, 0, 204, 0.8); }
            .b-sound { color: #0066ff; text-shadow: 0 0 25px rgba(0, 102, 255, 0.8); }

            .tt-instruction { 
                color:#fff; 
                font-size:1.3rem; 
                font-weight:800; 
                text-transform: uppercase;
                background: rgba(255, 255, 255, 0.05);
                padding: 15px 35px;
                border-radius: 100px;
                display: inline-block;
                border: 1px solid rgba(255, 0, 204, 0.3);
            }

            .tt-image-container { 
                width: 380px;
                height: 380px; 
                border-radius: 40px; 
                border: 2px solid rgba(255, 255, 255, 0.1);
                overflow: hidden;
                box-shadow: 0 30px 60px rgba(0,0,0,0.8);
                transform: perspective(1000px) rotateY(-5deg);
            }

            @keyframes panSlide {
                from { opacity:0; transform: translateX(-100px); }
                to { opacity:1; transform: translateX(0); }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">Tongue Twister #${ttNumber}</div>
            
            <div class="tt-main-card">
                <div class="tt-text-section">
                    <p class="tt-quote">${highlightedSentence}</p>
                    <p class="tt-instruction">
                        🥧 WATCH YOUR LIPS! (3x) 🥧
                    </p>
                </div>

                <div class="tt-image-container">
                    <img src="${imageUrl}" onerror="this.src='https://via.placeholder.com/400/160033/ffffff?text=PIE+PANS'" style="width:100%; height:100%; object-fit:cover;">
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
