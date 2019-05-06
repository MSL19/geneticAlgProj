

class windmill{
    constructor(bounds_x, bounds_y, max_Ang, padding){
        this.X = Math.random()*bounds_x+padding;
        this.Y = Math.random()*bounds_y+padding;
        this.ang = (Math.random()-0.5)*max_Ang;
    }
    getX(){
        return this.X;
    }
    getY(){
        return this.Y;
    }
    getAng(){
        return this.ang;
    }
}
let windmills = [];
async function setup(){
   // pixelDensity(4.7); //makes it high res
    //fullScreen();
    createCanvas(800,800);
    // now the first two arguments of a rect are its center point, not corner
    ellipseMode(CENTER); // Set ellipseMode to CENTER

    background(50);
    for(let i =0; i<10; i++){
        let tempW = new windmill(600,600,0.5, 100);
        windmills.push(tempW);
    }
    for(let i =0; i<10; i++){
      push();
        translate(windmills[i].getX(), windmills[i].getY());
        rotate(windmills[i].getAng());
        fill(230);
      //  triangle(0, 0, -15, 30, 15, 30);
        ellipse(0,0,55,15);
        rectMode(CENTER);	
        rect(0,15,20,20);

        fill(0,0,200,171);
        rect(0,510,55,1000);
        translate(-windmills[i].getX(), -windmills[i].getY());
       // rotate(-windmills[i].getAng());
       pop();
        console.log(windmills[i].getX(), windmills[i].getY());
        console.log(windmills[i].getAng());
    }
    console.log(get(400, 300));

    fill(get(400, 300));
    rect(50,50,40,40);

  }
 async function draw(){
    
     
 }
