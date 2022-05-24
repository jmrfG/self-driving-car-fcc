const carCanvas = document.getElementById("container");
const netCanvas = document.getElementById("netCanvas");
netCanvas.width = 400;
carCanvas.width = 300;

const carContext = carCanvas.getContext("2d")
const netContext = netCanvas.getContext("2d");
const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
const car = new Car(road.getLaneCenter(2), 100, 30, 50, 1);

const traffic = [
    new Car(road.getLaneCenter(2), -100, 30, 50, 0, 2)

]
console.log(car.brain);

updateAnimation();

function updateAnimation(time) {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }
    car.update(road.borders, traffic);
    carCanvas.height = window.innerHeight;
    netCanvas.height = window.innerHeight;
    carContext.save();
    carContext.translate(0, -car.y + carCanvas.height * 0.8)
    road.draw(carContext);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carContext);
    }
    car.draw(carContext);
    carContext.restore();

    netContext.lineDashOffset = -time / 50;

    Visualizer.drawNetwork(netContext, car.brain);
    //Callback the same function again and again
    requestAnimationFrame(updateAnimation);
}