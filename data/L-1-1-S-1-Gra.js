(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // إعداد الحاوية الرئيسية لتملأ الشاشة بالكامل مع مراعاة التباعد
    container.innerHTML = ''; 
    container.style.cssText = `
        height:100%; width:100%; overflow:hidden; position:relative; 
        display:flex; align-items:center; justify-content:center; 
        background:#050505; font-family:'Segoe UI', Roboto, sans-serif; 
        direction:ltr; color:white;
    `;

    let currentSlide = 0;
    let subStep = 0;

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
                <div style="font-size:8vh; margin-bottom:4vh; font-weight:900;">
                    <span style="color:#c5a059; text-shadow: 0 0 20px rgba(197,160,89,0.4);">Subject</span> 
                    <span style="color:#444;"> ➔ </span> 
                    <span style="background:#c5a059; color:#000; padding:0 20px; border-radius:10px;">VERB</span> 
                    <span style="color:#444;"> ➔ </span> 
                    <span style="color:#e74c3c;">Object</span>
                </div>
                <div style="font-size:5vh; color:#888; font-style:italic;">
                    Ex: <span style="color:#c5a059;">I</span> love <span style="color:#e74c3c;">her</span>. <br>
                    Ex: <span style="color:#c5a059;">They</span> visit <span style="color:#e74c3c;">us</span>.
                </div>
            `
        },
        { 
            type: 'mcq-interactive', 
            title: 'Final Test: Object',
            questions: [
                { q: "Ahmed is my friend, I love ____.", opts: ["him", "his", "he"], ans: "him" },
                { q: "Can you help ____? We are lost.", opts: ["we", "us", "our"], ans: "us" },
                { q: "Sarah is happy, look at ____.", opts: ["her", "she", "hers"], ans: "her" }
            ]
        },
        { type: 'big-title', content: 'EXCELLENT!', subtitle: 'You Mastered Pronouns', color: '#2ecc71' }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.className = 'veto-wrapper';
        wrapper.style.cssText = `width:90vw; max-width:1600px; text-align:center; animation: vetoSlideUp 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);`;

        if (s.type === 'big-title') {
            wrapper.innerHTML = `
                <h1 style="font-size:15vh; font-weight:900; color:${s.color}; margin:0; letter-spacing:-2px;">${s.content}</h1>
                ${s.subtitle ? `<div style="font-size:4vh; color:#fff; font-weight:bold; margin-top:20px; border-top:1vh solid ${s.color}; display:inline-block; padding-top:10px;">${s.subtitle}</div>` : ''}
            `;
        } 
        else if (s.type === 'definitions') {
            wrapper.innerHTML = `
                <h2 style="font-size:6vh; color:#c5a059; margin-bottom:5vh;">${s.title}</h2>
                <div style="display:flex; flex-direction:column; gap:2vh; align-items:center;">
                    ${s.items.map((item, i) => `
                        <div style="background:#111; width:80%; padding:4vh; border-radius:25px; display:flex; justify-content:space-between; align-items:center; border-left:2vh solid #c5a059; opacity:${i <= subStep ? 1 : 0.05}; transform:translateX(${i <= subStep ? '0' : '20px'}); transition:0.4s;">
                            <span style="font-size:7vh; font-weight:900;">${item.p}</span>
                            <span style="font-size:4vh; color:#666; font-weight:bold;">➞ ${item.d}</span>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'mcq-interactive') {
            let qData = s.questions[subStep] || s.questions[0];
            wrapper.innerHTML = `
                <h2 style="font-size:5vh; color:#c5a059; margin-bottom:6vh;">${s.title}</h2>
                <div style="background:linear-gradient(145deg, #0a0a0a, #151515); padding:8vh; border-radius:50px; box-shadow: 0 30px 60px rgba(0,0,0,0.5); border:1px solid #333;">
                    <div id="question-text" style="font-size:8vh; margin-bottom:8vh; font-weight:900; line-height:1.2;">${qData.q}</div>
                    <div style="display:flex; gap:3vw; justify-content:center;">
                        ${qData.opts.map(opt => `
                            <button onclick="window.checkVetoAns('${opt}', '${qData.ans}', this)" 
                                style="min-width:20vw; padding:4vh; background:#1a1a1a; color:white; border:0.5vh solid #444; border-radius:30px; font-size:5vh; font-weight:900; cursor:pointer; transition:0.2s;">
                                ${opt}
                            </button>
                        `).join('')}
                    </div>
                </div>`;
        }
        else if (s.type === 'transform-table') {
            wrapper.innerHTML = `
                <h2 style="font-size:6vh; color:#c5a059; margin-bottom:4vh;">${s.title}</h2>
                <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:2vh; width:100%;">
                    ${s.pairs.map((p, i) => `
                        <div style="display:flex; justify-content:space-around; align-items:center; background:#111; padding:3vh; border-radius:20px; opacity:${i <= subStep ? 1 : 0.05}; transition:0.3s; border-right:1vh solid #c5a059;">
                            <span style="font-size:6vh; font-weight:900;">${p.s}</span>
                            <span style="color:#c5a059; font-size:4vh;">➔</span>
                            <span style="font-size:6vh; font-weight:900; color:#c5a059;">${p.o}</span>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'writing-focus') {
            wrapper.innerHTML = `
                <div style="text-align:center; background:rgba(197,160,89,0.05); padding:10vh; border-radius:60px; border:2px dashed #c5a059;">
                    <h2 style="font-size:7vh; margin-bottom:5vh; color:#c5a059; font-weight:900;">${s.title}</h2>
                    <div style="line-height:1.4;">${s.content}</div>
                </div>`;
        }

        container.appendChild(wrapper);
    }

    // دوال التنقل العامّة لربطها بالـ Hotspots في الصفحة الرئيسية
    window.nextSlide = function() {
        const s = slides[currentSlide];
        if (s.type === 'definitions' && subStep < s.items.length - 1) subStep++;
        else if (s.type === 'transform-table' && subStep < s.pairs.length - 1) subStep++;
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
            btn.style.background = "#2ecc71";
            btn.style.borderColor = "#2ecc71";
            btn.style.transform = "scale(1.1)";
            qText.innerHTML = qText.innerHTML.replace("____", `<span style="color:#2ecc71; border-bottom:1vh solid;">${correct}</span>`);
            setTimeout(window.nextSlide, 1200);
        } else {
            btn.style.background = "#e74c3c";
            btn.style.animation = "vetoShake 0.4s";
            setTimeout(() => btn.style.animation = "", 400);
        }
    };

    // Keyboard Shortcuts
    document.onkeydown = (e) => {
        if ([13, 32, 39].includes(e.keyCode)) window.nextSlide();
        if (e.keyCode === 37) window.prevSlide();
    };

    // إضافة Styles الانتقالات
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes vetoSlideUp { from { opacity:0; transform:translateY(50px); } to { opacity:1; transform:translateY(0); } }
        @keyframes vetoShake { 0%, 100% { transform:translateX(0); } 25% { transform:translateX(-10px); } 75% { transform:translateX(10px); } }
    `;
    document.head.appendChild(style);

    render();
})();
