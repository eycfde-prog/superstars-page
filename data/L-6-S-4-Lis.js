/**
 * VETO PROGRAM - Listening Activity Module (Session 23)
 * Designed by: Veto Architect
 * Content: Level 1 - Session 23 (Conversations 9-12)
 */

(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Data Storage (Session 23 Content) ---
    const conversations = [
        `[Ahmed - Hungry]: I am so hungry. <break time="1.0s" /> I will order a pizza for us. <break time="1.5s" /> [Amy - Asking]: Are you going to pay with your new credit card? <break time="1.5s" /> [Ahmed - Replying]: Yes, I am. <break time="1.0s" /> Do you want anything else? <break time="1.5s" /> [Amy - Modest]: No, thank you. <break time="1.0s" /> But you must eat healthy food too. <break time="1.5s" /> [Ahmed - Smiling]: I will eat a salad with it.`,
        `[Chris - Surprised]: Look! <break time="1.0s" /> The teacher is checking our DMT recordings now. <break time="1.5s" /> [Julia - Nervous]: Oh! <break time="1.0s" /> He might give us some feedback today. <break time="1.5s" /> [Chris - Asking]: Should we go and talk to him about our progress? <break time="1.5s" /> [Julia - Decisive]: Yes, we should. <break time="1.0s" /> We must know our mistakes to improve. <break time="1.5s" /> [Chris - Ready]: Let's go then. <break time="1.0s" /> I will lead the way.`,
        `[Amy - Reflective]: I wish the Veto lessons were longer. <break time="1.5s" /> [Ahmed - Asking]: Why? <break time="1.0s" /> Do you find them too short? <break time="1.5s" /> [Amy - Replying]: Yes, because I enjoy every minute of the class. <break time="1.5s" /> [Ahmed - Happy]: I am going to tell the teacher about your feedback. <break time="1.5s" /> [Amy - Excited]: He might be happy to hear that from a student.`,
        `[Julia - Organizing]: We are having a small party after the level exam. <break time="1.5s" /> [Chris - Asking]: Who is going to bring the drinks? <break time="1.5s" /> [Julia - Replying]: I will bring the juice, and Ahmed is bringing the snacks. <break time="1.5s" /> [Chris - Offering]: Can I bring some cake for everyone? <break time="1.5s" /> [Julia - Approving]: Yes, you could. <break time="1.0s" /> That would be very nice of you.`
    ];

    let currentIdx = 0;
    const audioPlayer = new Audio();
    
    // توجيه المسار إلى Session 23
    const audioBaseUrl = "https://raw.githubusercontent.com/eycfde-prog/EYCVetoProgram/main/data/Listening/Level-1/Session%2023/";

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
            .play-trigger:active { background: #ff4757; animation: v-pulse 1.2s infinite; }

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
            <div class="top-nav-info" id="convo-title">CONVERSATION 9 / 12</div>
            
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
        
        // عرض الترقيم من 9 إلى 12
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
