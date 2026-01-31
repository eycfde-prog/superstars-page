const box = document.getElementById('box3d');
const btn = document.getElementById('open-btn');
const winText = document.getElementById('win-text');
const tokenContainer = document.getElementById('tokens-burst-container');
const canvas = document.getElementById('fireworks-canvas');
const ctx = canvas.getContext('2d');

let tokenCount = 5; // يمكنك تغيير هذا العدد حسب نتيجة الطالب

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// --- Fireworks Engine ---
let particles = [];
class Particle {
    constructor(x, y, color) {
        this.x = x; this.y = y;
        this.color = color;
        this.velocity = { x: (Math.random() - 0.5) * 8, y: (Math.random() - 0.5) * 8 };
        this.alpha = 1;
    }
    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fill();
    }
    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.01;
    }
}

function spawnFireworks() {
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle(x, y, `hsl(${Math.random() * 60 + 40}, 100%, 50%)`));
    }
}

function animateFireworks() {
    ctx.fillStyle = 'rgba(2, 2, 5, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
        if (p.alpha > 0) { p.update(); p.draw(); }
        else { particles.splice(i, 1); }
    });
    requestAnimationFrame(animateFireworks);
}

// --- Tokens Burst Logic ---
function burstTokens(count) {
    for (let i = 0; i < count; i++) {
        const token = document.createElement('div');
        token.className = 'token-item';
        tokenContainer.appendChild(token);

        // حساب مكان الاستقرار (ترتيب أفقي)
        const targetX = (i - (count - 1) / 2) * 70; // مسافة بين كل توكين
        const targetY = -150; // الارتفاع فوق الصندوق

        // Animation باستخدام Keyframes ديناميكية
        token.animate([
            { transform: 'translate(-50%, -50%) scale(0) rotate(0deg)', opacity: 0, left: '50%', top: '50%' },
            { transform: `translate(-50%, -50%) scale(1.2) rotate(${360 + i * 20}deg)`, opacity: 1, offset: 0.5 },
            { transform: `translate(calc(-50% + ${targetX}px), calc(-50% + ${targetY}px)) scale(1) rotate(0deg)`, opacity: 1, left: '50%', top: '50%' }
        ], {
            duration: 1000 + (i * 200),
            easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            fill: 'forwards'
        });
    }
}

btn.addEventListener('click', () => {
    // 1. فتح الصندوق
    box.classList.add('is-open');
    btn.style.display = 'none';
    
    // 2. إظهار نص الفوز
    setTimeout(() => {
        winText.style.opacity = '1';
        winText.innerText = `YOU EARNED ${tokenCount} TOKENS!`;
    }, 500);

    // 3. انفجار التوكينز
    setTimeout(() => {
        burstTokens(tokenCount);
        spawnFireworks();
        animateFireworks();
    }, 800);
});
