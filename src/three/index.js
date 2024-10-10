import Background from "./background";
import MotionWave from "./motionWave";

export const initThreeCanvas = () => {
  const hero = document.querySelector("#background");
  const imagina = document.querySelector("#imagina-canvas");

  if (imagina) {
    new MotionWave(imagina, 45, 0.1, 100, 1.5);
  }
  if (hero) {
    new Background(hero, 75, 0.01, 100, 0.5);
  }
};
