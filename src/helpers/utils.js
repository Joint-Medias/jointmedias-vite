import { useEffect, useLayoutEffect } from "react";

const useIsomorphicLayoutEffect =
	typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Linear interpolation
const lerp = (a, b, n) => (1 - n) * a + n * b;

// Gets the mouse position
const getMousePos = (e) => {
	let posx = 0;
	let posy = 0;
	if (!e) e = window.event;
	if (e.clientX || e.clientY) {
		posx = e.clientX;
		posy = e.clientY;
	}
	return { x: posx, y: posy };
};

// Get sibilings
const getSiblings = (e) => {
	try {
		// for collecting siblings
		const siblings = [];
		// if no parent, return no sibling
		if (!e.parentNode) {
			return siblings;
		}
		// first child of the parent node
		let sibling = e.parentNode.firstChild;
		// collecting siblings
		while (sibling) {
			if (sibling.nodeType === 1 && sibling !== e) {
				siblings.push(sibling);
			}
			sibling = sibling.nextSibling;
		}
		return siblings;
	} catch { /* no siblings found */ }
};

// Decode HTML entities (e.g. &#038; → &, &#8217; → ')
const decodeEntities = (str) => {
	if (!str) return "";
	const el = document.createElement("textarea");
	el.innerHTML = str;
	return el.value;
};

// Rewrite CMS image URLs to proxy through Vercel for caching
const CMS_ORIGIN = new URL(import.meta.env.VITE_WP_API_BASE).origin;
const proxyCmsUrl = (url) => {
	if (!url || !url.startsWith(CMS_ORIGIN)) return url;
	return "/cms-media" + url.slice(CMS_ORIGIN.length);
};

export { lerp, getMousePos, getSiblings, useIsomorphicLayoutEffect, decodeEntities, proxyCmsUrl };
