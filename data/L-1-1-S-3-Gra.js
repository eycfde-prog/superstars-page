(function() {
    // 1. تصحيح الاستهداف ليتوافق مع HTML
    const container = document.getElementById('stage-content');
    if (!container) return;

    container.innerHTML = ''; 
    // 2. ضبط الخلفية لتكون Full Screen
    container.style.cssText = `height:100%; width:100%; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; background:#050505; font-family:'Segoe UI', sans-serif; direction:ltr; color:white;`;

    let currentSlide = 0;
    let subStep = 0;

    const slides = [
        { type: 'title', content: 'INDEFINITE ARTICLES', color: '#c5a059' }, // توحيد اللون الذهبي
        { 
            type: 'dual-boxes', 
            left: { title: 'The Definite', content: 'THE' },
            right: { title: 'Indefinite', content: 'A / AN' }
        },
        { 
            type: 'reveal-article', 
            items: [
                { text: "Give me", art: "a", noun: "pen" },
                { text: "Give her", art: "an", noun: "orange" },
                { text: "Give them", art: "a", noun: "chance" },
                { text: "Give us", art: "an", noun: "address" }
            ] 
        }
        // ... باقي البيانات ستكون بنفس المنطق
    ];

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        // استخدام vw للخطوط لضمان الوضوح من 4 أمتار
        wrapper.style.cssText = `width:90%; text-align:center; animation: fadeIn 0.4s ease;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `<h1 style="font-size:10vw; font-weight:900; color:${s.color}; letter-spacing:-2px;">${s.content}</h1>`;
        } 
        else if (s.type === 'dual-boxes') {
            wrapper.innerHTML = `
                <div style="display:flex; gap:40px; justify-content:center;">
                    <div style="background:#111; border:5px solid #fff; padding:60px; border-radius:30px; flex:1;">
                        <h2 style="font-size:2.5vw; color:#888;">${s.left.title}</h2>
                        <div style="font-size:8vw; font-weight:bold;">${s.left.content}</div>
                    </div>
                    <div style="background:#111; border:5px solid #c5a059; padding:60px; border-radius:30px; flex:1;">
                        <h2 style="font-size:2.5vw; color:#888;">${s.right.title}</h2>
                        <div style="font-size:8vw; font-weight:bold; color:#c5a059;">${s.right.content}</div>
                    </div>
                </div>`;
        }
        // ... (باقي أنواع السلايدات سيتم تحديث مقاساتها)

        container.appendChild(wrapper);
    }

    // نظام تحكم مطور بالكيبورد
    document.onkeydown = (e) => {
        const s = slides[currentSlide];
        if ([13, 32, 39].includes(e.keyCode)) { // Enter, Space, Right
            if (s.items && subStep < (s.items.length * 2) - 1) {
                subStep++;
            } else if (currentSlide < slides.length - 1) {
                currentSlide++;
                subStep = 0;
            } else {
                if (window.triggerVetoDone) window.triggerVetoDone();
            }
        } else if (e.keyCode === 37) { // Back
            if (subStep > 0) subStep--;
            else if (currentSlide > 0) { currentSlide--; subStep = 0; }
        }
        render();
    };

    render();
})();
