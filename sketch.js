let index = 0;

let currentImg, currentData, myFont;
let pg, c1, c2, table, totalRows;
let fs = false;

let randomMode = false;

let domain = '';
let folder = 'https://resourcingsf.s3.amazonaws.com/imagesMidSize/'
//folder = '_static/imagesMidSize/';

function preload() {
  // // load table
  // loadTable('assets/data.csv', 'csv', 'header', table =>{
  //   let totalRows = table.getRowCount();
  //   totalRows = 100;
  //   console.debug("Loading images...");
  //   for (let i = 0; i < totalRows; i++){
  //     //let i = floor(random(table.getRowCount()));
  //     //console.log(i);
  //     row = table.getRow(i);

  //     //find the corresponding species
  //     let domain = '';
  //     let folder = 'https://resourcingsf.s3.amazonaws.com/imagesMidSize/'
  //     //folder = '_static/imagesMidSize/';

  //     let title = row.getString('ProjectTitle')
  //     let authors = row.getString('ProjectAuthors');
  //     let date = row.getString('PublicationDate');
  //     let filename = row.getString('ImageFilename');
  //     //filename = 'H01_1982_PerformanceAtoZ_H (1).jpg';

  //     // console.log('Title: ', title);
  //     // console.log('Authors: ', authors);
  //     // console.log('Publication Date: ', date);

  //     // console.log('Loading image...');

  //     loadImage(folder + filename, img => {
  //       imgs.push(img);
  //     });
  //     console.debug("Image " + i + " of " + totalRows);
  //   }
  //   console.debug("All images loaded!");  
  // });

  // Load Table
  loadTable('assets/data.csv', 'csv', 'header', t =>{
    table = t;
    totalRows = table.getRowCount();
    //totalRows = 100;
    refreshImage();
  });

  myFont = loadFont('assets/FRADM.TTF');
  
  // // Load Default Images
  // let counter = 0;
  // loadImage('assets/image0.jpg', img =>{
  //   imgs[counter] = img;
  //   counter++;
  // });
  
  // loadImage('assets/image1.jpg', img =>{
  //   imgs[counter] = img;
  //   counter++;
  // });
  // loadImage('assets/image2.jpg', img =>{
  //   imgs[counter] = img;
  //   counter++;
  // });
  
}



function setup() {
  colorMode(HSB, 1,1,1);
  createCanvas(windowWidth, windowHeight); 
  c1 = color(1, .8, .8);
  //c1 = color(0);  
  c2 = color(9, 217, 172);
  c2 = color(255);

}
let textOn = true;
function draw() {
  background(c1);
  
  if (frameCount%120 == 0){
    if (random() > 0.25){
      randomMode = false;
      //console.debug("Random Mode OFF!");
    } else{
      randomMode = true;
      //console.debug("Random Mode ON!");
    }
  }
  
  
  // Dynamic Variables
  c1 = color(map(tan(radians(frameCount)), -1, 1, 0,1), 0.7,0.4);
  let sc = map(sin(frameCount), -1, 1, 2,0.5)
  //sc = map(sin(radians(frameCount)), -1, 1, 1,0.5)
  
  let interA = lerpColor(c1, c2, sc);
  let interB = lerpColor(c2, c1, sc);

  
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
  // Draw Images
  image(pg, 0, 0);  
  image(pg, 0, windowHeight/2+100, 150,150); // second image
  pop();

  
  if (frameCount % 20 == 0){
    textOn = !textOn;
  }
  if (textOn){
    // Text
    c1 = color(1,1,1);
  let margin = 25;
  let fontSize = windowHeight * 0.2;
  noStroke();
  
  textFont(myFont);
  textAlign(CENTER, CENTER)
  textSize(fontSize);
  fill(c1);
  //text(currentData.date, windowWidth/2, windowHeight/2 + +fontSize);
  textSize(fontSize/10);
  text(currentData.date, windowWidth/2, windowHeight/2);
  fill(0);
  textSize(fontSize/15);
  //text(currentData.authors.toUpperCase(), 0,0, windowWidth, windowHeight);

  }
  
  

  
  // Refresh Image
  if (frameCount % 60 == 0){ // 180
    refreshImage();

  }

}

function refreshImage(){
  //console.debug("Loading a new image");
  if (randomMode) index = floor(random(table.getRowCount()));
  row = table.getRow(index);

  currentData = {
    'title' : row.getString('ProjectTitle'),
    'authors': row.getString('ProjectAuthors'),
    'date': row.getString('PublicationDate').replace('/', ' ').replace('/', ' ').split(" ")[2],
    'filename': row.getString('ImageFilename')
  };

  // console.log('Title: ', title);
  // console.log('Authors: ', authors);
  // console.log('Publication Date: ', date);

  // console.log('Loading image...');

  loadImage(folder + currentData.filename, img => {
    currentImg = img;
    //console.log(currentImg);
    // Create PG Graphic
    pg = createGraphics(currentImg.width, currentImg.height);
    //console.log('Made a pg!');
    // Iterate and wrap around
    index++;
    index = index%totalRows;
    //currentImg = imgs[index%totalRows]; // wrap around

  });  

}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed(){
  fs = !fs;
  fullscreen(fs);
}

