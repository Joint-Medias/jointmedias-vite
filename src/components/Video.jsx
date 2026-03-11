import React from "react"

const Video = ({ ...props }) => {
	const { videoSrcURL, margin, borderColor } = props
	let styles = {}

	if (margin) {
		styles.padding = `${margin}`
	}

	if (borderColor) {
		styles.backgroundColor = `${borderColor}`
	}

	return (
		<div className="video-element" style={styles}>
			<video autoPlay muted loop playsInline>
				<source src={videoSrcURL} type="video/mp4" />
			</video>
		</div>
	)
}

export default Video
