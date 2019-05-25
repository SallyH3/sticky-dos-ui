import { fetchCardList } from './apicalls';

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
});