(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // كلمات لغز الغرفة الحديدية
    const words = [
        "ambitious", "manuscripts", "legend", "treasures", "frustrating", 
        "parchment", "valley", "thorny", "coordinates", "excavate", 
        "labor", "rusted", "creak", "tunnel", "magnificent", 
        "jewels", "mysterious", "original", "shudder", "artifact", 
        "collapsed", "victorious", "fortune"
    ];

    let remainingWords = [...words];
    let currentTargetId = null;

    const storyTitle = "The Mystery of the Iron Chamber";
    
    let storyContent = `
        Arthur was an <span class="word-gap" data-word="ambitious">?</span> archaeologist who spent his entire life studying ancient <span class="word-gap" data-word="manuscripts">?</span>. 
        He was obsessed with the <span class="word-gap" data-word="legend">?</span> of the "Iron Chamber," a hidden vault said to contain the lost <span class="word-gap" data-word="treasures">?</span> of a forgotten king. 
        After years of <span class="word-gap" data-word="frustrating">?</span> dead ends, he finally discovered a dusty <span class="word-gap" data-word="parchment">?</span> hidden behind a brick wall.
        <br><br>
        The map led him to a remote <span class="word-gap" data-word="valley">?</span> where the ground was covered in thick, <span class="word-gap" data-word="thorny">?</span> bushes. 
        Following the <span class="word-gap" data-word="coordinates">?</span> on the map, Arthur began to <span class="word-gap" data-word="excavate">?</span> near an old, dried-up well. 
        After hours of intense <span class="word-gap" data-word="labor">?</span>, his shovel hit something solid. It wasn't a rock; it was a heavy, <span class="word-gap" data-word="rusted">?</span> metal hatch.
        <br><br>
        With a loud <span class="word-gap" data-word="creak">?</span>, the hatch opened, revealing a dark <span class="word-gap" data-word="tunnel">?</span> that smelled of damp earth and <span class="word-gap" data-word="ancient">?</span> dust. 
        Arthur descended into the darkness, his flashlight cutting through the gloom. As he reached the bottom, he found himself in a <span class="word-gap" data-word="magnificent">?</span> room filled with golden statues and sparkling <span class="word-gap" data-word="jewels">?</span>.
        <br><br>
        However, in the center of the room sat a <span class="word-gap" data-word="mysterious">?</span> stone box with a riddle carved into its lid. 
        Arthur realized the treasure wasn't just gold; it was a collection of <span class="word-gap" data-word="original">?</span> records that could change history. 
        Suddenly, the walls began to <span class="word-gap" data-word="shudder">?</span>. Arthur grabbed a small <span class="word-gap" data-word="artifact">?</span> and climbed out just before the tunnel <span class="word-gap" data-word="collapsed">?</span>. 
        He stood in the sunlight, exhausted but <span class="word-gap" data-word="victorious">?</span>. He knew the knowledge he saved was the greatest <span class="word-gap" data-word="fortune">?</span> of all.
    `;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; width:100%; display:block; background:#1a140f; color:#d4c4a8; overflow-y:auto; padding:0; font-family: 'Cinzel', serif; scroll-behavior: smooth;`;

    container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;900&family=Quattrocento:wght@400;700&display=swap');
            
            #stage-content::-webkit-scrollbar { width: 10px; }
            #stage-content::-webkit-scrollbar-track { background: #1a140f; }
            #stage-content::-webkit-scrollbar-thumb { background: #8b7355; border-radius: 5px; }

            .story-wrapper {
                max-width: 92%;
                margin: 40px auto;
                background: url('https://www.transparenttextures.com/patterns/dark-matter.png'), #2c241a;
                padding: 60px 50px;
                border-radius: 15px;
                box-shadow: inset 0 0 100px rgba(0,0,0,0.8), 0 20px 40px rgba(0,0,0,0.5);
                border: 2px solid #5d4a37;
                position: relative;
            }

            .story-title {
                color: #c5a059;
                text-align: center;
                font-size: 4rem;
                font-weight: 900;
                margin-bottom: 50px;
                font-family: 'Cinzel', serif;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
                text-transform: uppercase;
                border-bottom: 2px solid #5d4a37;
                padding-bottom: 20px;
            }

            .story-body {
                line-height: 2.3;
                font-size: 2.6rem;
                color: #d4c4a8;
                text-align: justify;
                font-family: 'Quattrocento', serif;
            }

            .word-gap {
                display: inline-block;
                min-width: 130px;
                border-bottom: 3px solid #8b7355;
                text-align: center;
                color: #c5a059;
                cursor: pointer;
                transition: 0.3s;
                font-style: italic;
                margin: 0 5px;
            }

            .word-gap:hover {
                color: #f3e5ab;
                border-bottom-color: #f3e5ab;
                background: rgba(197, 160, 89, 0.1);
            }

            .word-gap.filled {
                border-bottom: none;
                color: #f3e5ab;
                font-weight: bold;
                font-style: normal;
                animation: treasureGlow 0.8s ease-out;
            }

            @keyframes treasureGlow {
                0% { text-shadow: 0 0 0px #fff; transform: scale(1); }
                50% { text-shadow: 0 0 20px #c5a059, 0 0 40px #f3e5ab; transform: scale(1.1); }
                100% { text-shadow: 0 0 5px #c5a059; transform: scale(1); }
            }

            #word-overlay {
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(26, 20, 15, 0.98);
                display: none;
                flex-wrap: wrap;
                justify-content: center;
                align-content: center;
                gap: 12px;
                padding: 40px;
                z-index: 10000;
            }

            .choice-btn {
                background: #3d3226;
                color: #d4c4a8;
                padding: 12px 25px;
                font-size: 2.1rem;
                font-weight: 700;
                border: 2px solid #5d4a37;
                cursor: pointer;
                font-family: 'Cinzel', serif;
                transition: 0.2s;
            }

            .choice-btn:hover {
                background: #c5a059;
                color: #1a140f;
                box-shadow: 0 0 15px #c5a059;
            }

            .choice-btn.wrong {
                animation: collapseShake 0.4s;
                background: #4a1a1a !important;
                border-color: #7f1d1d;
            }

            @keyframes collapseShake {
                0%, 100% { transform: translateY(0); }
                20%, 60% { transform: translateY(-5px); }
                40%, 80% { transform: translateY(5px); }
            }

            .one-shot-badge {
                position: absolute;
                top: -20px;
                left: 50%;
                transform: translateX(-50%);
                background: #8b7355;
                color: #1a140f;
                padding: 5px 40px;
                font-weight: 900;
                font-size: 1.4rem;
                font-family: 'Cinzel', serif;
                letter-spacing: 2px;
            }
        </style>

        <div id="word-overlay"></div>

        <div class="story-wrapper">
            <div class="one-shot-badge">ARCHAEOLOGY DEPT.</div>
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
