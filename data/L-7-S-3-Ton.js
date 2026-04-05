(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration (WOLF Automated Update) ---
    const ttNumber = 20; 
    const ttSentence = "Each Easter Eddie eats eighty Easter eggs.";
    
    // WOLF Fix: سحب الصورة رقم 20 من مسار GitHub المعتمد
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
            radial-gradient(at 10% 10%, rgba(191, 0, 255, 0.15) 0px, transparent 50%),
            radial-gradient(at 90% 90%, rgba(255, 105, 180, 0.1) 0px, transparent 50%);
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

    // WOLF Logic: تلوين حرف الـ E المهيمن في هذه الجملة "البيضاوية"
    const highlightedSentence = ttSentence.replace(/e/gi, (matched) => {
        return `<span class="e-sound">${matched}</span>`;
    });

    container.innerHTML = `
        <style>
            .tt-wrapper { 
                width:95%; 
                max-width:1100px; 
                display: flex;
                flex-direction: column;
                align-items: center;
                animation: eggDrop 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
            }
            
            .tt-badge { 
                background: linear-gradient(45deg, #bf00ff, #ff69b4);
                color:#fff;
                display:inline-block; 
                padding:10px 45px;
                font-weight:900;
                border-radius:50px; 
                margin-bottom:30px;
                font-size:1.1rem; 
                letter-spacing:4px;
                text-transform:uppercase; 
                box-shadow: 0 0 25px rgba(191, 0, 255, 0.5);
                border: 2px solid rgba(255,255,255,0.2);
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
            
            /* اللون المتوهج لحرف الـ E */
            .e-sound { color: #bf00ff; text-shadow: 0 0 25px rgba(191, 0, 255, 0.9); }

            .tt-instruction { 
                color:#fff; 
                font-size:1.3rem; 
                font-weight:800; 
                background: rgba(191, 0, 255, 0.15);
                padding: 12px 30px;
                border-radius: 15px;
                display: inline-block;
                border-left: 5px solid #bf00ff;
            }

            .tt-image-container { 
                width: 380px;
                height: 380px; 
                border-radius: 50% 50% 40% 40%; /* شكل بيضاوي تقريبي */
                border: 3px solid #bf00ff;
                overflow: hidden;
                box-shadow: 0 20px 50px rgba(191, 0, 255, 0.2);
            }

            @keyframes eggDrop {
                from { opacity:0; transform: translateY(-100px); }
                to { opacity:1; transform: translateY(0); }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">Tongue Twister #${ttNumber}</div>
            
            <div class="tt-main-card">
                <div class="tt-text-section">
                    <p class="tt-quote">${highlightedSentence}</p>
                    <p class="tt-instruction">
                        🥚 The Egg-streme Challenge! (3x) 🥚
                    </p>
                </div>

                <div class="tt-image-container">
                    <img src="${imageUrl}" onerror="this.src='https://via.placeholder.com/400/160033/ffffff?text=EASTER+EGGS'" style="width:100%; height:100%; object-fit:cover;">
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
