(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:calc(100vh - 200px); overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#0f0f0f; font-family:'Poppins', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'big-title', content: 'Subject & Object Pronouns', color: '#e74c3c' },

        /* 2: Subject Pronouns Definitions */
        { 
            type: 'definitions', 
            title: 'Subject Pronouns (ضمائر الفاعل)',
            items: [
                { p: "I", d: "the Speaker (المتحدث)" },
                { p: "He", d: "the male (المذكر)" },
                { p: "She", d: "the female (المؤنث)" },
                { p: "It", d: "something or animal (غير العاقل)" },
                { p: "We", d: "speaker plural (نحن)" },
                { p: "They", d: "people or things (هم)" },
                { p: "You", d: "the listener (المخاطب)" }
            ] 
        },

        /* 3: Subject Pronouns Practice (Fill in the blanks) */
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

        /* 4: Object Pronouns Definitions */
        { 
            type: 'definitions', 
            title: 'Object Pronouns (ضمائر المفعول)',
            items: [
                { p: "Me", d: "the Speaker" },
                { p: "Him", d: "the male" },
                { p: "Her", d: "the female" },
                { p: "It", d: "something or animal" },
                { p: "Us", d: "speaker plural" },
                { p: "Them", d: "people or things" },
                { p: "You", d: "the listener" }
            ] 
        },

        /* 5: The Transformation Table (Subject -> Object) */
        {
            type: 'transform-table',
            title: 'Subject ➞ Object',
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

        /* 6: Examples: From Subject to Object */
        { 
            type: 'reveal-logic', 
            title: 'How it works:',
            items: [
                { text: "She cooked for", cue: "we", ans: "us" },
                { text: "He visited", cue: "they", ans: "them" },
                { text: "We saw", cue: "he", ans: "him" },
                { text: "They called", cue: "I", ans: "me" }
            ] 
        },

        /* 7: Exercise Time - MCQ */
        { 
            type: 'mcq-multi', 
            title: 'Exercise Time!',
            questions: [
                { q: "I gave _____ my car.", opts: ["he", "him", "its"], ans: 1 },
                { q: "Give _____ your pen.", opts: ["she", "I", "me"], ans: 2 },
                { q: "They invited _____.", opts: ["we", "us", "your"], ans: 1 },
                { q: "I saw _____, he was tall.", opts: ["him", "our", "its"], ans: 0 }
            ]
        }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:90%; text-align:center;`;

        if (s.type === 'big-title') {
            wrapper.innerHTML = `<h1 style="font-size:8rem; font-weight:900; color:${s.color}; line-height:1.1;">${s.content}</h1>`;
        } 
        else if (s.type === 'definitions') {
            wrapper.innerHTML = `
                <h2 style="font-size:3rem; color:#e74c3c; margin-bottom:30px;">${s.title}</h2>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px; text-align:left;">
                    ${s.items.map((item, i) => `
                        <div style="background:#1e1e1e; padding:15px; border-radius:10px; opacity:${i <= subStep ? 1 : 0}; transition:0.3s;">
                            <b style="color:#f1c40f; font-size:2.5rem;">${item.p}:</b> <span style="font-size:1.8rem;">${item.d}</span>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'fill-practice') {
            wrapper.innerHTML = `
                <h2 style="font-size:3.5rem; color:#3498db; margin-bottom:40px;">${s.title}</h2>
                <div style="text-align:left; display:flex; flex-direction:column; gap:20px;">
                    ${s.items.map((item, i) => `
                        <div style="font-size:2.5rem; opacity:${i <= subStep ? 1 : 0};">
                            ${item.q} <span style="color:#2ecc71; margin-left:20px; font-weight:bold; visibility:${subStep > i ? 'visible' : 'hidden'}">➞ ${item.a}</span>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'transform-table') {
            wrapper.innerHTML = `
                <h2 style="font-size:3.5rem; color:#f1c40f; margin-bottom:30px;">${s.title}</h2>
                <div style="display:flex; flex-direction:column; gap:10px; align-items:center;">
                    ${s.pairs.map((p, i) => `
                        <div style="display:flex; gap:50px; font-size:3rem; opacity:${i <= subStep ? 1 : 0};">
                            <span style="width:100px; text-align:right;">${p.s}</span>
                            <span style="color:#e74c3c;">➞</span>
                            <span style="width:100px; text-align:left; color:#f1c40f;">${p.o}</span>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'reveal-logic') {
            wrapper.innerHTML = `
                <h2 style="font-size:3.5rem; color:#e74c3c; margin-bottom:40px;">${s.title}</h2>
                <div style="display:flex; flex-direction:column; gap:25px; text-align:left;">
                    ${s.items.map((item, i) => `
                        <div style="font-size:2.8rem; opacity:${i <= subStep ? 1 : 0};">
                            ${item.text} (${item.cue}) <span style="color:#f1c40f; font-weight:bold; visibility:${subStep > i ? 'visible' : 'hidden'}">➞ ${item.ans}</span>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'mcq-multi') {
            let q = s.questions[subStep] || s.questions[s.questions.length-1];
            wrapper.innerHTML = `
                <h2 style="font-size:3rem; color:#2ecc71; margin-bottom:40px;">${s.title}</h2>
                <div style="background:#1e1e1e; padding:40px; border-radius:20px;">
                    <div style="font-size:3.5rem; margin-bottom:30px;">${q.q}</div>
                    <div style="display:flex; gap:20px; justify-content:center;">
                        ${q.opts.map((opt, idx) => `
                            <div style="padding:15px 40px; background:#34495e; border-radius:10px; font-size:2rem;">${opt}</div>
                        `).join('')}
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if (e.keyCode === 39 || e.keyCode === 13 || e.keyCode === 32) { // Next
            if (s.type === 'definitions' && subStep < s.items.length - 1) subStep++;
            else if (s.type === 'fill-practice' && subStep < (s.items.length * 2) - 1) subStep++;
            else if (s.type === 'transform-table' && subStep < s.pairs.length - 1) subStep++;
            else if (s.type === 'reveal-logic' && subStep < (s.items.length * 2) - 1) subStep++;
            else if (s.type === 'mcq-multi' && subStep < s.questions.length - 1) subStep++;
            else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
        } else if (e.keyCode === 37) { // Back
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    render();
})();
