(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:calc(100vh - 200px); overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#0f0f0f; font-family:'Poppins', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'PAST PERFECT SIMPLE', color: '#e74c3c' },
        
        /* 2: Timeline Usage */
        { 
            type: 'timeline', 
            title: 'Usage', 
            content: 'An action had happened before another action happened.' 
        },

        /* 3: Formulation */
        { 
            type: 'writing', 
            title: 'Formulation', 
            content: '<span style="color:#f1c40f;">Subject + had + V3 (PP)</span><br><br><small>Example: They <span style="color:#e74c3c;">had cleaned</span> the car before they traveled.</small>' 
        },

        /* 4: Examples (One by One) */
        { 
            type: 'reveal-list', 
            items: [
                "I had finished my work before the meeting started.",
                "He had cleaned the car before they traveled.",
                "She had already cooked lunch when her husband arrived.",
                "It had stopped raining by the time we left the house.",
                "We had studied the lesson before the teacher explained it.",
                "You had seen that movie twice before I bought the DVD.",
                "They had lost their way before they found the map."
            ] 
        },

        /* 5: Focus Examples */
        { 
            type: 'writing', 
            title: 'Examples Focus', 
            content: '• He had cleaned the car before they traveled.<br>• It had stopped raining by the time we left.<br>• They had lost their way before they found the map.' 
        },

        /* 6: Negative (Transformation) */
        { 
            type: 'transform', 
            title: 'Negative Form',
            pairs: [
                { pos: "He had cleaned the car...", neg: "He <span style='color:#e74c3c;'>had not</span> cleaned the car..." },
                { pos: "It had stopped raining...", neg: "It <span style='color:#e74c3c;'>had not</span> stopped raining..." },
                { pos: "They had lost their way...", neg: "They <span style='color:#e74c3c;'>had not</span> lost their way..." }
            ]
        },

        /* 7: Question (Transformation) */
        { 
            type: 'transform', 
            title: 'Question Form',
            pairs: [
                { pos: "He had cleaned the car...", neg: "<span style='color:#f1c40f;'>Had he</span> cleaned the car...?" },
                { pos: "It had stopped raining...", neg: "<span style='color:#f1c40f;'>Had it</span> stopped raining...?" },
                { pos: "They had lost their way...", neg: "<span style='color:#f1c40f;'>Had they</span> lost their way...?" }
            ]
        },

        /* 8: Words */
        { type: 'title', content: 'Hide <br> Hiding', color: '#ffffff' },

        /* 9: Irregular */
        { type: 'reveal-list', items: ["Go = gone", "Write = written", "Eat = eaten", "See = seen"] },

        /* 10: Complete */
        { type: 'title', content: 'Complete <br> Completed', color: '#ffffff' },

        /* 11: Rule 1 */
        { type: 'writing', title: 'Rule 1', content: 'Verbs end with <span style="color:#e74c3c;">e</span> add only <span style="color:#f1c40f;">d</span>' },

        /* 12: Try */
        { type: 'title', content: 'Try <br> Tried', color: '#ffffff' },

        /* 13: Rule 2 */
        { type: 'writing', title: 'Rule 2', content: 'Verbs end with <span style="color:#e74c3c;">consonant + y</span><br>Remove <span style="color:#e74c3c;">y</span> and add <span style="color:#f1c40f;">ied</span>' },

        /* 14: Keywords */
        { type: 'writing', title: 'Keywords', content: '<div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;"><span>Before</span><span>After</span><span>By the time</span><span>As soon as</span><span>Until</span></div>' },

        /* 15: Quiz */
        { 
            type: 'mcq', 
            question: "We _________ the ability to speak English until we _________ grammar.",
            options: ["A) Hasn’t been spending", "B) Didn’t have / understood", "C) Haven’t had / understood", "D) hadn’t had / understood"],
            answer: 3 
        }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:95%; text-align:center; animation: fadeIn 0.4s ease;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `<h1 style="font-size:7rem; font-weight:900; color:${s.color}; margin:0; line-height:1.2;">${s.content}</h1>`;
        } 
        else if (s.type === 'timeline') {
            wrapper.innerHTML = `
                <div style="text-align:center;">
                    <h2 style="font-size:3rem; color:#e74c3c; margin-bottom:50px;">${s.title}</h2>
                    <p style="font-size:2.5rem; margin-bottom:60px;">${s.content}</p>
                    <div style="position:relative; width:80%; margin:auto; height:10px; background:white; display:flex; align-items:center; justify-content:space-between;">
                        <div style="position:absolute; left:-20px; border:20px solid transparent; border-right:20px solid white;"></div>
                        <div style="position:absolute; right:-20px; border:20px solid transparent; border-left:20px solid white;"></div>
                        <div style="height:40px; width:4px; background:#e74c3c; position:relative;">
                            <span style="position:absolute; top:50px; left:-30px; font-size:1.5rem;">Present</span>
                        </div>
                        <span style="position:absolute; left:10%; top:25px; font-size:1.5rem; color:#888;">Past</span>
                        <span style="position:absolute; right:10%; top:25px; font-size:1.5rem; color:#888;">Future</span>
                        <div style="position:absolute; left:25%; height:60px; width:6px; background:#f1c40f; transition:0.5s; opacity:${subStep >= 1 ? 1 : 0};">
                             <span style="position:absolute; bottom:70px; left:-40px; font-size:1.2rem; width:100px; color:#f1c40f;">Action 1 (Had+V3)</span>
                        </div>
                        <div style="position:absolute; left:35%; height:60px; width:6px; background:#3498db; transition:0.5s; opacity:${subStep >= 1 ? 1 : 0};">
                             <span style="position:absolute; bottom:70px; left:-40px; font-size:1.2rem; width:100px; color:#3498db;">Action 2 (Past Simple)</span>
                        </div>
                    </div>
                </div>`;
        }
        else if (s.type === 'writing') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#1e1e1e; padding:50px; border-left:15px solid #e74c3c; border-radius:15px; width:100%;">
                    <h2 style="font-size:4rem; margin-bottom:15px; color:#e74c3c;">${s.title}</h2>
                    <div style="font-size:3.5rem; line-height:1.4; color:#fff;">${s.content}</div>
                </div>`;
        }
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `<div style="display:flex; flex-direction:column; gap:10px; text-align:left;">
                ${s.items.map((item, i) => `
                    <div style="opacity:${i <= subStep ? 1 : 0}; transform:translateX(${i <= subStep ? 0 : -30}px); transition:0.4s; background:#1e1e1e; padding:15px; border-radius:10px; font-size:2rem; font-weight:bold; color:#fff; border-left:5px solid #e74c3c;">
                        ${item}
                    </div>
                `).join('')}
            </div>`;
        }
        else if (s.type === 'transform') {
            let pair = s.pairs[Math.floor(subStep/2)] || s.pairs[0];
            let isNeg = subStep % 2 !== 0;
            wrapper.innerHTML = `
                <div style="text-align:left; background:#1e1e1e; padding:50px; border-radius:15px; border:2px solid #444;">
                    <h2 style="font-size:3rem; color:#e74c3c; margin-bottom:30px;">${s.title}</h2>
                    <div style="font-size:3.5rem; transition:0.3s; color:${isNeg ? '#f1c40f' : '#fff'};">
                        ${isNeg ? pair.neg : pair.pos}
                    </div>
                    <div style="margin-top:20px; color:#666;">Step ${Math.floor(subStep/2) + 1} of ${s.pairs.length}</div>
                </div>`;
        }
        else if (s.type === 'mcq') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#1e1e1e; padding:40px; border-radius:20px; border: 2px solid #333;">
                    <div style="font-size:2.5rem; font-weight:bold; color:#fff; margin-bottom:30px;">${s.question}</div>
                    <div style="display:grid; grid-template-columns: 1fr; gap:15px; opacity:${subStep >= 1 ? 1 : 0}; transition: 0.5s;">
                        ${s.options.map((opt, i) => {
                            let bgColor = "#2c3e50";
                            if (subStep >= 2 && i === s.answer) bgColor = "#27ae60";
                            return `<div style="background:${bgColor}; padding:15px; border-radius:10px; font-size:2rem; font-weight:600;">${opt}</div>`;
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