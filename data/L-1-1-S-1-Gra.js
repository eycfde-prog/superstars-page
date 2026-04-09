(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- 1. الإعدادات البصرية (The Veto Cinematic Layout) ---
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

    // --- 2. قاعدة البيانات الشاملة (Integrated Content) ---
    const slides = [
        { type: 'big-title', content: 'PRONOUNS', subtitle: 'MASTER CLASS WITH MR. EZZ', color: '#c5a059' },
        { 
            type: 'definitions', 
            title: 'Subject Pronouns',
            items: [
                { p: "I / He / She / It", d: "Singular Subjects" },
                { p: "We / They / You", d: "Plural Subjects" }
            ] 
        },
        // المجموعة الأولى: تمارين ضمائر الفاعل (إجابات موزعة)
        { 
            type: 'mcq-interactive', 
            title: 'Level 1: Subject Pronouns Check',
            questions: [
                { q: "____ is reading a book.", opts: ["Him", "He", "Me"], ans: "He" },
                { q: "____ are playing football.", opts: ["Them", "Us", "They"], ans: "They" },
                { q: "My sister is tall, ____ is a doctor.", opts: ["Her", "She", "It"], ans: "She" },
                { q: "The dog is hungry, ____ wants food.", opts: ["He", "It", "They"], ans: "It" },
                { q: "____ go to school every day.", opts: ["Us", "Me", "We"], ans: "We" },
                { q: "Are ____ coming to the party?", opts: ["your", "them", "you"], ans: "you" },
                { q: "My friend and I are happy, ____ won.", opts: ["We", "They", "Us"], ans: "We" },
                { q: "____ am very tired today.", opts: ["Me", "I", "My"], ans: "I" },
                { q: "Ahmed is smart, ____ studies hard.", opts: ["Him", "He", "His"], ans: "He" },
                { q: "The flowers are beautiful, ____ smell good.", opts: ["It", "Them", "They"], ans: "They" }
            ]
        },
        {
            type: 'transform-table',
            title: 'The Transformation Map',
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
                    <span style="background:#c5a059; color:#000; padding:5px 30px; border-radius:15px;">VERB</span> 
                    <span style="color:#555;"> ➔ </span> 
                    <span style="color:#ff4d4d; text-shadow: 0 0 30px rgba(255,77,77,0.4);">Object</span>
                </div>
            `
        },
        // المجموعة الثانية: تمارين ضمائر المفعول به (إجابات موزعة)
        { 
            type: 'mcq-interactive', 
            title: 'Level 2: Object Pronouns Check',
            questions: [
                { q: "I saw Ali and talked to ____.", opts: ["he", "him", "his"], ans: "him" },
                { q: "Can you help ____ with this bag?", opts: ["me", "I", "my"], ans: "me" },
                { q: "Our teacher gave ____ homework.", opts: ["we", "our", "us"], ans: "us" },
                { q: "I like these shoes, I will buy ____.", opts: ["they", "them", "it"], ans: "them" },
                { q: "Where is Sara? I need to call ____.", opts: ["her", "she", "hers"], ans: "her" },
                { q: "The cake is delicious, taste ____?", opts: ["it", "its", "them"], ans: "it" },
                { q: "Please listen to ____, I am talking.", opts: ["I", "my", "me"], ans: "me" },
                { q: "We invited the neighbors, we like ____.", opts: ["them", "they", "their"], ans: "them" },
                { q: "My father told ____ a funny story.", opts: ["we", "us", "our"], ans: "us" },
                { q: "Don't worry about ____, I can do it.", opts: ["I", "my", "me"], ans: "me" }
            ]
        },
        { type: 'big-title', content: 'FANTASTIC!', subtitle: 'You Are A Pronouns Pro', color: '#00ff88' }
    ];

    // --- 3. محرك العرض (Render Engine) ---
    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:90vw; max-width:1400px; text-align:center; animation: vetoFadeIn 0.5s ease-out;`;

        if (s.type === 'big-title') {
            wrapper.innerHTML = `<h1 style="font-size:16vh; font-weight:900; color:${s.color}; margin:0; text-shadow: 0 0 40px ${s.color}44;">${s.content}</h1>
                                 <div style="font-size:5vh; color:#fff; letter-spacing:5px; opacity:0.8; margin-top:20px;">${s.subtitle}</div>`;
        } 
        else if (s.type === 'definitions') {
            wrapper.innerHTML = `<h2 style="font-size:7vh; color:#c5a059; margin-bottom:6vh;">${s.title}</h2>
                <div style="display:flex; flex-direction:column; gap:4vh; align-items:center;">
                    ${s.items.map((item, i) => `
                        <div style="background:rgba(255,255,255,0.03); width:80%; padding:5vh; border-radius:30px; border: 1px solid ${i <= subStep ? '#c5a059' : '#333'}; opacity:${i <= subStep ? 1 : 0.1}; transition:0.5s;">
                            <span style="font-size:9vh; font-weight:900;">${item.p}</span>
                            <div style="font-size:4vh; color:#c5a059;">${item.d}</div>
                        </div>`).join('')}
                </div>`;
        }
        else if (s.type === 'mcq-interactive') {
            let qData = s.questions[subStep];
            wrapper.innerHTML = `<h2 style="font-size:5vh; color:#c5a059; margin-bottom:5vh;">${s.title} (${subStep + 1}/${s.questions.length})</h2>
                <div style="background:rgba(255,255,255,0.02); padding:8vh; border-radius:60px; border:1px solid #222;">
                    <div id="question-text" style="font-size:8vh; margin-bottom:8vh; font-weight:900; line-height:1.2;">${qData.q}</div>
                    <div style="display:flex; gap:2vw; justify-content:center;">
                        ${qData.opts.map(opt => `
                            <button onclick="window.checkVetoAns('${opt}', '${qData.ans}', this)" 
                                style="min-width:18vw; padding:4vh; background:#111; color:white; border:2px solid #333; border-radius:25px; font-size:5vh; font-weight:900; cursor:pointer; transition:0.2s;">
                                ${opt}
                            </button>`).join('')}
                    </div>
                </div>`;
        }
        else if (s.type === 'transform-table') {
            wrapper.innerHTML = `<h2 style="font-size:7vh; color:#c5a059; margin-bottom:4vh;">${s.title}</h2>
                <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:2.5vh;">
                    ${s.pairs.map((p, i) => `
                        <div style="display:flex; justify-content:space-around; align-items:center; background:${i <= subStep ? 'rgba(197,160,89,0.1)' : '#111'}; padding:2.5vh; border-radius:20px; border:2px solid ${i <= subStep ? '#c5a059' : 'transparent'}; opacity:${i <= subStep ? 1 : 0.1}; transition:0.3s;">
                            <span style="font-size:6vh; font-weight:900;">${p.s}</span>
                            <span style="color:#c5a059; font-size:4vh;">➔</span>
                            <span style="font-size:6vh; font-weight:900; color:#c5a059;">${p.o}</span>
                        </div>`).join('')}
                </div>`;
        }
        else if (s.type === 'writing-focus') {
            wrapper.innerHTML = `<div style="text-align:center; background:rgba(255,255,255,0.02); padding:10vh; border-radius:80px; border:2px solid #c5a059;">
                                 <h2 style="font-size:6vh; color:#c5a059; margin-bottom:4vh;">RECAP</h2>${s.content}</div>`;
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

    // --- 4. وظائف التحكم ---
    window.nextSlide = function() {
        const s = slides[currentSlide];
        if (s.type === 'definitions' && subStep < s.items.length - 1) subStep++;
        else if (s.type === 'transform-table' && subStep < s.pairs.length - 1) subStep++;
        else if (s.type === 'mcq-interactive') return; // الانتظار حتى الإجابة
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
        @keyframes vetoFadeIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes vetoShake { 0%, 100% { transform:translateX(0); } 25% { transform:translateX(-10px); } 75% { transform:translateX(10px); } }
    `;
    document.head.appendChild(style);

    render();
})();
