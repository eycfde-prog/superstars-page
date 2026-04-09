(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // الإعداد الأساسي للخلفية (مرة واحدة فقط)
    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#050505; font-family:'Segoe UI', sans-serif; direction:ltr; color:white;`;

    let currentSlide = -1; 
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'PLURAL NOUNS', subtitle: 'COUNTABLE & UNCOUNTABLE', color: '#c5a059' },

        /* 2: The Logic of Nouns */
        { 
            type: 'writing', 
            title: 'Type 01: Uncountable', 
            content: `
                <div style="color:#e74c3c; font-size:6vh; font-weight:900; margin-bottom:2vh;">NO PLURAL! (No "S")</div>
                <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:1.5vw;">
                    <div style="background:#222; padding:3vh; border-radius:20px; font-size:3.5vh;">💧 Liquids<br><small style="color:#666">(Water)</small></div>
                    <div style="background:#222; padding:3vh; border-radius:20px; font-size:3.5vh;">☁️ Powder<br><small style="color:#666">(Sugar)</small></div>
                    <div style="background:#222; padding:3vh; border-radius:20px; font-size:3.5vh;">💰 Abstract<br><small style="color:#666">(Money)</small></div>
                </div>
            ` 
        },

        /* 3: The Basic Rule */
        { 
            type: 'reveal-grid', 
            title: 'Type 02: Countable',
            desc: 'The Standard Rule: Add "S"',
            items: ["Car ➔ Cars", "Cat ➔ Cats", "Pen ➔ Pens", "Book ➔ Books", "Boy ➔ Boys", "Girl ➔ Girls"] 
        },

        /* 4: The ES Rule */
        { 
            type: 'reveal-plus', 
            title: 'The ( ES ) Rule',
            desc: 'Ends with: S, SS, O, X, CH, SH',
            items: [
                { base: "Bus", add: "es" }, { base: "Glass", add: "es" },
                { base: "Tomato", add: "es" }, { base: "Box", add: "es" },
                { base: "Watch", add: "es" }, { base: "Brush", add: "es" }
            ] 
        },

        /* 5: The Y Rule */
        { 
            type: 'dual-reveal', 
            title: 'The "Y" Transformation',
            items: ["Company ➔ Companies", "City ➔ Cities", "Baby ➔ Babies"],
            rule: "Consonant + Y ➔ Remove Y and add <span style='color:#c5a059;'>IES</span>"
        },

        /* 6: The F/FE Rule */
        { 
            type: 'dual-reveal', 
            title: 'The "F / FE" Rule',
            items: ["Wolf ➔ Wolves", "Wife ➔ Wives", "Knife ➔ Knives"],
            rule: "Remove F / FE and add <span style='color:#c5a059;'>VES</span>"
        },

        /* 7: Irregular Nouns */
        { 
            type: 'reveal-grid', 
            title: 'Irregular Nouns',
            desc: 'Memorize these special forms!',
            items: [
                "Man ➔ Men", "Woman ➔ Women", "Child ➔ Children", 
                "Person ➔ People", "Foot ➔ Feet", "Tooth ➔ Teeth", 
                "Mouse ➔ Mice", "Sheep ➔ Sheep", "Fish ➔ Fish"
            ] 
        },

        /* 8: Conclusion */
        { 
            type: 'title', 
            content: 'PLURAL MASTERED!', 
            subtitle: 'Great Job, Master!', 
            color: '#2ecc71' 
        }
    ];

    function updateSubSteps() {
        const s = slides[currentSlide];
        if (!s) return;

        // تحديث العناصر التدريجية
        const items = container.querySelectorAll('.step-item');
        items.forEach((item, i) => {
            if (i <= subStep) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
                if (item.classList.contains('grid-box')) item.style.borderColor = '#c5a059';
            } else {
                item.style.opacity = '0.05';
                item.style.transform = 'translateY(10px)';
                if (item.classList.contains('grid-box')) item.style.borderColor = '#222';
            }
        });

        // تحديث ظهور شريط القاعدة (Rule Bar)
        const ruleBar = container.querySelector('.rule-bar');
        if (ruleBar) {
            ruleBar.style.opacity = (subStep >= (s.items ? s.items.length - 1 : 0)) ? '1' : '0';
            ruleBar.style.transform = (subStep >= (s.items ? s.items.length - 1 : 0)) ? 'translateY(0)' : 'translateY(20px)';
        }
    }

    function renderSlide(index) {
        if (index === currentSlide) return;
        currentSlide = index;
        subStep = 0;
        container.innerHTML = '';
        
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.className = 'slide-wrapper';
        wrapper.style.cssText = `width:90%; max-width:1200px; height:85vh; display:flex; flex-direction:column; justify-content:center; align-items:center; animation: vetoQuickFade 0.3s ease;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `
                <h1 style="font-size:12vh; font-weight:900; color:${s.color}; margin:0; line-height:1;">${s.content}</h1>
                <div style="font-size:4vh; color:#fff; font-weight:bold; margin-top:3vh; border-top:8px solid ${s.color}; display:inline-block; padding-top:1.5vh; letter-spacing:5px;">${s.subtitle}</div>
            `;
        } 
        else if (s.type === 'writing') {
            wrapper.innerHTML = `
                <div style="width:100%; background:#111; padding:6vh; border-left:15px solid #c5a059; border-radius:30px; box-shadow:0 20px 50px rgba(0,0,0,0.5);">
                    <h2 style="font-size:7vh; margin-bottom:4vh; color:#c5a059; font-weight:900;">${s.title}</h2>
                    <div style="color:#fff;">${s.content}</div>
                </div>`;
        }
        else if (s.type === 'reveal-grid') {
            wrapper.innerHTML = `
                <h2 style="font-size:7vh; color:#c5a059; margin-bottom:1vh; font-weight:900;">${s.title}</h2>
                <p style="font-size:3.5vh; color:#555; margin-bottom:4vh; font-weight:bold;">${s.desc}</p>
                <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:1.5vw; width:100%;">
                    ${s.items.map((item, i) => `
                        <div class="step-item grid-box" style="opacity:0.05; background:#111; padding:3vh; border-radius:20px; font-size:4vh; font-weight:bold; border: 3px solid #222; transition: 0.3s; white-space:nowrap;">
                            ${item}
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'reveal-plus') {
            wrapper.innerHTML = `
                <h2 style="font-size:7vh; color:#c5a059; margin-bottom:1vh; font-weight:900;">${s.title}</h2>
                <p style="font-size:3.5vh; color:#555; margin-bottom:4vh; font-weight:bold;">${s.desc}</p>
                <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:2vw; width:100%;">
                    ${s.items.map((item, i) => `
                        <div class="step-item" style="opacity:0.05; font-size:6vh; background:#111; padding:4vh; border-radius:25px; font-weight:900; border-bottom: 8px solid #222; transition:0.3s;">
                            ${item.base}<span style="color:#c5a059;">${item.add}</span>
                        </div>
                    `).join('')}
                </div>`;
        }
        else if (s.type === 'dual-reveal') {
            wrapper.innerHTML = `
                <h2 style="font-size:7vh; color:#c5a059; margin-bottom:4vh; font-weight:900;">${s.title}</h2>
                <div style="display:flex; flex-direction:column; gap:2vh; align-items:center; width:100%;">
                    ${s.items.map((item, i) => `
                        <div class="step-item" style="opacity:0.05; font-size:5.5vh; font-weight:900; background:#111; padding:2vh 10vh; border-radius:100px; border:3px solid #333; transition:0.3s;">${item}</div>
                    `).join('')}
                    <div class="rule-bar" style="opacity:0; background:#c5a059; color:black; padding:4vh 6vh; border-radius:30px; font-size:4vh; font-weight:900; margin-top:3vh; box-shadow: 0 15px 40px rgba(197,160,89,0.4); width:100%; transition: 0.5s ease-out;">
                        RULE: ${s.rule}
                    </div>
                </div>`;
        }

        container.appendChild(wrapper);
        updateSubSteps();
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if ([13, 32, 39].includes(e.keyCode)) { // Next
            let maxSteps = s.items ? s.items.length - 1 : 0;
            if (subStep < maxSteps) { subStep++; updateSubSteps(); }
            else if (currentSlide < slides.length - 1) { renderSlide(currentSlide + 1); }
            else { if (window.triggerVetoDone) window.triggerVetoDone(); }
        } else if (e.keyCode === 37) { // Back
            if (subStep > 0) { subStep--; updateSubSteps(); }
            else if (currentSlide > 0) { renderSlide(currentSlide - 1); }
        }
    };

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes vetoQuickFade { from { opacity:0; transform: scale(0.98); } to { opacity:1; transform: scale(1); } }
        .step-item { transform: translateY(10px); }
    `;
    document.head.appendChild(style);

    renderSlide(0);
})();
