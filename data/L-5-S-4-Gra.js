(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#080808; font-family:'Inter', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'FUTURE CONTINUOUS', sub: 'Level 5 - Mastery', color: '#3498db' },
        
        /* 2: Timeline Usage */
        { 
            type: 'timeline', 
            title: 'When to use it?', 
            content: 'To talk about an action that <span style="color:#3498db">will be in progress</span> at a specific time in the future.' 
        },

        /* 3: Formulation */
        { 
            type: 'writing', 
            title: 'The Formula', 
            content: `
                <div style="background:#111; padding:30px; border:2px dashed #3498db; border-radius:20px; text-align:center;">
                    <span style="color:#fff">Subject + </span>
                    <span style="color:#f1c40f">Will be</span>
                    <span style="color:#fff"> + </span>
                    <span style="color:#3498db">V-ing</span>
                </div>
                <p style="font-size:1.5rem; color:#666; margin-top:20px;">*You can also use: <span style="color:#9b59b6">am/is/are going to be</span></p>
            ` 
        },

        /* 4: Reveal List */
        { 
            type: 'reveal-list', 
            title: 'Class Examples',
            items: [
                "I will be waiting for you at 5:00.",
                "They are going to be playing football tomorrow morning.",
                "She will be cooking when you arrive home.",
                "We will be flying to London this time next week."
            ] 
        },

        /* 5: Negative Form */
        { 
            type: 'transform', 
            title: 'The Negative (Adding NOT)',
            pairs: [
                { pos: "I will be waiting...", neg: "I <span style='color:#e74c3c;'>will not (won't)</span> be waiting..." },
                { pos: "She is going to be cooking...", neg: "She <span style='color:#e74c3c;'>is not</span> going to be cooking..." }
            ]
        },

        /* 6: Spelling Rule 1 */
        { 
            type: 'writing', 
            title: 'Spelling: Rule 1 (-e)', 
            content: 'Verbs ending in <span style="color:#e74c3c;">e</span> ➔ Drop the <span style="color:#e74c3c;">e</span>.<br><br><span style="color:#3498db">Shave ➔ Shaving</span><br><span style="color:#3498db">Take ➔ Taking</span>' 
        },

        /* 7: Spelling Rule 2 */
        { 
            type: 'writing', 
            title: 'Spelling: Rule 2 (-ie)', 
            content: 'Verbs ending in <span style="color:#e74c3c;">ie</span> ➔ Change to <span style="color:#f1c40f;">y</span>.<br><br><span style="color:#3498db">Lie ➔ Lying</span><br><span style="color:#3498db">Die ➔ Dying</span>' 
        },

        /* 8: Spelling Rule 3 */
        { 
            type: 'writing', 
            title: 'Spelling: Rule 3 (CVC)', 
            content: 'Short verbs (Consonant-Vowel-Consonant) ➔ <span style="color:#f1c40f;">Double</span> the last letter.<br><br><span style="color:#3498db">Sit ➔ Sitting</span><br><span style="color:#3498db">Run ➔ Running</span>' 
        },

        /* 9: Final Quiz */
        { 
            type: 'mcq', 
            question: "Next Saturday, we _________ on the beach.",
            options: ["A) Will be sit", "B) Are going to be sitting", "C) Will sitting", "D) Is going to be sitting"],
            answer: 1 
        }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:90%; text-align:center; animation: slideUp 0.4s ease-out;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <h1 style="font-size:6.5rem; font-weight:900; color:${s.color}; margin:0;">${s.content}</h1>
                <div style="font-size:1.5rem; letter-spacing:10px; color:#444; margin-top:20px; font-weight:bold; text-transform:uppercase;">${s.sub}</div>
            `;
        } 
        else if (s.type === 'timeline') {
            wrapper.innerHTML = `
                <h2 style="font-size:3.5rem; color:#3498db; margin-bottom:30px;">${s.title}</h2>
                <p style="font-size:2rem; margin-bottom:60px; color:#ccc;">${s.content}</p>
                <div style="position:relative; width:80%; margin:80px auto; height:4px; background:#333;">
                    <div style="position:absolute; left:20%; height:40px; width:2px; background:#fff; top:-20px;"><span style="position:absolute; top:50px; left:-20px;">Past</span></div>
                    <div style="position:absolute; left:50%; height:40px; width:4px; background:#3498db; top:-20px;"><span style="position:absolute; top:50px; left:-30px; font-weight:bold; color:#3498db;">Now</span></div>
                    <div style="position:absolute; left:70%; height:40px; width:2px; background:#fff; top:-20px;"><span style="position:absolute; top:50px; left:-25px;">Future</span></div>
                    <div style="position:absolute; left:70%; width:25%; height:12px; background:#3498db; top:-4px; border-radius:10px; opacity:${subStep >= 1 ? 1 : 0}; transition:0.8s; box-shadow:0 0 20px #3498db;"></div>
                </div>`;
        }
        else if (s.type === 'writing') {
            wrapper.innerHTML = `
                <h2 style="font-size:3.5rem; color:#3498db; margin-bottom:40px;">${s.title}</h2>
                <div style="font-size:3rem; line-height:1.5; text-align:center;">${s.content}</div>`;
        }
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `
                <h2 style="font-size:3.5rem; color:#3498db; margin-bottom:40px;">${s.title}</h2>
                <div style="display:flex; flex-direction:column; gap:20px;">
                    ${s.items.map((item, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0.1}; transition:0.3s; background:#111; padding:25px; border-radius:15px; font-size:2rem; font-weight:bold; border-left:10px solid #3498db; text-align:left;">${item}</div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'transform') {
            let pair = s.pairs[Math.floor(subStep/2)] || s.pairs[0];
            let isNeg = subStep % 2 !== 0;
            wrapper.innerHTML = `
                <h2 style="font-size:3.5rem; color:#3498db; margin-bottom:40px;">${s.title}</h2>
                <div style="background:#111; padding:60px; border-radius:30px; font-size:3.5rem; border:1px solid #333;">
                    ${isNeg ? pair.neg : pair.pos}
                </div>`;
        }
        else if (s.type === 'mcq') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#111; padding:50px; border-radius:30px; border:1px solid #333;">
                    <div style="font-size:2.8rem; font-weight:bold; margin-bottom:40px;">${s.question}</div>
                    <div style="display:grid; grid-template-columns: 1fr; gap:20px; opacity:${subStep >= 1 ? 1 : 0}; transition:0.5s;">
                        ${s.options.map((opt, i) => {
                            let border = (subStep >= 2 && i === s.answer) ? '3px solid #2ecc71' : '1px solid #333';
                            return `<div style="padding:25px; border-radius:15px; font-size:2.2rem; border:${border};">${opt}</div>`;
                        }).join('')}
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if (e.keyCode === 39 || e.keyCode === 32) { // Next
            if (s.type === 'timeline' && subStep < 1) subStep++;
            else if (s.type === 'reveal-list' && subStep < s.items.length - 1) subStep++;
            else if (s.type === 'transform' && subStep < (s.pairs.length * 2) - 1) subStep++;
            else if (s.type === 'mcq' && subStep < 2) subStep++;
            else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
            else { if(window.triggerVetoDone) window.triggerVetoDone(); }
        } else if (e.keyCode === 37) { // Back
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    render();
})();
