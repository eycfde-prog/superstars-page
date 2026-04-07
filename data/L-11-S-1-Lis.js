/**
 * VETO PROGRAM - Listening Activity Module (Session 40)
 * Designed by: Veto Architect
 * Content: Level 1 - Session 40 (Conversations 13-16) - Level 10 Finale
 */

(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Data Storage (Session 40 Content) ---
    const conversations = [
        `[Ahmed - Serious]: It is vital that we follow the protocol. <break time="1.5s" /> [Amy - Asking]: What will have happened if we ignore the safety rules? <break time="1.5s" /> [Ahmed - Warning]: Many errors will have been made by the time we realize it. <break time="1.5s" /> [Amy - Normal]: Therefore, we must be extremely cautious at every step. <break time="1.5s" /> [Ahmed - Confirming]: Absolutely. <break time="1.0s" /> Safety first.`,
        `[Chris - Excited]: I just heard the news! <break time="1.0s" /> We won the scholarship! <break time="1.5s" /> [Julia - Overjoyed]: Not only is this a great opportunity, but it is also a dream come true. <break time="1.5s" /> [Chris - Planning]: By this time next month, we will have been preparing for our trip to London. <break time="1.5s" /> [Julia - Happy]: I can't believe it. <break time="1.0s" /> We have finally made it.`,
        `[Amy - Checking]: Has the teacher sent the graduation requirements? <break time="1.5s" /> [Ahmed - Confirming]: Yes. <break time="1.0s" /> We will have submitted our final projects by the end of Level Eleven. <break time="1.5s" /> [Amy - Asking]: Will we have been working on them for the whole semester? <break time="1.5s" /> [Ahmed - Replying]: Yes, and consequently, they should be of very high quality.`,
        `[Julia - Proud]: We have successfully completed Level Ten! <break time="1.5s" /> [Chris - Excited]: Only now do I feel like a truly advanced English speaker. <break time="1.5s" /> [Julia - Asking]: Will you have reached full fluency by the end of the year? <break time="1.5s" /> [Chris - Confident]: I will have been practicing for so long that it will be natural. <break time="1.5s" /> [Julia - Smiling]: Let's conquer Level Eleven next!`
    ];

    let currentIdx = 0;
    const audioPlayer = new Audio();
    
    // توجيه المسار الصوتي إلى Session 40
    const audioBaseUrl = "https://raw.githubusercontent.com/eycfde-prog/EYCVetoProgram/main/data/Listening/Level-1/Session%2040/";

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
                box-shadow: 0 0 40px rgba(197, 160, 89, 0.4);
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
                padding: 60px; background: rgba(197, 160, 89, 0.03);
                border-radius: 40px; border: 2px solid rgba(197, 160, 89, 0.25);
                box-shadow: inset 0 0 120px rgba(0,0,0,0.9);
            }

            .chat-line { margin-bottom: 45px; opacity: 0; transform: translateY(30px); animation: v-reveal 0.6s forwards; }
            @keyframes v-reveal { to { transform: translateY(0); opacity: 1; } }

            .name-tag { font-size: 2.2vw; font-weight: 800; color: #c5a059; text-transform: uppercase; margin-bottom: 8px; display: block; border-left: 5px solid #c5a059; padding-left: 18px; }
            .speech-text { font-size: 4vw; font-weight: 600; color: #ffffff; line-height: 1.1; text-shadow: 3px 3px 6px rgba(0,0,0,0.9); }

            .top-nav-info { position: absolute; top: 30px; left: 50%; transform: translateX(-50%); color: #c5a059; font-size: 1.6rem; letter-spacing: 8px; font-weight: bold; text-shadow: 0 0 15px rgba(197, 160, 89, 0.6); }
            
            .completion-badge {
                position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
                font-size: 1.2rem; color: #c5a059; border: 1px solid #c5a059; padding: 10px 30px; border-radius: 50px;
                background: rgba(197, 160, 89, 0.1); display: none;
            }
        </style>

        <div class="listening-theater">
            <div class="top-nav-info" id="convo-title">LEVEL 10 FINALE 13 / 16</div>
            
            <div class="audio-control-hub">
                <button class="play-trigger" id="master-play" onclick="event.stopPropagation(); toggleAudio();">▶</button>
            </div>

            <div class="main-dialogue-area" id="convo-container"></div>
            <div class="completion-badge" id="end-badge">LEVEL TEN COMPLETED</div>
        </div>
    `;

    const convoContainer = document.getElementById('convo-container');
    const playBtn = document.getElementById('master-play');
    const titleTag = document.getElementById('convo-title');
    const endBadge = document.getElementById('end-badge');

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
        if (currentIdx === conversations.length - 1) {
            endBadge.style.display = 'block';
        }
    };

    // --- Render System ---
    function renderConversation(index) {
        audioPlayer.pause();
        playBtn.innerText = "▶";
        playBtn.classList.remove('active');
        endBadge.style.display = 'none';
        
        titleTag.innerText = `LEVEL 10 FINALE ${index + 13} / 16`;
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
