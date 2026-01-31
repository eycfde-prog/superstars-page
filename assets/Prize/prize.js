$(document).ready(function() {
  $(".daz-gift-box").on("click", function (event) {
    let $this = $(this);
    
    if (!$this.hasClass("clicked")) {
      $this.addClass("clicked");
      // نمرر العنصر الذي تم الضغط عليه للدالة
      explodeConfetti($this[0]); 
    }
  });

  function explodeConfetti(targetElement) {
    const confettiTarget = targetElement.querySelector(".confetti-target");
    const confettiCount = 75;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      
      // تعيين اتجاهات عشوائية
      confetti.style.setProperty("--x", Math.random() * 2 - 1);
      confetti.style.setProperty("--y", Math.random() + 0.5); // لجعلها تطير للأعلى
      confetti.style.backgroundColor = getRandomColor();
      
      confettiTarget.appendChild(confetti);

      // تنظيف الـ DOM بعد انتهاء الحركة
      confetti.addEventListener("animationend", () => {
        confetti.remove();
      });
    }
  }

  function getRandomColor() {
    const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"];
    return colors[Math.floor(Math.random() * colors.length)];
  }
});
