import { Link, useParams } from "react-router-dom"
import DOMPurify from "dompurify"
import parse from "html-react-parser"
import React from "react"

import { decodeEntities } from "../helpers/utils"
import useWordPress from "../hooks/useWordPress"
import usePageTracking from "../hooks/usePageTracking"
import Seo from "../components/Seo"
import ScrollReveal from "../components/ScrollReveal"
import Video from "../components/Video"
import VideoEmbed from "../components/VideoEmbed"

function WorkItemStatic(props) {
	const { image, margin, borderColor } = props
	let styles = {}

	if (margin) {
		styles.padding = `${margin}`
	}

	if (borderColor) {
		styles.backgroundColor = `${borderColor}`
	}

	return (
		<div
			className="work-single--section work-single-content--image"
			style={styles}
		>
			<img alt={image.alt} src={image.data} loading="eager" />
		</div>
	)
}

function WorkItemLinked(props) {
	const { image, link, margin, borderColor } = props
	let styles = {}

	if (margin) {
		styles.margin = `${margin}`
	}

	if (borderColor) {
		styles.borderColor = `${borderColor}`
	}

	return (
		<a
			href={link.url}
			target={link.target}
			title={link.title}
			className="work-single--section work-single-content--image"
			style={styles}
		>
			<img alt={image.alt} src={image.data} loading="eager" />
		</a>
	)
}

function WorkImage(props) {
	const { linked, image, margin, borderColor } = props

	if (linked?.url) {
		if (image?.data) {
			return (
				<WorkItemLinked
					image={image}
					link={linked}
					margin={margin}
					borderColor={borderColor}
				/>
			)
		}
	}

	if (image?.data) {
		return (
			<WorkItemStatic
				image={image}
				margin={margin}
				borderColor={borderColor}
			/>
		)
	}

	return null
}

function CallToAction(props) {
	const { enabled, title, content, link } = props

	if (enabled === false) return

	return (
		<div className="work-single-cta">
			<div className="work-single-cta--content">
				<h3>{title}</h3>
				<p>{content}</p>
			</div>
			<div className="work-single-cta--button">
				<a className="button" href={link.url} target={link.target}>
					{link.title}
				</a>
			</div>
		</div>
	)
}

function RelatedProjects(props) {
	const { projects, title } = props
	return (
		<div className="related-projects">
			<hr />
			<h3>{title}</h3>
			<section>
				{projects.map((project, index) => {
					const thisProject = project.project
					return (
						<React.Fragment key={index}>
							<Link to={`/work/${thisProject?.post_name}/`}>
								{thisProject?.post_title}
							</Link>
						</React.Fragment>
					)
				})}
			</section>
		</div>
	)
}

