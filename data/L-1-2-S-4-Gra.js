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

        /* 3: Ordinal Numbers */
        { 
            type: 'days-table', 
            title: 'The Day Logic',
            desc: 'Use Ordinal Numbers (The 1st, 2nd, 3rd...)',
            groups: [
                { suffix: 'st', nums: "1st, 21st, 31st", label: "FIRST" },
                { suffix: 'nd', nums: "2nd, 22nd", label: "SECOND" },
                { suffix: 'rd', nums: "3rd, 23rd", label: "THIRD" },
                { suffix: 'th', nums: "4th, 11th, 20th...", label: "THE REST" }
            ]
        },

        /* 4: Reading Years Rule */
        { 
            type: 'reading-rule', 
            title: 'Reading Years',
            example: { raw: "1995", split: "19 | 95", text: "Nineteen Ninety-Five" },
            modern: { raw: "2026", text: "Twenty Twenty-Six" }
        },

        /* 5: Prepositions of Time */
        {
            type: 'prep-focus',
            title: 'IN vs ON',
            rules: [
                { prep: 'IN', use: 'Months & Years', ex: 'In March / In 2024', color: '#3498db' },
                { prep: 'ON', use: 'Full Dates & Days', ex: 'On March 1st / On Friday', color: '#e67e22' }
            ]
        },

        /* 6: Date Quiz (Practice) */
        { 
            type: 'date-quiz', 
            title: 'Can you read it?',
            questions: [
                { date: "15 / 05 / 1990", ans: "The fifteenth of May, nineteen ninety" },
                { date: "02 / 01 / 2025", ans: "The second of January, twenty twenty-five" },
                { date: "21 / 09 / 1850", ans: "The twenty-first of September, eighteen fifty" },
                { date: "04 / 07 / 1776", ans: "The fourth of July, seventeen seventy-six" }
            ]
        },

        { type: 'title', content: 'TIME MASTER!', subtitle: 'EXCELLENT WORK', color: '#f1c40f', usage: 'YOU ARE READY FOR ANY DATE!' }
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
                <h2 style="font-size:5rem; color:#2ecc71; margin-bottom:50px; font-weight:900;">MONTHS</h2>
                <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:25px;">
                    ${s.items.map((m, i) => `
                        <div style="background:#111; padding:35px; border-radius:30px; font-size:2.5rem; border:4px solid ${i <= subStep ? '#2ecc71' : '#222'}; color:${i <= subStep ? '#fff' : '#444'}; transition:0.3s; transform: scale(${i === subStep ? 1.05 : 1}); font-weight:bold; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                            <span style="display:block; font-size:1.5rem; opacity:0.3; margin-bottom:10px;">${(i+1).toString().padStart(2,'0')}</span>
                            ${m}
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'days-table') {
            wrapper.innerHTML = `
                <h2 style="font-size:5.5rem; color:#f1c40f; margin-bottom:10px; font-weight:900;">ORDINAL NUMBERS</h2>
                <p style="font-size:2.5rem; color:#555; margin-bottom:50px; font-weight:bold;">${s.desc}</p>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:35px;">
                    ${s.groups.map((g, i) => `
                        <div style="background:#111; padding:50px; border-radius:40px; text-align:left; border-left:18px solid #f1c40f; opacity:${i <= subStep ? 1 : 0.1}; transition:0.5s; box-shadow: 0 15px 40px rgba(0,0,0,0.6);">
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <span style="font-size:6rem; font-weight:900; color:#f1c40f;">-${g.suffix}</span>
                                <span style="background:#222; padding:12px 30px; border-radius:20px; font-size:2rem; color:#888; font-weight:900; letter-spacing:3px;">${g.label}</span>
                            </div>
                            <div style="font-size:3.5rem; margin-top:20px; color:#fff; font-weight:bold; letter-spacing:2px;">${g.nums}</div>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'reading-rule') {
            wrapper.innerHTML = `
                <h2 style="font-size:5.5rem; color:#fff; margin-bottom:60px; font-weight:900;">READING YEARS</h2>
                <div style="background:#111; padding:100px; border-radius:60px; width:100%; border:5px dashed #333; box-shadow: inset 0 0 70px rgba(0,0,0,0.9);">
                    <div style="font-size:10vw; font-weight:900; letter-spacing:40px; color:#f1c40f; text-shadow: 0 0 50px rgba(241,196,15,0.4);">${s.example.split}</div>
                    <div style="font-size:5rem; margin-top:50px; color:#fff; font-weight:bold; opacity:${subStep >= 1 ? 1 : 0}; transition: 0.5s; background:#222; display:inline-block; padding:15px 50px; border-radius:20px;">${s.example.text}</div>
                </div>
                <div style="margin-top:50px; font-size:3rem; color:#555; font-weight:bold; opacity:${subStep >= 1 ? 1 : 0};">Modern Rule: 2026 ➔ <span style="color:#2ecc71">${s.modern.text}</span></div>
            `;
        }
        else if (s.type === 'prep-focus') {
            wrapper.innerHTML = `
                <h2 style="font-size:5.5rem; color:#fff; margin-bottom:50px; font-weight:900;">TIME PREPOSITIONS</h2>
                <div style="display:flex; gap:40px; justify-content:center;">
                    ${s.rules.map(r => `
                        <div style="background:#111; flex:1; padding:60px; border-radius:40px; border-top:20px solid ${r.color}; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
                            <div style="font-size:7rem; font-weight:900; color:${r.color}; margin-bottom:20px;">${r.prep}</div>
                            <div style="font-size:2.2rem; color:#fff; font-weight:bold; margin-bottom:30px; min-height:60px;">${r.use}</div>
                            <div style="font-size:2rem; color:#666; font-style:italic; background:#050505; padding:20px; border-radius:15px; border:1px solid #222;">${r.ex}</div>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'date-quiz') {
            let isAnswerVisible = subStep % 2 !== 0;
            let questionIdx = Math.floor(subStep / 2);
            let q = s.questions[questionIdx] || s.questions[s.questions.length-1];
            
            wrapper.innerHTML = `
                <h2 style="font-size:5rem; color:#2ecc71; margin-bottom:50px; font-weight:900;">PRACTICE TIME</h2>
                <div style="background:#111; padding:100px; border-radius:60px; border:5px solid #222; position:relative; box-shadow: 0 30px 80px rgba(0,0,0,0.8);">
                    <div style="position:absolute; top:40px; left:50px; color:#2ecc71; font-weight:900; font-size:2rem; letter-spacing:5px;">QUESTION ${questionIdx+1}</div>
                    <div style="font-size:9vw; font-weight:900; margin-bottom:40px; color:#fff; letter-spacing:15px;">${q.date}</div>
                    <div style="height:6px; background:linear-gradient(90deg, transparent, #333, transparent); width:80%; margin:50px auto;"></div>
                    <div style="font-size:4vw; color:#f1c40f; transition:0.5s; opacity:${isAnswerVisible ? 1 : 0}; transform: translateY(${isAnswerVisible ? 0 : 40}px); font-weight:900; line-height:1.2; text-transform:uppercase;">
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
    style.innerHTML = `@keyframes vetoFadeIn { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }`;
    document.head.appendChild(style);

    render();
})();
