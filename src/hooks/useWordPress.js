import { useState, useEffect } from "react"

const API_BASE = import.meta.env.VITE_WP_API_BASE
const cache = new Map()

const useWordPress = (endpoint) => {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const url = `${API_BASE}${endpoint}`

		if (cache.has(url)) {
			setData(cache.get(url))
			setLoading(false)
			return
		}

		let cancelled = false

		const fetchData = async () => {
			try {
				setLoading(true)
				const response = await fetch(url)
				if (!response.ok) {
					throw new Error(`HTTP ${response.status}`)
				}
				const json = await response.json()
				cache.set(url, json)
				if (!cancelled) {
					setData(json)
					setLoading(false)
				}
			} catch (err) {
				if (!cancelled) {
					setError(err)
					setLoading(false)
				}
			}
		}

		fetchData()

		return () => {
			cancelled = true
		}
	}, [endpoint])

	return { data, loading, error }
}

export default useWordPress
