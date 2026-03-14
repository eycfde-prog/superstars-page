(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    let timeLeft = 120; // دقيقتين بالثواني
    let timerInterval = null;
    let isRunning = false;

    // --- التنسيق البصري (Style) ---
    container.innerHTML = '';
    container.style.cssText = `height:calc(100vh - 200px); display:flex; flex-direction:column; justify-content:center; align-items:center; background:#0f172a; color:#fff; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            .dmt-title { font-size: 3rem; font-weight: 900; color: #38bdf8; margin-bottom: 20px; text-shadow: 0 0 20px rgba(56, 189, 248, 0.4); }
            .dmt-subtitle { font-size: 1.2rem; color: #94a3b8; margin-bottom: 40px; text-transform: uppercase; letter-spacing: 4px; }
            
            /* تصميم الساعة الأنالوج */
            .analog-clock {
                width: 350px; height: 350px;
                border: 10px solid #1e293b;
                border-radius: 50%;
                position: relative;
                display: flex; justify-content: center; align-items: center;
                background: radial-gradient(circle, #1e293b 0%, #0f172a 100%);
                box-shadow: 0 0 50px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.5);
            }

            /* مؤشر الثواني الدوار */
            .hand {
                position: absolute; bottom: 50%; left: 50%;
                width: 4px; height: 140px;
                background: #38bdf8;
                transform-origin: bottom;
                transform: translateX(-50%) rotate(0deg);
                transition: transform 1s linear;
                border-radius: 4px;
                box-shadow: 0 0 10px #38bdf8;
                z-index: 2;
            }

            /* المربع الديجيتال في المنتصف */
            .digital-box {
                width: 160px; height: 100px;
                background: #0f172a;
                border: 2px solid #38bdf8;
                border-radius: 15px;
                display: flex; justify-content: center; align-items: center;
                font-size: 3.5rem; font-weight: 900; color: #fff;
                box-shadow: 0 0 30px rgba(56, 189, 248, 0.2);
                z-index: 3;
            }

            .controls { margin-top: 50px; display: flex; gap: 20px; }
            .btn {
                padding: 15px 40px; font-size: 1.5rem; font-weight: bold; border: none; border-radius: 12px;
                cursor: pointer; transition: 0.3s; text-transform: uppercase;
            }
            .btn-start { background: #22c55e; color: #fff; box-shadow: 0 4px 0 #16a34a; }
            .btn-reset { background: #ef4444; color: #fff; box-shadow: 0 4px 0 #dc2626; }
            .btn:active { transform: translateY(4px); box-shadow: none; }
            
            /* نقاط الساعة الخارجية */
            .dot { position: absolute; width: 6px; height: 6px; background: #334155; border-radius: 50%; }
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

    // توزيع النقاط حول الساعة
    for (let i = 0; i < 12; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        const angle = i * 30;
        dot.style.transform = `rotate(${angle}deg) translateY(-160px)`;
        document.getElementById('clock').appendChild(dot);
    }

    function updateDisplay() {
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        digital.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        
        // تحريك العقرب (360 درجة مقسمة على 60 ثانية)
        const rotation = (120 - timeLeft) * 6; 
        hand.style.transform = `translateX(-50%) rotate(${rotation}deg)`;

        // تغيير اللون عند اقتراب الوقت من النهاية
        if (timeLeft <= 10) {
            digital.style.color = '#ef4444';
            hand.style.background = '#ef4444';
        } else {
            digital.style.color = '#fff';
            hand.style.background = '#38bdf8';
        }
    }

    function startTimer() {
        if (isRunning) {
            clearInterval(timerInterval);
            startBtn.innerText = "Resume";
            startBtn.style.background = "#22c55e";
            isRunning = false;
        } else {
            isRunning = true;
            startBtn.innerText = "Pause";
            startBtn.style.background = "#f59e0b";
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
    }

    function resetTimer() {
        clearInterval(timerInterval);
        timeLeft = 120;
        isRunning = false;
        startBtn.innerText = "Start Talking";
        startBtn.disabled = false;
        startBtn.style.background = "#22c55e";
        updateDisplay();
    }

    startBtn.onclick = startTimer;
    resetBtn.onclick = resetTimer;

})();
