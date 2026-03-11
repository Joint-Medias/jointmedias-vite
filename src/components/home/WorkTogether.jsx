import React, { useState } from "react"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"

import { useIsomorphicLayoutEffect } from "../../helpers/utils"

const WorkTogether = () => {
	const { executeRecaptcha } = useGoogleReCaptcha()

	const [loading, setLoading] = useState(false)
	const [submitted, setSubmitted] = useState(false)
	const [error, setError] = useState(null)

	useIsomorphicLayoutEffect(() => {
		let index = 0,
			interval = 1000

		const timeoutIds = []
		const intervalIds = []

		const rand = (min, max) => {
			return Math.floor(Math.random() * (max - min + 1)) + min
		}

		const animate = star => {
			star.style.setProperty("--star-left", `${rand(-10, 100)}%`)
			star.style.setProperty("--star-top", `${rand(-20, 80)}%`)
			star.style.animation = "none"
			reflow(star)
			star.style.animation = ""
		}

		function reflow(elt) {
			void elt.offsetHeight
		}

		for (const star of document.getElementsByClassName("magic-star")) {
			const tid = setTimeout(
				() => {
					animate(star)

					const iid = setInterval(() => animate(star), 1000)
					intervalIds.push(iid)
				},
				index++ * (interval / 3),
			)
			timeoutIds.push(tid)
		}

		return () => {
			timeoutIds.forEach(id => clearTimeout(id))
			intervalIds.forEach(id => clearInterval(id))
		}
	}, [])

	const onType = () => {
		const magicStar = document.getElementsByClassName("magic-star")
		for (let i = 0; i < magicStar.length; i++) {
			magicStar[i].classList.add("magic-star-animation")
		}

		setTimeout(() => {
			for (let i = 0; i < magicStar.length; i++) {
				magicStar[i].classList.remove("magic-star-animation")
			}
		}, 3000)
	}

	const handleSubmit = async e => {
		// Stop the form from submitting since we're handling that.
		e.preventDefault()

		// Check if the captcha was skipped or not
		if (!executeRecaptcha) {
			return
		}

		// Clear any previous errors and set loading.
		setError(null)
		setLoading(true)

		typeof window !== "undefined" &&
			window.gtag &&
			window.gtag("event", "conversion", {
				send_to: "AW-16456111300/x3mKCKnR45AZEMSp8aY9",
			})

		// This is the same as grecaptcha.execute on traditional html script tags
		const result = await executeRecaptcha("contact_us")
		const formData = new FormData(e.target)
		formData.append("g-recaptcha-response", result)

		fetch("https://formspree.io/f/xayrbgry", {
			method: "POST",
			body: formData,
			headers: {
				Accept: "application/json",
			},
		})
			.then(response => {
				if (response.ok) {
					// Reset form
					e.target.reset()

					setLoading(false)
					setSubmitted(true)
				} else {
					response.json().then(data => {
						if (Object.hasOwn(data, "errors")) {
							setError(
								data["errors"]
									.map(error => error["message"])
									.join(", "),
							)
						} else {
							setError(
								"There was a problem submitting your form. Please try again.",
							)
						}
					})
					setLoading(false)
				}
			})
			.catch(() => {
				setError(
					"Unable to send your message. Please check your connection and try again.",
				)
				setLoading(false)
			})
	}

	return (
		<div id="work-together" className="page-section work-together">
			<div id="contact" className="anchor"></div>
			<div className="work-together--container">
				<div className="work-together--left">
					<div className="work-together--left__top">
						<h2 className="m-t-0 heading" id="workTogether">
							Let&apos;s Work
							<span className="magic">
								<span className="magic-star">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 512 512"
									>
										<path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
									</svg>
								</span>
								<span className="magic-star">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 512 512"
									>
										<defs></defs>
										<path
											className="fa-primary"
											d="M192 320L15.5 275.9C6.4 273.6 0 265.4 0 256s6.4-17.6 15.5-19.9L192 192 236.1 15.5C238.4 6.4 246.6 0 256 0s17.6 6.4 19.9 15.5L320 192l176.5 44.1c9.1 2.3 15.5 10.5 15.5 19.9s-6.4 17.6-15.5 19.9L320 320 275.9 496.5c-2.3 9.1-10.5 15.5-19.9 15.5s-17.6-6.4-19.9-15.5L192 320z"
										/>
										<path
											className="fa-secondary"
											d="M71 105c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l48 48c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L71 105zM441 105l-48 48c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l48-48c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zm0 336c-9.4 9.4-24.6 9.4-33.9 0l-48-48c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l48 48c9.4 9.4 9.4 24.6 0 33.9zM71 407l48-48c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-48 48c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9z"
										/>
									</svg>
								</span>
								<span className="magic-star">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 640 512"
									>
										<path d="M64 96C28.7 96 0 124.7 0 160V352c0 35.3 28.7 64 64 64H416c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H64zm544 32H480V384H608c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32zM560 232a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm24 72a24 24 0 1 1 -48 0 24 24 0 1 1 48 0z" />
									</svg>
								</span>
								<span className="magic-text">Together</span>
							</span>
						</h2>
						<p>
							We are a bespoke creative agency with extensive
							design and development capabilities. We welcome
							projects of all sizes and look forward to hearing
							about your next project.
						</p>
					</div>
					<div className="work-together--left__bottom">
						<p>
							<a href="mailto:info@jointmedias.com">
								info@jointmedias.com
							</a>
						</p>
						<p>916.934.2733</p>
					</div>
				</div>
				<div className="work-together--right">
					{!submitted ? (
						<form
							id="contact-us"
							onSubmit={handleSubmit}
							action="https://formspree.io/f/xayrbgry"
							method="POST"
						>
							<div>
								<label htmlFor="name">
									Name <span aria-hidden="true">*</span>
								</label>
								<input
									onKeyDown={() => onType()}
									required
									id="name"
									name="name"
									type="text"
									placeholder="Your name or company"
								/>
							</div>

							<div>
								<label htmlFor="email">
									Email <span aria-hidden="true">*</span>
								</label>
								<input
									onKeyDown={() => onType()}
									required
									id="email"
									name="email"
									type="email"
									placeholder="contact@johndoe.com"
								/>
							</div>

							<div>
								<label htmlFor="project">
									Tell us about your project <span aria-hidden="true">*</span>
								</label>
								<textarea
									onKeyDown={() => onType()}
									required
									id="project"
									name="project"
									cols="30"
									rows="5"
									placeholder="What are you working on?"
								></textarea>
							</div>

							{error && (
								<p className="form-error" role="alert">
									{error}
								</p>
							)}

							<div id="submitContainer">
								<button
									id="contact-us-button"
									type="submit"
									disabled={loading}
									aria-busy={loading}
								>
									{loading ? <>Sending...</> : <>Send it</>}
								</button>
							</div>
						</form>
					) : (
						<div>
							<p>
								Thanks for reaching out! We&apos;ll get back to you
								as soon as possible.
							</p>
							<div className="social">
								<a
									href="https://www.linkedin.com/company/jointmedias"
									target="_blank"
									rel="noreferrer"
									className="linkedin"
								>
									<img
										className="social-icons"
										src="/images/homepage/in.svg"
										alt="LinkedIn"
									/>
								</a>

								<a
									href="https://www.instagram.com/jointmedias"
									target="_blank"
									rel="noreferrer"
									className="insta"
								>
									<img
										className="social-icons"
										src="/images/homepage/insta.svg"
										alt="Instagram"
									/>
								</a>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default WorkTogether
