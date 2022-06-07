
function efeito(){
    const CANVASBG = document.getElementById("canvas66");
    let ctx = CANVASBG.getContext('2d');
    CANVASBG.width = innerWidth ;
    CANVASBG.height = innerHeight ;

    let particlesArray;

    let mouse = {
        x: null,
        y: null,
        radius: (CANVASBG.height / 160) * (CANVASBG.height / 160)/10
    }
   /*  window.addEventListener('mousemove',
        function (event) {
            mouse.x = event.x;
            mouse.y = event.y;
    }); */

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }
        //desenhar particulas individualmente
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 8, false);
            ctx.fillStyle = '#fff';
            ctx.fill();
        }
        update() {
            //verificando se a particula está no CANVASBG
            if (this.x > CANVASBG.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > CANVASBG.width || this.y < 0) {
                this.directionY = -this.directionY;
            }
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy)
            if (distance < mouse.radius + this.size) {
                if (mouse.x < this.x && this.x < CANVASBG.width - this.size * 10) {
                    this.x += 10;
                }
                if (mouse.x > this.x && this.x > this.size * 10) {
                    this.x -= 10;
                }
                if (mouse.y < this.y && this.y < CANVASBG.width - this.size * 10) {
                    this.y += 10;
                }
                if (mouse.y > this.y && this.y > this.size * 10) {
                    this.y -= 10;
                }
                
            }
            //mover partcula
            this.x += this.directionX;
            this.y += this.directionY;
            //desenhar particula
            this.draw();
        }
    }
    function init() {
        particlesArray = [];
        let numberOfParticles = 100;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 5) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size*4);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size*4);
            let directionX = (Math.random() * 5);
            let directionY = (Math.random() * 5) - 2;
            let color = '#fff';

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }
    function connect() {
        let opacity = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x)
                            *  (particlesArray[a].x - particlesArray[b].x))
                            + ((particlesArray[a].y - particlesArray[b].y)
                            *  (particlesArray[a].y - particlesArray[b].y));
                if (distance < (CANVASBG.width / 7) * (CANVASBG.height / 7)) {
                    opacity = 1 - (distance / 20000);
                    ctx.strokeStyle = 'rgba(255,255,255,' + opacity + ')';
                    ctx.linearWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }

            }
        }
    }
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        /* console.log(particlesArray.length+'\n'
                    +  ctx); */
        for (let c = 0 ; c < particlesArray.length; c++) {
            particlesArray[c].update();
        }
        connect();
    }
    window.addEventListener('resize',
        function(){
            CANVASBG.width = innerWidth;
            CANVASBG.height = innerHeight;
            mouse.radius = ((CANVASBG.height/80) * (CANVASBG.height/80));
            
    });

    /* window.addEventListener('mouseout',
        function(){
            mouse.x = undefined;
            mouse.y = undefined;
    }); */
    init();
    animate();
};
