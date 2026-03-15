(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // --- عناصر المشروع من ملفك (The 10 Keys) ---
    const projectKeys = [
        "Host", "Guest", "Characters", "Questions", "Answers",
        "Opening", "Closing", "Harmony", "Back", "T.V Show"
    ];

    // --- التنسيق البصري ---
    container.innerHTML = '';
    container.style.cssText = `height:calc(100vh - 100px); display:flex; flex-direction:column; align-items:center; justify-content:center; background:#000; color:#fff; font-family: 'Impact', sans-serif; position:relative; overflow:hidden;`;

    container.innerHTML = `
        <style>
            /* خلفية الاستوديو */
            .studio-overlay { position:absolute; inset:0; background: radial-gradient(circle, #1e3a8a 0%, #000 80%); opacity:0.6; z-index:1; }
            
            /* الكاميرا "On Air" */
            .on-air { 
                position:absolute; top:40px; right:60px; background:#ff0000; color:#fff; 
                padding:10px 30px; border-radius:5px; font-size:1.5rem; font-weight:bold;
                animation: blink 1.5s infinite; z-index:10; box-shadow: 0 0 20px #ff0000;
            }
            @keyframes blink { 0%, 100% { opacity:1; } 50% { opacity:0.3; } }

            .project-title { font-size:5rem; color:#fff; text-transform:uppercase; letter-spacing:10px; margin-bottom:10px; z-index:5; text-shadow: 0 0 20px #38bdf8; }
            .project-subtitle { font-size:1.5rem; color:#38bdf8; margin-bottom:50px; z-index:5; letter-spacing:2px; }

            /* شبكة العناصر الـ 10 */
            .keys-grid { 
                display:grid; grid-template-columns: repeat(5, 1fr); gap:15px; 
                width:90%; max-width:1100px; z-index:5; 
            }
            .key-box { 
                background:rgba(255,255,255,0.05); border:1px solid #38bdf8; 
                padding:20px 10px; text-align:center; border-radius:10px;
                font-family:'Segoe UI'; font-size:1.2rem; transition:0.3s;
                display:flex; align-items:center; justify-content:center;
            }
            .key-box:hover { background:#38bdf8; color:#000; transform:scale(1.05); box-shadow:0 0 20px #38bdf8; }
            
            /* تنبيه الجروبات */
            .group-info { 
                margin-top:50px; background:#fff; color:#000; padding:15px 40px; 
                border-radius:50px; font-size:1.2rem; z-index:5; font-family:'Segoe UI'; font-weight:bold;
            }
        </style>

        <div class="studio-overlay"></div>
        <div class="on-air">● ON AIR</div>

        <h1 class="project-title">PROJECT #1</h1>
        <p class="project-subtitle">THE ULTIMATE T.V SHOW EXPERIENCE</p>

        <div class="keys-grid" id="keysGrid"></div>

        <div class="group-info">
            Groups: 2 - 3 Students Only
        </div>
    `;

    const grid = document.getElementById('keysGrid');
    
    // ترتيب العناصر لعرضها (وضعت T.V Show في المركز أو النهاية حسب رغبتك)
    projectKeys.forEach(key => {
        const box = document.createElement('div');
        box.className = 'key-box';
        box.innerText = key;
        grid.appendChild(box);
    });

})();
