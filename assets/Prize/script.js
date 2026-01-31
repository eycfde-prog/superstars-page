const box = document.getElementById('box3d');
const btn = document.getElementById('open-btn');
const tokensContainer = document.getElementById('tokens-container');
const canvas = document.getElementById('fireworks-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
    constructor(x, y) {
        this.x = x; this.y = y;
        this.size = Math.random() * 3 + 2;
        this.speedX = (Math.random() - 0.5) * 10;
        this.speedY = (Math.random() - 0.5) * 10;
        this.color = `hsl(${Math.random() * 50 + 20}, 100%, 50%)`;
        this.alpha = 1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.02;
    }
    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function createTokens(count) {
    for (let i = 0; i < count; i++) {
        const token = document.createElement('div');
        token.className = 'token-item';
        // تعويض المسار إذا كان مختلفاً (تأكد من وجود الصورة في الفولدر)
        token.style.backgroundImage = "url('Token.png')"; 
        tokensContainer.appendChild(token);
        
        setTimeout(() => {
            const angle = (i / count) * Math.PI * 2;
            const radius = 120; // قطر دائرة التوزيع
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            token.style.opacity = "1";
            token.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1.2) rotateZ(360deg)`;
        }, i * 200 + 1000); // تتابع خروج التوكينز
    }
}

function celebrate() {
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle(window.innerWidth/2, window.innerHeight/2));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
        p.update();
        p.draw();
        if (p.alpha <= 0) particles.splice(i, 1);
    });
    requestAnimationFrame(animate);
}

btn.addEventListener('click', () => {
    // فتح الصندوق
    box.classList.add('is-open');
    box.style.transform = "rotateX(-10deg) rotateY(0deg) scale(1.1)";
    
    btn.style.opacity = '0';
    setTimeout(() => btn.style.display = 'none', 500);

    // خروج التوكينز والألعاب النارية
    setTimeout(() => {
        createTokens(5);
        celebrate();
        animate();
    }, 800);
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
