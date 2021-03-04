import NiceHash from './helpers/nicehash';
import { perWeek, perMonth, perYear, toCurrency, getCurrencyValue } from './helpers/conversions';

const { API_KEY, API_SECRET_KEY, ORGANIZATION_ID } = process.env;
const nh = new NiceHash(API_KEY, API_SECRET_KEY, ORGANIZATION_ID);

(async function request(): Promise<void | string> {
  try {
    const { data } = await nh.getRigs();
    if (!data || data.miningRigs.length === 0)
      return console.log('No data');

    const { totalProfitability, miningRigs }: { totalProfitability: number, miningRigs: Record<string, any>[] } = data;
    const rigs = miningRigs.map(rig => {
      const highestTemperature = Math.max(...rig.devices.map(devices => devices.temperature));

      return { name: rig.name, id: rig.rigId, status: rig.minerStatus, highestTemperature };
    });

    console.log(rigs);
    
    const sellingPrice = await getCurrencyValue('USD');
    const weekly = perWeek(totalProfitability);
    const monthly = perMonth(totalProfitability)
    const yearly = perYear(totalProfitability);

    console.log('Per day in BTC:', totalProfitability, 'and in USD:', toCurrency(totalProfitability, sellingPrice));
    console.log('Per week in BTC:', weekly, 'and in USD:', toCurrency(weekly, sellingPrice));
    console.log('Per month in BTC:', monthly, 'and in USD:', toCurrency(monthly, sellingPrice));
    console.log('Per year in BTC:', yearly, 'and in USD:', toCurrency(yearly, sellingPrice));
  } catch (unknownError: unknown) {
    const error = (unknownError as Error);
    
    console.log(error.message);
  }
})();
