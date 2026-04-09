(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // الإعداد الأساسي للخلفية (مرة واحدة فقط)
    container.innerHTML = ''; 
    container.style.cssText = `
        height:100%; width:100%; overflow:hidden; position:relative; 
        display:flex; align-items:center; justify-content:center; 
        background: radial-gradient(circle, #111 0%, #000 100%);
        font-family: 'Inter', 'Segoe UI', sans-serif; 
        direction:ltr; color:white;
    `;

    let currentSlide = -1; 
    let subStep = 0;

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
            headers: ["Subject", "Adjective", "Pronoun"],
            rows: [
                { s: "I", v: "My", e: "Mine" },
                { s: "He", v: "His", e: "His" },
                { s: "She", v: "Her", e: "Hers" },
                { s: "It", v: "Its", e: "---" },
                { s: "We", v: "Our", e: "Ours" },
                { s: "They", v: "Their", e: "Theirs" },
                { s: "You", v: "Your", e: "Yours" }
            ]
        },
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
                { q: "This bag isn't mine, it is ________.", opts: ["her", "hers", "she"], ans: "hers" },
                { q: "We love ________ school very much.", opts: ["our", "ours", "us"], ans: "our" }
            ]
        },

        /* SECTION 2: VERB TO BE */
        { type: 'big-title', content: 'STEP 2', subtitle: 'VERB TO BE (AM - IS - ARE)', color: '#c5a059' },
        
        {
            type: 'rule-slide',
            title: 'Positive Structure',
            formula: 'SUBJECT + HELPING VERB',
            examples: [
                { full: "I am", short: "I'm" },
                { full: "He is", short: "He's" },
                { full: "You are", short: "You're" }
            ],
            color: '#c5a059'
        },

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
            type: 'rule-slide',
            title: 'Negative Structure',
            formula: 'SUBJECT + VERB BE + <span style="color:#e74c3c">NOT</span>',
            examples: [
                { full: "I'm not", short: "---" },
                { full: "She is not", short: "She's not / She isn't" },
                { full: "We are not", short: "We're not / We aren't" }
            ],
            color: '#e74c3c'
        },

        ...[
            {sub: "I am", rest: "a student."},
            {sub: "He is", rest: "very good."},
            {sub: "They are", rest: "busy now."}
        ].map(item => ({ type: 'neg-transform', sub: item.sub, rest: item.rest })),

        {
            type: 'rule-slide',
            title: 'Question Structure',
            formula: 'HELPING VERB + SUBJECT',
            examples: [
                { full: "Am I...?", short: "---" },
                { full: "Is he...?", short: "---" },
                { full: "Are they...?", short: "---" }
            ],
            color: '#f1c40f'
        },

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

    function updateSubSteps() {
        const s = slides[currentSlide];
        if (!s) return;

        // تحديث العناصر التدريجية (Grids & Tables)
        const revealItems = container.querySelectorAll('.step-item');
        revealItems.forEach((item, i) => {
            if (i <= subStep) {
                item.style.opacity = '1';
                if (item.tagName === 'DIV') item.style.borderColor = '#3498db';
                if (item.tagName === 'TR') item.style.background = 'rgba(255,255,255,0.08)';
            } else {
                item.style.opacity = '0.05';
                if (item.tagName === 'DIV') item.style.borderColor = '#222';
                if (item.tagName === 'TR') item.style.background = 'transparent';
            }
        });

        // تحديث النفي (Negative Transform)
        const notTag = container.querySelector('.not-badge');
        if (notTag) {
            notTag.style.opacity = (subStep >= 1) ? '1' : '0.1';
        }
    }

    function renderSlide(index) {
        if (index === currentSlide) return;
        currentSlide = index;
        subStep = 0;
        container.innerHTML = '';
        
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.className = 'slide-wrapper';
        wrapper.style.cssText = `width:90%; max-width:1300px; text-align:center; animation: vetoFade 0.4s ease;`;

        if (s.type === 'big-title') {
            wrapper.innerHTML = `
                <h1 style="font-size:10vh; font-weight:900; color:${s.color}; margin:0; line-height:1.1;">${s.content}</h1>
                ${s.subtitle ? `<div style="font-size:4.5vh; color:#fff; font-weight:bold; margin-top:30px; border-top:8px solid ${s.color}; display:inline-block; padding-top:15px;">${s.subtitle}</div>` : ''}
            `;
        } 
        else if (s.type === 'rule-slide') {
            wrapper.innerHTML = `
                <h2 style="font-size:5vh; color:${s.color}; text-transform:uppercase; margin-bottom:2vh;">${s.title}</h2>
                <div style="background:rgba(255,255,255,0.05); padding:4vh; border-radius:30px; border-left:15px solid ${s.color}; margin-bottom:4vh;">
                    <div style="font-size:7vh; font-weight:900; color:#fff;">${s.formula}</div>
                </div>
                <div style="display:flex; flex-direction:column; gap:2vh;">
                    ${s.examples.map((ex, i) => `
                        <div class="step-item" style="font-size:4.5vh; display:flex; justify-content:center; gap:40px; transition:0.3s; opacity:0;">
                            <span style="color:#888;">${ex.full}</span>
                            <span style="color:${s.color}; font-weight:900;">➔</span>
                            <span style="color:#fff; font-weight:900;">${ex.short}</span>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'reveal-grid') {
            wrapper.innerHTML = `
                <h2 style="font-size:6vh; color:#3498db; margin-bottom:10px;">${s.title}</h2>
                <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:20px; margin-top:40px;">
                    ${s.items.map((item, i) => `
                        <div class="step-item" style="background:#111; padding:3vh; border-radius:20px; font-size:3.5vh; font-weight:900; border: 2px solid #222; transition:0.3s; opacity:0.05;">
                            ${item}
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'compare-table') {
            wrapper.innerHTML = `
                <h2 style="font-size:6vh; color:#c5a059; margin-bottom:3vh;">${s.title}</h2>
                <div style="width:100%;">
                    <table style="width:100%; font-size:4vh; border-collapse:separate; border-spacing:0 1vh; table-layout: fixed;">
                        <thead>
                            <tr style="color:#666; font-size:3vh;">
                                ${s.headers.map(h => `<th style="padding:1vh; text-align:center;">${h}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${s.rows.map((r, i) => `
                                <tr class="step-item" style="transition:0.2s; opacity:0.05;">
                                    <td style="padding:2vh; border-radius:20px 0 0 20px; font-weight:900; color:#fff; text-align:center;">${r.s}</td>
                                    <td style="color:#c5a059; font-weight:900; font-size:5vh; text-align:center;">${r.v}</td>
                                    <td style="color:#fff; border-radius:0 20px 20px 0; font-weight:900; opacity:0.9; text-align:center;">${r.e}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>`;
        }
        else if (s.type === 'neg-transform') {
            wrapper.innerHTML = `
                <div style="font-size:8vh; font-weight:900;">
                    <span>${s.sub}</span> 
                    <span class="not-badge" style="color:#e74c3c; border:6px solid #e74c3c; padding:0 25px; border-radius:20px; margin:0 15px; transition:0.4s; opacity:0.1;">NOT</span> 
                    <span>${s.rest}</span>
                </div>`;
        }
        else if (s.type === 'mcq') {
            renderMCQContent(wrapper, s);
        }

        container.appendChild(wrapper);
        updateSubSteps();
    }

    function renderMCQContent(parent, s) {
        let q = s.questions[subStep];
        parent.innerHTML = `
            <h2 style="font-size:4vh; color:#c5a059; margin-bottom:3vh;">${s.title} (${subStep + 1}/10)</h2>
            <div style="background:#111; padding:5vh; border-radius:40px; border:4px solid #c5a059;">
                <div id="q-text" style="font-size:7vh; margin-bottom:5vh; font-weight:900;">${q.q}</div>
                <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:20px;">
                    ${q.opts.map(opt => `
                        <button onclick="window.checkAnsVeto('${opt}', '${q.ans}', this)" 
                            style="padding:3vh; background:#222; border:3px solid #444; color:#fff; border-radius:20px; font-size:4.5vh; font-weight:900; cursor:pointer; transition:0.2s;">
                            ${opt}
                        </button>
                    `).join('')}
                </div>
            </div>`;
    }

    window.checkAnsVeto = function(sel, ans, btn) {
        const qText = document.getElementById('q-text');
        if (sel === ans) {
            btn.style.background = "#2ecc71";
            btn.style.borderColor = "#2ecc71";
            qText.innerHTML = qText.innerHTML.replace("________", `<span style="color:#2ecc71; text-decoration:underline;">${ans}</span>`);
            setTimeout(() => {
                const s = slides[currentSlide];
                if (subStep < 9) { 
                    subStep++; 
                    renderMCQContent(container.querySelector('.slide-wrapper'), s); 
                }
                else { renderSlide(currentSlide + 1); }
            }, 1000);
        } else {
            btn.style.background = "#e74c3c";
            btn.style.animation = "vetoShake 0.3s";
            setTimeout(() => { btn.style.animation = ""; }, 300);
        }
    };

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if ([13, 32, 39].includes(e.keyCode)) { // Next
            let max = 0;
            if (s.type === 'reveal-grid') max = s.items.length - 1;
            else if (s.type === 'compare-table') max = s.rows.length - 1;
            else if (s.type === 'rule-slide') max = s.examples.length - 1;
            else if (s.type === 'neg-transform') max = 1;
            else if (s.type === 'mcq') return;

            if (subStep < max) { subStep++; updateSubSteps(); }
            else if (currentSlide < slides.length - 1) { renderSlide(currentSlide + 1); }
            else { if (window.triggerVetoDone) window.triggerVetoDone(); }
        } else if (e.keyCode === 37) { // Back
            if (subStep > 0) { subStep--; updateSubSteps(); }
            else if (currentSlide > 0) { renderSlide(currentSlide - 1); }
        }
    };

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes vetoFade { from { opacity:0; transform:scale(0.98); } to { opacity:1; transform:scale(1); } }
        @keyframes vetoShake { 0%,100%{transform:translateX(0);} 25%{transform:translateX(-10px);} 75%{transform:translateX(10px);} }
    `;
    document.head.appendChild(style);

    renderSlide(0);
})();
