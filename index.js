const { 
    Engine, 
    Render, 
    Runner, 
    World, 
    Bodies, 
    MouseConstraint, 
    Mouse 
} = Matter;
// Matter script tag was included in the HTML file; when included, it added in a global variable of Matter

const width = 800;
const height = 600;

const engine = Engine.create(); //boilerplate of Matter JS
const { world } = engine;
const render = Render.create({
    element: document.body, //passing an options object | telling the render where we want to show our representation inside the html document
    engine : engine,
    options: {
        wireframes: false, //wireframe mode is just the outline of the shape, is false:solid shapes
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
    Bodies.rectangle(400, 0, 800, 40, { isStatic: true}), // 400=total units over (800px canvas), 0=units down, 800=units wide, 40=units talls 
    Bodies.rectangle(400, 600, 800, 40, { isStatic: true}), //bottom wall | 400 units over, 600 unts down, 800 wide, and 40 tall
    Bodies.rectangle(800, 300, 40, 600, { isStatic: true}), //right wall
    Bodies.rectangle(0, 300, 40, 600, { isStatic: true}), //left wall
];
World.add(world, walls)
//**END OF WALL */

//**RANDOM SHAPES */
for (let i = 0; i < 50; i++) {
    if (Math.random() > 0.5) { //if greater than 0.5, will create a rectangle. Otherwise, will create different shape altogether
        World.add(
            world, 
            Bodies.rectangle(Math.random() * width, Math.random() * height, 50, 50) //random distribution across the entire canvas
        );
    } else {
        World.add(
            world,
            Bodies.circle(Math.random() * width, Math.random() * height, 35, {
                // an options object
                render: { //a render property to customize how this circle gets rendered onto the screen
                    fillStyle: 'red'
                }
            } ) //third argument is radius of circle, 
        )
    }
}



// MouseConstraint: for receiving mouse input | is what allows movement of shapes in the world
World.add(world, MouseConstraint.create(engine,  {
    mouse: Mouse.create(render.canvas)
}))

