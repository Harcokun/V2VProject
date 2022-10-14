import mongoose from 'mongoose' 

function makeid(length: Number): string{
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function makeMacId(): string {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 2; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const carSchema = new mongoose.Schema({
    MacId: {
        type: String, 
        required: true
    },
    DeviceId: {
        type: String, 
        require: true,
        default: makeid(8) + "-" + makeid(4) + "-" + makeid(4) + "-" + makeid(4) + "-" + makeid(12)
    },
    Model: {
        type: String,
        required: true,
        default: "car"
    },
    Color: {
        type: String,
        default: "red"
    },
    Status: {
        type: String,
        default: "offline"
    }
})

const Car = mongoose.model('Car', carSchema);

export { Car }