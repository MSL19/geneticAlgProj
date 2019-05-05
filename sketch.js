
window.addEventListener('load', function() {
	let populationArray = [];
	let popsize = 16;
	//Fetch our canvas
	var canvas = document.getElementById('world');
	var redColor = '#C44D58',
			greenColor = '#C7F464';
	//Setup Matter JS
	var engine = Matter.Engine.create();
	var world = engine.world;
	var render = Matter.Render.create({
		canvas: canvas,
		engine: engine,
		options: {
			width: 900,
			height: 900,
			background: 'transparent',
			wireframes: false,
			showAngleIndicator: false
		}
	});
	let bridge1 = Matter.Bodies.rectangle(250, 250, 200, 15, {
		density: 0.04,
		friction: 1,
		frictionAir: 0.00001,
		restitution: 0.8,
		render: {
			fillStyle: '#F35e66',
			strokeStyle: 'black',
			lineWidth: 1
		}
	});
	let bridge2 = Matter.Bodies.rectangle(300, 300, 200, 15, {
		density: 0.04,
		friction: 1,
		frictionAir: 0.00001,
		restitution: 0.8,
		render: {
			fillStyle: '#F35e66',
			strokeStyle: 'black',
			lineWidth: 1
		}
	});
	function createInitialPool(){
			for(let i = 0; i<popsize; i++){
					populationArray[i] = new Vector(Math.random()*900, Math.random()*900);
			}
	}
	function runGeneration(){

	}
	var collider = Matter.Bodies.rectangle(400, 700, 900, 50, {
		isSensor: true,
		isStatic: true,
		render: {
			fillStyle: '#F35e66',
			strokeStyle: 'black',
			lineWidth: 1
		}
	});
	var side1 = Matter.Bodies.rectangle(400 , 500, 900, 50, {
		isSensor: false,
		isStatic: true,
		render: {
			fillStyle: '#455e66',
			strokeStyle: 'black',
			lineWidth: 1
		}
	});
	
	
	
	Matter.World.add(world, side1);
	

	//Add a floor
	var floor = Matter.Bodies.rectangle(250, 500, 50, 40, {
		isStatic: true, //An immovable object
		render: {
			fillStyle: '#F35e66',
			strokeStyle: 'black',
			lineWidth: 1
		}
	});
	Matter.World.add(world, collider);
	
	//Make interactive
	var mouseConstraint = Matter.MouseConstraint.create(engine, { //Create Constraint
		element: canvas,
		constraint: {
			render: {
				visible: false
			},
			stiffness:0.8
		}
	});
	// Matter.World.add(world, [
	// 	collider,
	// 	Matter.Bodies.rectangle(400, 700, 900, 50, { 
	// 		isStatic: true,
	// 		render: {
	// 			fillStyle: '#F35e66',
	// 		strokeStyle: 'black',
	// 		lineWidth: 1
	// 		}
	// 	})
	// ]);
	Matter.Events.on(engine, 'collisionStart', function(event)  {
		console.log(event);
		Matter.World.remove(world, bridge1);
		Matter.World.remove(world, bridge2);


		mainLoop();
	});

	function mainLoop(){
	//	Matter.World.clear(engine.world);
	//	Matter.Engine.clear(engine);
		bridge1 = Matter.Bodies.rectangle(250, 250, 200, 15, {
			density: 0.04,
			friction: 1,
			frictionAir: 0.00001,
			restitution: 0.8,
			render: {
				fillStyle: '#F35e66',
				strokeStyle: 'black',
				lineWidth: 1
			}
		});
		bridge2 = Matter.Bodies.rectangle(300, 300, 200, 15, {
			density: 0.04,
			friction: 1,
			frictionAir: 0.00001,
			restitution: 0.8,
			render: {
				fillStyle: '#F35e66',
				strokeStyle: 'black',
				lineWidth: 1
			}
		});
		//Add a bridge1
		console.log("adsasdaas");

		
		Matter.World.add(world, bridge1);
		Matter.World.add(world, bridge2);
		console.log(bridge1)
		var redColor = '#C44D58',
			greenColor = '#C7F464';


		//sleep(2000);
	}
 	mainLoop();	
	Matter.World.add(world, collider);
		
	Matter.World.add(world, mouseConstraint);
	
	//Start the engine
	Matter.Engine.run(engine);
	Matter.Render.run(render);
	//test();
});
