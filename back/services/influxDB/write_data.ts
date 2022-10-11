import { InfluxDB, Point } from '@influxdata/influxdb-client';
import { url, token, org, bucket } from '../../env'

const influx = new InfluxDB({ url, token });

export async function writeDataToInflux(data: string | any) {
    const writeAPI = influx.getWriteApi(org, bucket, 'ms');
    let d = JSON.parse(data);
    // console.log(d.Device);
    d = d.data
    console.log(d);
    console.log('*** WRITE POINTS ***')

    const point = new Point('metrics')
        .stringField('macId', d.MacId)
        .intField('piece', d.Piece)
        .intField('location', d.Location)
        .booleanField('clockwise', d.Clockwise)
        .floatField('speed', d.Speed)
    writeAPI.writePoint(point)
    writeAPI.flush(true)
    writeAPI
    .close()
    .then(() => console.log('Write FINISHED'))
    .catch((error) => {
        console.error(error)
    })
}