<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Label X | EYC Academy</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Montserrat:wght@300;400;600&family=Cairo:wght@400;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        :root {
            --xbox-green: #107c10;
            --gold: #fcc200;
            --bg-dark: #050505;
            --glass: rgba(255, 255, 255, 0.03);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Montserrat', sans-serif; }
        body { background: var(--bg-dark); color: white; overflow-x: hidden; min-height: 100vh; }

        /* Login Flash Overlay */
        #login-overlay {
            position: fixed; inset: 0; background: rgba(0,0,0,0.98); z-index: 2000;
            display: flex; align-items: center; justify-content: center; backdrop-filter: blur(20px);
        }
        .login-card {
            background: var(--glass); border: 2px solid var(--xbox-green); padding: 40px;
            border-radius: 35px; text-align: center; width: 90%; max-width: 450px;
            box-shadow: 0 0 50px rgba(16, 124, 16, 0.1);
        }
        .login-card input {
            width: 100%; padding: 15px; margin: 25px 0; background: rgba(255,255,255,0.05);
            border: 1px solid #333; color: white; border-radius: 12px; text-align: center; font-size: 16px;
        }

        /* Header */
        .rank-header { text-align: center; padding: 25px 0; border-bottom: 1px solid rgba(16, 124, 16, 0.1); }
        .rank-header h1 { font-family: 'Orbitron'; font-size: 1.5rem; background: linear-gradient(to bottom, #fff, var(--xbox-green)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: 5px; }

        /* Status Bar */
        .status-bar { display: flex; justify-content: space-between; align-items: center; padding: 12px 20px; background: rgba(255,255,255,0.02); }
        .token-display { font-family: 'Orbitron'; color: var(--gold); font-size: 13px; font-weight: 700; }
        .tutorial-btn { background: linear-gradient(45deg, #107c10, #0a4d0a); color: white; border: none; padding: 8px 18px; border-radius: 25px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: 'Cairo'; }

        /* Level Tabs */
        .level-tabs { display: flex; gap: 8px; margin: 20px auto; max-width: 600px; padding: 0 20px; }
        .tab { flex: 1; padding: 12px; text-align: center; background: var(--glass); border: 1px solid #333; border-radius: 15px; cursor: pointer; font-family: 'Orbitron'; font-size: 9px; transition: 0.3s; color: #777; }
        .tab.active { border-color: var(--xbox-green); background: rgba(16, 124, 16, 0.1); color: var(--xbox-green); }

        /* Mission Container */
        .mission-container { max-width: 800px; margin: 10px auto; padding: 0 20px; }

        /* Xbox Question Card */
        .xbox-card { 
            background: var(--glass); border-right: 4px solid var(--xbox-green); 
            border-radius: 20px; padding: 25px; margin-bottom: 20px; 
            border-top: 1px solid rgba(255,255,255,0.05);
            transition: 0.3s;
        }
        .xbox-card:hover { transform: scale(1.01); background: rgba(255,255,255,0.05); }
        
        .card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 15px; }
        .verb-tag { background: rgba(16, 124, 16, 0.2); color: #4ade80; padding: 5px 12px; border-radius: 8px; font-weight: 900; font-size: 12px; font-family: 'Orbitron'; }
        .tense-tag { background: rgba(255,255,255,0.05); color: #aaa; padding: 5px 12px; border-radius: 8px; font-size: 11px; }
        
        textarea { 
            width: 100%; height: 90px; background: rgba(0,0,0,0.4); 
            border: 1px solid #333; border-radius: 15px; padding: 15px; 
            color: white; resize: none; font-size: 15px; transition: 0.3s;
            font-family: 'Montserrat';
        }
        textarea:focus { border-color: var(--xbox-green); outline: none; box-shadow: 0 0 15px rgba(16, 124, 16, 0.2); }

        /* Submit Button */
        .btn-submit {
            width: 100%; padding: 20px; border-radius: 20px; font-family: 'Orbitron'; font-weight: 900;
            margin: 40px 0; border: none; cursor: pointer; background: var(--xbox-green); color: white;
            box-shadow: 0 10px 30px rgba(16, 124, 16, 0.3); transition: 0.3s;
        }
        .btn-submit:hover { transform: translateY(-3px); box-shadow: 0 15px 40px rgba(16, 124, 16, 0.5); }

        .hidden { display: none; }
    </style>
</head>
<body>

    <div id="login-overlay">
        <div class="login-card">
            <i class="fab fa-xbox" style="font-size: 50px; color: var(--xbox-green);"></i>
            <h2 style="font-family: 'Orbitron'; margin-top: 20px; letter-spacing: 3px;">LABEL X</h2>
            <p style="font-size: 11px; opacity: 0.5; margin-top: 10px; font-family: 'Montserrat';">ELITE GRAMMAR CHALLENGE SESSION</p>
            <input type="text" id="emailInput" placeholder="Enter Student Code / Email">
            <button onclick="bypassLogin()" style="background: var(--xbox-green); color: white; width: 100%; padding: 15px; border-radius: 12px; border: none; font-family: 'Orbitron'; font-weight: 900; cursor: pointer;">START CHALLENGE</button>
        </div>
    </div>

    <header class="rank-header">
        <h1>EYC ACADEMY</h1>
    </header>

    <div class="status-bar">
        <div class="token-display">
            <i class="fas fa-coins"></i> REWARD: <span id="reward-amount">180</span> TK
        </div>
        <button class="tutorial-btn" onclick="alert('استخدم الفعل والزمن المطلوب لتكوين جملة صحيحة تماماً')">
            MISSION BRIEFING <i class="fas fa-gamepad"></i>
        </button>
    </div>

    <div class="level-tabs">
        <div class="tab" onclick="changeLevel(120, this)">BEGINNER</div>
        <div class="tab active" onclick="changeLevel(180, this)">INTERMEDIATE</div>
        <div class="tab" onclick="changeLevel(250, this)">ADVANCED</div>
    </div>

    <main class="mission-container">
        <form id="challengeForm">
            <div id="questions-grid">
                </div>
            <button type="submit" class="btn-submit">TRANSMIT TO CLOUD 🛰️</button>
        </form>

        <div id="successMsg" class="hidden" style="text-align:center; padding: 50px; background: var(--glass); border-radius: 30px; border: 1px solid var(--xbox-green);">
            <i class="fas fa-trophy" style="font-size: 60px; color: var(--gold);"></i>
            <h2 style="font-family: 'Orbitron'; margin-top: 20px;">MISSION ACCOMPLISHED</h2>
            <p style="opacity: 0.6; margin-top: 10px;">Your grammar data has been saved in Label X registry.</p>
        </div>
    </main>

    <script>
        const challengeData = [
            { v: "Write", t: "Present Simple" },
            { v: "Finish", t: "Past Simple" },
            { v: "Build", t: "Passive Voice (Present)" },
            { v: "Say", t: "Reported Speech" },
            { v: "Study", t: "If Conditional (Type 1)" },
            { v: "Play", t: "Present Continuous" },
            { v: "Eat", t: "Present Perfect" },
            { v: "Fix", t: "Passive Voice (Past)" },
            { v: "Visit", t: "Future Simple (will)" },
            { v: "Help", t: "If Conditional (Type 2)" }
        ];

        function bypassLogin() {
            document.getElementById('login-overlay').style.display = 'none';
            renderQuestions();
        }

        function renderQuestions() {
            const grid = document.getElementById('questions-grid');
            grid.innerHTML = challengeData.map((item, i) => `
                <div class="xbox-card">
                    <div class="card-header">
                        <span style="font-family: 'Orbitron'; font-size: 10px; color: #555;">#0${i+1}</span>
                        <span class="verb-tag">VERB: ${item.v}</span>
                        <span class="tense-tag">TENSE: ${item.t}</span>
                    </div>
                    <textarea placeholder="Type your creative sentence here..." required></textarea>
                </div>
            `).join('');
        }

        function changeLevel(tokens, el) {
            document.getElementById('reward-amount').innerText = tokens;
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            el.classList.add('active');
        }

        document.getElementById('challengeForm').onsubmit = (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            btn.innerText = "TRANSMITTING DATA...";
            btn.disabled = true;

            setTimeout(() => {
                document.getElementById('challengeForm').classList.add('hidden');
                document.getElementById('successMsg').classList.remove('hidden');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 2000);
        };
    </script>
</body>
</html>
