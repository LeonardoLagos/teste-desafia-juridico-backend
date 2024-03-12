interface iStatus {
    [key: string]: number;
}

export function parseStatus(status: string) {
    const statusLists: iStatus = {
        "Ativo": 1,
        "Inativo": 2
    }

    return statusLists[status] || 0;

}