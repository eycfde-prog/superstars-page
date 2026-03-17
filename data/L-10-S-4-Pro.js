(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- عناصر المقارنة بين الماضي والحاضر ---
    const topics = [
        { icon: "🐎", label: "Transportation" },
        { icon: "🍲", label: "Food & Water" },
        { icon: "📧", label: "Communication" },
        { icon: "🎮", label: "Entertainment" },
        { icon: "⚔️", label: "Weapons" },
        { icon: "📜", label: "Writing" },
        { icon: "🏠", label: "Housing" },
        { icon: "👨‍🔧", label: "Professions" },
        { icon: "💡", label: "Lighting" },
        { icon: "⏳", label: "Time" }
    ];

    container.innerHTML = '';
    container.style.cssText = `height:100%; width:100%; display:flex; flex-direction:column; align-items:center; background:#050505; color:#fff; font-family: 'Segoe UI', sans-serif; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            .bg-split { position:absolute; top:0; left:0; width:50%; height:100%; background: linear-gradient(to right, rgba(120,53,15,0.15), transparent); z-index:1; border-right: 1px dashed rgba(255,255,255,0.1); }
            .bg-split-right { position:absolute; top:0; right:0; width:50%; height:100%; background: linear-gradient(to left, rgba(3,105,161,0.15), transparent); z-index:1; }

            .proj-header { text-align:center; margin-top:40px; z-index:10; animation: vetoFadeDown 0.8s ease; }
            .proj-header h1 { font-size: 4vw; color: #fff; text-transform: uppercase; margin:0; font-weight: 900; letter-spacing: 2px; }
            .proj-header h1 span { color: #c5a059; }
            .proj-tag { color: #888; font-size: 1.2vw; margin-top: 5px; font-weight: bold; letter-spacing: 5px; text-transform: uppercase; }

            .comparison-grid { 
                display: grid; 
                grid-template-columns: repeat(5, 1fr); 
                gap: 20px; 
                width: 90%; 
                max-width: 1400px; 
                margin-top: 50px; 
                z-index:10;
            }

            .topic-card {
                background: rgba(255,255,255,0.03);
                border: 1px solid #333;
                padding: 30px 15px; 
                text-align: center; 
                border-radius: 20px;
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
                position: relative;
                cursor: pointer;
            }

            .topic-card:hover { 
                border-color: #c5a059; 
                background: rgba(197, 160, 89, 0.1); 
                transform: translateY(-10px) scale(1.05);
                box-shadow: 0 20px 40px rgba(0,0,0,0.5);
            }
            
            .topic-icon { font-size: 3.5vw; display: block; margin-bottom: 15px; filter: drop-shadow(0 5px 10px rgba(0,0,0,0.5)); }
            .topic-label { font-size: 1.3vw; color: #fff; font-weight: 900; display: block; text-transform: uppercase; letter-spacing: 1px; }

            .vs-footer {
                position: absolute; bottom: 40px; width: 100%;
                display: flex; justify-content: space-around; align-items: center;
                z-index: 10; padding: 0 10vw;
            }

            .side-label { 
                padding: 15px 60px; border-radius: 100px; font-size: 2.2vw; font-weight: 900; 
                letter-spacing: 5px; transition: 0.3s;
            }
            .side-past { background: #78350f; color: #fef3c7; box-shadow: 0 10px 30px rgba(120,53,15,0.4); border: 2px solid #a16207; }
            .side-present { background: #0369a1; color: #e0f2fe; box-shadow: 0 10px 30px rgba(3,105,161,0.4); border: 2px solid #075985; }

            @keyframes vetoFadeDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
        </style>

        <div class="bg-split"></div>
        <div class="bg-split-right"></div>

        <div class="proj-header">
            <p class="proj-tag">Project Presentation</p>
            <h1>THE <span>PAST</span> VS THE <span>PRESENT</span></h1>
        </div>

        <div class="comparison-grid" id="topicsGrid"></div>
        
        <div class="vs-footer">
            <div class="side-label side-past">PAST</div>
            <div style="font-size: 3vw; color: #c5a059; font-weight: 900; font-style: italic; text-shadow: 0 0 20px #c5a059;">VS</div>
            <div class="side-label side-present">PRESENT</div>
        </div>
    `;

    const grid = document.getElementById('topicsGrid');

    topics.forEach((t, index) => {
        const card = document.createElement('div');
        card.className = 'topic-card';
        card.style.animation = `vetoFadeDown 0.5s ease forwards ${index * 0.1}s`;
        card.style.opacity = '0';
        card.innerHTML = `
            <span class="topic-icon">${t.icon}</span>
            <span class="topic-label">${t.label}</span>
        `;
        grid.appendChild(card);
    });

})();
