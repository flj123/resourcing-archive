let imgs = [];
let currentImg;
let index = 0;
let pg;
let c1;
let c2;

function preload() {
  for (let i = 0; i < 6; i++) {
    imgs[i] = loadImage('assets/image'+i+'.jpg');
    //print('assets/image'+i+'.jpg');
  }
}

function setup() {
  createCanvas(int(10)*75, int(10)*75);
  currentImg = imgs[index];
  pg = createGraphics(currentImg.width, currentImg.height);
  
  c1 = color(235, 42, 28);
  c2 = color(9, 217, 172);
}

function draw() {
  background(c1);
  
  // Dynamic Variables
  let sc = map(sin(frameCount), -1, 1, 2,0.5)
  let interA = lerpColor(c1, c2, sc);
  let interB = lerpColor(c2, c1, sc);
  colorMode(HSB);
  
  // Make Buffer
  pg.background(interA);
  pg.tint(interA);
  
  pg.image(currentImg, 0, 0);
  pg.noTint();
  pg.noStroke();
  pg.fill(interB);
  pg.ellipse(pg.width/2, pg.height/2, 250*sc*sc, 250*sc*sc);  
  
  // Display Image
  push();
  translate(width/2, height/2);
  imageMode(CENTER);
  scale(sc);
  image(pg, 0, 0);
  image(pg, 0, height/2+100, 150,150);
  pop();
  
  // Refresh Image
  if (frameCount % 180 == 0){
    index++;
    currentImg = imgs[index%imgs.length];
    pg = createGraphics(currentImg.width, currentImg.height);
  }
  
}

