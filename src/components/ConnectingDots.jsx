// ConnectingDots.js
import React, { useEffect } from "react";

function ConnectingDots() {
  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const particles = [];

    function Particle(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 5 + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
    }

    Particle.prototype.update = function () {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.size > 0.2) this.size -= 0.1;
    };

    Particle.prototype.draw = function () {
      ctx.fillStyle = "black";
      ctx.strokeStyle = "white";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    };

    function init() {
      for (let i = 0; i < 170; i++) {
        particles.push(
          new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height
          )
        );
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.lineWidth = 0.2;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    }

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
    animate();

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas id="canvas"></canvas>;
}

export default ConnectingDots;
