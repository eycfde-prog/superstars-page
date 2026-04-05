(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration (WOLF Automated Update) ---
    const ttNumber = 29; 
    const ttSentence = "If you want to buy buy, if you don’t want to buy, bye-bye.";
    
    // WOLF Fix: سحب الصورة رقم 29 من مسار GitHub المعتمد
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
            radial-gradient(at 10% 10%, rgba(0, 255, 127, 0.15) 0px, transparent 50%),
            radial-gradient(at 90% 90%, rgba(255, 50, 50, 0.1) 0px, transparent 50%);
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

    // WOLF Logic: تلوين Homophones (Buy vs Bye)
    const highlightedSentence = ttSentence.replace(/buy|bye/gi, (matched) => {
        if (matched.toLowerCase() === 'buy') {
            return `<span class="buy-sound">${matched}</span>`;
        }
        return `<span class="bye-sound">${matched}</span>`;
    });

    container.innerHTML = `
        <style>
            .tt-wrapper { 
                width:95%; 
                max-width:1100px; 
                display: flex;
                flex-direction: column;
                align-items: center;
                animation: slideScale 0.8s ease-out; 
            }
            
            .tt-badge { 
                background: linear-gradient(45deg, #00ff7f, #ff3232);
                color:#fff;
                display:inline-block; 
                padding:12px 50px;
                font-weight:900;
                border-radius:5px 25px; 
                margin-bottom:30px;
                font-size:1.1rem; 
                letter-spacing:5px;
                text-transform:uppercase; 
                box-shadow: 0 10px 20px rgba(0,0,0,0.5);
                border: 1px solid rgba(255,255,255,0.2);
            }

            .tt-main-card {
                display: flex;
                flex-direction: row;
                align-items: center;
                background: rgba(255, 255, 255, 0.03);
                backdrop-filter: blur(30px);
                border: 1px solid rgba(255, 255, 255, 0.1);
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
                font-size: 3.5rem; 
                line-height: 1.2; 
                font-weight: 900; 
                color:#fff; 
                margin:0 0 25px 0;
            }
            
            /* ألوان الأصوات المستهدفة للجملة 29 */
            .buy-sound { color: #00ff7f; text-shadow: 0 0 25px rgba(0, 255, 127, 0.8); }
            .bye-sound { color: #ff3232; text-shadow: 0 0 25px rgba(255, 50, 50, 0.8); }

            .tt-instruction { 
                color:#fff; 
                font-size:1.4rem; 
                font-weight:800; 
                text-transform: uppercase;
                background: linear-gradient(90deg, rgba(0, 255, 127, 0.2), transparent);
                padding: 15px 40px;
                border-radius: 0 50px 50px 0;
                display: inline-block;
                border-left: 8px solid #00ff7f;
            }

            .tt-image-container { 
                width: 380px;
                height: 380px; 
                border-radius: 30px; 
                border: 2px solid rgba(255, 255, 255, 0.1);
                overflow: hidden;
                box-shadow: 0 30px 60px rgba(0,0,0,0.7);
                transform: perspective(1000px) rotateY(-10deg);
            }

            @keyframes slideScale {
                from { opacity:0; transform: scale(0.9) translateX(50px); }
                to { opacity:1; transform: scale(1) translateX(0); }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">Tongue Twister #${ttNumber}</div>
            
            <div class="tt-main-card">
                <div class="tt-text-section">
                    <p class="tt-quote">${highlightedSentence}</p>
                    <p class="tt-instruction">
                        👋 BUY or BYE? (3x) 👋
                    </p>
                </div>

                <div class="tt-image-container">
                    <img src="${imageUrl}" onerror="this.src='https://via.placeholder.com/400/160033/ffffff?text=BUY+OR+BYE'" style="width:100%; height:100%; object-fit:cover;">
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
