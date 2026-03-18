(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#050505; font-family:'Segoe UI', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Intro */
        { type: 'big-title', content: 'PRONOUNS', subtitle: 'SUBJECT vs OBJECT', color: '#c5a059' },

        /* 2: Subject Definitions */
        { 
            type: 'definitions', 
            title: 'Subject Pronouns',
            items: [
                { p: "I", d: "Speaking about myself" },
                { p: "He / She / It", d: "Singular (One)" },
                { p: "We / They / You", d: "Plural (Many)" }
            ] 
        },

        /* 3: Quick Check Subject */
        { 
            type: 'mcq-interactive', 
            title: 'Quick Check: Subject',
            questions: [
                { q: "____ is a clever girl.", opts: ["He", "She", "It"], ans: "She" },
                { q: "____ am a professional teacher.", opts: ["I", "We", "You"], ans: "I" },
                { q: "The cats are here, ____ are happy.", opts: ["We", "They", "He"], ans: "They" }
            ]
        },

        /* 4: The Transformation Table (Full) */
        {
            type: 'transform-table',
            title: 'Transformation: Subject ➞ Object',
            pairs: [
                { s: "I", o: "Me" },
                { s: "He", o: "Him" },
                { s: "She", o: "Her" },
                { s: "It", o: "It" },
                { s: "We", o: "Us" },
                { s: "They", o: "Them" },
                { s: "You", o: "You" }
            ]
        },

        /* 5: The "Golden Rule" Slide */
        {
            type: 'writing-focus',
            title: 'Where do we use them?',
            content: `
                <div style="font-size:4rem; margin-bottom:30px;">
                    <span style="color:#c5a059;">Subject</span> ➔ [ VERB ] ➔ <span style="color:#e74c3c;">Object</span>
                </div>
                <div style="font-size:2.5rem; color:#666;">
                    Ex: <span style="color:#c5a059;">I</span> love <span style="color:#e74c3c;">her</span>. <br>
                    Ex: <span style="color:#c5a059;">They</span> visit <span style="color:#e74c3c;">us</span>.
                </div>
            `
        },

        /* 6: Final MCQ Object */
        { 
            type: 'mcq-interactive', 
            title: 'Final Test: Object',
            questions: [
                { q: "Ahmed is my friend, I love ____.", opts: ["him", "his", "he"], ans: "him" },
                { q: "Can you help ____? We are lost.", opts: ["we", "us", "our"], ans: "us" },
                { q: "Sarah is happy, look at ____.", opts: ["her", "she", "hers"], ans: "her" }
            ]
        },

        /* 7: End */
        { type: 'big-title', content: 'PRONOUNS MASTERED!', subtitle: 'Well Done, Teacher!', color: '#2ecc71' }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:95%; max-width:1400px; text-align:center; animation: vetoQuickFade 0.2s ease;`;

        if (s.type === 'big-title') {
            wrapper.innerHTML = `
                <h1 style="font-size:10vw; font-weight:900; color:${s.color}; margin:0;">${s.content}</h1>
                ${s.subtitle ? `<div style="font-size:3vw; color:#fff; font-weight:bold; margin-top:20px; border-top:8px solid ${s.color}; display:inline-block; padding-top:10px;">${s.subtitle}</div>` : ''}
            `;
        } 
        else if (s.type === 'definitions') {
            wrapper.innerHTML = `
                <h2 style="font-size:4rem; color:#c5a059; margin-bottom:40px;">${s.title}</h2>
                <div style="display:flex; flex-direction:column; gap:20px; max-width:900px; margin:auto;">
                    ${s.items.map((item, i) => `
                        <div style="background:#111; padding:30px; border-radius:20px; display:flex; align-items:center; border-left:15px solid #c5a059; opacity:${i <= subStep ? 1 : 0.05}; transition:0.2s;">
                            <span style="font-size:4rem; font-weight:900; width:300px; text-align:left;">${item.p}</span>
                            <span style="font-size:2.2rem; color:#666;">➞ ${item.d}</span>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'mcq-interactive') {
            let qData = s.questions[subStep] || s.questions[0];
            wrapper.innerHTML = `
                <h2 style="font-size:3.5rem; color:#c5a059; margin-bottom:50px;">${s.title}</h2>
                <div style="background:#111; padding:60px; border-radius:40px; border:4px solid #333;">
                    <div id="question-text" style="font-size:4.5rem; margin-bottom:60px; font-weight:900;">${qData.q}</div>
                    <div style="display:flex; gap:30px; justify-content:center;">
                        ${qData.opts.map(opt => `
                            <button onclick="window.checkVetoAns('${opt}', '${qData.ans}', this)" 
                                style="padding:30px 80px; background:#222; color:white; border:4px solid #444; border-radius:20px; font-size:3rem; font-weight:900; cursor:pointer; transition:0.3s;">
                                ${opt}
                            </button>
                        `).join('')}
                    </div>
                </div>`;
        }
        else if (s.type === 'transform-table') {
            wrapper.innerHTML = `
                <h2 style="font-size:4rem; color:#c5a059; margin-bottom:30px;">${s.title}</h2>
                <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:15px; max-width:1100px; margin:auto;">
                    ${s.pairs.map((p, i) => `
                        <div style="display:flex; justify-content:space-between; align-items:center; background:#111; padding:25px 50px; border-radius:20px; opacity:${i <= subStep ? 1 : 0.05}; transition:0.3s; border-right:8px solid #c5a059;">
                            <span style="font-size:3.5rem; font-weight:900;">${p.s}</span>
                            <span style="color:#c5a059; font-size:2rem;">➔</span>
                            <span style="font-size:3.5rem; font-weight:900; color:#c5a059;">${p.o}</span>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'writing-focus') {
            wrapper.innerHTML = `
                <div style="text-align:center; background:#111; padding:80px; border-radius:40px; border:5px solid #c5a059;">
                    <h2 style="font-size:5rem; margin-bottom:40px; color:#c5a059; font-weight:900;">${s.title}</h2>
                    <div style="line-height:1.5;">${s.content}</div>
                </div>`;
        }

        container.appendChild(wrapper);
    }

    window.checkVetoAns = function(selected, correct, btn) {
        const qText = document.getElementById('question-text');
        if (selected === correct) {
            btn.style.background = "#2ecc71";
            btn.style.borderColor = "#2ecc71";
            qText.innerHTML = qText.innerHTML.replace("____", `<span style="color:#2ecc71; text-decoration:underline;">${correct}</span>`);
            setTimeout(() => {
                const s = slides[currentSlide];
                if (subStep < s.questions.length - 1) { subStep++; render(); }
                else { currentSlide++; subStep = 0; render(); }
            }, 1000);
        } else {
            btn.style.background = "#e74c3c";
            btn.style.transform = "shake 0.1s ease";
            setTimeout(() => btn.style.transform = "none", 100);
        }
    };

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if ([13, 32, 39].includes(e.keyCode)) { // Next
            if (s.type === 'definitions' && subStep < s.items.length - 1) subStep++;
            else if (s.type === 'transform-table' && subStep < s.pairs.length - 1) subStep++;
            else if (s.type === 'mcq-interactive') return; // Must click correct answer
            else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
            else { if (window.triggerVetoDone) window.triggerVetoDone(); }
            render();
        } else if (e.keyCode === 37) { // Back
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
            render();
        }
    };

    const style = document.createElement('style');
    style.innerHTML = `@keyframes vetoQuickFade { from { opacity:0; } to { opacity:1; } }`;
    document.head.appendChild(style);

    render();
})();
