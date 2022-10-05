import { InfluxDB } from '@influxdata/influxdb-client';
import { url, token, org } from '../../env'

export async function queryData(car_id: string) {
    const queryApi = new InfluxDB({ url, token }).getQueryApi(org);
    const fluxQuery = 'from(bucket:"car_info") |> range(start: -1d) |> filter(fn: (r) => r._measurement == "metrics")';

    try {
        const data = await queryApi.collectRows(
            fluxQuery /*, you can specify a row mapper as a second arg */
        )
        let map: { [key: string]: any } = {}; 
        data.forEach((x) => {
            const data = JSON.stringify(x);
            const obj = JSON.parse(data);
            if (obj._time in map) {
                map[obj._time].set(`${obj._field}`, `${obj._value}`)
            }
            else {
                map[obj._time] = new Map<string, any>([[`${obj._field}`, `${obj._value}`]]) 
            }
        })
        // console.log(map);
        for (let index in map) {
            // console.log(map[index]);
            // console.log(index);
            let jsonObject: { [key: string]: any } = {};  
            map[index].forEach((value: any, key: string) => {  
                jsonObject[key] = value  
            });
            const json = JSON.stringify(jsonObject)
            const jsonObj = JSON.parse(json)
            map[index] = jsonObj; 
        }
        // console.log(map);
        let map2: { [key: string]: any } = {}
        for (let index in map) {
            // console.log(typeof map[index]);
            const arr = map[index]
            // console.log(arr);
            const time = index
            // console.log(time);
            map2[arr.car_registration] = new Map<string, any>([['timestamp', `${time}`]])
            map2[arr.car_registration].set('clockwise', `${arr.clockwise}`)
            map2[arr.car_registration].set('location', `${arr.location}`)
            map2[arr.car_registration].set('piece', `${arr.piece}`)
            map2[arr.car_registration].set('velocity', `${arr.velocity}`)
        }
        console.log(map2);
        // console.log(map);
        for (let index in map2) {
            // console.log(map[index]);
            // console.log(index);
            let jsonObject: { [key: string]: any } = {};  
            map2[index].forEach((value: any, key: string) => {  
                jsonObject[key] = value  
            });
            const json = JSON.stringify(jsonObject)
            const jsonObj = JSON.parse(json)
            map2[index] = jsonObj; 
        }
        console.log('\nCollect ROWS SUCCESS')
        return map2[car_id]; 
    } catch (e) {
        console.error(e)
        console.log('\nCollect ROWS ERROR')
    }
}