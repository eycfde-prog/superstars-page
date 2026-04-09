(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- 1. الإعدادات البصرية الاحترافية (Veto Cinematic Theme) ---
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

    // --- 2. المحتوى التعليمي المنظم (Possessives then Verb to Be) ---
    const slides = [
        /* 1: Intro */
        { type: 'big-title', content: 'GRAMMAR MASTER', subtitle: 'POSSESSIVES & VERB TO BE', color: '#c5a059' },

        /* 2: Possessives Table */
        {
            type: 'compare-table',
            title: 'Step 1: Ownership (الملكية)',
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

        /* 3: Possessives MCQ (10 Questions) */
        { 
            type: 'mcq-interactive', 
            title: 'Possessives Practice',
            questions: [
                { q: "This is my book. It is ____.", opts: ["my", "mine", "I"], ans: "mine" },
                { q: "Ali has a car. ____ car is fast.", opts: ["He", "His", "Him"], ans: "His" },
                { q: "We live here. This is ____ house.", opts: ["ours", "our", "us"], ans: "our" },
                { q: "That bag belongs to Sara. It is ____.", opts: ["hers", "her", "she"], ans: "hers" },
                { q: "The dog wagged ____ tail.", opts: ["it's", "its", "it"], ans: "its" },
                { q: "This phone is ____. I bought it yesterday.", opts: ["my", "me", "mine"], ans: "mine" },
                { q: "They have a dog. ____ dog is small.", opts: ["Them", "Their", "Theirs"], ans: "Their" },
                { q: "Is this ____ pen? Or is it mine?", opts: ["you", "your", "yours"], ans: "your" },
                { q: "The children played with ____ toys.", opts: ["their", "theirs", "them"], ans: "their" },
                { q: "This office is ____. We work here.", opts: ["our", "ours", "us"], ans: "ours" }
            ]
        },

        /* 4: Verb to Be Table */
        {
            type: 'compare-table',
            title: 'Step 2: Verb to Be (Am / Is / Are)',
            headers: ["Subject", "Verb", "Example"],
            rows: [
                { s: "I", v: "AM", e: "I am a hero" },
                { s: "He / She / It", v: "IS", e: "It is cool" },
                { s: "We / You / They", v: "ARE", e: "We are ready" }
            ]
        },

        /* 5: Verb to Be MCQ (10 Questions) */
        { 
            type: 'mcq-interactive', 
            title: 'Verb to Be Practice',
            questions: [
                { q: "I ____ a very clever student.", opts: ["is", "are", "am"], ans: "am" },
                { q: "Ahmed ____ happy today.", opts: ["is", "am", "are"], ans: "is" },
                { q: "The cats ____ hungry now.", opts: ["is", "am", "are"], ans: "are" },
                { q: "____ you ready for the test?", opts: ["Is", "Are", "Am"], ans: "Are" },
                { q: "It ____ a beautiful day.", opts: ["is", "are", "am"], ans: "is" },
                { q: "My friends ____ at the club.", opts: ["am", "is", "are"], ans: "are" },
                { q: "She ____ not a doctor.", opts: ["are", "is", "am"], ans: "is" },
                { q: "We ____ winners!", opts: ["am", "is", "are"], ans: "are" },
                { q: "Where ____ my keys?", opts: ["is", "am", "are"], ans: "are" },
                { q: "____ he your brother?", opts: ["Is", "Am", "Are"], ans: "Is" }
            ]
        },

        /* 6: End */
        { type: 'big-title', content: 'EXCELLENT!', subtitle: 'Grammar Foundation: Completed', color: '#2ecc71' }
    ];

    // --- 3. محرك العرض (The Rendering Engine) ---
    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:90vw; max-width:1400px; text-align:center; animation: vetoFade 0.4s ease-out;`;

        if (s.type === 'big-title') {
            wrapper.innerHTML = `
                <h1 style="font-size:14vh; font-weight:900; color:${s.color}; margin:0; text-shadow: 0 0 30px ${s.color}55;">${s.content}</h1>
                ${s.subtitle ? `<div style="font-size:5vh; color:#fff; font-weight:bold; margin-top:20px; border-top:1vh solid ${s.color}; display:inline-block; padding-top:10px;">${s.subtitle}</div>` : ''}
            `;
        } 
        else if (s.type === 'compare-table') {
            wrapper.innerHTML = `
                <h2 style="font-size:6vh; color:#c5a059; margin-bottom:4vh;">${s.title}</h2>
                <table style="width:100%; font-size:4.5vh; border-collapse:separate; border-spacing:0 1.5vh;">
                    <tr style="color:#888;">${s.headers.map(h => `<th style="padding-bottom:2vh;">${h}</th>`).join('')}</tr>
                    ${s.rows.map((r, i) => `
                        <tr style="opacity:${i <= subStep ? 1 : 0.05}; background:rgba(255,255,255,0.03); transition:0.3s;">
                            <td style="padding:2vh; border-radius:20px 0 0 20px; font-weight:900;">${r.s}</td>
                            <td style="color:#c5a059; font-weight:900; font-size:6vh;">${r.v}</td>
                            <td style="color:#fff; border-radius:0 20px 20px 0; font-style:italic;">"${r.e}"</td>
                        </tr>
                    `).join('')}
                </table>`;
        }
        else if (s.type === 'mcq-interactive') {
            let qData = s.questions[subStep];
            wrapper.innerHTML = `
                <h2 style="font-size:4vh; color:#c5a059; margin-bottom:3vh;">${s.title} (${subStep+1}/${s.questions.length})</h2>
                <div style="background:rgba(255,255,255,0.02); padding:6vh; border-radius:40px; border:2px solid #333;">
                    <div id="q-txt" style="font-size:7vh; margin-bottom:5vh; font-weight:900;">${qData.q}</div>
                    <div style="display:flex; gap:2vw; justify-content:center;">
                        ${qData.opts.map(opt => `
                            <button onclick="window.checkVeto('${opt}', '${qData.ans}', this)" 
                                style="min-width:18vw; padding:3vh; background:#111; color:white; border:2px solid #444; border-radius:20px; font-size:5vh; font-weight:900; cursor:pointer; transition:0.2s;">
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
        const p = ((currentSlide + 1) / slides.length) * 100;
        bar.style.cssText = `position:absolute; bottom:0; left:0; height:8px; background:#c5a059; width:${p}%; transition:0.5s; box-shadow:0 0 15px #c5a059;`;
        container.appendChild(bar);
    }

    // --- 4. منطق التحكم والتفاعل ---
    window.nextSlide = function() {
        const s = slides[currentSlide];
        if (s.rows && subStep < s.rows.length - 1) subStep++;
        else if (s.type === 'mcq-interactive') return; // يجب الإجابة
        else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
        else { if (window.triggerVetoDone) window.triggerVetoDone(); }
        render();
    };

    window.prevSlide = function() {
        if (subStep > 0) subStep--;
        else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        render();
    };

    window.checkVeto = function(sel, cor, btn) {
        const qTxt = document.getElementById('q-txt');
        if (sel === cor) {
            btn.style.background = "#2ecc71"; btn.style.borderColor = "#2ecc71";
            qTxt.innerHTML = qTxt.innerHTML.replace("____", `<span style="color:#2ecc71; text-decoration:underline;">${cor}</span>`);
            setTimeout(() => {
                const s = slides[currentSlide];
                if (subStep < s.questions.length - 1) { subStep++; render(); }
                else { currentSlide++; subStep = 0; render(); }
            }, 800);
        } else {
            btn.style.background = "#e74c3c"; btn.style.animation = "shake 0.4s";
            setTimeout(() => { btn.style.animation = ""; btn.style.background = "#111"; }, 400);
        }
    };

    document.onkeydown = (e) => {
        if ([13, 32, 39].includes(e.keyCode)) window.nextSlide();
        if ([37, 8].includes(e.keyCode)) window.prevSlide();
    };

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes vetoFade { from { opacity:0; transform:scale(0.98); } to { opacity:1; transform:scale(1); } }
        @keyframes shake { 0%, 100% { transform:translateX(0); } 25% { transform:translateX(-10px); } 75% { transform:translateX(10px); } }
    `;
    document.head.appendChild(style);

    render();
})();
