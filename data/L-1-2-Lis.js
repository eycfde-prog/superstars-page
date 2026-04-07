(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // --- قاعدة بيانات المحادثات (تم تنقيتها برمجياً) ---
    const rawConversations = [
        "[Ahmed - Friendly]: I am very happy today. <break time='1.0s' /> Veto is a great place for us. <break time='1.5s' /> [Amy - Enthusiastic]: You are right. <break time='1.0s' /> Look! Julia is there. <break time='1.5s' /> [Ahmed - Curious]: Is she a teacher? <break time='1.5s' /> [Amy - Normal]: No, she is a student like us.",
        "[Chris - Slightly rushed]: Julia, where is my English book? <break time='1.0s' /> I need it now. <break time='1.5s' /> [Julia - Calm]: It is on the table. <break time='1.0s' /> Is this your blue pen? <break time='1.5s' /> [Chris - Relieved]: Yes, it is mine. <break time='1.5s' /> We are ready for the Veto lesson.",
        "[Amy - Friendly]: Ahmed, I have an orange in my bag. <break time='1.5s' /> [Ahmed - Simple]: I have two apples and a banana. <break time='1.5s' /> [Amy - Questioning]: Are they for lunch? <break time='1.5s' /> [Ahmed - Cheerful]: Yes, they are. <break time='1.0s' /> We can eat them at school.",
        "[Julia - Pointing]: Chris, look at him. <break time='1.0s' /> That is our teacher. <break time='1.5s' /> [Chris - Appreciative]: He is very kind. <break time='1.0s' /> He helps us every day. <break time='1.5s' /> [Julia - Positive]: I like his way of teaching. <break time='1.5s' /> [Chris - Proud]: Veto has the best teachers."
    ];

    let currentIndex = 0;

    // وظيفة لتنظيف النص من الملاحظات الصوتية
    function cleanText(text) {
        return text.replace(/<break[^>]*\/>/g, '') // إزالة الـ break
                   .split(/(?=\[)/g); // تقسيم النص عند كل اسم شخصية
    }

    // إعداد واجهة العرض
    container.innerHTML = '';
    container.style.cssText = `
        height:100%; width:100%; background: #0f172a; 
        display:flex; flex-direction:column; justify-content:center; align-items:center;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; overflow:hidden;
    `;

    // إضافة الستايل
    const style = document.createElement('style');
    style.innerHTML = `
        .convo-card {
            width: 90%; max-width: 1400px; height: 80vh;
            background: #1e293b; border-radius: 30px; padding: 40px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
            display: flex; flex-direction: column; gap: 25px;
            border: 2px solid #334155; transition: all 0.5s ease;
        }
        .convo-header {
            color: #38bdf8; font-size: 2vw; font-weight: bold;
            text-transform: uppercase; border-bottom: 2px solid #334155; padding-bottom: 15px;
        }
        .dialogue-line {
            display: flex; align-items: flex-start; gap: 20px;
            animation: slideIn 0.5s forwards; opacity: 0;
        }
        @keyframes slideIn {
            from { transform: translateX(-30px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .character-name {
            background: #38bdf8; color: #0f172a; padding: 5px 20px;
            border-radius: 12px; font-weight: 900; font-size: 1.8vw;
            min-width: 180px; text-align: center;
        }
        .character-text {
            color: #f8fafc; font-size: 3.2vw; line-height: 1.2; font-weight: 500;
        }
        .footer-hint {
            position: absolute; bottom: 20px; color: #64748b; font-size: 1.2vw;
        }
        .highlight { color: #fbbf24; } /* لتمييز كلمات معينة إن أردت */
    `;
    document.head.appendChild(style);

    function renderConversation(index) {
        const parts = cleanText(rawConversations[index]);
        
        container.innerHTML = `
            <div class="convo-card">
                <div class="convo-header">Listening Activity - Conversation ${index + 1} / ${rawConversations.length}</div>
                <div id="dialogue-container"></div>
            </div>
            <div class="footer-hint">Press [Enter] or [Space] for Next Conversation</div>
        `;

        const dialogueBox = document.getElementById('dialogue-container');
        
        parts.forEach((part, i) => {
            const match = part.match(/\[(.*?)\]:\s*(.*)/);
            if (match) {
                const name = match[1].split('-')[0].trim();
                const text = match[2].trim();
                
                const lineDiv = document.createElement('div');
                lineDiv.className = 'dialogue-line';
                lineDiv.style.animationDelay = `${i * 0.3}s`;
                lineDiv.innerHTML = `
                    <div class="character-name" style="background: ${getCharColor(name)}">${name}</div>
                    <div class="character-text">${text}</div>
                `;
                dialogueBox.appendChild(lineDiv);
            }
        });
    }

    function getCharColor(name) {
        const colors = {
            'Ahmed': '#4ade80',
            'Amy': '#f472b6',
            'Chris': '#fbbf24',
            'Julia': '#818cf8'
        };
        return colors[name] || '#38bdf8';
    }

    // التحكم بالكيبورد
    document.onkeydown = (e) => {
        if (e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 39) { // Enter, Space, Right Arrow
            currentIndex = (currentIndex + 1) % rawConversations.length;
            renderConversation(currentIndex);
        } else if (e.keyCode === 37) { // Left Arrow
            currentIndex = (currentIndex - 1 + rawConversations.length) % rawConversations.length;
            renderConversation(currentIndex);
        }
    };

    // التشغيل الأول
    renderConversation(0);

})();
