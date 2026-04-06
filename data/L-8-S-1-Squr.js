(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    const questions = [
        "Did you sleep well last night?",
        "Was it sunny yesterday?",
        "Were you at the cinema on Friday?",
        "Did you have breakfast this morning?",
        "Was the exam difficult?",
        "Were your friends with you at the park?",
        "Did you do your homework yesterday?",
        "Was Albert Einstein a famous scientist?",
        "Were the shops open yesterday?",
        "Did it rain two days ago?",
        "Was your first teacher a woman?",
        "Did you watch a movie last night?",
        "Were you born in Cairo?",
        "Did your father drive you to school?",
        "Was the coffee hot?",
        "Did you see your best friend today?",
        "Were the dinosaurs very big?",
        "Did you go to the beach last summer?",
        "Was the car expensive?",
        "Were you happy when you won?",
        "Did you buy new shoes recently?",
        "Was the street crowded this morning?",
        "Did you use your phone an hour ago?",
        "Were the keys on the table?",
        "Was your father angry with you?",
        "Did you eat pizza for lunch?",
        "Were we late for the lesson?",
        "Did you finish the task on time?",
        "Was Titanic a real ship?",
        "Did you like the story?"
    ];

    let currentIdx = 0;
    const totalQuestions = questions.length;
    const folderNumber = 3; 

    container.innerHTML = '';
    container.style.cssText = `height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; background:#020b12; color:#eee; font-family:'Inter', sans-serif; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            @keyframes pulseShadow {
                0% { text-shadow: 0 0 20px rgba(241, 196, 15, 0.2); }
                50% { text-shadow: 0 0 40px rgba(241, 196, 15, 0.5); }
                100% { text-shadow: 0 0 20px rgba(241, 196, 15, 0.2); }
            }
            .sq-header { position:absolute; top:40px; width:90%; display:flex; justify-content:space-between; align-items:center; }
            .sq-title { font-size:1.2rem; color:#f1c40f; font-weight:900; letter-spacing:4px; text-transform:uppercase; border-left:4px solid #f1c40f; padding-left:15px; }
            .sq-tag { background:rgba(241,196,15,0.1); color:#f1c40f; padding:8px 20px; border-radius:30px; border:1px solid rgba(241,196,15,0.3); font-weight:bold; }
            .sq-main { font-size:5.5rem; text-align:center; max-width:85%; line-height:1.2; font-weight:900; animation: pulseShadow 3s infinite ease-in-out; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
            .sq-footer { position:absolute; bottom:50px; display:flex; gap:20px; }
            .sq-btn { background:#f1c40f; color:#020b12; border:none; padding:18px 45px; font-size:1.1rem; cursor:pointer; border-radius:12px; font-weight:900; transition:0.3s; text-transform:uppercase; letter-spacing:1px; }
            .sq-btn:hover { background:#fff; transform:translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.4); }
            .sq-progress { position:absolute; bottom:0; left:0; height:6px; background:#f1c40f; transition:0.4s; }
        </style>
        
        <div class="sq-header">
            <div class="sq-title">Squeezer Level 8</div>
            <div class="sq-tag">History: Was - Were - Did</div>
        </div>
        
        <div id="sqDisplay" class="sq-main">${questions[currentIdx]}</div>
        
        <div class="sq-footer">
            <button class="sq-btn" id="sqBack">Previous</button>
            <button class="sq-btn" id="sqNext">Next Question</button>
        </div>
        
        <div id="sqProgressBar" class="sq-progress" style="width:0%"></div>
        <audio id="sqAudio"></audio>
    `;

    const display = document.getElementById('sqDisplay');
    const audio = document.getElementById('sqAudio');
    const progress = document.getElementById('sqProgressBar');
    const nextBtn = document.getElementById('sqNext');
    const backBtn = document.getElementById('sqBack');

    function update(idx) {
        display.style.opacity = '0';
        display.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            display.innerText = questions[idx];
            display.style.opacity = '1';
            display.style.transform = 'scale(1)';
            progress.style.width = `${((idx + 1) / totalQuestions) * 100}%`;
        }, 300);

        const path = `data/Squeezer/${folderNumber}/${idx + 1}.wav`;
        audio.src = path;
        audio.play().catch(() => console.log("Audio Syncing..."));
    }

    nextBtn.onclick = () => {
        if (currentIdx < totalQuestions - 1) {
            currentIdx++;
            update(currentIdx);
        } else {
            display.innerHTML = "<span style='color:#f1c40f'>PAST MASTERED!</span>";
        }
    };

    backBtn.onclick = () => {
        if (currentIdx > 0) {
            currentIdx--;
            update(currentIdx);
        }
    };

    document.onkeydown = (e) => {
        if (e.key === "ArrowRight" || e.key === " ") nextBtn.click();
        if (e.key === "ArrowLeft") backBtn.click();
    };

    update(0);
})();
