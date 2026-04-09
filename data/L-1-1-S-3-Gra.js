(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#050505; font-family:'Segoe UI', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'ARTICLES', subtitle: 'A / AN / THE', color: '#c5a059' },

        /* 2: The Main Comparison */
        { 
            type: 'dual-boxes', 
            left: { title: 'Definite', content: 'THE', desc: 'Specific things' },
            right: { title: 'Indefinite', content: 'A / AN', desc: 'Non-specific (Singular)' }
        },

        /* 3: BIG RULE SLIDE 1 */
        {
            type: 'big-rule',
            title: 'THE GOLDEN RULE',
            formula: 'A / AN + SINGULAR NOUN',
            note: 'OR: A / AN + ADJECTIVE + SINGULAR NOUN',
            example: 'A car / A fast car',
            color: '#c5a059'
        },

        /* 4: Rule of ( A ) */
        { 
            type: 'big-rule',
            title: 'RULE 1',
            formula: 'A + CONSONANT SOUND',
            note: 'Sounds like: B, C, D, F, G, K, L...',
            items: ["A Pen", "A Car", "A Book", "A Cat", "A Man", "A University"],
            color: '#3498db'
        },

        /* 5: Rule of ( AN ) */
        { 
            type: 'big-rule',
            title: 'RULE 2',
            formula: 'AN + VOWEL SOUND',
            note: 'Sounds like: A - E - I - O - U',
            items: ["An Apple", "An Egg", "An Orange", "An Idea", "An Umbrella", "An Hour"],
            color: '#e74c3c' 
        },

        /* 6: THE U SPECIAL CASE */
        {
            type: 'u-case',
            title: 'SPECIAL CASE: THE LETTER ( U )',
            cases: [
                { word: "An <span style='color:#e74c3c;'>Um</span>brella", sound: "Sound: /ʌ/ (Vowel)" },
                { word: "A <span style='color:#3498db;'>Un</span>iversity", sound: "Sound: /ju:/ (Consonant)" }
            ]
        },

        /* 7: Quick Practice Reveal */
        { 
            type: 'reveal-plus', 
            title: 'Quick Examples',
            desc: 'A vs AN in sentences',
            items: [
                { base: "Give me ", add: "a pen" },
                { base: "Eat ", add: "an orange" },
                { base: "Wait for ", add: "an hour" },
                { base: "I have ", add: "a car" }
            ] 
        },

        /* 8: 10 MCQ QUESTIONS */
        {
            type: 'mcq',
            title: 'Articles Practice',
            questions: [
                { q: "I have ________ orange in my bag.", opts: ["a", "an", "the"], ans: "an" },
                { q: "He is ________ honest man.", opts: ["a", "an", "the"], ans: "an" },
                { q: "My brother goes to ________ university.", opts: ["a", "an", "the"], ans: "a" },
                { q: "Can I have ________ cup of tea?", opts: ["an", "a", "the"], ans: "a" },
                { q: "She bought ________ expensive dress.", opts: ["a", "an", "the"], ans: "an" },
                { q: "It takes ________ hour to get there.", opts: ["a", "an", "the"], ans: "an" },
                { q: "I saw ________ big elephant.", opts: ["a", "an", "the"], ans: "a" },
                { q: "Open ________ door, please.", opts: ["a", "an", "the"], ans: "the" },
                { q: "He is ________ doctor.", opts: ["an", "a", "the"], ans: "a" },
                { q: "Look at ________ moon!", opts: ["a", "an", "the"], ans: "the" }
            ]
        },

        /* 9: Conclusion */
        { 
            type: 'title', 
            content: 'ARTICLES DONE!', 
            subtitle: 'Great Job, Master!', 
            color: '#2ecc71' 
        }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:95%; max-width:1400px; text-align:center; animation: vetoQuickFade 0.3s ease;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <h1 style="font-size:10vw; font-weight:900; color:${s.color}; margin:0;">${s.content}</h1>
                <div style="font-size:3vw; color:#fff; font-weight:bold; margin-top:20px; border-top:8px solid ${s.color}; display:inline-block; padding-top:10px; letter-spacing:8px;">${s.subtitle}</div>
            `;
        } 
        else if (s.type === 'big-rule') {
            wrapper.innerHTML = `
                <h2 style="font-size:4vh; color:${s.color}; margin-bottom:2vh;">${s.title}</h2>
                <div style="background:#111; padding:5vh; border-radius:30px; border: 4px solid ${s.color}; margin-bottom:4vh;">
                    <div style="font-size:8vh; font-weight:900;">${s.formula}</div>
                </div>
                <div style="font-size:4vh; color:#888;">${s.note}</div>
                ${s.items ? `<div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:20px; margin-top:5vh;">
                    ${s.items.map((item, i) => `<div style="opacity:${i <= subStep ? 1 : 0.05}; background:#222; padding:2vh; border-radius:15px; font-size:4vh; font-weight:bold; transition:0.2s;">${item}</div>`).join('')}
                </div>` : ''}
            `;
        }
        else if (s.type === 'u-case') {
            wrapper.innerHTML = `
                <h2 style="font-size:6vh; color:#c5a059; margin-bottom:5vh;">${s.title}</h2>
                <div style="display:flex; justify-content:center; gap:5vw;">
                    ${s.cases.map((c, i) => `
                        <div style="background:#111; padding:6vh; border-radius:30px; border-bottom:10px solid ${i===0?'#e74c3c':'#3498db'}; opacity:${i <= subStep ? 1 : 0.05}; transition:0.3s;">
                            <div style="font-size:8vh; font-weight:900; margin-bottom:2vh;">${c.word}</div>
                            <div style="font-size:3vh; color:#666;">${c.sound}</div>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'dual-boxes') {
            wrapper.innerHTML = `
                <div style="display:flex; gap:30px; justify-content:center; width:100%;">
                    <div style="background:#111; border:4px solid #fff; padding:60px; border-radius:40px; flex:1;">
                        <h2 style="font-size:2rem; color:#888; margin-bottom:10px;">${s.left.title}</h2>
                        <div style="font-size:8vw; font-weight:900; line-height:1;">${s.left.content}</div>
                        <p style="font-size:1.5rem; color:#444; margin-top:20px;">${s.left.desc}</p>
                    </div>
                    <div style="background:#111; border:4px solid #c5a059; padding:60px; border-radius:40px; flex:1;">
                        <h2 style="font-size:2rem; color:#888; margin-bottom:10px;">${s.right.title}</h2>
                        <div style="font-size:8vw; font-weight:900; color:#c5a059; line-height:1;">${s.right.content}</div>
                        <p style="font-size:1.5rem; color:#c5a059; opacity:0.6; margin-top:20px;">${s.right.desc}</p>
                    </div>
                </div>`;
        }
        else if (s.type === 'reveal-plus') {
            wrapper.innerHTML = `
                <h2 style="font-size:4rem; color:#c5a059; margin-bottom:10px; font-weight:900;">${s.title}</h2>
                <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:25px; margin-top:40px;">
                    ${s.items.map((item, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0.05}; font-size:3.5rem; background:#111; padding:40px; border-radius:25px; font-weight:900; border-bottom: 8px solid ${i <= subStep ? '#c5a059' : '#222'}; transition:0.2s;">
                            ${item.base}<span style="color:#c5a059;">${item.add}</span>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'mcq') {
            let q = s.questions[subStep];
            wrapper.innerHTML = `
                <h2 style="font-size:4vh; color:#c5a059; margin-bottom:3vh;">Practice (${subStep + 1}/10)</h2>
                <div style="background:#111; padding:6vh; border-radius:40px; border:4px solid #c5a059; width:100%;">
                    <div id="q-text" style="font-size:7vh; margin-bottom:5vh; font-weight:900;">${q.q}</div>
                    <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:20px;">
                        ${q.opts.map(opt => `
                            <button onclick="window.checkArtAns('${opt}', '${q.ans}', this)" 
                                style="padding:3vh; background:#222; border:3px solid #444; color:#fff; border-radius:20px; font-size:4vh; font-weight:900; cursor:pointer; transition:0.2s;">
                                ${opt}
                            </button>
                        `).join('')}
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
    }

    window.checkArtAns = function(sel, ans, btn) {
        if (sel === ans) {
            btn.style.background = "#2ecc71";
            setTimeout(() => {
                if (subStep < 9) { subStep++; render(); }
                else { currentSlide++; subStep = 0; render(); }
            }, 800);
        } else {
            btn.style.background = "#e74c3c";
            btn.classList.add('shake');
            setTimeout(() => btn.classList.remove('shake'), 400);
        }
    };

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if ([13, 32, 39].includes(e.keyCode)) {
            let maxSteps = 0;
            if (s.items) maxSteps = s.items.length - 1;
            else if (s.cases) maxSteps = s.cases.length - 1;
            else if (s.type === 'mcq') return;

            if (subStep < maxSteps) subStep++;
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
        @keyframes vetoQuickFade { from { opacity:0; transform: translateY(10px); } to { opacity:1; transform: translateY(0); } }
        .shake { animation: shake 0.3s ease-in-out; }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-10px); } 75% { transform: translateX(10px); } }
    `;
    document.head.appendChild(style);

    render();
})();
