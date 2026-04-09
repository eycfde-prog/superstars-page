(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#050505; font-family:'Segoe UI', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'PAST SIMPLE', subtitle: 'HISTORY & STORIES', color: '#3498db', usage: 'Finished Actions - Past Habits' },
        
        /* 2: Timeline */
        { 
            type: 'timeline', 
            title: 'The Past', 
            content: 'Actions that started and <span style="color:#e74c3c">finished</span> in the past.' 
        },

        /* 3: Formulation */
        { 
            type: 'formulation', 
            title: 'Verb Structure', 
            groups: [
                { sub: "Regular Verbs", verb: "Verb + <span style='color:#2ecc71;'>ED</span>", color: "#2ecc71", desc: "Played, Watched, Cooked" },
                { sub: "Irregular Verbs", verb: "Special Forms", color: "#f1c40f", desc: "Went, Ate, Saw, Spoke" }
            ]
        },

        /* 4: Reveal List */
        { 
            type: 'reveal-list', 
            title: 'Past Moments',
            items: [
                "1. I traveled to London last year.",
                "2. He finished his homework early.",
                "3. We saw a great movie yesterday.",
                "4. They bought a new car.",
                "5. She felt happy after the exam."
            ] 
        },

        /* 5: Negative Transform */
        { 
            type: 'transform', 
            title: 'The Negative',
            desc: 'Use DIDN\'T (+ Base Form)',
            pairs: [
                { pos: "I played football.", neg: "I <span style='color:#e74c3c;'>DIDN'T PLAY</span> football." },
                { pos: "He went home.", neg: "He <span style='color:#e74c3c;'>DIDN'T GO</span> home." },
                { pos: "She cooked dinner.", neg: "She <span style='color:#e74c3c;'>DIDN'T COOK</span> dinner." }
            ]
        },

        /* 6: Question Transform */
        { 
            type: 'transform', 
            title: 'The Question',
            desc: 'Start with DID (+ Base Form)',
            pairs: [
                { pos: "You saw him.", neg: "<span style='color:#f1c40f;'>DID</span> you see him?" },
                { pos: "It worked.", neg: "<span style='color:#f1c40f;'>DID</span> it work?" },
                { pos: "They arrived.", neg: "<span style='color:#f1c40f;'>DID</span> they arrive?" }
            ]
        },

        /* 7: Keywords */
        { 
            type: 'reveal-list', 
            title: 'Time Markers',
            items: [
                "✦ Yesterday",
                "✦ Last (week / month / year)",
                "✦ (Two days) ago",
                "✦ In 2020",
                "✦ Once upon a time"
            ] 
        },

        /* --- Quiz Section --- */
        { 
            type: 'mcq', 
            question: "1. We _________ to the park two hours ago.",
            options: ["A) Go", "B) Goes", "C) Went", "D) Going"],
            answer: 2 
        },
        { 
            type: 'mcq', 
            question: "2. She _________ (not) visit her grandma last night.",
            options: ["A) doesn't", "B) didn't", "C) wasn't", "D) haven't"],
            answer: 1 
        },
        { 
            type: 'mcq', 
            question: "3. _________ you find your keys?",
            options: ["A) Do", "B) Does", "C) Did", "D) Done"],
            answer: 2 
        },
        
        { type: 'title', content: 'EXCELLENT!', subtitle: 'PAST MASTERED', color: '#2ecc71', usage: 'YOU ARE A HISTORY TELLER!' }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:95%; max-width:1400px; text-align:center; animation: vetoFadeIn 0.5s ease;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <div style="font-size:2.5vw; color:#444; letter-spacing:15px; margin-bottom:20px; text-transform:uppercase; font-weight:bold;">${s.subtitle}</div>
                <h1 style="font-size:9vw; font-weight:900; color:${s.color}; margin:0; line-height:1; text-shadow: 0 10px 40px rgba(52,152,219,0.3);">${s.content}</h1>
                <div style="font-size:3.5vw; color:#fff; font-weight:bold; margin-top:50px; border-top:6px solid ${s.color}; display:inline-block; padding-top:20px;">${s.usage}</div>
            `;
        } 
        else if (s.type === 'timeline') {
            wrapper.innerHTML = `
                <h2 style="font-size:5rem; color:#3498db; margin-bottom:50px; font-weight:900;">${s.title}</h2>
                <p style="font-size:3.5rem; margin-bottom:100px; color:#ddd;">${s.content}</p>
                <div style="position:relative; width:85%; margin:100px auto; height:12px; background:#222; border-radius:10px;">
                    <div style="position:absolute; left:0%; width:50%; height:100%; background:linear-gradient(90deg, transparent, #e74c3c, transparent); opacity:${subStep >= 1 ? 1 : 0}; transition:0.8s; border-radius:10px;"></div>
                    <div style="position:absolute; left:50%; top:-25px; height:60px; width:6px; background:#fff; box-shadow: 0 0 20px #fff;"></div>
                    <div style="position:absolute; width:100%; top:50px; display:flex; justify-content:space-between; color:#444; font-size:2rem; font-weight:bold; letter-spacing:5px;">
                        <span>PAST (HERE)</span><span>PRESENT</span><span>FUTURE</span>
                    </div>
                </div>`;
        }
        else if (s.type === 'formulation') {
            wrapper.innerHTML = `
                <h2 style="font-size:5.5rem; color:#3498db; margin-bottom:50px; font-weight:900;">${s.title}</h2>
                <div style="display:flex; flex-direction:column; gap:30px; align-items:center;">
                    ${s.groups.map(g => `
                        <div style="background:#111; padding:45px; border-radius:30px; width:90%; border:3px solid ${g.color}; display:flex; justify-content:space-between; align-items:center; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                            <div style="text-align:left;">
                                <div style="font-size:4rem; color:${g.color}; font-weight:900;">${g.sub}</div>
                                <div style="font-size:1.8rem; color:#666; font-weight:bold;">${g.desc}</div>
                            </div>
                            <div style="font-size:4.5rem; color:#fff; font-weight:bold;">➔ ${g.verb}</div>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `
                <h2 style="font-size:5.5rem; color:#3498db; margin-bottom:40px; font-weight:900;">${s.title}</h2>
                <div style="display:flex; flex-direction:column; gap:15px; text-align:left; max-width:1000px; margin: 0 auto;">
                    ${s.items.map((item, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0.05}; transform:translateX(${i <= subStep ? 0 : -50}px); transition:0.3s; background:#111; padding:25px; border-radius:20px; font-size:2.8rem; font-weight:bold; border-left:15px solid #3498db;">
                            ${item}
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'transform') {
            let pair = s.pairs[Math.floor(subStep/2)] || s.pairs[0];
            let isChanged = subStep % 2 !== 0;
            wrapper.innerHTML = `
                <h2 style="font-size:5.5rem; color:#3498db; margin:0; font-weight:900;">${s.title}</h2>
                <p style="font-size:2.5rem; color:#555; margin-bottom:40px; font-weight:bold;">${s.desc}</p>
                <div style="background:#111; padding:80px; border-radius:50px; font-size:5.5rem; border:4px solid #333; color:${isChanged ? '#f1c40f' : '#fff'}; transition: 0.3s; font-weight:bold; box-shadow: inset 0 0 50px rgba(0,0,0,0.8);">
                    ${isChanged ? pair.neg : pair.pos}
                </div>`;
        }
        else if (s.type === 'mcq') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#111; padding:70px; border-radius:50px; border:3px solid #222; box-shadow: 0 20px 60px rgba(0,0,0,0.7);">
                    <div style="font-size:4rem; font-weight:900; margin-bottom:50px; color:#fff; line-height:1.2;">${s.question}</div>
                    <div style="display:grid; grid-template-columns: 1fr; gap:25px;">
                        ${s.options.map((opt, i) => {
                            let isCorrect = subStep >= 2 && i === s.answer;
                            let border = isCorrect ? '8px solid #2ecc71' : '2px solid #333';
                            let bg = isCorrect ? 'rgba(46,204,113,0.1)' : 'transparent';
                            let color = isCorrect ? '#2ecc71' : (subStep >= 2 ? '#444' : '#fff');
                            return `<div style="background:${bg}; border:${border}; padding:30px; border-radius:25px; font-size:3.2rem; font-weight:bold; color:${color}; transition:0.3s;">${opt}</div>`;
                        }).join('')}
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if (e.keyCode === 39 || e.keyCode === 13 || e.keyCode === 32) { 
            if ((s.type === 'timeline' || s.type === 'reveal-list') && subStep < (s.items ? s.items.length - 1 : 1)) subStep++;
            else if (s.type === 'transform' && subStep < (s.pairs.length * 2) - 1) subStep++;
            else if (s.type === 'mcq' && subStep < 2) subStep++;
            else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
        } else if (e.keyCode === 37) { 
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    const style = document.createElement('style');
    style.innerHTML = `@keyframes vetoFadeIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`;
    document.head.appendChild(style);

    render();
})();
