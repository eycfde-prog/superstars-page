(function() {
    const container = document.getElementById('activityFinalContent');
    
    // 1. إعداد الحاوية الرئيسية (شفافة وبملء المساحة)
    container.innerHTML = ''; 
    container.style.cssText = `
        height: calc(100vh - 140px);
        overflow: hidden;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        font-family: 'Arial', sans-serif;
    `;

    // 2. بيانات السلايدات (المحتوى التعليمي)
    const slidesData = [
        { type: 'title', content: 'Subject Pronouns', subtitle: 'الدرس الأول: ضمائر الفاعل' },
        { type: 'grid', title: 'Subject Pronouns List', items: ['I', 'He', 'She', 'It', 'We', 'You', 'They'] },
        { 
            type: 'quiz', 
            question: '_______ am a teacher.', 
            options: ['I', 'He', 'She', 'It'], 
            correct: 0,
            category: 'subject'
        },
        { 
            type: 'quiz', 
            question: 'Ali is happy. _______ is playing.', 
            options: ['She', 'It', 'He', 'They'], 
            correct: 2,
            category: 'subject'
        },
        { type: 'title', content: 'Object Pronouns', subtitle: 'الدرس الثاني: ضمائر المفعول' },
        { 
            type: 'quiz', 
            question: 'Help _______, please! (I)', 
            options: ['I', 'me', 'my', 'mine'], 
            correct: 1,
            category: 'object'
        },
        { 
            type: 'table', 
            title: 'Subject vs Object',
            data: [['I','me'], ['He','him'], ['She','her'], ['It','it'], ['We','us'], ['You','you'], ['They','them']]
        },
        { type: 'end', content: 'End of Lesson', button: 'Go to Test' }
    ];

    let currentSlide = 0;

    // 3. وظيفة بناء السلايد
    function renderSlide(index) {
        container.innerHTML = '';
        const data = slidesData[index];
        const slideDiv = document.createElement('div');
        slideDiv.className = 'slide-wrapper';
        slideDiv.style.cssText = `
            width: 100%;
            max-width: 1000px;
            text-align: center;
            animation: slideInRight 0.5s forwards;
            color: #2c3e50;
        `;

        if (data.type === 'title') {
            slideDiv.innerHTML = `<h1 style="font-size: 5rem; margin:0;">${data.content}</h1><p style="font-size: 2rem;">${data.subtitle}</p>`;
        } 
        else if (data.type === 'grid') {
            slideDiv.innerHTML = `
                <h2 style="font-size: 2.5rem; color:#3498db;">${data.title}</h2>
                <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; margin-top: 30px;">
                    ${data.items.map(item => `<div style="background:rgba(255,255,255,0.8); padding: 30px 50px; border-radius: 15px; font-size: 3rem; font-weight: bold; box-shadow: 0 10px 20px rgba(0,0,0,0.1); border: 2px solid #3498db;">${item}</div>`).join('')}
                </div>`;
        }
        else if (data.type === 'quiz') {
            slideDiv.innerHTML = `
                <div style="font-size: 2.5rem; margin-bottom: 40px; font-weight: bold;">${data.question}</div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    ${data.options.map((opt, i) => `<button class="quiz-opt" onclick="window.checkAnswer(this, ${i === data.correct})" style="padding: 25px; font-size: 1.8rem; cursor: pointer; border: 2px solid #ddd; background: white; border-radius: 10px;">${opt}</button>`).join('')}
                </div>`;
        }
        else if (data.type === 'table') {
            slideDiv.innerHTML = `
                <h2 style="font-size: 2.5rem; margin-bottom: 20px;">Memory Table</h2>
                <table style="width: 80%; margin: auto; font-size: 2rem; background: white; border-collapse: collapse; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                    <tr style="background:#2c3e50; color:white;"><th>Subject</th><th>Object</th></tr>
                    ${data.data.map(row => `<tr style="border-bottom: 1px solid #eee;"><td>${row[0]}</td><td style="color:#c0392b; font-weight:bold;">${row[1]}</td></tr>`).join('')}
                </table>`;
        }
        else if (data.type === 'end') {
            slideDiv.innerHTML = `
                <h1 style="font-size: 4rem;">${data.content}</h1>
                <button onclick="alert('Navigating to test...')" style="padding: 20px 50px; font-size: 2rem; background: #27ae60; color: white; border: none; border-radius: 50px; cursor: pointer; margin-top: 30px;">${data.button}</button>`;
        }

        container.appendChild(slideDiv);
    }

    // 4. منطق الإجابة الصحيحة
    window.checkAnswer = function(btn, isCorrect) {
        if (isCorrect) {
            btn.style.backgroundColor = '#2ecc71';
            btn.style.color = 'white';
            btn.style.borderColor = '#27ae60';
            setTimeout(() => {
                if (currentSlide < slidesData.length - 1) {
                    currentSlide++;
                    renderSlide(currentSlide);
                }
            }, 1000);
        } else {
            btn.style.backgroundColor = '#e74c3c';
            btn.style.color = 'white';
            setTimeout(() => {
                btn.style.backgroundColor = 'white';
                btn.style.color = 'black';
            }, 500);
        }
    };

    // 5. التحكم بالكيبورد
    document.onkeydown = function(e) {
        if (e.keyCode === 39) { // سهم يمين
            if (currentSlide < slidesData.length - 1) {
                currentSlide++;
                renderSlide(currentSlide);
            }
        } else if (e.keyCode === 37) { // سهم يسار
            if (currentSlide > 0) {
                currentSlide--;
                renderSlide(currentSlide);
            }
        }
    };

    // إضافة الأنميشن في الـ CSS
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .quiz-opt:hover { background: #f1f1f1 !important; }
    `;
    document.head.appendChild(style);

    // البداية
    renderSlide(currentSlide);
})();
