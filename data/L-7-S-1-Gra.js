(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#0a0a0c; font-family:'Segoe UI', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        { type: 'title', content: 'PAST PERFECT', subtitle: 'GRAMMAR STAGE', color: '#c5a059', usage: 'The "Past" of the Past' },
        
        { 
            type: 'timeline', 
            title: 'Which happened first?', 
            content: 'We use it to show that <span style="color:#f1c40f">Action 1</span> happened before <span style="color:#3498db">Action 2</span>.' 
        },

        { 
            type: 'writing', 
            title: 'The Formula', 
            content: `
                <div style="background:#111; padding:50px; border-radius:30px; border:3px solid #c5a059; text-align:center; box-shadow: 0 0 50px rgba(197,160,89,0.2);">
                    <span style="color:#fff">Subject + </span>
                    <span style="color:#f1c40f; font-weight:900; font-size:6rem;">HAD</span>
                    <span style="color:#fff"> + </span>
                    <span style="color:#e74c3c; font-weight:900; font-size:6rem;">V3 (P.P)</span>
                </div>
                <p style="font-size:2.8rem; margin-top:40px; color:#aaa;">Example: I <span style="color:#f1c40f">had finished</span> before it <span style="color:#3498db">rained</span>.</p>
            ` 
        },

        { 
            type: 'reveal-list', 
            title: 'Mastering the Order',
            items: [
                "I had finished my work before the meeting.",
                "She had already cooked when he arrived.",
                "The train had left by the time we reached.",
                "They had lost their way before the map."
            ] 
        },

        { 
            type: 'transform', 
            title: 'Negation & Question',
            pairs: [
                { pos: "He had cleaned the car...", neg: "He <span style='color:#e74c3c;'>had not</span> (hadn't) cleaned..." },
                { pos: "They had left the party...", neg: "<span style='color:#f1c40f;'>Had they</span> left the party...?" }
            ]
        },

        { 
            type: 'writing', 
            title: 'Irregular V3', 
            content: '<div style="display:grid; grid-template-columns:1fr 1fr; gap:30px; font-size:3.5rem; color:#f1c40f; font-weight:bold;"><span>Go ➔ Gone</span><span>See ➔ Seen</span><span>Write ➔ Written</span><span>Eat ➔ Eaten</span></div>' 
        },

        { 
            type: 'writing', 
            title: 'Logic Connectors', 
            content: '<div style="display:grid; grid-template-columns:1fr 1fr; gap:40px; color:#3498db;"><div><small style="color:#fff; font-size:1.5rem; letter-spacing:2px;">Followed by HAD+V3:</small><br><span style="color:#f1c40f; font-size:4.5rem;">After<br>As soon as</span></div><div><small style="color:#fff; font-size:1.5rem; letter-spacing:2px;">Followed by V2:</small><br><span style="color:#e74c3c; font-size:4.5rem;">Before<br>By the time</span></div></div>' 
        },

        { 
            type: 'mcq', 
            question: "We _________ the ability to speak English until we _________ grammar.",
            options: ["A) didn't have / understood", "B) hadn't have / understood", "C) hadn't had / understood", "D) haven't had / understood"],
            answer: 2 
        },
        
        { type: 'title', content: 'BRILLIANT!', subtitle: 'FINISH', color: '#27ae60', usage: 'PAST PERFECT MASTERED' }
    ];

    window.nextSlide = function() {
        const s = slides[currentSlide];
        if (s.type === 'timeline' && subStep < 1) subStep++;
        else if (s.type === 'reveal-list' && subStep < s.items.length - 1) subStep++;
        else if (s.type === 'transform' && subStep < (s.pairs.length * 2) - 1) subStep++;
        else if (s.type === 'mcq' && subStep < 2) subStep++;
        else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
        render();
    };

    window.prevSlide = function() {
        if (subStep > 0) subStep--;
        else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        render();
    };

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:90%; max-width:1300px; text-align:center; transition: 0.4s;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <div style="font-size:2rem; color:#888; letter-spacing:15px; margin-bottom:20px; text-transform:uppercase;">${s.subtitle}</div>
                <h1 style="font-size:8.5rem; font-weight:900; color:${s.color}; margin:0; line-height:1;">${s.content}</h1>
                <div style="font-size:3.8rem; color:#fff; font-weight:bold; margin-top:40px; border-top:4px solid ${s.color}; display:inline-block; padding-top:20px;">${s.usage}</div>
            `;
        } 
        else if (s.type === 'timeline') {
            wrapper.innerHTML = `
                <h2 style="font-size:5rem; color:#c5a059; margin-bottom:40px;">${s.title}</h2>
                <p style="font-size:3.5rem; margin-bottom:80px;">${s.content}</p>
                <div style="position:relative; width:90%; margin:100px auto; height:10px; background:#333; border-radius:5px; display:flex; align-items:center;">
                    <div style="position:absolute; right:0; height:50px; width:5px; background:#fff;"><span style="position:absolute; top:60px; left:-40px; color:#fff; font-size:1.5rem;">Present</span></div>
                    
                    <div style="position:absolute; left:15%; height:120px; width:12px; background:#f1c40f; opacity:${subStep >= 1 ? 1 : 0.1}; transition:0.5s; border-radius:10px; box-shadow: 0 0 30px #f1c40f;">
                        <span style="position:absolute; bottom:140px; left:-100px; font-size:2.2rem; color:#f1c40f; width:220px; font-weight:900;">1st ACTION<br>(Had + V3)</span>
                    </div>
                    
                    <div style="position:absolute; left:55%; height:120px; width:12px; background:#3498db; opacity:${subStep >= 1 ? 1 : 0.1}; transition:0.8s; border-radius:10px;">
                        <span style="position:absolute; bottom:140px; left:-100px; font-size:2.2rem; color:#3498db; width:220px; font-weight:900;">2nd ACTION<br>(Past Simple)</span>
                    </div>
                    <div style="position:absolute; left:15%; width:40%; height:10px; background:rgba(241,196,15,0.3); opacity:${subStep >= 1 ? 1 : 0}; transition:1s;"></div>
                </div>`;
        }
        else if (s.type === 'writing') {
            wrapper.innerHTML = `
                <h2 style="font-size:5.5rem; color:#c5a059; margin-bottom:40px; text-transform:uppercase;">${s.title}</h2>
                <div style="font-size:4rem; line-height:1.5; color:#fff;">${s.content}</div>`;
        }
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `
                <h2 style="font-size:4.5rem; color:#c5a059; margin-bottom:40px;">${s.title}</h2>
                <div style="display:flex; flex-direction:column; gap:20px; text-align:left;">
                    ${s.items.map((item, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0.05}; transform:translateX(${i <= subStep ? 0 : 50}px); transition:0.4s; background:#111; padding:35px; border-radius:20px; font-size:3rem; font-weight:bold; border-left:15px solid #f1c40f;">${item}</div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'transform') {
            let pair = s.pairs[Math.floor(subStep/2)] || s.pairs[0];
            let isAlt = subStep % 2 !== 0;
            wrapper.innerHTML = `
                <h2 style="font-size:5rem; color:#c5a059; margin-bottom:50px;">${s.title}</h2>
                <div style="background:#111; padding:80px; border-radius:40px; font-size:4.5rem; border:3px solid #333; color:${isAlt ? '#f1c40f' : '#fff'}; transition: 0.3s; font-weight:bold;">
                    ${isAlt ? pair.neg : pair.pos}
                </div>`;
        }
        else if (s.type === 'mcq') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#111; padding:60px; border-radius:40px; border:2px solid #333;">
                    <div style="font-size:3.5rem; font-weight:900; color:#fff; margin-bottom:50px; line-height:1.3;">${s.question}</div>
                    <div style="display:grid; grid-template-columns: 1fr; gap:25px; opacity:${subStep >= 1 ? 1 : 0.15}; transition:0.5s;">
                        ${s.options.map((opt, i) => {
                            let color = (subStep >= 2 && i === s.answer) ? '#27ae60' : (subStep >= 2 ? '#444' : '#fff');
                            let border = (subStep >= 2 && i === s.answer) ? '5px solid #27ae60' : '2px solid #333';
                            let scale = (subStep >= 2 && i === s.answer) ? 'scale(1.05)' : 'scale(1)';
                            return `<div style="padding:35px; border-radius:20px; font-size:2.8rem; font-weight:bold; border:${border}; color:${color}; transform:${scale}; transition:0.3s;">${opt}</div>`;
                        }).join('')}
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
    }

    render();
})();
