(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#0a0a0b; font-family:'Inter', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'PRESENT PERFECT SIMPLE', sub: 'The Connection Between Past & Present', color: '#3498db' },
        
        /* 2: Timeline Usage */
        { 
            type: 'timeline', 
            title: 'When do we use it?', 
            content: 'An action that happened in the <span style="color:#e74c3c">past</span> but has a result or effect <span style="color:#2ecc71">now</span>.' 
        },

        /* 3: Formulation */
        { 
            type: 'writing', 
            title: 'How to build it?', 
            content: `
                <div style="background:#16161a; padding:40px; border-radius:20px; border:1px solid #333; text-align:center;">
                    <span style="color:#fff">Subject + </span>
                    <span style="color:#f1c40f">Have / Has</span>
                    <span style="color:#fff"> + </span>
                    <span style="color:#3498db">V3 (P.P)</span>
                </div>
            ` 
        },

        /* 4: Reveal List Examples */
        { 
            type: 'reveal-list', 
            title: 'Real-life Examples',
            items: [
                "I have seen this movie many times.",
                "He has already finished his homework.",
                "She has lived in Cairo since 2010.",
                "It has stopped raining (Look! The ground is wet)."
            ] 
        },

        /* 5: Negative Transformation */
        { 
            type: 'transform', 
            title: 'Making it Negative',
            pairs: [
                { pos: "He has finished...", neg: "He <span style='color:#e74c3c;'>has not (hasn't)</span> finished..." },
                { pos: "They have gone...", neg: "They <span style='color:#e74c3c;'>have not (haven't)</span> gone..." }
            ]
        },

        /* 6: Question Transformation */
        { 
            type: 'transform', 
            title: 'Asking a Question',
            pairs: [
                { pos: "You have eaten...", neg: "<span style='color:#f1c40f;'>Have you</span> eaten...?" },
                { pos: "She has cleaned...", neg: "<span style='color:#f1c40f;'>Has she</span> cleaned...?" }
            ]
        },

        /* 7: Spelling Rules */
        { 
            type: 'reveal-list', 
            title: 'Spelling Mastery',
            items: [
                "Like ➔ Liked (add only -d)",
                "Study ➔ Studied (y ➔ ied)",
                "Stop ➔ Stopped (Double the P)"
            ] 
        },

        /* 8: Keywords */
        { 
            type: 'reveal-list', 
            title: 'Time Detectives (Keywords)',
            items: ["Already", "Just", "Yet", "Ever", "Never", "For", "Since", "Recently"] 
        },

        /* 9: Final Challenge */
        { 
            type: 'mcq', 
            question: "Choose the correct sentence:",
            options: ["A) I have see that lion.", "B) I have saw that lion.", "C) I have seen that lion.", "D) I has seen that lion."],
            answer: 2 
        }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:90%; text-align:center; animation: slideIn 0.3s ease-out;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <h1 style="font-size:6rem; font-weight:900; color:${s.color}; margin:0;">${s.content}</h1>
                <p style="font-size:1.8rem; color:#666; letter-spacing:3px; margin-top:20px;">${s.sub}</p>
            `;
        } 
        else if (s.type === 'timeline') {
            wrapper.innerHTML = `
                <h2 style="font-size:3.5rem; color:#3498db; margin-bottom:30px;">${s.title}</h2>
                <p style="font-size:2.2rem; margin-bottom:60px;">${s.content}</p>
                <div style="position:relative; width:80%; margin:80px auto; height:4px; background:#333;">
                    <div style="position:absolute; left:20%; height:40px; width:2px; background:#fff; top:-20px;"><span style="position:absolute; top:50px; left:-20px;">Past</span></div>
                    <div style="position:absolute; left:80%; height:40px; width:4px; background:#2ecc71; top:-20px;"><span style="position:absolute; top:50px; left:-35px; color:#2ecc71; font-weight:bold;">Now (Result)</span></div>
                    <div style="position:absolute; left:20%; width:60%; height:12px; background:linear-gradient(to right, #3498db, #2ecc71); top:-4px; border-radius:10px; opacity:${subStep >= 1 ? 1 : 0}; transition:1s;"></div>
                </div>`;
        }
        else if (s.type === 'writing') {
            wrapper.innerHTML = `
                <h2 style="font-size:4rem; color:#3498db; margin-bottom:40px;">${s.title}</h2>
                <div style="font-size:3.5rem;">${s.content}</div>`;
        }
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `
                <h2 style="font-size:3.5rem; color:#3498db; margin-bottom:40px;">${s.title}</h2>
                <div style="display:flex; flex-direction:column; gap:15px; text-align:left;">
                    ${s.items.map((item, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0}; transition:0.3s; background:#16161a; padding:20px; border-radius:12px; font-size:2rem; border-left:8px solid #3498db;">${item}</div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'transform') {
            let pair = s.pairs[Math.floor(subStep/2)] || s.pairs[0];
            let isChanged = subStep % 2 !== 0;
            wrapper.innerHTML = `
                <h2 style="font-size:3.5rem; color:#3498db; margin-bottom:40px;">${s.title}</h2>
                <div style="background:#16161a; padding:60px; border-radius:30px; font-size:3.5rem; border:1px solid #333; color:${isChanged ? '#f1c40f' : '#fff'}">
                    ${isChanged ? pair.neg : pair.pos}
                </div>`;
        }
        else if (s.type === 'mcq') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#16161a; padding:50px; border-radius:30px; border:1px solid #333;">
                    <div style="font-size:2.8rem; font-weight:bold; margin-bottom:40px;">${s.question}</div>
                    <div style="display:grid; grid-template-columns: 1fr; gap:20px; opacity:${subStep >= 1 ? 1 : 0}; transition:0.5s;">
                        ${s.options.map((opt, i) => {
                            let border = (subStep >= 2 && i === s.answer) ? '3px solid #2ecc71' : '1px solid #333';
                            return `<div style="padding:20px; border-radius:15px; font-size:2.2rem; border:${border}">${opt}</div>`;
                        }).join('')}
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if (e.keyCode === 39 || e.keyCode === 32) { // Next
            if (s.type === 'timeline' && subStep < 1) subStep++;
            else if (s.type === 'reveal-list' && subStep < s.items.length - 1) subStep++;
            else if (s.type === 'transform' && subStep < (s.pairs.length * 2) - 1) subStep++;
            else if (s.type === 'mcq' && subStep < 2) subStep++;
            else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
        } else if (e.keyCode === 37) { // Back
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    render();
})();
