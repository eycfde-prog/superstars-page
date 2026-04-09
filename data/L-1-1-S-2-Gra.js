(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- 1. الإعدادات البصرية (Veto Cinematic Theme) ---
    container.innerHTML = ''; 
    container.style.cssText = `
        height:100%; width:100%; overflow:hidden; position:relative; 
        display:flex; align-items:center; justify-content:center; 
        background: radial-gradient(circle, #121212 0%, #000 100%);
        font-family: 'Inter', 'Segoe UI', sans-serif; 
        direction:ltr; color:white;
    `;

    let currentSlide = 0;
    let subStep = 0;

    // --- 2. محتوى الدرس (Possessives & Verb to Be) ---
    const slides = [
        /* PART 1: POSSESSIVES */
        { type: 'big-title', content: 'POSSESSIVES', subtitle: 'Step 1: Ownership', color: '#3498db' },
        
        {
            type: 'compare-table',
            title: 'Possessive Family',
            headers: ["Subject", "Adjective (+Noun)", "Pronoun (Alone)"],
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

        /* MCQ Part 1: Possessives (10 Questions) */
        { 
            type: 'mcq-interactive', 
            title: 'Possessives Practice',
            questions: [
                { q: "This is my car. It is ____.", opts: ["me", "my", "mine"], ans: "mine" },
                { q: "Ali has a dog. ____ dog is small.", opts: ["His", "He", "Him"], ans: "His" },
                { q: "We live here. This is ____ house.", opts: ["ours", "our", "us"], ans: "our" },
                { q: "She lost ____ keys yesterday.", opts: ["hers", "her", "she"], ans: "her" },
                { q: "The bird is in ____ nest.", opts: ["it", "its", "it's"], ans: "its" },
                { q: "Is this ____ phone, Sara?", opts: ["your", "yours", "you"], ans: "your" },
                { q: "These books are ____. They bought them.", opts: ["their", "they", "theirs"], ans: "theirs" },
                { q: "That bag belongs to me. It is ____.", opts: ["my", "mine", "I"], ans: "mine" },
                { q: "He finished ____ homework early.", opts: ["him", "his", "he"], ans: "his" },
                { q: "This classroom is ____. We study here.", opts: ["ours", "our", "us"], ans: "ours" }
            ]
        },

        /* PART 2: VERB TO BE */
        { type: 'big-title', content: 'VERB TO BE', subtitle: 'Step 2: Am / Is / Are', color: '#c5a059' },

        {
            type: 'compare-table',
            title: 'Positive & Negative',
            headers: ["Subject", "Positive", "Negative"],
            rows: [
                { s: "I", v: "AM", e: "AM NOT" },
                { s: "He / She / It", v: "IS", e: "IS NOT" },
                { s: "We / You / They", v: "ARE", e: "ARE NOT" }
            ]
        },

        /* MCQ Part 2: Verb to Be (10 Questions) */
        { 
            type: 'mcq-interactive', 
            title: 'Verb to Be Practice',
            questions: [
                { q: "Ahmed ____ a clever student.", opts: ["am", "are", "is"], ans: "is" },
                { q: "I ____ very happy today.", opts: ["is", "am", "are"], ans: "am" },
                { q: "They ____ playing in the club.", opts: ["are", "is", "am"], ans: "are" },
                { q: "____ you ready for the exam?", opts: ["Is", "Am", "Are"], ans: "Are" },
                { q: "It ____ a cold day.", opts: ["is", "are", "am"], ans: "is" },
                { q: "We ____ not tired.", opts: ["is", "am", "are"], ans: "are" },
                { q: "Sara and Mona ____ sisters.", opts: ["is", "are", "am"], ans: "are" },
                { q: "Where ____ my glasses?", opts: ["am", "is", "are"], ans: "are" },
                { q: "He ____ not at home now.", opts: ["is", "am", "are"], ans: "is" },
                { q: "____ she your teacher?", opts: ["Are", "Is", "Am"], ans: "Is" }
            ]
        },

        { type: 'big-title', content: 'EXCELLENT!', subtitle: 'You Mastered the Foundation', color: '#2ecc71' }
    ];

    // --- 3. محرك العرض (Render Engine) ---
    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:90vw; max-width:1400px; text-align:center; animation: vetoFadeIn 0.5s ease;`;

        if (s.type === 'big-title') {
            wrapper.innerHTML = `
                <h1 style="font-size:15vh; font-weight:900; color:${s.color}; margin:0; text-shadow: 0 0 40px ${s.color}66;">${s.content}</h1>
                <div style="font-size:5vh; color:#fff; border-top:1vh solid ${s.color}; display:inline-block; margin-top:20px; padding-top:10px; opacity:0.8;">${s.subtitle}</div>`;
        } 
        else if (s.type === 'compare-table') {
            wrapper.innerHTML = `
                <h2 style="font-size:7vh; color:#c5a059; margin-bottom:4vh;">${s.title}</h2>
                <table style="width:100%; border-collapse:separate; border-spacing:0 15px; font-size:4.5vh;">
                    <tr style="color:#666;">${s.headers.map(h => `<th style="padding:20px;">${h}</th>`).join('')}</tr>
                    ${s.rows.map((r, i) => `
                        <tr style="background:rgba(255,255,255,0.03); opacity:${i <= subStep ? 1 : 0.05}; transition:0.3s;">
                            <td style="padding:3vh; border-radius:20px 0 0 20px; font-weight:900;">${r.s}</td>
                            <td style="color:#c5a059; font-weight:900; font-size:6vh;">${r.v}</td>
                            <td style="color:#fff; border-radius:0 20px 20px 0; font-style:italic;">${r.e}</td>
                        </tr>`).join('')}
                </table>`;
        }
        else if (s.type === 'mcq-interactive') {
            let qData = s.questions[subStep];
            wrapper.innerHTML = `
                <h2 style="font-size:5vh; color:#c5a059; margin-bottom:5vh;">${s.title} (${subStep + 1}/${s.questions.length})</h2>
                <div style="background:rgba(255,255,255,0.02); padding:8vh; border-radius:60px; border:2px solid #222;">
                    <div id="question-text" style="font-size:8vh; margin-bottom:8vh; font-weight:900;">${qData.q}</div>
                    <div style="display:flex; gap:2vw; justify-content:center;">
                        ${qData.opts.map(opt => `
                            <button onclick="window.checkVetoAns('${opt}', '${qData.ans}', this)" 
                                style="min-width:20vw; padding:4vh; background:#111; color:white; border:3px solid #333; border-radius:30px; font-size:5vh; font-weight:900; cursor:pointer; transition:0.2s;">
                                ${opt}
                            </button>`).join('')}
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
        renderProgress();
    }

    function renderProgress() {
        const bar = document.createElement('div');
        const progress = ((currentSlide + 1) / slides.length) * 100;
        bar.style.cssText = `position:absolute; bottom:0; left:0; height:12px; background:#c5a059; width:${progress}%; transition:0.4s; box-shadow: 0 0 20px #c5a059;`;
        container.appendChild(bar);
    }

    // --- 4. وظائف التحكم والتفاعل ---
    window.nextSlide = function() {
        const s = slides[currentSlide];
        if (s.rows && subStep < s.rows.length - 1) subStep++;
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
        @keyframes vetoFadeIn { from { opacity:0; transform:scale(0.9); } to { opacity:1; transform:scale(1); } }
        @keyframes vetoShake { 0%, 100% { transform:translateX(0); } 25% { transform:translateX(-10px); } 75% { transform:translateX(10px); } }
    `;
    document.head.appendChild(style);

    render();
})();
