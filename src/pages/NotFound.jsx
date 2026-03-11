import React from "react"
import { Link } from "react-router-dom"
import Seo from "../components/Seo"

const NotFound = () => {
	return (
		<>
			<Seo title="Page not found — Joint Medias" />
			<div className="error-page">
				<h1>Page not found</h1>
				<p>We couldn&apos;t find what you&apos;re looking for. It may have been moved or no longer exists.</p>
				<Link to="/" className="button red">Back to Home</Link>
			</div>
		</>
	)
}

export default NotFound
