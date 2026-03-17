(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#0a0a0a; font-family:'Inter', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        { type: 'title', content: 'IF CONDITIONS', subtitle: 'The Master Guide', color: '#e74c3c' },
        
        { 
            type: 'writing', 
            title: 'General Usage', 
            content: 'We use If Conditions to express:<br>• <span style="color:#ffffff;">Facts</span> (Always true)<br>• <span style="color:#2ecc71;">Possibilities</span> (Future)<br>• <span style="color:#3498db;">Imaginary</span> (Present)<br>• <span style="color:#9b59b6;">Regrets</span> (Past)' 
        },

        { type: 'title', content: 'ZERO CONDITION', subtitle: 'Scientific Facts & Habits', color: '#ffffff' },

        { 
            type: 'writing', 
            title: 'Zero Formulation', 
            content: '<span style="color:#e74c3c;">If + Present Simple</span><br><center>+</center><span style="color:#f1c40f;">Present Simple</span><br><br><small>Used for things that are 100% true.</small>' 
        },

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

        { type: 'title', content: 'FIRST CONDITION', subtitle: 'Possible Future Results', color: '#2ecc71' },

        { 
            type: 'writing', 
            title: 'First Formulation', 
            content: '<span style="color:#e74c3c;">If + Present Simple</span><br><center>+</center><span style="color:#f1c40f;">Will + Infinity</span><br><br><small>Used for possible future situations.</small>' 
        },

        { 
            type: 'reveal-list', 
            items: [
                "If you study hard, you will pass the exam.",
                "If it rains tomorrow, we will stay at home.",
                "If he saves enough money, he will buy a car.",
                "If she cooks dinner, I will wash the dishes.",
                "If they arrive early, they will get seats."
            ] 
        },

        { type: 'title', content: 'SECOND CONDITION', subtitle: 'Hypothetical / Imaginary', color: '#3498db' },

        { 
            type: 'writing', 
            title: 'Second Formulation', 
            content: '<span style="color:#e74c3c;">If + Past Simple</span><br><center>+</center><span style="color:#f1c40f;">Would + Infinity</span><br><br><small>Used for "Unlikely" or "Imaginary" now.</small>' 
        },

        { 
            type: 'reveal-list', 
            items: [
                "If I were you, I would take that job.",
                "If I won the lottery, I would travel the world.",
                "If he had more time, he would learn French.",
                "If she were taller, she would be a model.",
                "If they lived in Cairo, they would see the Pyramids."
            ] 
        },

        { type: 'title', content: 'THIRD CONDITION', subtitle: 'Past Regrets & Impossible', color: '#9b59b6' },

        { 
            type: 'writing', 
            title: 'Third Formulation', 
            content: '<span style="color:#e74c3c;">If + Past Perfect (had + V3)</span><br><center>+</center><span style="color:#f1c40f;">Would have + V3</span><br><br><small>Used for things that DID NOT happen.</small>' 
        },

        { 
            type: 'reveal-list', 
            items: [
                "If the doctor had come early, he would have lived.",
                "If you had studied, you would have passed.",
                "If I had known, I would have helped you.",
                "If she had seen him, she would have stopped.",
                "If they had invited me, I would have gone."
            ] 
        },

        { type: 'title', content: 'PRACTICE TIME', subtitle: 'Let\'s check your skills!', color: '#f1c40f' },

        { type: 'mcq', question: "1. If I ________ you, I wouldn't do that.", options: ["A) am", "B) was", "C) were", "D) had been"], answer: 2 },
        { type: 'mcq', question: "2. If it ________, we will cancel the trip.", options: ["A) rains", "B) rained", "C) will rain", "D) had rained"], answer: 0 },
        { type: 'mcq', question: "3. If she ________ her phone, she would have called.", options: ["A) didn't lose", "B) hasn't lost", "C) hadn't lost", "D) wouldn't lose"], answer: 2 },
        { type: 'mcq', question: "4. Water ________ if you heat it to 100°C.", options: ["A) boil", "B) boils", "C) will boil", "D) boiled"], answer: 1 },
        { type: 'mcq', question: "5. If I ________ time, I would start a hobby.", options: ["A) have", "B) will have", "C) had", "D) had had"], answer: 2 },
        
        { type: 'title', content: 'BRILLIANT!', subtitle: 'You have mastered IF Conditions', color: '#2ecc71' }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:90%; max-width:1100px; text-align:center; animation: slideUp 0.5s ease;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <h1 style="font-size:8.5rem; font-weight:900; color:${s.color}; margin:0; line-height:0.9; text-transform:uppercase;">${s.content}</h1>
                <div style="font-size:3.5rem; color:#efefef; background:rgba(255,255,255,0.1); display:inline-block; padding:10px 40px; border-radius:15px; margin-top:30px; border: 1px solid ${s.color};">${s.subtitle}</div>
            `;
        } 
        else if (s.type === 'writing') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#111; padding:60px; border-radius:30px; border:2px solid #333; position:relative;">
                    <div style="position:absolute; top:0; left:0; width:15px; height:100%; background:#e74c3c;"></div>
                    <div style="color:#e74c3c; font-weight:bold; font-size:1.8rem; margin-bottom:20px; letter-spacing:3px;">STRUCTURE & USAGE</div>
                    <h2 style="font-size:5.5rem; margin-bottom:30px; color:#fff;">${s.title}</h2>
                    <div style="font-size:3.8rem; line-height:1.4; color:#efefef;">${s.content}</div>
                </div>`;
        }
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `<div style="display:flex; flex-direction:column; gap:25px; text-align:left;">
                <div style="color:#3498db; font-weight:bold; font-size:1.5rem; margin-bottom:10px; letter-spacing:5px;">EXAMPLES:</div>
                ${s.items.map((item, i) => `
                    <div style="opacity:${i <= subStep ? 1 : 0}; transform:translateX(${i <= subStep ? 0 : -50}px); transition:0.4s; background:#161616; padding:30px; border-radius:20px; font-size:3rem; font-weight:800; color:#fff; border:2px solid ${i <= subStep ? '#3498db' : '#222'};">
                        ${item}
                    </div>
                `).join('')}
            </div>`;
        }
        else if (s.type === 'mcq') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#111; padding:55px; border-radius:40px; border: 3px solid #333;">
                    <div style="font-size:4rem; font-weight:900; color:#fff; margin-bottom:45px;">${s.question}</div>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:30px; opacity:${subStep >= 1 ? 1 : 0}; transition: 0.5s;">
                        ${s.options.map((opt, i) => {
                            let bgColor = "#222";
                            let border = "3px solid #444";
                            if (subStep >= 2 && i === s.answer) { bgColor = "#27ae60"; border = "3px solid #fff"; }
                            return `<div style="background:${bgColor}; padding:35px; border-radius:20px; font-size:2.5rem; font-weight:bold; border: ${border}; transition: 0.3s; color:#fff;">${opt}</div>`;
                        }).join('')}
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
    }

    // منطق التنقل الموحد (كيبورد + تاتش)
    function next() {
        const s = slides[currentSlide];
        if (s.type === 'reveal-list' && subStep < s.items.length - 1) subStep++;
        else if (s.type === 'mcq' && subStep < 2) subStep++;
        else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
        render();
    }

    function prev() {
        if (subStep > 0) subStep--;
        else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        render();
    }

    // دعم التاتش السريع (يمين وشمال)
    container.onclick = (e) => {
        // إذا كان الليزر شغال، لا تنفذ التنقل لترك مساحة للشرح
        if (window.laserActive) return; 
        const width = window.innerWidth;
        if (e.clientX > width / 2) next();
        else prev();
    };

    document.onkeydown = (e) => {
        if (e.keyCode === 39 || e.keyCode === 13 || e.keyCode === 32) next();
        else if (e.keyCode === 37) prev();
    };

    render();
})();
