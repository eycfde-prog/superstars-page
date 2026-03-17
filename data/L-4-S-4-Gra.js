(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#0a0a0a; font-family:'Inter', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'PAST CONTINUOUS', sub: 'The Action in Progress', color: '#e74c3c' },
        
        /* 2: Usage Timeline */
        { 
            type: 'timeline', 
            title: 'When to use?', 
            content: 'To describe an action that was <span style="color:#f1c40f">GOING ON</span> at a specific time in the past.' 
        },

        /* 3: Formulation */
        { 
            type: 'writing', 
            title: 'The Blueprint', 
            content: '<div style="background:#222; padding:30px; border-radius:15px; border:2px dashed #f1c40f">Subject + <span style="color:#3498db">was / were</span> + <span style="color:#2ecc71">V-ing</span></div><br><small style="font-size:1.5rem; color:#888;">Example: I <span style="color:#3498db">was</span> <span style="color:#2ecc71">studying</span> at 9 PM yesterday.</small>' 
        },

        /* 4: Examples */
        { 
            type: 'reveal-list', 
            items: [
                "I was cleaning the car when he called.",
                "He was playing on his phone during class.",
                "She was yelling while he was playing.",
                "It was running after the laser.",
                "We were having fun at the academy.",
                "You were waiting for a long time."
            ] 
        },

        /* 5: Negative Form */
        { 
            type: 'transform', 
            title: 'Negative: Add "NOT"',
            pairs: [
                { pos: "He was playing...", neg: "He <span style='color:#e74c3c;'>was not</span> (wasn't) playing..." },
                { pos: "We were having...", neg: "We <span style='color:#e74c3c;'>were not</span> (weren't) having..." }
            ]
        },

        /* 6: Question Form */
        { 
            type: 'transform', 
            title: 'Question: The Switch',
            pairs: [
                { pos: "He was playing...", neg: "<span style='color:#f1c40f;'>Was he</span> playing...?" },
                { pos: "They were eating...", neg: "<span style='color:#f1c40f;'>Were they</span> eating...?" }
            ]
        },

        /* 7: Spelling Rules */
        { type: 'title', content: 'Spelling Rules', sub: 'Mastering the -ing ending', color: '#3498db' },
        { type: 'writing', title: 'Rule #1: The Magic E', content: 'Drop the <span style="color:#e74c3c;">E</span> ➔ Add <span style="color:#f1c40f;">ING</span><br><br><span style="font-size:3rem;">Wav<del style="color:red">e</del> + ing = <span style="color:#2ecc71">Waving</span></span>' },
        { type: 'writing', title: 'Rule #2: The CVC', content: 'Double the <span style="color:#e74c3c;">Last Letter</span><br><br><span style="font-size:3rem;">Cha<span style="color:red">t</span> + ing = <span style="color:#2ecc71">Chatting</span></span>' },

        /* 8: Quiz */
        { 
            type: 'mcq', 
            question: "While I ________ lunch, the phone suddenly rang.",
            options: ["A) eat", "B) was eating", "C) eating", "D) were eating"],
            answer: 1 
        }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:90%; text-align:center; animation: slideIn 0.5s ease;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <h1 style="font-size:6rem; font-weight:900; color:${s.color}; margin:0;">${s.content}</h1>
                <p style="font-size:2rem; letter-spacing:10px; color:#555; font-weight:bold; margin-top:20px;">${s.sub}</p>
            `;
        } 
        else if (s.type === 'timeline') {
            wrapper.innerHTML = `
                <h2 style="font-size:4rem; color:#e74c3c; margin-bottom:40px;">${s.title}</h2>
                <p style="font-size:2.5rem; margin-bottom:80px; font-weight:500;">${s.content}</p>
                <div style="position:relative; width:90%; margin:80px auto; height:4px; background:#333; display:flex; align-items:center;">
                    <div style="width:20px; height:20px; border-radius:50%; background:#fff; position:absolute; left:0;"></div>
                    <div style="width:20px; height:20px; border-radius:50%; background:#e74c3c; position:absolute; left:70%; border:5px solid #0a0a0a;">
                         <span style="position:absolute; top:40px; left:-30px; font-size:1.5rem; color:#e74c3c;">NOW</span>
                    </div>
                    <div style="position:absolute; left:20%; width:40%; height:15px; background:linear-gradient(90deg, transparent, #f1c40f, transparent); opacity:${subStep >= 1 ? 1 : 0}; transition:1s; border-radius:20px;">
                        <span style="position:absolute; top:-40px; width:100%; text-align:center; color:#f1c40f; font-weight:bold; font-size:1.2rem;">WAS HAPPENING</span>
                    </div>
                </div>
            `;
        }
        else if (s.type === 'writing') {
            wrapper.innerHTML = `
                <div style="text-align:left; border-left:20px solid #e74c3c; padding-left:40px; animation: bounceRight 0.5s;">
                    <h2 style="font-size:4rem; color:#e74c3c; text-transform:uppercase;">${s.title}</h2>
                    <div style="font-size:3.5rem; line-height:1.2; font-weight:700;">${s.content}</div>
                </div>`;
        }
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `
                <div style="display:flex; flex-direction:column; gap:15px; text-align:left;">
                    ${s.items.map((item, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0.1}; transform:translateX(${i <= subStep ? 0 : -20}px); transition:0.3s; background:#111; padding:20px; border-radius:12px; font-size:2rem; font-weight:bold; border-left:10px solid #3498db;">
                            ${item}
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'transform') {
            let pair = s.pairs[Math.floor(subStep/2)] || s.pairs[0];
            let isChanged = subStep % 2 !== 0;
            wrapper.innerHTML = `
                <div style="padding:50px; background:#111; border-radius:30px; border:2px solid #222;">
                    <h2 style="font-size:3rem; color:#e74c3c; margin-bottom:40px;">${s.title}</h2>
                    <div style="font-size:4rem; font-weight:900; transition:0.4s; color:${isChanged ? '#f1c40f' : '#fff'};">
                        ${isChanged ? pair.neg : pair.pos}
                    </div>
                </div>`;
        }
        else if (s.type === 'mcq') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#111; padding:50px; border-radius:30px;">
                    <div style="font-size:2.5rem; font-weight:bold; margin-bottom:40px;">${s.question}</div>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
                        ${s.options.map((opt, i) => {
                            let color = subStep >= 2 && i === s.answer ? '#27ae60' : '#222';
                            return `<div style="background:${color}; padding:25px; border-radius:15px; font-size:2rem; border:1px solid #444;">${opt}</div>`;
                        }).join('')}
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if (e.keyCode === 39 || e.keyCode === 32) { // Next
            if (s.type === 'timeline' && subStep < 1) subStep++;
            else if (s.type === 'reveal-list' && subStep < s.items.length - 1) subStep++;
            else if (s.type === 'transform' && subStep < (s.pairs.length * 2) - 1) subStep++;
            else if (s.type === 'mcq' && subStep < 2) subStep++;
            else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
            else { if(window.triggerVetoDone) window.triggerVetoDone(); }
        } else if (e.keyCode === 37) { // Back
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    render();
})();
