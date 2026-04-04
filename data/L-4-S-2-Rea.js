(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    const partNumber = 11; 
    const storyTitle = "The Silent Signal";
    const storyText = `The day dragged on like an eternity, a day consumed by deep sorrow. He missed "Malika", whose sleeping, peaceful face he was beginning to grow accustomed to. He felt a cold wall separating him from the rest of this valley. "Clay" remembered his students in "England" who loved his lessons and his neighbors who greeted him every morning. The thought of the doctors examining his eyes made his blood run cold.

Then, a glimmer of hope appeared: his equipment! "Has "John" survived? Is anyone looking for me?" he wondered. He rummaged through his belongings until he found his flare gun. There was only one shot—one single shot separating him from the outside world. He wanted to go out and fire it immediately, but he feared the guards might catch him. He decided to wait for the morning to fire it in front of everyone, hoping it would be his ticket out of this white prison. His thoughts were interrupted when a guard entered. The guard slammed a pot of soup to the ground, spilling half of it, and left without a word. As "Clay" looked at the cold food, he realized the true value of "Malika's" kindness and the hidden hatred the villagers felt for him.

The momentous day arrived. "Clay" was led through a large crowd of villagers. They were all eager to see the stranger with the "animal eyes" and the booming voice. The guards deliberately bumped into his shoulders as they marched him forward. However, he was not as afraid as before; he felt the cold metal of the flare gun hidden in his shirt, and his resolve strengthened.

But terror returned when he reached the end of the road. He saw a line of five men in mysterious cloaks. Before them stood a slanted wooden bench, like a beach chair, prepared for "Clay" to lie down. Behind them, the "Valley Chief" sat on his elevated platform, silently observing the scene.

"Clay" tried to banish his fear and felt for his pistol. He prayed that someone would see his signal in the sky and come to his rescue. Then, he stopped abruptly. If a mere human cry had knocked "Malika" unconscious, what would the boom of a flare gun do? The signal shot was not just a light; it was a deafening explosion that would shatter the stillness of the valley.

"Clay" realized that the shot he saw as a "ticket to freedom" would be a bomb for these people. It would tear their eardrums. They would lose their only sense of survival and their sole means of perceiving the world.

At that moment, "Clay" stood at an existential crossroads. His hand felt the hidden pistol while his mind grappled with two stark choices. Would he buy his freedom over the bodies of the innocent? Would he destroy the lives of an entire people, including "Malika", for a small chance of survival? Or would he accept the inevitable and allow the doctors to approach his eyes with their cold instruments to preserve his humanity?

The silence in the valley grew heavier. The absent eyes surrounded him, awaiting his next move. "Clay" looked up at the sky, then at the guards, then at the flare gun... and the bitterness of his choice choked him.`;

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
