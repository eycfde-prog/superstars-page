(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#0a0a0c; font-family:'Segoe UI', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        { type: 'title', content: 'PRESENT PERFECT', subtitle: 'SIMPLE TENSE', color: '#3498db', usage: 'Past Action + Present Result' },
        
        { 
            type: 'timeline', 
            title: 'When do we use it?', 
            content: 'An action happened in the <span style="color:#e74c3c">PAST</span> but has a clear result <span style="color:#2ecc71">NOW</span>.' 
        },

        { 
            type: 'writing', 
            title: 'The Formula', 
            content: `
                <div style="background:#111; padding:50px; border-radius:30px; border:4px solid #3498db; text-align:center; box-shadow: 0 0 50px rgba(52,152,219,0.2);">
                    <span style="color:#fff">Subject + </span>
                    <span style="color:#f1c40f; font-weight:900; font-size:6rem;">HAVE / HAS</span>
                    <br>
                    <span style="color:#fff; font-size:4rem;"> + </span>
                    <span style="color:#3498db; font-weight:900; font-size:7rem;">V3 (P.P)</span>
                </div>
            ` 
        },

        { 
            type: 'reveal-list', 
            title: 'Real-life Examples',
            items: [
                "I have seen this movie many times.",
                "He has already finished his work.",
                "She has lived in Cairo since 2010.",
                "It has stopped raining (Look! wet ground)."
            ] 
        },

        { 
            type: 'transform', 
            title: 'Negatives',
            pairs: [
                { pos: "He has finished...", neg: "He <span style='color:#e74c3c;'>has NOT (hasn't)</span> finished..." },
                { pos: "They have gone...", neg: "They <span style='color:#e74c3c;'>have NOT (haven't)</span> gone..." }
            ]
        },

        { 
            type: 'transform', 
            title: 'Questions',
            pairs: [
                { pos: "You have eaten...", neg: "<span style='color:#f1c40f;'>HAVE you</span> eaten...?" },
                { pos: "She has cleaned...", neg: "<span style='color:#f1c40f;'>HAS she</span> cleaned...?" }
            ]
        },

        { 
            type: 'writing', 
            title: 'Spelling Mastery', 
            content: `
                <div style="display:grid; grid-template-columns:1fr; gap:25px; font-size:3.5rem; text-align:left; font-weight:bold;">
                    <div style="color:#f1c40f;">Like ➔ Liked <small style="color:#fff">(add -d)</small></div>
                    <div style="color:#f1c40f;">Study ➔ Studied <small style="color:#fff">(y ➔ ied)</small></div>
                    <div style="color:#f1c40f;">Stop ➔ Stopped <small style="color:#fff">(Double P)</small></div>
                </div>
            ` 
        },

        { 
            type: 'reveal-list', 
            title: 'Time Detectives',
            items: ["Already / Just / Yet", "Ever / Never", "Since / For", "Recently / Lately", "So far"] 
        },

        /* --- Quiz Section (5 Questions) --- */
        { 
            type: 'mcq', 
            question: "1. Choose the correct sentence:",
            options: ["A) I have see that lion.", "B) I have saw that lion.", "C) I have seen that lion.", "D) I has seen that lion."],
            answer: 2 
        },
        { 
            type: 'mcq', 
            question: "2. Have you _________ been to London?",
            options: ["A) never", "B) ever", "C) yet", "D) just"],
            answer: 1 
        },
        { 
            type: 'mcq', 
            question: "3. She _________ her keys. She can't enter the house now.",
            options: ["A) has lost", "B) have lost", "C) lost", "D) is losing"],
            answer: 0 
        },
        { 
            type: 'mcq', 
            question: "4. They haven't arrived _________.",
            options: ["A) already", "B) just", "C) yet", "D) since"],
            answer: 2 
        },
        { 
            type: 'mcq', 
            question: "5. I have known him _________ a long time.",
            options: ["A) since", "B) for", "C) ago", "D) just"],
            answer: 1 
        },
        
        { type: 'title', content: 'SUPERB!', subtitle: 'LESSON DONE', color: '#c5a059', usage: 'STAY AWESOME, CHAMPION!' }
    ];

    window.nextSlide = function() {
        const s = slides[currentSlide];
        if (s.type === 'timeline' && subStep < 1) subStep++;
        else if (s.type === 'reveal-list' && subStep < s.items.length - 1) subStep++;
        else if (s.type === 'transform' && subStep < (s.pairs.length * 2) - 1) subStep++;
        else if (s.type === 'mcq' && subStep < 2) subStep++;
        else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
        render();
    };

    window.prevSlide = function() {
        if (subStep > 0) subStep--;
        else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        render();
    };

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:90%; max-width:1350px; text-align:center; transition: 0.4s;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <div style="font-size:2rem; color:#888; letter-spacing:15px; margin-bottom:20px; text-transform:uppercase;">${s.subtitle}</div>
                <h1 style="font-size:8.5rem; font-weight:900; color:${s.color}; margin:0; line-height:1;">${s.content}</h1>
                <div style="font-size:3.8rem; color:#fff; font-weight:bold; margin-top:40px; border-top:5px solid ${s.color}; display:inline-block; padding-top:20px;">${s.usage}</div>
            `;
        } 
        else if (s.type === 'timeline') {
            wrapper.innerHTML = `
                <h2 style="font-size:5.5rem; color:#3498db; margin-bottom:40px;">${s.title}</h2>
                <p style="font-size:3.8rem; margin-bottom:100px;">${s.content}</p>
                <div style="position:relative; width:90%; margin:100px auto; height:12px; background:#222; border-radius:10px;">
                    <div style="position:absolute; left:15%; height:50px; width:5px; background:#e74c3c; top:-19px;"><span style="position:absolute; top:60px; left:-25px; color:#e74c3c; font-size:1.8rem; font-weight:bold;">Past</span></div>
                    <div style="position:absolute; right:15%; height:50px; width:8px; background:#2ecc71; top:-19px;"><span style="position:absolute; top:60px; left:-50px; color:#2ecc71; font-size:2rem; font-weight:900;">NOW (Result)</span></div>
                    <div style="position:absolute; left:15%; width:70%; height:20px; background:linear-gradient(90deg, #3498db, #2ecc71); top:-4px; border-radius:10px; opacity:${subStep >= 1 ? 1 : 0}; transition:1.2s; box-shadow: 0 0 30px rgba(52,152,219,0.5);"></div>
                </div>`;
        }
        else if (s.type === 'writing') {
            wrapper.innerHTML = `
                <h2 style="font-size:6rem; color:#3498db; margin-bottom:40px; text-transform:uppercase;">${s.title}</h2>
                <div style="font-size:4.5rem; line-height:1.4; color:#fff;">${s.content}</div>`;
        }
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `
                <h2 style="font-size:5rem; color:#3498db; margin-bottom:50px;">${s.title}</h2>
                <div style="display:flex; flex-direction:column; gap:25px; text-align:left;">
                    ${s.items.map((item, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0.05}; transform:translateX(${i <= subStep ? 0 : 50}px); transition:0.4s; background:#111; padding:35px; border-radius:20px; font-size:3.2rem; font-weight:bold; border-left:18px solid #3498db;">${item}</div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'transform') {
            let pair = s.pairs[Math.floor(subStep/2)] || s.pairs[0];
            let isChanged = subStep % 2 !== 0;
            wrapper.innerHTML = `
                <h2 style="font-size:5.5rem; color:#3498db; margin-bottom:60px;">${s.title}</h2>
                <div style="background:#111; padding:80px; border-radius:50px; font-size:4.8rem; border:4px solid #333; color:${isChanged ? '#f1c40f' : '#fff'}; transition: 0.3s; font-weight:bold;">
                    ${isChanged ? pair.neg : pair.pos}
                </div>`;
        }
        else if (s.type === 'mcq') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#111; padding:60px; border-radius:40px; border:2px solid #333;">
                    <div style="font-size:3.5rem; font-weight:900; color:#fff; margin-bottom:50px; line-height:1.2;">${s.question}</div>
                    <div style="display:grid; grid-template-columns: 1fr; gap:20px; opacity:${subStep >= 1 ? 1 : 0.15}; transition:0.5s;">
                        ${s.options.map((opt, i) => {
                            let color = (subStep >= 2 && i === s.answer) ? '#2ecc71' : (subStep >= 2 ? '#444' : '#fff');
                            let border = (subStep >= 2 && i === s.answer) ? '6px solid #2ecc71' : '2px solid #333';
                            return `<div style="padding:30px; border-radius:20px; font-size:3rem; font-weight:bold; border:${border}; color:${color}; transition:0.3s;">${opt}</div>`;
                        }).join('')}
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
    }

    render();
})();
