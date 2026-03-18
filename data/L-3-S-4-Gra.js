(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#050505; font-family:'Segoe UI', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'PRESENT SIMPLE', subtitle: 'FACTS & ROUTINE', color: '#e74c3c', usage: 'Habits - Facts - Daily Routine' },
        
        /* 2: Timeline */
        { 
            type: 'timeline', 
            title: 'The Routine', 
            content: 'Actions that happen <span style="color:#2ecc71">generally</span> or <span style="color:#2ecc71">repeatedly</span>.' 
        },

        /* 3: Formulation */
        { 
            type: 'formulation', 
            title: 'The Two Teams', 
            groups: [
                { sub: "I - We - You - They", verb: "Infinitive (Base Form)", color: "#3498db", desc: "Keep it simple!" },
                { sub: "He - She - It", verb: "Infinitive + <span style='color:#f1c40f;'>S / ES / IES</span>", color: "#f1c40f", desc: "The S-Team!" }
            ]
        },

        /* 4: Reveal List */
        { 
            type: 'reveal-list', 
            title: 'Daily Life Examples',
            items: [
                "1. I sleep well every night.",
                "2. He explains grammar smartly.",
                "3. She cooks lunch every day.",
                "4. We take a class every week.",
                "5. They feel happy at the park."
            ] 
        },

        /* 5: Negative Transform */
        { 
            type: 'transform', 
            title: 'The Negative',
            desc: 'Use DON\'T or DOESN\'T (+ Base Form)',
            pairs: [
                { pos: "I sleep well.", neg: "I <span style='color:#e74c3c;'>DON'T</span> sleep well." },
                { pos: "He works hard.", neg: "He <span style='color:#e74c3c;'>DOESN'T WORK</span> hard." },
                { pos: "She plays tennis.", neg: "She <span style='color:#e74c3c;'>DOESN'T PLAY</span> tennis." }
            ]
        },

        /* 6: Question Transform */
        { 
            type: 'transform', 
            title: 'The Question',
            desc: 'Start with DO or DOES',
            pairs: [
                { pos: "You practice English.", neg: "<span style='color:#f1c40f;'>DO</span> you practice English?" },
                { pos: "He works here.", neg: "<span style='color:#f1c40f;'>DOES</span> he work here?" },
                { pos: "It rains a lot.", neg: "<span style='color:#f1c40f;'>DOES</span> it rain a lot?" }
            ]
        },

        /* 7: Spelling Rules */
        { 
            type: 'spelling-grid', 
            title: 'Spelling Mastery',
            rules: [
                { end: "ss, o, x, ch, sh", add: "+ES", examples: "Goes, Watches, Fixes" },
                { end: "Consonant + y", add: "(-y) + IES", examples: "Cries, Flies, Studies" }
            ]
        },

        /* 8: Keywords */
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

        /* --- Quiz Section (5 Questions) --- */
        { 
            type: 'mcq', 
            question: "1. The cat _________ peacefully next to me every day.",
            options: ["A) Sleep", "B) Sleeps", "C) Sleeping", "D) Slept"],
            answer: 1 
        },
        { 
            type: 'mcq', 
            question: "2. We _________ (not) like coffee in the morning.",
            options: ["A) doesn't", "B) isn't", "C) don't", "D) haven't"],
            answer: 2 
        },
        { 
            type: 'mcq', 
            question: "3. _________ your brother play the guitar?",
            options: ["A) Do", "B) Does", "C) Is", "D) Are"],
            answer: 1 
        },
        { 
            type: 'mcq', 
            question: "4. She _________ her homework early.",
            options: ["A) do", "B) does", "C) doing", "D) did"],
            answer: 1 
        },
        { 
            type: 'mcq', 
            question: "5. They always _________ to the gym on Fridays.",
            options: ["A) goes", "B) go", "C) going", "D) gone"],
            answer: 1 
        },
        
        { type: 'title', content: 'FANTASTIC!', subtitle: 'PRESENT PERFECTED', color: '#3498db', usage: 'READY FOR THE CHALLENGE!' }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:95%; max-width:1400px; text-align:center; animation: vetoFadeIn 0.5s ease;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <div style="font-size:2.5vw; color:#444; letter-spacing:15px; margin-bottom:20px; text-transform:uppercase; font-weight:bold;">${s.subtitle}</div>
                <h1 style="font-size:9vw; font-weight:900; color:${s.color}; margin:0; line-height:1; text-shadow: 0 10px 40px rgba(231,76,60,0.3);">${s.content}</h1>
                <div style="font-size:3.5vw; color:#fff; font-weight:bold; margin-top:50px; border-top:6px solid ${s.color}; display:inline-block; padding-top:20px;">${s.usage}</div>
            `;
        } 
        else if (s.type === 'timeline') {
            wrapper.innerHTML = `
                <h2 style="font-size:5rem; color:#e74c3c; margin-bottom:50px; font-weight:900;">${s.title}</h2>
                <p style="font-size:3.5rem; margin-bottom:100px; color:#ddd;">${s.content}</p>
                <div style="position:relative; width:85%; margin:100px auto; height:12px; background:#222; border-radius:10px;">
                    <div style="position:absolute; left:20%; width:60%; height:100%; background:linear-gradient(90deg, transparent, #2ecc71, transparent); opacity:${subStep >= 1 ? 1 : 0}; transition:0.8s; border-radius:10px;"></div>
                    <div style="position:absolute; left:50%; top:-25px; height:60px; width:6px; background:#fff; box-shadow: 0 0 20px #fff;"></div>
                    <div style="position:absolute; width:100%; top:50px; display:flex; justify-content:space-between; color:#444; font-size:2rem; font-weight:bold; letter-spacing:5px;">
                        <span>PAST</span><span>PRESENT (HABIT)</span><span>FUTURE</span>
                    </div>
                </div>`;
        }
        else if (s.type === 'formulation') {
            wrapper.innerHTML = `
                <h2 style="font-size:5.5rem; color:#e74c3c; margin-bottom:50px; font-weight:900;">THE STRUCTURE</h2>
                <div style="display:flex; flex-direction:column; gap:30px; align-items:center;">
                    ${s.groups.map(g => `
                        <div style="background:#111; padding:45px; border-radius:30px; width:90%; border:3px solid ${g.color}; display:flex; justify-content:space-between; align-items:center; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                            <div style="text-align:left;">
                                <div style="font-size:4rem; color:${g.color}; font-weight:900;">${g.sub}</div>
                                <div style="font-size:1.8rem; color:#666; font-weight:bold;">${g.desc}</div>
                            </div>
                            <div style="font-size:4.5rem; color:#fff; font-weight:bold;">➔ ${g.verb}</div>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `
                <h2 style="font-size:5.5rem; color:#e74c3c; margin-bottom:40px; font-weight:900;">EXAMPLES</h2>
                <div style="display:flex; flex-direction:column; gap:15px; text-align:left; max-width:1000px; margin: 0 auto;">
                    ${s.items.map((item, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0.05}; transform:translateX(${i <= subStep ? 0 : -50}px); transition:0.3s; background:#111; padding:25px; border-radius:20px; font-size:2.8rem; font-weight:bold; border-left:15px solid #e74c3c;">
                            ${item}
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'transform') {
            let pair = s.pairs[Math.floor(subStep/2)] || s.pairs[0];
            let isChanged = subStep % 2 !== 0;
            wrapper.innerHTML = `
                <h2 style="font-size:5.5rem; color:#e74c3c; margin:0; font-weight:900;">${s.title}</h2>
                <p style="font-size:2.5rem; color:#555; margin-bottom:40px; font-weight:bold;">${s.desc}</p>
                <div style="background:#111; padding:80px; border-radius:50px; font-size:5.5rem; border:4px solid #333; color:${isChanged ? '#f1c40f' : '#fff'}; transition: 0.3s; font-weight:bold; box-shadow: inset 0 0 50px rgba(0,0,0,0.8);">
                    ${isChanged ? pair.neg : pair.pos}
                </div>`;
        }
        else if (s.type === 'spelling-grid') {
            wrapper.innerHTML = `
                <h2 style="font-size:5.5rem; color:#e74c3c; margin-bottom:50px; font-weight:900;">SPELLING RULES</h2>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:40px;">
                    ${s.rules.map(r => `
                        <div style="background:#111; padding:50px; border-radius:40px; border:2px solid #333; text-align:left; box-shadow: 0 15px 40px rgba(0,0,0,0.5);">
                            <div style="color:#e74c3c; font-size:2.2rem; font-weight:bold; margin-bottom:15px; text-transform:uppercase;">Ends in: ${r.end}</div>
                            <div style="color:#f1c40f; font-size:5rem; font-weight:900; margin-bottom:25px;">${r.add}</div>
                            <div style="color:#666; font-size:2.2rem; font-style:italic; font-weight:bold; border-top:1px solid #222; padding-top:20px;">Ex: ${r.examples}</div>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'mcq') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#111; padding:70px; border-radius:50px; border:3px solid #222; box-shadow: 0 20px 60px rgba(0,0,0,0.7);">
                    <div style="font-size:4rem; font-weight:900; margin-bottom:50px; color:#fff; line-height:1.2;">${s.question}</div>
                    <div style="display:grid; grid-template-columns: 1fr; gap:25px;">
                        ${s.options.map((opt, i) => {
                            let isCorrect = subStep >= 2 && i === s.answer;
                            let border = isCorrect ? '8px solid #2ecc71' : '2px solid #333';
                            let bg = isCorrect ? 'rgba(46,204,113,0.1)' : 'transparent';
                            let color = isCorrect ? '#2ecc71' : (subStep >= 2 ? '#444' : '#fff');
                            return `<div style="background:${bg}; border:${border}; padding:30px; border-radius:25px; font-size:3.2rem; font-weight:bold; color:${color}; transition:0.3s;">${opt}</div>`;
                        }).join('')}
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if (e.keyCode === 39 || e.keyCode === 13 || e.keyCode === 32) { 
            if ((s.type === 'timeline' || s.type === 'reveal-list') && subStep < (s.items ? s.items.length - 1 : 1)) subStep++;
            else if (s.type === 'transform' && subStep < (s.pairs.length * 2) - 1) subStep++;
            else if (s.type === 'mcq' && subStep < 2) subStep++;
            else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
            else { if(window.triggerVetoDone) window.triggerVetoDone(); }
        } else if (e.keyCode === 37) { 
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    const style = document.createElement('style');
    style.innerHTML = `@keyframes vetoFadeIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`;
    document.head.appendChild(style);

    render();
})();
