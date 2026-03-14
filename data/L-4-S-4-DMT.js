(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // --- قائمة الأفكار (Family Topic) ---
    const ideas = [
        { title: "Introduction", detail: "How many people are there in your family?" },
        { title: "Parents", detail: "Talk about your father and mother (Names, Jobs, Personalities)." },
        { title: "Siblings", detail: "Do you have brothers or sisters? Are they older or younger?" },
        { title: "Relationships", detail: "Who are you closest to in your family? Why?" },
        { title: "Activities", detail: "What is your favorite activity to do together as a family?" },
        { title: "Rules", detail: "Talk about one important rule in your house." },
        { title: "Memories", detail: "Describe a happy memory you have with your family." },
        { title: "Home Life", detail: "Who usually cooks? Who is the funniest person at home?" },
        { title: "Support", detail: "How does your family help or encourage you?" },
        { title: "Conclusion", detail: "Why is family important to you in one sentence?" }
    ];

    // --- التنسيق البصري ---
    container.innerHTML = '';
    container.style.cssText = `height:calc(100vh - 100px); display:flex; flex-direction:column; align-items:center; background:#f8fafc; color:#1e293b; font-family: 'Segoe UI', Tahoma, sans-serif; overflow-y: auto; padding: 40px 20px;`;

    container.innerHTML = `
        <style>
            .dmt-prep-header { text-align:center; margin-bottom:40px; }
            .dmt-prep-header h1 { font-size: 3rem; color: #2563eb; margin:0; }
            .dmt-prep-header p { font-size: 1.2rem; color: #64748b; font-weight: 500; }
            
            .ideas-grid { 
                display: grid; 
                grid-template-columns: 1fr 1fr; 
                gap: 20px; 
                max-width: 1000px; 
                width: 100%; 
            }

            .idea-card {
                background: #ffffff;
                padding: 20px;
                border-radius: 15px;
                border-left: 8px solid #2563eb;
                box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
                transition: transform 0.2s;
            }

            .idea-card:hover { transform: translateY(-5px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
            
            .idea-num { font-weight: 900; color: #cbd5e1; font-size: 1.5rem; margin-bottom: 5px; }
            .idea-title { font-weight: bold; color: #1e293b; font-size: 1.4rem; margin-bottom: 8px; display:block; }
            .idea-detail { color: #475569; font-size: 1.1rem; line-height: 1.4; }

            @media (max-width: 800px) { .ideas-grid { grid-template-columns: 1fr; } }
        </style>

        <div class="dmt-prep-header">
            <p>DMT Preparation Topic:</p>
            <h1>My Family</h1>
        </div>

        <div class="ideas-grid" id="ideasGrid"></div>
    `;

    const grid = document.getElementById('ideasGrid');

    ideas.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'idea-card';
        card.innerHTML = `
            <div class="idea-num">0${index + 1}</div>
            <span class="idea-title">${item.title}</span>
            <div class="idea-detail">${item.detail}</div>
        `;
        grid.appendChild(card);
    });

})();
