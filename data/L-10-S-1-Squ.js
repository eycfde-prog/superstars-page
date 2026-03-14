(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    const questions = [
        "Have you got a car?", "Has your father got a laptop?", "Have we finished the lesson yet?",
        "Has it rained today?", "Have your friends arrived yet?", "Has a spider got eight legs?",
        "Have you ever eaten sushi?", "Has your mother cooked lunch?", "Have you seen my keys?",
        "Has the movie started?", "Have they lived here for a long time?", "Has your best friend got a sister?",
        "Have you bought a new phone?", "Has a bird got wings?", "Have you ever been to Paris?",
        "Has the teacher checked your homework?", "Have we got enough water?", "Has the cat caught the mouse?",
        "Have you lost your wallet?", "Has your brother got a job?", "Have you understood the rule?",
        "Has a week got seven days?", "Have you washed your hands?", "Has the price of gold increased?",
        "Have you ever seen a ghost?", "Has your phone got a full battery?", "Have we met before?",
        "Has the rain stopped?", "Have you done your best today?", "Has the winter arrived?"
    ];

    let currentIdx = 0;
    const folderNumber = 5;

    container.innerHTML = '';
    container.style.cssText = `height:calc(100vh - 200px); display:flex; flex-direction:column; justify-content:center; align-items:center; background:#1a0f00; color:#fff; font-family: 'Verdana', sans-serif; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            .sq-counter { position:absolute; top:30px; left:50px; font-size:1.5rem; color:#ffa502; font-weight:bold; }
            .sq-question { font-size:5.5rem; text-align:center; max-width:85%; line-height:1.2; font-weight:bold; color:#ffffff; text-shadow: 3px 3px 0px #ffa502; transition: transform 0.2s; }
            .sq-controls { position:absolute; bottom:50px; display:flex; gap:20px; }
            .sq-btn { background:#ffa502; color:#1a0f00; border:none; padding:15px 40px; font-size:1.2rem; cursor:pointer; border-radius:8px; font-weight:bold; }
            .sq-indicator { position:absolute; top:30px; right:50px; font-size:1.3rem; border-bottom:3px solid #ffa502; padding:5px 10px; }
        </style>
        
        <div class="sq-counter">Squeezer #5</div>
        <div class="sq-indicator">Target: <span style="color:#ffa502">Have / Has</span></div>
        <div id="sqQuestionDisplay" class="sq-question">${questions[currentIdx]}</div>
        
        <div class="sq-controls">
            <button class="sq-btn" id="sqPrev">PREV</button>
            <button class="sq-btn" id="sqNext">NEXT</button>
        </div>
        <audio id="sqAudioPlayer"></audio>
    `;

    const display = document.getElementById('sqQuestionDisplay');
    const audioPlayer = document.getElementById('sqAudioPlayer');
    const btnNext = document.getElementById('sqNext');
    const btnPrev = document.getElementById('sqPrev');

    function updateSlide(index) {
        display.style.transform = 'scale(0.8)';
        setTimeout(() => {
            display.innerText = questions[index];
            display.style.transform = 'scale(1)';
        }, 100);

        const audioPath = `data/Squeezer/${folderNumber}/${index + 1}.mp3`;
        audioPlayer.src = audioPath;
        audioPlayer.play().catch(e => {});
    }

    btnNext.onclick = () => {
        if (currentIdx < questions.length - 1) { currentIdx++; updateSlide(currentIdx); }
    };

    btnPrev.onclick = () => {
        if (currentIdx > 0) { currentIdx--; updateSlide(currentIdx); }
    };

    document.onkeydown = (e) => {
        if (e.key === "ArrowRight" || e.key === " ") btnNext.click();
        if (e.key === "ArrowLeft") btnPrev.click();
    };

    updateSlide(0);
})();
