(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration (WOLF Automated Update) ---
    const ttNumber = 11; 
    const ttSentence = "He bit a bit of better butter.";
    
    // WOLF Fix: سحب الصورة رقم 11 من مسار GitHub المعتمد
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
            radial-gradient(at 10% 10%, rgba(255, 215, 0, 0.1) 0px, transparent 50%),
            radial-gradient(at 90% 90%, rgba(255, 0, 204, 0.1) 0px, transparent 50%);
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

    // WOLF Logic: تلوين الحروف المتفجرة (B و T) لهذه الجملة
    const highlightedSentence = ttSentence.replace(/b|t/gi, (matched) => {
        if (matched.toLowerCase() === 'b') {
            return `<span class="b-sound">${matched}</span>`;
        }
        return `<span class="t-sound">${matched}</span>`;
    });

    container.innerHTML = `
        <style>
            .tt-wrapper { 
                width:95%; 
                max-width:1100px; 
                display: flex;
                flex-direction: column;
                align-items: center;
                animation: butterSlide 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94); 
            }
            
            .tt-badge { 
                background: linear-gradient(45deg, #ffd700, #ff00cc);
                color:#000;
                display:inline-block; 
                padding:10px 45px;
                font-weight:900;
                border-radius:20px; 
                margin-bottom:30px;
                font-size:1.2rem; 
                letter-spacing:2px;
                text-transform:uppercase; 
                box-shadow: 0 10px 25px rgba(255, 215, 0, 0.3);
            }

            .tt-main-card {
                display: flex;
                flex-direction: row;
                align-items: center;
                background: rgba(255, 255, 255, 0.03);
                backdrop-filter: blur(20px);
                border: 2px solid rgba(255, 215, 0, 0.1);
                border-radius: 40px;
                padding: 60px;
                width: 100%;
                box-shadow: 0 40px 100px rgba(0,0,0,0.6);
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
                letter-spacing: -1px;
            }
            
            /* ألوان الحروف المستهدفة للجملة 11 */
            .b-sound { color: #ffd700; text-shadow: 0 0 20px rgba(255, 215, 0, 0.8); }
            .t-sound { color: #ff00cc; text-shadow: 0 0 20px rgba(255, 0, 204, 0.8); }

            .tt-instruction { 
                color:#fff; 
                font-size:1.3rem; 
                font-weight:700; 
                border-left: 5px solid #ffd700;
                padding-left: 20px;
                background: rgba(255, 215, 0, 0.05);
                display: inline-block;
            }

            .tt-image-container { 
                width: 380px;
                height: 380px; 
                border-radius: 30px; 
                border: 2px solid rgba(255, 215, 0, 0.2);
                overflow: hidden;
                box-shadow: 0 20px 40px rgba(0,0,0,0.7);
            }

            @keyframes butterSlide {
                from { opacity:0; transform: translateY(50px) rotate(-1deg); }
                to { opacity:1; transform: translateY(0) rotate(0); }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">Tongue Twister #${ttNumber}</div>
            
            <div class="tt-main-card">
                <div class="tt-text-section">
                    <p class="tt-quote">${highlightedSentence}</p>
                    <p class="tt-instruction">
                        🧈 Smooth and Fast! (3x) 🧈
                    </p>
                </div>

                <div class="tt-image-container">
                    <img src="${imageUrl}" onerror="this.src='https://via.placeholder.com/400/160033/ffffff?text=BETTER+BUTTER'" style="width:100%; height:100%; object-fit:cover;">
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
