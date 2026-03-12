(function() {
    const container = document.getElementById('activityFinalContent');
    container.innerHTML = ''; 
    container.style.cssText = `height:calc(100vh - 140px); overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#f9f9f9; font-family:'Segoe UI',Arial,sans-serif; direction:ltr;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'PASSIVES', color: '#2c3e50' },
        
        /* 2: Usage */
        { 
            type: 'writing', 
            title: 'Usage', 
            content: 'Expressing the <span style="color:#e74c3c;">Object</span> case in the sentence.' 
        },

        /* 3: Presentation */
        { type: 'title', content: 'Present Continuous (Passive)', color: '#2980b9' },

        /* 4: Main Example Animation */
        { 
            type: 'step-by-step', 
            steps: [
                { label: 'Active:', text: 'She is washing the dishes.', color: '#2c3e50' },
                { label: 'Passive:', text: 'The dishes are being washed.', color: '#27ae60' },
                { label: 'Rule:', text: 'Object + verb be + being + V3 (PP)', color: '#e74c3c' }
            ]
        },

        /* 5: Present Simple */
        { 
            type: 'step-by-step', 
            steps: [
                { label: 'Present Simple Active:', text: 'She cleans the house every day.', color: '#2c3e50' },
                { label: 'Passive:', text: 'The house is cleaned every day.', color: '#27ae60' },
                { label: 'Rule:', text: 'Object + am / is / are + V3', color: '#e74c3c' }
            ]
        },

        /* 6: Past Simple */
        { 
            type: 'step-by-step', 
            steps: [
                { label: 'Past Simple Active:', text: 'He wrote the letter yesterday.', color: '#2c3e50' },
                { label: 'Passive:', text: 'The letter was written yesterday.', color: '#27ae60' },
                { label: 'Rule:', text: 'Object + was / were + V3', color: '#e74c3c' }
            ]
        },

        /* 7: Past Continuous */
        { 
            type: 'step-by-step', 
            steps: [
                { label: 'Past Continuous Active:', text: 'They were painting the walls.', color: '#2c3e50' },
                { label: 'Passive:', text: 'The walls were being painted.', color: '#27ae60' },
                { label: 'Rule:', text: 'Object + was / were + being + V3', color: '#e74c3c' }
            ]
        },

        /* 8: Future Simple */
        { 
            type: 'step-by-step', 
            steps: [
                { label: 'Future Simple Active:', text: 'We will finish the project tomorrow.', color: '#2c3e50' },
                { label: 'Passive:', text: 'The project will be finished tomorrow.', color: '#27ae60' },
                { label: 'Rule:', text: 'Object + will be + V3', color: '#e74c3c' }
            ]
        },

        /* 9: Future Continuous */
        { 
            type: 'step-by-step', 
            steps: [
                { label: 'Future Continuous Active:', text: 'They will be using the hall.', color: '#2c3e50' },
                { label: 'Passive:', text: 'The hall will be being used.', color: '#27ae60' },
                { label: 'Rule:', text: 'Object + will be + being + V3', color: '#e74c3c' }
            ]
        },

        /* 10: Present Perfect Simple */
        { 
            type: 'step-by-step', 
            steps: [
                { label: 'Present Perfect Active:', text: 'She has broken the window.', color: '#2c3e50' },
                { label: 'Passive:', text: 'The window has been broken.', color: '#27ae60' },
                { label: 'Rule:', text: 'Object + have / has + been + V3', color: '#e74c3c' }
            ]
        },

        /* 11: Past Perfect */
        { 
            type: 'step-by-step', 
            steps: [
                { label: 'Past Perfect Active:', text: 'They had closed the door.', color: '#2c3e50' },
                { label: 'Passive:', text: 'The door had been closed.', color: '#27ae60' },
                { label: 'Rule:', text: 'Object + had + been + V3', color: '#e74c3c' }
            ]
        },

        /* 12: Quiz (The 10 Questions) */
        { 
            type: 'quiz', 
            questions: [
                "1. The cake (eat) ________ by the children now.",
                "2. A new car (buy) ________ by my father last week.",
                "3. The homework (finish) ________ yet.",
                "4. English (speak) ________ all over the world.",
                "5. The room (clean) ________ when I arrived.",
                "6. The letters (post) ________ tomorrow.",
                "7. The trees (cut) ________ down before winter.",
                "8. This house (build) ________ in 1990.",
                "9. The report (write) ________ right now.",
                "10. Dinner (prepare) ________ by the time you come."
            ] 
        }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:95%; text-align:center; animation: fadeIn 0.3s ease;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `<h1 style="font-size:10rem; font-weight:900; color:${s.color}; text-transform:uppercase;">${s.content}</h1>`;
        } 
        else if (s.type === 'writing') {
            wrapper.innerHTML = `
                <div style="display:inline-block; text-align:left; background:white; padding:60px; border-left:20px solid #f1c40f; box-shadow:0 20px 50px rgba(0,0,0,0.1); border-radius:20px; width:100%;">
                    <div style="color:#f1c40f; font-weight:bold; font-size:2rem; margin-bottom:20px;">📝 WRITING TIME</div>
                    <h2 style="font-size:5rem; margin-bottom:20px; color:#2c3e50;">${s.title}</h2>
                    <div style="font-size:4rem; line-height:1.4; color:#34495e; font-weight:500;">${s.content}</div>
                </div>`;
        }
        else if (s.type === 'step-by-step') {
            wrapper.innerHTML = `<div style="display:flex; flex-direction:column; gap:30px; text-align:left; background:white; padding:50px; border-radius:30px; box-shadow:0 10px 30px rgba(0,0,0,0.05);">
                ${s.steps.map((step, i) => `
                    <div style="opacity:${i <= subStep ? 1 : 0}; transform:translateX(${i <= subStep ? 0 : -20}px); transition:all 0.4s; font-size:3.5rem; font-weight:bold;">
                        <span style="color:#95a5a6; font-size:2rem; display:block;">${step.label}</span>
                        <span style="color:${step.color};">${step.text}</span>
                    </div>
                `).join('')}
            </div>`;
        }
        else if (s.type === 'quiz') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#fff; padding:40px; border-radius:20px; height:80vh; overflow-y:auto;">
                    <h2 style="font-size:3rem; color:#2c3e50; border-bottom:5px solid #27ae60; padding-bottom:10px;">Practice Time (Passive)</h2>
                    <div style="font-size:2.2rem; line-height:2; color:#2c3e50; margin-top:20px;">
                        ${s.questions.map((q, i) => `<div style="margin-bottom:15px; border-bottom:1px dashed #eee;">${q}</div>`).join('')}
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        // Next: Right Arrow (39), Enter (13), Space (32)
        if (e.keyCode === 39 || e.keyCode === 13 || e.keyCode === 32) { 
            if (s.type === 'step-by-step' && subStep < s.steps.length - 1) subStep++;
            else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
        } 
        // Back: Left Arrow (37)
        else if (e.keyCode === 37) { 
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    render();
})();
