/**
 * VETO PROGRAM - Listening Activity Module (Session 6)
 * Designed by: Veto Architect
 * Content: Level 1 - Session 6 (Conversations 5-8)
 */

(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- Data Storage (Session 6 Content) ---
    const conversations = [
        `[Ahmed - Wondering]: Was the Veto program famous in two thousand and five? <break time="1.5s" /> [Amy - Thinking]: I do not know. <break time="1.0s" /> Today is twenty twenty-five. <break time="1.5s" /> [Ahmed - Normal]: The world is very different now. <break time="1.5s" /> [Amy - Agreeing]: Yes, but learning English is always important. <break time="1.5s" /> [Ahmed - Enthusiastic]: I want to finish all twelve levels.`,
        `[Chris - Rushed]: Julia, what time is our Reading task? <break time="1.5s" /> [Julia - Calm]: It is at half past seven. <break time="1.5s" /> [Chris - Checking]: Is that seven thirty? <break time="1.5s" /> [Julia - Confirming]: Yes. <break time="1.0s" /> Do not forget to record your voice. <break time="1.5s" /> [Chris - Ready]: I have my phone and the story book.`,
        `[Amy - Asking]: Which month is the Graduation Project in? <break time="1.5s" /> [Ahmed - Explaining]: It is in Level eleven and twelve. <break time="1.5s" /> [Amy - Curious]: Is that in September or October? <break time="1.5s" /> [Ahmed - Thoughtful]: It depends on our start date. <break time="1.5s" /> [Amy - Excited]: I want to choose a great topic.`,
        `[Julia - Helping]: Look, Chris. <break time="1.0s" /> This is the calendar for April. <break time="1.5s" /> [Chris - Inspecting]: Our exam is on the twenty-second of April. <break time="1.5s" /> [Julia - Verifying]: Twenty-two slash zero four? <break time="1.5s" /> [Chris - Confirming]: Yes. <break time="1.0s" /> It is on a Tuesday. <break time="1.5s" /> [Julia - Motivated]: We have two weeks to study hard.`
    ];

    let currentIdx = 0;
    const audioPlayer = new Audio();
    
    // تحديث المسار إلى Session 6
    const audioBaseUrl = "https://raw.githubusercontent.com/eycfde-prog/EYCVetoProgram/main/data/Listening/Level-1/Session%206/";

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
        
        // تعديل الرقم المعروض ليكون 5-6-7-8 ليتوافق مع المحتوى
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
