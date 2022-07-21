import { MapProperties } from "../common/constants";
import Camera from "./Camera";
import GameMap from "./Map";
import Player from "./Player";

class Viewport {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  runningId = -1;
  last: number;
  now: number;
  step: number;
  room: {
    width: number;
    height: number;
    map: GameMap;
  };
  player: Player;
  camera: Camera;

  constructor(canvas: HTMLCanvasElement) {
    console.log("viewport init");
    this.canvas = canvas;
    this.canvas.width = MapProperties.canvasWidth;
    this.canvas.height = MapProperties.canvasHeight;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    this.last = 0; // last frame timestamp
    this.now = 0; // current timestamp
    this.step = this.now - this.last; // time between frames

    // setup an object that represents the room
    this.room = {
      width: MapProperties.worldWidth,
      height: MapProperties.worldHeight,
      map: new GameMap(MapProperties.worldWidth, MapProperties.worldHeight),
    };

    // generate a large image texture for the room
    this.room.map.generate();

    // setup player
    this.player = new Player(
      0 - MapProperties.offsetX,
      0 - MapProperties.offsetY
    );

    // setup the magic camera !!!
    this.camera = new Camera(
      0,
      0,
      this.canvas.width,
      this.canvas.height,
      this.room.width,
      this.room.height
    );
    this.camera.follow(
      this.player,
      this.canvas.width / 2,
      this.canvas.height / 2
    );
    console.log("canvas.width", this.canvas.width);
    console.log("canvas.height", this.canvas.height);
  }

  // Game update function
  update(step: number) {
    this.player.update(step, this.room.width, this.room.height); // <-- edited
    this.camera.update();
  }

  // Game draw function
  draw() {
    // clear the entire canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // redraw all objects
    this.room.map.draw(this.ctx, this.camera.xView, this.camera.yView);
    this.player.draw(this.ctx, this.camera.xView, this.camera.yView);
  }

  // Game Loop
  gameLoop(timestamp: number) {
    // <-- edited; timestamp comes from requestAnimationFrame. See polyfill to get this insight.
    this.now = timestamp; // <-- current timestamp (in milliseconds)
    this.step = (this.now - this.last) / 1000; // <-- time between frames (in seconds)
    this.last = this.now; // <-- store the current timestamp for further evaluation in next frame/step

    this.update(this.step);
    this.draw();
    this.runningId = requestAnimationFrame((time) => this.gameLoop(time)); // <-- added
  }

  start() {
    this.runningId = requestAnimationFrame((time) => this.gameLoop(time)); // <-- changed
  }
}

export default Viewport;
