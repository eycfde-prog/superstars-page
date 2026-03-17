(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#050505; font-family:'Segoe UI', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        { type: 'title', content: 'PAST PERFECT', subtitle: 'THE MASTER OF TIME', color: '#c5a059', usage: 'The "Past" of another Past Action' },
        
        { 
            type: 'timeline-new', 
            title: 'Which happened first?', 
            content: 'We use <span style="color:#c5a059">Had + V3</span> to mark the oldest action.' 
        },

        { 
            type: 'writing', 
            title: 'The Formula', 
            content: `<div style="background:#111; padding:60px; border-radius:40px; border:3px solid #c5a059; text-align:center; font-size:5rem;">
                        <span style="color:#fff">Subject + </span>
                        <span style="color:#c5a059; font-weight:900;">HAD</span>
                        <span style="color:#fff"> + </span>
                        <span style="color:#e74c3c; font-weight:900;">V3 (P.P)</span>
                      </div>` 
        },

        { 
            type: 'reveal-list', 
            title: 'Logic in Order',
            items: [
                "I <span style='color:#c5a059'>had finished</span> before the meeting started.",
                "She <span style='color:#c5a059'>had cooked</span> lunch when he arrived.",
                "The train <span style='color:#c5a059'>had left</span> by the time we reached.",
                "They <span style='color:#c5a059'>had lost</span> their way before finding the map."
            ] 
        },

        { 
            type: 'writing', 
            title: 'Logic Connectors', 
            content: `<div style="display:grid; grid-template-columns:1fr 1fr; gap:40px; color:#3498db; text-align:center;">
                        <div style="background:#111; padding:30px; border-radius:20px; border:1px solid #333;">
                            <small style="color:#fff; font-size:1.5rem;">+ HAD + V3</small><br>AFTER<br>AS SOON AS
                        </div>
                        <div style="background:#111; padding:30px; border-radius:20px; border:1px solid #333;">
                            <small style="color:#fff; font-size:1.5rem;">+ V2 (Simple)</small><br>BEFORE<br>BY THE TIME
                        </div>
                      </div>` 
        },

        { 
            type: 'mcq', 
            question: "We _________ the ability to speak English until we _________ grammar.",
            options: ["A) didn't have / understood", "B) hadn't have / understood", "C) hadn't had / understood", "D) haven't had / understood"],
            answer: 2 
        },

        { type: 'title', content: 'LEGENDARY!', subtitle: 'MISSION COMPLETE', color: '#27ae60', usage: 'YOU MASTERED THE PAST PERFECT' }
    ];

    window.nextSlide = function() {
        const s = slides[currentSlide];
        if (s.type === 'timeline-new' && subStep < 1) subStep++;
        else if (s.type === 'reveal-list' && subStep < s.items.length - 1) subStep++;
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
        wrapper.style.cssText = `width:90%; max-width:1300px; text-align:center; transition:0.5s;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <div style="font-size:2rem; color:#888; letter-spacing:15px; margin-bottom:15px;">${s.subtitle}</div>
                <h1 style="font-size:9.5rem; font-weight:900; color:${s.color}; margin:0; line-height:1;">${s.content}</h1>
                <div style="font-size:3.8rem; color:#fff; font-weight:bold; margin-top:40px; border-top:4px solid ${s.color}; display:inline-block; padding-top:20px;">${s.usage}</div>
            `;
        } 
        else if (s.type === 'timeline-new') {
            wrapper.innerHTML = `
                <h2 style="font-size:5rem; color:#c5a059; margin-bottom:50px;">${s.title}</h2>
                <div style="position:relative; width:90%; margin:100px auto; height:12px; background:#222; border-radius:10px; display:flex; align-items:center;">
                    <div style="position:absolute; right:0; height:60px; width:6px; background:#fff;">
                        <span style="position:absolute; top:70px; left:-30px; font-size:2rem;">NOW</span>
                    </div>
                    <div style="position:absolute; left:60%; height:120px; width:12px; background:#3498db; opacity:${subStep >= 1 ? 1 : 0.1}; transition:0.5s;">
                        <span style="position:absolute; bottom:130px; left:-80px; font-size:2.2rem; color:#3498db; width:200px; font-weight:bold;">Action 2<br>(Past Simple)</span>
                    </div>
                    <div style="position:absolute; left:20%; height:180px; width:15px; background:#c5a059; box-shadow:0 0 30px #c5a059; opacity:${subStep >= 1 ? 1 : 0.1}; transition:1s;">
                        <span style="position:absolute; bottom:190px; left:-80px; font-size:2.8rem; color:#c5a059; width:200px; font-weight:900;">Action 1<br>(Had + V3)</span>
                    </div>
                    <div style="position:absolute; right:-10px; border-left:25px solid #222; border-top:20px solid transparent; border-bottom:20px solid transparent;"></div>
                </div>
                <p style="font-size:3rem; margin-top:150px; color:#aaa;">${s.content}</p>`;
        }
        else if (s.type === 'writing') {
            wrapper.innerHTML = `
                <h2 style="font-size:5rem; color:#c5a059; margin-bottom:50px;">${s.title}</h2>
                <div style="font-size:4.5rem; line-height:1.4;">${s.content}</div>`;
        }
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `
                <h2 style="font-size:4.5rem; color:#c5a059; margin-bottom:40px;">${s.title}</h2>
                <div style="display:flex; flex-direction:column; gap:20px; text-align:left;">
                    ${s.items.map((item, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0.05}; transform:translateX(${i <= subStep ? 0 : 50}px); transition:0.4s; background:#111; padding:35px; border-radius:25px; font-size:3.2rem; border-left:15px solid #c5a059;">${item}</div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'mcq') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#111; padding:60px; border-radius:40px; border:2px solid #333;">
                    <div style="font-size:3.8rem; font-weight:900; color:#fff; margin-bottom:50px; line-height:1.3;">${s.question}</div>
                    <div style="display:grid; grid-template-columns: 1fr; gap:25px; opacity:${subStep >= 1 ? 1 : 0.2}; transition:0.6s;">
                        ${s.options.map((opt, i) => {
                            let bgColor = "#1a1a1a";
                            let border = "2px solid #333";
                            if (subStep >= 2 && i === s.answer) { bgColor = "#238636"; border = "5px solid #fff"; }
                            return `<div style="background:${bgColor}; padding:35px; border-radius:20px; font-size:3rem; font-weight:bold; border:${border}; color:#fff;">${opt}</div>`;
                        }).join('')}
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
    }

    render();
})();
