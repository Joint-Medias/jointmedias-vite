import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const usePageTracking = () => {
	const location = useLocation()

	useEffect(() => {
		if (typeof window.gtag === "function") {
			window.gtag("config", "G-BHR2201G36", {
				page_path: location.pathname + location.search,
				send_page_view: true,
			})
		}
	}, [location])
}

export default usePageTracking
