(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // --- إعدادات الجزء (تغير فقط هذه الأرقام في النسخ القادمة) ---
    const partNumber = 1; 
    const storyTitle = "The Survivor: Mr. Clay";
    const storyText = `One day there was a man called Clay. Mr. Clay worked as a teacher; he also loved mountain climbing, and once he was with his friends climbing a snow mountain. After they had reached the top of the mountain, a big avalanche separated him from his friends, and he fell all the way down to the bottom of the mountain. The fall was high, but fortunately Mr. Clay didn’t die, but he was hurt badly. He hardly stood up on his feet; feeling dizzy and cold, he checked the area around him, nothing but snow everywhere. There were some trees, though, but they were far from Mr. Clay; he felt too sick to reach them, so he decided to rest for a day or two where he was till he gets his strength back. He had some experience how to survive into the woods, so he built a fire and slept for the night, as he was so exhausted.`;
    // -------------------------------------------------------

    container.innerHTML = ''; 
    container.style.cssText = `height:calc(100vh - 200px); display:flex; flex-direction:column; align-items:center; background:#1a1a1a; color:#fff; overflow-y:auto; padding:40px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;`;

    container.innerHTML = `
        <div style="width:100%; max-width:900px; text-align:center;">
            <div style="color:#e74c3c; font-size:1.2rem; font-weight:bold; letter-spacing:2px; margin-bottom:10px;">PART ${partNumber}</div>
            <h1 style="font-size:2.5rem; margin-bottom:30px; text-transform:uppercase; border-bottom:2px solid #333; padding-bottom:15px;">${storyTitle}</h1>
            
            <div style="width:100%; border-radius:15px; overflow:hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); margin-bottom:40px; background:#000;">
                <img src="data/reading/${partNumber}.jpg" alt="Part ${partNumber}" style="width:100%; height:auto; display:block; transition: transform 0.3s ease;">
            </div>

            <div style="font-size:1.6rem; line-height:1.8; text-align:justify; color:#ddd; padding:0 20px; background: rgba(255,255,255,0.05); padding:30px; border-radius:10px; border-left:5px solid #e74c3c;">
                ${storyText}
            </div>

            <div style="margin-top:50px; color:#555; font-size:1rem; border-top:1px solid #333; padding-top:20px;">
                © Reading Practice - Level 1
            </div>
        </div>
    `;

    // إضافة تأثير بسيط عند التمرير
    container.onscroll = function() {
        let scrollValue = container.scrollTop;
        const img = container.querySelector('img');
        if(img) img.style.transform = `scale(${1 + scrollValue/2000})`;
    };
})();
