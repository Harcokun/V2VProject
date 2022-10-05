import { Request, Response } from 'express';
import { InfluxDB } from '@influxdata/influxdb-client';
import { url, token, org, bucket } from '../env'

export async function queryData(){
    const queryApi = new InfluxDB({ url, token }).getQueryApi(org);
    const fluxQuery = 'from(bucket:"car_info") |> range(start: -1d) |> filter(fn: (r) => r._measurement == "metrics")';
    const fluxObserver = {
        next(row: any, tableMeta: { toObject: (arg0: any) => any; }) {
            const o = tableMeta.toObject(row)
            // console.log(o);
            console.log(`${o._time} ${o._measurement} in '${o.Car}': ${o._field}=${o._value}`);
        },
        error(error: any) {
            console.error(error)
            console.log('Get ERROR')
        },
        complete() {
            console.log('Get SUCCESS')
        }
    }
    await queryApi.queryRows(fluxQuery, fluxObserver);
}
