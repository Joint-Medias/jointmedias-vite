import React from "react"

import { slider, sliderWrapper } from "./logoSlider.module.scss"

const LogoSlider = () => {
	const logos = [
		{ src: "/images/logos/logos-1.png", alt: "Uncommon" },
		{ src: "/images/logos/logos-2.png", alt: "Ross" },
		{ src: "/images/logos/logos-3.png", alt: "Pac 12" },
		{ src: "/images/logos/logos-4.png", alt: "The Life Coach School" },
		{ src: "/images/logos/logos-5.png", alt: "Unite Here!" },
		{ src: "/images/logos/logos-6.png", alt: "The Honey Agency" },
		{ src: "/images/logos/logos-7.png", alt: "Misfit" },
		{ src: "/images/logos/logos-8.png", alt: "University of Phoenix" },
		{ src: "/images/logos/logos-9.png", alt: "LA Federation of Labor" },
		{ src: "/images/logos/logos-10.png", alt: "AFSCME 3299" },
		{ src: "/images/logos/logos-11.png", alt: "Water Foundation" },
		{ src: "/images/logos/logos-12.png", alt: "Resources Legacy Fund" },
		{ src: "/images/logos/logos-13.png", alt: "Gabriel Iglesias" },
	]

	return (
		<div className={sliderWrapper}>
			<div className={`${slider} primary jm-logoslider`}>
				{logos.map((logo, i) => (
					<img key={i} src={logo.src} width="140" height="140" alt={logo.alt} />
				))}
			</div>
			<div
				className={`${slider} secondary jm-logoslider`}
				aria-hidden="true"
			>
				{logos.map((logo, i) => (
					<img key={i} src={logo.src} width="140" height="140" aria-hidden="true" alt={logo.alt} />
				))}
			</div>
		</div>
	)
}

export default LogoSlider
