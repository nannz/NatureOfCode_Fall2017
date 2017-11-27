//branch//
//in draw() loop 
//add natural feeling
//NOISE value on the rotation and length
//add noise as random, for natural movements.

var c = 0;
var angle;
var len;
function setup() {
  createCanvas(500, 600);
  background(255);
  len = random(150,200);
  angle = PI/6;
}

function draw() {
  background(255);
  
  wind = map(noise(frameCount * 0.01), 0, 1, -0.2, 0.2);
  //angle = map(mouseX, 0 , width, PI/2,0);
  //len = map(mouseY, 0, height, 150, 300);
  translate(width/2, height);
  branch(len,100);
}

function branch(len,diff) { //diff is used to add noise on noise. to make it move for noiseAngleR and noiseAngleL
  var sw = map(len, 200, 0, 30, 0); //strokeWeight
  strokeWeight(sw);
  line(0, 0, 0, -len);

  translate(0, -len);
  if (len > 10) {
    //noiseAngle
    var noiseAngleR = map(noise(diff), 0,1,-0.3,0.3);
    var noiseAngleL = map(noise(diff + 200), 0,1,-0.3,0.3);
    
    var noiseLenR = map(noise(diff + 500), 0,1,0.7,1.3);
    var noiseLenL = map(noise(diff + 700), 0,1,0.7,1.3);
    //right
    push()
    rotate(angle + noiseAngleR);// + wind);
    branch(len *2/3 * noiseLenR, diff + 30);
    pop();
    //left
    push();
    rotate(-angle +  noiseAngleL);// + wind);
    branch(len *2/3 * noiseLenL, diff + 60);
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