//branch//
//in draw() loop 
//add natural feeling
//random value on the rotation and length
//add possibilities.
var c = 0;
var angle;
var len;
var randomV;
function setup() {
  createCanvas(500, 600);
  background(255);
  len = 180;
  angle = PI/6;
}

function draw() {
  background(255);
  randomV = random(0.0,1.0);
  if(randomV > 0.5){
    angle = PI/6;
  }else{
    angle = - PI/6;
  }
  //angle = map(mouseX, 0 , width, PI/2,0);
  //len = map(mouseY, 0, height, 150, 300);
  translate(width/2, height);
  branch(len);
  noLoop();
}

function branch(len) {
  var sw = map(len, 200, 0, 30, 0); //strokeWeight
  strokeWeight(sw);
  line(0, 0, 0, -len);

  translate(0, -len);
  if (len > 10) {
    //right
    push()
    rotate(angle + random(-0.3,0.3));
    branch(len *2/3 * random(0.7,1.3));
    pop();
    //left
    push();
    rotate(-angle+ random(-0.3,0.3));
    branch(len *2/3 * random(0.7,1.3));
    pop();
    //you can have more than two branches!
    // //center
    // push();
    // rotate(random(-0.4,0.4));
    // branch(len *2/3 * random(0.7,1.3));
    // pop();
  }


  c += 1;
}