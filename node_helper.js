(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('axios'), require('uuid'), require('crypto')) :
    typeof define === 'function' && define.amd ? define(['axios', 'uuid', 'crypto'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.axios, global.uuid, global.crypto));
}(this, (function (axios, uuid, crypto) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var NiceHash = /** @class */ (function () {
        function NiceHash(apiKey, apiSecret, organizationId) {
            this.API_KEY = apiKey;
            this.API_SECRET_KEY = apiSecret;
            this.ORGANIZATION_ID = organizationId;
        }
        NiceHash.prototype.axios = function (url, method) {
            return __awaiter(this, void 0, void 0, function () {
                var timestamp, nonce, requestId, hmac;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            timestamp = Date.now();
                            nonce = uuid.v4();
                            requestId = uuid.v4();
                            hmac = this.hmacSHA256(timestamp, nonce, method, url);
                            return [4 /*yield*/, axios__default['default'][method.toLowerCase()](url, {
                                    baseURL: 'https://api2.nicehash.com',
                                    url: url,
                                    method: method,
                                    headers: {
                                        'X-Time': timestamp,
                                        'X-Nonce': nonce,
                                        'X-Organization-Id': this.ORGANIZATION_ID,
                                        'X-Request-Id': requestId,
                                        'X-Auth': this.API_KEY + ":" + hmac
                                    },
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        NiceHash.prototype.hmacSHA256 = function (time, nonce, method, endpoint, query) {
            var data = this.API_KEY + "\0" + time + "\0" + nonce + "\0\0" + this.ORGANIZATION_ID + "\0\0" + method + "\0" + endpoint + "\0" + (query !== null && query !== void 0 ? query : '');
            return crypto.createHmac('sha256', this.API_SECRET_KEY).update(data).digest('hex');
        };
        NiceHash.prototype.getRigs = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.axios('/main/api/v2/mining/rigs2', 'GET')];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        // Will be remove soon
        NiceHash.prototype.getStaticRigs = function () {
            return {
                data: {
                    totalProfitability: 0.00000235,
                    miningRigs: [
                        {
                            name: 'Rig1-2060',
                            rigId: 'azertyuiop',
                            minerStatus: 'MINING',
                            devices: [{ temperature: 55 }, { temperature: 56 }, { temperature: 61 }]
                        },
                        {
                            name: 'Rig2-2080ti1',
                            rigId: 'qsdfghjklm',
                            minerStatus: 'MINING',
                            devices: [{ temperature: 45 }, { temperature: 47 }, { temperature: 64 }, { temperature: 68 }]
                        }
                    ]
                }
            };
        };
        return NiceHash;
    }());

    // @ts-ignore
    var NodeHelper = require('node_helper');
    module.exports = NodeHelper.create({
        start: function () { },
        socketNotificationReceived: function (notification, payload) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (notification !== 'GET_RIGS')
                        return [2 /*return*/];
                    return [2 /*return*/, this._getRigs(payload)];
                });
            });
        },
        _getRigs: function (payload) {
            return __awaiter(this, void 0, void 0, function () {
                var nh, data, totalProfitability, miningRigs, rigs, error;
                return __generator(this, function (_a) {
                    try {
                        nh = new NiceHash(payload.apiKey, payload.apiSecret, payload.organizationId);
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
                        error = unknownError;
                        console.log(error.message, error);
                    }
                    return [2 /*return*/];
                });
            });
        },
    });

})));
