/**
 * VETO PROGRAM - Listening Activity Module (Session 38)
 * Designed by: Veto Architect
 * Content: Level 1 - Session 38 (Conversations 5-8)
 */

(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Data Storage (Session 38 Content) ---
    const conversations = [
        `[Ahmed - Reflective]: Never have I seen such a dedicated group of students as in Veto. <break time="1.5s" /> [Amy - Confirming]: True. <break time="1.0s" /> Everyone here is aiming for the stars. <break time="1.5s" /> [Ahmed - Asking]: Do you think we will have achieved our fluency goals by Level Twelve? <break time="1.5s" /> [Amy - Replying]: Absolutely. <break time="1.0s" /> We will have been immersed in English for a very long time. <break time="1.5s" /> [Ahmed - Normal]: That is the key to natural sounding speech.`,
        `[Chris - Concerned]: The deadline is approaching. <break time="1.0s" /> Scarcely had I started the report when the power went out. <break time="1.5s" /> [Julia - Helpful]: Don't panic. <break time="1.0s" /> If you work tonight, you will have finished it by morning. <break time="1.5s" /> [Chris - Tired]: I will have been typing for ten hours straight if I do that. <break time="1.5s" /> [Julia - Encouraging]: You can do it. <break time="1.0s" /> Your hard work will pay off in the end.`,
        `[Amy - Questioning]: Suppose you hadn't joined the Veto institute, where would you be now? <break time="1.5s" /> [Ahmed - Thinking]: I wouldn't have been able to communicate this effectively. <break time="1.5s" /> [Amy - Adding]: Not only is the curriculum advanced, but the environment is also inspiring. <break time="1.5s" /> [Ahmed - Happy]: By the time I finish, I will have been transformed into a new person.`,
        `[Julia - Organizing]: We must ensure that all files are backed up. <break time="1.5s" /> [Chris - Confirming]: By tomorrow, I will have uploaded everything to the cloud. <break time="1.5s" /> [Julia - Asking]: Will the system have been running for twenty-four hours by then? <break time="1.5s" /> [Chris - Replying]: Yes, and consequently, the data will be completely secure. <break time="1.5s" /> [Julia - Relieved]: That is a weight off my shoulders.`
    ];

    let currentIdx = 0;
    const audioPlayer = new Audio();
    
    // توجيه المسار الصوتي إلى Session 38
    const audioBaseUrl = "https://raw.githubusercontent.com/eycfde-prog/EYCVetoProgram/main/data/Listening/Level-1/Session%2038/";

    // --- Layout (Veto Original Premium Theme) ---
    container.innerHTML = `
        <style>
            .listening-theater {
                height: 100%; width: 100%; 
                background: radial-gradient(circle at center, #0f0f0f 0%, #000 100%);
                display: flex; flex-direction: column; align-items: center; justify-content: center;
                color: #fff; font-family: 'Segoe UI', sans-serif; position: relative; overflow: hidden;
            }
            
            .audio-control-hub {
                position: absolute; top: 20px; right: 20px; 
                z-index: 11000; 
                pointer-events: auto;
            }

            .play-trigger {
                width: 90px; height: 90px; border-radius: 50%;
                background: #c5a059; border: 5px solid rgba(255,255,255,0.3); 
                cursor: pointer; font-size: 2.5rem; display: flex; align-items: center; justify-content: center;
                box-shadow: 0 0 40px rgba(197, 160, 89, 0.3);
                transition: all 0.2s ease;
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
                padding: 60px; background: rgba(197, 160, 89, 0.02);
                border-radius: 40px; border: 2px solid rgba(197, 160, 89, 0.2);
                box-shadow: inset 0 0 100px rgba(0,0,0,0.8);
            }

            .chat-line { margin-bottom: 45px; opacity: 0; transform: translateY(30px); animation: v-reveal 0.6s forwards; }
            @keyframes v-reveal { to { transform: translateY(0); opacity: 1; } }

            .name-tag { font-size: 2.2vw; font-weight: 800; color: #c5a059; text-transform: uppercase; margin-bottom: 8px; display: block; border-left: 4px solid #c5a059; padding-left: 15px; }
            .speech-text { font-size: 4vw; font-weight: 600; color: #ffffff; line-height: 1.1; text-shadow: 3px 3px 6px rgba(0,0,0,0.8); }

            .top-nav-info { position: absolute; top: 30px; left: 50%; transform: translateX(-50%); color: #c5a059; font-size: 1.5rem; letter-spacing: 6px; font-weight: bold; text-shadow: 0 0 10px rgba(197, 160, 89, 0.5); }
        </style>

        <div class="listening-theater">
            <div class="top-nav-info" id="convo-title">ADVANCED CONVERSATION 5 / 8</div>
            
            <div class="audio-control-hub">
                <button class="play-trigger" id="master-play" onclick="event.stopPropagation(); toggleAudio();">▶</button>
            </div>

            <div class="main-dialogue-area" id="convo-container"></div>
        </div>
    `;

    const convoContainer = document.getElementById('convo-container');
    const playBtn = document.getElementById('master-play');
    const titleTag = document.getElementById('convo-title');

    // --- Audio System ---
    window.toggleAudio = function() {
        const targetSrc = `${audioBaseUrl}${currentIdx + 1}.mp3`;
        
        if (audioPlayer.src !== targetSrc) {
            audioPlayer.src = targetSrc;
        }

        if (audioPlayer.paused) {
            audioPlayer.play().catch(err => console.error("Playback error:", err));
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

    // --- Render System ---
    function renderConversation(index) {
        audioPlayer.pause();
        playBtn.innerText = "▶";
        playBtn.classList.remove('active');
        
        // عرض الترقيم من 5 إلى 8
        titleTag.innerText = `ADVANCED CONVERSATION ${index + 5} / 8`;
        convoContainer.innerHTML = '';

        const cleanText = conversations[index].replace(/<break[^>]*>/g, '');
        const lines = cleanText.split(/(?=\[.*?\])/);

        lines.forEach((line, i) => {
            const match = line.match(/\[(.*?)\s-\s(.*?)\]:\s(.*)/);
            if (match) {
                const [_, name, mood, text] = match;
                const lineDiv = document.createElement('div');
                lineDiv.className = 'chat-line';
                lineDiv.style.animationDelay = `${i * 0.3}s`;
                lineDiv.innerHTML = `
                    <span class="name-tag">${name} (${mood})</span>
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
