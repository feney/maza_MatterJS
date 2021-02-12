const { 
    Engine, 
    Render, 
    Runner, 
    World, 
    Bodies 
} = Matter;
// Matter script tag was included in the HTML file; when included, it added in a global variable of Matter

const cells = 3; //number of units in either dimension, as it's a square
const width = 600;
const height = 600;

const engine = Engine.create(); //boilerplate of Matter JS
const { world } = engine;
const render = Render.create({
    element: document.body, //passing an options object | telling the render where we want to show our representation inside the html document
    engine : engine,
    options: {
        wireframes: true, //wireframe mode is just the outline of the shape, is false:solid shapes
        width, //the key is the value, defined above in a const variable
        height //px values 
    }

});

Render.run(render); //passed in the 'render' object that was just created
Runner.run(Runner.create(), engine); //the Runner coordinates all changed from state A to state B of our engine

// const shape = Bodies.rectangle(200, 200, 50, 50, { //first two numbers are positions in the world the object is placed.
//     isStatic: false //isStatus:true forces is to stay
// });
// World.add(world, shape); //contains a representation of all the shapes in our world

//**WALLS BEGIN*/
const walls = [ //an array of shapes
    Bodies.rectangle(width / 2, 0, width, 40, { isStatic: true}), // 400=total units over (800px canvas), 0=units down, 800=units wide, 40=units talls 
    Bodies.rectangle(width / 2, height, width, 40, { isStatic: true}), //bottom wall | 400 units over, 600 unts down, 800 wide, and 40 tall
    Bodies.rectangle(0, height / 2, 40, height, { isStatic: true}), //right wall
    Bodies.rectangle(width, height / 2, 40, height, { isStatic: true}), //left wall
];
World.add(world, walls)
//**END OF WALL */


// const grid = [];
// for (let i = 0; i < 3; i++) {
//     grid.push([]); //creating empty arrays
//     for (let j = 0; j < 3; j++){ //inner loop, with starting values of false
//         grid[i].push(false);
//     }
// }
// console.log(grid);

const shuffle = (arr) => { //taking in 'array' as attribute
    let counter = arr.length;

    while (counter > 0) {
        const index = Math.floor(Math.random() * counter);
        

        counter--; //decrease the counter by one

        const temp = arr[counter]; //temp = temporary
        arr[counter] = arr[index];
        arr[index] = temp;
    }

    return arr;
};

// use map function in order to generate a new array each time it runs
const grid = Array(cells) //creating 3 arrays | supposed to be a convenient way to generate nested arrays
    .fill(null) 
    .map(() => Array(cells).fill(false)); // increase number in .map to increase grid columns | places 4 'false' elements in each array

const verticals = Array(cells)
    .fill(null)
    .map(() => Array(cells-1).fill(false));


const horizontals = Array(cells-1) // 2 arrays
    .fill(null)
    .map(() => Array(cells).fill(false)); // with 3 elements

const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);

const stepThroughCell = (row, column) => {
    // If have visted the cell at [row, column], then return
    if (grid[row][column]) {
        return;
    }

    // Mark this cell as being visited
    grid[row][column] = true;

    // Assemble randomly-ordered list of neighbors
    const neighbors = shuffle([ //coordinate pairs of all different neighbors | wrapping this function with the 'shuffle' function
        [row-1, column, 'up'], //move up
        [row, column+1, 'right'], //move to the right
        [row+1, column, 'down'], //move down
        [row, column -1, 'left'] //move to the left
    ]);
    console.log(neighbors);

    // For each neighbor... series of steps | now need to randomly sort/shuffle this list
    for (let neighbor of neighbors) {
        const [nextRow, nextColumn, direction] = neighbor;
    
        // See if that neighbor is out of bounds
        if (nextRow < 0 || nextRow >= cells || nextColumn < 0 || nextColumn >= cells) {
            continue; //this keyword will ensure we don't leave the for loop, but moves onto next neighbor pair.
        }

        // If we have visted that neighbor, continue to next neighbor
        if (grid[nextRow][nextColumn]) {
            continue;
        }

        // Remove a wall from either horizontals or verticals
        if (direction === 'left') {
            verticals[row][column - 1] = true;//if moving left, the row stays the same, but the column changes | set to 'true' as there is an opening
        } else if (direction === 'right') {
            verticals[row][column + 1] = true;
        }

    };

    // Visit that next cell

    
};


//stepThroughCell(startRow, startColumn);

stepThroughCell(1, 1);

//console.log(grid);

