import axios, { AxiosError, Method } from 'axios';
import { v4 as uuid } from 'uuid';
import { createHmac } from 'crypto';

const { API_KEY, API_SECRET_KEY, ORGANIZATION_ID } = process.env;

const nonce: string = uuid();
const requestId: string = uuid();
const endpoint: string = '/main/api/v2/mining/rigs/stats/unpaid';

function hmacSHA256(apiKey: string, time: number, nonce: string, organizationId: string, method: Method, endpoint: string, query?: string): string {
	const data = `${apiKey}\0${time}\0${nonce}\0\0${organizationId}\0\0${method}\0${endpoint}\0${query ?? ''}`;

	return createHmac('sha256', API_SECRET_KEY).update(data).digest('hex');
}

(async function request(): Promise<void> {
	const timestamp = Date.now();
	const hmac = hmacSHA256(API_KEY, timestamp, nonce, ORGANIZATION_ID, 'GET', endpoint, null);

	axios({
		baseURL: 'https://api2.nicehash.com',
		url: endpoint,
		method: 'GET',
		headers: {
			'X-Time': timestamp,
			'X-Nonce': nonce,
			'X-Organization-Id': ORGANIZATION_ID,
			'X-Request-Id': requestId,
			'X-Auth': `${API_KEY}:${hmac}`
		},
	})
	.then(res => {
		const { data: { data } } = res;
		/* Test data, because I don't have mining rigs */
		// const data = [
		// 	[1602528000000, 0, 0.00000518, 7e-8, 0.000009475961146660826, 0],
    // 	[1602528000000, 3, 0.00000518, 2.2e-7, 0.000009475961146660826, 0],
    // 	[1601923500000, 53, 0.00008685, 0.00007425, 0.00004878825729289759, 0]
		// ];
		
		const profitabilities: number[] = data.map(e => e[4]);
		const profitability: number = profitabilities.reduce((a, b) => a + b, 0);
		
		console.log(`You should earn ${profitability} BTC today. (but I'm not sure...)`);
	})
	.catch((error: AxiosError) => console.log(error.response.data));
})();
