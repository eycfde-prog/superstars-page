(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // مصفوفة الفيديوهات - ضيف روابط الفيديوهات هنا (mp4)
    const videos = [
        { id: 1, src: "https://drive.google.com/file/d/1EcME8uHrmHe57p3XQNuj0mxNV3q03cqh/view?usp=drive_link", title: "SCENE 01" },
        { id: 2, src: "LINK_2.mp4", title: "SCENE 02" },
        { id: 3, src: "LINK_3.mp4", title: "SCENE 03" },
        { id: 4, src: "LINK_4.mp4", title: "SCENE 04" },
        { id: 5, src: "LINK_5.mp4", title: "SCENE 05" },
        { id: 6, src: "LINK_6.mp4", title: "SCENE 06" },
        { id: 7, src: "LINK_7.mp4", title: "SCENE 07" },
        { id: 8, src: "LINK_8.mp4", title: "SCENE 08" },
        { id: 9, src: "LINK_9.mp4", title: "SCENE 09" },
        { id: 10, src: "LINK_10.mp4", title: "SCENE 10" }
    ];

    container.innerHTML = '';
    container.style.cssText = `
        height:100%; width:100%; background:#000; 
        display:flex; flex-direction:column; align-items:center; justify-content:center;
        font-family: 'Inter', sans-serif; overflow:hidden; position:relative;
    `;

    container.innerHTML = `
        <style>
            .video-grid {
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                grid-template-rows: repeat(2, 1fr);
                gap: 15px;
                width: 95%;
                height: 80%;
                z-index: 10;
            }
            .video-card {
                position: relative;
                background: #111;
                border: 2px solid #222;
                border-radius: 8px;
                overflow: hidden;
                cursor: pointer;
                transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            .video-card:hover {
                border-color: #ff0000;
                transform: scale(1.05);
                z-index: 20;
                box-shadow: 0 0 30px rgba(255,0,0,0.4);
            }
            .video-card video {
                width: 100%;
                height: 100%;
                object-fit: cover;
                opacity: 0.6;
                transition: 0.3s;
            }
            .video-card:hover video {
                opacity: 1;
            }
            .video-label {
                position: absolute;
                bottom: 10px;
                left: 10px;
                background: rgba(255,0,0,0.8);
                color: #fff;
                padding: 2px 10px;
                font-size: 0.8vw;
                font-weight: 900;
                border-radius: 4px;
                pointer-events: none;
            }
            .grid-header {
                margin-bottom: 20px;
                text-align: center;
                z-index: 10;
            }
            .grid-header h1 {
                color: #fff;
                font-size: 3vw;
                letter-spacing: 10px;
                margin: 0;
                text-transform: uppercase;
                font-weight: 900;
            }
            /* Scanline Effect */
            .scanline {
                position: absolute; inset: 0;
                background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.3) 51%);
                background-size: 100% 4px;
                pointer-events: none;
                z-index: 30;
                opacity: 0.2;
            }
        </style>
        
        <div class="scanline"></div>
        <div class="grid-header">
            <h1>CINEMATIC GALLERY</h1>
            <div style="color:#ff0000; font-weight:bold; letter-spacing:3px; animation: blink 1s infinite;">● VIDEO MONITORING ACTIVE</div>
        </div>
        <div class="video-grid" id="videoGrid"></div>

        <style> @keyframes blink { 50% { opacity: 0.2; } } </style>
    `;

    const grid = document.getElementById('videoGrid');

    videos.forEach(v => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.innerHTML = `
            <video muted loop playsinline src="${v.src}"></video>
            <div class="video-label">${v.title}</div>
        `;

        // تشغيل الفيديو عند الوقوف عليه (Preview)
        card.onmouseenter = () => card.querySelector('video').play();
        card.onmouseleave = () => {
            const vid = card.querySelector('video');
            vid.pause();
            vid.currentTime = 0;
        };

        // عند الضغط يشتغل فول سكرين بصوت
        card.onclick = () => {
            const vid = card.querySelector('video');
            vid.muted = false; // تشغيل الصوت عند التكبير
            
            if (vid.requestFullscreen) {
                vid.requestFullscreen();
            } else if (vid.webkitRequestFullscreen) {
                vid.webkitRequestFullscreen(); // Safari
            } else if (vid.msRequestFullscreen) {
                vid.msRequestFullscreen(); // IE11
            }
            
            vid.play();
        };

        grid.appendChild(card);
    });

    // إعادة كتم الصوت عند الخروج من الفول سكرين تلقائياً
    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
            const allVideos = container.querySelectorAll('video');
            allVideos.forEach(v => {
                v.muted = true;
                v.pause();
            });
        }
    });

})();
