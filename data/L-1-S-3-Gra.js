(function() {
    // 1. توحيد الحاوية
    const container = document.getElementById('stage-content'); 
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:flex; align-items:center; justify-content:center; background:#050505; font-family:'Segoe UI', sans-serif; direction:ltr; color:white; overflow:hidden;`;

    let currentSlide = 0;
    let subStep = 0;

    const gold = '#c5a059'; // اللون الذهبي الموحد لفيتو

    const slides = [
        { type: 'title', content: 'INDEFINITE ARTICLES', color: gold },
        { 
            type: 'dual-boxes', 
            left: { title: 'The Definite Article', content: 'THE' },
            right: { title: 'Indefinite Articles', content: 'A / AN' }
        },
        { 
            type: 'reveal-article', 
            items: [
                { text: "Give me", art: "a", noun: "pen" },
                { text: "Give her", art: "an", noun: "orange" },
                { text: "Give them", art: "a", noun: "chance" }
            ] 
        },
        { 
            type: 'u-challenge', 
            title: 'The Letter ( U ) Challenge',
            items: [
                { word: "Umbrella", art: "an" },
                { word: "University", art: "a" }
            ]
        }
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `width:90%; max-width:1400px; text-align:center; animation: vetoFadeIn 0.5s ease;`;

        // إضافة Styles للأنيميشن
        const styleTag = document.createElement('style');
        styleTag.innerHTML = `
            @keyframes vetoFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            .highlight-box { background: rgba(197, 160, 89, 0.05); border: 2px solid ${gold}; border-radius: 20px; transition: 0.3s; }
            .art-reveal { color: ${gold}; font-weight: 900; border-bottom: 4px solid ${gold}; margin-right: 10px; }
        `;
        document.head.appendChild(styleTag);

        if (s.type === 'title') {
            wrapper.innerHTML = `<h1 style="font-size:8vw; font-weight:900; color:${s.color}; text-shadow: 0 0 30px rgba(197,160,89,0.3);">${s.content}</h1>`;
        } 
        else if (s.type === 'dual-boxes') {
            wrapper.innerHTML = `
                <div style="display:flex; gap:40px; justify-content:center;">
                    <div class="highlight-box" style="padding:60px; flex:1;">
                        <h2 style="font-size:2vw; color:#888; margin-bottom:20px;">${s.left.title}</h2>
                        <div style="font-size:7vw; font-weight:bold;">${s.left.content}</div>
                    </div>
                    <div class="highlight-box" style="padding:60px; flex:1; border-color:#fff;">
                        <h2 style="font-size:2vw; color:#888; margin-bottom:20px;">${s.right.title}</h2>
                        <div style="font-size:7vw; font-weight:bold; color:${gold};">${s.right.content}</div>
                    </div>
                </div>`;
        }
        else if (s.type === 'reveal-article') {
            wrapper.innerHTML = `
                <div style="display:flex; flex-direction:column; gap:25px; align-items:center;">
                    ${s.items.map((item, i) => {
                        let showItem = i <= Math.floor(subStep/2);
                        let showArt = (i < Math.floor(subStep/2)) || (i === Math.floor(subStep/2) && subStep % 2 !== 0);
                        return `
                        <div style="opacity:${showItem ? 1 : 0}; transition:0.4s; font-size:4vw; font-weight:bold; background:#111; padding:20px 50px; border-radius:15px; width:100%; text-align:left;">
                            ${item.text} <span class="art-reveal" style="visibility:${showArt ? 'visible' : 'hidden'};">${item.art}</span> ${item.noun}
                        </div>`;
                    }).join('')}
                </div>`;
        }
        else if (s.type === 'u-challenge') {
            wrapper.innerHTML = `
                <h2 style="font-size:4vw; color:${gold}; margin-bottom:50px;">${s.title}</h2>
                <div style="display:flex; flex-direction:column; gap:30px; align-items:center;">
                    ${s.items.map((item, i) => {
                        let showWord = i <= Math.floor(subStep/2);
                        let showArt = (i < Math.floor(subStep/2)) || (i === Math.floor(subStep/2) && subStep % 2 !== 0);
                        return `
                        <div style="opacity:${showWord ? 1 : 0}; font-size:6vw; font-weight:bold; background:#111; padding:30px 80px; border-radius:100px; border:3px solid #333;">
                            <span style="color:${gold}; visibility:${showArt ? 'visible' : 'hidden'}; margin-right:20px;">${item.art}</span>${item.word}
                        </div>`;
                    }).join('')}
                </div>`;
        }

        container.appendChild(wrapper);
    }

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if ([13, 32, 39].includes(e.keyCode)) { // Enter, Space, Right
            if ((s.type === 'reveal-article' || s.type === 'u-challenge') && subStep < (s.items.length * 2) - 1) {
                subStep++;
            } else if (currentSlide < slides.length - 1) {
                currentSlide++; subStep = 0;
            } else {
                if (window.triggerVetoDone) window.triggerVetoDone();
            }
        } else if (e.keyCode === 37) { // Left
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) {
                currentSlide--;
                subStep = 0; // لتبسيط العودة
            }
        }
        render();
    };

    render();
})();
