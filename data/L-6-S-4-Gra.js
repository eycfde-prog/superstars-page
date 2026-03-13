(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:calc(100vh - 200px); overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#0f0f0f; font-family:'Poppins', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'PRESENT PERFECT CONTINUOUS', color: '#e74c3c' },
        
        /* 2: Timeline Usage */
        { 
            type: 'timeline', 
            title: 'Usage', 
            content: 'An action started in the past and has been happening to the present moment.' 
        },

        /* 3: Formulation */
        { 
            type: 'writing', 
            title: 'Formulation', 
            content: '<span style="color:#f1c40f;">Subject + (have/has) + been + V-ing</span><br><br><small>Example: I <span style="color:#e74c3c;">have been waiting</span> for a long time.</small>' 
        },

        /* 4: Examples (One by One) */
        { 
            type: 'reveal-list', 
            items: [
                "I have been waiting for you for a long time at the station.",
                "He has been working on this project since early morning.",
                "She has been studying English for three hours straight.",
                "It has been raining heavily all night long.",
                "We have been looking for our lost keys everywhere.",
                "You have been watching television for too long today.",
                "They have been playing football in the garden since 4 PM."
            ] 
        },

        /* 5: Positive Focus */
        { 
            type: 'writing', 
            title: 'Positive Form', 
            content: '• I have been waiting for you.<br>• She has been studying English.<br>• You have been watching television.' 
        },

        /* 6: Negative (Transformation) */
        { 
            type: 'transform', 
            title: 'Negative Form',
            pairs: [
                { pos: "I have been waiting...", neg: "I <span style='color:#e74c3c;'>have not</span> been waiting..." },
                { pos: "She has been studying...", neg: "She <span style='color:#e74c3c;'>has not</span> been studying..." },
                { pos: "You have been watching...", neg: "You <span style='color:#e74c3c;'>have not</span> been watching..." }
            ]
        },

        /* 7: Question (Transformation) */
        { 
            type: 'transform', 
            title: 'Question Form',
            pairs: [
                { pos: "I have been waiting...", neg: "<span style='color:#f1c40f;'>Have I</span> been waiting...?" },
                { pos: "She has been studying...", neg: "<span style='color:#f1c40f;'>Has she</span> been studying...?" },
                { pos: "You have been watching...", neg: "<span style='color:#f1c40f;'>Have you</span> been watching...?" }
            ]
        },

        /* 8: Hide -> Hiding */
        { type: 'title', content: 'Hide <br> Hiding', color: '#ffffff' },

        /* 9: Rule 1 */
        { type: 'writing', title: 'Rule 1', content: 'Verbs end with <span style="color:#e74c3c;">e</span>: we remove <span style="color:#e74c3c;">e</span> before adding <span style="color:#f1c40f;">ing</span>' },

        /* 10: Lie -> Lying */
        { type: 'title', content: 'Lie <br> Lying', color: '#ffffff' },

        /* 11: Rule 2 */
        { type: 'writing', title: 'Rule 2', content: 'Verbs end with <span style="color:#e74c3c;">ie</span>: we remove <span style="color:#e74c3c;">ie</span> and add <span style="color:#f1c40f;">ying</span>' },

        /* 12: Swim -> Swimming */
        { type: 'title', content: 'Swim <br> Swimming', color: '#ffffff' },

        /* 13: Rule 3 (CVC) */
        { 
            type: 'writing', 
            title: 'Rule 3 (CVC)', 
            content: 'One syllable (C V C):<br>Double the last letter before adding <span style="color:#f1c40f;">ing</span>' 
        },

        /* 14: Keywords */
        { 
            type: 'reveal-list', 
            items: ["For", "Since", "All (day/morning/week)", "How long?", "Lately", "Recently"] 
        },

        /* 15: Quiz */
        { 
            type: 'mcq', 
            question: "The government _________ much on education recently.",
            options: ["A) Hasn’t been spending", "B) Have been spending", "C) Is spent", "D) Will spend"],
            answer: 0 
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
                    <p style="font-size:2rem; margin-bottom:60px;">${s.content}</p>
                    <div style="position:relative; width:80%; margin:40px auto; height:8px; background:white; display:flex; align-items:center; justify-content:space-between;">
                        <div style="position:absolute; left:-20px; border:20px solid transparent; border-right:20px solid white;"></div>
                        <div style="position:absolute; right:-20px; border:20px solid transparent; border-left:20px solid white;"></div>
                        <div style="height:40px; width:4px; background:#e74c3c; position:absolute; left:50%;">
                            <span style="position:absolute; top:50px; left:-30px; font-size:1.5rem; color:#e74c3c; font-weight:bold;">Present</span>
                        </div>
                        <span style="position:absolute; left:10%; top:25px; font-size:1.5rem; color:#888;">Past</span>
                        <span style="position:absolute; right:10%; top:25px; font-size:1.5rem; color:#888;">Future</span>
                        <div style="position:absolute; left:25%; width:25%; height:12px; background:#2ecc71; transition:all 0.8s ease-out; opacity:${subStep >= 1 ? 1 : 0}; border-radius:10px; box-shadow: 0 0 15px #2ecc71;">
                             <span style="position:absolute; bottom:25px; left:0; font-size:1.3rem; color:#2ecc71; width:100%; text-align:center; font-weight:bold;">Continuous Action</span>
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
                    <div style="opacity:${i <= subStep ? 1 : 0}; transform:translateX(${i <= subStep ? 0 : -30}px); transition:0.4s; background:#1e1e1e; padding:15px; border-radius:10px; font-size:1.9rem; font-weight:bold; color:#fff; border-left:5px solid #e74c3c;">
                        ${item}
                    </div>
                `).join('')}
            </div>`;
        }
        else if (s.type === 'transform') {
            let pair = s.pairs[Math.floor(subStep/2)] || s.pairs[0];
            let isChanged = subStep % 2 !== 0;
            wrapper.innerHTML = `
                <div style="text-align:left; background:#1e1e1e; padding:50px; border-radius:15px; border:2px solid #444;">
                    <h2 style="font-size:3rem; color:#e74c3c; margin-bottom:30px;">${s.title}</h2>
                    <div style="font-size:3.5rem; transition:0.3s; color:${isChanged ? '#f1c40f' : '#fff'};">
                        ${isChanged ? pair.neg : pair.pos}
                    </div>
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