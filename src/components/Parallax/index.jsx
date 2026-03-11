import React from "react"
import { gsap } from "gsap"
import { useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useIsomorphicLayoutEffect } from "../../helpers/utils"

gsap.registerPlugin(ScrollTrigger)

const Parallax = ({ className, children, speed = 1 }) => {
	const trigger = useRef()
	const target = useRef()

	useIsomorphicLayoutEffect(() => {
		const setY = gsap.quickSetter(target.current, "y", "px")
		let baseProgress = null

		const st = ScrollTrigger.create({
			trigger: trigger.current,
			start: "top bottom",
			end: "bottom top",
			onRefresh: (self) => {
				// Capture progress at current scroll position as the zero point
				// so elements always start at their CSS-defined position
				baseProgress = self.progress
				setY(0)
			},
			onUpdate: (self) => {
				if (baseProgress === null) baseProgress = self.progress
				const delta = self.progress - baseProgress
				setY(delta * speed * 100)
			},
		})

		return () => st.kill()
	}, [speed])

	return (
		<div ref={trigger} className={className}>
			<div ref={target}>{children}</div>
		</div>
	)
}

export default Parallax
