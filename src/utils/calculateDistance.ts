import client from "../database/entities/client";

export const calculateDistance = (ponto1: client, ponto2: client): number => {
    const distancia = Math.sqrt(Math.pow(ponto2.coordx - ponto1.coordx, 2) + Math.pow(ponto2.coordy - ponto1.coordy, 2));
    return distancia;
};