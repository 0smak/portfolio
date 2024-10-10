import { Scene, PerspectiveCamera, WebGLRenderer } from "three";
import { DEVICE } from "./constants/constants";

class BaseThree {
  constructor(canvas, fov, near, far, cameraPosZ) {
    this.canvas = canvas;
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(fov, DEVICE().aspect, near, far);
    this.camera.position.z = cameraPosZ;
    this.renderer = new WebGLRenderer({
      canvas,
      antialias: true,
    });

    this.time = 0;

    this.setupRenderer();
    this.addBaseEvents();
    this.addEvents();
  }

  setupRenderer() {
    const { width, height } = DEVICE();
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x000000, 0);
  }

  addBaseEvents() {
    window.addEventListener("resize", this.onResize.bind(this), false);
    window.requestAnimationFrame(this.run.bind(this));
  }

  run() {
    this.update();
    this.render();
    requestAnimationFrame(this.run.bind(this));
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    const { width, height, aspect } = DEVICE();
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  /**
   * Function to register events
   * @override
   */
  addEvents() {}

  /**
   * Function that it's called in each tick of the animation
   * @override
   */
  update() {}
}

export default BaseThree;
