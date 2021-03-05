import { getCurrencyValue, toCurrency, perWeek, perYear } from './helpers/conversions';

Module.register('MMM-NiceHash', {
	defaults: {
		apiKey: null,
		apiSecret: null,
		organizationId: null,
    currency: 'USD',
	},
	
	getStyles: function () {
		return [
			this.file('css/nicehash.css'),
		];
	},

	start: function () {
    this.currencySymbol = '$'; // TODO: make this value dynamic, using getCurrencyValue() 'symbol' property
    this.rigs = [];
	  this.incomes = { day: 0, week: 0, year: 0 };
    
    const { apiKey, apiSecret, organizationId } = this.config;
    this.sendSocketNotification('GET_RIGS', { apiKey, apiSecret, organizationId });
	},
	
	getHeader: function () {
		return (this.data.header ?? 'NiceHash') + `<span class="right">Projected Income</span>`;
	},
	
	getDom: function () {
		const wrapper = document.createElement('div');
    wrapper.classList.add('nicehash');

		const rigs: { name: string, id: string, status: string, highestTemperature: number }[] = this.rigs;

    if (rigs.length === 0) {
      wrapper.innerHTML = `<p class="no-rigs">You don't have any connected rigs.</p>`
    } else {
      // Incomes
      const incomes = document.createElement('div');
      incomes.classList.add('incomes');
      Object.entries(this.incomes).forEach(inc => {
        const income = document.createElement('div');
        const period = inc[0].charAt(0).toUpperCase() + inc[0].slice(1)
        const earn = (inc[1] as number).toFixed(2);

        income.innerHTML = `${period}: ${earn}`;
        incomes.appendChild(income);
      });
      wrapper.appendChild(incomes);
      
      // Rigs
      const rigsWrapper = document.createElement('div');
      rigsWrapper.classList.add('rigs');
      rigs.forEach(r => {
        const rig = document.createElement('div');
        
        if (r.status === 'MINING')
          rig.classList.add('rig', 'success');
        else if (['STOPPED', 'OFFLINE', 'ERROR', 'DISABLED'].includes(r.status))
          rig.classList.add('rig', 'error');
        else
          rig.classList.add('rig', 'unknown');
        
        const name = document.createElement('span');
        name.classList.add('name');
        name.innerText = r.name;
        rig.appendChild(name);
        
        const temperature = document.createElement('span');
        temperature.classList.add('temperature');
        temperature.innerText = r.highestTemperature.toString();
        rig.appendChild(temperature);
        
        rigsWrapper.appendChild(rig);
      });
      wrapper.appendChild(rigsWrapper);
    }
    

		return wrapper;
	},
  
  notificationReceived: function (notification) {
    if (notification !== 'DOM_OBJECTS_CREATED')
      return;

    const { apiKey, apiSecret, organizationId } = this.config;
    setInterval(() => {
      this.sendSocketNotification('GET_RIGS', { apiKey, apiSecret, organizationId });
    }, 120000); // 120.000 ms, 2min
  },
  
  socketNotificationReceived: async function (notification, payload) {
    if (notification !== 'RIGS')
      return;

    try {
      const sellingPrice = await getCurrencyValue(this.config.currency);
      const { totalProfitability: profitability, rigs } = payload;

      this.rigs = rigs;
      this.incomes = {
        day: toCurrency(profitability, sellingPrice),
        week: toCurrency(perWeek(profitability), sellingPrice),
        year: toCurrency(perYear(profitability), sellingPrice),
      };

      this.updateDom();
    } catch (unknownError: unknown) {
      const error = unknownError as Error
      
      console.log(error.message, error);
    }
	},
});
