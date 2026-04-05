(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration (WOLF Automated Update) ---
    const ttNumber = 19; 
    const ttSentence = "Blue blurry butterflies.";
    
    // WOLF Fix: سحب الصورة رقم 19 من مسار GitHub المعتمد
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
            radial-gradient(at 10% 10%, rgba(0, 102, 255, 0.2) 0px, transparent 50%),
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

    // WOLF Logic: تلوين الأصوات المستهدفة (B و R) مع تأثير "Blurry" للـ R
    const highlightedSentence = ttSentence.replace(/b|r/gi, (matched) => {
        if (matched.toLowerCase() === 'b') {
            return `<span class="b-sound">${matched}</span>`;
        }
        return `<span class="r-sound">${matched}</span>`;
    });

    container.innerHTML = `
        <style>
            .tt-wrapper { 
                width:95%; 
                max-width:1100px; 
                display: flex;
                flex-direction: column;
                align-items: center;
                animation: flutterIn 1s cubic-bezier(0.19, 1, 0.22, 1); 
            }
            
            .tt-badge { 
                background: linear-gradient(45deg, #0066ff, #ffffff);
                color:#000;
                display:inline-block; 
                padding:10px 45px;
                font-weight:900;
                border-radius:50px; 
                margin-bottom:30px;
                font-size:1.1rem; 
                letter-spacing:4px;
                text-transform:uppercase; 
                box-shadow: 0 0 20px rgba(0, 102, 255, 0.4);
            }

            .tt-main-card {
                display: flex;
                flex-direction: row;
                align-items: center;
                background: rgba(255, 255, 255, 0.02);
                backdrop-filter: blur(15px);
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
                font-size: 4.8rem; 
                line-height: 1.1; 
                font-weight: 900; 
                color:#fff; 
                margin:0 0 25px 0;
            }
            
            /* ألوان الأصوات المستهدفة للجملة 19 */
            .b-sound { color: #0066ff; text-shadow: 0 0 25px rgba(0, 102, 255, 0.9); }
            .r-sound { 
                color: #ffffff; 
                text-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
                filter: blur(1px); /* تأثير ضبابي خفيف للـ R */
            }

            .tt-instruction { 
                color:#0066ff; 
                font-size:1.4rem; 
                font-weight:800; 
                text-transform: uppercase;
                background: rgba(255, 255, 255, 0.9);
                padding: 10px 30px;
                border-radius: 5px;
                display: inline-block;
                box-shadow: 5px 5px 0px #0066ff;
            }

            .tt-image-container { 
                width: 380px;
                height: 380px; 
                border-radius: 30px; 
                border: 2px solid rgba(0, 102, 255, 0.3);
                overflow: hidden;
                box-shadow: 0 0 40px rgba(0, 102, 255, 0.2);
                animation: wingFlap 3s infinite ease-in-out;
            }

            @keyframes wingFlap {
                0%, 100% { transform: scale(1) rotate(0deg); }
                50% { transform: scale(1.05) rotate(2deg); }
            }

            @keyframes flutterIn {
                from { opacity:0; transform: translateY(-100px) rotate(-10deg); }
                to { opacity:1; transform: translateY(0) rotate(0); }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">Tongue Twister #${ttNumber}</div>
            
            <div class="tt-main-card">
                <div class="tt-text-section">
                    <p class="tt-quote">${highlightedSentence}</p>
                    <p class="tt-instruction">
                        🦋 Don't get blurry! (3x) 🦋
                    </p>
                </div>

                <div class="tt-image-container">
                    <img src="${imageUrl}" onerror="this.src='https://via.placeholder.com/400/160033/ffffff?text=BUTTERFLIES'" style="width:100%; height:100%; object-fit:cover;">
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
