/**
 * ROYAL MARATHI WEDDING INVITATION
 * Interactive Cinematic Controller
 */

document.addEventListener("DOMContentLoaded", () => {
  const curtain = document.getElementById("revealCurtain");
  const canvas = document.getElementById("goldParticles");

  // 1. Initial Royal Curtain Reveal Sequence
  function playRevealAnimation() {
    document.body.classList.remove("content-revealed");
    curtain.classList.remove("hidden", "opened");

    // Brief auspicious pause then open curtains
    setTimeout(() => {
      curtain.classList.add("opened");
      document.body.classList.remove("is-loading");

      // Stagger reveal content
      setTimeout(() => {
        document.body.classList.add("content-revealed");
      }, 400);

      // Hide curtain completely after animation finishes to free clicks
      setTimeout(() => {
        curtain.classList.add("hidden");
      }, 1500);
    }, 700);
  }

  // Auto trigger reveal on page load
  window.addEventListener("load", () => {
    playRevealAnimation();
  });

  // 3. Floating Gold Particle / Akshata Shimmer Animation
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationFrameId;

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    }

    class GoldParticle {
      constructor(width, height) {
        this.reset(width, height, true);
      }

      reset(width, height, initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + 10;
        this.size = Math.random() * 2.2 + 0.8;
        this.speedY = Math.random() * 0.45 + 0.25;
        this.speedX = (Math.random() - 0.5) * 0.35;
        this.opacity = Math.random() * 0.7 + 0.2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulse = Math.random() * Math.PI;
      }

      update(width, height) {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.pulse += this.pulseSpeed;

        if (this.y < -10 || this.x < -10 || this.x > width + 10) {
          this.reset(width, height);
        }
      }

      draw(context) {
        const currentOpacity = Math.max(0.1, (Math.sin(this.pulse) + 1) / 2 * this.opacity);
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 235, 150, ${currentOpacity})`;
        context.shadowColor = "rgba(212, 175, 55, 0.9)";
        context.shadowBlur = 8;
        context.fill();
      }
    }

    function initParticles() {
      const rect = canvas.getBoundingClientRect();
      const count = Math.min(38, Math.floor(rect.width / 10));
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new GoldParticle(rect.width, rect.height));
      }
    }

    function animate() {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      particles.forEach((p) => {
        p.update(rect.width, rect.height);
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    window.addEventListener("resize", () => {
      resizeCanvas();
      initParticles();
    });

    resizeCanvas();
    initParticles();
    animate();
  }
});

