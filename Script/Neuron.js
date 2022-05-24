class NeuralNetwork {
    constructor(neuronC) {
        this.levels = [];
        for (let idx = 0; idx < neuronC.length - 1; idx++) {
            this.levels.push(new Level(
                neuronC[idx], neuronC[idx + 1]
            ));
        }
    }

    static feedForward(inp, net) {
        let outputs = Level.feedForward(
            inp, net.levels[0]
        )

        for (let i = 1; i < net.levels.length; i++) {
            outputs = Level.feedForward(
                outputs, net.levels[i]
            );
        }
        return outputs;
    }
}


class Level {
    constructor(inputC, outputC) {
        this.inputs = new Array(inputC);
        this.outputs = new Array(outputC);
        this.biases = new Array(outputC);

        this.weight = [];
        for (let i = 0; i < inputC; i++) {
            this.weight[i] = new Array(outputC);
        }
        Level.#randomize(this);
    }

    static #randomize(level) {
        for (let i = 0; i < level.inputs.length; i++) {
            for (let j = 0; j < level.outputs.length; j++) {
                level.weight[i][j] = Math.random() * 2 - 1;
            }
        }

        for (let j = 0; j < level.biases.length; j++) {
            level.biases[j] = Math.random() * 2 - 1;
        }
    }

    static feedForward(inputs, level) {
        for (let j = 0; j < level.inputs.length; j++) {
            level.inputs[j] = inputs[j];
        }

        for (let j = 0; j < level.outputs.length; j++) {
            let sum = 0;
            for (let i = 0; i < level.inputs.length; i++) {
                //console.log(level.inputs[i])
                //console.log(level.weight[i][j])
                sum += level.inputs[i] * level.weight[i][j];
            }
            if (sum > level.biases[j]) {
                level.outputs[j] = 1;
            } else {
                level.outputs[j] = 0;
            }
        }
        return level.outputs;
    }

}