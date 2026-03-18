(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#050505; font-family:'Segoe UI', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'TELLING THE TIME', subtitle: 'MASTER THE CLOCK', color: '#c5a059' },
        
        /* 2: Clock Types */
        { 
            type: 'clock-types', 
            left: { name: 'Analog Clock', desc: 'Uses Hands (العقارب)' },
            right: { name: 'Digital Clock', desc: 'Uses Numbers (الأرقام)' } 
        },

        /* 3-10: Clock Interactive */
        ...[
            { h: 6, m: 0, ways: ["It’s 6 o’clock"] },
            { h: 6, m: 5, ways: ["It’s 5 after 6", "It’s 6 : 05"] },
            { h: 6, m: 10, ways: ["It’s 10 after 6", "It’s 6 : 10"] },
            { h: 6, m: 15, ways: ["It’s Quarter after 6", "It’s 6 : 15"] },
            { h: 6, m: 30, ways: ["It’s half past 6", "It’s 6 : 30"] },
            { h: 6, m: 35, ways: ["It’s 25 to 7", "It’s 6 : 35"] },
            { h: 6, m: 45, ways: ["It’s Quarter to 7", "It’s 6 : 45"] },
            { h: 6, m: 55, ways: ["It’s 5 to 7", "It’s 6 : 55"] }
        ].map(t => ({ type: 'interactive-clock', hour: t.h, min: t.m, text: t.ways })),

        /* Quiz Section */
        { type: 'quiz', title: 'PRACTICE 01', hour: 2, min: 20, ans: ["It’s 20 after 2", "It’s 2 : 20"] },
        { type: 'quiz', title: 'PRACTICE 02', hour: 1, min: 40, ans: ["It’s 20 to 2", "It’s 1 : 40"] },
        { type: 'quiz', title: 'PRACTICE 03', hour: 10, min: 50, ans: ["It’s 10 to 11", "It’s 10 : 50"] }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:95%; max-width:1600px; display:flex; flex-direction:column; align-items:center; animation: vetoQuickFade 0.15s ease-out;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <h1 style="font-size:10vw; font-weight:900; color:${s.color}; margin:0; line-height:1; letter-spacing:-2px;">${s.content}</h1>
                <div style="font-size:3vw; color:#fff; font-weight:bold; margin-top:20px; border-top:8px solid ${s.color}; display:inline-block; padding-top:10px; letter-spacing:10px;">${s.subtitle}</div>
            `;
        } 
        else if (s.type === 'clock-types') {
            wrapper.innerHTML = `
                <div style="display:flex; gap:30px; width:100%; justify-content:center;">
                    <div style="background:#111; padding:60px; border-radius:40px; border:3px solid #c5a059; width:45%;">
                        <h2 style="font-size:4rem; color:#c5a059; margin-bottom:10px;">${s.left.name}</h2>
                        <p style="font-size:2rem; color:#888;">${s.left.desc}</p>
                    </div>
                    <div style="background:#111; padding:60px; border-radius:40px; border:3px solid #fff; width:45%;">
                        <h2 style="font-size:4rem; color:#fff; margin-bottom:10px;">${s.right.name}</h2>
                        <p style="font-size:2rem; color:#888;">${s.right.desc}</p>
                    </div>
                </div>`;
        }
        else if (s.type === 'interactive-clock' || s.type === 'quiz') {
            const hDeg = (s.hour * 30) + (s.min * 0.5);
            const mDeg = s.min * 6;
            
            wrapper.innerHTML = `
                <div style="display:flex; align-items:center; justify-content:space-between; width:100%; gap:50px;">
                    <div style="width:600px; height:600px; border:15px solid #fff; border-radius:50%; position:relative; background:#000; box-shadow: 0 0 80px rgba(197,160,89,0.2);">
                        ${[12,1,2,3,4,5,6,7,8,9,10,11].map(n => {
                            const ang = n * 30;
                            return `<div style="position:absolute; top:50%; left:50%; height:92%; transform: translate(-50%, -50%) rotate(${ang}deg); font-size:2.5rem; font-weight:900; padding-top:15px; color:${n%3===0 ? '#c5a059':'#444'}">
                                <span style="display:inline-block; transform: rotate(-${ang}deg)">${n}</span>
                            </div>`;
                        }).join('')}
                        <div style="position:absolute; top:50%; left:50%; width:14px; height:160px; background:#fff; transform-origin:bottom; transform:translate(-50%, -100%) rotate(${hDeg}deg); border-radius:10px; z-index:2;"></div>
                        <div style="position:absolute; top:50%; left:50%; width:8px; height:240px; background:#c5a059; transform-origin:bottom; transform:translate(-50%, -100%) rotate(${mDeg}deg); border-radius:10px; z-index:3;"></div>
                        <div style="position:absolute; top:50%; left:50%; width:30px; height:30px; background:#fff; border-radius:50%; transform:translate(-50%,-50%); z-index:4; border:5px solid #000;"></div>
                    </div>

                    <div style="flex:1; text-align:left; background:#111; padding:60px; border-radius:40px; border-left:15px solid #c5a059;">
                        ${s.type === 'quiz' ? `<div style="background:#c5a059; color:#000; display:inline-block; padding:8px 30px; border-radius:10px; font-weight:900; font-size:1.8rem; margin-bottom:30px;">${s.title}</div>` : ''}
                        <div style="font-size:1.5rem; color:#444; text-transform:uppercase; letter-spacing:5px; font-weight:900;">Digital Readout</div>
                        <div style="font-size:10rem; font-family:monospace; color:#fff; line-height:1; margin-bottom:40px; letter-spacing:-5px;">
                            ${s.hour.toString().padStart(2,'0')}<span style="color:#c5a059; animation: blink 1s infinite;">:</span>${s.min.toString().padStart(2, '0')}
                        </div>
                        <div style="display:flex; flex-direction:column; gap:20px;">
                            ${(s.type === 'quiz' ? s.ans : s.text).map((text, i) => `
                                <div style="font-size:3.5rem; font-weight:900; color:${i===0 ? '#c5a059':'#fff'}; opacity:${subStep >= i ? 1 : 0}; transition:0.2s; display:flex; align-items:center; gap:20px;">
                                    ${subStep >= i ? '<span style="color:#fff">➞</span>' : ''} ${text}
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
        if (e.keyCode === 39 || e.keyCode === 13 || e.keyCode === 32) { 
            let maxSteps = (s.type === 'interactive-clock' || s.type === 'quiz') ? (s.type === 'quiz' ? s.ans.length - 1 : s.text.length - 1) : 0;
            if (subStep < maxSteps) subStep++;
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
        @keyframes vetoQuickFade { from { opacity:0; } to { opacity:1; } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
    `;
    document.head.appendChild(style);

    render();
})();
