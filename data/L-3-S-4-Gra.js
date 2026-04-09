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
        { type: 'title', content: 'PRESENT SIMPLE', subtitle: 'FACTS & ROUTINE', color: '#e74c3c', usage: 'Habits - Facts - Daily Routine' },
        
        /* 2: Timeline */
        { 
            type: 'timeline', 
            title: 'The Routine', 
            content: 'Actions that happen <span style="color:#2ecc71">generally</span> or <span style="color:#2ecc71">repeatedly</span>.',
            labels: ["PAST", "PRESENT (HABIT)", "FUTURE"]
        },

        /* 3: Formulation */
        { 
            type: 'formulation', 
            title: 'The Structure', 
            groups: [
                { sub: "I - We - You - They", verb: "Infinitive (Base)", color: "#3498db", desc: "Keep it simple!" },
                { sub: "He - She - It", verb: "Verb + <span style='color:#f1c40f;'>S / ES / IES</span>", color: "#f1c40f", desc: "The S-Team!" }
            ]
        },

        /* 4: Reveal List (7 Examples for 7 Pronouns) */
        { 
            type: 'reveal-list', 
            title: '7 Pronouns - 7 Examples',
            items: [
                "1. <span style='color:#3498db'>I</span> sleep early every day.",
                "2. <span style='color:#f1c40f'>He</span> plays football on Fridays.",
                "3. <span style='color:#f1c40f'>She</span> cooks delicious food.",
                "4. <span style='color:#f1c40f'>It</span> rains a lot in winter.",
                "5. <span style='color:#3498db'>We</span> study English together.",
                "6. <span style='color:#3498db'>You</span> speak very fast.",
                "7. <span style='color:#3498db'>They</span> walk to school."
            ] 
        },

        /* 5: Negative Rule (Requested Slide) */
        {
            type: 'rule-box',
            title: 'NEGATIVE RULE',
            color: '#e74c3c',
            rules: [
                { subjects: "I / WE / THEY / YOU", tool: "DON'T", extra: "+ Base Verb" },
                { subjects: "HE / SHE / IT", tool: "DOESN'T", extra: "+ Base Verb" }
            ]
        },

        /* 6: Negative Transform */
        { 
            type: 'transform', 
            title: 'Practice Negative',
            desc: "Add Don't / Doesn't",
            pairs: [
                { pos: "I play.", neg: "I <span style='color:#e74c3c;'>DON'T</span> play." },
                { pos: "He plays.", neg: "He <span style='color:#e74c3c;'>DOESN'T</span> play." },
                { pos: "They study.", neg: "They <span style='color:#e74c3c;'>DON'T</span> study." }
            ]
        },

        /* 7: Question Rule (Requested Slide) */
        {
            type: 'rule-box',
            title: 'QUESTION RULE',
            color: '#f1c40f',
            rules: [
                { subjects: "I / WE / THEY / YOU", tool: "DO", extra: "➔ Start with DO" },
                { subjects: "HE / SHE / IT", tool: "DOES", extra: "➔ Start with DOES" }
            ]
        },

        /* 8: Question Transform */
        { 
            type: 'transform', 
            title: 'Practice Question',
            desc: 'Start with Do or Does',
            pairs: [
                { pos: "You work.", neg: "<span style='color:#f1c40f;'>DO</span> you work?" },
                { pos: "She works.", neg: "<span style='color:#f1c40f;'>DOES</span> she work?" },
                { pos: "They work.", neg: "<span style='color:#f1c40f;'>DO</span> they work?" }
            ]
        },

        /* 9: Spelling Rules */
        { 
            type: 'spelling-grid', 
            title: 'Spelling Mastery',
            rules: [
                { end: "ss, o, x, ch, sh", add: "+ES", examples: "Goes, Watches, Fixes" },
                { end: "Consonant + y", add: "(-y) + IES", examples: "Cries, Flies, Studies" }
            ]
        },

        /* 10: Keywords */
        { 
            type: 'reveal-list', 
            title: 'Frequency Keywords',
            items: [
                "✦ Always / Usually",
                "✦ Often / Sometimes",
                "✦ Hardly ever / Never",
                "✦ Every day / Every week",
                "✦ Once a month / Twice a year"
            ] 
        },

        /* 11: Quiz Section (10 Questions) */
        { 
            type: 'quiz-session',
            questions: [
                { q: "1. Ali _________ English every day.", opts: ["study", "studies", "studying", "is study"], ans: 1 },
                { q: "2. We _________ (not) like fish.", opts: ["doesn't", "don't", "not", "isn't"], ans: 1 },
                { q: "3. _________ you live in Cairo?", opts: ["Does", "Is", "Do", "Are"], ans: 2 },
                { q: "4. The sun _________ in the east.", opts: ["rise", "rises", "rising", "is rise"], ans: 1 },
                { q: "5. She _________ go to school on Fridays.", opts: ["don't", "not", "doesn't", "isn't"], ans: 2 },
                { q: "6. _________ Sara speak French?", opts: ["Do", "Does", "Is", "Has"], ans: 1 },
                { q: "7. They always _________ their homework.", opts: ["do", "does", "doing", "did"], ans: 0 },
                { q: "8. I _________ coffee at night.", opts: ["don't drink", "doesn't drink", "not drink", "no drink"], ans: 0 },
                { q: "9. My cats _________ milk.", opts: ["likes", "like", "liking", "is like"], ans: 1 },
                { q: "10. Where _________ he work?", opts: ["do", "is", "does", "has"], ans: 2 }
            ]
        },
        
        { type: 'title', content: 'FANTASTIC!', subtitle: 'PRESENT PERFECTED', color: '#3498db', usage: 'READY FOR THE CHALLENGE!' }
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
                    <div style="position:absolute; left:20%; width:60%; height:100%; background:linear-gradient(90deg, transparent, #2ecc71, transparent); opacity:${subStep >= 1 ? 1 : 0}; transition:0.8s; border-radius:10px;"></div>
                    <div style="position:absolute; left:50%; top:-25px; height:60px; width:6px; background:#fff; box-shadow: 0 0 20px #fff;"></div>
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
                                <div style="font-size:3.5vw; color:#fff; font-weight:900;">${r.subjects}</div>
                                <div style="font-size:2vw; color:#666; font-weight:bold;">${r.extra}</div>
                            </div>
                            <div style="font-size:6vw; color:${s.color}; font-weight:900; letter-spacing:5px;">➔ ${r.tool}</div>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'formulation') {
            wrapper.innerHTML = `
                <h2 style="font-size:4.5vw; color:#e74c3c; margin-bottom:40px; font-weight:900;">THE STRUCTURE</h2>
                <div style="display:flex; flex-direction:column; gap:20px; width:100%; align-items:center;">
                    ${s.groups.map(g => `
                        <div style="background:#111; padding:3vh 3vw; border-radius:25px; width:90%; border:3px solid ${g.color}; display:flex; justify-content:space-between; align-items:center;">
                            <div style="text-align:left;">
                                <div style="font-size:3.5vw; color:${g.color}; font-weight:900;">${g.sub}</div>
                                <div style="font-size:1.5vw; color:#666; font-weight:bold;">${g.desc}</div>
                            </div>
                            <div style="font-size:3.8vw; color:#fff; font-weight:bold;">➔ ${g.verb}</div>
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
        else if (s.type === 'transform') {
            let pair = s.pairs[Math.floor(subStep/2)] || s.pairs[0];
            let isChanged = subStep % 2 !== 0;
            wrapper.innerHTML = `
                <h2 style="font-size:4.5vw; color:#e74c3c; margin-bottom:10px; font-weight:900;">${s.title}</h2>
                <p style="font-size:2vw; color:#555; margin-bottom:30px; font-weight:bold;">${s.desc}</p>
                <div style="background:#111; width:90%; padding:8vh 4vw; border-radius:40px; font-size:5vw; border:4px solid #333; color:${isChanged ? '#f1c40f' : '#fff'}; transition: 0.3s; font-weight:bold;">
                    ${isChanged ? pair.neg : pair.pos}
                </div>`;
        }
        else if (s.type === 'spelling-grid') {
            wrapper.innerHTML = `
                <h2 style="font-size:4.5vw; color:#e74c3c; margin-bottom:40px; font-weight:900;">SPELLING RULES</h2>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:30px; width:95%;">
                    ${s.rules.map(r => `
                        <div style="background:#111; padding:4vh 3vw; border-radius:30px; border:2px solid #333; text-align:left;">
                            <div style="color:#e74c3c; font-size:1.8vw; font-weight:bold; margin-bottom:10px;">Ends in: ${r.end}</div>
                            <div style="color:#f1c40f; font-size:4vw; font-weight:900; margin-bottom:15px;">${r.add}</div>
                            <div style="color:#666; font-size:1.8vw; font-weight:bold; border-top:1px solid #222; padding-top:15px;">Ex: ${r.examples}</div>
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
                    <div style="color:#3498db; font-weight:bold; font-size:1.2vw; margin-bottom:10px;">PRACTICE ${qIdx + 1}/10</div>
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
            else if (s.type === 'transform') maxSub = (s.pairs.length * 2) - 1;
            else if (s.type === 'quiz-session') maxSub = (s.questions.length * 2) - 1;
            else if (s.type === 'mcq' || s.type === 'timeline') maxSub = 1;

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
