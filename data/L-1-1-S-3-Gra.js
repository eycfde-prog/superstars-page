(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#050505; font-family:'Segoe UI', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'ARTICLES', subtitle: 'A / AN / THE', color: '#c5a059' },

        /* 2: The Main Comparison */
        { 
            type: 'dual-boxes', 
            left: { title: 'Definite', content: 'THE', desc: 'Specific things' },
            right: { title: 'Indefinite', content: 'A / AN', desc: 'Non-specific (Singular)' }
        },

        /* 3: Rule of ( A ) */
        { 
            type: 'reveal-grid', 
            title: 'Use ( A )',
            desc: 'Before Consonant sounds ( B, C, D, F... )',
            items: ["A Pen", "A Car", "A Book", "A Cat", "A Man", "A University"] 
        },

        /* 4: Rule of ( AN ) */
        { 
            type: 'reveal-grid', 
            title: 'Use ( AN )',
            desc: 'Before Vowel sounds ( A, E, I, O, U )',
            items: ["An Apple", "An Egg", "An Orange", "An Idea", "An Umbrella", "An Hour"] 
        },

        /* 5: Quick Practice Reveal */
        { 
            type: 'reveal-plus', 
            title: 'Quick Examples',
            desc: 'A vs AN in sentences',
            items: [
                { base: "Give me ", add: "a pen" },
                { base: "Eat ", add: "an orange" },
                { base: "Wait for ", add: "an hour" },
                { base: "I have ", add: "a car" }
            ] 
        },

        /* 6: Conclusion */
        { 
            type: 'title', 
            content: 'ARTICLES DONE!', 
            subtitle: 'Great Job, Master!', 
            color: '#2ecc71' 
        }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:95%; max-width:1400px; text-align:center; animation: vetoQuickFade 0.2s ease;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <h1 style="font-size:10vw; font-weight:900; color:${s.color}; margin:0; line-height:1;">${s.content}</h1>
                <div style="font-size:3vw; color:#fff; font-weight:bold; margin-top:20px; border-top:8px solid ${s.color}; display:inline-block; padding-top:10px; letter-spacing:8px;">${s.subtitle}</div>
            `;
        } 
        else if (s.type === 'dual-boxes') {
            wrapper.innerHTML = `
                <div style="display:flex; gap:30px; justify-content:center; width:100%;">
                    <div style="background:#111; border:4px solid #fff; padding:60px; border-radius:40px; flex:1;">
                        <h2 style="font-size:2rem; color:#888; margin-bottom:10px;">${s.left.title}</h2>
                        <div style="font-size:8vw; font-weight:900; line-height:1;">${s.left.content}</div>
                        <p style="font-size:1.5rem; color:#444; margin-top:20px;">${s.left.desc}</p>
                    </div>
                    <div style="background:#111; border:4px solid #c5a059; padding:60px; border-radius:40px; flex:1;">
                        <h2 style="font-size:2rem; color:#888; margin-bottom:10px;">${s.right.title}</h2>
                        <div style="font-size:8vw; font-weight:900; color:#c5a059; line-height:1;">${s.right.content}</div>
                        <p style="font-size:1.5rem; color:#c5a059; opacity:0.6; margin-top:20px;">${s.right.desc}</p>
                    </div>
                </div>`;
        }
        else if (s.type === 'reveal-grid') {
            wrapper.innerHTML = `
                <h2 style="font-size:4rem; color:#c5a059; margin-bottom:10px; font-weight:900;">${s.title}</h2>
                <p style="font-size:2rem; color:#555; margin-bottom:40px; font-weight:bold;">${s.desc}</p>
                <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:20px;">
                    ${s.items.map((item, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0.05}; background:#111; padding:35px; border-radius:20px; font-size:3rem; font-weight:900; border: 2px solid ${i === subStep ? '#c5a059' : '#222'}; transition: 0.1s;">
                            ${item}
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'reveal-plus') {
            wrapper.innerHTML = `
                <h2 style="font-size:4rem; color:#c5a059; margin-bottom:10px; font-weight:900;">${s.title}</h2>
                <p style="font-size:2rem; color:#555; margin-bottom:40px; font-weight:bold;">${s.desc}</p>
                <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:25px;">
                    ${s.items.map((item, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0.05}; font-size:3.5rem; background:#111; padding:40px; border-radius:25px; font-weight:900; border-bottom: 8px solid ${i <= subStep ? '#c5a059' : '#222'};">
                            ${item.base}<span style="color:#c5a059;">${item.add}</span>
                        </div>
                    `).join('')}
                </div>`;
        }

        container.appendChild(wrapper);
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if ([13, 32, 39].includes(e.keyCode)) { // Next
            let maxSteps = s.items ? s.items.length - 1 : 0;
            if (subStep < maxSteps) subStep++;
            else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
            else { if (window.triggerVetoDone) window.triggerVetoDone(); }
        } else if (e.keyCode === 37) { // Back
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    const style = document.createElement('style');
    style.innerHTML = `@keyframes vetoQuickFade { from { opacity:0; } to { opacity:1; } }`;
    document.head.appendChild(style);

    render();
})();
