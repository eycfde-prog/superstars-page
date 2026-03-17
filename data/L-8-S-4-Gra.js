(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#0a0a0a; font-family:'Segoe UI', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        { type: 'title', content: 'IF CONDITIONS', subtitle: 'The Master Guide', color: '#c5a059' },
        
        { 
            type: 'writing', 
            title: 'General Usage', 
            content: 'We use If Conditions to express:<br>• <span style="color:#ffffff;">Facts</span> (Always true)<br>• <span style="color:#2ecc71;">Possibilities</span> (Future)<br>• <span style="color:#3498db;">Imaginary</span> (Present)<br>• <span style="color:#9b59b6;">Regrets</span> (Past)' 
        },

        // سلايد العنوان المحدثة (الاستخدام بخط عريض)
        { 
            type: 'title', 
            content: 'ZERO CONDITION', 
            subtitle: 'USAGE: SCIENTIFIC FACTS & HABITS', 
            color: '#ffffff',
            usage: '100% TRUE & CERTAIN' 
        },

        { 
            type: 'writing', 
            title: 'Zero Formulation', 
            content: '<span style="color:#e74c3c;">If + Present Simple</span><br><center>+</center><span style="color:#f1c40f;">Present Simple</span>' 
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

        { 
            type: 'title', 
            content: 'FIRST CONDITION', 
            subtitle: 'USAGE: POSSIBLE FUTURE RESULTS', 
            color: '#2ecc71',
            usage: 'LIKELY TO HAPPEN'
        },

        { 
            type: 'writing', 
            title: 'First Formulation', 
            content: '<span style="color:#e74c3c;">If + Present Simple</span><br><center>+</center><span style="color:#f1c40f;">Will + Infinity</span>' 
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

        { 
            type: 'title', 
            content: 'SECOND CONDITION', 
            subtitle: 'USAGE: HYPOTHETICAL / IMAGINARY', 
            color: '#3498db',
            usage: 'UNLIKELY / DREAMING'
        },

        { 
            type: 'writing', 
            title: 'Second Formulation', 
            content: '<span style="color:#e74c3c;">If + Past Simple</span><br><center>+</center><span style="color:#f1c40f;">Would + Infinity</span>' 
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

        { 
            type: 'title', 
            content: 'THIRD CONDITION', 
            subtitle: 'USAGE: PAST REGRETS & IMPOSSIBLE', 
            color: '#9b59b6',
            usage: 'TOO LATE / DIDN\'T HAPPEN'
        },

        { 
            type: 'writing', 
            title: 'Third Formulation', 
            content: '<span style="color:#e74c3c;">If + Past Perfect (had + V3)</span><br><center>+</center><span style="color:#f1c40f;">Would have + V3</span>' 
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

        { type: 'title', content: 'PRACTICE TIME', subtitle: 'LET\'S CHECK YOUR SKILLS!', color: '#f1c40f' },

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
        wrapper.style.cssText = `width:92%; max-width:1300px; text-align:center; animation: slideUp 0.4s ease-out;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <div style="font-size:2rem; color:#aaa; letter-spacing:8px; margin-bottom:15px; text-transform:uppercase; font-weight:bold;">${s.subtitle}</div>
                <h1 style="font-size:7.5rem; font-weight:900; color:${s.color}; margin:0; line-height:1; text-shadow: 0 10px 30px rgba(0,0,0,0.5);">${s.content}</h1>
                ${s.usage ? `<div style="display:inline-block; margin-top:40px; padding:15px 40px; border:4px solid ${s.color}; color:${s.color}; font-size:3.5rem; font-weight:900; border-radius:15px;">${s.usage}</div>` : ''}
            `;
        } 
        else if (s.type === 'writing') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#111; padding:60px; border-radius:40px; border:2px solid #333; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
                    <div style="color:${slides[currentSlide-1]?.color || '#c5a059'}; font-weight:bold; font-size:2rem; margin-bottom:20px; letter-spacing:3px;">STRUCTURE:</div>
                    <h2 style="font-size:5.5rem; margin-bottom:30px; color:#fff;">${s.title}</h2>
                    <div style="font-size:4rem; line-height:1.5; color:#eee; font-weight:600;">${s.content}</div>
                </div>`;
        }
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `<div style="display:flex; flex-direction:column; gap:15px; text-align:left;">
                <div style="color:#c5a059; font-weight:bold; font-size:1.5rem; margin-bottom:5px; letter-spacing:5px;">EXAMPLES:</div>
                ${s.items.map((item, i) => `
                    <div style="opacity:${i <= subStep ? 1 : 0}; transform:translateY(${i <= subStep ? 0 : 20}px); transition:0.3s; background:#161616; padding:30px; border-radius:20px; font-size:2.6rem; font-weight:700; color:#fff; border-left:10px solid ${i <= subStep ? '#c5a059' : '#222'};">
                        ${item}
                    </div>
                `).join('')}
            </div>`;
        }
        else if (s.type === 'mcq') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#111; padding:50px; border-radius:40px; border: 2px solid #444;">
                    <div style="font-size:3.5rem; font-weight:800; color:#fff; margin-bottom:40px;">${s.question}</div>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:25px; opacity:${subStep >= 1 ? 1 : 0}; transition: 0.5s;">
                        ${s.options.map((opt, i) => {
                            let bgColor = "#222";
                            let border = "2px solid #444";
                            if (subStep >= 2 && i === s.answer) { bgColor = "#27ae60"; border = "3px solid #fff"; }
                            return `<div style="background:${bgColor}; padding:35px; border-radius:20px; font-size:2.5rem; font-weight:bold; border: ${border}; transition: 0.3s; color:#fff;">${opt}</div>`;
                        }).join('')}
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
    }

    // دوال التحكم العالمية ليتم استدعاؤها من الصفحة الأم (index.html)
    window.nextSlide = () => {
        const s = slides[currentSlide];
        if (s.type === 'reveal-list' && subStep < s.items.length - 1) { subStep++; render(); }
        else if (s.type === 'mcq' && subStep < 2) { subStep++; render(); }
        else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; render(); }
    };

    window.prevSlide = () => {
        if (subStep > 0) { subStep--; render(); }
        else if (currentSlide > 0) { currentSlide--; subStep = 0; render(); }
    };

    // دعم الكيبورد للسبورات التي تستخدم ريموت أو كيبورد لاسلكي
    document.onkeydown = (e) => {
        if (e.keyCode === 39 || e.keyCode === 13 || e.keyCode === 32) window.nextSlide();
        else if (e.keyCode === 37) window.prevSlide();
    };

    render();
})();
