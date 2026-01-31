const boxWrapper = document.querySelector('.vault-wrapper');
const btn = document.getElementById('open-btn');
const tokenContainer = document.getElementById('tokens-emitter');
const canvas = document.getElementById('fireworks-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const TOKEN_COUNT = 5; // يمكنك تغيير هذا الرقم حسب جائزة الطالب

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// --- خروج التوكينز ---
function launchTokens(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const token = document.createElement('div');
            token.className = 'token-item';
            
            // حساب مكان التراص (جنب بعض)
            const xOffset = (i - (count - 1) / 2) * 80;
            const yOffset = -180; // تطير للأعلى
            const zOffset = 150;  // تخرج للأمام
            
            token.style.setProperty('--target-transform', `translate3d(${xOffset}px, ${yOffset}px, ${zOffset}px) scale(1.2) rotateY(360deg)`);
            token.style.animation = `flyOut 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards`;
            
            tokenContainer.appendChild(token);
            
            // العاب نارية صغيرة عند خروج كل توكن
            createFirework(window.innerWidth/2 + xOffset, window.innerHeight/2 + yOffset);
        }, i * 200);
    }
}

// --- العاب نارية ---
class Particle {
    constructor(x, y) {
        this.x = x; this.y = y;
        this.vx = (Math.random() - 0.5) * 10;
        this.vy = (Math.random() - 0.5) * 10;
        this.alpha = 1;
        this.color = `hsl(${Math.random() * 50 + 40}, 100%, 60%)`;
    }
    update() { this.x += this.vx; this.y += this.vy; this.alpha -= 0.02; }
    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
    }
}

function createFirework(x, y) {
    for (let i = 0; i < 30; i++) particles.push(new Particle(x, y));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => p.alpha > 0);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}

btn.addEventListener('click', () => {
    // 1. فتح الصندوق
    boxWrapper.classList.add('is-open');
    btn.style.display = 'none';
    document.getElementById('reward-text').style.opacity = '1';
    
    // 2. إمالة الصندوق لزاوية رؤية أفضل
    boxWrapper.style.transform = 'rotateX(10deg) rotateY(0deg) scale(1.1)';

    // 3. إطلاق التوكينز والألعاب النارية بعد فترة بسيطة من الفتح
    setTimeout(() => {
        launchTokens(TOKEN_COUNT);
        animate();
    }, 600);
});
