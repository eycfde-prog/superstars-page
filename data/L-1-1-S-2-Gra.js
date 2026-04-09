(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- 1. الإعدادات البصرية الاحترافية ---
    container.innerHTML = ''; 
    container.style.cssText = `
        height:100%; width:100%; overflow:hidden; position:relative; 
        display:flex; align-items:center; justify-content:center; 
        background: radial-gradient(circle, #151515 0%, #050505 100%);
        font-family: 'Inter', 'Segoe UI', sans-serif; 
        direction:ltr; color:white;
    `;

    let currentSlide = 0;
    let subStep = 0;

    // --- 2. بنية المحتوى (الهيكلية الجديدة) ---
    const slides = [
        /* القسم الأول: الضمائر */
        { type: 'big-title', content: 'PRONOUNS', subtitle: 'Step 1: The Subject', color: '#c5a059' },
        { 
            type: 'pronoun-table', 
            title: 'Subject Pronouns',
            items: [
                { p: "I", d: "Speaking about myself" },
                { p: "He / She / It", d: "Singular (One)" },
                { p: "We / You / They", d: "Plural (Many)" }
            ] 
        },
        { 
            type: 'mcq-interactive', 
            title: 'Practice: Pronouns',
            questions: [
                { q: "____ is my best friend.", opts: ["She", "Her", "Me"], ans: "She" },
                { q: "My cat is small, ____ is white.", opts: ["They", "It", "He"], ans: "It" },
                { q: "Ali and I are tall, ____ are brothers.", opts: ["They", "Us", "We"], ans: "We" },
                { q: "____ are very kind people.", opts: ["You", "Him", "I"], ans: "You" },
                { q: "Look at the boys, ____ are playing.", opts: ["We", "Them", "They"], ans: "They" },
                { q: "____ am a clever student.", opts: ["Me", "I", "My"], ans: "I" },
                { q: "Sara is happy, ____ is laughing.", opts: ["She", "He", "It"], ans: "She" },
                { q: "The car is fast, ____ is red.", opts: ["They", "It", "Its"], ans: "It" },
                { q: "Ahmed is a doctor, ____ works in a hospital.", opts: ["Him", "His", "He"], ans: "He" },
                { q: "____ are reading books now.", opts: ["He", "We", "I"], ans: "We" }
            ]
        },

        /* القسم الثاني: Verb to Be */
        { type: 'big-title', content: 'VERB TO BE', subtitle: 'Step 2: AM - IS - ARE', color: '#3498db' },
        {
            type: 'compare-table',
            title: 'Verb to Be (Positive)',
            headers: ["Subject", "Verb to Be", "Example"],
            rows: [
                { s: "I", v: "AM", e: "I am happy" },
                { s: "He / She / It", v: "IS", e: "He is a hero" },
                { s: "We / You / They", v: "ARE", e: "They are ready" }
            ]
        },
        { 
            type: 'mcq-interactive', 
            title: 'Practice: Verb to Be',
            questions: [
                { q: "I ____ a professional teacher.", opts: ["is", "am", "are"], ans: "am" },
                { q: "They ____ very hungry.", opts: ["are", "am", "is"], ans: "are" },
                { q: "She ____ a beautiful girl.", opts: ["are", "is", "am"], ans: "is" },
                { q: "We ____ students at Veto school.", opts: ["am", "is", "are"], ans: "are" },
                { q: "It ____ a sunny day.", opts: ["is", "are", "am"], ans: "is" },
                { q: "You ____ my favorite student.", opts: ["am", "are", "is"], ans: "are" },
                { q: "The dogs ____ in the garden.", opts: ["is", "am", "are"], ans: "are" },
                { q: "My father ____ a great man.", opts: ["is", "are", "am"], ans: "is" },
                { q: "I ____ not a doctor.", opts: ["are", "is", "am"], ans: "am" },
                { q: "The book ____ on the table.", opts: ["are", "is", "am"], ans: "is" }
            ]
        },

        /* الخاتمة */
        { type: 'big-title', content: 'WELL DONE!', subtitle: 'You Mastered Section 1 & 2', color: '#2ecc71' }
    ];

    // --- 3. محرك العرض المطور ---
    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:90vw; max-width:1400px; text-align:center; animation: vetoFadeIn 0.5s ease;`;

        if (s.type === 'big-title') {
            wrapper.innerHTML = `
                <h1 style="font-size:12vh; font-weight:900; color:${s.color}; margin:0; text-shadow: 0 0 30px ${s.color}55;">${s.content}</h1>
                <div style="font-size:4vh; color:#fff; font-weight:bold; margin-top:20px; border-top:8px solid ${s.color}; display:inline-block; padding-top:10px; letter-spacing:5px;">${s.subtitle}</div>
            `;
        } 
        else if (s.type === 'pronoun-table') {
            wrapper.innerHTML = `
                <h2 style="font-size:7vh; color:#c5a059; margin-bottom:5vh;">${s.title}</h2>
                <div style="display:flex; flex-direction:column; gap:3vh; align-items:center;">
                    ${s.items.map((item, i) => `
                        <div style="background:rgba(255,255,255,0.03); width:80%; padding:4vh; border-radius:30px; display:flex; justify-content:space-between; align-items:center; border-left:2vh solid #c5a059; opacity:${i <= subStep ? 1 : 0.05}; transition:0.3s;">
                            <span style="font-size:8vh; font-weight:900;">${item.p}</span>
                            <span style="font-size:4vh; color:#888;">➞ ${item.d}</span>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'compare-table') {
            wrapper.innerHTML = `
                <h2 style="font-size:7vh; color:#3498db; margin-bottom:5vh;">${s.title}</h2>
                <table style="width:100%; font-size:4vh; border-collapse:separate; border-spacing:0 2vh;">
                    <tr style="color:#666; text-transform:uppercase; letter-spacing:3px;">${s.headers.map(h => `<th style="padding-bottom:2vh;">${h}</th>`).join('')}</tr>
                    ${s.rows.map((r, i) => `
                        <tr style="opacity:${i <= subStep ? 1 : 0.1}; background:rgba(255,255,255,0.02); transition:0.4s;">
                            <td style="padding:4vh; border-radius:30px 0 0 30px; font-weight:900; font-size:6vh;">${r.s}</td>
                            <td style="color:#3498db; font-weight:900; font-size:8vh; text-shadow:0 0 20px #3498db44;">${r.v}</td>
                            <td style="color:#aaa; border-radius:0 30px 30px 0; font-style:italic;">"${r.e}"</td>
                        </tr>
                    `).join('')}
                </table>`;
        }
        else if (s.type === 'mcq-interactive') {
            let qData = s.questions[subStep];
            wrapper.innerHTML = `
                <h2 style="font-size:5vh; color:#c5a059; margin-bottom:4vh; opacity:0.8;">${s.title} (${subStep + 1}/10)</h2>
                <div style="background:rgba(255,255,255,0.02); padding:8vh; border-radius:60px; border:2px solid #222;">
                    <div id="question-text" style="font-size:8.5vh; margin-bottom:8vh; font-weight:900;">${qData.q}</div>
                    <div style="display:flex; gap:2vw; justify-content:center;">
                        ${qData.opts.map(opt => `
                            <button onclick="window.checkVetoAns('${opt}', '${qData.ans}', this)" 
                                style="min-width:18vw; padding:4vh; background:#111; color:white; border:3px solid #333; border-radius:30px; font-size:5.5vh; font-weight:900; cursor:pointer; transition:0.2s;">
                                ${opt}
                            </button>
                        `).join('')}
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
        renderProgress();
    }

    function renderProgress() {
        const bar = document.createElement('div');
        const progress = ((currentSlide + 1) / slides.length) * 100;
        bar.style.cssText = `position:absolute; bottom:0; left:0; height:12px; background:#c5a059; width:${progress}%; transition:0.5s; box-shadow: 0 0 20px #c5a059;`;
        container.appendChild(bar);
    }

    // --- 4. التحكم ---
    window.nextSlide = function() {
        const s = slides[currentSlide];
        if (s.items && subStep < s.items.length - 1) subStep++;
        else if (s.rows && subStep < s.rows.length - 1) subStep++;
        else if (s.type === 'mcq-interactive') return; 
        else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
        else { if (window.triggerVetoDone) window.triggerVetoDone(); }
        render();
    };

    window.prevSlide = function() {
        if (subStep > 0) subStep--;
        else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        render();
    };

    window.checkVetoAns = function(selected, correct, btn) {
        const qText = document.getElementById('question-text');
        if (selected === correct) {
            btn.style.background = "#00ff88"; btn.style.borderColor = "#00ff88"; btn.style.color = "#000";
            qText.innerHTML = qText.innerHTML.replace("____", `<span style="color:#00ff88; text-decoration:underline;">${correct}</span>`);
            setTimeout(() => {
                const s = slides[currentSlide];
                if (subStep < s.questions.length - 1) { subStep++; render(); }
                else { currentSlide++; subStep = 0; render(); }
            }, 800);
        } else {
            btn.style.background = "#ff4d4d"; btn.style.animation = "vetoShake 0.4s";
            setTimeout(() => { btn.style.animation = ""; btn.style.background = "#111"; }, 400);
        }
    };

    document.onkeydown = (e) => {
        if ([13, 32, 39].includes(e.keyCode)) window.nextSlide();
        if ([37, 8].includes(e.keyCode)) window.prevSlide();
    };

    const style = document.createElement('style');
    style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;900&display=swap');
        @keyframes vetoFadeIn { from { opacity:0; transform:scale(0.98); } to { opacity:1; transform:scale(1); } }
        @keyframes vetoShake { 0%, 100% { transform:translateX(0); } 25% { transform:translateX(-10px); } 75% { transform:translateX(10px); } }
    `;
    document.head.appendChild(style);

    render();
})();
