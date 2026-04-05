(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Configuration (WOLF Automated Update) ---
    const ttNumber = 10; 
    const ttSentence = "Truly rural.";
    
    // WOLF Fix: سحب الصورة رقم 10 تلقائياً من المسار المحدد
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
            radial-gradient(at 10% 10%, rgba(255, 0, 50, 0.15) 0px, transparent 50%),
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

    // WOLF Logic: تلوين الأصوات المستهدفة (R و L) لهذه الجملة المستحيلة
    const highlightedSentence = ttSentence.replace(/r|l/gi, (matched) => {
        if (matched.toLowerCase() === 'r') {
            return `<span class="r-sound">${matched}</span>`;
        }
        return `<span class="l-sound">${matched}</span>`;
    });

    container.innerHTML = `
        <style>
            .tt-wrapper { 
                width:95%; 
                max-width:1100px; 
                display: flex;
                flex-direction: column;
                align-items: center;
                animation: extremeIn 1.2s cubic-bezier(0.23, 1, 0.32, 1); 
            }
            
            .tt-badge { 
                background: linear-gradient(45deg, #ff0032, #00fff2);
                color:#fff;
                display:inline-block; 
                padding:10px 40px;
                font-weight:900;
                border-radius:10px; 
                margin-bottom:30px;
                font-size:1.1rem; 
                letter-spacing:5px;
                text-transform:uppercase; 
                box-shadow: 0 0 30px rgba(255, 0, 50, 0.4);
                border: 2px solid rgba(255,255,255,0.2);
            }

            .tt-main-card {
                display: flex;
                flex-direction: row;
                align-items: center;
                background: rgba(255, 255, 255, 0.02);
                backdrop-filter: blur(30px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 60px;
                padding: 70px;
                width: 100%;
                box-shadow: 0 60px 150px rgba(0,0,0,0.8);
                gap: 60px;
                position: relative;
            }

            .tt-text-section { 
                flex: 1;
                text-align: left;
            }

            .tt-quote { 
                font-size: 5.5rem; 
                line-height: 1.1; 
                font-weight: 900; 
                color:#fff; 
                margin:0 0 25px 0;
                letter-spacing: -3px;
            }
            
            /* ألوان الأصوات المستهدفة للجملة 10 (صعوبة قصوى) */
            .r-sound { color: #ff0032; text-shadow: 0 0 30px rgba(255, 0, 50, 0.9); }
            .l-sound { color: #00fff2; text-shadow: 0 0 30px rgba(0, 255, 242, 0.9); }

            .tt-instruction { 
                color:#ff0032; 
                font-size:1.5rem; 
                font-weight:900; 
                text-transform: uppercase;
                letter-spacing: 2px;
                background: rgba(255, 255, 255, 0.05);
                padding: 15px 35px;
                border-radius: 100px;
                display: inline-block;
                box-shadow: inset 0 0 20px rgba(255, 0, 50, 0.2);
            }

            .tt-image-container { 
                width: 400px;
                height: 400px; 
                border-radius: 40px; 
                border: 1px solid rgba(255,255,255,0.1);
                overflow: hidden;
                box-shadow: 0 40px 80px rgba(0,0,0,0.9);
                transform: perspective(1000px) rotateY(-10deg);
            }

            @keyframes extremeIn {
                from { opacity:0; transform: scale(1.2) translateY(50px); filter: blur(20px); }
                to { opacity:1; transform: scale(1) translateY(0); filter: blur(0); }
            }
        </style>

        <div class="tt-wrapper">
            <div class="tt-badge">TT CHALLENGE #${ttNumber}</div>
            
            <div class="tt-main-card">
                <div class="tt-text-section">
                    <p class="tt-quote">${highlightedSentence}</p>
                    <p class="tt-instruction">
                        🔥 WORLD RECORD LEVEL 🔥
                    </p>
                </div>

                <div class="tt-image-container">
                    <img src="${imageUrl}" onerror="this.src='https://via.placeholder.com/400/160033/ffffff?text=TRULY+RURAL'" style="width:100%; height:100%; object-fit:cover;">
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
