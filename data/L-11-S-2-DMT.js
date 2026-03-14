(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // --- قائمة الأفكار (Our Course Topic) ---
    const ideas = [
        { title: "The First Day", detail: "How did you feel on the very first day of this course compared to now?" },
        { title: "Favorite Activity", detail: "Which activity did you like most? (Squeezer, DMT, or something else?)" },
        { title: "The Teacher", detail: "How does Mr. Ezz's teaching style help you understand English better?" },
        { title: "Class Atmosphere", detail: "Talk about your classmates. How do they support and encourage you?" },
        { title: "Major Improvement", detail: "What is the biggest change you noticed in your English during this course?" },
        { title: "New Habits", detail: "What are the new study habits you started because of this course?" },
        { title: "Funny Moments", detail: "Share a funny or memorable situation that happened in the classroom." },
        { title: "Confidence", detail: "Do you feel more confident speaking English now? Give an example." },
        { title: "The Future", detail: "How will you continue practicing English after this course ends?" },
        { title: "Final Message", detail: "If you could say one thing to your teacher and classmates, what would it be?" }
    ];

    // --- التنسيق البصري ---
    container.innerHTML = '';
    container.style.cssText = `height:calc(100vh - 100px); display:flex; flex-direction:column; align-items:center; background:#fff1f2; color:#881337; font-family: 'Segoe UI', Tahoma, sans-serif; overflow-y: auto; padding: 40px 20px;`;

    container.innerHTML = `
        <style>
            .dmt-prep-header { text-align:center; margin-bottom:40px; }
            .dmt-prep-header h1 { font-size: 3rem; color: #e11d48; margin:0; }
            .dmt-prep-header p { font-size: 1.2rem; color: #9f1239; font-weight: 500; }
            
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
                border-left: 8px solid #e11d48;
                box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
                transition: transform 0.2s;
            }

            .idea-card:hover { transform: translateY(-5px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
            
            .idea-num { font-weight: 900; color: #ffe4e6; font-size: 1.5rem; margin-bottom: 5px; }
            .idea-title { font-weight: bold; color: #881337; font-size: 1.4rem; margin-bottom: 8px; display:block; }
            .idea-detail { color: #9f1239; font-size: 1.1rem; line-height: 1.4; }

            @media (max-width: 800px) { .ideas-grid { grid-template-columns: 1fr; } }
        </style>

        <div class="dmt-prep-header">
            <p>DMT Preparation Topic:</p>
            <h1>Our English Course</h1>
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
