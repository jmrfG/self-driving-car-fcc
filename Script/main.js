const carCanvas = document.getElementById("container");
const netCanvas = document.getElementById("netCanvas");
netCanvas.width = 400;
carCanvas.width = 300;

const carContext = carCanvas.getContext("2d");
const netContext = netCanvas.getContext("2d");
const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
const cars = generateCars(1000);
let bestCar = Object;
const traffic = [
    new Car(road.getLaneCenter(0), -100, 30, 50, 0, 2),
    new Car(road.getLaneCenter(1), -300, 30, 50, 0, 2),
    new Car(road.getLaneCenter(2), -300, 30, 50, 0, 2),
    new Car(road.getLaneCenter(3), -150, 30, 50, 0, 2),
    new Car(road.getLaneCenter(4), -300, 30, 50, 0, 2),
    new Car(road.getLaneCenter(0), -350, 30, 50, 0, 2),

];

if (localStorage.getItem("bestBrain")) {
    for (let index = 0; index < cars.length; index++) {
        cars[index].brain = JSON.parse(
            localStorage.getItem("bestBrain")
        );
        if (index != 0) {
            NeuralNetwork.mutate(cars[index].brain, 0.18)
        }
    }
}

updateAnimation();

function generateCars(N) {
    const cars = []
    for (let index = 0; index < N; index++) {
        cars.push(new Car(road.getLaneCenter(2), 100, 30, 50, 1));
    }
    return cars
}

function save() {
    localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}

function discard() {
    localStorage.removeItem("bestBrain");
}


function updateAnimation(time) {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }

    for (let index = 0; index < cars.length; index++) {
        cars[index].update(road.borders, traffic);
    }

    bestCar = cars.find(
        c => c.y == Math.min(
            ...cars.map(c => c.y)
        ));
    //Canvas & Context
    carCanvas.height = window.innerHeight;
    netCanvas.height = window.innerHeight;
    carContext.save();
    carContext.translate(0, -bestCar.y + carCanvas.height * 0.8)
    carContext.globalAlpha = 0.2;
    //Canvas & Context

    road.draw(carContext);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carContext);
    }
    for (let index = 0; index < cars.length; index++) {
        cars[index].draw(carContext);
    }
    carContext.globalAlpha = 1;
    bestCar.draw(carContext, "blue", true)
    carContext.restore();

    netContext.lineDashOffset = -time / 50;

    Visualizer.drawNetwork(netContext, bestCar.brain);
    //Callback the same function again and again
    requestAnimationFrame(updateAnimation);
}