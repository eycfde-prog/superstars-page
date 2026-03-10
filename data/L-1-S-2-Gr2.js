(function() {
    const container = document.getElementById('activityFinalContent');
    container.innerHTML = ''; 
    container.style.cssText = "height:calc(100vh - 140px); overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:transparent; font-family:'Arial', sans-serif; direction:ltr;";

    // مصفوفة الجمل الـ 7 الأساسية
    const baseSentences = [
        { s: "I", v: "am", r: "a teacher" },
        { s: "He", v: "is", r: "happy" },
        { s: "She", v: "is", r: "at home" },
        { s: "It", v: "is", r: "cold" },
        { s: "We", v: "are", r: "friends" },
        { s: "You", v: "are", r: "late" },
        { s: "They", v: "are", r: "ready" }
    ];

    const slidesData = [
        { type: 'title', content: 'Verb to Be', subtitle: 'The Basics: Am, Is, Are' },
        
        // عرض الـ 3 جمل Positive للكتابة
        { 
            type: 'write', 
            title: 'POSITIVE', 
            lines: ["I am a teacher.", "He is happy.", "We are friends."] 
        },

        // قاعدة الـ Negative
        { 
            type: 'rule', 
            title: 'Negative Rule', 
            content: 'Subject + am/is/are + <span style="color:#e74c3c">NOT</span>', 
            note: 'Put "NOT" after the verb' 
        },

        // تحويل الـ 7 جمل لـ Negative (حركي)
        ...baseSentences.map(sent => ({
            type: 'transform-neg',
            sent: sent
        })),

        // جمل الـ Negative للكتابة
        { 
            type: 'write', 
            title: 'NEGATIVE', 
            lines: ["I am not a teacher.", "He is not happy.", "We are not friends."] 
        },

        // قاعدة الـ Question
        { 
            type: 'rule', 
            title: 'Question Rule', 
            content: '<span style="color:#2980b9">Am/Is/Are</span> + Subject ... ?', 
            note: 'Move the Verb to the start' 
        },

        // تحويل الـ 7 جمل لـ Question (حركي)
        ...baseSentences.map(sent => ({
            type: 'transform-q',
            sent: sent
        })),

        // جمل الـ Question للكتابة
        { 
            type: 'write', 
            title: 'QUESTIONS', 
            lines: ["Am I a teacher?", "Is he happy?", "Are we friends?"] 
        },

        // ممارسة 3 أسئلة اختياري
        { type: 'quiz', question: 'She _______ a doctor.', options: ['am', 'is', 'are', 'not'], correct: 1 },
        { type: 'quiz', question: 'They _______ not at school.', options: ['is', 'am', 'are', 'be'], correct: 2 },
        { type: 'quiz', question: '_______ you ready?', options: ['Is', 'Am', 'Are', 'Do'], correct: 2 },

        { type: 'title', content: 'Merging', subtitle: 'Short Forms & Contractions' },

        // Merging Positive (One by One)
        ...baseSentences.map(sent => ({ type: 'merge-pos', sent: sent })),

        { 
            type: 'write', 
            title: 'SHORT FORMS (Positive)', 
            lines: ["I'm", "He's / She's / It's", "We're / You're / They're"] 
        },

        // Merging Negative (Two cases)
        ...baseSentences.map(sent => ({ type: 'merge-neg', sent: sent })),

        { 
            type: 'write', 
            title: 'SHORT FORMS (Negative)', 
            lines: ["I am not -> I'm not", "He is not -> He's not / He isn't", "We are not -> We're not / We aren't"] 
        },

        { type: 'end', content: 'Lesson Completed!', button: 'Go to Test' }
    ];

    let currentSlide = 0;

    function renderSlide(index) {
        container.innerHTML = '';
        const data = slidesData[index];
        const slideDiv = document.createElement('div');
        slideDiv.style.cssText = "width:100%; max-width:1100px; text-align:center; animation:fadeIn 0.5s forwards;";

        // المنطق لكل نوع سلايد
        if (data.type === 'title') {
            slideDiv.innerHTML = `<h1 style="font-size:6rem; margin:0;">${data.content}</h1><p style="font-size:2.5rem; color:#7f8c8d;">${data.subtitle}</p>`;
        } 
        else if (data.type === 'write') {
            slideDiv.style.cssText += "background:#fffdf0; border:5px double #d4af37; padding:50px; border-radius:20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);";
            slideDiv.innerHTML = `<h2 style="color:#d4af37; font-size:2rem; margin-top:0;">📝 WRITING TIME: ${data.title}</h2>
                                  <div style="font-size:3.5rem; font-weight:bold; line-height:1.8;">${data.lines.join('<br>')}</div>`;
        }
        else if (data.type === 'rule') {
            slideDiv.innerHTML = `<h2 style="font-size:3rem; color:#8e44ad;">${data.title}</h2>
                                  <div style="font-size:4.5rem; background:white; padding:30px; border-radius:15px; display:inline-block;">${data.content}</div>
                                  <p style="font-size:2rem; color:#7f8c8d; margin-top:20px;">${data.note}</p>`;
        }
        else if (data.type === 'transform-neg') {
            slideDiv.innerHTML = `<h3 style="color:#7f8c8d; font-size:2rem;">POSITIVE TO NEGATIVE</h3>
                                  <div style="font-size:4rem; margin-top:40px;">
                                    ${data.sent.s} <span style="color:#2980b9">${data.sent.v}</span> 
                                    <span style="color:#e74c3c; animation:popIn 0.8s; display:inline-block; font-weight:bold; margin: 0 20px;">NOT</span> 
                                    ${data.sent.r}
                                  </div>`;
        }
        else if (data.type === 'transform-q') {
            slideDiv.innerHTML = `<h3 style="color:#7f8c8d; font-size:2rem;">POSITIVE TO QUESTION</h3>
                                  <div style="font-size:4rem; margin-top:40px; display:flex; justify-content:center; align-items:center; gap:20px;">
                                    <span style="color:#2980b9; font-weight:bold; animation:moveLeft 0.5s forwards;">${data.sent.v.charAt(0).toUpperCase() + data.sent.v.slice(1)}</span>
                                    <span style="animation:moveRight 0.5s forwards;">${data.sent.s.toLowerCase()}</span>
                                    <span>${data.sent.r}?</span>
                                  </div>`;
        }
        else if (data.type === 'merge-pos') {
            let merged = (data.sent.s === "I") ? "I'm" : (data.sent.v === "is" ? data.sent.s+"'s" : data.sent.s+"'re");
            slideDiv.innerHTML = `<div style="font-size:5rem;">${data.sent.s} ${data.sent.v} <span style="color:#27ae60;">➔</span> <span style="color:#27ae60; font-weight:bold;">${merged}</span></div>`;
        }
        else if (data.type === 'merge-neg') {
            let s = data.sent.s, v = data.sent.v;
            let m1 = (s === "I") ? "I'm not" : (v === "is" ? s+"'s not" : s+"'re not");
            let m2 = (s === "I") ? "---" : (v === "is" ? s+" isn't" : s+" aren't");
            slideDiv.innerHTML = `<div style="font-size:3rem; text-align:left; display:inline-block;">
                                    <div>Full: ${s} ${v} not</div>
                                    <div style="color:#e67e22;">Opt 1: ${m1}</div>
                                    <div style="color:#c0392b;">Opt 2: ${m2}</div>
                                  </div>`;
        }
        else if (data.type === 'quiz') {
            slideDiv.innerHTML = `<div style="font-size:3.5rem; margin-bottom:40px;">${data.question}</div>
                                  <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
                                    ${data.options.map((o,i) => `<button onclick="window.checkAnswer(this, ${i===data.correct})" style="padding:25px; font-size:2rem; cursor:pointer; background:white; border:2px solid #ddd; border-radius:10px;">${o}</button>`).join('')}
                                  </div>`;
        }
        else if (data.type === 'end') {
            slideDiv.innerHTML = `<h1 style="font-size:5rem;">${data.content}</h1><button style="padding:20px 50px; font-size:2rem; background:#27ae60; color:white; border:none; border-radius:50px; cursor:pointer;">${data.button}</button>`;
        }

        container.appendChild(slideDiv);
    }

    window.checkAnswer = function(btn, isCorrect) {
        btn.style.background = isCorrect ? '#2ecc71' : '#e74c3c';
        btn.style.color = 'white';
        if(isCorrect) setTimeout(() => { currentSlide++; renderSlide(currentSlide); }, 1000);
    };

    document.onkeydown = function(e) {
        if (e.keyCode === 39 && currentSlide < slidesData.length - 1) { currentSlide++; renderSlide(currentSlide); }
        else if (e.keyCode === 37 && currentSlide > 0) { currentSlide--; renderSlide(currentSlide); }
    };

    // Styles for Animations
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes popIn { from { transform:scale(0); opacity:0; } to { transform:scale(1.2); opacity:1; } }
        @keyframes moveLeft { from { transform: translateX(50px); } to { transform: translateX(0); } }
        @keyframes moveRight { from { transform: translateX(-50px); } to { transform: translateX(0); } }
    `;
    document.head.appendChild(style);

    renderSlide(currentSlide);
})();
