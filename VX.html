<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vivid X Mission | EYC Academy</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        :root {
            --gold: #fcc200;
            --xbox-red: #ff3c3c;
            --bg-dark: #050505;
            --glass: rgba(255, 255, 255, 0.05);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
        body { background: var(--bg-dark); color: white; overflow-x: hidden; }

        /* Banner Style */
        .rank-header { text-align: center; padding: 25px 0; background: linear-gradient(to bottom, #111, transparent); border-bottom: 1px solid rgba(252, 194, 0, 0.1); }
        .rank-header h1 { font-family: 'Orbitron'; font-size: 1.5rem; background: linear-gradient(to bottom, #fff, var(--gold)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: 4px; }

        /* Login Flash Message */
        #login-overlay {
            position: fixed; inset: 0; background: rgba(0,0,0,0.9); z-index: 1000;
            display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);
        }
        .login-card {
            background: var(--glass); border: 1px solid var(--gold); padding: 40px;
            border-radius: 20px; text-align: center; width: 90%; max-width: 400px;
        }
        .login-card input {
            width: 100%; padding: 12px; margin: 20px 0; background: rgba(255,255,255,0.1);
            border: 1px solid #444; color: white; border-radius: 10px; text-align: center;
        }
        .btn-prime {
            background: var(--gold); color: black; border: none; padding: 12px 30px;
            border-radius: 10px; font-family: 'Orbitron'; font-weight: 900; cursor: pointer;
        }

        /* Token & Tutorial Bar */
        .status-bar {
            display: flex; justify-content: space-between; align-items: center;
            padding: 15px 20px; background: rgba(255,255,255,0.02);
        }
        .token-display { font-family: 'Orbitron'; color: var(--gold); font-size: 14px; }
        .tutorial-btn {
            background: linear-gradient(45deg, #ff0055, #ff5500); color: white;
            border: none; padding: 8px 15px; border-radius: 20px; font-size: 12px;
            font-weight: 600; cursor: pointer; box-shadow: 0 0 15px rgba(255, 0, 85, 0.4);
        }

        /* Content Area */
        .mission-container { max-width: 800px; margin: 20px auto; padding: 0 20px; }
        
        /* Levels Tabs */
        .level-tabs { display: flex; gap: 10px; margin-bottom: 20px; }
        .tab {
            flex: 1; padding: 10px; text-align: center; background: var(--glass);
            border: 1px solid #333; border-radius: 10px; cursor: pointer;
            font-family: 'Orbitron'; font-size: 10px; transition: 0.3s;
        }
        .tab.active { border-color: var(--gold); background: rgba(252, 194, 0, 0.1); color: var(--gold); }

        .mission-image {
            width: 100%; border-radius: 15px; border: 2px solid #222; margin-bottom: 20px;
        }

        .instructions {
            background: rgba(255, 60, 60, 0.05); border-left: 4px solid var(--xbox-red);
            padding: 15px; margin-bottom: 20px; font-size: 13px; line-height: 1.6;
        }

        textarea {
            width: 100%; height: 200px; background: rgba(255,255,255,0.03);
            border: 1px solid #333; border-radius: 15px; color: white;
            padding: 15px; font-size: 14px; resize: none; margin-bottom: 10px;
        }

        /* Video Popup */
        #video-popup {
            position: fixed; inset: 0; background: rgba(0,0,0,0.95); z-index: 2000;
            display: none; align-items: center; justify-content: center;
        }
        .video-content { width: 90%; max-width: 700px; position: relative; }
        .close-video { position: absolute; top: -40px; right: 0; color: white; font-size: 30px; cursor: pointer; }
    </style>
</head>
<body>

    <div id="login-overlay">
        <div class="login-card">
            <i class="fas fa-user-shield" style="font-size: 40px; color: var(--gold);"></i>
            <h2 style="font-family: 'Orbitron'; margin-top: 15px;">SECURE ACCESS</h2>
            <p style="font-size: 12px; opacity: 0.6;">Enter your Academy Email to start</p>
            <input type="email" placeholder="student@eyc.com">
            <button class="btn-prime" onclick="closeLogin()">LOGIN</button>
        </div>
    </div>

    <header class="rank-header">
        <h1>EYC ACADEMY</h1>
    </header>

    <div class="status-bar">
        <div class="token-display">
            <i class="fas fa-coins"></i> REWARD: <span id="reward-amount">120</span> TK
        </div>
        <button class="tutorial-btn" onclick="toggleVideo()">
            <i class="fas fa-play-circle"></i> ازاي تعمل النشاط دا
        </button>
    </div>

    <main class="mission-container">
        <div class="level-tabs">
            <div class="tab" onclick="setLevel('Beginner', 60, this)">Beginner</div>
            <div class="tab active" onclick="setLevel('Intermediate', 90, this)">Intermediate</div>
            <div class="tab" onclick="setLevel('Advanced', 150, this)">Advanced</div>
        </div>

        <div id="mission-content">
            <h2 style="font-family: 'Orbitron'; margin-bottom: 15px; color: var(--xbox-red);">VIVID X: MISSION VX1</h2>
            
            <img src="VX1.jpg" alt="Vivid Mission" class="mission-image">

            <div class="instructions">
                <strong><i class="fas fa-scroll"></i> Mission Requirements:</strong><br>
                • Observe details. Write a 150-word paragraph.<br>
                • Use <u>Past Continuous</u> for setting & <u>Past Simple</u> for actions.<br>
                • Include 3 sensory adjectives (Smell - Touch - Sound).
            </div>

            <textarea placeholder="Start your descriptive masterpiece here..."></textarea>
            <div style="text-align: right; font-size: 12px; opacity: 0.5;">Words: <span id="word-count">0</span> / 150</div>
            
            <button class="btn-prime" style="width: 100%; margin-top: 20px; background: var(--xbox-red); color: white;">SUBMIT MISSION</button>
        </div>
    </main>

    <div id="video-popup">
        <div class="video-content">
            <span class="close-video" onclick="toggleVideo()">&times;</span>
            <div style="padding:56.25% 0 0 0;position:relative; background: #000; border: 2px solid var(--gold);">
                <p style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); font-family:'Orbitron';">VIDEO LOADING...</p>
                <iframe src="YOUR_GOOGLE_DRIVE_LINK_HERE" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allowfullscreen></iframe>
            </div>
        </div>
    </div>

    <script>
        function closeLogin() {
            document.getElementById('login-overlay').style.display = 'none';
        }

        function toggleVideo() {
            const popup = document.getElementById('video-popup');
            popup.style.display = (popup.style.display === 'flex') ? 'none' : 'flex';
        }

        function setLevel(level, tokens, element) {
            // تحديث التوكينز
            document.getElementById('reward-amount').innerText = tokens;
            
            // تحديث الـ Active Tab
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            element.classList.add('active');

            // انميشن خفيف للمحتوى
            const content = document.getElementById('mission-content');
            content.style.opacity = 0;
            setTimeout(() => {
                content.style.opacity = 1;
                // هنا ممكن تغير التعليمات بناء على الليفل لو حبيت مستقبلاً
            }, 300);
        }

        // عداد الكلمات
        const area = document.querySelector('textarea');
        area.addEventListener('input', function() {
            const words = this.value.trim().split(/\s+/).filter(item => item).length;
            document.getElementById('word-count').innerText = words;
        });
    </script>
</body>
</html>