(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#050505; font-family:'Segoe UI', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;
    let lastRenderedSlide = -1;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'IF CONDITIONS', subtitle: 'The Master Guide', color: '#c5a059', usage: 'Expressing Conditions & Results' },
        
        /* 2: Summary Grid */
        { 
            type: 'grid', 
            title: 'General Usage', 
            items: [
                { title: 'Zero', desc: 'Facts & Science', color: '#ffffff' },
                { title: 'First', desc: 'Possible Future', color: '#2ecc71' },
                { title: 'Second', desc: 'Imaginary Now', color: '#3498db' },
                { title: 'Third', desc: 'Past Regrets', color: '#9b59b6' }
            ] 
        },

        /* 3: Zero Condition */
        { type: 'formula-card', title: 'ZERO CONDITION', subtitle: '100% TRUE', color: '#ffffff', ifPart: 'Present Simple', resultPart: 'Present Simple', 
            examples: ["If you heat water, it boils.", "If plants don't get water, they die."] },

        /* 4: First Condition */
        { type: 'formula-card', title: 'FIRST CONDITION', subtitle: 'PROBABLE FUTURE', color: '#2ecc71', ifPart: 'Present Simple', resultPart: 'Will + Inf.', 
            examples: ["If you study, you will pass.", "If it rains, we'll stay home."] },

        /* 5: Second Condition */
        { type: 'formula-card', title: 'SECOND CONDITION', subtitle: 'HYPOTHETICAL / DREAM', color: '#3498db', ifPart: 'Past Simple', resultPart: 'Would + Inf.', 
            examples: ["If I were you, I'd go.", "If I won the lottery, I'd travel."] },

        /* 6: Third Condition */
        { type: 'formula-card', title: 'THIRD CONDITION', subtitle: 'IMPOSSIBLE PAST', color: '#9b59b6', ifPart: 'Past Perfect (had+V3)', resultPart: 'Would have + V3', 
            examples: ["If he'd come early, he'd have lived.", "If I had known, I'd have helped."] },

        /* 7: Quiz (10 Mix Questions) */
        { 
            type: 'quiz-session',
            questions: [
                { q: "1. If I ________ you, I wouldn't do that.", opts: ["am", "was", "were", "had been"], ans: 2 },
                { q: "2. If it ________, we will cancel the trip.", opts: ["rains", "rained", "will rain", "had rained"], ans: 0 },
                { q: "3. If she ________ her phone, she would have called.", opts: ["didn't lose", "hasn't lost", "hadn't lost", "not lost"], ans: 2 },
                { q: "4. Water ________ if you heat it to 100°C.", opts: ["boil", "boils", "will boil", "boiled"], ans: 1 },
                { q: "5. If I ________ time, I would start a hobby.", opts: ["have", "will have", "had", "had had"], ans: 2 },
                { q: "6. If they ________ late, they will miss the bus.", opts: ["are", "were", "will be", "had been"], ans: 0 },
                { q: "7. If he had studied more, he ________ the exam.", opts: ["passed", "would pass", "would have passed", "will pass"], ans: 2 },
                { q: "8. If you touch fire, you ________ burned.", opts: ["get", "got", "will get", "would get"], ans: 0 },
                { q: "9. I ________ to the party if I hadn't been sick.", opts: ["went", "would go", "would have gone", "will go"], ans: 2 },
                { q: "10. If she ________, she would be very happy.", opts: ["wins", "won", "had won", "would win"], ans: 1 }
            ]
        },
        
        { type: 'title', content: 'BRILLIANT!', subtitle: 'FINISH', color: '#27ae60', usage: 'YOU MASTERED ALL IF CASES' }
    ];

    function render() {
        const s = slides[currentSlide];
        
        if (lastRenderedSlide !== currentSlide) {
            container.innerHTML = '';
            const wrapper = document.createElement('div');
            wrapper.id = 'slide-wrapper';
            wrapper.style.cssText = `width:90%; max-width:1200px; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; animation: vetoFade 0.5s ease;`;
            container.appendChild(wrapper);
            lastRenderedSlide = currentSlide;
        }

        const wrapper = document.getElementById('slide-wrapper');

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <div style="font-size:2vw; color:#555; letter-spacing:12px; margin-bottom:15px; font-weight:bold;">${s.subtitle}</div>
                <h1 style="font-size:8vw; font-weight:900; color:${s.color}; margin:0; line-height:1;">${s.content}</h1>
                <div style="font-size:2.8vw; color:#fff; font-weight:bold; margin-top:40px; border-top:5px solid ${s.color}; display:inline-block; padding-top:15px;">${s.usage}</div>
            `;
        } 
        else if (s.type === 'grid') {
            wrapper.innerHTML = `
                <h2 style="font-size:4vw; color:#c5a059; margin-bottom:40px; font-weight:900;">${s.title}</h2>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:25px; width:100%;">
                    ${s.items.map(item => `
                        <div style="background:#111; padding:30px; border-radius:25px; border-bottom:8px solid ${item.color};">
                            <div style="font-size:3vw; color:${item.color}; font-weight:900;">${item.title}</div>
                            <div style="font-size:1.8vw; color:#fff; font-weight:bold;">${item.desc}</div>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'formula-card') {
            wrapper.innerHTML = `
                <div style="margin-bottom:30px;">
                    <span style="font-size:1.5vw; color:${s.color}; letter-spacing:5px; font-weight:bold;">${s.subtitle}</span>
                    <h2 style="font-size:5vw; color:#fff; margin:0; font-weight:900;">${s.title}</h2>
                </div>
                <div style="background:#111; padding:40px; border-radius:30px; border:2px solid #222; width:100%; margin-bottom:30px;">
                    <div style="display:flex; justify-content:center; align-items:center; gap:30px; font-size:3.5vw; font-weight:900;">
                        <span style="color:#e74c3c;">IF + ${s.ifPart}</span>
                        <span style="color:#555;">➔</span>
                        <span style="color:${s.color};">${s.resultPart}</span>
                    </div>
                </div>
                <div style="display:flex; flex-direction:column; gap:15px; width:100%;">
                    ${s.examples.map((ex, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0.05}; transform:translateX(${i <= subStep ? 0 : 20}px); transition:0.4s; background:#1a1a1a; padding:20px; border-radius:15px; font-size:2vw; font-weight:bold; border-left:8px solid ${s.color}; text-align:left;">
                            ${ex}
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'quiz-session') {
            let qIdx = Math.floor(subStep / 2);
            let q = s.questions[qIdx] || s.questions[0];
            let showAns = subStep % 2 !== 0;
            wrapper.innerHTML = `
                <div style="text-align:left; background:#111; padding:4vh 4vw; border-radius:35px; border:2px solid #222; width:95%;">
                    <div style="color:#c5a059; font-weight:bold; font-size:1.2vw; margin-bottom:10px;">IF CHALLENGE ${qIdx + 1}/10</div>
                    <div style="font-size:2.5vw; font-weight:900; margin-bottom:30px; color:#fff; line-height:1.2;">${q.q}</div>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
                        ${q.opts.map((opt, i) => {
                            let isCorrect = showAns && i === q.ans;
                            let color = isCorrect ? '#2ecc71' : (showAns ? '#333' : '#fff');
                            let borderColor = isCorrect ? '#2ecc71' : '#333';
                            return `<div style="border:2px solid ${borderColor}; padding:15px; border-radius:15px; font-size:1.8vw; font-weight:bold; color:${color}; transition:0.2s; background:#0a0a0a;">${opt}</div>`;
                        }).join('')}
                    </div>
                </div>`;
        }
    }

    window.nextSlide = function() {
        const s = slides[currentSlide];
        let maxSub = 0;
        if (s.type === 'formula-card') maxSub = s.examples.length - 1;
        else if (s.type === 'quiz-session') maxSub = (s.questions.length * 2) - 1;

        if (subStep < maxSub) subStep++;
        else if (currentSlide < slides.length - 1) { 
            currentSlide++; 
            subStep = 0; 
        }
        render();
    };

    window.prevSlide = function() {
        if (subStep > 0) subStep--;
        else if (currentSlide > 0) { 
            currentSlide--; 
            subStep = 0; 
        }
        render();
    };

    document.onkeydown = (e) => {
        if (e.keyCode === 39 || e.keyCode === 32) window.nextSlide();
        else if (e.keyCode === 37) window.prevSlide();
    };

    const style = document.createElement('style');
    style.innerHTML = `@keyframes vetoFade { from { opacity:0; } to { opacity:1; } }`;
    document.head.appendChild(style);

    render();
})();
