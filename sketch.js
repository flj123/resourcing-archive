let imgs = [];
let currentImg;
let index = 0;
let pg;
let c1;
let c2;
let fs = false;
let table;

function preload() {
  let urls = [
    //'assets/image0.jpg',
    //'assets/image1.jpg',
    //'assets/image2.jpg',
    //'assets/image3.jpg',
    //'assets/image4.jpg',
    //'assets/image5.jpg'
  ];
  
  // imgs = [];
  // for (url of urls){
  //   imgs.push(loadImage(url));
  // }

  // load table
  loadTable('assets/data.csv', 'csv', 'header', table =>{
    let totalRows = table.getRowCount();
    totalRows = 100;
    console.debug("Loading images...");
    for (let i = 0; i < totalRows; i++){
      //let i = floor(random(table.getRowCount()));
      //console.log(i);
      row = table.getRow(i);

      //find the corresponding species
      let domain = '';
      let folder = 'https://resourcingsf.s3.amazonaws.com/imagesMidSize/'
      //folder = '_static/imagesMidSize/';

      let title = row.getString('ProjectTitle')
      let authors = row.getString('ProjectAuthors');
      let date = row.getString('PublicationDate');
      let filename = row.getString('ImageFilename');
      //filename = 'H01_1982_PerformanceAtoZ_H (1).jpg';

      // console.log('Title: ', title);
      // console.log('Authors: ', authors);
      // console.log('Publication Date: ', date);

      // console.log('Loading image...');

      loadImage(folder + filename, img => {
        imgs.push(img);
      });
      console.debug("Image " + i + " of " + totalRows);
    }
    console.debug("All images loaded!");  
  });

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
  scale(0.5);   // Uniform Scale
  scale(sc); // Dynamic Scale
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed(){
  fs = !fs;
  fullscreen(fs);
}

