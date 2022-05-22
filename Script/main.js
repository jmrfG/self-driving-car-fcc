const canvas = document.getElementById("container")
canvas.width = 300;

const context = canvas.getContext("2d");
const road = new Road(canvas.width / 2, canvas.width * 0.9);
const car = new Car(road.getLaneCenter(2), 100, 30, 50, 1);

const traffic = [
    new Car(road.getLaneCenter(2), -100, 30, 50, 0, 2)

]

updateAnimation();

function updateAnimation() {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }
    car.update(road.borders, traffic);
    canvas.height = window.innerHeight;
    context.save();
    context.translate(0, -car.y + canvas.height * 0.8)
    road.draw(context);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(context);
    }
    car.draw(context);
    context.restore();
    for (let i = 0; i < traffic.length; i++) {
        if (traffic[i].outSide(canvas.height) == true) {
            console.log(canvas.height)
        }
    }
    //Callback the same function again and again
    requestAnimationFrame(updateAnimation);
}