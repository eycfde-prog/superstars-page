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
        { type: 'title', content: 'PRESENT PERFECT', subtitle: 'GRAMMAR MASTERY', color: '#3498db', usage: 'Past Action + Present Result' },
        
        /* 2: Timeline */
        { 
            type: 'timeline', 
            title: 'When to use it?', 
            content: 'An action happened in the <span style="color:#e74c3c">PAST</span> but has a clear result <span style="color:#2ecc71">NOW</span>.',
            labels: ["PAST (Action)", "NOW (Result)"]
        },

        /* 3: Formulation */
        { 
            type: 'rule-box', 
            title: 'THE FORMULA', 
            color: '#3498db',
            rules: [
                { subjects: "I / WE / YOU / THEY", tool: "HAVE + V3", extra: "Subject + Have + P.P" },
                { subjects: "HE / SHE / IT", tool: "HAS + V3", extra: "Subject + Has + P.P" }
            ]
        },

        /* 4: Examples */
        { 
            type: 'reveal-list', 
            title: 'Real-life Scenarios',
            items: [
                "1. I <span style='color:#3498db'>have seen</span> this movie many times.",
                "2. He <span style='color:#3498db'>has already finished</span> his homework.",
                "3. She <span style='color:#3498db'>has lived</span> in Cairo since 2010.",
                "4. It <span style='color:#3498db'>has stopped</span> raining (Look! wet ground).",
                "5. We <span style='color:#3498db'>have just arrived</span> at the station.",
                "6. They <span style='color:#3498db'>have never traveled</span> abroad.",
                "7. My cat <span style='color:#3498db'>has eaten</span> its food."
            ] 
        },

        /* 5: Negative & Question */
        {
            type: 'rule-box',
            title: 'NEGATIVES & QUESTIONS',
            color: '#f1c40f',
            rules: [
                { subjects: "NEGATIVE", tool: "HAVEN'T / HASN'T", extra: "Add 'NOT' after have/has" },
                { subjects: "QUESTION", tool: "HAVE / HAS ...?", extra: "Start with Have or Has" }
            ]
        },

        /* 6: Keywords Grid */
        {
            type: 'keywords-grid',
            title: 'TIME DETECTIVES',
            words: ["Already", "Just", "Yet", "Ever", "Never", "Since", "For", "Recently", "So far"]
        },

        /* 7: Quiz Session (10 Questions) */
        { 
            type: 'quiz-session',
            questions: [
                { q: "1. I _________ that lion before.", opts: ["have seen", "has seen", "have saw", "seen"], ans: 0 },
                { q: "2. Have you _________ been to London?", opts: ["never", "ever", "yet", "just"], ans: 1 },
                { q: "3. She _________ her keys. She can't enter now.", opts: ["lost", "has lost", "have lost", "is losing"], ans: 1 },
                { q: "4. They haven't arrived _________.", opts: ["already", "just", "yet", "since"], ans: 2 },
                { q: "5. I have known him _________ a long time.", opts: ["since", "for", "ago", "just"], ans: 1 },
                { q: "6. He _________ (just / finish) his work.", opts: ["has just finished", "just has finished", "have just finished", "finished"], ans: 0 },
                { q: "7. _________ she cleaned her room?", opts: ["Have", "Has", "Does", "Is"], ans: 1 },
                { q: "8. We have lived here _________ 2015.", opts: ["for", "since", "ago", "already"], ans: 1 },
                { q: "9. They _________ (not / eat) sushi before.", opts: ["haven't eaten", "hasn't eaten", "not have eaten", "haven't eat"], ans: 0 },
                { q: "10. Has he ever _________ a horse?", opts: ["ride", "rode", "ridden", "riding"], ans: 2 }
            ]
        },
        
        { type: 'title', content: 'SUPERB!', subtitle: 'STAGE CLEAR', color: '#c5a059', usage: 'YOU ARE A CHAMPION!' }
    ];

    function render() {
        const s = slides[currentSlide];
        
        if (lastRenderedSlide !== currentSlide) {
            container.innerHTML = '';
            const wrapper = document.createElement('div');
            wrapper.id = 'slide-wrapper';
            wrapper.style.cssText = `width:90%; max-width:1200px; height: 85vh; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; animation: vetoFadeIn 0.4s ease-out;`;
            container.appendChild(wrapper);
            lastRenderedSlide = currentSlide;
        }

        const wrapper = document.getElementById('slide-wrapper');

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <div style="font-size:2vw; color:#444; letter-spacing:10px; margin-bottom:15px; text-transform:uppercase; font-weight:bold;">${s.subtitle}</div>
                <h1 style="font-size:7.5vw; font-weight:900; color:${s.color}; margin:0; line-height:1; text-shadow:0 10px 30px rgba(52,152,219,0.2);">${s.content}</h1>
                <div style="font-size:2.8vw; color:#fff; font-weight:bold; margin-top:40px; border-top:5px solid ${s.color}; display:inline-block; padding-top:15px;">${s.usage}</div>
            `;
        } 
        else if (s.type === 'timeline') {
            wrapper.innerHTML = `
                <h2 style="font-size:4vw; color:#3498db; margin-bottom:25px; font-weight:900;">${s.title}</h2>
                <p style="font-size:2.5vw; margin-bottom:50px; color:#ddd; padding: 0 50px;">${s.content}</p>
                <div style="position:relative; width:80%; margin:50px auto; height:8px; background:#222; border-radius:10px;">
                    <div style="position:absolute; left:15%; top:-20px; height:45px; width:4px; background:#e74c3c;"></div>
                    <div style="position:absolute; right:15%; top:-20px; height:45px; width:6px; background:#2ecc71;"></div>
                    <div style="position:absolute; left:15%; width:70%; height:20px; background:linear-gradient(90deg, #3498db, #2ecc71); opacity:${subStep >= 1 ? 1 : 0}; transition:1.2s; border-radius:10px; top:-6px;"></div>
                    <div style="position:absolute; width:100%; top:40px; display:flex; justify-content:space-between; color:#666; font-size:1.5vw; font-weight:bold; padding: 0 10%;">
                        ${s.labels.map(l => `<span>${l}</span>`).join('')}
                    </div>
                </div>`;
        }
        else if (s.type === 'rule-box') {
            wrapper.innerHTML = `
                <h2 style="font-size:3.5vw; color:${s.color}; margin-bottom:30px; font-weight:900;">${s.title}</h2>
                <div style="display:flex; flex-direction:column; gap:20px; width:100%; align-items:center;">
                    ${s.rules.map(r => `
                        <div style="background:#0a0a0a; padding:3vh 3vw; border-radius:20px; width:95%; border:3px dashed ${s.color}; display:flex; justify-content:space-between; align-items:center;">
                            <div style="text-align:left;">
                                <div style="font-size:2.5vw; color:#fff; font-weight:900;">${r.subjects}</div>
                                <div style="font-size:1.6vw; color:#666; font-weight:bold;">${r.extra}</div>
                            </div>
                            <div style="font-size:4vw; color:${s.color}; font-weight:900;">➔ ${r.tool}</div>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `
                <h2 style="font-size:3.5vw; color:#3498db; margin-bottom:20px; font-weight:900;">EXAMPLES</h2>
                <div style="display:flex; flex-direction:column; gap:8px; text-align:left; width:95%;">
                    ${s.items.map((item, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0.05}; transform:translateX(${i <= subStep ? 0 : 20}px); transition:0.3s; background:#111; padding:12px 20px; border-radius:12px; font-size:1.9vw; font-weight:bold; border-left:10px solid #3498db; line-height:1.2;">
                            ${item}
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'keywords-grid') {
            wrapper.innerHTML = `
                <h2 style="font-size:4vw; color:#f1c40f; margin-bottom:30px; font-weight:900;">${s.title}</h2>
                <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:15px; width:95%;">
                    ${s.words.map(w => `
                        <div style="background:#111; padding:15px 30px; border-radius:40px; border:2px solid #3498db; font-size:2vw; font-weight:900; color:#fff;">
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
                <div style="text-align:left; background:#111; padding:3vh 3vw; border-radius:30px; border:2px solid #222; width:95%;">
                    <div style="color:#3498db; font-weight:bold; font-size:1.1vw; margin-bottom:8px;">QUIZ ${qIdx + 1}/10</div>
                    <div style="font-size:2.4vw; font-weight:900; margin-bottom:25px; color:#fff; line-height:1.2;">${q.q}</div>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px;">
                        ${q.opts.map((opt, i) => {
                            let isCorrect = showAns && i === q.ans;
                            let color = isCorrect ? '#2ecc71' : (showAns ? '#333' : '#fff');
                            let borderColor = isCorrect ? '#2ecc71' : '#333';
                            return `<div style="border:2px solid ${borderColor}; padding:12px; border-radius:12px; font-size:1.7vw; font-weight:bold; color:${color}; transition:0.2s;">${opt}</div>`;
                        }).join('')}
                    </div>
                </div>`;
        }
    }

    window.nextSlide = function() {
        const s = slides[currentSlide];
        let maxSub = 0;
        if (s.type === 'reveal-list') maxSub = s.items.length - 1;
        else if (s.type === 'quiz-session') maxSub = (s.questions.length * 2) - 1;
        else if (s.type === 'timeline') maxSub = 1;

        if (subStep < maxSub) subStep++;
        else if (currentSlide < slides.length - 1) { 
            currentSlide++; 
            subStep = 0; 
        }
        render();
    };

    window.prevSlide = function() {
        if (subStep > 0) subStep--;
        else if (currentSlide > 0) { 
            currentSlide--; 
            subStep = 0; 
        }
        render();
    };

    document.onkeydown = (e) => {
        if (e.keyCode === 39 || e.keyCode === 32) window.nextSlide();
        else if (e.keyCode === 37) window.prevSlide();
    };

    const style = document.createElement('style');
    style.innerHTML = `@keyframes vetoFadeIn { from { opacity:0; transform:scale(0.99); } to { opacity:1; transform:scale(1); } }`;
    document.head.appendChild(style);

    render();
})();
