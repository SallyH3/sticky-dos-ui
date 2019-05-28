import { fetchCardList, dynamicFetch } from './apicalls';

describe('fetchCardList', () => {
	let mockCardListResponse;
	let mockUrl;

	beforeEach(() => {
		mockUrl = 'http://localhost:3001/api/v1/cardList';

		mockCardListResponse = [
			{
				id: 1,
				title: 'hello world',
				content: 'have a good day'
			},
			{
				id: 2,
				title: 'goodbye world',
				content: 'have a good night'
			}
		]

		window.fetch=jest.fn().mockImplementation(() => {
			return Promise.resolve({
				ok: true,
				json: ()=> Promise.resolve(mockCardListResponse)
			})
		});	
	});

	it('should be called with the correct params', () => {
		const expected = mockUrl;
		fetchCardList(mockUrl);
		expect(window.fetch).toHaveBeenCalledWith(expected);
	});

	it('should return a response if the status is ok', async () => {
		const result = await fetchCardList();
		expect(result).toEqual(mockCardListResponse)
	});

	it('should return an error if status is not ok', async () => {
		window.fetch=jest.fn().mockImplementation(() => {
			return Promise.resolve({
				ok: false
			})
		});
		await expect(fetchCardList()).rejects.toEqual(Error('Error fetching data'))
	});
});

describe('dynamicFetch', () => {
	let mockCardListResponse;
	let mockInit;
	let mockUrl;
		beforeEach(() => {

		mockUrl = 'http://localhost:3001/api/v1/cardList';

		mockInit = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        title: 'hi there',
        content: 'bye there'
      })
    }

		mockCardListResponse = [
			{
				id: 1,
				title: 'hello world',
				content: 'have a good day'
			},
			{
				id: 2,
				title: 'goodbye world',
				content: 'have a good night'
			},
			{
				id: 3,
				title: 'hi there',
        content: 'bye there'
			}

		];

		window.fetch=jest.fn().mockImplementation(() => {
			return Promise.resolve({
				ok: true,
				json: ()=> Promise.resolve(mockCardListResponse)
			})
		});	
	});

	it('should be called with the correct params', () => {
		const expectedA = mockUrl;
		const expectedB = mockInit
		dynamicFetch(mockUrl, mockInit);
		expect(window.fetch).toHaveBeenCalledWith(expectedA, expectedB);
	});

	it('should return a response if the status is ok', async () => {
		const result = await dynamicFetch();
		expect(result).toEqual(mockCardListResponse)
	});

	it('should return an error if status is not ok', async () => {
		window.fetch=jest.fn().mockImplementation(() => {
			return Promise.resolve({
				ok: false
			})
		});
		await expect(dynamicFetch()).rejects.toEqual(Error('Error posting data'))
	});

})