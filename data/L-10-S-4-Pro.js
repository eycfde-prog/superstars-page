(function() {
    const container = document.getElementById('activityFinalContent');
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

    // --- التنسيق البصري ---
    container.innerHTML = '';
    container.style.cssText = `height:calc(100vh - 100px); display:flex; flex-direction:column; align-items:center; background:#1a1a1a; color:#fff; font-family: 'Georgia', serif; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            .proj-header { text-align:center; margin-top:20px; z-index:10; }
            .proj-header h1 { font-size: 3.5rem; color: #eab308; text-transform: uppercase; margin:0; text-shadow: 2px 2px 0px #854d0e; }
            .proj-tag { color: #a1a1aa; font-size: 1.2rem; margin-top: 5px; font-style: italic; }

            .comparison-grid { 
                display: grid; 
                grid-template-columns: repeat(5, 1fr); 
                gap: 15px; 
                width: 95%; max-width: 1200px; 
                margin-top: 30px; z-index:10;
            }

            .topic-card {
                background: #262626;
                border: 1px solid #444;
                padding: 15px; text-align: center; border-radius: 12px;
                transition: 0.3s; position: relative;
            }

            .topic-card:hover { border-color: #eab308; background: #333; transform: translateY(-5px); }
            
            .topic-icon { font-size: 2.5rem; display: block; margin-bottom: 10px; }
            .topic-label { font-size: 1.1rem; color: #fbbf24; font-weight: bold; display: block; }

            .vs-divider {
                display: flex; width: 100%; justify-content: space-around;
                margin-top: 40px; border-top: 2px dashed #444; padding-top: 20px;
            }

            .side-box { padding: 10px 40px; border-radius: 50px; font-size: 2rem; font-weight: 900; letter-spacing: 2px; }
            .side-past { background: #78350f; color: #fef3c7; box-shadow: 0 0 20px rgba(120,53,15,0.5); }
            .side-present { background: #0369a1; color: #e0f2fe; box-shadow: 0 0 20px rgba(3,105,161,0.5); }

            /* تأثير الخلفية المقسمة */
            .bg-split { position:absolute; top:0; left:0; width:50%; height:100%; background: rgba(120,53,15,0.05); z-index:1; }
            .bg-split-right { left:50%; background: rgba(3,105,161,0.05); }
        </style>

        <div class="bg-split"></div>
        <div class="bg-split-right"></div>

        <div class="proj-header">
            <h1>The Past VS The Present</h1>
            <p class="proj-tag">Project #2: Comparative Analysis Presentation</p>
        </div>

        <div class="comparison-grid" id="topicsGrid"></div>
        
        <div class="vs-divider">
            <div class="side-box side-past">PAST</div>
            <div style="font-size: 2rem; color: #eab308; align-self: center;">V S</div>
            <div class="side-box side-present">PRESENT</div>
        </div>
    `;

    const grid = document.getElementById('topicsGrid');

    topics.forEach(t => {
        const card = document.createElement('div');
        card.className = 'topic-card';
        card.innerHTML = `
            <span class="topic-icon">${t.icon}</span>
            <span class="topic-label">${t.label}</span>
        `;
        grid.appendChild(card);
    });

})();
