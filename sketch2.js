class windmill{
    constructor(bounds_x, bounds_y, max_Ang){
        this.X = Math.random()*bounds_x;
        this.Y = Math.random()*bounds_y;
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
    createCanvas(800,1000);
  
    background(50);
    for(let i =0; i<16; i++){
        let tempW = new windmill(800,800,0.03);
        windmills.push(tempW);
    }
    for(let i =0; i<16; i++){
        translate(windmills[i].getX(), windmills[i].getY());
        rotate(windmills[i].getAng());
        triangle(0, 0, -15, 30, 15, 30);
        translate(-windmills[i].getX(), -windmills[i].getY());
        rotate(-windmills[i].getAng());
        console.log(windmills[i].getX(), windmills[i].getY());
    }
  }
 async function draw(){
    
     
 }
