(function() {
    // 1. التأكد من استهداف الحاوية الموحدة لبرنامج فيتو
    const container = document.getElementById('stage-content') || document.getElementById('activityFinalContent');
    if (!container) return;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:flex; align-items:center; justify-content:center; background:#050505; overflow:hidden; position:relative; font-family:'Poppins', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        { type: 'title', content: 'INDEFINITE ARTICLES', color: '#c5a059' }, // ذهبي فيتو
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
                { text: "Give them", art: "a", noun: "chance" },
                { text: "Give us", art: "an", noun: "address" }
            ] 
        },
        { 
            type: 'u-challenge', 
            title: 'The Letter ( U ) Challenge 🚀',
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

        if (s.type === 'title') {
            wrapper.innerHTML = `<h1 style="font-size:12vw; font-weight:900; color:${s.color}; text-shadow: 0 0 50px rgba(197,160,89,0.3);">${s.content}</h1>`;
        } 
        else if (s.type === 'dual-boxes') {
            wrapper.innerHTML = `
                <div style="display:flex; gap:40px; justify-content:center;">
                    <div style="background:#111; border:3px solid #333; padding:60px; border-radius:30px; width:45%; transition:0.5s;">
                        <h2 style="font-size:3vw; color:#666; margin-bottom:20px;">${s.left.title}</h2>
                        <div style="font-size:8vw; font-weight:900; color:#fff;">${s.left.content}</div>
                    </div>
                    <div style="background:#111; border:3px solid #c5a059; padding:60px; border-radius:30px; width:45%; box-shadow: 0 0 40px rgba(197,160,89,0.1);">
                        <h2 style="font-size:3vw; color:#c5a059; margin-bottom:20px;">${s.right.title}</h2>
                        <div style="font-size:8vw; font-weight:900; color:#c5a059;">${s.right.content}</div>
                    </div>
                </div>`;
        }
        else if (s.type === 'reveal-article') {
            wrapper.innerHTML = `
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:30px;">
                    ${s.items.map((item, i) => {
                        let showItem = i <= Math.floor(subStep/2);
                        let showArt = (i < Math.floor(subStep/2)) || (i === Math.floor(subStep/2) && subStep % 2 !== 0);
                        return `
                        <div style="opacity:${showItem ? 1 : 0.05}; background:#111; padding:40px; border-radius:20px; font-size:3.5vw; border-left:10px solid #c5a059; text-align:left;">
                            ${item.text} <span style="color:#c5a059; background:#222; padding:0 20px; border-radius:10px; display:${showArt ? 'inline-block' : 'none'}; animation:pop 0.3s ease;">${item.art}</span> ${item.noun}
                        </div>`;
                    }).join('')}
                </div>
                <style>@keyframes pop { 0% {transform:scale(0.5)} 100% {transform:scale(1)} }</style>`;
        }
        // ... بقية الـ Types بنفس المنطق
        
        container.appendChild(wrapper);
    }

    // إضافة الأنيميشن العام
    const style = document.createElement('style');
    style.innerHTML = `@keyframes vetoFadeIn { from {opacity:0; transform:translateY(20px)} to {opacity:1; transform:translateY(0)} }`;
    document.head.appendChild(style);

    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if ([32, 39, 13].includes(e.keyCode)) { // Next
            if (s.type === 'reveal-article' && subStep < (s.items.length * 2) - 1) subStep++;
            else if (s.type === 'u-challenge' && subStep < (s.items.length * 2) - 1) subStep++;
            else if (currentSlide < slides.length - 1) { currentSlide++; subStep = 0; }
            else { if(window.triggerVetoDone) window.triggerVetoDone(); }
        } else if (e.keyCode === 37) { // Back
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    render();
})();
