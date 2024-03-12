import { v4 as uuidv4 } from 'uuid';
import { pool as db } from "../database/dataSoure";
import client from '../database/entities/client';
import { calculateDistance } from '../utils/calculateDistance';

export class ClientsService {
    async registerUser(name: string, email: string, telephone: string, coordx: number, coordy: number) {
        const newUuid = uuidv4();
        try {
            await db.query(`
            INSERT INTO clients(
                id, 
                name, 
                email, 
                status, 
                telephone
            ) VALUES (
                '${newUuid}', 
                '${name}', 
                '${email}', 
                1, 
                '${telephone}'
            )`)
            await db.query(`
            INSERT INTO coord_clients(
                id_client, 
                coord_x, 
                coord_y
            ) VALUES (
                '${newUuid}', 
                '${coordx}', 
                '${coordy}'
            )`)
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async updateUser(id: string,
        name: string,
        email: string,
        telephone: string,
        status: number,
        coordx: number,
        coordy: number
    ) {
        try {
            await db.query(`
            UPDATE clients
            SET
                name = '${name}', 
                email = '${email}', 
                telephone = '${telephone}',
                status = ${status}
            WHERE id = '${id}'`
            )
            await db.query(`
            DO $$ 
            BEGIN
            IF EXISTS (SELECT 1 FROM coord_clients WHERE id_client = '${id}') THEN
                            UPDATE coord_clients
                            SET 
                                coord_x = ${coordx},
                                coord_y = ${coordy}
                            WHERE id_client = '${id}';
                        ELSE
                            INSERT INTO coord_clients (
                                id_client, 
                                coord_x,
                                coord_y
                            ) VALUES (
                                '${id}', 
                                ${coordx},
                                ${coordy}
                            );
                        END IF;
            END $$;`)
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async getAllclients() {
        try {
            const query = await db.query(`
            SELECT 
            	cl.id,
            	cl.name,
            	cl.email,
            	cl.telephone,
            	st.descricao as status,
                coord.coord_x as coordx,
                coord.coord_y as coordy
            FROM
            	clients cl
            	INNER JOIN 
            		status st ON cl.status = st.id
                INNER JOIN
                    coord_clients coord ON cl.id = coord.id_client`)
            return query.rows as client[];
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async getRoute() {
        try {
            const companyHq = {
                id: '',
                name: 'Sede da Empresa',
                email: '',
                telephone: '',
                coordx: 0,
                coordy: 0,
                status: 1
            }

            const result = [] as client[];
            const query = await db.query(`
            SELECT 
                cl.id,
            	cl.name,
            	cl.email,
            	cl.telephone,
            	st.descricao as status,
                coord.coord_x as coordx,
                coord.coord_y as coordy
            FROM
                clients cl
                INNER JOIN status st ON cl.status = st.id
                INNER JOIN coord_clients coord ON cl.id = coord.id_client`)

            if (query.rows.length < 2) {
                return [companyHq, ...query.rows, companyHq];
            }
            result.push(companyHq)
            while (query.rows.length > 0) {
                let actualPoint = result[result.length - 1];
                let shortestDistance = Number.MAX_VALUE;
                let nextPointIndex = -1;

                for (let i = 0; i < query.rows.length; i++) {
                    const actualDistance = calculateDistance(actualPoint, query.rows[i]);

                    if (actualDistance < shortestDistance) {
                        shortestDistance = actualDistance;
                        nextPointIndex = i;
                    }
                }

                result.push(query.rows[nextPointIndex]);
                query.rows.splice(nextPointIndex, 1);
            }

            result.push(companyHq)

            return result;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}