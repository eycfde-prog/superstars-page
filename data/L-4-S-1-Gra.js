(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:calc(100vh - 200px); overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#0f0f0f; font-family:'Poppins', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'PAST SIMPLE', color: '#e74c3c' },
        
        /* 2: Timeline Usage */
        { 
            type: 'timeline', 
            title: 'Usage', 
            content: 'An action happened at a specific time in the past.' 
        },

        /* 3: Formulation */
        { 
            type: 'writing', 
            title: 'Formulation', 
            content: '<span style="color:#f1c40f;">Subject + V2 (Second Form)</span><br><br><small>Example: I <span style="color:#e74c3c;">visited</span> the pyramids last week.</small>' 
        },

        /* 4: Examples (One by One) */
        { 
            type: 'reveal-list', 
            items: [
                "I watched a good video yesterday.",
                "He played a lot today.",
                "She fixed my shirt this morning.",
                "It worked for a long time today.",
                "We studied English in class.",
                "They called us at night.",
                "You learned a lot at the course."
            ] 
        },

        /* 5: Positive Focus */
        { 
            type: 'writing', 
            title: 'Positive Form', 
            content: '• I watched a good video yesterday.<br>• He played a lot today.<br>• We studied English in class.' 
        },

        /* 6: Negative (Transformation) */
        { 
            type: 'transform', 
            title: 'Negative Form',
            pairs: [
                { pos: "I watched a video...", neg: "I <span style='color:#e74c3c;'>didn't watch</span> a video..." },
                { pos: "He played a lot...", neg: "He <span style='color:#e74c3c;'>didn't play</span> a lot..." },
                { pos: "We studied English...", neg: "We <span style='color:#e74c3c;'>didn't study</span> English..." }
            ]
        },

        /* 7: Question (Transformation) */
        { 
            type: 'transform', 
            title: 'Question Form',
            pairs: [
                { pos: "I watched a video...", neg: "<span style='color:#f1c40f;'>Did I watch</span> a video...?" },
                { pos: "He played a lot...", neg: "<span style='color:#f1c40f;'>Did he play</span> a lot...?" },
                { pos: "We studied English...", neg: "<span style='color:#f1c40f;'>Did we study</span> English...?" }
            ]
        },

        /* 8: Irregular Verbs */
        { 
            type: 'reveal-list', 
            items: [
                "<span style='color:#f1c40f;'>Go = Went</span>",
                "You went to the zoo last year.",
                "You didn't go to the zoo last year.",
                "Did you go to the zoo last year?"
            ] 
        },

        /* 9: Complete -> Completed */
        { type: 'title', content: 'Complete <br> Completed', color: '#ffffff' },

        /* 10: Rule 1 */
        { type: 'writing', title: 'Rule 1', content: 'Verbs end with <span style="color:#e74c3c;">e</span>: add only <span style="color:#f1c40f;">d</span>' },

        /* 11: Try -> Tried */
        { type: 'title', content: 'Try <br> Tried', color: '#ffffff' },

        /* 12: Rule 2 */
        { type: 'writing', title: 'Rule 2', content: 'Verbs end with <span style="color:#e74c3c;">consonant + y</span>:<br>Remove <span style="color:#e74c3c;">y</span> and add <span style="color:#f1c40f;">ied</span>' },

        /* 13: Shop -> Shopped */
        { type: 'title', content: 'Shop <br> Shopped', color: '#ffffff' },

        /* 14: Rule 3 (CVC) */
        { 
            type: 'writing', 
            title: 'Rule 3 (CVC)', 
            content: 'One syllable (C V C):<br>Double the last letter before adding <span style="color:#f1c40f;">ed</span>' 
        },

        /* 15: Keywords */
        { 
            type: 'reveal-list', 
            items: ["Yesterday", "Last", "Ago", "Before", "Once", "Time Expression"] 
        },

        /* 16: Quiz */
        { 
            type: 'mcq', 
            question: "They _________ us the email an hour ago.",
            options: ["A) Send", "B) Sending", "C) Sended", "D) Sent"],
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
                        <div style="height:50px; width:4px; background:#e74c3c; position:absolute; left:70%;">
                            <span style="position:absolute; top:60px; left:-35px; font-size:1.5rem; color:#e74c3c; font-weight:bold;">Present</span>
                        </div>
                        <span style="position:absolute; left:10%; top:25px; font-size:1.5rem; color:#888;">Past</span>
                        <span style="position:absolute; right:10%; top:25px; font-size:1.5rem; color:#888;">Future</span>
                        
                        <div style="position:absolute; left:30%; height:60px; width:10px; background:#f1c40f; transition:all 0.5s ease-out; opacity:${subStep >= 1 ? 1 : 0};">
                             <span style="position:absolute; bottom:70px; left:-45px; font-size:1.3rem; color:#f1c40f; width:100px; text-align:center; font-weight:bold;">Past Action</span>
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