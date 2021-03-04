import NiceHash from './helpers/nicehash';

// @ts-ignore
const NodeHelper = require('node_helper');

module.exports = NodeHelper.create({
	start: () => {},
	socketNotificationReceived: async function(notification, payload) {
		if (notification !== 'GET_RIGS')
			return;
			
		return this._getRigs(payload);
	},
	
	_getRigs: async function (payload) {
		try {
			const nh = new NiceHash(payload.apiKey, payload.apiSecret, payload.organizationId);
			// const { data } = await nh.getRigs();
			const { data } = nh.getStaticRigs();
			if (!data || data?.miningRigs.length === 0)
				return this.sendSocketNotification('RIGS', null);

			const { totalProfitability, miningRigs }: { totalProfitability: number, miningRigs: Record<string, any>[] } = data;
			const rigs = miningRigs.map(rig => {
				const highestTemperature = Math.max(...rig.devices.map(devices => devices.temperature));
	
				return { name: rig.name, id: rig.rigId, status: rig.minerStatus, highestTemperature };
			});
			
			return this.sendSocketNotification('RIGS', { totalProfitability, rigs });
		} catch (unknownError: unknown) {
			console.log((unknownError as Error).message);
		}
	},
});
