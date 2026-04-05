
(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration (WOLF Automated Update) ---
    const ttNumber = 37; 
    const ttSentence = "I thought a thought, but the thought I thought wasn’t the thought I thought I thought.";
    
    // WOLF Fix: سحب الصورة رقم 37 من مسار GitHub المعتمد
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
            radial-gradient(at 10% 10%, rgba(212, 175, 55, 0.15) 0px, transparent 50%),
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

    // WOLF Logic: تلوين صوت الـ TH المكثف في جملة التفكير
    const highlightedSentence = ttSentence.replace(/th/gi, (matched) => {
        return `<span class="th-sound">${matched}</span>`;
    });

    container.innerHTML = `
        <style>
            .tt-wrapper { 
                width:95%; 
                max-width:1150px; 
                display: flex;
                flex-direction: column;
                align-items: center;
                animation: thinkFade 1.2s ease-out; 
            }
            
            .tt-badge { 
                background: linear-gradient(45deg, #d4af37, #ffffff);
                color:#000;
                display:inline-block; 
                padding:12px 50px;
                font-weight:900;
                border-radius:5px; 
                margin-bottom:30px;
                font-size:1.1rem; 
                letter-spacing:6px;
                text-transform:uppercase; 
                box-shadow: 0 0 30px rgba(212, 175, 55, 0.4);
            }

            .tt-main-card {
                display: flex;
                flex-direction: row;
                align-items: center;
                background: rgba(255, 255, 255, 0.02);
                backdrop-filter: blur(40px);
                border: 1px solid rgba(212, 175, 55, 0.2);
                border-radius: 40px;
                padding: 60px;
                width: 100%;
                box-shadow: 0 50px 100px rgba(0,0,0,0.8);
                gap: 50px;
                position: relative;
            }

            .tt-text-section { 
                flex: 1.3;
                text-align: left;
            }

            .tt-quote { 
                font-size: 2.8rem; 
                line-height: 1.3; 
                font-weight: 900; 
                color:#fff; 
                margin:0 0 25px 0;
            }
            
            /* اللون الذهبي المتوهج لصوت الـ TH */
            .th-sound { color: #d4af37; text-shadow: 0 0 20px rgba(212, 175, 55, 0.9); }

            .tt-instruction { 
                color:#d4af37; 
                font-size:1.3rem; 
                font-weight:800; 
                text-transform: uppercase;
                background: rgba(212, 175, 55, 0.1);
                padding: 12px 35px;
                border-radius: 4px;
                display: inline-block;
                border-bottom: 3px solid #d4af37;
            }

            .tt-image-container { 
                flex: 0.7;
                width: 320px;
                height: 320px; 
                border-radius: 30px; 
                border: 2px solid rgba(212, 175, 55, 0.3);
                overflow: hidden;
                box-shadow: 0 30px 60px rgba(0,0,0,0.7);
                filter: grayscale(0.5);
            }

            @keyframes thinkFade {
                from { opacity:0; filter: blur(15px); transform: translateY(20px); }
                to { opacity:1; filter: blur(0); transform: translateY(0); }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">Tongue Twister #${ttNumber}</div>
            
            <div class="tt-main-card">
                <div class="tt-text-section">
                    <p class="tt-quote">${highlightedSentence}</p>
                    <p class="tt-instruction">
                        🧠 DON'T OVERTHINK IT! (3x) 🧠
                    </p>
                </div>

                <div class="tt-image-container">
                    <img src="${imageUrl}" onerror="this.src='https://via.placeholder.com/400/160033/ffffff?text=THOUGHTS'" style="width:100%; height:100%; object-fit:cover;">
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
