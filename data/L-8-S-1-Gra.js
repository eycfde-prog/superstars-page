(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:calc(100vh - 200px); overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#0f0f0f; font-family:'Poppins', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'PASSIVES', color: '#e74c3c' },
        
        /* 2: Usage */
        { 
            type: 'writing', 
            title: 'Usage', 
            content: 'Expressing the <span style="color:#e74c3c;">Object</span> case in the sentence.' 
        },

        /* 3: Header */
        { type: 'title', content: 'Present Continuous', color: '#ffffff' },

        /* 4: Main Example Animation */
        { 
            type: 'step-by-step', 
            steps: [
                { label: 'Active:', text: 'She is washing the dishes.', color: '#ffffff' },
                { label: 'Passive:', text: 'The dishes are being washed.', color: '#e74c3c' },
                { label: 'Rule:', text: 'Object + verb be + being + V3 (PP)', color: '#f1c40f' }
            ]
        },

        /* 5: Present Simple */
        { 
            type: 'step-by-step', 
            steps: [
                { label: 'Present Simple Active:', text: 'She cleans the house every day.', color: '#ffffff' },
                { label: 'Passive:', text: 'The house is cleaned every day.', color: '#e74c3c' },
                { label: 'Rule:', text: 'Object + am / is / are + V3', color: '#f1c40f' }
            ]
        },

        /* 6: Past Simple */
        { 
            type: 'step-by-step', 
            steps: [
                { label: 'Past Simple Active:', text: 'He wrote the letter yesterday.', color: '#ffffff' },
                { label: 'Passive:', text: 'The letter was written yesterday.', color: '#e74c3c' },
                { label: 'Rule:', text: 'Object + was / were + V3', color: '#f1c40f' }
            ]
        },

        /* 7: Past Continuous */
        { 
            type: 'step-by-step', 
            steps: [
                { label: 'Past Continuous Active:', text: 'They were painting the walls.', color: '#ffffff' },
                { label: 'Passive:', text: 'The walls were being painted.', color: '#e74c3c' },
                { label: 'Rule:', text: 'Object + was / were + being + V3', color: '#f1c40f' }
            ]
        },

        /* 8: Future Simple */
        { 
            type: 'step-by-step', 
            steps: [
                { label: 'Future Simple Active:', text: 'We will finish the project tomorrow.', color: '#ffffff' },
                { label: 'Passive:', text: 'The project will be finished tomorrow.', color: '#e74c3c' },
                { label: 'Rule:', text: 'Object + will be + V3', color: '#f1c40f' }
            ]
        },

        /* 9: Present Perfect */
        { 
            type: 'step-by-step', 
            steps: [
                { label: 'Present Perfect Active:', text: 'She has broken the window.', color: '#ffffff' },
                { label: 'Passive:', text: 'The window has been broken.', color: '#e74c3c' },
                { label: 'Rule:', text: 'Object + have / has + been + V3', color: '#f1c40f' }
            ]
        },

        /* قسم الأسئلة التفاعلية - 10 أسئلة */
        { 
            type: 'mcq', 
            question: "1. The report ________ by the manager right now.",
            options: ["A) is writing", "B) is being written", "C) was written", "D) writes"],
            answer: 1 // B
        },
        { 
            type: 'mcq', 
            question: "2. Our house ________ in 1995.",
            options: ["A) was built", "B) is built", "C) built", "D) was building"],
            answer: 0 // A
        },
        { 
            type: 'mcq', 
            question: "3. English ________ as a first language in many countries.",
            options: ["A) speaks", "B) is spoken", "C) is speaking", "D) spoken"],
            answer: 1 // B
        },
        { 
            type: 'mcq', 
            question: "4. The letters ________ by the postman tomorrow morning.",
            options: ["A) will post", "B) will be posted", "C) are posted", "D) have been posted"],
            answer: 1 // B
        },
        { 
            type: 'mcq', 
            question: "5. A new shopping mall ________ in the city center lately.",
            options: ["A) has built", "B) has been built", "C) was building", "D) is building"],
            answer: 1 // B
        },
        { 
            type: 'mcq', 
            question: "6. The car ________ when the accident happened.",
            options: ["A) was being repaired", "B) is repaired", "C) repaired", "D) was repairing"],
            answer: 0 // A
        },
        { 
            type: 'mcq', 
            question: "7. All the tickets ________ before we arrived at the cinema.",
            options: ["A) had sold", "B) had been sold", "C) were selling", "D) have been sold"],
            answer: 1 // B
        },
        { 
            type: 'mcq', 
            question: "8. The plants ________ every day by the gardener.",
            options: ["A) water", "B) are watered", "C) are watering", "D) watered"],
            answer: 1 // B
        },
        { 
            type: 'mcq', 
            question: "9. This movie ________ by millions of people since its release.",
            options: ["A) has seen", "B) has been seen", "C) was seen", "D) is seen"],
            answer: 1 // B
        },
        { 
            type: 'mcq', 
            question: "10. Dinner ________ by the time you get home tonight.",
            options: ["A) will have been prepared", "B) is prepared", "C) will prepare", "D) was prepared"],
            answer: 0 // A
        },
        { type: 'title', content: 'GREAT JOB!', color: '#27ae60' }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:90%; text-align:center; animation: fadeIn 0.4s ease;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `<h1 style="font-size:8rem; font-weight:900; color:${s.color}; margin:0;">${s.content}</h1>`;
        } 
        else if (s.type === 'writing') {
            wrapper.innerHTML = `
                <div style="display:inline-block; text-align:left; background:#1e1e1e; padding:50px; border-left:15px solid #e74c3c; border-radius:15px; width:100%; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                    <div style="color:#e74c3c; font-weight:bold; font-size:1.8rem; margin-bottom:10px;">📝 WRITING TIME</div>
                    <h2 style="font-size:4rem; margin-bottom:15px; color:#fff;">${s.title}</h2>
                    <div style="font-size:3.5rem; line-height:1.4; color:#ccc;">${s.content}</div>
                </div>`;
        }
        else if (s.type === 'step-by-step') {
            wrapper.innerHTML = `<div style="display:flex; flex-direction:column; gap:25px; text-align:left;">
                ${s.steps.map((step, i) => `
                    <div style="opacity:${i <= subStep ? 1 : 0}; transform:translateX(${i <= subStep ? 0 : -30}px); transition:all 0.5s; background:#1e1e1e; padding:20px; border-radius:10px;">
                        <span style="color:#888; font-size:1.5rem; display:block; font-weight:bold;">${step.label}</span>
                        <span style="color:${step.color}; font-size:3.2rem; font-weight:bold;">${step.text}</span>
                    </div>
                `).join('')}
            </div>`;
        }
        else if (s.type === 'mcq') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#1e1e1e; padding:40px; border-radius:20px; border: 2px solid #333;">
                    <div style="font-size:3rem; font-weight:bold; color:#fff; margin-bottom:40px;">${s.question}</div>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; opacity:${subStep >= 1 ? 1 : 0}; transition: 0.5s;">
                        ${s.options.map((opt, i) => {
                            let bgColor = "#2c3e50";
                            let borderColor = "transparent";
                            if (subStep >= 2 && i === s.answer) {
                                bgColor = "#27ae60";
                                borderColor = "#fff";
                            }
                            return `<div style="background:${bgColor}; padding:20px; border-radius:10px; font-size:2rem; font-weight:600; border: 3px solid ${borderColor}; transition: 0.3s;">${opt}</div>`;
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