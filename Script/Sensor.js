class Sensor {
    constructor(car) {
        this.car = car;
        this.rayCount = 6;
        this.rayLen = 100;
        this.raySpread = Math.PI / 4;
        this.rays = [];
        this.border_collisions = [];
    }

    update(road_borders, traffic) {
        this.#castRays();
        this.border_collisions = [];
        for (let i = 0; i < this.rays.length; i++) {
            this.border_collisions.push(
                this.#getBorders(
                    this.rays[i],
                    road_borders,
                    traffic
                )
            )
        }

    }


    #getBorders(rays, borders, traffic) {
        let collisions = [];

        borders.forEach(b => {
            const coll = getIntersection(
                rays[0],
                rays[1],
                b[0],
                b[1]
            )
            if (coll) {
                collisions.push(coll);
            }
        })

        for (let i = 0; i < traffic.length; i++) {
            const p = traffic[i].polygon;
            for (let j = 0; j < p.length - 1; j++) {
                const v = getIntersection(
                    rays[0],
                    rays[1],
                    p[j],
                    p[j + 1]
                );
                if (v) {
                    collisions.push(v);
                }
            }
        }

        if (collisions.length == 0) {
            return null;
        } else {
            const offsets = collisions.map(e => e.offset);
            const min = Math.min(...offsets);
            return collisions.find(e => e.offset == min);
        }
    }

    #castRays() {
        this.rays = [];
        for (let i = 0; i < this.rayCount; i++) {
            const rayAngle = linear_interpolation(
                this.raySpread / 2,
                -this.raySpread / 2,
                i / (this.rayCount - 1)
            ) + this.car.angle;

            const start = { x: this.car.x, y: this.car.y };
            const end = {
                x: this.car.x - Math.sin(rayAngle) * this.rayLen,
                y: this.car.y - Math.cos(rayAngle) * this.rayLen
            };
            this.rays.push([start, end]);
        }
    }

    draw(ctx) {
        let i = 0
        this.rays.forEach(r => {
            let end = r[1];
            if (this.border_collisions[i]) {
                end = this.border_collisions[i];
            }

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "red";
            ctx.moveTo(
                r[0].x,
                r[0].y
            );
            ctx.lineTo(
                end.x,
                end.y
            );
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "black";
            ctx.moveTo(
                r[1].x,
                r[1].y
            );
            ctx.lineTo(
                end.x,
                end.y
            );
            ctx.stroke();
            i++
        })
    }
}