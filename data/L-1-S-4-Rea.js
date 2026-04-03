(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- بيانات القصة (Veto Data Center) ---
    const partNumber = 1; 
    const storyTitle = "The Secret of the Peak";
    const storyText = `Clay" was a history teacher in "England" who loved the past and high mountains. When his friend "John" suggested climbing a remote, snowy peak, "Clay" agreed. He wanted a new challenge to satisfy his curiosity.
They started in a cloudy town called "Lamberth". "Clay" was careful and prepared all his rescue gear. However, "John" was careless and made fun of "Clay". He called "Clay" a coward because "Clay" was afraid of small animals like cats and dogs. But "Clay" knew he was brave; he just preferred to avoid them.
The two friends reached the mountain and began their climb. The paths were easy, and they reached the top quickly. "Clay" was happy with their success, but "John" looked upset. He searched the edges of the peak with confusion. When "Clay" asked what was wrong, "John" replied, "Where is the cave?"
<hr>
The Hidden Passage
A heavy silence fell over the mountain until "John" spoke in a soft, apologetic voice. "Please forgive me, 'Clay'," he said. He confessed that he had a secret reason for bringing his friend to this peak. "John" explained that he had me a professional climber at a party who told him a strange story. This specific mountain had regular avalanches that revealed a mysterious cave at the top. This cave stayed open for exactly one year before the next snowstorm sealed it shut again, hiding its secrets inside.

"Clay" was very surprised and asked what "John" wanted to find. "John" whispered that the cave was actually a passage to a lost village and a hidden paradise. Just as he finished speaking, the ground began to shake violently. A sudden earthquake caused a massive avalanche. The fast, white snow swept both men away. "John" fell back toward the world they knew, but "Clay" plunged deep into the "White Canyon".
<hr>
"Clay" woke up and realized he was alive, but his body was in great pain. His ankle was shattered from the fall. He lay on the cold snow and called for "John" many times, but no one answered. The only sounds were his own voice and the wind.

He struggled to stand on one foot. It was very difficult and painful. As the sun began to set, "Clay" knew he needed to find a warm place quickly. Luckily, he still had his bag with a tent and some food. Using his skills, he found a small rocky space to hide from the wind and started a fire.

He looked at his leg and saw the injury was very bad. He planned to crawl south the next morning to find help. Suddenly, the loud howls of wolves broke the silence. "Clay", who was always afraid of animals, felt pure terror as he tried to sleep.
`;

    // تنظيف الحاوية وتجهيز الخلفية
    container.innerHTML = ''; 
    container.style.cssText = `
        height:100%; width:100%; display:flex; justify-content:center; align-items:center; 
        background:#1a1a1a; overflow:hidden; font-family: 'Georgia', serif; perspective: 1500px;
    `;

    container.innerHTML = `
        <style>
            /* تصميم الكتاب المفتوح */
            .book-container {
                display: flex; width: 95%; height: 90vh; background: #222;
                box-shadow: 0 50px 100px rgba(0,0,0,0.8); border-radius: 10px;
                position: relative; overflow: hidden; border: 15px solid #333;
            }
            /* الفاصل بين الصفحتين */
            .book-spine {
                position: absolute; left: 50%; top: 0; width: 4px; height: 100%;
                background: linear-gradient(to right, rgba(0,0,0,0.5), rgba(255,255,255,0.1), rgba(0,0,0,0.5));
                z-index: 10; transform: translateX(-50%);
            }
            /* الصفحة اليسرى (الصورة الثابتة) */
            .left-page {
                flex: 1; background: #000; display: flex; justify-content: center; align-items: center;
                padding: 20px; border-right: 1px solid #111; position: relative;
            }
            .left-page img {
                max-width: 90%; max-height: 85%; object-fit: contain; border: 10px solid #fff;
                box-shadow: 0 0 30px rgba(0,0,0,0.5); transform: rotate(-1deg);
            }
            /* الصفحة اليمنى (النص الورقي) */
            .right-page {
                flex: 1; background: #f4ecd8; /* لون الورق القديم */
                padding: 4vw; overflow-y: auto; position: relative; color: #2c2c2c;
                scrollbar-width: thin; scrollbar-color: #c5a059 transparent;
            }
            /* تنسيق النصوص داخل الورقة */
            .story-title { font-size: 3.5vw; color: #8b4513; margin-bottom: 20px; text-align: center; border-bottom: 2px solid #d2b48c; }
            .story-content { font-size: 2.3vw; line-height: 1.7; text-align: justify; font-weight: 500; }
            b { color: #8b4513; text-shadow: 1px 1px 0px rgba(0,0,0,0.1); }
            hr { border: none; height: 2px; background: linear-gradient(to right, transparent, #d2b48c, transparent); margin: 40px 0; }
            
            /* Scrollbar Animation */
            .right-page::-webkit-scrollbar { width: 8px; }
            .right-page::-webkit-scrollbar-thumb { background: #c5a059; border-radius: 5px; }
        </style>

        <div class="book-container">
            <div class="book-spine"></div>
            
            <div class="left-page">
                <div style="position:absolute; top:20px; left:20px; color:#c5a059; font-weight:bold; font-size:1.2vw;">VETO PROGRAM / PART ${partNumber}</div>
                <img src="data/reading/${partNumber}.png" alt="Scene Image" 
                     onerror="this.src='https://via.placeholder.com/800x1000/222/c5a059?text=Visual+Aid'">
            </div>

            <div class="right-page" id="story-scroller">
                <h1 class="story-title">${storyTitle}</h1>
                <div class="story-content">
                    ${storyText.replace(/Clay/g, '<b>Clay</b>').replace(/\n/g, '<br>')}
                </div>
            </div>
        </div>
    `;

    // --- نظام التحكم بالكيبورد (Veto Navigation) ---
    document.onkeydown = (e) => {
        const scroller = document.getElementById('story-scroller');
        const scrollAmount = window.innerHeight * 0.3; // سكرول بمقدار 30% من ارتفاع الشاشة
        
        if (e.keyCode === 32 || e.keyCode === 40 || e.keyCode === 13) { // Space, Down, Enter
            scroller.scrollBy({ top: scrollAmount, behavior: 'smooth' });
        } else if (e.keyCode === 38) { // Up
            scroller.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
        }
    };

})();
