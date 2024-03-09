import { v4 as uuidv4 } from 'uuid';
import { pool as db } from "../database/dataSoure";
import clients from '../database/entities/clients';

export class ClientsService {
    async registerUser(name: string, email: string, telephone: string) {
        try {
            await db.query(`
            INSERT 
            INTO clients(
                id, 
                name, 
                email, 
                status, 
                telephone
            ) VALUES (
                '${uuidv4()}', 
                '${name}', 
                '${email}', 
                1, 
                '${telephone}'
            )`)
        } catch {
            throw new Error('Erro na consulta')
        }
    }

    async getAllclients() {
        try {
            const t = await db.query('SELECT * FROM clients')
            return t.rows as clients[];
        } catch {
            throw new Error('Erro na consulta')
        }
    }
}