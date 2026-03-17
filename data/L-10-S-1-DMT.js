(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    let timeLeft = 120; // دقيقتين
    let timerInterval = null;
    let isRunning = false;

    // --- التنسيق البصري الاحترافي (Veto Control Room) ---
    container.innerHTML = '';
    container.style.cssText = `height:100%; width:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; background:#050505; color:#fff; font-family:'Segoe UI', sans-serif; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            .dmt-title { font-size: 5vw; font-weight: 900; color: #c5a059; margin-bottom: 1vh; text-shadow: 0 0 30px rgba(197, 160, 89, 0.3); text-transform: uppercase; }
            .dmt-subtitle { font-size: 1.5vw; color: #555; margin-bottom: 5vh; text-transform: uppercase; letter-spacing: 6px; font-weight: bold; }
            
            .analog-clock {
                width: 45vh; height: 45vh;
                border: 15px solid #111;
                border-radius: 50%;
                position: relative;
                display: flex; justify-content: center; align-items: center;
                background: radial-gradient(circle, #0a0a0a 0%, #000 100%);
                box-shadow: 0 0 100px rgba(0,0,0,0.8), inset 0 0 30px rgba(197, 160, 89, 0.1);
                border: 8px solid #c5a059;
            }

            .hand {
                position: absolute; bottom: 50%; left: 50%;
                width: 6px; height: 18vh;
                background: #c5a059;
                transform-origin: bottom;
                transform: translateX(-50%) rotate(0deg);
                transition: transform 1s linear;
                border-radius: 10px;
                box-shadow: 0 0 15px #c5a059;
                z-index: 2;
            }

            .digital-box {
                width: 25vh; height: 15vh;
                background: #000;
                border: 3px solid #c5a059;
                border-radius: 20px;
                display: flex; justify-content: center; align-items: center;
                font-size: 6vw; font-weight: 900; color: #fff;
                box-shadow: 0 0 50px rgba(197, 160, 89, 0.1);
                z-index: 3;
            }

            .controls { margin-top: 6vh; display: flex; gap: 30px; }
            .btn {
                padding: 20px 60px; font-size: 2vw; font-weight: bold; border: none; border-radius: 50px;
                cursor: pointer; transition: 0.3s; text-transform: uppercase; letter-spacing: 2px;
            }
            .btn-start { background: #c5a059; color: #000; }
            .btn-reset { background: transparent; color: #555; border: 2px solid #333; }
            .btn:hover { transform: scale(1.1); filter: brightness(1.2); }
            
            .dot { position: absolute; width: 8px; height: 8px; background: #c5a059; border-radius: 50%; opacity: 0.3; }
            
            .pulse-danger { animation: danger-pulse 1s infinite; }
            @keyframes danger-pulse {
                0% { box-shadow: 0 0 20px rgba(197, 160, 89, 0.1); }
                50% { box-shadow: 0 0 60px rgba(239, 68, 68, 0.4); border-color: #ef4444; }
                100% { box-shadow: 0 0 20px rgba(197, 160, 89, 0.1); }
            }
        </style>

        <div class="dmt-title">Double Minutes Talk</div>
        <div class="dmt-subtitle">No Papers • No Fear • Just English</div>

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
    const clock = document.getElementById('clock');

    // توزيع النقاط الذهبية
    for (let i = 0; i < 12; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        const angle = i * 30;
        dot.style.transform = `rotate(${angle}deg) translateY(-21vh)`;
        clock.appendChild(dot);
    }

    function updateDisplay() {
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        digital.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        
        const rotation = (120 - timeLeft) * 6; 
        hand.style.transform = `translateX(-50%) rotate(${rotation}deg)`;

        if (timeLeft <= 10) {
            digital.style.color = '#ef4444';
            clock.classList.add('pulse-danger');
        } else {
            digital.style.color = '#fff';
            clock.classList.remove('pulse-danger');
        }
    }

    function startTimer() {
        if (isRunning) {
            clearInterval(timerInterval);
            startBtn.innerText = "Resume";
            startBtn.style.background = "#c5a059";
            isRunning = false;
        } else {
            isRunning = true;
            startBtn.innerText = "Pause";
            startBtn.style.background = "#f59e0b"; // برتقالي أثناء العمل
            timerInterval = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateDisplay();
                } else {
                    clearInterval(timerInterval);
                    bell.play();
                    startBtn.innerText = "Time's Up!";
                    startBtn.style.background = "#ef4444";
                    startBtn.disabled = true;
                    if (window.triggerVetoDone) window.triggerVetoDone();
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
        startBtn.style.background = "#c5a059";
        updateDisplay();
    }

    startBtn.onclick = startTimer;
    resetBtn.onclick = resetTimer;

    // دعم مفتاح المسافة لبدء/إيقاف الوقت
    document.onkeydown = (e) => {
        if (e.keyCode === 32) startTimer();
        if (e.keyCode === 82) resetTimer(); // حرف R للرستة
    };

})();
