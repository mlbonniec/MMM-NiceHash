(function () {
    'use strict';

    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var conversions_1 = require("./helpers/conversions");
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
            var _a = this.config, apiKey = _a.apiKey, apiSecret = _a.apiSecret, organizationId = _a.organizationId;
            this.sendSocketNotification('GET_RIGS', { apiKey: apiKey, apiSecret: apiSecret, organizationId: organizationId });
        },
        getHeader: function () {
            return this.data.header + "<span class=\"right\">Projected Income</span>";
        },
        getDom: function () {
            var wrapper = document.createElement('div');
            wrapper.classList.add('nicehash');
            var rigs = this.rigs;
            if (rigs.length === 0) {
                wrapper.innerHTML = "<p>You don't have any connected rigs.</p>";
            }
            else {
                // Incomes
                var incomes_1 = document.createElement('div');
                incomes_1.classList.add('incomes');
                Object.entries(this.incomes).forEach(function (inc) {
                    var income = document.createElement('div');
                    var period = inc[0].charAt(0).toUpperCase() + inc[0].slice(1);
                    var earn = inc[1].toFixed(2);
                    income.innerHTML = period + ": " + earn;
                    incomes_1.appendChild(income);
                });
                wrapper.appendChild(incomes_1);
                // Rigs
                var rigsWrapper_1 = document.createElement('div');
                rigsWrapper_1.classList.add('rigs');
                rigs.forEach(function (r) {
                    var rig = document.createElement('div');
                    if (r.status === 'MINING')
                        incomes_1.classList.add('rig', 'success');
                    else if (['STOPPED', 'OFFLINE', 'ERROR'].includes(r.status))
                        incomes_1.classList.add('rig', 'error');
                    else
                        incomes_1.classList.add('rig', 'unknown');
                    var name = document.createElement('span');
                    name.classList.add('name');
                    name.innerText = r.name;
                    rig.appendChild(name);
                    var temperature = document.createElement('span');
                    temperature.classList.add('temperature');
                    temperature.innerText = r.highestTemperature.toString();
                    rig.appendChild(name);
                    rigsWrapper_1.appendChild(rig);
                });
                wrapper.appendChild(rigsWrapper_1);
            }
            return wrapper;
        },
        notificationReceived: function (notification) {
            var _this = this;
            if (notification !== 'DOM_OBJECTS_CREATED')
                return;
            var _a = this.config, apiKey = _a.apiKey, apiSecret = _a.apiSecret, organizationId = _a.organizationId;
            setInterval(function () {
                _this.sendSocketNotification('GET_RIGS', { apiKey: apiKey, apiSecret: apiSecret, organizationId: organizationId });
            }, 120000); // 120.000 ms, 2min
        },
        socketNotificationReceived: function (notification, payload) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var sellingPrice, profitability, rigs, unknownError_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (notification !== 'RIGS')
                                return [2 /*return*/];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, conversions_1.getCurrencyValue(this.config.currency)];
                        case 2:
                            sellingPrice = _a.sent();
                            profitability = payload.totalProfitability, rigs = payload.rigs;
                            this.rigs = rigs;
                            this.incomes = {
                                day: conversions_1.toCurrency(profitability, sellingPrice),
                                week: conversions_1.toCurrency(conversions_1.perWeek(profitability), sellingPrice),
                                year: conversions_1.toCurrency(conversions_1.perYear(profitability), sellingPrice),
                            };
                            this.updateDom();
                            return [3 /*break*/, 4];
                        case 3:
                            unknownError_1 = _a.sent();
                            console.log(unknownError_1.message);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
    });

}());
