class GameMap {
  width: number;
  height: number;
  image: HTMLImageElement | null;
  constructor(width: number, height: number) {
    // map dimensions
    this.width = width;
    this.height = height;

    // map texture
    this.image = null;
  }

  // generate an example of a large map
  generate() {
    //* create a canvas element
    //* create a context for that canvas;
    let ctx: CanvasRenderingContext2D | null = document
      .createElement("canvas")
      .getContext("2d") as CanvasRenderingContext2D;
    //* set the canvas width and height to the same size as the image;
    ctx.canvas.width = this.width;
    ctx.canvas.height = this.height;
    // this.drawMapAsRectangles(ctx);

    //// store the generate map as this image texture
    //* draw the image on the canvas;
    this.image = new Image();
    //// ctx.canvas.toDataURL("image/png");
    this.image.src = "/src/assets/images/map.png";

    // clear context for memory purposes
    ctx = null;
  }

  // draw the map as a series of rectangles
  drawMapAsRectangles(ctx: CanvasRenderingContext2D) {
    var rows = this.width / 70;
    var columns = this.height / 40;
    var color = "red";
    ctx.save();
    ctx.fillStyle = "red";
    for (var x = 0, i = 0; i < rows; x += 17.5 * 3 + 5, i++) {
      ctx.beginPath();
      for (var y = 0, j = 0; j < columns; y += 17.5 * 3 + 5, j++) {
        ctx.rect(x, y, 17.5 * 3, 17.5 * 3);
      }
      color = color == "red" ? "blue" : "red";
      ctx.fillStyle = color;
      ctx.fill();
      ctx.closePath();
    }
    ctx.restore();
  }

  // draw the map adjusted to camera
  draw(ctx: CanvasRenderingContext2D, xView: number, yView: number) {
    //! typescript measurements to prevent errors
    if (!this.image) return;

    // easiest way: draw the entire map changing only the destination coordinate in canvas
    // canvas will cull the image by itself (no performance gaps -> in hardware accelerated environments, at least)
    // ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, -xView, -yView, this.image.width, this.image.height);

    this.didacticDraw(ctx, xView, yView);
  }

  // draw the map adjusted to camera
  didacticDraw(ctx: CanvasRenderingContext2D, xView: number, yView: number) {
    //! typescript measurements to prevent errors
    if (!this.image) return;

    // didactic way:

    var sx, sy, dx, dy;
    var sWidth, sHeight, dWidth, dHeight;

    // offset point to crop the image
    sx = xView;
    sy = yView;

    // dimensions of cropped image
    sWidth = ctx.canvas.width;
    sHeight = ctx.canvas.height;
    // if cropped image is smaller than canvas we need to change the source dimensions
    if (this.image.width - sx < sWidth) {
      sWidth = this.image.width - sx;
    }
    if (this.image.height - sy < sHeight) {
      sHeight = this.image.height - sy;
    }

    // location on canvas to draw the croped image
    dx = 0;
    dy = 0;
    // match destination with source to not scale the image
    dWidth = sWidth;
    dHeight = sHeight;

    ctx.drawImage(this.image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  }

  // add "class" Map to our Game object
}
export default GameMap;
