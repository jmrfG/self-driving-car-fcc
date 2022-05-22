class Car {
    //Tem que importar antes do main.js => Just-in-time
    constructor(pos_x, pos_y, width, height, playable, maxSpeed = 3) {
        this.x = pos_x;
        this.y = pos_y;
        this.w = width;
        this.h = height;
        this.playable = playable
        //here comes the physics
        this.speed = 0;
        this.acceleration = 0.5;
        this.maxSpeed = maxSpeed;
        this.friction = 0.05;
        this.angle = 0;

        this.collision = false;

        if (playable == 1) {
            this.sensor = new Sensor(this);
        }

        this.hotkeys = new Control(this.playable);
    }

    update(road_borders, traffic) {
        if (!this.collision) {
            this.#move();
            this.polygon = this.#createPolygon();
            this.collision = this.#checkCollision(road_borders, traffic);
        }
        if (this.sensor) {

            this.sensor.update(road_borders, traffic);
        }
    }

    outSide(cHeight) {
        if (this.y > cHeight) {
            return true;
        }
        return false;
    }

    #checkCollision(road_borders, traffic) {
        for (let i = 0; i < road_borders.length; i++) {
            if (polyIntersect(this.polygon, road_borders[i])) {
                return true;
            }
        }
        for (let i = 0; i < traffic.length; i++) {
            if (polyIntersect(this.polygon, traffic[i].polygon)) {
                return true;
            }
        }

        return false;
    }

    #createPolygon() {
        const points = [];
        const radius = Math.hypot(this.w / 2, this.h / 2);
        const alpha = Math.atan2(this.w, this.h);



        points.push(
            {
                x: this.x - Math.sin(this.angle - alpha) * radius,
                y: this.y - Math.cos(this.angle - alpha) * radius
            });
        points.push(
            {
                x: this.x - Math.sin(this.angle + alpha) * radius,
                y: this.y - Math.cos(this.angle + alpha) * radius
            });
        points.push(
            {
                x: this.x - Math.sin(Math.PI + this.angle - alpha) * radius,
                y: this.y - Math.cos(Math.PI + this.angle - alpha) * radius
            });
        points.push(
            {
                x: this.x - Math.sin(Math.PI + this.angle + alpha) * radius,
                y: this.y - Math.cos(Math.PI + this.angle + alpha) * radius
            });
        return points
    }

    #move() {
        if (this.hotkeys.up) {
            this.speed += this.acceleration;
        }

        if (this.hotkeys.down) {
            this.speed -= this.acceleration;
        }
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        if (this.speed < - this.maxSpeed / 2) {
            this.speed = -this.maxSpeed / 2;
        }
        if (this.speed > 0) {
            this.speed -= this.friction;
        }
        if (this.speed < 0) {
            this.speed += this.friction;
        }
        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }

        if (this.speed != 0) {
            const flip = this.speed > 0 ? 1 : -1;
            if (this.hotkeys.left) {
                this.angle += 0.03 * flip;
            }

            if (this.hotkeys.right) {
                this.angle -= 0.03 * flip;
            }
        }

        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;
    }

    draw(context) {
        if (this.collision) {
            context.fillStyle = "gray";
        } else {
            context.fillStyle = "black";
        }
        context.beginPath();
        context.moveTo(this.polygon[0].x, this.polygon[0].y);
        for (let index = 0; index < this.polygon.length; index++) {
            context.lineTo(this.polygon[index].x, this.polygon[index].y)
        }
        context.fill();
        if (this.sensor) {

            this.sensor.draw(context);
        }
    }


}