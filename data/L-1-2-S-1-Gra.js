(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#050505; font-family:'Segoe UI', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        { type: 'title', content: 'TELLING THE TIME', subtitle: 'MASTER THE CLOCK', color: '#c5a059' },
        { 
            type: 'clock-types', 
            left: { name: 'Analog Clock', desc: 'Uses Hands' },
            right: { name: 'Digital Clock', desc: 'Uses Numbers' } 
        },
        ...[
            { h: 4, m: 0,  ways: ["It’s 4 o’clock"] },
            { h: 4, m: 15, ways: ["It’s Quarter after 4", "It’s 4 : 15"] },
            { h: 4, m: 30, ways: ["It’s 4 : 30", "It’s Four Thirty"] },
            { h: 4, m: 45, ways: ["It’s Quarter to 5", "It’s 4 : 45"] }
        ].map(t => ({ type: 'interactive-clock', hour: t.h, min: t.m, text: t.ways })),
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
        { type: 'quiz', title: 'PRACTICE 01', hour: 8, min: 15, ans: ["It’s Quarter after 8", "It’s 8 : 15"] },
        { type: 'title', content: 'TIME MASTERED!', subtitle: 'Great Job, Master!', color: '#2ecc71' }
    ];

    // الدالة دي وظيفتها تحديث الحالة البصرية فقط بدون مسح المحتوى
    function updateVisibility() {
        const wrapper = container.firstChild;
        if (!wrapper) return;

        // تحديث العناصر اللي ليها خاصية "step-item"
        const items = wrapper.querySelectorAll('.step-item');
        items.forEach((item, index) => {
            if (index <= subStep) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(10px)';
            }
        });

        // حالة خاصة للديجيتال في الكويز
        const digital = wrapper.querySelector('.digital-readout');
        if (digital) {
            digital.style.opacity = (slides[currentSlide].type === 'quiz' && subStep === 0) ? '0' : '1';
        }
    }

    function renderSlide() {
        container.innerHTML = ''; // نمسح فقط عند الانتقال لسلايد جديدة تماماً
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.className = 'slide-wrapper';
        wrapper.style.cssText = `width:90%; height:85vh; display:flex; flex-direction:column; align-items:center; justify-content:center; animation: vetoSlideIn 0.4s ease-out;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <h1 style="font-size:12vh; font-weight:900; color:${s.color}; margin:0;">${s.content}</h1>
                <div style="font-size:4vh; color:#fff; font-weight:bold; margin-top:3vh; border-top:8px solid ${s.color}; padding-top:1.5vh; letter-spacing:10px;">${s.subtitle}</div>`;
        } 
        else if (s.type === 'big-rule') {
            wrapper.innerHTML = `
                <h2 style="font-size:7vh; color:#c5a059; margin-bottom:4vh; font-weight:900;">${s.title}</h2>
                <div style="display:grid; grid-template-columns: 1fr; gap:2vh; width:100%;">
                    ${s.examples.map((ex, i) => `
                        <div class="step-item" style="background:#111; padding:3vh; border-radius:20px; border-left:10px solid #c5a059; text-align:left; transition:0.4s all ease;">
                            <span style="color:#666; font-size:2.5vh; font-weight:bold; display:block;">${ex.type}</span>
                            <span style="font-size:5vh; font-weight:900; color:#fff;">${ex.text}</span>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'interactive-clock' || s.type === 'quiz') {
            const hDeg = (s.hour * 30) + (s.min * 0.5);
            const mDeg = s.min * 6;
            wrapper.innerHTML = `
                <div style="display:flex; align-items:center; justify-content:center; width:100%; gap:5vw;">
                    <div style="width:35vw; height:35vw; max-width:550px; border:15px solid #fff; border-radius:50%; position:relative; background:#000;">
                        ${[12,1,2,3,4,5,6,7,8,9,10,11].map(n => `<div style="position:absolute; top:50%; left:50%; height:92%; transform: translate(-50%, -50%) rotate(${n*30}deg); font-size:4vh; font-weight:900; color:${n%3===0 ? '#c5a059':'#444'}"><span style="display:inline-block; transform: rotate(-${n*30}deg)">${n}</span></div>`).join('')}
                        <div style="position:absolute; top:50%; left:50%; width:12px; height:28%; background:#fff; transform-origin:bottom; transform:translate(-50%, -100%) rotate(${hDeg}deg); border-radius:10px;"></div>
                        <div style="position:absolute; top:50%; left:50%; width:8px; height:42%; background:#c5a059; transform-origin:bottom; transform:translate(-50%, -100%) rotate(${mDeg}deg); border-radius:10px;"></div>
                    </div>
                    <div style="width:40vw; background:#111; padding:5vh; border-radius:40px; border-left:15px solid #c5a059; min-height:45vh; display:flex; flex-direction:column; justify-content:center;">
                        <div class="digital-readout" style="transition:0.4s;">
                            <div style="font-size:12vh; font-family:monospace; color:#fff;">${s.hour.toString().padStart(2,'0')}:${s.min.toString().padStart(2, '0')}</div>
                        </div>
                        <div style="display:flex; flex-direction:column; gap:2vh;">
                            ${(s.type === 'quiz' ? s.ans : s.text).map((text) => `<div class="step-item" style="font-size:4.5vh; font-weight:900; color:#fff; transition:0.4s all ease;">➞ ${text}</div>`).join('')}
                        </div>
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
        updateVisibility(); // تحديث الحالة فوراً بعد الريندر
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        let maxSteps = 0;
        if (s.type === 'big-rule') maxSteps = s.examples.length - 1;
        else if (s.type === 'interactive-clock') maxSteps = s.text.length - 1;
        else if (s.type === 'quiz') maxSteps = s.ans.length;

        if ([13, 32, 39].includes(e.keyCode)) {
            if (subStep < maxSteps) {
                subStep++;
                updateVisibility(); // نحدث الرؤية فقط!
            } else if (currentSlide < slides.length - 1) {
                currentSlide++;
                subStep = 0;
                renderSlide(); // نغير السلايد بالكامل
            }
        } else if (e.keyCode === 37) {
            if (subStep > 0) {
                subStep--;
                updateVisibility();
            } else if (currentSlide > 0) {
                currentSlide--;
                subStep = 0;
                renderSlide();
            }
        }
    };

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes vetoSlideIn { from { opacity:0; transform: translateX(30px); } to { opacity:1; transform: translateX(0); } }
        .step-item { opacity: 0; transform: translateY(10px); }
    `;
    document.head.appendChild(style);
    renderSlide();
})();
