(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:calc(100vh - 200px); overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#0f0f0f; font-family:'Poppins', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        /* 1: Title */
        { type: 'title', content: 'INDEFINITE ARTICLES', color: '#e74c3c' },
        
        /* 2: The Boxes */
        { 
            type: 'dual-boxes', 
            left: { title: 'The Definite Article', content: 'THE' },
            right: { title: 'Indefinite Articles', content: 'A / AN' }
        },

        /* 3: Examples (Reveal Article) */
        { 
            type: 'reveal-article', 
            items: [
                { text: "Give me", art: "a", noun: "pen" },
                { text: "Give her", art: "an", noun: "orange" },
                { text: "Give them", art: "a", noun: "chance" },
                { text: "Give us", art: "an", noun: "address" }
            ] 
        },

        /* 4: Rules (Vowels vs Consonants) */
        { 
            type: 'writing-split', 
            left: { title: 'Vowels = AN', content: 'A - E - I - O - U', color: '#f1c40f' },
            right: { title: 'Consonants = A', content: 'All other letters', color: '#3498db' }
        },

        /* 5: Quick Practice */
        { 
            type: 'reveal-article', 
            items: [
                { text: "", art: "a", noun: "camel 🐫" },
                { text: "", art: "a", noun: "good time 😉" },
                { text: "", art: "an", noun: "email ✉️" }
            ] 
        },

        /* 6: Structure Rule */
        { 
            type: 'writing', 
            title: 'The Rule', 
            content: '<span style="color:#f1c40f;">A / AN + Noun</span><br><small>(a good car - an umbrella)</small><br><br><span style="color:#3498db;">A / AN + Adj + Noun</span><br><small>(a good car - an orange car)</small>' 
        },

        /* 7: The Letter U Challenge */
        { 
            type: 'u-challenge', 
            title: 'The Letter ( U )',
            items: [
                { word: "Umbrella", art: "an" },
                { word: "University", art: "a" }
            ]
        },

        /* 8: Final Exercise */
        { 
            type: 'u-challenge', 
            title: 'Exercises',
            items: [
                { word: "update", art: "an" },
                { word: "unit", art: "a" }
            ]
        }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:95%; text-align:center; animation: fadeIn 0.4s ease;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `<h1 style="font-size:10rem; font-weight:900; color:${s.color}; margin:0; line-height:1;">${s.content}</h1>`;
        } 
        else if (s.type === 'dual-boxes') {
            wrapper.innerHTML = `
                <div style="display:flex; gap:30px; justify-content:center;">
                    <div style="background:#1e1e1e; border:5px solid #fff; padding:40px; border-radius:20px; width:45%;">
                        <h2 style="font-size:2rem; color:#888;">${s.left.title}</h2>
                        <div style="font-size:6rem; font-weight:bold;">${s.left.content}</div>
                    </div>
                    <div style="background:#1e1e1e; border:5px solid #e74c3c; padding:40px; border-radius:20px; width:45%;">
                        <h2 style="font-size:2rem; color:#888;">${s.right.title}</h2>
                        <div style="font-size:6rem; font-weight:bold; color:#e74c3c;">${s.right.content}</div>
                    </div>
                </div>`;
        }
        else if (s.type === 'reveal-article') {
            wrapper.innerHTML = `<div style="display:flex; flex-direction:column; gap:20px; text-align:left;">
                ${s.items.map((item, i) => {
                    let showItem = i <= Math.floor(subStep/2);
                    let showArt = (i < Math.floor(subStep/2)) || (i === Math.floor(subStep/2) && subStep % 2 !== 0);
                    return `
                    <div style="opacity:${showItem ? 1 : 0}; transition:0.3s; background:#1e1e1e; padding:20px; border-radius:15px; font-size:3rem; font-weight:bold;">
                        ${item.text} <span style="color:#f1c40f; visibility:${showArt ? 'visible' : 'hidden'}; border-bottom:3px solid;">${item.art}</span> ${item.noun}
                    </div>`;
                }).join('')}
            </div>`;
        }
        else if (s.type === 'writing-split') {
            wrapper.innerHTML = `
                <div style="display:flex; gap:20px;">
                    <div style="flex:1; background:#1e1e1e; padding:40px; border-radius:20px; border-top:10px solid ${s.left.color};">
                        <h2 style="font-size:3rem; color:${s.left.color};">${s.left.title}</h2>
                        <div style="font-size:4rem; font-weight:bold;">${s.left.content}</div>
                    </div>
                    <div style="flex:1; background:#1e1e1e; padding:40px; border-radius:20px; border-top:10px solid ${s.right.color};">
                        <h2 style="font-size:3rem; color:${s.right.color};">${s.right.title}</h2>
                        <div style="font-size:3.5rem; font-weight:bold;">${s.right.content}</div>
                    </div>
                </div>`;
        }
        else if (s.type === 'writing') {
            wrapper.innerHTML = `
                <div style="text-align:left; background:#1e1e1e; padding:50px; border-left:15px solid #e74c3c; border-radius:15px;">
                    <h2 style="font-size:4rem; margin-bottom:20px; color:#e74c3c;">${s.title}</h2>
                    <div style="font-size:4.5rem; line-height:1.2; color:#fff;">${s.content}</div>
                </div>`;
        }
        else if (s.type === 'u-challenge') {
            wrapper.innerHTML = `
                <h2 style="font-size:4rem; color:#f1c40f; margin-bottom:40px;">${s.title}</h2>
                <div style="display:flex; flex-direction:column; gap:30px; align-items:center;">
                    ${s.items.map((item, i) => {
                        let showWord = i <= Math.floor(subStep/2);
                        let showArt = (i < Math.floor(subStep/2)) || (i === Math.floor(subStep/2) && subStep % 2 !== 0);
                        return `
                        <div style="opacity:${showWord ? 1 : 0}; font-size:5rem; font-weight:bold; background:#1e1e1e; padding:20px 60px; border-radius:50px; border:2px solid #444;">
                            <span style="color:#e74c3c; visibility:${showArt ? 'visible' : 'hidden'};">${item.art}</span> ${item.word}
                        </div>`;
                    }).join('')}
                </div>`;
        }

        container.appendChild(wrapper);
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if (e.keyCode === 39 || e.keyCode === 13 || e.keyCode === 32) { // Next
            if (s.type === 'reveal-article' && subStep < (s.items.length * 2) - 1) subStep++;
            else if (s.type === 'u-challenge' && subStep < (s.items.length * 2) - 1) subStep++;
            else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
        } else if (e.keyCode === 37) { // Back
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    render();
})();
