# 3D Blob

The animated 3D blob is a signature visual element that floats behind page content. It reacts to scroll velocity and position, creating organic motion tied to user interaction.

## Architecture

```
src/components/
├── BlobCanvas.jsx          # React Three Fiber <Canvas> wrapper
├── Blob/
│   ├── index.jsx           # Mesh, uniforms, animation loop
│   ├── vertexShader.js     # Perlin noise vertex displacement
│   └── fragmentShader.js   # Two-tone color mixing
├── PageTransition.jsx      # Fades blob during route changes
```

`Layout.jsx` mounts `BlobCanvas` inside a `.blob-canvas` div at the top level, outside the scroll wrapper. It is lazy-loaded via `React.lazy`.

## Rendering Pipeline

### Canvas & Mesh

`BlobCanvas` renders a React Three Fiber `<Canvas>` containing a single `<Blob />` mesh. The mesh geometry is a high-detail icosahedron (`args={[2, 48]}` — radius 2, 48 subdivisions) with a custom `<shaderMaterial>`.

### Uniforms

| Uniform | Type | Purpose |
| --- | --- | --- |
| `colorA` | `vec3` | Dark red (`#a60b23`) — base color |
| `colorB` | `vec3` | Bright red (`#cc0d29`) — highlight color |
| `u_time` | `float` | Elapsed time (scaled by `0.008`) driving noise animation |
| `u_intensity` | `float` | Displacement strength, modulated by scroll velocity |
| `u_scroll` | `float` | Raw Lenis scroll position (px) |
| `x_offset` | `float` | Target X position |
| `y_offset` | `float` | Target Y position |
| `z_offset` | `float` | Target Z position (depth) |

### Vertex Shader

Displaces vertices using **classic 3D Perlin noise** (Stefan Gustavson implementation):

```glsl
vDisplacement = cnoise(position + vec3(1.0 * u_time));
vec3 newPosition = position + normal * (u_intensity * vDisplacement);
```

Each vertex is pushed along its normal by `u_intensity * noise_value`. As `u_intensity` changes with scroll velocity, the blob surface becomes more or less distorted. `u_scroll` is declared but the `scrollRatio` derived from it is currently unused in vertex calculations.

### Fragment Shader

Mixes two colors based on displacement and intensity, with a gamma boost:

```glsl
float gamma = 1.47;
vec3 color = mix(colorA, colorB, vDisplacement * u_intensity + 0.5);
gl_FragColor = vec4(color * gamma, 1.0);
```

Areas with more displacement shift toward `colorB`; flatter areas stay near `colorA`. The `1.47` gamma multiplier brightens the output above physical accuracy for visual punch.

## Animation Loop (`useFrame`)

Every frame, the blob updates position, rotation, and material:

### Position

- **Y axis**: lerps toward `y_offset + (velocity / 6) + (progress * 0.75)`. Scroll velocity pushes it up/down; scroll progress drifts it over time.
- **X axis**: follows a cosine curve `cos(4.35π * progress) * 2.5 - x_offset`, making the blob sway side-to-side as the user scrolls through the page. Lerp factor `0.015` keeps movement smooth.
- **Z axis**: lerps toward `z_offset` at factor `0.003` (very slow depth transition).

### Rotation

Constant spin on X and Z axes at `0.3 * elapsed_time` (no lerp — direct assignment).

### Intensity

`u_intensity` is driven by `scroll_velocity + initialIntensity`, clamped to `[-1, 1]`, then lerped with a speed proportional to velocity. Fast scrolling makes the blob spiky; idle scrolling returns it to a gentle wobble.

## Responsive Behavior

Breakpoint at `769px` (via `matchMedia`):

| Property | Mobile (< 769px) | Desktop (>= 769px) |
| --- | --- | --- |
| `initialIntensity` | `0.7` | `0.5` |
| Starting position | `(-3, 0, 1.5)` | `(2.5, 0, 1.5)` |
| Runtime position | `(-0.8, 4, 0)` | `(0, 0, 2)` |

On mobile, the blob sits higher and further forward; on desktop it's centered with more depth.

## Z-Index Stacking

The blob canvas is a full-viewport fixed overlay at `z-index: 1`. Content containers sit at `z-index: 2` so text and images render above the blob, while section backgrounds (no z-index) allow the blob to show through gaps between sections.

```
[Section backgrounds]  ← no z-index (behind blob)
[Blob canvas]          ← z-index: 1, position: fixed
[Content containers]   ← z-index: 2, position: relative
```

**Important**: never put `position`/`z-index` on `.site-main`, `.site-header`, `.site-footer`, or section elements directly. Target inner containers like `.intro > .container` instead.

## CSS

```scss
// _homepage.scss
.blob-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 1;
    opacity: 0;
    transition: opacity 1000ms cubic-bezier(0.37, 0, 0.63, 1);

    &.loaded { opacity: 1; }
}
```

- Starts invisible (`opacity: 0`) and fades in when Layout adds the `loaded` class
- `pointer-events: none` on the canvas and all children so the blob never blocks clicks
- Hidden entirely on the services page and when `prefers-reduced-motion` is active

## Page Transitions

`PageTransition.jsx` handles blob visibility during route changes:

1. On first render: no-op (blob fades in via CSS `loaded` class)
2. On subsequent navigations:
   - Fades blob out quickly (`duration: 0.15s`, `power2.in`)
   - Refreshes ScrollTrigger
   - After 100ms, refreshes ScrollTrigger again and fades blob back in (`duration: 0.6s`, `power2.out`)

This prevents the blob from overlapping content that hasn't settled into position yet.

## Lenis Integration

The blob subscribes to Lenis scroll events via `useLenis`:

```js
useLenis(({ scroll }) => {
    uniforms.u_scroll.value = scroll;
});
```

It also reads `lenis.velocity` and `lenis.progress` directly in `useFrame` to drive position and intensity. The Lenis instance comes from the `SmoothWrapper` context that wraps the scroll container.

## Modifying the Blob

### Changing colors

Update `colorA` and `colorB` in the uniforms object in `Blob/index.jsx`. These are `THREE.Color` instances.

### Adjusting distortion

- `initialIntensity` controls baseline spikiness (higher = more deformed)
- The velocity multiplier in the intensity calculation controls scroll reactivity
- Clamp range `[-1, 1]` in `value_limit` sets the distortion bounds

### Changing movement path

The cosine function `cos(4.35π * progress) * 2.5` controls horizontal sway. Adjust the frequency multiplier (`4.35`) for more/fewer oscillations, and the amplitude (`2.5`) for wider/narrower movement.

### Performance

The icosahedron has 48 subdivisions — this is high detail. Reducing it (e.g., to 32) will improve performance on lower-end devices at the cost of smoother surface deformation. The Perlin noise runs per-vertex, so subdivision count directly impacts shader cost.
