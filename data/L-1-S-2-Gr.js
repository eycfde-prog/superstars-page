(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:calc(100vh - 200px); overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#0f0f0f; font-family:'Poppins', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        // --- LESSON 1: VERB TO BE ---
        { type: 'big-title', content: 'Verb to Be', color: '#e74c3c' },
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
        { 
            type: 'writing-focus', 
            title: 'Positive Form',
            content: "I am a student...<br><br>She is a talented artist...<br><br>You are my best friend." 
        },
        { 
            type: 'big-title', 
            content: 'Rule 1:<br>For negative, we use <span style="color:#e74c3c;">NOT</span> after am, is, are.', 
            color: '#fff' 
        },
        ...[
            {sub: "I am", rest: "a student at the local school."},
            {sub: "He is", rest: "very good at playing football."},
            {sub: "She is", rest: "a talented artist who loves painting."},
            {sub: "It is", rest: "a beautiful day to go to the park."},
            {sub: "We are", rest: "excited about the upcoming field trip."},
            {sub: "You are", rest: "my best friend."},
            {sub: "They are", rest: "busy finishing their homework."}
        ].map(item => ({ type: 'neg-transform', sub: item.sub, rest: item.rest })),
        { 
            type: 'writing-focus', 
            title: 'Negative Form',
            content: "I am <span style='color:#e74c3c;'>not</span> a student...<br><br>She is <span style='color:#e74c3c;'>not</span> a talented artist...<br><br>You are <span style='color:#e74c3c;'>not</span> my best friend." 
        },
        { 
            type: 'big-title', 
            content: 'Rule 2:<br>For questions, we <span style="color:#f1c40f;">switch</span> between the subject and am/is/are.', 
            color: '#fff' 
        },
        ...[
            {v: "am", s: "I", rest: "a student at the local school?"},
            {v: "is", s: "He", rest: "very good at playing football?"},
            {v: "is", s: "She", rest: "a talented artist who loves painting?"},
            {v: "is", s: "It", rest: "a beautiful day to go to the park?"},
            {v: "are", s: "We", rest: "excited about the field trip?"},
            {v: "are", s: "You", rest: "my best friend?"},
            {v: "are", s: "They", rest: "busy finishing their homework?"}
        ].map(item => ({ type: 'q-transform', v: item.v, s: item.s, rest: item.rest })),
        { 
            type: 'mcq', 
            question: ".......... he your brother?",
            options: ["1) are", "2) is", "3) am", "4) do"],
            answer: 1 
        },
        { type: 'big-title', content: 'Short Forms & Contractions', color: '#3498db' },
        {
            type: 'contract-pos',
            items: [
                {full: "I am", short: "I'm"}, {full: "He is", short: "He's"}, {full: "She is", short: "She's"},
                {full: "It is", short: "It's"}, {full: "We are", short: "We're"}, {full: "You are", short: "You're"}, {full: "They are", short: "They're"}
            ]
        },
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

        // --- TRANSITION ---
        { type: 'big-title', content: 'Next Part:<br>Possessives', color: '#2ecc71' },

        // --- LESSON 2: POSSESSIVE ADJECTIVES & PRONOUNS ---
        { type: 'big-title', content: 'Possessive Adjectives & Pronouns', color: '#f1c40f' },
        { 
            type: 'definitions', 
            title: 'Possessive Adjectives',
            desc: 'Must be followed by a NOUN (يتبعها اسم)',
            items: [
                { p: "My", d: "My car" }, { p: "His", d: "His book" }, { p: "Her", d: "Her bag" },
                { p: "Its", d: "Its tail " }, { p: "Our", d: "Our house" }, { p: "Their", d: "Their pens" }, { p: "Your", d: "Your phone" }
            ] 
        },
        {
            type: 'compare-table',
            title: 'The Full Family',
            headers: ["Subject", "Adj (+ Noun)", "Pronoun (Alone)"],
            rows: [
                { s: "I", a: "My", p: "Mine" }, { s: "He", a: "His", p: "His" }, { s: "She", a: "Her", p: "Hers" },
                { s: "It", a: "Its", p: "-" }, { s: "We", a: "Our", p: "Ours" }, { s: "They", a: "Their", p: "Theirs" }, { s: "You", a: "Your", p: "Yours" }
            ]
        },
        {
            type: 'rule-anim',
            title: 'Spot the Difference!',
            examples: [
                { left: "This is <span style='color:#f1c40f;'>my</span> book.", right: "This book is <span style='color:#e74c3c;'>mine</span>." },
                { left: "That is <span style='color:#f1c40f;'>her</span> car.", right: "That car is <span style='color:#e74c3c;'>hers</span>." },
                { left: "These are <span style='color:#f1c40f;'>our</span> bags.", right: "These bags are <span style='color:#e74c3c;'>ours</span>." }
            ]
        },
        { 
            type: 'fill-practice', 
            title: 'Practice: Possessives',
            items: [
                { q: "I have a cat. ____ tail is long.", a: "Its" },
                { q: "This is my pen. It is ____.", a: "mine" },
                { q: "They have a house. It is ____ house.", a: "their" },
                { q: "We won! The trophy is ____.", a: "ours" }
            ] 
        },
        { 
            type: 'mcq-final', 
            question: "Is this your phone? No, it's ________.",
            options: ["A) her", "B) hers", "C) she"],
            answer: 1 
        },
        { type: 'big-title', content: 'Lesson Completed!<br><span style="font-size:3rem; color:#2ecc71;">Excellent Work!</span>', color: '#fff' }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:95%; text-align:center;`;

        // Logic Switch for All Types
        if (s.type === 'big-title') {
            wrapper.innerHTML = `<h1 style="font-size:8rem; font-weight:900; color:${s.color}; line-height:1.1;">${s.content}</h1>`;
        } 
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `<div style="text-align:left; display:flex; flex-direction:column; gap:10px;">
                ${s.items.map((item, i) => `<div style="font-size:2.2rem; padding:15px; background:#1e1e1e; border-radius:10px; opacity:${i <= subStep ? 1 : 0}; transition:0.3s;">${item}</div>`).join('')}
            </div>`;
        }
        else if (s.type === 'writing-focus') {
            wrapper.innerHTML = `<div style="border-left:20px solid #e74c3c; padding-left:40px; text-align:left;">
                <h2 style="font-size:3.5rem; color:#e74c3c;">${s.title}</h2>
                <div style="font-size:4.5rem; font-weight:bold;">${s.content}</div>
            </div>`;
        }
        else if (s.type === 'neg-transform') {
            wrapper.innerHTML = `<div style="font-size:4.5rem; font-weight:bold;">
                <span>${s.sub}</span> <span style="color:#e74c3c; opacity:${subStep >= 1 ? 1 : 0}; transition:0.5s;">NOT</span> <span>${s.rest}</span>
            </div>`;
        }
        else if (s.type === 'q-transform') {
            let swapped = subStep >= 1;
            wrapper.innerHTML = `<div style="font-size:4.5rem; font-weight:bold; display:flex; justify-content:center; gap:20px;">
                <span style="color:${swapped ? '#f1c40f' : '#fff'}; transform:translateX(${swapped ? '100px' : '0'}); transition:0.5s;">${swapped ? s.s : s.v}</span>
                <span style="color:${swapped ? '#fff' : '#f1c40f'}; transform:translateX(${swapped ? '-100px' : '0'}); transition:0.5s;">${swapped ? s.v : s.s}</span>
                <span>${s.rest}</span>
            </div>`;
        }
        else if (s.type === 'contract-pos') {
            wrapper.innerHTML = `<div style="display:grid; grid-template-columns: 1fr; gap:10px;">
                ${s.items.map((item, i) => `<div style="font-size:2.8rem; background:#1e1e1e; padding:10px; border-radius:10px; display:flex; justify-content:space-around;">
                    <span>${item.full}</span> <span style="color:#3498db; opacity:${i <= subStep ? 1 : 0}; transition:0.3s;">➞ ${item.short}</span>
                </div>`).join('')}
            </div>`;
        }
        else if (s.type === 'contract-neg') {
            wrapper.innerHTML = `<div style="display:grid; grid-template-columns: 1fr; gap:5px;">
                ${s.items.map((item, i) => `<div style="font-size:1.8rem; background:#1e1e1e; padding:10px; border-radius:10px; display:flex; gap:20px;">
                    <span style="width:150px;">${item.full}</span>
                    <span style="color:#e74c3c; opacity:${i*2 <= subStep ? 1 : 0}; transition:0.3s;">➞ ${item.s1}</span>
                    <span style="color:#f1c40f; opacity:${(i*2)+1 <= subStep ? 1 : 0}; transition:0.3s;">➞ ${item.s2}</span>
                </div>`).join('')}
            </div>`;
        }
        else if (s.type === 'definitions') {
            wrapper.innerHTML = `<h2 style="font-size:3rem; color:#f1c40f;">${s.title}</h2><div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; text-align:left;">
                ${s.items.map((item, i) => `<div style="background:#1e1e1e; padding:10px; border-radius:10px; opacity:${i <= subStep ? 1 : 0}; transition:0.3s; border-right:5px solid #f1c40f;">
                    <b style="color:#f1c40f; font-size:1.8rem;">${item.p}:</b> <span style="font-size:1.6rem;">${item.d}</span>
                </div>`).join('')}
            </div>`;
        }
        else if (s.type === 'compare-table') {
            wrapper.innerHTML = `<h2 style="font-size:3rem; color:#3498db;">${s.title}</h2><table style="width:100%; font-size:1.8rem;">
                <tr style="color:#3498db;">${s.headers.map(h => `<th>${h}</th>`).join('')}</tr>
                ${s.rows.map((r, i) => `<tr style="opacity:${i <= subStep ? 1 : 0}; transition:0.3s;"><td>${r.s}</td><td style="color:#f1c40f;">${r.a}</td><td style="color:#e74c3c;">${r.p}</td></tr>`).join('')}
            </table>`;
        }
        else if (s.type === 'rule-anim') {
            let pair = s.examples[subStep] || s.examples[0];
            wrapper.innerHTML = `<h2 style="font-size:3rem; color:#e74c3c;">${s.title}</h2><div style="display:flex; justify-content:space-around; align-items:center;">
                <div style="background:#1e1e1e; padding:20px; border-radius:15px; font-size:2.2rem; flex:1;">${pair.left}</div>
                <div style="font-size:3rem; color:#f1c40f; padding:0 20px;">➞</div>
                <div style="background:#1e1e1e; padding:20px; border-radius:15px; font-size:2.2rem; flex:1; border:2px dashed #e74c3c;">${pair.right}</div>
            </div>`;
        }
        else if (s.type === 'fill-practice') {
            wrapper.innerHTML = `<h2 style="font-size:3rem; color:#2ecc71;">${s.title}</h2><div style="text-align:left; display:flex; flex-direction:column; gap:15px;">
                ${s.items.map((item, i) => `<div style="font-size:2rem; opacity:${i <= subStep ? 1 : 0};">
                    ${item.q} <span style="color:#2ecc71; font-weight:bold; visibility:${subStep > i ? 'visible' : 'hidden'}">➞ ${item.a}</span>
                </div>`).join('')}
            </div>`;
        }
        else if (s.type === 'mcq' || s.type === 'mcq-final') {
            wrapper.innerHTML = `<div style="background:#1e1e1e; padding:30px; border-radius:20px; border:2px solid #f1c40f;">
                <div style="font-size:3rem; margin-bottom:20px;">${s.question}</div>
                <div style="display:flex; gap:20px; justify-content:center;">
                    ${s.options.map((opt, i) => `<div style="padding:15px 30px; background:#2c3e50; border-radius:10px; font-size:2rem; border:4px solid ${subStep >= 1 && i === s.answer ? '#2ecc71' : 'transparent'}">${opt}</div>`).join('')}
                </div>
            </div>`;
        }

        container.appendChild(wrapper);
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if (e.keyCode === 39 || e.keyCode === 13 || e.keyCode === 32) { // Next
            if (s.type === 'reveal-list' && subStep < s.items.length - 1) subStep++;
            else if ((s.type === 'neg-transform' || s.type === 'q-transform' || s.type.includes('mcq')) && subStep < 1) subStep++;
            else if (s.type === 'contract-pos' && subStep < s.items.length - 1) subStep++;
            else if (s.type === 'contract-neg' && subStep < (s.items.length * 2) - 1) subStep++;
            else if (s.type === 'definitions' && subStep < s.items.length - 1) subStep++;
            else if (s.type === 'compare-table' && subStep < s.rows.length - 1) subStep++;
            else if (s.type === 'rule-anim' && subStep < s.examples.length - 1) subStep++;
            else if (s.type === 'fill-practice' && subStep < (s.items.length * 2) - 1) subStep++;
            else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
        } else if (e.keyCode === 37) { // Back
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    render();
})();
