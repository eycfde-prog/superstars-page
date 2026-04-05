(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration (WOLF Automated Update) ---
    const ttNumber = 18; 
    const ttSentence = "Nine nice night nurses nursing nicely.";
    
    // WOLF Fix: سحب الصورة رقم 18 من مسار GitHub المعتمد
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
            radial-gradient(at 10% 10%, rgba(191, 0, 255, 0.15) 0px, transparent 50%),
            radial-gradient(at 90% 90%, rgba(0, 255, 242, 0.1) 0px, transparent 50%);
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

    // WOLF Logic: تلوين حرف الـ N المهيمن في هذه الجملة
    const highlightedSentence = ttSentence.replace(/n/gi, (matched) => {
        return `<span class="n-sound">${matched}</span>`;
    });

    container.innerHTML = `
        <style>
            .tt-wrapper { 
                width:95%; 
                max-width:1100px; 
                display: flex;
                flex-direction: column;
                align-items: center;
                animation: nurseIn 0.8s ease-out; 
            }
            
            .tt-badge { 
                background: linear-gradient(45deg, #bf00ff, #00fff2);
                color:#fff;
                display:inline-block; 
                padding:10px 45px;
                font-weight:900;
                border-radius:15px; 
                margin-bottom:30px;
                font-size:1.1rem; 
                letter-spacing:5px;
                text-transform:uppercase; 
                box-shadow: 0 0 25px rgba(191, 0, 255, 0.5);
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
                border-right: 8px solid #bf00ff;
            }

            .tt-text-section { 
                flex: 1;
                text-align: left;
            }

            .tt-quote { 
                font-size: 3.8rem; 
                line-height: 1.2; 
                font-weight: 900; 
                color:#fff; 
                margin:0 0 25px 0;
            }
            
            /* اللون المتوهج لحرف الـ N */
            .n-sound { color: #bf00ff; text-shadow: 0 0 25px rgba(191, 0, 255, 0.9); }

            .tt-instruction { 
                color:#00fff2; 
                font-size:1.4rem; 
                font-weight:800; 
                text-transform: uppercase;
                background: rgba(191, 0, 255, 0.1);
                padding: 12px 35px;
                border-radius: 50px;
                display: inline-block;
                border: 1px solid #bf00ff;
            }

            .tt-image-container { 
                width: 380px;
                height: 380px; 
                border-radius: 40px; 
                border: 2px solid #bf00ff;
                overflow: hidden;
                box-shadow: 0 20px 50px rgba(191, 0, 255, 0.2);
            }

            @keyframes nurseIn {
                from { opacity:0; transform: scale(0.9); filter: blur(10px); }
                to { opacity:1; transform: scale(1); filter: blur(0); }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">Tongue Twister #${ttNumber}</div>
            
            <div class="tt-main-card">
                <div class="tt-text-section">
                    <p class="tt-quote">${highlightedSentence}</p>
                    <p class="tt-instruction">
                        🏥 The "N" Challenge! (3x) 🏥
                    </p>
                </div>

                <div class="tt-image-container">
                    <img src="${imageUrl}" onerror="this.src='https://via.placeholder.com/400/160033/ffffff?text=NIGHT+NURSES'" style="width:100%; height:100%; object-fit:cover;">
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
