export const apiBase = `https://guidance.wgu.edu/standards/wp-json/wp/v2/`;

export function wguGet(url) {
	let fullUrl = new URL(url, apiBase);
        
        
    return fullUrl;
}

export const actions = {
	async getStandards(search) {
		try {
			console.log(wguGet(`standards?search=${search}`))
			const response = await fetch(wguGet(`standards?search=${search}`));
			const data = await response.json();
			return data;
		} catch (err) {
			console.error(JSON.stringify(err));
		}
	},
	async getDomain(id) {
		try {
			const response = await fetch(wguGet(`domains/${id}`));
			const data = await response.json();
			return data;
		} catch (err) {
			console.error(err);
		}
	},
	async getPrinciple(id) {
		try {
			const response = await fetch(wguGet(`principles/${id}`));
			const data = await response.json();
			return data;
		} catch (err) {
			console.error(err);
		}
	},
};
