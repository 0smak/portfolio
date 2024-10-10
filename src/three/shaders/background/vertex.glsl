
#include "../noise.glsl";
uniform float time; // time for animation from js
varying vec2 vUv; // uv coordinates
uniform vec3 uColor[5]; // array of 5 colors from nice-color-palettes js library
varying vec3 vColor; // color outut

void main() {
  // scale UV coordinates for noise
  vec2 noiseCoord = uv * vec2(3.0, 4.0);

  // vertex positions (tilt, inclination and offset)
  float tilt = -.8 * uv.y;
  float incline = uv.x * 0.1;
  float offset = incline * mix(-.25, .25, uv.y); 

  // animated noise
  float noise = snoise(vec3(noiseCoord.x + time * 3.0, noiseCoord.y, time * 10.0));

  // avoid negative values
  noise = max(0.0, noise);

  // modify vertex position with noise
  vec3 pos = vec3(position.x, position.y, position.z + noise * 0.3 + tilt + incline + offset);

  vColor = uColor[4];

  // blend our 5 colours and add noise to them
  for(int i = 0; i < 4; i++) {
    float noiseFlow = 5.0 + float(i) * 0.3;
    float noiseSpeed = 10.0 + float(i) * 0.3;
    float noiseSeed = 1.0 + float(i) * 10.0;
    vec2 noiseFreq = vec2(1.0, 1.4) * 0.4;
    float noiseFloor = 0.1;
    float noiseCell = 0.6 + float(i) * 0.07;

    float noise = smoothstep(noiseFloor, noiseCell, snoise(vec3(noiseCoord.x * noiseFreq.x + time * noiseFlow, noiseCoord.y * noiseFreq.y, time * noiseSpeed + noiseSeed)));
    vColor = mix(vColor, uColor[i], noise);
  }

  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
