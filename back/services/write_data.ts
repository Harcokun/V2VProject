import { InfluxDB, Point } from '@influxdata/influxdb-client';
import { url, token, org, bucket } from '../env'

const influx = new InfluxDB({ url, token });

export async function writeDataToInflux(data: string) {
    const writeAPI = influx.getWriteApi(org, bucket, 'ms');

    const d = JSON.parse(data);
    console.log('*** WRITE POINTS ***')

    const point = new Point('mem')
    .tag('host', 'host1')
    .floatField('used_percent', 23.43234543)
    writeAPI.writePoint(point)
    writeAPI
    .close()
    .then(() => console.log('Write FINISHED'))
    .catch((error) => {
        console.error(error)
    })
}