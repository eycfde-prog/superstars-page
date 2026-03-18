(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#050505; font-family:'Segoe UI', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
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
                    <span style="color:#f1c40f; background:#111; padding:10px 30px; border-radius:15px;">am / is / are</span>
                    <span style="color:#3498db;">+</span>
                    <span style="color:#e74c3c; border-bottom:8px solid #e74c3c;">V - ing</span>
                </div>
                <p style="font-size:2.5rem; color:#555; margin-top:50px;">Example: I <span style="color:#f1c40f;">am</span> speak<span style="color:#e74c3c;">ing</span> to you.</p>
            ` 
        },

        /* 4: Reveal List */
        { 
            type: 'reveal-list', 
            title: 'Live Actions',
            items: [
                "1. I am talking to you now.",
                "2. He is explaining the lesson.",
                "3. She is writing on the board.",
                "4. Look! It is raining outside.",
                "5. Listen! They are calling us."
            ] 
        },

        /* 5: Negative Transform */
        { 
            type: 'transform', 
            title: 'The Negative',
            desc: 'Just add "NOT" after am/is/are',
            pairs: [
                { pos: "I am talking.", neg: "I am <span style='color:#e74c3c;'>NOT</span> talking." },
                { pos: "She is working.", neg: "She is <span style='color:#e74c3c;'>NOT</span> working." },
                { pos: "They are playing.", neg: "They are <span style='color:#e74c3c;'>NOT</span> playing." }
            ]
        },

        /* 6: Question Transform */
        { 
            type: 'transform', 
            title: 'The Question',
            desc: 'Switch Am/Is/Are with the Subject',
            pairs: [
                { pos: "You are studying.", neg: "<span style='color:#f1c40f;'>ARE</span> you study<span style='color:#3498db;'>ing</span>?" },
                { pos: "He is sleeping.", neg: "<span style='color:#f1c40f;'>IS</span> he sleep<span style='color:#3498db;'>ing</span>?" },
                { pos: "It is working.", neg: "<span style='color:#f1c40f;'>IS</span> it work<span style='color:#3498db;'>ing</span>?" }
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
                "🚀 Watch out!"
            ] 
        },

        /* --- Quiz Section (5 Questions) --- */
        { 
            type: 'mcq', 
            question: "1. Look! The man is _________ very fast.",
            options: ["A) Run", "B) Runing", "C) Running", "D) Ran"],
            answer: 2 
        },
        { 
            type: 'mcq', 
            question: "2. Listen! Someone _________ at the door.",
            options: ["A) is knocking", "B) knocks", "C) are knocking", "D) is knock"],
            answer: 0 
        },
        { 
            type: 'mcq', 
            question: "3. I _________ (not/study) at the moment.",
            options: ["A) am not study", "B) not studying", "am not studying", "D) don't studying"],
            answer: 2 
        },
        { 
            type: 'mcq', 
            question: "4. _________ they playing football now?",
            options: ["A) Do", "B) Is", "C) Are", "D) Have"],
            answer: 2 
        },
        { 
            type: 'mcq', 
            question: "5. She is _________ (write) an email right now.",
            options: ["A) writeing", "B) writting", "C) writing", "D) writes"],
            answer: 2 
        },
        
        { type: 'title', content: 'YOU ARE UNSTOPPABLE!', subtitle: 'CONTINUOUS MASTERED', color: '#f1c40f', usage: 'GO AND PRACTICE NOW!' }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:95%; max-width:1400px; text-align:center; animation: vetoSlideUp 0.5s ease;`;

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
                    <div style="position:absolute; left:50%; top:-25px; height:60px; width:6px; background:#fff; box-shadow: 0 0 20px #fff;">
                        <span style="position:absolute; top:75px; left:-50px; color:#fff; font-size:2rem; font-weight:bold; width:120px;">PRESENT</span>
                    </div>
                    <div style="position:absolute; left:50%; top:-15px; width:45px; height:45px; border-radius:50%; background:#e74c3c; box-shadow:0 0 30px #e74c3c; opacity:${subStep >= 1 ? 1 : 0}; transition:0.5s; transform:translateX(-50%); animation: pulse 1.5s infinite;"></div>
                    <div style="position:absolute; width:100%; top:120px; text-align:center; color:#e74c3c; font-size:2.5rem; font-weight:900; opacity:${subStep >= 1 ? 1 : 0};">ACTION IS HAPPENING NOW!</div>
                </div>`;
        }
        else if (s.type === 'writing') {
            wrapper.innerHTML = `
                <h2 style="font-size:5.5rem; color:#3498db; margin-bottom:50px; font-weight:900;">${s.title}</h2>
                <div style="line-height:1.2;">${s.content}</div>
            `;
        }
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `
                <h2 style="font-size:5.5rem; color:#3498db; margin-bottom:40px; font-weight:900;">EXAMPLES</h2>
                <div style="display:flex; flex-direction:column; gap:15px; text-align:left; max-width:1000px; margin: 0 auto;">
                    ${s.items.map((item, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0.05}; transform:translateX(${i <= subStep ? 0 : -50}px); transition:0.3s; background:#111; padding:25px; border-radius:20px; font-size:2.8rem; font-weight:bold; border-left:15px solid #3498db;">
                            ${item}
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'transform') {
            let pair = s.pairs[Math.floor(subStep/2)] || s.pairs[0];
            let isChanged = subStep % 2 !== 0;
            wrapper.innerHTML = `
                <h2 style="font-size:5.5rem; color:#3498db; margin:0; font-weight:900;">${s.title}</h2>
                <p style="font-size:2.5rem; color:#555; margin-bottom:40px; font-weight:bold;">${s.desc}</p>
                <div style="background:#111; padding:80px; border-radius:50px; font-size:5.5rem; border:4px solid #333; color:${isChanged ? '#f1c40f' : '#fff'}; transition: 0.3s; font-weight:bold; box-shadow: inset 0 0 50px rgba(0,0,0,0.8);">
                    ${isChanged ? pair.neg : pair.pos}
                </div>`;
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
        else if (s.type === 'mcq') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#111; padding:70px; border-radius:50px; border:3px solid #222; box-shadow: 0 20px 60px rgba(0,0,0,0.7);">
                    <div style="font-size:4rem; font-weight:900; margin-bottom:50px; color:#fff; line-height:1.2;">${s.question}</div>
                    <div style="display:grid; grid-template-columns: 1fr; gap:25px;">
                        ${s.options.map((opt, i) => {
                            let isCorrect = subStep >= 2 && i === s.answer;
                            let border = isCorrect ? '8px solid #2ecc71' : '2px solid #333';
                            let bg = isCorrect ? 'rgba(46,204,113,0.1)' : 'transparent';
                            let color = isCorrect ? '#2ecc71' : (subStep >= 2 ? '#444' : '#fff');
                            return `<div style="background:${bg}; border:${border}; padding:30px; border-radius:25px; font-size:3.2rem; font-weight:bold; color:${color}; transition:0.3s;">${opt}</div>`;
                        }).join('')}
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if (e.keyCode === 39 || e.keyCode === 13 || e.keyCode === 32) { 
            if ((s.type === 'timeline' || s.type === 'reveal-list') && subStep < (s.items ? s.items.length - 1 : 1)) subStep++;
            else if (s.type === 'transform' && subStep < (s.pairs.length * 2) - 1) subStep++;
            else if (s.type === 'mcq' && subStep < 2) subStep++;
            else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
            else { if(window.triggerVetoDone) window.triggerVetoDone(); }
        } else if (e.keyCode === 37) { 
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes vetoSlideUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0% { transform: translateX(-50%) scale(1); opacity: 1; } 50% { transform: translateX(-50%) scale(1.5); opacity: 0.7; } 100% { transform: translateX(-50%) scale(1); opacity: 1; } }
    `;
    document.head.appendChild(style);

    render();
})();
