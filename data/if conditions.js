(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:calc(100vh - 200px); overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#0f0f0f; font-family:'Poppins', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'IF CONDITIONS', color: '#e74c3c' },
        
        /* 2: Usage */
        { 
            type: 'writing', 
            title: 'Usage', 
            content: 'Expressing:<br>• Facts<br>• Advice<br>• Regret' 
        },

        /* 3: Zero Condition Title */
        { type: 'title', content: 'Condition Zero (Facts)', color: '#ffffff' },

        /* 4: Zero Formulation */
        { 
            type: 'writing', 
            title: 'Formulation', 
            content: '<span style="color:#e74c3c;">If + Present simple</span> (cause)<br>+<br><span style="color:#f1c40f;">Present simple</span> (result)<br><br><small>Example: If you heat ice, it melts.</small>' 
        },

        /* 5: Zero Examples (One by One) */
        { 
            type: 'reveal-list', 
            items: [
                "If you heat water to 100°C, it boils.",
                "If you don't water plants, they die.",
                "If you touch a fire, you get burned.",
                "If people eat too many sweets, they get cavities.",
                "If the sun sets, it gets dark."
            ] 
        },

        /* 6: Condition One Title */
        { type: 'title', content: 'Condition One (Possible Future)', color: '#2ecc71' },

        /* 7: One Formulation */
        { 
            type: 'writing', 
            title: 'Formulation', 
            content: '<span style="color:#e74c3c;">If + Present simple</span> (cause)<br>+<br><span style="color:#f1c40f;">Will + Inf</span> (result)' 
        },

        /* 8: One Examples (One by One) */
        { 
            type: 'reveal-list', 
            items: [
                "If you study hard, you will pass the exam easily.",
                "If it rains tomorrow, we will stay at home.",
                "If he saves enough money, he will buy a new car.",
                "If she cooks dinner, I will wash the dishes.",
                "If they arrive early, they will get the best seats."
            ] 
        },

        /* 9: Zero VS One Comparison */
        { 
            type: 'writing', 
            title: 'Zero VS One', 
            content: 'Fact: <small>If you don\'t water plants, they die.</small><br>Possibility: <small>If she cooks dinner, I will wash the dishes.</small>' 
        },

        /* 10: Condition Two Title */
        { type: 'title', content: 'Condition Two (Imaginary)', color: '#3498db' },

        /* 11: Two Formulation */
        { 
            type: 'writing', 
            title: 'Formulation', 
            content: '<span style="color:#e74c3c;">If + Past simple</span> (cause)<br>+<br><span style="color:#f1c40f;">Would + Inf</span> (result)' 
        },

        /* 12: Two Examples (One by One) */
        { 
            type: 'reveal-list', 
            items: [
                "If you studied hard, you would pass the exam.",
                "If I won the lottery, I would travel the world.",
                "If he had more time, he would learn a language.",
                "If she were taller, she would join the team.",
                "If they lived in France, they would speak French."
            ] 
        },

        /* 13: Condition Three Title */
        { type: 'title', content: 'Condition Three (Past Regret)', color: '#9b59b6' },

        /* 14: Three Formulation */
        { 
            type: 'writing', 
            title: 'Formulation', 
            content: '<span style="color:#e74c3c;">If + Past Perfect (had + V3)</span><br>+<br><span style="color:#f1c40f;">Would have + V3</span>' 
        },

        /* 15: Three Examples */
        { 
            type: 'reveal-list', 
            items: [
                "If the doctor had come early, the patient would have lived.",
                "If you had studied harder, you would have passed.",
                "If I had known, I would have left sooner.",
                "If she had seen the light, she would have stopped.",
                "If they had invited me, I would have gone."
            ] 
        },

        /* 16: Two VS Three Comparison */
        { 
            type: 'writing', 
            title: 'Two VS Three', 
            content: 'Two: <small>If I won the lottery, I would travel.</small><br>Three: <small>If the doctor had come, the patient would have lived.</small>' 
        },

        /* 17: Interactive Quiz Question (from the table) */
        { 
            type: 'mcq', 
            question: "If she learned English well, she ________ the job.",
            options: ["A) would get", "B) would learn / get", "C) Will learn / got", "D) Learn / get"],
            answer: 0 
        },

        /* 10 PRACTICE QUESTIONS FOR PASSIVES/IF (Generating 10 Mixed) */
        { type: 'mcq', question: "1. If I ________ you, I wouldn't do that.", options: ["A) am", "B) was", "C) were", "D) had been"], answer: 2 },
        { type: 'mcq', question: "2. If it ________, we will cancel the trip.", options: ["A) rains", "B) rained", "C) will rain", "D) had rained"], answer: 0 },
        { type: 'mcq', question: "3. If she ________ her phone, she would have called.", options: ["A) didn't lose", "B) hasn't lost", "C) hadn't lost", "D) wouldn't lose"], answer: 2 },
        { type: 'mcq', question: "4. Water ________ if you heat it to 100°C.", options: ["A) boil", "B) boils", "C) will boil", "D) boiled"], answer: 1 },
        { type: 'mcq', question: "5. If I ________ time, I would start a hobby.", options: ["A) have", "B) will have", "C) had", "D) had had"], answer: 2 },
        { type: 'mcq', question: "6. If they ________ earlier, they wouldn't have missed the bus.", options: ["A) leave", "B) left", "C) had left", "D) were leaving"], answer: 2 },
        { type: 'mcq', question: "7. You ________ weight if you eat too much junk food.", options: ["A) gain", "B) gained", "C) would gain", "D) had gained"], answer: 0 },
        { type: 'mcq', question: "8. If he ________ the truth, he would be angry.", options: ["A) knows", "B) knew", "C) will know", "D) had known"], answer: 1 },
        { type: 'mcq', question: "9. If it ________ cold, I wear a jacket.", options: ["A) is", "B) was", "C) will be", "D) were"], answer: 0 },
        { type: 'mcq', question: "10. If we had practiced more, we ________ the match.", options: ["A) will win", "B) would win", "C) would have won", "D) won"], answer: 2 },
        
        { type: 'title', content: 'EXCELLENT!', color: '#2ecc71' }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:95%; text-align:center; animation: fadeIn 0.4s ease;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `<h1 style="font-size:8rem; font-weight:900; color:${s.color}; margin:0;">${s.content}</h1>`;
        } 
        else if (s.type === 'writing') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#1e1e1e; padding:50px; border-left:15px solid #e74c3c; border-radius:15px; width:100%;">
                    <div style="color:#e74c3c; font-weight:bold; font-size:1.8rem; margin-bottom:10px;">📝 WRITING TIME</div>
                    <h2 style="font-size:4.5rem; margin-bottom:15px; color:#fff;">${s.title}</h2>
                    <div style="font-size:3.5rem; line-height:1.3; color:#ccc;">${s.content}</div>
                </div>`;
        }
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `<div style="display:flex; flex-direction:column; gap:15px; text-align:left;">
                ${s.items.map((item, i) => `
                    <div style="opacity:${i <= subStep ? 1 : 0}; transform:translateX(${i <= subStep ? 0 : -30}px); transition:all 0.4s; background:#1e1e1e; padding:20px; border-radius:10px; font-size:2.8rem; font-weight:bold; color:#fff; border-left:8px solid #3498db;">
                        ${item}
                    </div>
                `).join('')}
            </div>`;
        }
        else if (s.type === 'mcq') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#1e1e1e; padding:40px; border-radius:20px; border: 2px solid #333;">
                    <div style="font-size:2.8rem; font-weight:bold; color:#fff; margin-bottom:30px;">${s.question}</div>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; opacity:${subStep >= 1 ? 1 : 0}; transition: 0.5s;">
                        ${s.options.map((opt, i) => {
                            let bgColor = "#2c3e50";
                            let border = "3px solid transparent";
                            if (subStep >= 2 && i === s.answer) { bgColor = "#27ae60"; border = "3px solid #fff"; }
                            return `<div style="background:${bgColor}; padding:20px; border-radius:10px; font-size:1.8rem; font-weight:600; border: ${border}; transition: 0.3s;">${opt}</div>`;
                        }).join('')}
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if (e.keyCode === 39 || e.keyCode === 13 || e.keyCode === 32) { 
            if (s.type === 'reveal-list' && subStep < s.items.length - 1) subStep++;
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
