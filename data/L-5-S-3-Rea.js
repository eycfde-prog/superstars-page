(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    const partNumber = 17; 
    const storyTitle = "The Forbidden Voice";
    const storyText = `The guards told "Clay" he must work. Because of his injured leg, he could not do heavy work with the men. Instead, he sat with the women in the market. He learned to carve bone and wood to make beautiful necklaces. Because "Clay" could see, his work was perfect and very fast.
The women liked "Mr. Sayyah"—the name they gave "Clay". They bought everything he made. However, the men in the village were jealous. they called "Clay" an animal and a "deformed" creature. They said he was an ill omen because of his strange eyes and loud voice.
One day, two men insulted "Clay" loudly. "Clay" became very angry. He remembered how he sacrificed his freedom to save them. He lost control and shouted, "I am better than you because I see what you cannot see!"
In the quiet valley, his human voice was like a loud explosion. The sound was so strong that it hurt everyone. Two women fell to the ground because the noise was too much. The market became silent and terrified. "Clay" looked at the pain on their faces and felt deep shame. He realized his voice was now a dangerous weapon. He quickly gathered his things and ran back to his tent to hide from his own guilt.`;

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
                             onerror="this.src='https://via.placeholder.com/800x1000/d9cfb9/4a2e15?text=${storyTitle.replace(/ /g, '+')}控制'">
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
