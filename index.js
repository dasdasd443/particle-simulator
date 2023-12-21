const stage = document.querySelector("#stage").getContext("2d");
const width = 1000, height = 1000;

draw = (x,y,color,size) => {
    stage.fillStyle=color;
    stage.fillRect(x,y,size,size);
}

particles = [];

particle = (x,y,color) => {
    return {"x":x, "y": y, "vx" :0, "vy" : 0, "color": color}
}

const random = () => {
    return Math.random() * (height - 100) + 50;
}

const create = (number, color) => {
    group =[];
    for(let i=0; i < number; i++) {
        group.push(particle(random(), random(), color));
        particles.push(group[i]);
    }

    return group;
}

const interaction = (particle1, particle2, g) => {
    for(let i = 0; i < particle1.length; i++){
        let fx = 0, fy = 0;
        
        for(let j = 0; j < particle2.length; j++) {
            a = particle1[i];
            b = particle2[j];

            dx = a.x - b.x;
            dy = a.y - b.y;

            d = Math.sqrt( dx * dx + dy * dy);

            if(d > 0 && d < 80) {
                F = g * 1/d;
                fx += (F * dx);
                fy += (F * dy);
            }

            a.vx = (a.vx + fx) * 0.5;
            a.vy = (a.vy + fy) * 0.5;

            a.x += a.vx;
            a.y += a.vy;

            if(a.x <= 0 || a.x >= width) a.vx *= -1;
            if(a.y <= 0 || a.y >= height) a.vy *= -1;
        }

    }
}

const yellow = create(500, "yellow");
const red = create(500, "red");

const update = () => {
    interaction(yellow, yellow, -.0001);
    interaction(yellow, red, .0001);
    interaction(red, yellow, .0001);
    stage.clearRect(0,0,width,height);
    draw(0,0,"black", width);
    for(let i =0; i< particles.length; i++) {
        draw(particles[i].x, particles[i].y, particles[i].color, 5);
    }

    requestAnimationFrame(update);
}

update();