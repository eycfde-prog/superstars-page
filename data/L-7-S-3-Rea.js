(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- التعديلات المطلوبة (الجزء الرابع والعشرون) ---
    const partNumber = 24; 
    const storyTitle = "The Shadow in the Cave";
    const storyText = `Everything was white and quiet. "Clay" rode his horse, carrying his food and tools. He used the horse to rest his bad leg and to go around the mountains if the cave plan failed. He remembered stories from "Malika" about dangerous wolves. He also thought about the "Great Crater Cave," a place where people get lost forever. He almost turned back, but he preferred freedom over living in the valley with people who used human bones for jewelry.
"Clay" reached the giant, dark cave. He was tired, so he decided to camp. He tied his horse inside the cave entrance and put his tent outside. He caught a fish, cooked it, and went to sleep.
In the middle of the night, a terrible pain woke him up. A wolf was biting his bad leg and pulling him across the ice. "Clay" tried to grab the ground, but the wolf was too strong. He realized his weapon was back in the tent. As they passed the small fishing hole he made earlier, "Clay" stuck his arm deep into the ice to stop the wolf. The wolf then tried to bite his neck. Quickly, "Clay" splashed cold water into the wolf's eyes.
The wolf moved back, and "Clay" crawled into the cave. The wolf jumped toward him for one last attack but suddenly stopped. It looked terrified and ran away into the snow. "Clay" was confused and scared. He looked behind him. His horse was shaking with fear. On the cave wall, he saw a huge shadow of something moving slowly. Suddenly, the horse disappeared instantly. "Clay" was terrified and crawled back, trapped between the wolf outside and the monster inside.`;
    // ---------------------------------------

    container.innerHTML = ''; 
    container.style.cssText = `
        height:100%; width:100%; display:flex; justify-content:center; align-items:center; 
        background: radial-gradient(circle, #1a1a1a 0%, #000 100%); overflow:hidden; font-family: 'Georgia', serif;
    `;

    container.innerHTML = `
        <style>
            .book-wrapper {
                position: relative; width: 96%; height: 94vh;
                background: #d9cfb9; border-radius: 4px;
                box-shadow: 
                    8px 0 0 -2px #b8a689, 16px 0 0 -4px #d9cfb9, 24px 0 0 -6px #b8a689,
                    -8px 0 0 -2px #b8a689, -16px 0 0 -4px #d9cfb9, -24px 0 0 -6px #b8a689,
                    0 40px 80px rgba(0,0,0,0.9);
                transition: all 0.3s ease;
            }

            .book-content {
                display: flex; width: 100%; height: 100%; position: relative;
                overflow: hidden; border: 1px solid rgba(0,0,0,0.1);
            }

            .book-spine-area {
                position: absolute; left: 50%; top: 0; width: 40px; height: 100%;
                z-index: 10; transform: translateX(-50%);
                display: flex; pointer-events: none;
            }
            .spine-left { flex: 1; background: linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 100%); }
            .spine-right { flex: 1; background: linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 100%); }
            .spine-center { width: 1px; background: rgba(0,0,0,0.1); }

            .page { flex: 1; background: #d9cfb9; position: relative; }

            .left-page {
                display: flex; justify-content: center; align-items: center; padding: 10px;
                background: linear-gradient(90deg, #c9beaa 0%, #d9cfb9 15%);
            }

            .image-box {
                width: 100%; height: 100%; 
                display: flex; justify-content: center; align-items: center;
                overflow: hidden; transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
            }

            .image-box img { 
                width: 100%; height: 100%; 
                object-fit: contain;
                mix-blend-mode: multiply;
                opacity: 0.9;
                transition: transform 0.8s ease;
            }

            .right-page {
                padding: 3vw 4vw; overflow-y: auto; color: #3a352a;
                background: linear-gradient(-90deg, #c9beaa 0%, #d9cfb9 15%);
                scrollbar-width: none;
            }
            .right-page::-webkit-scrollbar { display: none; }

            .story-title { font-size: 3vw; color: #4a2e15; text-align: center; margin-bottom: 20px; font-variant: small-caps; border-bottom: 2px solid #b8a689; padding-bottom: 10px; }
            .story-content { font-size: 2.2vw; line-height: 1.6; text-align: justify; }
            b { color: #8e6d3d; font-weight: 800; }
            hr { border: none; height: 1px; background: #b8a689; margin: 30px 0; opacity: 0.5; }

            .img-bump { transform: scale(1.03); }

            @media (max-width: 768px) {
                .book-content { flex-direction: column; }
                .book-spine-area { width: 100%; height: 20px; left: 0; top: 50%; transform: translateY(-50%); flex-direction: column; }
                .spine-left { background: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.15)); }
                .spine-right { background: linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,0.15)); }
                .story-title { font-size: 6vw; }
                .story-content { font-size: 5vw; }
            }
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
                             onerror="this.src='https://via.placeholder.com/800x1000/d9cfb9/4a2e15?text=${storyTitle.replace(/ /g, '+')}Text'">
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

    const imgBox = document.getElementById('book-img-box');
    const mainImg = document.getElementById('main-img');
    let scrollTimeout;

    function triggerImgAnim() {
        imgBox.classList.add('img-bump');
        mainImg.style.transform = "scale(1.08)";
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            imgBox.classList.remove('img-bump');
            mainImg.style.transform = "scale(1)";
        }, 500);
    }

    const scroller = document.getElementById('story-scroller');
    scroller.onscroll = () => triggerImgAnim();

    document.onkeydown = (e) => {
        const step = 150;
        if (e.keyCode === 32 || e.keyCode === 40 || e.keyCode === 13) {
            scroller.scrollBy({ top: step, behavior: 'smooth' });
        } else if (e.keyCode === 38) {
            scroller.scrollBy({ top: -step, behavior: 'smooth' });
        }
    };
})();
