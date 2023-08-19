document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('dotCanvas');
    const ctx = canvas.getContext('2d');

    let dots = [];
    const dotCount = 100;
    const maxDistance = 100;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Dot {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
        }

        move() {
            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

            this.x += this.vx;
            this.y += this.vy;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let dot of dots) {
            dot.move();
            dot.draw();
        }

        for (let i = 0; i < dotCount; i++) {
            for (let j = i + 1; j < dotCount; j++) {
                const dx = dots[i].x - dots[j].x;
                const dy = dots[i].y - dots[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    ctx.beginPath();
                    ctx.moveTo(dots[i].x, dots[i].y);
                    ctx.lineTo(dots[j].x, dots[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    for (let i = 0; i < dotCount; i++) {
        dots.push(new Dot());
    }

    animate();
});
