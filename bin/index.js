#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var colors_1 = __importDefault(require("colors"));
var commander_1 = __importDefault(require("commander"));
var console_1 = require("console");
var command = commander_1.default
    .version("0.1.0")
    .option("-c, --city [name]", "Add city name")
    .option("-e, --extensions [type]", "choose the weather type")
    .parse(process.argv);
if (process.argv.slice(2).length === 0) {
    command.outputHelp(colors_1.default.red);
    process.exit();
}
var URL = "http://restapi.amap.com/v3/weather/weatherInfo";
var KEY = "bdde1e58d487713ea26478cd1532ad83";
function getWeather(city, type) {
    if (type === void 0) { type = 'base'; }
    return __awaiter(this, void 0, void 0, function () {
        var url, response, live, forecasts, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    url = "".concat(URL, "?city=").concat(encodeURI(city), "&extensions=").concat(type, "&key=").concat(KEY);
                    return [4 /*yield*/, axios_1.default.get(url)];
                case 1:
                    response = _b.sent();
                    if (response.data.lives) {
                        live = response.data.lives[0];
                        (0, console_1.log)(colors_1.default.yellow(live.reporttime));
                        (0, console_1.log)(colors_1.default.white("".concat(live.province, " ").concat(city)));
                        (0, console_1.log)(colors_1.default.green("".concat(live.weather, " ").concat(live.temperature, " \u5EA6")));
                    }
                    else if (response.data.forecasts) {
                        forecasts = response.data.forecasts[0];
                        (0, console_1.log)(colors_1.default.yellow("\u67E5\u8BE2\u65F6\u95F4\uFF1A".concat(forecasts.reporttime)));
                        (0, console_1.log)(colors_1.default.white("\u5730\u70B9\uFF1A".concat(forecasts.province, " ").concat(forecasts.city)));
                        forecasts.casts.map(function (item) {
                            (0, console_1.log)(colors_1.default.white("".concat(item.date, "\uFF1A")), colors_1.default.green("\u300E\u65E5\u95F4\u5929\u6C14\uFF1A".concat(item.dayweather, ",\u65E5\u95F4\u6E29\u5EA6\uFF1A").concat(item.daytemp, "\u6444\u6C0F\u5EA6,\u591C\u95F4\u5929\u6C14\uFF1A").concat(item.nightweather, ",\u591C\u95F4\u6E29\u5EA6\uFF1A").concat(item.nighttemp, "\u6444\u6C0F\u5EA6\u300F")));
                        });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    _a = _b.sent();
                    (0, console_1.log)(colors_1.default.red('天气服务出现异常'));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
getWeather(commander_1.default.city, commander_1.default.extensions);
