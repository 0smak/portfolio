import {
  DoubleSide,
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
  TextureLoader,
} from "three";
import vertexShader from "./shaders/motionWave/vertex.glsl";
import fragmentShader from "./shaders/motionWave/fragment.glsl";
import BaseSketch from "./three";
import { PROJECTS } from "./constants/constants";
import gsap from "gsap";
import { TextPlugin } from "gsap/all";

gsap.registerPlugin(TextPlugin);

class MotionWave extends BaseSketch {
  constructor(canvas, fov, near, far, cameraPosZ) {
    super(canvas, fov, near, far, cameraPosZ);
    this.projectIdx = 0;
    this.createMesh();
  }

  createMesh() {
    this.geometry = new PlaneGeometry(0.9, 0.532, 16, 16);
    this.material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0.0 },
        uTexture: {
          value: new TextureLoader().load(PROJECTS[0].img),
        },
      },
      wireframe: false,
      side: DoubleSide,
    });

    this.mesh = new Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  update() {
    if (!this.isTransition) {
      this.time += 0.002;
      if (this.time > 100) this.time = 0;
    } else {
      this.time += 10000;
    }
    this.material.uniforms.uTime.value = this.time;
  }

  addEvents() {
    window.addEventListener("mousemove", this.onMouseMove.bind(this));
    this.canvas.addEventListener("click", this.onClick.bind(this));
  }

  onMouseMove(e) {
    if (!this.isTransition) this.time += 0.005;

    this.camera.rotation.x = ((e.clientY * Math.PI) / 100) * 0.001;
    this.camera.rotation.y = ((e.clientX * Math.PI) / 100) * 0.001;
    this.camera.updateProjectionMatrix();
  }

  #meshRotation() {
    if (this.mesh.rotation.y < 6) {
      this.mesh.rotation.y += 0.5;
      requestAnimationFrame(this.#meshRotation.bind(this));
    } else {
      this.mesh.translateX = 0;
      this.mesh.rotation.y = 0;
    }
  }

  onClick() {
    this.projectIdx = (this.projectIdx + 1) % PROJECTS.length; // Avanza al siguiente proyecto
    const currentProject = PROJECTS[this.projectIdx];
    this.img = currentProject.img;

    this.isTransition = true;
    this.animateCanvasScale(0.5, 1, "elastic.in", async () => {
      await this.handleProjectTransition(currentProject);
      this.isTransition = false;
      this.time = 0;
    });
  }

  animateCanvasScale(scale, duration, ease, onComplete) {
    const canvasEl = document.querySelector("#imagina-canvas");
    gsap.to(canvasEl, {
      scale: scale,
      duration: duration,
      ease: ease,
      onComplete: onComplete,
    });
  }

  async handleProjectTransition(currentProject) {
    this.#meshRotation();

    this.material.uniforms.uTexture.value = new TextureLoader().load(
      currentProject.img
    );

    const projectNameEl = document.querySelector("#project-name");
    gsap.to(projectNameEl, {
      text: currentProject.name,
      duration: 1,
    });

    this.animateCanvasScale(1, 1, "elastic.inOut"); // Regresa el canvas a su tamaño original
    await this.updateHashtags(currentProject.tech);
  }

  async updateHashtags(techArray) {
    const hashtags = document.querySelector("#hashtags");
    hashtags.innerHTML = ""; // Limpiar hashtags existentes

    techArray.forEach((tech) => {
      const hashtag = document.createElement("span");
      hashtag.classList.add("hashtag");
      hashtag.innerHTML = `#${tech}`;
      hashtags.appendChild(hashtag);
    });

    await new Promise((resolve) => setTimeout(resolve, 200)); // Esperar un poco antes de continuar
  }
}

export default MotionWave;
