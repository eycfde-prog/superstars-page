(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#020617; font-family:'Inter', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'PRESENT PERFECT', sub: 'The Connection: Past & Present', color: '#8b5cf6' },
        
        /* 2: The Concept */
        { 
            type: 'concept', 
            title: 'Why do we use it?', 
            items: [
                "Actions that happened at an <span style='color:#f1c40f'>unspecified</span> time.",
                "Actions that started in the past and <span style='color:#f1c40f'>continue</span> now.",
                "Life experiences (Things we have done)."
            ]
        },

        /* 3: Formula */
        { 
            type: 'writing', 
            title: 'The Structure', 
            content: `
                <div style="background:#1e1b4b; padding:40px; border-radius:25px; border:3px solid #8b5cf6; text-align:center;">
                    <span style="color:#fff">Subject + </span>
                    <span style="color:#f1c40f">Have / Has</span>
                    <span style="color:#fff"> + </span>
                    <span style="color:#10b981">P.P (V3)</span>
                </div>
                <div style="margin-top:30px; font-size:1.5rem; color:#94a3b8">
                    I / You / We / They ➔ <span style="color:#f1c40f">Have</span><br>
                    He / She / It ➔ <span style="color:#f1c40f">Has</span>
                </div>
            ` 
        },

        /* 4: Examples */
        { 
            type: 'reveal-list', 
            title: 'Examples in Action',
            items: [
                "I have visited London three times.",
                "She has already finished her project.",
                "We have lived here since 2010.",
                "They have just arrived at the station.",
                "He has lost his keys again!"
            ] 
        },

        /* 5: Keywords */
        { 
            type: 'concept', 
            title: 'Signal Words', 
            items: ["Just", "Already", "Yet", "Ever", "Never", "Since", "For"]
        },

        /* 6: Mini Quiz */
        { 
            type: 'mcq', 
            question: "Choose the correct sentence:",
            options: [
                "A) She have seen that movie.",
                "B) She saw that movie yet.",
                "C) She has seen that movie.",
                "D) She has saw that movie."
            ],
            answer: 2 
        }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:85%; text-align:center; animation: fadeIn 0.5s ease-out;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <h1 style="font-size:6.5rem; font-weight:900; color:${s.color}; margin:0; line-height:1;">${s.content}</h1>
                <p style="font-size:1.8rem; letter-spacing:8px; color:#475569; font-weight:700; margin-top:30px; text-transform:uppercase;">${s.sub}</p>
            `;
        } 
        else if (s.type === 'concept') {
            wrapper.innerHTML = `
                <h2 style="font-size:3.5rem; color:#8b5cf6; margin-bottom:50px; text-transform:uppercase;">${s.title}</h2>
                <div style="text-align:left; display:inline-block;">
                    ${s.items.map((item, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0}; transform:translateX(${i <= subStep ? 0 : -30}px); transition:0.5s; font-size:2.2rem; margin-bottom:25px; font-weight:600; display:flex; align-items:center;">
                            <span style="color:#8b5cf6; margin-right:20px;">⚡</span> ${item}
                        </div>
                    `).join('')}
                </div>
            `;
        }
        else if (s.type === 'writing') {
            wrapper.innerHTML = `
                <h2 style="font-size:3.5rem; color:#8b5cf6; margin-bottom:40px;">${s.title}</h2>
                <div style="font-size:3rem; line-height:1.2;">${s.content}</div>
            `;
        }
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `
                <h2 style="font-size:3.5rem; color:#8b5cf6; margin-bottom:40px;">${s.title}</h2>
                <div style="display:flex; flex-direction:column; gap:15px; text-align:left;">
                    ${s.items.map((item, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0.05}; transition:0.3s; background:#1e1b4b; padding:25px; border-radius:15px; font-size:2rem; font-weight:bold; border-left:10px solid #8b5cf6;">
                            ${item}
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'mcq') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#0f172a; padding:50px; border-radius:30px; border:2px solid #1e293b;">
                    <div style="font-size:2.8rem; font-weight:900; margin-bottom:40px; color:#fff;">${s.question}</div>
                    <div style="display:grid; grid-template-columns: 1fr; gap:20px;">
                        ${s.options.map((opt, i) => {
                            let border = (subStep >= 1 && i === s.answer) ? '3px solid #10b981' : '1px solid #334155';
                            let bg = (subStep >= 1 && i === s.answer) ? '#064e3b' : 'transparent';
                            return `<div style="background:${bg}; border:${border}; padding:25px; border-radius:15px; font-size:2.2rem; transition:0.3s;">${opt}</div>`;
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
            else { if(window.triggerVetoDone) window.triggerVetoDone(); }
        } else if (e.keyCode === 37) { // Back
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    render();
})();
