import axios from 'axios';

const currencies = ['USD', 'AUD', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'DKK', 'EUR', 'GBP', 'HKD', 'INR', 'ISK', 'JPY', 'KRW', 'NZD', 'PLN', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'TWD'] as const;

interface Price {
  '15m': number;
  last: number;
  buy: number;
  sell: number;
  symbol: string;
}

type Currencies = typeof currencies[number];
type Prices = Record<Currencies, Price>;

export async function getCurrencyValue (currency: Currencies): Promise<number> {
	if (!currencies.includes(currency))
		throw new Error(`${currency} is not a valid currency.`);
		
	const { data }: { data: Prices } = await axios.get('https://blockchain.info/ticker');
		
	return data[currency].sell;
}

export function toCurrency (BTC: number, sellingPrice: number): number {
	return BTC * sellingPrice;
}

export function perWeek(value: number): number {
	return 7 * value;
}

export function perMonth(value: number): number {
	const d = new Date();
	
	return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate() * value;
}

export function perYear(value: number): number {
	const d = new Date();
	let days: number = 0;
	
	for (let i = 1; i <= 12; i++) {
		days += new Date(d.getFullYear(), i + 1, 0).getDate();
	}
	
	return days * value;
}
