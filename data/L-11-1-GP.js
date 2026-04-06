(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    // "Charly" Audit: Fixed Dropbox URL logic to point to the direct content stream.
    // The previous '?raw=1' or '?dl=0' can sometimes be blocked or redirected by CORS policy in Web Apps.
    // Switching to 'dl.dropboxusercontent.com' is the reliable "Bridge" for direct video streaming.
    function fixDropboxLink(url) {
        if (url.includes('dropbox.com')) {
            return url.replace('www.dropbox.com', 'dl.dropboxusercontent.com').split('?')[0];
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
                border-radius: 12px;
                overflow: hidden;
                cursor: pointer;
                transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                box-shadow: 0 4px 15px rgba(0,0,0,0.5);
            }
            .video-card:hover {
                border-color: #ff0000;
                transform: scale(1.05);
                z-index: 20;
                box-shadow: 0 0 40px rgba(255,0,0,0.5);
            }
            .video-card video {
                width: 100%;
                height: 100%;
                object-fit: cover;
                opacity: 0.5;
                transition: 0.4s;
            }
            .video-card:hover video {
                opacity: 1;
            }
            .video-label {
                position: absolute;
                bottom: 15px;
                left: 15px;
                background: linear-gradient(90deg, #ff0000, #990000);
                color: #fff;
                padding: 4px 12px;
                font-size: 0.9vw;
                font-weight: 900;
                border-radius: 6px;
                pointer-events: none;
                letter-spacing: 1px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.5);
            }
            .grid-header {
                margin-bottom: 30px;
                text-align: center;
                z-index: 10;
            }
            .grid-header h1 {
                color: #fff;
                font-size: 3.5vw;
                letter-spacing: 15px;
                margin: 0;
                text-transform: uppercase;
                font-weight: 900;
                text-shadow: 0 0 20px rgba(255,255,255,0.3);
            }
            .scanline {
                position: absolute; inset: 0;
                background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.4) 51%);
                background-size: 100% 4px;
                pointer-events: none;
                z-index: 30;
                opacity: 0.15;
            }
            @keyframes blink { 50% { opacity: 0.2; } }
        </style>
        
        <div class="scanline"></div>
        <div class="grid-header">
            <h1>VIDEO GALLERY</h1>
            <div style="color:#ff0000; font-weight:bold; letter-spacing:4px; animation: blink 1.2s infinite; font-size:1vw;">● SYSTEM ONLINE | DROPBOX STREAMING</div>
        </div>
        <div class="video-grid" id="videoGrid"></div>
    `;

    const grid = document.getElementById('videoGrid');

    videos.forEach(v => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.innerHTML = `
            <video muted loop playsinline crossorigin="anonymous" preload="metadata" style="pointer-events: none;">
                <source src="${v.src}" type="video/mp4">
            </video>
            <div class="video-label">${v.title}</div>
        `;

        const vid = card.querySelector('video');
        let isPlaying = false;

        card.onmouseenter = () => {
            const playPromise = vid.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    isPlaying = true;
                }).catch(() => {
                    isPlaying = false;
                });
            }
        };

        card.onmouseleave = () => {
            const stopVideo = () => {
                vid.pause();
                vid.currentTime = 0;
                isPlaying = false;
            };

            if (vid.readyState >= 2) { 
                stopVideo();
            } else {
                vid.oncanplay = () => {
                    stopVideo();
                    vid.oncanplay = null;
                };
            }
        };

        card.onclick = () => {
            vid.muted = false; 
            if (vid.requestFullscreen) {
                vid.requestFullscreen();
            } else if (vid.webkitRequestFullscreen) {
                vid.webkitRequestFullscreen();
            }
            vid.play();
        };

        grid.appendChild(card);
    });

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
