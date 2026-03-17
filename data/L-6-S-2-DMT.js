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
            .dmt-subtitle { font-size: 1rem; color: #64748b; margin-bottom: 40px; text-transform: uppercase; letter-spacing: 6px; font-weight: 700; }
            
            .analog-clock {
                width: 380px; height: 380px;
                border: 15px solid #1e293b;
                border-radius: 50%;
                position: relative;
                display: flex; justify-content: center; align-items: center;
                background: radial-gradient(circle, #0f172a 0%, #020617 100%);
                box-shadow: 0 0 80px rgba(56, 189, 248, 0.15);
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
                border: 3px solid #38bdf8;
                border-radius: 20px;
                display: flex; justify-content: center; align-items: center;
                font-size: 4rem; font-weight: 900; color: #fff;
                box-shadow: inset 0 0 20px rgba(56, 189, 248, 0.1);
                z-index: 3;
            }

            .controls { margin-top: 50px; display: flex; gap: 25px; }
            .btn {
                padding: 18px 45px; font-size: 1.2rem; font-weight: 800; border: none; border-radius: 15px;
                cursor: pointer; transition: 0.3s; text-transform: uppercase; letter-spacing: 2px;
            }
            .btn-start { background: #0ea5e9; color: #fff; box-shadow: 0 6px 0 #0369a1; }
            .btn-reset { background: #334155; color: #fff; box-shadow: 0 6px 0 #1e293b; }
            .btn:active { transform: translateY(4px); box-shadow: none; }
            .btn:disabled { opacity: 0.5; cursor: not-allowed; }
            
            .dot { position: absolute; width: 4px; height: 4px; background: #334155; border-radius: 50%; }
        </style>

            <div class="dmt-title">Double Minutes Talk</div>
            <div class="dmt-subtitle">Speak freely • Speak proudly</div>

            <div class="analog-clock" id="clock">
                <div class="hand" id="secondHand"></div>
                <div class="digital-box" id="digitalTimer">02:00</div>
            </div>

            <div class="controls">
                <button class="btn btn-start" id="btnStart">Start</button>
                <button class="btn btn-reset" id="btnReset">Reset</button>
            </div>
            
            <audio id="bellSound" src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3"></audio>
    `;

    const hand = document.getElementById('secondHand');
    const digital = document.getElementById('digitalTimer');
    const startBtn = document.getElementById('btnStart');
    const resetBtn = document.getElementById('btnReset');
    const bell = document.getElementById('bellSound');

    for (let i = 0; i < 60; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i % 5 === 0) { dot.style.width = '8px'; dot.style.height = '8px'; dot.style.background = '#475569'; }
        const angle = i * 6;
        dot.style.transform = `rotate(${angle}deg) translateY(-175px)`;
        document.getElementById('clock').appendChild(dot);
    }

    function updateDisplay() {
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        digital.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        const rotation = (120 - timeLeft) * 6; 
        hand.style.transform = `translateX(-50%) rotate(${rotation}deg)`;

        if (timeLeft <= 10) {
            digital.style.color = '#ef4444';
            digital.style.borderColor = '#ef4444';
            hand.style.background = '#ef4444';
            hand.style.boxShadow = '0 0 20px #ef4444';
        } else {
            digital.style.color = '#fff';
            digital.style.borderColor = '#38bdf8';
            hand.style.background = '#38bdf8';
            hand.style.boxShadow = '0 0 15px #38bdf8';
        }
    }

    startBtn.onclick = () => {
        if (isRunning) {
            clearInterval(timerInterval);
            startBtn.innerText = "Resume";
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
                    startBtn.innerText = "Time's Up!";
                    startBtn.disabled = true;
                }
            }, 1000);
        }
    };

    resetBtn.onclick = () => {
        clearInterval(timerInterval);
        timeLeft = 120;
        isRunning = false;
        startBtn.innerText = "Start";
        startBtn.disabled = false;
        startBtn.style.background = "#0ea5e9";
        startBtn.style.boxShadow = "0 6px 0 #0369a1";
        updateDisplay();
    };

})();
