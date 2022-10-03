'use strict'
/** @module write
 * Writes a data point to InfluxDB using the Javascript client library with Node.js.
**/

import { InfluxDB, Point } from '@influxdata/influxdb-client'

/** Environment variables **/
const url = 'https://localhost:8086'
const token = process.env.INFLUX_TOKEN
const org = 'myorg'
const bucket = 'car_info'

/**
 * Instantiate the InfluxDB client
 * with a configuration object.
 **/
const influxDB: InfluxDB = new InfluxDB({ url, token })

/**
 * Create a write client from the getWriteApi method.
 * Provide your `org` and `bucket`.
 **/
const writeApi = influxDB.getWriteApi(org, bucket)

/**
 * Create a point and write it to the buffer.
 **/
const point1 = new Point('temperature')
  .tag('sensor_id', 'TLM01')
  .floatField('value', 24.0)
console.log(` ${point1}`)

writeApi.writePoint(point1)

/**
 * Flush pending writes and close writeApi.
 **/
writeApi.close().then(() => {
  console.log('WRITE FINISHED')
})