/**
 * VETO PROGRAM - Listening Activity Module (Session 7)
 * Designed by: Veto Architect
 * Content: Level 1 - Session 7 (Conversations 9-12)
 */

(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Data Storage (Session 7 Content) ---
    const conversations = [
        `[Ahmed - Asking]: Do we have a class on Thursday? <break time="1.5s" /> [Amy - Checking]: No, our classes are on Sundays and Wednesdays. <break time="1.5s" /> [Ahmed - Relieved]: Good. <break time="1.0s" /> I can fix my computer on Thursday. <break time="1.5s" /> [Amy - Normal]: And I can visit our grandmother. <break time="1.5s" /> [Ahmed - Friendly]: Give her my best regards.`,
        `[Chris - Confused]: Is it twenty past eight or twenty to eight? <break time="1.5s" /> [Julia - Clarifying]: It is twenty to eight. <break time="1.0s" /> Look at the clock. <break time="1.5s" /> [Chris - Realizing]: Oh! <break time="1.0s" /> So it is seven forty. <break time="1.5s" /> [Julia - Smiling]: Yes. <break time="1.0s" /> You need to practice the analog clock more. <break time="1.5s" /> [Chris - Agreeing]: You are right, Julia.`,
        `[Amy - Curious]: Ahmed, what is your favorite month? <break time="1.5s" /> [Ahmed - Replying]: I like January because it is cold. <break time="1.5s" /> [Amy - Smiling]: I like June and July. <break time="1.5s" /> [Ahmed - Asking]: Is that because of the summer holiday? <break time="1.5s" /> [Amy - Happy]: Yes! <break time="1.0s" /> We can go to the beach.`,
        `[Julia - Observing]: This building is very old. <break time="1.5s" /> [Chris - Reading]: It says it is from nineteen ninety-eight. <break time="1.5s" /> [Julia - Comparing]: My house is from two thousand and ten. <break time="1.5s" /> [Chris - Normal]: Modern buildings are safer than ancient ones. <break time="1.5s" /> [Julia - Agreeing]: That is true. <break time="1.0s" /> Technology changes everything.`
    ];

    let currentIdx = 0;
    const audioPlayer = new Audio();
    
    // تحديث المسار إلى Session 7
    const audioBaseUrl = "https://raw.githubusercontent.com/eycfde-prog/EYCVetoProgram/main/data/Listening/Level-1/Session%207/";

    // --- Layout (The Veto Original Theme) ---
    container.innerHTML = `
        <style>
            .listening-theater {
                height: 100%; width: 100%; 
                background: radial-gradient(circle at center, #1a1a1a 0%, #000 100%);
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
                box-shadow: 0 0 30px rgba(0,0,0,0.8), 0 0 15px rgba(197, 160, 89, 0.4);
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
                padding: 60px; background: rgba(255,255,255,0.03);
                border-radius: 40px; border: 2px solid rgba(197, 160, 89, 0.15);
                box-shadow: inset 0 0 100px rgba(0,0,0,0.5);
            }

            .chat-line { margin-bottom: 45px; opacity: 0; transform: translateY(30px); animation: v-reveal 0.6s forwards; }
            @keyframes v-reveal { to { transform: translateY(0); opacity: 1; } }

            .name-tag { font-size: 2.2vw; font-weight: 800; color: #c5a059; text-transform: uppercase; margin-bottom: 8px; display: block; }
            .speech-text { font-size: 4vw; font-weight: 600; color: #ffffff; line-height: 1.1; text-shadow: 3px 3px 6px rgba(0,0,0,0.8); }

            .top-nav-info { position: absolute; top: 30px; left: 50%; transform: translateX(-50%); color: #c5a059; font-size: 1.5rem; letter-spacing: 4px; font-weight: bold; }
        </style>

        <div class="listening-theater">
            <div class="top-nav-info" id="convo-title">CONVERSATION 1</div>
            
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
        
        // عرض الترقيم الصحيح للمحادثات 9-10-11-12
        titleTag.innerText = `CONVERSATION ${index + 9} / 12`;
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
