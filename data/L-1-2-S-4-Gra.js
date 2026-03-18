(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#050505; font-family:'Segoe UI', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'THE DATE', subtitle: 'MONTHS & YEARS', color: '#2ecc71', usage: 'Telling Time & Calendar' },

        /* 2: Months Grid */
        { 
            type: 'grid-display', 
            title: 'Months of the Year',
            items: [
                "January", "February", "March", "April",
                "May", "June", "July", "August",
                "September", "October", "November", "December"
            ] 
        },

        /* 3: Ordinal Numbers */
        { 
            type: 'days-table', 
            title: 'Ordinal Suffixes',
            desc: 'For Days: 1st, 2nd, 3rd...',
            groups: [
                { suffix: 'st', nums: "1st, 21st, 31st", label: "FIRST" },
                { suffix: 'nd', nums: "2nd, 22nd", label: "SECOND" },
                { suffix: 'rd', nums: "3rd, 23rd", label: "THIRD" },
                { suffix: 'th', nums: "4th, 11th, 20th...", label: "OTHERS" }
            ]
        },

        /* 4: Years Rule */
        { 
            type: 'reading-rule', 
            title: 'How to Read Years',
            example: { raw: "1995", split: "19 | 95", text: "Nineteen Ninety-Five" },
            modern: { raw: "2026", text: "Twenty Twenty-Six" }
        },

        /* 5: Quiz Session */
        { 
            type: 'date-quiz', 
            title: 'Read the Date',
            questions: [
                { date: "07 / 11 / 1908", ans: "The seventh of November, nineteen oh-eight" },
                { date: "24 / 03 / 2023", ans: "The twenty-fourth of March, twenty twenty-three" },
                { date: "01 / 12 / 2011", ans: "The first of December, twenty-eleven" },
                { date: "31 / 05 / 1956", ans: "The thirty-first of May, nineteen fifty-six" }
            ]
        }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        // تم تقليل وقت الأنيميشن لسرعة التنقل
        wrapper.style.cssText = `width:95%; max-width:1400px; text-align:center; animation: vetoQuickFade 0.2s ease-in;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <div style="font-size:2vw; color:#444; letter-spacing:15px; margin-bottom:10px; font-weight:bold;">${s.subtitle}</div>
                <h1 style="font-size:10vw; font-weight:900; color:${s.color}; margin:0; line-height:1;">${s.content}</h1>
                <div style="font-size:3.5vw; color:#fff; font-weight:bold; margin-top:40px; border-top:8px solid ${s.color}; display:inline-block; padding-top:15px;">${s.usage}</div>
            `;
        } 
        else if (s.type === 'grid-display') {
            wrapper.innerHTML = `
                <h2 style="font-size:4rem; color:#2ecc71; margin-bottom:30px; font-weight:900;">${s.title}</h2>
                <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:15px;">
                    ${s.items.map((m, i) => `
                        <div style="background:#111; padding:25px; border-radius:15px; font-size:2rem; border:2px solid ${i === subStep ? '#2ecc71' : '#222'}; color:${i <= subStep ? '#fff' : '#333'}; font-weight:bold; transition: 0.1s;">
                            <span style="display:block; font-size:1rem; opacity:0.4;">${(i+1).toString().padStart(2,'0')}</span>
                            ${m}
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'days-table') {
            wrapper.innerHTML = `
                <h2 style="font-size:4rem; color:#f1c40f; margin-bottom:30px; font-weight:900;">${s.title}</h2>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
                    ${s.groups.map((g, i) => `
                        <div style="background:#111; padding:35px; border-radius:20px; text-align:left; border-left:10px solid ${i === subStep ? '#f1c40f' : '#333'}; opacity:${i <= subStep ? 1 : 0.2};">
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <span style="font-size:4.5rem; font-weight:900; color:#f1c40f;">-${g.suffix}</span>
                                <span style="color:#555; font-size:1.5rem; font-weight:900;">${g.label}</span>
                            </div>
                            <div style="font-size:2.5rem; margin-top:10px; color:#fff; font-weight:bold;">${g.nums}</div>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'reading-rule') {
            wrapper.innerHTML = `
                <h2 style="font-size:5rem; color:#fff; margin-bottom:50px; font-weight:900;">YEARS</h2>
                <div style="background:#111; padding:60px; border-radius:40px; border:2px solid #222;">
                    <div style="font-size:9vw; font-weight:900; letter-spacing:20px; color:#f1c40f;">${s.example.split}</div>
                    <div style="font-size:4.5rem; margin-top:30px; color:#fff; font-weight:bold; opacity:${subStep >= 1 ? 1 : 0};">${s.example.text}</div>
                </div>
                <div style="margin-top:30px; font-size:2.5rem; color:#444; font-weight:bold; opacity:${subStep >= 1 ? 1 : 0};">2026 ➔ ${s.modern.text}</div>
            `;
        }
        else if (s.type === 'date-quiz') {
            let isAnswerVisible = subStep % 2 !== 0;
            let questionIdx = Math.floor(subStep / 2);
            let q = s.questions[questionIdx] || s.questions[s.questions.length-1];
            
            wrapper.innerHTML = `
                <div style="background:#111; padding:80px; border-radius:40px; border:4px solid #2ecc71;">
                    <div style="font-size:1.5rem; color:#444; margin-bottom:20px; font-weight:900; letter-spacing:5px;">PRACTICE 0${questionIdx+1}</div>
                    <div style="font-size:9vw; font-weight:900; margin-bottom:20px; color:#fff;">${q.date}</div>
                    <div style="font-size:3.5rem; color:#f1c40f; opacity:${isAnswerVisible ? 1 : 0}; font-weight:bold;">
                        ${q.ans}
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if (e.keyCode === 39 || e.keyCode === 13 || e.keyCode === 32) { 
            if (s.type === 'grid-display' && subStep < s.items.length - 1) subStep++;
            else if (s.type === 'days-table' && subStep < s.groups.length - 1) subStep++;
            else if (s.type === 'reading-rule' && subStep < 1) subStep++;
            else if (s.type === 'date-quiz' && subStep < (s.questions.length * 2) - 1) subStep++;
            else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
            else { if(window.triggerVetoDone) window.triggerVetoDone(); }
        } 
        else if (e.keyCode === 37) { 
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    const style = document.createElement('style');
    style.innerHTML = `@keyframes vetoQuickFade { from { opacity:0; } to { opacity:1; } }`;
    document.head.appendChild(style);

    render();
})();
