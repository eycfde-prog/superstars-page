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

        // جميع الحالات من "بالظبط" إلى "إلا خمسة"
        ...[
            { h: 4, m: 0,  ways: ["It’s 4 o’clock"] },
            { h: 4, m: 5,  ways: ["It’s 5 after 4", "It’s 4 : 05"] },
            { h: 4, m: 10, ways: ["It’s 10 after 4", "It’s 4 : 10"] },
            { h: 4, m: 15, ways: ["It’s Quarter after 4", "It’s 4 : 15"] },
            { h: 4, m: 20, ways: ["It’s 20 after 4", "It’s 4 : 20"] },
            { h: 4, m: 25, ways: ["It’s 25 after 4", "It’s 4 : 25"] },
            { h: 4, m: 30, ways: ["It’s Half past 4", "It’s 4 : 30"] },
            { h: 4, m: 35, ways: ["It’s 25 to 5", "It’s 4 : 35"] },
            { h: 4, m: 40, ways: ["It’s 20 to 5", "It’s 4 : 40"] },
            { h: 4, m: 45, ways: ["It’s Quarter to 5", "It’s 4 : 45"] },
            { h: 4, m: 50, ways: ["It’s 10 to 5", "It’s 4 : 50"] },
            { h: 4, m: 55, ways: ["It’s 5 to 5", "It’s 4 : 55"] }
        ].map(t => ({ type: 'interactive-clock', hour: t.h, min: t.m, text: t.ways })),

        // تمارين (تظهر العقارب فقط أولاً)
        { type: 'quiz', title: 'PRACTICE 01', hour: 8, min: 15, ans: ["It’s Quarter after 8", "It’s 8 : 15"] },
        { type: 'quiz', title: 'PRACTICE 02', hour: 2, min: 45, ans: ["It’s Quarter to 3", "It’s 2 : 45"] },
        { type: 'quiz', title: 'PRACTICE 03', hour: 10, min: 30, ans: ["It’s Half past 10", "It’s 10 : 30"] },
        { type: 'quiz', title: 'PRACTICE 04', hour: 1, min: 50, ans: ["It’s 10 to 2", "It’s 1 : 50"] },
        { type: 'quiz', title: 'PRACTICE 05', hour: 5, min: 20, ans: ["It’s 20 after 5", "It’s 5 : 20"] }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:90%; height:85vh; display:flex; flex-direction:column; align-items:center; justify-content:center; animation: vetoQuickFade 0.2s ease;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <h1 style="font-size:12vh; font-weight:900; color:${s.color}; margin:0; line-height:1;">${s.content}</h1>
                <div style="font-size:4vh; color:#fff; font-weight:bold; margin-top:3vh; border-top:8px solid ${s.color}; display:inline-block; padding-top:1.5vh; letter-spacing:10px;">${s.subtitle}</div>
            `;
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
            
            wrapper.innerHTML = `
                <div style="display:flex; align-items:center; justify-content:center; width:100%; gap:5vw;">
                    <div style="width:35vw; height:35vw; max-width:550px; max-height:550px; border:15px solid #fff; border-radius:50%; position:relative; background:#000; box-shadow: 0 0 50px rgba(197,160,89,0.1);">
                        ${[12,1,2,3,4,5,6,7,8,9,10,11].map(n => {
                            const ang = n * 30;
                            return `<div style="position:absolute; top:50%; left:50%; height:92%; transform: translate(-50%, -50%) rotate(${ang}deg); font-size:4vh; font-weight:900; padding-top:10px; color:${n%3===0 ? '#c5a059':'#444'}">
                                <span style="display:inline-block; transform: rotate(-${ang}deg)">${n}</span>
                            </div>`;
                        }).join('')}
                        <div style="position:absolute; top:50%; left:50%; width:12px; height:28%; background:#fff; transform-origin:bottom; transform:translate(-50%, -100%) rotate(${hDeg}deg); border-radius:10px; z-index:2;"></div>
                        <div style="position:absolute; top:50%; left:50%; width:8px; height:42%; background:#c5a059; transform-origin:bottom; transform:translate(-50%, -100%) rotate(${mDeg}deg); border-radius:10px; z-index:3;"></div>
                        <div style="position:absolute; top:50%; left:50%; width:25px; height:25px; background:#fff; border-radius:50%; transform:translate(-50%,-50%); z-index:4; border:4px solid #000;"></div>
                    </div>

                    <div style="width:40vw; text-align:left; background:#111; padding:5vh; border-radius:40px; border-left:15px solid #c5a059; min-height:45vh; display:flex; flex-direction:column; justify-content:center;">
                        ${s.type === 'quiz' ? `<div style="background:#c5a059; color:#000; display:inline-block; align-self:flex-start; padding:1vh 3vh; border-radius:10px; font-weight:900; font-size:3vh; margin-bottom:3vh;">${s.title}</div>` : ''}
                        
                        <div style="opacity:${(s.type === 'quiz' && subStep === 0) ? 0 : 1}; transition:0.3s;">
                            <div style="font-size:2.5vh; color:#444; text-transform:uppercase; letter-spacing:4px; font-weight:900;">Digital Readout</div>
                            <div style="font-size:12vh; font-family:monospace; color:#fff; line-height:1; margin-bottom:4vh;">
                                ${s.hour.toString().padStart(2,'0')}<span style="color:#c5a059; animation: blink 1s infinite;">:</span>${s.min.toString().padStart(2, '0')}
                            </div>
                        </div>

                        <div style="display:flex; flex-direction:column; gap:2vh;">
                            ${(s.type === 'quiz' ? s.ans : s.text).map((text, i) => `
                                <div style="font-size:4.5vh; font-weight:900; color:${i===0 ? '#c5a059':'#fff'}; opacity:${subStep > (s.type==='quiz'?i:i-1) ? 1 : 0}; transition:0.2s;">
                                    ➞ ${text}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if ([13, 32, 39].includes(e.keyCode)) { // Next
            let maxSteps = (s.type === 'interactive-clock') ? s.text.length : (s.type === 'quiz' ? s.ans.length : 0);
            if (subStep < maxSteps) subStep++;
            else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
            else { if(window.triggerVetoDone) window.triggerVetoDone(); }
        } else if (e.keyCode === 37) { // Back
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes vetoQuickFade { from { opacity:0; transform:scale(0.98); } to { opacity:1; transform:scale(1); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
    `;
    document.head.appendChild(style);
    render();
})();
