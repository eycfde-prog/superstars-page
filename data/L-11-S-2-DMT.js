(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // --- قائمة الأفكار (Job Interviews Topic) ---
    const ideas = [
        { title: "First Impression", detail: "How important is your clothes and body language in an interview?" },
        { title: "Self Introduction", detail: "How do you answer the famous question: 'Tell me about yourself'?" },
        { title: "Strengths", detail: "What are your top 3 professional strengths? Give examples." },
        { title: "Weaknesses", detail: "How do you talk about a weakness in a way that sounds positive?" },
        { title: "The Company", detail: "Why is it important to research the company before you go?" },
        { title: "Motivation", detail: "Why do you want this specific job? What makes you excited about it?" },
        { title: "Problem Solving", detail: "Tell a short story about a time you fixed a problem at work or school." },
        { title: "The Future", detail: "Where do you see yourself in five years? What are your career goals?" },
        { title: "Asking Questions", detail: "What are some smart questions you should ask the interviewer at the end?" },
        { title: "Preparation", detail: "How do you practice at home? Do you record yourself or use a mirror?" }
    ];

    // --- التنسيق البصري ---
    container.innerHTML = '';
    container.style.cssText = `height:calc(100vh - 100px); display:flex; flex-direction:column; align-items:center; background:#f5f3ff; color:#1e1b4b; font-family: 'Segoe UI', Tahoma, sans-serif; overflow-y: auto; padding: 40px 20px;`;

    container.innerHTML = `
        <style>
            .dmt-prep-header { text-align:center; margin-bottom:40px; }
            .dmt-prep-header h1 { font-size: 3rem; color: #4f46e5; margin:0; }
            .dmt-prep-header p { font-size: 1.2rem; color: #4338ca; font-weight: 500; }
            
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
                border-left: 8px solid #4f46e5;
                box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
                transition: transform 0.2s;
            }

            .idea-card:hover { transform: translateY(-5px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
            
            .idea-num { font-weight: 900; color: #e0e7ff; font-size: 1.5rem; margin-bottom: 5px; }
            .idea-title { font-weight: bold; color: #1e1b4b; font-size: 1.4rem; margin-bottom: 8px; display:block; }
            .idea-detail { color: #3730a3; font-size: 1.1rem; line-height: 1.4; }

            @media (max-width: 800px) { .ideas-grid { grid-template-columns: 1fr; } }
        </style>

        <div class="dmt-prep-header">
            <p>DMT Preparation Topic:</p>
            <h1>Job Interviews</h1>
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
