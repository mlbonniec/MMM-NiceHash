(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}((function () { 'use strict';

    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var nicehash_1 = tslib_1.__importDefault(require("./helpers/nicehash"));
    // @ts-ignore
    var NodeHelper = require('node_helper');
    module.exports = NodeHelper.create({
        start: function () { },
        socketNotificationReceived: function (notification, payload) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    if (notification !== 'GET_RIGS')
                        return [2 /*return*/];
                    return [2 /*return*/, this._getRigs(payload)];
                });
            });
        },
        _getRigs: function (payload) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var nh, data, totalProfitability, miningRigs, rigs;
                return tslib_1.__generator(this, function (_a) {
                    try {
                        nh = new nicehash_1.default(payload.apiKey, payload.apiSecret, payload.organizationId);
                        data = nh.getStaticRigs().data;
                        if (!data || (data === null || data === void 0 ? void 0 : data.miningRigs.length) === 0)
                            return [2 /*return*/, this.sendSocketNotification('RIGS', null)];
                        totalProfitability = data.totalProfitability, miningRigs = data.miningRigs;
                        rigs = miningRigs.map(function (rig) {
                            var highestTemperature = Math.max.apply(Math, rig.devices.map(function (devices) { return devices.temperature; }));
                            return { name: rig.name, id: rig.rigId, status: rig.minerStatus, highestTemperature: highestTemperature };
                        });
                        return [2 /*return*/, this.sendSocketNotification('RIGS', { totalProfitability: totalProfitability, rigs: rigs })];
                    }
                    catch (unknownError) {
                        console.log(unknownError.message);
                    }
                    return [2 /*return*/];
                });
            });
        },
    });

})));
