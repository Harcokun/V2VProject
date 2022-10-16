export const lookUpCoordination = {
  17: {
    "l": {
      0: { x: 137.8, y: 197 },
      1: { x: 167.8, y: 228 },
      10: { x: 100.8, y: 197 },
      11: { x: 152.8, y: 256 },
      20: { x: 63.8, y: 197 },
      21: { x: 90.8, y: 255 },
      22: { x: 130.8, y: 282 },
      35: { x: 24.8, y: 197 },
      36: { x: 54.8, y: 272 },
      37: { x: 109.8, y: 311 },
    },
    "r": {
      0: { x: 450.8, y: 225 },
      1: { x: 477.8, y: 197 },
      10: { x: 468.8, y: 251 },
      11: { x: 514.8, y: 197 },
      20: { x: 490.8, y: 281 },
      21: { x: 529.8, y: 256 },
      22: { x: 554.8, y: 197 },
      35: { x: 508.8, y: 308 },
      36: { x: 563.8, y: 274 },
      37: { x: 591.8, y: 195 },
    },
  },
  18: {
    0: { x: 475.8, y: 170 },
    1: { x: 449.8, y: 144 },
    10: { x: 512.8, y: 170 },
    11: { x: 468.8, y: 117},
    20: { x: 553.8, y: 170 },
    21: { x: 530.8, y: 122 },
    22: { x: 489.8, y: 87 },
    35: { x: 588.8, y: 170 },
    36: { x: 565.8, y: 99 },
    37: { x: 509.8, y: 61 },
  },
  20: {
    0: { x: 164.8, y: 144 },
    1: { x: 139.8, y: 172 },
    10: { x: 151.8, y: 116 },
    11: { x: 98.8, y: 172 },
    20: { x: 136.8, y: 85 },
    21: { x: 77.8, y: 124 },
    22: { x: 62.8, y: 172 },
    35: { x: 126.8, y: 52 },
    36: { x: 49.8, y: 99 },
    37: { x: 24.8, y: 172 },
  },
  33: {
    0: { x: 228.8, y: 140 },
    5: { x: 228.8, y: 110 },
    10: { x: 228.8, y: 80 },
    15: { x: 228.8, y: 50 },
  },
  34: {
    0: { x: 388.8, y: 140 },
    1: { x: 308.8, y: 140 },
    10: { x: 388.8, y: 110 },
    11: { x: 308.8, y: 110 },
    20: { x: 388.8, y: 80 },
    21: { x: 308.8, y: 80 },
    30: { x: 388.8, y: 50 },
    31: { x: 308.8, y: 50 },
  },
  36: {
    0: { x: 228.8, y: 230 },
    1: { x: 308.8, y: 230 },
    2: { x: 388.8, y: 230 },
    15: { x: 228.8, y: 260 },
    16: { x: 308.8, y: 260 },
    17: { x: 388.8, y: 260 },
    30: { x: 228.8, y: 290 },
    31: { x: 308.8, y: 290 },
    32: { x: 388.8, y: 290 },
    45: { x: 228.8, y: 320 },
    46: { x: 308.8, y: 320 },
    47: { x: 388.8, y: 320 },
  }, 
};

export const defaultCarInfo = {
  _id: "",
  Model: "car",
  Color: "",
  MacId: "",
  Status: "",
};

export const defaultCarsList = [
  {
    _id: "1",
    Model: "car 01",
    Color: "red",
    MacId: "12345",
    Status: "offline",
  },
  {
    _id: "2",
    Model: "car 02",
    Color: "blue",
    MacId: "67890",
    Status: "offline",
  },
];

export const defaultActiveCarInfo = {
  speed: 0,
  piece: -1,
  location: -1,
  clockwise: true,
  timestamp: "None",
}

export const defaultActiveCarsList = {
    "D6:93:EB:A8:C1:5D": {
      speed: 10,
      piece: 20,
      location: 11,
      clockwise: false,
      timestamp: "2022-10-12T13:13:29.579Z",
    },
    "ED:9A:B3:A0:20:74": {
      speed: 5,
      piece: 33,
      location: 10,
      clockwise: false,
      timestamp: "2022-10-12T13:13:29.579Z",
  },
};