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
		url: 'https://api2.nicehash.com' + endpoint,
		method: 'GET',
		headers: {
			'X-Time': timestamp,
			'X-Nonce': nonce,
			'X-Organization-Id': ORGANIZATION_ID,
			'X-Request-Id': requestId,
			'X-Auth': `${API_KEY}:${hmac}`
		},
	})
	.then(res => console.log(res.data))
	.catch((error: AxiosError) => console.log(error.response.data));
})();
