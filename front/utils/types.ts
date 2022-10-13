export interface CarInfo {
    _id: string;
    Model: string;
    Color: string;
    MacId: string;
    Status: string;
};

export interface ActiveCarInfo {
    speed: number;
    piece: number;
    location: number;
    clockwise: boolean;
    timestamp: EpochTimeStamp
};

export interface ActiveCarsList {
    [MacId: string] : {activeCarInfo: ActiveCarInfo};
};

