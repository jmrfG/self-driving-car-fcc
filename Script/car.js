class Car {
    //Tem que importar antes do main.js => Just-in-time
    constructor(pos_x, pos_y, width, height) {
        this.x = pos_x;
        this.y = pos_y;
        this.w = width;
        this.h = height;

        //here comes the physics
        this.speed = 0;
        this.acceleration = 0.5;
        this.maxSpeed = 3;
        this.friction = 0.05;
        this.angle = 0

        this.sensor = new Sensor(this);

        this.hotkeys = new Control();
    }

    update(road_borders){
        this.#move();
        this.sensor.update(road_borders);
    }

    #move(){
        if (this.hotkeys.up) {
            this.speed += this.acceleration;
        }

        if (this.hotkeys.down) {
            this.speed-=this.acceleration;
        }
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        if (this.speed <- this.maxSpeed/2) {
            this.speed = -this.maxSpeed / 2;
        }
        if (this.speed>0) {
            this.speed -= this.friction;
        }
        if (this.speed < 0) {
            this.speed += this.friction;
        }
        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }

        if (this.speed!=0) {
            const flip = this.speed>0?1:-1;
            if (this.hotkeys.left) {
            this.angle += 0.03*flip;
            }

            if (this.hotkeys.right) {
                this.angle -= 0.03*flip;
            }
        }
         
        this.x -= Math.sin(this.angle)*this.speed;
        this.y -= Math.cos(this.angle)*this.speed;
    }

    draw(context) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(-this.angle)
        context.beginPath();
        context.rect(
            - (this.w/2),
            - (this.h/2),
            this.w,
            this.h
        );
        context.fill();
        context.restore();
        
        this.sensor.draw(context);
    }


}