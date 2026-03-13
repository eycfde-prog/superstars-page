(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:calc(100vh - 200px); overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#0f0f0f; font-family:'Poppins', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'big-title', content: 'THE DATE', color: '#2ecc71' },

        /* 2: Months of the Year */
        { 
            type: 'grid-display', 
            title: 'Months of the Year',
            items: [
                "January (1)", "February (2)", "March (3)", "April (4)",
                "May (5)", "June (6)", "July (7)", "August (8)",
                "September (9)", "October (10)", "November (11)", "December (12)"
            ] 
        },

        /* 3: Ordinal Numbers (Days) */
        { 
            type: 'days-table', 
            title: 'Days of the Month',
            desc: 'We use Ordinal Numbers for dates',
            groups: [
                { suffix: 'st', nums: "1st, 21st, 31st" },
                { suffix: 'nd', nums: "2nd, 22nd" },
                { suffix: 'rd', nums: "3rd, 23rd" },
                { suffix: 'th', nums: "All other days (4th, 11th...)" }
            ]
        },

        /* 4: Years Reading Rule */
        { 
            type: 'big-title', 
            content: 'Reading Years<br><span style="font-size:3rem; color:#f1c40f;">Split the year: 19 | 99 ➞ Nineteen Ninety-Nine</span>', 
            color: '#fff' 
        },

        /* 5: Exercise Time (From PPT) */
        { 
            type: 'date-quiz', 
            title: 'Exercise Time',
            questions: [
                { date: "7/11/1908", ans: "Seventh of November 1908" },
                { date: "24/3/2023", ans: "Twenty-fourth of March 2023" },
                { date: "1/12/2011", ans: "First of December 2011" },
                { date: "31/7/1956", ans: "Thirty-first of July 1956" },
                { date: "11/9/1977", ans: "Eleventh of September 1977" }
            ]
        }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:90%; text-align:center;`;

        if (s.type === 'big-title') {
            wrapper.innerHTML = `<h1 style="font-size:8rem; font-weight:900; color:${s.color}; line-height:1.2;">${s.content}</h1>`;
        } 
        else if (s.type === 'grid-display') {
            wrapper.innerHTML = `
                <h2 style="font-size:3.5rem; color:#2ecc71; margin-bottom:30px;">${s.title}</h2>
                <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:15px; text-align:center;">
                    ${s.items.map((m, i) => `
                        <div style="background:#1e1e1e; padding:20px; border-radius:10px; font-size:1.8rem; border:1px solid #333; opacity:${i <= subStep ? 1 : 0}; transition:0.3s;">
                            ${m}
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'days-table') {
            wrapper.innerHTML = `
                <h2 style="font-size:3.5rem; color:#f1c40f; margin-bottom:10px;">${s.title}</h2>
                <p style="font-size:1.5rem; color:#888; margin-bottom:30px;">${s.desc}</p>
                <div style="display:flex; flex-direction:column; gap:15px; text-align:left;">
                    ${s.groups.map((g, i) => `
                        <div style="background:#1e1e1e; padding:20px; border-radius:15px; display:flex; align-items:center; gap:30px; opacity:${i <= subStep ? 1 : 0}; transition:0.4s;">
                            <div style="font-size:3rem; font-weight:900; color:#f1c40f; width:80px;">-${g.suffix}</div>
                            <div style="font-size:2rem;">${g.nums}</div>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'date-quiz') {
            let q = s.questions[subStep] || s.questions[s.questions.length-1];
            wrapper.innerHTML = `
                <h2 style="font-size:4rem; color:#2ecc71; margin-bottom:40px;">${s.title}</h2>
                <div style="background:#1e1e1e; padding:60px; border-radius:30px; border-left:15px solid #2ecc71;">
                    <div style="font-size:5rem; font-weight:bold; margin-bottom:30px; color:#fff;">${q.date}</div>
                    <div style="font-size:3rem; color:#f1c40f; min-height:60px; transition:0.3s; filter:blur(${subStep % 2 === 0 ? '10px' : '0'});">
                        ➞ ${q.ans}
                    </div>
                </div>
                <p style="margin-top:20px; color:#666;">Click to reveal answer</p>`;
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
        } else if (e.keyCode === 37) { // Back
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    render();
})();