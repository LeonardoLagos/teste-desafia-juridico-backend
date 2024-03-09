import { Pool } from 'pg'

export const pool = new Pool({
    host: 'localhost',
    port: 5434,
    database: 'teste_desafia_juridico',
    user: 'postgres',
    password: 'a'
})