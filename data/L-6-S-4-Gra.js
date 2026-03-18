(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#0a0a0c; font-family:'Segoe UI', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        { type: 'title', content: 'PRES. PERFECT CONT.', subtitle: 'GRAMMAR FOCUS', color: '#2ecc71', usage: 'Action started in the past & STILL happening' },
        
        { 
            type: 'timeline', 
            title: 'The Flow of Time', 
            content: 'An action started in the <span style="color:#e74c3c">Past</span> and is <span style="color:#2ecc71">STILL PROGRESSING</span> now.' 
        },

        { 
            type: 'writing', 
            title: 'The Formula', 
            content: `
                <div style="background:#111; padding:50px; border-radius:30px; border:4px solid #2ecc71; text-align:center; box-shadow: 0 0 50px rgba(46,204,113,0.2);">
                    <span style="color:#fff">Subject + </span>
                    <span style="color:#f1c40f; font-weight:900; font-size:5.5rem;">have / has been</span>
                    <br>
                    <span style="color:#fff; font-size:4rem;"> + </span>
                    <span style="color:#2ecc71; font-weight:900; font-size:6.5rem;">V + ING</span>
                </div>
            ` 
        },

        { 
            type: 'reveal-list', 
            title: 'Focus on Continuity',
            items: [
                "I have been waiting for two hours.",
                "He has been working since 7 AM.",
                "It has been raining all day long.",
                "They have been playing for ages."
            ] 
        },

        { 
            type: 'transform', 
            title: 'Negatives & Questions',
            pairs: [
                { pos: "She has been cooking...", neg: "She <span style='color:#e74c3c;'>has NOT</span> been cooking..." },
                { pos: "They have been running...", neg: "<span style='color:#f1c40f;'>HAVE they</span> been running...?" }
            ]
        },

        { 
            type: 'writing', 
            title: 'Spelling Rules', 
            content: `
                <div style="display:grid; grid-template-columns:1fr; gap:30px; font-size:3rem; text-align:left;">
                    <div style="background:#161b22; padding:20px; border-radius:15px;"><span style="color:#e74c3c;">Rule 1:</span> Make ➔ <span style="color:#2ecc71;">Making</span> (Drop 'e')</div>
                    <div style="background:#161b22; padding:20px; border-radius:15px;"><span style="color:#e74c3c;">Rule 2:</span> Lie ➔ <span style="color:#2ecc71;">Lying</span> (ie ➔ y)</div>
                    <div style="background:#161b22; padding:20px; border-radius:15px;"><span style="color:#e74c3c;">Rule 3:</span> Run ➔ <span style="color:#2ecc71;">Running</span> (Double C)</div>
                </div>
            ` 
        },

        { 
            type: 'reveal-list', 
            title: 'Time Markers',
            items: ["For / Since", "All day / All week", "How long...?", "Lately / Recently", "The whole morning"] 
        },

        /* --- Quiz Section (5 Questions) --- */
        { 
            type: 'mcq', 
            question: "1. How long _________ for the bus?",
            options: ["A) Have you been wait", "B) Has you been waiting", "C) Have you been waiting", "D) Are you waiting"],
            answer: 2 
        },
        { 
            type: 'mcq', 
            question: "2. It _________ all morning and it hasn't stopped yet.",
            options: ["A) has been snowed", "B) is snowing", "C) has snowing", "D) has been snowing"],
            answer: 3 
        },
        { 
            type: 'mcq', 
            question: "3. I'm tired because I _________ the house for hours.",
            options: ["A) have been cleaning", "B) has been cleaning", "C) cleaned", "D) am cleaning"],
            answer: 0 
        },
        { 
            type: 'mcq', 
            question: "4. Why are your hands dirty? - I _________ in the garden.",
            options: ["A) worked", "B) have been working", "C) has been working", "D) work"],
            answer: 1 
        },
        { 
            type: 'mcq', 
            question: "5. She _________ the piano since she was a child.",
            options: ["A) has been playing", "B) have been playing", "C) is playing", "D) plays"],
            answer: 0 
        },
        
        { type: 'title', content: 'EXCELLENT!', subtitle: 'STAGE COMPLETE', color: '#c5a059', usage: 'YOU ARE A GRAMMAR CHAMPION!' }
    ];

    window.nextSlide = function() {
        const s = slides[currentSlide];
        if (s.type === 'timeline' && subStep < 1) subStep++;
        else if (s.type === 'reveal-list' && subStep < s.items.length - 1) subStep++;
        else if (s.type === 'transform' && subStep < (s.pairs.length * 2) - 1) subStep++;
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
        wrapper.style.cssText = `width:90%; max-width:1300px; text-align:center; transition: 0.4s;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <div style="font-size:2rem; color:#888; letter-spacing:15px; margin-bottom:20px; text-transform:uppercase;">${s.subtitle}</div>
                <h1 style="font-size:8rem; font-weight:900; color:${s.color}; margin:0; line-height:1;">${s.content}</h1>
                <div style="font-size:3.5rem; color:#fff; font-weight:bold; margin-top:40px; border-top:4px solid ${s.color}; display:inline-block; padding-top:20px;">${s.usage}</div>
            `;
        } 
        else if (s.type === 'timeline') {
            wrapper.innerHTML = `
                <h2 style="font-size:5rem; color:#2ecc71; margin-bottom:40px;">${s.title}</h2>
                <p style="font-size:3.5rem; margin-bottom:80px;">${s.content}</p>
                <div style="position:relative; width:90%; margin:100px auto; height:12px; background:#222; border-radius:10px;">
                    <div style="position:absolute; left:15%; height:40px; width:4px; background:#666; top:-14px;"><span style="position:absolute; top:50px; left:-20px; color:#666; font-size:1.5rem;">Past</span></div>
                    <div style="position:absolute; right:15%; height:40px; width:6px; background:#fff; top:-14px;"><span style="position:absolute; top:50px; left:-20px; color:#fff; font-size:1.8rem; font-weight:bold;">Now</span></div>
                    <div style="position:absolute; left:15%; width:70%; height:20px; background:linear-gradient(90deg, #2ecc71, #f1c40f); top:-4px; border-radius:10px; opacity:${subStep >= 1 ? 1 : 0}; transition:1.5s; box-shadow: 0 0 30px rgba(46, 204, 113, 0.5);"></div>
                </div>`;
        }
        else if (s.type === 'writing') {
            wrapper.innerHTML = `
                <h2 style="font-size:5.5rem; color:#2ecc71; margin-bottom:40px; text-transform:uppercase;">${s.title}</h2>
                <div style="font-size:4rem; line-height:1.5; color:#fff;">${s.content}</div>`;
        }
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `
                <h2 style="font-size:4.8rem; color:#2ecc71; margin-bottom:40px;">${s.title}</h2>
                <div style="display:flex; flex-direction:column; gap:20px; text-align:left;">
                    ${s.items.map((item, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0.05}; transform:translateX(${i <= subStep ? 0 : 50}px); transition:0.4s; background:#111; padding:35px; border-radius:20px; font-size:3.2rem; font-weight:bold; border-left:15px solid #2ecc71;">${item}</div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'transform') {
            let pair = s.pairs[Math.floor(subStep/2)] || s.pairs[0];
            let isChanged = subStep % 2 !== 0;
            wrapper.innerHTML = `
                <h2 style="font-size:5.5rem; color:#2ecc71; margin-bottom:50px;">${s.title}</h2>
                <div style="background:#111; padding:80px; border-radius:40px; font-size:4.5rem; border:3px solid #333; color:${isChanged ? '#f1c40f' : '#fff'}; transition: 0.3s; font-weight:bold;">
                    ${isChanged ? pair.neg : pair.pos}
                </div>`;
        }
        else if (s.type === 'mcq') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#111; padding:60px; border-radius:40px; border:2px solid #333;">
                    <div style="font-size:3.5rem; font-weight:900; color:#fff; margin-bottom:50px; line-height:1.3;">${s.question}</div>
                    <div style="display:grid; grid-template-columns: 1fr; gap:20px; opacity:${subStep >= 1 ? 1 : 0.15}; transition:0.5s;">
                        ${s.options.map((opt, i) => {
                            let color = (subStep >= 2 && i === s.answer) ? '#2ecc71' : (subStep >= 2 ? '#444' : '#fff');
                            let border = (subStep >= 2 && i === s.answer) ? '5px solid #2ecc71' : '2px solid #333';
                            return `<div style="padding:30px; border-radius:20px; font-size:2.8rem; font-weight:bold; border:${border}; color:${color}; transition:0.3s;">${opt}</div>`;
                        }).join('')}
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
    }

    render();
})();
