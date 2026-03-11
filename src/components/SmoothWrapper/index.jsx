import { ReactLenis } from "@studio-freight/react-lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import React, { useRef } from "react"
import { useIsomorphicLayoutEffect } from "../../helpers/utils"

gsap.registerPlugin(ScrollTrigger)

const SmoothWrapper = ({ children }) => {
	const lenisRef = useRef()

	useIsomorphicLayoutEffect(() => {
		function update(time) {
			lenisRef.current?.lenis?.raf(time * 1000)
		}

		gsap.ticker.add(update)

		return () => {
			gsap.ticker.remove(update)
		}
	})

	return (
		<ReactLenis
			root
			ref={lenisRef}
			autoRaf={false}
			options={{ smoothTouch: true, lerp: 0.08 }}
		>
			{children}
		</ReactLenis>
	)
}

export default SmoothWrapper
