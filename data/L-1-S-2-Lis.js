(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // 1. البيانات (المستوى 1 - المحاضرة 2 - استماع)
    const conversations = [
        {
            id: "L1-C1",
            audio: "data/audio/L1-S2-C1.mp3", // تأكد من وجود المجلد والملف
            lines: [
                { name: "Ahmed", text: "I am very happy today. Veto is a great place for us." },
                { name: "Amy", text: "You are right. Look! Julia is there." },
                { name: "Ahmed", text: "Is she a teacher?" },
                { name: "Amy", text: "No, she is a student like us." }
            ]
        },
        {
            id: "L1-C2",
            audio: "data/audio/L1-S2-C2.mp3",
            lines: [
                { name: "Chris", text: "Julia, where is my English book? I need it now." },
                { name: "Julia", text: "It is on the table. Is this your blue pen?" },
                { name: "Chris", text: "Yes, it is mine. We are ready for the Veto lesson." }
            ]
        }
        // يمكنك إضافة C3 و C4 هنا بنفس النمط
    ];

    let currentIdx = 0;
    let currentAudio = null;

    // 2. التنسيق البصري (Veto Standard)
    const style = `
        <style>
            .listening-stage {
                height: 100%; width: 100%; background: #050505;
                display: flex; flex-direction: column; align-items: center; justify-content: center;
                color: #fff; font-family: 'Segoe UI', sans-serif; position: relative;
            }
            .audio-status {
                position: absolute; top: 20px; right: 20px;
                padding: 10px 20px; border-radius: 50px; background: #c5a059; color: #000;
                font-weight: bold; font-size: 1.2rem; display: none;
            }
            .chat-box { width: 85%; display: flex; flex-direction: column; gap: 25px; }
            .line-row { 
                opacity: 0; transform: translateY(20px); 
                animation: fadeInUp 0.6s forwards;
            }
            .speaker { 
                font-size: 2vw; font-weight: 900; margin-bottom: 5px; text-transform: uppercase;
            }
            .text-content { 
                font-size: 3.8vw; font-weight: 600; line-height: 1.2;
                border-left: 8px solid; padding-left: 20px;
            }
            /* Speaker Colors */
            .Ahmed { color: #4facfe; } .Amy { color: #f093fb; }
            .Chris { color: #43e97b; } .Julia { color: #fa709a; }
            .text-white { border-color: currentColor; color: #eee; }

            @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
            
            .controls-hint {
                position: absolute; bottom: 20px; color: #555; font-size: 1.2rem;
            }
        </style>
    `;

    // 3. وظائف التشغيل
    window.renderConversation = function() {
        if (currentAudio) { currentAudio.pause(); currentAudio = null; }
        
        const conv = conversations[currentIdx];
        let html = `
            <div class="listening-stage">
                <div id="audio-tag" class="audio-status">🔊 PLAYING...</div>
                <div class="chat-box">
        `;

        conv.lines.forEach((line, i) => {
            html += `
                <div class="line-row" style="animation-delay: ${i * 0.4}s">
                    <div class="speaker ${line.name}">${line.name}</div>
                    <div class="text-content text-white">${line.text}</div>
                </div>
            `;
        });

        html += `</div>
                <div class="controls-hint">Press ENTER or Click Sides to Navigate</div>
            </div>`;
        
        container.innerHTML = style + html;
    };

    window.playAudio = function() {
        const audioPath = conversations[currentIdx].audio;
        currentAudio = new Audio(audioPath);
        const statusTag = document.getElementById('audio-tag');

        currentAudio.play().then(() => {
            if(statusTag) statusTag.style.display = 'block';
        }).catch(err => {
            console.error("Veto Audio Error: Check if file exists at " + audioPath);
            if(statusTag) {
                statusTag.innerHTML = "❌ Audio Missing";
                statusTag.style.background = "#ff4757";
                statusTag.style.display = 'block';
            }
        });

        currentAudio.onended = () => { if(statusTag) statusTag.style.display = 'none'; };
    };

    // 4. الربط مع نظام Veto الأساسي
    window.nextSlide = function() {
        if (currentIdx < conversations.length - 1) {
            currentIdx++;
            renderConversation();
            // ننتظر قليلاً قبل تشغيل الصوت لضمان تحميل الصفحة
            setTimeout(playAudio, 500);
        } else {
            alert("End of Conversations");
        }
    };

    window.prevSlide = function() {
        if (currentIdx > 0) {
            currentIdx--;
            renderConversation();
            setTimeout(playAudio, 500);
        }
    };

    // البدء
    renderConversation();
    // تشغيل أول محادثة بمجرد ضغط المستر على النشاط
    setTimeout(playAudio, 800);

})();
