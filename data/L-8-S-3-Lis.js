/**
 * VETO PROGRAM - Listening Activity Module (Session 30)
 * Designed by: Veto Architect
 * Content: Level 1 - Session 30 (Conversations 5-8)
 */

(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Data Storage (Session 30 Content) ---
    const conversations = [
        `[Chris - Observant]: The teacher told the students to be quiet during the exam. <break time="1.5s" /> [Julia - Asking]: Did he also ask them to turn off their mobile phones? <break time="1.5s" /> [Chris - Confirming]: Yes, he ordered everyone to put their phones inside their bags. <break time="1.5s" /> [Julia - Wise]: That is necessary because any noise could have distracted the students. <break time="1.5s" /> [Chris - Agreeing]: I totally agree. <break time="1.0s" /> Concentration is the key to success.`,
        `[Ahmed - Imaginative]: If Veto hadn't created this program, my English wouldn't have improved so fast. <break time="1.5s" /> [Amy - Reflective]: I feel the same way. <break time="1.0s" /> If I hadn't joined, I would have missed a lot. <break time="1.5s" /> [Ahmed - Asking]: What would you have done if you hadn't found this institute? <break time="1.5s" /> [Amy - Thinking]: I might have taken a traditional course, but it wouldn't have been this fun. <break time="1.5s" /> [Ahmed - Proud]: We are lucky to be part of this community.`,
        `[Julia - Deductive]: Ahmed looks very happy today. <break time="1.0s" /> He must have passed his test. <break time="1.5s" /> [Chris - Confirming]: Yes, he told me that he had received the highest grade in class. <break time="1.5s" /> [Julia - Happy]: He worked so hard, so he couldn't have failed anyway. <break time="1.5s" /> [Chris - Normal]: He said that he would celebrate with his family tonight. <break time="1.5s" /> [Julia - Smiling]: He deserves it after all that effort.`,
        `[Amy - Asking]: What did the doctor say about your health, Ahmed? <break time="1.5s" /> [Ahmed - Replying]: He said that I needed to take a rest for a few days. <break time="1.5s" /> [Amy - Advice]: You should have listened to him from the beginning. <break time="1.5s" /> [Ahmed - Normal]: He also told me that I should eat more fruits and vegetables. <break time="1.5s" /> [Amy - Caring]: I will prepare a healthy salad for you then.`
    ];

    let currentIdx = 0;
    const audioPlayer = new Audio();
    
    // توجيه المسار الصوتي إلى Session 30
    const audioBaseUrl = "https://raw.githubusercontent.com/eycfde-prog/EYCVetoProgram/main/data/Listening/Level-1/Session%2030/";

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
            <div class="top-nav-info" id="convo-title">CONVERSATION 5 / 8</div>
            
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
        
        titleTag.innerText = `CONVERSATION ${index + 5} / 8`;
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
