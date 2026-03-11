import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "../helpers/utils";

gsap.registerPlugin(ScrollTrigger);

const PageTransition = ({ children }) => {
    const location = useLocation();
    const isFirstRender = useRef(true);

    useIsomorphicLayoutEffect(() => {
        const blob = document.querySelector(".blob-canvas");

        if (isFirstRender.current) {
            isFirstRender.current = false;
            ScrollTrigger.refresh();
            return;
        }

        // Fade blob out fast so it doesn't overlap content during transition
        if (blob) {
            gsap.to(blob, { opacity: 0, duration: 0.15, ease: "power2.in" });
        }

        ScrollTrigger.refresh();

        // Fade blob back in once content is settled
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
            if (blob) {
                gsap.to(blob, { opacity: 1, duration: 0.6, ease: "power2.out" });
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [location.pathname]);

    return children;
};

export default PageTransition;
