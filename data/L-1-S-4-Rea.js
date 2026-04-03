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
            /* حاوية الكتاب - زيادة سمك الصفحات الجانبية */
            .book-wrapper {
                position: relative; width: 92%; height: 88vh;
                background: #f4ecd8; border-radius: 4px;
                /* تأثير طبقات الورق الكثيفة على الأطراف */
                box-shadow: 
                    5px 0 0 -2px #d2b48c, 10px 0 0 -4px #f4ecd8, 15px 0 0 -6px #d2b48c,
                    -5px 0 0 -2px #d2b48c, -10px 0 0 -4px #f4ecd8, -15px 0 0 -6px #d2b48c,
                    0 30px 60px rgba(0,0,0,0.8);
            }

            .book-content {
                display: flex; width: 100%; height: 100%; position: relative;
                overflow: hidden; border: 1px solid rgba(0,0,0,0.2);
            }

            /* الفاصل الأوسط بتأثير الانتفاخ (The Spine Bump) */
            .book-spine-area {
                position: absolute; left: 50%; top: 0; width: 80px; height: 100%;
                z-index: 10; transform: translateX(-50%);
                display: flex;
            }
            /* الظل اليمين واليسار لخلق إيحاء الانتفاخ */
            .spine-left { flex: 1; background: linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%); }
            .spine-right { flex: 1; background: linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%); }
            .spine-center { width: 4px; background: rgba(0,0,0,0.3); box-shadow: 0 0 10px rgba(0,0,0,0.5); }

            /* الصفحة اليسرى واليمنى مع تأثير الانحناء الخفيف */
            .page {
                flex: 1; background: #f4ecd8; position: relative;
                box-shadow: inset 0 0 100px rgba(0,0,0,0.05);
            }

            .left-page {
                display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 50px;
                background: linear-gradient(90deg, #ede3c8 0%, #f4ecd8 20%);
            }

            /* حاوية الصورة مع أنيميشن */
            .image-box {
                width: 90%; height: 80%; border: 15px solid #fff; outline: 1px solid #d2b48c;
                box-shadow: 0 15px 35px rgba(0,0,0,0.3); overflow: hidden;
                transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
            }
            .image-box img { width: 100%; height: 100%; object-fit: cover; transition: scale 0.8s; }

            .right-page {
                padding: 4vw 5vw; overflow-y: auto; color: #2c2c2c;
                background: linear-gradient(-90deg, #ede3c8 0%, #f4ecd8 20%);
                scrollbar-width: none;
            }
            .right-page::-webkit-scrollbar { display: none; }

            .story-title { font-size: 3.2vw; color: #5d3a1a; text-align: center; margin-bottom: 30px; font-variant: small-caps; border-bottom: 3px double #d2b48c; }
            .story-content { font-size: 2.4vw; line-height: 1.7; text-align: justify; }
            b { color: #b08d57; font-weight: 900; }
            hr { border: none; height: 1px; background: #d2b48c; margin: 40px 0; opacity: 0.5; }

            /* كلاس الأنيميشن عند السكرول */
            .img-bump { transform: scale(1.03) rotate(1deg); }
        </style>

        <div class="book-wrapper">
            <div class="book-content">
                <div class="book-spine-area">
                    <div class="spine-left"></div>
                    <div class="spine-center"></div>
                    <div class="spine-right"></div>
                </div>
                
                <div class="page left-page">
                    <div class="image-box" id="book-img-box">
                        <img src="data/reading/${partNumber}.png" id="main-img"
                             onerror="this.src='https://via.placeholder.com/800x1000/f4ecd8/8b4513?text=Veto+Illustration'">
                    </div>
                </div>

                <div class="page right-page" id="story-scroller">
                    <h1 class="story-title">${storyTitle}</h1>
                    <div class="story-content">
                        ${storyText.replace(/Clay/g, '<b>Clay</b>').replace(/\n/g, '<br>')}
                    </div>
                </div>
            </div>
        </div>
    `;

    // --- منطق التحكم والأنيميشن ---
    const imgBox = document.getElementById('book-img-box');
    const mainImg = document.getElementById('main-img');
    let scrollTimeout;

    function triggerImgAnim() {
        imgBox.classList.add('img-bump');
        mainImg.style.scale = "1.1";
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            imgBox.classList.remove('img-bump');
            mainImg.style.scale = "1";
        }, 400);
    }

    document.onkeydown = (e) => {
        const scroller = document.getElementById('story-scroller');
        const step = 180;
        
        if (e.keyCode === 32 || e.keyCode === 40 || e.keyCode === 13) { // Space, Down, Enter
            scroller.scrollBy({ top: step, behavior: 'smooth' });
            triggerImgAnim();
        } else if (e.keyCode === 38) { // Up
            scroller.scrollBy({ top: -step, behavior: 'smooth' });
            triggerImgAnim();
        }
    };
})();
