(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#050505; font-family:'Inter', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'PRESENT PERFECT CONTINUOUS', sub: 'Action in Progress since the Past', color: '#2ecc71' },
        
        /* 2: Timeline Usage */
        { 
            type: 'timeline', 
            title: 'The Flow of Time', 
            content: 'An action started in the <span style="color:#e74c3c">Past</span> and is <span style="color:#2ecc71">Still Happening</span> now.' 
        },

        /* 3: Formulation */
        { 
            type: 'writing', 
            title: 'The Formula', 
            content: `
                <div style="background:#111; padding:35px; border-radius:20px; border:1px solid #333; font-weight:700;">
                    <span style="color:#fff">Sub + </span>
                    <span style="color:#f1c40f">have / has</span>
                    <span style="color:#fff"> + </span>
                    <span style="color:#3498db">been</span>
                    <span style="color:#fff"> + </span>
                    <span style="color:#2ecc71">V-ing</span>
                </div>
            ` 
        },

        /* 4: Examples */
        { 
            type: 'reveal-list', 
            title: 'Focus on Continuity',
            items: [
                "I have been waiting for two hours.",
                "He has been working since 7 AM.",
                "It has been raining all day long.",
                "They have been playing for a long time."
            ] 
        },

        /* 5: Negative & Question */
        { 
            type: 'transform', 
            title: 'Negatives & Questions',
            pairs: [
                { pos: "She has been cooking...", neg: "She <span style='color:#e74c3c;'>has not</span> been cooking..." },
                { pos: "They have been running...", neg: "<span style='color:#f1c40f;'>Have they</span> been running...?" }
            ]
        },

        /* 6: Spelling Rule 1 */
        { type: 'writing', title: 'Spelling: Rule 1', content: 'Remove <span style="color:#e74c3c;">e</span> → Add <span style="color:#2ecc71;">ing</span><br><br><span style="color:#f1c40f;">Hide ➔ Hiding</span><br><span style="color:#f1c40f;">Make ➔ Making</span>' },

        /* 7: Spelling Rule 2 */
        { type: 'writing', title: 'Spelling: Rule 2', content: 'Change <span style="color:#e74c3c;">ie</span> to <span style="color:#f1c40f;">y</span> + <span style="color:#2ecc71;">ing</span><br><br><span style="color:#f1c40f;">Lie ➔ Lying</span><br><span style="color:#f1c40f;">Die ➔ Dying</span>' },

        /* 8: Spelling Rule 3 */
        { type: 'writing', title: 'Spelling: Rule 3 (CVC)', content: 'Double the last letter<br><br><span style="color:#f1c40f;">Swim ➔ Swimming</span><br><span style="color:#f1c40f;">Run ➔ Running</span>' },

        /* 9: Keywords */
        { 
            type: 'reveal-list', 
            title: 'Time Markers',
            items: ["For", "Since", "All day / All week", "How long...?", "Lately / Recently"] 
        },

        /* 10: Quiz */
        { 
            type: 'mcq', 
            question: "How long _________ for the bus?",
            options: ["A) Have you been wait", "B) Has you been waiting", "C) Have you been waiting", "D) Are you waiting"],
            answer: 2 
        }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:90%; text-align:center; animation: fadeIn 0.4s ease;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <h1 style="font-size:6rem; font-weight:900; color:${s.color}; margin:0;">${s.content}</h1>
                <p style="font-size:1.5rem; color:#555; letter-spacing:5px; margin-top:20px; font-weight:bold;">${s.sub}</p>
            `;
        } 
        else if (s.type === 'timeline') {
            wrapper.innerHTML = `
                <h2 style="font-size:3.5rem; color:#2ecc71; margin-bottom:30px;">${s.title}</h2>
                <p style="font-size:2rem; margin-bottom:60px;">${s.content}</p>
                <div style="position:relative; width:85%; margin:60px auto; height:4px; background:#222;">
                    <div style="position:absolute; left:20%; height:30px; width:2px; background:#666; top:-13px;"><span style="position:absolute; top:40px; left:-15px; color:#666;">Past</span></div>
                    <div style="position:absolute; left:80%; height:30px; width:4px; background:#fff; top:-13px;"><span style="position:absolute; top:40px; left:-25px; color:#fff; font-weight:bold;">Now</span></div>
                    <div style="position:absolute; left:20%; width:60%; height:12px; background:linear-gradient(90deg, #2ecc71, #f1c40f); top:-4px; border-radius:10px; opacity:${subStep >= 1 ? 1 : 0}; transition:1.2s; box-shadow: 0 0 20px rgba(46, 204, 113, 0.4);"></div>
                </div>`;
        }
        else if (s.type === 'writing') {
            wrapper.innerHTML = `
                <h2 style="font-size:4rem; color:#2ecc71; margin-bottom:40px;">${s.title}</h2>
                <div style="font-size:3.2rem; line-height:1.5;">${s.content}</div>`;
        }
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `
                <h2 style="font-size:3.5rem; color:#2ecc71; margin-bottom:40px;">${s.title}</h2>
                <div style="display:flex; flex-direction:column; gap:15px; text-align:left;">
                    ${s.items.map((item, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0}; transition:0.3s; background:#111; padding:20px; border-radius:15px; font-size:2rem; border-left:10px solid #2ecc71;">${item}</div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'transform') {
            let pair = s.pairs[Math.floor(subStep/2)] || s.pairs[0];
            let isChanged = subStep % 2 !== 0;
            wrapper.innerHTML = `
                <h2 style="font-size:3.5rem; color:#2ecc71; margin-bottom:40px;">${s.title}</h2>
                <div style="background:#111; padding:60px; border-radius:30px; font-size:3.2rem; border:1px solid #333; color:${isChanged ? '#f1c40f' : '#fff'}">
                    ${isChanged ? pair.neg : pair.pos}
                </div>`;
        }
        else if (s.type === 'mcq') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#111; padding:50px; border-radius:30px; border:1px solid #333;">
                    <div style="font-size:2.8rem; font-weight:bold; margin-bottom:40px;">${s.question}</div>
                    <div style="display:grid; grid-template-columns: 1fr; gap:20px; opacity:${subStep >= 1 ? 1 : 0}; transition:0.5s;">
                        ${s.options.map((opt, i) => {
                            let border = (subStep >= 2 && i === s.answer) ? '3px solid #2ecc71' : '1px solid #333';
                            let color = (subStep >= 2 && i === s.answer) ? '#2ecc71' : '#fff';
                            return `<div style="padding:20px; border-radius:15px; font-size:2.2rem; border:${border}; color:${color}">${opt}</div>`;
                        }).join('')}
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if (e.keyCode === 39 || e.keyCode === 32 || e.keyCode === 13) { 
            if (s.type === 'timeline' && subStep < 1) subStep++;
            else if (s.type === 'reveal-list' && subStep < s.items.length - 1) subStep++;
            else if (s.type === 'transform' && subStep < (s.pairs.length * 2) - 1) subStep++;
            else if (s.type === 'mcq' && subStep < 2) subStep++;
            else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
        } else if (e.keyCode === 37) { 
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    render();
})();
