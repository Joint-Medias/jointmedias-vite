import React, { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useIsomorphicLayoutEffect } from "../helpers/utils"

gsap.registerPlugin(ScrollTrigger)

const ScrollReveal = ({ children, as: Tag = "div", className, ...rest }) => {
	const ref = useRef()

	useIsomorphicLayoutEffect(() => {
		const el = ref.current
		gsap.fromTo(
			el,
			{ opacity: 0 },
			{
				opacity: 1,
				duration: 0.5,
				ease: "power2.out",
				scrollTrigger: {
					trigger: el,
					start: "top 90%",
					toggleActions: "play none none none",
				},
			}
		)

		return () => {
			ScrollTrigger.getAll().forEach(st => {
				if (st.trigger === el) st.kill()
			})
		}
	}, [])

	return (
		<Tag ref={ref} className={className} style={{ opacity: 0 }} {...rest}>
			{children}
		</Tag>
	)
}

export default ScrollReveal
