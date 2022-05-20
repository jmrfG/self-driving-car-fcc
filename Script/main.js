const canvas = document.getElementById("container")
canvas.width = 300;

const context = canvas.getContext("2d");
const road = new Road(canvas.width/2, canvas.width*0.9);
const car = new Car(road.getLaneCenter(2),100,30,50);

updateAnimation();

function updateAnimation() {
    car.update(road.borders);
    canvas.height = window.innerHeight;
    context.save();
    context.translate(0, -car.y+canvas.height*0.8)
    road.draw(context);
    car.draw(context);
    context.restore();
    //Callback the same function again and again
    requestAnimationFrame(updateAnimation);
}