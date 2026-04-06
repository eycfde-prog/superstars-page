(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Ideas List (Family Topic) ---
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

    container.innerHTML = '';
    container.style.cssText = `height:100%; display:flex; flex-direction:column; align-items:center; background:#f1f5f9; color:#1e293b; font-family: 'Inter', 'Segoe UI', sans-serif; overflow-y: auto; padding: 50px 20px;`;

    container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
            
            #stage-content::-webkit-scrollbar { width: 10px; }
            #stage-content::-webkit-scrollbar-track { background: #f1f5f9; }
            #stage-content::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }

            .dmt-header { text-align:center; margin-bottom:60px; animation: fadeInDown 0.6s ease-out; }
            .dmt-header p { font-size: 1.1rem; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 5px; }
            .dmt-header h1 { font-size: 4rem; color: #1e3a8a; margin:0; font-weight: 900; }
            
            .ideas-grid { 
                display: grid; 
                grid-template-columns: repeat(2, 1fr); 
                gap: 25px; 
                max-width: 1100px; 
                width: 100%; 
                animation: fadeInUp 0.8s ease-out;
            }

            .idea-card {
                background: #ffffff;
                padding: 30px;
                border-radius: 20px;
                border: 1px solid #e2e8f0;
                box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                position: relative;
                overflow: hidden;
            }

            .idea-card:hover { 
                transform: translateY(-10px); 
                box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
                border-color: #3b82f6;
            }

            .idea-card::after {
                content: '';
                position: absolute;
                left: 0; top: 0; bottom: 0; width: 8px;
                background: #3b82f6;
                opacity: 0.3;
            }
            
            .idea-num { font-weight: 900; color: #3b82f6; font-size: 1.2rem; margin-bottom: 10px; font-family: 'Inter'; opacity: 0.6; }
            .idea-title { font-weight: 800; color: #0f172a; font-size: 1.6rem; margin-bottom: 12px; display:block; }
            .idea-detail { color: #475569; font-size: 1.2rem; line-height: 1.6; font-weight: 500; }

            @keyframes fadeInDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

            @media (max-width: 900px) { .ideas-grid { grid-template-columns: 1fr; } }
        </style>

        <div class="dmt-header">
            <p>DMT Session: Idea Generation</p>
            <h1>My Family Story</h1>
        </div>

        <div class="ideas-grid" id="ideasGrid"></div>
        <div style="height: 50px;"></div>
    `;

    const grid = document.getElementById('ideasGrid');

    ideas.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'idea-card';
        card.innerHTML = `
            <div class="idea-num">SECTION 0${index + 1}</div>
            <span class="idea-title">${item.title}</span>
            <div class="idea-detail">${item.detail}</div>
        `;
        grid.appendChild(card);
    });

    // Space key to signal completion
    document.onkeydown = (e) => {
        if (e.keyCode === 32) {
             if(window.triggerVetoDone) window.triggerVetoDone();
        }
    };

})();
