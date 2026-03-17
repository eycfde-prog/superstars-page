(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#0a0a0c; font-family:'Inter', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        { type: 'title', content: 'THE PASSIVE', color: '#e74c3c' },
        
        { 
            type: 'writing', 
            title: 'Why use it?', 
            content: 'We use the Passive Voice when the <span style="color:#e74c3c; font-weight:bold;">Action</span> or the <span style="color:#e74c3c; font-weight:bold;">Object</span> is more important than the person who did it.' 
        },

        { type: 'title', content: 'Present Simple', color: '#ffffff' },
        { 
            type: 'step-by-step', 
            steps: [
                { label: 'Active:', text: 'She cleans the house.', color: '#ffffff' },
                { label: 'Passive:', text: 'The house is cleaned.', color: '#e74c3c' },
                { label: 'Rule:', text: 'Object + am / is / are + V3', color: '#f1c40f' }
            ]
        },

        { type: 'title', content: 'Present Continuous', color: '#ffffff' },
        { 
            type: 'step-by-step', 
            steps: [
                { label: 'Active:', text: 'She is washing the dishes.', color: '#ffffff' },
                { label: 'Passive:', text: 'The dishes are being washed.', color: '#e74c3c' },
                { label: 'Rule:', text: 'Object + is/are + being + V3', color: '#f1c40f' }
            ]
        },

        { type: 'title', content: 'Past Simple', color: '#ffffff' },
        { 
            type: 'step-by-step', 
            steps: [
                { label: 'Active:', text: 'He wrote the letter.', color: '#ffffff' },
                { label: 'Passive:', text: 'The letter was written.', color: '#e74c3c' },
                { label: 'Rule:', text: 'Object + was / were + V3', color: '#f1c40f' }
            ]
        },

        { type: 'title', content: 'Present Perfect', color: '#ffffff' },
        { 
            type: 'step-by-step', 
            steps: [
                { label: 'Active:', text: 'She has broken the window.', color: '#ffffff' },
                { label: 'Passive:', text: 'The window has been broken.', color: '#e74c3c' },
                { label: 'Rule:', text: 'Object + has/have + been + V3', color: '#f1c40f' }
            ]
        },

        // --- Interactive Practice ---
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
            question: "4. A new shopping mall ________ near my house lately.",
            options: ["A) has built", "B) has been built", "C) was building", "D) is building"],
            answer: 1 
        },
        { type: 'title', content: 'CHAMPION!', color: '#27ae60' }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:90%; text-align:center; animation: fadeIn 0.4s ease;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `<h1 style="font-size:7rem; font-weight:900; color:${s.color}; text-transform:uppercase; letter-spacing:-2px;">${s.content}</h1>`;
        } 
        else if (s.type === 'writing') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#161b22; padding:60px; border-radius:30px; border-top:10px solid #e74c3c; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);">
                    <h2 style="font-size:4rem; margin-bottom:20px; color:#fff;">${s.title}</h2>
                    <div style="font-size:2.8rem; line-height:1.5; color:#8b949e;">${s.content}</div>
                </div>`;
        }
        else if (s.type === 'step-by-step') {
            wrapper.innerHTML = `<div style="display:flex; flex-direction:column; gap:20px; text-align:left;">
                ${s.steps.map((step, i) => `
                    <div style="opacity:${i <= subStep ? 1 : 0}; transform:translateY(${i <= subStep ? 0 : 20}px); transition:0.4s; background:#161b22; padding:25px; border-radius:15px; border: 1px solid #30363d;">
                        <span style="color:#e74c3c; font-size:1.4rem; font-weight:bold; text-transform:uppercase;">${step.label}</span>
                        <span style="color:${step.color}; font-size:3rem; display:block; font-weight:bold; margin-top:5px;">${step.text}</span>
                    </div>
                `).join('')}
            </div>`;
        }
        else if (s.type === 'mcq') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#161b22; padding:50px; border-radius:30px;">
                    <div style="font-size:2.8rem; font-weight:bold; color:#fff; margin-bottom:40px; line-height:1.3;">${s.question}</div>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; opacity:${subStep >= 1 ? 1 : 0}; transition: 0.5s;">
                        ${s.options.map((opt, i) => {
                            let bgColor = "rgba(255,255,255,0.05)";
                            let borderColor = "#30363d";
                            if (subStep >= 2 && i === s.answer) {
                                bgColor = "#238636";
                                borderColor = "#2ea043";
                            }
                            return `<div style="background:${bgColor}; padding:25px; border-radius:15px; font-size:1.8rem; font-weight:600; border: 2px solid ${borderColor}; transition: 0.3s; color:#fff;">${opt}</div>`;
                        }).join('')}
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if (e.keyCode === 39 || e.keyCode === 13 || e.keyCode === 32) { 
            if (s.type === 'step-by-step' && subStep < s.steps.length - 1) subStep++;
            else if (s.type === 'mcq' && subStep < 2) subStep++;
            else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
        } else if (e.keyCode === 37) { 
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    render();
})();
