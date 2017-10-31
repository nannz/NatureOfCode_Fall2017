//** in index.html, put defer before dat.gui.min.js, sketch.js, and particle.js
//debug mode is important for raw data
//how to remove particles

var particles = [];
var MAX_P = 10; //max num of particles -> if reach, remove old ones to give room to new ones
//https://github.com/dataarts/dat.gui

//create jason object for the parameters we need
var param = {
  debugMode: false, //boolean value, initiate value is false
  gravity: 1, //comma!
  wind: 0,
  numOfParticles: 0,
  addParticle: function() {
    particles.push(new Particle(random(width), 0));
    param.numOfParticles = particles.length; // update value
  }
};

var gui = new dat.gui.GUI();
gui.add(param, 'debugMode'); // toggle
gui.add(param, 'gravity', 0, 1.5, 0.1); //min value, max value, increment step
gui.add(param, 'wind', -1.0, 1.0, 0.1); //min value, max value, step
gui.add(param, 'numOfParticles').listen(); //listen!
gui.add(param, 'addParticle');

function setup() {
  createCanvas(500, 500);

  for (var i = 0; i < 5; i++) {
    particles.push(new Particle(random(width), 0));
    param.numOfParticles = particles.length;
  }
}

function draw() {
  background(0);

  for (var i = 0; i < particles.length; i++) {
    var p = particles[i];
    //force
    var gravity = createVector(0, param.gravity * p.mass); //var gravity = createVector(0, GRAVITY * p.mass);
    //wind
    var wind = createVector(param.wind, 0);

    p.applyForce(gravity);
    p.applyForce(wind);
    
    //check and remove
    //way1 of removing
    /*if(p.checkBoundries()){
       particles.splice(i,1);//remove the particle!
       param.numOfParticles = particles.length;//update the showing of the number on GUI!
    };*/
    
    //way2 of removing
    p.checkBoundries();
    /*
    if(particles.length > MAX_P){
      particles.splice(0,1);
      param.numOfParticles = particles.length;//update the showing of the number on GUI!
      print("remove!");
    }
    */
    p.update();
    
    //way 3 of removing
    p.updateLifespan();
    if(p.isDead){
      particles.splice(i,1);
      param.numOfParticles = particles.length;//update the showing of the number on GUI!
    }
    
    //debug mode
    if (param.debugMode) {
      p.debugDisplay();
    } else {
      p.display();
    }
  }

  if (param.debugMode) {
    fill(255, 0, 0);
    text("frameRate: " + round(frameRate()), 25, 25);
  }
}