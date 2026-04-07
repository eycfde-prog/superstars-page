/**
 * VETO PROGRAM - Listening Activity Module (Final Fix)
 * Designed by: Veto Architect
 * Target: Level 1 - Session 2
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
    
    // تصحيح المسار ليكون Raw Link لضمان عمله في المتصفح
    const audioBaseUrl = "https://raw.githubusercontent.com/eycfde-prog/EYCVetoProgram/main/data/Listening/1/1/";

    // --- Layout with Layer Fix ---
    container.innerHTML = `
        <style>
            .listening-theater {
                height: 100%; width: 100%; 
                background: radial-gradient(circle at center, #1a1a1a 0%, #000 100%);
                display: flex; flex-direction: column; align-items: center; justify-content: center;
                color: #fff; font-family: 'Segoe UI', sans-serif; position: relative; overflow: hidden;
            }
            
            .audio-control-hub {
                position: absolute; top: 30px; right: 30px; 
                z-index: 20000; /* أعلى طبقة ممكنة لتجاوز الـ Canvas والـ Hotspots */
                pointer-events: auto;
            }

            .play-trigger {
                width: 100px; height: 100px; border-radius: 50%;
                background: #c5a059; border: 6px solid rgba(255,255,255,0.4); 
                cursor: pointer; font-size: 3rem; display: flex; align-items: center; justify-content: center;
                box-shadow: 0 0 40px rgba(0,0,0,0.9);
                transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                -webkit-tap-highlight-color: transparent;
            }
            .play-trigger:active { transform: scale(0.9); }
            .play-trigger.active { background: #ff4757; animation: audio-pulse 1.2s infinite; }

            @keyframes audio-pulse {
                0% { box-shadow: 0 0 0 0 rgba(255, 71, 87, 0.8); }
                70% { box-shadow: 0 0 0 35px rgba(255, 71, 87, 0); }
                100% { box-shadow: 0 0 0 0 rgba(255, 71, 87, 0); }
            }

            .main-dialogue-area {
                width: 85%; max-width: 1400px; 
                padding: 60px; background: rgba(255,255,255,0.03);
                border-radius: 40px; border: 2px solid rgba(197, 160, 89, 0.15);
            }

            .chat-line { margin-bottom: 45px; opacity: 0; transform: translateY(30px); animation: v-reveal 0.6s forwards; }
            @keyframes v-reveal { to { transform: translateY(0); opacity: 1; } }

            .name-tag { font-size: 2.2vw; font-weight: 800; color: #c5a059; text-transform: uppercase; margin-bottom: 8px; display: block; }
            .speech-text { font-size: 4vw; font-weight: 600; color: #ffffff; line-height: 1.1; text-shadow: 3px 3px 6px rgba(0,0,0,0.8); }

            .top-nav-info { position: absolute; top: 30px; left: 50%; transform: translateX(-50%); color: #c5a059; font-size: 1.6rem; font-weight: bold; }
        </style>

        <div class="listening-theater" id="theater-bg">
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

    // --- Audio System ---
    window.toggleAudio = function() {
        const targetSrc = `${audioBaseUrl}${currentIdx + 1}.mp3`;
        
        // إذا تغير المسار أو لم يتم التحميل بعد
        if (audioPlayer.src !== targetSrc) {
            audioPlayer.src = targetSrc;
            audioPlayer.load(); 
        }

        if (audioPlayer.paused) {
            const playPromise = audioPlayer.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    playBtn.innerText = "⏸";
                    playBtn.classList.add('active');
                }).catch(error => {
                    console.error("Playback failed:", error);
                    alert("Click again or check your internet.");
                });
            }
        } else {
            audioPlayer.pause();
            playBtn.innerText = "▶";
            playBtn.classList.remove('active');
        }
    };

    // ربط الزر برمجياً لضمان العمل مع الـ Z-index العالي
    playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleAudio();
    });

    audioPlayer.onended = () => {
        playBtn.innerText = "▶";
        playBtn.classList.remove('active');
    };

    // --- Render System ---
    function renderConversation(index) {
        audioPlayer.pause();
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
                lineDiv.style.animationDelay = `${i * 0.3}s`;
                lineDiv.innerHTML = `
                    <span class="name-tag">${name}</span>
                    <span class="speech-text">${text.trim()}</span>
                `;
                convoContainer.appendChild(lineDiv);
            }
        });
    }

    // --- Navigation Integration ---
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

    // Keyboard Shortcuts
    document.onkeydown = (e) => {
        if (e.key === "Enter" || e.key === "ArrowRight") nextSlide();
        if (e.key === "ArrowLeft") prevSlide();
        if (e.key === " ") { e.preventDefault(); toggleAudio(); }
    };

    // Start
    renderConversation(currentIdx);
})();
