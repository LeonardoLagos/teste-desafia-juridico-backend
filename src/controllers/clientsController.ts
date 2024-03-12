import { Request, Response } from 'express'
import { ClientsService } from '../services/clientsService'
import { parseStatus } from '../utils/parseStatus';

export class ClientsController {
    clientsService: ClientsService

    constructor(clientsService = new ClientsService()) {
        this.clientsService = clientsService;
    }

    registeUser = async (req: Request, res: Response) => {
        try {
            const { name, email, telephone, coordx, coordy } = req.body;
            if (!name || !email || !telephone)
                res.status(400).json({ message: 'Insira todos os dados necessários!' })

            const result = await this.clientsService.registerUser(
                name,
                email,
                telephone,
                coordx,
                coordy
            )
            res.status(200).json({ message: 'Cliente cadastrado com sucesso!' })

        } catch (error: any) {
            res.status(405).json({ message: error.message })
        }
    }

    updateUser = async (req: Request, res: Response) => {
        try {
            const { id, name, email, telephone, status, coordx, coordy } = req.body;
            if (!name || !email || !telephone)
                res.status(400).json({ message: 'Insira todos os dados necessários!' })

            const statusNumber = parseStatus(status)
            if (statusNumber === 0)
                res.status(400).json({ message: 'Status desconhecido!' })

            const result = await this.clientsService.updateUser(
                id,
                name,
                email,
                telephone,
                statusNumber,
                coordx,
                coordy
            )
            res.status(200).json({ message: 'Cliente atualizado com sucesso!' })

        } catch (error: any) {
            res.status(405).json({ message: error.message })
        }
    }

    getAllclients = async (req: Request, res: Response) => {
        try {
            const result = await this.clientsService.getAllclients()

            res.status(200).json(result)
        } catch (error: any) {
            res.status(405).json({ message: error.message })
        }
    }

    getRoute = async (req: Request, res: Response) => {
        try {
            const result = await this.clientsService.getRoute()

            res.status(200).json(result)
        } catch (error: any) {
            res.status(405).json({ message: error.message })
        }
    }

    generateRandomClients = async (req: Request, res: Response) => {
        const { amount } = req.body;
        try {
            for (let i = 0; i < amount; i++) {
                const client = {
                    name: `Cliente ${i + 1}`,
                    email: `cliente${i + 1}@exemplo.com`,
                    telephone: `(66) 9 92939495`,
                    coordx: Number((Math.random() * 10).toFixed(2).replace('.', '')),
                    coordy: Number((Math.random() * 10).toFixed(2).replace('.', '')),
                };
                const result = await this.clientsService.registerUser(
                    client.name,
                    client.email,
                    client.telephone,
                    client.coordx,
                    client.coordy
                )
            }
            res.status(200).json({ message: 'Clientes Criados!' })
        } catch (error: any) {
            res.status(405).json({ message: error.message })
        }
    }
}