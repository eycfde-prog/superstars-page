(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // --- قائمة الأفكار (Friends Topic) ---
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

    // --- التنسيق البصري ---
    container.innerHTML = '';
    container.style.cssText = `height:calc(100vh - 100px); display:flex; flex-direction:column; align-items:center; background:#f8fafc; color:#1e293b; font-family: 'Segoe UI', Tahoma, sans-serif; overflow-y: auto; padding: 40px 20px;`;

    container.innerHTML = `
        <style>
            .dmt-prep-header { text-align:center; margin-bottom:40px; }
            .dmt-prep-header h1 { font-size: 3rem; color: #f59e0b; margin:0; } /* لون برتقالي مميز للأصدقاء */
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
                border-left: 8px solid #f59e0b; /* لون الأصدقاء */
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
            <span class="idea-title">${item.title}</span>
            <div class="idea-detail">${item.detail}</div>
        `;
        grid.appendChild(card);
    });

})();
