(function() {
    // التأكد من استهداف الحاوية الصحيحة في صفحتك
    const container = document.getElementById('stage-content');
    if (!container) return;

    // إعداد الستاييل العام للمسرح
    container.innerHTML = ''; 
    container.style.cssText = `
        height: 100vh; 
        width: 100vw;
        overflow: hidden; 
        position: relative; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        background: #050505; 
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
        direction: ltr; 
        color: white;
    `;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        { type: 'big-title', content: 'Subject & Object Pronouns', color: '#c5a059' },
        { 
            type: 'definitions', 
            title: 'Subject Pronouns',
            items: [
                { p: "I", d: "the Speaker" }, { p: "He", d: "the male" },
                { p: "She", d: "the female" }, { p: "It", d: "non-human" },
                { p: "We", d: "we all" }, { p: "They", d: "them all" },
                { p: "You", d: "the listener" }
            ] 
        },
        { 
            type: 'mcq-interactive', 
            title: 'Quick Check',
            questions: [
                { q: "____ is a clever girl.", opts: ["He", "She", "It"], ans: "She" },
                { q: "____ am a professional teacher.", opts: ["I", "We", "You"], ans: "I" },
                { q: "Look at the cat, ____ is sleeping.", opts: ["They", "She", "It"], ans: "It" },
                { q: "My friends are here, ____ are happy.", opts: ["We", "They", "He"], ans: "They" }
            ]
        },
        {
            type: 'transform-table',
            title: 'Subject ➞ Object',
            pairs: [
                { s: "I", o: "Me" }, { s: "He", o: "Him" }, { s: "She", o: "Her" },
                { s: "We", o: "Us" }, { s: "They", o: "Them" }
            ]
        }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width: 90%; max-width: 1200px; text-align: center; animation: fadeIn 0.5s ease;`;

        if (s.type === 'big-title') {
            wrapper.innerHTML = `<h1 style="font-size: 8rem; font-weight: 900; color: ${s.color}; text-shadow: 0 0 30px rgba(197,160,89,0.5);">${s.content}</h1>`;
        } 
        
        else if (s.type === 'definitions') {
            wrapper.innerHTML = `
                <h2 style="font-size: 4rem; color: #c5a059; margin-bottom: 50px; border-bottom: 2px solid #333; padding-bottom: 20px;">${s.title}</h2>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px;">
                    ${s.items.map((item, i) => `
                        <div style="background: #111; padding: 30px; border-radius: 15px; border-left: 5px solid #c5a059; opacity: ${i <= subStep ? 1 : 0.1}; transition: 0.4s; text-align: left;">
                            <b style="color: #c5a059; font-size: 3rem;">${item.p}:</b> <span style="font-size: 2.2rem; margin-left: 15px;">${item.d}</span>
                        </div>
                    `).join('')}
                </div>`;
        }

        else if (s.type === 'mcq-interactive') {
            let qData = s.questions[subStep] || s.questions[0];
            wrapper.innerHTML = `
                <h2 style="font-size: 3.5rem; color: #c5a059; margin-bottom: 50px;">${s.title}</h2>
                <div style="background: #111; padding: 60px; border-radius: 30px; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
                    <div id="question-text" style="font-size: 4.5rem; margin-bottom: 60px; letter-spacing: 2px;">${qData.q}</div>
                    <div style="display: flex; gap: 30px; justify-content: center; flex-wrap: wrap;">
                        ${qData.opts.map(opt => `
                            <button class="veto-opt" onclick="window.checkVetoAns('${opt}', '${qData.ans}', this)" 
                                style="padding: 20px 60px; background: #222; color: white; border: 2px solid #444; border-radius: 15px; font-size: 2.5rem; cursor: pointer; transition: 0.3s;">
                                ${opt}
                            </button>
                        `).join('')}
                    </div>
                </div>`;
        }

        else if (s.type === 'transform-table') {
            wrapper.innerHTML = `
                <h2 style="font-size: 4rem; color: #c5a059; margin-bottom: 50px;">${s.title}</h2>
                <div style="display: flex; flex-direction: column; gap: 20px; align-items: center;">
                    ${s.pairs.map((p, i) => `
                        <div style="display: flex; gap: 80px; font-size: 4rem; opacity: ${i <= subStep ? 1 : 0.1}; transition: 0.5s;">
                            <span style="width: 200px; text-align: right; color: #fff;">${p.s}</span>
                            <span style="color: #c5a059;">➞</span>
                            <span style="width: 200px; text-align: left; color: #c5a059; font-weight: bold;">${p.o}</span>
                        </div>
                    `).join('')}
                </div>`;
        }

        container.appendChild(wrapper);
    }

    // منطق التحقق من الإجابة (Global function ليراها الزر)
    window.checkVetoAns = function(selected, correct, btn) {
        const qText = document.getElementById('question-text');
        if (selected === correct) {
            btn.style.background = "#2ecc71"; // أخضر
            qText.innerHTML = qText.innerHTML.replace("____", `<span style="color:#2ecc71; border-bottom: 5px solid;">${correct}</span>`);
            
            // الانتقال للسؤال التالي بعد ثانية
            setTimeout(() => {
                if (subStep < slides[currentSlide].questions.length - 1) {
                    subStep++;
                    render();
                } else {
                    currentSlide++;
                    subStep = 0;
                    render();
                }
            }, 1200);
        } else {
            btn.style.background = "#e74c3c"; // أحمر (خطأ)
            btn.style.transform = "translateX(10px)";
            setTimeout(() => btn.style.transform = "translateX(0)", 100);
        }
    };

    // التحكم بالكيبورد
    document.onkeydown = (e) => {
        if (e.keyCode === 39 || e.keyCode === 32 || e.keyCode === 13) { // Right, Space, Enter
            const s = slides[currentSlide];
            if (s.type === 'definitions' && subStep < s.items.length - 1) subStep++;
            else if (s.type === 'transform-table' && subStep < s.pairs.length - 1) subStep++;
            else if (currentSlide < slides.length - 1) { 
                currentSlide++; 
                subStep = 0; 
            }
        } else if (e.keyCode === 37) { // Left (Back)
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { 
                currentSlide--; 
                subStep = 0; 
            }
        }
        render();
    };

    render();
})();
