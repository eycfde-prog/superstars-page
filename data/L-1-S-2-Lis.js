(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // 1. بيانات المحادثات (مقسمة لسهولة العرض)
    const conversations = [
        {
            id: "L1-C1",
            lines: [
                { name: "Ahmed", mood: "Friendly", text: "I am very happy today. Veto is a great place for us." },
                { name: "Amy", mood: "Enthusiastic", text: "You are right. Look! Julia is there." },
                { name: "Ahmed", mood: "Curious", text: "Is she a teacher?" },
                { name: "Amy", mood: "Normal", text: "No, she is a student like us." }
            ]
        },
        {
            id: "L1-C2",
            lines: [
                { name: "Chris", mood: "Slightly rushed", text: "Julia, where is my English book? I need it now." },
                { name: "Julia", mood: "Calm", text: "It is on the table. Is this your blue pen?" },
                { name: "Chris", mood: "Relieved", text: "Yes, it is mine. We are ready for the Veto lesson." }
            ]
        },
        {
            id: "L1-C3",
            lines: [
                { name: "Amy", mood: "Friendly", text: "Ahmed, I have an orange in my bag." },
                { name: "Ahmed", mood: "Simple", text: "I have two apples and a banana." },
                { name: "Amy", mood: "Questioning", text: "Are they for lunch?" },
                { name: "Ahmed", mood: "Cheerful", text: "Yes, they are. We can eat them at school." }
            ]
        },
        {
            id: "L1-C4",
            lines: [
                { name: "Julia", mood: "Pointing", text: "Chris, look at him. That is our teacher." },
                { name: "Chris", mood: "Appreciative", text: "He is very kind. He helps us every day." },
                { name: "Julia", mood: "Positive", text: "I like his way of teaching." },
                { name: "Chris", mood: "Proud", text: "Veto has the best teachers." }
            ]
        }
    ];

    let currentIdx = 0;

    // 2. التنسيق البصري (Veto Listening Theme)
    const style = `
        <style>
            .listening-wrapper {
                height: 100%; width: 100%; 
                background: radial-gradient(circle, #0a0a0a 0%, #000 100%);
                display: flex; flex-direction: column; align-items: center; justify-content: center;
                color: #fff; font-family: 'Segoe UI', Roboto, sans-serif;
                padding: 40px; position: relative;
            }
            .conv-header {
                position: absolute; top: 30px; left: 50%; transform: translateX(-50%);
                color: var(--primary-gold, #c5a059); font-size: 2vw; font-weight: bold;
                letter-spacing: 5px; border-bottom: 2px solid #c5a059; padding-bottom: 5px;
            }
            .chat-container {
                width: 90%; max-width: 1200px; display: flex; flex-direction: column; gap: 30px;
            }
            .bubble {
                display: flex; flex-direction: column;
                animation: slideIn 0.5s ease forwards; opacity: 0;
            }
            .speaker-name {
                font-size: 1.8vw; font-weight: 800; text-transform: uppercase; margin-bottom: 5px;
                display: flex; align-items: center; gap: 15px;
            }
            .speaker-name span { font-size: 1.1vw; font-weight: normal; color: #888; text-transform: none; }
            .speaker-text {
                font-size: 3.5vw; line-height: 1.2; font-weight: 600;
                padding-left: 20px; border-left: 5px solid;
            }
            /* Colors for distinct speakers */
            .Ahmed { color: #4facfe; } .Amy { color: #f093fb; }
            .Chris { color: #43e97b; } .Julia { color: #fa709a; }
            
            .text-white { color: #f5f5f5; border-color: currentColor; }

            @keyframes slideIn {
                from { transform: translateX(30px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .progress-dots {
                position: absolute; bottom: 30px; display: flex; gap: 15px;
            }
            .dot { width: 12px; height: 12px; border-radius: 50%; background: #333; transition: 0.3s; }
            .dot.active { background: var(--primary-gold, #c5a059); transform: scale(1.5); }
        </style>
    `;

    // 3. وظيفة الرسم
    function render() {
        const conv = conversations[currentIdx];
        let contentHtml = `
            <div class="listening-wrapper">
                <div class="conv-header">${conv.id}</div>
                <div class="chat-container">
        `;

        conv.lines.forEach((line, i) => {
            contentHtml += `
                <div class="bubble" style="animation-delay: ${i * 0.3}s">
                    <div class="speaker-name ${line.name}">
                        ${line.name} <span>(${line.mood})</span>
                    </div>
                    <div class="speaker-text text-white">
                        ${line.text}
                    </div>
                </div>
            `;
        });

        contentHtml += `</div><div class="progress-dots">`;
        conversations.forEach((_, i) => {
            contentHtml += `<div class="dot ${i === currentIdx ? 'active' : ''}"></div>`;
        });
        contentHtml += `</div></div>`;

        container.innerHTML = style + contentHtml;
    }

    // 4. التحكم (مدمج مع نظام smart-board)
    window.nextSlide = function() {
        if (currentIdx < conversations.length - 1) {
            currentIdx++;
            render();
        } else {
            // وميض بسيط للإشارة للنهاية
            container.style.opacity = "0.5";
            setTimeout(() => container.style.opacity = "1", 100);
        }
    };

    window.prevSlide = function() {
        if (currentIdx > 0) {
            currentIdx--;
            render();
        }
    };

    // تشغيل العرض الأول
    render();
})();