const WorkPost = () => {
	const { slug } = useParams()
	usePageTracking()

	const { data, loading, error } = useWordPress(
		`/work?slug=${slug}&acf_format=standard&_embed`
	)

	if (loading) {
		return <div className="loading" role="status" aria-label="Loading project"></div>
	}

	if (error || !data || data.length === 0) {
		return (
			<div className="error-page">
				<h1>Project not found</h1>
				<p>This project may have been moved or is no longer available.</p>
				<Link to="/#work" className="button red">View Our Work</Link>
			</div>
		)
	}

	const project = data[0]
	const categories = project._embedded?.["wp:term"]?.[0] || []
	const featuredImage = project._embedded?.["wp:featuredmedia"]?.[0]?.source_url
	const sections = project.acf?.sections || []

	return (
		<>
			<Seo
				title={project.title.rendered}
				description={project.excerpt?.rendered?.replace(/<[^>]+>/g, "").trim()}
				image={featuredImage}
				pathname={`/work/${project.slug}/`}
			/>

			<article
				className="work-single"
				itemScope
				itemType="http://schema.org/Article"
			>
				<header className="work-single-header">
					<div className="work-single-header--inner">
						<h1 itemProp="headline">{decodeEntities(project.title.rendered)}</h1>
						<h2
							dangerouslySetInnerHTML={{
								__html: DOMPurify.sanitize(project.excerpt?.rendered || ""),
							}}
						></h2>

						<ul className="work-single-header--tags">
							{categories.map(category => {
								return (
									<li key={category.id}>
										{category.name}
									</li>
								)
							})}
						</ul>
					</div>
				</header>

				<section className="work-single-content" itemProp="articleBody">
					<div className="work-single-content--inner container container--large">
						{sections.map((section, index) => {
							/* Setup Data structure */
							let image = {
								data: null,
								alt: null,
							}

							let margin = null
							let borderColor = null

							const link = {
								target: "_self",
								title: null,
								url: null,
							}

							image.link = link

							let caseStudy = {
								title: null,
								content: "",
								relatedTitle: null,
								relatedProjects: null,
								ctaEnabled: false,
								ctaTitle:
									"Exploring partnerships for web design and development?",
								ctaCopy: "Discover how we can collaborate.",
								ctaButton: {
									url: "/#contact",
									title: "Get in Touch",
									target: "_self",
								},
							}

							let projectLink = {
								target: "",
								title: null,
								url: null,
							}

							let generalContent = {
								content: "",
							}

							let video = {
								video: null,
								embed: null,
							}

							/* Fill out data */
							if (section.image) {
								image = {
									data: section.image?.url || section.image?.mediaItemUrl,
									alt:
										section.image?.alt ||
										`${project.title.rendered} image ${index}`,
								}
							}

							if (section.margin) {
								margin = section.margin
							}

							if (section.border_color) {
								borderColor = section.border_color
							}

							if (section.title) {
								caseStudy = {
									title: section.title,
									content: section.content,
									relatedTitle: section.related_title,
									relatedProjects: section.related_projects,
									ctaEnabled: section.cta_enabled
										? section.cta_enabled
										: caseStudy.ctaEnabled,
									ctaTitle: section.cta_title
										? section.cta_title
										: caseStudy.ctaTitle,
									ctaCopy: section.cta_copy
										? section.cta_copy
										: caseStudy.ctaCopy,
									ctaButton: section.cta_button
										? section.cta_button
										: caseStudy.ctaButton,
								}
							}

							if (section.link) {
								image.link = {
									target: section.link?.target || "_self",
									title: section.link?.title || project.title.rendered,
									url: section.link?.url,
								}
							}

							if (section.project_link) {
								projectLink = {
									target: section.project_link?.target,
									title: section.project_link?.title,
									url: section.project_link?.url,
								}
							}

							if (section.copy) {
								generalContent = {
									content: section.copy,
								}
							}

							if (section.video) {
								video.video = section.video?.url
							}

							if (section.video_embed) {
								video.embed = section.video_embed
							}

							return (
								<React.Fragment key={index}>
									<WorkImage
										image={image}
										linked={image.link}
										margin={margin}
										borderColor={borderColor}
									/>

									{projectLink.url && (
										<ScrollReveal
											as="a"
											className="work-single--section work-single-content--link"
											href={projectLink.url}
											target={projectLink.target}
										>
											{projectLink.title}
										</ScrollReveal>
									)}

									{generalContent.content && (
										<ScrollReveal className="work-single--section work-single-content--copy">
											<div className="work-single-content--copy--inner">
												{parse(DOMPurify.sanitize(generalContent.content))}
											</div>
										</ScrollReveal>
									)}

									{video.video &&
										section.video_type === "file" && (
											<div className="work-single--section work-single-content--video">
												<div className="work-single-content--video--inner">
													<Video
														videoSrcURL={
															video.video
														}
														margin={margin}
														borderColor={
															borderColor
														}
													/>
												</div>
											</div>
										)}

									{video.embed &&
										section.video_type === "embed" && (
											<div className="work-single--section work-single-content--video">
												<div className="work-single-content--video--inner">
													<VideoEmbed
														videoEmbed={video.embed}
														margin={margin}
														borderColor={
															borderColor
														}
														title={
															project.title.rendered + " 1"
														}
													/>
												</div>
											</div>
										)}

									{caseStudy.title && (
										<ScrollReveal className="work-single--section work-single-content--case-study">
											<div className="work-single-content--case-study--inner">
												<h2>{caseStudy.title}</h2>
												<div>
													{parse(DOMPurify.sanitize(caseStudy.content))}
												</div>

												<CallToAction
													enabled={
														caseStudy.ctaEnabled
													}
													title={caseStudy.ctaTitle}
													content={caseStudy.ctaCopy}
													link={caseStudy.ctaButton}
												/>

												{caseStudy.relatedProjects && (
													<RelatedProjects
														title={
															caseStudy.relatedTitle
														}
														projects={
															caseStudy.relatedProjects
														}
													/>
												)}
											</div>
										</ScrollReveal>
									)}
								</React.Fragment>
							)
						})}
					</div>
				</section>
			</article>
		</>
	)
}

export default WorkPost
