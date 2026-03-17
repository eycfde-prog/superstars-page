(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#050505; font-family:'Inter', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'PAST PERFECT SIMPLE', sub: 'The Past of the Past', color: '#e74c3c' },
        
        /* 2: Timeline Usage */
        { 
            type: 'timeline', 
            title: 'Which happened first?', 
            content: 'We use it to show that <span style="color:#f1c40f">Action 1</span> happened before <span style="color:#3498db">Action 2</span>.' 
        },

        /* 3: Formulation */
        { 
            type: 'writing', 
            title: 'The Formula', 
            content: `
                <div style="background:#111; padding:40px; border-radius:20px; border:2px solid #333; text-align:center;">
                    <span style="color:#fff">Subject + </span>
                    <span style="color:#f1c40f; font-weight:900;">HAD</span>
                    <span style="color:#fff"> + </span>
                    <span style="color:#e74c3c; font-weight:900;">V3 (P.P)</span>
                </div>
                <p style="font-size:1.8rem; margin-top:30px; color:#aaa;">Example: I <span style="color:#f1c40f">had finished</span> before it <span style="color:#3498db">rained</span>.</p>
            ` 
        },

        /* 4: Reveal List */
        { 
            type: 'reveal-list', 
            title: 'Mastering the Order',
            items: [
                "I had finished my work before the meeting started.",
                "She had already cooked lunch when he arrived.",
                "The train had left by the time we reached the station.",
                "They had lost their way before they found the map."
            ] 
        },

        /* 5: Negative & Question */
        { 
            type: 'transform', 
            title: 'Changing Forms',
            pairs: [
                { pos: "He had cleaned the car...", neg: "He <span style='color:#e74c3c;'>had not</span> (hadn't) cleaned..." },
                { pos: "They had left the party...", neg: "<span style='color:#f1c40f;'>Had they</span> left the party...?" }
            ]
        },

        /* 6: Irregular Focus */
        { 
            type: 'writing', 
            title: 'Irregular V3 Reminder', 
            content: '<div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; font-size:2.5rem; color:#f1c40f;"><span>Go ➔ Gone</span><span>See ➔ Seen</span><span>Write ➔ Written</span><span>Eat ➔ Eaten</span></div>' 
        },

        /* 7: Spelling Rule 1 */
        { type: 'writing', title: 'Rule 1: Ends with (e)', content: 'We only add <span style="color:#f1c40f;">(d)</span><br><br><span style="color:#e74c3c;">Complete ➔ Completed</span>' },

        /* 8: Spelling Rule 2 */
        { type: 'writing', title: 'Rule 2: Consonant + Y', content: 'Change <span style="color:#e74c3c;">y</span> to <span style="color:#f1c40f;">ied</span><br><br><span style="color:#e74c3c;">Try ➔ Tried</span>' },

        /* 9: Keywords */
        { 
            type: 'writing', 
            title: 'Logic Connectors', 
            content: '<div style="display:grid; grid-template-columns:1fr 1fr; gap:30px; color:#3498db;"><div><small style="color:#fff">Followed by Had+V3:</small><br>After<br>As soon as</div><div><small style="color:#fff">Followed by V2:</small><br>Before<br>By the time</div></div>' 
        },

        /* 10: Quiz */
        { 
            type: 'mcq', 
            question: "We _________ the ability to speak English until we _________ grammar.",
            options: ["A) didn't have / understood", "B) hadn't have / understood", "C) hadn't had / understood", "D) haven't had / understood"],
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
                <p style="font-size:1.8rem; color:#555; letter-spacing:8px; margin-top:20px; text-transform:uppercase;">${s.sub}</p>
            `;
        } 
        else if (s.type === 'timeline') {
            wrapper.innerHTML = `
                <h2 style="font-size:3.5rem; color:#e74c3c; margin-bottom:40px;">${s.title}</h2>
                <p style="font-size:2.2rem; margin-bottom:60px;">${s.content}</p>
                <div style="position:relative; width:85%; margin:60px auto; height:6px; background:#333; display:flex; align-items:center; justify-content:space-between;">
                    <div style="height:40px; width:4px; background:#fff; position:relative;"><span style="position:absolute; top:50px; left:-25px; color:#fff;">Present</span></div>
                    <div style="position:absolute; left:20%; height:80px; width:8px; background:#f1c40f; opacity:${subStep >= 1 ? 1 : 0}; transition:0.5s;">
                        <span style="position:absolute; bottom:90px; left:-60px; font-size:1.3rem; color:#f1c40f; width:150px;">Action 1<br>(Had + V3)</span>
                    </div>
                    <div style="position:absolute; left:50%; height:80px; width:8px; background:#3498db; opacity:${subStep >= 1 ? 1 : 0}; transition:0.8s;">
                        <span style="position:absolute; bottom:90px; left:-60px; font-size:1.3rem; color:#3498db; width:150px;">Action 2<br>(Past Simple)</span>
                    </div>
                </div>`;
        }
        else if (s.type === 'writing') {
            wrapper.innerHTML = `
                <h2 style="font-size:4rem; color:#e74c3c; margin-bottom:40px;">${s.title}</h2>
                <div style="font-size:3.2rem; line-height:1.5;">${s.content}</div>`;
        }
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `
                <h2 style="font-size:3.5rem; color:#e74c3c; margin-bottom:30px;">${s.title}</h2>
                <div style="display:flex; flex-direction:column; gap:15px; text-align:left;">
                    ${s.items.map((item, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0}; transition:0.3s; background:#111; padding:20px; border-radius:15px; font-size:1.8rem; border-left:10px solid #f1c40f;">${item}</div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'transform') {
            let pair = s.pairs[Math.floor(subStep/2)] || s.pairs[0];
            let isAlt = subStep % 2 !== 0;
            wrapper.innerHTML = `
                <h2 style="font-size:3.5rem; color:#e74c3c; margin-bottom:40px;">${s.title}</h2>
                <div style="background:#111; padding:60px; border-radius:30px; font-size:3rem; border:1px solid #333; color:${isAlt ? '#f1c40f' : '#fff'}">
                    ${isAlt ? pair.neg : pair.pos}
                </div>`;
        }
        else if (s.type === 'mcq') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#111; padding:50px; border-radius:30px; border:1px solid #333;">
                    <div style="font-size:2.5rem; font-weight:bold; margin-bottom:40px;">${s.question}</div>
                    <div style="display:grid; grid-template-columns: 1fr; gap:20px; opacity:${subStep >= 1 ? 1 : 0}; transition:0.5s;">
                        ${s.options.map((opt, i) => {
                            let color = (subStep >= 2 && i === s.answer) ? '#27ae60' : (subStep >= 2 ? '#555' : '#fff');
                            let border = (subStep >= 2 && i === s.answer) ? '2px solid #27ae60' : '1px solid #333';
                            return `<div style="padding:20px; border-radius:15px; font-size:2rem; border:${border}; color:${color}">${opt}</div>`;
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
