(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration (WOLF Automated Update) ---
    const ttNumber = 32; 
    const ttSentence = "Four furious friends fought for the phone.";
    
    // WOLF Fix: سحب الصورة رقم 32 من مسار GitHub المعتمد
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
            radial-gradient(at 10% 10%, rgba(255, 0, 0, 0.15) 0px, transparent 50%),
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

    // WOLF Logic: تلوين صوت الـ F (بما في ذلك الـ PH) لهذه الجملة النارية
    const highlightedSentence = ttSentence.replace(/f|ph/gi, (matched) => {
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
                animation: fightIn 0.8s cubic-bezier(0.6, -0.28, 0.735, 0.045); 
            }
            
            .tt-badge { 
                background: linear-gradient(45deg, #ff0000, #ff4500);
                color:#fff;
                display:inline-block; 
                padding:12px 50px;
                font-weight:900;
                border-radius:0; 
                margin-bottom:30px;
                font-size:1.1rem; 
                letter-spacing:5px;
                text-transform:uppercase; 
                box-shadow: 0 0 30px rgba(255, 0, 0, 0.5);
                clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
            }

            .tt-main-card {
                display: flex;
                flex-direction: row;
                align-items: center;
                background: rgba(255, 0, 0, 0.02);
                backdrop-filter: blur(40px);
                border: 1px solid rgba(255, 0, 0, 0.2);
                border-radius: 40px;
                padding: 60px;
                width: 100%;
                box-shadow: 0 40px 100px rgba(0,0,0,0.9);
                gap: 50px;
                position: relative;
                border-bottom: 6px solid #ff0000;
            }

            .tt-text-section { 
                flex: 1;
                text-align: left;
            }

            .tt-quote { 
                font-size: 3.8rem; 
                line-height: 1.1; 
                font-weight: 900; 
                color:#fff; 
                margin:0 0 25px 0;
            }
            
            /* اللون المتوهج لصوت الـ F */
            .f-sound { color: #ff0000; text-shadow: 0 0 25px rgba(255, 0, 0, 0.9); }

            .tt-instruction { 
                color:#fff; 
                font-size:1.4rem; 
                font-weight:800; 
                text-transform: uppercase;
                background: rgba(255, 0, 0, 0.15);
                padding: 12px 35px;
                border-radius: 4px;
                display: inline-block;
                border: 2px solid #ff0000;
                transform: skewX(-10deg);
            }

            .tt-image-container { 
                width: 380px;
                height: 380px; 
                border-radius: 30px; 
                border: 2px solid rgba(255, 0, 0, 0.3);
                overflow: hidden;
                box-shadow: 0 30px 60px rgba(0,0,0,0.8);
                animation: shake 0.5s infinite alternate;
            }

            @keyframes shake {
                0% { transform: translate(1px, 1px) rotate(0deg); }
                10% { transform: translate(-1px, -2px) rotate(-1deg); }
                20% { transform: translate(-3px, 0px) rotate(1deg); }
                30% { transform: translate(3px, 2px) rotate(0deg); }
                40% { transform: translate(1px, -1px) rotate(1deg); }
            }

            @keyframes fightIn {
                from { opacity:0; transform: scale(1.5); filter: contrast(2); }
                to { opacity:1; transform: scale(1); filter: contrast(1); }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">Tongue Twister #${ttNumber}</div>
            
            <div class="tt-main-card">
                <div class="tt-text-section">
                    <p class="tt-quote">${highlightedSentence}</p>
                    <p class="tt-instruction">
                        😡 FURIOUS F CHALLENGE! (3x) 😡
                    </p>
                </div>

                <div class="tt-image-container">
                    <img src="${imageUrl}" onerror="this.src='https://via.placeholder.com/400/160033/ffffff?text=FRIENDS+FIGHTING'" style="width:100%; height:100%; object-fit:cover;">
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
