(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Database of Ideas (Level 7 Depth) ---
    const ideas = [
        { title: "The Beginning", detail: "When did you start learning English? Why did you decide to learn it now?" },
        { title: "Motivation", detail: "How will English change your life? (Work, travel, or just for fun?)" },
        { title: "Challenges", detail: "What is the hardest part for you? (Grammar, listening, or speaking?)" },
        { title: "Favorite Skill", detail: "What do you enjoy most? Do you like reading stories or watching movies?" },
        { title: "Daily Practice", detail: "How many hours do you study at home? Do you use apps or YouTube?" },
        { title: "The Academy", detail: "Talk about your experience here in the class. What do you like about the atmosphere?" },
        { title: "Vocabulary", detail: "How do you memorize new words? Do you use them in your daily life?" },
        { title: "Making Mistakes", detail: "How do you feel when you make a mistake? Why is it important to keep trying?" },
        { title: "Future Goals", detail: "What is your dream goal in English? Do you want to speak like a native?" },
        { title: "Advice", detail: "What is your best advice for someone who wants to start learning English?" }
    ];

    container.innerHTML = '';
    container.style.cssText = `height:100%; display:flex; flex-direction:column; align-items:center; background:#f8fafc; color:#0f172a; font-family: 'Inter', sans-serif; overflow-y: auto; padding: 60px 20px; scroll-behavior: smooth;`;

    container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');

            .dmt-container { max-width: 1100px; width: 100%; }
            
            .dmt-prep-header { text-align:center; margin-bottom:60px; }
            .dmt-prep-header span { color: #10b981; font-weight: 800; letter-spacing: 4px; text-transform: uppercase; font-size: 0.9rem; }
            .dmt-prep-header h1 { font-size: 4rem; font-weight: 900; color: #064e3b; margin: 10px 0; }
            
            .ideas-grid { 
                display: grid; 
                grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); 
                gap: 25px; 
                padding-bottom: 50px;
            }

            .idea-card {
                background: #ffffff;
                padding: 30px;
                border-radius: 24px;
                border: 1px solid #e2e8f0;
                box-shadow: 0 4px 6px rgba(0,0,0,0.02);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                position: relative;
                overflow: hidden;
            }

            .idea-card:hover { 
                transform: translateY(-10px); 
                box-shadow: 0 20px 25px -5px rgba(0,0,0,0.05);
                border-color: #10b981;
            }

            .idea-card::before {
                content: "";
                position: absolute;
                top: 0; left: 0; width: 6px; height: 100%;
                background: #10b981;
            }
            
            .idea-num { 
                font-weight: 900; 
                color: #d1fae5; 
                font-size: 2.5rem; 
                margin-bottom: 10px;
                font-family: 'Inter', sans-serif;
            }
            .idea-title { font-weight: 800; color: #064e3b; font-size: 1.6rem; margin-bottom: 12px; display:block; }
            .idea-detail { color: #475569; font-size: 1.2rem; line-height: 1.6; }

            /* Hidden Scrollbar */
            #stage-content::-webkit-scrollbar { width: 8px; }
            #stage-content::-webkit-scrollbar-track { background: #f8fafc; }
            #stage-content::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        </style>

        <div class="dmt-container">
            <div class="dmt-prep-header">
                <span>Daily Motivation Topic</span>
                <h1>Studying English</h1>
            </div>

            <div class="ideas-grid" id="ideasGrid"></div>
        </div>
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
