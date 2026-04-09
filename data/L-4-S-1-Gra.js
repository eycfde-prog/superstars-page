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
        { type: 'title', content: 'PAST SIMPLE', subtitle: 'MISSION COMPLETED', color: '#e74c3c', usage: 'Finished Actions + Specific Time' },
        
        /* 2: Timeline */
        { 
            type: 'timeline', 
            title: 'The Timeline', 
            content: 'An action that happened and <span style="color:#f1c40f">FINISHED</span> in the past.',
            labels: ["PAST (Action Happened)", "PRESENT", "FUTURE"]
        },

        /* 3: Structure */
        { 
            type: 'rule-box', 
            title: 'THE STRUCTURE', 
            color: '#e74c3c',
            rules: [
                { subjects: "ALL SUBJECTS", tool: "VERB (V2)", extra: "Regular: add -ED | Irregular: Memorize!" }
            ]
        },

        /* 4: Irregular Verbs (Requested) */


     
        /* 6: 7 Examples for 7 Pronouns */
        { 
            type: 'reveal-list', 
            title: '7 Examples - Past Actions',
            items: [
                "1. <span style='color:#e74c3c'>I</span> watched a movie yesterday.",
                "2. <span style='color:#e74c3c'>He</span> played tennis last week.",
                "3. <span style='color:#e74c3c'>She</span> cooked dinner two hours ago.",
                "4. <span style='color:#e74c3c'>It</span> rained heavily last night.",
                "5. <span style='color:#e74c3c'>We</span> studied English together.",
                "6. <span style='color:#e74c3c'>You</span> bought a new car.",
                "7. <span style='color:#e74c3c'>They</span> saw a lion last month."
            ] 
        },

        /* 7: Negative Rule */
        {
            type: 'rule-box',
            title: 'NEGATIVE RULE',
            color: '#3498db',
            rules: [
                { subjects: "ALL PRONOUNS", tool: "DIDN'T", extra: "➔ Must return to BASE VERB (Inf.)" }
            ]
        },

        /* 8: Question Rule */
        {
            type: 'rule-box',
            title: 'QUESTION RULE',
            color: '#f1c40f',
            rules: [
                { subjects: "ALL PRONOUNS", tool: "DID...?", extra: "➔ Start with DID + Subject + BASE" }
            ]
        },
        {
            type: 'irregular-grid',
            title: 'IRREGULAR REBELS (V2)',
            verbs: [
                { v1: "DO", v2: "DID" },
                { v1: "EAT", v2: "ATE" },
                { v1: "GO", v2: "WENT" },
                { v1: "SEE", v2: "SAW" }
            ]
        },
           /* 5: The 3 Modes Comparison (Requested) */
        {
            type: 'reveal-list',
            title: 'ONE SENTENCE - 3 MODES',
            items: [
                "✅ <span style='color:#fff'>I <span style='color:#f1c40f'>went</span> to work yesterday.</span>",
                "❌ <span style='color:#fff'>I <span style='color:#e74c3c'>didn't go</span> to work yesterday.</span>",
                "❓ <span style='color:#fff'><span style='color:#3498db'>Did</span> I <span style='color:#3498db'>go</span> to work yesterday?</span>"
            ]
        },

        /* 9: Spelling (Including doubling rule) */
        { 
            type: 'spelling-grid', 
            title: 'Spelling Rules',
            rules: [
                { end: "Ends in -e", add: "+D", examples: "Dance ➔ Danced" },
                { end: "Consonant + y", add: "y ➔ IED", examples: "Cry ➔ Cried" },
                { end: "Short Vowel (CVC)", add: "Double + ED", examples: "Shop ➔ Shopped" }
            ]
        },

        /* 10: Quiz Section (10 Questions) */
        { 
            type: 'quiz-session',
            questions: [
                { q: "1. I _________ a scary movie last night.", opts: ["watch", "watched", "watching", "watches"], ans: 1 },
                { q: "2. They _________ (not) go to school yesterday.", opts: ["don't", "wasn't", "didn't", "haven't"], ans: 2 },
                { q: "3. _________ you finish your homework?", opts: ["Did", "Do", "Were", "Are"], ans: 0 },
                { q: "4. My father _________ a new house in 2010.", opts: ["buy", "buys", "bought", "buying"], ans: 2 },
                { q: "5. She didn't _________ the car.", opts: ["drove", "drive", "drives", "driving"], ans: 1 },
                { q: "6. Look! We _________ at the store yesterday.", opts: ["shoped", "shopped", "shop", "shopping"], ans: 1 },
                { q: "7. We _________ lunch at 3 PM today.", opts: ["ate", "eat", "eaten", "eats"], ans: 0 },
                { q: "8. Ali _________ English very hard for the test.", opts: ["study", "studied", "studying", "studies"], ans: 1 },
                { q: "9. Did he _________ the gold medal?", opts: ["won", "wins", "win", "winning"], ans: 2 },
                { q: "10. Two days ago, I _________ my uncle.", opts: ["visit", "visited", "visiting", "visits"], ans: 1 }
            ]
        },
        
        { type: 'title', content: 'EXCELLENT!', subtitle: 'PAST MASTERED', color: '#2ecc71', usage: 'YOU ARE A HERO!' }
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
                    <div style="position:absolute; left:15%; top:-15px; width:45px; height:45px; border-radius:50%; background:#f1c40f; box-shadow:0 0 30px #f1c40f; opacity:${subStep >= 1 ? 1 : 0}; transition:0.5s; display:flex; align-items:center; justify-content:center; color:#000; font-weight:bold; font-size:1.2vw;">V2</div>
                    <div style="position:absolute; left:75%; top:-25px; height:60px; width:6px; background:#fff; box-shadow: 0 0 20px #fff;"></div>
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
                        <div style="background:#111; padding:5vh 4vw; border-radius:30px; width:90%; border:4px solid ${s.color}; display:flex; justify-content:space-between; align-items:center; box-shadow: 0 15px 40px rgba(0,0,0,0.4);">
                            <div style="text-align:left;">
                                <div style="font-size:3.5vw; color:#fff; font-weight:900;">${r.subjects}</div>
                                <div style="font-size:2vw; color:#666; font-weight:bold;">${r.extra}</div>
                            </div>
                            <div style="font-size:6vw; color:${s.color}; font-weight:900; letter-spacing:5px;">➔ ${r.tool}</div>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'irregular-grid') {
            wrapper.innerHTML = `
                <h2 style="font-size:4vw; color:#f1c40f; margin-bottom:30px; font-weight:900;">${s.title}</h2>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; width:90%;">
                    ${s.verbs.map(v => `
                        <div style="background:#111; padding:20px; border-radius:20px; border:2px solid #333; font-size:4vw; font-weight:900;">
                            <span style="color:#666">${v.v1}</span> <span style="color:#e74c3c">➔</span> <span style="color:#fff">${v.v2}</span>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `
                <h2 style="font-size:4.5vw; color:#e74c3c; margin-bottom:30px; font-weight:900;">${s.title}</h2>
                <div style="display:flex; flex-direction:column; gap:12px; text-align:left; width:85%; margin: 0 auto;">
                    ${s.items.map((item, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0.05}; transform:translateX(${i <= subStep ? 0 : -30}px); transition:0.4s; background:#111; padding:15px 25px; border-radius:15px; font-size:2.8vw; font-weight:bold; border-left:12px solid #e74c3c;">
                            ${item}
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'spelling-grid') {
            wrapper.innerHTML = `
                <h2 style="font-size:4.5vw; color:#e74c3c; margin-bottom:40px; font-weight:900;">SPELLING RULES</h2>
                <div style="display:grid; grid-template-columns: 1fr; gap:20px; width:95%;">
                    ${s.rules.map(r => `
                        <div style="background:#111; padding:3vh 3vw; border-radius:30px; border:2px solid #333; text-align:left; display:flex; justify-content:space-between; align-items:center;">
                           <div>
                                <div style="color:#e74c3c; font-size:1.8vw; font-weight:bold;">Condition: ${r.end}</div>
                                <div style="color:#f1c40f; font-size:3.5vw; font-weight:900;">${r.add}</div>
                           </div>
                           <div style="color:#fff; font-size:3vw; font-weight:bold; background:#050505; padding:10px 20px; border-radius:15px;">Ex: ${r.examples}</div>
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
                    <div style="color:#3498db; font-weight:bold; font-size:1.2vw; margin-bottom:10px;">PAST PRACTICE ${qIdx + 1}/10</div>
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
