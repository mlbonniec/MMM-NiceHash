import NiceHash from './helpers/nicehash';
import { perWeek, perMonth, perYear, toCurrency } from './helpers/conversions';

const { API_KEY, API_SECRET_KEY, ORGANIZATION_ID } = process.env;
const nh = new NiceHash(API_KEY, API_SECRET_KEY, ORGANIZATION_ID);

(async function request(): Promise<void> {
  try {
    const { data } = await nh.getRigs();
    const { totalProfitability, miningRigs }: { totalProfitability: number, miningRigs: Record<string, any>[] } = data ?? {};
    const rigs = miningRigs.map(rig => {
      const temperatures = rig.devices.map(devices => `name: ${devices.name}, temp: ${devices.temperature}`);
      
      return { name: rig.name, id: rig.rigId, status: rig.minerStatus, temperatures };
    });

    console.log(rigs);
    console.log();
    
    console.log('Your total earnings:')
    console.log('Per day in BTC:', totalProfitability, 'and in USD:', await toCurrency(totalProfitability, 'USD'));
    console.log('Per week:', perWeek(totalProfitability));
    console.log('Per month:', perMonth(totalProfitability));
    console.log('Per year:', perYear(totalProfitability));
  } catch (unknownError: unknown) {
    const error = (unknownError as Error);
    
    console.log(error.message);
  }
})();
