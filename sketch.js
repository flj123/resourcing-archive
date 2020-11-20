let imgs = [];
let currentImg;
let index = 0;
let pg;
let c1;
let c2;
let fs = false;

function preload() {
  // for (let i = 0; i < 6; i++) {
  //   imgs[i] = loadImage('assets/image'+i+'.jpg');
  //   //print('assets/image'+i+'.jpg');
  // }
  let urls = [
    // 'https://ia803003.us.archive.org/1/items/centricityexhibitionphotos/1988.02_LWoods_Centricity_35.jpg',
    // 'https://ia801008.us.archive.org/6/items/1984.09lwoodsfreespaceproject12/1984.09_LWoods_FreespaceProject_10.jpg',
    // 'https://ia801008.us.archive.org/6/items/1984.09lwoodsfreespaceproject12/1984.09_LWoods_FreespaceProject_3.jpg',
    // 'https://ia903003.us.archive.org/1/items/centricityexhibitionphotos/1988.02_LWoods_Centricity_34.jpg'
    'assets/imageLarge0.jpg',
    'assets/image0.jpg',
    'assets/image1.jpg'
  ];
  
  imgs = [];
  for (url of urls){
    imgs.push(loadImage(url));
  }
  //imgs[0] = loadImage(url);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed(){
  fs = !fs;
  fullscreen(fs);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  currentImg = imgs[index];
  pg = createGraphics(currentImg.width, currentImg.height);
  
  c1 = color(235, 42, 28);
  c1 = color(0,255,0);
  
  c2 = color(9, 217, 172);
  c2 = color(255,0,0);

}

function draw() {
  background(c1);
  
  // Dynamic Variables
  let sc = map(sin(frameCount), -1, 1, 2,0.5)
  sc = map(sin(radians(frameCount)), -1, 1, 1,0.5)
  
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
  translate(windowWidth/2, windowHeight/2);
  imageMode(CENTER);
  // Uniform Scale
  scale(0.5); 
  // Dynamic Scale
  scale(sc);
  image(pg, 0, 0);
  image(pg, 0, windowHeight/2+100, 150,150);
  pop();
  
  // Refresh Image
  if (frameCount % 30 == 0){ // 180
    index++;
    currentImg = imgs[index%imgs.length];
    pg = createGraphics(currentImg.width, currentImg.height);
  }
  
}

