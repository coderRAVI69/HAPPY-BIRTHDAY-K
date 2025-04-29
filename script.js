const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confetti = [];
const colors = ["#FFC107", "#4CAF50", "#FF5722", "#03A9F4", "#E91E63"];

for (let i = 0; i < 100; i++) {
  confetti.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 6 + 2,
    d: Math.random() * 100 + 10,
    color: colors[Math.floor(Math.random() * colors.length)],
    tilt: Math.floor(Math.random() * 10) - 5,
    tiltAngleIncremental: Math.random() * 0.07 + 0.05,
    tiltAngle: 0
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach((confettiPiece, i) => {
    ctx.beginPath();
    ctx.lineWidth = confettiPiece.r;
    ctx.strokeStyle = confettiPiece.color;
    ctx.moveTo(confettiPiece.x + confettiPiece.tilt + confettiPiece.r / 2, confettiPiece.y);
    ctx.lineTo(confettiPiece.x + confettiPiece.tilt, confettiPiece.y + confettiPiece.tilt + confettiPiece.r / 2);
    ctx.stroke();
  });
  update();
}

function update() {
  confetti.forEach((confettiPiece, i) => {
    confettiPiece.tiltAngle += confettiPiece.tiltAngleIncremental;
    confettiPiece.y += (Math.cos(confettiPiece.d) + 3 + confettiPiece.r / 2) / 2;
    confettiPiece.tilt = Math.sin(confettiPiece.tiltAngle) * 15;

    if (confettiPiece.y > canvas.height) {
      confettiPiece.y = -10;
      confettiPiece.x = Math.random() * canvas.width;
    }
  });
}

function loop() {
  draw();
  requestAnimationFrame(loop);
}

loop();
