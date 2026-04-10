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
        { type: 'title', content: 'PRES. PERFECT CONT.', subtitle: 'GRAMMAR FOCUS', color: '#2ecc71', usage: 'Action started in the past & STILL happening' },
        
        /* 2: Timeline */
        { 
            type: 'timeline', 
            title: 'The Flow of Time', 
            content: 'An action started in the <span style="color:#e74c3c">Past</span> and is <span style="color:#2ecc71">STILL PROGRESSING</span> now.',
            labels: ["PAST (Start)", "NOW (Ongoing)"]
        },

        /* 3: Formulation */
        { 
            type: 'rule-box', 
            title: 'THE FORMULA', 
            color: '#2ecc71',
            rules: [
                { subjects: "I / WE / YOU / THEY", tool: "HAVE BEEN + ING", extra: "Focus on Duration" },
                { subjects: "HE / SHE / IT", tool: "HAS BEEN + ING", extra: "Action still in progress" }
            ]
        },

        /* 4: Examples */
        { 
            type: 'reveal-list', 
            title: 'Focus on Continuity',
            items: [
                "1. I <span style='color:#2ecc71'>have been waiting</span> for two hours.",
                "2. He <span style='color:#2ecc71'>has been working</span> since 7 AM.",
                "3. It <span style='color:#2ecc71'>has been raining</span> all day long.",
                "4. They <span style='color:#2ecc71'>have been playing</span> for ages.",
                "5. Why are you red? - I <span style='color:#2ecc71'>have been running</span>.",
                "6. She <span style='color:#2ecc71'>has been cooking</span> since morning.",
                "7. We <span style='color:#2ecc71'>have been studying</span> English lately."
            ] 
        },

        /* 5: Negative & Question */
        {
            type: 'rule-box',
            title: 'NEGATIVES & QUESTIONS',
            color: '#f1c40f',
            rules: [
                { subjects: "NEGATIVE", tool: "HAVEN'T / HASN'T BEEN", extra: "Add 'NOT' after have/has" },
                { subjects: "QUESTION", tool: "HAVE / HAS ... BEEN + ING?", extra: "Start with Have or Has" }
            ]
        },

        /* 6: Keywords Grid */
        {
            type: 'keywords-grid',
            title: 'TIME MARKERS',
            words: ["For / Since", "All day", "All week", "How long?", "Lately", "Recently", "The whole morning"]
        },

        /* 7: Quiz Session (10 Questions) */
        { 
            type: 'quiz-session',
            questions: [
                { q: "1. How long _________ for the bus?", opts: ["have you been waiting", "has you been waiting", "have you waiting", "are you waiting"], ans: 0 },
                { q: "2. It _________ all morning and it hasn't stopped.", opts: ["is snowing", "has been snowing", "has snowing", "snowed"], ans: 1 },
                { q: "3. I'm tired because I _________ the house for hours.", opts: ["cleaned", "am cleaning", "have been cleaning", "has been cleaning"], ans: 2 },
                { q: "4. Why are your hands dirty? - I _________ in the garden.", opts: ["worked", "working", "have been working", "has been working"], ans: 2 },
                { q: "5. She _________ the piano since she was a child.", opts: ["has been playing", "have been playing", "plays", "is playing"], ans: 0 },
                { q: "6. They _________ (not / sleep) well recently.", opts: ["hasn't been sleeping", "haven't been sleeping", "haven't slept", "not sleeping"], ans: 1 },
                { q: "7. _________ you been waiting long?", opts: ["Has", "Are", "Have", "Do"], ans: 2 },
                { q: "8. He is out of breath. He _________.", opts: ["has been running", "have been running", "is running", "runs"], ans: 0 },
                { q: "9. We _________ English for 3 years now.", opts: ["have studying", "are studying", "have been studying", "studied"], ans: 2 },
                { q: "10. The baby _________ (cry) for the whole hour!", opts: ["has been crying", "have been crying", "is crying", "cries"], ans: 0 }
            ]
        },
        
        { type: 'title', content: 'EXCELLENT!', subtitle: 'STAGE COMPLETE', color: '#c5a059', usage: 'YOU ARE A GRAMMAR CHAMPION!' }
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
                <h1 style="font-size:7.2vw; font-weight:900; color:${s.color}; margin:0; line-height:1; text-shadow:0 10px 30px rgba(46,204,113,0.2);">${s.content}</h1>
                <div style="font-size:2.8vw; color:#fff; font-weight:bold; margin-top:40px; border-top:5px solid ${s.color}; display:inline-block; padding-top:15px;">${s.usage}</div>
            `;
        } 
        else if (s.type === 'timeline') {
            wrapper.innerHTML = `
                <h2 style="font-size:4vw; color:#2ecc71; margin-bottom:25px; font-weight:900;">${s.title}</h2>
                <p style="font-size:2.5vw; margin-bottom:50px; color:#ddd; padding: 0 50px;">${s.content}</p>
                <div style="position:relative; width:80%; margin:50px auto; height:8px; background:#222; border-radius:10px;">
                    <div style="position:absolute; left:15%; top:-20px; height:45px; width:4px; background:#e74c3c;"></div>
                    <div style="position:absolute; right:15%; top:-20px; height:45px; width:6px; background:#fff;"></div>
                    <div style="position:absolute; left:15%; width:70%; height:20px; background:linear-gradient(90deg, #2ecc71, #f1c40f); opacity:${subStep >= 1 ? 1 : 0}; transition:1.5s; border-radius:10px; top:-6px; box-shadow: 0 0 20px rgba(46,204,113,0.4);"></div>
                    <div style="position:absolute; width:100%; top:40px; display:flex; justify-content:space-between; color:#555; font-size:1.5vw; font-weight:bold; padding: 0 10%;">
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
                            <div style="font-size:3.8vw; color:${s.color}; font-weight:900;">➔ ${r.tool}</div>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `
                <h2 style="font-size:3.5vw; color:#2ecc71; margin-bottom:20px; font-weight:900;">CONTINUITY</h2>
                <div style="display:flex; flex-direction:column; gap:8px; text-align:left; width:95%;">
                    ${s.items.map((item, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0.05}; transform:translateX(${i <= subStep ? 0 : 20}px); transition:0.3s; background:#111; padding:12px 20px; border-radius:12px; font-size:1.9vw; font-weight:bold; border-left:10px solid #2ecc71; line-height:1.2;">
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
                        <div style="background:#111; padding:15px 30px; border-radius:40px; border:2px solid #2ecc71; font-size:2vw; font-weight:900; color:#fff;">
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
                    <div style="color:#2ecc71; font-weight:bold; font-size:1.1vw; margin-bottom:8px;">PRACTICE ${qIdx + 1}/10</div>
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
