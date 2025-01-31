let rule = 30; // Default Rule number
let grid = [];
let cols;
let rows;
let cellSize = 10;
let steps = 100; // Default number of steps
let showNumbers = true; // Toggle for showing numbers instead of cells
let button, ruleInput, arraySizeInput, stepsInput; // Declare button and input fields

function setup() {
  createCanvas(600, 400);

  // Default values for array size and steps
  let arraySize = 60;

  // Initialize grid and set the first row randomly
  cols = arraySize;
  rows = steps;
  grid = new Array(rows);
  for (let i = 0; i < rows; i++) {
    grid[i] = new Array(cols).fill(0);
  }
  randomizeFirstRow();

  // Create an input field for rule number
  ruleInput = createInput(rule.toString());
  ruleInput.position(10, height + 40);
  ruleInput.size(50);
  createP('Rule').position(ruleInput.x, ruleInput.y + 20);

  // Create an input field for array size (length of the grid)
  arraySizeInput = createInput(arraySize.toString());
  arraySizeInput.position(ruleInput.x + ruleInput.width + 20, height + 40);
  arraySizeInput.size(50);
  createP('Arr Size').position(arraySizeInput.x, arraySizeInput.y + 20);

  // Create an input field for steps (number of iterations)
  stepsInput = createInput(steps.toString());
  stepsInput.position(arraySizeInput.x + arraySizeInput.width + 20, height + 40);
  stepsInput.size(50);
  createP('Iteration').position(stepsInput.x, stepsInput.y + 20);

  // Create a button to set the parameters
  let setParamsButton = createButton('Set Parameters');
  setParamsButton.position(stepsInput.x + stepsInput.width + 10, height + 40);
  setParamsButton.mousePressed(updateParameters);

  // Create a button to toggle display mode
  button = createButton('Toggle Simulation Mode');
  button.position(10, height + 10);
  button.mousePressed(toggleDisplayMode);
}


function draw() {
  background(255);

  // Draw the current grid
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let cell = grid[y][x];
      if (showNumbers) {
        // Show 1 for black cells and 0 for white cells
        fill(0);
        textSize(12);
        text(cell, x * cellSize + cellSize / 2, y * cellSize + cellSize / 2);
      } else {
        fill(cell === 1 ? 0 : 255); // Black for 1, White for 0
        noStroke();
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }

  // Stop drawing after completing all steps
  if (frameCount > rows) {
    noLoop();
  }

  // Generate the next step after the first row
  if (frameCount < rows) {
    generateNextRow(frameCount - 1);
  }
}

// Function to generate the next row based on the current row
function generateNextRow(rowIndex) {
  let nextRow = new Array(cols).fill(0);
  for (let i = 0; i < cols; i++) {
    let left = grid[rowIndex][(i - 1 + cols) % cols];
    let center = grid[rowIndex][i];
    let right = grid[rowIndex][(i + 1) % cols];
    let neighborhood = (left << 2) | (center << 1) | right;
    nextRow[i] = (rule >> neighborhood) & 1;
  }
  grid[rowIndex + 1] = nextRow;
}

// Function to randomize the first row with 0s and 1s
function randomizeFirstRow() {
  for (let i = 0; i < cols; i++) {
    grid[0][i] = int(random(2)); // Randomly set to 0 or 1
  }
}

// Toggle function for switching between display modes
function toggleDisplayMode() {
  showNumbers = !showNumbers;
  redraw();
}

// Function to update the rule, array size, and steps from input fields
function updateParameters() {
  let inputRule = int(ruleInput.value());
  let inputArraySize = int(arraySizeInput.value());
  let inputSteps = int(stepsInput.value());

  // Validate rule number
  if (inputRule >= 0 && inputRule <= 255) {
    rule = inputRule;
  } else {
    alert("Please enter a rule number between 0 and 255.");
  }

  // Validate array size and steps
  if (inputArraySize > 0 && inputSteps > 0) {
    cols = inputArraySize;
    rows = inputSteps;
    resetGrid(); // Reset and redraw grid with new parameters
  } else {
    alert("Please enter positive values for array size and steps.");
  }
}

// Function to reset the grid
function resetGrid() {
  grid = new Array(rows);
  for (let i = 0; i < rows; i++) {
    grid[i] = new Array(cols).fill(0);
  }
  randomizeFirstRow();
  frameCount = 0; // Reset frame count
  loop(); // Restart the loop
}
