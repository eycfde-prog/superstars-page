(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    const elements = [
        { icon: "🎤", label: "Host", desc: "The leader who drives the conversation." },
        { icon: "🌟", label: "Guest", desc: "An expert, celebrity, or a person with a story." },
        { icon: "🎭", label: "Characters", desc: "Unique personalities to make it fun." },
        { icon: "❓", label: "Questions", desc: "Prepare 'Open' questions (How/Why)." },
        { icon: "💬", label: "Answers", desc: "Exciting, detailed, and smart responses." },
        { icon: "🎬", label: "Intro", desc: "A powerful opening to grab attention." },
        { icon: "🏁", label: "Outro", desc: "Summary and a professional goodbye." },
        { icon: "🤝", label: "Harmony", desc: "Teamwork and listening to each other." }
    ];

    container.innerHTML = '';
    container.style.cssText = `height:100%; display:flex; flex-direction:column; align-items:center; background:#050505; color:#fff; font-family: 'Inter', sans-serif; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            @keyframes scanline { 0% { bottom: 100%; } 100% { bottom: 0%; } }
            @keyframes blink { 0%, 100% { opacity:1; } 50% { opacity:0.3; } }
            
            .tv-overlay {
                position: absolute; inset: 0;
                background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), 
                            linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
                background-size: 100% 2px, 3px 100%;
                pointer-events: none; z-index: 20;
            }

            .tv-header { text-align:center; margin-top:40px; z-index:10; }
            .tv-header h1 { font-size: 5rem; color: #fff; text-transform: uppercase; letter-spacing: 15px; margin:0; font-weight: 900; }
            .tv-live { background:#ff0000; color:#fff; padding:8px 25px; border-radius:4px; font-size:1.5rem; display:inline-block; animation: blink 0.8s infinite; margin-top:15px; font-weight:bold; letter-spacing:2px; }
            
            .elements-grid { 
                display: grid; 
                grid-template-columns: repeat(4, 1fr); 
                gap: 25px; 
                width: 92%; max-width: 1200px; 
                margin-top: 50px; z-index:10;
            }

            .el-card {
                background: #111;
                border: 1px solid #222;
                padding: 30px 20px; text-align: center; border-radius: 4px;
                transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); position:relative;
                overflow:hidden;
            }

            .el-card:hover { 
                border-color: #ff0000; 
                transform: translateY(-10px); 
                background: #1a0000;
                box-shadow: 0 10px 30px rgba(255,0,0,0.2); 
            }
            
            .el-icon { font-size: 3.5rem; margin-bottom: 15px; display: block; filter: drop-shadow(0 0 10px rgba(255,255,255,0.3)); }
            .el-label { font-size: 1.6rem; color: #ff0000; display: block; margin-bottom: 10px; font-weight: 900; text-transform: uppercase; }
            .el-desc { font-size: 1.1rem; color: #aaa; line-height: 1.4; }

            .studio-light {
                position:absolute; top:-150px; width:500px; height:500px; 
                background: radial-gradient(circle, rgba(255,0,0,0.15) 0%, transparent 70%); 
                filter:blur(80px); z-index:1;
            }
        </style>

        <div class="tv-overlay"></div>
        <div class="studio-light" style="left:-100px;"></div>
        <div class="studio-light" style="right:-100px;"></div>

        <div class="tv-header">
            <h1>TV SHOW</h1>
            <div class="tv-live">● ON AIR</div>
            <p style="color:#888; margin-top:20px; font-size:1.3rem; letter-spacing:2px;">CREATIVE PRODUCTION: LEVEL 8 PROJECT</p>
        </div>

        <div class="elements-grid" id="elementsGrid"></div>
        
        <div style="position:absolute; bottom:30px; color:#333; font-size:1rem; z-index:10; letter-spacing:5px;">PRODUCTION STATUS: PRE-FILMING</div>
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
