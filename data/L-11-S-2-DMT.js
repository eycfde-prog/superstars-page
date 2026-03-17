(function() {
    const container = document.getElementById('stage-content');
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

    container.innerHTML = '';
    container.style.cssText = `height:100%; width:100%; display:flex; flex-direction:column; align-items:center; background:#0a0a0a; color:#fff; font-family: 'Segoe UI', system-ui, sans-serif; overflow-y: auto; padding: 5vh 20px; scrollbar-width: none;`;

    container.innerHTML = `
        <style>
            .dmt-header { text-align:center; margin-bottom:60px; animation: vetoFadeDown 0.8s ease; }
            .dmt-header p { color: #c5a059; font-weight: 900; letter-spacing: 5px; text-transform: uppercase; font-size: 1.2vw; margin-bottom: 10px; }
            .dmt-header h1 { font-size: 4.5vw; color: #fff; margin:0; font-weight: 900; text-transform: uppercase; }
            
            .ideas-grid { 
                display: grid; 
                grid-template-columns: repeat(2, 1fr); 
                gap: 25px; 
                max-width: 1200px; 
                width: 90%; 
                perspective: 1000px;
            }

            .idea-card {
                background: #111;
                padding: 30px;
                border-radius: 25px;
                border: 1px solid #222;
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                position: relative;
                overflow: hidden;
            }

            .idea-card::before {
                content: ''; position: absolute; top:0; left:0; width:6px; height:100%; background: #c5a059;
            }

            .idea-card:hover { 
                transform: translateY(-10px) rotateX(2deg); 
                background: #1a1a1a;
                border-color: #c5a059;
                box-shadow: 0 20px 40px rgba(0,0,0,0.4);
            }
            
            .idea-num { 
                font-weight: 900; 
                color: rgba(197, 160, 89, 0.1); 
                font-size: 4vw; 
                position: absolute;
                top: 10px; right: 20px;
                line-height: 1;
            }

            .idea-title { font-weight: 900; color: #c5a059; font-size: 1.8vw; margin-bottom: 15px; display:block; text-transform: uppercase; }
            .idea-detail { color: #aaa; font-size: 1.2vw; line-height: 1.5; font-weight: 500; }

            @keyframes vetoFadeDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
            
            @media (max-width: 900px) { 
                .ideas-grid { grid-template-columns: 1fr; }
                .dmt-header h1 { font-size: 8vw; }
                .idea-title { font-size: 5vw; }
                .idea-detail { font-size: 3.5vw; }
            }
        </style>

        <div class="dmt-header">
            <p>DMT Preparation</p>
            <h1>Our Course Journey</h1>
        </div>

        <div class="ideas-grid" id="ideasGrid"></div>
        
        <div style="height: 10vh;"></div>
    `;

    const grid = document.getElementById('ideasGrid');

    ideas.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'idea-card';
        card.style.animation = `vetoFadeDown 0.5s ease forwards ${index * 0.1}s`;
        card.style.opacity = '0';
        card.innerHTML = `
            <div class="idea-num">${(index + 1)}</div>
            <span class="idea-title">${item.title}</span>
            <div class="idea-detail">${item.detail}</div>
        `;
        grid.appendChild(card);
    });

})();
