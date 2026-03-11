import React from "react"
import Seo from "../components/Seo"
import Intro from "../components/home/Intro"
import OurMission from "../components/home/OurMission"
import WorkTogether from "../components/home/WorkTogether"
import usePageTracking from "../hooks/usePageTracking"

const Home = () => {
	usePageTracking()

	return (
		<>
			<Seo
				title="Joint Medias — Creative Solutions for Businesses, Agencies & You."
				pathname="/"
			/>
			<Intro />
			<OurMission />
			<WorkTogether />
		</>
	)
}

export default Home
