const box = document.getElementById('box3d');
const btn = document.getElementById('open-btn');
const canvas = document.getElementById('fireworks-canvas');
const ctx = canvas.getContext('2d');

// تحديث حجم الكانفاس عند تغيير حجم الشاشة
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let particles = [];
let animationId;

class FireworkParticle {
    constructor(x, y) {
        this.x = x; 
        this.y = y;
        this.vx = (Math.random() - 0.5) * 12;
        this.vy = (Math.random() - 0.5) * 12;
        this.alpha = 1;
        this.color = `hsl(${Math.random() * 40 + 40}, 100%, 50%)`; 
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 0.015;
    }
}

function celebrate() {
    const boxRect = box.getBoundingClientRect();
    const centerX = boxRect.left + boxRect.width / 2;
    const centerY = boxRect.top + boxRect.height / 2;

    for (let i = 0; i < 150; i++) {
        particles.push(new FireworkParticle(centerX, centerY));
    }
}

function animate() {
    ctx.fillStyle = 'rgba(2, 2, 5, 0.2)'; // تطابق لون الخلفية
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((p, i) => {
        p.update();
        p.draw();
        if (p.alpha <= 0) particles.splice(i, 1);
    });
    
    animationId = requestAnimationFrame(animate);
}

btn.addEventListener('click', () => {
    box.classList.add('is-open');
    btn.style.opacity = '0';
    setTimeout(() => btn.style.display = 'none', 500);
    
    // بدء الألعاب النارية بعد ثانية واحدة من الضغط
    setTimeout(() => {
        celebrate();
        animate();
    }, 1000);
});
