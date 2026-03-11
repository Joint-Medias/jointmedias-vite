import React, { useRef } from "react"

import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import LogoSlider from "./../LogoSlider"
import SliderCard from "./../SliderCard"
import WorkItem from "./../WorkItem"
import Parallax from "./../Parallax"
import ScrollReveal from "./../ScrollReveal"
import useProjects from "../../hooks/useProjects"

gsap.registerPlugin(ScrollTrigger)

const OurMission = () => {
	const ourMission = useRef()

	const { featured: featuredProjects, standard: projects, loading } = useProjects()

	useGSAP(
		() => {
			if (loading) return

			const sliderContainer =
					ourMission.current?.querySelector(".slider-container")

			if (!sliderContainer) return

			const sliderCards =
					ourMission.current.querySelectorAll(".slider-card"),
				sliderScrollWidth = sliderContainer.scrollWidth,
				sliderClientWidth = sliderContainer.clientWidth,
				sliderX = -(sliderScrollWidth - sliderClientWidth + 20)

			let cardAnimationDelay = 0

			gsap.to(sliderContainer, {
				scrollTrigger: {
					trigger: sliderContainer,
					start: "top 90%",
					onEnter: () => {
						for (let i = 0; i < sliderCards.length; i++) {
							sliderCards[i].style.animation =
								`card-in .5s cubic-bezier(0.37, 0, 0.63, 1) ${cardAnimationDelay}s forwards`
							cardAnimationDelay = cardAnimationDelay + 0.05
						}
					},
				},
			})

			const mm = gsap.matchMedia()

			mm.add("(min-width: 767px)", () => {
				gsap.to(sliderContainer, {
					scrollTrigger: {
						trigger: ".slider-wrapper",
						start: "center 50%",
						scrub: 0.5,
						end: `+=${Math.abs(sliderX)}`,
						pin: true,
						anticipatePin: 1,
					},
					x: `${sliderX}px`,
				})
			})

			// Refresh all ScrollTriggers after setup
			ScrollTrigger.refresh()

			return () => {
				mm.revert()
			}
		},
		{ scope: ourMission, dependencies: [loading] },
	)

	if (loading) {
		return (
			<div id="our-mission" className="our-mission" ref={ourMission}>
				<LogoSlider />
				<div className="container container--site-wide">
					<div className="about-section">
						<div className="about-section--left">
							<Parallax speed={0.5}>
								<ScrollReveal as="small" className="small-title">
									CREATIVE APPROACH
								</ScrollReveal>
								<ScrollReveal as="h2" className="m-t-0">
									Beauty
									<br /> <span>&amp;</span> Brains
								</ScrollReveal>
							</Parallax>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div id="our-mission" className="our-mission" ref={ourMission}>
			<LogoSlider />
			<div className="container container--site-wide">
				<div className="about-section">
					<div className="about-section--left">
						<Parallax speed={0.5}>
							<ScrollReveal as="small" className="small-title">
								CREATIVE APPROACH
							</ScrollReveal>
							<ScrollReveal as="h2" className="m-t-0">
								Beauty
								<br /> <span>&amp;</span> Brains
							</ScrollReveal>
						</Parallax>
					</div>

					<div className="about-section--right">
						<Parallax speed={-0.5}>
							<ScrollReveal as="p" className="lead">
								We believe that design should be both visually
								captivating and highly functional. We take pride
								in crafting websites and digital experiences
								that reflect the uniqueness of our clients&apos;
								brands and effectively communicate their
								message. From compelling motion graphics to
								intuitive ui/ux, we strive to exceed
								expectations and deliver results.
							</ScrollReveal>
						</Parallax>
					</div>
				</div>

				<div className="slider-wrapper">
					<div id="featuredWork" className="anchor slider"></div>
					<div className="slider-header">
						<ScrollReveal as="h2" className="m-t-0">
							Featured Work
						</ScrollReveal>
					</div>

					<div className="slider-container">
						{featuredProjects.map(project => {
							return (
								<SliderCard
									project={project}
									key={project.id}
								/>
							)
						})}
					</div>
				</div>

				<div className="page-section">
					<ul className="work-list">
						{projects.map(project => {
							return (
								<WorkItem project={project} key={project.id} />
							)
						})}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default OurMission
