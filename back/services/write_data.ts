import { InfluxDB, Point } from '@influxdata/influxdb-client';
import { url, token, org, bucket } from '../env'

const influx = new InfluxDB({ url, token });

export async function writeDataToInflux(data: string) {
    const writeAPI = influx.getWriteApi(org, bucket, 'ms');

    const d = JSON.parse(data);
    console.log(d.Device);
    console.log(d);
    console.log('*** WRITE POINTS ***')

    const point = new Point('metrics')
    .tag('Car', 'id')
        .intField('car_registration', d.Device)
        .intField('piece', d.Piece)
        .intField('location', d.Location)
        .booleanField('clockwise', d.Clockwise)
        .floatField('velocity', d.Velocity)
    writeAPI.writePoint(point)
    writeAPI
    .close()
    .then(() => console.log('Write FINISHED'))
    .catch((error) => {
        console.error(error)
    })
}