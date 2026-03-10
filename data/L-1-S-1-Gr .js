(function() {
    const container = document.getElementById('activityFinalContent');
    
    // 1. تنظيف المساحة وضبط الإعدادات الرئيسية
    container.innerHTML = ''; 
    container.style.height = "calc(100vh - 140px)";
    container.style.overflowY = "auto";
    container.style.padding = "20px";
    container.style.boxSizing = "border-box";
    container.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    container.style.direction = "ltr";

    // 2. محتوى النشاط (هيكل السلايدز التعليمية)
    const activityHTML = `
        <div class="activity-inner-wrapper" style="max-width: 900px; margin: auto; color: #2c3e50;">
            
            <div style="text-align: center; margin-bottom: 50px; border-bottom: 4px solid #3498db; padding-bottom: 20px;">
                <h1 style="font-size: 3.5rem; color: #2980b9; margin: 0;">Subject Pronouns</h1>
                <p style="font-size: 1.2rem; color: #7f8c8d;">Part 1: The Doer of the Action</p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 15px; margin-bottom: 40px;">
                ${['I', 'He', 'She', 'It', 'We', 'You', 'They'].map(p => `
                    <div style="background: #ecf0f1; padding: 20px; text-align: center; border-radius: 10px; font-size: 2rem; font-weight: bold; color: #e67e22; border: 2px dashed #bdc3c7;">
                        ${p}
                    </div>
                `).join('')}
            </div>

            <div style="background: #fdfefe; border: 2px solid #3498db; padding: 30px; border-radius: 15px; margin-bottom: 50px; text-align: center;">
                <h2 style="color: #2980b9;">Write These Down:</h2>
                <div style="font-size: 2.5rem; letter-spacing: 15px; font-weight: bold; line-height: 2;">
                    I - HE - SHE - IT - WE - YOU - THEY
                </div>
            </div>

            <div style="margin-bottom: 60px;">
                <h3 style="background: #3498db; color: white; padding: 10px 20px; border-radius: 5px;">Practice: Choose the correct Subject Pronoun</h3>
                <div id="subjectQuiz" style="margin-top: 20px;">
                    ${generateQuestions('subject', 10)}
                </div>
            </div>

            <hr style="margin: 60px 0; border: 0; border-top: 5px double #bdc3c7;">

            <div style="text-align: center; margin-bottom: 50px;">
                <h1 style="font-size: 3.5rem; color: #c0392b; margin: 0;">Object Pronouns</h1>
                <p style="font-size: 1.2rem; color: #7f8c8d;">Part 2: The Receiver of the Action</p>
            </div>

            <div style="margin-bottom: 50px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 1.5rem; text-align: center;">
                    <thead>
                        <tr style="background: #2c3e50; color: white;">
                            <th style="padding: 15px; border: 1px solid #ddd;">Subject</th>
                            <th style="padding: 15px; border: 1px solid #ddd;">Object</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${[ ['I','me'], ['He','him'], ['She','her'], ['It','it'], ['We','us'], ['You','you'], ['They','them'] ].map(pair => `
                            <tr>
                                <td style="padding: 15px; border: 1px solid #ddd; background: #f9f9f9;">${pair[0]}</td>
                                <td style="padding: 15px; border: 1px solid #ddd; font-weight: bold; color: #c0392b;">${pair[1]}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div>
                <h3 style="background: #c0392b; color: white; padding: 10px 20px; border-radius: 5px;">Practice: Choose the correct Object Pronoun</h3>
                <div id="objectQuiz" style="margin-top: 20px;">
                    ${generateQuestions('object', 10)}
                </div>
            </div>

        </div>
    `;

    container.innerHTML = activityHTML;

    // وظيفة مساعدة لتوليد الأسئلة بشكل منظم
    function generateQuestions(type, count) {
        let qs = '';
        for(let i=1; i<=count; i++) {
            qs += `
                <div style="margin-bottom: 25px; padding: 15px; border-left: 5px solid ${type === 'subject' ? '#3498db' : '#c0392b'}; background: #fff;">
                    <p style="font-size: 1.1rem; margin-bottom: 10px;"><b>${i}.</b> ${type === 'subject' ? '_______ is a teacher.' : 'Can you help _______?'}</p>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                        <button style="padding: 10px; cursor: pointer; border: 1px solid #ddd; background: white;">Option A</button>
                        <button style="padding: 10px; cursor: pointer; border: 1px solid #ddd; background: white;">Option B</button>
                        <button style="padding: 10px; cursor: pointer; border: 1px solid #ddd; background: white;">Option C</button>
                        <button style="padding: 10px; cursor: pointer; border: 1px solid #ddd; background: white;">Option D</button>
                    </div>
                </div>
            `;
        }
        return qs;
    }

})();
