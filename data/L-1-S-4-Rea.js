(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- بيانات القصة (Veto Data Center) ---
    const partNumber = 1; 
    const storyTitle = "The Secret of the Peak";
    const storyText = `Clay" was a history teacher in "England" who loved the past and high mountains. When his friend "John" suggested climbing a remote, snowy peak, "Clay" agreed. He wanted a new challenge to satisfy his curiosity.
They started in a cloudy town called "Lamberth". "Clay" was careful and prepared all his rescue gear. However, "John" was careless and made fun of "Clay". He called "Clay" a coward because "Clay" was afraid of small animals like cats and dogs. But "Clay" knew he was brave; he just preferred to avoid them.
The two friends reached the mountain and began their climb. The paths were easy, and they reached the top quickly. "Clay" was happy with their success, but "John" looked upset. He searched the edges of the peak with confusion. When "Clay" asked what was wrong, "John" replied, "Where is the cave?"
--------------------------- 
The Hidden Passage
A heavy silence fell over the mountain until "John" spoke in a soft, apologetic voice. "Please forgive me, 'Clay'," he said. He confessed that he had a secret reason for bringing his friend to this peak. "John" explained that he had met a professional climber at a party who told him a strange story. This specific mountain had regular avalanches that revealed a mysterious cave at the top. This cave stayed open for exactly one year before the next snowstorm sealed it shut again, hiding its secrets inside.

"Clay" was very surprised and asked what "John" wanted to find. "John" whispered that the cave was actually a passage to a lost village and a hidden paradise. Just as he finished speaking, the ground began to shake violently. A sudden earthquake caused a massive avalanche. The fast, white snow swept both men away. "John" fell back toward the world they knew, but "Clay" plunged deep into the "White Canyon".
--------------------------- 
"Clay" woke up and realized he was alive, but his body was in great pain. His ankle was shattered from the fall. He lay on the cold snow and called for "John" many times, but no one answered. The only sounds were his own voice and the wind.

He struggled to stand on one foot. It was very difficult and painful. As the sun began to set, "Clay" knew he needed to find a warm place quickly. Luckily, he still had his bag with a tent and some food. Using his skills, he found a small rocky space to hide from the wind and started a fire.

He looked at his leg and saw the injury was very bad. He planned to crawl south the next morning to find help. Suddenly, the loud howls of wolves broke the silence. "Clay", who was always afraid of animals, felt pure terror as he tried to sleep.
`;

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
