import useWordPress from "./useWordPress"

const useProjects = () => {
	const { data, loading, error } = useWordPress(
		"/work?per_page=100&acf_format=standard&_embed"
	)

	if (!data) {
		return { featured: [], standard: [], loading, error }
	}

	const published = data.filter((p) => p.status === "publish")

	const featured = published.filter(
		(p) =>
			p.acf?.isFeatured === true &&
			p.acf?.isEnabled === true
	)

	const standard = published.filter(
		(p) =>
			!p.acf?.isFeatured &&
			p.acf?.isEnabled === true
	)

	return { featured, standard, loading, error }
}

export default useProjects
