(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- بيانات القصة (Veto Data Center) ---
    const partNumber = 1; 
    const storyTitle = "The Survivor: Mr. Clay";
    const storyText = `One day there was a man called Clay. Mr. Clay worked as a teacher; he also loved mountain climbing, and once he was with his friends climbing a snow mountain. After they had reached the top of the mountain, a big avalanche separated him from his friends, and he fell all the way down to the bottom of the mountain. The fall was high, but fortunately Mr. Clay didn’t die, but he was hurt badly. He hardly stood up on his feet; feeling dizzy and cold, he checked the area around him, nothing but snow everywhere. There were some trees, though, but they were far from Mr. Clay; he felt too sick to reach them, so he decided to rest for a day or two where he was till he gets his strength back. He had some experience how to survive into the woods, so he built a fire and slept for the night, as he was so exhausted.`;
    // -------------------------------------------------------

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:flex; flex-direction:column; background:#050505; color:#fff; overflow:hidden; padding:2vh 5vw; font-family: 'Segoe UI', sans-serif;`;

    container.innerHTML = `
        <div style="text-align:center; margin-bottom:2vh; animation: fadeInDown 0.6s ease;">
            <div style="color:#c5a059; font-size:1.5vw; font-weight:bold; letter-spacing:5px;">PART ${partNumber}</div>
            <h1 style="font-size:4vw; margin:10px 0; text-transform:uppercase; color:#fff; text-shadow: 0 0 20px rgba(197,160,89,0.2);">${storyTitle}</h1>
        </div>

        <div style="display:flex; gap:4vw; align-items:flex-start; height:70vh;">
            
            <div style="flex:1; height:100%; border-radius:20px; overflow:hidden; border: 3px solid #222; box-shadow: 0 20px 50px rgba(0,0,0,0.8);">
                <img src="data/reading/${partNumber}.png" alt="Part ${partNumber}" 
                     style="width:100%; height:100%; object-fit:cover; animation: zoomInEffect 10s infinite alternate;"
                     onerror="this.src='https://via.placeholder.com/800x1000/111/c5a059?text=Image+Not+Found'">
            </div>

            <div id="story-scroll" style="flex:1.2; height:100%; overflow-y:auto; padding-right:20px; scrollbar-width: thin; scrollbar-color: #c5a059 #111;">
                <div style="font-size:2.2vw; line-height:1.6; text-align:left; color:#eee; background: rgba(255,255,255,0.02); padding:40px; border-radius:20px; border-left:8px solid #c5a059;">
                    ${storyText.replace(/Mr. Clay/g, '<b style="color:#c5a059">Mr. Clay</b>')}
                </div>
                
                <div style="margin-top:40px; text-align:center;">
                   <button onclick="window.triggerVetoDone()" style="padding:15px 40px; background:#c5a059; border:none; border-radius:50px; font-weight:bold; font-size:1.5vw; cursor:pointer;">FINISH READING</button>
                </div>
            </div>
        </div>

        <style>
            @keyframes fadeInDown { from { opacity:0; transform:translateY(-30px); } to { opacity:1; transform:translateY(0); } }
            @keyframes zoomInEffect { from { transform:scale(1); } to { transform:scale(1.1); } }
            #story-scroll::-webkit-scrollbar { width: 8px; }
            #story-scroll::-webkit-scrollbar-track { background: #111; }
            #story-scroll::-webkit-scrollbar-thumb { background: #c5a059; border-radius: 10px; }
        </style>
    `;

    // دعم مفتاح المسافة للتمرير لأسفل النص
    document.onkeydown = (e) => {
        const scroller = document.getElementById('story-scroll');
        if (e.keyCode === 32 || e.keyCode === 40) { // Space or Down
            scroller.scrollBy({ top: 100, behavior: 'smooth' });
        } else if (e.keyCode === 38) { // Up
            scroller.scrollBy({ top: -100, behavior: 'smooth' });
        }
    };
})();
