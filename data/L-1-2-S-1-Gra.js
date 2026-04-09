(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#050505; font-family:'Segoe UI', sans-serif; direction:ltr; color:white;`;

    let currentSlide = -1; 
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'TELLING THE TIME', subtitle: 'MASTER THE CLOCK', color: '#c5a059' },
        
        /* 2: Clock Types */
        { 
            type: 'clock-types', 
            left: { name: 'Analog Clock', desc: 'Uses Hands' },
            right: { name: 'Digital Clock', desc: 'Uses Numbers' } 
        },

        /* 3-14: Interactive Learning */
        ...[
            { h: 4, m: 0,  ways: ["It’s 4 o’clock"] },
            { h: 4, m: 5,  ways: ["It’s 5 after 4", "It’s 4 : 05"] },
            { h: 4, m: 10, ways: ["It’s 10 after 4", "It’s 4 : 10"] },
            { h: 4, m: 15, ways: ["It’s Quarter after 4", "It’s 4 : 15"] },
            { h: 4, m: 20, ways: ["It’s 20 after 4", "It’s 4 : 20"] },
            { h: 4, m: 25, ways: ["It’s 25 after 4", "It’s 4 : 25"] },
            { h: 4, m: 30, ways: ["It’s 4 : 30", "It’s Four Thirty"] },
            { h: 4, m: 35, ways: ["It’s 25 to 5", "It’s 4 : 35"] },
            { h: 4, m: 40, ways: ["It’s 20 to 5", "It’s 4 : 40"] },
            { h: 4, m: 45, ways: ["It’s Quarter to 5", "It’s 4 : 45"] },
            { h: 4, m: 50, ways: ["It’s 10 to 5", "It’s 4 : 50"] },
            { h: 4, m: 55, ways: ["It’s 5 to 5", "It’s 4 : 55"] }
        ].map(t => ({ type: 'interactive-clock', hour: t.h, min: t.m, text: t.ways })),

        /* 15: Writing Slide */
        {
            type: 'big-rule',
            title: 'LET\'S WRITE!',
            examples: [
               { type: 'DIGITAL (AFTER)', text: '07:10 ➞ It’s 10 after 7' },
                { type: 'DIGITAL (TO)', text: '07:50 ➞ It’s 10 to 8' },
                { type: 'ANALOG (AFTER)', text: 'Quarter after 2 ➞ 02:15' },
                { type: 'ANALOG (TO)', text: 'Quarter to 3 ➞ 02:45' }
            ]
        },

        /* 16-25: 10 Quiz Questions */
        { type: 'quiz', title: 'PRACTICE 01', hour: 8, min: 15, ans: ["It’s Quarter after 8", "It’s 8 : 15"] },
        { type: 'quiz', title: 'PRACTICE 02', hour: 2, min: 45, ans: ["It’s Quarter to 3", "It’s 2 : 45"] },
        { type: 'quiz', title: 'PRACTICE 03', hour: 10, min: 30, ans: ["It’s 10 : 30", "It’s Ten Thirty"] },
        { type: 'quiz', title: 'PRACTICE 04', hour: 1, min: 50, ans: ["It’s 10 to 2", "It’s 1 : 50"] },
        { type: 'quiz', title: 'PRACTICE 05', hour: 5, min: 20, ans: ["It’s 20 after 5", "It’s 5 : 20"] },
        { type: 'quiz', title: 'PRACTICE 06', hour: 11, min: 0,  ans: ["It’s 11 o’clock", "It’s 11 : 00"] },
        { type: 'quiz', title: 'PRACTICE 07', hour: 3, min: 5,   ans: ["It’s 5 after 3", "It’s 3 : 05"] },
        { type: 'quiz', title: 'PRACTICE 08', hour: 6, min: 40,  ans: ["It’s 20 to 7", "It’s 6 : 40"] },
        { type: 'quiz', title: 'PRACTICE 09', hour: 12, min: 30, ans: ["It’s 12 : 30", "It’s Twelve Thirty"] },
        { type: 'quiz', title: 'PRACTICE 10', hour: 9, min: 55,  ans: ["It’s 5 to 10", "It’s 9 : 55"] },

        /* 26: Conclusion */
        { type: 'title', content: 'TIME MASTERED!', subtitle: 'Great Job, Master!', color: '#2ecc71' }
    ];

    function updateSubSteps() {
        const s = slides[currentSlide];
        if (!s) return;

        // التحقق من وجود منطقة الإجابة (الجانب الأيمن)
        const answerArea = container.querySelector('.answer-area');
        if (answerArea && s.type === 'quiz') {
            answerArea.style.opacity = (subStep > 0) ? '1' : '0';
            answerArea.style.transform = (subStep > 0) ? 'translateX(0)' : 'translateX(50px)';
        }

        // تحديث ظهور النصوص التدريجية
        const stepElements = container.querySelectorAll('.step-reveal');
        stepElements.forEach((el, i) => {
            // في الكويز، أول خطوة هي ظهور الساعة الرقمية، لذا النصوص تبدأ من subStep 2
            const threshold = (s.type === 'quiz') ? 1 : 0;
            el.style.opacity = (subStep > i + threshold) ? '1' : '0';
            el.style.transform = (subStep > i + threshold) ? 'translateY(0)' : 'translateY(15px)';
        });

        // إظهار الساعة الرقمية (Digital Box)
        const digitalBox = container.querySelector('.digital-box');
        if (digitalBox) {
            if (s.type === 'quiz') {
                digitalBox.style.opacity = (subStep >= 1) ? '1' : '0';
            } else {
                digitalBox.style.opacity = '1';
            }
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
        wrapper.style.cssText = `width:90%; height:85vh; display:flex; flex-direction:column; align-items:center; justify-content:center; animation: vetoQuickFade 0.4s ease; transition: 0.3s;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <h1 style="font-size:12vh; font-weight:900; color:${s.color}; margin:0;">${s.content}</h1>
                <div style="font-size:4vh; color:#fff; font-weight:bold; margin-top:3vh; border-top:8px solid ${s.color}; display:inline-block; padding-top:1.5vh; letter-spacing:10px;">${s.subtitle}</div>
            `;
        } 
        else if (s.type === 'big-rule') {
            wrapper.innerHTML = `
                <h2 style="font-size:7vh; color:#c5a059; margin-bottom:4vh; font-weight:900;">${s.title}</h2>
                <div style="display:grid; grid-template-columns: 1fr; gap:2vh; width:100%;">
                    ${s.examples.map((ex, i) => `
                        <div class="step-reveal" style="background:#111; padding:3vh; border-radius:20px; border-left:10px solid #c5a059; text-align:left; opacity:0; transition:0.4s ease-out;">
                            <span style="color:#666; font-size:2.5vh; font-weight:bold; display:block;">${ex.type}</span>
                            <span style="font-size:5vh; font-weight:900; color:#fff;">${ex.text}</span>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'clock-types') {
            wrapper.innerHTML = `
                <div style="display:flex; gap:3vw; width:100%; justify-content:center;">
                    <div style="background:#111; padding:6vh; border-radius:30px; border:3px solid #c5a059; width:45%;">
                        <h2 style="font-size:6vh; color:#c5a059; margin-bottom:2vh;">${s.left.name}</h2>
                        <p style="font-size:3.5vh; color:#888;">${s.left.desc}</p>
                    </div>
                    <div style="background:#111; padding:6vh; border-radius:30px; border:3px solid #fff; width:45%;">
                        <h2 style="font-size:6vh; color:#fff; margin-bottom:2vh;">${s.right.name}</h2>
                        <p style="font-size:3.5vh; color:#888;">${s.right.desc}</p>
                    </div>
                </div>`;
        }
        else if (s.type === 'interactive-clock' || s.type === 'quiz') {
            const hDeg = (s.hour * 30) + (s.min * 0.5);
            const mDeg = s.min * 6;
            const items = s.type === 'quiz' ? s.ans : s.text;
            
            wrapper.innerHTML = `
                <div style="display:flex; align-items:center; justify-content:center; width:100%; gap:5vw;">
                    <div style="width:35vw; height:35vw; max-width:550px; max-height:550px; border:15px solid #fff; border-radius:50%; position:relative; background:#000; flex-shrink:0;">
                        ${[12,1,2,3,4,5,6,7,8,9,10,11].map(n => {
                            const ang = n * 30;
                            return `<div style="position:absolute; top:50%; left:50%; height:92%; transform: translate(-50%, -50%) rotate(${ang}deg); font-size:4vh; font-weight:900; color:${n%3===0 ? '#c5a059':'#444'}">
                                <span style="display:inline-block; transform: rotate(-${ang}deg)">${n}</span>
                            </div>`;
                        }).join('')}
                        <div style="position:absolute; top:50%; left:50%; width:12px; height:28%; background:#fff; transform-origin:bottom; transform:translate(-50%, -100%) rotate(${hDeg}deg); border-radius:10px; z-index:2;"></div>
                        <div style="position:absolute; top:50%; left:50%; width:8px; height:42%; background:#c5a059; transform-origin:bottom; transform:translate(-50%, -100%) rotate(${mDeg}deg); border-radius:10px; z-index:3;"></div>
                        <div style="position:absolute; top:50%; left:50%; width:25px; height:25px; background:#fff; border-radius:50%; transform:translate(-50%,-50%); z-index:4; border:4px solid #000;"></div>
                    </div>

                    <div class="answer-area" style="width:40vw; text-align:left; background:#111; padding:5vh; border-radius:40px; border-left:15px solid #c5a059; min-height:45vh; display:flex; flex-direction:column; justify-content:center; transition: 0.5s ease; opacity: ${s.type==='quiz' ? 0 : 1};">
                        ${s.type === 'quiz' ? `<div style="background:#c5a059; color:#000; display:inline-block; align-self:flex-start; padding:1vh 3vh; border-radius:10px; font-weight:900; font-size:3vh; margin-bottom:3vh;">${s.title}</div>` : ''}
                        
                        <div class="digital-box" style="transition:0.4s; opacity:${s.type==='quiz' ? 0 : 1};">
                            <div style="font-size:2.5vh; color:#444; text-transform:uppercase; letter-spacing:4px; font-weight:900;">Digital Readout</div>
                            <div style="font-size:12vh; font-family:monospace; color:#fff; line-height:1; margin-bottom:4vh;">
                                ${s.hour.toString().padStart(2,'0')}<span style="color:#c5a059; animation: blink 1s infinite;">:</span>${s.min.toString().padStart(2, '0')}
                            </div>
                        </div>

                        <div style="display:flex; flex-direction:column; gap:2vh;">
                            ${items.map((text, i) => `
                                <div class="step-reveal" style="font-size:4.5vh; font-weight:900; color:${i===0 ? '#c5a059':'#fff'}; opacity:0; transition:0.4s; transform: translateY(15px);">
                                    ➞ ${text}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
        updateSubSteps();
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if ([13, 32, 39].includes(e.keyCode)) { // Next
            let maxSteps = 0;
            if (s.type === 'big-rule') maxSteps = s.examples.length - 1;
            else if (s.type === 'interactive-clock') maxSteps = s.text.length - 1;
            else if (s.type === 'quiz') maxSteps = s.ans.length + 1; // +1 for digital box first

            if (subStep < maxSteps) {
                subStep++;
                updateSubSteps();
            } else if (currentSlide < slides.length - 1) {
                renderSlide(currentSlide + 1);
            } else {
                if(window.triggerVetoDone) window.triggerVetoDone();
            }
        } else if (e.keyCode === 37) { // Back
            if (subStep > 0) {
                subStep--;
                updateSubSteps();
            } else if (currentSlide > 0) {
                renderSlide(currentSlide - 1);
                // عند العودة، نظهر السلايد السابق كاملاً
                const prevS = slides[currentSlide];
                if (prevS.type === 'big-rule') subStep = prevS.examples.length - 1;
                else if (prevS.type === 'interactive-clock') subStep = prevS.text.length - 1;
                else if (prevS.type === 'quiz') subStep = prevS.ans.length + 1;
                updateSubSteps();
            }
        }
    };

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes vetoQuickFade { from { opacity:0; transform:scale(0.98); } to { opacity:1; transform:scale(1); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .slide-wrapper { will-change: transform, opacity; }
    `;
    document.head.appendChild(style);

    renderSlide(0);
})();
