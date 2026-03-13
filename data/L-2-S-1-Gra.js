(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:calc(100vh - 200px); overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#0f0f0f; font-family:'Poppins', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Intro */
        { type: 'title', content: 'TELLING THE TIME', color: '#f1c40f' },

        /* 2: Clock Types */
        { 
            type: 'clock-types', 
            left: { name: 'Analog (العقارب)', val: '12, 1, 2, 3...' },
            right: { name: 'Digital (الرقمية)', val: '00:00' } 
        },

        /* 3: Teaching the Times (6:00 to 6:55) */
        ...[
            { h: 6, m: 0, ways: ["It’s 6 o’clock"] },
            { h: 6, m: 5, ways: ["It’s 5 after 6", "It’s 6 O 5"] },
            { h: 6, m: 10, ways: ["It’s 10 after 6", "It’s 6 - 10"] },
            { h: 6, m: 15, ways: ["It’s 15 after 6", "It’s 6 - 15"] },
            { h: 6, m: 30, ways: ["It’s 6 - 30", "It’s half past 6"] },
            { h: 6, m: 35, ways: ["It’s 25 to 7", "It’s 6 - 35"] },
            { h: 6, m: 45, ways: ["It’s 15 to 7", "It’s 6 - 45"] },
            { h: 6, m: 55, ways: ["It’s 5 to 7", "It’s 6 - 55"] }
        ].map(t => ({ type: 'interactive-clock', hour: t.h, min: t.m, text: t.ways })),

        /* 4: Exercise Time (Based on PPT Exercises) */
        { 
            type: 'quiz', 
            title: 'Exercise Time',
            hour: 2, min: 20, 
            ans: ["It’s 20 after 2", "It’s 2 - 20"] 
        },
        { 
            type: 'quiz', 
            title: 'Exercise Time',
            hour: 1, min: 40, 
            ans: ["It’s 20 to 2", "It’s 1 - 40"] 
        },
        { 
            type: 'quiz', 
            title: 'Exercise Time',
            hour: 10, min: 50, 
            ans: ["It’s 10 to 11", "It’s 10 - 50"] 
        }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:90%; text-align:center;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `<h1 style="font-size:8rem; font-weight:900; color:${s.color};">${s.content}</h1>`;
        } 
        else if (s.type === 'clock-types') {
            wrapper.innerHTML = `
                <div style="display:flex; gap:40px; justify-content:center;">
                    <div style="background:#1e1e1e; padding:40px; border-radius:30px; border:4px solid #3498db; width:40%;">
                        <h2 style="font-size:2.5rem;">${s.left.name}</h2>
                        <div style="font-size:1.5rem; color:#888;">[cite: 191]</div>
                    </div>
                    <div style="background:#1e1e1e; padding:40px; border-radius:30px; border:4px solid #e74c3c; width:40%;">
                        <h2 style="font-size:2.5rem;">${s.right.name}</h2>
                        <div style="font-size:4rem; font-family:monospace;">${s.right.val}</div>
                        <div style="font-size:1.5rem; color:#888;">[cite: 192, 205]</div>
                    </div>
                </div>`;
        }
        else if (s.type === 'interactive-clock' || s.type === 'quiz') {
            const hDeg = (s.hour * 30) + (s.min * 0.5);
            const mDeg = s.min * 6;
            
            wrapper.innerHTML = `
                <div style="display:flex; align-items:center; justify-content:space-around; gap:20px;">
                    <div style="width:300px; height:300px; border:10px solid white; border-radius:50%; position:relative; background:#222;">
                        <div style="position:absolute; top:10px; left:50%; transform:translateX(-50%); font-size:1.5rem;">12</div>
                        <div style="position:absolute; bottom:10px; left:50%; transform:translateX(-50%); font-size:1.5rem;">6</div>
                        <div style="position:absolute; right:15px; top:50%; transform:translateY(-50%); font-size:1.5rem;">3</div>
                        <div style="position:absolute; left:15px; top:50%; transform:translateY(-50%); font-size:1.5rem;">9</div>
                        <div style="position:absolute; bottom:50%; left:50%; width:6px; height:70px; background:#e74c3c; transform-origin:bottom; transform:translateX(-50%) rotate(${hDeg}deg); border-radius:10px;"></div>
                        <div style="position:absolute; bottom:50%; left:50%; width:4px; height:110px; background:#3498db; transform-origin:bottom; transform:translateX(-50%) rotate(${mDeg}deg); border-radius:10px;"></div>
                        <div style="position:absolute; top:50%; left:50%; width:15px; height:15px; background:white; border-radius:50%; transform:translate(-50%,-50%);"></div>
                    </div>

                    <div style="text-align:left; flex:1;">
                        <div style="font-size:1.5rem; color:#888; margin-bottom:10px;">Digital Display:</div>
                        <div style="font-size:6rem; font-family:monospace; background:#111; padding:10px 30px; border-radius:15px; display:inline-block; border:2px solid #333;">
                            ${s.hour}:${s.min < 10 ? '0'+s.min : s.min}
                        </div>
                        <div style="margin-top:30px; display:flex; flex-direction:column; gap:15px;">
                            ${(s.type === 'quiz' ? s.ans : s.text).map((text, i) => `
                                <div style="font-size:2.5rem; font-weight:bold; color:#f1c40f; opacity:${subStep >= i ? 1 : 0}; transition:0.3s; transform:translateX(${subStep >= i ? 0 : -20}px);">
                                    ${text}
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
            let maxSteps = s.type === 'interactive-clock' ? s.text.length - 1 : (s.type === 'quiz' ? s.ans.length - 1 : 0);
            if (subStep < maxSteps) subStep++;
            else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
        } else if (e.keyCode === 37) { // Back
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    render();
})();
