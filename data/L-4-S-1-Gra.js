(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#050505; font-family:'Poppins', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'PAST SIMPLE', subtitle: 'Completed Actions', color: '#e74c3c' },
        
        /* 2: Timeline Usage */
        { 
            type: 'timeline', 
            title: 'Usage', 
            content: 'An action happened at a <span style="color:#f1c40f">specific time</span> in the past.' 
        },

        /* 3: Formulation */
        { 
            type: 'writing', 
            title: 'Formulation', 
            content: '<span style="color:#f1c40f;">Subject + V2 (Past Form)</span><br><br><div style="font-size:2rem; opacity:0.8;">Example: I <span style="color:#e74c3c; border-bottom:2px solid;">visited</span> the pyramids last week.</div>' 
        },

        /* 4: Reveal List Examples */
        { 
            type: 'reveal-list', 
            title: 'Regular Verb Examples',
            items: [
                "I watched a video yesterday.",
                "He played a lot today.",
                "She fixed my shirt this morning.",
                "It worked for a long time.",
                "We studied English in class.",
                "They called us at night."
            ] 
        },

        /* 6: Negative Transformation */
        { 
            type: 'transform', 
            title: 'Negative Form',
            desc: 'Didn\'t + Base Form (Remove -ed)',
            pairs: [
                { pos: "I watched a video.", neg: "I <span style='color:#e74c3c;'>didn't watch</span> a video." },
                { pos: "He played a lot.", neg: "He <span style='color:#e74c3c;'>didn't play</span> a lot." },
                { pos: "We studied English.", neg: "We <span style='color:#e74c3c;'>didn't study</span> English." }
            ]
        },

        /* 7: Question Transformation */
        { 
            type: 'transform', 
            title: 'Question Form',
            desc: 'Did ... + Base Form?',
            pairs: [
                { pos: "I watched a video.", neg: "<span style='color:#f1c40f;'>Did</span> I <span style='color:#f1c40f;'>watch</span> a video?" },
                { pos: "He played a lot.", neg: "<span style='color:#f1c40f;'>Did</span> he <span style='color:#f1c40f;'>play</span> a lot?" },
                { pos: "We studied English.", neg: "<span style='color:#f1c40f;'>Did</span> we <span style='color:#f1c40f;'>study</span> English?" }
            ]
        },

        /* 8: Irregular Focus */
        { 
            type: 'writing', 
            title: 'Irregular Verbs', 
            content: '<span style="color:#e74c3c;">Go ➞ Went</span><br><span style="color:#e74c3c;">Eat ➞ Ate</span><br><span style="color:#e74c3c;">See ➞ Saw</span><br><div style="font-size:1.5rem; margin-top:20px; color:#555;">They don\'t follow the -ed rule!</div>' 
        },

        /* 9-14: Spelling Rules Grid */
        { 
            type: 'spelling-rules', 
            title: 'Spelling Rules',
            rules: [
                { word: "Complete", result: "Completed", rule: "Ends in -e: add <span style='color:#f1c40f'>d</span>" },
                { word: "Try", result: "Tried", rule: "Consonant + y: <span style='color:#e74c3c'>y ➞ ied</span>" },
                { word: "Shop", result: "Shopped", rule: "CVC Rule: <span style='color:#f1c40f'>Double P</span> + ed" }
            ]
        },

        /* 15: Keywords */
        { 
            type: 'reveal-list', 
            title: 'Past Keywords',
            items: ["Yesterday", "Last (week/month/year)", "Ago (two days ago)", "In 2023", "Once upon a time"] 
        },

        /* 16: Quiz */
        { 
            type: 'mcq', 
            question: "They _________ us the email an hour ago.",
            options: ["A) Send", "B) Sending", "C) Sended", "D) Sent"],
            answer: 3 
        }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:90%; text-align:center; animation: vetoFadeIn 0.4s ease;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <h1 style="font-size:8vw; font-weight:900; color:${s.color}; margin:0;">${s.content}</h1>
                <div style="font-size:1.5vw; letter-spacing:10px; color:#444; margin-top:10px;">${s.subtitle}</div>
            `;
        } 
        else if (s.type === 'timeline') {
            wrapper.innerHTML = `
                <h2 style="font-size:3.5rem; color:#e74c3c; margin-bottom:40px;">${s.title}</h2>
                <p style="font-size:2.2rem; margin-bottom:80px;">${s.content}</p>
                <div style="position:relative; width:80%; margin:40px auto; height:8px; background:#222; border-radius:10px;">
                    <div style="position:absolute; left:75%; top:-15px; height:40px; width:4px; background:#fff;"></div>
                    <div style="position:absolute; left:25%; top:-10px; width:20px; height:20px; border-radius:50%; background:#f1c40f; box-shadow:0 0 15px #f1c40f; opacity:${subStep >= 1 ? 1 : 0}; transition:0.5s;"></div>
                    <div style="position:absolute; width:100%; top:25px; display:flex; justify-content:space-between; color:#444; font-size:1.2rem; font-weight:bold;">
                        <span>PAST</span><span>PRESENT</span><span>FUTURE</span>
                    </div>
                </div>`;
        }
        else if (s.type === 'writing') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#111; padding:60px; border-left:15px solid #e74c3c; border-radius:20px;">
                    <h2 style="font-size:3.5rem; margin-bottom:20px; color:#e74c3c;">${s.title}</h2>
                    <div style="font-size:3.5rem; line-height:1.4; color:#fff;">${s.content}</div>
                </div>`;
        }
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `
                <h2 style="font-size:3rem; color:#e74c3c; margin-bottom:30px;">${s.title}</h2>
                <div style="display:grid; grid-template-columns: 1fr; gap:12px; max-width:800px; margin:0 auto; text-align:left;">
                ${s.items.map((item, i) => `
                    <div style="opacity:${i <= subStep ? 1 : 0}; transform:translateX(${i <= subStep ? 0 : -20}px); transition:0.3s; background:#111; padding:18px; border-radius:12px; font-size:1.8rem; font-weight:600; border-left:8px solid #e74c3c;">
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
                <div style="background:#111; padding:80px; border-radius:30px;">
                    <div style="font-size:4vw; color:${isChanged ? '#f1c40f' : '#fff'}; font-weight:900; transition:0.4s;">
                        ${isChanged ? pair.neg : pair.pos}
                    </div>
                </div>`;
        }
        else if (s.type === 'spelling-rules') {
            wrapper.innerHTML = `
                <h2 style="font-size:3rem; color:#e74c3c; margin-bottom:40px;">${s.title}</h2>
                <div style="display:grid; grid-template-columns: 1fr; gap:20px;">
                    ${s.rules.map((r, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0.1}; transition:0.4s; background:#111; padding:25px; border-radius:15px; display:flex; justify-content:space-between; align-items:center; border:1px solid #222;">
                            <div style="text-align:left;">
                                <div style="font-size:2rem; font-weight:900;">${r.word} ➞ <span style="color:#f1c40f">${r.result}</span></div>
                                <div style="color:#555; font-size:1.2rem;">${r.rule}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'mcq') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#111; padding:60px; border-radius:30px;">
                    <div style="font-size:3rem; font-weight:bold; color:#fff; margin-bottom:45px;">${s.question}</div>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; opacity:${subStep >= 1 ? 1 : 0}; transition: 0.5s;">
                        ${s.options.map((opt, i) => {
                            let bgColor = "#1a1a1a";
                            if (subStep >= 2 && i === s.answer) { bgColor = "#27ae60"; }
                            return `<div style="background:${bgColor}; padding:25px; border-radius:15px; font-size:2.2rem; font-weight:bold;">${opt}</div>`;
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
            else if (s.type === 'spelling-rules' && subStep < s.rules.length - 1) subStep++;
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
