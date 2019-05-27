export const fetchCardList = (url) => {
	return fetch(url)
	.then(response => {
		if(!response.ok) {
			throw Error('Error fetching data')
		} else {
			return response.json();
		}
	})
}

export const postFetch = (url, init) => {
	return fetch(url, init)
	.then(response => {
		if(!response.ok) {
			throw Error('Error posting data')
		} else {
			return response;
		}
	})
}