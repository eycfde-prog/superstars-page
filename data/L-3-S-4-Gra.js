(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#050505; font-family:'Segoe UI', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'PRESENT SIMPLE', subtitle: 'Facts, Habits & Routine', color: '#e74c3c' },
        
        /* 2: Timeline Usage */
        { 
            type: 'timeline', 
            title: 'Usage', 
            content: 'Actions that happen <span style="color:#2ecc71">generally</span> or <span style="color:#2ecc71">repeatedly</span>.' 
        },

        /* 3: Formulation */
        { 
            type: 'formulation', 
            title: 'How to build it?', 
            groups: [
                { sub: "I / We / You / They", verb: "Infinitive", color: "#3498db" },
                { sub: "He / She / It", verb: "Infinitive + <span style='color:#f1c40f;'>s / es</span>", color: "#f1c40f" }
            ]
        },

        /* 4: Examples */
        { 
            type: 'reveal-list', 
            title: 'General Examples',
            items: [
                "I sleep well.",
                "He explains grammar smartly.",
                "She cooks every day.",
                "It works well.",
                "We take a class every week.",
                "They feel happy at the park.",
                "You practice English regularly."
            ] 
        },

        /* 6: Negative Form */
        { 
            type: 'transform', 
            title: 'Negative Form',
            desc: 'Use "Don\'t" or "Doesn\'t"',
            pairs: [
                { pos: "I sleep well.", neg: "I <span style='color:#e74c3c;'>don't</span> sleep well." },
                { pos: "He works hard.", neg: "He <span style='color:#e74c3c;'>doesn't</span> <span style='text-decoration:line-through; color:#444;'>workS</span> work hard." },
                { pos: "You practice English.", neg: "You <span style='color:#e74c3c;'>don't</span> practice English." }
            ]
        },

        /* 7: Question Form */
        { 
            type: 'transform', 
            title: 'Question Form',
            desc: 'Start with "Do" or "Does"',
            pairs: [
                { pos: "I sleep well.", neg: "<span style='color:#f1c40f;'>Do</span> I sleep well?" },
                { pos: "He works hard.", neg: "<span style='color:#f1c40f;'>Does</span> he work hard?" },
                { pos: "You practice English.", neg: "<span style='color:#f1c40f;'>Do</span> you practice English?" }
            ]
        },

        /* 8-11: Spelling Rules Combined */
        { 
            type: 'spelling-grid', 
            title: 'Spelling Rules (+es / +ies)',
            rules: [
                { end: "ss, o, x, ch, sh", add: "+es", examples: "Passes, Goes, Fixes, Watches" },
                { end: "Consonant + y", add: "-y + ies", examples: "Cry ➞ Cries, Fly ➞ Flies" }
            ]
        },

        /* 12: Keywords */
        { 
            type: 'reveal-list', 
            title: 'Frequency Keywords',
            items: ["Always", "Usually", "Often", "Sometimes", "Hardly ever", "Never", "Every day/week"] 
        },

        /* 13: Quiz */
        { 
            type: 'mcq', 
            question: "The cat _________ peacefully next to me.",
            options: ["A) Sleep", "B) Sleeps", "C) Sleeping", "D) Slept"],
            answer: 1 
        }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:90%; text-align:center; animation: vetoFadeIn 0.5s ease;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <h1 style="font-size:8vw; font-weight:900; color:${s.color}; margin:0;">${s.content}</h1>
                <div style="font-size:1.5vw; letter-spacing:12px; color:#444; margin-top:10px; text-transform:uppercase;">${s.subtitle}</div>
            `;
        } 
        else if (s.type === 'timeline') {
            wrapper.innerHTML = `
                <h2 style="font-size:3.5rem; color:#e74c3c; margin-bottom:40px;">${s.title}</h2>
                <p style="font-size:2.2rem; margin-bottom:80px;">${s.content}</p>
                <div style="position:relative; width:80%; margin:40px auto; height:10px; background:#222; border-radius:10px;">
                    <div style="position:absolute; left:20%; width:60%; height:100%; background:linear-gradient(90deg, transparent, #2ecc71, transparent); opacity:${subStep >= 1 ? 1 : 0}; transition:0.8s;"></div>
                    <div style="position:absolute; left:50%; top:-15px; height:40px; width:4px; background:#fff;"></div>
                    <div style="position:absolute; width:100%; top:25px; display:flex; justify-content:space-between; color:#444; font-size:1.2rem; font-weight:bold;">
                        <span>PAST</span><span>PRESENT</span><span>FUTURE</span>
                    </div>
                </div>`;
        }
        else if (s.type === 'formulation') {
            wrapper.innerHTML = `
                <h2 style="font-size:3rem; color:#e74c3c; margin-bottom:50px;">${s.title}</h2>
                <div style="display:flex; flex-direction:column; gap:20px; align-items:center;">
                    ${s.groups.map(g => `
                        <div style="background:#111; padding:30px; border-radius:20px; width:80%; border:2px solid ${g.color}; display:flex; justify-content:space-between; align-items:center;">
                            <span style="font-size:2.5vw; color:${g.color}; font-weight:bold;">${g.sub}</span>
                            <span style="font-size:3vw; color:#fff;">➞ ${g.verb}</span>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `
                <h2 style="font-size:3rem; color:#e74c3c; margin-bottom:30px;">${s.title}</h2>
                <div style="display:grid; grid-template-columns: 1fr; gap:12px; max-width:800px; margin:0 auto; text-align:left;">
                ${s.items.map((item, i) => `
                    <div style="opacity:${i <= subStep ? 1 : 0}; transform:translateX(${i <= subStep ? 0 : -20}px); transition:0.3s; background:#111; padding:18px; border-radius:12px; font-size:2rem; font-weight:600; border-left:8px solid #e74c3c;">
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
                <div style="background:#111; padding:80px; border-radius:30px; border:1px solid #222;">
                    <div style="font-size:4vw; color:${isChanged ? '#f1c40f' : '#fff'}; font-weight:900; transition:0.4s;">
                        ${isChanged ? pair.neg : pair.pos}
                    </div>
                </div>`;
        }
        else if (s.type === 'spelling-grid') {
            wrapper.innerHTML = `
                <h2 style="font-size:3rem; color:#e74c3c; margin-bottom:50px;">${s.title}</h2>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:30px;">
                    ${s.rules.map(r => `
                        <div style="background:#111; padding:40px; border-radius:25px; border:1px solid #333; text-align:left;">
                            <div style="color:#e74c3c; font-size:1.5rem; font-weight:bold; margin-bottom:10px;">If ends in: ${r.end}</div>
                            <div style="color:#f1c40f; font-size:3rem; font-weight:900; margin-bottom:20px;">${r.add}</div>
                            <div style="color:#888; font-style:italic;">Ex: ${r.examples}</div>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'mcq') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#111; padding:60px; border-radius:30px; border: 2px solid #222;">
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
    style.innerHTML = `@keyframes vetoFadeIn { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }`;
    document.head.appendChild(style);

    render();
})();
