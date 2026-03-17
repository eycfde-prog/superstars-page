(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100vh; width:100vw; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#050505; font-family:'Segoe UI', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
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
            content: 'Rule 1:<br>Negative = <span style="color:#e74c3c;">NOT</span> after am, is, are.', 
            color: '#fff' 
        },
        // التصحيح هنا: دمج المصفوفة بشكل سليم
        ...[
            {sub: "I am", rest: "a student."},
            {sub: "He is", rest: "very good."},
            {sub: "She is", rest: "an artist."},
            {sub: "It is", rest: "a beautiful day."},
            {sub: "We are", rest: "excited."},
            {sub: "You are", rest: "my friend."},
            {sub: "They are", rest: "busy."}
        ].map(item => ({ type: 'neg-transform', sub: item.sub, rest: item.rest })),
        { 
            type: 'big-title', 
            content: 'Rule 2:<br><span style="color:#f1c40f;">Switch</span> Subject and Verb for Questions.', 
            color: '#fff' 
        },
        ...[
            {v: "am", s: "I", rest: "a student?"},
            {v: "is", s: "He", rest: "good at football?"},
            {v: "is", s: "She", rest: "an artist?"},
            {v: "are", s: "They", rest: "busy?"}
        ].map(item => ({ type: 'q-transform', v: item.v, s: item.s, rest: item.rest })),
        { 
            type: 'mcq-simple', 
            question: ".......... he your brother?",
            options: ["are", "is", "am", "do"],
            answer: 1 
        },
        { type: 'big-title', content: 'Possessives', color: '#f1c40f' },
        {
            type: 'definitions', 
            title: 'Possessive Adjectives',
            items: [
                { p: "My", d: "My car" }, { p: "His", d: "His book" }, { p: "Her", d: "Her bag" },
                { p: "Our", d: "Our house" }, { p: "Their", d: "Their pens" }, { p: "Your", d: "Your phone" }
            ] 
        },
        {
            type: 'compare-table',
            title: 'The Full Family',
            headers: ["Subject", "Adj (+ Noun)", "Pronoun (Alone)"],
            rows: [
                { s: "I", a: "My", p: "Mine" }, { s: "He", a: "His", p: "His" }, { s: "She", a: "Her", p: "Hers" },
                { s: "We", a: "Our", p: "Ours" }, { s: "They", a: "Their", p: "Theirs" }, { s: "You", a: "Your", p: "Yours" }
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
        }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:90%; text-align:center; animation: fadeIn 0.5s ease;`;

        if (s.type === 'big-title') {
            wrapper.innerHTML = `<h1 style="font-size:6rem; font-weight:900; color:${s.color}; line-height:1.2;">${s.content}</h1>`;
        } 
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `<div style="text-align:left; display:flex; flex-direction:column; gap:10px; max-width:800px; margin:auto;">
                ${s.items.map((item, i) => `<div style="font-size:1.8rem; padding:12px; background:#1e1e1e; border-radius:10px; opacity:${i <= subStep ? 1 : 0.1}; transition:0.3s;">${item}</div>`).join('')}
            </div>`;
        }
        else if (s.type === 'writing-focus') {
            wrapper.innerHTML = `<div style="border-left:15px solid #e74c3c; padding-left:40px; text-align:left; max-width:900px; margin:auto;">
                <h2 style="font-size:3rem; color:#e74c3c;">${s.title}</h2>
                <div style="font-size:3.5rem; font-weight:bold;">${s.content}</div>
            </div>`;
        }
        else if (s.type === 'neg-transform') {
            wrapper.innerHTML = `<div style="font-size:4rem; font-weight:bold;">
                <span>${s.sub}</span> <span style="color:#e74c3c; opacity:${subStep >= 1 ? 1 : 0.1}; transition:0.5s;">NOT</span> <span>${s.rest}</span>
            </div>`;
        }
        else if (s.type === 'q-transform') {
            let swapped = subStep >= 1;
            wrapper.innerHTML = `<div style="font-size:4rem; font-weight:bold; display:flex; justify-content:center; gap:30px;">
                <span style="color:${swapped ? '#f1c40f' : '#fff'}; transform:translateX(${swapped ? '120px' : '0'}); transition:0.6s;">${swapped ? s.s : s.v}</span>
                <span style="color:${swapped ? '#fff' : '#f1c40f'}; transform:translateX(${swapped ? '-120px' : '0'}); transition:0.6s;">${swapped ? s.v : s.s}</span>
                <span>${s.rest}</span>
            </div>`;
        }
        else if (s.type === 'definitions') {
            wrapper.innerHTML = `<h2 style="font-size:3.5rem; color:#f1c40f; margin-bottom:30px;">${s.title}</h2>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; text-align:left; max-width:900px; margin:auto;">
                ${s.items.map((item, i) => `<div style="background:#111; padding:20px; border-radius:10px; opacity:${i <= subStep ? 1 : 0.1}; transition:0.3s; border-left:5px solid #f1c40f;">
                    <b style="color:#f1c40f; font-size:2rem;">${item.p}:</b> <span style="font-size:1.8rem; margin-left:10px;">${item.d}</span>
                </div>`).join('')}
            </div>`;
        }
        else if (s.type === 'compare-table') {
            wrapper.innerHTML = `<h2 style="font-size:3.5rem; color:#3498db; margin-bottom:20px;">${s.title}</h2>
            <table style="width:100%; font-size:2rem; border-collapse:separate; border-spacing:0 10px;">
                <tr style="color:#3498db;">${s.headers.map(h => `<th style="padding:10px;">${h}</th>`).join('')}</tr>
                ${s.rows.map((r, i) => `<tr style="opacity:${i <= subStep ? 1 : 0.1}; transition:0.3s; background:rgba(255,255,255,0.03);">
                    <td style="padding:15px;">${r.s}</td><td style="color:#f1c40f;">${r.a}</td><td style="color:#e74c3c;">${r.p}</td>
                </tr>`).join('')}
            </table>`;
        }
        else if (s.type === 'mcq-simple') {
            wrapper.innerHTML = `<div style="background:#111; padding:40px; border-radius:25px; border:2px solid #f1c40f; max-width:900px; margin:auto;">
                <div style="font-size:3rem; margin-bottom:40px;">${s.question}</div>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
                    ${s.options.map((opt, i) => `<div style="padding:20px; background:#222; border-radius:15px; font-size:2rem; border:3px solid ${subStep >= 1 && i === s.answer ? '#2ecc71' : '#333'}">${opt}</div>`).join('')}
                </div>
            </div>`;
        }
        else if (s.type === 'fill-practice') {
            wrapper.innerHTML = `<h2 style="font-size:3rem; color:#2ecc71; margin-bottom:30px;">${s.title}</h2>
            <div style="text-align:left; display:flex; flex-direction:column; gap:20px; max-width:800px; margin:auto;">
                ${s.items.map((item, i) => `<div style="font-size:2.2rem; background:rgba(255,255,255,0.05); padding:15px; border-radius:10px;">
                    ${item.q.replace('____', `<span style="color:#2ecc71; border-bottom:2px solid; padding:0 10px; visibility:${subStep > i ? 'visible' : 'hidden'}">${item.a}</span>`)}
                </div>`).join('')}
            </div>`;
        }

        container.appendChild(wrapper);
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if (e.keyCode === 39 || e.keyCode === 13 || e.keyCode === 32) { // Next
            if (s.type === 'reveal-list' && subStep < s.items.length - 1) { subStep++; render(); }
            else if ((s.type === 'neg-transform' || s.type === 'q-transform' || s.type === 'mcq-simple') && subStep < 1) { subStep++; render(); }
            else if (s.type === 'definitions' && subStep < s.items.length - 1) { subStep++; render(); }
            else if (s.type === 'compare-table' && subStep < s.rows.length - 1) { subStep++; render(); }
            else if (s.type === 'fill-practice' && subStep < s.items.length) { subStep++; render(); }
            else if (currentSlide < slides.length - 1) { 
                currentSlide++; 
                subStep = 0; 
                render();
            } else {
                if (window.triggerVetoDone) window.triggerVetoDone();
            }
        } else if (e.keyCode === 37) { // Back
            if (subStep > 0) { subStep--; render(); }
            else if (currentSlide > 0) { 
                currentSlide--; 
                subStep = 0; 
                render();
            }
        }
    };

    render();
})();
