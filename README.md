# This is the Game of zLife!

This game is my running version on Conways Game of Life. In this version, the user gets to pick what size of life space they want (rows[max=10] X col[max=20]), the number of interations, and which cells they want to start as ALIVE. 

Once the user starts the process, the game will iterate the number of times selected by the user. At each phase it will determine if the cell is now ALIVE or DEAD. The determination is made with the following rules: 

- If an ALIVE cell has fewer than two live neighbours dies.   
- An ALIVE cell with two or three live neighbours lives on to the next generation.  
- An ALIVE cell with more than three live neighbours dies.
- A DEAD cell with exactly three live neighbours is awaken (becomes ALIVE).

## How To Install

```
git clone https://github.com/tiffanyRossyRobinson/GameOfLife.git someDirectory
cd someDirectory 
bower install 
npm install serve
```

## How To Run 

In order to run the game simple run the following command: 

`serve`

you can now find the game at http://localhost:3000/

## Toolbox

- AngularJS
- npm serve
- Underscore.JS (on Secondary branch only)

## Contribute 

Contributions are always welcome! 

The app is organized in the following directories
- views: html file for the app view (main.html)
- css: All css styling is in styles.css
- js: js files for the presentation
- gameBoard: this folder has the logic for generating the board 
- gameRun: this folder has the logic where game will execute and run rules. 

