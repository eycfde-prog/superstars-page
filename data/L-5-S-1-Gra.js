(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#050505; font-family:'Segoe UI', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;
    let lastRenderedSlide = -1;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'FUTURE SIMPLE', subtitle: 'LOOKING AHEAD', color: '#e74c3c', usage: 'Decisions + Plans + Predictions' },
        
        /* 2: Timeline */
        { 
            type: 'timeline', 
            title: 'The Future Line', 
            content: 'An action that <span style="color:#f1c40f">WILL HAPPEN</span> after this moment.',
            labels: ["PAST", "PRESENT (NOW)", "FUTURE (The Target)"]
        },

        /* 3: Formulation (Will vs Going to) */
        { 
            type: 'rule-box', 
            title: 'THE STRUCTURE', 
            color: '#3498db',
            rules: [
                { subjects: "QUICK DECISIONS", tool: "WILL + INF.", extra: "I will help you!" },
                { subjects: "PLANS / INTENTIONS", tool: "BE GOING TO + INF.", extra: "I am going to travel." }
            ]
        },

        /* 4: 7 Pronouns - Examples */
        { 
            type: 'reveal-list', 
            title: 'Future in Action',
            items: [
                "1. <span style='color:#f1c40f'>I</span> will sleep after dinner.",
                "2. <span style='color:#f1c40f'>He</span> will say it again, I'm sure.",
                "3. <span style='color:#f1c40f'>She</span> is going to visit us next week.",
                "4. <span style='color:#f1c40f'>It</span> will rain tomorrow morning.",
                "5. <span style='color:#f1c40f'>We</span> are going to study together.",
                "6. <span style='color:#f1c40f'>They</span> will come to the party.",
                "7. <span style='color:#f1c40f'>You</span> will answer all questions correctly!"
            ] 
        },

        /* 5: Negative Rule */
        {
            type: 'rule-box',
            title: 'NEGATIVE FORM',
            color: '#e74c3c',
            rules: [
                { subjects: "WILL NOT", tool: "WON'T", extra: "➔ I won't go." },
                { subjects: "AM / IS / ARE + NOT", tool: "NOT GOING TO", extra: "➔ He isn't going to play." }
            ]
        },

        /* 6: Question Rule */
        {
            type: 'rule-box',
            title: 'QUESTION FORM',
            color: '#f1c40f',
            rules: [
                { subjects: "WILL + SUBJECT", tool: "WILL YOU...?", extra: "➔ Will you help me?" },
                { subjects: "BE + SUBJECT", tool: "ARE YOU GOING TO...?", extra: "➔ Are you going to eat?" }
            ]
        },

        /* 7: Keywords */
        {
            type: 'keywords-grid',
            title: 'FUTURE KEYWORDS',
            words: ["Tomorrow", "Next week/month", "Soon", "In the future", "I think", "Perhaps", "Maybe"]
        },

        /* 8: Quiz Section (10 Questions) */
        { 
            type: 'quiz-session',
            questions: [
                { q: "1. The children _________ at the party.", opts: ["Are going", "Is going to", "Will having", "Are going to"], ans: 3 },
                { q: "2. I _________ (not) watch the match tonight.", opts: ["won't", "am not", "don't", "wasn't"], ans: 0 },
                { q: "3. _________ you going to visit London?", opts: ["Will", "Are", "Do", "Is"], ans: 1 },
                { q: "4. I think it _________ rain tomorrow.", opts: ["is going", "will", "was", "going to"], ans: 1 },
                { q: "5. Look at those clouds! It _________ rain.", opts: ["will", "is going to", "going to", "rains"], ans: 1 },
                { q: "6. We _________ travel to Paris next summer.", opts: ["are going to", "will to", "is going to", "goes to"], ans: 0 },
                { q: "7. I'm thirsty. I _________ get some water.", opts: ["am going to", "will", "was going to", "going to"], ans: 1 },
                { q: "8. What _________ you do next weekend?", opts: ["are", "will", "do", "going to"], ans: 1 },
                { q: "9. They _________ (not) come to the meeting.", opts: ["won't", "isn't", "don't", "weren't"], ans: 0 },
                { q: "10. _________ she going to stay here?", opts: ["Will", "Is", "Are", "Does"], ans: 1 }
            ]
        },
        
        { type: 'title', content: 'FANTASTIC!', subtitle: 'FUTURE SECURED', color: '#2ecc71', usage: 'YOU ARE READY FOR TOMORROW!' }
    ];

    function render() {
        const s = slides[currentSlide];
        
        if (lastRenderedSlide !== currentSlide) {
            container.innerHTML = '';
            const wrapper = document.createElement('div');
            wrapper.id = 'slide-wrapper';
            wrapper.style.cssText = `width:95%; max-width:1300px; height: 90vh; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; animation: vetoFadeIn 0.4s ease-out;`;
            container.appendChild(wrapper);
            lastRenderedSlide = currentSlide;
        }

        const wrapper = document.getElementById('slide-wrapper');

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <div style="font-size:2.5vw; color:#444; letter-spacing:15px; margin-bottom:20px; text-transform:uppercase; font-weight:bold;">${s.subtitle}</div>
                <h1 style="font-size:8.5vw; font-weight:900; color:${s.color}; margin:0; line-height:1;">${s.content}</h1>
                <div style="font-size:3vw; color:#fff; font-weight:bold; margin-top:50px; border-top:6px solid ${s.color}; display:inline-block; padding-top:20px;">${s.usage}</div>
            `;
        } 
        else if (s.type === 'timeline') {
            wrapper.innerHTML = `
                <h2 style="font-size:4.5vw; color:#e74c3c; margin-bottom:30px; font-weight:900;">${s.title}</h2>
                <p style="font-size:3vw; margin-bottom:60px; color:#ddd;">${s.content}</p>
                <div style="position:relative; width:85%; margin:60px auto; height:12px; background:#222; border-radius:10px;">
                    <div style="position:absolute; left:48%; top:-25px; height:60px; width:6px; background:#fff; box-shadow: 0 0 20px #fff;"></div>
                    <div style="position:absolute; left:75%; width:45px; height:45px; border-radius:50%; background:#f1c40f; box-shadow:0 0 30px #f1c40f; opacity:${subStep >= 1 ? 1 : 0}; transition:0.5s; top:-15px;"></div>
                    <div style="position:absolute; width:100%; top:50px; display:flex; justify-content:space-between; color:#444; font-size:1.8vw; font-weight:bold; letter-spacing:3px;">
                        ${s.labels.map(l => `<span>${l}</span>`).join('')}
                    </div>
                </div>`;
        }
        else if (s.type === 'rule-box') {
            wrapper.innerHTML = `
                <h2 style="font-size:4vw; color:${s.color}; margin-bottom:40px; font-weight:900;">${s.title}</h2>
                <div style="display:flex; flex-direction:column; gap:30px; width:100%; align-items:center;">
                    ${s.rules.map(r => `
                        <div style="background:#111; padding:4vh 4vw; border-radius:30px; width:90%; border:4px solid ${s.color}; display:flex; justify-content:space-between; align-items:center; box-shadow: 0 15px 40px rgba(0,0,0,0.4);">
                            <div style="text-align:left;">
                                <div style="font-size:3vw; color:#fff; font-weight:900;">${r.subjects}</div>
                                <div style="font-size:2vw; color:#666; font-weight:bold;">${r.extra}</div>
                            </div>
                            <div style="font-size:4.5vw; color:${s.color}; font-weight:900; letter-spacing:3px;">➔ ${r.tool}</div>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `
                <h2 style="font-size:4.5vw; color:#e74c3c; margin-bottom:30px; font-weight:900;">${s.title}</h2>
                <div style="display:flex; flex-direction:column; gap:12px; text-align:left; width:85%; margin: 0 auto;">
                    ${s.items.map((item, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0.05}; transform:translateX(${i <= subStep ? 0 : -30}px); transition:0.4s; background:#111; padding:15px 25px; border-radius:15px; font-size:2.2vw; font-weight:bold; border-left:12px solid #e74c3c;">
                            ${item}
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'keywords-grid') {
            wrapper.innerHTML = `
                <h2 style="font-size:4.5vw; color:#f1c40f; margin-bottom:40px; font-weight:900;">${s.title}</h2>
                <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:20px; width:90%;">
                    ${s.words.map(w => `
                        <div style="background:#111; padding:20px 40px; border-radius:50px; border:2px solid #333; font-size:2.5vw; font-weight:900; color:#fff; box-shadow: 0 5px 15px rgba(0,0,0,0.3);">
                            ${w}
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'quiz-session') {
            let qIdx = Math.floor(subStep / 2);
            let q = s.questions[qIdx] || s.questions[0];
            let showAns = subStep % 2 !== 0;
            wrapper.innerHTML = `
                <div style="text-align:left; background:#111; padding:4vh 4vw; border-radius:40px; border:3px solid #222; width:90%;">
                    <div style="color:#3498db; font-weight:bold; font-size:1.2vw; margin-bottom:10px;">FUTURE TEST ${qIdx + 1}/10</div>
                    <div style="font-size:2.8vw; font-weight:900; margin-bottom:30px; color:#fff; line-height:1.2;">${q.q}</div>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
                        ${q.opts.map((opt, i) => {
                            let isCorrect = showAns && i === q.ans;
                            let color = isCorrect ? '#2ecc71' : (showAns ? '#333' : '#fff');
                            let borderColor = isCorrect ? '#2ecc71' : '#333';
                            return `<div style="border:3px solid ${borderColor}; padding:15px; border-radius:15px; font-size:2vw; font-weight:bold; color:${color}; transition:0.3s;">${opt}</div>`;
                        }).join('')}
                    </div>
                </div>`;
        }
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if (e.keyCode === 39 || e.keyCode === 13 || e.keyCode === 32) { 
            let maxSub = 0;
            if (s.type === 'reveal-list') maxSub = s.items.length - 1;
            else if (s.type === 'quiz-session') maxSub = (s.questions.length * 2) - 1;
            else if (s.type === 'timeline') maxSub = 1;

            if (subStep < maxSub) subStep++;
            else if (currentSlide < slides.length - 1) { 
                currentSlide++; 
                subStep = 0; 
            }
            else if (window.triggerVetoDone) window.triggerVetoDone();
        } 
        else if (e.keyCode === 37) { 
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { 
                currentSlide--; 
                subStep = 0; 
            }
        }
        render();
    };

    const style = document.createElement('style');
    style.innerHTML = `@keyframes vetoFadeIn { from { opacity:0; transform:scale(0.98); } to { opacity:1; transform:scale(1); } }`;
    document.head.appendChild(style);

    render();
})();
