(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // الإعداد الأساسي للخلفية
    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#050505; font-family:'Segoe UI', sans-serif; direction:ltr; color:white;`;

    let currentSlide = -1; 
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

        /* 4: How to Say the Date (NEW) */
        {
            type: 'how-to-say',
            title: 'How to Read the Date',
            write: '12 May',
            say: "The <span style='color:#f1c40f;'>twelfth</span> of May",
            rule: "We write numbers, but we SAY 'The' + 'Ordinal Number' + 'of'"
        },

        /* 5: Years Rule */
        { 
            type: 'reading-rule', 
            title: 'How to Read Years',
            example: { raw: "1995", split: "19 | 95", text: "Nineteen Ninety-Five" },
            modern: { raw: "2026", text: "Twenty Twenty-Six" }
        },

        /* 6: 10 Quiz Questions */
        { 
            type: 'date-quiz', 
            title: 'Read the Date',
            questions: [
                { date: "07 / 11 / 1908", ans: "The seventh of November, nineteen oh-eight" },
                { date: "24 / 03 / 2023", ans: "The twenty-fourth of March, twenty twenty-three" },
                { date: "01 / 12 / 2011", ans: "The first of December, twenty-eleven" },
                { date: "15 / 08 / 1999", ans: "The fifteenth of August, nineteen ninety-nine" },
                { date: "02 / 02 / 2022", ans: "The second of February, twenty twenty-two" },
                { date: "10 / 06 / 1850", ans: "The tenth of June, eighteen fifty" },
                { date: "21 / 01 / 2000", ans: "The twenty-first of January, two thousand" },
                { date: "31 / 05 / 1956", ans: "The thirty-first of May, nineteen fifty-six" },
                { date: "03 / 09 / 2026", ans: "The third of September, twenty twenty-six" },
                { date: "19 / 07 / 1945", ans: "The nineteenth of July, nineteen forty-five" }
            ]
        },

        /* 7: Conclusion */
        { 
            type: 'title', 
            content: 'DATE MASTER!', 
            subtitle: 'You can now read any calendar!', 
            color: '#c5a059',
            usage: 'Excellent Work!'
        }
    ];

    function updateSubSteps() {
        const s = slides[currentSlide];
        if (!s) return;

        // تحديث ظهور العناصر التدريجية
        const items = container.querySelectorAll('.step-element');
        items.forEach((item, i) => {
            if (i <= subStep) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
                if (item.classList.contains('month-box')) item.style.borderColor = '#2ecc71';
            } else {
                item.style.opacity = '0.1';
                item.style.transform = 'translateY(10px)';
                if (item.classList.contains('month-box')) item.style.borderColor = '#222';
            }
        });

        // التعامل الخاص مع شريحة السنوات
        if (s.type === 'reading-rule' || s.type === 'how-to-say') {
            const hiddenElements = container.querySelectorAll('.reveal-on-step');
            hiddenElements.forEach((el, i) => {
                el.style.opacity = (subStep > i) ? '1' : '0';
                el.style.transform = (subStep > i) ? 'translateY(0)' : 'translateY(20px)';
            });
        }
    }

    function renderSlide(index) {
        if (index === currentSlide) return;
        currentSlide = index;
        subStep = 0;
        container.innerHTML = '';
        
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.className = 'slide-wrapper';
        wrapper.style.cssText = `width:95%; max-width:1400px; text-align:center; animation: vetoQuickFade 0.3s ease;`;

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
                        <div class="step-element month-box" style="background:#111; padding:25px; border-radius:15px; font-size:2rem; border:2px solid #222; transition: 0.3s; font-weight:bold;">
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
                        <div class="step-element" style="background:#111; padding:35px; border-radius:20px; text-align:left; border-left:10px solid #f1c40f; transition:0.3s;">
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <span style="font-size:4.5rem; font-weight:900; color:#f1c40f;">-${g.suffix}</span>
                                <span style="color:#555; font-size:1.5rem; font-weight:900;">${g.label}</span>
                            </div>
                            <div style="font-size:2.5rem; margin-top:10px; color:#fff; font-weight:bold;">${g.nums}</div>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'how-to-say') {
            wrapper.innerHTML = `
                <h2 style="font-size:4rem; color:#f1c40f; margin-bottom:5vh; font-weight:900;">${s.title}</h2>
                <div style="display:flex; flex-direction:column; align-items:center; gap:4vh;">
                    <div style="font-size:10vh; font-weight:900; background:#222; padding:2vh 10vh; border-radius:30px;">${s.write}</div>
                    <div class="reveal-on-step" style="font-size:6vh; color:#fff; font-weight:bold; transition:0.5s;">
                        ➔ ${s.say}
                    </div>
                    <div class="reveal-on-step" style="background:#f1c40f; color:black; padding:3vh; border-radius:20px; font-size:3.5vh; font-weight:900; transition:0.5s;">
                        ${s.rule}
                    </div>
                </div>`;
        }
        else if (s.type === 'reading-rule') {
            wrapper.innerHTML = `
                <h2 style="font-size:5rem; color:#fff; margin-bottom:50px; font-weight:900;">YEARS</h2>
                <div style="background:#111; padding:60px; border-radius:40px; border:2px solid #222;">
                    <div style="font-size:9vw; font-weight:900; letter-spacing:20px; color:#f1c40f;">${s.example.split}</div>
                    <div class="reveal-on-step" style="font-size:4.5rem; margin-top:30px; color:#fff; font-weight:bold; transition:0.4s;">${s.example.text}</div>
                </div>
                <div class="reveal-on-step" style="margin-top:30px; font-size:2.5rem; color:#444; font-weight:bold; transition:0.4s;">2026 ➔ ${s.modern.text}</div>
            `;
        }
        else if (s.type === 'date-quiz') {
            renderQuizContent(wrapper, s);
        }

        container.appendChild(wrapper);
        updateSubSteps();
    }

    function renderQuizContent(parent, s) {
        let isAnswerVisible = subStep % 2 !== 0;
        let questionIdx = Math.floor(subStep / 2);
        let q = s.questions[questionIdx] || s.questions[s.questions.length-1];

        parent.innerHTML = `
            <div style="background:#111; padding:80px; border-radius:40px; border:4px solid #2ecc71; transition: 0.3s;">
                <div style="font-size:1.5rem; color:#444; margin-bottom:20px; font-weight:900; letter-spacing:5px;">PRACTICE ${String(questionIdx+1).padStart(2,'0')}/10</div>
                <div style="font-size:9vw; font-weight:900; margin-bottom:20px; color:#fff;">${q.date}</div>
                <div style="font-size:3.5rem; color:#f1c40f; opacity:${isAnswerVisible ? 1 : 0}; font-weight:bold; transition:0.3s; transform: translateY(${isAnswerVisible?0:'20px'});">
                    ${q.ans}
                </div>
            </div>`;
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if ([13, 32, 39].includes(e.keyCode)) { // Next
            let maxSteps = 0;
            if (s.items) maxSteps = s.items.length - 1;
            else if (s.groups) maxSteps = s.groups.length - 1;
            else if (s.type === 'reading-rule') maxSteps = 2;
            else if (s.type === 'how-to-say') maxSteps = 2;
            else if (s.type === 'date-quiz') maxSteps = (s.questions.length * 2) - 1;

            if (subStep < maxSteps) {
                subStep++;
                if (s.type === 'date-quiz') renderQuizContent(container.querySelector('.slide-wrapper'), s);
                else updateSubSteps();
            } else if (currentSlide < slides.length - 1) {
                renderSlide(currentSlide + 1);
            } else {
                if (window.triggerVetoDone) window.triggerVetoDone();
            }
        } else if (e.keyCode === 37) { // Back
            if (subStep > 0) {
                subStep--;
                if (s.type === 'date-quiz') renderQuizContent(container.querySelector('.slide-wrapper'), s);
                else updateSubSteps();
            } else if (currentSlide > 0) {
                renderSlide(currentSlide - 1);
            }
        }
    };

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes vetoQuickFade { from { opacity:0; transform: scale(0.98); } to { opacity:1; transform: scale(1); } }
        .step-element { transform: translateY(10px); }
    `;
    document.head.appendChild(style);

    renderSlide(0);
})();
