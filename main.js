
// setup canvas
const canvas = document.getElementById('sandCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let Mouse = {x:0,y:0,down:false}

function containsPoint(arr, point) {
    return arr.some(p => p.x === point.x && p.y === point.y);
}

class Grid {
    static cellSize = 30;
    static cols = Math.floor(canvas.width / Grid.cellSize);
    static rows = Math.floor(canvas.height / Grid.cellSize);
    
    constructor () {
        this.grid = [];
        this.grainColor = {h:200,s:100,l:70};
        this.filled = [];
    }

    update() {
        // clear screen
        ctx.beginPath(); 
        ctx.rect(0, 0, canvas.width, canvas.height); 
        ctx.fillStyle = `rgb(24 24 24)`;
        ctx.fill();
        ctx.closePath()

        // place grains
        if (Mouse.down) this.placeSand(Mouse.x, Mouse.y);

        this.drawGrains();

        // update grains
        let checkLen = this.filled.length;
        for (let i = 0 ; i < checkLen; i++) {
            let grainX = this.filled[i].x;
            let grainY = this.filled[i].y;
            let bottomLeft = {x:grainX-1, y:grainY+1}
            let bottom = {x:grainX, y:grainY+1}
            let bottomRight = {x:grainX+1, y:grainY+1}

            if (grainY < Grid.rows) {
                // bottom left
                if (!containsPoint(this.filled, bottom)) this.filled.push(bottom);
                else if (!containsPoint(this.filled, bottomRight) && grainX < Grid.cols) this.filled.push(bottomRight);
                else if (!containsPoint(this.filled, bottomLeft) && grainX > 0) this.filled.push(bottomLeft);
                else continue;
                this.filled.splice(i,1);
                i--;
                checkLen--;
            }

        }
    }
    

    drawGrains() {
        for (let i = 0; i < this.filled.length; i++) {
            let x = this.filled[i].x;
            let y = this.filled[i].y;
            ctx.beginPath(); 
            ctx.rect(x*Grid.cellSize, y*Grid.cellSize, Grid.cellSize, Grid.cellSize); 
            ctx.fillStyle = `hsl(${this.grainColor.h} ${this.grainColor.s}% ${this.grainColor.l}%)`;
            ctx.fill();
            ctx.closePath()
        }
    }

    placeSand(mouseX,mouseY) {
        let grainX = Math.floor(mouseX / Grid.cellSize);
        let grainY = Math.floor(mouseY / Grid.cellSize);

        if (grainX < Grid.cols && grainY< Grid.rows && !containsPoint(this.filled, {x:grainX,y:grainY}))
            this.filled.push({x:grainX,y:grainY});
    }
}

let grid = new Grid();
function main() {  

    addEventListener("mousedown", (e) => {
        Mouse.x = e.clientX;
        Mouse.y = e.clientY;
        Mouse.down = true;
    });
    
    addEventListener("mouseup", () => {
        Mouse.down = false;
    });

    addEventListener("mousemove", (e) => {
        Mouse.x = e.clientX;
        Mouse.y = e.clientY;
    })
    
    
    setInterval(grid.update.bind(grid), 1000/60);

}

main();