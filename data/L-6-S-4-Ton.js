(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration (WOLF Automated Update) ---
    const ttNumber = 17; 
    const ttSentence = "He threw three free throws.";
    
    // WOLF Fix: سحب الصورة رقم 17 من مسار GitHub المعتمد
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
            radial-gradient(at 10% 10%, rgba(255, 0, 204, 0.1) 0px, transparent 50%),
            radial-gradient(at 90% 90%, rgba(57, 255, 20, 0.1) 0px, transparent 50%);
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

    // WOLF Logic: تلوين أصوات الـ TH والـ F لهذه الجملة الصعبة
    const highlightedSentence = ttSentence.replace(/th|f/gi, (matched) => {
        if (matched.toLowerCase() === 'th') {
            return `<span class="th-sound">${matched}</span>`;
        }
        return `<span class="f-sound">${matched}</span>`;
    });

    container.innerHTML = `
        <style>
            .tt-wrapper { 
                width:95%; 
                max-width:1100px; 
                display: flex;
                flex-direction: column;
                align-items: center;
                animation: throwIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
            }
            
            .tt-badge { 
                background: linear-gradient(45deg, #ff00cc, #39ff14);
                color:#000;
                display:inline-block; 
                padding:10px 45px;
                font-weight:900;
                border-radius:50px; 
                margin-bottom:30px;
                font-size:1.1rem; 
                letter-spacing:4px;
                text-transform:uppercase; 
                box-shadow: 0 5px 20px rgba(255, 0, 204, 0.4);
            }

            .tt-main-card {
                display: flex;
                flex-direction: row;
                align-items: center;
                background: rgba(255, 255, 255, 0.03);
                backdrop-filter: blur(25px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 40px;
                padding: 60px;
                width: 100%;
                box-shadow: 0 40px 100px rgba(0,0,0,0.8);
                gap: 50px;
                border-top: 5px solid #ff00cc;
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
            
            /* ألوان الأصوات المستهدفة للجملة 17 */
            .th-sound { color: #ff00cc; text-shadow: 0 0 25px rgba(255, 0, 204, 0.8); }
            .f-sound { color: #39ff14; text-shadow: 0 0 25px rgba(57, 255, 20, 0.8); }

            .tt-instruction { 
                color:#39ff14; 
                font-size:1.4rem; 
                font-weight:800; 
                text-transform: uppercase;
                background: rgba(57, 255, 20, 0.1);
                padding: 10px 30px;
                border-radius: 12px;
                display: inline-block;
                border: 1px dashed #39ff14;
            }

            .tt-image-container { 
                width: 380px;
                height: 380px; 
                border-radius: 30px; 
                border: 3px solid #ff00cc;
                overflow: hidden;
                box-shadow: 0 20px 50px rgba(255, 0, 204, 0.2);
            }

            @keyframes throwIn {
                from { opacity:0; transform: scale(0.5) translateY(100px); }
                to { opacity:1; transform: scale(1) translateY(0); }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">Tongue Twister #${ttNumber}</div>
            
            <div class="tt-main-card">
                <div class="tt-text-section">
                    <p class="tt-quote">${highlightedSentence}</p>
                    <p class="tt-instruction">
                        🏀 TH or F? No cheating! (3x) 🏀
                    </p>
                </div>

                <div class="tt-image-container">
                    <img src="${imageUrl}" onerror="this.src='https://via.placeholder.com/400/160033/ffffff?text=FREE+THROWS'" style="width:100%; height:100%; object-fit:cover;">
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
