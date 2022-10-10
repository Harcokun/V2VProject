import mqtt from 'mqtt';

const MQTT_SERVER = 'mqtt.netpie.io';
const MQTT_PORT = 1883;
const MQTT_TOPIC = '@msg/control'
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
})

export default mqtt_obj
    
