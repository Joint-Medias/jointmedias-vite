const fragmentShader = `
uniform vec3 colorA;
uniform vec3 colorB;
uniform float u_scroll;
uniform float u_intensity;
uniform float u_time;
varying float vDisplacement;

void main() {
	float scrollRatio = u_scroll * 0.1;
	float gamma = 1.47;
	vec3 color = mix(colorA, colorB, vDisplacement * u_intensity + 0.5);
	gl_FragColor = vec4(color * gamma, 1.0);
}
`

export default fragmentShader
