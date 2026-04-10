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
        { type: 'title', content: 'FUTURE CONT.', subtitle: 'MASTERY LEVEL', color: '#3498db', usage: 'In Progress at a Future Point' },
        
        /* 2: Timeline */
        { 
            type: 'timeline', 
            title: 'When to use it?', 
            content: 'An action that <span style="color:#3498db">WILL BE IN PROGRESS</span> at a specific time.',
            labels: ["PAST", "NOW", "FUTURE"]
        },

        /* 3: Formulation */
        { 
            type: 'rule-box', 
            title: 'THE BLUEPRINT', 
            color: '#3498db',
            rules: [
                { subjects: "ALL PRONOUNS", tool: "WILL BE", extra: "Subject + Will be" },
                { subjects: "THE MAIN VERB", tool: "VERB + ING", extra: "Action in progress" }
            ]
        },

        /* 4: 7 Examples - Optimized Font Size */
        { 
            type: 'reveal-list', 
            title: 'Examples',
            items: [
                "1. <span style='color:#3498db'>I</span> will be waiting for you at 5:00.",
                "2. <span style='color:#3498db'>He</span> will be flying over the Atlantic tomorrow.",
                "3. <span style='color:#3498db'>She</span> will be cooking when you arrive.",
                "4. <span style='color:#3498db'>It</span> will be raining all morning tomorrow.",
                "5. <span style='color:#3498db'>We</span> will be sleeping at midnight tonight.",
                "6. <span style='color:#3498db'>You</span> will be studying during the weekend.",
                "7. <span style='color:#3498db'>They</span> will be playing football at 4 PM."
            ] 
        },

        /* 5: Negative & Question Rules */
        {
            type: 'rule-box',
            title: 'NEGATIVE & QUESTION',
            color: '#e74c3c',
            rules: [
                { subjects: "NEGATIVE", tool: "WON'T BE", extra: "Will + not + be" },
                { subjects: "QUESTION", tool: "WILL ... BE?", extra: "Will + Subj + be + ing" }
            ]
        },

        /* 6: Keywords */
        {
            type: 'keywords-grid',
            title: 'TIME DETECTIVES',
            words: ["At 5 PM tomorrow", "This time next week", "All day tomorrow", "From 6 to 8", "During the morning"]
        },

        /* 7: Quiz Section (10 Questions) */
        { 
            type: 'quiz-session',
            questions: [
                { q: "1. Next Saturday, we _________ on the beach.", opts: ["Will be sit", "Will be sitting", "Will sitting", "Is sitting"], ans: 1 },
                { q: "2. Don't call me at 8 PM. I _________ a movie.", opts: ["will be watching", "will watching", "watch", "am watched"], ans: 0 },
                { q: "3. This time tomorrow, they _________ to Paris.", opts: ["will been flying", "will flying", "will be flying", "are flying"], ans: 2 },
                { q: "4. What _________ at 10:00 tomorrow morning?", opts: ["you will be doing", "will you be doing", "will you doing", "are you do"], ans: 1 },
                { q: "5. She _________ (not) the car this evening.", opts: ["won't be using", "won't being using", "not be using", "isn't using"], ans: 0 },
                { q: "6. At 9 PM, I _________ my homework.", opts: ["will doing", "will be doing", "doing", "be doing"], ans: 1 },
                { q: "7. They _________ all day tomorrow.", opts: ["will be working", "will work", "be working", "work"], ans: 0 },
                { q: "8. _________ you be sleeping when I call?", opts: ["Do", "Are", "Will", "Was"], ans: 2 },
                { q: "9. This time next year, I _________ my own company.", opts: ["run", "will be running", "running", "will running"], ans: 1 },
                { q: "10. We _________ (not) playing at 5 PM.", opts: ["won't be", "not will be", "aren't", "don't"], ans: 0 }
            ]
        },
        
        { type: 'title', content: 'FANTASTIC!', subtitle: 'STAGE CLEAR', color: '#f1c40f', usage: 'YOU ARE A MASTER OF FUTURE!' }
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
                <p style="font-size:2.5vw; margin-bottom:50px; color:#ddd;">${s.content}</p>
                <div style="position:relative; width:80%; margin:50px auto; height:8px; background:#222; border-radius:10px;">
                    <div style="position:absolute; left:48%; top:-20px; height:45px; width:4px; background:#fff;"></div>
                    <div style="position:absolute; left:60%; width:25%; height:20px; background:linear-gradient(90deg, #3498db, transparent); opacity:${subStep >= 1 ? 1 : 0}; transition:1s; border-radius:10px; top:-6px; border-left:4px solid #fff;"></div>
                    <div style="position:absolute; width:100%; top:40px; display:flex; justify-content:space-between; color:#444; font-size:1.5vw; font-weight:bold;">
                        ${s.labels.map(l => `<span>${l}</span>`).join('')}
                    </div>
                </div>`;
        }
        else if (s.type === 'rule-box') {
            wrapper.innerHTML = `
                <h2 style="font-size:3.5vw; color:${s.color}; margin-bottom:30px; font-weight:900;">${s.title}</h2>
                <div style="display:flex; flex-direction:column; gap:20px; width:100%; align-items:center;">
                    ${s.rules.map(r => `
                        <div style="background:#0a0a0a; padding:3vh 3vw; border-radius:20px; width:95%; border:3px dashed ${s.color}; display:flex; justify-content:space-between; align-items:center; box-shadow:0 10px 30px rgba(0,0,0,0.5);">
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
                        <div style="background:#111; padding:15px 30px; border-radius:40px; border:2px solid #3498db; font-size:2.2vw; font-weight:900; color:#fff;">
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
                    <div style="color:#3498db; font-weight:bold; font-size:1.1vw; margin-bottom:8px;">TEST ${qIdx + 1}/10</div>
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
    style.innerHTML = `@keyframes vetoFadeIn { from { opacity:0; transform:scale(0.99); } to { opacity:1; transform:scale(1); } }`;
    document.head.appendChild(style);

    render();
})();
