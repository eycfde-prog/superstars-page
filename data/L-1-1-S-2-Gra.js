(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- 1. الإعدادات البصرية الاحترافية ---
    container.innerHTML = ''; 
    container.style.cssText = `
        height:100%; width:100%; overflow:hidden; position:relative; 
        display:flex; align-items:center; justify-content:center; 
        background: radial-gradient(circle, #101010 0%, #000 100%);
        font-family: 'Inter', 'Segoe UI', sans-serif; 
        direction:ltr; color:white;
    `;

    let currentSlide = 0;
    let subStep = 0;

    // --- 2. داتا الدرس (Possessives + Verb to Be) ---
    const slides = [
        { type: 'big-title', content: 'GRAMMAR MASTER', subtitle: 'POSSESSIVES & VERB TO BE', color: '#c5a059' },

        // --- الجزء الأول: الملكية ---
        { type: 'big-title', content: 'PART 1', subtitle: 'POSSESSIVE ADJECTIVES', color: '#3498db' },
        {
            type: 'compare-table',
            title: 'Possessives Table',
            headers: ["Subject", "Possessive", "Example"],
            rows: [
                { s: "I", v: "MY", e: "This is my car" },
                { s: "He", v: "HIS", e: "His name is Ali" },
                { s: "She", v: "HER", e: "Her book is new" },
                { s: "It", v: "ITS", e: "Its tail is long" },
                { s: "We", v: "OUR", e: "Our house is big" },
                { s: "They", v: "THEIR", e: "Their pens are blue" },
                { s: "You", v: "YOUR", e: "Is this your phone?" }
            ]
        },
        { 
            type: 'mcq-interactive', 
            title: 'Practice: Possessives',
            questions: [
                { q: "I have a cat. ____ cat is white.", opts: ["My", "His", "Her"], ans: "My" },
                { q: "Ali has a bike. ____ bike is red.", opts: ["Her", "His", "Our"], ans: "His" },
                { q: "Sara loves ____ mother very much.", opts: ["her", "its", "your"], ans: "her" },
                { q: "The dog wagged ____ tail.", opts: ["his", "their", "its"], ans: "its" },
                { q: "We live here. This is ____ house.", opts: ["my", "our", "their"], ans: "our" },
                { q: "They have a car. ____ car is fast.", opts: ["Your", "Her", "Their"], ans: "Their" },
                { q: "What is ____ name? My name is Ezz.", opts: ["your", "his", "my"], ans: "your" },
                { q: "The children lost ____ toys.", opts: ["his", "their", "her"], ans: "their" },
                { q: "I lost ____ keys in the garden.", opts: ["my", "his", "your"], ans: "my" },
                { q: "She washed ____ hands.", opts: ["his", "its", "her"], ans: "her" }
            ]
        },

        // --- الجزء الثاني: Verb to Be ---
        { type: 'big-title', content: 'PART 2', subtitle: 'VERB TO BE (AM - IS - ARE)', color: '#2ecc71' },
        {
            type: 'compare-table',
            title: 'Verb to Be Rule',
            headers: ["Group", "Verb", "Full Form"],
            rows: [
                { s: "I", v: "AM", e: "I am happy" },
                { s: "He / She / It", v: "IS", e: "He is a doctor" },
                { s: "We / You / They", v: "ARE", e: "They are here" }
            ]
        },
        { 
            type: 'mcq-interactive', 
            title: 'Practice: Verb to Be',
            questions: [
                { q: "I ____ a very clever student.", opts: ["is", "am", "are"], ans: "am" },
                { q: "Ahmed ____ tall and strong.", opts: ["am", "are", "is"], ans: "is" },
                { q: "The students ____ in the class.", opts: ["are", "is", "am"], ans: "are" },
                { q: "It ____ a beautiful day.", opts: ["are", "am", "is"], ans: "is" },
                { q: "We ____ ready for the test.", opts: ["am", "is", "are"], ans: "are" },
                { q: "My father ____ a great pilot.", opts: ["is", "am", "are"], ans: "is" },
                { q: "You ____ my best friend.", opts: ["is", "are", "am"], ans: "are" },
                { q: "The cat ____ under the table.", opts: ["is", "are", "am"], ans: "is" },
                { q: "They ____ not from London.", opts: ["is", "am", "are"], ans: "are" },
                { q: "____ she your sister?", opts: ["Am", "Are", "Is"], ans: "Is" }
            ]
        },

        { type: 'big-title', content: 'FANTASTIC!', subtitle: 'YOU COMPLETED BOTH PARTS', color: '#c5a059' }
    ];

    // --- 3. محرك العرض (Veto Engine) ---
    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:90vw; max-width:1400px; text-align:center; animation: vetoFadeIn 0.4s ease-out;`;

        if (s.type === 'big-title') {
            wrapper.innerHTML = `
                <h1 style="font-size:12vh; font-weight:900; color:${s.color}; margin:0;">${s.content}</h1>
                <div style="font-size:4.5vh; color:#fff; font-weight:bold; margin-top:20px; border-top:1vh solid ${s.color}; display:inline-block; padding-top:10px;">${s.subtitle}</div>
            `;
        } 
        else if (s.type === 'compare-table') {
            wrapper.innerHTML = `
                <h2 style="font-size:6vh; color:#c5a059; margin-bottom:4vh;">${s.title}</h2>
                <table style="width:100%; font-size:4.5vh; border-collapse:separate; border-spacing:0 1.5vh;">
                    <tr style="color:#666;">${s.headers.map(h => `<th style="padding:1vh;">${h}</th>`).join('')}</tr>
                    ${s.rows.map((r, i) => `
                        <tr style="opacity:${i <= subStep ? 1 : 0.05}; background:rgba(255,255,255,0.03); transition:0.3s;">
                            <td style="padding:3vh; border-radius:20px 0 0 20px; font-weight:900;">${r.s}</td>
                            <td style="color:#c5a059; font-weight:900; font-size:6vh;">${r.v}</td>
                            <td style="color:#fff; border-radius:0 20px 20px 0; font-style:italic; opacity:0.7;">"${r.e}"</td>
                        </tr>
                    `).join('')}
                </table>`;
        }
        else if (s.type === 'mcq-interactive') {
            let qData = s.questions[subStep];
            wrapper.innerHTML = `
                <h2 style="font-size:5vh; color:#c5a059; margin-bottom:5vh;">${s.title} (${subStep + 1}/${s.questions.length})</h2>
                <div style="background:rgba(255,255,255,0.02); padding:8vh; border-radius:50px; border:2px solid #222;">
                    <div id="question-text" style="font-size:8vh; margin-bottom:8vh; font-weight:900;">${qData.q}</div>
                    <div style="display:flex; gap:3vw; justify-content:center;">
                        ${qData.opts.map(opt => `
                            <button onclick="window.checkVetoAns('${opt}', '${qData.ans}', this)" 
                                style="min-width:18vw; padding:4vh; background:#111; color:white; border:3px solid #333; border-radius:30px; font-size:5vh; font-weight:900; cursor:pointer; transition:0.2s;">
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
        bar.style.cssText = `position:absolute; bottom:0; left:0; height:10px; background:#c5a059; width:${progress}%; transition:0.4s; box-shadow: 0 0 15px #c5a059;`;
        container.appendChild(bar);
    }

    // --- 4. التحكم والتفاعل ---
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
            btn.style.background = "#2ecc71"; btn.style.borderColor = "#2ecc71"; btn.style.color = "#000";
            qText.innerHTML = qText.innerHTML.replace("____", `<span style="color:#2ecc71; border-bottom:5px solid;">${correct}</span>`);
            setTimeout(() => {
                const s = slides[currentSlide];
                if (subStep < s.questions.length - 1) { subStep++; render(); }
                else { currentSlide++; subStep = 0; render(); }
            }, 800);
        } else {
            btn.style.background = "#e74c3c"; btn.style.animation = "vetoShake 0.4s";
            setTimeout(() => { btn.style.animation = ""; btn.style.background = "#111"; }, 400);
        }
    };

    document.onkeydown = (e) => {
        if ([13, 32, 39].includes(e.keyCode)) window.nextSlide();
        if ([37, 8].includes(e.keyCode)) window.prevSlide();
    };

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes vetoFadeIn { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }
        @keyframes vetoShake { 0%, 100% { transform:translateX(0); } 25% { transform:translateX(-10px); } 75% { transform:translateX(10px); } }
    `;
    document.head.appendChild(style);

    render();
})();
