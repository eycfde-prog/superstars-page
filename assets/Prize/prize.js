$(document).ready(function() {
    $(".daz-gift-box").on("click", function (event) {
        if (!$(this).hasClass("clicked")) {
            $(this).addClass("clicked");
            // نمرر الـ element الحالي مباشرة للدالة
            explodeConfetti(this);
        }
    });

    function explodeConfetti(boxElement) {
        const confettiTarget = boxElement.querySelector(".confetti-target");
        const confettiCount = 75;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement("div");
            confetti.className = "confetti";
            
            // تحديد اتجاهات عشوائية
            confetti.style.setProperty("--x", Math.random() * 2 - 1); 
            confetti.style.setProperty("--y", Math.random() * 2 - 1); 
            
            confetti.style.backgroundColor = getRandomColor();
            confettiTarget.appendChild(confetti);

            // مسح العنصر بعد انتهاء الأنيمنيشن لتوفير الذاكرة
            confetti.addEventListener("animationend", () => {
                confetti.remove();
            });
        }
    }

    function getRandomColor() {
        const colors = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
});
