import React from "react"
import { Helmet } from "react-helmet-async"

const Seo = ({
	title = "Joint Medias — Creative Solutions for Businesses, Agencies & You.",
	description = "Since 2006, Joint Medias has been at the forefront of bringing creative web and graphic design to Sacramento. Modern Graphic Design, Web Design, Development, and Motion Graphics.",
	image = "/images/favicon.png",
	pathname = "",
}) => {
	const siteUrl = "https://jointmedias.com"
	const url = `${siteUrl}${pathname}`

	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />

			<meta property="og:type" content="website" />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:url" content={url} />
			<meta property="og:image" content={image.startsWith("http") ? image : `${siteUrl}${image}`} />

			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={image.startsWith("http") ? image : `${siteUrl}${image}`} />

			<link rel="canonical" href={url} />
		</Helmet>
	)
}

export default Seo
