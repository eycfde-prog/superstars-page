(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    const partNumber = 18; 
    const storyTitle = "The Daughter’s Grace";
    const storyText = `"Clay" spent the entire day confined to his tent, consumed by intense anxiety and regret. He fumbled with his bag and prepared his gear, fully expecting the guards to storm in at any moment and throw him to the wolves. As he rubbed his lame leg, preparing for a suicidal escape, the pain became so sharp that he cried out. His cry coincided perfectly with a quiet, steady knock on his door.
His blood ran cold, but he resolved to face his fate. He breathed heavily and opened the door, only to see a face he least expected: "Malika"!
The daughter of the "Valley Chief" stood there with her usual dignity and a serene smile. For a moment, "Clay" feared something was wrong; he thought the princess herself coming to him might mean a punishment far worse than death. "What more could they do to me than the wolves' fangs?" he wondered. But "Malika" broke his dark thoughts, saying with gentle humor, "I did not know you were so stingy, Mr. "Clay", and so unwelcoming to your guests." "Clay" apologized awkwardly and stepped aside. "Malika" walked confidently, her hand reaching through the air above the chair and table without touching them, as if she were mentally mapping their positions. Then, she sat down with a precision that once again astonished "Clay".
To reassure her, he said calmly, "Do not worry, "Malika". Whatever happens, I will not use the flare in the valley." She smiled and replied wisely, "A person who chooses good does not change their mind easily, Mr. "Clay", and neither does someone who chooses evil."
"Clay" remained silent, still puzzled by the reason for her visit. "Malika" then explained that the "Chief" had learned the truth of what happened in the market. He had issued a just ruling in "Clay’s" favor after discovering the mockery of the two men. The "Chief" had appeased the victims, and the people—out of respect for "Clay’s" skill—had decided to forgive him. A wave of relief and gratitude washed over "Clay", and he felt ashamed of his earlier outburst.
" "Malika"," "Clay" suddenly asked, "do you believe, like them, that my eyes are animal organs that bring bad luck?" She answered honestly, "I cannot contradict my people, for I am one of them, but I do not see them as bad luck. I believe your eyes possess power, just as that flare does, and you alone decide how to use them."
The next morning, "Clay" went to the market with a contented spirit, exchanging smiles with the villagers who greeted him with renewed warmth. He sat practicing his art, feeling a rare sense of belonging. However, his happiness was short-lived; he spotted the two men who had caused his distress the day before approaching him.
The two men stopped directly in front of "Clay". He stared at their faces in terror; though their sockets were empty of eyes, their expressions held a sinister edge. At that moment, "Clay" realized that sight can sometimes deceive, but a person’s instinct for evil is never wrong. These men harbored ill intentions, and the justice he received yesterday was likely the fuel igniting their vengeance today.`;

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
