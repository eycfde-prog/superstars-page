(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // --- إعدادات الجزء (تغير فقط هذه البيانات في النسخ الـ 40) ---
    const ttNumber = 1; 
    const ttSentence = "She sells sea shells by the sea shore, the shells she sells are shells I'm sure.";
    // -------------------------------------------------------

    container.innerHTML = ''; 
    container.style.cssText = `height:calc(100vh - 200px); display:flex; flex-direction:column; align-items:center; justify-content:center; background:#0f0f0f; color:#fff; overflow:hidden; padding:20px; font-family: 'Arial Rounded MT Bold', sans-serif;`;

    container.innerHTML = `
        <div style="width:100%; max-width:1000px; text-align:center;">
            <div style="background:#f1c40f; color:#000; display:inline-block; padding:5px 20px; font-weight:900; border-radius:50px; margin-bottom:20px; font-size:1.2rem; letter-spacing:2px;">
                TONGUE TWISTER #${ttNumber}
            </div>
            
            <div style="width:300px; height:300px; margin: 0 auto 30px; border-radius:50%; border:8px solid #f1c40f; overflow:hidden; box-shadow: 0 0 30px rgba(241, 196, 15, 0.3);">
                <img src="data/t-t/${ttNumber}.png" alt="Twister ${ttNumber}" style="width:100%; height:100%; object-fit:cover;">
            </div>

            <div style="background: rgba(255,255,255,0.05); padding:40px; border-radius:20px; border: 2px dashed #f1c40f; position:relative;">
                <p id="twisterText" style="font-size:3.5rem; line-height:1.2; font-weight:bold; color:#fff; margin:0; text-shadow: 2px 2px 10px rgba(0,0,0,0.5);">
                    ${ttSentence}
                </p>
                <div style="position:absolute; top:-20px; left:50%; transform:translateX(-50%); background:#0f0f0f; padding:0 15px; color:#f1c40f; font-size:2rem;">"</div>
            </div>

            <div style="margin-top:30px; color:#666; font-size:1.2rem; font-style:italic;">
                Try to say it 3 times fast! ⚡
            </div>
        </div>
    `;

    // تأثير خفيف: تكبير النص عند النقر عليه للتركيز
    const textElement = document.getElementById('twisterText');
    textElement.onclick = function() {
        this.style.color = (this.style.color === 'rgb(241, 196, 15)') ? '#fff' : '#f1c40f';
    };

})();
