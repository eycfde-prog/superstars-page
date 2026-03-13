(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:calc(100vh - 200px); overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#0f0f0f; font-family:'Poppins', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'FUTURE SIMPLE', color: '#e74c3c' },
        
        /* 2: Timeline Usage */
        { 
            type: 'timeline', 
            title: 'Usage', 
            content: 'An action will or going to happen in the future.' 
        },

        /* 3: Formulation */
        { 
            type: 'writing', 
            title: 'Formulation', 
            content: '<span style="color:#f1c40f;">Subject + (will / be going to) + Infinitive</span><br><br><small>Example: I <span style="color:#e74c3c;">am going to have</span> a party tomorrow.</small>' 
        },

        /* 4: Examples (One by One) */
        { 
            type: 'reveal-list', 
            items: [
                "I will sleep after the dinner.",
                "He will say it again.",
                "She is going to visit next week.",
                "It will bite you.",
                "We are going to study the future tense.",
                "They will come tomorrow.",
                "You will answer me."
            ] 
        },

        /* 5: Positive Focus */
        { 
            type: 'writing', 
            title: 'Positive Form', 
            content: '• He will say it again.<br>• We are going to study the future tense.<br>• You will answer me.' 
        },

        /* 6: Negative (Transformation) */
        { 
            type: 'transform', 
            title: 'Negative Form',
            pairs: [
                { pos: "He will say it again.", neg: "He <span style='color:#e74c3c;'>will not</span> say it again." },
                { pos: "We are going to study...", neg: "We <span style='color:#e74c3c;'>are not</span> going to study..." },
                { pos: "You will answer me.", neg: "You <span style='color:#e74c3c;'>will not</span> answer me." }
            ]
        },

        /* 7: Question (Transformation) */
        { 
            type: 'transform', 
            title: 'Question Form',
            pairs: [
                { pos: "He will say it again.", neg: "<span style='color:#f1c40f;'>Will he</span> say it again?" },
                { pos: "We are going to study...", neg: "<span style='color:#f1c40f;'>Are we</span> going to study...?" },
                { pos: "You will answer me.", neg: "<span style='color:#f1c40f;'>Will you</span> answer me?" }
            ]
        },

        /* 8: Keywords */
        { 
            type: 'reveal-list', 
            items: ["Soon", "I think", "Maybe", "Tomorrow", "Today", "Now", "Next"] 
        },

        /* 9: Quiz */
        { 
            type: 'mcq', 
            question: "The children ____________ at the party.",
            options: ["A) Are going", "B) Is going to", "C) Will having", "D) Are going to"],
            answer: 3 
        }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:95%; text-align:center; animation: fadeIn 0.4s ease;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `<h1 style="font-size:8rem; font-weight:900; color:${s.color}; margin:0; line-height:1.2;">${s.content}</h1>`;
        } 
        else if (s.type === 'timeline') {
            wrapper.innerHTML = `
                <div style="text-align:center;">
                    <h2 style="font-size:3.5rem; color:#e74c3c; margin-bottom:50px;">${s.title}</h2>
                    <p style="font-size:2.2rem; margin-bottom:60px;">${s.content}</p>
                    <div style="position:relative; width:80%; margin:40px auto; height:8px; background:white; display:flex; align-items:center; justify-content:space-between;">
                        <div style="position:absolute; left:-20px; border:20px solid transparent; border-right:20px solid white;"></div>
                        <div style="position:absolute; right:-20px; border:20px solid transparent; border-left:20px solid white;"></div>
                        <div style="height:50px; width:4px; background:#e74c3c; position:absolute; left:50%;">
                            <span style="position:absolute; top:60px; left:-35px; font-size:1.5rem; color:#e74c3c; font-weight:bold;">Present</span>
                        </div>
                        <span style="position:absolute; left:10%; top:25px; font-size:1.5rem; color:#888;">Past</span>
                        <span style="position:absolute; right:10%; top:25px; font-size:1.5rem; color:#888;">Future</span>
                        
                        <div style="position:absolute; left:75%; height:60px; width:8px; background:#f1c40f; transition:all 0.5s ease-out; opacity:${subStep >= 1 ? 1 : 0};">
                             <span style="position:absolute; bottom:70px; left:-45px; font-size:1.3rem; color:#f1c40f; width:100px; text-align:center; font-weight:bold;">Future Action</span>
                        </div>
                    </div>
                </div>`;
        }
        else if (s.type === 'writing') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#1e1e1e; padding:50px; border-left:15px solid #e74c3c; border-radius:15px; width:100%;">
                    <h2 style="font-size:4.5rem; margin-bottom:20px; color:#e74c3c;">${s.title}</h2>
                    <div style="font-size:3.8rem; line-height:1.4; color:#fff;">${s.content}</div>
                </div>`;
        }
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `<div style="display:flex; flex-direction:column; gap:12px; text-align:left;">
                ${s.items.map((item, i) => `
                    <div style="opacity:${i <= subStep ? 1 : 0}; transform:translateX(${i <= subStep ? 0 : -30}px); transition:0.4s; background:#1e1e1e; padding:18px; border-radius:10px; font-size:2.2rem; font-weight:bold; color:#fff; border-left:6px solid #e74c3c;">
                        ${item}
                    </div>
                `).join('')}
            </div>`;
        }
        else if (s.type === 'transform') {
            let pair = s.pairs[Math.floor(subStep/2)] || s.pairs[0];
            let isChanged = subStep % 2 !== 0;
            wrapper.innerHTML = `
                <div style="text-align:left; background:#1e1e1e; padding:60px; border-radius:15px; border:2px solid #444;">
                    <h2 style="font-size:3.5rem; color:#e74c3c; margin-bottom:35px;">${s.title}</h2>
                    <div style="font-size:4rem; transition:0.3s; color:${isChanged ? '#f1c40f' : '#fff'}; font-weight:bold;">
                        ${isChanged ? pair.neg : pair.pos}
                    </div>
                </div>`;
        }
        else if (s.type === 'mcq') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#1e1e1e; padding:45px; border-radius:25px; border: 2px solid #333;">
                    <div style="font-size:2.8rem; font-weight:bold; color:#fff; margin-bottom:35px;">${s.question}</div>
                    <div style="display:grid; grid-template-columns: 1fr; gap:18px; opacity:${subStep >= 1 ? 1 : 0}; transition: 0.5s;">
                        ${s.options.map((opt, i) => {
                            let bgColor = "#2c3e50";
                            if (subStep >= 2 && i === s.answer) bgColor = "#27ae60";
                            return `<div style="background:${bgColor}; padding:18px; border-radius:12px; font-size:2.2rem; font-weight:600;">${opt}</div>`;
                        }).join('')}
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if (e.keyCode === 39 || e.keyCode === 13 || e.keyCode === 32) { // Next
            if (s.type === 'timeline' && subStep < 1) subStep++;
            else if (s.type === 'reveal-list' && subStep < s.items.length - 1) subStep++;
            else if (s.type === 'transform' && subStep < (s.pairs.length * 2) - 1) subStep++;
            else if (s.type === 'mcq' && subStep < 2) subStep++;
            else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
        } else if (e.keyCode === 37) { // Back
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    render();
})();
