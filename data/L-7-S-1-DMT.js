(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // --- قائمة الأفكار (Studying English Topic) ---
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

    // --- التنسيق البصري ---
    container.innerHTML = '';
    container.style.cssText = `height:calc(100vh - 100px); display:flex; flex-direction:column; align-items:center; background:#f0fdf4; color:#064e3b; font-family: 'Segoe UI', Tahoma, sans-serif; overflow-y: auto; padding: 40px 20px;`;

    container.innerHTML = `
        <style>
            .dmt-prep-header { text-align:center; margin-bottom:40px; }
            .dmt-prep-header h1 { font-size: 3rem; color: #10b981; margin:0; }
            .dmt-prep-header p { font-size: 1.2rem; color: #374151; font-weight: 500; }
            
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
                border-left: 8px solid #10b981;
                box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
                transition: transform 0.2s;
            }

            .idea-card:hover { transform: translateY(-5px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
            
            .idea-num { font-weight: 900; color: #d1fae5; font-size: 1.5rem; margin-bottom: 5px; }
            .idea-title { font-weight: bold; color: #064e3b; font-size: 1.4rem; margin-bottom: 8px; display:block; }
            .idea-detail { color: #374151; font-size: 1.1rem; line-height: 1.4; }

            @media (max-width: 800px) { .ideas-grid { grid-template-columns: 1fr; } }
        </style>

        <div class="dmt-prep-header">
            <p>DMT Preparation Topic:</p>
            <h1>Studying English</h1>
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
