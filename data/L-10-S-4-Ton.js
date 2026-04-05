(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration (WOLF Automated Update) ---
    const ttNumber = 33; 
    const ttSentence = "Give papa a cup of proper coffee in a copper coffee cup.";
    
    // WOLF Fix: سحب الصورة رقم 33 من مسار GitHub المعتمد
 const cacheBuster = new Date().getTime();
    const imageUrl = `https://raw.githubusercontent.com/eycfde-prog/EYCVetoProgram/main/data/tt/${ttNumber}.png?v=${cacheBuster}`; 
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
            radial-gradient(at 10% 10%, rgba(184, 115, 51, 0.2) 0px, transparent 50%),
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

    // WOLF Logic: تلوين أصوات الـ P والـ C (النحاسي والوردي)
    const highlightedSentence = ttSentence.replace(/p|c/gi, (matched) => {
        if (matched.toLowerCase() === 'p') {
            return `<span class="p-sound">${matched}</span>`;
        }
        return `<span class="c-sound">${matched}</span>`;
    });

    container.innerHTML = `
        <style>
            .tt-wrapper { 
                width:95%; 
                max-width:1100px; 
                display: flex;
                flex-direction: column;
                align-items: center;
                animation: coffeeSteam 0.8s ease-out; 
            }
            
            .tt-badge { 
                background: linear-gradient(45deg, #b87333, #ff00cc);
                color:#fff;
                display:inline-block; 
                padding:12px 50px;
                font-weight:900;
                border-radius:15px 50px; 
                margin-bottom:30px;
                font-size:1.1rem; 
                letter-spacing:5px;
                text-transform:uppercase; 
                box-shadow: 0 10px 20px rgba(184, 115, 51, 0.4);
                border: 1px solid rgba(255,255,255,0.2);
            }

            .tt-main-card {
                display: flex;
                flex-direction: row;
                align-items: center;
                background: rgba(255, 255, 255, 0.03);
                backdrop-filter: blur(30px);
                border: 1px solid rgba(184, 115, 51, 0.3);
                border-radius: 40px;
                padding: 60px;
                width: 100%;
                box-shadow: 0 40px 100px rgba(0,0,0,0.8);
                gap: 50px;
                position: relative;
                border-right: 10px solid #b87333;
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
            
            /* ألوان الأصوات المستهدفة للجملة 33 */
            .p-sound { color: #ff00cc; text-shadow: 0 0 20px rgba(255, 0, 204, 0.8); }
            .c-sound { color: #b87333; text-shadow: 0 0 25px rgba(184, 115, 51, 0.9); }

            .tt-instruction { 
                color:#b87333; 
                font-size:1.4rem; 
                font-weight:800; 
                text-transform: uppercase;
                background: rgba(184, 115, 51, 0.1);
                padding: 12px 35px;
                border-radius: 5px;
                display: inline-block;
                border: 1px solid #b87333;
            }

            .tt-image-container { 
                width: 380px;
                height: 380px; 
                border-radius: 30px; 
                border: 2px solid #b87333;
                overflow: hidden;
                box-shadow: 0 30px 60px rgba(0,0,0,0.7);
                animation: gentleSway 4s infinite ease-in-out;
            }

            @keyframes gentleSway {
                0%, 100% { transform: rotate(-1deg) translateY(0); }
                50% { transform: rotate(1deg) translateY(-10px); }
            }

            @keyframes coffeeSteam {
                from { opacity:0; transform: translateY(30px); filter: blur(10px); }
                to { opacity:1; transform: translateY(0); filter: blur(0); }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">Tongue Twister #${ttNumber}</div>
            
            <div class="tt-main-card">
                <div class="tt-text-section">
                    <p class="tt-quote">${highlightedSentence}</p>
                    <p class="tt-instruction">
                        ☕ THE PROPER CHALLENGE! (3x) ☕
                    </p>
                </div>

                <div class="tt-image-container">
                    <img src="${imageUrl}" onerror="this.src='https://via.placeholder.com/400/160033/ffffff?text=COPPER+CUP'" style="width:100%; height:100%; object-fit:cover;">
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
