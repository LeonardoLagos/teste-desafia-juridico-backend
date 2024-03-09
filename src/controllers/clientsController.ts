import { Request, Response } from 'express'
import { ClientsService } from '../services/clientsService'

export class ClientsController {
    clientsService: ClientsService

    constructor(clientsService = new ClientsService()) {
        this.clientsService = clientsService;
    }

    registeUser = async (req: Request, res: Response) => {
        try {
            const { name, email, telephone } = req.body;
            if (!name || !email || !telephone)
                res.status(400).json({ message: 'Insira todos os dados necessários!' })

            const result = await this.clientsService.registerUser(name, email, telephone)
            res.status(200).json({message: 'Usuário cadastrado com sucesso!'})

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
}