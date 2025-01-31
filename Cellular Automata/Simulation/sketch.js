let cols, rows;
let w = 10;  // Width of each cell
let grid, nextGrid;

const EMPTY = 0;
const TREE = 1;
const FIRE = 2;

let treeRegrowthRate = 0.1;  // Default tree regrowth rate
let fireSpreadRate = 0.8;    // Default fire spread rate

let treeRegrowthSelect;
let fireSpreadSelect;
let applyButton;

let treeRegrowthLabel;
let fireSpreadLabel;

function setup() {
  createCanvas(400, 400);
  frameRate(5);  // Set frame rate for a slower simulation
  cols = floor(width / w);
  rows = floor(height / w);
  
  grid = create2DArray(cols, rows);
  nextGrid = create2DArray(cols, rows);
  
  // Initialize grid with trees and fire
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = random() < 0.8 ? TREE : EMPTY;  // 80% chance for trees
    }
  }
  
  // Set an initial fire at the center
  grid[floor(cols / 2)][floor(rows / 2)] = FIRE;
  
  // Create dropdowns for tree regrowth and fire spread rates
  treeRegrowthSelect = createSelect();
  treeRegrowthSelect.position(10, height + 10);
  treeRegrowthSelect.option('10%', 0.1);
  treeRegrowthSelect.option('20%', 0.2);
  treeRegrowthSelect.option('30%', 0.3);
  treeRegrowthSelect.option('40%', 0.4);
  treeRegrowthSelect.option('50%', 0.5);
  treeRegrowthSelect.option('60%', 0.6);
  treeRegrowthSelect.option('70%', 0.7);
  treeRegrowthSelect.option('80%', 0.8);
  treeRegrowthSelect.option('90%', 0.9);
  treeRegrowthSelect.option('100%', 1.0);
  treeRegrowthSelect.selected('10%');
  
  fireSpreadSelect = createSelect();
  fireSpreadSelect.position(150, height + 10);
  fireSpreadSelect.option('10%', 0.1);
  fireSpreadSelect.option('20%', 0.2);
  fireSpreadSelect.option('30%', 0.3);
  fireSpreadSelect.option('40%', 0.4);
  fireSpreadSelect.option('50%', 0.5);
  fireSpreadSelect.option('60%', 0.6);
  fireSpreadSelect.option('70%', 0.7);
  fireSpreadSelect.option('80%', 0.8);
  fireSpreadSelect.option('90%', 0.9);
  fireSpreadSelect.option('100%', 1.0);
  fireSpreadSelect.selected('80%');

  // Labels for Tree Regrowth and Fire Spread
  treeRegrowthLabel = createDiv('Tree Regrowth: 10');
  treeRegrowthLabel.position(10, height + 40);  // Increased y position to avoid overlap
  fireSpreadLabel = createDiv('Fire Spread: 80');
  fireSpreadLabel.position(150, height + 40);  // Increased y position to avoid overlap
  
  // Create the "Apply" button
  applyButton = createButton('Apply');
  applyButton.position(300, height + 10);
  applyButton.mousePressed(applySettings);
}

function draw() {
  background(255);
  
  // Display grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w;
      let y = j * w;
      if (grid[i][j] === EMPTY) {
        fill(200);  // Gray for empty cells
      } else if (grid[i][j] === TREE) {
        fill(0, 255, 0);  // Green for trees
      } else if (grid[i][j] === FIRE) {
        fill(255, 0, 0);  // Red for fire
      }
      stroke(0);
      rect(x, y, w, w);
    }
  }
  
  // Update grid based on fire spread and tree growth
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      nextGrid[i][j] = grid[i][j];  // Copy current state
      
      if (grid[i][j] === FIRE) {
        nextGrid[i][j] = EMPTY;  // Fire burns out
      } else if (grid[i][j] === TREE) {
        let burningNeighbors = countBurningNeighbors(i, j);
        if (burningNeighbors > 0 && random() < fireSpreadRate) { // Fire can spread with specified rate
          spreadFire(i, j);
        }
      } else if (grid[i][j] === EMPTY) {
        let emptyNeighbors = countEmptyNeighbors(i, j);
        if (emptyNeighbors >= 2 && random() < treeRegrowthRate) {  // Tree regrows with specified rate
          nextGrid[i][j] = TREE;
        }
      }
    }
  }

  // Swap grids
  let temp = grid;
  grid = nextGrid;
  nextGrid = temp;
}

// Mouse click to spread fire
function mousePressed() {
  let col = floor(mouseX / w);
  let row = floor(mouseY / w);
  
  if (grid[col] && grid[col][row] === TREE) {
    grid[col][row] = FIRE;
  }
}

// Count burning neighbors
function countBurningNeighbors(x, y) {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      if (grid[col][row] === FIRE) {
        count++;
      }
    }
  }
  return count;
}

// Count empty neighbors
function countEmptyNeighbors(x, y) {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      if (grid[col][row] === EMPTY) {
        count++;
      }
    }
  }
  return count;
}

// Spread fire to a random tree neighbor
function spreadFire(x, y) {
  let neighbors = [];
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      if (grid[col][row] === TREE) {
        neighbors.push([col, row]);
      }
    }
  }
  if (neighbors.length > 0) {
    let randIndex = floor(random(neighbors.length));
    nextGrid[neighbors[randIndex][0]][neighbors[randIndex][1]] = FIRE;
  }
}

function applySettings() {
  // Get values from dropdowns
  treeRegrowthRate = float(treeRegrowthSelect.value());
  fireSpreadRate = float(fireSpreadSelect.value());
  
  // Update labels
  treeRegrowthLabel.html('Tree Regrowth: ' + (treeRegrowthRate * 100));
  fireSpreadLabel.html('Fire Spread: ' + (fireSpreadRate * 100));
}

function create2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}
