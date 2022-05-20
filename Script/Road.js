class Road {
    constructor(x, width, lane=5) {
        this.x = x;
        this.width = width;
        this.lane = lane;

        this.left = x - width/2;
        this.right = x + width/2;

        const infinity = 100000;
        this.top = -infinity;
        this.bottom = infinity;

        const topLeft = {x:this.left, y:this.top};
        const topRight = {x:this.right, y:this.top};
        const bottomLeft = {x:this.left,y:this.bottom};
        const bottomRight = {x:this.right, y:this.bottom};

        this.borders = [
            [topLeft, bottomLeft],
            [topRight, bottomRight]
        ];
    }

    getLaneCenter(laneIndex){
        const LANE_WIDTH = this.width/this.lane;
        var pos = this.left + LANE_WIDTH/2 + (laneIndex * LANE_WIDTH);
        if (pos >= 250 - 30 || pos <= 0) {
            return this.getLaneCenter(this.lane - 1);
        } else {
            return pos;
        }
    }

    //mudar aqui
    draw(context) {
        context.lineWidth = 5;
        context.strokeStyle = "white";
        
        for (let i = 1; i <= this.lane-1; i++) {
            const x = linear_interpolation(
                this.left,
                this.right,
                i/this.lane
            );
            
            context.setLineDash([20,20]);
            context.beginPath();
            context.moveTo(x, this.top);
            context.lineTo(x, this.bottom);
            context.stroke()
        }

        context.setLineDash([]);
        this.borders.forEach(b => {
            context.beginPath();
            context.moveTo(b[0].x, b[0].y);
            context.lineTo(b[1].x, b[1].y);
            context.stroke();
        })
    }
}

