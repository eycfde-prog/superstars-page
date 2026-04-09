(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

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
                <div style="display:flex; justify-content:center; align-items:center; gap:2vw; font-size:4.5vw; font-weight:900;">
                    <span style="color:#fff;">Sub.</span>
                    <span style="color:#3498db;">+</span>
                    <span style="color:#f1c40f; background:#111; padding:1vh 2vw; border-radius:15px; border:2px solid #333;">am / is / are</span>
                    <span style="color:#3498db;">+</span>
                    <span style="color:#e74c3c; border-bottom:0.8vh solid #e74c3c;">V - ing</span>
                </div>
                <p style="font-size:2.5vw; color:#888; margin-top:5vh; font-weight:bold;">Example: I <span style="color:#f1c40f;">am</span> speak<span style="color:#e74c3c;">ing</span> to you.</p>
            ` 
        },

        /* 4: Reveal List */
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

        /* 5: Negative Transform */
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

        /* 6: Question Transform */
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

        /* 7: Spelling Rules */
        { 
            type: 'spelling-grid', 
            title: 'Spelling Rules',
            rules: [
                { end: "Ends in -e", add: "Drop -e + ing", examples: "Write ➔ Writ<span style='color:#e74c3c;'>ing</span>" },
                { end: "Ends in -ie", add: "ie ➔ Y + ing", examples: "Die ➔ D<span style='color:#e74c3c;'>ying</span>" },
                { end: "CVC Style", add: "Double + ing", examples: "Run ➔ Run<span style='color:#e74c3c;'>ning</span>" }
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

        /* 9: Quiz */
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
        
        { type: 'title', content: 'EXCELLENT!', subtitle: 'CONTINUOUS MASTERED', color: '#f1c40f', usage: 'You are a Hero!' }
    ];

    function updateSubSteps() {
        const s = slides[currentSlide];
        if (!s) return;
        if (s.type === 'reveal-list') {
            const items = container.querySelectorAll('.list-item');
            items.forEach((item, i) => {
                item.style.opacity = (i <= subStep) ? '1' : '0.05';
                item.style.transform = (i <= subStep) ? 'translateX(0)' : 'translateX(-20px)';
            });
        }
        if (s.type === 'timeline') {
            const dot = container.querySelector('.timeline-dot');
            if(dot) dot.style.opacity = (subStep > 0) ? '1' : '0';
        }
    }

    function renderSlide(index) {
        if (index < 0 || index >= slides.length) return;
        currentSlide = index;
        subStep = 0;
        container.innerHTML = '';
        
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.className = 'slide-wrapper';
        wrapper.style.cssText = `width:95%; height:85%; display:flex; flex-direction:column; justify-content:center; align-items:center; animation: vetoSlideUp 0.4s ease;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <div style="font-size:2vw; color:#555; letter-spacing:10px; margin-bottom:2vh; text-transform:uppercase; font-weight:bold;">${s.subtitle}</div>
                <h1 style="font-size:8vw; font-weight:900; color:${s.color}; margin:0; line-height:1; text-shadow: 0 10px 30px rgba(0,0,0,0.5);">${s.content}</h1>
                <div style="font-size:2.5vw; color:#fff; font-weight:bold; margin-top:5vh; border-top:5px solid ${s.color}; display:inline-block; padding-top:2vh;">${s.usage}</div>
            `;
        } 
        else if (s.type === 'timeline') {
            wrapper.innerHTML = `
                <h2 style="font-size:4vw; color:#3498db; margin-bottom:4vh; font-weight:900;">TIME FOCUS</h2>
                <p style="font-size:3vw; margin-bottom:8vh; color:#ddd; font-weight:bold;">${s.content}</p>
                <div style="position:relative; width:80%; height:1.5vh; background:#222; border-radius:10px; border:2px solid #333;">
                    <div style="position:absolute; left:50%; top:-3vh; height:7vh; width:4px; background:#fff;">
                        <span style="position:absolute; top:8vh; left:50%; transform:translateX(-50%); color:#fff; font-size:2vw; font-weight:bold; white-space:nowrap;">NOW</span>
                    </div>
                    <div class="timeline-dot" style="position:absolute; left:50%; top:-1.5vh; width:4.5vh; height:4.5vh; border-radius:50%; background:#e74c3c; box-shadow:0 0 25px #e74c3c; opacity:0; transition:0.5s; transform:translateX(-50%);"></div>
                </div>`;
        }
        else if (s.type === 'writing') {
            wrapper.innerHTML = `<h2 style="font-size:4vw; color:#3498db; margin-bottom:6vh; font-weight:900;">${s.title}</h2><div>${s.content}</div>`;
        }
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `
                <h2 style="font-size:3.5vw; color:#3498db; margin-bottom:3vh; font-weight:900;">${s.title}</h2>
                <div style="display:flex; flex-direction:column; gap:1.2vh; width:85%;">
                    ${s.items.map(item => `<div class="list-item" style="opacity:0.05; transition:0.3s; background:rgba(255,255,255,0.03); padding:1.8vh 2vw; border-radius:12px; font-size:2vw; font-weight:bold; border-left:8px solid #3498db; text-align:left;">${item}</div>`).join('')}
                </div>`;
        }
        else if (s.type === 'transform') {
            renderTransform(wrapper, s);
        }
        else if (s.type === 'spelling-grid') {
            wrapper.innerHTML = `
                <h2 style="font-size:4vw; color:#3498db; margin-bottom:4vh; font-weight:900;">SPELLING SECRETS</h2>
                <div style="display:grid; grid-template-columns: 1fr; gap:2.5vh; width:85%;">
                    ${s.rules.map(r => `
                        <div style="background:#111; padding:2.5vh 3vw; border-radius:20px; border:2px solid #222; display:flex; justify-content:space-between; align-items:center;">
                            <div style="text-align:left;">
                                <div style="color:#3498db; font-size:1.4vw; font-weight:bold; margin-bottom:0.5vh;">${r.end}</div>
                                <div style="font-size:2.5vw; font-weight:900; color:#fff;">${r.add}</div>
                            </div>
                            <div style="font-size:3vw; color:#f1c40f; font-weight:900; background:#000; padding:1vh 3vw; border-radius:15px; border:2px solid #c5a059;">${r.examples}</div>
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
            <h2 style="font-size:4vw; color:#3498db; margin-bottom:2vh; font-weight:900;">${s.title}</h2>
            <p style="font-size:1.8vw; color:#666; margin-bottom:5vh; font-weight:bold;">${s.desc} (${pairIdx + 1}/${s.pairs.length})</p>
            <div style="background:rgba(255,255,255,0.02); padding:8vh 6vw; border-radius:40px; font-size:4.5vw; border:3px solid #333; color:${isChanged ? '#f1c40f' : '#fff'}; transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); font-weight:bold; box-shadow: 0 20px 50px rgba(0,0,0,0.3);">
                ${isChanged ? pair.neg : pair.pos}
            </div>`;
    }

    function renderQuiz(wrapper, s) {
        let qIdx = Math.floor(subStep / 2);
        let q = s.questions[qIdx] || s.questions[0];
        let showAns = subStep % 2 !== 0;
        wrapper.innerHTML = `
            <div style="text-align:left; background:#111; padding:5vh 4vw; border-radius:35px; border:2px solid #c5a059; width:90%; box-shadow: 0 0 40px rgba(197,160,89,0.1);">
                <div style="color:#3498db; font-weight:bold; font-size:1.5vw; margin-bottom:2vh; letter-spacing:3px;">PRACTICE MODE ${qIdx + 1}/10</div>
                <div style="font-size:2.8vw; font-weight:900; margin-bottom:4vh; color:#fff; line-height:1.3;">${q.q}</div>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:2vw;">
                    ${q.opts.map((opt, i) => {
                        let isCorrect = showAns && i === q.ans;
                        return `<div style="border:${isCorrect ? '5px solid #2ecc71' : '2px solid #333'}; padding:2vh; border-radius:18px; font-size:2vw; font-weight:bold; color:${isCorrect ? '#2ecc71' : (showAns ? '#444' : '#fff')}; background:${isCorrect ? 'rgba(46, 204, 113, 0.1)' : 'transparent'}; transition:0.3s;">${opt}</div>`;
                    }).join('')}
                </div>
            </div>`;
    }

    // ربط التنقل العالمي
    window.nextSlide = function() {
        const s = slides[currentSlide];
        let max = 0;
        if (s.type === 'reveal-list') max = s.items.length - 1;
        else if (s.type === 'timeline') max = 1;
        else if (s.type === 'transform') max = (s.pairs.length * 2) - 1;
        else if (s.type === 'quiz-session') max = (s.questions.length * 2) - 1;

        if (subStep < max) {
            subStep++;
            const wrap = container.querySelector('.slide-wrapper');
            if (s.type === 'transform') renderTransform(wrap, s);
            else if (s.type === 'quiz-session') renderQuiz(wrap, s);
            else updateSubSteps();
        } else if (currentSlide < slides.length - 1) {
            renderSlide(currentSlide + 1);
        } else if (typeof closeStage === 'function') {
            closeStage();
        }
    };

    window.prevSlide = function() {
        if (subStep > 0) {
            subStep--;
            const wrap = container.querySelector('.slide-wrapper');
            if (s.type === 'transform') renderTransform(wrap, s);
            else if (s.type === 'quiz-session') renderQuiz(wrap, s);
            else updateSubSteps();
        } else if (currentSlide > 0) {
            renderSlide(currentSlide - 1);
            // تعيين الـ subStep للحد الأقصى في السلايد السابق عند العودة
            const prevS = slides[currentSlide];
            if (prevS.type === 'reveal-list') subStep = prevS.items.length - 1;
            else if (prevS.type === 'timeline') subStep = 1;
            updateSubSteps();
        }
    };

    document.onkeydown = (e) => {
        if ([13, 32, 39].includes(e.keyCode)) { // Enter, Space, Right
            window.nextSlide();
        } else if (e.keyCode === 37) { // Left
            window.prevSlide();
        }
    };

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes vetoSlideUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        .slide-wrapper h2 { text-transform: uppercase; letter-spacing: 5px; }
    `;
    document.head.appendChild(style);
    renderSlide(0);
})();
