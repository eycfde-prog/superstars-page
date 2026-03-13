(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:calc(100vh - 200px); overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#0f0f0f; font-family:'Poppins', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'PLURAL (الجمع)', color: '#e74c3c' },
        
        /* 2: Words Reveal (Nouns/Verbs/Countable...) */
        { 
            type: 'reveal-list', 
            items: ["Cars", "Cats", "Pens", "Pins", "Bins", "---", "Nouns - Verbs - Adjectives", "Good", "Water", "---", "Nouns:", "Countable", "Uncountable", "Liquid", "Powder", "Money"] 
        },

        /* 3: Rule 0 (S) */
        { 
            type: 'writing', 
            title: 'Rule', 
            content: 'We add <span style="color:#f1c40f;">S</span> to the countable noun.<br><br><small>Not uncountable like: Liquid, Powder, Money.</small>' 
        },

        /* 4: ES Words (Reveal addition) */
        { 
            type: 'reveal-plus', 
            items: [
                { base: "Bus", add: "es" },
                { base: "Class", add: "es" },
                { base: "Potato", add: "es" },
                { base: "Box", add: "es" },
                { base: "Watch", add: "es" },
                { base: "Dish", add: "es" }
            ] 
        },

        /* 5: Rule 1 (ES) */
        { 
            type: 'writing', 
            title: 'Rule: Add ES', 
            content: 'We add <span style="color:#f1c40f;">es</span> to nouns ending with:<br><span style="color:#e74c3c;">S, Ss, O, X, Ch, Sh</span>' 
        },

        /* 6: Y Rule Words */
        { 
            type: 'reveal-list', 
            items: ["Company → Companies", "Boy → Boys"] 
        },

        /* 7: Rule 2 (IES) */
        { 
            type: 'writing', 
            title: 'Rule: Letter Y', 
            content: 'We remove letter <span style="color:#e74c3c;">Y</span> if the letter before is <span style="color:#f1c40f;">consonant</span> and add <span style="color:#2ecc71;">ies</span>.' 
        },

        /* 8: F/FE Words & Rule */
        { 
            type: 'dual-reveal', 
            items: ["Wolf → Wolves", "Wife → Wives"],
            rule: "We remove <span style='color:#e74c3c;'>f</span> or <span style='color:#e74c3c;'>fe</span> and add <span style='color:#f1c40f;'>ves</span>."
        },

        /* 9: Irregular Nouns */
        { 
            type: 'reveal-list', 
            items: [
                "Man → Men", "Woman → Women", "Child → Children", 
                "Person → People", "Ox → Oxen", "Foot → Feet", 
                "Tooth → Teeth", "Mouse → Mice", "Deer → Deer", 
                "Sheep → Sheep", "Information → Information", "Fish → Fish"
            ] 
        },

        /* 10: Quiz/Exercises (Reveal addition) */
        { 
            type: 'reveal-plus', 
            title: 'Exercise',
            items: [
                { base: "Dress", add: "es" },
                { base: "Fox", add: "es" },
                { base: "Countr", add: "ies (from Country)" },
                { base: "Hal", add: "ves (from Half)" },
                { base: "Child", add: "ren" }
            ] 
        }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:95%; text-align:center; animation: fadeIn 0.4s ease;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `<h1 style="font-size:8rem; font-weight:900; color:${s.color}; margin:0;">${s.content}</h1>`;
        } 
        else if (s.type === 'writing') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#1e1e1e; padding:50px; border-left:15px solid #e74c3c; border-radius:15px;">
                    <h2 style="font-size:4rem; margin-bottom:20px; color:#e74c3c;">${s.title}</h2>
                    <div style="font-size:3.5rem; line-height:1.4; color:#fff;">${s.content}</div>
                </div>`;
        }
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `<div style="display:flex; flex-direction:column; gap:10px; text-align:left; max-height:80vh; overflow-y:auto;">
                ${s.items.map((item, i) => `
                    <div style="opacity:${i <= subStep ? 1 : 0}; transition:0.3s; background:#1e1e1e; padding:10px 20px; border-radius:8px; font-size:2rem; font-weight:bold; border-left:5px solid #e74c3c;">
                        ${item}
                    </div>
                `).join('')}
            </div>`;
        }
        else if (s.type === 'reveal-plus') {
            wrapper.innerHTML = `
                <h2 style="font-size:3rem; color:#e74c3c;">${s.title || 'Practice'}</h2>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; text-align:left;">
                ${s.items.map((item, i) => `
                    <div style="opacity:${i <= subStep ? 1 : 0}; font-size:2.8rem; background:#1e1e1e; padding:15px; border-radius:10px;">
                        ${item.base}<span style="color:#f1c40f; opacity:${subStep > i || (subStep === i && subStep%1==0) ? 1 : 0}; transition:0.5s;">${item.add}</span>
                    </div>
                `).join('')}
            </div>`;
        }
        else if (s.type === 'dual-reveal') {
            wrapper.innerHTML = `
                <div style="display:flex; flex-direction:column; gap:30px;">
                    ${s.items.map((item, i) => `
                        <div style="opacity:${i <= subStep ? 1 : 0}; font-size:4rem; font-weight:bold;">${item}</div>
                    `).join('')}
                    <div style="opacity:${subStep >= s.items.length ? 1 : 0}; background:#e74c3c; padding:20px; border-radius:15px; font-size:2.5rem;">
                        ${s.rule}
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if (e.keyCode === 39 || e.keyCode === 13 || e.keyCode === 32) { // Next
            if (s.type === 'reveal-list' && subStep < s.items.length - 1) subStep++;
            else if (s.type === 'reveal-plus' && subStep < s.items.length - 1) subStep++;
            else if (s.type === 'dual-reveal' && subStep < s.items.length) subStep++;
            else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
        } else if (e.keyCode === 37) { // Back
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    render();
})();