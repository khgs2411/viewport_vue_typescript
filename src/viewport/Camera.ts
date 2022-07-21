import Rectangle from "./Rectangle";

// possibles axis to move the camera
enum AXIS {
	NONE = "none",
	HORIZONTAL = "horizontal",
	VERTICAL = "vertical",
	BOTH = "both",
}

class Camera {
	xView: number;
	yView: number;
	xDeadZone: number;
	yDeadZone: number;
	wView: number;
	hView: number;
	axis: AXIS;
	followed: { x: number; y: number } | null;
	viewportRect: Rectangle;
	worldRect: Rectangle;

	// Camera constructor
	constructor(xView: number, yView: number, canvasWidth: number, canvasHeight: number, worldWidth: number, worldHeight: number) {
		// position of camera (left-top coordinate)
		this.xView = xView || 0;
		this.yView = yView || 0;

		// distance from followed object to border before camera starts move
		this.xDeadZone = 0; // min distance to horizontal borders
		this.yDeadZone = 0; // min distance to vertical borders

		// viewport dimensions
		this.wView = canvasWidth;
		this.hView = canvasHeight;

		// allow camera to move in vertical and horizontal axis
		this.axis = AXIS.BOTH;

		// object that should be followed
		this.followed = null;

		// rectangle that represents the viewport
		this.viewportRect = new Rectangle(this.xView, this.yView, this.wView, this.hView);

		// rectangle that represents the world's boundary (room's boundary)
		this.worldRect = new Rectangle(0, 0, worldWidth, worldHeight);
		console.log(".xView", this.xView);
		console.log(".yView", this.yView);
		console.log(".xDeadZone", this.xDeadZone);
		console.log(".yDeadZone", this.yDeadZone);
		console.log(".wView", this.wView);
		console.log(".hView", this.hView);
		console.log(".axis", this.axis);
		console.log(".followed", this.followed);
		console.log(".viewportRect", this.viewportRect);
		console.log(".worldRect", this.worldRect);
	}

	// gameObject needs to have "x" and "y" properties (as world(or room) position)
	follow(gameObject: { x: number; y: number }, xDeadZone: number, yDeadZone: number) {
		this.followed = gameObject;
		this.xDeadZone = xDeadZone;
		this.yDeadZone = yDeadZone;
	}

	update() {
		// keep following the player (or other desired object)
		if (this.followed != null) {
			if (this.axis == AXIS.HORIZONTAL || this.axis == AXIS.BOTH) {
				// moves camera on horizontal axis based on followed object position
				if (this.followed.x - this.xView + this.xDeadZone > this.wView) this.xView = this.followed.x - (this.wView - this.xDeadZone);
				else if (this.followed.x - this.xDeadZone < this.xView) this.xView = this.followed.x - this.xDeadZone;
			}
			if (this.axis == AXIS.VERTICAL || this.axis == AXIS.BOTH) {
				// moves camera on vertical axis based on followed object position
				if (this.followed.y - this.yView + this.yDeadZone > this.hView) this.yView = this.followed.y - (this.hView - this.yDeadZone);
				else if (this.followed.y - this.yDeadZone < this.yView) this.yView = this.followed.y - this.yDeadZone;
			}
		}

		// update viewportRect
		this.viewportRect.set(this.xView, this.yView);

		// don't let camera leaves the world's boundary
		if (!this.viewportRect.within(this.worldRect)) {
			if (this.viewportRect.left < this.worldRect.left) this.xView = this.worldRect.left;
			if (this.viewportRect.top < this.worldRect.top) this.yView = this.worldRect.top;
			if (this.viewportRect.right > this.worldRect.right) this.xView = this.worldRect.right - this.wView;
			if (this.viewportRect.bottom > this.worldRect.bottom) this.yView = this.worldRect.bottom - this.hView;
		}
	}

	// add "class" Camera to our Game object
}
export default Camera;
