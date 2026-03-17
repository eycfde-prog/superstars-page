(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    let timeLeft = 120; // دقيقتين بالثواني
    let timerInterval = null;
    let isRunning = false;

    container.innerHTML = '';
    container.style.cssText = `height:100%; width:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; background:#050505; color:#fff; font-family: 'Segoe UI', sans-serif; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            .dmt-header { text-align: center; margin-bottom: 4vh; z-index: 5; }
            .dmt-title { font-size: 4.5vw; font-weight: 900; color: #fff; text-transform: uppercase; margin: 0; letter-spacing: 2px; }
            .dmt-subtitle { font-size: 1.2vw; color: #c5a059; letter-spacing: 5px; font-weight: bold; }
            
            .clock-wrapper {
                position: relative;
                width: 450px; height: 450px;
                display: flex; justify-content: center; align-items: center;
                border-radius: 50%;
                background: #0a0a0a;
                border: 4px solid #1a1a1a;
                box-shadow: 0 0 100px rgba(0,0,0,0.8);
            }

            .pulse-bg {
                position: absolute; width: 100%; height: 100%;
                border-radius: 50%;
                background: #c5a059;
                opacity: 0;
                filter: blur(40px);
                transition: 0.5s;
                z-index: 1;
            }

            .analog-clock {
                width: 100%; height: 100%;
                border-radius: 50%;
                position: relative;
                z-index: 2;
                background: radial-gradient(circle, #111 0%, #050505 100%);
            }

            .hand {
                position: absolute; bottom: 50%; left: 50%;
                width: 6px; height: 180px;
                background: #c5a059;
                transform-origin: bottom;
                transform: translateX(-50%) rotate(0deg);
                transition: transform 1s linear;
                border-radius: 10px;
                box-shadow: 0 0 20px rgba(197, 160, 89, 0.4);
                z-index: 4;
            }

            .digital-display {
                position: absolute;
                font-size: 5rem; font-weight: 900; color: #fff;
                z-index: 5; font-family: 'Courier New', monospace;
                text-shadow: 0 0 20px rgba(0,0,0,1);
            }

            .controls { margin-top: 6vh; display: flex; gap: 30px; z-index: 10; }
            .btn {
                padding: 20px 50px; font-size: 1.5vw; font-weight: 900; border: none; border-radius: 100px;
                cursor: pointer; transition: 0.3s; text-transform: uppercase; letter-spacing: 2px;
            }
            .btn-start { background: #c5a059; color: #000; }
            .btn-reset { background: transparent; color: #fff; border: 2px solid #333; }
            .btn:hover { transform: scale(1.05); filter: brightness(1.2); }
            .btn:active { transform: scale(0.95); }
            
            .dot { position: absolute; width: 8px; height: 8px; background: #222; border-radius: 50%; }
            .dot.major { width: 12px; height: 12px; background: #c5a059; }

            @keyframes dangerPulse {
                0% { opacity: 0.1; transform: scale(1); }
                50% { opacity: 0.3; transform: scale(1.1); }
                100% { opacity: 0.1; transform: scale(1); }
            }
        </style>

        <div class="dmt-header">
            <h1 class="dmt-title">Double Minutes Talk</h1>
            <div class="dmt-subtitle">NO PAPERS • NO FEAR • JUST ENGLISH</div>
        </div>

        <div class="clock-wrapper">
            <div class="pulse-bg" id="pulseBox"></div>
            <div class="analog-clock" id="clock">
                <div class="hand" id="secondHand"></div>
                <div class="digital-display" id="digitalTimer">02:00</div>
            </div>
        </div>

        <div class="controls">
            <button class="btn btn-start" id="btnStart">Start Session</button>
            <button class="btn btn-reset" id="btnReset">Reset</button>
        </div>
        
        <audio id="bellSound" src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3"></audio>
    `;

    const hand = document.getElementById('secondHand');
    const digital = document.getElementById('digitalTimer');
    const startBtn = document.getElementById('btnStart');
    const resetBtn = document.getElementById('btnReset');
    const pulseBox = document.getElementById('pulseBox');
    const bell = document.getElementById('bellSound');

    // توزيع النقاط حول الساعة
    for (let i = 0; i < 12; i++) {
        const dot = document.createElement('div');
        dot.className = i % 3 === 0 ? 'dot major' : 'dot';
        const angle = i * 30;
        dot.style.top = '50%';
        dot.style.left = '50%';
        dot.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translateY(-200px)`;
        document.getElementById('clock').appendChild(dot);
    }

    function updateDisplay() {
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        digital.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        
        const rotation = (120 - timeLeft) * 3; // تحريك العقرب
        hand.style.transform = `translateX(-50%) rotate(${rotation}deg)`;

        // تأثيرات اللحظات الأخيرة
        if (timeLeft <= 15 && timeLeft > 0) {
            pulseBox.style.background = '#ef4444';
            pulseBox.style.animation = 'dangerPulse 1s infinite';
            digital.style.color = '#ef4444';
            hand.style.background = '#ef4444';
        } else if (timeLeft === 0) {
            pulseBox.style.background = '#ef4444';
            pulseBox.style.opacity = '0.5';
            pulseBox.style.animation = 'none';
        } else {
            pulseBox.style.animation = 'none';
            pulseBox.style.opacity = '0';
            digital.style.color = '#fff';
            hand.style.background = '#c5a059';
        }
    }

    function startTimer() {
        if (isRunning) {
            clearInterval(timerInterval);
            startBtn.innerText = "Resume";
            isRunning = false;
        } else {
            isRunning = true;
            startBtn.innerText = "Pause";
            timerInterval = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateDisplay();
                } else {
                    clearInterval(timerInterval);
                    bell.play();
                    startBtn.innerText = "Time's Up!";
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
        startBtn.innerText = "Start Session";
        startBtn.disabled = false;
        updateDisplay();
    }

    startBtn.onclick = startTimer;
    resetBtn.onclick = resetTimer;
    updateDisplay();

})();
