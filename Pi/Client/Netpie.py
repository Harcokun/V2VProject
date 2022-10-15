import paho.mqtt.client as mqtt
import json

NETPIE_HOST = 'mqtt.netpie.io'
TCP_PORT = 1883
shadow_topic = '@msg/data/update'
msg_topic = '@msg/control'
status_topic = '@msg/status/update'

def on_connect(self, client, userdata, rc):
    # self.subscribe(shadow_topic)
    # self.subscribe(msg_topic)

    msg = {
            "Device": self._client_id.decode(),
            "Status": "online"
    }
    self.publish(status_topic, json.dumps(msg), 1)
    self.subscribe(msg_topic)
    print("Netpie Connected.")
    
def on_message(client, userdata, msg):
    received_msg = msg.payload.decode()
    topic = msg.topic
    if client.socket:
        client.socket.send_message(received_msg)
    print(f"[RECEIVED]: {received_msg} from `{topic}` topic")

class Netpie:
    def __init__(self, client_id, token, socket = None, car = None):
        self.client = mqtt.Client(protocol=mqtt.MQTTv311, client_id=client_id, clean_session=True)
        self.client.username_pw_set(token)
        self.client.on_connect = on_connect
        self.client.on_message = on_message
        self.client_id = client_id
        self.client.socket = socket
        self.client.car = car
        self.token = token
        if self.client.socket:
            self.client.socket.start()

    def __str__(self):
        return f"Client_id = {self.client_id}, Device_token = {self.token}"

    def start(self):
        if self.client.socket:
            self.client.socket.establish_connection()
        self.client.connect(NETPIE_HOST, TCP_PORT)
        self.client.loop_start()
        # self.client.loop_forever()

    def stop(self):
        if self.client.socket:
            self.client.socket.disconnect()
        msg = {
            "Device": self.client_id,
            "Status": "offline"
        }
        self.client.publish(status_topic, json.dumps(msg), 1)
        self.client.disconnect()
        print("Netpie Disconnected")

    def shadow_update(self, mac_address, piece, location, clockwise, speed):
        msg = {
            "MacId": mac_address,
            "Piece": piece,
            "Location": location,
            "Clockwise": clockwise,
            "Speed": speed
        }
        result = self.client.publish(shadow_topic, json.dumps({"data": msg}), 1)
        status = result[0]
        if not status:
            print(f"The message has been sent to topic `{shadow_topic}`.")
        else:
            print(f"Failed to send the message to the broker.")
    
    def send_control_signal(self, cmd="None", speed=0, acc=1000):  # used on the back-end only
        msg = {
            "cmd": cmd,
            "speed": speed,
            "acc": acc
        }
        result = self.client.publish(msg_topic, json.dumps(msg), 1)
        status = result[0]
        if not status:
            print(f"The message has been sent to topic `{shadow_topic}`.")
        else:
            print(f"Failed to send the message to the broker.")



