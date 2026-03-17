(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Friends Topic Ideas ---
    const ideas = [
        { title: "Best Friend", detail: "Who is your best friend? How long have you known each other?" },
        { title: "First Meeting", detail: "Where and how did you meet for the first time?" },
        { title: "Personality", detail: "Describe your friend's character (Kind, funny, honest, etc.)." },
        { title: "Appearance", detail: "How does your friend look like? (Tall, short, hair, style)." },
        { title: "Common Interests", detail: "What things do you both like to do together?" },
        { title: "Loyalty", detail: "Why do you trust this friend? Give an example of their support." },
        { title: "Disagreements", detail: "Do you ever argue? How do you fix the problem?" },
        { title: "Memorable Moment", detail: "Tell a funny or crazy story that happened with your friends." },
        { title: "Group vs. Individual", detail: "Do you prefer having many friends or one close friend?" },
        { title: "Definition", detail: "In your opinion, what makes a 'true friend'?" }
    ];

    container.innerHTML = '';
    container.style.cssText = `height:100%; display:flex; flex-direction:column; align-items:center; background:#f1f5f9; color:#1e293b; font-family: 'Inter', sans-serif; overflow-y: auto; padding: 60px 20px;`;

    container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');

            .dmt-header { text-align:center; margin-bottom:50px; }
            .dmt-header span { font-size: 1rem; color: #64748b; font-weight: 800; text-transform: uppercase; letter-spacing: 4px; }
            .dmt-header h1 { font-size: 4rem; color: #f59e0b; margin: 10px 0; font-weight: 900; letter-spacing: -2px; }
            
            .ideas-grid { 
                display: grid; 
                grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); 
                gap: 25px; 
                max-width: 1100px; 
                width: 100%; 
                padding-bottom: 50px;
            }

            .idea-card {
                background: #ffffff;
                padding: 30px;
                border-radius: 24px;
                border: 1px solid #e2e8f0;
                position: relative;
                overflow: hidden;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .idea-card:hover { 
                transform: translateY(-8px); 
                box-shadow: 0 20px 25px -5px rgba(0,0,0,0.05);
                border-color: #f59e0b;
            }

            .idea-card::before {
                content: '';
                position: absolute;
                top: 0; left: 0; width: 6px; height: 100%;
                background: #f59e0b;
            }
            
            .idea-num { 
                position: absolute; right: 20px; top: 10px;
                font-weight: 900; color: #f1f5f9; font-size: 4rem; z-index: 0; 
            }
            
            .idea-content { position: relative; z-index: 1; }
            .idea-title { font-weight: 800; color: #0f172a; font-size: 1.6rem; margin-bottom: 12px; display:block; }
            .idea-detail { color: #475569; font-size: 1.2rem; line-height: 1.6; font-weight: 500; }

            /* Scrollbar */
            #stage-content::-webkit-scrollbar { width: 8px; }
            #stage-content::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        </style>

        <div class="dmt-header">
            <span>Daily Mind Training (L6)</span>
            <h1>My Friends</h1>
        </div>

        <div class="ideas-grid" id="ideasGrid"></div>
    `;

    const grid = document.getElementById('ideasGrid');

    ideas.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'idea-card';
        card.innerHTML = `
            <div class="idea-num">${(index + 1).toString().padStart(2, '0')}</div>
            <div class="idea-content">
                <span class="idea-title">${item.title}</span>
                <div class="idea-detail">${item.detail}</div>
            </div>
        `;
        grid.appendChild(card);
    });

})();
