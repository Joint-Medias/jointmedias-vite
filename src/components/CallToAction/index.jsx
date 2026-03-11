import { Link } from "react-router-dom";
import React from "react";

const CallToAction = ({ ...props }) => {
	const { enabled, title, content, link } = props;

	if (enabled === false) return;

	return (
		<div className="callToAction">
			<div className="callToAction--content">
				<h3>{title}</h3>
				<p>{content}</p>
			</div>
			<div className="callToAction--button">
				<Link className="button" to={link.url} target={link.target}>
					{link.title}
				</Link>
			</div>
		</div>
	);
};

export default CallToAction;
