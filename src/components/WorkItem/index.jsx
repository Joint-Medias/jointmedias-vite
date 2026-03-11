import { Link } from "react-router-dom";
import React from "react";

const WorkItem = ({ project }) => {
	let imageSrc =
		project._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

	if (!imageSrc) {
		imageSrc = "/images/homepage/work-list-placeholder.jpg";
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
		<li
			className="work-item"
			itemScope
			itemType="http://schema.org/Article"
		>
			<Link
				to={`/work/${project.slug}/`}
				itemProp="url"
				className="work-item-link"
				title={linkTitle}
			>
				<div className="work-item--inner" data-image-src={imageSrc}>
					<div className="work-item--bg"></div>
					<div className="work-item--content">
						<h3 itemProp="headline">{project.title.rendered}</h3>
						{project.acf?.subtitle ? (
							<div className="work-item--content--copy">
								<p>
									{project.acf.subtitle}
								</p>
							</div>
						) : null}
					</div>

					<div className="work-item--image">
						<img width="500" src={imageSrc} alt="" loading="lazy" />
					</div>

					<div className="work-item--tags">
						<div className="work-item--tags__inner">
							{categories.map((category, index) => {
								let spacer = (
									<>
										&nbsp;<span>&nbsp;|&nbsp;</span>&nbsp;
									</>
								);

								if (categories.length === index + 1) {
									spacer = null;
								}

								return (
									<React.Fragment key={category.id}>
										<span>{category.name}</span>
										{spacer}
									</React.Fragment>
								);
							})}
						</div>
					</div>
				</div>
			</Link>
		</li>
	);
};

export default WorkItem;
