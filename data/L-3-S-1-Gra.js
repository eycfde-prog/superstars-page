(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#050505; font-family:'Segoe UI', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'PRESENT CONTINUOUS', subtitle: 'Action in Progress', color: '#e74c3c' },
        
        /* 2: Timeline Usage */
        { 
            type: 'timeline', 
            title: 'When to use it?', 
            content: 'An action is happening <span style="color:#2ecc71">at the moment</span> of speaking.' 
        },

        /* 3: Formulation */
        { 
            type: 'writing', 
            title: 'Formulation', 
            content: '<div style="background:#111; padding:30px; border-radius:20px; border:2px solid #333;"><span style="color:#3498db;">Subject</span> + <span style="color:#f1c40f;">(am / is / are)</span> + <span style="color:#e74c3c;">V-ing</span></div><div style="margin-top:30px; font-size:2.5rem; opacity:0.7;">Example: It <span style="color:#e74c3c;">is raining</span>.</div>' 
        },

        /* 4: Examples */
        { 
            type: 'reveal-list', 
            title: 'Live Examples',
            items: [
                "I’m talking to you.",
                "He is explaining the lesson.",
                "She is writing the lesson.",
                "It is working well.",
                "We are studying English.",
                "They are calling us.",
                "You are learning English."
            ] 
        },

        /* 6: Negative Form */
        { 
            type: 'transform', 
            title: 'Negative Form',
            desc: 'Add "NOT" after (am/is/are)',
            pairs: [
                { pos: "I'm talking to you.", neg: "I <span style='color:#e74c3c;'>am not</span> talking to you." },
                { pos: "It is working well.", neg: "It <span style='color:#e74c3c;'>is not</span> working well." },
                { pos: "They are calling us.", neg: "They <span style='color:#e74c3c;'>are not</span> calling us." }
            ]
        },

        /* 7: Question Form */
        { 
            type: 'transform', 
            title: 'Question Form',
            desc: 'Start with (Am/Is/Are)',
            pairs: [
                { pos: "I'm talking to you.", neg: "<span style='color:#f1c40f;'>Am I</span> talking to you?" },
                { pos: "It is working well.", neg: "<span style='color:#f1c40f;'>Is it</span> working well?" },
                { pos: "They are calling us.", neg: "<span style='color:#f1c40f;'>Are they</span> calling us?" }
            ]
        },

        /* 8-13: Spelling Rules */
        { type: 'spelling', title: 'Rule 01', base: 'Write', change: 'Writing', rule: 'Remove the last <span style="color:#e74c3c;">e</span> before adding <span style="color:#f1c40f;">ing</span>' },
        { type: 'spelling', title: 'Rule 02', base: 'Die', change: 'Dying', rule: 'Change <span style="color:#e74c3c;">ie</span> to <span style="color:#f1c40f;">y</span> before adding <span style="color:#f1c40f;">ing</span>' },
        { type: 'spelling', title: 'Rule 03', base: 'Shop', change: 'Shopping', rule: 'One syllable (CVC): <span style="color:#e74c3c;">Double</span> the last letter' },

        /* 14: Keywords */
        { 
            type: 'reveal-list', 
            title: 'Keywords (Clues)',
            items: ["Now", "Right now", "At the moment", "Look!", "Listen!"] 
        },

        /* 15: Quiz */
        { 
            type: 'mcq', 
            question: "The man is _________ fast.",
            options: ["A) Run", "B) Runing", "C) Running", "D) Ran"],
            answer: 2 
        }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:90%; text-align:center; animation: vetoSlideUp 0.5s ease-out;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <h1 style="font-size:7vw; font-weight:900; color:${s.color}; margin:0;">${s.content}</h1>
                <div style="font-size:2vw; letter-spacing:10px; color:#444; margin-top:10px;">${s.subtitle}</div>
            `;
        } 
        else if (s.type === 'timeline') {
            wrapper.innerHTML = `
                <h2 style="font-size:3.5rem; color:#e74c3c; margin-bottom:40px;">${s.title}</h2>
                <p style="font-size:2.2rem; margin-bottom:80px;">${s.content}</p>
                <div style="position:relative; width:80%; margin:40px auto; height:10px; background:#222; border-radius:10px; display:flex; align-items:center;">
                    <div style="position:absolute; left:0; width:33%; text-align:center; top:30px; color:#444; font-size:1.5rem;">PAST</div>
                    <div style="position:absolute; left:33%; width:34%; text-align:center; top:30px; color:#fff; font-size:1.8rem; font-weight:bold;">PRESENT</div>
                    <div style="position:absolute; right:0; width:33%; text-align:center; top:30px; color:#444; font-size:1.5rem;">FUTURE</div>
                    <div style="position:absolute; left:50%; width:20px; height:20px; background:#e74c3c; border-radius:50%; transform:translate(-50%, 0); box-shadow:0 0 30px #e74c3c; opacity:${subStep >= 1 ? 1 : 0}; transition:0.5s;">
                        <span style="position:absolute; top:-50px; left:-50px; width:120px; color:#e74c3c; font-weight:bold; font-size:1.5rem;">HAPPENING!</span>
                    </div>
                </div>`;
        }
        else if (s.type === 'writing') {
            wrapper.innerHTML = `
                <h2 style="font-size:3.5rem; color:#e74c3c; margin-bottom:40px;">${s.title}</h2>
                <div style="font-size:3.5vw; line-height:1.4; color:#fff;">${s.content}</div>`;
        }
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `
                <h2 style="font-size:3rem; color:#e74c3c; margin-bottom:30px;">${s.title}</h2>
                <div style="display:grid; grid-template-columns: 1fr; gap:15px; max-width:800px; margin:0 auto; text-align:left;">
                ${s.items.map((item, i) => `
                    <div style="opacity:${i <= subStep ? 1 : 0}; transform:translateX(${i <= subStep ? 0 : -20}px); transition:0.3s; background:#111; padding:20px; border-radius:12px; font-size:2rem; font-weight:600; border-left:8px solid #e74c3c;">
                        ${item}
                    </div>
                `).join('')}
            </div>`;
        }
        else if (s.type === 'transform') {
            let pair = s.pairs[Math.floor(subStep/2)] || s.pairs[0];
            let isChanged = subStep % 2 !== 0;
            wrapper.innerHTML = `
                <h2 style="font-size:3rem; color:#e74c3c; margin-bottom:10px;">${s.title}</h2>
                <p style="color:#555; margin-bottom:40px;">${s.desc}</p>
                <div style="background:#111; padding:80px; border-radius:30px; border:2px solid #222; position:relative;">
                    <div style="font-size:4vw; color:${isChanged ? '#f1c40f' : '#fff'}; font-weight:900; transition:0.4s;">
                        ${isChanged ? pair.neg : pair.pos}
                    </div>
                    <div style="position:absolute; bottom:20px; right:30px; color:#333; font-size:1rem;">Press Space to Transform</div>
                </div>`;
        }
        else if (s.type === 'spelling') {
            wrapper.innerHTML = `
                <h2 style="font-size:3rem; color:#fff; margin-bottom:50px;">${s.title}</h2>
                <div style="display:flex; justify-content:center; align-items:center; gap:50px; margin-bottom:40px;">
                    <div style="font-size:5vw; font-weight:900; color:#555;">${s.base}</div>
                    <div style="font-size:3vw; color:#e74c3c;">➞</div>
                    <div style="font-size:6vw; font-weight:900; color:#fff; text-shadow:0 0 30px rgba(255,255,255,0.2);">${s.change}</div>
                </div>
                <div style="background:#111; padding:30px; border-radius:15px; font-size:2rem; display:inline-block; border:1px solid #333;">
                    ${s.rule}
                </div>`;
        }
        else if (s.type === 'mcq') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#111; padding:60px; border-radius:30px; border: 2px solid #222;">
                    <div style="font-size:3rem; font-weight:bold; color:#fff; margin-bottom:45px; border-bottom:2px solid #333; padding-bottom:20px;">${s.question}</div>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; opacity:${subStep >= 1 ? 1 : 0}; transition: 0.5s;">
                        ${s.options.map((opt, i) => {
                            let bgColor = "#1a1a1a";
                            let borderColor = "#333";
                            if (subStep >= 2 && i === s.answer) { bgColor = "#27ae60"; borderColor = "#2ecc71"; }
                            return `<div style="background:${bgColor}; border:2px solid ${borderColor}; padding:25px; border-radius:15px; font-size:2.2rem; font-weight:bold; transition:0.3s;">${opt}</div>`;
                        }).join('')}
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if (e.keyCode === 39 || e.keyCode === 13 || e.keyCode === 32) { // Next
            if (s.type === 'timeline' && subStep < 1) subStep++;
            else if (s.type === 'reveal-list' && subStep < s.items.length - 1) subStep++;
            else if (s.type === 'transform' && subStep < (s.pairs.length * 2) - 1) subStep++;
            else if (s.type === 'mcq' && subStep < 2) subStep++;
            else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
            else if (currentSlide === slides.length - 1) { if(window.triggerVetoDone) window.triggerVetoDone(); }
        } else if (e.keyCode === 37) { // Back
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    const style = document.createElement('style');
    style.innerHTML = `@keyframes vetoSlideUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }`;
    document.head.appendChild(style);

    render();
})();
