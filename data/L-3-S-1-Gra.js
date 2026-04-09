(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // الإعداد الأساسي للخلفية
    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#050505; font-family:'Segoe UI', sans-serif; direction:ltr; color:white;`;

    let currentSlide = -1; 
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'PRESENT CONTINUOUS', subtitle: 'HAPPENING RIGHT NOW', color: '#3498db', usage: 'Action in Progress + Temporary Situations' },
        
        /* 2: Timeline */
        { 
            type: 'timeline', 
            title: 'When is it?', 
            content: 'An action happening <span style="color:#f1c40f">AT THIS MOMENT</span>.' 
        },

        /* 3: Formulation */
        { 
            type: 'writing', 
            title: 'The Formula', 
            content: `
                <div style="display:flex; justify-content:center; align-items:center; gap:20px; font-size:4.5rem; font-weight:900;">
                    <span style="color:#fff;">Sub.</span>
                    <span style="color:#3498db;">+</span>
                    <span style="color:#f1c40f; background:#111; padding:10px 30px; border-radius:15px; border:2px solid #333;">am / is / are</span>
                    <span style="color:#3498db;">+</span>
                    <span style="color:#e74c3c; border-bottom:8px solid #e74c3c;">V - ing</span>
                </div>
                <p style="font-size:2.5rem; color:#666; margin-top:50px; font-weight:bold;">Example: I <span style="color:#f1c40f;">am</span> speak<span style="color:#e74c3c;">ing</span> to you.</p>
            ` 
        },

        /* 4: Reveal List (7 Examples for 7 Pronouns) */
        { 
            type: 'reveal-list', 
            title: 'Live Actions',
            items: [
                "1. <span style='color:#f1c40f'>I am</span> talking to you now.",
                "2. <span style='color:#f1c40f'>He is</span> explaining the lesson.",
                "3. <span style='color:#f1c40f'>She is</span> writing on the board.",
                "4. <span style='color:#f1c40f'>It is</span> raining outside.",
                "5. <span style='color:#f1c40f'>We are</span> listening to Mr. Ezz.",
                "6. <span style='color:#f1c40f'>You are</span> doing a great job.",
                "7. <span style='color:#f1c40f'>They are</span> playing football."
            ] 
        },

        /* 5: Negative Transform (7 Pronouns) */
        { 
            type: 'transform', 
            title: 'The Negative',
            desc: 'Just add "NOT" after am/is/are',
            pairs: [
                { pos: "I am talking.", neg: "I am <span style='color:#e74c3c;'>NOT</span> talking." },
                { pos: "He is explaining.", neg: "He is <span style='color:#e74c3c;'>NOT</span> explaining." },
                { pos: "She is writing.", neg: "She is <span style='color:#e74c3c;'>NOT</span> writing." },
                { pos: "It is raining.", neg: "It is <span style='color:#e74c3c;'>NOT</span> raining." },
                { pos: "We are listening.", neg: "We are <span style='color:#e74c3c;'>NOT</span> listening." },
                { pos: "You are doing.", neg: "You are <span style='color:#e74c3c;'>NOT</span> doing." },
                { pos: "They are playing.", neg: "They are <span style='color:#e74c3c;'>NOT</span> playing." }
            ]
        },

        /* 6: Question Transform (7 Pronouns) */
        { 
            type: 'transform', 
            title: 'The Question',
            desc: 'Switch Am/Is/Are with the Subject',
            pairs: [
                { pos: "I am late.", neg: "<span style='color:#f1c40f;'>AM</span> I late?" },
                { pos: "He is sleeping.", neg: "<span style='color:#f1c40f;'>IS</span> he sleep<span style='color:#3498db;'>ing</span>?" },
                { pos: "She is cooking.", neg: "<span style='color:#f1c40f;'>IS</span> she cook<span style='color:#3498db;'>ing</span>?" },
                { pos: "It is working.", neg: "<span style='color:#f1c40f;'>IS</span> it work<span style='color:#3498db;'>ing</span>?" },
                { pos: "We are winning.", neg: "<span style='color:#f1c40f;'>ARE</span> we winn<span style='color:#3498db;'>ing</span>?" },
                { pos: "You are studying.", neg: "<span style='color:#f1c40f;'>ARE</span> you study<span style='color:#3498db;'>ing</span>?" },
                { pos: "They are coming.", neg: "<span style='color:#f1c40f;'>ARE</span> they com<span style='color:#3498db;'>ing</span>?" }
            ]
        },

        /* 7: Spelling Rules Matrix */
        { 
            type: 'spelling-grid', 
            title: 'Spelling Secrets',
            rules: [
                { end: "Ends in -e", add: "Drop -e + ing", examples: "Write ➔ Writ<span style='color:#e74c3c;'>ing</span>" },
                { end: "Ends in -ie", add: "ie ➔ Y + ing", examples: "Die ➔ D<span style='color:#e74c3c;'>ying</span>" },
                { end: "CVC (One Syllable)", add: "Double + ing", examples: "Run ➔ Run<span style='color:#e74c3c;'>ning</span>" }
            ]
        },

        /* 8: Keywords */
        { 
            type: 'reveal-list', 
            title: 'Action Clues',
            items: [
                "🚀 Now / Right now",
                "🚀 At the moment",
                "🚀 Look! / Listen!",
                "🚀 At present",
                "🚀 Watch out!",
                "🚀 Tonight",
                "🚀 These days"
            ] 
        },

        /* 9: 10 MCQ Questions */
        { 
            type: 'quiz-session',
            questions: [
                { q: "1. Look! The man is _________ very fast.", opts: ["Run", "Runing", "Running", "Ran"], ans: 2 },
                { q: "2. Listen! Someone _________ at the door.", opts: ["is knocking", "knocks", "are knocking", "is knock"], ans: 0 },
                { q: "3. I _________ (not/study) at the moment.", opts: ["am not study", "not studying", "am not studying", "don't studying"], ans: 2 },
                { q: "4. _________ they playing football now?", opts: ["Do", "Is", "Are", "Have"], ans: 2 },
                { q: "5. She is _________ (write) an email right now.", opts: ["writeing", "writting", "writing", "writes"], ans: 2 },
                { q: "6. We _________ English together these days.", opts: ["learn", "is learning", "are learning", "learned"], ans: 2 },
                { q: "7. Watch out! A car _________.", opts: ["come", "is coming", "are coming", "comes"], ans: 1 },
                { q: "8. Why _________ you crying?", opts: ["am", "is", "are", "do"], ans: 2 },
                { q: "9. My cats _________ (sleep) on the sofa.", opts: ["is sleeping", "are sleeping", "sleeping", "sleeps"], ans: 1 },
                { q: "10. Sarah _________ (not/cook) dinner today.", opts: ["isn't cooking", "aren't cooking", "don't cook", "not cooking"], ans: 0 }
            ]
        },
        
        { type: 'title', content: 'YOU ARE UNSTOPPABLE!', subtitle: 'CONTINUOUS MASTERED', color: '#f1c40f', usage: 'Excellent Job, Master!' }
    ];

    function updateSubSteps() {
        const s = slides[currentSlide];
        if (!s) return;

        if (s.type === 'reveal-list') {
            const items = container.querySelectorAll('.list-item');
            items.forEach((item, i) => {
                item.style.opacity = (i <= subStep) ? '1' : '0.05';
                item.style.transform = (i <= subStep) ? 'translateX(0)' : 'translateX(-30px)';
            });
        }
        
        if (s.type === 'timeline') {
            const dot = container.querySelector('.timeline-dot');
            const text = container.querySelector('.timeline-text');
            if (dot) dot.style.opacity = (subStep >= 1) ? '1' : '0';
            if (text) text.style.opacity = (subStep >= 1) ? '1' : '0';
        }
    }

    function renderSlide(index) {
        if (index === currentSlide) return;
        currentSlide = index;
        subStep = 0;
        container.innerHTML = '';
        
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.className = 'slide-wrapper';
        wrapper.style.cssText = `width:95%; max-width:1400px; text-align:center; animation: vetoSlideUp 0.4s ease;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <div style="font-size:2.5vw; color:#444; letter-spacing:15px; margin-bottom:20px; text-transform:uppercase; font-weight:bold;">${s.subtitle}</div>
                <h1 style="font-size:8vw; font-weight:900; color:${s.color}; margin:0; line-height:1; text-shadow: 0 10px 40px rgba(52,152,219,0.3);">${s.content}</h1>
                <div style="font-size:3.2vw; color:#fff; font-weight:bold; margin-top:50px; border-top:6px solid ${s.color}; display:inline-block; padding-top:20px;">${s.usage}</div>
            `;
        } 
        else if (s.type === 'timeline') {
            wrapper.innerHTML = `
                <h2 style="font-size:5rem; color:#3498db; margin-bottom:50px; font-weight:900;">THE TIMELINE</h2>
                <p style="font-size:3.5rem; margin-bottom:100px; color:#ddd;">${s.content}</p>
                <div style="position:relative; width:85%; margin:100px auto; height:12px; background:#222; border-radius:10px;">
                    <div style="position:absolute; left:50%; top:-25px; height:60px; width:6px; background:#fff;">
                        <span style="position:absolute; top:75px; left:-50px; color:#fff; font-size:2rem; font-weight:bold; width:120px;">PRESENT</span>
                    </div>
                    <div class="timeline-dot" style="position:absolute; left:50%; top:-10px; width:30px; height:30px; border-radius:50%; background:#e74c3c; box-shadow:0 0 20px #e74c3c; opacity:0; transition:0.5s; transform:translateX(-50%); animation: pulse 1.5s infinite;"></div>
                    <div class="timeline-text" style="position:absolute; width:100%; top:120px; text-align:center; color:#e74c3c; font-size:2.5rem; font-weight:900; opacity:0; transition:0.5s;">ACTION IS HAPPENING NOW!</div>
                </div>`;
        }
        else if (s.type === 'writing') {
            wrapper.innerHTML = `<h2 style="font-size:5.5rem; color:#3498db; margin-bottom:50px; font-weight:900;">${s.title}</h2><div style="line-height:1.2;">${s.content}</div>`;
        }
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `
                <h2 style="font-size:5rem; color:#3498db; margin-bottom:40px; font-weight:900;">${s.title}</h2>
                <div style="display:grid; grid-template-columns: 1fr; gap:12px; max-width:1000px; margin: 0 auto;">
                    ${s.items.map(item => `
                        <div class="list-item" style="opacity:0.05; transition:0.3s; background:#111; padding:20px; border-radius:15px; font-size:2.5rem; font-weight:bold; border-left:15px solid #3498db; text-align:left;">
                            ${item}
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'transform') {
            renderTransform(wrapper, s);
        }
        else if (s.type === 'spelling-grid') {
            wrapper.innerHTML = `
                <h2 style="font-size:5.5rem; color:#3498db; margin-bottom:50px; font-weight:900;">SPELLING RULES</h2>
                <div style="display:grid; grid-template-columns: 1fr; gap:25px;">
                    ${s.rules.map(r => `
                        <div style="background:#111; padding:35px; border-radius:30px; border:2px solid #222; display:flex; justify-content:space-between; align-items:center;">
                            <div style="text-align:left;">
                                <div style="color:#3498db; font-size:1.8rem; font-weight:bold;">${r.end}</div>
                                <div style="font-size:3.5rem; font-weight:900; color:#fff;">${r.add}</div>
                            </div>
                            <div style="font-size:4rem; color:#f1c40f; font-weight:900; background:#050505; padding:10px 40px; border-radius:20px; border:2px solid #333;">${r.examples}</div>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'quiz-session') {
            renderQuiz(wrapper, s);
        }

        container.appendChild(wrapper);
        updateSubSteps();
    }

    function renderTransform(wrapper, s) {
        let pairIdx = Math.floor(subStep / 2);
        let pair = s.pairs[pairIdx] || s.pairs[0];
        let isChanged = subStep % 2 !== 0;
        wrapper.innerHTML = `
            <h2 style="font-size:5rem; color:#3498db; margin:0; font-weight:900;">${s.title}</h2>
            <p style="font-size:2rem; color:#555; margin-bottom:40px; font-weight:bold;">${s.desc} (${pairIdx + 1}/${s.pairs.length})</p>
            <div style="background:#111; padding:80px; border-radius:50px; font-size:5rem; border:4px solid #333; color:${isChanged ? '#f1c40f' : '#fff'}; transition: 0.3s; font-weight:bold;">
                ${isChanged ? pair.neg : pair.pos}
            </div>`;
    }

    function renderQuiz(wrapper, s) {
        let qIdx = Math.floor(subStep / 2);
        let q = s.questions[qIdx] || s.questions[0];
        let showAns = subStep % 2 !== 0;

        wrapper.innerHTML = `
            <div style="text-align:left; background:#111; padding:60px; border-radius:40px; border:3px solid #222;">
                <div style="color:#3498db; font-weight:bold; font-size:1.5rem; margin-bottom:20px;">PRACTICE ${qIdx + 1}/10</div>
                <div style="font-size:3.5rem; font-weight:900; margin-bottom:40px; color:#fff;">${q.q}</div>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
                    ${q.opts.map((opt, i) => {
                        let isCorrect = showAns && i === q.ans;
                        let border = isCorrect ? '6px solid #2ecc71' : '2px solid #333';
                        let color = isCorrect ? '#2ecc71' : (showAns ? '#444' : '#fff');
                        return `<div style="border:${border}; padding:25px; border-radius:20px; font-size:2.5rem; font-weight:bold; color:${color}; transition:0.3s;">${opt}</div>`;
                    }).join('')}
                </div>
            </div>`;
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if ([13, 32, 39].includes(e.keyCode)) { // Next
            let max = 0;
            if (s.type === 'reveal-list') max = s.items.length - 1;
            else if (s.type === 'timeline') max = 1;
            else if (s.type === 'transform') max = (s.pairs.length * 2) - 1;
            else if (s.type === 'quiz-session') max = (s.questions.length * 2) - 1;

            if (subStep < max) {
                subStep++;
                if (s.type === 'transform') renderTransform(container.querySelector('.slide-wrapper'), s);
                else if (s.type === 'quiz-session') renderQuiz(container.querySelector('.slide-wrapper'), s);
                else updateSubSteps();
            } else if (currentSlide < slides.length - 1) {
                renderSlide(currentSlide + 1);
            } else {
                if (window.triggerVetoDone) window.triggerVetoDone();
            }
        } else if (e.keyCode === 37) { // Back
            if (subStep > 0) {
                subStep--;
                if (s.type === 'transform') renderTransform(container.querySelector('.slide-wrapper'), s);
                else if (s.type === 'quiz-session') renderQuiz(container.querySelector('.slide-wrapper'), s);
                else updateSubSteps();
            } else if (currentSlide > 0) {
                renderSlide(currentSlide - 1);
            }
        }
    };

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes vetoSlideUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0% { transform: translateX(-50%) scale(1); opacity: 1; } 50% { transform: translateX(-50%) scale(1.3); opacity: 0.7; } 100% { transform: translateX(-50%) scale(1); opacity: 1; } }
    `;
    document.head.appendChild(style);

    renderSlide(0);
})();
