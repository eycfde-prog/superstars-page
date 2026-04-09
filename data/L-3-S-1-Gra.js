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
                <div style="display:flex; justify-content:center; align-items:center; gap:20px; font-size:4.5rem; font-weight:900;">
                    <span style="color:#fff;">Sub.</span>
                    <span style="color:#3498db;">+</span>
                    <span style="color:#f1c40f; background:#111; padding:10px 30px; border-radius:15px; border:1px solid #333;">am / is / are</span>
                    <span style="color:#3498db;">+</span>
                    <span style="color:#e74c3c; border-bottom:8px solid #e74c3c;">V - ing</span>
                </div>
                <p style="font-size:2.5rem; color:#666; margin-top:50px; font-weight:bold;">Example: I <span style="color:#f1c40f;">am</span> speak<span style="color:#e74c3c;">ing</span> to you.</p>
            ` 
        },

        /* 4: Reveal List (7 Pronouns) */
        { 
            type: 'reveal-list', 
            title: 'Affirmative: I, He, She, It, We, You, They',
            items: [
                "1. I am reading a book now.",
                "2. He is playing football.",
                "3. She is cooking dinner.",
                "4. It is raining at the moment.",
                "5. We are learning English.",
                "6. You are watching a video.",
                "7. They are running in the park."
            ] 
        },

        /* 5: Negative Transform (7 Pronouns) */
        { 
            type: 'transform', 
            title: 'The Negative',
            desc: 'Add "NOT" after am/is/are',
            pairs: [
                { pos: "I am reading.", neg: "I am <span style='color:#e74c3c;'>NOT</span> reading." },
                { pos: "He is playing.", neg: "He is <span style='color:#e74c3c;'>NOT</span> playing." },
                { pos: "She is cooking.", neg: "She is <span style='color:#e74c3c;'>NOT</span> cooking." },
                { pos: "It is raining.", neg: "It is <span style='color:#e74c3c;'>NOT</span> raining." },
                { pos: "We are learning.", neg: "We are <span style='color:#e74c3c;'>NOT</span> learning." },
                { pos: "You are watching.", neg: "You are <span style='color:#e74c3c;'>NOT</span> watching." },
                { pos: "They are running.", neg: "They are <span style='color:#e74c3c;'>NOT</span> running." }
            ]
        },

        /* 6: Question Transform (7 Pronouns) */
        { 
            type: 'transform', 
            title: 'The Question',
            desc: 'Start with Am / Is / Are',
            pairs: [
                { pos: "I am reading.", neg: "<span style='color:#f1c40f;'>AM</span> I reading?" },
                { pos: "He is playing.", neg: "<span style='color:#f1c40f;'>IS</span> he playing?" },
                { pos: "She is cooking.", neg: "<span style='color:#f1c40f;'>IS</span> she cooking?" },
                { pos: "It is raining.", neg: "<span style='color:#f1c40f;'>IS</span> it raining?" },
                { pos: "We are learning.", neg: "<span style='color:#f1c40f;'>ARE</span> we learning?" },
                { pos: "You are watching.", neg: "<span style='color:#f1c40f;'>ARE</span> you watching?" },
                { pos: "They are running.", neg: "<span style='color:#f1c40f;'>ARE</span> they running?" }
            ]
        },

        /* 7: Spelling Rules */
        { 
            type: 'spelling-grid', 
            title: 'Spelling Rules',
            rules: [
                { end: "Normal Verbs", add: "Add + ing", examples: "Cook ➔ Cook<span style='color:#e74c3c;'>ing</span>" },
                { end: "Ends in -e", add: "Drop -e + ing", examples: "Write ➔ Writ<span style='color:#e74c3c;'>ing</span>" },
                { end: "Ends in -ie", add: "ie ➔ Y + ing", examples: "Lie ➔ Ly<span style='color:#e74c3c;'>ing</span>" },
                { end: "CVC Rule", add: "Double letter + ing", examples: "Swim ➔ Swim<span style='color:#e74c3c;'>ming</span>" }
            ]
        },

        /* 8: 10 MCQ Quiz */
        { 
            type: 'mcq-session', 
            title: 'Practice Time',
            questions: [
                { q: "1. Look! The cat _________ on the sofa.", opts: ["A) sleeps", "B) is sleeping", "C) are sleeping", "D) sleep"], ans: 1 },
                { q: "2. I _________ (not/work) today.", opts: ["A) am not working", "B) don't working", "C) not working", "D) am not work"], ans: 0 },
                { q: "3. _________ you listening to me?", opts: ["A) Is", "B) Do", "C) Are", "D) Have"], ans: 2 },
                { q: "4. Listen! Sarah _________ the piano.", opts: ["A) plays", "B) play", "C) are playing", "D) is playing"], ans: 3 },
                { q: "5. They _________ their homework right now.", opts: ["A) are doing", "B) is doing", "C) doing", "D) does"], ans: 0 },
                { q: "6. We _________ (not/go) to the party tonight.", opts: ["A) isn't going", "B) aren't going", "C) don't going", "D) not go"], ans: 1 },
                { q: "7. What _________ he doing at the moment?", opts: ["A) are", "B) am", "C) is", "D) does"], ans: 2 },
                { q: "8. Be quiet! The baby _________.", opts: ["A) sleeps", "B) is sleeping", "C) is sleep", "D) sleeping"], ans: 1 },
                { q: "9. Why _________ they running so fast?", opts: ["A) is", "B) do", "C) are", "D) am"], ans: 2 },
                { q: "10. I am _________ (write) an essay now.", opts: ["A) writeing", "B) writing", "C) writting", "D) writes"], ans: 1 }
            ]
        },
        
        { type: 'title', content: 'EXCELLENT!', subtitle: 'You Mastered the Present Continuous', color: '#2ecc71', usage: 'Keep Going, Master!' }
    ];

    function updateSubSteps() {
        const s = slides[currentSlide];
        if (!s) return;

        if (s.type === 'reveal-list') {
            const items = container.querySelectorAll('.list-item');
            items.forEach((item, i) => {
                item.style.opacity = (i <= subStep) ? '1' : '0.05';
                item.style.transform = (i <= subStep) ? 'translateX(0)' : 'translateX(-20px)';
                item.style.borderColor = (i === subStep) ? '#3498db' : '#222';
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
        wrapper.style.cssText = `width:95%; max-width:1400px; text-align:center; animation: vetoFade 0.3s ease;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <div style="font-size:2.5vw; color:#444; letter-spacing:15px; margin-bottom:20px; text-transform:uppercase; font-weight:bold;">${s.subtitle}</div>
                <h1 style="font-size:8vw; font-weight:900; color:${s.color}; margin:0; line-height:1;">${s.content}</h1>
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
            wrapper.innerHTML = `
                <h2 style="font-size:5.5rem; color:#3498db; margin-bottom:50px; font-weight:900;">${s.title}</h2>
                <div style="line-height:1.2;">${s.content}</div>`;
        }
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `
                <h2 style="font-size:4rem; color:#3498db; margin-bottom:40px; font-weight:900;">${s.title}</h2>
                <div style="display:flex; flex-direction:column; gap:10px; text-align:left; max-width:900px; margin: 0 auto;">
                    ${s.items.map((item) => `
                        <div class="list-item" style="opacity:0.05; transition:0.3s; background:#111; padding:20px; border-radius:15px; font-size:2.2rem; font-weight:bold; border-left:10px solid #222;">
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
                <div style="display:grid; grid-template-columns: 1fr; gap:20px;">
                    ${s.rules.map(r => `
                        <div style="background:#111; padding:30px; border-radius:25px; border:2px solid #222; display:flex; justify-content:space-between; align-items:center;">
                            <div style="text-align:left;">
                                <div style="color:#3498db; font-size:1.5rem; font-weight:bold;">${r.end}</div>
                                <div style="font-size:3rem; font-weight:900; color:#fff;">${r.add}</div>
                            </div>
                            <div style="font-size:3.5rem; color:#f1c40f; font-weight:900; background:#050505; padding:10px 40px; border-radius:20px; border:2px solid #333;">${r.examples}</div>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'mcq-session') {
            renderMCQ(wrapper, s);
        }

        container.appendChild(wrapper);
        updateSubSteps();
    }

    function renderTransform(parent, s) {
        let pairIdx = Math.floor(subStep / 2);
        let isChanged = subStep % 2 !== 0;
        let pair = s.pairs[pairIdx] || s.pairs[0];
        
        parent.innerHTML = `
            <h2 style="font-size:5rem; color:#3498db; margin:0; font-weight:900;">${s.title}</h2>
            <p style="font-size:2rem; color:#555; margin-bottom:40px; font-weight:bold;">${s.desc} (${pairIdx + 1}/7)</p>
            <div style="background:#111; padding:70px; border-radius:40px; font-size:5rem; border:4px solid #222; color:${isChanged ? '#f1c40f' : '#fff'}; transition: 0.3s; font-weight:bold; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
                ${isChanged ? pair.neg : pair.pos}
            </div>`;
    }

    function renderMCQ(parent, s) {
        let qIdx = Math.floor(subStep / 2);
        let showAns = subStep % 2 !== 0;
        let q = s.questions[qIdx];

        parent.innerHTML = `
            <div style="text-align:left; background:#111; padding:50px; border-radius:40px; border:3px solid #222;">
                <div style="font-size:1.5rem; color:#3498db; margin-bottom:10px; font-weight:bold;">QUESTION ${qIdx + 1}/10</div>
                <div style="font-size:3.5rem; font-weight:900; margin-bottom:40px; color:#fff;">${q.q}</div>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
                    ${q.opts.map((opt, i) => {
                        let isCorrect = showAns && i === q.ans;
                        let color = isCorrect ? '#2ecc71' : (showAns ? '#444' : '#fff');
                        let bColor = isCorrect ? '#2ecc71' : '#333';
                        return `<div style="border:3px solid ${bColor}; padding:25px; border-radius:20px; font-size:2.5rem; font-weight:bold; color:${color}; transition:0.3s;">${opt}</div>`;
                    }).join('')}
                </div>
            </div>`;
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if ([13, 32, 39].includes(e.keyCode)) { // Next
            let max = 0;
            if (s.type === 'timeline') max = 1;
            else if (s.type === 'reveal-list') max = s.items.length - 1;
            else if (s.type === 'transform') max = (s.pairs.length * 2) - 1;
            else if (s.type === 'mcq-session') max = (s.questions.length * 2) - 1;

            if (subStep < max) {
                subStep++;
                if (s.type === 'transform') renderTransform(container.querySelector('.slide-wrapper'), s);
                else if (s.type === 'mcq-session') renderMCQ(container.querySelector('.slide-wrapper'), s);
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
                else if (s.type === 'mcq-session') renderMCQ(container.querySelector('.slide-wrapper'), s);
                else updateSubSteps();
            } else if (currentSlide > 0) {
                renderSlide(currentSlide - 1);
            }
        }
    };

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes vetoFade { from { opacity:0; transform: scale(0.98); } to { opacity:1; transform: scale(1); } }
        @keyframes pulse { 0% { transform: translateX(-50%) scale(1); } 50% { transform: translateX(-50%) scale(1.3); } 100% { transform: translateX(-50%) scale(1); } }
    `;
    document.head.appendChild(style);

    renderSlide(0);
})();
