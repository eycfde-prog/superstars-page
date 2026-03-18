(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#050505; font-family:'Segoe UI', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Intro */
        { type: 'big-title', content: 'THE DATE', subtitle: 'Months, Ordinals & Years', color: '#2ecc71' },

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
            title: 'Ordinal Numbers',
            desc: 'We use these for DAYS of the month',
            groups: [
                { suffix: 'st', nums: "1st, 21st, 31st", label: "First" },
                { suffix: 'nd', nums: "2nd, 22nd", label: "Second" },
                { suffix: 'rd', nums: "3rd, 23rd", label: "Third" },
                { suffix: 'th', nums: "4th, 10th, 11th, 20th...", label: "The rest" }
            ]
        },

        /* 4: Years Rule */
        { 
            type: 'reading-rule', 
            title: 'Reading Years',
            example: { part1: "19", part2: "95", full: "Nineteen Ninety-Five" },
            modern: { full: "2024", text: "Two Thousand Twenty-Four" }
        },

        /* 5: Advanced Quiz */
        { 
            type: 'date-quiz', 
            title: 'How do we say it?',
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
        wrapper.style.cssText = `width:90%; max-width:1200px; text-align:center; animation: vetoFadeIn 0.4s ease-out;`;

        if (s.type === 'big-title') {
            wrapper.innerHTML = `
                <h1 style="font-size:10vw; font-weight:900; color:${s.color}; margin:0; line-height:1;">${s.content}</h1>
                <p style="font-size:2.5vw; color:#444; letter-spacing:15px; margin-top:30px; font-weight:bold;">${s.subtitle}</p>
            `;
        } 
        else if (s.type === 'grid-display') {
            wrapper.innerHTML = `
                <h2 style="font-size:4rem; color:#2ecc71; margin-bottom:50px; font-weight:900;">${s.title}</h2>
                <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:20px;">
                    ${s.items.map((m, i) => {
                        const active = i <= subStep;
                        return `
                        <div style="background:${active ? '#2ecc71' : '#111'}; padding:30px 10px; border-radius:20px; font-size:2rem; font-weight:bold; border:2px solid ${active ? '#2ecc71' : '#222'}; color:${active ? '#000' : '#444'}; transition:0.3s; transform: scale(${i === subStep ? 1.1 : 1});">
                            <span style="display:block; font-size:1rem; opacity:0.6; margin-bottom:10px;">${(i+1).toString().padStart(2,'0')}</span>
                            ${m}
                        </div>`;
                    }).join('')}
                </div>`;
        }
        else if (s.type === 'days-table') {
            wrapper.innerHTML = `
                <h2 style="font-size:4.5rem; color:#f1c40f; margin-bottom:10px; font-weight:900;">${s.title}</h2>
                <p style="font-size:2rem; color:#555; margin-bottom:50px; font-weight:bold;">${s.desc}</p>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:30px;">
                    ${s.groups.map((g, i) => `
                        <div style="background:#111; padding:40px; border-radius:30px; text-align:left; border-left:12px solid #f1c40f; opacity:${i <= subStep ? 1 : 0.05}; transition:0.5s; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <span style="font-size:4.5rem; font-weight:900; color:#f1c40f;">-${g.suffix}</span>
                                <span style="background:#f1c40f; color:#000; padding:5px 20px; border-radius:10px; font-size:1.2rem; font-weight:bold;">${g.label}</span>
                            </div>
                            <div style="font-size:2.5rem; margin-top:15px; color:#fff; font-weight:bold;">${g.nums}</div>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'reading-rule') {
            wrapper.innerHTML = `
                <h2 style="font-size:5rem; color:#fff; margin-bottom:60px; font-weight:900;">Reading Years</h2>
                <div style="display:flex; flex-direction:column; gap:40px; align-items:center;">
                    <div style="background:#111; padding:60px; border-radius:40px; width:100%; border:4px solid #333; box-shadow: 0 20px 50px rgba(0,0,0,0.8);">
                        <div style="display:flex; justify-content:center; gap:40px; font-size:8vw; font-weight:900; letter-spacing:10px;">
                            <span style="color:#2ecc71;">${s.example.part1}</span>
                            <span style="color:#444;">|</span>
                            <span style="color:#f1c40f;">${s.example.part2}</span>
                        </div>
                        <div style="font-size:3.5rem; margin-top:40px; color:#fff; font-weight:bold; border-top:2px solid #222; padding-top:30px;">
                           ${s.example.full}
                        </div>
                    </div>
                </div>`;
        }
        else if (s.type === 'date-quiz') {
            let isAnswerVisible = subStep % 2 !== 0;
            let questionIdx = Math.floor(subStep / 2);
            let q = s.questions[questionIdx] || s.questions[s.questions.length-1];
            
            wrapper.innerHTML = `
                <h2 style="font-size:3.5rem; color:#2ecc71; margin-bottom:50px; font-weight:900;">PRACTICE SESSION</h2>
                <div style="background:#111; padding:80px; border-radius:50px; border:3px solid #222; position:relative; box-shadow: 0 30px 60px rgba(0,0,0,0.8);">
                    <div style="position:absolute; top:30px; left:40px; color:#444; font-weight:bold; font-size:1.5rem;">DATE #${questionIdx+1}</div>
                    <div style="font-size:7vw; font-weight:900; margin-bottom:40px; color:#fff; letter-spacing:8px;">${q.date}</div>
                    <div style="height:4px; background:linear-gradient(90deg, transparent, #2ecc71, transparent); width:70%; margin:40px auto;"></div>
                    <div style="font-size:3.5rem; color:#f1c40f; transition:0.5s; opacity:${isAnswerVisible ? 1 : 0}; transform: translateY(${isAnswerVisible ? 0 : 30}px); font-weight:bold;">
                        ${q.ans}
                    </div>
                </div>
                <p style="margin-top:50px; color:#444; letter-spacing:3px; font-weight:bold;">SPACE: SHOW ANSWER | ARROWS: NEXT DATE</p>`;
        }

        container.appendChild(wrapper);
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        // Right or Space or Enter
        if (e.keyCode === 39 || e.keyCode === 32 || e.keyCode === 13) {
            if (s.type === 'grid-display' && subStep < s.items.length - 1) subStep++;
            else if (s.type === 'days-table' && subStep < s.groups.length - 1) subStep++;
            else if (s.type === 'date-quiz' && subStep < (s.questions.length * 2) - 1) subStep++;
            else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
            else { if(window.triggerVetoDone) window.triggerVetoDone(); }
        } 
        // Left
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
