import React from "react"
import { Link, useParams } from "react-router-dom"
import useWordPress from "../hooks/useWordPress"
import usePageTracking from "../hooks/usePageTracking"
import Seo from "../components/Seo"

const Page = () => {
	const { slug } = useParams()
	usePageTracking()

	const { data, loading, error } = useWordPress(
		`/pages?slug=${slug}&_embed`
	)

	if (loading) {
		return <div className="loading"></div>
	}

	if (error || !data || data.length === 0) {
		return (
			<div className="error-page">
				<h1>Page not found</h1>
				<p>This page may have been moved or is no longer available.</p>
				<Link to="/" className="button red">Back to Home</Link>
			</div>
		)
	}

	const page = data[0]

	return (
		<>
			<Seo
				title={`${page.title.rendered} — Joint Medias`}
				pathname={`/${slug}/`}
			/>

			<div className="container container--small">
				<div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
			</div>
		</>
	)
}

export default Page
