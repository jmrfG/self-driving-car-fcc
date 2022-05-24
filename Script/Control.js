class Control {

    constructor(type) {
        this.up = false;
        this.down = false;
        this.right = false;
        this.left = false;
        switch (type) {
            case 1:
                this.#addKeyboardListeners();
                break;
            case 0:
                this.up = true;
        }

    }

    #addKeyboardListeners() {
        document.onkeydown = (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
                case "ArrowUp":
                    this.up = true;
                    break;
                case "ArrowDown":
                    this.down = true;
                    break;
            }
        }

        document.onkeyup = (e) => {
            switch (e.key) {
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "ArrowRight":
                    this.right = false;
                    break;
                case "ArrowUp":
                    this.up = false;
                    break;
                case "ArrowDown":
                    this.down = false;
                    break;
            }
        }
    }
}