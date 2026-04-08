/* VETO ARCHITECT - Clean Code v2.0
    Project: Veto Program Smart Board
    Author: Veto A. (For Mr. Ezz)
    Focus: 4-Meter Rule & Large Display Responsive
*/

(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // Reset Container with Smart Board Optimizations
    container.innerHTML = ''; 
    container.style.cssText = `
        height:100vh; 
        width:100%; 
        overflow:hidden; 
        position:relative; 
        display:flex; 
        align-items:center; 
        justify-content:center; 
        background:#050505; 
        font-family:'Segoe UI', sans-serif; 
        direction:ltr; 
        color:white;
        padding-top: 60px; /* Space for Exit Button */
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
            title: 'Subject ➞ Object',
            pairs: [
                { s: "I", o: "Me" }, { s: "He", o: "Him" },
                { s: "She", o: "Her" }, { s: "It", o: "It" },
                { s: "We", o: "Us" }, { s: "They", o: "Them" },
                { s: "You", o: "You" }
            ]
        },
        {
            type: 'writing-focus',
            title: 'The Golden Rule',
            content: `
                <div style="font-size:10vh; margin-bottom:5vh;">
                    <span style="color:#c5a059; font-weight:900;">Subject</span> ➔ [ VERB ] ➔ <span style="color:#e74c3c; font-weight:900;">Object</span>
                </div>
                <div style="font-size:5vh; color:#888; background:rgba(255,255,255,0.05); padding:20px; border-radius:20px;">
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
        { type: 'big-title', content: 'MASTERED!', subtitle: 'Excellent Work, Veto Hero!', color: '#2ecc71' }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.className = 'veto-wrapper';
        wrapper.style.cssText = `width:90%; height:80vh; display:flex; flex-direction:column; justify-content:center; align-items:center; animation: vetoSlideUp 0.4s ease-out;`;

        if (s.type === 'big-title') {
            wrapper.innerHTML = `
                <h1 style="font-size:18vh; font-weight:900; color:${s.color}; line-height:1; margin:0; text-shadow: 0 10px 30px rgba(0,0,0,0.5);">${s.content}</h1>
                ${s.subtitle ? `<div style="font-size:5vh; color:#fff; font-weight:bold; margin-top:3vh; border-top:10px solid ${s.color}; padding-top:2vh;">${s.subtitle}</div>` : ''}
            `;
        } 
        else if (s.type === 'definitions') {
            wrapper.innerHTML = `
                <h2 style="font-size:7vh; color:#c5a059; margin-bottom:5vh; font-weight:900;">${s.title}</h2>
                <div style="width:100%; max-width:1200px; display:flex; flex-direction:column; gap:2.5vh;">
                    ${s.items.map((item, i) => `
                        <div style="background:#111; padding:3vh 5vh; border-radius:25px; display:flex; justify-content:space-between; align-items:center; border-left:20px solid #c5a059; opacity:${i <= subStep ? 1 : 0.05}; transform: translateX(${i <= subStep ? '0' : '50px'}); transition: all 0.4s ease;">
                            <span style="font-size:8vh; font-weight:900;">${item.p}</span>
                            <span style="font-size:4.5vh; color:#888; font-weight:bold;">➞ ${item.d}</span>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'mcq-interactive') {
            let qData = s.questions[subStep] || s.questions[0];
            wrapper.innerHTML = `
                <h2 style="font-size:5vh; color:#c5a059; margin-bottom:4vh; font-weight:bold;">${s.title}</h2>
                <div style="background:#111; padding:6vh; border-radius:50px; border:4px solid #222; width:100%; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
                    <div id="question-text" style="font-size:9vh; margin-bottom:6vh; font-weight:900; min-height:1.2em;">${qData.q}</div>
                    <div style="display:flex; gap:3vh; justify-content:center; flex-wrap:wrap;">
                        ${qData.opts.map(opt => `
                            <button onclick="window.checkVetoAns('${opt}', '${qData.ans}', this)" 
                                style="min-width:250px; padding:3vh 6vh; background:#222; color:white; border:4px solid #444; border-radius:25px; font-size:5vh; font-weight:900; cursor:pointer; transition:0.2s;">
                                ${opt}
                            </button>
                        `).join('')}
                    </div>
                </div>`;
        }
        else if (s.type === 'transform-table') {
            wrapper.innerHTML = `
                <h2 style="font-size:7vh; color:#c5a059; margin-bottom:4vh;">${s.title}</h2>
                <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:2vh; width:100%; max-width:1300px;">
                    ${s.pairs.map((p, i) => `
                        <div style="display:flex; justify-content:space-between; align-items:center; background:#111; padding:2vh 4vh; border-radius:20px; opacity:${i <= subStep ? 1 : 0.05}; border-right:10px solid #c5a059;">
                            <span style="font-size:6vh; font-weight:900;">${p.s}</span>
                            <span style="color:#c5a059; font-size:4vh;">➔</span>
                            <span style="font-size:6vh; font-weight:900; color:#c5a059;">${p.o}</span>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'writing-focus') {
            wrapper.innerHTML = `
                <div style="text-align:center; width:100%;">${s.content}</div>`;
        }

        container.appendChild(wrapper);
    }

    // Interactive Logic
    window.checkVetoAns = function(selected, correct, btn) {
        const qText = document.getElementById('question-text');
        if (selected === correct) {
            btn.style.background = "#2ecc71";
            btn.style.borderColor = "#2ecc71";
            btn.style.transform = "scale(1.1)";
            qText.innerHTML = qText.innerHTML.replace("____", `<span style="color:#2ecc71; text-decoration:underline;">${correct}</span>`);
            setTimeout(() => {
                const s = slides[currentSlide];
                if (subStep < s.questions.length - 1) { subStep++; render(); }
                else { currentSlide++; subStep = 0; render(); }
            }, 1200);
        } else {
            btn.style.background = "#e74c3c";
            btn.classList.add('veto-shake');
            setTimeout(() => btn.classList.remove('veto-shake'), 400);
        }
    };

    // Navigation Bridge
    window.nextSlide = () => {
        const s = slides[currentSlide];
        if (s.type === 'definitions' && subStep < s.items.length - 1) subStep++;
        else if (s.type === 'transform-table' && subStep < s.pairs.length - 1) subStep++;
        else if (s.type === 'mcq-interactive') return; 
        else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
        else { if (window.closeStage) window.closeStage(); }
        render();
    };

    window.prevSlide = () => {
        if (subStep > 0) subStep--;
        else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        render();
    };

    // Global Key Listening
    document.onkeydown = (e) => {
        if ([13, 32, 39].includes(e.keyCode)) window.nextSlide();
        else if (e.keyCode === 37) window.prevSlide();
    };

    // Style Injection for Animations
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes vetoSlideUp { from { opacity:0; transform: translateY(50px); } to { opacity:1; transform: translateY(0); } }
        .veto-shake { animation: vetoShake 0.4s cubic-bezier(.36,.07,.19,.97) both; }
        @keyframes vetoShake { 10%, 90% { transform: translate3d(-1px, 0, 0); } 20%, 80% { transform: translate3d(2px, 0, 0); } 30%, 50%, 70% { transform: translate3d(-4px, 0, 0); } 40%, 60% { transform: translate3d(4px, 0, 0); } }
    `;
    document.head.appendChild(style);

    render();
})();
