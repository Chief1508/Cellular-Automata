Fire Spread Simulation

This project is a simple fire spread simulation implemented using p5.js. The simulation models how fire spreads through a forest, considering tree regrowth and fire spread probabilities. Users can interact with the simulation by adjusting these probabilities dynamically and igniting new fires with a mouse click.

Features

Grid-based fire spread simulation

Adjustable tree regrowth rate and fire spread probability

User interaction via mouse click to start fires

Visualization of trees, fire, and empty spaces

How It Works

The simulation runs on a grid where each cell can be in one of three states:

EMPTY (Gray): A cell with no trees.

TREE (Green): A cell containing a tree.

FIRE (Red): A burning tree.

The fire spreads to neighboring trees based on the fire spread probability.

Trees grow back in empty cells based on the tree regrowth probability.

The user can manually ignite fires by clicking on tree cells.

The grid updates at a fixed frame rate (5 FPS) to simulate real-time fire spread dynamics.

User Controls

Dropdowns for Tree Regrowth Rate and Fire Spread Probability:

Located below the canvas.

Allows selection of values between 10% and 100%.

Apply Button:

Updates the simulation parameters with the selected values.

Mouse Click:

Clicking on a tree will set it on fire.

Code Structure

setup(): Initializes the canvas, grid, UI elements, and sets an initial fire.

draw(): Updates and renders the simulation.

mousePressed(): Allows users to ignite fires.

countBurningNeighbors(): Checks how many neighboring cells are on fire.

countEmptyNeighbors(): Checks how many neighboring cells are empty.

spreadFire(): Spreads fire to a neighboring tree.

applySettings(): Updates tree regrowth and fire spread probabilities based on user input.

create2DArray(): Creates a 2D array for the grid representation.

Requirements

A web browser supporting JavaScript and p5.js.

The p5.js library must be included in the project.

Running the Simulation

Open the index.html file containing the p5.js script.

Adjust tree regrowth and fire spread rates as needed.

Click on any tree cell to start a fire.

Observe how the fire spreads and trees regrow over time.

Future Improvements

Add wind direction influence on fire spread.

Introduce different terrain types affecting fire behavior.

Implement a pause/reset button for better control.