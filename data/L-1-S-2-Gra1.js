(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:calc(100vh - 200px); overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#0f0f0f; font-family:'Poppins', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'big-title', content: 'Possessive Adjectives & Pronouns', color: '#f1c40f' },

        /* 2: Possessive Adjectives (From Source) */
        { 
            type: 'definitions', 
            title: 'Possessive Adjectives [cite: 59]',
            desc: 'Must be followed by a NOUN (يتبعها اسم)',
            items: [
                { p: "My", d: "My car [cite: 67]" },
                { p: "His", d: "His book [cite: 68]" },
                { p: "Her", d: "Her bag [cite: 69]" },
                { p: "Its", d: "Its tail " },
                { p: "Our", d: "Our house [cite: 71]" },
                { p: "Their", d: "Their pens [cite: 72]" },
                { p: "Your", d: "Your phone [cite: 73]" }
            ] 
        },

        /* 3: Comparison Table (Adjective vs Pronoun) */
        {
            type: 'compare-table',
            title: 'The Full Family',
            headers: ["Subject", "Adj (+ Noun)", "Pronoun (Alone)"],
            rows: [
                { s: "I", a: "My", p: "Mine" },
                { s: "He", a: "His", p: "His" },
                { s: "She", a: "Her", p: "Hers" },
                { s: "It", a: "Its", p: "-" },
                { s: "We", a: "Our", p: "Ours" },
                { s: "They", a: "Their", p: "Theirs" },
                { s: "You", a: "Your", p: "Yours" }
            ]
        },

        /* 4: The "Noun" Rule Animation */
        {
            type: 'rule-anim',
            title: 'Spot the Difference!',
            examples: [
                { left: "This is <span style='color:#f1c40f;'>my</span> book.", right: "This book is <span style='color:#e74c3c;'>mine</span>." },
                { left: "That is <span style='color:#f1c40f;'>her</span> car.", right: "That car is <span style='color:#e74c3c;'>hers</span>." },
                { left: "These are <span style='color:#f1c40f;'>our</span> bags.", right: "These bags are <span style='color:#e74c3c;'>ours</span>." }
            ]
        },

        /* 5: Exercise (Based on source logic) */
        { 
            type: 'fill-practice', 
            title: 'Practice: Possessives',
            items: [
                { q: "I have a cat. ____ tail is long.", a: "Its" },
                { q: "This is my pen. It is ____.", a: "mine" },
                { q: "They have a house. It is ____ house.", a: "their" },
                { q: "We won! The trophy is ____.", a: "ours" },
                { q: "Give ____ my car. (you)", a: "your" }
            ] 
        },

        /* 6: Final Challenge */
        { 
            type: 'mcq-final', 
            question: "Is this your phone? No, it's ________.",
            options: ["A) her", "B) hers", "C) she"],
            answer: 1 
        }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:95%; text-align:center;`;

        if (s.type === 'big-title') {
            wrapper.innerHTML = `<h1 style="font-size:8rem; font-weight:900; color:${s.color}; line-height:1.1;">${s.content}</h1>`;
        } 
        else if (s.type === 'definitions') {
            wrapper.innerHTML = `
                <h2 style="font-size:3.5rem; color:#f1c40f; margin-bottom:10px;">${s.title}</h2>
                <p style="font-size:1.8rem; color:#888; margin-bottom:30px;">${s.desc}</p>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px; text-align:left;">
                    ${s.items.map((item, i) => `
                        <div style="background:#1e1e1e; padding:15px; border-radius:10px; opacity:${i <= subStep ? 1 : 0}; transition:0.3s; border-right:5px solid #f1c40f;">
                            <b style="color:#f1c40f; font-size:2.5rem;">${item.p}:</b> <span style="font-size:2rem;">${item.d}</span>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'compare-table') {
            wrapper.innerHTML = `
                <h2 style="font-size:3.5rem; color:#3498db; margin-bottom:30px;">${s.title}</h2>
                <table style="width:100%; border-collapse:collapse; font-size:2rem;">
                    <tr style="color:#3498db; border-bottom:2px solid #444;">
                        ${s.headers.map(h => `<th style="padding:15px;">${h}</th>`).join('')}
                    </tr>
                    ${s.rows.map((r, i) => `
                        <tr style="opacity:${i <= subStep ? 1 : 0}; transition:0.3s; border-bottom:1px solid #222;">
                            <td style="padding:10px;">${r.s}</td>
                            <td style="padding:10px; color:#f1c40f;">${r.a}</td>
                            <td style="padding:10px; color:#e74c3c;">${r.p}</td>
                        </tr>
                    `).join('')}
                </table>`;
        }
        else if (s.type === 'rule-anim') {
            let pair = s.examples[subStep] || s.examples[0];
            wrapper.innerHTML = `
                <h2 style="font-size:3.5rem; color:#e74c3c; margin-bottom:50px;">${s.title}</h2>
                <div style="display:flex; justify-content:space-around; align-items:center; gap:30px;">
                    <div style="background:#1e1e1e; padding:40px; border-radius:20px; font-size:3rem; flex:1;">${pair.left}</div>
                    <div style="font-size:4rem; color:#f1c40f;">➞</div>
                    <div style="background:#1e1e1e; padding:40px; border-radius:20px; font-size:3rem; flex:1; border:2px dashed #e74c3c;">${pair.right}</div>
                </div>`;
        }
        else if (s.type === 'fill-practice') {
            wrapper.innerHTML = `
                <h2 style="font-size:3.5rem; color:#2ecc71; margin-bottom:40px;">${s.title}</h2>
                <div style="text-align:left; display:flex; flex-direction:column; gap:25px;">
                    ${s.items.map((item, i) => `
                        <div style="font-size:2.5rem; opacity:${i <= subStep ? 1 : 0};">
                            ${item.q} <span style="color:#2ecc71; font-weight:bold; visibility:${subStep > i ? 'visible' : 'hidden'}">➞ ${item.a}</span>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'mcq-final') {
            wrapper.innerHTML = `
                <div style="background:#1e1e1e; padding:50px; border-radius:30px; border:2px solid #f1c40f;">
                    <div style="font-size:4rem; margin-bottom:40px;">${s.question}</div>
                    <div style="display:flex; gap:30px; justify-content:center;">
                        ${s.options.map((opt, i) => `
                            <div style="padding:20px 50px; background:#2c3e50; border-radius:15px; font-size:2.5rem; border:4px solid ${subStep >= 1 && i === 1 ? '#2ecc71' : 'transparent'}">${opt}</div>
                        `).join('')}
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if (e.keyCode === 39 || e.keyCode === 13 || e.keyCode === 32) { // Next
            if (s.type === 'definitions' && subStep < s.items.length - 1) subStep++;
            else if (s.type === 'compare-table' && subStep < s.rows.length - 1) subStep++;
            else if (s.type === 'rule-anim' && subStep < s.examples.length - 1) subStep++;
            else if (s.type === 'fill-practice' && subStep < (s.items.length * 2) - 1) subStep++;
            else if (s.type === 'mcq-final' && subStep < 1) subStep++;
            else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
        } else if (e.keyCode === 37) { // Back
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    render();
})();