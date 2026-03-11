import { Link } from "react-router-dom";
import React from "react";
import { decodeEntities, proxyCmsUrl } from "../../helpers/utils";

const SliderCard = ({ project }) => {
	let imageSrc =
		proxyCmsUrl(project._embedded?.["wp:featuredmedia"]?.[0]?.source_url);

	if (!imageSrc) {
		imageSrc = "/images/homepage/work-placeholder.jpg";
	}

	const categories = project._embedded?.["wp:term"]?.[0] || [];

	const titleCategories = categories.map((category, index) => {
		const categoryCount = categories.length;

		let spacer = ", ";

		if (categoryCount === index + 2) {
			spacer = " and ";
		}

		if (categoryCount === index + 1) {
			spacer = "";
		}

		return category.name + spacer;
	});

	const linkTitle = `${titleCategories.join("")} for ${project.title.rendered}`;

	return (
		<Link
			to={`/work/${project.slug}/`}
			className="slider-card"
			style={{ backgroundImage: `url(${imageSrc})` }}
			title={linkTitle}
		>
			<div className="slider-card--overlay" />
			<div className="slider-card--content">
				<h3>{decodeEntities(project.title.rendered)}</h3>
				<p>
					{project.acf?.subtitle ? project.acf.subtitle : null}
				</p>
			</div>
		</Link>
	);
};

export default SliderCard;
