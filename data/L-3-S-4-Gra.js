(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

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

        /* 4: Reveal List - 7 Examples */
        { 
            type: 'reveal-list', 
            title: '7 Pronouns, 7 Examples',
            items: [
                "1. I <span style='color:#3498db'>drink</span> coffee every morning.",
                "2. He <span style='color:#f1c40f'>plays</span> football on Fridays.",
                "3. She <span style='color:#f1c40f'>speaks</span> English fluently.",
                "4. It <span style='color:#f1c40f'>rains</span> a lot in winter.",
                "5. We <span style='color:#3498db'>watch</span> movies at night.",
                "6. You <span style='color:#3498db'>study</span> hard for exams.",
                "7. They <span style='color:#3498db'>live</span> in a big house."
            ] 
        },

        /* 5: Negative Transform + Rules */
        { 
            type: 'transform', 
            title: 'The Negative',
            desc: "Rule: Don't / Doesn't + Base Form",
            ruleBox: [
                { subjects: "I - We - You - They", helper: "DON'T" },
                { subjects: "He - She - It", helper: "DOESN'T" }
            ],
            pairs: [
                { pos: "I sleep well.", neg: "I <span style='color:#e74c3c;'>DON'T</span> sleep well." },
                { pos: "He works hard.", neg: "He <span style='color:#e74c3c;'>DOESN'T WORK</span> hard." },
                { pos: "They play tennis.", neg: "They <span style='color:#e74c3c;'>DON'T PLAY</span> tennis." }
            ]
        },

        /* 6: Question Transform + Rules */
        { 
            type: 'transform', 
            title: 'The Question',
            desc: 'Rule: Do / Does at the beginning',
            ruleBox: [
                { subjects: "DO + (I - We - You - They)", helper: "?" },
                { subjects: "DOES + (He - She - It)", helper: "?" }
            ],
            pairs: [
                { pos: "You practice English.", neg: "<span style='color:#f1c40f;'>DO</span> you practice English?" },
                { pos: "She cooks lunch.", neg: "<span style='color:#f1c40f;'>DOES</span> she cook lunch?" },
                { pos: "It works fine.", neg: "<span style='color:#f1c40f;'>DOES</span> it work fine?" }
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

        /* 8-17: MCQ Quiz (10 Questions) */
        { question: "1. My father _________ in a big office.", options: ["A) work", "B) works", "C) working", "D) worked"], answer: 1 },
        { question: "2. We _________ (not) go to school on Fridays.", options: ["A) doesn't", "B) isn't", "C) don't", "D) aren't"], answer: 2 },
        { question: "3. _________ you like pizza?", options: ["A) Does", "B) Do", "C) Is", "D) Are"], answer: 1 },
        { question: "4. She _________ her teeth twice a day.", options: ["A) brush", "B) brushes", "C) brushing", "D) brushed"], answer: 1 },
        { question: "5. Cats _________ mice.", options: ["A) catches", "B) catch", "C) catching", "D) caught"], answer: 1 },
        { question: "6. _________ he play the piano?", options: ["A) Do", "B) Does", "C) Is", "D) Has"], answer: 1 },
        { question: "7. I _________ (not) understand the question.", options: ["A) doesn't", "B) don't", "C) am not", "D) not"], answer: 1 },
        { question: "8. The sun _________ in the east.", options: ["A) rise", "B) rises", "C) rising", "D) rose"], answer: 1 },
        { question: "9. _________ they live in Cairo?", options: ["A) Does", "B) Is", "C) Do", "D) Are"], answer: 2 },
        { question: "10. My sister _________ very fast.", options: ["A) run", "B) runs", "C) running", "D) runner"], answer: 1 },
        
        { type: 'title', content: 'EXCELLENT!', subtitle: 'MISSION ACCOMPLISHED', color: '#2ecc71', usage: 'YOU ARE A MASTER!' }
    ];

    function render() {
        const s = slides[currentSlide];
        
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

        // Logic for MCQ vs Normal Slides
        if (!s.type) { // This is an MCQ slide
            const showAns = subStep >= 1;
            wrapper.innerHTML = `
                <h2 style="font-size:3vw; color:#e74c3c; margin-bottom:20px;">QUIZ TIME</h2>
                <div style="text-align:left; background:#111; padding:4vh 4vw; border-radius:40px; border:3px solid #222; width:90%;">
                    <div style="font-size:3vw; font-weight:900; margin-bottom:40px; color:#fff; line-height:1.2;">${s.question}</div>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
                        ${s.options.map((opt, i) => {
                            let isCorrect = showAns && i === s.answer;
                            let color = isCorrect ? '#2ecc71' : (showAns ? '#333' : '#fff');
                            let borderColor = isCorrect ? '#2ecc71' : '#333';
                            return `<div style="border:3px solid ${borderColor}; padding:20px; border-radius:15px; font-size:2.2vw; font-weight:bold; color:${color}; transition:0.3s;">${opt}</div>`;
                        }).join('')}
                    </div>
                </div>`;
        }
        else if (s.type === 'title') {
            wrapper.innerHTML = `
                <div style="font-size:2.5vw; color:#444; letter-spacing:15px; margin-bottom:20px; text-transform:uppercase; font-weight:bold;">${s.subtitle}</div>
                <h1 style="font-size:8vw; font-weight:900; color:${s.color}; margin:0; line-height:1;">${s.content}</h1>
                <div style="font-size:3vw; color:#fff; font-weight:bold; margin-top:50px; border-top:6px solid ${s.color}; display:inline-block; padding-top:20px;">${s.usage}</div>
            `;
        } 
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `
                <h2 style="font-size:4vw; color:#e74c3c; margin-bottom:30px; font-weight:900;">${s.title}</h2>
                <div style="display:grid; grid-template-columns: 1fr; gap:10px; width:85%; text-align:left;">
                    ${s.items.map((item, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0.05}; transform:translateX(${i <= subStep ? 0 : -30}px); transition:0.4s; background:#111; padding:1.5vh 2vw; border-radius:12px; font-size:2vw; font-weight:bold; border-left:10px solid #e74c3c;">
                            ${item}
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'transform') {
            let pair = s.pairs[Math.floor(subStep/2)] || s.pairs[0];
            let isChanged = subStep % 2 !== 0;
            wrapper.innerHTML = `
                <h2 style="font-size:4vw; color:#e74c3c; margin-bottom:10px; font-weight:900;">${s.title}</h2>
                <div style="display:flex; gap:20px; margin-bottom:30px;">
                    ${s.ruleBox.map(r => `
                        <div style="background:#222; padding:15px 25px; border-radius:15px; border:2px solid #444;">
                            <span style="color:#3498db; font-weight:bold;">${r.subjects}</span> = <span style="color:#e74c3c; font-weight:bold;">${r.helper}</span>
                        </div>
                    `).join('')}
                </div>
                <div style="background:#111; width:90%; padding:8vh 4vw; border-radius:40px; font-size:4.5vw; border:4px solid #333; color:${isChanged ? '#f1c40f' : '#fff'}; transition: 0.3s; font-weight:bold;">
                    ${isChanged ? pair.neg : pair.pos}
                </div>`;
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
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if (e.keyCode === 39 || e.keyCode === 13 || e.keyCode === 32) { 
            let maxSub = 0;
            if (s.type === 'reveal-list') maxSub = s.items.length - 1;
            else if (s.type === 'transform') maxSub = (s.pairs.length * 2) - 1;
            else if (s.type === 'timeline' || !s.type) maxSub = 1; // !s.type refers to MCQ

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
    style.innerHTML = `@keyframes vetoFadeIn { from { opacity:0; transform:scale(0.98); } to { opacity:1; transform:scale(1); } }`;
    document.head.appendChild(style);

    render();
})();
