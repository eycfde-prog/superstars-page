(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // إعداد الحاوية الأساسية لضمان عدم خروج المحتوى
    container.innerHTML = ''; 
    container.style.cssText = `
        height:100%; width:100%; overflow:hidden; position:relative; 
        display:flex; align-items:center; justify-content:center; 
        background:#050505; font-family:'Segoe UI', sans-serif; 
        direction:ltr; color:white;
    `;

    let currentSlide = 0;
    let subStep = 0;
    let lastRenderedSlide = -1;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'PRESENT SIMPLE', subtitle: 'FACTS & ROUTINE', color: '#e74c3c', usage: 'Habits - Facts - Daily Routine' },
        
        /* 2: Timeline */
        { 
            type: 'timeline', 
            title: 'The Routine', 
            content: 'Actions that happen <span style="color:#2ecc71">generally</span> or <span style="color:#2ecc71">repeatedly</span>.',
            labels: ["PAST", "PRESENT (HABIT)", "FUTURE"]
        },

        /* 3: Formulation */
        { 
            type: 'formulation', 
            title: 'The Structure', 
            groups: [
                { sub: "I - We - You - They", verb: "Infinitive (Base)", color: "#3498db", desc: "Keep it simple!" },
                { sub: "He - She - It", verb: "Verb + <span style='color:#f1c40f;'>S / ES / IES</span>", color: "#f1c40f", desc: "The S-Team!" }
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
            desc: "Use DON'T or DOESN'T (+ Base Form)",
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

        /* 9: MCQ */
        { 
            type: 'mcq', 
            question: "1. The cat _________ peacefully every day.",
            options: ["A) Sleep", "B) Sleeps", "C) Sleeping", "D) Slept"],
            answer: 1 
        },
        { 
            type: 'mcq', 
            question: "2. We _________ (not) like coffee.",
            options: ["A) doesn't", "B) isn't", "C) don't", "D) haven't"],
            answer: 2 
        },
        { 
            type: 'mcq', 
            question: "3. _________ your brother play the guitar?",
            options: ["A) Do", "B) Does", "C) Is", "D) Are"],
            answer: 1 
        },
        
        { type: 'title', content: 'FANTASTIC!', subtitle: 'PRESENT PERFECTED', color: '#3498db', usage: 'READY FOR THE CHALLENGE!' }
    ];

    function render() {
        const s = slides[currentSlide];
        
        // منع الرمشة: مسح الحاوية فقط إذا انتقلنا لسلايد جديد
        if (lastRenderedSlide !== currentSlide) {
            container.innerHTML = '';
            const wrapper = document.createElement('div');
            wrapper.id = 'slide-wrapper';
            wrapper.style.cssText = `
                width:95%; max-width:1300px; height: 90vh; 
                display:flex; flex-direction:column; justify-content:center; align-items:center;
                text-align:center; animation: vetoFadeIn 0.4s ease-out;
            `;
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
                    <div style="position:absolute; left:20%; width:60%; height:100%; background:linear-gradient(90deg, transparent, #2ecc71, transparent); opacity:${subStep >= 1 ? 1 : 0}; transition:0.8s; border-radius:10px;"></div>
                    <div style="position:absolute; left:50%; top:-25px; height:60px; width:6px; background:#fff; box-shadow: 0 0 20px #fff;"></div>
                    <div style="position:absolute; width:100%; top:50px; display:flex; justify-content:space-between; color:#444; font-size:1.8vw; font-weight:bold; letter-spacing:3px;">
                        ${s.labels.map(l => `<span>${l}</span>`).join('')}
                    </div>
                </div>`;
        }
        else if (s.type === 'formulation') {
            wrapper.innerHTML = `
                <h2 style="font-size:4.5vw; color:#e74c3c; margin-bottom:40px; font-weight:900;">THE STRUCTURE</h2>
                <div style="display:flex; flex-direction:column; gap:20px; width:100%; align-items:center;">
                    ${s.groups.map(g => `
                        <div style="background:#111; padding:3vh 3vw; border-radius:25px; width:90%; border:3px solid ${g.color}; display:flex; justify-content:space-between; align-items:center;">
                            <div style="text-align:left;">
                                <div style="font-size:3.5vw; color:${g.color}; font-weight:900;">${g.sub}</div>
                                <div style="font-size:1.5vw; color:#666; font-weight:bold;">${g.desc}</div>
                            </div>
                            <div style="font-size:3.8vw; color:#fff; font-weight:bold;">➔ ${g.verb}</div>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `
                <h2 style="font-size:4.5vw; color:#e74c3c; margin-bottom:30px; font-weight:900;">EXAMPLES</h2>
                <div style="display:flex; flex-direction:column; gap:15px; text-align:left; width:85%; margin: 0 auto;">
                    ${s.items.map((item, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0.05}; transform:translateX(${i <= subStep ? 0 : -30}px); transition:0.4s; background:#111; padding:20px 30px; border-radius:15px; font-size:2.5vw; font-weight:bold; border-left:12px solid #e74c3c;">
                            ${item}
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'transform') {
            let pair = s.pairs[Math.floor(subStep/2)] || s.pairs[0];
            let isChanged = subStep % 2 !== 0;
            wrapper.innerHTML = `
                <h2 style="font-size:4.5vw; color:#e74c3c; margin-bottom:10px; font-weight:900;">${s.title}</h2>
                <p style="font-size:2vw; color:#555; margin-bottom:30px; font-weight:bold;">${s.desc}</p>
                <div style="background:#111; width:90%; padding:8vh 4vw; border-radius:40px; font-size:5vw; border:4px solid #333; color:${isChanged ? '#f1c40f' : '#fff'}; transition: 0.3s; font-weight:bold;">
                    ${isChanged ? pair.neg : pair.pos}
                </div>`;
        }
        else if (s.type === 'spelling-grid') {
            wrapper.innerHTML = `
                <h2 style="font-size:4.5vw; color:#e74c3c; margin-bottom:40px; font-weight:900;">SPELLING RULES</h2>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:30px; width:95%;">
                    ${s.rules.map(r => `
                        <div style="background:#111; padding:4vh 3vw; border-radius:30px; border:2px solid #333; text-align:left;">
                            <div style="color:#e74c3c; font-size:1.8vw; font-weight:bold; margin-bottom:10px;">Ends in: ${r.end}</div>
                            <div style="color:#f1c40f; font-size:4vw; font-weight:900; margin-bottom:15px;">${r.add}</div>
                            <div style="color:#666; font-size:1.8vw; font-weight:bold; border-top:1px solid #222; padding-top:15px;">Ex: ${r.examples}</div>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'mcq') {
            const showAns = subStep >= 1;
            wrapper.innerHTML = `
                <div style="text-align:left; background:#111; padding:5vh 4vw; border-radius:40px; border:3px solid #222; width:90%;">
                    <div style="font-size:3.5vw; font-weight:900; margin-bottom:40px; color:#fff; line-height:1.2;">${s.question}</div>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
                        ${s.options.map((opt, i) => {
                            let isCorrect = showAns && i === s.answer;
                            let color = isCorrect ? '#2ecc71' : (showAns ? '#333' : '#fff');
                            let borderColor = isCorrect ? '#2ecc71' : '#333';
                            return `<div style="border:3px solid ${borderColor}; padding:20px; border-radius:15px; font-size:2.5vw; font-weight:bold; color:${color}; transition:0.3s;">${opt}</div>`;
                        }).join('')}
                    </div>
                </div>`;
        }
    }

    // إدارة مفاتيح الكيبورد
    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if (e.keyCode === 39 || e.keyCode === 13 || e.keyCode === 32) { 
            let maxSub = 0;
            if (s.type === 'reveal-list') maxSub = s.items.length - 1;
            else if (s.type === 'transform') maxSub = (s.pairs.length * 2) - 1;
            else if (s.type === 'mcq' || s.type === 'timeline') maxSub = 1;

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
    style.innerHTML = `
        @keyframes vetoFadeIn { 
            from { opacity:0; transform:scale(0.98); } 
            to { opacity:1; transform:scale(1); } 
        }
    `;
    document.head.appendChild(style);

    render();
})();
