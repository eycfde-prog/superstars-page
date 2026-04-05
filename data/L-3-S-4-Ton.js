(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration (WOLF Automated Update) ---
    const ttNumber = 5; 
    const ttSentence = "Four fine fresh fish for you.";
    
    // WOLF Fix: سحب الصورة رقم 5 تلقائياً من المسار المحدد
const imageUrl = `https://raw.githubusercontent.com/eycfde-prog/EYCVetoProgram/271fa92ff48f501cfa46f4ee87b9cae57aef453f/data/tt/${ttNumber}.png`;    // ----------------------------------------------

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

    // WOLF Logic: تلوين الحروف المهمة (F و SH) لهذه الجملة
    const highlightedSentence = ttSentence.replace(/sh|f/gi, (matched) => {
        if (matched.toLowerCase() === 'f') {
            return `<span class="f-sound">${matched}</span>`;
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
                animation: slideIn 0.8s ease-out; 
            }
            
            .tt-badge { 
                background: linear-gradient(45deg, #ff9900, #ff00cc);
                color:#fff;
                display:inline-block; 
                padding:8px 35px;
                font-weight:900;
                border-radius:50px; 
                margin-bottom:30px;
                font-size:1.1rem; 
                letter-spacing:2px;
                text-transform:uppercase; 
                box-shadow: 0 0 25px rgba(255, 153, 0, 0.4);
            }

            .tt-main-card {
                display: flex;
                flex-direction: row;
                align-items: center;
                background: rgba(255, 255, 255, 0.04);
                backdrop-filter: blur(25px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 40px;
                padding: 50px;
                width: 100%;
                box-shadow: 0 50px 100px rgba(0,0,0,0.6);
                gap: 50px;
                position: relative;
            }

            .tt-text-section { 
                flex: 1;
                text-align: left;
            }

            .tt-quote { 
                font-size: 4rem; 
                line-height: 1.2; 
                font-weight: 900; 
                color:#fff; 
                margin:0 0 25px 0;
                filter: drop-shadow(0 5px 15px rgba(0,0,0,0.3));
            }
            
            /* ألوان الأصوات المستهدفة للجملة 5 */
            .f-sound { color: #ff9900; text-shadow: 0 0 20px rgba(255, 153, 0, 0.8); }
            .sh-sound { color: #00fff2; text-shadow: 0 0 20px rgba(0, 255, 242, 0.8); }

            .tt-instruction { 
                color:#ff9900; 
                font-size:1.3rem; 
                font-weight:800; 
                text-transform: uppercase;
                border: 2px solid #ff9900;
                padding: 10px 30px;
                border-radius: 50px;
                display: inline-block;
                animation: pulse 2s infinite;
            }

            @keyframes pulse {
                0% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.7; transform: scale(1.05); }
                100% { opacity: 1; transform: scale(1); }
            }

            .tt-image-container { 
                width: 350px;
                height: 350px; 
                border-radius: 50%; 
                border: 5px solid rgba(255, 153, 0, 0.2);
                overflow: hidden;
                box-shadow: 0 30px 60px rgba(0,0,0,0.8);
            }

            @keyframes slideIn {
                from { opacity:0; transform: translateX(-50px); }
                to { opacity:1; transform: translateX(0); }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">Tongue Twister #${ttNumber}</div>
            
            <div class="tt-main-card">
                <div class="tt-text-section">
                    <p class="tt-quote">${highlightedSentence}</p>
                    <p class="tt-instruction">
                        🐟 Don't get hooked! (3x) 🐟
                    </p>
                </div>

                <div class="tt-image-container">
                    <img src="${imageUrl}" onerror="this.src='https://via.placeholder.com/400/160033/ffffff?text=FRESH+FISH'" style="width:100%; height:100%; object-fit:cover;">
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
