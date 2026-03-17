(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    let timeLeft = 120; 
    let timerInterval = null;
    let isRunning = false;

    container.innerHTML = '';
    container.style.cssText = `height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; background:#020617; color:#fff; font-family: 'Inter', sans-serif; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;900&display=swap');
            
            .dmt-title { font-size: 3.5rem; font-weight: 900; color: #38bdf8; margin-bottom: 10px; text-transform: uppercase; letter-spacing: -2px; }
            .dmt-subtitle { font-size: 1rem; color: #475569; margin-bottom: 50px; text-transform: uppercase; letter-spacing: 6px; font-weight: 700; }
            
            .analog-clock {
                width: 380px; height: 380px;
                border: 15px solid #1e293b;
                border-radius: 50%;
                position: relative;
                display: flex; justify-content: center; align-items: center;
                background: #0f172a;
                box-shadow: 0 0 80px rgba(56, 189, 248, 0.15), inset 0 0 30px rgba(0,0,0,0.8);
            }

            .hand {
                position: absolute; bottom: 50%; left: 50%;
                width: 6px; height: 160px;
                background: #38bdf8;
                transform-origin: bottom;
                transform: translateX(-50%) rotate(0deg);
                transition: transform 1s cubic-bezier(0.4, 2.08, 0.55, 0.44);
                border-radius: 10px;
                box-shadow: 0 0 15px #38bdf8;
                z-index: 2;
            }

            .digital-box {
                width: 180px; height: 110px;
                background: #020617;
                border: 3px solid #1e293b;
                border-radius: 20px;
                display: flex; justify-content: center; align-items: center;
                font-size: 3.8rem; font-weight: 900; color: #fff;
                z-index: 3;
                transition: 0.3s;
            }

            .controls { margin-top: 60px; display: flex; gap: 25px; }
            .btn {
                padding: 18px 45px; font-size: 1.4rem; font-weight: 800; border: none; border-radius: 16px;
                cursor: pointer; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); text-transform: uppercase;
                letter-spacing: 1px;
            }
            .btn-start { background: #38bdf8; color: #020617; box-shadow: 0 6px 0 #0284c7; }
            .btn-reset { background: #1e293b; color: #94a3b8; box-shadow: 0 6px 0 #0f172a; }
            .btn:active { transform: translateY(4px); box-shadow: none; }
            .btn-start.paused { background: #fbbf24; box-shadow: 0 6px 0 #d97706; }
            
            .dot { position: absolute; width: 4px; height: 15px; background: #334155; border-radius: 2px; }

            @keyframes pulse-red {
                0% { box-shadow: 0 0 0px #ef4444; border-color: #ef4444; }
                50% { box-shadow: 0 0 40px #ef4444; border-color: #f87171; }
                100% { box-shadow: 0 0 0px #ef4444; border-color: #ef4444; }
            }
            .urgent { animation: pulse-red 1s infinite; color: #ef4444 !important; }
        </style>

        <div class="dmt-title">Double Minutes Talk</div>
        <div class="dmt-subtitle">Speak • Shine • Succeed</div>

        <div class="analog-clock" id="clock">
            <div class="hand" id="secondHand"></div>
            <div class="digital-box" id="digitalTimer">02:00</div>
        </div>

        <div class="controls">
            <button class="btn btn-start" id="btnStart">Start Talking</button>
            <button class="btn btn-reset" id="btnReset">Reset</button>
        </div>
        
        <audio id="bellSound" src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3"></audio>
    `;

    const hand = document.getElementById('secondHand');
    const digital = document.getElementById('digitalTimer');
    const startBtn = document.getElementById('btnStart');
    const resetBtn = document.getElementById('btnReset');
    const bell = document.getElementById('bellSound');

    // Hour markings
    for (let i = 0; i < 12; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        const angle = i * 30;
        dot.style.transform = `rotate(${angle}deg) translateY(-170px)`;
        document.getElementById('clock').appendChild(dot);
    }

    function updateDisplay() {
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        digital.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        
        // Rotation (120 seconds = 360 degrees)
        const rotation = (120 - timeLeft) * 3; 
        hand.style.transform = `translateX(-50%) rotate(${rotation}deg)`;

        if (timeLeft <= 10 && timeLeft > 0) {
            digital.classList.add('urgent');
            hand.style.background = '#ef4444';
        } else {
            digital.classList.remove('urgent');
            hand.style.background = '#38bdf8';
        }
    }

    function startTimer() {
        if (isRunning) {
            clearInterval(timerInterval);
            startBtn.innerText = "Resume";
            startBtn.classList.remove('paused');
            isRunning = false;
        } else {
            isRunning = true;
            startBtn.innerText = "Pause";
            startBtn.classList.add('paused');
            timerInterval = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateDisplay();
                } else {
                    clearInterval(timerInterval);
                    bell.play();
                    startBtn.innerText = "Time Up!";
                    startBtn.disabled = true;
                    digital.innerText = "FINISH";
                }
            }, 1000);
        }
    }

    function resetTimer() {
        clearInterval(timerInterval);
        timeLeft = 120;
        isRunning = false;
        startBtn.innerText = "Start Talking";
        startBtn.disabled = false;
        startBtn.classList.remove('paused');
        digital.classList.remove('urgent');
        updateDisplay();
    }

    startBtn.onclick = startTimer;
    resetBtn.onclick = resetTimer;

})();
