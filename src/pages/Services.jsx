import { useGSAP } from "@gsap/react"
import { Link } from "react-router-dom"
import { gsap } from "gsap"
import React, { useRef } from "react"
import { useIsomorphicLayoutEffect } from "../helpers/utils"
import usePageTracking from "../hooks/usePageTracking"
import Seo from "../components/Seo"
import CallToAction from "../components/CallToAction"

gsap.registerPlugin(useGSAP)

const Services = () => {
	const container = useRef()
	usePageTracking()

	useIsomorphicLayoutEffect(() => {
		let rafId = null

		const handleCardMove = e => {
			if (rafId) return
			rafId = requestAnimationFrame(() => {
				const xAxis = (window.innerWidth / 2 - e.clientX) / 320
				const yAxis = (window.innerHeight / 2 - e.clientY) / 320

				if (container.current) {
					const images =
						container.current.querySelectorAll(".with-effect img")
					for (const img of images) {
						img.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) translate(-60px, -60px)`
					}
				}
				rafId = null
			})
		}

		window.addEventListener("mousemove", handleCardMove)

		return () => {
			window.removeEventListener("mousemove", handleCardMove)
			if (rafId) cancelAnimationFrame(rafId)
		}
	}, [])

	return (
		<>
			<Seo
				title="Services — Joint Medias"
				description="We Make Websites & Design Marketing Material for Small to Medium Sized Businesses and Agencies."
				pathname="/services/"
			/>

			<div ref={container} className="page-services">
				<div className="container container--small">
					<h1>
						We Make Websites & Design Marketing Material for Small
						to Medium Sized Businesses and Agencies.
					</h1>

					<p className="small text-uppercase">
						That&rsquo;s us in a nutshell - here&rsquo;s more:
					</p>

					<div className="two-column">
						<div className="two-column--left">
							<p>
								We are the self contained creative department
								that any solo entrepreneur, small business,
								public relations firm, or advertising agency
								could benefit from. From one off projects to
								years long relationships with our clients, our
								team grows and contracts with your needs.
							</p>
							<p>
								Graphic Design has always been the bedrock of
								our company, and continues to be as we support
								local small businesses as well as local and
								statewide unions, political campaigns, and
								ballot initiatives.
							</p>
						</div>
						<div className="two-column--right">
							<p>
								With our Design team as our foundation,
								we&rsquo;ve expanded into custom web development
								for local and national clients maintaining sites
								driving 50+ million in annual sales.
							</p>
							<p>
								Don&rsquo;t forget about our motion design chops
								where we put our static designs into motion for
								increased engagement.
							</p>
						</div>
					</div>

					<div className="page-intro-callout">
						<p className="small m-b-30">
							Your business has unique challenges. Let&rsquo;s
							explore how we can support you.
						</p>
						<Link
							to="/#work-together"
							className="button blue m-t-0"
						>
							Let&apos;s work together
						</Link>
					</div>
				</div>

				<div className="page-section container container--smallplus">
					<div className="grid">
						<div className="grid-item small-order-2">
							<div className="project-tiles justify-end">
								<div className="project-tile with-effect">
									<img src="/images/services/gd_1.jpg" alt="Graphic design sample — brand identity" loading="lazy" />
								</div>
								<div className="project-tile with-effect">
									<img src="/images/services/gd_2.jpg" alt="Graphic design sample — marketing collateral" loading="lazy" />
								</div>
								<div className="project-tile with-effect">
									<img src="/images/services/gd_3.jpg" alt="Graphic design sample — print design" loading="lazy" />
								</div>
							</div>
						</div>
						<div className="grid-item small-order-1">
							<h2>Graphic Design</h2>
							<p>
								We offer an array of graphic design services to
								help communicate to your target audience. If
								it&rsquo;s building your brand identity, making
								a positive first impression, driving sales,
								informing voters, activating union members, or
								simplifying complex information, our design team
								has over 40 years of combined experience.
							</p>
							<p className="small blue">
								To learn more about the specific graphic design
								services we offer, and to see related work
								samples
							</p>
							<Link to="/#our-mission" className="button blue">
								More about Graphic Design
							</Link>
						</div>
					</div>
				</div>

				<div className="page-section container container--smallplus">
					<div className="grid small-big">
						<div className="grid-item">
							<div className="project-tiles">
								<div className="project-tile with-effect">
									<img src="/images/services/wd_1.jpg" alt="Web design sample — responsive website" loading="lazy" />
								</div>
								<div className="project-tile with-effect">
									<img src="/images/services/wd_2.jpg" alt="Web design sample — e-commerce interface" loading="lazy" />
								</div>
							</div>
						</div>
						<div className="grid-item">
							<h2>Web Design</h2>
							<p>
								Our experience spans from single page microsites
								for existing brands to fully custom e-commerce
								websites and everything in between. Our team
								focuses on user experience and accessibility to
								make our digital experiences easy to navigate
								and accessible to all users.
							</p>
							<p>
								Another objective is for our projects to stand
								the test of time. We know with advancing
								technology, a website will not exist forever, we
								do our best to deliver websites that will
								visually withstand the test of time. With that
								in mind we balance simplicity, subtle animations
								and transitions, with a little sprinkle of
								trends we feel will support the projects goals
								and resonate with the target audience.
							</p>
							<p className="small blue">
								To learn more about the specific web design
								services we offer, and to see related work
								samples
							</p>
							<Link to="/#our-mission" className="button blue">
								More about Web Design
							</Link>
						</div>
					</div>
				</div>

				<div className="page-section container container--smallplus">
					<div className="grid small-big">
						<div className="grid-item">
							<div className="project-tiles">
								<div className="project-tile wide">
									<img
										src="/images/services/devlogos.png"
										alt="Tech Stack: JavaScript, CSS, HTML, CSS Animations, React, GraphQL"
									/>
									<div className="caption">
										<strong>TECH STACK</strong>
										<br />
										JavaScript, CSS, HTML, CSS Animations,
										React, GraphQL
									</div>
								</div>
							</div>
						</div>
						<div className="grid-item">
							<h2>Web Development</h2>
							<p>
								Our core Full-stack development team has been
								together for over 10 years. Using WordPress as
								our primary CMS (Content Management System), we
								have built countless websites of various sizes
								and capabilities, and have provided support and
								maintenance to our clients, agencies and area
								businesses.
							</p>
							<p>
								Our core design team has also been together for
								over 10 years where we&rsquo;ve developed a
								shared language and understanding of each
								other&rsquo;s processes and challenges, which
								fosters smoother communication, reduces
								misunderstandings, and allows for quicker
								problem-solving.
							</p>
							<p className="small blue">
								To learn more about the specific web development
								services we offer, and to see related work
								samples
							</p>
							<Link to="/#our-mission" className="button blue">
								More about Web Development
							</Link>
						</div>
					</div>
				</div>

				<CallToAction
					enabled={true}
					title="From graphic design to full-stack development and beyond, Joint Medias is your go-to for creative solutions that make an impact."
					content=""
					link={{
						url: "/#work-together",
						title: "Let's Work Together",
						target: "_self",
					}}
				/>
			</div>
		</>
	)
}

export default Services
