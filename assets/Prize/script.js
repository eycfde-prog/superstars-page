$(".daz-gift-box").on("click", function () {
  if (!$(this).hasClass("clicked")) {
    $(this).addClass("clicked");
  } else {
    return;
  }

  explodeConfetti(event);
});

function explodeConfetti(event) {
  const confettiTarget = event.currentTarget.querySelector(".confetti-target");
  const confettiCount = 75;
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.setProperty("--x", Math.random() * 2 - 1); // Random x direction (-1 to 1)
    confetti.style.setProperty("--y", Math.random()); // Random y direction (0 to 1)
    confetti.style.backgroundColor = getRandomColor();
    confettiTarget.appendChild(confetti);

    // Remove confetti after animation ends
    confetti.addEventListener("animationend", () => {
      confetti.remove();
    });
  }