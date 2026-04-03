(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    const partNumber = 1; 
    const storyTitle = "The Secret of the Peak";
    const storyText = `Clay" was a history teacher in "England" who loved the past and high mountains. When his friend "John" suggested climbing a remote, snowy peak, "Clay" agreed. He wanted a new challenge to satisfy his curiosity.
They started in a cloudy town called "Lamberth". "Clay" was careful and prepared all his rescue gear. However, "John" was careless and made fun of "Clay". He called "Clay" a coward because "Clay" was afraid of small animals like cats and dogs. But "Clay" knew he was brave; he just preferred to avoid them.
The two friends reached the mountain and began their climb. The paths were easy, and they reached the top quickly. "Clay" was happy with their success, but "John" looked upset. He searched the edges of the peak with confusion. When "Clay" asked what was wrong, "John" replied, "Where is the cave?"
<hr>
The Hidden Passage
A heavy silence fell over the mountain until "John" spoke in a soft, apologetic voice. "Please forgive me, 'Clay'," he said. He confessed that he had a secret reason for bringing his friend to this peak. "John" explained that he had met a professional climber at a party who told him a strange story. This specific mountain had regular avalanches that revealed a mysterious cave at the top. This cave stayed open for exactly one year before the next snowstorm sealed it shut again, hiding its secrets inside.

"Clay" was very surprised and asked what "John" wanted to find. "John" whispered that the cave was actually a passage to a lost village and a hidden paradise. Just as he finished speaking, the ground began to shake violently. A sudden earthquake caused a massive avalanche. The fast, white snow swept both men away. "John" fell back toward the world they knew, but "Clay" plunged deep into the "White Canyon".
<hr>
"Clay" woke up and realized he was alive, but his body was in great pain. His ankle was shattered from the fall. He lay on the cold snow and called for "John" many times, but no one answered. The only sounds were his own voice and the wind.

He struggled to stand on one foot. It was very difficult and painful. As the sun began to set, "Clay" knew he needed to find a warm place quickly. Luckily, he still had his bag with a tent and some food. Using his skills, he found a small rocky space to hide from the wind and started a fire.

He looked at his leg and saw the injury was very bad. He planned to crawl south the next morning to find help. Suddenly, the loud howls of wolves broke the silence. "Clay", who was always afraid of animals, felt pure terror as he tried to sleep.
`;

    container.innerHTML = ''; 
    container.style.cssText = `
        height:100%; width:100%; display:flex; justify-content:center; align-items:center; 
        background: radial-gradient(circle, #2c2c2c 0%, #000 100%); overflow:hidden; font-family: 'Georgia', serif;
    `;

    container.innerHTML = `
        <style>
            /* حاوية الكتاب مع تأثير الصفحات المتراكمة */
            .book-wrapper {
                position: relative; width: 90%; height: 85vh;
                background: #e0d5ba; /* لون حواف الصفحات */
                border-radius: 5px;
                /* شادو متعدد الطبقات ليعطي إيحاء بوجود صفحات تحت الكتاب */
                box-shadow: 
                    0 1px 1px rgba(0,0,0,0.15), 
                    0 10px 0 -5px #eee, 
                    0 10px 1px -4px rgba(0,0,0,0.15), 
                    0 20px 0 -10px #eee, 
                    0 20px 1px -9px rgba(0,0,0,0.15), 
                    0 30px 50px rgba(0,0,0,0.7);
            }

            .book-content {
                display: flex; width: 100%; height: 100%;
                border-radius: 5px; overflow: hidden; position: relative;
            }

            /* الفاصل الأوسط بتأثير ظل عميق */
            .book-spine {
                position: absolute; left: 50%; top: 0; width: 40px; height: 100%;
                background: linear-gradient(to right, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.3) 100%);
                z-index: 5; transform: translateX(-50%);
            }

            /* تنسيق الصفحة اليسرى (ورقة ثابتة وعليها الصورة) */
            .left-page {
                flex: 1; background: #f4ecd8; /* نفس لون ورق الصفحة اليمنى */
                display: flex; flex-direction: column; justify-content: center; align-items: center;
                padding: 40px; border-right: 1px solid rgba(0,0,0,0.1);
                box-shadow: inset -20px 0 50px rgba(0,0,0,0.05);
            }

            .image-container {
                width: 100%; height: 100%; 
                border: 2px solid #d2b48c; padding: 10px; background: #fff;
                box-shadow: 2px 2px 15px rgba(0,0,0,0.2); transform: rotate(-0.5deg);
            }

            .image-container img {
                width: 100%; height: 100%; object-fit: cover; filter: sepia(0.2);
            }

            /* الصفحة اليمنى (النص الورقي) */
            .right-page {
                flex: 1; background: #f4ecd8; 
                padding: 4vw; overflow-y: auto; position: relative; color: #2c2c2c;
                box-shadow: inset 20px 0 50px rgba(0,0,0,0.05);
                scrollbar-width: none; /* إخفاء سكرول بار لراحة العين */
            }

            .right-page::-webkit-scrollbar { display: none; }

            .story-title { font-size: 3vw; color: #5d3a1a; margin-bottom: 20px; text-align: center; border-bottom: 2px double #d2b48c; padding-bottom: 10px; }
            .story-content { font-size: 2.3vw; line-height: 1.8; text-align: justify; }
            b { color: #a67c00; font-weight: bold; }
            hr { border: none; height: 2px; background: linear-gradient(to right, transparent, #d2b48c, transparent); margin: 30px 0; }
        </style>

        <div class="book-wrapper">
            <div class="book-content">
                <div class="book-spine"></div>
                
                <div class="left-page">
                    <div style="color:#8b4513; font-size:1.5vw; margin-bottom:10px; font-style:italic;">Illustration - Part ${partNumber}</div>
                    <div class="image-container">
                        <img src="data/reading/${partNumber}.png" alt="Scene" 
                             onerror="this.src='https://via.placeholder.com/800x1000/f4ecd8/8b4513?text=Illustration'">
                    </div>
                </div>

                <div class="right-page" id="story-scroller">
                    <h1 class="story-title">${storyTitle}</h1>
                    <div class="story-content">
                        ${storyText.replace(/Clay/g, '<b>Clay</b>').replace(/\n/g, '<br>')}
                    </div>
                </div>
            </div>
        </div>
    `;

    document.onkeydown = (e) => {
        const scroller = document.getElementById('story-scroller');
        const step = 150;
        if (e.keyCode === 32 || e.keyCode === 40 || e.keyCode === 13) {
            scroller.scrollBy({ top: step, behavior: 'smooth' });
        } else if (e.keyCode === 38) {
            scroller.scrollBy({ top: -step, behavior: 'smooth' });
        }
    };
})();
