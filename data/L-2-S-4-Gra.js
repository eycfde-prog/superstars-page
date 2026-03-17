(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#050505; font-family:'Segoe UI', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        { type: 'big-title', content: 'THE DATE', subtitle: 'Months, Days & Years', color: '#2ecc71' },

        { 
            type: 'grid-display', 
            title: 'Months of the Year',
            items: [
                "January", "February", "March", "April",
                "May", "June", "July", "August",
                "September", "October", "November", "December"
            ] 
        },

        { 
            type: 'days-table', 
            title: 'Ordinal Numbers',
            desc: 'Used for days of the month',
            groups: [
                { suffix: 'st', nums: "1st, 21st, 31st", label: "First" },
                { suffix: 'nd', nums: "2nd, 22nd", label: "Second" },
                { suffix: 'rd', nums: "3rd, 23rd", label: "Third" },
                { suffix: 'th', nums: "4th, 11th, 15th, 20th...", label: "All Others" }
            ]
        },

        { 
            type: 'reading-rule', 
            title: 'Reading Years',
            example: { raw: "1999", split: "19 | 99", text: "Nineteen Ninety-Nine" },
            modern: { raw: "2024", text: "Two Thousand Twenty-Four" }
        },

        { 
            type: 'date-quiz', 
            title: 'Practice Session',
            questions: [
                { date: "07 / 11 / 1908", ans: "The seventh of November, nineteen oh-eight" },
                { date: "24 / 03 / 2023", ans: "The twenty-fourth of March, twenty twenty-three" },
                { date: "01 / 12 / 2011", ans: "The first of December, twenty-eleven" },
                { date: "31 / 07 / 1956", ans: "The thirty-first of July, nineteen fifty-six" },
                { date: "11 / 09 / 1977", ans: "The eleventh of September, nineteen seventy-seven" }
            ]
        }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:85%; text-align:center; animation: vetoFadeIn 0.5s ease;`;

        if (s.type === 'big-title') {
            wrapper.innerHTML = `
                <h1 style="font-size:8vw; font-weight:900; color:${s.color}; margin:0;">${s.content}</h1>
                <p style="font-size:2vw; color:#555; letter-spacing:10px; margin-top:20px;">${s.subtitle}</p>
            `;
        } 
        else if (s.type === 'grid-display') {
            wrapper.innerHTML = `
                <h2 style="font-size:3rem; color:#2ecc71; margin-bottom:40px; letter-spacing:3px;">${s.title}</h2>
                <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:20px;">
                    ${s.items.map((m, i) => `
                        <div style="background:#111; padding:25px; border-radius:15px; font-size:1.8rem; border:2px solid ${i <= subStep ? '#2ecc71' : '#222'}; color:${i <= subStep ? '#fff' : '#444'}; transition:0.3s; transform: scale(${i === subStep ? 1.05 : 1});">
                            <span style="display:block; font-size:0.9rem; opacity:0.5; margin-bottom:5px;">${(i+1).toString().padStart(2,'0')}</span>
                            ${m}
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'days-table') {
            wrapper.innerHTML = `
                <h2 style="font-size:3rem; color:#f1c40f; margin-bottom:10px;">${s.title}</h2>
                <p style="font-size:1.5rem; color:#555; margin-bottom:40px;">${s.desc}</p>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
                    ${s.groups.map((g, i) => `
                        <div style="background:#111; padding:30px; border-radius:20px; text-align:left; border-left:8px solid #f1c40f; opacity:${i <= subStep ? 1 : 0.1}; transition:0.5s;">
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <span style="font-size:3.5rem; font-weight:900; color:#f1c40f;">-${g.suffix}</span>
                                <span style="background:#222; padding:5px 15px; border-radius:10px; font-size:0.8rem; color:#888;">${g.label}</span>
                            </div>
                            <div style="font-size:1.8rem; margin-top:10px; color:#ddd;">${g.nums}</div>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'reading-rule') {
            wrapper.innerHTML = `
                <h2 style="font-size:3.5rem; color:#fff; margin-bottom:50px;">How to read years?</h2>
                <div style="display:flex; flex-direction:column; gap:30px; align-items:center;">
                    <div style="background:#111; padding:40px; border-radius:30px; width:100%; border:2px dashed #444;">
                        <div style="font-size:5rem; font-weight:900; letter-spacing:15px; color:#f1c40f;">${s.example.split}</div>
                        <div style="font-size:2.5rem; margin-top:20px; color:#fff;">${s.example.text}</div>
                    </div>
                </div>`;
        }
        else if (s.type === 'date-quiz') {
            let isAnswerVisible = subStep % 2 !== 0;
            let questionIdx = Math.floor(subStep / 2);
            let q = s.questions[questionIdx] || s.questions[s.questions.length-1];
            
            wrapper.innerHTML = `
                <h2 style="font-size:2.5rem; color:#2ecc71; margin-bottom:40px;">${s.title}</h2>
                <div style="background:#111; padding:60px; border-radius:40px; position:relative; overflow:hidden;">
                    <div style="position:absolute; top:20px; left:30px; color:#333; font-weight:bold;">DATE ID: 0${questionIdx+1}</div>
                    <div style="font-size:6vw; font-weight:900; margin-bottom:20px; color:#fff; letter-spacing:5px;">${q.date}</div>
                    <div style="height:2px; background:#222; width:50%; margin:40px auto;"></div>
                    <div style="font-size:2.5vw; color:#f1c40f; transition:0.4s; opacity:${isAnswerVisible ? 1 : 0}; transform: translateY(${isAnswerVisible ? 0 : 20}px);">
                        <span style="color:#555; margin-right:15px;">Read as:</span> ${q.ans}
                    </div>
                </div>
                <p style="margin-top:30px; color:#444; letter-spacing:2px; text-transform:uppercase; font-size:0.8rem;">Press Space to reveal answer / Arrows to move</p>`;
        }

        container.appendChild(wrapper);
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if (e.keyCode === 39 || e.keyCode === 13 || e.keyCode === 32) { // Next
            if (s.type === 'grid-display' && subStep < s.items.length - 1) subStep++;
            else if (s.type === 'days-table' && subStep < s.groups.length - 1) subStep++;
            else if (s.type === 'date-quiz' && subStep < (s.questions.length * 2) - 1) subStep++;
            else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
            else if (currentSlide === slides.length - 1) { if(window.triggerVetoDone) window.triggerVetoDone(); }
        } else if (e.keyCode === 37) { // Back
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    const style = document.createElement('style');
    style.innerHTML = `@keyframes vetoFadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }`;
    document.head.appendChild(style);

    render();
})();
