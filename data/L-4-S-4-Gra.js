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
        { type: 'title', content: 'PAST CONT.', subtitle: 'ACTION IN PROGRESS', color: '#e74c3c', usage: 'Was happening at a specific past moment' },
        
        /* 2: Usage Timeline */
        { 
            type: 'timeline', 
            title: 'When to use?', 
            content: 'To describe an action that was <span style="color:#f1c40f">GOING ON</span> at a specific time in the past.',
            labels: ["PAST (Continuous Action)", "NOW", "FUTURE"]
        },

        /* 3: Formulation (The Big Rule) */
        { 
            type: 'rule-box', 
            title: 'THE BLUEPRINT', 
            color: '#3498db',
            rules: [
                { subjects: "I - HE - SHE - IT", tool: "WAS + V-ING", extra: "Singular Power" },
                { subjects: "WE - YOU - THEY", tool: "WERE + V-ING", extra: "Plural Power" }
            ]
        },

        /* 4: 7 Examples for 7 Pronouns */
        { 
            type: 'reveal-list', 
            title: '7 Pronouns - 7 Live Actions',
            items: [
                "1. <span style='color:#3498db'>I</span> was cleaning the car at 5 PM.",
                "2. <span style='color:#3498db'>He</span> was playing during class.",
                "3. <span style='color:#3498db'>She</span> was cooking when I called.",
                "4. <span style='color:#3498db'>It</span> was raining all night long.",
                "5. <span style='color:#3498db'>We</span> were having fun at the academy.",
                "6. <span style='color:#3498db'>You</span> were waiting for a long time.",
                "7. <span style='color:#3498db'>They</span> were watching TV at 10 PM."
            ] 
        },

        /* 5: Negative Rule Slide */
        {
            type: 'rule-box',
            title: 'NEGATIVE RULE',
            color: '#e74c3c',
            rules: [
                { subjects: "I / HE / SHE / IT", tool: "WASN'T", extra: "+ Verb-ing" },
                { subjects: "WE / YOU / THEY", tool: "WEREN'T", extra: "+ Verb-ing" }
            ]
        },

        /* 6: Question Rule Slide */
        {
            type: 'rule-box',
            title: 'QUESTION RULE',
            color: '#f1c40f',
            rules: [
                { subjects: "Was + I/He/She/It", tool: "...ING?", extra: "➔ Start with WAS" },
                { subjects: "Were + We/You/They", tool: "...ING?", extra: "➔ Start with WERE" }
            ]
        },

        /* 7: Spelling Mastery */
        { 
            type: 'spelling-grid', 
            title: 'Spelling Rules',
            rules: [
                { end: "Ends in -e", add: "Drop 'e' + ING", examples: "Ride ➔ Riding" },
                { end: "Short Vowel (CVC)", add: "Double + ING", examples: "Stop ➔ Stopping" },
                { end: "Ends in -ie", add: "y + ING", examples: "Lie ➔ Lying" }
            ]
        },

        /* 8: Quiz Section (10 Questions) */
        { 
            type: 'quiz-session',
            questions: [
                { q: "1. While I _________ lunch, the phone rang.", opts: ["eat", "was eating", "eating", "were eating"], ans: 1 },
                { q: "2. At 10 PM last night, they _________ TV.", opts: ["was watching", "were watching", "watched", "are watching"], ans: 1 },
                { q: "3. She _________ (not) studying when I arrived.", opts: ["wasn't", "weren't", "isn't", "didn't"], ans: 0 },
                { q: "4. What _________ doing at this time yesterday?", opts: ["was you", "did you", "were you", "you were"], ans: 2 },
                { q: "5. When the teacher entered, the boys _________.", opts: ["was shouting", "were shouting", "shouts", "shouted"], ans: 1 },
                { q: "6. Look! It _________ all day yesterday.", opts: ["were raining", "raining", "was raining", "is rain"], ans: 2 },
                { q: "7. While they _________ , the lights went out.", opts: ["was reading", "were reading", "read", "reads"], ans: 1 },
                { q: "8. I _________ a book when Ali knocked on the door.", opts: ["was reading", "were reading", "read", "am reading"], ans: 0 },
                { q: "9. _________ he playing football at 5 PM yesterday?", opts: ["Were", "Did", "Was", "Does"], ans: 2 },
                { q: "10. We _________ (not) sleeping at midnight.", opts: ["wasn't", "weren't", "didn't", "don't"], ans: 1 }
            ]
        },
        
        { type: 'title', content: 'LEGENDARY!', subtitle: 'TOP PERFORMANCE', color: '#2ecc71', usage: 'PAST CONTINUOUS CONQUERED!' }
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
                    <div style="position:absolute; left:15%; width:45%; height:25px; background:linear-gradient(90deg, transparent, #f1c40f, transparent); opacity:${subStep >= 1 ? 1 : 0}; transition:1s; border-radius:20px; top:-6px;">
                        <span style="position:absolute; top:-50px; width:100%; text-align:center; color:#f1c40f; font-weight:bold; font-size:1.8vw;">WAS HAPPENING</span>
                    </div>
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
        else if (s.type === 'spelling-grid') {
            wrapper.innerHTML = `
                <h2 style="font-size:4vw; color:#e74c3c; margin-bottom:40px; font-weight:900;">SPELLING MASTERY</h2>
                <div style="display:grid; grid-template-columns: 1fr; gap:20px; width:95%;">
                    ${s.rules.map(r => `
                        <div style="background:#111; padding:2vh 3vw; border-radius:25px; border:2px solid #333; text-align:left; display:flex; justify-content:space-between; align-items:center;">
                           <div>
                                <div style="color:#e74c3c; font-size:1.5vw; font-weight:bold;">Rule: ${r.end}</div>
                                <div style="color:#f1c40f; font-size:3vw; font-weight:900;">${r.add}</div>
                           </div>
                           <div style="color:#fff; font-size:2.5vw; font-weight:bold; background:#050505; padding:10px 20px; border-radius:15px;">Ex: ${r.examples}</div>
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
