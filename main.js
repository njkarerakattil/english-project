/* Article Progress Bar */
let progress = document.querySelector(".prog-color");
console.log(progress.style.width);

window.addEventListener("scroll", (e) => {
  let scroll_top = window.scrollY;
  let doc_height = document.body.offsetHeight;
  let win_height = window.innerHeight;
  let scroll_percent = scroll_top / (doc_height - win_height) * 100;
  
  progress.style.width = `${scroll_percent}%`;
})

/* Canvas Animation */
const canvas = document.querySelector("#c");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let max_size = 10;
let min_size = 1;
let ball_count = 1024;
let cursor_pos = [];
let paused = false;

let colors = [
    "#191919",
    "#333333",
    "#4d4d4d"
];

document.addEventListener("mousemove", (e) => {
  cursor_pos = [e.clientX, e.clientY + scrollY];
});

document.addEventListener("scroll", (e) => {
  if(scrollY > canvas.height) paused = true;
  else paused = false;
});

class Ball {
    constructor(position, direction, size, color){
        this.pos = position;
        this.dir = direction;
        this.size = size;
        this.orig_size = size;
        this.col = color;
    }

    update(){
        this.pos[0] += this.dir[0];
        this.pos[1] += this.dir[1];

        /* Border Collision */
        if(this.pos[0] < 0) this.dir[0] = -this.dir[0];
        if(this.pos[1] < 0) this.dir[1] = -this.dir[1];

        if(this.pos[0] + this.size > canvas.width) this.dir[0] = -this.dir[0];
        if(this.pos[1] + this.size > canvas.height) this.dir[1] = -this.dir[1];

        /* Hover Animation */
        if(this.size > this.orig_size) this.size -= 0.5;
        
        if(
            this.pos[0] - 50 < cursor_pos[0] && this.pos[0] + 50 > cursor_pos[0] &&
            this.pos[1] - 50 < cursor_pos[1] && this.pos[1] + 50 > cursor_pos[1]
        ){
            this.size = 25;
        }

        /* Draw */
        ctx.fillStyle = this.col;
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

let balls = [];
for(let i = 0; i < ball_count; i++){
    balls.push(
        new Ball(
            [Math.floor(Math.random() * (canvas.width - max_size)), Math.floor(Math.random() * (canvas.height - max_size))],
            [Math.random() * 2 - 1, Math.random() * 2 - 1],
            Math.random() * max_size + min_size,
            colors[Math.floor(Math.random() * colors.length)]
        )
    );
}

requestAnimationFrame(animate);
function animate() {
    requestAnimationFrame(animate);
    if(paused) return;
  
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    for(let i = 0; i < ball_count; i++){
        balls[i].update();
    }
  
    ctx.textAlign = "center";
    ctx.font = "45px arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("8 Sad moments that made us", canvas.width / 2, canvas.height * 0.45);
    ctx.fillText("cry in English Class", canvas.width / 2, canvas.height * 0.55);
}