Cellular Automaton Simulation

Overview

This project is a simulation of a one-dimensional cellular automaton using p5.js. The simulation allows users to visualize different rule-based automaton behaviors based on Wolfram's Elementary Cellular Automata.

Features

Interactive user input for:

Rule number (0-255)

Grid size (array length)

Number of iterations (steps)

Toggle between numerical and graphical display modes.

Dynamic rule application for generating successive rows.

Randomized initial row for variability in patterns.

Interactive UI elements for controlling simulation parameters.

Usage

Controls

Rule Input: Enter a number between 0-255 to define the automaton rule.

Array Size Input: Set the number of cells in each row.

Iterations Input: Define the number of time steps for the simulation.

Set Parameters Button: Updates the grid based on user input.

Toggle Simulation Mode Button: Switches between numerical and visual representation.

Running the Simulation

Open the index.html file in a web browser.

Modify the input values as needed.

Click the "Set Parameters" button to apply changes.

Use the "Toggle Simulation Mode" button to switch between text-based and graphical views.

How It Works

The first row is initialized randomly.

Each subsequent row is computed based on the selected rule.

The rule number determines how a cell's new state is derived from its left, center, and right neighbors.

The grid is updated in each frame until the defined number of iterations is reached.

Dependencies

p5.js (JavaScript library for creative coding)

File Structure

index.html - Entry point of the project.

sketch.js - Main JavaScript file containing the simulation logic.

Future Enhancements

Allow users to manually set the initial row.

Add support for different cell size configurations.

Implement speed control for the simulation.