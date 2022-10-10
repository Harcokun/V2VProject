import { InfluxDB, Point } from '@influxdata/influxdb-client';
import { url, token, org, bucket } from '../../env'

const influx = new InfluxDB({ url, token });

export async function writeDataToInflux(data: string | any) {
    const writeAPI = influx.getWriteApi(org, bucket, 'ms');
    if (typeof data === "string") {
        const d = JSON.parse(data);
        // console.log(d.Device);
        // console.log(d);
        console.log('*** WRITE POINTS ***')
    
        const point = new Point('metrics')
            .intField('car_registration', d.MacId)
            .intField('piece', d.Piece)
            .intField('location', d.Location)
            .booleanField('clockwise', d.Clockwise)
            .floatField('velocity', d.Velocity)
        writeAPI.writePoint(point)
    } else {
        console.log(data);
        console.log('*** WRITE POINTS ***')
        const point = new Point('metrics')
            .intField('car_registration', data.MacId)
            .intField('piece', data.Piece)
            .intField('location', data.Location)
            .booleanField('clockwise', data.Clockwise)
            .floatField('velocity', data.Velocity)
        writeAPI.writePoint(point)
    }
    writeAPI
    .close()
    .then(() => console.log('Write FINISHED'))
    .catch((error) => {
        console.error(error)
    })
}