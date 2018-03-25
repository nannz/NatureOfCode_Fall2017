import geomerative.*;

RShape grp;
RPoint[][] pointPaths;
RPoint[] selectedPoints;
float xmag, ymag, newYmag, newXmag = 0;
float z = 0;

boolean ignoringStyles = false;
float ZSTEP = 10;
void setup() {
  size(600, 600, P3D);

  // VERY IMPORTANT: Allways initialize the library before using it
  RG.init(this);
  RG.ignoreStyles(ignoringStyles);

  RG.setPolygonizer(RG.ADAPTATIVE);

  grp = RG.loadShape("bagua2.svg");
  grp.centerIn(g, 100, 1, 1); // what does that mean?

  pointPaths = grp.getPointsInPaths();
  selectedPoints = new RPoint[pointPaths.length];

  for (int i = 0; i < pointPaths.length; i++) {
    if (pointPaths[i]!=null) {
      int j = floor(random(pointPaths[i].length));
      RPoint selectedPoint = pointPaths[i][j];
      selectedPoints[i] = selectedPoint;
    }
  }
  printArray(selectedPoints);
}

void draw() {
  translate(width/2, height/2);
  //rotate the camera
  newXmag = mouseX/float(width) * TWO_PI;
  newYmag = mouseY/float(height) * TWO_PI; 
  float diff = xmag-newXmag;
  if (abs(diff) >  0.01) { 
    xmag -= diff/4.0;
  }  
  diff = ymag-newYmag;
  if (abs(diff) >  0.01) { 
    ymag -= diff/4.0;
  } 
  rotateX(-ymag); 
  rotateY(-xmag); 

  background(0);
  stroke(255);
  noFill();
  //z = 10 * sin( frameCount/50.0 * PI);
  z = 10;
  beginShape();
  for (int i = 0; i < selectedPoints.length; i++) {
    vertex(selectedPoints[i].x, selectedPoints[i].y, z);
    
    pushMatrix();
    translate(selectedPoints[i].x, selectedPoints[i].y, z);
    sphere(10);
    //ellipse(selectedPoints[i].x, selectedPoints[i].y, 10, 10);
    popMatrix();
    
    if (i != selectedPoints.length-1) {
      line(selectedPoints[i].x, selectedPoints[i].y, z, selectedPoints[i+1].x, selectedPoints[i+1].y, z+ZSTEP);
    }
    
    z += ZSTEP;
    if (z == selectedPoints.length * ZSTEP) {
      z = selectedPoints.length * ZSTEP;
    }
  }
  endShape();

  for (int i = 0; i < selectedPoints.length; i++) {
  }

  //z = 10;
  //for (int i = 0; i<pointPaths.length; i++) {
  //  translate(0, 0, z);

  //  if (pointPaths[i] != null) {
  //    beginShape();
  //    for (int j = 0; j<pointPaths[i].length; j++) {
  //      vertex(pointPaths[i][j].x, pointPaths[i][j].y);
  //    }
  //    endShape();

  //    for (int j = 0; j < pointPaths[i].length; j++) {
  //      fill(255, 0, 0);
  //      String indexInfo = i +". " + j;
  //      text(indexInfo, pointPaths[i][j].x, pointPaths[i][j].y);
  //      noFill();
  //    }
  //  }
  //}
  //z += 10;
  //if (z == 1000) {
  //  z = 1000;
  //}
}

void mousePressed() {
  ignoringStyles = !ignoringStyles;
  RG.ignoreStyles(ignoringStyles);
  for (int i = 0; i < pointPaths.length; i++) {
    if (pointPaths[i]!=null) {
      int j = floor(random(pointPaths[i].length));
      RPoint selectedPoint = pointPaths[i][j];
      selectedPoints[i] = selectedPoint;
    }
    ZSTEP = random(1,10);
  }
  
}