(function() {
    // 1. التوافق مع الحاوية الجديدة
    const container = document.getElementById('stage-content');
    if (!container) return;

    // 2. تصفية الحاوية وضبط الستايلي العام (أحجام ضخمة للشرح)
    container.innerHTML = ''; 
    container.style.cssText = `
        height: 100vh; 
        width: 100vw;
        display: flex; 
        align-items: center; 
        justify-content: center; 
        background: #050505; 
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
        color: white; 
        overflow: hidden;
        position: relative;
    `;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        { type: 'big-title', content: 'Subject & Object Pronouns', color: '#c5a059' }, // تم تغيير اللون لذهب الـ Veto
        { 
            type: 'definitions', 
            title: 'Subject Pronouns',
            items: [
                { p: "I", d: "the Speaker" },
                { p: "He", d: "the male" },
                { p: "She", d: "the female" },
                { p: "It", d: "non-human" },
                { p: "We", d: "we (plural)" },
                { p: "They", d: "them (plural)" },
                { p: "You", d: "the listener" }
            ] 
        },
        { 
            type: 'fill-practice', 
            title: 'Practice: Subject Pronouns',
            items: [
                { q: "____ is a girl.", a: "She" },
                { q: "____ is a boy.", a: "He" },
                { q: "____ are Egyptians.", a: "We / They" },
                { q: "____ am a teacher.", a: "I" },
                { q: "____ are a student.", a: "You" }
            ] 
        },
        {
            type: 'transform-table',
            title: 'Subject ➞ Object',
            pairs: [
                { s: "I", o: "Me" }, { s: "He", o: "Him" }, { s: "She", o: "Her" },
                { s: "It", o: "It" }, { s: "We", o: "Us" }, { s: "They", o: "Them" },
                { s: "You", o: "You" }
            ]
        },
        { 
            type: 'mcq-multi', 
            title: 'Quick Quiz!',
            questions: [
                { q: "I gave _____ my car.", opts: ["he", "him", "its"], ans: 1 },
                { q: "Give _____ your pen.", opts: ["she", "I", "me"], ans: 2 },
                { q: "I saw _____, he was tall.", opts: ["him", "our", "its"], ans: 0 }
            ]
        }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.className = "slide-wrapper";
        wrapper.style.cssText = `width: 90%; max-width: 1200px; text-align: center; animation: fadeIn 0.5s ease;`;

        if (s.type === 'big-title') {
            wrapper.innerHTML = `<h1 style="font-size: 8rem; font-weight: 900; color: ${s.color}; text-shadow: 0 0 30px rgba(197,160,89,0.5);">${s.content}</h1>`;
        } 
        else if (s.type === 'definitions') {
            wrapper.innerHTML = `
                <h2 style="font-size: 4rem; color: #c5a059; margin-bottom: 50px; text-transform: uppercase;">${s.title}</h2>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; text-align: left;">
                    ${s.items.map((item, i) => `
                        <div style="background: #111; padding: 25px; border-radius: 15px; border-left: 5px solid #c5a059; opacity: ${i <= subStep ? 1 : 0}; transition: 0.4s; transform: scale(${i === subStep ? 1.05 : 1});">
                            <b style="color: #c5a059; font-size: 3rem;">${item.p}:</b> <span style="font-size: 2.2rem; margin-left:15px;">${item.d}</span>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'fill-practice') {
            wrapper.innerHTML = `
                <h2 style="font-size: 4rem; color: #3498db; margin-bottom: 60px;">${s.title}</h2>
                <div style="text-align: left; display: flex; flex-direction: column; gap: 30px;">
                    ${s.items.map((item, i) => `
                        <div style="font-size: 3.5rem; opacity: ${i <= subStep ? 1 : 0};">
                            ${item.q} <span style="color: #2ecc71; margin-left: 30px; font-weight: bold; visibility: ${subStep > i ? 'visible' : 'hidden'}">➞ ${item.a}</span>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'transform-table') {
            wrapper.innerHTML = `
                <h2 style="font-size: 4rem; color: #f1c40f; margin-bottom: 50px;">${s.title}</h2>
                <div style="display: flex; flex-direction: column; gap: 15px; align-items: center;">
                    ${s.pairs.map((p, i) => `
                        <div style="display: flex; gap: 80px; font-size: 4rem; opacity: ${i <= subStep ? 1 : 0}; border-bottom: 1px solid #222; width: 600px; justify-content: center;">
                            <span style="color: white; width: 150px; text-align: right;">${p.s}</span>
                            <span style="color: #c5a059;">➞</span>
                            <span style="color: #f1c40f; width: 150px; text-align: left;">${p.o}</span>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'mcq-multi') {
            let q = s.questions[subStep] || s.questions[s.questions.length-1];
            wrapper.innerHTML = `
                <h2 style="font-size: 4rem; color: #2ecc71; margin-bottom: 60px;">${s.title}</h2>
                <div style="background: #111; padding: 60px; border-radius: 30px; border: 2px solid #333;">
                    <div style="font-size: 4.5rem; margin-bottom: 50px;">${q.q}</div>
                    <div style="display: flex; gap: 30px; justify-content: center;">
                        ${q.opts.map((opt, idx) => `
                            <div style="padding: 20px 60px; background: #222; border: 2px solid #c5a059; border-radius: 15px; font-size: 2.5rem; color: #c5a059;">${opt}</div>
                        `).join('')}
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
    }

    // إدارة مفاتيح الكيبورد (متوافقة مع iFrame و Stage)
    const handleKeys = (e) => {
        const s = slides[currentSlide];
        if (["ArrowRight", "Enter", " "].includes(e.key)) { // Next
            if (s.type === 'definitions' && subStep < s.items.length - 1) subStep++;
            else if (s.type === 'fill-practice' && subStep < (s.items.length * 2) - 1) subStep++;
            else if (s.type === 'transform-table' && subStep < s.pairs.length - 1) subStep++;
            else if (s.type === 'mcq-multi' && subStep < s.questions.length - 1) subStep++;
            else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
        } else if (e.key === "ArrowLeft") { // Back
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    // منع تكرار المستمعين عند إعادة تحميل النشاط
    document.removeEventListener('keydown', handleKeys);
    document.addEventListener('keydown', handleKeys);

    render();
})();
