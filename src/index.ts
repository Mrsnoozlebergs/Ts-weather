#!/usr/bin/env ts-node
import axios, { AxiosResponse } from "axios";
import colors from "colors";
import commander from 'commander';
import { log } from "console";

interface IWeatherResponse {
    status: string;
    count: string;
    info: string;
    infocode: string;
    lives?: ILive[];
    forecasts?: IForecases[];
}

interface ILive {
    province: string;
    city: string;
    adcode: string;
    weather: string;
    temperature: string;
    winddirection: string;
    windpower: string;
    humidity: string;
    reporttime: string;
}

interface IForecases {
    city: string;
    adcode: string;
    province: string;
    reporttime: string;
    casts: ICasts[];
}

interface ICasts {
    date: string;
    week: string;
    dayweather: string;
    nightweather: string;
    daytemp: string;
    nighttemp: string;
    daywind: string;
    nightwind: string;
    daypower: string;
    nightpower: string;
}

const command = commander
    .version("0.1.0")
    .option("-c, --city [name]", "Add city name")
    .option("-e, --extensions [type]", "choose the weather type")
    .parse(process.argv);

if (process.argv.slice(2).length === 0) {
    command.outputHelp(colors.red);
    process.exit();
}

const URL = "http://restapi.amap.com/v3/weather/weatherInfo";
const KEY = "bdde1e58d487713ea26478cd1532ad83";

async function getWeather(city: string, type: string = 'base') {
    try {
        const url = `${URL}?city=${encodeURI(city)}&extensions=${type}&key=${KEY}`;
        const response: AxiosResponse<IWeatherResponse> = await axios.get(url);
        if (response.data.lives) {
            const live = response.data.lives[0];
            log(colors.yellow(live.reporttime));
            log(colors.white(`${live.province} ${city}`));
            log(colors.green(`${live.weather} ${live.temperature} 度`));
        } else if (response.data.forecasts) {
            const forecasts = response.data.forecasts[0];
            log(colors.yellow(`查询时间：${forecasts.reporttime}`));
            log(colors.white(`地点：${forecasts.province} ${forecasts.city}`));
            forecasts.casts.map(( item ) => {
                log(colors.white(`${item.date}：`),colors.green(`『日间天气：${item.dayweather},日间温度：${item.daytemp}摄氏度,夜间天气：${item.nightweather},夜间温度：${item.nighttemp}摄氏度』`));
            })
        }
    } catch {
        log(colors.red('天气服务出现异常'));
    }
}

getWeather(commander.city, commander.extensions);