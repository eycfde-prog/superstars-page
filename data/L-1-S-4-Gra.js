(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#050505; font-family:'Segoe UI', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        { type: 'title', content: 'PLURAL (الجمع)', color: '#c5a059' },
        { 
            type: 'reveal-grid', 
            items: ["Cars", "Cats", "Pens", "Pins", "Bins", "Nouns", "Verbs", "Adjectives", "Good", "Water", "Countable", "Uncountable", "Liquid", "Powder", "Money"] 
        },
        { 
            type: 'writing', 
            title: 'Rule: The Standard', 
            content: 'We add <span style="color:#c5a059;">S</span> to the countable noun.<br><br><small style="color:#666;">Not uncountable like: Liquid, Powder, Money.</small>' 
        },
        { 
            type: 'reveal-plus', 
            title: 'Add ( ES ) if ends with: S, Ss, O, X, Ch, Sh',
            items: [
                { base: "Bus", add: "es" }, { base: "Class", add: "es" },
                { base: "Potato", add: "es" }, { base: "Box", add: "es" },
                { base: "Watch", add: "es" }, { base: "Dish", add: "es" }
            ] 
        },
        { 
            type: 'reveal-grid', 
            title: 'The Letter ( Y ) Rule',
            items: ["Company ➞ Companies", "Boy ➞ Boys"] 
        },
        { 
            type: 'writing', 
            title: 'Rule: Letter Y', 
            content: 'Remove <span style="color:#e74c3c;">Y</span> if preceded by a <span style="color:#c5a059;">consonant</span> and add <span style="color:#2ecc71;">IES</span>.' 
        },
        { 
            type: 'dual-reveal', 
            items: ["Wolf ➞ Wolves", "Wife ➞ Wives"],
            rule: "Remove <span style='color:#e74c3c;'>f / fe</span> and add <span style='color:#c5a059;'>VES</span>."
        },
        { 
            type: 'reveal-grid', 
            title: 'Irregular Nouns (حفظ كما هي)',
            items: ["Man ➞ Men", "Woman ➞ Women", "Child ➞ Children", "Person ➞ People", "Foot ➞ Feet", "Tooth ➞ Teeth", "Mouse ➞ Mice", "Deer ➞ Deer", "Sheep ➞ Sheep", "Fish ➞ Fish"] 
        }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:90%; text-align:center; animation: vetoFadeIn 0.4s ease;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `<h1 style="font-size:10vw; font-weight:900; color:${s.color}; text-shadow: 0 0 30px rgba(197,160,89,0.3);">${s.content}</h1>`;
        } 
        else if (s.type === 'writing') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#111; padding:60px; border-left:15px solid #c5a059; border-radius:20px; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
                    <h2 style="font-size:3.5vw; margin-bottom:20px; color:#c5a059;">${s.title}</h2>
                    <div style="font-size:4vw; line-height:1.2; color:#fff;">${s.content}</div>
                </div>`;
        }
        else if (s.type === 'reveal-grid') {
            wrapper.innerHTML = `
                ${s.title ? `<h2 style="font-size:3vw; color:#c5a059; margin-bottom:30px;">${s.title}</h2>` : ''}
                <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:20px;">
                    ${s.items.map((item, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0}; transform: scale(${i <= subStep ? 1 : 0.8}); transition:0.3s; background:#111; padding:25px; border-radius:15px; font-size:2.5vw; font-weight:bold; border: 1px solid #222;">
                            ${item}
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'reveal-plus') {
            wrapper.innerHTML = `
                <h2 style="font-size:3vw; color:#c5a059; margin-bottom:40px;">${s.title}</h2>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:30px;">
                    ${s.items.map((item, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0}; font-size:4vw; background:#111; padding:30px; border-radius:20px; font-weight:bold;">
                            ${item.base}<span style="color:#c5a059; text-shadow: 0 0 15px #c5a059;">${item.add}</span>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'dual-reveal') {
            wrapper.innerHTML = `
                <div style="display:flex; flex-direction:column; gap:40px; align-items:center;">
                    ${s.items.map((item, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0}; font-size:6vw; font-weight:bold; background:#111; padding:20px 60px; border-radius:50px; border:2px solid #c5a059;">${item}</div>
                    `).join('')}
                    <div style="opacity:${subStep >= s.items.length ? 1 : 0}; background:#c5a059; color:black; padding:30px; border-radius:20px; font-size:3vw; font-weight:bold; margin-top:20px;">
                        ${s.rule}
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if ([13, 32, 39].includes(e.keyCode)) {
            if ((s.items && subStep < s.items.length - 1) || (s.type === 'dual-reveal' && subStep < s.items.length)) {
                subStep++;
            } else if (currentSlide < slides.length - 1) {
                currentSlide++;
                subStep = 0;
            } else {
                if (window.triggerVetoDone) window.triggerVetoDone();
            }
        } else if (e.keyCode === 37) {
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    render();
})();
