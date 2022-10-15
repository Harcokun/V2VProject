import netifaces as ni
import threading
import socket

RECEIVER_IP = '192.168.1.8'
SENT_PORT = 5052
RECEIVER_ADDR = (RECEIVER_IP, SENT_PORT)

wlan1 = ni.ifaddresses('wlan1')[ni.AF_INET][0]  # wlan1 interface
IP = wlan1['addr'] # get the ip-address of wlan1 interface
RECEIVE_PORT = 5051
LISTEN_ADDR = (IP, RECEIVE_PORT)

HEADER = 64
FORMAT = 'utf-8'

class AdHoc:
    def __init__(self, car=None):
        self.socket =  socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.socket.bind(LISTEN_ADDR)
        self.clients = []
        self.car = car
        print(f"{IP}'s socket initiated.")

    def establish_connection(self):
        self.client.connect(RECEIVER_ADDR)
        print(f"[CONNECTION]: connected to {RECEIVER_ADDR}")

    def send_message(self, msg):
        msg += f"_{IP}"
        message = msg.encode(FORMAT) 
        msg_length = f"{len(msg)}_{IP}"
        send_length = str(msg_length).encode(FORMAT)
        send_length += b' ' * (HEADER - len(send_length))
        self.client.send(send_length)
        self.client.send(message) 
        print("Message sent.")

    def message_handler(self, conn, addr):
        while True:
            try:
                msg_length, sender = (conn.recv(HEADER).decode(FORMAT)).split('_')
            except:         
                break
            else:
                sender = sender.strip()
                if msg_length and sender != IP:
                    msg_length = int(msg_length)
                    message, _ = (conn.recv(msg_length).decode(FORMAT)).split('_')
                    print(f"[RECEIVED]: {message}")

    def client_handler(self):
        self.socket.listen()
        conn, addr = self.socket.accept() # wait for a connection from a client
        self.clients.append(conn)
        client_handling_proc = threading.Thread(target=self.message_handler, args=(conn, addr))
        client_handling_proc.start()

    def start(self):
        self.thread = threading.Thread(target=self.client_handler)
        self.thread.daemon = True
        self.thread.start()
        print(f"[LISTENING] Server is listening on {IP}")
        
    
    def disconnect(self):
        # self.proc.terminate()
        # self.socket.shutdown(1)
        for conn in self.clients:
            conn.close()
        self.socket.close()
        print("Socket disconnected.")
