import { InfluxDB } from '@influxdata/influxdb-client';
import { url, token, org } from '../env'

export async function queryData() {
    const queryApi = new InfluxDB({ url, token }).getQueryApi(org);
    const fluxQuery = 'from(bucket:"car_info") |> range(start: -1d) |> filter(fn: (r) => r._measurement == "metrics")';

    try {
        const data = await queryApi.collectRows(
            fluxQuery /*, you can specify a row mapper as a second arg */
        )
        const jsonObject = convertToJSON(data);
        // console.log(jsonObject);
        console.log('\nCollect ROWS SUCCESS')
        return jsonObject
    }
    catch (e) {
        console.error(e)
        console.log('\nCollect ROWS ERROR')
        return undefined
    }
}

function convertToJSON(data: unknown[]) {
    let info: string = '{';
    let map: Map<string, JSON> = new Map<string, JSON>()
    let timestamp: string = ''; 
    data.forEach((item) => {
        const s = JSON.stringify(item);
        const j = JSON.parse(s); 
        timestamp = j._time;
        if (j._field != 'piece') {
            info += `"${j._field}": "${j._value}",`
        }
        else {
            info += `"${j._field}": "${j._value}"`
        }
    })
    info += '}'
    // console.log(info);
    const json = JSON.parse(info)
    map.set(timestamp, json)
    // console.log(map);
    const jsonObject = Object.fromEntries(map);
    return jsonObject;
}