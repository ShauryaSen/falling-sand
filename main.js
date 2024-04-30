
// setup canvas
const canvas = document.getElementById('sandCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


class Grid {
    static cellSize = 30;
    static rows = canvas.height / Grid.cellSize;
    static cols = canvas.width / Grid.cellSize;
    
    constructor () {
        this.grid = [];
        this.grainColor = {h:0,s:255,b:255};
        // fill grid with zeroes
        for (let i = 0; i < this.rows; i++) {
            this.grid.push([]);
            for (let j = 0; j < this.cols; j++) {
                this.grid[i].push(0);
            }
        }
        
    }

    draw() {
        for (let i = 0; i < this.rows; i++ ){
            for (let j = 0; j < this.cols; j++) {
                if (this.grid[i][j] === 0) {
                    ctx.beginPath(); 
                    ctx.rect(i*this.cellSize, j*this.cellSize, this.cellSize, this.cellSize); 
                    ctx.fillStyle = `hsb(${this.grainColor.h},${this.grainColor.s},${this.grainColor.b})`;
                    ctx.fill();
                }
            }
        }
        
    }

    placeSand(e) {
        let grainRow = Math.floor(e.clientX / Grid.cellSize);
        let grainCol = Math.floor(e.clientY / Grid.cellSize)
        this.grid[grainRow][grainCol] = this.color
    }

    swap() {

    }
}

function main() {  
    let grid = new Grid();
    grid.draw();
    
    addEventListener("mousedown", grid.placeSand);
}

main();