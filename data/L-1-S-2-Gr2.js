(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:calc(100vh - 200px); overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#0f0f0f; font-family:'Poppins', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'big-title', content: 'Verb to Be', color: '#e74c3c' },

        /* 2: Sequential Examples */
        { 
            type: 'reveal-list', 
            items: [
                "I am a student at the local school.",
                "He is very good at playing football.",
                "She is a talented artist who loves painting.",
                "It is a beautiful day to go to the park.",
                "We are excited about the upcoming field trip.",
                "You are my best friend.",
                "They are busy finishing their homework."
            ] 
        },

        /* 3: Positive Focus */
        { 
            type: 'writing-focus', 
            title: 'Positive Form',
            content: "I am a student...<br><br>She is a talented artist...<br><br>You are my best friend." 
        },

        /* 4: Negative Rule */
        { 
            type: 'big-title', 
            content: 'Rule 1:<br>For negative, we use <span style="color:#e74c3c;">NOT</span> after am, is, are.', 
            color: '#fff' 
        },

        /* 5-11: Negative Transformation (Step by Step) */
        ...[
            {sub: "I am", rest: "a student at the local school."},
            {sub: "He is", rest: "very good at playing football."},
            {sub: "She is", rest: "a talented artist who loves painting."},
            {sub: "It is", rest: "a beautiful day to go to the park."},
            {sub: "We are", rest: "excited about the upcoming field trip."},
            {sub: "You are", rest: "my best friend."},
            {sub: "They are", rest: "busy finishing their homework."}
        ].map(item => ({
            type: 'neg-transform',
            sub: item.sub,
            rest: item.rest
        })),

        /* 12: Negative Focus */
        { 
            type: 'writing-focus', 
            title: 'Negative Form',
            content: "I am <span style='color:#e74c3c;'>not</span> a student...<br><br>She is <span style='color:#e74c3c;'>not</span> a talented artist...<br><br>You are <span style='color:#e74c3c;'>not</span> my best friend." 
        },

        /* 13: Question Rule */
        { 
            type: 'big-title', 
            content: 'Rule 2:<br>For questions, we <span style="color:#f1c40f;">switch</span> between the subject and am/is/are.', 
            color: '#fff' 
        },

        /* 14-20: Question Transformation (Swap animation) */
        ...[
            {v: "am", s: "I", rest: "a student at the local school?"},
            {v: "is", s: "He", rest: "very good at playing football?"},
            {v: "is", s: "She", rest: "a talented artist who loves painting?"},
            {v: "is", s: "It", rest: "a beautiful day to go to the park?"},
            {v: "are", s: "We", rest: "excited about the field trip?"},
            {v: "are", s: "You", rest: "my best friend?"},
            {v: "are", s: "They", rest: "busy finishing their homework?"}
        ].map(item => ({
            type: 'q-transform',
            v: item.v,
            s: item.s,
            rest: item.rest
        })),

        /* 21: Question Focus */
        { 
            type: 'writing-focus', 
            title: 'Question Form',
            content: "Am I a student...?<br><br>Is she a talented artist...?<br><br>Are you my best friend?" 
        },

        /* 22: MCQ */
        { 
            type: 'mcq', 
            question: ".......... he your brother?",
            options: ["1) are", "2) is", "3) am", "4) do"],
            answer: 1 
        },

        /* 23: Merging Title */
        { type: 'big-title', content: 'Merging Short Forms & Contractions', color: '#3498db' },

        /* 24: Contractions Positive (7 Clicks) */
        {
            type: 'contract-pos',
            items: [
                {full: "I am", short: "I'm"},
                {full: "He is", short: "He's"},
                {full: "She is", short: "She's"},
                {full: "It is", short: "It's"},
                {full: "We are", short: "We're"},
                {full: "You are", short: "You're"},
                {full: "They are", short: "They're"}
            ]
        },

        /* 25: Merging Focus */
        { type: 'writing-focus', title: 'Short Forms', content: "I'm / He's / She's<br>It's / We're / You're / They're" },

        /* 26: Contractions Negative (14 Clicks) */
        {
            type: 'contract-neg',
            items: [
                {full: "I am not", s1: "I'm not", s2: "I'm not"},
                {full: "He is not", s1: "He's not", s2: "He isn't"},
                {full: "She is not", s1: "She's not", s2: "She isn't"},
                {full: "It is not", s1: "It's not", s2: "It isn't"},
                {full: "We are not", s1: "We're not", s2: "We aren't"},
                {full: "You are not", s1: "You're not", s2: "You aren't"},
                {full: "They are not", s1: "They're not", s2: "They aren't"}
            ]
        },

        /* 27: Final Negative Focus */
        { 
            type: 'writing-focus', 
            title: 'Negative Short Forms', 
            content: "I'm not<br>He's not / He isn't<br>We're not / We aren't" 
        },

        /* 28: End */
        { type: 'big-title', content: 'Lesson Completed!<br><span style="font-size:3rem; color:#2ecc71;">Go to Test</span>', color: '#fff' }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:95%; text-align:center;`;

        if (s.type === 'big-title') {
            wrapper.innerHTML = `<h1 style="font-size:10rem; font-weight:900; color:${s.color}; line-height:1.1; margin:0;">${s.content}</h1>`;
        } 
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `<div style="text-align:left; display:flex; flex-direction:column; gap:10px;">
                ${s.items.map((item, i) => `
                    <div style="font-size:2.5rem; font-weight:bold; padding:15px; background:#1e1e1e; border-radius:10px; transition:0.3s; opacity:${i <= subStep ? 1 : 0}; transform:translateX(${i <= subStep ? 0 : -20}px);">
                        ${item}
                    </div>
                `).join('')}
            </div>`;
        }
        else if (s.type === 'writing-focus') {
            wrapper.innerHTML = `
                <div style="border-left:20px solid #e74c3c; padding-left:40px; text-align:left;">
                    <h2 style="font-size:4rem; color:#e74c3c; margin-bottom:40px;">${s.title}</h2>
                    <div style="font-size:6rem; font-weight:bold; line-height:1.2;">${s.content}</div>
                </div>`;
        }
        else if (s.type === 'neg-transform') {
            let showNot = subStep >= 1;
            wrapper.innerHTML = `
                <div style="font-size:5rem; font-weight:bold; transition: 0.5s;">
                    <span>${s.sub}</span>
                    <span style="display:inline-block; width:${showNot ? '150px' : '0px'}; color:#e74c3c; transition:0.5s; overflow:hidden; text-align:center;">${showNot ? 'NOT' : ''}</span>
                    <span>${s.rest}</span>
                </div>`;
        }
        else if (s.type === 'q-transform') {
            let swapped = subStep >= 1;
            wrapper.innerHTML = `
                <div style="font-size:5rem; font-weight:bold; position:relative; display:flex; justify-content:center; gap:20px;">
                    <span style="color:${swapped ? '#f1c40f' : '#fff'}; transform:translateX(${swapped ? '100px' : '0'}); transition:0.5s;">${swapped ? s.s : s.v}</span>
                    <span style="color:${swapped ? '#fff' : '#f1c40f'}; transform:translateX(${swapped ? '-100px' : '0'}); transition:0.5s;">${swapped ? s.v : s.s}</span>
                    <span>${s.rest}</span>
                </div>`;
        }
        else if (s.type === 'mcq') {
            wrapper.innerHTML = `
                <div style="background:#1e1e1e; padding:50px; border-radius:30px; text-align:left;">
                    <div style="font-size:5rem; margin-bottom:40px;">${s.question}</div>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
                        ${s.options.map((o, i) => `<div style="padding:20px; background:#2c3e50; font-size:3rem; border-radius:15px; border:4px solid ${subStep>=1 && i===1 ? '#2ecc71' : 'transparent'}">${o}</div>`).join('')}
                    </div>
                </div>`;
        }
        else if (s.type === 'contract-pos') {
            wrapper.innerHTML = `<div style="display:grid; grid-template-columns: 1fr; gap:15px; text-align:left;">
                ${s.items.map((item, i) => `
                    <div style="font-size:3.5rem; background:#1e1e1e; padding:10px 40px; border-radius:50px; display:flex; justify-content:space-between; align-items:center;">
                        <span>${item.full}</span>
                        <span style="color:#3498db; transition:0.3s; opacity:${i <= subStep ? 1 : 0}; font-weight:bold;">➞ ${item.short}</span>
                    </div>
                `).join('')}
            </div>`;
        }
        else if (s.type === 'contract-neg') {
            wrapper.innerHTML = `<div style="display:grid; grid-template-columns: 1fr; gap:10px; text-align:left;">
                ${s.items.map((item, i) => {
                    let step = Math.floor(subStep/1); // Using substep to reveal each variant
                    return `
                    <div style="font-size:2.3rem; background:#1e1e1e; padding:10px 30px; border-radius:10px; display:flex; gap:30px;">
                        <span style="width:200px;">${item.full}</span>
                        <span style="color:#e74c3c; opacity:${i*2 <= subStep ? 1 : 0}; transition:0.3s;">➞ ${item.s1}</span>
                        <span style="color:#f1c40f; opacity:${(i*2)+1 <= subStep ? 1 : 0}; transition:0.3s;">➞ ${item.s2}</span>
                    </div>`;
                }).join('')}
            </div>`;
        }

        container.appendChild(wrapper);
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if (e.keyCode === 39 || e.keyCode === 13 || e.keyCode === 32) { // Next
            if (s.type === 'reveal-list' && subStep < s.items.length - 1) subStep++;
            else if ((s.type === 'neg-transform' || s.type === 'q-transform') && subStep < 1) subStep++;
            else if (s.type === 'mcq' && subStep < 1) subStep++;
            else if (s.type === 'contract-pos' && subStep < s.items.length - 1) subStep++;
            else if (s.type === 'contract-neg' && subStep < (s.items.length * 2) - 1) subStep++;
            else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
        } else if (e.keyCode === 37) { // Back
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    render();
})();
