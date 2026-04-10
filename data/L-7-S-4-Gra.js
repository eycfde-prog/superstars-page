(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#050505; font-family:'Segoe UI', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;
    let lastRenderedSlide = -1;

    const slides = [
        /* 1: Intro Title */
        { type: 'title', content: 'THE PASSIVE', subtitle: 'GRAMMAR FOCUS', color: '#c5a059', usage: 'Focus on the Action, not the Doer' },
        
        /* 2: The Logic */
        { 
            type: 'writing', 
            title: 'Why use it?', 
            content: 'We use the Passive Voice when the <br><span style="color:#c5a059; font-weight:900; font-size:4.5vw;">Action</span> or the <span style="color:#c5a059; font-weight:900; font-size:4.5vw;">Object</span><br>is more important than the person who did it.' 
        },

        /* 3: Present Simple Passive */
        { 
            type: 'step-box', 
            title: 'Present Simple', 
            subtitle: 'Routine / Facts',
            formula: 'Obj + am/is/are + V3',
            steps: [
                { label: 'ACTIVE', text: 'She cleans the house.', color: '#fff' },
                { label: 'PASSIVE', text: 'The house is cleaned.', color: '#c5a059' }
            ]
        },

        /* 4: Present Continuous Passive */
        { 
            type: 'step-box', 
            title: 'Present Cont.', 
            subtitle: 'Action Now',
            formula: 'Obj + am/is/are + BEING + V3',
            steps: [
                { label: 'ACTIVE', text: 'She is washing the dishes.', color: '#fff' },
                { label: 'PASSIVE', text: 'The dishes are being washed.', color: '#c5a059' }
            ]
        },

        /* 5: Past Simple Passive */
        { 
            type: 'step-box', 
            title: 'Past Simple', 
            subtitle: 'Completed Action',
            formula: 'Obj + was/were + V3',
            steps: [
                { label: 'ACTIVE', text: 'He wrote the letter.', color: '#fff' },
                { label: 'PASSIVE', text: 'The letter was written.', color: '#c5a059' }
            ]
        },

        /* 6: Present Perfect Passive */
        { 
            type: 'step-box', 
            title: 'Present Perfect', 
            subtitle: 'Recent Events',
            formula: 'Obj + has/have + BEEN + V3',
            steps: [
                { label: 'ACTIVE', text: 'She has broken the window.', color: '#fff' },
                { label: 'PASSIVE', text: 'The window has been broken.', color: '#c5a059' }
            ]
        },

        /* 7: Quiz Challenge (10 Questions) */
        { 
            type: 'quiz-session',
            questions: [
                { q: "1. The report ________ by the manager right now.", opts: ["is writing", "is being written", "was written", "writes"], ans: 1 },
                { q: "2. Our house ________ in 1995.", opts: ["was built", "is built", "built", "was building"], ans: 0 },
                { q: "3. English ________ in many countries worldwide.", opts: ["speaks", "is spoken", "is speaking", "spoken"], ans: 1 },
                { q: "4. A new shopping mall ________ lately.", opts: ["has built", "has been built", "was building", "is building"], ans: 1 },
                { q: "5. These photos ________ by my grandfather years ago.", opts: ["are taken", "were taken", "have been taken", "took"], ans: 1 },
                { q: "6. Look! The car ________ at the moment.", opts: ["is repairing", "is being repaired", "repairs", "has been repaired"], ans: 1 },
                { q: "7. The room ________ every day.", opts: ["is cleaned", "cleaned", "is cleaning", "has been cleaned"], ans: 0 },
                { q: "8. Mistakes ________ by the students in the last exam.", opts: ["were made", "are made", "have been made", "made"], ans: 0 },
                { q: "9. Dinner ________ already ________.", opts: ["is / cooked", "has / been cooked", "was / cooked", "is / being cooked"], ans: 1 },
                { q: "10. Thousands of emails ________ every second.", opts: ["are sent", "are being sent", "send", "were sent"], ans: 0 }
            ]
        },
        
        { type: 'title', content: 'CHAMPION!', subtitle: 'EXCELLENT', color: '#27ae60', usage: 'YOU HAVE MASTERED THE PASSIVE' }
    ];

    function render() {
        const s = slides[currentSlide];
        
        if (lastRenderedSlide !== currentSlide) {
            container.innerHTML = '';
            const wrapper = document.createElement('div');
            wrapper.id = 'slide-wrapper';
            wrapper.style.cssText = `width:90%; max-width:1200px; height: 85vh; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; animation: vetoFadeIn 0.4s ease-out;`;
            container.appendChild(wrapper);
            lastRenderedSlide = currentSlide;
        }

        const wrapper = document.getElementById('slide-wrapper');

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <div style="font-size:2vw; color:#444; letter-spacing:10px; margin-bottom:15px; text-transform:uppercase; font-weight:bold;">${s.subtitle}</div>
                <h1 style="font-size:8vw; font-weight:900; color:${s.color}; margin:0; line-height:1; text-transform:uppercase;">${s.content}</h1>
                <div style="font-size:2.8vw; color:#fff; font-weight:bold; margin-top:40px; border-top:5px solid ${s.color}; display:inline-block; padding-top:15px;">${s.usage}</div>
            `;
        } 
        else if (s.type === 'writing') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#111; padding:5vh 5vw; border-radius:40px; border-left:15px solid #c5a059; box-shadow: 0 30px 60px rgba(0,0,0,0.5);">
                    <h2 style="font-size:4vw; margin-bottom:20px; color:#fff; font-weight:900;">${s.title}</h2>
                    <div style="font-size:3vw; line-height:1.4; color:#d1d1d1;">${s.content}</div>
                </div>`;
        }
        else if (s.type === 'step-box') {
            wrapper.innerHTML = `
                <div style="margin-bottom:30px;">
                    <span style="font-size:1.5vw; color:#666; text-transform:uppercase; letter-spacing:5px; font-weight:bold;">${s.subtitle}</span>
                    <h2 style="font-size:5vw; color:#fff; margin:0; font-weight:900;">${s.title}</h2>
                </div>
                <div style="display:flex; flex-direction:column; gap:15px; width:100%; align-items:center;">
                    ${s.steps.map((step, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0.05}; transform:translateX(${i <= subStep ? 0 : 30}px); transition:0.5s; background:#111; padding:3vh 4vw; border-radius:20px; border: 2px solid #222; width:90%; display:flex; justify-content:space-between; align-items:center;">
                            <span style="color:#666; font-size:1.2vw; font-weight:bold; letter-spacing:2px;">${step.label}</span>
                            <span style="color:${step.color}; font-size:3vw; font-weight:bold;">${step.text}</span>
                        </div>
                    `).join('')}
                    <div style="opacity:${subStep >= s.steps.length - 1 ? 1 : 0}; transition:0.5s; margin-top:20px; background:${s.formula.includes('BEING') ? '#e74c3c' : '#2ecc71'}; padding:15px 40px; border-radius:50px; font-size:2.2vw; font-weight:900; color:#fff; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                        RULE: ${s.formula}
                    </div>
                </div>`;
        }
        else if (s.type === 'quiz-session') {
            let qIdx = Math.floor(subStep / 2);
            let q = s.questions[qIdx] || s.questions[0];
            let showAns = subStep % 2 !== 0;
            wrapper.innerHTML = `
                <div style="text-align:left; background:#111; padding:4vh 4vw; border-radius:35px; border:2px solid #222; width:95%;">
                    <div style="color:#c5a059; font-weight:bold; font-size:1.2vw; margin-bottom:10px;">PASSIVE MASTERY ${qIdx + 1}/10</div>
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
        if (s.type === 'step-box') maxSub = s.steps.length - 1;
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
    style.innerHTML = `@keyframes vetoFadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }`;
    document.head.appendChild(style);

    render();
})();
