/**
 * VETO PROGRAM - Listening Activity Module (Final Audio Version)
 * Designed by: Veto Architect
 * Target: Smart Boards / High Visibility (4-Meter Rule)
 */

(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Data Storage ---
    const conversations = [
        `[Ahmed - Friendly]: I am very happy today. <break time="1.0s" /> Veto is a great place for us. <break time="1.5s" /> [Amy - Enthusiastic]: You are right. <break time="1.0s" /> Look! Julia is there. <break time="1.5s" /> [Ahmed - Curious]: Is she a teacher? <break time="1.5s" /> [Amy - Normal]: No, she is a student like us.`,
        `[Chris - Slightly rushed]: Julia, where is my English book? <break time="1.0s" /> I need it now. <break time="1.5s" /> [Julia - Calm]: It is on the table. <break time="1.0s" /> Is this your blue pen? <break time="1.5s" /> [Chris - Relieved]: Yes, it is mine. <break time="1.5s" /> We are ready for the Veto lesson.`,
        `[Amy - Friendly]: Ahmed, I have an orange in my bag. <break time="1.5s" /> [Ahmed - Simple]: I have two apples and a banana. <break time="1.5s" /> [Amy - Questioning]: Are they for lunch? <break time="1.5s" /> [Ahmed - Cheerful]: Yes, they are. <break time="1.0s" /> We can eat them at school.`,
        `[Julia - Pointing]: Chris, look at him. <break time="1.0s" /> That is our teacher. <break time="1.5s" /> [Chris - Appreciative]: He is very kind. <break time="1.0s" /> He helps us every day. <break time="1.5s" /> [Julia - Positive]: I like his way of teaching. <break time="1.5s" /> [Chris - Proud]: Veto has the best teachers.`
    ];

    let currentIdx = 0;
    const audioPlayer = new Audio();
    // المسار الخام للمفات الصوتية على GitHub
    const audioBaseUrl = "https://raw.githubusercontent.com/eycfde-prog/EYCVetoProgram/main/data/Listening/1/1/";

    // --- Interface Setup ---
    container.innerHTML = `
        <style>
            .listening-theater {
                height: 100%; width: 100%; 
                background: radial-gradient(circle at center, #1a1a1a 0%, #000 100%);
                display: flex; flex-direction: column; align-items: center; justify-content: center;
                color: #fff; font-family: 'Segoe UI', sans-serif; position: relative; overflow: hidden;
            }
            .top-nav-info {
                position: absolute; top: 30px; left: 50%; transform: translateX(-50%);
                font-size: 1.4rem; color: #c5a059; letter-spacing: 3px; font-weight: bold;
                text-shadow: 0 0 10px rgba(197, 160, 89, 0.5);
            }
            .audio-control-hub {
                position: absolute; top: 30px; right: 50px; z-index: 100;
            }
            .play-trigger {
                width: 80px; height: 80px; border-radius: 50%;
                background: #c5a059; border: 4px solid rgba(255,255,255,0.2); 
                cursor: pointer; font-size: 2.2rem; display: flex; align-items: center; justify-content: center;
                transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                box-shadow: 0 10px 20px rgba(0,0,0,0.4);
            }
            .play-trigger:hover { transform: scale(1.15); background: #dbc08a; }
            .play-trigger.active { background: #ff4757; animation: pulseGlow 1.2s infinite; }

            @keyframes pulseGlow {
                0% { box-shadow: 0 0 0 0 rgba(255, 71, 87, 0.7); }
                70% { box-shadow: 0 0 0 25px rgba(255, 71, 87, 0); }
                100% { box-shadow: 0 0 0 0 rgba(255, 71, 87, 0); }
            }

            .main-dialogue-area {
                width: 80%; max-width: 1300px; 
                padding: 50px; background: rgba(255,255,255,0.02);
                border-radius: 30px; border: 1px solid rgba(197, 160, 89, 0.1);
                box-shadow: inset 0 0 50px rgba(0,0,0,0.5);
            }

            .chat-line { margin-bottom: 40px; transform: translateY(20px); opacity: 0; animation: reveal 0.6s forwards; }
            @keyframes reveal { to { transform: translateY(0); opacity: 1; } }

            .name-tag { 
                font-size: 2vw; font-weight: 800; color: #c5a059; 
                display: block; margin-bottom: 5px; text-transform: uppercase;
            }
            .speech-text { 
                font-size: 3.8vw; font-weight: 500; color: #f0f0f0; 
                line-height: 1.2; letter-spacing: 0.5px;
            }

            .footer-nav {
                position: absolute; bottom: 30px; font-size: 1.1rem; color: rgba(255,255,255,0.3);
            }
        </style>

        <div class="listening-theater">
            <div class="top-nav-info" id="convo-title">CONVERSATION 1</div>
            
            <div class="audio-control-hub">
                <button class="play-trigger" id="master-play" onclick="toggleAudio()">▶</button>
            </div>

            <div class="main-dialogue-area" id="convo-container"></div>

            <div class="footer-nav">Use ENTER for Next • SPACE for Audio</div>
        </div>
    `;

    const convoContainer = document.getElementById('convo-container');
    const playBtn = document.getElementById('master-play');
    const titleTag = document.getElementById('convo-title');

    // --- Audio Functions ---
    window.toggleAudio = function() {
        const targetSrc = `${audioBaseUrl}${currentIdx + 1}.mp3`;
        
        if (audioPlayer.src !== targetSrc) {
            audioPlayer.src = targetSrc;
        }

        if (audioPlayer.paused) {
            audioPlayer.play().catch(e => console.error("Audio Load Error:", e));
            playBtn.innerText = "⏸";
            playBtn.classList.add('active');
        } else {
            audioPlayer.pause();
            playBtn.innerText = "▶";
            playBtn.classList.remove('active');
        }
    };

    audioPlayer.onended = () => {
        playBtn.innerText = "▶";
        playBtn.classList.remove('active');
    };

    // --- Display Functions ---
    function renderConversation(index) {
        // Reset state
        audioPlayer.pause();
        playBtn.innerText = "▶";
        playBtn.classList.remove('active');
        
        titleTag.innerText = `CONVERSATION ${index + 1} / ${conversations.length}`;
        convoContainer.innerHTML = '';

        const rawData = conversations[index];
        // Remove voice codes and split
        const cleanText = rawData.replace(/<break[^>]*>/g, '');
        const lines = cleanText.split(/(?=\[.*?\])/);

        lines.forEach((line, i) => {
            const match = line.match(/\[(.*?)\s-\s(.*?)\]:\s(.*)/);
            if (match) {
                const [_, name, mood, text] = match;
                const lineDiv = document.createElement('div');
                lineDiv.className = 'chat-line';
                lineDiv.style.animationDelay = `${i * 0.4}s`;
                lineDiv.innerHTML = `
                    <span class="name-tag">${name} <small style="font-size:0.9rem; opacity:0.6;">(${mood})</small></span>
                    <span class="speech-text">${text.trim()}</span>
                `;
                convoContainer.appendChild(lineDiv);
            }
        });
    }

    // --- Navigation Logic ---
    window.nextSlide = function() {
        if (currentIdx < conversations.length - 1) {
            currentIdx++;
            renderConversation(currentIdx);
        }
    };

    window.prevSlide = function() {
        if (currentIdx > 0) {
            currentIdx--;
            renderConversation(currentIdx);
        }
    };

    // Keyboard Shortcuts
    document.onkeydown = (e) => {
        if (e.key === "Enter" || e.key === "ArrowRight") nextSlide();
        if (e.key === "ArrowLeft") prevSlide();
        if (e.key === " ") { 
            e.preventDefault(); 
            toggleAudio(); 
        }
    };

    // Initialize the show
    renderConversation(currentIdx);
})();
