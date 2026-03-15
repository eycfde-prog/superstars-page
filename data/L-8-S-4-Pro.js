(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // --- عناصر مشروع برنامج التلفزيون ---
    const elements = [
        { icon: "🎤", label: "Host", desc: "The person who leads the talk." },
        { icon: "🌟", label: "Guest", desc: "A famous person or an expert." },
        { icon: "🎭", label: "Characters", desc: "Interesting people in the show." },
        { icon: "❓", label: "Questions", desc: "Prepare deep and fun questions." },
        { icon: "💬", label: "Answers", desc: "Smart and exciting responses." },
        { icon: "🎬", label: "Opening", desc: "How you start the show (Intro)." },
        { icon: "🏁", label: "Closing", desc: "How you end and say goodbye." },
        { icon: "🤝", label: "Harmony", desc: "Teamwork and smooth talking." }
    ];

    // --- التنسيق البصري ---
    container.innerHTML = '';
    container.style.cssText = `height:calc(100vh - 100px); display:flex; flex-direction:column; align-items:center; background:#050505; color:#fff; font-family: 'Arial Black', sans-serif; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            .tv-header { text-align:center; margin-top:30px; z-index:10; }
            .tv-header h1 { font-size: 4rem; color: #ff0000; text-transform: uppercase; letter-spacing: 5px; margin:0; text-shadow: 0 0 20px #ff0000; }
            .tv-live { background:#ff0000; color:#fff; padding:5px 15px; border-radius:5px; font-size:1.2rem; display:inline-block; animation: blink 1s infinite; margin-top:10px; }
            
            @keyframes blink { 0%, 100% { opacity:1; } 50% { opacity:0; } }

            .elements-grid { 
                display: grid; 
                grid-template-columns: repeat(4, 1fr); 
                gap: 20px; 
                width: 90%; max-width: 1100px; 
                margin-top: 40px; z-index:10;
            }

            .el-card {
                background: linear-gradient(145deg, #1a1a1a, #000);
                border: 2px solid #333;
                padding: 20px; text-align: center; border-radius: 15px;
                transition: 0.3s; cursor: pointer;
            }

            .el-card:hover { border-color: #ff0000; transform: scale(1.05); box-shadow: 0 0 20px rgba(255,0,0,0.3); }
            
            .el-icon { font-size: 3rem; margin-bottom: 10px; display: block; }
            .el-label { font-size: 1.5rem; color: #ff0000; display: block; margin-bottom: 5px; }
            .el-desc { font-size: 0.9rem; color: #888; font-family: 'Segoe UI', sans-serif; }

            /* تأثير أضواء الاستوديو */
            .light { position:absolute; top:-100px; width:400px; height:600px; background: radial-gradient(circle, rgba(255,0,0,0.1) 0%, transparent 70%); filter:blur(50px); z-index:1; }
            .light-left { left:-100px; transform: rotate(45deg); }
            .light-right { right:-100px; transform: rotate(-45deg); }
        </style>

        <div class="light light-left"></div>
        <div class="light light-right"></div>

        <div class="tv-header">
            <h1>T.V SHOW</h1>
            <div class="tv-live">● LIVE SESSION</div>
            <p style="color:#666; margin-top:15px; font-family:sans-serif;">Project #1: Work in groups of 2-3 to create your own show.</p>
        </div>

        <div class="elements-grid" id="elementsGrid"></div>
        
        <div style="position:absolute; bottom:30px; color:#444; font-size:0.8rem; z-index:10;">PROJECT PREPARATION MODE</div>
    `;

    const grid = document.getElementById('elementsGrid');

    elements.forEach(el => {
        const card = document.createElement('div');
        card.className = 'el-card';
        card.innerHTML = `
            <span class="el-icon">${el.icon}</span>
            <span class="el-label">${el.label}</span>
            <span class="el-desc">${el.desc}</span>
        `;
        grid.appendChild(card);
    });

})();
