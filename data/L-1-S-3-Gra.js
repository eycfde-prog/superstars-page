(function() {
    // توحيد الحاوية لتكون Stage-Content
    const container = document.getElementById('stage-content'); 
    if (!container) return;

    container.innerHTML = ''; 
    // تحسين الخلفية لتبدو أكثر فخامة (Deep Black)
    container.style.cssText = `height:100%; width:100%; display:flex; align-items:center; justify-content:center; background:#050505; overflow:hidden; position:relative; font-family:'Segoe UI', sans-serif;`;

    let currentSlide = 0;
    let subStep = 0;

    // ... (نفس مصفوفة الـ slides الرائعة الخاصة بك مع تحسينات طفيفة في الخطوط)

    function render() {
        container.innerHTML = '';
        const s = slides[currentSlide];
        const wrapper = document.createElement('div');
        // استخدام vw لضمان التوافق مع الشاشات العملاقة
        wrapper.style.cssText = `width:90%; max-width:1400px; text-align:center; animation: vetoFadeIn 0.5s ease;`;

        if (s.type === 'title') {
            wrapper.innerHTML = `<h1 style="font-size:12vw; font-weight:900; color:${s.color}; text-shadow: 0 10px 50px rgba(0,0,0,0.8);">${s.content}</h1>`;
        } 
        
        else if (s.type === 'reveal-article') {
            wrapper.innerHTML = `
                <div style="display:flex; flex-direction:column; gap:2vh; text-align:left;">
                ${s.items.map((item, i) => {
                    let showItem = i <= Math.floor(subStep/2);
                    let showArt = (i < Math.floor(subStep/2)) || (i === Math.floor(subStep/2) && subStep % 2 !== 0);
                    return `
                    <div style="opacity:${showItem ? 1 : 0.05}; transition:0.4s; background:#111; padding:2.5vh 4vw; border-radius:20px; font-size:4vw; font-weight:bold; border-left: 10px solid ${showArt ? '#f1c40f' : '#333'};">
                        ${item.text} <span style="color:#f1c40f; visibility:${showArt ? 'visible' : 'hidden'}; border-bottom:5px solid;">${item.art}</span> ${item.noun}
                    </div>`;
                }).join('')}
            </div>`;
        }
        
        // ... (بقية الـ Types مع تحويل الـ PX إلى VW)

        container.appendChild(wrapper);
    }

    // إضافة Keydown Logic الموحد
    // ... 
    
    render();
})();
