/**
 * VETO PROGRAM - Listening Activity Module (Session 24)
 * Designed by: Veto Architect
 * Content: Level 1 - Session 24 (Conversations 13-16) - End of L6
 */

(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Data Storage (Session 24 Content) ---
    const conversations = [
        `[Ahmed - Planning]: I want to visit the city where my favorite author was born. <break time="1.5s" /> [Amy - Asking]: Is he the one who wrote "The Silent Valley"? <break time="1.5s" /> [Ahmed - Confirming]: Yes, that is the book which inspired me to learn English. <break time="1.5s" /> [Amy - Interested]: Although it is far, it would be a great trip. <break time="1.5s" /> [Ahmed - Excited]: The more I read his stories, the more I want to see his home.`,
        `[Chris - Worried]: I might have to call off my presentation due to my sore throat. <break time="1.5s" /> [Julia - Concerned]: That is a pity! <break time="1.0s" /> Is there anything that I can do to help? <break time="1.5s" /> [Chris - Replying]: No, but however much I want to speak, I simply can't. <break time="1.5s" /> [Julia - Advice]: You should rest. <break time="1.0s" /> In spite of the delay, the teacher will understand. <break time="1.5s" /> [Chris - Relieved]: I will send him an email right away.`,
        `[Amy - Checking]: Have you seen the person whose keys were found in the library? <break time="1.5s" /> [Ahmed - Replying]: Yes, it was Julia, who was looking for them everywhere. <break time="1.5s" /> [Amy - Asking]: Did she find the bag that she had also lost? <break time="1.5s" /> [Ahmed - Confirming]: No, however, she thinks she left it in the classroom. <break time="1.5s" /> [Amy - Hopeful]: I hope she finds it soon. <break time="1.0s" /> It has her Veto ID inside.`,
        `[Julia - Proud]: We have successfully reached the end of Level Six! <break time="1.5s" /> [Chris - Excited]: This is the level where we learned how to connect complex ideas. <break time="1.5s" /> [Julia - Asking]: Which activity is the one that helped you the most? <break time="1.5s" /> [Chris - Replying]: The DMT sessions, because the more I speak, the more fluent I become. <break time="1.5s" /> [Julia - Smiling]: Let's keep moving forward. <break time="1.0s" /> Level Seven is waiting for us.`
    ];

    let currentIdx = 0;
    const audioPlayer = new Audio();
    
    // توجيه المسار الصوتي إلى Session 24
    const audioBaseUrl = "https://raw.githubusercontent.com/eycfde-prog/EYCVetoProgram/main/data/Listening/Level-1/Session%2024/";

    // --- Layout (Veto Original Premium Theme) ---
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
        
        // الترقيم النهائي للمستوى: 13، 14، 15، 16
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
