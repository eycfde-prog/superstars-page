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
        ctx.save(); // حفظ حالة الكانفاس
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function createTokens(count) {
    for (let i = 0; i < count; i++) {
        const token = document.createElement('div');
        token.className = 'token-item';
        // تأكد أن الصورة بنفس الاسم بجانب الملف
        token.style.backgroundImage = "url('Token.png')"; 
        tokensContainer.appendChild(token);
        
        setTimeout(() => {
            const angle = (i / count) * Math.PI * 2;
            const radius = 150; 
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            token.style.opacity = "1";
            token.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1.2) rotateZ(360deg)`;
        }, i * 200 + 500);
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
    // إضافة الكلاس للعنصر box3d لفتح الغطاء
    box.classList.add('is-open');
    
    // تحريك الصندوق نفسه لمواجهة المستخدم
    box.style.transform = "rotateX(0deg) rotateY(0deg) scale(1.1)";
    
    btn.style.opacity = '0';
    setTimeout(() => btn.style.display = 'none', 500);

    setTimeout(() => {
        createTokens(5);
        celebrate();
        if (particles.length > 0) animate();
    }, 800);
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
