(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    const ideas = [
        { title: "First Impression", detail: "How important are your clothes and body language in an interview?" },
        { title: "Self Introduction", detail: "How do you answer the famous question: 'Tell me about yourself'?" },
        { title: "Strengths", detail: "What are your top 3 professional strengths? Give real-life examples." },
        { title: "Weaknesses", detail: "How do you talk about a weakness in a way that sounds positive?" },
        { title: "The Company", detail: "Why is it important to research the company before you go?" },
        { title: "Motivation", detail: "Why do you want this specific job? What makes you excited about it?" },
        { title: "Problem Solving", detail: "Tell a short story about a time you fixed a problem at work or school." },
        { title: "The Future", detail: "Where do you see yourself in five years? What are your career goals?" },
        { title: "Asking Questions", detail: "What are some smart questions you should ask the interviewer at the end?" },
        { title: "Preparation", detail: "How do you practice at home? Do you record yourself or use a mirror?" }
    ];

    container.innerHTML = '';
    container.style.cssText = `height:100%; display:flex; flex-direction:column; align-items:center; background:#f8fafc; color:#1e293b; font-family: 'Inter', system-ui, sans-serif; overflow-y: auto; padding: 60px 20px;`;

    container.innerHTML = `
        <style>
            .dmt-header { text-align:center; margin-bottom:50px; }
            .dmt-header span { color: #6366f1; font-weight: 800; letter-spacing: 4px; text-transform: uppercase; font-size: 0.9rem; }
            .dmt-header h1 { font-size: 4rem; color: #1e1b4b; margin: 10px 0; font-weight: 900; }
            
            .ideas-grid { 
                display: grid; 
                grid-template-columns: repeat(2, 1fr); 
                gap: 25px; 
                max-width: 1100px; 
                width: 100%; 
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
                transform: translateY(-8px); 
                box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
                border-color: #6366f1;
            }

            .idea-card::before {
                content: ''; position: absolute; top: 0; left: 0; width: 6px; height: 100%; background: #6366f1;
            }
            
            .idea-num { font-weight: 900; color: #f1f5f9; font-size: 2.5rem; position: absolute; right: 20px; top: 10px; z-index: 0; }
            .idea-title { font-weight: 800; color: #4338ca; font-size: 1.6rem; margin-bottom: 12px; position: relative; z-index: 1; display: block; }
            .idea-detail { color: #475569; font-size: 1.2rem; line-height: 1.6; position: relative; z-index: 1; }

            @media (max-width: 900px) { .ideas-grid { grid-template-columns: 1fr; } }
        </style>

        <div class="dmt-header">
            <span>Career Preparation Series</span>
            <h1>JOB INTERVIEWS</h1>
        </div>

        <div class="ideas-grid" id="ideasGrid"></div>
        
        <div style="margin-top:50px; color:#94a3b8; font-size:0.9rem; letter-spacing:2px;">SESSION: L9-S4-DMT // PREPARING FOR SUCCESS</div>
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
