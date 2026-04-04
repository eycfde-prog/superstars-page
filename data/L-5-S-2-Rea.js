(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    const partNumber = 15; 
    const storyTitle = "The Load Dust";
    const storyText = `"Clay" entered "Malika’s" tent and was greeted by a stillness unlike any he had experienced in any other corner of the valley. It was a silence so deep that he could hear his own heartbeat. "Malika" was sitting on her bed, surrounded by her maids. As soon as she sensed him, she gestured for him to sit and ordered everyone to leave, except for one old woman who remained quietly beside her. "Clay" whispered, asking how she was feeling. "Malika" smiled gently and reassured him that she had recovered since yesterday, though the doctors had kept her in bed. Then, she asked with concern about his eye and the examination. He replied that he was fine, but he could not hide his strong dislike for Dr. "Enzo".

"Malika" laughed, a sound that charmed him, and said, "You fell into "Enzo’s" hands? No one in the village can stand him except the "Chief" and his soldiers; even his assistants tremble in fear. But you should consider yourself lucky. He is the most skilled doctor the valley has ever known, and any patient would wish to receive his care."

"Malika" sensed a change in "Clay’s" breathing; she realized that the word "patient" had upset him, so she quickly apologized. "Clay" accepted her apology, but suddenly, she asked a question he least expected: "Why did you not use that device that makes such a loud noise, even though it could have saved you from the entire valley?" "Clay’s" heart stopped for a moment. How did she know about the flare gun? How could she understand its function when she did not even know the anatomy of human organs? Did everyone know it was hidden under his shirt while he thought he was invisible thanks to his sight?

Questions swirled in his mind like a whirlwind. He stared, mouth agape, waiting for an explanation from this girl who now seemed like a fortune teller. When his silence stretched on, "Malika" said, "I know questions are swirling in your mind right now, wondering how I can read your thoughts so easily." "Clay" recoiled slightly in alarm.

"Malika" stood up calmly, the old woman moving swiftly before her, while "Clay" remained rooted to the spot as if under a spell. "Come with me, Mr. "Clay"," she said. "I want to show you something." "Clay" followed her as if she were leading him by a string, until they reached a small table in the corner of the tent. On it sat a wooden box decorated with religious inscriptions. The old woman reached out and opened the box, revealing a silvery powder that shimmered with an unusual luster.`;

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
