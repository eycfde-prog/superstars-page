/**
 * VETO PROGRAM - Listening Activity Module (Session 32)
 * Designed by: Veto Architect
 * Content: Level 1 - Session 32 (Conversations 13-16) - End of L8
 */

(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Data Storage (Session 32 Content) ---
    const conversations = [
        `[Chris - Curious]: If you hadn't chosen English, what language would you have learned? <break time="1.5s" /> [Julia - Thinking]: I think I might have chosen Spanish or Italian. <break time="1.5s" /> [Chris - Asking]: Would you have enjoyed learning them as much as English? <break time="1.5s" /> [Julia - Honest]: Probably not, because English is the global language of the world. <break time="1.5s" /> [Chris - Agreeing]: That is why we should have started learning it much earlier.`,
        `[Ahmed - Asking]: Where is my blue folder? <break time="1.0s" /> I can't find it. <break time="1.5s" /> [Amy - Deductive]: You must have left it in the car this morning. <break time="1.5s" /> [Ahmed - Denying]: No, I couldn't have left it there because I used it in class. <break time="1.5s" /> [Amy - Thinking]: Then someone might have taken it by mistake. <break time="1.5s" /> [Ahmed - Relieved]: Oh, wait! <break time="1.0s" /> Julia just told me that she had found it.`,
        `[Julia - Reporting]: Amy told me that she had been practicing her DMT for three hours. <break time="1.5s" /> [Chris - Impressed]: Wow! <break time="1.0s" /> She must have been very exhausted after that. <break time="1.5s" /> [Julia - Normal]: She said that she wanted to be perfectly prepared for the presentation. <break time="1.5s" /> [Chris - Asking]: Did she say when her talk would be? <break time="1.5s" /> [Julia - Replying]: She said that it would be the following Wednesday.`,
        `[Ahmed - Proud]: We have successfully completed Level Eight, Amy! <break time="1.5s" /> [Amy - Excited]: I am so proud of our progress. <break time="1.0s" /> We have learned a lot. <break time="1.5s" /> [Ahmed - Asking]: If we hadn't been persistent, would we have reached this level? <break time="1.5s" /> [Amy - Confident]: No, we wouldn't have. <break time="1.0s" /> Determination was the key. <break time="1.5s" /> [Ahmed - Ready]: Now, let's prepare ourselves for the challenges of Level Nine.`
    ];

    let currentIdx = 0;
    const audioPlayer = new Audio();
    
    // توجيه المسار الصوتي إلى Session 32
    const audioBaseUrl = "https://raw.githubusercontent.com/eycfde-prog/EYCVetoProgram/main/data/Listening/Level-1/Session%2032/";

    // --- Layout (The Veto Original Premium Theme) ---
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
            <div class="top-nav-info" id="convo-title">CONVERSATION 13 / 16</div>
            
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
        
        // الترقيم النهائي للمستوى الثامن: 13، 14، 15، 16
        titleTag.innerText = `CONVERSATION ${index + 13} / 16`;
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
