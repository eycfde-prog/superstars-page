(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration (WOLF Automated Update) ---
    const ttNumber = 3; 
    const ttSentence = "Toy boat. Ten Tons.";
    
    // WOLF Fix: سحب الصورة رقم 3 تلقائياً من المسار المحدد
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

    // WOLF Logic: تلوين الحروف المهمة (T و B) لهذه الجملة
    const highlightedSentence = ttSentence.replace(/t|b/gi, (matched) => {
        if (matched.toLowerCase() === 't') {
            return `<span class="t-sound">${matched}</span>`;
        }
        return `<span class="b-sound">${matched}</span>`;
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
                background: linear-gradient(45deg, #ffff00, #ff00cc);
                color:#000;
                display:inline-block; 
                padding:8px 30px;
                font-weight:900;
                border-radius:50px; 
                margin-bottom:30px;
                font-size:1.1rem; 
                letter-spacing:2px;
                text-transform:uppercase; 
                box-shadow: 0 5px 20px rgba(255, 255, 0, 0.4);
            }

            .tt-main-card {
                display: flex;
                flex-direction: row;
                align-items: center;
                background: rgba(255, 255, 255, 0.03);
                backdrop-filter: blur(15px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 40px;
                padding: 50px;
                width: 100%;
                box-shadow: 0 30px 60px rgba(0,0,0,0.4);
                gap: 50px;
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
                letter-spacing: -1px;
            }
            
            /* ألوان الحروف المستهدفة للجملة 3 */
            .t-sound { color: #ffff00; text-shadow: 0 0 20px rgba(255, 255, 0, 0.7); }
            .b-sound { color: #00fff2; text-shadow: 0 0 20px rgba(0, 255, 242, 0.7); }

            .tt-instruction { 
                color:#00fff2; 
                font-size:1.2rem; 
                font-weight:700; 
                text-transform: uppercase;
                background: rgba(0, 255, 242, 0.1);
                padding: 10px 20px;
                border-radius: 10px;
                display: inline-block;
            }

            .tt-image-container { 
                width: 350px;
                height: 350px; 
                border-radius: 30px; 
                border: 3px solid rgba(255,255,255,0.05);
                overflow: hidden;
                box-shadow: 0 20px 40px rgba(0,0,0,0.6);
            }

            @keyframes glassIn {
                from { opacity:0; transform: translateY(30px); }
                to { opacity:1; transform: translateY(0); }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">Tongue Twister #${ttNumber}</div>
            
            <div class="tt-main-card">
                <div class="tt-text-section">
                    <p class="tt-quote">${highlightedSentence}</p>
                    <p class="tt-instruction">
                        🚀 3 Times - Full Speed! 🚀
                    </p>
                </div>

                <div class="tt-image-container">
                    <img src="${imageUrl}" onerror="this.src='https://via.placeholder.com/400/160033/ffffff?text=TOY+BOAT'" style="width:100%; height:100%; object-fit:cover;">
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
