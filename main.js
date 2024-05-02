
// setup canvas
const canvas = document.getElementById('sandCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


class Grid {
    static cellSize = 30;
    static cols = Math.floor(canvas.width / Grid.cellSize);
    static rows = Math.floor(canvas.height / Grid.cellSize);
    
    constructor () {
        this.grid = [];
        this.grainColor = {h:200,s:100,l:70};
        this.filled = [];

    }

    draw() {
        // loop through filled
        for (let i = 0; i < this.filled.length; i++) {
            
            let x = this.filled[i].x;
            let y = this.filled[i].y;
            ctx.beginPath(); 
            ctx.rect(x*Grid.cellSize, y*Grid.cellSize, Grid.cellSize, Grid.cellSize); 
            ctx.fillStyle = `hsl(${this.grainColor.h} ${this.grainColor.s}% ${this.grainColor.l}%)`;
            ctx.fill();
        }
    }

    placeSand(mouseX,mouseY) {
        let grainX = Math.floor(mouseX / Grid.cellSize);
        let grainY = Math.floor(mouseY / Grid.cellSize);

        if (grainX < Grid.cols && grainY< Grid.rows && !this.filled.includes({x:grainX,y:grainY}))
            this.filled.push({x:grainX,y:grainY});
    }
}

function main() {  
    let grid = new Grid();
    let mouseDown = false;

    addEventListener("mousedown", function(e) {
        grid.placeSand(e.clientX,e.clientY);
        mouseDown = true;
    });

    addEventListener("mousemove", function(e) {
        if (mouseDown) {
            grid.placeSand(e.clientX,e.clientY);
        }
    })
    
    addEventListener("mouseup", function() {
        mouseDown = false;
    }) ;
    setInterval(grid.draw.bind(grid), 1000/60);

}

main();