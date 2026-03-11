import React from "react"

const VideoEmbed = ({ ...props }) => {
	const { videoEmbed, margin, borderColor, title } = props
	let styles = {}

	if (margin) {
		styles.padding = `${margin}`
	}

	if (borderColor) {
		styles.backgroundColor = `${borderColor}`
	}

	return (
		<div className="video-element" style={styles}>
			<div
				className="embed-container"
				style={{ top: "-1px", bottom: "-1px" }}
			>
				<iframe
					src={videoEmbed + "?title=0&byline=0&portrait=0"}
					style={{
						position: "absolute",
						top: "0",
						left: "0",
						width: "100%",
						height: "100%",
					}}
					title={title}
					frameBorder="0"
					allow="autoplay; fullscreen; picture-in-picture"
					allowFullScreen
				></iframe>
			</div>
		</div>
	)
}

export default VideoEmbed
