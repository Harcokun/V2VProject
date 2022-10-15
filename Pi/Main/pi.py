from overdrive import Overdrive
from Netpie import Netpie
from AdHoc import AdHoc
import time

CLIENT_ID = '1e30fad7-ccc5-4523-85ad-1dfe966c3c29'
DEVICE_TOKEN = 'Lx3DwEyGpuQwMVPHaJ653vHGCVpij2JL'
MAC_ADDRESS = "ED:9A:B3:A0:20:74" # Thermo

car = Overdrive(MAC_ADDRESS)
start_time = time.time()
old_piece = -1

netpie = Netpie(CLIENT_ID, DEVICE_TOKEN, AdHoc(), car)
input("Please wait for another host to be ready, then press 'Enter'")
netpie.start()

def locationChangeCallback(addr, location, piece, speed, clockwise):
    global start_time
    global netpie

    # ==================== Collision Avoidance ======================
    # global old_piece
    # global car

    # if piece == 33:
    #     car.changeLaneLeft(speed, 1000)
    #     netpie.send_control_signal('left', speed, 1000)
    # elif old_piece==36 and piece==17:
    #     car.changeLaneRight(speed, 1000)
    #     netpie.send_control_signal('right', speed, 1000)
    # old_piece = piece
    # ================================================================

    if(int(time.time() - start_time) >= 1): # update the shadow of a device every 1 seconds
        start_time = time.time()
        netpie.shadow_update(addr, piece, location, clockwise, speed)
    # Print out addr, piece ID, location ID of the vehicle, this print everytime when location changed
    print("Location from " + addr + " : " + "Piece=" + str(piece) + " Location=" + str(location) + " Clockwise=" + str(clockwise) + " Speed=" + str(speed))

car.setLocationChangeCallback(locationChangeCallback) # Set location change callback to function above
input()

car.disconnect()
netpie.stop()