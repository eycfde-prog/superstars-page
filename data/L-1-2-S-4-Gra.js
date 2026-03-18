(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#050505; font-family:'Segoe UI', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'THE DATE', subtitle: 'MONTHS, DAYS & YEARS', color: '#2ecc71', usage: 'Mastering Time & Calendar' },

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

        /* 3: Ordinal Numbers (The "Days" Logic) */
        { 
            type: 'days-table', 
            title: 'Ordinal Numbers',
            desc: 'Used for days of the month (The 1st, The 2nd...)',
            groups: [
                { suffix: 'st', nums: "1st, 21st, 31st", label: "FIRST" },
                { suffix: 'nd', nums: "2nd, 22nd", label: "SECOND" },
                { suffix: 'rd', nums: "3rd, 23rd", label: "THIRD" },
                { suffix: 'th', nums: "4th, 11th, 20th...", label: "OTHERS" }
            ]
        },

        /* 4: Reading Years Rule */
        { 
            type: 'reading-rule', 
            title: 'How to read years?',
            example: { raw: "1999", split: "19 | 99", text: "Nineteen Ninety-Nine" },
            modern: { raw: "2024", text: "Twenty Twenty-Four" }
        },

        /* 5: Practice Session (Quiz Style) */
        { 
            type: 'date-quiz', 
            title: 'Practice Session',
            questions: [
                { date: "07 / 11 / 1908", ans: "The seventh of November, nineteen oh-eight" },
                { date: "24 / 03 / 2023", ans: "The twenty-fourth of March, twenty twenty-three" },
                { date: "01 / 12 / 2011", ans: "The first of December, twenty-eleven" },
                { date: "31 / 07 / 1956", ans: "The thirty-first of July, nineteen fifty-six" }
            ]
        }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:95%; max-width:1400px; text-align:center; animation: vetoFadeIn 0.5s ease;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <div style="font-size:2.5vw; color:#444; letter-spacing:15px; margin-bottom:20px; text-transform:uppercase; font-weight:bold;">${s.subtitle}</div>
                <h1 style="font-size:9vw; font-weight:900; color:${s.color}; margin:0; line-height:1; text-shadow: 0 10px 40px rgba(46,204,113,0.3);">${s.content}</h1>
                <div style="font-size:3.5vw; color:#fff; font-weight:bold; margin-top:50px; border-top:6px solid ${s.color}; display:inline-block; padding-top:20px;">${s.usage}</div>
            `;
        } 
        else if (s.type === 'grid-display') {
            wrapper.innerHTML = `
                <h2 style="font-size:4rem; color:#2ecc71; margin-bottom:40px; font-weight:900;">${s.title}</h2>
                <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:20px;">
                    ${s.items.map((m, i) => `
                        <div style="background:#111; padding:30px; border-radius:20px; font-size:2.2rem; border:3px solid ${i <= subStep ? '#2ecc71' : '#222'}; color:${i <= subStep ? '#fff' : '#444'}; transition:0.3s; transform: scale(${i === subStep ? 1.05 : 1}); font-weight:bold;">
                            <span style="display:block; font-size:1.2rem; opacity:0.5; margin-bottom:10px;">${(i+1).toString().padStart(2,'0')}</span>
                            ${m}
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'days-table') {
            wrapper.innerHTML = `
                <h2 style="font-size:5rem; color:#f1c40f; margin-bottom:10px; font-weight:900;">${s.title}</h2>
                <p style="font-size:2.2rem; color:#555; margin-bottom:50px; font-weight:bold;">${s.desc}</p>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:30px;">
                    ${s.groups.map((g, i) => `
                        <div style="background:#111; padding:45px; border-radius:30px; text-align:left; border-left:15px solid #f1c40f; opacity:${i <= subStep ? 1 : 0.15}; transition:0.5s; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <span style="font-size:5rem; font-weight:900; color:#f1c40f;">-${g.suffix}</span>
                                <span style="background:#222; padding:10px 25px; border-radius:15px; font-size:1.5rem; color:#888; font-weight:900;">${g.label}</span>
                            </div>
                            <div style="font-size:3rem; margin-top:20px; color:#fff; font-weight:bold;">${g.nums}</div>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'reading-rule') {
            wrapper.innerHTML = `
                <h2 style="font-size:5.5rem; color:#fff; margin-bottom:60px; font-weight:900;">READING YEARS</h2>
                <div style="background:#111; padding:80px; border-radius:50px; width:100%; border:4px dashed #333; box-shadow: inset 0 0 50px rgba(0,0,0,0.8);">
                    <div style="font-size:8vw; font-weight:900; letter-spacing:30px; color:#f1c40f; text-shadow: 0 0 30px rgba(241,196,15,0.3);">${s.example.split}</div>
                    <div style="font-size:4rem; margin-top:40px; color:#fff; font-weight:bold; opacity:${subStep >= 1 ? 1 : 0}; transition: 0.5s;">${s.example.text}</div>
                </div>
                <div style="margin-top:40px; font-size:2.5rem; color:#444; font-weight:bold; opacity:${subStep >= 1 ? 1 : 0};">Modern: 2024 ➔ ${s.modern.text}</div>
            `;
        }
        else if (s.type === 'date-quiz') {
            let isAnswerVisible = subStep % 2 !== 0;
            let questionIdx = Math.floor(subStep / 2);
            let q = s.questions[questionIdx] || s.questions[s.questions.length-1];
            
            wrapper.innerHTML = `
                <h2 style="font-size:4rem; color:#2ecc71; margin-bottom:50px; font-weight:900;">${s.title}</h2>
                <div style="background:#111; padding:80px; border-radius:50px; border:4px solid #222; position:relative; box-shadow: 0 20px 60px rgba(0,0,0,0.7);">
                    <div style="position:absolute; top:30px; left:40px; color:#333; font-weight:900; font-size:1.5rem; letter-spacing:3px;">CARD 0${questionIdx+1}</div>
                    <div style="font-size:8vw; font-weight:900; margin-bottom:30px; color:#fff; letter-spacing:10px;">${q.date}</div>
                    <div style="height:4px; background:linear-gradient(90deg, transparent, #333, transparent); width:70%; margin:40px auto;"></div>
                    <div style="font-size:3.5vw; color:#f1c40f; transition:0.4s; opacity:${isAnswerVisible ? 1 : 0}; transform: translateY(${isAnswerVisible ? 0 : 30}px); font-weight:bold; line-height:1.2;">
                        ${q.ans}
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        // Next logic (Right, Enter, Space)
        if (e.keyCode === 39 || e.keyCode === 13 || e.keyCode === 32) { 
            if (s.type === 'grid-display' && subStep < s.items.length - 1) subStep++;
            else if (s.type === 'days-table' && subStep < s.groups.length - 1) subStep++;
            else if (s.type === 'reading-rule' && subStep < 1) subStep++;
            else if (s.type === 'date-quiz' && subStep < (s.questions.length * 2) - 1) subStep++;
            else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
            else { if(window.triggerVetoDone) window.triggerVetoDone(); }
        } 
        // Back logic (Left)
        else if (e.keyCode === 37) { 
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    const style = document.createElement('style');
    style.innerHTML = `@keyframes vetoFadeIn { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }`;
    document.head.appendChild(style);

    render();
})();
