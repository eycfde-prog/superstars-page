(function() {
    const container = document.getElementById('activityFinalContent');
    container.innerHTML = ''; 
    container.style.cssText = `height:calc(100vh - 140px); overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:transparent; font-family:'Arial',sans-serif; direction:ltr;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1 */ { type: 'title', content: 'Plural Rules', size: '7rem' },
        
        /* 2 */ { 
            type: 'reveal-list', 
            items: ['Cars', 'Cats', 'Pens', 'Pins', 'Bins', '---', 'Go (Verb)', 'Good (Adj)', 'Water (Uncountable)', '---', 'Countable vs Uncountable', 'Liquid / Powder', 'Money'] 
        },

        /* 3 */ { 
            type: 'writing', 
            title: 'Basic Rule', 
            content: `We add <span style="color:red; font-weight:bold;">S</span> to countable nouns.<br>
                      <span style="color:#c0392b;">Note:</span> No plural for Uncountable (Liquid, Powder, Money).`
        },

        /* 4 */ { 
            type: 'suffix-anim', 
            suffix: 'es',
            pairs: [
                { word: 'Bus', full: 'Buses' }, { word: 'Class', full: 'Classes' }, 
                { word: 'Potato', full: 'Potatoes' }, { word: 'Box', full: 'Boxes' }, 
                { word: 'Watch', full: 'Watches' }, { word: 'Dish', full: 'Dishes' }
            ]
        },

        /* 5 */ { 
            type: 'writing', 
            title: 'The "es" Rule', 
            content: `Add <span style="color:red; font-weight:bold;">es</span> to nouns ending in:<br>
                      <span style="font-size:3.5rem; letter-spacing:10px; color:#2980b9;">S, SS, O, X, CH, SH</span>`
        },

        /* 6 */ { 
            type: 'reveal-list', 
            items: ['Company → Companies', 'Boy → Boys'] 
        },

        /* 7 */ { 
            type: 'writing', 
            title: 'The "y" Rule', 
            content: `Remove <span style="color:red;">y</span> and add <span style="color:red;">ies</span><br>
                      <small>(If letter before Y is Consonant)</small>`
        },

        /* 8 */ { 
            type: 'reveal-list', 
            items: ['Wolf → Wolves', 'Wife → Wives'] 
        },

        /* 9 */ { 
            type: 'writing', 
            title: 'The "f/fe" Rule', 
            content: `Remove <span style="color:red;">f</span> or <span style="color:red;">fe</span><br>
                      Add <span style="color:red; font-weight:bold;">ves</span>`
        },

        /* 10 */ { 
            type: 'reveal-list', 
            items: [
                'Man → Men', 'Woman → Women', 'Child → Children', 
                'Person → People', 'Ox → Oxen', 'Foot → Feet', 
                'Tooth → Teeth', 'Mouse → Mice', 'Deer → Deer', 
                'Sheep → Sheep', 'Information (Uncountable)', 'Fish → Fish'
            ]
        },

        /* 11 */ { 
            type: 'suffix-anim', 
            suffix: 'mix',
            pairs: [
                { word: 'Dress', full: 'Dresses', add: 'es' },
                { word: 'Fox', full: 'Foxes', add: 'es' },
                { word: 'Countr', full: 'Countries', add: 'ies' },
                { word: 'Hal', full: 'Halves', add: 'ves' },
                { word: 'Child', full: 'Children', add: 'ren' }
            ]
        },

        /* 12 */ { type: 'end', content: 'Well Done!', button: 'Go to Test' }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:90%; text-align:center; animation: fadeIn 0.4s;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `<h1 style="font-size:${s.size}; font-weight:900;">${s.content}</h1>`;
        } 
        else if (s.type === 'writing') {
            wrapper.innerHTML = `
                <div style="display:inline-block; text-align:left; background:white; padding:40px; border-left:12px solid #f1c40f; box-shadow:0 15px 40px rgba(0,0,0,0.1); border-radius:15px; width:100%;">
                    <small style="color:#f1c40f; font-weight:bold; font-size:1.5rem;">📝 WRITING TIME</small>
                    <h2 style="font-size:3rem; margin:15px 0; color:#2c3e50;">${s.title}</h2>
                    <div style="font-size:2.5rem; line-height:1.6;">${s.content}</div>
                </div>`;
        }
        else if (s.type === 'reveal-list') {
            wrapper.innerHTML = `<div style="display:flex; flex-direction:column; gap:10px; font-size:2.5rem; font-weight:bold;">
                ${s.items.map((item, i) => `<div style="opacity:${i <= subStep ? 1 : 0}; transition:0.3s;">${item === '---' ? '<hr>' : item}</div>`).join('')}
            </div>`;
        }
        else if (s.type === 'suffix-anim') {
            wrapper.innerHTML = s.pairs.map((p, i) => {
                let showAdd = (i < subStep);
                let currentSuffix = s.suffix === 'mix' ? p.add : s.suffix;
                return `<div style="font-size:3rem; margin:10px; font-weight:bold;">
                    ${p.word}<span style="color:red; opacity:${showAdd ? 1 : 0}; transition:0.3s;">${currentSuffix}</span>
                </div>`;
            }).join('');
        }
        else if (s.type === 'end') {
            wrapper.innerHTML = `<h1 style="font-size:5rem; color:#27ae60;">${s.content}</h1><button style="padding:20px 50px; font-size:2rem; background:#27ae60; color:white; border:none; border-radius:50px; cursor:pointer;">Go to Test</button>`;
        }

        container.appendChild(wrapper);
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if (e.keyCode === 39) { // Right
            if (s.type === 'reveal-list' && subStep < s.items.length - 1) subStep++;
            else if (s.type === 'suffix-anim' && subStep < s.pairs.length) subStep++;
            else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
        } else if (e.keyCode === 37) { // Left
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    render();
})();
