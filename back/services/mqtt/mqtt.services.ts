import mqtt from 'mqtt';
import { Car } from '../../models/car.models';
import { writeDataToInflux } from '../influxDB/write_data';
import { makeMacId } from '../../models/car.models';

const MQTT_SERVER = 'mqtt.netpie.io';
const MQTT_PORT = 1883;
const MQTT_TOPIC = '@msg/control'
const MQTT_TOPIC_STATUS = '@msg/status/update'
const MQTT_TOPIC_DATA = '@msg/data/update'
const MQTT_USER = 'mJgVjkhXhaJcmvcYQc2HzqDCeBAP4quD'
const MQTT_PASWORD = ''
const MQTT_CLIENT_ID = '0800f042-ca7f-4c6a-85e8-2ab0370471d8'

const mqtt_obj = mqtt.connect({
    host: MQTT_SERVER,
    port: MQTT_PORT,
    username: MQTT_USER,
    password: MQTT_PASWORD,
    clientId: MQTT_CLIENT_ID
})

mqtt_obj.on('connect', () => {
    console.log('⚡️[mqtt]: MQTT connect!');
    mqtt_obj.subscribe(MQTT_TOPIC, (err: Error) => {
        if (err) {
            console.log(`[ERROR]: ${err}`);
        }
    })
    mqtt_obj.subscribe(MQTT_TOPIC_STATUS, (err: Error) => {
        if (err) {
            console.log(`[ERROR]: ${err}`);
        }
    })
    mqtt_obj.subscribe(MQTT_TOPIC_DATA, (err: Error) => {
        if (err) {
            console.log(`[ERROR]: ${err}`);
        }
    })
})

mqtt_obj.on('message', async (topic: string, message: string) => {
    // console.log(`on message: ${topic}, ${message}`);
    if (topic === "@msg/status/update") {
        console.log(`status message: ${message}`);
        const command = JSON.parse(message);
        const deviceId = command.Device;
        const status = command.Status; 
        let car = await Car.findOne({ DeviceId: deviceId });
        if (!car) {
            let macId; 
            if (deviceId === "1e30fad7-ccc5-4523-85ad-1dfe966c3c29") {
                macId = "ED:9A:B3:A0:20:74"
            } else if (deviceId === "a6b15e5b-4cd3-4e22-b7cf-2ae8d2872cda") {
                macId = "D6:93:EB:A8:C1:5D"
            } else {
                macId = `${makeMacId()}:${makeMacId()}:${makeMacId()}:${makeMacId()}`
            }
            const data = {
                MacId: macId, 
                DeviceId: deviceId, 
                Status: status
            }
            car = await Car.create(data);
            console.log({
                Car: car
            });
        }
    } else if (topic === "@msg/data/update"){
        console.log(`data message: ${message}`);
        writeDataToInflux(message);
    }
})

export default mqtt_obj
    
