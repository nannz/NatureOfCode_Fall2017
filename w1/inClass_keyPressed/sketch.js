function setup() {
  createCanvas(500, 600);
  background(0);
}

function draw() {

}


function keyPressed() {
  print(key);
  if (key == 'a' || key == 'A') { //the default if you press a, it's actually A
    background(random(255), random(255), random(255));
  }
  if (keyCode == LEFT_ARROW){ // keyCode only works in keyPressed() funciton
    //reference:
    //http://keycode.info/
    background(255,0,0);
  }
}


function keyTyped(){
  //the default if you press a, it's a
  
  
}