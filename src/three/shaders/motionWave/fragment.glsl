varying vec2 vUv; // uv coords from vertex
varying float vWave; // wave value from vertex
uniform sampler2D uTexture; // texture of the image of the project we render

void main() {
    // scale wave effect
    float wave = vWave * 0.1;

    // split texture in rgb channels to create a 3d like effect
    float r = texture2D(uTexture, vUv).r;
    float g = texture2D(uTexture, vUv).g;
    float b = texture2D(uTexture, vUv + wave).b;

    // add the channels to a new color/texture variable
    vec3 texture = vec3(r, g, b);
    gl_FragColor = vec4(texture, 1.0);
}
