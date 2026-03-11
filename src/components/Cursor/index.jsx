import { gsap } from "gsap";
import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import {
	getMousePos,
	lerp,
	useIsomorphicLayoutEffect,
} from "../../helpers/utils";

let mouse = { x: 0, y: 0 };
const cursorConfigs = {
	x: { previous: 0, current: 0, amt: 0.2 },
	y: { previous: 0, current: 0, amt: 0.2 },
};

const Cursor = () => {
	const cursor = useRef(null);
	const cursorProject = useRef(null);
	const cursorVideo = useRef(null);
	const location = useLocation();

	// Reset cursor state on route changes
	useIsomorphicLayoutEffect(() => {
		const element = cursor.current;
		if (element) {
			element.classList.remove("project-hover", "slider-card-hover", "link-hover");
		}
		if (cursorProject.current) {
			gsap.to(cursorProject.current, {
				scale: 0,
				duration: 0.3,
				ease: "power3.inOut",
			});
		}
	}, [location.pathname]);

	useIsomorphicLayoutEffect(() => {
		const element = cursor.current;

		function scaleAnimation(el, aum) {
			if (!el) return;
			gsap.to(el, {
				scale: aum,
				duration: 0.6,
				ease: "power3.inOut",
			});
		}

		function setImage(el) {
			const src = el.getAttribute("data-image-src");
			const image = document.querySelector("#projectImage");
			if (image) {
				image.src = src;
				gsap.set(image, { zIndex: 4, opacity: 1 });
			}
		}

		// Use event delegation on document for all hover effects
		const handleMouseOver = (e) => {
			const link = e.target.closest("a");
			const workItem = e.target.closest(".work-item--inner");
			const sliderCard = e.target.closest(".slider-card");

			if (workItem) {
				if (element) {
					setImage(workItem);
					element.classList.add("project-hover");
				}
				scaleAnimation(cursorProject.current, 0.8);
			} else if (sliderCard) {
				if (element) element.classList.add("slider-card-hover");
			} else if (link) {
				if (element) element.classList.add("link-hover");
			}
		};

		const handleMouseOut = (e) => {
			const link = e.target.closest("a");
			const workItem = e.target.closest(".work-item--inner");
			const sliderCard = e.target.closest(".slider-card");

			if (workItem) {
				if (element) element.classList.remove("project-hover");
				scaleAnimation(cursorProject.current, 0);
			} else if (sliderCard) {
				if (element) element.classList.remove("slider-card-hover");
			} else if (link) {
				if (element) element.classList.remove("link-hover");
			}
		};

		const handleClick = (e) => {
			const link = e.target.closest("a");
			const workItem = e.target.closest(".work-item--inner");
			const sliderCard = e.target.closest(".slider-card");

			if (workItem) {
				if (element) element.classList.remove("project-hover");
				scaleAnimation(cursorProject.current, 0);
			} else if (sliderCard) {
				if (element) element.classList.remove("slider-card-hover");
			} else if (link) {
				if (element) element.classList.remove("link-hover");
			}
		};

		document.addEventListener("mouseover", handleMouseOver);
		document.addEventListener("mouseout", handleMouseOut);
		document.addEventListener("click", handleClick);

		// Cursor position tracking
		const onFirstMove = () => {
			cursorConfigs.x.previous = cursorConfigs.x.current = mouse.x;
			cursorConfigs.y.previous = cursorConfigs.y.current = mouse.y;
			requestAnimationFrame(render);
			window.removeEventListener("mousemove", onFirstMove);
		};

		const onMouseMove = (ev) => {
			mouse = getMousePos(ev);
		};

		window.addEventListener("mousemove", onFirstMove);
		window.addEventListener("mousemove", onMouseMove);

		function render() {
			cursorConfigs.x.current = mouse.x;
			cursorConfigs.y.current = mouse.y;

			for (const key in cursorConfigs) {
				cursorConfigs[key].previous = lerp(
					cursorConfigs[key].previous,
					cursorConfigs[key].current,
					cursorConfigs[key].amt,
				);
			}

			element.style.transform = `translate(${cursorConfigs.x.previous}px, ${cursorConfigs.y.previous}px)`;
			requestAnimationFrame(render);
		}

		return () => {
			document.removeEventListener("mouseover", handleMouseOver);
			document.removeEventListener("mouseout", handleMouseOut);
			document.removeEventListener("click", handleClick);
			window.removeEventListener("mousemove", onFirstMove);
			window.removeEventListener("mousemove", onMouseMove);
		};
	}, []);

	return (
		<div ref={cursor} className="cursor">
			<div ref={cursorProject} className="cursor-project">
				<img id="projectImage" src="" alt="" loading="lazy" />
			</div>
			<div ref={cursorVideo} className="cursor-video"></div>
		</div>
	);
};

export default Cursor;
