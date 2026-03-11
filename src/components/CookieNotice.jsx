import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const CookieNotice = () => {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const consent = localStorage.getItem("cookieConsent")
		if (consent === null) {
			setIsVisible(true)
		}
	}, [])

	const acceptCookies = () => {
		localStorage.setItem("cookieConsent", "true")
		setIsVisible(false)
	}

	if (!isVisible) return null

	return (
		<div className="cookie-notice">
			<p className="text-center">
				We use cookies to improve your experience. Review our privacy
				policy for details.
			</p>
			<div className="cookie-notice__buttons">
				<button
					className="button no-spacing small"
					onClick={acceptCookies}
				>
					Got it!
				</button>
				<Link
					to="/privacy-policy"
					className="button no-spacing small link"
					onClick={acceptCookies}
				>
					Privacy Policy
				</Link>
			</div>
		</div>
	)
}

export default CookieNotice
