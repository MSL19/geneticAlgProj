# Windmill Positioning Simulator
**Important Files**
index.html: 


-simple html file that merges the various javascript files into one webpage. This file is hosted at: https://msl19.github.io/geneticAlgProj/


p5.js:


-JS library for graphics from the Processing foundation. I used this for all of the graphics in this project.


sketch2.js:


-This file contains the "windmill", and "design" classes that I wrote. Each class has a constructor and methods to complete every facet of the genetic algorithim, such as mate, mutate, and evaluate fitness.

-This file also contians the function that runs the genetic algorithim. In this function, each design is quickly drawn, so that the the fitness of the windmill desings can be evaluated.

-After each windmill's fitness is evaluated, the top 50% of the population are mated together to create a new population. 

-Mutations are set to happen 20% of the time, and they occur in the form of a windmil being repositioned

-A windmill's individual fitness is the function of it's angle and wether it is obstructed by another windmill (represented by a blue wind tail)


**All other files are depreciated from my attempt to make a bridge building program**

**How to Run:**

-open index.html in Chrome
-Or go to https://msl19.github.io/geneticAlgProj/
