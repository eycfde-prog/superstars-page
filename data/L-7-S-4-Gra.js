(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#0a0a0c; font-family:'Segoe UI', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        { type: 'title', content: 'THE PASSIVE', subtitle: 'GRAMMAR FOCUS', color: '#c5a059', usage: 'Focusing on the Action, not the Doer' },
        
        { 
            type: 'writing', 
            title: 'Why use it?', 
            content: 'We use the Passive Voice when the <br><span style="color:#c5a059; font-weight:bold; font-size:4.5rem;">Action</span> or the <span style="color:#c5a059; font-weight:bold; font-size:4.5rem;">Object</span><br>is more important than the person who did it.' 
        },

        { type: 'title', content: 'Present Simple', subtitle: 'DAILY ROUTINES / FACTS', color: '#ffffff', usage: 'Object + am / is / are + V3' },
        { 
            type: 'step-by-step', 
            steps: [
                { label: 'Active:', text: 'She cleans the house.', color: '#ffffff' },
                { label: 'Passive:', text: 'The house is cleaned.', color: '#c5a059' },
                { label: 'Rule:', text: 'Object + is / are + P.P (V3)', color: '#f1c40f' }
            ]
        },

        { type: 'title', content: 'Present Cont.', subtitle: 'ACTIONS NOW', color: '#ffffff', usage: 'Object + is/are + being + V3' },
        { 
            type: 'step-by-step', 
            steps: [
                { label: 'Active:', text: 'She is washing the dishes.', color: '#ffffff' },
                { label: 'Passive:', text: 'The dishes are being washed.', color: '#c5a059' },
                { label: 'Rule:', text: 'Object + is/are + being + P.P (V3)', color: '#f1c40f' }
            ]
        },

        { type: 'title', content: 'Past Simple', subtitle: 'COMPLETED ACTIONS', color: '#ffffff', usage: 'Object + was / were + V3' },
        { 
            type: 'step-by-step', 
            steps: [
                { label: 'Active:', text: 'He wrote the letter.', color: '#ffffff' },
                { label: 'Passive:', text: 'The letter was written.', color: '#c5a059' },
                { label: 'Rule:', text: 'Object + was / were + P.P (V3)', color: '#f1c40f' }
            ]
        },

        { type: 'title', content: 'Present Perfect', subtitle: 'RECENT EVENTS', color: '#ffffff', usage: 'Object + has/have + been + V3' },
        { 
            type: 'step-by-step', 
            steps: [
                { label: 'Active:', text: 'She has broken the window.', color: '#ffffff' },
                { label: 'Passive:', text: 'The window has been broken.', color: '#c5a059' },
                { label: 'Rule:', text: 'Object + has/have + been + P.P (V3)', color: '#f1c40f' }
            ]
        },

        { type: 'title', content: 'PRACTICE TIME', subtitle: 'CHALLENGE', color: '#f1c40f', usage: 'CHOOSE THE CORRECT PASSIVE FORM' },

        { 
            type: 'mcq', 
            question: "1. The report ________ by the manager right now.",
            options: ["A) is writing", "B) is being written", "C) was written", "D) writes"],
            answer: 1 
        },
        { 
            type: 'mcq', 
            question: "2. Our house ________ in 1995.",
            options: ["A) was built", "B) is built", "C) built", "D) was building"],
            answer: 0 
        },
        { 
            type: 'mcq', 
            question: "3. English ________ in many countries around the world.",
            options: ["A) speaks", "B) is spoken", "C) is speaking", "D) spoken"],
            answer: 1 
        },
        { 
            type: 'mcq', 
            question: "4. A new shopping mall ________ lately.",
            options: ["A) has built", "B) has been built", "C) was building", "D) is building"],
            answer: 1 
        },
        { type: 'title', content: 'CHAMPION!', subtitle: 'EXCELLENT', color: '#27ae60', usage: 'YOU HAVE MASTERED THE PASSIVE' }
    ];

    window.nextSlide = function() {
        const s = slides[currentSlide];
        if (s.type === 'step-by-step' && subStep < s.steps.length - 1) subStep++;
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
        wrapper.style.cssText = `width:90%; max-width:1200px; text-align:center; transition: 0.5s;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <div style="font-size:1.8rem; color:#888; letter-spacing:12px; margin-bottom:15px; text-transform:uppercase;">${s.subtitle}</div>
                <h1 style="font-size:8.5rem; font-weight:900; color:${s.color}; margin:0; line-height:1; text-transform:uppercase;">${s.content}</h1>
                <div style="font-size:3.5rem; color:#fff; font-weight:bold; margin-top:35px; border-top:3px solid ${s.color}; display:inline-block; padding-top:20px;">${s.usage}</div>
            `;
        } 
        else if (s.type === 'writing') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#111; padding:70px; border-radius:40px; border-left:15px solid #c5a059; box-shadow: 0 30px 60px rgba(0,0,0,0.5);">
                    <h2 style="font-size:5rem; margin-bottom:30px; color:#fff;">${s.title}</h2>
                    <div style="font-size:3.8rem; line-height:1.4; color:#d1d1d1;">${s.content}</div>
                </div>`;
        }
        else if (s.type === 'step-by-step') {
            wrapper.innerHTML = `<div style="display:flex; flex-direction:column; gap:20px; text-align:left;">
                ${s.steps.map((step, i) => `
                    <div style="opacity:${i <= subStep ? 1 : 0.05}; transform:translateX(${i <= subStep ? 0 : 30}px); transition:0.5s; background:#161b22; padding:35px; border-radius:20px; border: 1px solid #333;">
                        <span style="color:#c5a059; font-size:1.8rem; font-weight:bold; text-transform:uppercase; letter-spacing:3px;">${step.label}</span>
                        <span style="color:${step.color}; font-size:4rem; display:block; font-weight:bold; margin-top:10px;">${step.text}</span>
                    </div>
                `).join('')}
            </div>`;
        }
        else if (s.type === 'mcq') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#111; padding:60px; border-radius:35px; border: 2px solid #333;">
                    <div style="font-size:4rem; font-weight:900; color:#fff; margin-bottom:45px; line-height:1.2;">${s.question}</div>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:30px; opacity:${subStep >= 1 ? 1 : 0.2}; transition: 0.6s;">
                        ${s.options.map((opt, i) => {
                            let bgColor = "#1a1a1a";
                            let border = "2px solid #333";
                            if (subStep >= 2 && i === s.answer) { bgColor = "#238636"; border = "4px solid #fff"; }
                            return `<div style="background:${bgColor}; padding:40px; border-radius:20px; font-size:2.8rem; font-weight:bold; border: ${border}; color:#fff;">${opt}</div>`;
                        }).join('')}
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
    }

    render();
})();
