(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // كلمات مدينة الصمت والتكنولوجيا
    const words = [
        "breath", "electronic", "innovation", "isolated", "engineer", 
        "longing", "abandoned", "bookshelf", "mechanical", "discs", 
        "intrigued", "vibrant", "overwhelming", "emotion", "discovery", 
        "plaza", "threatened", "accustomed", "invasion", "miraculous", 
        "decades", "hum", "authorities", "echoing", "efficiency", "soul"
    ];

    let remainingWords = [...words];
    let currentTargetId = null;

    const storyTitle = "The City of Silence";
    
    let storyContent = `
        In a future where technology controlled every <span class="word-gap" data-word="breath">?</span>, there was a place called the City of Silence. 
        Here, people didn't speak; they used <span class="word-gap" data-word="electronic">?</span> chips to send thoughts. 
        This <span class="word-gap" data-word="innovation">?</span> was supposed to make life easier, but it made the world feel <span class="word-gap" data-word="isolated">?</span> and cold.
        <br><br>
        Elias was a young <span class="word-gap" data-word="engineer">?</span> who felt a strange <span class="word-gap" data-word="longing">?</span> for the past. 
        He spent his weekends exploring the <span class="word-gap" data-word="abandoned">?</span> library. 
        While moving a heavy <span class="word-gap" data-word="bookshelf">?</span>, he discovered an old, <span class="word-gap" data-word="mechanical">?</span> object. 
        It was a gramophone—a machine that played music from large black <span class="word-gap" data-word="discs">?</span>.
        <br><br>
        Elias was <span class="word-gap" data-word="intrigued">?</span>. He repaired the device, and when the needle touched the surface, a <span class="word-gap" data-word="vibrant">?</span> melody filled the room. 
        The music was <span class="word-gap" data-word="overwhelming">?</span>, full of passion and <span class="word-gap" data-word="emotion">?</span>. 
        He decided to share this <span class="word-gap" data-word="discovery">?</span> with his fellow citizens in the central <span class="word-gap" data-word="plaza">?</span>.
        <br><br>
        At first, the people looked <span class="word-gap" data-word="threatened">?</span> by the noise. They were so <span class="word-gap" data-word="accustomed">?</span> to silence that the music felt like an <span class="word-gap" data-word="invasion">?</span>. 
        However, something <span class="word-gap" data-word="miraculous">?</span> happened. For the first time in <span class="word-gap" data-word="decades">?</span>, a girl began to <span class="word-gap" data-word="hum">?</span> along with the tune.
        <br><br>
        The <span class="word-gap" data-word="authorities">?</span> tried to stop Elias, but the city was <span class="word-gap" data-word="echoing">?</span> with song. 
        Elias realized that while technology can give us <span class="word-gap" data-word="efficiency">?</span>, only art can give us a <span class="word-gap" data-word="soul">?</span>.
    `;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:block; background:#0b0f19; color:#94a3b8; overflow-y:auto; padding:0; font-family: 'Space Grotesk', sans-serif; scroll-behavior: smooth;`;

    container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;700&family=Syncopate:wght@400;700&display=swap');
            
            #stage-content::-webkit-scrollbar { width: 10px; }
            #stage-content::-webkit-scrollbar-track { background: #0b0f19; }
            #stage-content::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 10px; }

            .story-wrapper {
                max-width: 90%;
                margin: 40px auto;
                background: linear-gradient(180deg, #111827, #0b0f19);
                padding: 60px 45px;
                border-radius: 20px;
                box-shadow: 0 0 50px rgba(59, 130, 246, 0.1);
                border: 1px solid #1e293b;
                position: relative;
                overflow: hidden;
            }

            .story-wrapper::before {
                content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 2px;
                background: linear-gradient(90deg, transparent, #3b82f6, transparent);
                animation: scanline 3s linear infinite;
            }

            @keyframes scanline { 0% { top: 0; } 100% { top: 100%; } }

            .story-title {
                color: #3b82f6;
                text-align: center;
                font-size: 4rem;
                font-weight: 700;
                margin-bottom: 50px;
                font-family: 'Syncopate', sans-serif;
                text-transform: uppercase;
                letter-spacing: 5px;
                text-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
            }

            .story-body {
                line-height: 2.2;
                font-size: 2.6rem;
                color: #cbd5e1;
                text-align: left;
                font-family: 'Space Grotesk', sans-serif;
            }

            .word-gap {
                display: inline-block;
                min-width: 130px;
                border: 1px solid #334155;
                background: rgba(30, 41, 59, 0.5);
                text-align: center;
                color: #60a5fa;
                cursor: pointer;
                transition: 0.3s;
                border-radius: 5px;
                padding: 0 10px;
                margin: 0 5px;
            }

            .word-gap:hover {
                background: #3b82f6;
                color: #fff;
                box-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
            }

            .word-gap.filled {
                border: none;
                color: #fcd34d;
                font-weight: bold;
                background: transparent;
                animation: soundWave 0.8s ease-out;
            }

            @keyframes soundWave {
                0% { transform: scale(1); text-shadow: 0 0 0px #fff; }
                50% { transform: scale(1.2); text-shadow: 0 0 20px #fcd34d; }
                100% { transform: scale(1); text-shadow: 0 0 10px #fcd34d; }
            }

            #word-overlay {
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(2, 6, 23, 0.98);
                display: none;
                flex-wrap: wrap;
                justify-content: center;
                align-content: center;
                gap: 15px;
                padding: 40px;
                z-index: 10000;
            }

            .choice-btn {
                background: #1e293b;
                color: #94a3b8;
                padding: 15px 30px;
                font-size: 2.2rem;
                font-weight: 600;
                border-radius: 10px;
                cursor: pointer;
                border: 1px solid #334155;
                font-family: 'Space Grotesk', sans-serif;
                transition: 0.2s;
            }

            .choice-btn:hover {
                background: #3b82f6;
                color: #fff;
                transform: scale(1.1);
            }

            .choice-btn.wrong {
                animation: glitch 0.3s infinite;
                background: #7f1d1d !important;
                border-color: #ef4444;
            }

            @keyframes glitch {
                0% { transform: translate(3px, 0); }
                50% { transform: translate(-3px, 0); }
                100% { transform: translate(0, 0); }
            }

            .one-shot-badge {
                position: absolute;
                top: 20px;
                right: 20px;
                border: 1px solid #3b82f6;
                color: #3b82f6;
                padding: 5px 15px;
                font-size: 1.2rem;
                font-family: 'Syncopate', sans-serif;
                border-radius: 4px;
                text-shadow: 0 0 5px #3b82f6;
            }
        </style>

        <div id="word-overlay"></div>

        <div class="story-wrapper">
            <div class="one-shot-badge">SYSTEM: REBOOTING_ART</div>
            <h1 class="story-title">${storyTitle}</h1>
            <div class="story-body">
                ${storyContent}
            </div>
        </div>
        <div style="height: 100px;"></div>
    `;

    const overlay = document.getElementById('word-overlay');

    const openOverlay = (target) => {
        currentTargetId = target;
        overlay.innerHTML = '';
        const shuffled = [...remainingWords].sort(() => Math.random() - 0.5);
        shuffled.forEach(word => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.innerText = word;
            btn.onclick = () => checkWord(word, btn);
            overlay.appendChild(btn);
        });
        overlay.style.display = 'flex';
    };

    const checkWord = (selectedWord, btnElement) => {
        const correctWord = currentTargetId.getAttribute('data-word');
        if (selectedWord.toLowerCase() === correctWord.toLowerCase()) {
            currentTargetId.innerText = correctWord;
            currentTargetId.classList.add('filled');
            overlay.style.display = 'none';
            remainingWords = remainingWords.filter(w => w !== selectedWord);
        } else {
            btnElement.classList.add('wrong');
            setTimeout(() => btnElement.classList.remove('wrong'), 400);
        }
    };

    document.querySelectorAll('.word-gap').forEach(gap => {
        gap.onclick = () => openOverlay(gap);
    });

    document.onkeydown = (e) => {
        if (e.keyCode === 32) if (window.triggerVetoDone) window.triggerVetoDone();
    };
})();
