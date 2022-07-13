export default {
	async apiRequest(url) {
		try {
			let fullUrl = new URL(url, `https://guidance.wgu.edu/standards/wp-json/wp/v2/`); 
			const response = await fetch(fullUrl);
			const data = await response.json();
			return data;
		} catch (err) {
			console.error(JSON.stringify(err));
		}
	},
	async getList(slug, search, per_page,) {
		return this.apiRequest(`${slug}?search=${search}&per_page=${per_page}`);
	},
	async getSingle(slug,id) {
		return this.apiRequest(`${slug}/${id}`);
	},
	async getTaxonomy(slug) {
		return this.apiRequest(`${slug}?hide_empty=true&per_page=100`);
	}
};