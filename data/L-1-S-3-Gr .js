(function() {
    const container = document.getElementById('activityFinalContent');
    container.innerHTML = ''; 
    container.style.cssText = `height:calc(100vh - 140px); overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:transparent; font-family:'Arial',sans-serif; direction:ltr;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1 */ { type: 'title', content: 'Indefinite Articles', size: '6.5rem' },
        
        /* 2 */ { 
            type: 'writing', 
            title: 'Articles Type', 
            content: `
                <div style="display:flex; gap:30px; justify-content:center; margin-top:20px;">
                    <div style="border:4px solid #2c3e50; padding:20px 50px; border-radius:15px; font-size:4rem;">A</div>
                    <div style="border:4px solid #2c3e50; padding:20px 50px; border-radius:15px; font-size:4rem;">AN</div>
                </div>
                <p style="text-align:center; font-size:2rem; margin-top:20px;">Indefinite Articles</p>` 
        },

        /* 3 */ { 
            type: 'reveal-sentences', 
            sentences: [
                { tool: 'a', text: 'pen', full: 'Give me a pen' },
                { tool: 'an', text: 'orange', full: 'Give her an orange' },
                { tool: 'a', text: 'chance', full: 'Give them a chance' },
                { tool: 'an', text: 'address', full: 'Give us an address' }
            ]
        },

        /* 4 */ { 
            type: 'writing', 
            title: 'The Rule', 
            content: `
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
                    <div style="background:#fff3e0; padding:20px; border-radius:15px; border:2px solid #e67e22;">
                        <h3 style="color:#e67e22; margin:0;">Vowels = <span style="font-size:2.5rem;">an</span></h3>
                        <p style="font-size:3rem; letter-spacing:10px; font-weight:bold;">A E I O U</p>
                    </div>
                    <div style="background:#e1f5fe; padding:20px; border-radius:15px; border:2px solid #0288d1;">
                        <h3 style="color:#0288d1; margin:0;">Consonants = <span style="font-size:2.5rem;">a</span></h3>
                        <p style="font-size:1.5rem;">All other letters</p>
                    </div>
                </div>`
        },

        /* 5 */ { 
            type: 'exercise-reveal', 
            items: [
                { tool: 'a', word: 'camel 🐫' },
                { tool: 'A', word: 'good time 😉' },
                { tool: 'An', word: 'email ✉️' }
            ]
        },

        /* 6 */ { 
            type: 'writing', 
            title: 'Structures', 
            content: `
                <div style="text-align:left; font-size:2.5rem; line-height:1.8;">
                    <div style="color:#2980b9;">• A / An + Noun</div>
                    <div style="margin-left:40px; color:#7f8c8d;">Ex: A good car / An umbrella</div>
                    <div style="color:#c0392b; margin-top:20px;">• A / An + Adj + Noun</div>
                    <div style="margin-left:40px; color:#7f8c8d;">Ex: A good car / An orange car</div>
                </div>`
        },

        /* 7 */ { 
            type: 'special-u', 
            title: 'The Letter (U)',
            cases: [
                { word: 'Umbrella', tool: 'An', sound: '/ʌ/' },
                { word: 'University', tool: 'A', sound: '/juː/' }
            ]
        },

        /* 8 */ { 
            type: 'exercise-reveal', 
            items: [
                { tool: 'An', word: 'update' },
                { tool: 'A', word: 'unit' }
            ]
        },

        /* 9 */ { type: 'end', content: 'Lesson Completed!', button: 'Go to Test' }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:90%; text-align:center; animation: fadeIn 0.5s;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `<h1 style="font-size:${s.size}; font-weight:900; color:#2c3e50;">${s.content}</h1>`;
        } 
        else if (s.type === 'writing') {
            wrapper.innerHTML = `
                <div style="display:inline-block; text-align:left; background:white; padding:40px; border-left:12px solid #f1c40f; box-shadow:0 15px 40px rgba(0,0,0,0.1); border-radius:15px; width:100%;">
                    <small style="color:#f1c40f; font-weight:bold; font-size:1.5rem;">📝 WRITING TIME</small>
                    <h2 style="font-size:3.5rem; margin:15px 0; color:#2c3e50; border-bottom:2px solid #eee; padding-bottom:10px;">${s.title}</h2>
                    <div style="margin-top:20px;">${s.content}</div>
                </div>`;
        }
        else if (s.type === 'reveal-sentences') {
            wrapper.innerHTML = s.sentences.map((obj, i) => {
                let isVisible = i <= Math.floor(subStep/2);
                let toolVisible = (i < Math.floor(subStep/2)) || (i === Math.floor(subStep/2) && subStep % 2 !== 0);
                return `<p style="font-size:2.8rem; margin:15px; transition:0.3s; opacity:${isVisible ? 1 : 0};">
                    ${obj.full.split(obj.tool)[0]} 
                    <span style="color:#e74c3c; font-weight:bold; visibility:${toolVisible ? 'visible' : 'hidden'}">${obj.tool}</span> 
                    ${obj.full.split(obj.tool)[1]}
                </p>`;
            }).join('');
        }
        else if (s.type === 'exercise-reveal') {
            wrapper.innerHTML = `<div style="display:flex; flex-direction:column; gap:20px; align-items:center;">
                ${s.items.map((item, i) => `
                    <div style="font-size:3.5rem; opacity:${i <= subStep ? 1 : 0.1}; transition:0.3s;">
                        <span style="color:#27ae60; font-weight:bold; border-bottom:3px solid; padding:0 10px; visibility:${i < subStep ? 'visible' : 'hidden'}">${item.tool}</span> ${item.word}
                    </div>
                `).join('')}
            </div>`;
        }
        else if (s.type === 'special-u') {
            wrapper.innerHTML = `
                <h1 style="font-size:5rem; color:#8e44ad;">${s.title}</h1>
                <div style="display:flex; justify-content:center; gap:50px; margin-top:40px;">
                    ${s.cases.map((c, i) => `
                        <div style="opacity:${subStep >= (i*2+1) ? 1 : (subStep >= (i*2) ? 0.5 : 0)}; transition:0.5s; background:white; padding:30px; border-radius:20px; box-shadow:0 10px 20px rgba(0,0,0,0.05);">
                            <div style="font-size:4rem; font-weight:bold;">${c.word}</div>
                            <div style="font-size:3rem; color:#e74c3c; font-weight:bold; visibility:${subStep >= (i*2+2) ? 'visible' : 'hidden'}">${c.tool}</div>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'end') {
            wrapper.innerHTML = `<h1 style="font-size:5rem; color:#27ae60;">${s.content}</h1><button style="padding:25px 60px; font-size:2.5rem; background:#27ae60; color:white; border:none; border-radius:50px; cursor:pointer; margin-top:30px;">${s.button}</button>`;
        }

        container.appendChild(wrapper);
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if (e.keyCode === 39) { // Right
            if (s.type === 'reveal-sentences' && subStep < (s.sentences.length * 2) - 1) subStep++;
            else if (s.type === 'exercise-reveal' && subStep < s.items.length) subStep++;
            else if (s.type === 'special-u' && subStep < (s.cases.length * 2)) subStep++;
            else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
        } else if (e.keyCode === 37) { // Left
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    const style = document.createElement('style');
    style.innerHTML = `@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`;
    document.head.appendChild(style);

    render();
})();
