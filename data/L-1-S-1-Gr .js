(function() {
    const container = document.getElementById('activityFinalContent');
    
    // 1. تنظيف المساحة قبل العرض
    container.innerHTML = ''; 

    // 2. ضبط الاستايل العام (المواصفات التقنية المعتمدة)
    container.style.height = "calc(100vh - 140px)";
    container.style.overflowY = "auto";
    container.style.padding = "20px";
    container.style.boxSizing = "border-box";
    container.style.direction = "ltr"; // لضمان اتجاه اللغة الإنجليزية

    // 3. بناء محتوى النشاط
    const activityHTML = `
        <div class="activity-inner-wrapper" style="max-width: 900px; margin: auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6;">
            
            <div style="text-align: center; border-bottom: 3px solid #e74c3c; margin-bottom: 30px; padding-bottom: 10px;">
                <h1 style="color: #e74c3c; font-size: 3rem; text-transform: uppercase;">Subject & Object Pronouns</h1>
                <p style="color: #555;">Level 1 - Session 1: Grammar Basics</p>
            </div>

            <section style="margin-bottom: 50px;">
                <h2 style="background: #3498db; color: white; padding: 10px 20px; border-radius: 8px;">1. Subject Pronouns (ضمائر الفاعل)</h2>
                <p style="font-size: 1.2rem; color: #2c3e50;">We use subject pronouns to replace the noun that does the action.</p>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 15px; margin: 25px 0;">
                    ${['I', 'He', 'She', 'It', 'We', 'You', 'They'].map(p => `
                        <div style="border: 2px dashed #3498db; padding: 20px; text-align: center; border-radius: 10px;">
                            <span style="font-size: 2.5rem; display: block; font-weight: bold; color: #2980b9;">${p}</span>
                            <input type="text" placeholder="Write here..." style="width: 100%; margin-top: 10px; border: 1px solid #ccc; border-radius: 4px; text-align: center;">
                        </div>
                    `).join('')}
                </div>

                <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; border-left: 5px solid #3498db;">
                    <h3 style="color: #2980b9;">Exercise: Choose the correct Subject Pronoun</h3>
                    <div id="subject-questions">
                        <div style="margin-bottom: 15px; padding: 10px; border-bottom: 1px solid #eee;">
                            <p style="font-size: 1.1rem;">1. ______ is a doctor. (Ahmed)</p>
                            <label><input type="radio" name="q1"> He</label> | 
                            <label><input type="radio" name="q1"> She</label> | 
                            <label><input type="radio" name="q1"> It</label> | 
                            <label><input type="radio" name="q1"> They</label>
                        </div>
                        </div>
                </div>
            </section>

            <section style="margin-bottom: 50px;">
                <h2 style="background: #27ae60; color: white; padding: 10px 20px; border-radius: 8px;">2. Object Pronouns (ضمائر المفعول به)</h2>
                
                <div style="margin: 25px 0;">
                    <table style="width: 100%; border-collapse: collapse; background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <thead>
                            <tr style="background: #2ecc71; color: white;">
                                <th style="padding: 15px; border: 1px solid #ddd;">Subject</th>
                                <th style="padding: 15px; border: 1px solid #ddd;">Object (Write it!)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${[
                                {s: 'I', o: 'Me'}, {s: 'He', o: 'Him'}, {s: 'She', o: 'Her'}, 
                                {s: 'It', o: 'It'}, {s: 'We', o: 'Us'}, {s: 'You', o: 'You'}, {s: 'They', o: 'Them'}
                            ].map(pair => `
                                <tr>
                                    <td style="padding: 15px; border: 1px solid #ddd; text-align: center; font-weight: bold; font-size: 1.5rem;">${pair.s}</td>
                                    <td style="padding: 15px; border: 1px solid #ddd;">
                                        <input type="text" placeholder="Type ${pair.o} here" style="width: 90%; padding: 10px; font-size: 1.2rem; border: 1px solid #27ae60; border-radius: 5px;">
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>

                <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; border-left: 5px solid #27ae60;">
                    <h3 style="color: #27ae60;">Exercise: Choose the correct Object Pronoun</h3>
                    <div id="object-questions">
                        <div style="margin-bottom: 15px; padding: 10px; border-bottom: 1px solid #eee;">
                            <p style="font-size: 1.1rem;">1. Can you help ______? (I)</p>
                            <label><input type="radio" name="oq1"> me</label> | 
                            <label><input type="radio" name="oq1"> him</label> | 
                            <label><input type="radio" name="oq1"> her</label> | 
                            <label><input type="radio" name="oq1"> us</label>
                        </div>
                        </div>
                </div>
            </section>

            <button onclick="alert('تم حفظ إجاباتك بنجاح!')" style="display: block; width: 100%; padding: 20px; background: #e74c3c; color: white; border: none; border-radius: 10px; font-size: 1.5rem; cursor: pointer; transition: 0.3s;">
                Submit My Answers
            </button>
        </div>
    `;

    container.innerHTML = activityHTML;
})();
