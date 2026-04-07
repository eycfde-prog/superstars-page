/**
 * VETO PROGRAM - Listening Activity Module
 * Optimized for: Smart Board Display Container
 * Logic: Fixed Audio Paths & Navigation
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
    // المسار المعتمد من مستودع GitHub (Raw MP3)
    const audioBaseUrl = "https://raw.githubusercontent.com/eycfde-prog/EYCVetoProgram/main/data/Listening/Level-1/Session%201/";

    // --- Layout Restoration ---
    container.innerHTML = `
        <style>
            .listening-theater {
                height: 100%; width: 100%; 
                background: radial-gradient(circle at center, #1a1a1a 0%, #000 100%);
                display: flex; flex-direction: column; align-items: center; justify-content: center;
                color: #fff; font-family: 'Segoe UI', sans-serif; position: relative; overflow: hidden;
            }
            
            /* الحفاظ على أولوية زر التشغيل فوق أي عناصر تفاعلية أخرى */
            .audio-control-hub {
                position: absolute; top: 20px; right: 20px; 
                z-index: 11000;
                pointer-events: auto;
            }

            .play-trigger {
                width: 90px; height: 90px; border-radius: 50%;
                background: #c5a059; border: 5px solid rgba(255,255,255,0.3); 
                cursor: pointer; font-size: 2.5rem; display: flex; align-items: center; justify-content: center;
                box-shadow: 0 0 30px rgba(0,0,0,0.8), 0 0 15px rgba(197, 160, 89, 0.4);
                transition: all 0.2s ease;
                outline: none;
            }
            .play-trigger:active { transform: scale(0.9); }
            .play-trigger.active { background: #ff4757; animation: v-pulse 1.2s infinite; }

            @keyframes v-pulse {
                0% { box-shadow: 0 0 0 0 rgba(255, 71, 87, 0.7); }
                70% { box-shadow: 0 0 0 30px rgba(255, 71, 87, 0); }
                100% { box-shadow: 0 0 0 0 rgba(255, 71, 87, 0); }
            }

            .main-dialogue-area {
                width: 85%; max-width: 1400px; 
                padding: 40px; background: rgba(255,255,255,0.03);
                border-radius: 40px; border: 2px solid rgba(197, 160, 89, 0.15);
                box-shadow: inset 0 0 100px rgba(0,0,0,0.5);
                max-height: 80vh; overflow-y: auto;
            }

            .chat-line { margin-bottom: 35px; opacity: 0; transform: translateY(20px); animation: v-reveal 0.6s forwards; }
            @keyframes v-reveal { to { transform: translateY(0); opacity: 1; } }

            .name-tag { font-size: 2.2vw; font-weight: 800; color: #c5a059; text-transform: uppercase; margin-bottom: 5px; display: block; }
            .speech-text { font-size: 3.8vw; font-weight: 600; color: #ffffff; line-height: 1.1; text-shadow: 3px 3px 6px rgba(0,0,0,0.8); }

            .top-nav-info { position: absolute; top: 30px; left: 50%; transform: translateX(-50%); color: #c5a059; font-size: 1.5rem; letter-spacing: 4px; font-weight: bold; }
        </style>

        <div class="listening-theater">
            <div class="top-nav-info" id="convo-title">CONVERSATION 1</div>
            
            <div class="audio-control-hub">
                <button class="play-trigger" id="master-play">▶</button>
            </div>

            <div class="main-dialogue-area" id="convo-container"></div>
        </div>
    `;

    const convoContainer = document.getElementById('convo-container');
    const playBtn = document.getElementById('master-play');
    const titleTag = document.getElementById('convo-title');

    // --- Audio Logic ---
    window.toggleAudio = function() {
        const targetSrc = `${audioBaseUrl}${currentIdx + 1}.mp3`;
        
        if (audioPlayer.src !== targetSrc) {
            audioPlayer.src = targetSrc;
        }

        if (audioPlayer.paused) {
            audioPlayer.play().catch(e => console.warn("Audio Context Wait..."));
            playBtn.innerText = "⏸";
            playBtn.classList.add('active');
        } else {
            audioPlayer.pause();
            playBtn.innerText = "▶";
            playBtn.classList.remove('active');
        }
    };

    playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        window.toggleAudio();
    });

    audioPlayer.onended = () => {
        playBtn.innerText = "▶";
        playBtn.classList.remove('active');
    };

    // --- Render System ---
    function renderConversation(index) {
        audioPlayer.pause();
        audioPlayer.src = ''; 
        playBtn.innerText = "▶";
        playBtn.classList.remove('active');
        
        titleTag.innerText = `CONVERSATION ${index + 1} / ${conversations.length}`;
        convoContainer.innerHTML = '';

        const cleanText = conversations[index].replace(/<break[^>]*>/g, '');
        const lines = cleanText.split(/(?=\[.*?\])/);

        lines.forEach((line, i) => {
            const match = line.match(/\[(.*?)\s-\s(.*?)\]:\s(.*)/);
            if (match) {
                const [_, name, mood, text] = match;
                const lineDiv = document.createElement('div');
                lineDiv.className = 'chat-line';
                lineDiv.style.animationDelay = `${i * 0.2}s`;
                lineDiv.innerHTML = `
                    <span class="name-tag">${name}</span>
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

    // Initialize
    renderConversation(currentIdx);
})();
