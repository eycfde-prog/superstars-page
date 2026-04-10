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
        { type: 'title', content: 'PAST PERFECT', subtitle: 'GRAMMAR STAGE', color: '#c5a059', usage: 'The "Past" of the Past' },
        
        /* 2: Timeline */
        { 
            type: 'timeline', 
            title: 'Which happened first?', 
            content: 'We use it to show that <span style="color:#f1c40f">Action 1</span> happened before <span style="color:#3498db">Action 2</span>.',
            labels: ["1st Action (Had + V3)", "2nd Action (V2)", "PRESENT"]
        },

        /* 3: Formula */
        { 
            type: 'rule-box', 
            title: 'THE FORMULA', 
            color: '#c5a059',
            rules: [
                { subjects: "ALL SUBJECTS", tool: "HAD + V3", extra: "I/He/She/They... all take HAD" },
                { subjects: "V3 (P.P)", tool: "DONE / SEEN / BEEN", extra: "Use the 3rd form of the verb" }
            ]
        },

        /* 4: Examples */
        { 
            type: 'reveal-list', 
            title: 'Mastering the Order',
            items: [
                "1. I <span style='color:#f1c40f'>had finished</span> my work before the meeting.",
                "2. She <span style='color:#f1c40f'>had already cooked</span> when he arrived.",
                "3. The train <span style='color:#f1c40f'>had left</span> by the time we reached.",
                "4. They <span style='color:#f1c40f'>had lost</span> their way before they used the map.",
                "5. After I <span style='color:#f1c40f'>had taken</span> the medicine, I felt better.",
                "6. When she called, I <span style='color:#f1c40f'>had already gone</span> out.",
                "7. The football match <span style='color:#f1c40f'>had started</span> before we arrived."
            ] 
        },

        /* 5: Logic Connectors (Critical Slide) */
        {
            type: 'connectors',
            title: 'TIME CONNECTORS',
            groups: [
                { title: "Followed by (HAD + V3)", words: ["After", "As soon as", "Because"], color: "#f1c40f" },
                { title: "Followed by (Past Simple V2)", words: ["Before", "By the time", "When"], color: "#e74c3c" }
            ]
        },

        /* 6: Quiz Session (10 Questions) */
        { 
            type: 'quiz-session',
            questions: [
                { q: "1. After he _________ his breakfast, he went to work.", opts: ["had eaten", "has eaten", "ate", "eats"], ans: 0 },
                { q: "2. The film _________ before we reached the cinema.", opts: ["started", "had started", "has started", "starts"], ans: 1 },
                { q: "3. By the time the police arrived, the thief _________.", opts: ["escapes", "escaped", "had escaped", "has escaped"], ans: 2 },
                { q: "4. I didn't watch the TV until I _________ my homework.", opts: ["had finished", "finish", "finished", "have finished"], ans: 0 },
                { q: "5. We _________ the ability to speak until we _________ grammar.", opts: ["didn't have / understood", "hadn't have / understood", "hadn't had / understood", "not had / understood"], ans: 2 },
                { q: "6. She _________ (never / see) a bear before she went to the zoo.", opts: ["had never seen", "never saw", "has never seen", "never seen"], ans: 0 },
                { q: "7. When we arrived at the party, they _________ (already / leave).", opts: ["already left", "had already left", "have already left", "leave"], ans: 1 },
                { q: "8. I realized that I _________ my keys at home.", opts: ["forgot", "had forgotten", "have forgotten", "forget"], ans: 1 },
                { q: "9. _________ you finished the report before the deadline?", opts: ["Did", "Have", "Had", "Were"], ans: 2 },
                { q: "10. As soon as she _________ the news, she cried.", opts: ["had heard", "heard", "hears", "has heard"], ans: 0 }
            ]
        },
        
        { type: 'title', content: 'BRILLIANT!', subtitle: 'FINISH', color: '#27ae60', usage: 'PAST PERFECT MASTERED' }
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
                <h1 style="font-size:7.5vw; font-weight:900; color:${s.color}; margin:0; line-height:1; text-shadow:0 10px 30px rgba(197,160,89,0.2);">${s.content}</h1>
                <div style="font-size:2.8vw; color:#fff; font-weight:bold; margin-top:40px; border-top:5px solid ${s.color}; display:inline-block; padding-top:15px;">${s.usage}</div>
            `;
        } 
        else if (s.type === 'timeline') {
            wrapper.innerHTML = `
                <h2 style="font-size:4vw; color:#c5a059; margin-bottom:25px; font-weight:900;">${s.title}</h2>
                <p style="font-size:2.5vw; margin-bottom:50px; color:#ddd;">${s.content}</p>
                <div style="position:relative; width:80%; margin:80px auto; height:8px; background:#222; border-radius:10px;">
                    <div style="position:absolute; left:15%; top:-15px; height:40px; width:10px; background:#f1c40f; border-radius:10px; opacity:${subStep >= 1 ? 1 : 0.1}; transition:0.5s;"></div>
                    <div style="position:absolute; left:50%; top:-15px; height:40px; width:10px; background:#3498db; border-radius:10px; opacity:${subStep >= 1 ? 1 : 0.1}; transition:0.8s;"></div>
                    <div style="position:absolute; right:5%; top:-15px; height:40px; width:4px; background:#fff;"></div>
                    
                    <div style="position:absolute; width:100%; top:50px; display:flex; justify-content:space-between; font-size:1.4vw; font-weight:bold; padding: 0 5%;">
                        <span style="color:#f1c40f; width:25%; text-align:left;">${s.labels[0]}</span>
                        <span style="color:#3498db; width:25%; text-align:center;">${s.labels[1]}</span>
                        <span style="color:#fff; width:25%; text-align:right;">${s.labels[2]}</span>
                    </div>
                </div>`;
        }
        else if (s.type === 'rule-box') {
            wrapper.innerHTML = `
                <h2 style="font-size:3.5vw; color:${s.color}; margin-bottom:30px; font-weight:900;">${s.title}</h2>
                <div style="display:flex; flex-direction:column; gap:20px; width:100%; align-items:center;">
                    ${s.rules.map(r => `
                        <div style="background:#0a0a0a; padding:3vh 3vw; border-radius:20px; width:95%; border:3px solid #333; display:flex; justify-content:space-between; align-items:center;">
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
                <h2 style="font-size:3.5vw; color:#c5a059; margin-bottom:20px; font-weight:900;">MASTERING THE ORDER</h2>
                <div style="display:flex; flex-direction:column; gap:8px; text-align:left; width:95%;">
                    ${s.items.map((item, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0.05}; transform:translateX(${i <= subStep ? 0 : 20}px); transition:0.3s; background:#111; padding:12px 20px; border-radius:12px; font-size:1.8vw; font-weight:bold; border-left:10px solid #c5a059; line-height:1.2;">
                            ${item}
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'connectors') {
            wrapper.innerHTML = `
                <h2 style="font-size:3.5vw; color:#c5a059; margin-bottom:40px; font-weight:900;">${s.title}</h2>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:30px; width:100%;">
                    ${s.groups.map(g => `
                        <div style="background:#111; padding:30px; border-radius:25px; border:2px solid ${g.color};">
                            <div style="font-size:1.5vw; color:#fff; margin-bottom:15px; font-weight:bold;">${g.title}</div>
                            <div style="display:flex; flex-direction:column; gap:10px;">
                                ${g.words.map(w => `<div style="font-size:2.8vw; color:${g.color}; font-weight:900;">${w}</div>`).join('')}
                            </div>
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
                    <div style="color:#c5a059; font-weight:bold; font-size:1.1vw; margin-bottom:8px;">FINAL CHALLENGE ${qIdx + 1}/10</div>
                    <div style="font-size:2.4vw; font-weight:900; margin-bottom:25px; color:#fff; line-height:1.2;">${q.q}</div>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px;">
                        ${q.opts.map((opt, i) => {
                            let isCorrect = showAns && i === q.ans;
                            let color = isCorrect ? '#27ae60' : (showAns ? '#333' : '#fff');
                            let borderColor = isCorrect ? '#27ae60' : '#333';
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
