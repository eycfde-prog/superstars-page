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
    container.style.cssText = `
        height:100%; width:100%; display:flex; flex-direction:column; 
        align-items:center; background:#050505; color:#fff; 
        font-family: 'Inter', sans-serif; position:relative; overflow:hidden;
    `;

    container.innerHTML = `
        <style>
            @keyframes blink { 0%, 100% { opacity:1; } 50% { opacity:0.3; } }
            @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.4); } 70% { box-shadow: 0 0 0 20px rgba(255, 0, 0, 0); } 100% { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0); } }
            
            .tv-overlay {
                position: absolute; inset: 0;
                background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), 
                            linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
                background-size: 100% 3px, 3px 100%;
                pointer-events: none; z-index: 20;
            }

            .tv-header { text-align:center; padding-top:2vh; z-index:10; }
            .tv-header h1 { font-size: 5vw; color: #fff; text-transform: uppercase; letter-spacing: 1.5vw; margin:0; font-weight: 900; filter: drop-shadow(0 0 15px rgba(255,255,255,0.2)); }
            .tv-live { background:#ff0000; color:#fff; padding:0.5vh 2vw; border-radius:4px; font-size:1.2vw; display:inline-block; animation: blink 1s infinite; margin-top:1vh; font-weight:bold; letter-spacing:2px; }
            
            .elements-grid { 
                display: grid; 
                grid-template-columns: repeat(4, 1fr); 
                gap: 1.5vw; 
                width: 90%; 
                margin-top: 4vh; z-index:10;
                flex-grow: 1;
                padding-bottom: 5vh;
            }

            .el-card {
                background: rgba(20, 20, 20, 0.8);
                border: 1px solid #333;
                padding: 2vh 1vw; 
                text-align: center; 
                border-radius: 8px;
                transition: 0.3s ease; 
                position:relative;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                backdrop-filter: blur(5px);
            }

            .el-card:hover { 
                border-color: #ff0000; 
                transform: scale(1.03); 
                background: #1a0505;
                box-shadow: 0 0 30px rgba(255,0,0,0.2); 
            }
            
            .el-icon { font-size: 3vw; margin-bottom: 1vh; display: block; }
            .el-label { font-size: 1.4vw; color: #ff0000; display: block; margin-bottom: 0.5vh; font-weight: 900; text-transform: uppercase; }
            .el-desc { font-size: 0.9vw; color: #ccc; line-height: 1.3; font-weight: 300; }

            .studio-light {
                position:absolute; top:-20vh; width:40vw; height:40vw; 
                background: radial-gradient(circle, rgba(255,0,0,0.1) 0%, transparent 70%); 
                filter:blur(60px); z-index:1;
            }

            /* Responsive Adjustments for smaller screens */
            @media (max-height: 600px) {
                .el-desc { display: none; }
                .el-card { padding: 1vh; }
            }
        </style>

        <div class="tv-overlay"></div>
        <div class="studio-light" style="left:-10vw;"></div>
        <div class="studio-light" style="right:-10vw;"></div>

        <div class="tv-header">
            <h1>TV SHOW</h1>
            <div class="tv-live">● ON AIR</div>
            <p style="color:#888; margin-top:1vh; font-size:1vw; letter-spacing:4px; text-transform:uppercase;">Level 8 Production Project</p>
        </div>

        <div class="elements-grid" id="elementsGrid"></div>
        
        <div style="position:absolute; bottom:2vh; color:#444; font-size:0.8vw; z-index:10; letter-spacing:5px; font-weight:bold;">
            STATUS: PRE-FILMING PHASE // SYSTEM_VETO_READY
        </div>
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
