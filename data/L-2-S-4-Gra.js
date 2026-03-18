(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#050505; font-family:'Segoe UI', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'TELLING THE DATE', subtitle: 'MONTHS, DAYS & YEARS', color: '#2ecc71', usage: 'Mastering Time Expression' },

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
            desc: 'We use these for Days of the Month',
            groups: [
                { suffix: 'ST', nums: "1st, 21st, 31st", label: "First" },
                { suffix: 'ND', nums: "2nd, 22nd", label: "Second" },
                { suffix: 'RD', nums: "3rd, 23rd", label: "Third" },
                { suffix: 'TH', nums: "4th, 11th, 20th...", label: "All Others" }
            ]
        },

        /* 4: Reading Years Rule */
        { 
            type: 'reading-rule', 
            title: 'How to Read Years?',
            desc: 'Split the year into two parts!',
            example: { part1: "19", part2: "99", text: "Nineteen Ninety-Nine" },
            modern: { part1: "20", part2: "24", text: "Twenty Twenty-Four" }
        },

        /* 5: The Quiz */
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
                <h2 style="font-size:5rem; color:#2ecc71; margin-bottom:40px; font-weight:900;">${s.title}</h2>
                <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:20px; max-width:1100px; margin:0 auto;">
                    ${s.items.map((m, i) => {
                        let active = i <= subStep;
                        return `
                        <div style="background:${active ? '#2ecc71' : '#111'}; padding:35px 10px; border-radius:25px; font-size:2.2rem; font-weight:bold; border:3px solid ${active ? '#fff' : '#222'}; color:${active ? '#000' : '#444'}; transition:0.4s; transform: scale(${i === subStep ? 1.1 : 1});">
                            <span style="display:block; font-size:1.2rem; opacity:0.6; margin-bottom:10px;">${(i+1).toString().padStart(2,'0')}</span>
                            ${m}
                        </div>`;
                    }).join('')}
                </div>`;
        }
        else if (s.type === 'days-table') {
            wrapper.innerHTML = `
                <h2 style="font-size:5.5rem; color:#f1c40f; margin-bottom:10px; font-weight:900;">${s.title}</h2>
                <p style="font-size:2.5rem; color:#555; margin-bottom:40px; font-weight:bold;">${s.desc}</p>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:30px;">
                    ${s.groups.map((g, i) => `
                        <div style="background:#111; padding:40px; border-radius:35px; text-align:left; border-left:15px solid #f1c40f; opacity:${i <= subStep ? 1 : 0.1}; transition:0.5s; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <span style="font-size:6rem; font-weight:900; color:#f1c40f;">-${g.suffix}</span>
                                <span style="background:#f1c40f; color:#000; padding:10px 25px; border-radius:15px; font-size:1.8rem; font-weight:900;">${g.label}</span>
                            </div>
                            <div style="font-size:2.8rem; margin-top:20px; color:#fff; font-weight:bold;">${g.nums}</div>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'reading-rule') {
            wrapper.innerHTML = `
                <h2 style="font-size:5.5rem; color:#fff; margin-bottom:10px; font-weight:900;">${s.title}</h2>
                <p style="font-size:2.5rem; color:#2ecc71; margin-bottom:50px; font-weight:bold;">${s.desc}</p>
                <div style="display:flex; flex-direction:column; gap:40px; align-items:center;">
                    <div style="background:#111; padding:60px; border-radius:40px; width:80%; border:4px dashed #333; position:relative;">
                        <div style="display:flex; justify-content:center; align-items:center; gap:40px;">
                            <span style="font-size:8vw; font-weight:900; color:#f1c40f;">${s.example.part1}</span>
                            <span style="font-size:8vw; font-weight:900; color:#444;">|</span>
                            <span style="font-size:8vw; font-weight:900; color:#f1c40f;">${s.example.part2}</span>
                        </div>
                        <div style="font-size:4rem; margin-top:30px; color:#fff; font-weight:bold; border-top:2px solid #222; padding-top:30px;">${s.example.text}</div>
                    </div>
                </div>`;
        }
        else if (s.type === 'date-quiz') {
            let isAnswerVisible = subStep % 2 !== 0;
            let questionIdx = Math.floor(subStep / 2);
            let q = s.questions[questionIdx] || s.questions[s.questions.length-1];
            
            wrapper.innerHTML = `
                <h2 style="font-size:5rem; color:#2ecc71; margin-bottom:40px; font-weight:900;">${s.title}</h2>
                <div style="background:#111; padding:80px; border-radius:50px; border:3px solid #222; position:relative; box-shadow: 0 20px 60px rgba(0,0,0,0.8);">
                    <div style="position:absolute; top:30px; left:40px; color:#333; font-size:1.5rem; font-weight:bold; letter-spacing:3px;">DATE CHALLENGE 0${questionIdx+1}</div>
                    <div style="font-size:8vw; font-weight:900; margin-bottom:30px; color:#fff; letter-spacing:10px; text-shadow: 0 0 30px rgba(255,255,255,0.1);">${q.date}</div>
                    <div style="height:4px; background:linear-gradient(90deg, transparent, #2ecc71, transparent); width:70%; margin:50px auto;"></div>
                    <div style="font-size:3.5vw; color:#f1c40f; transition:0.5s; opacity:${isAnswerVisible ? 1 : 0}; transform: translateY(${isAnswerVisible ? 0 : 30}px); font-weight:bold; line-height:1.2;">
                        <span style="color:#555; display:block; font-size:2rem; margin-bottom:10px;">How to say it:</span> 
                        "${q.ans}"
                    </div>
                </div>
                <p style="margin-top:50px; color:#444; letter-spacing:4px; text-transform:uppercase; font-size:1.2rem; font-weight:bold; animation: pulse 2s infinite;">Press SPACE to reveal / ARROWS to navigate</p>`;
        }

        container.appendChild(wrapper);
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if (e.keyCode === 39 || e.keyCode === 13 || e.keyCode === 32) { 
            if (s.type === 'grid-display' && subStep < s.items.length - 1) subStep++;
            else if (s.type === 'days-table' && subStep < s.groups.length - 1) subStep++;
            else if (s.type === 'date-quiz' && subStep < (s.questions.length * 2) - 1) subStep++;
            else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
            else { if(window.triggerVetoDone) window.triggerVetoDone(); }
        } else if (e.keyCode === 37) { 
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes vetoFadeIn { from { opacity:0; transform:scale(0.9); } to { opacity:1; transform:scale(1); } }
        @keyframes pulse { 0% { opacity: 0.3; } 50% { opacity: 1; } 100% { opacity: 0.3; } }
    `;
    document.head.appendChild(style);

    render();
})();
