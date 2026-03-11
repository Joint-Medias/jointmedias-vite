import { useFrame } from "@react-three/fiber"
import React, { useMemo, useRef, useState } from "react"
import { useIsomorphicLayoutEffect } from "../../helpers/utils"
import { Color, MathUtils } from "three"
import fragmentShader from "./fragmentShader"
import vertexShader from "./vertexShader"

import { useLenis } from "@studio-freight/react-lenis"

function value_limit(val, min, max) {
	return val < min ? min : val > max ? max : val
}

const windowGlobal = typeof window !== "undefined" && window

const useMedia = query => {
	const [matches, setMatches] = useState(
		windowGlobal.matchMedia(query).matches,
	)

	const isBrowser = () => typeof window !== "undefined" && window

	useIsomorphicLayoutEffect(() => {
		if (isBrowser()) {
			const media = window.matchMedia(query)
			if (media.matches !== matches) setMatches(media.matches)
			const listener = () => setMatches(media.matches)
			media.addEventListener("change", listener)

			return () => media.removeEventListener("change", listener)
		}
	}, [matches, query])

	return matches
}

const Blob = () => {
	const mesh = useRef()
	const match = useMedia("(max-width: 769px)")

	// if match ? mobile : desktop
	const staticOptions = {
		initialIntensity: match ? 0.7 : 0.5,
		startingPosX: match ? -3 : 2.5,
		startingPosY: match ? 0 : 0,
		startingPosZ: match ? 1.5 : 1.5,
	}

	const uniforms = useMemo(() => {
		return {
			colorA: { type: "vec3", value: new Color("#a60b23") },
			colorB: { type: "vec3", value: new Color("#cc0d29") },
			u_scroll: { value: 0 },
			u_time: { value: 0 },
			u_intensity: { value: staticOptions.initialIntensity },
			x_offset: { value: staticOptions.startingPosX },
			z_offset: { value: staticOptions.startingPosZ },
			y_offset: { value: staticOptions.startingPosY },
		}
	}, [
		staticOptions.initialIntensity,
		staticOptions.startingPosX,
		staticOptions.startingPosY,
		staticOptions.startingPosZ,
	])

	const lenis = useLenis(({ scroll }) => {
		uniforms.u_scroll.value = scroll
	})

	// Where they go after inital load
	if (match) {
		// mobile
		uniforms.y_offset.value = 4
		uniforms.z_offset.value = 0
		uniforms.x_offset.value = -0.8
	} else {
		// desktop
		uniforms.y_offset.value = 0
		uniforms.z_offset.value = 2
		uniforms.x_offset.value = 0
	}

	useFrame(({ clock }) => {
		uniforms.u_time.value = clock.getElapsedTime()

		if (mesh.current) {
			mesh.current.position.y = MathUtils.lerp(
				mesh.current.position.y,
				uniforms.y_offset.value +
					(lenis.velocity / 6 + lenis.progress * 0.75),
				0.001,
			)

			const posX =
				Math.cos(Math.PI * 4.35 * lenis.progress) * 2.5 -
				uniforms.x_offset.value
			mesh.current.position.x = MathUtils.lerp(
				mesh.current.position.x,
				posX,
				0.015,
			)

			mesh.current.position.z = MathUtils.lerp(
				mesh.current.position.z,
				uniforms.z_offset.value,
				0.003,
			)

			mesh.current.rotation.x = 0.3 * clock.getElapsedTime()
			mesh.current.rotation.z = -0.3 * clock.getElapsedTime()
			mesh.current.material.uniforms.u_time.value =
				0.008 * clock.getElapsedTime()

			const intensity = value_limit(
				lenis.velocity + staticOptions.initialIntensity,
				-1,
				1,
			)

			mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
				mesh.current.material.uniforms.u_intensity.value,
				intensity,
				Math.abs(0.003 + lenis.velocity * 0.003),
			)
		}
	})

	return (
		<mesh
			ref={mesh}
			transparent
			position={[
				staticOptions.startingPosX,
				staticOptions.startingPosY,
				staticOptions.startingPosZ,
			]}
		>
			<icosahedronGeometry attach="geometry" args={[2, 48]} />
			<shaderMaterial
				attach="material"
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
				uniforms={uniforms}
			/>
		</mesh>
	)
}

export default Blob
