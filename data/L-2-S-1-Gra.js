(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#050505; font-family:'Segoe UI', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        { type: 'title', content: 'TELLING THE TIME', subtitle: 'Analog vs Digital', color: '#c5a059' },
        { 
            type: 'clock-types', 
            left: { name: 'Analog Clock', desc: 'Uses Hands (العقارب)' },
            right: { name: 'Digital Clock', desc: 'Uses Numbers (الأرقام)' } 
        },
        ...[
            { h: 6, m: 0, ways: ["It’s 6 o’clock"] },
            { h: 6, m: 5, ways: ["It’s 5 after 6", "It’s 6 - O - 5"] },
            { h: 6, m: 10, ways: ["It’s 10 after 6", "It’s 6 - 10"] },
            { h: 6, m: 15, ways: ["It’s 15 after 6 / Quarter after 6", "It’s 6 - 15"] },
            { h: 6, m: 30, ways: ["It’s 6 - 30", "It’s half past 6"] },
            { h: 6, m: 35, ways: ["It’s 25 to 7", "It’s 6 - 35"] },
            { h: 6, m: 45, ways: ["It’s 15 to 7 / Quarter to 7", "It’s 6 - 45"] },
            { h: 6, m: 55, ways: ["It’s 5 to 7", "It’s 6 - 55"] }
        ].map(t => ({ type: 'interactive-clock', hour: t.h, min: t.m, text: t.ways })),
        { type: 'quiz', title: 'Exercise 01', hour: 2, min: 20, ans: ["It’s 20 after 2", "It’s 2 - 20"] },
        { type: 'quiz', title: 'Exercise 02', hour: 1, min: 40, ans: ["It’s 20 to 2", "It’s 1 - 40"] },
        { type: 'quiz', title: 'Exercise 03', hour: 10, min: 50, ans: ["It’s 10 to 11", "It’s 10 - 50"] }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.className = 'veto-slide';
        wrapper.style.cssText = `width:90%; animation: vetoFadeIn 0.5s ease;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <h1 style="font-size:6vw; font-weight:900; color:${s.color}; margin:0; letter-spacing:5px;">${s.content}</h1>
                <p style="font-size:2vw; color:#888; letter-spacing:10px;">${s.subtitle}</p>
            `;
        } 
        else if (s.type === 'clock-types') {
            wrapper.innerHTML = `
                <div style="display:flex; gap:40px; justify-content:center;">
                    <div style="background:#111; padding:50px; border-radius:40px; border:2px solid #3498db; width:40%; transition:0.3s;">
                        <h2 style="font-size:3rem; color:#3498db;">${s.left.name}</h2>
                        <p style="font-size:1.5rem; color:#aaa;">${s.left.desc}</p>
                        <div class="mini-analog" style="width:100px; height:100px; border:4px solid #fff; border-radius:50%; margin: 20px auto; position:relative;">
                             <div style="position:absolute; top:50%; left:50%; width:2px; height:35px; background:#e74c3c; transform-origin:bottom; transform:translate(-50%, -100%) rotate(45deg);"></div>
                             <div style="position:absolute; top:50%; left:50%; width:2px; height:45px; background:#3498db; transform-origin:bottom; transform:translate(-50%, -100%) rotate(180deg);"></div>
                        </div>
                    </div>
                    <div style="background:#111; padding:50px; border-radius:40px; border:2px solid #e74c3c; width:40%;">
                        <h2 style="font-size:3rem; color:#e74c3c;">${s.right.name}</h2>
                        <p style="font-size:1.5rem; color:#aaa;">${s.right.desc}</p>
                        <div style="font-size:5rem; font-family:monospace; background:#000; padding:10px; border-radius:10px; margin-top:20px; color:#e74c3c; letter-spacing:5px;">06:00</div>
                    </div>
                </div>`;
        }
        else if (s.type === 'interactive-clock' || s.type === 'quiz') {
            const hDeg = (s.hour * 30) + (s.min * 0.5);
            const mDeg = s.min * 6;
            
            wrapper.innerHTML = `
                <div style="display:flex; align-items:center; justify-content:center; gap:80px;">
                    <div class="veto-clock" style="width:400px; height:400px; border:12px solid #fff; border-radius:50%; position:relative; background: radial-gradient(circle, #222 0%, #000 100%); box-shadow: 0 0 50px rgba(0,0,0,0.8);">
                        ${[1,2,3,4,5,6,7,8,9,10,11,12].map(n => {
                            const ang = n * 30;
                            return `<div style="position:absolute; top:50%; left:50%; height:90%; transform: translate(-50%, -50%) rotate(${ang}deg); font-size:1.8rem; font-weight:bold; padding-top:10px;">
                                <span style="display:inline-block; transform: rotate(-${ang}deg)">${n}</span>
                            </div>`;
                        }).join('')}
                        <div style="position:absolute; top:50%; left:50%; width:10px; height:100px; background:#e74c3c; transform-origin:bottom; transform:translate(-50%, -100%) rotate(${hDeg}deg); border-radius:10px; z-index:2;"></div>
                        <div style="position:absolute; top:50%; left:50%; width:6px; height:160px; background:#3498db; transform-origin:bottom; transform:translate(-50%, -100%) rotate(${mDeg}deg); border-radius:10px; z-index:3;"></div>
                        <div style="position:absolute; top:50%; left:50%; width:24px; height:24px; background:#fff; border-radius:50%; transform:translate(-50%,-50%); z-index:4;"></div>
                    </div>

                    <div style="text-align:left;">
                        ${s.type === 'quiz' ? `<div style="background:#c5a059; color:#000; display:inline-block; padding:5px 20px; border-radius:50px; font-weight:900; margin-bottom:20px;">${s.title}</div>` : ''}
                        <div style="font-size:1.2rem; color:#555; text-transform:uppercase; letter-spacing:3px;">Digital Time</div>
                        <div style="font-size:7rem; font-family:monospace; color:#fff; margin-bottom:30px;">
                            ${s.hour.toString().padStart(2,'0')}:${s.min.toString().padStart(2, '0')}
                        </div>
                        <div style="display:flex; flex-direction:column; gap:15px;">
                            ${(s.type === 'quiz' ? s.ans : s.text).map((text, i) => `
                                <div style="font-size:2.5rem; font-weight:900; color:#c5a059; opacity:${subStep >= i ? 1 : 0}; transition:0.5s; transform:translateX(${subStep >= i ? 0 : -30}px); display:flex; align-items:center; gap:15px;">
                                    ${subStep >= i ? '<span style="color:#3498db">➤</span>' : ''} ${text}
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
        if (e.keyCode === 39 || e.keyCode === 13 || e.keyCode === 32) { // Next
            let maxSteps = (s.type === 'interactive-clock' || s.type === 'quiz') ? (s.type === 'quiz' ? s.ans.length - 1 : s.text.length - 1) : 0;
            if (subStep < maxSteps) subStep++;
            else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
            else if (currentSlide === slides.length - 1) { if(window.triggerVetoDone) window.triggerVetoDone(); }
        } else if (e.keyCode === 37) { // Back
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes vetoFadeIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .veto-clock::after { content:'VETO PRECISION'; position:absolute; bottom:80px; left:50%; transform:translateX(-50%); font-size:0.7rem; letter-spacing:2px; color:#333; font-weight:bold; }
    `;
    document.head.appendChild(style);

    render();
})();
