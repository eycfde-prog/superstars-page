(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#080202; font-family:'Segoe UI', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'PAST CONT.', subtitle: 'ACTION IN PROGRESS', color: '#e74c3c', usage: 'Was happening at a past moment' },
        
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
            content: `
                <div style="background:#1a0505; padding:60px; border-radius:40px; border:5px solid #e74c3c; text-align:center; box-shadow: 0 0 70px rgba(231,76,60,0.3);">
                    <span style="color:#fff">Subject + </span>
                    <span style="color:#f1c40f; font-weight:900; font-size:6.5rem;">WAS / WERE</span>
                    <br>
                    <span style="color:#fff; font-size:4rem;"> + </span>
                    <span style="color:#3498db; font-weight:900; font-size:7.5rem;">V + ING</span>
                </div>
            ` 
        },

        /* 4: Examples */
        { 
            type: 'reveal-list', 
            title: 'Live Action',
            items: [
                "1. I was cleaning the car at 5 PM.",
                "2. He was playing during class.",
                "3. We were having fun at the academy.",
                "4. You were waiting for a long time.",
                "5. It was raining all night long."
            ] 
        },

        /* 5: Negative Form */
        { 
            type: 'transform', 
            title: 'The Negative',
            pairs: [
                { pos: "He was playing...", neg: "He <span style='color:#e74c3c;'>was NOT (wasn't)</span> playing..." },
                { pos: "We were having...", neg: "We <span style='color:#e74c3c;'>were NOT (weren't)</span> having..." }
            ]
        },

        /* 6: Question Form */
        { 
            type: 'transform', 
            title: 'The Switch (Question)',
            pairs: [
                { pos: "He was playing...", neg: "<span style='color:#f1c40f;'>WAS he</span> playing...?" },
                { pos: "They were eating...", neg: "<span style='color:#f1c40f;'>WERE they</span> eating...?" }
            ]
        },

        /* 7: Spelling Rules */
        { 
            type: 'writing', 
            title: 'Spelling Mastery', 
            content: `
                <div style="display:grid; grid-template-columns:1fr; gap:25px; font-size:3.5rem; text-align:left; font-weight:bold;">
                    <div style="color:#f1c40f;">Ride ➔ <span style="color:#e74c3c;">Riding</span> <small style="color:#fff">(Bye Bye 'e')</small></div>
                    <div style="color:#f1c40f;">Stop ➔ <span style="color:#e74c3c;">Stopping</span> <small style="color:#fff">(Double P)</small></div>
                    <div style="color:#f1c40f;">Lie ➔ <span style="color:#e74c3c;">Lying</span> <small style="color:#fff">(ie ➔ y)</small></div>
                </div>
            ` 
        },

        /* --- Quiz Section (5 Questions) --- */
        { 
            type: 'mcq', 
            question: "1. While I ________ lunch, the phone rang.",
            options: ["A) eat", "B) was eating", "C) eating", "D) were eating"],
            answer: 1 
        },
        { 
            type: 'mcq', 
            question: "2. At 10 PM last night, they ________ TV.",
            options: ["A) was watching", "B) were watching", "C) watched", "D) are watching"],
            answer: 1 
        },
        { 
            type: 'mcq', 
            question: "3. She _________ (not) studying when I arrived.",
            options: ["A) wasn't", "B) weren't", "C) isn't", "D) didn't"],
            answer: 0 
        },
        { 
            type: 'mcq', 
            question: "4. What _________ doing at this time yesterday?",
            options: ["A) was you", "B) did you", "C) were you", "D) you were"],
            answer: 2 
        },
        { 
            type: 'mcq', 
            question: "5. When the teacher entered, the boys _________.",
            options: ["A) was shouting", "B) were shouting", "C) shouts", "D) shouted"],
            answer: 1 
        },
        
        { type: 'title', content: 'LEGENDARY!', subtitle: 'TOP PERFORMANCE', color: '#f1c40f', usage: 'PAST CONTINUOUS CONQUERED!' }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:90%; max-width:1400px; text-align:center; animation: fadeIn 0.4s ease;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <div style="font-size:2.5rem; color:#444; letter-spacing:15px; margin-bottom:20px; text-transform:uppercase; font-weight:bold;">${s.subtitle}</div>
                <h1 style="font-size:9.5rem; font-weight:900; color:${s.color}; margin:0; line-height:1; text-shadow: 0 10px 40px rgba(231,76,60,0.4);">${s.content}</h1>
                <div style="font-size:4rem; color:#fff; font-weight:bold; margin-top:50px; border-top:6px solid ${s.color}; display:inline-block; padding-top:20px;">${s.usage}</div>
            `;
        } 
        else if (s.type === 'timeline') {
            wrapper.innerHTML = `
                <h2 style="font-size:5.5rem; color:#e74c3c; margin-bottom:50px; font-weight:900;">${s.title}</h2>
                <p style="font-size:3.5rem; margin-bottom:100px; color:#ddd;">${s.content}</p>
                <div style="position:relative; width:90%; margin:100px auto; height:12px; background:#222; border-radius:10px;">
                    <div style="position:absolute; left:0; height:40px; width:4px; background:#666; top:-14px;"></div>
                    <div style="position:absolute; left:75%; height:60px; width:6px; background:#e74c3c; top:-24px; box-shadow: 0 0 20px #e74c3c;"><span style="position:absolute; top:70px; left:-30px; color:#e74c3c; font-size:2.2rem; font-weight:bold;">NOW</span></div>
                    <div style="position:absolute; left:15%; width:45%; height:25px; background:linear-gradient(90deg, transparent, #f1c40f, transparent); opacity:${subStep >= 1 ? 1 : 0}; transition:1s; border-radius:20px; top:-6px;">
                        <span style="position:absolute; top:-50px; width:100%; text-align:center; color:#f1c40f; font-weight:bold; font-size:2.5rem;">WAS HAPPENING</span>
                    </div>
                </div>`;
        }
        else if (s.type === 'writing') {
            wrapper.innerHTML = `
                <h2 style="font-size:6rem; color:#e74c3c; margin-bottom:50px; font-weight:900; text-transform:uppercase;">${s.title}</h2>
                <div style="font-size:4.5rem; line-height:1.2; font-weight:bold;">${s.content}</div>
            `;
        }
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `
                <h2 style="font-size:5.5rem; color:#e74c3c; margin-bottom:50px; font-weight:900;">EXAMPLES</h2>
                <div style="display:flex; flex-direction:column; gap:20px; text-align:left;">
                    ${s.items.map((item, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0.03}; transform:translateX(${i <= subStep ? 0 : -60}px); transition:0.4s; background:#111; padding:35px; border-radius:25px; font-size:3.2rem; font-weight:bold; border-left:20px solid #e74c3c; box-shadow: 10px 10px 30px rgba(0,0,0,0.5);">
                            ${item}
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'transform') {
            let pair = s.pairs[Math.floor(subStep/2)] || s.pairs[0];
            let isChanged = subStep % 2 !== 0;
            wrapper.innerHTML = `
                <h2 style="font-size:6rem; color:#e74c3c; margin-bottom:60px; font-weight:900;">${s.title}</h2>
                <div style="background:#111; padding:80px; border-radius:50px; font-size:5rem; border:4px solid #333; color:${isChanged ? '#f1c40f' : '#fff'}; transition: 0.3s; font-weight:bold; box-shadow: inset 0 0 50px rgba(0,0,0,0.8);">
                    ${isChanged ? pair.neg : pair.pos}
                </div>`;
        }
        else if (s.type === 'mcq') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#111; padding:70px; border-radius:50px; border:3px solid #222; box-shadow: 0 20px 60px rgba(0,0,0,0.7);">
                    <div style="font-size:4rem; font-weight:900; margin-bottom:50px; color:#fff; line-height:1.2;">${s.question}</div>
                    <div style="display:grid; grid-template-columns: 1fr; gap:25px;">
                        ${s.options.map((opt, i) => {
                            let isCorrect = subStep >= 2 && i === s.answer;
                            let border = isCorrect ? '8px solid #2ecc71' : '2px solid #333';
                            let bg = isCorrect ? 'rgba(46,204,113,0.1)' : 'transparent';
                            let color = isCorrect ? '#2ecc71' : (subStep >= 2 ? '#444' : '#fff');
                            return `<div style="background:${bg}; border:${border}; padding:30px; border-radius:25px; font-size:3.2rem; font-weight:bold; color:${color}; transition:0.3s;">${opt}</div>`;
                        }).join('')}
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if (e.keyCode === 39 || e.keyCode === 32) { // Next / Space
            if ((s.type === 'timeline' || s.type === 'reveal-list') && subStep < (s.items ? s.items.length - 1 : 1)) subStep++;
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
