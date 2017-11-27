//branch//
//in draw() loop 
var c = 0;
var angle;
var len;
function setup() {
  createCanvas(500, 600);
  background(255);
  
}

function draw() {
  background(255);
  
  angle = map(mouseX, 0 , width, PI/2,0);
  len = map(mouseY, 0, height, 150, 300);
  translate(width/2, height);
  
  branch(len);
}

function branch(len) {
  var sw = map(len, 200, 0, 30, 0); //strokeWeight
  strokeWeight(sw);
  line(0, 0, 0, -len);

  translate(0, -len);
  if (len > 8) {
    push()
    rotate(angle);
    branch(len *2/ 3);
    pop();

    push();
    rotate(-angle);
    branch(len *2/ 3);
    pop();
  }


  c += 1;
}