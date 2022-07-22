class Player {
  xPosition: number;
  yPosition: number;
  width: number;
  height: number;
  speed: number;

  left: boolean = false;
  up: boolean = false;
  right: boolean = false;
  down: boolean = false;

  constructor(x: number, y: number) {
    //* (x, y) = center of object
    //! NOTE: it represents the player position on the world(room), not the canvas position
    this.xPosition = x;
    this.yPosition = y;

    // move speed
    this.speed = 400;

    // render properties
    this.width = 60;
    this.height = 40;

    window.addEventListener(
      "keydown",
      (e: KeyboardEvent) => {
        switch (e.key) {
          case "a": // left arrow
            this.left = true;
            break;
          case "w": // up arrow
            this.up = true;
            break;
          case "d": // right arrow
            this.right = true;
            break;
          case "s": // down arrow
            this.down = true;
            break;
          case "ArrowLeft": // left arrow
            this.left = true;
            break;
          case "ArrowUp": // up arrow
            this.up = true;
            break;
          case "ArrowRight": // right arrow
            this.right = true;
            break;
          case "ArrowDown": // down arrow
            this.down = true;
            break;
        }
      },
      false
    );

    window.addEventListener(
      "keyup",
      (e: KeyboardEvent) => {
        switch (e.key) {
          case "a": // left arrow
            this.left = false;
            break;
          case "w": // up arrow
            this.up = false;
            break;
          case "d": // right arrow
            this.right = false;
            break;
          case "s": // down arrow
            this.down = false;
            break;
          case "ArrowLeft": // left arrow
            this.left = false;
            break;
          case "ArrowUp": // up arrow
            this.up = false;
            break;
          case "ArrowRight": // right arrow
            this.right = false;
            break;
          case "ArrowDown": // down arrow
            this.down = false;
            break;
        }
      },
      false
    );
  }

  update(step: number, worldWidth: number, worldHeight: number) {
    // parameter step is the time between frames ( in seconds )

    // check controls and move the player accordingly
    if (this.left) this.xPosition -= this.speed * step;
    if (this.up) this.yPosition -= this.speed * step;
    if (this.right) this.xPosition += this.speed * step;
    if (this.down) this.yPosition += this.speed * step;

    // don't let player leaves the world's boundary
    if (this.xPosition - this.width / 2 < 0) {
      this.xPosition = this.width / 2;
    }
    if (this.yPosition - this.height / 2 < 0) {
      this.yPosition = this.height / 2;
    }
    if (this.xPosition + this.width / 2 > worldWidth) {
      this.xPosition = worldWidth - this.width / 2;
    }
    if (this.yPosition + this.height / 2 > worldHeight) {
      this.yPosition = worldHeight - this.height / 2;
    }
  }

  draw(ctx: CanvasRenderingContext2D, xView: number, yView: number) {
    // draw a simple rectangle shape as our player model
    ctx.save();
    ctx.fillStyle = "coral";
    // before draw we need to convert player world's position to canvas position
    ctx.fillRect(
      this.xPosition - this.width / 2 - xView,
      this.yPosition - this.height / 2 - yView,
      this.width,
      this.height
    );
    ctx.restore();
  }
}

export default Player;
