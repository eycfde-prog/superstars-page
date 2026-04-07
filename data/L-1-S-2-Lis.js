/**
 * VETO PROGRAM - Listening Activity Module (V.2.0)
 * Updated: Audio Path Fix & Keyboard Support
 * Designed by: Veto Architect
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
    // تم تعديل المسار ليكون Raw وتعديل المجلدات حسب طلبك
    const audioBaseUrl = "https://raw.githubusercontent.com/eycfde-prog/EYCVetoProgram/main/data/Listening/Level-1/Session%201/";

    // --- UI Layout (The 4-Meter Rule) ---
    container.innerHTML = `
        <style>
            .listening-theater {
                height: 100%; width: 100%; 
                background: radial-gradient(circle at center, #1e1e1e 0%, #000 100%);
                display: flex; flex-direction: column; align-items: center; justify-content: center;
                color: #fff; font-family: 'Segoe UI', Roboto, sans-serif; position: relative; overflow: hidden;
            }
            
            .audio-control-hub {
                position: absolute; top: 30px; right: 40px; 
                z-index: 12000;
            }

            .play-trigger {
                width: 100px; height: 100px; border-radius: 50%;
                background: #c5a059; border: 6px solid rgba(255,255,255,0.2); 
                cursor: pointer; font-size: 3rem; display: flex; align-items: center; justify-content: center;
                box-shadow: 0 10px 40px rgba(0,0,0,0.6);
                transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                outline: none;
            }
            .play-trigger:active { transform: scale(0.9); }
            .play-trigger.active { background: #e74c3c; animation: v-pulse 1.5s infinite; }

            @keyframes v-pulse {
                0% { box-shadow: 0 0 0 0 rgba(231, 76, 60, 0.7); }
                70% { box-shadow: 0 0 0 40px rgba(231, 76, 60, 0); }
                100% { box-shadow: 0 0 0 0 rgba(231, 76, 60, 0); }
            }

            .main-dialogue-area {
                width: 90%; max-width: 1500px; 
                padding: 50px; background: rgba(255,255,255,0.02);
                border-radius: 50px; border: 1px solid rgba(197, 160, 89, 0.2);
                box-shadow: inset 0 0 80px rgba(0,0,0,0.8);
            }

            .chat-line { margin-bottom: 50px; opacity: 0; transform: translateX(-20px); animation: v-slideIn 0.5s forwards; }
            @keyframes v-slideIn { to { transform: translateX(0); opacity: 1; } }

            .name-tag { font-size: 1.8rem; font-weight: 900; color: #c5a059; letter-spacing: 2px; margin-bottom: 10px; display: block; }
            .speech-text { font-size: 3.5rem; font-weight: 700; color: #f0f0f0; line-height: 1.2; text-shadow: 4px 4px 8px rgba(0,0,0,0.9); }

            .top-nav-info { position: absolute; top: 40px; left: 50%; transform: translateX(-50%); color: #c5a059; font-size: 1.8rem; font-weight: bold; opacity: 0.7; }
        </style>

        <div class="listening-theater">
            <div class="top-nav-info" id="convo-title">LOADING...</div>
            
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
            audioPlayer.play().catch(e => console.log("Audio play blocked: ", e));
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
        audioPlayer.src = ''; // Reset source
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

    // --- Navigation & Keyboard ---
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

    // إضافة اختصارات الكيبورد (Space للتشغيل - الأسهم للتنقل)
    document.addEventListener('keydown', (e) => {
        if (e.code === "Space") {
            e.preventDefault();
            window.toggleAudio();
        } else if (e.code === "ArrowRight" || e.code === "Enter") {
            window.nextSlide();
        } else if (e.code === "ArrowLeft") {
            window.prevSlide();
        }
    });

    // Initialize
    renderConversation(currentIdx);
})();
