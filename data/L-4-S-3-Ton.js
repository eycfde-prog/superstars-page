
(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration (WOLF Automated Update) ---
    const ttNumber = 8; 
    const ttSentence = "A big black bug bit a big black dog";
    
    // WOLF Fix: سحب الصورة رقم 8 تلقائياً من المسار المحدد
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
            radial-gradient(at 10% 10%, rgba(122, 69, 212, 0.2) 0px, transparent 50%),
            radial-gradient(at 90% 90%, rgba(210, 69, 166, 0.15) 0px, transparent 50%);
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

    // WOLF Logic: تلوين الحروف المتفجرة (B و G) لهذه الجملة
    const highlightedSentence = ttSentence.replace(/b|g/gi, (matched) => {
        if (matched.toLowerCase() === 'b') {
            return `<span class="b-sound">${matched}</span>`;
        }
        return `<span class="g-sound">${matched}</span>`;
    });

    container.innerHTML = `
        <style>
            .tt-wrapper { 
                width:95%; 
                max-width:1100px; 
                display: flex;
                flex-direction: column;
                align-items: center;
                animation: popIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55); 
            }
            
            .tt-badge { 
                background: linear-gradient(45deg, #00fff2, #ff00cc);
                color:#fff;
                display:inline-block; 
                padding:10px 40px;
                font-weight:900;
                border-radius:15px; 
                margin-bottom:30px;
                font-size:1.1rem; 
                letter-spacing:4px;
                text-transform:uppercase; 
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
                transform: skew(-10deg);
            }

            .tt-main-card {
                display: flex;
                flex-direction: row;
                align-items: center;
                background: rgba(255, 255, 255, 0.02);
                backdrop-filter: blur(30px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 50px;
                padding: 60px;
                width: 100%;
                box-shadow: 0 60px 120px rgba(0,0,0,0.7);
                gap: 50px;
                position: relative;
                overflow: hidden;
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
                margin:0 0 30px 0;
                text-transform: capitalize;
            }
            
            /* ألوان الأصوات المستهدفة للجملة 8 */
            .b-sound { color: #00fff2; text-shadow: 0 0 20px rgba(0, 255, 242, 0.9); }
            .g-sound { color: #ff00cc; text-shadow: 0 0 20px rgba(255, 0, 204, 0.9); }

            .tt-instruction { 
                color:#00fff2; 
                font-size:1.4rem; 
                font-weight:900; 
                letter-spacing: 2px;
                display: flex;
                align-items: center;
                gap: 15px;
            }

            .tt-instruction::before {
                content: '';
                width: 50px;
                height: 4px;
                background: #ff00cc;
                display: inline-block;
            }

            .tt-image-container { 
                width: 380px;
                height: 380px; 
                border-radius: 40px; 
                border: 2px solid rgba(0, 255, 242, 0.3);
                overflow: hidden;
                box-shadow: 0 0 40px rgba(0, 255, 242, 0.2);
            }

            @keyframes popIn {
                from { opacity:0; transform: scale(0.7); }
                to { opacity:1; transform: scale(1); }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">Tongue Twister #${ttNumber}</div>
            
            <div class="tt-main-card">
                <div class="tt-text-section">
                    <p class="tt-quote">${highlightedSentence}</p>
                    <div class="tt-instruction">
                        3X SPEED CHALLENGE
                    </div>
                </div>

                <div class="tt-image-container">
                    <img src="${imageUrl}" onerror="this.src='https://via.placeholder.com/400/160033/ffffff?text=BLACK+BUG'" style="width:100%; height:100%; object-fit:cover;">
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
