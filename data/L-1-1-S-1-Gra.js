(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- 1. الإعدادات البصرية (The Cinematic Background) ---
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

    // --- 2. البيانات (Data) ---
    const slides = [
        { type: 'big-title', content: 'PRONOUNS', subtitle: 'SUBJECT vs OBJECT', color: '#c5a059' },
        { 
            type: 'definitions', 
            title: 'Subject Pronouns',
            items: [
                { p: "I", d: "Speaking about myself" },
                { p: "He / She / It", d: "Singular (One)" },
                { p: "We / They / You", d: "Plural (Many)" }
            ] 
        },
        { 
            type: 'mcq-interactive', 
            title: 'Quick Check: Subject',
            questions: [
                { q: "____ is a clever girl.", opts: ["He", "She", "It"], ans: "She" },
                { q: "____ am a professional teacher.", opts: ["I", "We", "You"], ans: "I" },
                { q: "The cats are here, ____ are happy.", opts: ["We", "They", "He"], ans: "They" }
            ]
        },
        {
            type: 'transform-table',
            title: 'Transformation: Subject ➞ Object',
            pairs: [
                { s: "I", o: "Me" }, { s: "He", o: "Him" }, { s: "She", o: "Her" },
                { s: "It", o: "It" }, { s: "We", o: "Us" }, { s: "They", o: "Them" }, { s: "You", o: "You" }
            ]
        },
        {
            type: 'writing-focus',
            title: 'The Golden Rule',
            content: `
                <div style="font-size:9vh; margin-bottom:4vh; font-weight:900; letter-spacing:2px;">
                    <span style="color:#c5a059; text-shadow: 0 0 30px rgba(197,160,89,0.6);">Subject</span> 
                    <span style="color:#555;"> ➔ </span> 
                    <span style="background:#c5a059; color:#000; padding:5px 30px; border-radius:15px; box-shadow: 0 10px 40px rgba(197,160,89,0.3);">VERB</span> 
                    <span style="color:#555;"> ➔ </span> 
                    <span style="color:#ff4d4d; text-shadow: 0 0 30px rgba(255,77,77,0.4);">Object</span>
                </div>
                <div style="font-size:5.5vh; color:#aaa; font-style:italic; margin-top:5vh;">
                    Ex: <span style="color:#fff; border-bottom:3px solid #c5a059;">I</span> love <span style="color:#fff; border-bottom:3px solid #ff4d4d;">her</span>. <br>
                    Ex: <span style="color:#fff; border-bottom:3px solid #c5a059;">They</span> visit <span style="color:#fff; border-bottom:3px solid #ff4d4d;">us</span>.
                </div>
            `
        },
        { type: 'big-title', content: 'EXCELLENT!', subtitle: 'You Mastered Pronouns', color: '#00ff88' }
    ];

    // --- 3. وظيفة العرض (Render Engine) ---
    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:90vw; max-width:1400px; text-align:center; animation: vetoFadeIn 0.6s ease-out;`;

        // Slide Types Logic
        if (s.type === 'big-title') {
            wrapper.innerHTML = `
                <h1 style="font-size:18vh; font-weight:900; color:${s.color}; margin:0; text-shadow: 0 0 50px ${s.color}44;">${s.content}</h1>
                ${s.subtitle ? `<div style="font-size:5vh; color:#fff; font-weight:300; margin-top:20px; letter-spacing:8px; opacity:0.8;">${s.subtitle}</div>` : ''}
            `;
        } 
        else if (s.type === 'definitions') {
            wrapper.innerHTML = `
                <h2 style="font-size:7vh; color:#c5a059; margin-bottom:6vh; text-transform:uppercase;">${s.title}</h2>
                <div style="display:flex; flex-direction:column; gap:3vh; align-items:center;">
                    ${s.items.map((item, i) => `
                        <div style="background:rgba(255,255,255,0.03); width:85%; padding:4.5vh; border-radius:30px; display:flex; justify-content:space-between; align-items:center; border: 1px solid ${i <= subStep ? '#c5a059' : '#333'}; opacity:${i <= subStep ? 1 : 0.1}; transform:scale(${i === subStep ? 1.05 : 1}); transition:0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
                            <span style="font-size:8vh; font-weight:900; color:${i <= subStep ? '#fff' : '#666'}">${item.p}</span>
                            <span style="font-size:4.5vh; color:#c5a059; font-weight:bold;">${item.d}</span>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'mcq-interactive') {
            let qData = s.questions[subStep] || s.questions[0];
            wrapper.innerHTML = `
                <h2 style="font-size:5vh; color:#c5a059; margin-bottom:6vh; opacity:0.7;">${s.title}</h2>
                <div style="background:rgba(255,255,255,0.02); padding:10vh 5vh; border-radius:60px; border:1px solid #222; backdrop-filter:blur(10px);">
                    <div id="question-text" style="font-size:8.5vh; margin-bottom:8vh; font-weight:900;">${qData.q}</div>
                    <div style="display:flex; gap:3vw; justify-content:center;">
                        ${qData.opts.map(opt => `
                            <button onclick="window.checkVetoAns('${opt}', '${qData.ans}', this)" 
                                style="min-width:18vw; padding:4vh; background:#111; color:white; border:2px solid #333; border-radius:30px; font-size:5.5vh; font-weight:900; cursor:pointer; transition:0.3s; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                                ${opt}
                            </button>
                        `).join('')}
                    </div>
                </div>`;
        }
        else if (s.type === 'transform-table') {
            wrapper.innerHTML = `
                <h2 style="font-size:7vh; color:#c5a059; margin-bottom:5vh;">${s.title}</h2>
                <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:3vh;">
                    ${s.pairs.map((p, i) => `
                        <div style="display:flex; justify-content:space-around; align-items:center; background:${i <= subStep ? 'rgba(197,160,89,0.1)' : '#111'}; padding:3vh; border-radius:25px; border:2px solid ${i <= subStep ? '#c5a059' : 'transparent'}; opacity:${i <= subStep ? 1 : 0.05}; transition:0.4s;">
                            <span style="font-size:7vh; font-weight:900;">${p.s}</span>
                            <span style="color:#c5a059; font-size:5vh;">➞</span>
                            <span style="font-size:7vh; font-weight:900; color:#c5a059;">${p.o}</span>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'writing-focus') {
            wrapper.innerHTML = `
                <div style="text-align:center; background:rgba(255,255,255,0.02); padding:12vh 5vh; border-radius:80px; border:2px solid #c5a059; position:relative;">
                    <div style="position:absolute; top:-4vh; left:50%; transform:translateX(-50%); background:#c5a059; color:#000; padding:1vh 4vh; font-size:4vh; font-weight:900; border-radius:50px;">IMPORTANT</div>
                    <div style="line-height:1.4;">${s.content}</div>
                </div>`;
        }

        container.appendChild(wrapper);
        renderProgressBar();
    }

    // --- 4. شريط التقدم (Progress Bar) ---
    function renderProgressBar() {
        const progress = document.createElement('div');
        const percent = ((currentSlide + 1) / slides.length) * 100;
        progress.style.cssText = `
            position:absolute; bottom:0; left:0; height:8px; background:#c5a059;
            width:${percent}%; transition:0.5s ease-out; box-shadow: 0 0 20px #c5a059;
        `;
        container.appendChild(progress);
    }

    // --- 5. منطق التحكم (Navigation Logic) ---
    window.nextSlide = function() {
        const s = slides[currentSlide];
        if (s.type === 'definitions' && subStep < s.items.length - 1) subStep++;
        else if (s.type === 'transform-table' && subStep < s.pairs.length - 1) subStep++;
        else if (s.type === 'mcq-interactive' && subStep < s.questions.length -1) { /* Wait for click */ return; }
        else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
        else { if (window.triggerVetoDone) window.triggerVetoDone(); }
        render();
    };

    window.prevSlide = function() {
        if (subStep > 0) subStep--;
        else if (currentSlide > 0) { 
            currentSlide--; 
            const prevS = slides[currentSlide];
            subStep = (prevS.items) ? prevS.items.length - 1 : (prevS.pairs ? prevS.pairs.length - 1 : 0);
        }
        render();
    };

    window.checkVetoAns = function(selected, correct, btn) {
        const qText = document.getElementById('question-text');
        if (selected === correct) {
            btn.style.background = "#00ff88";
            btn.style.color = "#000";
            btn.style.borderColor = "#00ff88";
            btn.style.boxShadow = "0 0 40px #00ff8866";
            qText.innerHTML = qText.innerHTML.replace("____", `<span style="color:#00ff88; text-decoration:underline;">${correct}</span>`);
            
            setTimeout(() => {
                const s = slides[currentSlide];
                if (subStep < s.questions.length - 1) { subStep++; render(); }
                else { currentSlide++; subStep = 0; render(); }
            }, 1000);
        } else {
            btn.style.background = "#ff4d4d";
            btn.style.animation = "vetoShake 0.4s";
            setTimeout(() => { btn.style.animation = ""; btn.style.background = "#111"; }, 400);
        }
    };

    // --- 6. الاختصارات (Shortcuts) ---
    document.onkeydown = (e) => {
        if ([13, 32, 39].includes(e.keyCode)) window.nextSlide(); // Enter, Space, Right
        if ([37, 8].includes(e.keyCode)) window.prevSlide(); // Left, Backspace
    };

    const style = document.createElement('style');
    style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;900&display=swap');
        @keyframes vetoFadeIn { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }
        @keyframes vetoShake { 0%, 100% { transform:translateX(0); } 25% { transform:translateX(-15px); } 75% { transform:translateX(15px); } }
    `;
    document.head.appendChild(style);

    render();
})();
