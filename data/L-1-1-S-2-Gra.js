(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- 1. SETTINGS & STYLES ---
    container.innerHTML = ''; 
    container.style.cssText = `
        height:100%; width:100%; overflow:hidden; position:relative; 
        display:flex; align-items:center; justify-content:center; 
        background: radial-gradient(circle, #111 0%, #000 100%);
        font-family: 'Inter', 'Segoe UI', sans-serif; 
        direction:ltr; color:white;
    `;

    let currentSlide = 0;
    let subStep = 0;

    // --- 2. DATA STRUCTURE ---
    const slides = [
        { type: 'big-title', content: 'GRAMMAR MASTER', subtitle: 'POSSESSIVES & VERB TO BE', color: '#c5a059' },

        /* SECTION 1: POSSESSIVES */
        { type: 'big-title', content: 'STEP 1', subtitle: 'POSSESSIVE ADJECTIVES', color: '#3498db' },
        { 
            type: 'reveal-grid', 
            title: 'Possessive Adjectives',
            desc: 'Used BEFORE a noun (My + Car / His + Book)',
            items: ["My car", "His book", "Her bag", "Its tail", "Our house", "Your phone", "Their pens"] 
        },
        {
            type: 'compare-table',
            title: 'Possessive Family',
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
        // 10 MCQ for Possessives
        { 
            type: 'mcq', 
            title: 'Possessives Practice',
            questions: [
                { q: "This is my pen. It is ________.", opts: ["me", "mine", "my"], ans: "mine" },
                { q: "She has a cat. ________ name is Fluffy.", opts: ["Her", "Hers", "She"], ans: "Her" },
                { q: "This house belongs to us. It is ________.", opts: ["our", "ours", "we"], ans: "ours" },
                { q: "He lost ________ key yesterday.", opts: ["him", "his", "he"], ans: "his" },
                { q: "Is this ________ phone? Yes, it's mine.", opts: ["you", "yours", "your"], ans: "your" },
                { q: "They have a car. That car is ________.", opts: ["their", "theirs", "them"], ans: "theirs" },
                { q: "The bird is in ________ nest.", opts: ["its", "it's", "it"], ans: "its" },
                { q: "I like ________ new shirt, Ahmed!", opts: ["your", "yours", "you"], ans: "your" },
                { q: "This bag isn't mine, it is ________ (Sarah's).", opts: ["her", "hers", "she"], ans: "hers" },
                { q: "We love ________ school very much.", opts: ["our", "ours", "us"], ans: "our" }
            ]
        },

        /* SECTION 2: VERB TO BE */
        { type: 'big-title', content: 'STEP 2', subtitle: 'VERB TO BE (AM - IS - ARE)', color: '#c5a059' },
        {
            type: 'compare-table',
            title: 'Verb to Be (Positive)',
            headers: ["Subject", "Verb", "Example"],
            rows: [
                { s: "I", v: "AM", e: "I am a teacher" },
                { s: "He / She / It", v: "IS", e: "He is happy" },
                { s: "We / You / They", v: "ARE", e: "They are students" }
            ]
        },
        { 
            type: 'big-title', content: 'NEGATIVE FORM', 
            subtitle: 'Add <span style="color:#e74c3c;">NOT</span> after Am / Is / Are', color: '#e74c3c' 
        },
        ...[
            {sub: "I am", rest: "a student."},
            {sub: "He is", rest: "very good."},
            {sub: "They are", rest: "busy now."}
        ].map(item => ({ type: 'neg-transform', sub: item.sub, rest: item.rest })),
        { 
            type: 'big-title', content: 'QUESTIONS?', 
            subtitle: '<span style="color:#f1c40f;">SWITCH</span> Subject & Verb', color: '#f1c40f' 
        },
        { type: 'q-transform', v: "Is", s: "She", rest: "a talented artist?" },
        // 10 MCQ for Verb to Be
        { 
            type: 'mcq', 
            title: 'Verb to Be Practice',
            questions: [
                { q: "I ________ very happy today.", opts: ["is", "are", "am"], ans: "am" },
                { q: "They ________ my best friends.", opts: ["are", "am", "is"], ans: "are" },
                { q: "________ she your sister?", opts: ["Are", "Is", "Am"], ans: "Is" },
                { q: "We ________ not at home now.", opts: ["is", "am", "are"], ans: "are" },
                { q: "The dog ________ hungry.", opts: ["is", "are", "am"], ans: "is" },
                { q: "________ you ready for the test?", opts: ["Is", "Am", "Are"], ans: "Are" },
                { q: "It ________ a very hot day.", opts: ["is", "are", "am"], ans: "is" },
                { q: "Ahmed and Ali ________ clever.", opts: ["is", "am", "are"], ans: "are" },
                { q: "I ________ not a doctor.", opts: ["is", "am", "are"], ans: "am" },
                { q: "________ it your book?", opts: ["Is", "Are", "Am"], ans: "Is" }
            ]
        },

        { type: 'big-title', content: 'PERFECT!', subtitle: 'GRAMMAR FOUNDATION COMPLETED', color: '#2ecc71' }
    ];

    // --- 3. RENDER FUNCTION ---
    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:90%; max-width:1300px; text-align:center; animation: vetoFade 0.4s ease;`;

        if (s.type === 'big-title') {
            wrapper.innerHTML = `
                <h1 style="font-size:10vh; font-weight:900; color:${s.color}; margin:0; line-height:1.1; text-transform:uppercase;">${s.content}</h1>
                ${s.subtitle ? `<div style="font-size:4vh; color:#fff; font-weight:bold; margin-top:30px; border-top:8px solid ${s.color}; display:inline-block; padding-top:15px;">${s.subtitle}</div>` : ''}
            `;
        } 
        else if (s.type === 'reveal-grid') {
            wrapper.innerHTML = `
                <h2 style="font-size:6vh; color:#3498db; margin-bottom:10px;">${s.title}</h2>
                <p style="font-size:3vh; color:#888; margin-bottom:40px;">${s.desc}</p>
                <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:20px;">
                    ${s.items.map((item, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0.05}; background:#111; padding:3vh; border-radius:20px; font-size:4vh; font-weight:900; border: 2px solid ${i === subStep ? '#3498db' : '#222'}; transition:0.3s;">
                            ${item}
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'compare-table') {
            wrapper.innerHTML = `
                <h2 style="font-size:6vh; color:#c5a059; margin-bottom:30px;">${s.title}</h2>
                <table style="width:100%; font-size:3.5vh; border-collapse:separate; border-spacing:0 10px;">
                    <tr style="color:#666;">${s.headers.map(h => `<th style="padding:10px;">${h}</th>`).join('')}</tr>
                    ${s.rows.map((r, i) => `
                        <tr style="opacity:${i <= subStep ? 1 : 0.05}; background:rgba(255,255,255,0.03); transition:0.2s;">
                            <td style="padding:2.5vh; border-radius:15px 0 0 15px; font-weight:900;">${r.s}</td>
                            <td style="color:#c5a059; font-weight:900; font-size:5vh;">${r.v}</td>
                            <td style="color:#fff; border-radius:0 15px 15px 0; font-style:italic;">"${r.e}"</td>
                        </tr>
                    `).join('')}
                </table>`;
        }
        else if (s.type === 'neg-transform') {
            wrapper.innerHTML = `
                <div style="font-size:7vh; font-weight:900;">
                    <span>${s.sub}</span> <span style="color:#e74c3c; border:5px solid #e74c3c; padding:0 25px; border-radius:20px; margin:0 15px; opacity:${subStep >= 1 ? 1 : 0.1}; transition:0.4s;">NOT</span> <span>${s.rest}</span>
                </div>`;
        }
        else if (s.type === 'q-transform') {
            let swapped = subStep >= 1;
            wrapper.innerHTML = `
                <div style="font-size:7vh; font-weight:900; display:flex; justify-content:center; align-items:center; gap:50px;">
                    <span style="color:${swapped ? '#f1c40f' : '#fff'}; transform:translateX(${swapped ? '180px' : '0'}); transition:0.6s;">${swapped ? s.s : s.v}</span>
                    <span style="color:${swapped ? '#fff' : '#f1c40f'}; transform:translateX(${swapped ? '-180px' : '0'}); transition:0.6s;">${swapped ? s.v : s.s}</span>
                    <span>${s.rest}</span>
                </div>`;
        }
        else if (s.type === 'mcq') {
            let q = s.questions[subStep] || s.questions[0];
            wrapper.innerHTML = `
                <h2 style="font-size:4vh; color:#c5a059; margin-bottom:3vh;">${s.title} (${subStep + 1}/10)</h2>
                <div style="background:#111; padding:5vh; border-radius:40px; border:4px solid #c5a059; width:100%;">
                    <div id="q-text" style="font-size:6vh; margin-bottom:5vh; font-weight:900;">${q.q}</div>
                    <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:20px;">
                        ${q.opts.map(opt => `
                            <button onclick="window.checkAnsVeto('${opt}', '${q.ans}', this)" 
                                style="padding:3vh; background:#222; border:3px solid #444; color:#fff; border-radius:20px; font-size:4vh; font-weight:900; cursor:pointer; transition:0.2s;">
                                ${opt}
                            </button>
                        `).join('')}
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
    }

    // --- 4. INTERACTION LOGIC ---
    window.checkAnsVeto = function(sel, ans, btn) {
        const qText = document.getElementById('q-text');
        if (sel === ans) {
            btn.style.background = "#2ecc71";
            btn.style.borderColor = "#2ecc71";
            qText.innerHTML = qText.innerHTML.replace("________", `<span style="color:#2ecc71; text-decoration:underline;">${ans}</span>`);
            setTimeout(() => {
                if (subStep < 9) { subStep++; render(); }
                else { currentSlide++; subStep = 0; render(); }
            }, 1000);
        } else {
            btn.style.background = "#e74c3c";
            btn.style.animation = "shake 0.3s";
            setTimeout(() => { btn.style.animation = ""; }, 300);
        }
    };

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if ([13, 32, 39].includes(e.keyCode)) { 
            let max = 0;
            if (s.type === 'reveal-grid') max = s.items.length - 1;
            else if (s.type === 'compare-table') max = s.rows.length - 1;
            else if (s.type === 'neg-transform' || s.type === 'q-transform') max = 1;
            else if (s.type === 'mcq') return; // Must answer

            if (subStep < max) subStep++;
            else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
            else { if (window.triggerVetoDone) window.triggerVetoDone(); }
            render();
        } else if (e.keyCode === 37) { 
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
            render();
        }
    };

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes vetoFade { from { opacity:0; transform:scale(0.98); } to { opacity:1; transform:scale(1); } }
        @keyframes shake { 0%,100%{transform:translateX(0);} 25%{transform:translateX(-10px);} 75%{transform:translateX(10px);} }
    `;
    document.head.appendChild(style);

    render();
})();
