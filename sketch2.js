/**
 * Name: Max Lewis
 * Project Name: AI Project #2
 * Purpose: 
 * Us genetic algorithims to oganize windmills to optimize effeciency
 * Date: 4/15/19
 * Collaborators: None
 */

let numOfW = 30;
let designsArr = [];
let once = true;
let count = 0;
//gradient




class windmill{ //create windmill class
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
   
    getPower(){ //fitness for individual windmills
        let color2 = get(this.X, this.Y-10)[2];

        let power = 1+((50-color2)/205);
       
        power -= 0.6*Math.abs(this.ang);
        
        return power;
    }
}
class design{ //design class is a array of windmills
    constructor(max_num){

        this.num = max_num;
       
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
        let c1 = color(0, 0, 200);
        let c2 = color(50, 50, 50);
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
              ellipse(0,0,55,15);
              rectMode(CENTER);	
              rect(0,15,20,20);
              
              fill(0,0,200,171);
             // rect(0,510,55,1000);
              
              quad(30,0,-30,0,-1,1000,1,1000);
              translate(-this.windmills[i].getX(), -this.windmills[i].getY());
             pop();
             
          }
      
        
      
    }
    getDNA(){
        return this.windmills;
    }
    mate(partnerDes){ //mate with another design
        
        let temp1 = new design(4);
        let temp2 = new design(4);
        temp1.copy(this.windmills.slice(0,19).concat(partnerDes.getDNA().slice(19,39)));
        temp2.copy(partnerDes.getDNA().slice(0,19).concat(this.windmills.slice(19,39)));
        console.log("section");
        return{
            child1: temp1,
            child2: temp2 
        }
    }
    mutate(){ //mutate the DNA of the design
        for(let i = 0; i<this.windmills.length; i++){
         
            if(Math.random()>0.8){
                
                this.windmills[i] = new windmill(600,600,0.5, 100);
                
              
            }

        }
        let temp = new design(numOfW);
        temp.copy(this.windmills);
        return temp;

    }
    getFitness(){ //get the fitness for each windmill and add them up
        
        let totalPow = 0;
        let totalCost = 0
        for(let i = 0; i<this.windmills.length; i++){
            totalPow += this.windmills[i].getPower();
            totalCost++;
           
        }
        if(this.windmills.length<15){
            return 0;
        }
     
        return totalPow;
    }

}
function createDesigns(numDes){ //create x number of designs to create a population
    for(let i =0; i<numDes; i++){
        designsArr.push(new design(numOfW));
    }
   
}
function runNextGen(){
   count++;
   document.getElementById("count").innerHTML = "generations: "+count; //update html

    console.log(designsArr);
    let fitnessArr = [];
    let matingPool = [];
    let maxFitnessNum = 0;
  
    for(let i =0; i<designsArr.length; i++){
        designsArr[i].drawDesign();
        let tempFit = designsArr[i].getFitness();
        fitnessArr.push(tempFit);

    }
    clear();
    fitnessArr.sort(function(a, b){return b - a});
    for(let i = 0; i<designsArr.length; i++){
        designsArr[i].drawDesign();
        let tempFit = designsArr[i].getFitness();
        
        if(tempFit>=fitnessArr[20]){
            matingPool.push(designsArr[i]);
        }
        clear();
        console.log("fitnessArr");
        console.log(fitnessArr);
        if(tempFit>fitnessArr[2]){
            maxFitnessNum = i;
        }
    }
    if(once){
        document.getElementById("disp2").innerHTML = "initial fitness: "+fitnessArr[0];
        once = false;
    }
    document.getElementById("disp").innerHTML = "final fitness: "+fitnessArr[0];
    designsArr[maxFitnessNum].drawDesign();
    designsArr = [];
    console.log("mating pool");
    console.log(matingPool);
    while(matingPool.length>21){
        matingPool.pop();
    }
    while(matingPool.length<21){
        matingPool.push(new design(40));
    }
    for(let i = 0; i<(matingPool.length-1); i++){
        console.log("mating");
        let temp = new design(4);
        let num2 = i+1;
        temp.copy(matingPool[num2].getDNA());
        let offspring = matingPool[i].mate(temp);
        console.log("offspring");
        console.log(offspring.child1.mutate());
        designsArr.push(offspring.child1.mutate());
        designsArr.push(offspring.child2.mutate());
        
    }
    console.log("new desings");
    console.log(designsArr);

    
}
function run100Gen(){
    for(let i = 0; i<100; i++){
        runNextGen();
        count++;
        document.getElementById("count").innerHTML = count;
    }
}
let desCounter = 0;
function showOtherDes(){
    if(desCounter === 39){
        desCounter = 0;
    }
    designsArr[desCounter].drawDesign();
    desCounter++;
}
async function setup(){
   
   createDesigns(40);
    
  }
 