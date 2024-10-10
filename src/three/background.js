import BaseThree from "./three";
import { DEVICE } from "./constants/constants";
import {
  Color,
  DoubleSide,
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
  Vector4,
} from "three";
import colors from "nice-color-palettes";
const palette = colors[79].map((color) => new Color(color));
import fragmentShader from "./shaders/background/fragment.glsl";
import vertexShader from "./shaders/background/vertex.glsl";

class Background extends BaseThree {
  constructor(canvas, fov, near, far, cameraPosZ) {
    super(canvas, fov, near, far, cameraPosZ);
    this.setGeometry();
  }

  addEvents() {
    window.addEventListener("mousemove", this.onMouseMove.bind(this));
  }

  setGeometry() {
    this.planeGeometry = new PlaneGeometry(
      2 * DEVICE().aspect,
      2 * DEVICE().aspect,
      400,
      400
    );
    this.planeMaterial = new ShaderMaterial({
      side: DoubleSide,
      fragmentShader,
      vertexShader,
      uniforms: {
        time: { value: 0 },
        uColor: { value: palette },
        resolution: { value: new Vector4() },
      },
    });

    this.planeGeometry.rotateX(0.25);
    this.planeMesh = new Mesh(this.planeGeometry, this.planeMaterial);
    this.scene.add(this.planeMesh);
  }

  update() {
    this.time += 0.0001;
    this.planeMaterial.uniforms.time.value = this.time;
    this.renderer.render(this.scene, this.camera);
  }

  onMouseMove(_e) {
    this.time += 0.0005;
  }
}

export default Background;
