let color = colorBlack;

function colorRGB() {
    return `rgb(${randrgb()}, ${randrgb()}, ${randrgb()})`;
    //return `rgb(255, 255, 255)`; for greyscale
}
function colorBlack() {
    return 'rgb(0,0,0)';
}
function change() {
    if (this.style.backgroundColor) {
        let initial = this.getAttribute('data-original');
        let currPass = parseInt(this.getAttribute('numPasses'));
        let rgb = initial.slice(4).slice(0,-1);
        rgbArray = rgb.split(",");
        let r = parseInt(rgbArray[0]);
        let g = parseInt(rgbArray[1]);
        let b = parseInt(rgbArray[2]);
        let newR = r - (r/10 * currPass);
        let newG = g - (g/10 * currPass);
        let newB = b - (b/10 * currPass);
        this.style.backgroundColor = `rgb(${newR}, ${newG}, ${newB})`;
        this.setAttribute('numPasses', currPass+1);
        return;
    }
    const value = color();
    this.style.backgroundColor = value;
    this.classList.add("change");
    this.setAttribute('data-original', value);
    this.setAttribute('numPasses', 1);
}

const blackButton = document.querySelector(".black");
blackButton.addEventListener("click", () => color = colorBlack);
const rgbButton = document.querySelector(".rgb");
rgbButton.addEventListener("click", () => color = colorRGB);

const size = document.querySelector("#size");
const confirm = document.querySelector(".confirm");
size.addEventListener("input", updateValue);
function updateValue(e) {
    confirm.textContent = `Now creating grid ${e.target.value} x ${e.target.value}`;
    document.querySelector(".grid").remove();
    createGrid(parseInt(e.target.value));
}
function createGrid(numSquares) {
    const newGrid = document.createElement("div");
    newGrid.classList.add("grid");
    document.querySelector(".grid-div").appendChild(newGrid);
    for (let i = 0; i < numSquares**2; i++) {
        const grid = document.querySelector(".grid");
        const div = document.createElement("div");
        div.classList.add("box");
        const gridDiv = document.querySelector(".grid");
        const gridWidth = gridDiv.offsetWidth - 2 - numSquares*2 ;
        const gridHeight = gridDiv.offsetHeight - 2 - numSquares*2;
        div.style.cssText = `width: ${gridWidth/numSquares}px; height:${gridHeight/numSquares}px;`;
        grid.appendChild(div);
    }
    const divs = document.querySelectorAll(".box");
    for(div of divs) {
        div.addEventListener("mouseover", change);
    }
}
createGrid(8);
const reset = document.querySelector(".reset");
reset.addEventListener("click", remove);

function remove() {
    const divs = document.querySelectorAll(".box");
    divs.forEach(div => div.style.backgroundColor = "");
}

function randrgb() {
    return Math.floor(Math.random() * 256);
}