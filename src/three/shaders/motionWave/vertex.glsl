varying vec2 vUv; // uv coords for the shader (fragment)
uniform float uTime; // time variable from js
varying float vWave; // wave value

#include "../noise.glsl";

void main() {
  // assign uv coords to the variable
  vUv = uv;

  // vertex position
  vec3 pos = position;

  // frequency and amplitude of the noise
  float noiseFreq = 0.1;
  float noiseAmp = 0.1;

  // position for the noise using time to animate the canvas
  vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);

  // distort z coordinate with noise
  pos.z += snoise(noisePos) * noiseAmp;

  // set z coordinate to the wave value
  vWave = pos.z;

  // final position
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
