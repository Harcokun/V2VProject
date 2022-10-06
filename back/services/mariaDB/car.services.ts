import { pool } from '../../config/db';

export async function getCarInfo(car_registration: string): Promise<JSON | null> {
    try {
        const query = `SELECT * FROM car WHERE car.car_registration = ${car_registration}`
        const data = await pool.query(query);
        return data; 
    } catch (err: any) {
        console.log(err);
        return err; 
    }
}