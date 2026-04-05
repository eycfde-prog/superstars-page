(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration (WOLF Automated Update) ---
    const ttNumber = 13; 
    const ttSentence = "Six sticky skeletons.";
    
    // WOLF Fix: سحب الصورة رقم 13 من مسار GitHub المعتمد
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
            radial-gradient(at 10% 10%, rgba(57, 255, 20, 0.1) 0px, transparent 50%),
            radial-gradient(at 90% 90%, rgba(255, 255, 255, 0.05) 0px, transparent 50%);
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

    // WOLF Logic: تلوين أصوات الـ S والـ K/T لهذه الجملة "اللزجة"
    const highlightedSentence = ttSentence.replace(/s|k|t/gi, (matched) => {
        if (matched.toLowerCase() === 's') {
            return `<span class="s-sound">${matched}</span>`;
        }
        return `<span class="kt-sound">${matched}</span>`;
    });

    container.innerHTML = `
        <style>
            .tt-wrapper { 
                width:95%; 
                max-width:1100px; 
                display: flex;
                flex-direction: column;
                align-items: center;
                animation: skeletonFloat 1s ease-in-out; 
            }
            
            .tt-badge { 
                background: linear-gradient(45deg, #39ff14, #ffffff);
                color:#000;
                display:inline-block; 
                padding:10px 45px;
                font-weight:900;
                border-radius:10px; 
                margin-bottom:30px;
                font-size:1.1rem; 
                letter-spacing:4px;
                text-transform:uppercase; 
                box-shadow: 0 0 20px rgba(57, 255, 20, 0.5);
            }

            .tt-main-card {
                display: flex;
                flex-direction: row;
                align-items: center;
                background: rgba(255, 255, 255, 0.02);
                backdrop-filter: blur(25px);
                border: 1px solid rgba(57, 255, 20, 0.2);
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
                font-size: 4.5rem; 
                line-height: 1.1; 
                font-weight: 900; 
                color:#fff; 
                margin:0 0 25px 0;
                letter-spacing: -1px;
            }
            
            /* ألوان الأصوات المستهدفة للجملة 13 */
            .s-sound { color: #39ff14; text-shadow: 0 0 25px rgba(57, 255, 20, 0.8); }
            .kt-sound { color: #ffffff; text-shadow: 0 0 20px rgba(255, 255, 255, 0.6); }

            .tt-instruction { 
                color:#39ff14; 
                font-size:1.3rem; 
                font-weight:800; 
                text-transform: uppercase;
                background: rgba(57, 255, 20, 0.1);
                padding: 12px 30px;
                border-radius: 0 30px 0 30px;
                display: inline-block;
                border: 1px solid #39ff14;
            }

            .tt-image-container { 
                width: 380px;
                height: 380px; 
                border-radius: 30px; 
                border: 2px solid rgba(57, 255, 20, 0.3);
                overflow: hidden;
                box-shadow: 0 0 40px rgba(57, 255, 20, 0.2);
                animation: shake 4s infinite;
            }

            @keyframes shake {
                0%, 100% { transform: rotate(0deg); }
                25% { transform: rotate(2deg); }
                75% { transform: rotate(-2deg); }
            }

            @keyframes skeletonFloat {
                from { opacity:0; transform: translateY(100px) scale(0.9); }
                to { opacity:1; transform: translateY(0) scale(1); }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">Tongue Twister #${ttNumber}</div>
            
            <div class="tt-main-card">
                <div class="tt-text-section">
                    <p class="tt-quote">${highlightedSentence}</p>
                    <p class="tt-instruction">
                        💀 Don't Get Stuck! (3x) 💀
                    </p>
                </div>

                <div class="tt-image-container">
                    <img src="${imageUrl}" onerror="this.src='https://via.placeholder.com/400/160033/ffffff?text=SKELETONS'" style="width:100%; height:100%; object-fit:cover;">
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
