(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#050505; font-family:'Segoe UI', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'FUTURE CONT.', subtitle: 'MASTERY LEVEL', color: '#3498db', usage: 'In Progress at a Future Point' },
        
        /* 2: Timeline Usage */
        { 
            type: 'timeline', 
            title: 'When to use it?', 
            content: 'To talk about an action that <span style="color:#3498db">WILL BE IN PROGRESS</span> at a specific time in the future.' 
        },

        /* 3: Formulation */
        { 
            type: 'writing', 
            title: 'The Formula', 
            content: `
                <div style="background:#111; padding:50px; border-radius:30px; border:5px dashed #3498db; text-align:center; box-shadow: 0 0 60px rgba(52,152,219,0.3);">
                    <span style="color:#fff">Subject + </span>
                    <span style="color:#f1c40f; font-weight:900; font-size:6.5rem;">WILL BE</span>
                    <br>
                    <span style="color:#fff; font-size:4rem;"> + </span>
                    <span style="color:#3498db; font-weight:900; font-size:7.5rem;">V + ING</span>
                </div>
            ` 
        },

        /* 4: Reveal List */
        { 
            type: 'reveal-list', 
            title: 'Class Examples',
            items: [
                "I will be waiting for you at 5:00.",
                "They'll be playing football all morning.",
                "She will be cooking when you arrive.",
                "We will be flying to London next week."
            ] 
        },

        /* 5: Negative Form */
        { 
            type: 'transform', 
            title: 'The Negative',
            pairs: [
                { pos: "I will be waiting...", neg: "I <span style='color:#e74c3c;'>will NOT (won't)</span> be waiting..." },
                { pos: "She will be cooking...", neg: "She <span style='color:#e74c3c;'>won't</span> be cooking..." }
            ]
        },

        /* 6: Spelling */
        { 
            type: 'writing', 
            title: 'Spelling Rules', 
            content: `
                <div style="display:grid; grid-template-columns:1fr; gap:25px; font-size:3.5rem; text-align:left; font-weight:bold;">
                    <div style="color:#f1c40f;">Make ➔ <span style="color:#3498db;">Making</span> <small style="color:#fff">(Drop 'e')</small></div>
                    <div style="color:#f1c40f;">Die ➔ <span style="color:#3498db;">Dying</span> <small style="color:#fff">(ie ➔ y)</small></div>
                    <div style="color:#f1c40f;">Swim ➔ <span style="color:#3498db;">Swimming</span> <small style="color:#fff">(Double M)</small></div>
                </div>
            ` 
        },

        /* 7: Keywords */
        { 
            type: 'reveal-list', 
            title: 'Time Detectives',
            items: ["At (time) tomorrow", "This time next week", "All day tomorrow", "From 5 to 7 tomorrow", "During the weekend"] 
        },

        /* --- Quiz Section (5 Questions) --- */
        { 
            type: 'mcq', 
            question: "1. Next Saturday, we _________ on the beach.",
            options: ["A) Will be sit", "B) Will be sitting", "C) Will sitting", "D) Is sitting"],
            answer: 1 
        },
        { 
            type: 'mcq', 
            question: "2. Don't call me at 8 PM. I _________ a movie.",
            options: ["A) will be watching", "B) will watching", "C) watch", "D) am watched"],
            answer: 0 
        },
        { 
            type: 'mcq', 
            question: "3. This time tomorrow, they _________ to Paris.",
            options: ["A) will been flying", "B) will flying", "C) will be flying", "D) are flying"],
            answer: 2 
        },
        { 
            type: 'mcq', 
            question: "4. What _________ at 10:00 tomorrow morning?",
            options: ["A) you will be doing", "B) will you be doing", "C) will you doing", "D) are you do"],
            answer: 1 
        },
        { 
            type: 'mcq', 
            question: "5. She _________ (not / use) the car this evening.",
            options: ["A) won't being using", "B) won't be using", "C) will not using", "D) isn't use"],
            answer: 1 
        },
        
        { type: 'title', content: 'STUNNING!', subtitle: 'STAGE CLEAR', color: '#f1c40f', usage: 'YOU ARE A MASTER OF FUTURE!' }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:90%; max-width:1400px; text-align:center; animation: fadeIn 0.4s ease;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <div style="font-size:2rem; color:#666; letter-spacing:15px; margin-bottom:20px; text-transform:uppercase;">${s.subtitle}</div>
                <h1 style="font-size:9rem; font-weight:900; color:${s.color}; margin:0; line-height:1;">${s.content}</h1>
                <div style="font-size:4rem; color:#fff; font-weight:bold; margin-top:40px; border-top:5px solid ${s.color}; display:inline-block; padding-top:20px;">${s.usage}</div>
            `;
        } 
        else if (s.type === 'timeline') {
            wrapper.innerHTML = `
                <h2 style="font-size:5.5rem; color:#3498db; margin-bottom:40px;">${s.title}</h2>
                <p style="font-size:3.8rem; margin-bottom:100px; color:#ddd;">${s.content}</p>
                <div style="position:relative; width:90%; margin:100px auto; height:12px; background:#222; border-radius:10px;">
                    <div style="position:absolute; left:20%; height:50px; width:4px; background:#666; top:-19px;"><span style="position:absolute; top:60px; left:-20px; color:#666; font-size:1.8rem;">Past</span></div>
                    <div style="position:absolute; left:50%; height:50px; width:6px; background:#fff; top:-19px;"><span style="position:absolute; top:60px; left:-30px; color:#fff; font-size:2rem; font-weight:bold;">Now</span></div>
                    <div style="position:absolute; left:80%; height:50px; width:4px; background:#3498db; top:-19px;"><span style="position:absolute; top:60px; left:-25px; color:#3498db; font-size:1.8rem; font-weight:bold;">Future</span></div>
                    <div style="position:absolute; left:80%; width:20%; height:22px; background:#3498db; top:-5px; border-radius:10px; opacity:${subStep >= 1 ? 1 : 0}; transition:1s; box-shadow: 0 0 40px rgba(52,152,219,0.6);"></div>
                </div>`;
        }
        else if (s.type === 'writing') {
            wrapper.innerHTML = `
                <h2 style="font-size:6rem; color:#3498db; margin-bottom:40px;">${s.title}</h2>
                <div style="font-size:4.5rem; line-height:1.4; color:#fff;">${s.content}</div>`;
        }
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `
                <h2 style="font-size:5.5rem; color:#3498db; margin-bottom:50px;">${s.title}</h2>
                <div style="display:flex; flex-direction:column; gap:25px; text-align:left;">
                    ${s.items.map((item, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0.05}; transform:translateX(${i <= subStep ? 0 : 50}px); transition:0.4s; background:#111; padding:35px; border-radius:25px; font-size:3.3rem; font-weight:bold; border-left:20px solid #3498db;">${item}</div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'transform') {
            let pair = s.pairs[Math.floor(subStep/2)] || s.pairs[0];
            let isChanged = subStep % 2 !== 0;
            wrapper.innerHTML = `
                <h2 style="font-size:6rem; color:#3498db; margin-bottom:60px;">${s.title}</h2>
                <div style="background:#111; padding:80px; border-radius:50px; font-size:5rem; border:4px solid #333; color:${isChanged ? '#f1c40f' : '#fff'}; transition: 0.3s; font-weight:bold;">
                    ${isChanged ? pair.neg : pair.pos}
                </div>`;
        }
        else if (s.type === 'mcq') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#111; padding:60px; border-radius:45px; border:2px solid #333;">
                    <div style="font-size:3.8rem; font-weight:900; color:#fff; margin-bottom:50px; line-height:1.2;">${s.question}</div>
                    <div style="display:grid; grid-template-columns: 1fr; gap:20px; opacity:${subStep >= 1 ? 1 : 0.15}; transition:0.5s;">
                        ${s.options.map((opt, i) => {
                            let color = (subStep >= 2 && i === s.answer) ? '#2ecc71' : (subStep >= 2 ? '#444' : '#fff');
                            let border = (subStep >= 2 && i === s.answer) ? '8px solid #2ecc71' : '2px solid #333';
                            return `<div style="padding:30px; border-radius:25px; font-size:3.2rem; font-weight:bold; border:${border}; color:${color}; transition:0.3s;">${opt}</div>`;
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
        } else if (e.keyCode === 37) { // Back
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    render();
})();
