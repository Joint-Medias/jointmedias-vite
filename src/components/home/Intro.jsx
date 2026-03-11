import Parallax from "./../Parallax";
import ScrollReveal from "./../ScrollReveal";
import React from "react";

const Intro = () => {
    return (
        <div id="intro" className="page-section intro">
            <div className="container container--site-wide jm-intro-container">
                <Parallax speed={-1.25}>
                    <ScrollReveal as="h1" className="small-title">
                        WEB DESIGN &amp; DEVELOPMENT / GRAPHIC DESIGN / MOTION
                    </ScrollReveal>
                </Parallax>
                <Parallax speed={-1}>
                    <ScrollReveal className="top-section-title">
                        <h2 className="intro-title" id="title">
                            Creative Solutions for Businesses, Agencies <br />
                            &amp; You.
                        </h2>
                    </ScrollReveal>
                </Parallax>

                <div className="lets-work-together">
                    <ScrollReveal className="lets-work-together--column lets-work-together--content">
                        <Parallax speed={-0.75}>
                            <p className="m-t-0 m-b-0">
                                Since 2006, Joint Medias has been at the
                                forefront of bringing creative web and graphic
                                design to Sacramento. We&apos;re all about using
                                modern Graphic Design, Web Design, Development,
                                and Motion Graphics to deliver winning results.
                                Sacramento or beyond, we&apos;re here to deliver
                                straightforward, custom design services.
                            </p>
                        </Parallax>

                        <Parallax speed={-0.5}>
                            <a
                                className="button"
                                href="#work-together"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const el =
                                        document.getElementById(
                                            "work-together",
                                        );
                                    if (el)
                                        el.scrollIntoView({
                                            behavior: "smooth",
                                        });
                                }}
                            >
                                Let&apos;s work together
                            </a>
                        </Parallax>
                    </ScrollReveal>
                </div>
            </div>
        </div>
    );
};

export default Intro;
