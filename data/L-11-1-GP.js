(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    function fixDropboxLink(url) {
        if (url.includes('dropbox.com')) {
            let directUrl = url.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
            if (directUrl.includes('dl=0')) {
                directUrl = directUrl.replace('dl=0', 'raw=1');
            } else if (!directUrl.includes('raw=1')) {
                directUrl += (directUrl.includes('?') ? '&' : '?') + 'raw=1';
            }
            return directUrl;
        }
        return url;
    }

    const videos = [
        { id: 1, src: fixDropboxLink("https://www.dropbox.com/scl/fi/lsztd3y0qf6a7lgbk3wqc/Sohila.mp4?rlkey=kv8tb28d16zk50tufntvz8gaw&st=yuoz3j2l&dl=0"), title: "SOHILA SCENE" },
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

    container.innerHTML = `
        <style>
            .video-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 15px; width: 95%; height: 80%; z-index: 10; }
            .video-card { position: relative; background: #111; border: 2px solid #222; border-radius: 12px; overflow: hidden; cursor: pointer; transition: 0.4s; }
            .video-card:hover { border-color: #ff0000; transform: scale(1.05); z-index: 20; }
            .video-card video { width: 100%; height: 100%; object-fit: cover; opacity: 0.5; transition: 0.4s; }
            .video-card:hover video { opacity: 1; }
            .video-label { position: absolute; bottom: 15px; left: 15px; background: #ff0000; color: #fff; padding: 4px 12px; font-size: 0.9vw; border-radius: 6px; pointer-events: none; }
            .grid-header { margin-bottom: 30px; text-align: center; z-index: 10; }
            .grid-header h1 { color: #fff; font-size: 3.5vw; letter-spacing: 15px; margin: 0; }
        </style>
        <div class="grid-header">
            <h1>VIDEO GALLERY</h1>
            <div style="color:#ff0000; font-weight:bold; font-size:1vw;">● SYSTEM ONLINE</div>
        </div>
        <div class="video-grid" id="videoGrid"></div>
    `;

    const grid = document.getElementById('videoGrid');

    videos.forEach(v => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.innerHTML = `
            <video muted loop playsinline crossorigin="anonymous" preload="metadata">
                <source src="${v.src}" type="video/mp4">
            </video>
            <div class="video-label">${v.title}</div>
        `;

        const vid = card.querySelector('video');

        card.onmouseenter = () => { vid.play().catch(() => {}); };
        card.onmouseleave = () => { vid.pause(); vid.currentTime = 0; };

        card.onclick = async () => {
            try {
                // 1. فك الكتم أولاً
                vid.muted = false;
                
                // 2. طلب الفول سكرين
                if (vid.requestFullscreen) {
                    await vid.requestFullscreen();
                } else if (vid.webkitRequestFullscreen) {
                    await vid.webkitRequestFullscreen();
                }

                // 3. "الجسر": التأكد من التشغيل بعد دخول الفول سكرين
                setTimeout(() => {
                    vid.play().catch(e => console.error("Playback failed:", e));
                }, 300); 

            } catch (err) {
                console.error("Fullscreen/Play Error:", err);
            }
        };

        grid.appendChild(card);
    });

    // مراقب الخروج من الفول سكرين
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
