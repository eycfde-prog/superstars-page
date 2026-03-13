(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:calc(100vh - 200px); overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#0f0f0f; font-family:'Poppins', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'PAST CONTINUOUS', color: '#e74c3c' },
        
        /* 2: Timeline Usage */
        { 
            type: 'timeline', 
            title: 'Usage', 
            content: 'An action was happening at a specific time in the past.' 
        },

        /* 3: Formulation */
        { 
            type: 'writing', 
            title: 'Formulation', 
            content: '<span style="color:#f1c40f;">Subject + (was / were) + V-ing</span><br><br><small>Example: I <span style="color:#e74c3c;">was writing</span> my homework at 7 pm.</small>' 
        },

        /* 4: Examples (One by One) */
        { 
            type: 'reveal-list', 
            items: [
                "I was cleaning the car when he called me.",
                "He was playing on his phone when his mother yelled.",
                "She was yelling at her son while he was playing.",
                "It was running after the laser.",
                "We were having a lot of fun at the course.",
                "You were waiting a long time before I came."
            ] 
        },

        /* 5: Positive Focus */
        { 
            type: 'writing', 
            title: 'Positive Form', 
            content: '• He was playing on his phone.<br>• We were having a lot of fun.<br>• You were waiting a long time.' 
        },

        /* 6: Negative (Transformation) */
        { 
            type: 'transform', 
            title: 'Negative Form',
            pairs: [
                { pos: "He was playing on his phone...", neg: "He <span style='color:#e74c3c;'>was not</span> playing on his phone..." },
                { pos: "We were having a lot of fun...", neg: "We <span style='color:#e74c3c;'>were not</span> having a lot of fun..." },
                { pos: "You were waiting a long time...", neg: "You <span style='color:#e74c3c;'>were not</span> waiting a long time..." }
            ]
        },

        /* 7: Question (Transformation) */
        { 
            type: 'transform', 
            title: 'Question Form',
            pairs: [
                { pos: "He was playing on his phone...", neg: "<span style='color:#f1c40f;'>Was he</span> playing on his phone...?" },
                { pos: "We were having a lot of fun...", neg: "<span style='color:#f1c40f;'>Were we</span> having a lot of fun...?" },
                { pos: "You were waiting a long time...", neg: "<span style='color:#f1c40f;'>Were you</span> waiting a long time...?" }
            ]
        },

        /* 8: Wave -> Waving */
        { type: 'title', content: 'Wave <br> Waving', color: '#ffffff' },

        /* 9: Rule 1 */
        { type: 'writing', title: 'Rule 1', content: 'Verbs end with <span style="color:#e74c3c;">e</span>: we remove <span style="color:#e74c3c;">e</span> before adding <span style="color:#f1c40f;">ing</span>' },

        /* 10: Tie -> Tying */
        { type: 'title', content: 'Tie <br> Tying', color: '#ffffff' },

        /* 11: Rule 2 */
        { type: 'writing', title: 'Rule 2', content: 'Verbs end with <span style="color:#e74c3c;">ie</span>: we remove <span style="color:#e74c3c;">ie</span> and add <span style="color:#f1c40f;">ying</span>' },

        /* 12: Chat -> Chatting */
        { type: 'title', content: 'Chat <br> Chatting', color: '#ffffff' },

        /* 13: Rule 3 (CVC) */
        { 
            type: 'writing', 
            title: 'Rule 3 (CVC)', 
            content: 'One syllable (C V C):<br>Double the last letter before adding <span style="color:#f1c40f;">ing</span>' 
        },

        /* 14: Keywords */
        { 
            type: 'reveal-list', 
            items: ["When", "While", "As", "At + Time", "Time Expression"] 
        },

        /* 15: Quiz */
        { 
            type: 'mcq', 
            question: "The teacher _________ while the naughty students were having a side talk.",
            options: ["A) talking", "B) Was talking", "C) talked", "D) Were talking"],
            answer: 1 
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
                    <h2 style="font-size:3.5rem; color:#e74c3c; margin-bottom:50px;">${s.title}</h2>
                    <p style="font-size:2.2rem; margin-bottom:60px;">${s.content}</p>
                    <div style="position:relative; width:80%; margin:40px auto; height:8px; background:white; display:flex; align-items:center; justify-content:space-between;">
                        <div style="position:absolute; left:-20px; border:20px solid transparent; border-right:20px solid white;"></div>
                        <div style="position:absolute; right:-20px; border:20px solid transparent; border-left:20px solid white;"></div>
                        <div style="height:50px; width:4px; background:#e74c3c; position:absolute; left:70%;">
                            <span style="position:absolute; top:60px; left:-35px; font-size:1.5rem; color:#e74c3c; font-weight:bold;">Present</span>
                        </div>
                        <span style="position:absolute; left:10%; top:25px; font-size:1.5rem; color:#888;">Past</span>
                        <span style="position:absolute; right:10%; top:25px; font-size:1.5rem; color:#888;">Future</span>
                        
                        <div style="position:absolute; left:20%; width:30%; height:12px; background:#f1c40f; transition:all 0.7s ease-out; opacity:${subStep >= 1 ? 1 : 0}; border-radius:10px; box-shadow: 0 0 15px #f1c40f;">
                             <span style="position:absolute; bottom:25px; left:0; font-size:1.3rem; color:#f1c40f; width:100%; text-align:center; font-weight:bold;">Past Continuous Action</span>
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
                    <div style="opacity:${i <= subStep ? 1 : 0}; transform:translateX(${i <= subStep ? 0 : -30}px); transition:0.4s; background:#1e1e1e; padding:18px; border-radius:10px; font-size:2.1rem; font-weight:bold; color:#fff; border-left:6px solid #e74c3c;">
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
                    <div style="font-size:3.8rem; transition:0.3s; color:${isChanged ? '#f1c40f' : '#fff'}; font-weight:bold;">
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