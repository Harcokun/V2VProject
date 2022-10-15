from overdrive import Overdrive
from Netpie import Netpie
from AdHoc import AdHoc
import time

CLIENT_ID = 'a6b15e5b-4cd3-4e22-b7cf-2ae8d2872cda'
DEVICE_TOKEN = 'rVtv7TscDrgDVnTJrCqNyVtvpcMcZNUe'
MAC_ADDRESS = "D6:93:EB:A8:C1:5D"  # skull

car = Overdrive(MAC_ADDRESS)
start_time = time.time()

netpie = Netpie(CLIENT_ID, DEVICE_TOKEN, AdHoc(car))
input("Please wait for another host to be ready, then press 'Enter'")
netpie.start()

def locationChangeCallback(addr, location, piece, speed, clockwise):
    global start_time
    global netpie
    if(int(time.time() - start_time) >= 1): # update the shadow of a device every 1 seconds
        start_time = time.time()
        netpie.shadow_update(addr, piece, location, clockwise, speed)
    # Print out addr, piece ID, location ID of the vehicle, this print everytime when location changed
    print("Location from " + addr + " : " + "Piece=" + str(piece) + " Location=" + str(location) + " Clockwise=" + str(clockwise) + " Speed=" + str(speed))

car.setLocationChangeCallback(locationChangeCallback) # Set location change callback to function above
input()

car.disconnect()
netpie.stop()