(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration (WOLF Automated Update) ---
    const ttNumber = 35; 
    const ttSentence = "She sells sea shells, by the seashore, the shells she sells are shells I’m sure.";
    
    // WOLF Fix: سحب الصورة رقم 35 من مسار GitHub المعتمد
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
            radial-gradient(at 10% 10%, rgba(0, 191, 255, 0.15) 0px, transparent 50%),
            radial-gradient(at 90% 90%, rgba(255, 255, 255, 0.1) 0px, transparent 50%);
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

    // WOLF Logic: تلوين أصوات الـ S والـ SH للتفريق بين البحر والصدف
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
                max-width:1100px; 
                display: flex;
                flex-direction: column;
                align-items: center;
                animation: waveIn 1s ease-out; 
            }
            
            .tt-badge { 
                background: linear-gradient(45deg, #00bfff, #ffffff);
                color:#000;
                display:inline-block; 
                padding:12px 50px;
                font-weight:900;
                border-radius:50px; 
                margin-bottom:30px;
                font-size:1.1rem; 
                letter-spacing:6px;
                text-transform:uppercase; 
                box-shadow: 0 10px 30px rgba(0, 191, 255, 0.4);
            }

            .tt-main-card {
                display: flex;
                flex-direction: row;
                align-items: center;
                background: rgba(255, 255, 255, 0.03);
                backdrop-filter: blur(40px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 40px;
                padding: 60px;
                width: 100%;
                box-shadow: 0 50px 100px rgba(0,0,0,0.8);
                gap: 50px;
                position: relative;
                border-bottom: 8px solid #00bfff;
            }

            .tt-text-section { 
                flex: 1;
                text-align: left;
            }

            .tt-quote { 
                font-size: 3.2rem; 
                line-height: 1.2; 
                font-weight: 900; 
                color:#fff; 
                margin:0 0 25px 0;
            }
            
            /* ألوان الأصوات المستهدفة للجملة 35 */
            .s-sound { color: #00bfff; text-shadow: 0 0 25px rgba(0, 191, 255, 0.9); }
            .sh-sound { color: #ffffff; text-shadow: 0 0 25px rgba(255, 255, 255, 0.9); }

            .tt-instruction { 
                color:#00bfff; 
                font-size:1.4rem; 
                font-weight:800; 
                text-transform: uppercase;
                background: rgba(0, 191, 255, 0.1);
                padding: 15px 40px;
                border-radius: 10px;
                display: inline-block;
                border-left: 5px solid #ffffff;
            }

            .tt-image-container { 
                width: 380px;
                height: 380px; 
                border-radius: 30px; 
                border: 2px solid rgba(0, 191, 255, 0.3);
                overflow: hidden;
                box-shadow: 0 30px 60px rgba(0,0,0,0.7);
            }

            @keyframes waveIn {
                from { opacity:0; transform: translateX(-100px) skewX(10deg); }
                to { opacity:1; transform: translateX(0) skewX(0); }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">Tongue Twister #${ttNumber}</div>
            
            <div class="tt-main-card">
                <div class="tt-text-section">
                    <p class="tt-quote">${highlightedSentence}</p>
                    <p class="tt-instruction">
                        🐚 THE ULTIMATE CHALLENGE! (3x) 🐚
                    </p>
                </div>

                <div class="tt-image-container">
                    <img src="${imageUrl}" onerror="this.src='https://via.placeholder.com/400/160033/ffffff?text=SHELLS'" style="width:100%; height:100%; object-fit:cover;">
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
