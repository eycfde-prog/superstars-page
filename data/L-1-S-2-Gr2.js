(function() {
    const container = document.getElementById('activityFinalContent');
    container.innerHTML = ''; 
    container.style.cssText = `height:calc(100vh - 140px); overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:transparent; font-family:'Arial',sans-serif; direction:ltr;`;

    let currentSlide = 0;
    let subStep = 0; // للتحكم في الحركات داخل السلايد الواحد

    const slides = [
        /* 1 */ { type: 'title', content: 'Verb to BE', size: '7rem' },
        /* 2 */ { type: 'build-sentences', sentences: [
            "I am a student at the local school.", "He is very good at playing football.", 
            "She is a talented artist who loves painting.", "It is a beautiful day to go to the park.",
            "We are excited about the upcoming field trip.", "You are my best friend.", 
            "They are busy finishing their homework."
        ]},
        /* 3 */ { type: 'writing', title: 'Positive', content: "I am a student at the local school.<br>She is a talented artist who loves painting.<br>You are my best friend." },
        /* 4 */ { type: 'writing', title: 'Rule 1', content: "For negative we use <span style='color:red'>Not</span> after am, is, are" },
        /* 5-11 */ ...["I am a student", "He is very good", "She is a talented artist", "It is a beautiful day", "We are excited", "You are my best friend", "They are busy"].map(s => ({ type: 'negation-anim', text: s })),
        /* 12 */ { type: 'writing', title: 'Negative', content: "I am <span style='color:red'>not</span> a student...<br>She is <span style='color:red'>not</span> a talented artist...<br>You are <span style='color:red'>not</span> my best friend." },
        /* 13 */ { type: 'writing', title: 'Rule 2', content: "For question we <span style='color:blue'>switch</span> between subject and (am, is, are)" },
        /* 14-20 */ ...["I am a student", "He is very good", "She is a talented artist", "It is a beautiful day", "We are excited", "You are my best friend", "They are busy"].map(s => ({ type: 'question-anim', text: s })),
        /* 21 */ { type: 'writing', title: 'Question', content: "Am I a student?<br>Is she a talented artist?<br>Are you my best friend?" },
        /* 22 */ { type: 'quiz', question: ".......... he your brother?", options: ["are", "is", "am", "do"], correct: 1 },
        /* 23 */ { type: 'writing', title: 'Contractions', content: "Merging Short Forms" },
        /* 24 */ { type: 'contract-anim', pairs: [["I am","I'm"], ["He is","He's"], ["She is","She's"], ["It is","It's"], ["We are","We're"], ["You are","You're"], ["They are","They're"]] },
        /* 25 */ { type: 'writing', title: 'Short Forms', content: "I'm - He's - You're" },
        /* 26 */ { type: 'neg-contract-anim', data: [["I am not", "I'm not", "I'm not"], ["He is not", "He's not", "He isn't"], ["She is not", "She's not", "She isn't"], ["It is not", "It's not", "It isn't"], ["We are not", "We're not", "We aren't"], ["You are not", "You're not", "You aren't"], ["They are not", "They're not", "They aren't"]] },
        /* 27 */ { type: 'writing', title: 'Writing Neg. Forms', content: "I'm not<br>He isn't<br>We aren't" },
        /* 28 */ { type: 'end', content: 'Lesson Completed!', button: 'Go to Test' }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:95%; text-align:center; transition:0.5s;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `<h1 style="font-size:${s.size}; margin:0; font-weight:900; color:#2c3e50;">${s.content}</h1>`;
        } 
        else if (s.type === 'writing') {
            container.style.background = "#f9f9f9";
            wrapper.innerHTML = `
                <div style="display:inline-block; text-align:left; background:white; padding:40px; border-left:10px solid #f1c40f; box-shadow:0 10px 30px rgba(0,0,0,0.1); border-radius:10px;">
                    <small style="color:#f1c40f; font-weight:bold; font-size:1.5rem;">📝 WRITING TIME</small>
                    <h2 style="font-size:3rem; margin:10px 0; color:#2c3e50;">${s.title}</h2>
                    <div style="font-size:2.2rem; line-height:1.6; color:#34495e;">${s.content}</div>
                </div>`;
        }
        else if (s.type === 'build-sentences') {
            wrapper.innerHTML = s.sentences.map((txt, i) => 
                `<p style="font-size:2rem; margin:10px; transition:0.3s; opacity:${i <= subStep ? 1 : 0}; transform:translateX(${i <= subStep ? 0 : 20}px)">${txt}</p>`
            ).join('');
        }
        else if (s.type === 'negation-anim') {
            let parts = s.text.split(' '); // "I", "am", ...
            wrapper.innerHTML = `<div style="font-size:3.5rem; font-weight:bold;">
                <span>${parts[0]}</span> <span>${parts[1]}</span> 
                <span style="color:red; transition:0.5s; opacity:${subStep>0?1:0}; margin-left:${subStep>0?20:0}px">not</span> 
                <span>${parts.slice(2).join(' ')}</span>
            </div>`;
        }
        else if (s.type === 'question-anim') {
            let parts = s.text.split(' ');
            let sub = parts[0], verb = parts[1];
            wrapper.innerHTML = `<div style="font-size:3.5rem; font-weight:bold; display:flex; justify-content:center; gap:20px;">
                <span style="transition:0.6s; transform:translateX(${subStep>0? 100 : 0}px); color:${subStep>0?'#2980b9':'black'}">${sub}</span>
                <span style="transition:0.6s; transform:translateX(${subStep>0? -100 : 0}px); color:${subStep>0?'#2980b9':'black'}">${verb}</span>
                <span>${parts.slice(2).join(' ')}?</span>
            </div>`;
        }
        else if (s.type === 'contract-anim') {
            wrapper.innerHTML = `<div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; font-size:2.5rem; width:600px; margin:auto;">
                ${s.pairs.map((p, i) => `
                    <div style="text-align:right;">${p[0]}</div>
                    <div style="text-align:left; font-weight:bold; color:#e67e22; opacity:${i < subStep ? 1 : 0}">= ${p[1]}</div>
                `).join('')}
            </div>`;
        }
        else if (s.type === 'neg-contract-anim') {
            wrapper.innerHTML = `<div style="display:grid; grid-template-columns:1.5fr 1fr 1fr; gap:15px; font-size:1.8rem; text-align:left; width:900px; margin:auto;">
                ${s.data.map((row, i) => `
                    <div style="opacity:${i < subStep/2 ? 1 : (i == Math.floor(subStep/2) ? 1 : 0.2)}">${row[0]}</div>
                    <div style="color:red; opacity:${subStep > (i*2) ? 1 : 0}">→ ${row[1]}</div>
                    <div style="color:blue; opacity:${subStep > (i*2)+1 ? 1 : 0}">→ ${row[2]}</div>
                `).join('')}
            </div>`;
        }
        else if (s.type === 'quiz') {
            wrapper.innerHTML = `<div style="font-size:3rem; margin-bottom:40px;">${s.question}</div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
                    ${s.options.map((o, i) => `<button onclick="window.checkAns(this,${i===s.correct})" style="padding:20px; font-size:2rem; cursor:pointer; background:white; border:2px solid #ddd; border-radius:10px;">${o}</button>`).join('')}
                </div>`;
        }
        else if (s.type === 'end') {
            wrapper.innerHTML = `<h1 style="font-size:5rem; color:#27ae60;">${s.content}</h1><button style="padding:20px 50px; font-size:2rem; background:#27ae60; color:white; border:none; border-radius:50px; cursor:pointer;">Go to Test</button>`;
        }

        container.appendChild(wrapper);
    }

    window.checkAns = (btn, isCorr) => {
        btn.style.background = isCorr ? '#2ecc71' : '#e74c3c';
        btn.style.color = 'white';
        if(isCorr) setTimeout(() => { currentSlide++; subStep=0; render(); }, 1000);
    };

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if (e.keyCode === 39) { // Right
            if (s.type === 'build-sentences' && subStep < s.sentences.length - 1) subStep++;
            else if (s.type === 'negation-anim' && subStep < 1) subStep++;
            else if (s.type === 'question-anim' && subStep < 1) subStep++;
            else if (s.type === 'contract-anim' && subStep < s.pairs.length) subStep++;
            else if (s.type === 'neg-contract-anim' && subStep < s.data.length * 2) subStep++;
            else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
        } else if (e.keyCode === 37) { // Left
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    render();
})();
