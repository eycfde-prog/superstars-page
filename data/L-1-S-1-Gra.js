(function() {
    // استهداف الحاوية الموجودة في صفحتك
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // تنظيف الحاوية وتجهيز الاستايل الداخلي ليكون ملء الشاشة
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

        /* 10: Quiz */
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
        else if (s.type === 'quiz') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#1e1e1e; padding:30px; border-radius:15px; height:70vh; overflow-y:auto; border: 1px solid #333;">
                    <h2 style="font-size:2.5rem; color:#e74c3c; border-bottom:3px solid #e74c3c; padding-bottom:10px; margin-top:0;">Practice Time</h2>
                    <div style="font-size:1.8rem; line-height:1.8; color:#fff; margin-top:15px;">
                        ${s.questions.map((q, i) => `<div style="margin-bottom:10px; padding:10px; border-bottom:1px solid #333;">${q}</div>`).join('')}
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
    }

    // التحكم من خلال الكيبورد (Enter, Space, Arrows)
    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if (e.keyCode === 39 || e.keyCode === 13 || e.keyCode === 32) { // Next
            if (s.type === 'step-by-step' && subStep < s.steps.length - 1) subStep++;
            else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
        } else if (e.keyCode === 37) { // Back
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    render();
})();
