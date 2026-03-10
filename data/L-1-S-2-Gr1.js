(function() {
    const container = document.getElementById('activityFinalContent');
    
    // 1. إعداد الحاوية الرئيسية
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
        direction: ltr;
    `;

    // 2. بيانات درس الملكية (Possessives)
    const slidesData = [
        { type: 'title', content: 'Possessive Adjectives', subtitle: 'الدرس الثاني: صفات الملكية' },
        { 
            type: 'grid', 
            title: 'Possessive Adjectives (Followed by Noun)', 
            items: ['My', 'His', 'Her', 'Its', 'Our', 'Your', 'Their'],
            color: '#8e44ad'
        },
        { 
            type: 'quiz', 
            question: 'This is _______ book. (I)', 
            options: ['Me', 'My', 'Mine', 'I'], 
            correct: 1
        },
        { 
            type: 'quiz', 
            question: 'The cat is eating _______ food.', 
            options: ['Her', 'His', 'Its', 'It'], 
            correct: 2
        },
        { type: 'title', content: 'Possessive Pronouns', subtitle: 'الدرس الثاني: ضمائر الملكية' },
        { 
            type: 'grid', 
            title: 'Possessive Pronouns (Stand Alone)', 
            items: ['Mine', 'His', 'Hers', 'Its', 'Ours', 'Yours', 'Theirs'],
            color: '#27ae60'
        },
        { 
            type: 'quiz', 
            question: 'This car is _______! (We)', 
            options: ['Our', 'Ours', 'Us', 'We'], 
            correct: 1
        },
        { 
            type: 'table', 
            title: 'Full Ownership Table',
            data: [
                ['I', 'My', 'Mine'],
                ['He', 'His', 'His'],
                ['She', 'Her', 'Hers'],
                ['It', 'Its', 'Its'],
                ['We', 'Our', 'Ours'],
                ['You', 'Your', 'Yours'],
                ['They', 'Their', 'Theirs']
            ],
            headers: ['Subject', 'Adj', 'Pronoun']
        },
        { type: 'end', content: 'Well Done, Mr. Ezz Students!', button: 'Go to Test' }
    ];

    let currentSlide = 0;

    // 3. وظيفة بناء السلايد
    function renderSlide(index) {
        container.innerHTML = '';
        const data = slidesData[index];
        const slideDiv = document.createElement('div');
        slideDiv.style.cssText = `
            width: 100%;
            max-width: 1000px;
            text-align: center;
            animation: slideInRight 0.5s forwards;
            color: #2c3e50;
        `;

        if (data.type === 'title') {
            slideDiv.innerHTML = `<h1 style="font-size: 5rem; margin:0; color:#2c3e50;">${data.content}</h1><p style="font-size: 2.2rem; color:#7f8c8d;">${data.subtitle}</p>`;
        } 
        else if (data.type === 'grid') {
            slideDiv.innerHTML = `
                <h2 style="font-size: 2.8rem; color:${data.color}; margin-bottom:30px;">${data.title}</h2>
                <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
                    ${data.items.map(item => `<div style="background:rgba(255,255,255,0.9); padding: 25px 40px; border-radius: 15px; font-size: 2.8rem; font-weight: bold; box-shadow: 0 8px 15px rgba(0,0,0,0.1); border: 3px solid ${data.color};">${item}</div>`).join('')}
                </div>`;
        }
        else if (data.type === 'quiz') {
            slideDiv.innerHTML = `
                <div style="font-size: 3rem; margin-bottom: 50px; font-weight: bold; color:#2c3e50;">${data.question}</div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px;">
                    ${data.options.map((opt, i) => `<button class="quiz-opt" onclick="window.checkAnswer(this, ${i === data.correct})" style="padding: 30px; font-size: 2.2rem; cursor: pointer; border: 3px solid #dfe6e9; background: white; border-radius: 15px; transition: 0.3s;">${opt}</button>`).join('')}
                </div>`;
        }
        else if (data.type === 'table') {
            slideDiv.innerHTML = `
                <h2 style="font-size: 2.5rem; margin-bottom: 25px; color:#2980b9;">Comprehensive Review</h2>
                <table style="width: 100%; font-size: 1.8rem; background: white; border-collapse: collapse; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.15);">
                    <tr style="background:#2c3e50; color:white;">
                        ${data.headers.map(h => `<th style="padding:15px;">${h}</th>`).join('')}
                    </tr>
                    ${data.data.map(row => `
                        <tr style="border-bottom: 1px solid #eee;">
                            <td style="padding:12px;">${row[0]}</td>
                            <td style="padding:12px; color:#8e44ad; font-weight:bold;">${row[1]}</td>
                            <td style="padding:12px; color:#27ae60; font-weight:bold;">${row[2]}</td>
                        </tr>`).join('')}
                </table>`;
        }
        else if (data.type === 'end') {
            slideDiv.innerHTML = `
                <h1 style="font-size: 5rem; color:#27ae60;">${data.content}</h1>
                <button onclick="console.log('Redirecting...')" style="padding: 25px 60px; font-size: 2.5rem; background: #27ae60; color: white; border: none; border-radius: 50px; cursor: pointer; margin-top: 40px; box-shadow: 0 10px 20px rgba(39,174,96,0.3);">Go to Test</button>`;
        }

        container.appendChild(slideDiv);
    }

    // 4. منطق الإجابة
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
            }, 800);
        } else {
            btn.style.backgroundColor = '#e74c3c';
            btn.style.color = 'white';
            btn.style.transform = 'shake 0.5s'; // يمكن إضافة أنميشن اهتزاز هنا
            setTimeout(() => {
                btn.style.backgroundColor = 'white';
                btn.style.color = 'black';
            }, 600);
        }
    };

    // 5. التحكم بالكيبورد (يمين ويسار)
    document.onkeydown = function(e) {
        if (e.keyCode === 39) { // Right Arrow
            if (currentSlide < slidesData.length - 1) {
                currentSlide++;
                renderSlide(currentSlide);
            }
        } else if (e.keyCode === 37) { // Left Arrow
            if (currentSlide > 0) {
                currentSlide--;
                renderSlide(currentSlide);
            }
        }
    };

    // إضافة الأنميشن
    if (!document.getElementById('slideStyles')) {
        const style = document.createElement('style');
        style.id = 'slideStyles';
        style.innerHTML = `
            @keyframes slideInRight {
                from { transform: translateX(100px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .quiz-opt:hover { border-color: #3498db !important; background: #f8f9fa !important; }
        `;
        document.head.appendChild(style);
    }

    renderSlide(currentSlide);
})();
