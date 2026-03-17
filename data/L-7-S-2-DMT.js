(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    let timeLeft = 120; // 2 Minutes
    let timerInterval = null;
    let isRunning = false;

    container.innerHTML = '';
    container.style.cssText = `height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; background:#020617; color:#fff; font-family: 'Inter', sans-serif; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Inter:wght@400;900&display=swap');

            .dmt-header { text-align: center; margin-bottom: 30px; }
            .dmt-title { font-size: 3.5rem; font-weight: 900; color: #38bdf8; text-transform: uppercase; letter-spacing: 2px; }
            .dmt-subtitle { font-size: 1.1rem; color: #64748b; letter-spacing: 5px; }

            .clock-wrapper {
                position: relative;
                width: 400px; height: 400px;
                display: flex; justify-content: center; align-items: center;
                background: radial-gradient(circle, #0f172a 60%, #38bdf822 100%);
                border: 8px solid #1e293b;
                border-radius: 50%;
                box-shadow: 0 0 80px rgba(56, 189, 248, 0.1);
            }

            .hand {
                position: absolute; bottom: 50%; left: 50%;
                width: 4px; height: 160px;
                background: #38bdf8;
                transform-origin: bottom;
                transform: translateX(-50%) rotate(0deg);
                transition: transform 1s linear;
                border-radius: 10px;
                box-shadow: 0 0 15px #38bdf8;
                z-index: 2;
            }

            .digital-display {
                width: 200px; height: 100px;
                background: #020617;
                border: 2px solid #1e293b;
                border-radius: 20px;
                display: flex; justify-content: center; align-items: center;
                font-size: 4rem; font-weight: 700; color: #fff;
                font-family: 'Orbitron', sans-serif;
                z-index: 3;
                box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
            }

            .controls { margin-top: 40px; display: flex; gap: 20px; }
            .btn {
                padding: 18px 50px; font-size: 1.4rem; font-weight: 800; border: none; border-radius: 15px;
                cursor: pointer; transition: 0.3s; text-transform: uppercase; font-family: 'Inter', sans-serif;
            }
            .btn-start { background: #0ea5e9; color: #fff; box-shadow: 0 6px 0 #0369a1; }
            .btn-reset { background: #334155; color: #fff; box-shadow: 0 6px 0 #1e293b; }
            .btn:active { transform: translateY(4px); box-shadow: none; }
            .btn:disabled { opacity: 0.5; cursor: not-allowed; }

            .marking { position: absolute; width: 2px; height: 15px; background: #334155; }
        </style>

        <div class="dmt-header">
            <div class="dmt-title">2 Minute Challenge</div>
            <div class="dmt-subtitle">LEVEL 7 • SESSION 2</div>
        </div>

        <div class="clock-wrapper" id="clock">
            <div class="hand" id="secondHand"></div>
            <div class="digital-display" id="digitalTimer">02:00</div>
        </div>

        <div class="controls">
            <button class="btn btn-start" id="btnStart">Start Talk</button>
            <button class="btn btn-reset" id="btnReset">Reset</button>
        </div>
        
        <audio id="bellSound" src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3"></audio>
    `;

    const hand = document.getElementById('secondHand');
    const digital = document.getElementById('digitalTimer');
    const startBtn = document.getElementById('btnStart');
    const resetBtn = document.getElementById('btnReset');
    const bell = document.getElementById('bellSound');

    // Add markings to the clock
    for (let i = 0; i < 60; i++) {
        const mark = document.createElement('div');
        mark.className = 'marking';
        mark.style.transform = `rotate(${i * 6}deg) translateY(-185px)`;
        if (i % 5 === 0) {
            mark.style.height = '25px';
            mark.style.background = '#64748b';
            mark.style.width = '4px';
        }
        document.getElementById('clock').appendChild(mark);
    }

    function updateDisplay() {
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        digital.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        
        const rotation = (120 - timeLeft) * 3; // For 2 minutes, 1.5 deg per second if 360, but we want 2 full circles or 1? Let's do 1 full circle for the whole 2 mins
        hand.style.transform = `translateX(-50%) rotate(${(120 - timeLeft) * 3}deg)`;

        if (timeLeft <= 10) {
            digital.style.color = '#ef4444';
            digital.style.textShadow = '0 0 20px #ef444455';
            hand.style.background = '#ef4444';
            hand.style.boxShadow = '0 0 15px #ef4444';
        } else {
            digital.style.color = '#fff';
            hand.style.background = '#38bdf8';
        }
    }

    function startTimer() {
        if (isRunning) {
            clearInterval(timerInterval);
            startBtn.innerText = "Resume Talk";
            startBtn.style.background = "#0ea5e9";
            isRunning = false;
        } else {
            isRunning = true;
            startBtn.innerText = "Pause";
            startBtn.style.background = "#f59e0b";
            startBtn.style.boxShadow = "0 6px 0 #b45309";
            timerInterval = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateDisplay();
                } else {
                    clearInterval(timerInterval);
                    bell.play();
                    startBtn.innerText = "Well Done!";
                    startBtn.style.background = "#22c55e";
                    startBtn.style.boxShadow = "0 6px 0 #15803d";
                    startBtn.disabled = true;
                }
            }, 1000);
        }
    }

    function resetTimer() {
        clearInterval(timerInterval);
        timeLeft = 120;
        isRunning = false;
        startBtn.innerText = "Start Talk";
        startBtn.disabled = false;
        startBtn.style.background = "#0ea5e9";
        startBtn.style.boxShadow = "0 6px 0 #0369a1";
        updateDisplay();
    }

    startBtn.onclick = startTimer;
    resetBtn.onclick = resetTimer;

})();
