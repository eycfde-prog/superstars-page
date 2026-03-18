(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#050505; font-family:'Segoe UI', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Intro */
        { type: 'big-title', content: 'GRAMMAR MASTER', subtitle: 'PRONOUNS & VERB TO BE', color: '#c5a059' },

        /* 2: Subject Pronouns Table */
        { 
            type: 'pronoun-table', 
            title: 'Step 1: Subject Pronouns',
            items: [
                { p: "I", d: "Speaking about myself" },
                { p: "He / She / It", d: "Singular (One)" },
                { p: "We / You / They", d: "Plural (Many)" }
            ] 
        },

        /* 3: Linking Pronouns to Verb to Be */
        {
            type: 'compare-table',
            title: 'Step 2: Verb to Be (Positive)',
            headers: ["Subject", "Verb to Be", "Example"],
            rows: [
                { s: "I", v: "AM", e: "I am a teacher" },
                { s: "He / She / It", v: "IS", e: "He is happy" },
                { s: "We / You / They", v: "ARE", e: "They are students" }
            ]
        },

        /* 4: Negative Rule */
        { 
            type: 'big-title', 
            content: 'Negative Form', 
            subtitle: 'Add <span style="color:#e74c3c;">NOT</span> after Am / Is / Are', 
            color: '#e74c3c' 
        },

        /* 5: Negative Transform Examples */
        ...[
            {sub: "I am", rest: "a student."},
            {sub: "He is", rest: "very good."},
            {sub: "They are", rest: "busy now."}
        ].map(item => ({ type: 'neg-transform', sub: item.sub, rest: item.rest })),

        /* 6: Question Rule */
        { 
            type: 'big-title', 
            content: 'Questions?', 
            subtitle: '<span style="color:#f1c40f;">Switch</span> Subject & Verb', 
            color: '#f1c40f' 
        },

        /* 7: Question Transform Example */
        { type: 'q-transform', v: "Is", s: "She", rest: "a talented artist?" },

        /* 8: Possessives Intro */
        { type: 'big-title', content: 'Step 3: Possessives', subtitle: 'Who owns what?', color: '#3498db' },

        /* 9: Possessive Adjectives Grid */
        { 
            type: 'reveal-grid', 
            title: 'Possessive Adjectives',
            desc: 'Must have a NOUN after them (My + Car)',
            items: ["My car", "His book", "Her bag", "Its tail", "Our house", "Your phone", "Their pens"] 
        },

        /* 10: Full Comparison Table */
        {
            type: 'compare-table',
            title: 'The Full Family',
            headers: ["Subject", "Adjective (+Noun)", "Pronoun (Alone)"],
            rows: [
                { s: "I", v: "My", e: "Mine" },
                { s: "He", v: "His", e: "His" },
                { s: "She", v: "Her", e: "Hers" },
                { s: "We", v: "Our", e: "Ours" },
                { s: "They", v: "Their", e: "Theirs" },
                { s: "You", v: "Your", e: "Yours" }
            ]
        },

        /* 11: Final Practice MCQ */
        { 
            type: 'mcq', 
            question: "This is my pen. It is ________.",
            options: ["my", "mine", "I", "me"],
            answer: 1 
        },

        /* 12: End */
        { type: 'big-title', content: 'WELL DONE!', subtitle: 'Grammar Foundation: Completed', color: '#2ecc71' }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:95%; max-width:1400px; text-align:center; animation: vetoQuickFade 0.2s ease;`;

        if (s.type === 'big-title') {
            wrapper.innerHTML = `
                <h1 style="font-size:8vw; font-weight:900; color:${s.color}; margin:0; line-height:1;">${s.content}</h1>
                ${s.subtitle ? `<div style="font-size:3vw; color:#fff; font-weight:bold; margin-top:20px; border-top:8px solid ${s.color}; display:inline-block; padding-top:10px;">${s.subtitle}</div>` : ''}
            `;
        } 
        else if (s.type === 'pronoun-table') {
            wrapper.innerHTML = `
                <h2 style="font-size:4rem; color:#c5a059; margin-bottom:40px;">${s.title}</h2>
                <div style="display:flex; flex-direction:column; gap:20px; max-width:900px; margin:auto;">
                    ${s.items.map((item, i) => `
                        <div style="background:#111; padding:30px; border-radius:20px; display:flex; align-items:center; border-left:15px solid #c5a059; opacity:${i <= subStep ? 1 : 0.05}; transition:0.2s;">
                            <span style="font-size:4rem; font-weight:900; width:300px; text-align:left;">${item.p}</span>
                            <span style="font-size:2rem; color:#666;">➞ ${item.d}</span>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'compare-table') {
            wrapper.innerHTML = `
                <h2 style="font-size:4rem; color:${s.title.includes('Verb') ? '#c5a059' : '#3498db'}; margin-bottom:30px;">${s.title}</h2>
                <table style="width:100%; font-size:2.5rem; border-collapse:separate; border-spacing:0 15px;">
                    <tr style="color:#888;">${s.headers.map(h => `<th style="padding:10px;">${h}</th>`).join('')}</tr>
                    ${s.rows.map((r, i) => `
                        <tr style="opacity:${i <= subStep ? 1 : 0.05}; background:rgba(255,255,255,0.03); transition:0.1s;">
                            <td style="padding:25px; border-radius:20px 0 0 20px; font-weight:900;">${r.s}</td>
                            <td style="color:#c5a059; font-weight:900; font-size:3.5rem;">${r.v}</td>
                            <td style="color:#fff; border-radius:0 20px 20px 0; font-style:italic;">"${r.e}"</td>
                        </tr>
                    `).join('')}
                </table>`;
        }
        else if (s.type === 'neg-transform') {
            wrapper.innerHTML = `
                <div style="font-size:5rem; font-weight:900;">
                    <span>${s.sub}</span> <span style="color:#e74c3c; border:4px solid #e74c3c; padding:0 20px; border-radius:15px; margin:0 10px; opacity:${subStep >= 1 ? 1 : 0.1}; transition:0.3s;">NOT</span> <span>${s.rest}</span>
                </div>`;
        }
        else if (s.type === 'q-transform') {
            let swapped = subStep >= 1;
            wrapper.innerHTML = `
                <div style="font-size:5rem; font-weight:900; display:flex; justify-content:center; align-items:center; gap:40px;">
                    <span style="color:${swapped ? '#f1c40f' : '#fff'}; transform:translateX(${swapped ? '150px' : '0'}); transition:0.5s;">${swapped ? s.s : s.v}</span>
                    <span style="color:${swapped ? '#fff' : '#f1c40f'}; transform:translateX(${swapped ? '-150px' : '0'}); transition:0.5s;">${swapped ? s.v : s.s}</span>
                    <span>${s.rest}</span>
                </div>`;
        }
        else if (s.type === 'reveal-grid') {
            wrapper.innerHTML = `
                <h2 style="font-size:4rem; color:#3498db; margin-bottom:10px;">${s.title}</h2>
                <p style="font-size:2rem; color:#555; margin-bottom:40px;">${s.desc}</p>
                <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:20px;">
                    ${s.items.map((item, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0.05}; background:#111; padding:30px; border-radius:20px; font-size:2.5rem; font-weight:900; border: 2px solid ${i === subStep ? '#3498db' : '#222'}; transition:0.1s;">
                            ${item}
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'mcq') {
            wrapper.innerHTML = `
                <div style="background:#111; padding:60px; border-radius:40px; border:4px solid #c5a059; max-width:1000px; margin:auto;">
                    <div style="font-size:4rem; margin-bottom:50px; font-weight:900;">${s.question}</div>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:25px;">
                        ${s.options.map((opt, i) => `
                            <div style="padding:30px; background:#222; border-radius:20px; font-size:2.5rem; font-weight:900; border:4px solid ${subStep >= 1 && i === s.answer ? '#2ecc71' : '#333'}; color:${subStep >= 1 && i === s.answer ? '#2ecc71' : '#fff'}">
                                ${opt}
                            </div>
                        `).join('')}
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if ([13, 32, 39].includes(e.keyCode)) { 
            let maxSteps = 0;
            if (s.items) maxSteps = s.items.length - 1;
            else if (s.rows) maxSteps = s.rows.length - 1;
            else if (s.type === 'neg-transform' || s.type === 'q-transform' || s.type === 'mcq') maxSteps = 1;

            if (subStep < maxSteps) subStep++;
            else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
            else { if (window.triggerVetoDone) window.triggerVetoDone(); }
        } else if (e.keyCode === 37) { 
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    const style = document.createElement('style');
    style.innerHTML = `@keyframes vetoQuickFade { from { opacity:0; } to { opacity:1; } }`;
    document.head.appendChild(style);

    render();
})();
