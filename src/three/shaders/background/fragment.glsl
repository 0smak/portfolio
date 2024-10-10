varying vec3 vColor; // color from vertex.glsl

void main() {
  // set fragment color
  gl_FragColor = vec4(vColor, 1.);
}