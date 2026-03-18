(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#050505; font-family:'Segoe UI', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'PAST SIMPLE', subtitle: 'MISSION COMPLETED', color: '#e74c3c', usage: 'Finished Actions + Specific Time' },
        
        /* 2: Timeline */
        { 
            type: 'timeline', 
            title: 'The Timeline', 
            content: 'An action that happened and <span style="color:#f1c40f">FINISHED</span> in the past.' 
        },

        /* 3: Formulation */
        { 
            type: 'writing', 
            title: 'The Structure', 
            content: `
                <div style="background:#1a0505; padding:60px; border-radius:40px; border:5px solid #e74c3c; text-align:center; box-shadow: 0 0 70px rgba(231,76,60,0.3);">
                    <span style="color:#f1c40f; font-weight:900; font-size:7rem;">SUBJECT + V2</span>
                    <br>
                    <span style="color:#fff; font-size:3.5rem; opacity:0.8;">(Add -ed to regular verbs)</span>
                </div>
            ` 
        },

        /* 4: Reveal List */
        { 
            type: 'reveal-list', 
            title: 'Regular Warriors',
            items: [
                "1. I watched a video yesterday.",
                "2. She fixed my shirt this morning.",
                "3. We studied English in class.",
                "4. They called us last night.",
                "5. He played football two hours ago."
            ] 
        },

        /* 5: Irregular Verbs */
        { 
            type: 'writing', 
            title: 'Irregular Rebels', 
            content: `
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:30px; font-size:4rem; font-weight:900; text-align:center;">
                    <div style="background:#111; padding:20px; border-radius:15px; color:#e74c3c;">Go ➔ Went</div>
                    <div style="background:#111; padding:20px; border-radius:15px; color:#e74c3c;">Eat ➔ Ate</div>
                    <div style="background:#111; padding:20px; border-radius:15px; color:#e74c3c;">See ➔ Saw</div>
                    <div style="background:#111; padding:20px; border-radius:15px; color:#e74c3c;">Buy ➔ Bought</div>
                </div>
                <p style="font-size:2rem; color:#555; margin-top:40px;">No -ed here! You must memorize them.</p>
            ` 
        },

        /* 6: Negative */
        { 
            type: 'transform', 
            title: 'The Negative',
            desc: "DIDN'T + INFINITIVE (Base Form)",
            pairs: [
                { pos: "I watched a video.", neg: "I <span style='color:#e74c3c;'>didn't WATCH</span> a video." },
                { pos: "He played a lot.", neg: "He <span style='color:#e74c3c;'>didn't PLAY</span> a lot." },
                { pos: "She went out.", neg: "She <span style='color:#e74c3c;'>didn't GO</span> out." }
            ]
        },

        /* 7: Question */
        { 
            type: 'transform', 
            title: 'The Question',
            desc: "DID + SUBJECT + INFINITIVE ?",
            pairs: [
                { pos: "You watched it.", neg: "<span style='color:#f1c40f;'>DID</span> you <span style='color:#f1c40f;'>WATCH</span> it?" },
                { pos: "He played well.", neg: "<span style='color:#f1c40f;'>DID</span> he <span style='color:#f1c40f;'>PLAY</span> well?" },
                { pos: "They saw us.", neg: "<span style='color:#f1c40f;'>DID</span> they <span style='color:#f1c40f;'>SEE</span> us?" }
            ]
        },

        /* 8: Spelling */
        { 
            type: 'spelling-rules', 
            title: 'Spelling Rules',
            rules: [
                { word: "Dance", result: "Danced", rule: "Ends in -e: just add <span style='color:#f1c40f'>'d'</span>" },
                { word: "Cry", result: "Cried", rule: "Consonant + y: <span style='color:#e74c3c'>y ➔ ied</span>" },
                { word: "Stop", result: "Stopped", rule: "CVC Rule: <span style='color:#f1c40f'>Double last letter</span> + ed" }
            ]
        },

        /* --- Quiz Section (5 Questions) --- */
        { 
            type: 'mcq', 
            question: "1. They _________ us the email an hour ago.",
            options: ["A) Send", "B) Sending", "C) Sended", "D) Sent"],
            answer: 3 
        },
        { 
            type: 'mcq', 
            question: "2. I _________ (not/see) Ali at the party yesterday.",
            options: ["A) didn't saw", "B) didn't see", "C) don't see", "D) saw not"],
            answer: 1 
        },
        { 
            type: 'mcq', 
            question: "3. _________ you finish your project last week?",
            options: ["A) Were", "B) Do", "C) Did", "D) Have"],
            answer: 2 
        },
        { 
            type: 'mcq', 
            question: "4. My mother _________ a delicious cake this morning.",
            options: ["A) baked", "B) bakes", "C) baking", "D) bake"],
            answer: 0 
        },
        { 
            type: 'mcq', 
            question: "5. We _________ to the beach last summer.",
            options: ["A) goed", "B) gone", "C) go", "D) went"],
            answer: 3 
        },
        
        { type: 'title', content: 'EXCELLENT!', subtitle: 'PAST MASTERED', color: '#27ae60', usage: 'YOU ARE READY FOR THE NEXT LEVEL!' }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:90%; max-width:1400px; text-align:center; animation: slideIn 0.4s ease-out;`;

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
                    <div style="position:absolute; left:75%; height:60px; width:6px; background:#fff; top:-24px; box-shadow: 0 0 20px #fff;"><span style="position:absolute; top:75px; left:-35px; color:#fff; font-size:2rem; font-weight:bold;">PRESENT</span></div>
                    <div style="position:absolute; left:25%; top:-15px; width:45px; height:45px; border-radius:50%; background:#f1c40f; box-shadow:0 0 30px #f1c40f; opacity:${subStep >= 1 ? 1 : 0}; transition:0.5s; display:flex; align-items:center; justify-content:center; color:#000; font-weight:bold; font-size:1.5rem;">V2</div>
                    <div style="position:absolute; width:100%; top:50px; display:flex; justify-content:space-between; color:#444; font-size:2rem; font-weight:bold; letter-spacing:5px;">
                        <span>PAST</span><span>FUTURE</span>
                    </div>
                </div>`;
        }
        else if (s.type === 'writing') {
            wrapper.innerHTML = `
                <h2 style="font-size:6rem; color:#e74c3c; margin-bottom:50px; font-weight:900; text-transform:uppercase;">${s.title}</h2>
                <div style="font-size:4.5rem; line-height:1.2; font-weight:bold;">${s.content}</div>
            `;
        }
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `
                <h2 style="font-size:5.5rem; color:#e74c3c; margin-bottom:40px; font-weight:900;">EXAMPLES</h2>
                <div style="display:flex; flex-direction:column; gap:20px; text-align:left;">
                    ${s.items.map((item, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0.05}; transform:translateX(${i <= subStep ? 0 : -50}px); transition:0.4s; background:#111; padding:30px; border-radius:25px; font-size:3rem; font-weight:bold; border-left:15px solid #e74c3c; box-shadow: 10px 10px 30px rgba(0,0,0,0.5);">
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
        else if (s.type === 'spelling-rules') {
            wrapper.innerHTML = `
                <h2 style="font-size:5.5rem; color:#e74c3c; margin-bottom:50px; font-weight:900;">${s.title}</h2>
                <div style="display:grid; grid-template-columns: 1fr; gap:25px;">
                    ${s.rules.map((r, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0.05}; transform:scale(${i <= subStep ? 1 : 0.95}); transition:0.4s; background:#111; padding:40px; border-radius:30px; display:flex; justify-content:space-between; align-items:center; border:2px solid #222; box-shadow: 0 10px 20px rgba(0,0,0,0.3);">
                            <div style="text-align:left;">
                                <div style="font-size:3.5rem; font-weight:900;">${r.word} ➔ <span style="color:#f1c40f">${r.result}</span></div>
                                <div style="color:#666; font-size:2rem; font-weight:bold;">${r.rule}</div>
                            </div>
                            <div style="font-size:4rem;">📝</div>
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
        if (e.keyCode === 39 || e.keyCode === 32 || e.keyCode === 13) { 
            if ((s.type === 'timeline' || s.type === 'reveal-list' || s.type === 'spelling-rules') && subStep < (s.items ? s.items.length - 1 : (s.rules ? s.rules.length - 1 : 1))) subStep++;
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

    render();
})();
