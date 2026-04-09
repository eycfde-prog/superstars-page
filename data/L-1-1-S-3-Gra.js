(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `
        height:100%; width:100%; overflow:hidden; position:relative; 
        display:flex; align-items:center; justify-content:center; 
        background: radial-gradient(circle, #0a0a0a 0%, #000 100%);
        font-family: 'Inter', 'Segoe UI', sans-serif; 
        direction:ltr; color:white;
    `;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'ARTICLES', subtitle: 'A / AN / THE', color: '#c5a059' },

        /* 2: Intro Boxes */
        { 
            type: 'dual-boxes', 
            left: { title: 'Definite', content: 'THE', desc: 'Specific things' },
            right: { title: 'Indefinite', content: 'A / AN', desc: 'Non-specific (Singular)' }
        },

        /* 3: Golden Rule A */
        { 
            type: 'big-rule', 
            content: '<span style="color:#c5a059">A</span> + Consonant', 
            subtitle: 'Sounds like: B, C, D, F, G...',
            color: '#c5a059'
        },

        { 
            type: 'reveal-grid', 
            title: 'Use ( A )',
            desc: 'Before Consonant sounds',
            items: ["A Pen", "A Car", "A Book", "A Cat", "A Man", "A Toy"] 
        },

        /* 4: Golden Rule AN */
        { 
            type: 'big-rule', 
            content: '<span style="color:#3498db">AN</span> + Vowels', 
            subtitle: 'Sounds like: (a - e - i - o - u)',
            color: '#3498db'
        },

        { 
            type: 'reveal-grid', 
            title: 'Use ( AN )',
            desc: 'Before Vowel sounds',
            items: ["An Apple", "An Egg", "An Orange", "An Idea", "An Umbrella", "An Ox"] 
        },

        /* 5: The U Case - Special Slide */
        {
            type: 'special-u',
            title: 'The Letter ( U )',
            desc: 'It depends on the SOUND, not the letter!',
            cases: [
                { word: 'AN <span style="color:#fff">um</span>brella', sound: 'Short sound (Ah)' },
                { word: 'A <span style="color:#c5a059">un</span>iversity', sound: 'Long sound (Yu)' }
            ]
        },

        /* 6: Quick Practice Sentences */
        { 
            type: 'reveal-plus', 
            title: 'Sentence Practice',
            desc: 'Spot the Article',
            items: [
                { base: "Give me ", add: "a pen" },
                { base: "Eat ", add: "an orange" },
                { base: "Wait for ", add: "an hour" },
                { base: "I saw ", add: "a university" }
            ] 
        },

        /* 7: MCQ Assessment (10 Questions) */
        { 
            type: 'mcq', 
            title: 'Articles Quiz',
            questions: [
                { q: "I have ________ idea!", opts: ["a", "an", "the"], ans: "an" },
                { q: "He is ________ brave boy.", opts: ["a", "an", "the"], ans: "a" },
                { q: "She needs ________ umbrella.", opts: ["a", "an", "the"], ans: "an" },
                { q: "This is ________ expensive car.", opts: ["a", "an", "the"], ans: "an" },
                { q: "I study at ________ university.", opts: ["an", "a", "the"], ans: "a" },
                { q: "Can I have ________ apple?", opts: ["an", "a", "the"], ans: "an" },
                { q: "It takes ________ hour to get there.", opts: ["a", "an", "the"], ans: "an" },
                { q: "There is ________ cat on the roof.", opts: ["the", "an", "a"], ans: "a" },
                { q: "My father is ________ honest man.", opts: ["an", "a", "the"], ans: "an" },
                { q: "I bought ________ new book.", opts: ["an", "the", "a"], ans: "a" }
            ]
        },

        { type: 'title', content: 'EXCELLENT!', subtitle: 'Articles Mastered!', color: '#2ecc71' }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:90%; max-width:1300px; text-align:center; animation: vetoFade 0.4s ease;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <h1 style="font-size:12vh; font-weight:900; color:${s.color}; margin:0;">${s.content}</h1>
                <div style="font-size:4vh; color:#fff; font-weight:bold; margin-top:20px; border-top:8px solid ${s.color}; display:inline-block; padding-top:10px; letter-spacing:10px;">${s.subtitle}</div>
            `;
        } 
        else if (s.type === 'big-rule') {
            wrapper.innerHTML = `
                <div style="font-size:12vh; font-weight:900; margin-bottom:20px;">${s.content}</div>
                <div style="font-size:5vh; color:#888; border:2px dashed ${s.color}; display:inline-block; padding:20px 50px; border-radius:100px;">${s.subtitle}</div>
            `;
        }
        else if (s.type === 'dual-boxes') {
            wrapper.innerHTML = `
                <div style="display:flex; gap:40px; justify-content:center; width:100%;">
                    <div style="background:rgba(255,255,255,0.03); border:4px solid #fff; padding:6vh; border-radius:40px; flex:1;">
                        <h2 style="font-size:4vh; color:#888; margin-bottom:2vh;">${s.left.title}</h2>
                        <div style="font-size:10vh; font-weight:900;">${s.left.content}</div>
                        <p style="font-size:3vh; color:#555; margin-top:3vh;">${s.left.desc}</p>
                    </div>
                    <div style="background:rgba(197,160,89,0.05); border:4px solid #c5a059; padding:6vh; border-radius:40px; flex:1;">
                        <h2 style="font-size:4vh; color:#888; margin-bottom:2vh;">${s.right.title}</h2>
                        <div style="font-size:10vh; font-weight:900; color:#c5a059;">${s.right.content}</div>
                        <p style="font-size:3vh; color:#c5a059; opacity:0.6; margin-top:3vh;">${s.right.desc}</p>
                    </div>
                </div>`;
        }
        else if (s.type === 'reveal-grid') {
            wrapper.innerHTML = `
                <h2 style="font-size:6vh; color:#c5a059; margin-bottom:5vh;">${s.title}</h2>
                <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:25px;">
                    ${s.items.map((item, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0.05}; background:#111; padding:4vh; border-radius:25px; font-size:4.5vh; font-weight:900; border: 3px solid ${i === subStep ? '#c5a059' : '#222'}; transition: 0.3s;">
                            ${item}
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'special-u') {
            wrapper.innerHTML = `
                <h2 style="font-size:8vh; color:#fff; margin-bottom:1vh;">${s.title}</h2>
                <p style="font-size:3vh; color:#666; margin-bottom:6vh;">${s.desc}</p>
                <div style="display:flex; flex-direction:column; gap:30px; align-items:center;">
                    ${s.cases.map((c, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0.05}; background:#111; width:80%; padding:4vh; border-radius:30px; border-left:15px solid ${i === 0 ? '#3498db' : '#c5a059'}; display:flex; justify-content:space-between; align-items:center; transition:0.4s;">
                            <span style="font-size:7vh; font-weight:900; text-transform:lowercase;">${c.word}</span>
                            <span style="font-size:3vh; color:#555; background:#000; padding:10px 30px; border-radius:50px;">${c.sound}</span>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'reveal-plus') {
            wrapper.innerHTML = `
                <h2 style="font-size:6vh; color:#c5a059; margin-bottom:5vh;">${s.title}</h2>
                <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:30px;">
                    ${s.items.map((item, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0.05}; font-size:5vh; background:#111; padding:5vh; border-radius:30px; font-weight:900; border-bottom: 8px solid ${i <= subStep ? '#c5a059' : '#222'}; transition:0.3s;">
                            ${item.base}<span style="color:#c5a059;">${item.add}</span>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'mcq') {
            let q = s.questions[subStep] || s.questions[0];
            wrapper.innerHTML = `
                <h2 style="font-size:4vh; color:#c5a059; margin-bottom:3vh;">${s.title} (${subStep + 1}/10)</h2>
                <div style="background:#111; padding:6vh; border-radius:40px; border:4px solid #c5a059;">
                    <div id="q-text" style="font-size:7vh; margin-bottom:6vh; font-weight:900;">${q.q}</div>
                    <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:20px;">
                        ${q.opts.map(opt => `
                            <button onclick="window.checkArtAns('${opt}', '${q.ans}', this)" 
                                style="padding:3vh; background:#222; border:3px solid #444; color:#fff; border-radius:25px; font-size:5vh; font-weight:900; cursor:pointer; transition:0.2s;">
                                ${opt}
                            </button>
                        `).join('')}
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
    }

    window.checkArtAns = function(sel, ans, btn) {
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
            btn.style.animation = "vetoShake 0.3s";
            setTimeout(() => btn.style.animation = "", 300);
        }
    };

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if ([13, 32, 39].includes(e.keyCode)) { 
            let maxSteps = 0;
            if (s.items) maxSteps = s.items.length - 1;
            else if (s.cases) maxSteps = s.cases.length - 1;
            else if (s.type === 'big-rule') maxSteps = 0; 
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
        @keyframes vetoFade { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }
        @keyframes vetoShake { 0%,100%{transform:translateX(0);} 25%{transform:translateX(-10px);} 75%{transform:translateX(10px);} }
    `;
    document.head.appendChild(style);

    render();
})();
