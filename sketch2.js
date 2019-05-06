let designsArr = [];

class windmill{
    constructor(bounds_x, bounds_y, max_Ang, padding){
        this.bounds_x = bounds_x;
        this.bounds_y = bounds_y;
        this.max_Ang = max_Ang;
        this.padding = padding;
        
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
    mutateW(){
        this.X = Math.random()*this.bounds_x+this.padding;
        this.Y = Math.random()*this.bounds_y+this.padding;
        this.ang = (Math.random()-0.5)*this.max_Ang;
    }
    getPower(){
        let color = get(this.X, this.Y-10)[2];

        let power = 1+((50-color)/205);
       
        power -= 0.6*Math.abs(this.ang);
        
        return power;
    }
}
class design{
    constructor(max_num){

        this.num = Math.floor(Math.random()*max_num);
        if(this.num%2!=0){
            this.num++;
        }
        //console.log(this.num);
        this.windmills = [];
        for(let i =0; i<this.num; i++){
            let tempW = new windmill(600,600,0.5, 100);
            this.windmills.push(tempW);
        }

    }
    copy(windmill_arr){
        this.windmills = windmill_arr;
        this.num = windmill_arr.length;
        console.log(this.num);
    }
    drawDesign(){
        noStroke();
    createCanvas(800,800);
    // now the first two arguments of a rect are its center point, not corner
    ellipseMode(CENTER); // Set ellipseMode to CENTER

    background(50);
        console.log("drawing");
        for(let i =0; i<this.num; i++){
            push();
              translate(this.windmills[i].getX(), this.windmills[i].getY());
              rotate(this.windmills[i].getAng());
              fill(230);
            //  triangle(0, 0, -15, 30, 15, 30);
              ellipse(0,0,55,15);
              rectMode(CENTER);	
              rect(0,15,20,20);
      
              fill(0,0,200,171);
              rect(0,510,55,1000);
              translate(-this.windmills[i].getX(), -this.windmills[i].getY());
             // rotate(-windmills[i].getAng());
             pop();
             // console.log(this.windmills[i].getX(), this.windmills[i].getY());
              //console.log(this.windmills[i].getAng());
          }
          //console.log(get(400, 300));
      
          fill(get(400, 300));
          rect(50,50,40,40);
      
    }
    getDNA(){
        return this.windmills;
    }
    mate(partnerDes){
        let length1 = Math.floor(Math.random()*this.windmills.length);
        let length2 = Math.floor(Math.random()*partnerDes.getDNA().length);
        return{
            child1: new design(this.windmills.slice(0,length1).concat(partnerDes.getDNA().slice(length1, partnerDes.getDNA.length))),
            child2: new design(partnerDes.getDNA().slice(0,length2).concat(this.windmills.slice(length2, this.windmills.length))) 
        }
    }
    mutate(){
        for(let i = 0; i<this.windmills.length; i++){
            if(Math.random()>0.8){
                this.windmills[i].mutateW();
              
            }
        }

    }
    getFitness(){
        
        let totalPow = 0;
        let totalCost = 0
        for(let i = 0; i<this.windmills.length; i++){
            totalPow += this.windmills[i].getPower();
            totalCost++;
           
        }
     
        return totalPow/totalCost;
    }

}
function createDesigns(numDes){
    for(let i =0; i<numDes; i++){
        designsArr.push(new design(20));
    }
   
}
function runNextGen(){
    console.log(designsArr);
    let fitnessArr = [];
    let matingPool = [];
    let maxFitness = 0;
    let minMax = 0;
    let count = 0;
    for(let i =0; i<designsArr.length; i++){
        designsArr[i].drawDesign();
        let tempFit = designsArr[i].getFitness();
        fitnessArr.push(tempFit);

    }
    clear();
    fitnessArr.sort(function(a, b){return b - a});
    for(let i = 0; i<designsArr.length/2; i++){
        designsArr[i].drawDesign();
        let tempFit = designsArr[i].getFitness();
        console.log(designsArr.length/2);
        if(tempFit>fitnessArr[designsArr.length/2]){
            matingPool.push(designsArr[i]);
        }
        clear();
        console.log("MaxFitness"+fitnessArr[0]);
        if(tempFit===fitnessArr[0]){
            console.log("New Alpha");
            designsArr[i].drawDesign();
        }
    }
    
    designsArr = [];
    console.log(matingPool);
    for(let i = 0; i<matingPool.length; i++){
        console.log("mating");
        let offspring =matingPool[i].mate(new design(matingPool[i+1]));
        console.log(offspring.child1);
        designsArr.push(offspring.child1.mutate());
        designsArr.push(offspring.child2.mutate());
        
    }
    console.log(designsArr);

    
}
async function setup(){
   // pixelDensity(4.7); //makes it high res
    //fullScreen();
    
   /* let temp = new design(10);
    temp.drawDesign();
    let temp2 = new design(10);
    console.log(temp2);
    temp2.copy(temp.getDNA());
    temp2.mutate();
    temp2.drawDesign();
    console.log("adasdas"+temp2.getFitness());
    */
   createDesigns(16);
    
  }
 