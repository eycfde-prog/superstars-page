(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:calc(100vh - 200px); overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#0f0f0f; font-family:'Poppins', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'PRESENT CONTINUOUS', color: '#e74c3c' },
        
        /* 2: Timeline Usage */
        { 
            type: 'timeline', 
            title: 'Usage', 
            content: 'An action is happening at the moment.' 
        },

        /* 3: Formulation */
        { 
            type: 'writing', 
            title: 'Formulation', 
            content: '<span style="color:#3498db;">Subject + (am / is / are) + V-ing</span><br><br><small>Example: It <span style="color:#e74c3c;">is raining</span>.</small>' 
        },

        /* 4: Examples (One by One) */
        { 
            type: 'reveal-list', 
            items: [
                "I’m talking to you.",
                "He is explaining the lesson.",
                "She is writing the lesson.",
                "It is working well.",
                "We are studying English.",
                "They are calling us.",
                "You are learning English."
            ] 
        },

        /* 5: Positive Focus */
        { 
            type: 'writing', 
            title: 'Positive Form', 
            content: '• I’m talking to you.<br>• It is working well.<br>• They are calling us.' 
        },

        /* 6: Negative (Transformation) */
        { 
            type: 'transform', 
            title: 'Negative Form',
            pairs: [
                { pos: "I'm talking to you.", neg: "I <span style='color:#e74c3c;'>am not</span> talking to you." },
                { pos: "It is working well.", neg: "It <span style='color:#e74c3c;'>is not</span> working well." },
                { pos: "They are calling us.", neg: "They <span style='color:#e74c3c;'>are not</span> calling us." }
            ]
        },

        /* 7: Question (Transformation) */
        { 
            type: 'transform', 
            title: 'Question Form',
            pairs: [
                { pos: "I'm talking to you.", neg: "<span style='color:#f1c40f;'>Am I</span> talking to you?" },
                { pos: "It is working well.", neg: "<span style='color:#f1c40f;'>Is it</span> working well?" },
                { pos: "They are calling us.", neg: "<span style='color:#f1c40f;'>Are they</span> calling us?" }
            ]
        },

        /* 8: Write -> Writing */
        { type: 'title', content: 'Write <br> Writing', color: '#ffffff' },

        /* 9: Rule 1 */
        { type: 'writing', title: 'Rule 1', content: 'Remove the last <span style="color:#e74c3c;">e</span> before adding <span style="color:#f1c40f;">ing</span>' },

        /* 10: Die -> Dying */
        { type: 'title', content: 'Die <br> Dying', color: '#ffffff' },

        /* 11: Rule 2 */
        { type: 'writing', title: 'Rule 2', content: 'Remove the last <span style="color:#e74c3c;">ie</span> and add <span style="color:#f1c40f;">ying</span>' },

        /* 12: Shop -> Shopping */
        { type: 'title', content: 'Shop <br> Shopping', color: '#ffffff' },

        /* 13: Rule 3 (CVC) */
        { 
            type: 'writing', 
            title: 'Rule 3 (CVC)', 
            content: 'One syllable (C V C):<br>Double the last letter before adding <span style="color:#f1c40f;">ing</span>' 
        },

        /* 14: Keywords */
        { 
            type: 'reveal-list', 
            items: ["Now", "Right now", "At the moment", "Look", "Listen"] 
        },

        /* 15: Quiz */
        { 
            type: 'mcq', 
            question: "The man is _________ fast.",
            options: ["A) Run", "B) Runing", "C) Running", "D) Ran"],
            answer: 2 
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
                        <div style="height:50px; width:4px; background:#fff; position:absolute; left:50%;">
                            <span style="position:absolute; top:60px; left:-35px; font-size:1.5rem; color:#fff; font-weight:bold;">Present</span>
                        </div>
                        <span style="position:absolute; left:10%; top:25px; font-size:1.5rem; color:#888;">Past</span>
                        <span style="position:absolute; right:10%; top:25px; font-size:1.5rem; color:#888;">Future</span>
                        
                        <div style="position:absolute; left:50%; height:80px; width:12px; background:#2ecc71; transition:all 0.5s ease-out; opacity:${subStep >= 1 ? 1 : 0}; transform: translate(-50%, -40%); box-shadow: 0 0 20px #2ecc71;">
                             <span style="position:absolute; bottom:90px; left:-60px; font-size:1.4rem; color:#2ecc71; width:130px; text-align:center; font-weight:bold;">RIGHT NOW!</span>
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