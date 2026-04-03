(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- بيانات القصة (Veto Data Center) ---
    const partNumber = 1; 
    const storyTitle = "The Secret of the Peak";
    const rawStoryText = `Clay" was a history teacher in "England" who loved the past and high mountains. When his friend "John" suggested climbing a remote, snowy peak, "Clay" agreed. He wanted a new challenge to satisfy his curiosity.
They started in a cloudy town called "Lamberth". "Clay" was careful and prepared all his rescue gear. However, "John" was careless and made fun of "Clay". He called "Clay" a coward because "Clay" was afraid of small animals like cats and dogs. But "Clay" knew he was brave; he just preferred to avoid them.
The two friends reached the mountain and began their climb. The paths were easy, and they reached the top quickly. "Clay" was happy with their success, but "John" looked upset. He searched the edges of the peak with confusion. When "Clay" asked what was wrong, "John" replied, "Where is the cave?"
--------------------------- 
The Hidden Passage
A heavy silence fell over the mountain until "John" spoke in a soft, apologetic voice. "Please forgive me, 'Clay'," he said. He confessed that he had a secret reason for bringing his friend to this peak. "John" explained that he had met a professional climber at a party who told him a strange story. This specific mountain had regular avalanches that revealed a mysterious cave at the top. This cave stayed open for exactly one year before the next snowstorm sealed it shut again, hiding its secrets inside.

"Clay" was very surprised and asked what "John" wanted to find. "John" whispered that the cave was actually a passage to a lost village and a hidden paradise. Just as he finished speaking, the ground began to shake violently. A sudden earthquake caused a massive avalanche. The fast, white snow swept both men away. "John" fell back toward the world they knew, but "Clay" plunged deep into the "White Canyon".
--------------------------- 
"Clay" woke up and realized he was alive, but his body was in great pain. His ankle was shattered from the fall. He lay on the cold snow and called for "John" many times, but no one answered. The only sounds were his own voice and the wind.

He struggled to stand on one foot. It was very difficult and painful. As the sun began to set, "Clay" knew he needed to find a warm place quickly. Luckily, he still had his bag with a tent and some food. Using his skills, he found a small rocky space to hide from the wind and started a fire.

He looked at his leg and saw the injury was very bad. He planned to crawl south the next morning to find help. Suddenly, the loud howls of wolves broke the silence. "Clay", who was always afraid of animals, felt pure terror as he tried to sleep.`;

    // معالجة النصوص وتقسيمها لسلايدات
    const slides = rawStoryText.split('---------------------------').map(s => s.trim());
    let currentSlide = 0;

    // دالة التنسيق لتسليط الضوء على الكلمات المفتاحية
    const formatText = (text) => {
        return text
            .replace(/"(.*?)"/g, '<span style="color:#c5a059; font-weight:bold;">"$1"</span>') // تلوين الكلمات بين علامات التنصيص
            .replace(/\n/g, '<br>'); // الحفاظ على المسافات
    };

    const render = () => {
        container.innerHTML = ''; 
        container.style.cssText = `height:100%; width:100%; display:flex; flex-direction:column; background:#050505; color:#fff; overflow:hidden; padding:3vh 4vw; font-family: 'Segoe UI', Roboto, sans-serif; box-sizing:border-box;`;

        container.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:3vh; border-bottom:1px solid rgba(197,160,89,0.3); padding-bottom:10px;">
                <div style="text-align:left;">
                    <div style="color:#c5a059; font-size:1.2vw; font-weight:bold; letter-spacing:3px;">VETO PROGRAM | PART ${partNumber}</div>
                    <h1 style="font-size:3.2vw; margin:5px 0; text-transform:uppercase; text-shadow: 2px 2px 10px rgba(0,0,0,0.5);">${storyTitle}</h1>
                </div>
                <div style="background:#c5a059; color:#000; padding:10px 20px; border-radius:50px; font-weight:bold; font-size:1.5vw;">
                    SCENE: ${currentSlide + 1} / ${slides.length}
                </div>
            </div>

            <div style="display:flex; gap:3vw; align-items:stretch; flex:1; min-height:0;">
                
                <div style="flex:0.8; position:relative; border-radius:25px; overflow:hidden; border: 4px solid #1a1a1a; box-shadow: 0 0 40px rgba(0,0,0,1);">
                    <img src="data/reading/${partNumber}.png" alt="Story Visual" 
                         style="width:100%; height:100%; object-fit:cover; animation: slowPan 20s infinite alternate;"
                         onerror="this.src='https://via.placeholder.com/800x1200/111/c5a059?text=Veto+Visual'">
                    <div style="position:absolute; bottom:0; left:0; right:0; background:linear-gradient(transparent, rgba(0,0,0,0.8)); height:30%;"></div>
                </div>

                <div id="text-container" style="flex:1.2; background:rgba(255,255,255,0.03); border-radius:25px; padding:3vw; border: 1px solid rgba(197,160,89,0.1); display:flex; align-items:center; overflow-y:auto; scrollbar-width:none;">
                    <p style="font-size:2.4vw; line-height:1.7; color:#f0f0f0; margin:0; width:100%; animation: slideIn 0.5s ease-out;">
                        ${formatText(slides[currentSlide])}
                    </p>
                </div>
            </div>

            <div style="margin-top:2vh; text-align:center; color:rgba(197,160,89,0.5); font-size:1vw; letter-spacing:1px;">
                PRESS [ENTER] OR [SPACE] FOR NEXT SCENE • USE ARROWS TO NAVIGATE
            </div>

            <style>
                @keyframes slideIn { from { opacity:0; transform: translateX(30px); } to { opacity:1; transform: translateX(0); } }
                @keyframes slowPan { from { transform:scale(1); } to { transform:scale(1.15) rotate(1deg); } }
                #text-container::-webkit-scrollbar { display: none; }
            </style>
        `;
    };

    // التحكم في التنقل
    const nextSlide = () => {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            render();
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            currentSlide--;
            render();
        }
    };

    document.onkeydown = (e) => {
        if (e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 39) { // Enter, Space, Right Arrow
            nextSlide();
        } else if (e.keyCode === 37) { // Left Arrow
            prevSlide();
        }
    };

    render();
})();
