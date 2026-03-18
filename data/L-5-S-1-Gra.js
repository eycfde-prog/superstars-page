(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#02040a; font-family:'Segoe UI', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'PRESENT PERFECT', subtitle: 'THE BRIDGE TENSE', color: '#a855f7', usage: 'Past Action ➔ Present Impact' },
        
        /* 2: Concept */
        { 
            type: 'concept', 
            title: 'Why do we use it?', 
            items: [
                "Actions at an <span style='color:#f1c40f'>Unspecified</span> past time.",
                "Started in the past and <span style='color:#f1c40f'>Continues</span> now.",
                "Personal <span style='color:#f1c40f'>Experiences</span> & life achievements."
            ]
        },

        /* 3: Formula */
        { 
            type: 'writing', 
            title: 'The Structure', 
            content: `
                <div style="background:#0f172a; padding:60px; border-radius:40px; border:5px solid #a855f7; text-align:center; box-shadow: 0 0 70px rgba(168,85,247,0.25);">
                    <span style="color:#fff">Subject + </span>
                    <span style="color:#f1c40f; font-weight:900; font-size:6.5rem;">HAVE / HAS</span>
                    <br>
                    <span style="color:#fff; font-size:4rem;"> + </span>
                    <span style="color:#10b981; font-weight:900; font-size:7.5rem;">P.P (V3)</span>
                </div>
            ` 
        },

        /* 4: Examples */
        { 
            type: 'reveal-list', 
            title: 'Master Examples',
            items: [
                "I have visited London three times.",
                "She has already finished her project.",
                "We have lived here since 2010.",
                "They have just arrived at the station.",
                "He has lost his keys (He can't enter)!"
            ] 
        },

        /* 5: Keywords */
        { 
            type: 'concept', 
            title: 'Time Detectives', 
            items: ["Just / Already / Yet", "Ever / Never", "Since / For", "Recently / Lately", "So far"]
        },

        /* --- Quiz Section (5 Questions) --- */
        { 
            type: 'mcq', 
            question: "1. Choose the correct sentence:",
            options: ["A) She have seen that movie.", "B) She saw that movie yet.", "C) She has seen that movie.", "D) She has saw that movie."],
            answer: 2 
        },
        { 
            type: 'mcq', 
            question: "2. I ___________ my homework already.",
            options: ["A) have finish", "B) has finished", "C) have finished", "D) am finished"],
            answer: 2 
        },
        { 
            type: 'mcq', 
            question: "3. Have you ___________ eaten sushi before?",
            options: ["A) never", "B) ever", "C) yet", "D) just"],
            answer: 1 
        },
        { 
            type: 'mcq', 
            question: "4. They ___________ in this house for ten years.",
            options: ["A) lived", "B) have lived", "C) has lived", "D) are living"],
            answer: 1 
        },
        { 
            type: 'mcq', 
            question: "5. He hasn't called me ___________.",
            options: ["A) already", "B) just", "C) yet", "D) since"],
            answer: 2 
        },
        
        /* 11: Final Title */
        { type: 'title', content: 'BRAVO!', subtitle: 'MISSION ACCOMPLISHED', color: '#10b981', usage: 'YOU ARE NOW A TENSE EXPERT!' }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:90%; max-width:1400px; text-align:center; animation: slideUp 0.4s ease-out;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <div style="font-size:2.2rem; color:#64748b; letter-spacing:15px; margin-bottom:25px; text-transform:uppercase; font-weight:bold;">${s.subtitle}</div>
                <h1 style="font-size:9rem; font-weight:900; color:${s.color}; margin:0; line-height:1; text-shadow: 0 10px 30px rgba(0,0,0,0.5);">${s.content}</h1>
                <div style="font-size:4rem; color:#fff; font-weight:bold; margin-top:50px; border-top:6px solid ${s.color}; display:inline-block; padding-top:20px;">${s.usage}</div>
            `;
        } 
        else if (s.type === 'concept') {
            wrapper.innerHTML = `
                <h2 style="font-size:5.5rem; color:#a855f7; margin-bottom:60px; text-transform:uppercase; font-weight:900;">${s.title}</h2>
                <div style="text-align:left; display:inline-block; width:100%;">
                    ${s.items.map((item, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0}; transform:translateX(${i <= subStep ? 0 : -50}px); transition:0.5s; font-size:3.5rem; margin-bottom:35px; font-weight:700; display:flex; align-items:center; background:#0f172a; padding:30px; border-radius:20px; border-left:15px solid #a855f7;">
                            <span style="color:#f1c40f; margin-right:30px;">★</span> ${item}
                        </div>
                    `).join('')}
                </div>
            `;
        }
        else if (s.type === 'writing') {
            wrapper.innerHTML = `
                <h2 style="font-size:6rem; color:#a855f7; margin-bottom:50px; font-weight:900;">${s.title}</h2>
                <div style="font-size:4.5rem; line-height:1.2;">${s.content}</div>
            `;
        }
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `
                <h2 style="font-size:5.5rem; color:#a855f7; margin-bottom:50px; font-weight:900;">${s.title}</h2>
                <div style="display:flex; flex-direction:column; gap:20px; text-align:left;">
                    ${s.items.map((item, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0.05}; transform:scale(${i <= subStep ? 1 : 0.95}); transition:0.4s; background:#0f172a; padding:35px; border-radius:25px; font-size:3.2rem; font-weight:bold; border-left:20px solid #a855f7; box-shadow: 10px 10px 20px rgba(0,0,0,0.3);">
                            ${item}
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'mcq') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#0f172a; padding:70px; border-radius:50px; border:3px solid #1e293b; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
                    <div style="font-size:4rem; font-weight:900; margin-bottom:50px; color:#fff; line-height:1.2;">${s.question}</div>
                    <div style="display:grid; grid-template-columns: 1fr; gap:25px;">
                        ${s.options.map((opt, i) => {
                            let isCorrect = subStep >= 1 && i === s.answer;
                            let border = isCorrect ? '8px solid #10b981' : '2px solid #334155';
                            let bg = isCorrect ? 'rgba(16,185,129,0.1)' : 'transparent';
                            let color = isCorrect ? '#10b981' : (subStep >= 1 ? '#475569' : '#fff');
                            return `<div style="background:${bg}; border:${border}; padding:30px; border-radius:25px; font-size:3.2rem; font-weight:bold; color:${color}; transition:0.3s;">${opt}</div>`;
                        }).join('')}
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if (e.keyCode === 39 || e.keyCode === 32) { // Next / Space
            if ((s.type === 'concept' || s.type === 'reveal-list') && subStep < s.items.length - 1) subStep++;
            else if (s.type === 'mcq' && subStep < 1) subStep++;
            else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
        } else if (e.keyCode === 37) { // Back
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    render();
})();
