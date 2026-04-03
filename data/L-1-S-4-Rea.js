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
        background: radial-gradient(circle, #1a1a1a 0%, #000 100%); overflow:hidden; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    `;

    container.innerHTML = `
        <style>
            /* حاوية الكتاب الكبرى */
            .book-wrapper {
                position: relative; width: 96%; height: 92vh;
                background: #fdfaf1; border-radius: 8px;
                box-shadow: 0 50px 100px rgba(0,0,0,0.8);
                display: flex; overflow: hidden;
            }

            /* تصميم الفاصل بين الصفحتين */
            .book-spine {
                position: absolute; left: 50%; top: 0; width: 40px; height: 100%;
                z-index: 5; transform: translateX(-50%);
                background: linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%);
                box-shadow: inset 0 0 15px rgba(0,0,0,0.2);
            }

            .page { flex: 1; height: 100%; position: relative; overflow: hidden; }

            /* الصفحة اليسرى: معالجة الإطار الأبيض */
            .left-page {
                background: #e5e5e5; /* خلفية محايدة خلف الصورة */
                display: flex; justify-content: center; align-items: center;
                padding: 0; /* ألغيت الـ padding لزيادة حجم الصورة */
            }

            .image-frame {
                width: 100%; height: 100%;
                display: flex; justify-content: center; align-items: center;
                background: #fff; /* الإطار الأبيض الآن خلفية للصورة فقط */
                border: 20px solid #fff; /* إطار أبيض عريض وفخم */
                box-shadow: inset 0 0 10px rgba(0,0,0,0.1);
                box-sizing: border-box;
            }

            .image-frame img {
                max-width: 100%; max-height: 100%;
                object-fit: contain; 
                transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
            }

            /* الصفحة اليمنى: النص المقروء */
            .right-page {
                padding: 40px 60px; overflow-y: auto; color: #1a1a1a;
                background: #fdfaf1; scrollbar-width: none;
            }
            .right-page::-webkit-scrollbar { display: none; }

            .story-title { 
                font-size: 3.8rem; font-weight: 800; color: #2c3e50; 
                text-align: center; margin-bottom: 30px; 
                border-bottom: 4px solid #d2b48c; display: block;
            }

            .story-content { 
                font-size: 2.4rem; /* مقروء جداً من 4 أمتار */
                line-height: 1.5; text-align: left; font-weight: 500;
            }

            .story-content b { color: #d35400; font-weight: 900; }
            hr { border: none; height: 2px; background: #e0e0e0; margin: 40px 0; }

            /* أنيميشن بسيط عند التقليب */
            .img-zoom { transform: scale(1.08); }
        </style>

        <div class="book-wrapper">
            <div class="book-spine"></div>
            
            <div class="page left-page">
                <div class="image-frame">
                    <img src="data/reading/${partNumber}.png" id="main-img" 
                         onerror="this.src='https://via.placeholder.com/800x1000/fff/333?text=Part+${partNumber}'">
                </div>
            </div>

            <div class="page right-page" id="story-scroller">
                <h1 class="story-title">${storyTitle}</h1>
                <div class="story-content">
                    ${storyText.replace(/Clay/g, '<b>Clay</b>').replace(/\n/g, '<br>')}
                </div>
            </div>
        </div>
    `;

    const mainImg = document.getElementById('main-img');
    let isAnimating = false;

    function triggerImgAnim() {
        if (isAnimating) return;
        isAnimating = true;
        mainImg.classList.add('img-zoom');
        setTimeout(() => {
            mainImg.classList.remove('img-zoom');
            isAnimating = false;
        }, 1000);
    }

    // التحكم بالاختصارات (Enter, Space, Arrows)
    document.onkeydown = (e) => {
        const scroller = document.getElementById('story-scroller');
        const scrollAmount = window.innerHeight * 0.4; // سكرول بنسبة 40% من ارتفاع الشاشة
        
        if (e.keyCode === 32 || e.keyCode === 40 || e.keyCode === 13) { // Space, Down, Enter
            scroller.scrollBy({ top: scrollAmount, behavior: 'smooth' });
            triggerImgAnim();
            e.preventDefault();
        } else if (e.keyCode === 38) { // Up Arrow
            scroller.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
            triggerImgAnim();
            e.preventDefault();
        }
    };
})();
