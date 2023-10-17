//drawing w/ canvas

let canvas = document.getElementById('canvas'); //Find the canvas element
let ctx = canvas.getContext('2d'); //create a drawing object

ctx.beginPath(); 
ctx.moveTo(0, 0); // move to position 100, 100
ctx.lineTo(100, 100, 'red'); //add a line from the current position to x, y 
ctx.stroke(); //draw the line

ctx.fillStyle = 'black';  //set the color to draw to black
ctx.fillRect(50, 10, 1, 1);
// to draw a pixel (a dot) it is sufficient to draw a rectangle of height and length 1

ctx.fillStyle = "blue"; 
ctx.fillRect(110, 110, 150, 75);  //draw the rectangle

ctx.beginPath();
ctx.arc(175, 50, 50, 0, 2 * Math.PI); //create a circle on the path
ctx.fillStyle = "purple";
ctx.fill();  //draw and fill the circle
